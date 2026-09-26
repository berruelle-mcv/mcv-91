// ================================================
//   LABORO — Correction des missions via le SERVEUR
//   Chargé APRÈS missions.js dans index.html.
// ================================================

async function soumettreReponses(){
  if(!CM) return;

  const token = localStorage.getItem('laboro_token');
  if(!token){
    alert("Session expirée ou connexion locale. Reconnecte-toi avec ton adresse mail et ton mot de passe pour soumettre.");
    return;
  }

  const ud = gUD();
  const tent = (ud.missions[CM.id]?.tentatives || 0) + 1;

  const reponses = {};
  CM.activites.forEach((a,i) => {
    a.q.forEach(q => {
      const qid = `q_${CM.id}_${i}_${q.substring(0,8).replace(/\s/g,'_')}`;
      const el = document.getElementById(qid);
      if(el && el.value.trim()) reponses[q] = el.value.trim();
    });
  });
  const rfEl = document.getElementById(`q_${CM.id}_reflexivite`);
  if(rfEl && rfEl.value.trim()) reponses['Question de réflexivité'] = rfEl.value.trim();
  const siEl = document.getElementById(`q_${CM.id}_imprevu`);
  if(siEl && siEl.value.trim()) reponses['Situation imprévue'] = siEl.value.trim();

  if(Object.keys(reponses).length === 0){
    alert('Rédige au moins une réponse avant de soumettre.');
    return;
  }

  const btnS = document.getElementById('btn-submit');
  btnS.textContent = 'Correction en cours…';
  btnS.disabled = true;

  const r = await fetchJSON(LABORO_API + '/api/corriger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ mission_id: CM.id, reponses, integrite: (typeof integPourSoumission === 'function') ? integPourSoumission(CM.id, reponses) : null })
  });

  if(!r.ok){
    // Refus du serveur (limite de 2 tentatives comptée côté serveur depuis le 25/09/2026)
    const code = r.data && r.data.code;
    if(code === 'TENTATIVES_EPUISEES' || code === 'DEJA_VALIDEE'){
      const ud2 = gUD();
      ud2.missions[CM.id] = Object.assign({}, ud2.missions[CM.id], { id: CM.id,
        tentatives: Math.max(2, (ud2.missions[CM.id] && ud2.missions[CM.id].tentatives) || 0) });
      if(code === 'DEJA_VALIDEE') ud2.missions[CM.id].status = 'done';
      sUD(ud2);
    }
    alert(r.erreur);
    majBoutonsMission(CM.id);
    return;
  }
  const d = r.data;

  if(!d.ok){
    alert('Correction impossible : ' + (d.erreur || 'erreur inconnue') + '. Réessaie dans un instant.');
    majBoutonsMission(CM.id);
    return;
  }

  const note = d.note;
  const niveau = d.niveau;
  const feedback = d.feedback;

  // Règle "meilleure tentative" (serveur, 25/09/2026) : si la tentative précédente
  // avait une meilleure note, le serveur la conserve (d.conservee) — la note retenue
  // est alors d.note_conservee, pas la note de cette nouvelle tentative.
  const noteRetenue = d.conservee ? d.note_conservee : note;
  ud.missions[CM.id] = {
    ...ud.missions[CM.id],
    status: (d.statut === 'valide') ? 'done' : 'att',
    tentatives: (d.tentatives != null) ? d.tentatives : tent, // compteur du serveur s'il est fourni
    note_ia: noteRetenue,
    niveau_ia: niveau,
    score: (d.statut === 'valide') ? noteRetenue : ud.missions[CM.id]?.score,
    comp: CM.comp,
    id: CM.id,
    date_validation: new Date().toISOString(),
    feedback: { note, texte: feedback }
  };
  sUD(ud);

  const tabFb = document.getElementById('tab-fb');
  tabFb.style.display = '';
  document.getElementById('mo-fb').innerHTML = renderFb({ note, texte: feedback });
  moTab(2, tabFb);
  majBoutonsMission(CM.id);
  const tentFaites = (d.tentatives != null) ? d.tentatives : tent;
  if(d.conservee){
    document.getElementById('mo-fb').insertAdjacentHTML('afterbegin',
      '<div style="background:#EBF4FF;border:1px solid #B5D4F4;border-left:4px solid #185FA5;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;line-height:1.5;color:#1A2E4A">'
      + '<strong>🛡️ Ta tentative précédente (' + String(d.note_conservee).replace('.', ',') + '/20) est conservée</strong> : c\'est ta meilleure note, tu ne perds rien. '
      + 'Lis quand même le feedback ci-dessous pour comprendre ce qui a manqué cette fois.</div>');
  }
  // Note insuffisante avec une tentative restante : on l'explique clairement
  else if(d.statut !== 'valide' && tentFaites < 2){
    document.getElementById('mo-fb').insertAdjacentHTML('afterbegin',
      '<div style="background:#FFF7E6;border:1px solid #F0C040;border-left:4px solid #D97706;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;line-height:1.5;color:#7A4B00">'
      + '<strong>✏️ Tu peux corriger ta mission.</strong> Lis le feedback ci-dessous, retourne dans l\'onglet <strong>La mission</strong> : '
      + 'tes réponses sont toujours là. Améliore-les puis clique sur <strong>« Soumettre ma correction »</strong> (dernière tentative).</div>');
  }

  if(typeof renderDashboard === 'function') renderDashboard();
  if(typeof renderMissions === 'function') renderMissions();
}

