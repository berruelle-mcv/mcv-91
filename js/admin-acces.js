// ================================================
//   LABORO — Restriction horaire d'accès élèves (administrateur uniquement)
//   Écran admin : réglages (on/off, horaires, week-end) + déblocages exceptionnels
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

function afficherListeExceptionsAcces(exceptions){
  const el = document.getElementById('acc-exc-liste');
  if(!el) return;
  if(!exceptions.length){
    el.innerHTML = '<div style="font-size:12px;color:var(--gm)">Aucun déblocage exceptionnel en cours.</div>';
    return;
  }
  el.innerHTML = exceptions.map(function(ex){
    const cible = ex.classe_id
      ? (ex.classe_libelle || ex.classe_id)
      : (ex.eleve_nom ? (ex.eleve_prenom + ' ' + ex.eleve_nom) : 'Élève inconnu');
    const dateAffichee = (ex.date || '').split('-').reverse().join('/');
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gb)">'
      + '<div style="font-size:12px"><strong>' + cible + '</strong> — ' + dateAffichee + '</div>'
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

  const body = { date };
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

  showMsg('✅ Déblocage ajouté.', '#2E7D5E');
  document.getElementById('acc-date').value = '';
  chargerAccesEleves();
}

async function retirerExceptionAcces(id){
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const r = await fetchJSON(LABORO_API + '/api/acces-eleves/exceptions/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){ alert('Échec : ' + (r.erreur || (r.data && r.data.erreur) || 'erreur inconnue')); return; }
  chargerAccesEleves();
}
