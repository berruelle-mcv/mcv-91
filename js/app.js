// ================================================
//   LABORO Sport & Outdoor — État global, score, classement, utilitaires
//   Version 1.0 — Architecture modulaire
// ================================================



// ═══ APPEL SERVEUR AVEC GESTION D'ERREUR FINE ═══
// Distingue proprement 3 cas d'échec, chacun avec un message utilisateur
// adapté, au lieu d'un unique catch générique :
//   - panne réseau (serveur injoignable, pas de connexion)
//   - erreur HTTP (le serveur a répondu mais avec un statut d'erreur)
//   - JSON invalide (le serveur a répondu 200 mais le corps n'est pas
//     du JSON exploitable — cas rare mais qui existait sans diagnostic clair)
// Utilisation : const {ok, data, erreur} = await fetchJSON(url, options);
// - ok===true  → data contient la réponse JSON du serveur
// - ok===false → erreur contient un message prêt à afficher à l'utilisateur
async function fetchJSON(url, options){
  let reponse;
  try{
    reponse = await fetch(url, options);
  }catch(e){
    console.error('fetchJSON — panne réseau :', url, e);
    return { ok:false, type:'reseau', erreur:'Impossible de joindre le serveur LABORO. Vérifie ta connexion internet.' };
  }
  let data;
  try{
    data = await reponse.json();
  }catch(e){
    console.error('fetchJSON — JSON invalide :', url, reponse.status, e);
    return { ok:false, type:'json', erreur:'Réponse inattendue du serveur LABORO (données invalides). Réessaie dans un instant.', status:reponse.status };
  }
  if(!reponse.ok){
    console.error('fetchJSON — erreur HTTP :', url, reponse.status, data);
    // Restriction horaire d'accès élèves : coupe l'accès partout, quel que soit l'appel en cours.
    if(reponse.status === 403 && data && data.erreur === 'ACCES_HORAIRE_BLOQUE' && typeof afficherBlocageHoraire === 'function'){
      afficherBlocageHoraire(data.message);
    }
    return { ok:false, type:'http', erreur:(data && data.erreur) || ('Erreur serveur (code '+reponse.status+').'), status:reponse.status, data };
  }
  return { ok:true, data, status:reponse.status };
}

// ═══ DONNÉES ═══
// Données chargées depuis les fichiers externes :
// - data/competences.js  (COMP, RES)
// - data/missions.js     (MISSIONS_*, MISSIONS)
// - data/catalogue.js    (PRODUITS, CLIENTS, IMPREVU)

