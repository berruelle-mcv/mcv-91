// ================================================
//   LABORO Sport & Outdoor — État global, score, classement, utilitaires
//   Version 1.0 — Architecture modulaire
// ================================================



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
  const moy=done>0?Math.round(missions.filter(x=>x.status==='done'&&x.score).reduce((s,x)=>s+x.score,0)/done*10)/10:0;
  const isTerminale=classe.includes('Term');
  const sprintFinal=isTerminale&&m>=2; // mars à décembre en Terminale

  // ── Messages dynamiques selon progression ──
  // 1. Première connexion (aucune mission)
  if(done===0&&att===0){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:"Bienvenue dans l'équipe LABORO ! Je suis "+getResp().nom+", "+getResp().poste+". Ta première mission t'attend — lis bien la ressource avant de te lancer. C'est comme ça qu'on progresse ici."};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:"Bienvenue chez LABORO ! Je suis "+getTutrice().nom+", "+getTutrice().poste+". Ta première mission de terrain t'attend. Prends le temps de lire la ressource — sur le terrain, on n'a pas de filet !"};
    if(classe==='2nde') return{from:'Pascal Berruelle — PDG de LABORO',txt:"Bienvenue chez LABORO ! Je suis Pascal Berruelle, PDG de l'entreprise. Cette année tu vas découvrir nos métiers — la vente, la relation client, la gestion commerciale. Commence par explorer — lis bien la ressource avant chaque mission."};
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
    if(classe==='2nde') return{from:'Pascal Berruelle — PDG de LABORO',txt:`Ta moyenne est à ${moy}/20. Ce n'est pas une catastrophe, mais il faut se retrousser les manches. Lis bien les ressources avant chaque mission — elles contiennent les clés pour progresser.`};
  }

  // 4. Très bonne moyenne — féliciter
  if(done>=3&&moy>=15){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:`Excellente moyenne à ${moy}/20 ! C'est exactement le niveau qu'on attend d'un(e) conseiller(ère) de vente chez LABORO. Continue comme ça — les meilleures opportunités vont aux meilleurs. Bravo.`};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:`${moy}/20 de moyenne — impressionnant ! Un commercial avec ces résultats chez nous, on le garde. Tu prouves que travail et méthode paient. Continue sur cette lancée.`};
    if(classe==='2nde') return{from:'Pascal Berruelle — PDG de LABORO',txt:`Moyenne à ${moy}/20 — félicitations ! Tu montres déjà de vraies qualités professionnelles. Continue à t'investir comme ça.`};
  }

  // 5. Sprint final — Terminale après mars
  if(sprintFinal){
    if(classe.includes('AGEC')) return{from:getResp().nom+' — '+getResp().poste,txt:`On entre dans la dernière ligne droite ! Tes épreuves approchent. Tout ce qu'on a travaillé sur LABORO — merchandising, gestion des stocks, animation commerciale — c'est exactement ce qui sera évalué. Donne tout ce que tu as.`};
    if(classe.includes('PVOC')) return{from:getTutrice().nom+' — '+getTutrice().poste,txt:`La dernière ligne droite est devant toi. Tes missions de prospection, de scoring fournisseur, de suivi de devis — ce sont les situations que tu vas retrouver dans tes épreuves. Reste concentré(e) et confiant(e).`};
  }

  // 6. Messages par défaut selon période de l'année
  const msgs={
    '2nde':{from:'Pascal Berruelle — PDG de LABORO',textes:[
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
  // Consolider C2.1b → C2.1 et B4.x → G4B dans la grille compétences
  if(ud.competences){
    if(ud.competences['C2.1b']){
      ud.competences['C2.1']=Math.max(ud.competences['C2.1']||0,ud.competences['C2.1b']);
    }
    ['B4.1','B4.2','B4.3','B4.4','B4.5'].forEach(k=>{
      if(ud.competences[k]) ud.competences['G4B']=Math.max(ud.competences['G4B']||0,ud.competences[k]);
    });
  }
  return ud;
};
const sUD=d=>{const s=gS();s[CU.mail]=d;sS(s)};
const allU=()=>{const s=gS();const SYS=['ak','mdj','__ens_ob_done','demo@laboro-demo.fr'];return Object.keys(s).filter(k=>!SYS.includes(k)&&k.includes('@')&&!k.startsWith('_')).map(k=>({mail:k,...s[k]}))};
const getMDJ=()=>{try{return JSON.parse(localStorage.getItem('laboro_mdj')||'{}')}catch{return{}}};
const setMDJ=d=>localStorage.setItem('laboro_mdj',JSON.stringify(d));

// ═══ SCORE LABORO (60/20/20) ═══
function calcScore(ud){
  const ms=Object.values(ud.missions||{});
  const done=ms.filter(m=>m.status==='done'&&m.score);
  if(!done.length)return 0;
  // Composante 1 — moyenne pondérée 60%
  const coefs={'C1':3,'C2':2,'C3':3,'G4':4,'ACC':1};
  let sw=0,wt=0;
  done.forEach(m=>{
    const mis=MISSIONS.find(x=>x.id===m.id);
    if(!mis)return;
    const g=mis.comp.startsWith('C1')?'C1':mis.comp.startsWith('C2')?'C2':mis.comp.startsWith('C3')?'C3':mis.comp.startsWith('ACC')?'ACC':'G4';
    const c=coefs[g]||1;
    sw+=m.score*c;wt+=c*20;
  });
  const moyP=wt?sw/wt*60:0;
  // Composante 2 — régularité 20% (simulé : 2pts par mission soumise cette semaine, max 20)
  const reg=Math.min(done.length*2,20);
  // Composante 3 — progression 20% (amélioration entre tentatives, max 10)
  const prog=Math.min(ms.filter(m=>m.progression&&m.progression>0).reduce((a,m)=>a+m.progression,0),10);
  return Math.round(moyP+reg+prog);
}

// ═══ CLASSEMENT ═══
function getClassement(classe){
  const users=allU().filter(u=>u.mail&&!u.mail.includes('berruelle'));
  return users.map(u=>({nom:u.nom||u.mail,mail:u.mail,score:calcScore(u)})).sort((a,b)=>b.score-a.score);
}

