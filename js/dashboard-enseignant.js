// ================================================
//   LABORO — Tableau de bord ENSEIGNANT (26/09/2026)
//   Chargé APRÈS classe-serveur.js, releve-notes.js et teacher.js.
//
//   Remplace, pour l'enseignant, l'accueil élève (classement, progression,
//   actualités…) par ce qui sert vraiment en séance :
//     • raccourcis (assigner, relevé Pronote, à examiner, vue classe)
//     • À traiter aujourd'hui (missions à examiner, tentatives épuisées,
//       missions assignées en cours, soumissions du jour)
//     • Mes classes en un coup d'œil
//     • Activité récente (dernières soumissions)
//     • Élèves à relancer
//   Données : les mêmes routes que la Vue classe (/api/eleves, progressions
//   par élève) + /api/mission-du-jour/toutes. Aucune nouvelle route.
// ================================================

let DASH_ENS_ASSIGNATIONS = [];
let DASH_ENS_CHARGE_A = 0;
const DASH_ENS_JOURS_RELANCE = 7;

// Dates du serveur : ISO ("2026-09-25T14:20:00Z") ou format SQLite ("2026-09-25 14:20:00", UTC)
function dateServeur(s){
  if(!s) return null;
  let t = String(s);
  if(t.indexOf('T') < 0) t = t.replace(' ', 'T') + 'Z';
  const d = new Date(t);
  return isNaN(d) ? null : d;
}
function memeJour(a, b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function quandLisible(d){
  if(!d) return '—';
  const now = new Date(), hier = new Date(now); hier.setDate(now.getDate()-1);
  const h = d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  if(memeJour(d, now)) return "aujourd'hui " + h;
  if(memeJour(d, hier)) return 'hier ' + h;
  return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}) + ' ' + h;
}
function nomCourtEleve(e){ return (((e.prenom||'') + ' ' + (e.nom||'').toUpperCase()).trim()) || e.email; }
function titreMission(id){
  const m = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(x){ return x.id === id; }) : null;
  return m ? m.titre : '';
}
function pastilleNote(note){
  if(note == null) return '<span style="color:var(--gm)">—</span>';
  const n = (typeof niveauPourNote === 'function') ? niveauPourNote(note) : null;
  const txt = (typeof fmtNote === 'function') ? fmtNote(note) : String(note);
  return '<span style="display:inline-block;min-width:38px;text-align:center;padding:2px 6px;border-radius:5px;font-weight:800;font-size:11px;'
    + (n ? 'background:'+n.bg+';color:'+n.fg : 'background:#E5E7EB') + '">'+txt+'</span>';
}

