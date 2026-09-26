// ================================================
//   LABORO — Copies des élèves + décision de l'enseignant (26/09/2026)
//   Chargé APRÈS releve-notes.js, groupes.js et dashboard-enseignant.js.
//
//   L'IA propose une note ; l'enseignant consulte la copie complète et décide :
//   note, validation, commentaire (visible par l'élève), tentative supplémentaire.
//   Routes : GET  /api/eleves/:id/copies/:mission_id
//            POST /api/eleves/:id/copies/:mission_id/decision
//            POST /api/eleves/:id/copies/:mission_id/tentative
//   Ouverture : Relevé Pronote (clic sur une note), « À examiner », Activité
//   récente du tableau de bord, et « 📂 Voir ses copies » dans la Vue classe.
// ================================================

let COPIE_OUVERTE = null; // { eleveId, missionId, data }

function esc(t){
  return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function eleveParId(id){ return (typeof ELEVES_SERVEUR !== 'undefined') ? ELEVES_SERVEUR.find(function(e){ return String(e.id) === String(id); }) : null; }
function missionParId(id){ return (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(m){ return m.id === id; }) : null; }
function dateHeure(iso){
  if(!iso) return '—';
  let t = String(iso); if(t.indexOf('T') < 0) t = t.replace(' ', 'T') + 'Z';
  const d = new Date(t); if(isNaN(d)) return '—';
  return d.toLocaleDateString('fr-FR') + ' à ' + d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}

function ouvrirOverlayCopie(){ document.getElementById('copie-overlay').classList.add('open'); }
function closeCopie(){ document.getElementById('copie-overlay').classList.remove('open'); COPIE_OUVERTE = null; }

// ---------- Ouvrir la copie d'un élève pour une mission ----------
async function openCopie(eleveId, missionId){
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  const e = eleveParId(eleveId), m = missionParId(missionId);
  document.getElementById('copie-titre').textContent = (m ? m.id + ' — ' + m.titre : missionId);
  document.getElementById('copie-sous').textContent = e ? ((e.prenom||'') + ' ' + (e.nom||'').toUpperCase() + ' · ' + (e.classe_libelle||'') + (e.groupe ? ' · ' + e.groupe : '')) : '';
  document.getElementById('copie-body').innerHTML = '<div style="padding:16px;color:var(--gm);font-size:13px">⏳ Chargement de la copie…</div>';
  ouvrirOverlayCopie();
  const r = await fetchJSON(LABORO_API + '/api/eleves/' + encodeURIComponent(eleveId) + '/copies/' + encodeURIComponent(missionId), {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){
    document.getElementById('copie-body').innerHTML = '<div style="padding:16px;color:var(--rg);font-size:13px">' + esc((r.data && r.data.erreur) || r.erreur || 'Copie introuvable.') + '</div>';
    return;
  }
  COPIE_OUVERTE = { eleveId: eleveId, missionId: missionId, data: r.data };
  renderCopie();
}

function renderCopie(){
  const c = COPIE_OUVERTE; if(!c) return;
  const d = c.data, m = missionParId(c.missionId);
  const noteRetenue = d.note_finale != null ? d.note_finale : d.note_ia;
  const revue = !!d.note_modifiee_par;
  const statutTxt = d.statut === 'valide' ? '<span style="background:#DCFCE7;color:#166534;padding:2px 10px;border-radius:10px;font-weight:800">✅ Validée</span>'
    : '<span style="background:#FEF3C7;color:#92400E;padding:2px 10px;border-radius:10px;font-weight:800">⏳ Non validée</span>';

  // --- Réponses, dans l'ordre des questions de la mission
  const reps = Object.assign({}, d.reponses || {});
  let htmlRep = '';
  const blocQ = function(q, rep){
    const num = q.split(' ')[0];
    const texteQ = /^\d/.test(num) ? q.substring(q.indexOf(' ') + 1) : q;
    return '<div style="padding:10px 0;border-bottom:1px solid #EDF2F7">'
      + '<div style="font-size:12px;color:#1A2E4A;line-height:1.5;margin-bottom:6px">' + (/^\d/.test(num) ? '<strong style="color:#185FA5">' + esc(num) + '</strong> ' : '') + esc(texteQ) + '</div>'
      + (rep ? '<div style="font-size:13px;line-height:1.55;background:#F8FAFC;border-left:3px solid #185FA5;border-radius:0 6px 6px 0;padding:8px 12px;white-space:pre-wrap">' + esc(rep) + '</div>'
             : '<div style="font-size:12px;color:#B91C1C;font-style:italic">Pas de réponse</div>')
      + '</div>';
  };
  if(m && m.activites){
    m.activites.forEach(function(a, i){
      htmlRep += '<div style="font-size:11px;font-weight:800;color:var(--vt);text-transform:uppercase;letter-spacing:.05em;margin-top:10px">Activité ' + (i+1) + ' — ' + esc(a.t) + '</div>';
      a.q.forEach(function(q){ htmlRep += blocQ(q, reps[q]); delete reps[q]; });
    });
  }
  Object.keys(reps).forEach(function(k){ htmlRep += blocQ(k, reps[k]); }); // réflexivité, situation imprévue, questions modifiées depuis
  if(!htmlRep) htmlRep = '<div style="font-size:12px;color:var(--gm)">Aucune réponse enregistrée.</div>';

  // --- Correction de l'IA
  const fb = d.feedback_ia || {};
  const htmlIA = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'
    + '<span style="font-size:12px;color:var(--gm)">Note proposée par l\'IA :</span>' + ((typeof pastilleNote === 'function') ? pastilleNote(d.note_ia) : esc(d.note_ia))
    + (d.alerte_ia ? '<span style="font-size:11px;font-weight:800;color:#B91C1C;background:#FEF2F2;padding:2px 8px;border-radius:8px">⚠ Réponse signalée comme suspecte par l\'IA</span>' : '')
    + '</div>'
    + '<div style="font-size:12.5px;line-height:1.6;white-space:pre-wrap;background:#F8FAFC;border-radius:8px;padding:10px 12px;max-height:260px;overflow:auto">' + esc(fb.texte || '—') + '</div>';

  // --- Décision de l'enseignant
  const peutAccorder = d.statut !== 'valide' && d.tentatives >= 1;
  const htmlDecision =
    '<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-bottom:10px">'
    + '<label style="font-size:13px;font-weight:700">Note retenue : <input id="copie-note" type="number" min="0" max="20" step="0.5" value="' + (noteRetenue != null ? noteRetenue : '') + '" style="width:74px;padding:6px 8px;border:1px solid #CBD5E0;border-radius:6px;font-size:14px;font-weight:800;text-align:center"> /20</label>'
    + '<label style="font-size:13px;display:flex;align-items:center;gap:6px;cursor:pointer"><input id="copie-valider" type="checkbox"' + (d.statut === 'valide' ? ' checked' : '') + '> Mission validée <span style="font-size:11px;color:var(--gm)">(compte dans le score, débloque le palier suivant)</span></label>'
    + '</div>'
    + '<textarea id="copie-commentaire" placeholder="Commentaire pour l\'élève (facultatif) — il le verra dans sa mission" style="width:100%;min-height:64px;padding:8px 10px;border:1px solid #CBD5E0;border-radius:8px;font-size:13px;box-sizing:border-box;font-family:inherit">' + esc(d.commentaire_enseignant || '') + '</textarea>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px">'
    + '<button onclick="enregistrerDecisionCopie()" style="padding:9px 18px;background:#185FA5;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:800">Enregistrer ma décision</button>'
    + (peutAccorder ? '<button onclick="accorderTentativeCopie()" style="padding:9px 14px;background:#fff;color:#92400E;border:1px solid #F0C040;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">➕ Accorder une tentative supplémentaire</button>' : '')
    + '<span id="copie-msg" style="font-size:12px;flex:1;min-width:160px"></span>'
    + '</div>'
    + (revue ? '<div style="font-size:11px;color:var(--gm);margin-top:8px">✎ Note revue par l\'enseignant le ' + dateHeure(d.note_modifiee_at) + ' (note IA d\'origine : ' + esc(d.note_ia) + '/20).</div>' : '');

  const bloc = function(titre, contenu, fond){ return '<div style="border:1px solid #E2E8F0;border-radius:10px;padding:12px 14px;margin-bottom:12px;background:' + (fond || '#fff') + '"><div style="font-size:11px;font-weight:800;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">' + titre + '</div>' + contenu + '</div>'; };

  document.getElementById('copie-body').innerHTML =
    '<div style="display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;font-size:12px;margin-bottom:12px">'
    + statutTxt
    + '<span>Note retenue : ' + ((typeof pastilleNote === 'function') ? pastilleNote(noteRetenue) : esc(noteRetenue)) + (revue ? ' <span title="Note revue par l\'enseignant">✎</span>' : '') + '</span>'
    + '<span style="color:var(--gm)">Tentatives utilisées : <strong>' + d.tentatives + '/2</strong></span>'
    + '<span style="color:var(--gm)">Rendue le ' + dateHeure(d.submitted_at) + '</span>'
    + (m ? '<span style="color:var(--gm)">' + esc(m.comp) + ' · Palier ' + esc(m.palier) + ' · seuil de la classe ' + esc(d.seuil) + '/20</span>' : '')
    + '</div>'
    + bloc('👩‍🏫 Ta décision', htmlDecision, '#F5F9FF')
    + bloc('📝 Réponses de l\'élève', htmlRep)
    + bloc('🤖 Correction proposée par l\'IA', htmlIA);
}

// ---------- Enregistrer la décision ----------
async function enregistrerDecisionCopie(){
  const c = COPIE_OUVERTE; if(!c) return;
  const msg = document.getElementById('copie-msg');
  const note = parseFloat(String(document.getElementById('copie-note').value).replace(',', '.'));
  if(isNaN(note) || note < 0 || note > 20){ msg.style.color = 'var(--rg)'; msg.textContent = 'Indique une note entre 0 et 20.'; return; }
  const noteArrondie = Math.round(note * 2) / 2;
  const valider = document.getElementById('copie-valider').checked;
  const commentaire = document.getElementById('copie-commentaire').value;
  if(valider && noteArrondie < (c.data.seuil || 10) && !confirm('La note (' + noteArrondie + '/20) est sous le seuil de validation de la classe (' + c.data.seuil + '/20). Valider quand même la mission ?')) return;
  msg.style.color = 'var(--gm)'; msg.textContent = 'Enregistrement…';
  const token = localStorage.getItem('laboro_token');
  const r = await fetchJSON(LABORO_API + '/api/eleves/' + encodeURIComponent(c.eleveId) + '/copies/' + encodeURIComponent(c.missionId) + '/decision', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ note: noteArrondie, valider: valider, commentaire: commentaire })
  });
  if(!r.ok || !r.data.ok){ msg.style.color = 'var(--rg)'; msg.textContent = (r.data && r.data.erreur) || r.erreur || 'Enregistrement impossible.'; return; }
  Object.assign(c.data, { note_finale: noteArrondie, statut: r.data.statut, note_modifiee_par: 'moi', note_modifiee_at: r.data.note_modifiee_at, commentaire_enseignant: commentaire.trim() });
  majDonneesApresDecision(c.eleveId, c.missionId, { note_finale: noteArrondie, statut: r.data.statut, note_modifiee_par: 'moi', note_modifiee_at: r.data.note_modifiee_at });
  renderCopie();
  const m2 = document.getElementById('copie-msg'); if(m2){ m2.style.color = '#166534'; m2.textContent = '✅ Décision enregistrée.'; }
}

