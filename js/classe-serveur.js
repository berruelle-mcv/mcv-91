// ================================================
//   LABORO — Vue classe (lecture serveur) + actions élève
//   Chargé APRÈS teacher.js dans index.html.
// ================================================

let ELEVES_SERVEUR = [];
let SELECTED_ELEVE = null;

async function renderClasse(){
  const token = localStorage.getItem('laboro_token');
  const tb = document.getElementById('cl-tbody');

  if(!token){
    if(tb) tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--gm);font-size:12px">'
      + 'Connecte-toi via le serveur (adresse mail + mot de passe) pour afficher la liste des élèves.'
      + '</td></tr>';
    if(typeof renderMDJListe === 'function') renderMDJListe();
    return;
  }

  if(typeof populateClasseSelects === 'function') populateClasseSelects();

  const r = await fetchJSON(LABORO_API + '/api/eleves', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok){
    if(tb) tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--rg);font-size:12px">'
      + r.erreur + '</td></tr>';
    return;
  }
  const data = r.data;
  if(!data.ok){
    if(tb) tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--rg);font-size:12px">'
      + 'Erreur : ' + (data.erreur || 'chargement impossible') + '</td></tr>';
    return;
  }
  ELEVES_SERVEUR = data.eleves || [];

  afficherClasse();
}

function afficherClasse(){
  const eleves = ELEVES_SERVEUR.filter(e => e.statut !== 'archive');

  // On regroupe/affiche par classe_libelle (nom réel de la classe, ex: "2nde FMRC1")
  // plutôt que par le code générique niveau-option, pour bien distinguer 2 classes
  // de même niveau/option (ex: 2 groupes de 2nde attribués à 2 enseignants différents).
  const classes = [...new Set(eleves.map(e => e.classe_libelle || 'Sans classe'))].sort();
  const tabsEl = document.getElementById('classe-tabs');
  if(tabsEl){
    tabsEl.innerHTML =
      '<div style="font-size:11px;font-weight:700;color:var(--gm);margin-right:4px">Filtrer :</div>'
      + '<div class="cls-tab' + (classeFiltre===''?' on':'') + '" onclick="filtrerClasse(\'\')">Toutes '
      + '<span class="cls-count">' + eleves.length + '</span></div>'
      + classes.map(function(cls){
          const n = eleves.filter(e => (e.classe_libelle||'Sans classe')===cls).length;
          const clsColor = cls.indexOf('2nde')>=0 ? '#2E7D5E' : cls.indexOf('Term')>=0 ? '#7B2D42' : '#185FA5';
          const activeStyle = classeFiltre===cls ? ('background:'+clsColor+';color:#fff;border-color:'+clsColor) : ('border-color:'+clsColor+';color:'+clsColor);
          return '<div class="cls-tab' + (classeFiltre===cls?' on':'') + '" onclick="filtrerClasse(\'' + cls + '\')" style="' + activeStyle + '">'
            + cls + ' <span style="font-size:9px;background:#E6F1FB;color:#185FA5;padding:1px 5px;border-radius:8px">' + n + '</span></div>';
        }).join('');
  }

  const liste = classeFiltre ? eleves.filter(e => (e.classe_libelle||'Sans classe')===classeFiltre) : eleves;

  const statsEl = document.getElementById('classe-stats');
  if(statsEl){
    statsEl.innerHTML =
      '<div style="background:var(--bc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--bl)">' + liste.length + '</div><div class="u-label-up">Élèves</div></div>'
      + '<div style="background:var(--vc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--vt)">' + classes.length + '</div><div class="u-label-up">Classe(s)</div></div>'
      + '<div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">—</div><div class="u-label-up">Missions validées</div></div>'
      + '<div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">—</div><div class="u-label-up">Moyenne classe</div></div>';
  }

  const titreEl = document.getElementById('cl-titre');
  if(titreEl) titreEl.textContent = classeFiltre
    ? ('Classe : ' + classeFiltre + ' — ' + liste.length + ' élève(s)')
    : ('Tous les élèves — ' + liste.length);

  const tb = document.getElementById('cl-tbody');
  if(!tb){ if(typeof renderMDJListe === 'function') renderMDJListe(); return; }

  if(!liste.length){
    tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--gm);font-size:12px">'
      + (classeFiltre ? 'Aucun élève dans cette classe.' : 'Aucun élève pour le moment. Ajoute des élèves avec le formulaire ci-dessus.')
      + '</td></tr>';
    if(typeof renderMDJListe === 'function') renderMDJListe();
    return;
  }

  tb.innerHTML = liste.map(function(e){
    const nomAff = ((e.prenom ? e.prenom + ' ' : '') + (e.nom || '')).trim() || e.email;
    const cls = e.classe_libelle || '—';
    const classeCodePortfolio = e.classe || '';
    const nomAffPropre = nomAff.replace(/'/g,"");
    const btnReset = '<button onclick="event.stopPropagation();resetMdpEleve(\'' + e.id + '\',\'' + nomAffPropre + '\')" '
      + 'title="Réinitialiser le mot de passe" '
      + 'style="background:none;border:.5px solid var(--gb);border-radius:6px;padding:3px 8px;cursor:pointer;font-size:12px">🔑</button>';
    const btnPortfolio = '<button onclick="event.stopPropagation();genererPortfolioEleveServeur(\'' + e.id + '\',\'' + nomAffPropre + '\',\'' + classeCodePortfolio + '\')" '
      + 'title="Générer le portfolio" '
      + 'style="background:none;border:.5px solid var(--gb);border-radius:6px;padding:3px 8px;cursor:pointer;font-size:12px">📄</button>';
    const estSelectionne = SELECTED_ELEVE && SELECTED_ELEVE.id === e.id;
    return '<tr onclick="selectionnerEleve(\'' + e.id + '\')" style="cursor:pointer' + (estSelectionne ? ';background:var(--bc)' : '') + '">'
      + '<td style="font-weight:700">' + nomAff + '</td>'
      + '<td class="u-label-sm">' + cls + '</td>'
      + '<td colspan="5" style="font-size:11px;color:var(--gm)">' + e.email + '</td>'
      + '<td style="font-size:10px;color:var(--vt);font-weight:700">' + (e.statut || 'actif') + '</td>'
      + '<td style="text-align:center;display:flex;gap:4px;justify-content:center">' + btnPortfolio + btnReset + '</td>'
      + '</tr>';
  }).join('');

  if(typeof renderMDJListe === 'function') renderMDJListe();
}