// --- Point d'entrée, appelé par renderDashboard() quand CU est enseignant ---
async function renderDashboardEnseignant(){
  const el = document.getElementById('dash-ens');
  if(!el) return;
  const token = localStorage.getItem('laboro_token');
  const prenom = (CU && CU.nom ? CU.nom.split(' ')[0] : '');
  const dateTxt = new Date().toLocaleDateString('fr-FR',{weekday:'long', day:'numeric', month:'long'});
  const dateAff = dateTxt.charAt(0).toUpperCase() + dateTxt.slice(1);

  const entete = '<div class="wb" style="margin-bottom:14px;align-items:center">'
    + '<div class="wb-l"><h2>Bonjour ' + prenom + ' !</h2><p style="margin:0">' + dateAff + '</p></div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end">'
    + boutonRaccourci('📌', 'Assigner une mission', "goP('missiondujour',document.getElementById('ni-mdj'))")
    + boutonRaccourci('📋', 'À examiner', "ouvrirDepuisAccueil('examiner')")
    + boutonRaccourci('📝', 'Relevé Pronote', "ouvrirDepuisAccueil('releve')")
    + boutonRaccourci('👥', 'Vue classe', "allerVueClasse('')")
    + '</div></div>';

  if(!token){
    el.innerHTML = entete + '<div class="card" style="font-size:13px;color:var(--gm)">Connecte-toi via le serveur (adresse mail + mot de passe) pour afficher le suivi de tes classes.</div>';
    return;
  }

  // Premier affichage immédiat (données déjà en mémoire, ou chargement)
  const dejaCharge = ELEVES_SERVEUR.length && (Date.now() - DASH_ENS_CHARGE_A < 60000);
  el.innerHTML = entete + (dejaCharge ? contenuDashboardEnseignant() : '<div class="card" style="font-size:13px;color:var(--gm)">⏳ Chargement du suivi de tes classes…</div>');
  if(dejaCharge) return;

  // Chargement : élèves, progressions de chacun, missions assignées
  const r = await fetchJSON(LABORO_API + '/api/eleves', { headers: { 'Authorization': 'Bearer ' + token } });
  if(!r.ok || !r.data.ok){
    el.innerHTML = entete + '<div class="card" style="font-size:13px;color:var(--rg)">' + (r.erreur || 'Impossible de charger tes classes.') + '</div>';
    return;
  }
  ELEVES_SERVEUR = r.data.eleves || [];
  const actifs = ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; });
  const [ , rm] = await Promise.all([
    chargerProgressionsClasse(actifs),
    fetchJSON(LABORO_API + '/api/mission-du-jour/toutes', { headers: { 'Authorization': 'Bearer ' + token } })
  ]);
  DASH_ENS_ASSIGNATIONS = (rm && rm.ok && rm.data.ok && rm.data.assignations) ? rm.data.assignations : [];
  DASH_ENS_CHARGE_A = Date.now();

  // L'enseignant a pu changer de page pendant le chargement
  const panneau = document.getElementById('panel-dashboard');
  if(!panneau || !panneau.classList.contains('on')) return;
  el.innerHTML = entete + contenuDashboardEnseignant();
}

function boutonRaccourci(ico, label, action){
  return '<button onclick="' + action + '" style="display:flex;align-items:center;gap:6px;padding:9px 14px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:9px;cursor:pointer;font-size:12px;font-weight:700;white-space:nowrap">'
    + '<span style="font-size:15px">' + ico + '</span>' + label + '</button>';
}
function allerVueClasse(cls){
  classeFiltre = cls || '';
  if(typeof groupeFiltre !== 'undefined') groupeFiltre = '';
  goP('classe', document.getElementById('ni-cl'));
}
function ouvrirDepuisAccueil(quoi){
  // Relevé et "À examiner" portent sur toutes les classes depuis l'accueil
  classeFiltre = '';
  if(typeof groupeFiltre !== 'undefined') groupeFiltre = '';
  if(quoi === 'examiner' && typeof openAExaminer === 'function') openAExaminer();
  if(quoi === 'releve' && typeof openReleve === 'function') openReleve();
}
function actualiserDashboardEnseignant(){ DASH_ENS_CHARGE_A = 0; renderDashboardEnseignant(); }