async function accorderTentativeCopie(){
  const c = COPIE_OUVERTE; if(!c) return;
  if(!confirm('Accorder une tentative supplémentaire ? L\'élève pourra soumettre à nouveau cette mission (sa meilleure note restera conservée).')) return;
  const token = localStorage.getItem('laboro_token');
  const r = await fetchJSON(LABORO_API + '/api/eleves/' + encodeURIComponent(c.eleveId) + '/copies/' + encodeURIComponent(c.missionId) + '/tentative', {
    method: 'POST', headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){ alert((r.data && r.data.erreur) || r.erreur || 'Impossible d\'accorder la tentative.'); return; }
  c.data.tentatives = r.data.tentatives;
  majDonneesApresDecision(c.eleveId, c.missionId, { tentatives: r.data.tentatives });
  renderCopie();
  const m2 = document.getElementById('copie-msg'); if(m2){ m2.style.color = '#166534'; m2.textContent = '✅ Tentative accordée : il lui en reste ' + r.data.restantes + '.'; }
}

// Met à jour les données en mémoire et rafraîchit ce qui est affiché derrière
function majDonneesApresDecision(eleveId, missionId, champs){
  const liste = (typeof PROGRESSIONS_BRUTES !== 'undefined') ? (PROGRESSIONS_BRUTES[eleveId] || []) : [];
  const p = liste.find(function(x){ return x.mission_id === missionId; });
  if(p) Object.assign(p, champs);
  if(typeof PROGRESSIONS_CLASSE !== 'undefined' && typeof construireUdEleve === 'function') PROGRESSIONS_CLASSE[eleveId] = construireUdEleve(liste);
  try{
    const rel = document.getElementById('rel-overlay');
    if(rel && rel.classList.contains('open')){
      const t = document.getElementById('rel-titre');
      if(t && t.textContent.indexOf('examiner') >= 0) openAExaminer(); else renderReleve();
    }
    const pc = document.getElementById('panel-classe');
    if(pc && pc.classList.contains('on') && typeof afficherClasse === 'function') afficherClasse();
    const pd = document.getElementById('panel-dashboard');
    if(pd && pd.classList.contains('on') && typeof choisirClasseDashboard === 'function' && typeof DASH_ENS_CLASSE !== 'undefined') choisirClasseDashboard(DASH_ENS_CLASSE);
  }catch(e){ console.error(e); }
}

// ---------- Vue classe : toutes les copies de l'élève sélectionné ----------
function openCopiesEleve(){
  if(typeof verifierEleveSelectionne === 'function' && !verifierEleveSelectionne()) return;
  const e = SELECTED_ELEVE;
  const liste = ((typeof PROGRESSIONS_BRUTES !== 'undefined' && PROGRESSIONS_BRUTES[e.id]) || []).slice()
    .sort(function(a,b){ return String(b.submitted_at||'').localeCompare(String(a.submitted_at||'')); });
  document.getElementById('copie-titre').textContent = 'Copies de ' + ((e.prenom||'') + ' ' + (e.nom||'').toUpperCase()).trim();
  document.getElementById('copie-sous').textContent = (e.classe_libelle||'') + (e.groupe ? ' · ' + e.groupe : '') + ' — ' + liste.length + ' mission(s) rendue(s)';
  document.getElementById('copie-body').innerHTML = !liste.length
    ? '<div style="padding:12px;font-size:13px;color:var(--gm)">Cet élève n\'a encore rendu aucune mission.</div>'
    : '<div style="font-size:12px;color:var(--gm);margin-bottom:8px">Clique sur une mission pour voir la copie et prendre ta décision.</div>'
      + liste.map(function(p){
          const m = missionParId(p.mission_id);
          const note = p.note_finale != null ? p.note_finale : p.note_ia;
          return '<div onclick="openCopie(\'' + esc(e.id) + '\',\'' + esc(p.mission_id) + '\')" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-bottom:1px solid #EDF2F7;cursor:pointer;font-size:12px">'
            + '<div style="flex:1;min-width:0"><strong style="color:#185FA5">' + esc(p.mission_id) + '</strong> ' + esc(m ? m.titre : '')
            + '<div style="font-size:11px;color:var(--gm)">Rendue le ' + dateHeure(p.submitted_at) + ' · ' + (p.tentatives != null ? p.tentatives + '/2 tentative(s)' : '') + '</div></div>'
            + ((typeof pastilleNote === 'function') ? pastilleNote(note) : esc(note)) + (p.note_modifiee_par ? ' <span title="Note revue par l\'enseignant">✎</span>' : '')
            + (p.statut === 'valide' ? '<span title="Validée">✅</span>' : '<span title="Non validée">⏳</span>')
            + '<span style="color:#185FA5;font-weight:700">Ouvrir →</span></div>';
        }).join('');
  ouvrirOverlayCopie();
}