function getMsg(classe,poste){
  const m=new Date().getMonth(); // 0=jan, 11=dec
  const ud=gUD();
  const missions=Object.values(ud.missions||{});
  const done=missions.filter(x=>x.status==='done').length;
  const att=missions.filter(x=>x.status==='att').length;
  const moy=done>0?Math.round(missions.filter(x=>x.status==='done'&&x.score!=null).reduce((s,x)=>s+x.score,0)/done*10)/10:0;
  const isTerminale=classe.includes('Term');
  const sprintFinal=isTerminale&&m>=2; // mars à décembre en Terminale

  // ── Messages dynamiques selon progression ──
  // 1. Première connexion (aucune mission)
  if(done===0&&att===0){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:"Bienvenue dans l'équipe LABORO ! Je suis "+getResp().nom+", "+getResp().poste+". Ta première mission t'attend — lis bien la ressource avant de te lancer. C'est comme ça qu'on progresse ici."};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:"Bienvenue chez LABORO ! Je suis "+getTutrice().nom+", "+getTutrice().poste+". Ta première mission de terrain t'attend. Prends le temps de lire la ressource — sur le terrain, on n'a pas de filet !"};
    if(classe==='2nde') return{from:getResp().nom+' — '+getResp().poste,txt:"Bienvenue chez LABORO ! Je suis "+getResp().nom+", "+getResp().poste+". Cette année tu vas découvrir nos métiers — la vente, la relation client, la gestion commerciale. Commence par explorer — lis bien la ressource avant chaque mission."};
  }

  // 2. Missions en attente de correction — encourager la patience
  if(att>=2){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:`Tu as ${att} mission(s) en attente de correction — c'est bien, tu avances ! En attendant les retours, profite pour relire tes réponses et voir ce que tu ferais différemment. C'est comme ça qu'on devient meilleur.`};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:`${att} missions en attente de validation — tu travailles bien ! Un bon commercial ne lâche jamais entre deux rendez-vous. Prépare la prochaine mission pendant que j'examine ton travail.`};
  }

  // 3. Moyenne faible — encourager sans décourager
  if(done>=3&&moy<10){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:`Ta moyenne est à ${moy}/20 pour l'instant. Ce n'est pas là où on veut être. Je te conseille de relire les ressources avant de répondre — elles contiennent tout ce qu'il faut. Tu peux le faire, j'en suis sûr(e).`};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:`Moyenne à ${moy}/20 — on peut mieux faire. Dans le commercial, les résultats comptent. Reprends les ressources, elles sont là pour toi. Un retournement de situation, ça arrive.`};
    if(classe==='2nde') return{from:getResp().nom+' — '+getResp().poste,txt:`Ta moyenne est à ${moy}/20. Ce n'est pas une catastrophe, mais il faut se retrousser les manches. Lis bien les ressources avant chaque mission — elles contiennent les clés pour progresser.`};
  }

  // 4. Très bonne moyenne — féliciter
  if(done>=3&&moy>=15){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:`Excellente moyenne à ${moy}/20 ! C'est exactement le niveau qu'on attend d'un(e) conseiller(ère) de vente chez LABORO. Continue comme ça — les meilleures opportunités vont aux meilleurs. Bravo.`};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:`${moy}/20 de moyenne — impressionnant ! Un commercial avec ces résultats chez nous, on le garde. Tu prouves que travail et méthode paient. Continue sur cette lancée.`};
    if(classe==='2nde') return{from:getResp().nom+' — '+getResp().poste,txt:`Moyenne à ${moy}/20 — félicitations ! Tu montres déjà de vraies qualités professionnelles. Continue à t'investir comme ça.`};
  }

  // 5. Sprint final — Terminale après mars
  if(sprintFinal){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:`On entre dans la dernière ligne droite ! Tes épreuves approchent. Tout ce qu'on a travaillé sur LABORO — merchandising, gestion des stocks, animation commerciale — c'est exactement ce qui sera évalué. Donne tout ce que tu as.`};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:`La dernière ligne droite est devant toi. Tes missions de prospection, de scoring fournisseur, de suivi de devis — ce sont les situations que tu vas retrouver dans tes épreuves. Reste concentré(e) et confiant(e).`};
  }

  // 6. Messages par défaut selon période de l'année
  const msgs={
    '2nde':{from:getResp().nom+' — '+getResp().poste,textes:[
      {debut:0,fin:1,txt:"Bienvenue chez LABORO ! Commence par explorer — lis bien la ressource avant chaque mission."},
      {debut:2,fin:4,txt:"Tu pars bientôt en stage. Sois curieux(se), observe comment l'entreprise fonctionne. Compare avec ce qu'on fait ici."},
      {debut:5,fin:7,txt:"Bienvenue de retour ! Reprends LABORO avec ton nouveau regard professionnel."},
      {debut:8,fin:11,txt:"Belle première année ! Tu repars avec de vraies bases professionnelles. Bonnes vacances !"},
    ]},
    'AGEC':{from:getResp().nom+' — '+getResp().poste,textes:[
      {debut:0,fin:2,txt:"Bonne semaine ! Chaque mission que tu fais sur LABORO te rapproche du niveau attendu en épreuve. Continue."},
      {debut:3,fin:5,txt:"Tu pars bientôt en stage. Observe comment le conseil et la vente se passent dans ton entreprise — compare avec LABORO."},
      {debut:6,fin:8,txt:"Content(e) de te retrouver ! Reprends LABORO là où tu t'étais arrêté(e)."},
      {debut:9,fin:11,txt:`${done} missions validées cette année — du bon travail. Profite de l'été pour consolider.`},
    ]},
    'PVOC':{from:getTutrice().nom+' — '+getTutrice().poste,textes:[
      {debut:0,fin:2,txt:"La prospection c'est un métier qui s'apprend. Chaque mission LABORO te donne des outils concrets. Continue."},
      {debut:3,fin:5,txt:"Bientôt le stage — mets en pratique les techniques de prospection qu'on a travaillées ensemble."},
      {debut:6,fin:8,txt:"Bon retour de stage ! Reprends la prospection — la constance fait les grands commerciaux."},
      {debut:9,fin:11,txt:"Fin d'année approche. Tu pars avec des méthodes solides. Continue à les appliquer."},
    ]},
    'Term':{from:getResp().nom+' — '+getResp().poste,textes:[
      {debut:0,fin:11,txt:`${done} missions validées. Maintenant c'est la régularité qui fait la différence. Continue à avancer.`},
    ]},
    'ens':{from:'LABORO — Plateforme pédagogique',textes:[
      {debut:0,fin:11,txt:"Bienvenue M. Berruelle. Consultez la vue classe pour suivre vos élèves, valider les missions en attente et générer les analyses de classe."},
    ]},
  };

  let key='2nde';
  if(classe==='enseignant')key='ens';
  else if(classe.includes('Term'))key=classe.includes('AGEC')?'AGEC':'PVOC';
  else if(classe.includes('AGEC'))key='AGEC';
  else if(classe.includes('PVOC'))key='PVOC';
  const cfg=msgs[key];
  const txt=cfg.textes.find(t=>m>=t.debut&&m<=t.fin)||cfg.textes[cfg.textes.length-1];
  return{from:cfg.from,txt:txt.txt};
}