// --- Calcul de toutes les données du tableau de bord ---
function donneesDashboardEnseignant(){
  const eleves = ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; });
  const maintenant = new Date();
  const limiteRelance = new Date(maintenant.getTime() - DASH_ENS_JOURS_RELANCE*24*3600*1000);
  const soumissions = [];   // toutes les soumissions, pour l'activité récente
  const parClasse = {};
  let aExaminer = 0, epuisees = 0, aujourdhui = 0, tentativesConnues = false;

  eleves.forEach(function(e){
    const cls = e.classe_libelle || 'Sans classe';
    if(!parClasse[cls]) parClasse[cls] = { nom: cls, eleves: 0, actifs7j: 0, validees: 0, sommeNotes: 0, nbNotes: 0, jamais: [], inactifs: [], G1: 0, G2: 0, sansGroupe: 0, scores: [], parGroupe: { G1: statsGroupeVide(), G2: statsGroupeVide() } };
    const c = parClasse[cls];
    c.eleves++;
    // Score LABORO (même calcul que le classement des élèves) — pour le top 3 de la classe
    const sc = (typeof calcScore === 'function' && PROGRESSIONS_CLASSE[e.id]) ? calcScore(PROGRESSIONS_CLASSE[e.id]) : 0;
    if(sc > 0) c.scores.push({ eleve: e, score: sc });
    if(e.groupe === 'G1') c.G1++; else if(e.groupe === 'G2') c.G2++; else c.sansGroupe++;
    const sg = (e.groupe === 'G1' || e.groupe === 'G2') ? c.parGroupe[e.groupe] : null;
    if(sg) sg.eleves++;
    let derniere = null, nb = 0;
    (PROGRESSIONS_BRUTES[e.id] || []).forEach(function(p){
      if(!p || !p.mission_id) return;
      const d = dateServeur(p.submitted_at);
      const note = (p.note_finale != null) ? p.note_finale : p.note_ia;
      if(d){ nb++; if(!derniere || d > derniere) derniere = d; if(memeJour(d, maintenant)) aujourdhui++; }
      if(p.tentatives != null) tentativesConnues = true;
      if(p.statut === 'valide'){ c.validees++; if(note != null){ c.sommeNotes += Number(note); c.nbNotes++; }
        if(sg){ sg.validees++; if(note != null){ sg.sommeNotes += Number(note); sg.nbNotes++; } } }
      if(p.statut === 'a_examiner'){ aExaminer++; if((p.tentatives||0) >= 2) epuisees++; }
      if(d) soumissions.push({ eleve: e, cls: cls, mission_id: p.mission_id, note: note, statut: p.statut, tentatives: p.tentatives, date: d });
    });
    if(!nb) c.jamais.push(e);
    else if(derniere < limiteRelance) c.inactifs.push({ eleve: e, derniere: derniere });
    if(derniere && derniere >= limiteRelance){ c.actifs7j++; if(sg) sg.actifs7j++; }
    if(!nb && sg) sg.jamais++;
  });

  soumissions.sort(function(a,b){ return b.date - a.date; });
  const enCours = DASH_ENS_ASSIGNATIONS.filter(function(a){ return !a.retiree_at && a.total > 0 && a.termines < a.total; });
  const classes = Object.keys(parClasse).sort().map(function(k){ return parClasse[k]; });
  return { eleves: eleves, classes: classes, soumissions: soumissions, enCours: enCours,
           aExaminer: aExaminer, epuisees: epuisees, tentativesConnues: tentativesConnues, aujourdhui: aujourdhui };
}

// --- Rendu HTML ---
function contenuDashboardEnseignant(){
  const d = donneesDashboardEnseignant();
  if(!d.eleves.length){
    return '<div class="card" style="font-size:13px;color:var(--gm)">Aucun élève dans tes classes pour le moment. Ajoute-les depuis la Vue classe.</div>';
  }
  return blocATraiter(d) + blocClasses(d)
    + '<div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:14px;align-items:flex-start">'
    + '<div style="flex:1 1 380px;min-width:0">' + blocActivite(d) + '</div>'
    + '<div style="flex:1 1 300px;min-width:0">' + blocRelance(d) + '</div>'
    + '</div>'
    + '<div style="text-align:right;margin-top:8px"><button onclick="actualiserDashboardEnseignant()" style="background:none;border:none;color:var(--gm);font-size:11px;cursor:pointer;text-decoration:underline">↻ Actualiser</button></div>';
}

function tuile(valeur, label, sous, couleur, fond, action){
  return '<div ' + (action ? 'onclick="' + action + '" ' : '') + 'style="flex:1;min-width:170px;background:' + fond + ';border-radius:10px;padding:12px 14px;' + (action ? 'cursor:pointer' : '') + '">'
    + '<div style="font-size:26px;font-weight:900;color:' + couleur + ';line-height:1">' + valeur + '</div>'
    + '<div style="font-size:12px;font-weight:800;color:#1A2E4A;margin-top:4px">' + label + '</div>'
    + (sous ? '<div style="font-size:11px;color:var(--gm);margin-top:2px">' + sous + '</div>' : '')
    + '</div>';
}