function filtrerClasse(cls){
  classeFiltre = cls || '';
  afficherClasse();
}

async function resetMdpEleve(eleveId, nomAff){
  if(!confirm('Réinitialiser le mot de passe de ' + nomAff + ' ?\n\nSon mot de passe redeviendra "Laboro2025" et il devra en choisir un nouveau à sa prochaine connexion.')) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  const r = await fetchJSON(LABORO_API + '/api/eleves/reset-mdp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ eleve_id: eleveId })
  });
  if(!r.ok){ alert(r.erreur); return; }
  const d = r.data;
  if(!d.ok){ alert('Échec : ' + (d.erreur || 'erreur inconnue')); return; }
  alert('✅ Mot de passe réinitialisé pour ' + d.prenom + ' ' + d.nom + '.\n\nNouveau mot de passe : ' + d.motDePasse + '\n(il devra le changer à sa prochaine connexion)');
}

// ================================================
//   Sélection d'un élève dans le tableau + actions
// ================================================

function selectionnerEleve(eleveId){
  const e = ELEVES_SERVEUR.find(function(x){ return String(x.id) === String(eleveId); });
  if(!e) return;
  SELECTED_ELEVE = e;
  const nomAff = ((e.prenom ? e.prenom + ' ' : '') + (e.nom || '')).trim() || e.email;
  const nomEl = document.getElementById('eleve-selectionne-nom');
  if(nomEl) nomEl.textContent = '✅ Sélectionné : ' + nomAff + (e.classe_libelle ? ' (' + e.classe_libelle + ')' : '');
  const chcl = document.getElementById('chcl-panel');
  if(chcl) chcl.style.display = 'none';
  afficherClasse();
}

function verifierEleveSelectionne(){
  if(!SELECTED_ELEVE){
    alert('Sélectionne d\'abord un élève en cliquant sur sa ligne dans le tableau.');
    return false;
  }
  return true;
}