// ═══ ÉTAT ═══
let CU=null,CM=null,obStep=0,repBuffer={},classeFiltre='';
// ── Accès config filière (depuis config.json chargé au démarrage)
const getCfg = () => LABORO_CONFIG || {};
const getNomEntreprise = () => (getCfg().entreprise || {}).nom || 'LABORO Sport & Outdoor';
const getVille = () => (getCfg().entreprise || {}).ville || 'Évry-Courcouronnes';
const getResp = () => {
  const r = (getCfg().personnages || {}).responsable || {};
  return { nom: (r.prenom||'Romain')+' '+(r.nom||'Sauzet'), poste: r.poste||'Resp. Commerce & Showroom' };
};
const getTutrice = () => {
  const t = (getCfg().personnages || {}).tutrice || {};
  return { nom: (t.prenom||'Nina')+' '+(t.nom||'Chevalier'), poste: t.poste||'Commerciale B2B' };
};

const gS=()=>{try{return JSON.parse(localStorage.getItem('laboro_s')||'{}')}catch{return{}}};
const sS=d=>localStorage.setItem('laboro_s',JSON.stringify(d));
const gUD=()=>{
  const s=gS();
  if(!s[CU.mail])s[CU.mail]={missions:{},competences:{},notes:{}};
  const ud=s[CU.mail];
  // Mémoriser la classe de l'utilisateur courant dans ses données
  // (nécessaire pour filtrer le classement par classe).
  if(CU.classe && ud.classe !== CU.classe){ ud.classe = CU.classe; }
  // Consolider C2.1b → C2.1 et B4.x → G4B dans la grille compétences
  if(ud.competences){
    if(ud.competences['C2.1b']){
      ud.competences['C2.1']=Math.max(ud.competences['C2.1']||0,ud.competences['C2.1b']);
    }
    ['B4.1','B4.2','B4.3','B4.4','B4.5'].forEach(k=>{
      if(ud.competences[k]) ud.competences['G4B']=Math.max(ud.competences['G4B']||0,ud.competences[k]);
    });
    // Consolider C4A.1/C4A.2/C4A.3 → G4A dans la grille compétences (miroir de B4.x → G4B)
    ['C4A.1','C4A.2','C4A.3'].forEach(k=>{
      if(ud.competences[k]) ud.competences['G4A']=Math.max(ud.competences['G4A']||0,ud.competences[k]);
    });
  }
  return ud;
};
const sUD=d=>{const s=gS();s[CU.mail]=d;sS(s)};
const allU=()=>{
  const s=gS();
  const enDemo = CU && CU.mail && CU.mail.indexOf('@laboro-demo.fr')>=0;
  const SYS=['ak','mdj','__ens_ob_done'];
  // Comptes techniques toujours exclus du classement
  const EXCL=['test@laboro-test.fr','ana@laboro-test.fr','pascal@laboro.fr','eleve.test@laboro-demo.fr'];
  return Object.keys(s)
    .filter(k=>!SYS.includes(k) && !EXCL.includes(k) && k.includes('@') && !k.startsWith('_'))
    .filter(k=>{
      const estDemo = k.indexOf('@laboro-demo.fr')>=0;
      // En mode démo : ne garder QUE les comptes démo. Hors démo : exclure les comptes démo.
      return enDemo ? estDemo : !estDemo;
    })
    .map(k=>({mail:k,...s[k]}));
};

