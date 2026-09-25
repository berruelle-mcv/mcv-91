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
    if(tb) tb.innerHTML = '<tr><td colspan="11" style="padding:16px;color:var(--gm);font-size:12px">'
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
    if(tb) tb.innerHTML = '<tr><td colspan="11" style="padding:16px;color:var(--rg);font-size:12px">'
      + r.erreur + '</td></tr>';
    return;
  }
  const data = r.data;
  if(!data.ok){
    if(tb) tb.innerHTML = '<tr><td colspan="11" style="padding:16px;color:var(--rg);font-size:12px">'
      + 'Erreur : ' + (data.erreur || 'chargement impossible') + '</td></tr>';
    return;
  }
  ELEVES_SERVEUR = data.eleves || [];

  // Premier rendu immédiat (identité des élèves), puis on charge la progression
  // réelle de chacun (notes/missions) et on ré-affiche avec les vraies colonnes.
  afficherClasse();
  const actifs = ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; });
  await chargerProgressionsClasse(actifs);
  afficherClasse();
}

// ================================================
//   Progression réelle des élèves (compétences, score, missions)
//   — alimente les colonnes C1/C2/C3/G4/Score/Posture/Missions/Moy.
//   de la Vue classe, l'export CSV et l'Analyse de classe.
// ================================================

let PROGRESSIONS_CLASSE = {}; // eleveId -> ud ({missions:{...}}) reconstruit depuis le serveur
let PROGRESSIONS_BRUTES = {}; // eleveId -> progressions serveur telles quelles (note_ia, note_finale, statut…)

function construireUdEleve(progressions){
  const ud = { missions: {} };
  (progressions || []).forEach(function(p){
    ud.missions[p.mission_id] = {
      id: p.mission_id, // requis par calcScore()/calcNiveauComp() pour retrouver la mission dans MISSIONS
      status: p.statut === 'valide' ? 'done' : (p.statut === 'a_examiner' || p.statut === 'soumis' || p.statut === 'corrige' ? 'att' : 'wip'),
      score: p.note_finale != null ? p.note_finale : p.note_ia
    };
  });
  return ud;
}