function changerClasseEleve(){
  if(!verifierEleveSelectionne()) return;
  const chcl = document.getElementById('chcl-panel');
  const sel = document.getElementById('chcl-select');
  if(sel && SELECTED_ELEVE.classe_id) sel.value = SELECTED_ELEVE.classe_id;
  if(chcl){ chcl.style.display = chcl.style.display === 'none' ? 'flex' : 'none'; }
}

async function validerChangementClasse(){
  if(!verifierEleveSelectionne()) return;
  const selEl = document.getElementById('chcl-select');
  const nouvelleClasse = selEl.value;
  const nouvelleClasseLabel = selEl.options[selEl.selectedIndex] ? selEl.options[selEl.selectedIndex].textContent : nouvelleClasse;
  const nomAff = ((SELECTED_ELEVE.prenom ? SELECTED_ELEVE.prenom + ' ' : '') + (SELECTED_ELEVE.nom || '')).trim() || SELECTED_ELEVE.email;
  if(!nouvelleClasse){ alert('Choisis une classe dans la liste.'); return; }
  if(!confirm('Confirmer le changement de classe de ' + nomAff + ' vers "' + nouvelleClasseLabel + '" ?')) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  const r = await fetchJSON(LABORO_API + '/api/eleves/' + SELECTED_ELEVE.id + '/classe', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ classeCode: nouvelleClasse })
  });
  if(!r.ok){ alert(r.erreur); return; }
  const d = r.data;
  if(!d.ok){ alert('Échec : ' + (d.erreur || 'erreur inconnue')); return; }
  document.getElementById('chcl-panel').style.display = 'none';
  SELECTED_ELEVE = null;
  document.getElementById('eleve-selectionne-nom').textContent = '';
  alert('✅ Classe mise à jour pour ' + nomAff + '.');
  renderClasse();
}

async function reinitialiserEleve(){
  if(!verifierEleveSelectionne()) return;
  const nomAff = ((SELECTED_ELEVE.prenom ? SELECTED_ELEVE.prenom + ' ' : '') + (SELECTED_ELEVE.nom || '')).trim() || SELECTED_ELEVE.email;
  if(!confirm('⚠️ Réinitialiser TOUTES les missions de ' + nomAff + ' ?\n\nToute sa progression (missions faites, notes, validations) sera définitivement effacée. Cette action est irréversible.')) return;
  if(!confirm('Dernière confirmation : vraiment tout effacer pour ' + nomAff + ' ?')) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  const r = await fetchJSON(LABORO_API + '/api/eleves/' + SELECTED_ELEVE.id + '/reinitialiser-missions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok){ alert(r.erreur); return; }
  const d = r.data;
  if(!d.ok){ alert('Échec : ' + (d.erreur || 'erreur inconnue')); return; }
  alert('✅ Missions réinitialisées pour ' + nomAff + ' (' + d.supprimees + ' progression(s) effacée(s)).');
}

async function supprimerEleve(){
  if(!verifierEleveSelectionne()) return;
  const nomAff = ((SELECTED_ELEVE.prenom ? SELECTED_ELEVE.prenom + ' ' : '') + (SELECTED_ELEVE.nom || '')).trim() || SELECTED_ELEVE.email;
  const estTest = (SELECTED_ELEVE.email || '').toLowerCase().includes('test');
  let permanent;
  if(estTest){
    permanent = confirm('"' + nomAff + '" semble être un compte de test (email contenant "test").\n\nSupprimer DÉFINITIVEMENT ce compte ?\n\n(Annuler = archiver seulement, sans supprimer)');
  } else {
    if(!confirm('Archiver ' + nomAff + ' ?\n\nL\'élève disparaîtra de la vue classe mais ses données sont conservées (réversible par un administrateur de la base).')) return;
    permanent = false;
  }
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  const url = LABORO_API + '/api/eleves/' + SELECTED_ELEVE.id + '?permanent=' + (permanent ? '1' : '0');
  const r = await fetchJSON(url, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok){ alert(r.erreur); return; }
  const d = r.data;
  if(!d.ok){ alert('Échec : ' + (d.erreur || 'erreur inconnue')); return; }
  SELECTED_ELEVE = null;
  document.getElementById('eleve-selectionne-nom').textContent = '';
  alert(d.mode === 'supprime_definitivement' ? ('🗑 ' + nomAff + ' a été supprimé définitivement.') : ('📦 ' + nomAff + ' a été archivé(e).'));
  renderClasse();
}