function blocATraiter(d){
  const tuiles =
      tuile(d.aExaminer, 'Mission(s) à examiner', 'Notes sous le seuil de validation — voir la liste →', d.aExaminer ? '#C2410C' : '#166534', d.aExaminer ? '#FFF7ED' : '#F0FDF4', "ouvrirDepuisAccueil('examiner')")
    + (d.tentativesConnues
        ? tuile(d.epuisees, '2 tentatives épuisées', d.epuisees ? 'Élèves bloqués : à voir avec eux' : 'Aucun élève bloqué', d.epuisees ? '#B91C1C' : '#166534', d.epuisees ? '#FEF2F2' : '#F0FDF4', "ouvrirDepuisAccueil('examiner')")
        : '')
    + tuile(d.enCours.length, 'Mission(s) assignée(s) en cours', 'Suivre l\'avancement →', '#185FA5', '#EBF4FF', "goP('missiondujour',document.getElementById('ni-mdj'))")
    + tuile(d.aujourdhui, 'Soumission(s) aujourd\'hui', 'Toutes classes confondues', '#4A5568', '#F7FAFC', '');

  const listeEnCours = d.enCours.slice(0, 4).map(function(a){
    const pct = a.total ? Math.round(a.termines / a.total * 100) : 0;
    const qui = (typeof cibleAssignation === 'function') ? cibleAssignation(a) : (a.classe_libelle || a.classe_id || '');
    return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-top:1px solid #EDF2F7;font-size:12px">'
      + '<div style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><strong>' + qui + '</strong> — <strong style="color:#185FA5">' + a.mission_id + '</strong> ' + (a.titre||'') + '</div>'
      + '<div style="width:110px;height:7px;background:#E5E7EB;border-radius:4px;overflow:hidden;flex-shrink:0"><div style="height:100%;width:' + pct + '%;background:#1B7F3B"></div></div>'
      + '<div style="font-weight:700;font-size:11px;width:44px;text-align:right;flex-shrink:0">' + a.termines + '/' + a.total + '</div></div>';
  }).join('');

  return '<div class="card" style="margin-top:0"><div class="ct">🔔 À traiter aujourd\'hui</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:10px">' + tuiles + '</div>'
    + (listeEnCours ? '<div style="margin-top:12px"><div class="u-label-up" style="margin-bottom:4px">Missions assignées en cours</div>' + listeEnCours + '</div>' : '')
    + '</div>';
}

function statsGroupeVide(){ return { eleves: 0, actifs7j: 0, validees: 0, sommeNotes: 0, nbNotes: 0, jamais: 0 }; }

