// ================================================
//   LABORO — Accès élèves
//   Réglage général (on/off, horaires, week-end) : administrateur uniquement.
//   Ouvertures / fermetures exceptionnelles d'une journée : tout enseignant,
//   sur ses classes et leurs élèves (10/10/2026 — demande de Sandrine).
// ================================================

async function renderAccesEleves(){
  await populateClasseSelects();
  if(typeof populateAccesEleveSelect === 'function') await populateAccesEleveSelect();
  toggleAccesCible();
  await chargerAccesEleves();
}

function toggleAccesCible(){
  const cible = document.getElementById('acc-cible');
  const selCl = document.getElementById('acc-cl');
  const selEl = document.getElementById('acc-el');
  if(!cible || !selCl || !selEl) return;
  const isEleve = cible.value === 'eleve';
  selCl.style.display = isEleve ? 'none' : '';
  selEl.style.display = isEleve ? '' : 'none';
}

async function chargerAccesEleves(){
  const token = localStorage.getItem('laboro_token');
  const liste = document.getElementById('acc-exc-liste');
  if(!token){ if(liste) liste.textContent = 'Session expirée.'; return; }

  const r = await fetchJSON(LABORO_API + '/api/acces-eleves', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){
    if(liste) liste.textContent = 'Impossible de charger les réglages.';
    return;
  }

  const p = r.data.parametres;
  // Non-administrateur : le réglage général est affiché en lecture seule
  const admin = !!r.data.est_admin;
  ['acc-actif', 'acc-debut', 'acc-fin', 'acc-weekend'].forEach(function(id){
    const el = document.getElementById(id); if(el) el.disabled = !admin;
  });
  const btn = document.getElementById('acc-enregistrer'); if(btn) btn.style.display = admin ? '' : 'none';
  const info = document.getElementById('acc-reglage-info'); if(info) info.style.display = admin ? 'none' : '';
  ACCES_AUJOURDHUI = r.data.aujourdhui || '';
  const elActif = document.getElementById('acc-actif');
  const elDebut = document.getElementById('acc-debut');
  const elFin = document.getElementById('acc-fin');
  const elWeekend = document.getElementById('acc-weekend');
  if(elActif) elActif.checked = !!p.actif;
  if(elDebut) elDebut.value = p.heure_debut;
  if(elFin) elFin.value = p.heure_fin;
  if(elWeekend) elWeekend.checked = !!p.bloquer_weekend;

  afficherListeExceptionsAcces(r.data.exceptions || []);
}

let ACCES_AUJOURDHUI = '';
function afficherListeExceptionsAcces(exceptions){
  const el = document.getElementById('acc-exc-liste');
  if(!el) return;
  if(!exceptions.length){
    el.innerHTML = '<div style="font-size:12px;color:var(--gm)">Aucune ouverture ni fermeture prévue.</div>';
    return;
  }
  el.innerHTML = exceptions.map(function(ex){
    const cible = ex.classe_id
      ? (ex.classe_libelle || ex.classe_id)
      : (ex.eleve_nom ? (ex.eleve_prenom + ' ' + ex.eleve_nom) : 'Élève inconnu');
    const dateAffichee = (ex.date || '').split('-').reverse().join('/');
    const ferme = ex.type === 'fermeture';
    const badge = '<span style="font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;margin-right:8px;'
      + (ferme ? 'background:#FEE2E2;color:#B91C1C">🔒 FERMÉ' : 'background:#D1FAE5;color:#047857">🔓 OUVERT') + '</span>';
    const passee = ACCES_AUJOURDHUI && ex.date < ACCES_AUJOURDHUI;
    const quand = ex.date === ACCES_AUJOURDHUI ? ' <span style="font-size:10px;font-weight:700;color:var(--bl)">(aujourd\'hui)</span>' : '';
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gb)' + (passee ? ';opacity:.5' : '') + '">'
      + '<div style="font-size:12px">' + badge + '<strong>' + cible + '</strong> — ' + dateAffichee + quand + '</div>'
      + '<span style="cursor:pointer;color:var(--rg);font-size:12px;font-weight:600" onclick="retirerExceptionAcces(\'' + ex.id + '\')">✕ Retirer</span>'
      + '</div>';
  }).join('');
}