const getMDJ=()=>{try{return JSON.parse(localStorage.getItem('laboro_mdj')||'{}')}catch{return{}}};
const setMDJ=d=>localStorage.setItem('laboro_mdj',JSON.stringify(d));

// ═══ SCORE LABORO (70 qualité / 30 engagement) — validé par Pascal le 25/09/2026 ═══
// Calculé UNIQUEMENT à partir des missions validées et de leur note, pour que
// l'élève et la Vue classe (données serveur) affichent toujours le même chiffre.
//   • Qualité  /70 : moyenne des notes, pondérée par bloc de compétences, ramenée sur 70
//   • Engagement /30 : 3 pts par mission validée, plafonné à 10 missions
// (L'ancien bonus "progression" est supprimé : il n'existait que dans le navigateur
//  de l'élève et valait +10 dès la 1re soumission — cause de l'écart élève / Vue classe.)
const SCORE_PTS_PAR_MISSION = 3, SCORE_MISSIONS_MAX = 10;
function calcScoreDetail(ud){
  const ms=Object.values((ud&&ud.missions)||{});
  const done=ms.filter(m=>m.status==='done'&&m.score!=null);
  const coefs={'C1':3,'C2':2,'C3':3,'G4':4,'ACC':1};
  let sw=0,wt=0,nb=0;
  done.forEach(m=>{
    const mis=MISSIONS.find(x=>x.id===m.id);
    if(!mis)return;
    const g=mis.comp.startsWith('C1')?'C1':mis.comp.startsWith('C2')?'C2':mis.comp.startsWith('C3')?'C3':mis.comp.startsWith('ACC')?'ACC':'G4';
    const c=coefs[g]||1;
    sw+=m.score*c;wt+=c;nb++;
  });
  const moyenne=wt?sw/wt:0;                                   // moyenne pondérée /20
  const qualite=Math.round(moyenne/20*70);                    // /70
  const engagement=Math.min(nb,SCORE_MISSIONS_MAX)*SCORE_PTS_PAR_MISSION; // /30
  return {total:qualite+engagement, qualite, engagement, moyenne, nb};
}
function calcScore(ud){ return calcScoreDetail(ud).total; }

// ═══ CLASSEMENT ═══
// Classement filtré PAR CLASSE : un élève ne voit que les élèves de sa propre classe.
// La classe de chaque user est lue depuis ses données stockées (u.classe).
// L'utilisateur courant (CU) est toujours rattaché à CU.classe.
// ═══ CLASSEMENT SERVEUR (comptes connectés au backend) ═══
// Le calcul du score reste 100% client (calcScore), seules les données brutes
// des progressions de chaque élève de la classe viennent du serveur — évite
// de dupliquer la logique de notation côté backend.
let CLASSEMENT_CACHE = {};
let CLASSEMENT_META = {};