// Carte de classe en bandeau (26/09/2026) : chiffres · podium · comparaison G1 / G2
function blocClasses(d){
  const cartes = d.classes.map(function(c){
    const couleur = c.nom.indexOf('2nde') >= 0 ? '#2E7D5E' : c.nom.indexOf('Term') >= 0 ? '#7B2D42' : '#185FA5';
    const moy = c.nbNotes ? (c.sommeNotes / c.nbNotes) : null;
    const pctActifs = c.eleves ? Math.round(c.actifs7j / c.eleves * 100) : 0;
    const ligne = function(label, val){ return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0"><span style="color:var(--gm)">' + label + '</span><strong>' + val + '</strong></div>'; };
    const titreCol = function(t){ return '<div style="font-size:10px;font-weight:800;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">' + t + '</div>'; };
    const colChiffres = '<div style="flex:1 1 230px;min-width:0">'
      + titreCol('La classe')
      + ligne('Élèves', c.eleves)
      + ligne('Actifs cette semaine', c.actifs7j + ' <span style="font-weight:400;color:var(--gm)">(' + pctActifs + ' %)</span>')
      + ligne('Missions validées', c.validees)
      + ligne('Moyenne des notes validées', moy != null ? pastilleNote(Math.round(moy*10)/10) : '—')
      + ligne('Aucune mission rendue', c.jamais.length ? '<span style="color:#C2410C">' + c.jamais.length + '</span>' : '0')
      + '</div>';
    const colPodium = '<div style="flex:1.3 1 280px;min-width:0">' + titreCol('🏆 Top 3 — Score LABORO') + blocPodium(c) + '</div>';
    const colGroupes = '<div style="flex:1 1 240px;min-width:0">' + titreCol('Demi-groupes') + blocComparaisonGroupes(c) + '</div>';
    return '<div onclick="allerVueClasse(\'' + c.nom.replace(/'/g, "\\'") + '\')" title="Ouvrir la Vue classe de ' + c.nom + '" style="border:1px solid #E2E8F0;border-left:5px solid ' + couleur + ';border-radius:10px;padding:12px 16px;cursor:pointer;background:#fff">'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">'
      + '<div style="font-size:15px;font-weight:900;color:' + couleur + '">' + c.nom + '</div>'
      + '<div style="font-size:11px;color:' + couleur + ';font-weight:700">Voir la classe →</div></div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:22px">' + colChiffres + colPodium + colGroupes + '</div>'
      + '</div>';
  }).join('');
  return '<div class="card" style="margin-top:14px"><div class="ct">🏫 Mes classes</div><div style="display:flex;flex-direction:column;gap:12px">' + cartes + '</div></div>';
}

function blocActivite(d){
  const lignes = d.soumissions.slice(0, 12).map(function(s){
    const etat = s.statut === 'valide' ? '<span title="Validée">✅</span>'
      : ((s.tentatives||0) >= 2 ? '<span title="2 tentatives utilisées, sous le seuil">⛔</span>' : '<span title="À examiner — l\'élève peut encore corriger">⏳</span>');
    return '<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid #EDF2F7;font-size:12px">'
      + '<div style="width:92px;flex-shrink:0;color:var(--gm);font-size:11px">' + quandLisible(s.date) + '</div>'
      + '<div style="flex:1;min-width:0"><div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + nomCourtEleve(s.eleve) + ' <span style="font-weight:400;color:var(--gm);font-size:10px">' + s.cls + '</span></div>'
      + '<div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#4A5568"><strong style="color:#185FA5">' + s.mission_id + '</strong> ' + titreMission(s.mission_id) + '</div></div>'
      + pastilleNote(s.note) + etat + '</div>';
  }).join('');
  return '<div class="card" style="margin-top:0"><div class="ct">🕒 Activité récente</div>'
    + (lignes || '<div style="font-size:12px;color:var(--gm)">Aucune soumission pour le moment.</div>')
    + (lignes ? '<div style="font-size:10px;color:var(--gm);margin-top:6px">✅ validée · ⏳ l\'élève peut encore corriger · ⛔ 2 tentatives utilisées</div>' : '')
    + '</div>';
}

function blocRelance(d){
  const sections = d.classes.map(function(c){
    if(!c.jamais.length && !c.inactifs.length) return '';
    const noms = function(liste){ return liste.map(function(x){ return nomCourtEleve(x); }).join(', '); };
    return '<div style="padding:8px 0;border-bottom:1px solid #EDF2F7">'
      + '<div style="font-size:12px;font-weight:900;margin-bottom:4px">' + c.nom + '</div>'
      + (c.jamais.length ? '<div style="font-size:12px;margin-bottom:3px"><span style="color:#C2410C;font-weight:700">Rien rendu (' + c.jamais.length + ') :</span> ' + noms(c.jamais) + '</div>' : '')
      + (c.inactifs.length ? '<div style="font-size:12px"><span style="color:#92400E;font-weight:700">Inactifs depuis ' + DASH_ENS_JOURS_RELANCE + ' jours ou plus (' + c.inactifs.length + ') :</span> '
          + c.inactifs.sort(function(a,b){ return a.derniere - b.derniere; }).map(function(x){ return nomCourtEleve(x.eleve) + ' <span style="color:var(--gm);font-size:10px">(' + x.derniere.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}) + ')</span>'; }).join(', ') + '</div>' : '')
      + '</div>';
  }).join('');
  return '<div class="card" style="margin-top:0"><div class="ct">📣 Élèves à relancer</div>'
    + (sections || '<div style="font-size:12px;color:#166534">✅ Tous tes élèves ont rendu au moins une mission ces ' + DASH_ENS_JOURS_RELANCE + ' derniers jours.</div>')
    + '</div>';
}