async function sauvegarderReglagesAcces(){
  const msgEl = document.getElementById('acc-msg');
  const showMsg = function(txt, couleur){ if(msgEl){ msgEl.textContent = txt; msgEl.style.color = couleur; } };

  const actif = document.getElementById('acc-actif').checked;
  const heure_debut = document.getElementById('acc-debut').value;
  const heure_fin = document.getElementById('acc-fin').value;
  const bloquer_weekend = document.getElementById('acc-weekend').checked;

  if(!heure_debut || !heure_fin){
    showMsg('Renseigne les deux horaires.', '#C53030');
    return;
  }

  const token = localStorage.getItem('laboro_token');
  if(!token){ showMsg('Session expirée — reconnecte-toi.', '#C53030'); return; }

  showMsg('Enregistrement en cours…', '#6B7280');
  const r = await fetchJSON(LABORO_API + '/api/acces-eleves', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ actif, heure_debut, heure_fin, bloquer_weekend })
  });
  if(!r.ok || !r.data.ok){ showMsg('⚠️ ' + (r.erreur || (r.data && r.data.erreur) || 'Échec de l\'enregistrement.'), '#C53030'); return; }

  showMsg(actif
    ? '✅ Restriction activée — les élèves ne pourront accéder à la plateforme que de ' + heure_debut + ' à ' + heure_fin + (bloquer_weekend ? ', pas le week-end.' : '.')
    : '✅ Restriction désactivée — les élèves ont accès à la plateforme à toute heure.',
    '#2E7D5E');
}

async function ajouterExceptionAcces(){
  const msgEl = document.getElementById('acc-exc-msg');
  const showMsg = function(txt, couleur){ if(msgEl){ msgEl.textContent = txt; msgEl.style.color = couleur; } };

  const cible = document.getElementById('acc-cible').value;
  const date = document.getElementById('acc-date').value;
  if(!date){ showMsg('Choisis une date.', '#C53030'); return; }

  const type = (document.getElementById('acc-type') || {}).value === 'fermeture' ? 'fermeture' : 'ouverture';
  const body = { date, type };
  if(cible === 'eleve'){
    const elId = document.getElementById('acc-el').value;
    if(!elId){ showMsg('Choisis un élève.', '#C53030'); return; }
    body.eleve_id = elId;
  } else {
    const clId = document.getElementById('acc-cl').value;
    if(!clId){ showMsg('Choisis une classe.', '#C53030'); return; }
    body.classeCode = clId;
  }

  const token = localStorage.getItem('laboro_token');
  if(!token){ showMsg('Session expirée — reconnecte-toi.', '#C53030'); return; }

  showMsg('Ajout en cours…', '#6B7280');
  const r = await fetchJSON(LABORO_API + '/api/acces-eleves/exceptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body)
  });
  if(!r.ok || !r.data.ok){ showMsg('⚠️ ' + (r.erreur || (r.data && r.data.erreur) || 'Échec de l\'ajout.'), '#C53030'); return; }

  showMsg(type === 'fermeture' ? '✅ Fermeture enregistrée.' : '✅ Ouverture enregistrée.', '#2E7D5E');
  document.getElementById('acc-date').value = '';
  chargerAccesEleves();
}

async function retirerExceptionAcces(id){
  if(!confirm('Retirer cette ouverture / fermeture ?')) return;
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const r = await fetchJSON(LABORO_API + '/api/acces-eleves/exceptions/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){ alert('Échec : ' + (r.erreur || (r.data && r.data.erreur) || 'erreur inconnue')); return; }
  chargerAccesEleves();
}