async function refreshClassementServeur(classe){
  const token = localStorage.getItem('laboro_token');
  if(!token || !classe || classe==='enseignant') return;
  const meta = CLASSEMENT_META[classe] || (CLASSEMENT_META[classe] = {lastFetch:0, fetching:false});
  if(meta.fetching) return;
  if(Date.now() - meta.lastFetch < 15000) return; // évite de spammer le serveur
  meta.fetching = true;
  // Le serveur détermine la classe réelle de l'élève connecté à partir de son jeton
  // (et non du code générique niveau-option) : évite toute ambiguïté si 2 classes
  // partagent le même niveau/option (ex: 2 groupes de 2nde attribués à 2 enseignants).
  const r = await fetchJSON(LABORO_API + '/api/classement/moi', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  meta.fetching = false;
  meta.lastFetch = Date.now();
  if(!r.ok || !r.data.ok) return;
  const list = (r.data.eleves||[]).map(function(e){
    const missions = {};
    Object.entries(e.missions || {}).forEach(function(entry){
      const mid = entry[0], p = entry[1];
      missions[mid] = {
        id: mid, // requis par calcScore() pour retrouver la mission (comp, coefficient) dans MISSIONS
        status: p.statut === 'valide' ? 'done' : (p.statut === 'a_examiner' || p.statut === 'soumis' ? 'att' : 'wip'),
        score: p.score
      };
    });
    const ud = { missions: missions };
    return { nom: ((e.prenom?e.prenom+' ':'')+e.nom).trim(), mail: e.email, score: calcScore(ud), classe: classe };
  }).sort(function(a,b){ return b.score - a.score; });
  const changed = JSON.stringify(list) !== JSON.stringify(CLASSEMENT_CACHE[classe]);
  CLASSEMENT_CACHE[classe] = list;
  if(changed && typeof renderDashboard==='function'){
    const dp = document.getElementById('panel-dashboard');
    if(dp && dp.classList.contains('on')) renderDashboard();
  }
}

function getClassement(classe){
  const token = localStorage.getItem('laboro_token');
  if(token && classe && classe!=='enseignant'){
    refreshClassementServeur(classe); // rafraîchit en arrière-plan (throttlé)
    return CLASSEMENT_CACHE[classe] || [];
  }
  // Ancien comportement local (comptes de test non connectés au serveur)
  const users = allU().filter(u => u.mail && !u.mail.includes('berruelle'));
  return users
    .map(u => {
      // Classe de cet utilisateur : stockée dans ses données, ou CU.classe si c'est l'utilisateur courant
      const uClasse = u.classe || (CU && u.mail === CU.mail ? CU.classe : null);
      return { nom: u.nom || u.mail, mail: u.mail, score: calcScore(u), classe: uClasse };
    })
    // Ne garder que les élèves de la même classe (si une classe est demandée)
    .filter(u => !classe || u.classe === classe)
    .sort((a, b) => b.score - a.score);
}

// ═══ FILTRE COMPÉTENCES — adapté à la classe de l'élève ═══
// Appelée à chaque renderMissions() pour adapter le menu aux compétences accessibles.
// Règles :
//   - 2nde          : C1, C2, C3, ACC uniquement (pas de bloc 4)
//   - 1ère/Term AGEC : C1, C2, C3, C4A (Espace commercial), ACC
//   - 1ère/Term PVOC : C1, C2, C3, B4/G4B (Prospection B2B), ACC
//   - Enseignant     : tout afficher
function updateFiltreComp() {
  const sel = document.getElementById('f-comp');
  if (!sel || !CU) return;
  const cls = CU.classe || '';
  const isAGEC = cls.includes('AGEC');
  const isPVOC = cls.includes('PVOC');
  const is2nde = cls === '2nde';
  const isEns  = cls === 'enseignant';

  // Définition des options selon le profil
  const optionsCommunes = [
    { v: '',    l: 'Toutes compétences' },
    { v: 'C1',  l: 'C1 — Conseiller & vendre' },
    { v: 'C2',  l: 'C2 — Suivre la commande' },
    { v: 'C3',  l: 'C3 — Fidéliser' },
  ];
  const optionAGEC  = { v: 'C4A', l: 'C4A — Espace commercial (AGEC)' };
  const optionPVOC  = { v: 'B4',  l: 'B4 — Prospection B2B (PVOC)' };
  const optionACC   = { v: 'ACC', l: 'Accueil — Seconde' };

  let options = [...optionsCommunes];
  if (is2nde)         { options.push(optionACC); }
  if (isAGEC)         { options.push(optionAGEC); }
  if (isPVOC)         { options.push(optionPVOC); }
  if (isEns)          { options.push(optionAGEC, optionPVOC, optionACC); }

  // Mémoriser la valeur courante avant de reconstruire
  const current = sel.value;
  sel.innerHTML = options
    .map(o => `<option value="${o.v}"${o.v === current ? ' selected' : ''}>${o.l}</option>`)
    .join('');
}