// ═══════════════════════════════════════════════════════════
//   Récupération de la progression depuis le serveur (25/09/2026)
//   Avant : les missions faites/notées n'étaient connues que du
//   navigateur où l'élève avait travaillé → sur un autre poste,
//   tout réapparaissait "à faire" (score 0, mission du jour non faite).
//   Maintenant : à chaque entrée dans l'appli, on relit
//   /api/progressions (la base du Pi = source de vérité) et on
//   réaligne l'affichage. Les réponses, retours et brouillons
//   locaux ne sont jamais effacés.
// ═══════════════════════════════════════════════════════════
async function synchroniserProgressionsServeur(){
  if(!CU || CU.classe === 'enseignant') return;
  // Accès rapide "ana" et comptes démo : pas de compte serveur à relire
  // (le jeton restant dans le navigateur peut appartenir à un autre élève).
  if(CU.mail === 'pascal@laboro.fr' || String(CU.mail).indexOf('@laboro-demo.fr') >= 0) return;
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const mailAuDepart = CU.mail;
  try{
    const rep = await fetch(LABORO_API + '/api/progressions', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const d = await rep.json();
    if(!d || !d.ok || !Array.isArray(d.progressions)) return;
    if(!CU || CU.mail !== mailAuDepart) return; // déconnecté entre-temps

    const ud = gUD();
    if(!ud.missions) ud.missions = {};
    let changed = false;
    d.progressions.forEach(function(p){
      if(!p || !p.mission_id) return;
      // Compteur de tentatives tenu par le serveur : il fait foi, quel que soit le poste
      if(p.tentatives != null && ud.missions[p.mission_id] && ud.missions[p.mission_id].tentatives !== p.tentatives){
        ud.missions[p.mission_id].tentatives = p.tentatives; changed = true;
      }
      let statutServeur;
      if(p.statut === 'valide') statutServeur = 'done';
      else if(p.statut === 'a_examiner' || p.statut === 'soumis') statutServeur = 'att';
      else return; // statut inconnu : on ne touche à rien
      const local = ud.missions[p.mission_id];
      const noteServeur = p.note_finale != null ? p.note_finale : p.note_ia;
      // Une mission validée sur ce poste ne redescend jamais en "en attente"
      if(statutServeur === 'att' && local && local.status === 'done') return;
      const dejaAJour = local && local.status === statutServeur
        && (statutServeur !== 'done' || noteServeur == null || local.score === noteServeur);
      if(dejaAJour) return;
      const mis = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(x){ return x.id === p.mission_id; }) : null;
      ud.missions[p.mission_id] = Object.assign({}, local, {
        id: p.mission_id,
        comp: (local && local.comp) || (mis ? mis.comp : undefined),
        status: statutServeur,
        note_ia: p.note_ia != null ? p.note_ia : (local ? local.note_ia : undefined),
        score: statutServeur === 'done' ? noteServeur : (local ? local.score : undefined),
        date_validation: p.validated_at || p.submitted_at || (local ? local.date_validation : undefined),
        tentatives: p.tentatives != null ? p.tentatives : (local && local.tentatives)
      });
      changed = true;
    });

    // Décision du professeur (26/09/2026) : commentaire + note revue, visibles par l'élève
    d.progressions.forEach(function(p){
      const loc = p && p.mission_id ? ud.missions[p.mission_id] : null;
      if(!loc) return;
      const com = p.commentaire_enseignant || '';
      const revue = p.note_modifiee_par ? (p.note_finale != null ? p.note_finale : null) : null;
      if((loc.commentaire_prof || '') !== com || (loc.note_revue != null ? loc.note_revue : null) !== revue){
        loc.commentaire_prof = com; loc.note_revue = revue; changed = true;
      }
    });

    // Missions notées "validée / en attente" dans ce navigateur mais inconnues du
    // serveur (réinitialisées par l'enseignant, anciens essais locaux) : elles ne
    // doivent plus compter dans le score. Les réponses restent conservées.
    const surServeur = {};
    d.progressions.forEach(function(p){ if(p && p.mission_id) surServeur[p.mission_id] = true; });
    Object.keys(ud.missions).forEach(function(mid){
      const m = ud.missions[mid];
      const traceCorrection = m && (m.status === 'done' || m.status === 'att' || m.feedback || m.note_ia != null || m.score != null || (m.tentatives || 0) > 0);
      if(traceCorrection && !surServeur[mid]){
        // Réinitialisée par l'enseignant (ou jamais arrivée au serveur) : on garde le brouillon
        // des réponses mais on efface l'ancienne correction, pour ne pas afficher une note fantôme.
        const aDesReponses = m.reponses && Object.keys(m.reponses).some(function(k){ return String(m.reponses[k] || '').trim(); });
        ud.missions[mid] = Object.assign({}, m, { status: aDesReponses ? 'wip' : 'todo', score: undefined, note_ia: undefined, tentatives: 0,
          feedback: undefined, note_revue: undefined, commentaire_prof: undefined });
        changed = true;
      }
    });

    if(changed){
      sUD(ud);
      if(typeof renderAll === 'function'){ try{ renderAll(); }catch(e){ console.error(e); } }
    }
  }catch(e){
    console.error('synchroniserProgressionsServeur :', e);
  }
}

// Lancée à chaque entrée dans l'application (connexion normale,
// première connexion après charte/accueil, changement de poste).
(function(){
  if(typeof window.showApp !== 'function') return;
  const showAppOriginal = window.showApp;
  window.showApp = function(){
    const r = showAppOriginal.apply(this, arguments);
    try{ synchroniserProgressionsServeur(); }catch(e){ console.error(e); }
    return r;
  };
})();