async function chargerProgressionsClasse(eleves){
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  await Promise.all(eleves.map(async function(e){
    const r = await fetchJSON(LABORO_API + '/api/eleves/' + e.id + '/progressions', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if(r.ok && r.data && r.data.ok){
      PROGRESSIONS_CLASSE[e.id] = construireUdEleve(r.data.progressions);
      PROGRESSIONS_BRUTES[e.id] = r.data.progressions || []; // pour le relevé de notes Pronote
    }
  }));
}

// Libellé de "posture" pro selon le score — miroir des paliers du tableau de bord élève (dashboard.js)
function posturePourScore(score, classeLibelle){
  const c = (classeLibelle || '').toUpperCase();
  const paliers = c.includes('PVOC') ? [
    {min:0,max:24,label:'Nouveau collaborateur'},{min:25,max:49,label:'Chargé de prospection'},
    {min:50,max:74,label:'Commercial terrain'},{min:75,max:89,label:'Négociateur confirmé'},
    {min:90,max:100,label:'Expert LABORO'}
  ] : c.includes('AGEC') ? [
    {min:0,max:24,label:'Nouveau collaborateur'},{min:25,max:49,label:'Équipier commercial'},
    {min:50,max:74,label:'Conseiller de vente'},{min:75,max:89,label:'Animateur commercial'},
    {min:90,max:100,label:'Expert LABORO'}
  ] : [
    {min:0,max:24,label:'Nouveau collaborateur'},{min:25,max:49,label:'Équipier commercial'},
    {min:50,max:74,label:'Conseiller de vente'},{min:75,max:89,label:'Commercial confirmé'},
    {min:90,max:100,label:'Expert LABORO'}
  ];
  const p = paliers.find(function(x){ return score>=x.min && score<=x.max; }) || paliers[0];
  return p.label;
}

// Niveau de compétence combiné pour la colonne "G4", selon le parcours de l'élève
// (miroir de la consolidation C4A.x→G4A / B4.x→G4B faite ailleurs sur la plateforme — gUD() dans app.js)
function niveauG4PourEleve(ud, classeLibelle){
  const c = (classeLibelle || '').toUpperCase();
  if(c.includes('AGEC')) return Math.max(calcNiveauComp('C4A', ud), calcNiveauComp('G4A', ud));
  if(c.includes('PVOC')) return Math.max(calcNiveauComp('B4', ud), calcNiveauComp('G4B', ud));
  return null; // 2nde : pas de bloc 4
}

function badgeNiveau(n){
  if(n === null || n === undefined) return '<span style="color:var(--gm);font-size:11px">—</span>';
  const cols = ['#A0AEC0','#63B3ED','#4A6FA5','#185FA5','#0A2540'];
  return '<span style="display:inline-block;min-width:18px;text-align:center;font-size:11px;font-weight:800;color:#fff;background:'+cols[n]+';border-radius:5px;padding:2px 5px">'+n+'</span>';
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

  // Stats agrégées à partir de la progression réelle (PROGRESSIONS_CLASSE, chargée par renderClasse())
  const statsListe = liste.map(function(e){
    const ud = PROGRESSIONS_CLASSE[e.id] || { missions: {} };
    const done = Object.values(ud.missions).filter(function(m){ return m.status === 'done'; });
    return { done: done.length, score: (typeof calcScore === 'function') ? calcScore(ud) : 0 };
  });
  const totalMissionsValidees = statsListe.reduce(function(a,x){ return a + x.done; }, 0);
  const actifsScore = statsListe.filter(function(x){ return x.done > 0; });
  const moyenneClasse = actifsScore.length ? Math.round(actifsScore.reduce(function(a,x){ return a+x.score; },0)/actifsScore.length) : null;

  const statsEl = document.getElementById('classe-stats');
  if(statsEl){
    statsEl.innerHTML =
      '<div style="background:var(--bc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--bl)">' + liste.length + '</div><div class="u-label-up">Élèves</div></div>'
      + '<div style="background:var(--vc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--vt)">' + classes.length + '</div><div class="u-label-up">Classe(s)</div></div>'
      + '<div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">' + totalMissionsValidees + '</div><div class="u-label-up">Missions validées</div></div>'
      + '<div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">' + (moyenneClasse!==null ? moyenneClasse+'/100' : '—') + '</div><div class="u-label-up">Moyenne classe</div></div>';
  }

  const titreEl = document.getElementById('cl-titre');
  if(titreEl) titreEl.textContent = classeFiltre
    ? ('Classe : ' + classeFiltre + ' — ' + liste.length + ' élève(s)')
    : ('Tous les élèves — ' + liste.length);

  const tb = document.getElementById('cl-tbody');
  if(!tb){ if(typeof renderMDJListe === 'function') renderMDJListe(); return; }

  if(!liste.length){
    tb.innerHTML = '<tr><td colspan="11" style="padding:16px;color:var(--gm);font-size:12px">'
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
    const ud = PROGRESSIONS_CLASSE[e.id] || { missions: {} };
    const done = Object.values(ud.missions).filter(function(m){ return m.status === 'done'; });
    const score = (typeof calcScore === 'function') ? calcScore(ud) : 0;
    const c1 = calcNiveauComp('C1', ud), c2 = calcNiveauComp('C2', ud), c3 = calcNiveauComp('C3', ud);
    const g4 = niveauG4PourEleve(ud, cls);
    const posture = done.length ? posturePourScore(score, cls) : '—';
    const moy = done.length ? (done.reduce(function(a,m){ return a + (m.score||0); },0) / done.length).toFixed(1) : '—';
    const btnReset = '<button onclick="event.stopPropagation();resetMdpEleve(\'' + e.id + '\',\'' + nomAffPropre + '\')" '
      + 'title="Réinitialiser le mot de passe" '
      + 'style="background:none;border:.5px solid var(--gb);border-radius:6px;padding:3px 8px;cursor:pointer;font-size:12px">🔑</button>';
    const btnPortfolio = '<button onclick="event.stopPropagation();genererPortfolioEleveServeur(\'' + e.id + '\',\'' + nomAffPropre + '\',\'' + classeCodePortfolio + '\')" '
      + 'title="Générer le portfolio" '
      + 'style="background:none;border:.5px solid var(--gb);border-radius:6px;padding:3px 8px;cursor:pointer;font-size:12px">📄</button>';
    const estSelectionne = SELECTED_ELEVE && SELECTED_ELEVE.id === e.id;
    return '<tr onclick="selectionnerEleve(\'' + e.id + '\')" style="cursor:pointer' + (estSelectionne ? ';background:var(--bc)' : '') + '">'
      + '<td style="font-weight:700">' + nomAff + (e.statut && e.statut!=='actif' ? ' <span style="font-size:9px;font-weight:400;color:var(--gm)">(' + e.statut + ')</span>' : '') + '<div style="font-size:9px;color:var(--gm);font-weight:400">' + e.email + '</div></td>'
      + '<td class="u-label-sm">' + cls + '</td>'
      + '<td style="text-align:center">' + badgeNiveau(c1) + '</td>'
      + '<td style="text-align:center">' + badgeNiveau(c2) + '</td>'
      + '<td style="text-align:center">' + badgeNiveau(c3) + '</td>'
      + '<td style="text-align:center">' + badgeNiveau(g4) + '</td>'
      + '<td style="text-align:center;font-weight:800;color:var(--bl)">' + score + '</td>'
      + '<td style="font-size:10px;color:var(--gm)">' + posture + '</td>'
      + '<td style="text-align:center">' + done.length + '</td>'
      + '<td style="text-align:center">' + moy + '</td>'
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

function modifierEleve(){
  if(!verifierEleveSelectionne()) return;
  const chcl = document.getElementById('chcl-panel');
  if(chcl) chcl.style.display = 'none';
  const panel = document.getElementById('mod-panel');
  const msg = document.getElementById('mod-msg');
  if(msg) msg.textContent = '';
  document.getElementById('mod-nom').value = SELECTED_ELEVE.nom || '';
  document.getElementById('mod-prenom').value = SELECTED_ELEVE.prenom || '';
  document.getElementById('mod-email').value = SELECTED_ELEVE.email || '';
  if(panel){ panel.style.display = panel.style.display === 'none' ? 'flex' : 'none'; }
}

async function validerModificationEleve(){
  if(!verifierEleveSelectionne()) return;
  const msg = document.getElementById('mod-msg');
  const nom = document.getElementById('mod-nom').value.trim();
  const prenom = document.getElementById('mod-prenom').value.trim();
  const email = document.getElementById('mod-email').value.trim();
  if(!nom || !prenom || !email){
    if(msg){ msg.textContent = 'Nom, prénom et email sont obligatoires.'; msg.style.color = 'var(--rg)'; }
    return;
  }
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  const r = await fetchJSON(LABORO_API + '/api/eleves/' + SELECTED_ELEVE.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ nom: nom, prenom: prenom, email: email })
  });
  if(!r.ok){ if(msg){ msg.textContent = r.erreur; msg.style.color = 'var(--rg)'; } return; }
  const d = r.data;
  if(!d.ok){ if(msg){ msg.textContent = d.erreur || 'Échec de la modification.'; msg.style.color = 'var(--rg)'; } return; }
  document.getElementById('mod-panel').style.display = 'none';
  SELECTED_ELEVE = null;
  document.getElementById('eleve-selectionne-nom').textContent = '';
  if(msg) msg.textContent = '';
  alert('✅ Informations mises à jour pour ' + d.prenom + ' ' + d.nom + '.');
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

// ================================================
//   Export CSV de la Vue classe (respecte le filtre de classe en cours)
// ================================================

function exporterClasse(){
  const eleves = ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; });
  const liste = classeFiltre ? eleves.filter(function(e){ return (e.classe_libelle||'Sans classe')===classeFiltre; }) : eleves;
  if(!liste.length){ alert('Aucun élève à exporter.'); return; }

  const lignes = [['Nom','Prénom','Email','Classe','C1','C2','C3','G4','Score /100','Posture','Missions validées','Moyenne /20']];
  liste.forEach(function(e){
    const ud = PROGRESSIONS_CLASSE[e.id] || { missions: {} };
    const done = Object.values(ud.missions).filter(function(m){ return m.status === 'done'; });
    const score = (typeof calcScore === 'function') ? calcScore(ud) : 0;
    const c1 = calcNiveauComp('C1', ud), c2 = calcNiveauComp('C2', ud), c3 = calcNiveauComp('C3', ud);
    const g4 = niveauG4PourEleve(ud, e.classe_libelle);
    const posture = done.length ? posturePourScore(score, e.classe_libelle) : '';
    const moy = done.length ? (done.reduce(function(a,m){ return a + (m.score||0); },0) / done.length).toFixed(1) : '';
    lignes.push([
      e.nom || '', e.prenom || '', e.email || '', e.classe_libelle || '',
      c1, c2, c3, (g4===null || g4===undefined ? '' : g4),
      score, posture, done.length, moy
    ]);
  });

  const csv = lignes.map(function(ligne){
    return ligne.map(function(v){
      const s = String(v==null ? '' : v);
      return /[",;\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
    }).join(';');
  }).join('\n');

  // BOM UTF-8 + séparateur ';' pour une ouverture correcte dans Excel en français
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = 'laboro-classe' + (classeFiltre ? '-' + classeFiltre.replace(/\s+/g,'_') : '') + '-' + dateStr + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ================================================
//   Analyse de classe (modal) — vue d'ensemble pédagogique
// ================================================

function openAnalyse(){
  const overlay = document.getElementById('ana-overlay');
  if(!overlay) return;

  const eleves = ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; });
  const liste = classeFiltre ? eleves.filter(function(e){ return (e.classe_libelle||'Sans classe')===classeFiltre; }) : eleves;

  const titreEl = document.getElementById('ana-titre');
  const sousEl = document.getElementById('ana-sous');
  const bodyEl = document.getElementById('ana-body');
  if(titreEl) titreEl.textContent = 'Analyse de classe';
  if(sousEl) sousEl.textContent = (classeFiltre || 'Toutes les classes') + ' — ' + liste.length + ' élève(s)';

  if(!liste.length){
    if(bodyEl) bodyEl.innerHTML = '<div style="padding:16px;color:var(--gm);font-size:13px">Aucun élève à analyser.</div>';
    overlay.classList.add('open');
    return;
  }

  const stats = liste.map(function(e){
    const ud = PROGRESSIONS_CLASSE[e.id] || { missions: {} };
    const done = Object.values(ud.missions).filter(function(m){ return m.status === 'done'; });
    return {
      nom: ((e.prenom?e.prenom+' ':'')+(e.nom||'')).trim() || e.email,
      score: (typeof calcScore === 'function') ? calcScore(ud) : 0,
      done: done.length,
      c1: calcNiveauComp('C1', ud), c2: calcNiveauComp('C2', ud), c3: calcNiveauComp('C3', ud),
      g4: niveauG4PourEleve(ud, e.classe_libelle)
    };
  });

  const actifs = stats.filter(function(s){ return s.done>0; });
  const moyenneClasse = actifs.length ? Math.round(actifs.reduce(function(a,s){ return a+s.score; },0)/actifs.length) : 0;
  const totalMissions = stats.reduce(function(a,s){ return a+s.done; }, 0);
  const enDifficulte = stats.filter(function(s){ return s.done>0 && s.score<40; }).sort(function(a,b){ return a.score-b.score; });
  const enAvance = actifs.slice().sort(function(a,b){ return b.score-a.score; }).slice(0,5);
  const sansActivite = stats.filter(function(s){ return s.done===0; });

  const labelsNiveaux = ['Non démarré','Découverte','En progression','Acquis','Maîtrisé'];
  const colsNiveaux = ['#A0AEC0','#63B3ED','#4A6FA5','#185FA5','#0A2540'];
  function barreCompetence(label, cle){
    const concernes = stats.filter(function(s){ return s[cle] !== null && s[cle] !== undefined; });
    if(!concernes.length) return '';
    const counts = [0,0,0,0,0];
    concernes.forEach(function(s){ counts[s[cle]]++; });
    const segments = counts.map(function(c,i){
      const pct = Math.round(c/concernes.length*100);
      return pct>0 ? '<div style="height:100%;width:'+pct+'%;background:'+colsNiveaux[i]+'" title="'+labelsNiveaux[i]+' : '+c+'"></div>' : '';
    }).join('');
    return '<div style="margin-bottom:10px"><div style="font-size:11px;font-weight:700;color:var(--t1);margin-bottom:4px">'+label+'</div>'
      + '<div style="display:flex;height:10px;border-radius:6px;overflow:hidden;background:#E2E8F0">'+segments+'</div></div>';
  }

  bodyEl.innerHTML =
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">'
    + '<div style="background:var(--bc);border-radius:8px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--bl)">'+moyenneClasse+'</div><div class="u-label-up">Score moyen /100</div></div>'
    + '<div style="background:var(--vc,#D1FAE5);border-radius:8px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--vt,#065F46)">'+totalMissions+'</div><div class="u-label-up">Missions validées</div></div>'
    + '<div style="background:var(--gc);border-radius:8px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--gr,#374151)">'+sansActivite.length+'</div><div class="u-label-up">Sans activité</div></div>'
    + '</div>'
    + '<div style="margin-bottom:16px">'
    + barreCompetence('C1 — Fondamentaux relation client', 'c1')
    + barreCompetence('C2 — Suivi et fidélisation', 'c2')
    + barreCompetence('C3 — Analyse et action commerciale', 'c3')
    + barreCompetence('G4 — Bloc spécialité (AGEC/PVOC)', 'g4')
    + '</div>'
    + (enDifficulte.length ? '<div style="margin-bottom:14px"><div style="font-size:12px;font-weight:800;color:#C53030;margin-bottom:6px">⚠ Élèves en difficulté (score &lt; 40, au moins 1 mission faite)</div>'
      + enDifficulte.map(function(s){ return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid var(--gc)">'+s.nom+' — '+s.score+'/100 ('+s.done+' mission(s))</div>'; }).join('')
      + '</div>' : '')
    + (sansActivite.length ? '<div style="margin-bottom:14px"><div style="font-size:12px;font-weight:800;color:var(--gm);margin-bottom:6px">😴 Élèves sans aucune mission validée</div>'
      + sansActivite.map(function(s){ return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid var(--gc)">'+s.nom+'</div>'; }).join('')
      + '</div>' : '')
    + '<div><div style="font-size:12px;font-weight:800;color:var(--bl);margin-bottom:6px">🏆 Meilleurs scores</div>'
    + (enAvance.length ? enAvance.map(function(s){ return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid var(--gc)">'+s.nom+' — '+s.score+'/100</div>'; }).join('') : '<div style="font-size:12px;color:var(--gm)">Aucun élève actif pour l\'instant.</div>')
    + '</div>';

  overlay.classList.add('open');
}

function closeAnalyse(){
  const overlay = document.getElementById('ana-overlay');
  if(overlay) overlay.classList.remove('open');
}

// ================================================
//   Validation groupée des notes IA ≥ 12/20
//   (jamais les réponses signalées comme suspectes par l'IA — celles-là
//   restent "à examiner" pour l'enseignant, quel que soit leur score)
// ================================================

async function validerAll(){
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  if(!confirm('Valider automatiquement toutes les missions corrigées par l\'IA avec une note ≥ 12/20 ?\n\nLes réponses signalées comme suspectes par l\'IA ne sont jamais validées automatiquement — elles restent à examiner toi-même.')) return;

  const btn = document.querySelector('.btn-val-all');
  if(btn){ btn.disabled = true; btn.textContent = 'Validation en cours…'; }

  const r = await fetchJSON(LABORO_API + '/api/classe/valider-notes-ia', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if(btn){ btn.disabled = false; btn.textContent = 'Valider notes IA ≥ 12/20'; }

  if(!r.ok){ alert(r.erreur); return; }
  const d = r.data;
  if(!d.ok){ alert('Échec : ' + (d.erreur || 'erreur inconnue')); return; }
  alert(d.valide > 0 ? ('✅ ' + d.valide + ' mission(s) validée(s) automatiquement.') : 'Aucune mission en attente avec une note ≥ 12/20 pour le moment.');
  renderClasse();
}
