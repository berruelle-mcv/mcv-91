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

  try{
    const r = await fetch(LABORO_API + '/api/corriger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ mission_id: CM.id, reponses })
    });
    const d = await r.json();

    if(!d.ok){
      alert('Correction impossible : ' + (d.erreur || 'erreur inconnue') + '. Réessaie dans un instant.');
      btnS.textContent = 'Soumettre mes réponses';
      btnS.disabled = false;
      return;
    }

    const note = d.note;
    const niveau = d.niveau;
    const feedback = d.feedback;

    const prevNote = ud.missions[CM.id]?.note_ia || 0;
    const progression = Math.max(0, note - prevNote);
    ud.missions[CM.id] = {
      ...ud.missions[CM.id],
      status: (d.statut === 'valide') ? 'done' : 'att',
      tentatives: tent,
      note_ia: note,
      niveau_ia: niveau,
      score: (d.statut === 'valide') ? note : ud.missions[CM.id]?.score,
      comp: CM.comp,
      id: CM.id,
      progression,
      date_validation: new Date().toISOString(),
      feedback: { note, texte: feedback }
    };
    sUD(ud);

    const tabFb = document.getElementById('tab-fb');
    tabFb.style.display = '';
    document.getElementById('mo-fb').innerHTML = renderFb({ note, texte: feedback });
    moTab(2, tabFb);
    btnS.style.display = 'none';

    if(typeof renderDashboard === 'function') renderDashboard();
    if(typeof renderMissions === 'function') renderMissions();

  }catch(e){
    alert('Impossible de joindre le serveur LABORO pour la correction. Vérifie ta connexion.');
    console.error('soumettreReponses (serveur) :', e);
    btnS.textContent = 'Soumettre mes réponses';
    btnS.disabled = false;
  }
}