// Podium de la classe (Score LABORO) — mêmes règles que le podium élève :
// seuls les élèves ayant un score > 0, pas de 2e/3e artificiels.
function blocPodium(c){
  const top = c.scores.slice().sort(function(a,b){ return b.score - a.score; }).slice(0, 3);
  if(!top.length) return '<div style="font-size:12px;color:var(--gm);padding:20px 0;text-align:center">Pas encore de mission validée.</div>';
  // Ordre d'affichage : 2e – 1er – 3e (1er au centre, plus haut)
  const places = [ { rang: 2, h: 44, fond: '#E5E7EB', med: '🥈' }, { rang: 1, h: 64, fond: '#FDE68A', med: '🥇' }, { rang: 3, h: 30, fond: '#FED7AA', med: '🥉' } ];
  return '<div style="display:flex;align-items:flex-end;justify-content:center;gap:8px;padding-top:4px">'
    + places.map(function(p){
        const t = top[p.rang - 1];
        if(!t) return '<div style="flex:1;max-width:120px"></div>';
        return '<div style="flex:1;max-width:120px;text-align:center">'
          + '<div style="font-size:20px;line-height:1">' + p.med + '</div>'
          + '<div style="font-size:12px;font-weight:800;margin-top:3px;line-height:1.2">' + (t.eleve.prenom || '') + '</div>'
          + '<div style="font-size:10px;color:var(--gm);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (t.eleve.nom || '').toUpperCase() + '</div>'
          + '<div style="margin:2px 0 4px">' + ((typeof badgeGroupe === 'function') ? badgeGroupe(t.eleve.groupe) : '') + '</div>'
          + '<div style="height:' + p.h + 'px;background:' + p.fond + ';border-radius:6px 6px 0 0;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;color:#1A2E4A">' + t.score + '</div>'
          + '</div>';
      }).join('')
    + '</div>';
}

// Comparaison G1 / G2 (élèves, actifs, missions validées, moyenne)
function blocComparaisonGroupes(c){
  if(!c.G1 && !c.G2){
    return '<div style="font-size:12px;color:var(--gm);line-height:1.5">Élèves pas encore répartis.<br><span style="color:#6B4EA8;font-weight:700">Répartir depuis la Vue classe →</span></div>';
  }
  const col = function(g){
    const s = c.parGroupe[g], coul = (typeof COULEURS_GROUPES !== 'undefined' && COULEURS_GROUPES[g]) ? COULEURS_GROUPES[g] : { bg: '#E5E7EB', fg: '#374151' };
    const moy = s.nbNotes ? Math.round(s.sommeNotes / s.nbNotes * 10) / 10 : null;
    const pct = s.eleves ? Math.round(s.actifs7j / s.eleves * 100) : 0;
    return { coul: coul, cellules: [ s.eleves, s.actifs7j + ' <span style="font-weight:400;color:var(--gm);font-size:10px">(' + pct + ' %)</span>', s.validees, moy != null ? pastilleNote(moy) : '—', s.jamais ? '<span style="color:#C2410C">' + s.jamais + '</span>' : '0' ] };
  };
  const g1 = col('G1'), g2 = col('G2');
  const libelles = ['Élèves', 'Actifs cette semaine', 'Missions validées', 'Moyenne', 'Rien rendu'];
  const td = 'padding:3px 4px;font-size:12px;text-align:center';
  return '<table style="width:100%;border-collapse:collapse">'
    + '<thead><tr><th></th>'
    + '<th style="' + td + '"><span style="display:inline-block;padding:1px 10px;border-radius:8px;font-size:11px;font-weight:900;background:' + g1.coul.bg + ';color:' + g1.coul.fg + '">G1</span></th>'
    + '<th style="' + td + '"><span style="display:inline-block;padding:1px 10px;border-radius:8px;font-size:11px;font-weight:900;background:' + g2.coul.bg + ';color:' + g2.coul.fg + '">G2</span></th></tr></thead><tbody>'
    + libelles.map(function(l, i){
        return '<tr><td style="padding:3px 0;font-size:12px;color:var(--gm)">' + l + '</td><td style="' + td + ';font-weight:800">' + g1.cellules[i] + '</td><td style="' + td + ';font-weight:800">' + g2.cellules[i] + '</td></tr>';
      }).join('')
    + '</tbody></table>'
    + (c.sansGroupe ? '<div style="font-size:11px;color:#C2410C;margin-top:4px">⚠ ' + c.sansGroupe + ' élève(s) sans groupe</div>' : '');
}
