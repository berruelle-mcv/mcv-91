// ================================================
//   LABORO Sport & Outdoor — Dashboard élève/enseignant, actualités, indicateurs
//   Version 1.0 — Architecture modulaire
// ================================================

// ═══ DASHBOARD ═══

// ═══ ACTUALITÉS LABORO ═══
const ACTUS_LABORO=[
  {date:'Lun',icon:'📦',titre:'Réception commande',txt:'50 ballons Nike Strike T5 et 30 chasubles x10 reçus en entrepôt. Mise en rayon prévue demain.'},
  {date:'Lun',icon:'📞',titre:'Prospect à rappeler',txt:'M. Dubois (CE Renault Évry) a demandé un devis pour 20 maillots personnalisés. Romain Sauzet prend en charge.'},
  {date:'Mar',icon:'🎯',titre:'Objectif semaine',txt:'Objectif : 8 500 € de CA cette semaine. À J+1 : 3 240 € réalisés. Bonne dynamique sur le rayon chaussures.'},
  {date:'Mar',icon:'⚠️',titre:'Stock critique',txt:'Sneakers Nike Air Max SC taille 42 : 2 unités restantes. Commande fournisseur en cours — délai 5 jours.'},
  {date:'Mer',icon:'🤝',titre:'Visite client B2B',txt:'Isabelle Faure (CE PSA Stellantis) visite le showroom à 14h. Préparer la salle de réunion et le catalogue B2B.'},
  {date:'Mer',icon:'📊',titre:'Bilan mi-semaine',txt:'4 réclamations traitées, taux de satisfaction 94%. Bravo a tous !'},
  {date:'Jeu',icon:'🚀',titre:'Nouvelle collection',txt:'Arrivée de la collection été : shorts 2en1, t-shirts techniques et coupe-vents légers. Étiquetage en cours.'},
  {date:'Jeu',icon:'📱',titre:'Avis Google',txt:'3 nouveaux avis cette semaine : 2 × 5 étoiles, 1 × 3 étoiles. Sophie Blanc gère les réponses.'},
  {date:'Ven',icon:'🏆',titre:'Résultats semaine',txt:'CA semaine : 9 120 € — objectif dépassé ! Top vendeur : Marco Pellini avec 2 340 € de ventes perso.'},
  {date:'Ven',icon:'📅',titre:'Planning semaine prochaine',txt:'Réunion équipe lundi 9h. Formation e-commerce mercredi. Inventaire partiel vendredi après-midi.'},
  {date:'Sam',icon:'🎉',titre:'Soirée fidélisation',txt:'La soirée clients du mois dernier a généré 4 200 € de commandes. 18 clients présents, 12 ont repassé commande.'},
  {date:'Sam',icon:'💡',titre:'Idée du moment',txt:'Nina Chevalier propose un pack rentrée sportive : basket + t-shirt + gourde. Réflexion en cours.'},
];

function getActusDuJour(){
  const jours=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  const today=jours[new Date().getDay()];
  const filtered=ACTUS_LABORO.filter(a=>a.date===today);
  // Si pas d'actu pour aujourd'hui, prendre les 2 premières
  return filtered.length>0?filtered.slice(0,3):ACTUS_LABORO.slice(0,2);
}

function getIndicateursLive(ud){
  const missions=Object.values(ud.missions||{});
  const done=missions.filter(m=>m.status==='done').length;
  const wip=missions.filter(m=>m.status==='wip').length;
  const score=calcScore(ud);
  // Stock critique simulé selon le jour
  const stocks=[
    {ref:'Nike Air Max SC T42',qty:2},
    {ref:'Ballon foot Nike T5',qty:5},
    {ref:'Tapis yoga 6mm',qty:3},
  ];
  const stockCritique=stocks[new Date().getDay()%stocks.length];
  return {done,wip,score,stockCritique};
}

// ═══ ACTUALITÉS LABORO ═══


function setAccentColor(classe){
  const colors = {
    '2nde':      {c1:'#2D5282', cf:'#1A3A6E', cm:'#BEE3F8', cb:'#EBF4FF'},
    '1ere-AGEC': {c1:'#185FA5', cf:'#0C447C', cm:'#B5D4F4', cb:'#E6F1FB'},
    '1ere-PVOC': {c1:'#185FA5', cf:'#0C447C', cm:'#B5D4F4', cb:'#E6F1FB'},
    'Term-AGEC': {c1:'#7B2D42', cf:'#5A1F30', cm:'#E8AABF', cb:'#F9E8EE'},
    'Term-PVOC': {c1:'#7B2D42', cf:'#5A1F30', cm:'#E8AABF', cb:'#F9E8EE'},
    'enseignant':{c1:'#2C2C2A', cf:'#1a1a18', cm:'#888780', cb:'#F1EFE8'}
  };
  const c = colors[classe] || colors['1ere-AGEC'];
  const r = document.documentElement;
  r.style.setProperty('--ac1', c.c1);
  r.style.setProperty('--bl',  c.c1);
  r.style.setProperty('--bf',  c.cf);
  r.style.setProperty('--bm',  c.cm);
  const badge = document.getElementById('tb-lvl');
  const labels = {'2nde':'2nde Pro','1ere-AGEC':'1ère AGEC','1ere-PVOC':'1ère PVOC','Term-AGEC':'Term. AGEC','Term-PVOC':'Term. PVOC','enseignant':'Enseignant'};
  if(badge){ badge.textContent = labels[classe]||classe; badge.style.background = c.c1; badge.style.color = '#fff'; badge.style.fontWeight = '700'; badge.style.letterSpacing = '.03em'; }
}


function renderPosteCard(){
  const el = document.getElementById('poste-card');
  if(!el || !CU) return;
  el.innerHTML = '<div style="font-size:11px;font-weight:700;color:var(--gm);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Mon poste</div>'
    + '<div style="font-size:14px;font-weight:800;color:var(--t1)">' + (CU.poste||'Collaborateur') + '</div>'
    + '<div style="font-size:11px;color:var(--gm);margin-top:2px">' + (CU.classe||'') + '</div>';
}

function renderCCFDashboard(){
  const el = document.getElementById('ccf-dash');
  if(!el || !CU) return;
  const ud = gUD();
  const done = Object.values(ud.missions||{}).filter(function(m){ return m.status==='done'; });
  const comps = COMP.filter(function(c){ return calcNiveauComp(c.code, ud) >= 3; });
  el.innerHTML = '<div style="display:flex;gap:12px;flex-wrap:wrap">'
    + '<div style="background:var(--vc,#D1FAE5);border-radius:8px;padding:10px 14px;text-align:center">'
    + '<div style="font-size:20px;font-weight:800;color:var(--vt,#065F46)">' + done.length + '</div>'
    + '<div class="u-label-sm">Missions validées</div></div>'
    + '<div style="background:var(--bc,#EBF4FF);border-radius:8px;padding:10px 14px;text-align:center">'
    + '<div style="font-size:20px;font-weight:800;color:var(--bl)">' + comps.length + '</div>'
    + '<div class="u-label-sm">Compétences acquises</div></div>'
    + '</div>';
}

function renderDashboard(){
  if(!CU)return;
  const ud=gUD();
  const sc=calcScore(ud);
  document.getElementById('wb-b').textContent='Bonjour '+CU.nom.split(' ')[0]+' !';
  renderPosteCard();
  // Rafraîchir le message du responsable selon la progression
  const msgDyn=getMsg(CU.classe,CU.poste);
  const msgFromEl=document.getElementById('msg-f');
  if(msgFromEl){
    const initials=msgDyn.from.split(' ').slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();
    msgFromEl.innerHTML='<span style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#0A2540,#185FA5);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;box-shadow:0 2px 6px rgba(10,37,64,.3)">'+initials+'</span>'
      +'<span>'+msgDyn.from+'</span>';
  }
  document.getElementById('msg-t').textContent=msgDyn.txt;
  // Titre section message adapté
  const msgTitle = document.querySelector('.card-title, [data-msg-title]');
  const msgSection = document.getElementById('msg-section-title');
  if(msgSection) msgSection.textContent = CU.classe==='enseignant' ? 'ESPACE ENSEIGNANT' : 'MESSAGE DE TON RESPONSABLE';
  const wbp = document.getElementById('wb-p');
  if(wbp) wbp.textContent = CU.poste || '';
  // Score et palier — masqués pour l'enseignant
  const wbs = document.getElementById('wb-s');
  const wbr = document.querySelector('.wb-r');
  if(CU.classe === 'enseignant'){
    if(wbr) wbr.style.display = 'none';
  } else {
    const msDone = Object.values(gUD().missions||{}).filter(function(m){ return m.status==='done'; }).length;
    if(wbr) wbr.style.display = '';
    if(wbs){
      if(msDone === 0){
        // Aucune mission complétée — masquer le chiffre, afficher une invitation
        wbs.textContent = '—';
        const smEl = wbr ? wbr.querySelector('.sm') : null;
        if(smEl) smEl.textContent = 'Lance ta première mission !';
      } else {
        wbs.textContent = sc!==null&&sc!==undefined?sc:0;
        const smEl = wbr ? wbr.querySelector('.sm') : null;
        if(smEl) smEl.textContent = 'Score LABORO /100';
      }
    }
  }
  // Afficher le palier
  const palierEl=document.getElementById('wb-palier');
  if(palierEl){
    const isAgec = CU.classe && CU.classe.toUpperCase().includes('AGEC');
    const isPvoc = CU.classe && CU.classe.toUpperCase().includes('PVOC');
    const paliersAgec = [
      {min:0,  max:24,  label:'Nouveau collaborateur', emoji:'🌱'},
      {min:25, max:49,  label:'Équipier commercial',   emoji:'📋'},
      {min:50, max:74,  label:'Conseiller de vente',   emoji:'💼'},
      {min:75, max:89,  label:'Animateur commercial',  emoji:'🏆'},
      {min:90, max:100, label:'Expert LABORO',         emoji:'⭐'}
    ];
    const paliersPvoc = [
      {min:0,  max:24,  label:'Nouveau collaborateur', emoji:'🌱'},
      {min:25, max:49,  label:'Chargé de prospection', emoji:'📋'},
      {min:50, max:74,  label:'Commercial terrain',    emoji:'💼'},
      {min:75, max:89,  label:'Négociateur confirmé',  emoji:'🏆'},
      {min:90, max:100, label:'Expert LABORO',         emoji:'⭐'}
    ];
    const paliersNeutres = [
      {min:0,  max:24,  label:'Nouveau collaborateur', emoji:'🌱'},
      {min:25, max:49,  label:'Équipier commercial',   emoji:'📋'},
      {min:50, max:74,  label:'Conseiller de vente',   emoji:'💼'},
      {min:75, max:89,  label:'Commercial confirmé',   emoji:'🏆'},
      {min:90, max:100, label:'Expert LABORO',         emoji:'⭐'}
    ];
    const paliers = isPvoc ? paliersPvoc : isAgec ? paliersAgec : paliersNeutres;
    const score=sc||0;
    const palier=paliers.find(function(p){ return score>=p.min&&score<=p.max; })||paliers[0];
    if(CU.classe !== 'enseignant') palierEl.textContent=palier.emoji+' '+palier.label;
    else palierEl.style.display='none';
  }
  // Afficher le rang dans la classe
  const rankEl=document.getElementById('wb-rank');
  if(rankEl){
    const cltRank=getClassement(CU.classe);
    const myIdx=cltRank.findIndex(function(u){ return u.mail===CU.mail; });
    if(myIdx>=0&&cltRank.length>1){
      rankEl.textContent='#'+(myIdx+1)+' sur '+cltRank.length+' dans ta classe';
    }
  }
  // Employé du mois
  const empW=document.getElementById('emp-wrap');
  const clt=getClassement(CU.classe);
  const now=new Date();
  if(clt.length>0&&now.getDate()<=7){
    const emp=clt[0];
    empW.innerHTML=`<div class="emp-mois"><div class="emp-ico">🏆</div><div><div class="emp-t">Employé du mois — ${now.toLocaleString('fr-FR',{month:'long'})}</div><div class="emp-n">${emp.nom}</div><div class="emp-s">Score LABORO : ${emp.score}/100</div></div></div>`;
  }else empW.innerHTML='';
  // Classement dans le dashboard
  const cltDash=document.getElementById('clt-dash');
  if(cltDash && clt.length>0){
    const medals=['🥇','🥈','🥉'];
    const myIdx=clt.findIndex(function(u){ return u.mail===CU.mail; });
    const myRank=myIdx>=0?myIdx+1:null;
    const top3=clt.slice(0,3);
    // Podium
    let podHtml='<div class="podium" style="display:flex;gap:8px;justify-content:center;margin-bottom:12px">';
    // Ordre podium : 2ème, 1er, 3ème
    const podOrder = top3.length>=3 ? [top3[1],top3[0],top3[2]] : top3.length===2 ? [top3[1],top3[0]] : [top3[0]];
    const podStyles = top3.length>=3 ? [
      {rank:2,medal:'🥈',height:'70px',bg:'linear-gradient(135deg,#ECEFF1,#CFD8DC)',border:'#90A4AE'},
      {rank:1,medal:'🥇',height:'90px',bg:'linear-gradient(135deg,#FFF9C4,#FFF176)',border:'#F9A825'},
      {rank:3,medal:'🥉',height:'56px',bg:'linear-gradient(135deg,#FFE0B2,#FFCC80)',border:'#FF8F00'}
    ] : [{rank:1,medal:'🥇',height:'80px',bg:'linear-gradient(135deg,#FFF9C4,#FFF176)',border:'#F9A825'}];
    podOrder.forEach(function(u,i){
      if(!u) return;
      const ps=podStyles[i]||podStyles[0];
      const isMe=u.mail===CU.mail;
      podHtml+='<div style="text-align:center;flex:1;max-width:90px">'
        +'<div style="font-size:11px;font-weight:700;color:#1A2E4A;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+(isMe?'<strong>'+u.nom.split(' ')[0]+'</strong>':u.nom.split(' ')[0])+'</div>'
        +'<div style="background:'+ps.bg+';border:1.5px solid '+ps.border+';border-radius:10px;height:'+ps.height+';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px'+(isMe?';box-shadow:0 0 0 2px var(--bl)':'')+';">'
        +'<div style="font-size:20px">'+ps.medal+'</div>'
        +'<div style="font-size:14px;font-weight:900;color:#1A2E4A">'+u.score+'</div>'
        +'<div style="font-size:8px;color:#6B7280">pts</div>'
        +'</div></div>';
    });
    podHtml+='</div>';
    // Liste complète (max 8)
    let listHtml='<div style="display:flex;flex-direction:column;gap:4px">';
    clt.slice(0,8).forEach(function(u,i){
      const isMe=u.mail===CU.mail;
      const rankMedal=i<3?medals[i]:(i+1)+'';
      listHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:8px;'+(isMe?'background:var(--ac1b,#EBF4FF);font-weight:700':'background:transparent')+'">'
        +'<span style="width:22px;text-align:center;font-size:'+(i<3?'14':'11')+'px;flex-shrink:0">'+rankMedal+'</span>'
        +'<span style="flex:1;font-size:12px;color:#1A2E4A;'+(isMe?'font-weight:800':'')+'white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+u.nom.split(' ')[0]+'</span>'
        +'<span style="font-size:11px;font-weight:800;color:var(--bl)">'+u.score+'</span>'
        +'</div>';
    });
    listHtml+='</div>';
    // Mon rang si hors top 8
    if(myRank && myRank>8){
      listHtml+='<div style="font-size:10px;color:var(--gm);text-align:center;margin-top:6px;padding-top:6px;border-top:1px solid var(--gb)">Ton rang : #'+myRank+' · '+clt[myIdx].score+' pts</div>';
    }
    cltDash.innerHTML=podHtml+listHtml;
  } else if(cltDash){
    cltDash.innerHTML='<div style="text-align:center;padding:20px 12px">'
      +'<div style="font-size:24px;margin-bottom:8px">🏆</div>'
      +'<div style="font-size:12px;font-weight:700;color:var(--gr);margin-bottom:4px">Le classement se construit au fil des missions</div>'
      +'<div style="font-size:11px;color:var(--gm);margin-bottom:12px">Complète ta première mission pour apparaître ici.</div>'
      +'<button onclick="goP('missions',document.querySelector('.ni[onclick*=missions]'))" style="padding:8px 18px;background:linear-gradient(135deg,#0A2540,#185FA5);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">Voir mes missions →</button>'
      +'</div>';
  }
  // Progression
  const lc=['var(--gb)','#85B7EB','var(--bl)','var(--vt)','#27500A'];
  const niveauLabels2=['—','Découverte','En cours','Acquis','Maîtrisé'];
  const niveauCols2=['var(--gb)','#63B3ED','#4A6FA5','#2D5282','#0A2540'];
  document.getElementById('dash-prog').innerHTML=COMP.slice(0,6).map(function(c){
    const lv=calcNiveauComp(c.code,ud);
    return '<div class="u-mb8">'
      +'<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">'
      +'<span>'+compBadge(c.code)+'</span>'
      +'<span style="font-weight:700;color:'+niveauCols2[lv]+'">'+niveauLabels2[lv]+'</span>'
      +'</div>'
      +'<div style="background:#E2E8F0;border-radius:6px;height:8px;overflow:hidden">'
      +'<div style="height:100%;width:'+(lv*25)+'%;background:'+niveauCols2[lv]+';border-radius:6px;transition:width .4s"></div>'
      +'</div></div>';
  }).join('');
  renderActus();
  renderIndicateurs();
  renderCCFDashboard();

  // Missions récentes
  const allDoneMissions = Object.entries(ud.missions||{}).filter(function(e){ return e[1].status==='done'; });
  const rec = allDoneMissions.slice(-3).reverse();
  const recEl = document.getElementById('dash-rec');
  if(recEl){
    if(rec.length){
      recEl.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px">'
        + rec.map(function(entry){
            const mid = entry[0]; const v = entry[1];
            const m = MISSIONS.find(function(x){ return x.id===mid; });
            if(!m) return '';
            const palierColors = ['','#4A6FA5','#2D5282','#185FA5','#7B2FBE'];
            const pCol = palierColors[m.palier] || '#4A6FA5';
            const scoreColor = v.score>=14 ? '#185FA5' : v.score>=11 ? '#D97706' : '#C53030';
            return '<div style="display:flex;align-items:center;gap:10px;padding:8px;background:#F8FAFF;border-radius:10px;border-left:3px solid '+pCol+'">'
              + '<div class="u-flex-1">'
              + '<div style="font-size:12px;font-weight:700;color:#1A2E4A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+m.titre+'</div>'
              + '<div style="font-size:10px;color:#6B7280;margin-top:2px">'+compBadge(m.comp)+'</div>'
              + '</div>'
              + '<div style="font-size:16px;font-weight:900;color:'+scoreColor+'">'+v.score+'<span style="font-size:10px;color:#9CA3AF">/20</span></div>'
              + '</div>';
          }).join('')
        + '</div>';
    } else {
      recEl.innerHTML = '<div style="text-align:center;padding:20px 12px">'
        + '<div style="font-size:24px;margin-bottom:8px">🚀</div>'
        + '<div style="font-size:12px;font-weight:700;color:var(--gr);margin-bottom:4px">Prêt(e) pour ta première mission ?</div>'
        + '<div style="font-size:11px;color:var(--gm);margin-bottom:12px">Lis la ressource, réponds aux questions, progresse.</div>'
        + '<button onclick="goP('missions',document.querySelector('.ni[onclick*=missions]'))" style="padding:8px 18px;background:linear-gradient(135deg,#0A2540,#185FA5);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">Lancer ma première mission →</button>'
        + '</div>';
    }
  }
}

function renderActus(){
  const el = document.getElementById('actu-wrap');
  if(!el) return;
  const ud = gUD();
  const done = Object.values(ud.missions||{}).filter(function(m){ return m.status==='done'; });
  const score = calcScore(ud);
  const now = new Date();
  const day = now.getDay(); // 0=dim, 1=lun...
  const month = now.getMonth();

  // Actualités du jour selon le jour de la semaine
  const dayNames = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']; // getDay() retourne 0=Dim, 1=Lun... 6=Sam
  const todayName = dayNames[day] || 'Lun';
  const todayActus = ACTUS_LABORO.filter(function(a){ return a.date === todayName; });
  const displayActus = todayActus.length > 0 ? todayActus : ACTUS_LABORO.slice(0,2);

  // Message personnalisé selon progression
  const persoMsg = score >= 80
    ? {icon:'🏆', titre:'Excellent travail !', texte:'Ton score LABORO est dans le top 10%. Romain Sauzet a note ta progression — continue ainsi !', color:'#EBF4FF', border:'#185FA5'}
    : done.length === 0
    ? {icon:'🚀', titre:'Bienvenue chez LABORO !', texte:'Ta premiere mission t attend. Lis bien la ressource avant de repondre — elle contient tout ce qu il faut savoir.', color:'#FEF3C7', border:'#D97706'}
    : done.length < 5
    ? {icon:'💪', titre:'Bonne lancee !', texte:'Tu as complete '+done.length+' mission(s). Chaque mission validee fait progresser tes competences CCF.', color:'#EBF4FF', border:'#4A6FA5'}
    : {icon:'⭐', titre:'Progression solide', texte:done.length+' missions completees. Ton dossier CCF se construit automatiquement. Vise le niveau Professionnel competent !', color:'#EDE9FE', border:'#7B2FBE'};

  // Agenda mensuel
  const agendas = [
    'Inventaire annuel du showroom cette semaine.',
    'Salon ISPO Munich — LABORO y participe.',
    'Operation Printemps — -15% sur les chaussures trail.',
    'Semaine du sport scolaire — LABORO partenaire.',
    'Collections ete Running et Fitness disponibles.',
    'Forum associations sportives de l Essonne.',
    'Bilan semestriel LABORO — resultats communiques.',
    'Rentree sportive — promotions clubs en cours.',
    'Rentree scolaire — LABORO equipe les lycees pro.',
    'Salon Mondial du Sport Paris — octobre.',
    'Black Friday LABORO — -20% sur tout le catalogue.',
    'Cadeaux entreprise et CE — commandes ouvertes.'
  ];

  const items = [persoMsg].concat(
    displayActus.slice(0,1).map(function(a){
      return {icon:a.icon, titre:a.titre, texte:a.txt, color:'#F8FAFF', border:'#CBD5E0'};
    })
  ).concat([
    {icon:'📅', titre:'Agenda LABORO', texte:agendas[month], color:'#F0F4FF', border:'#4A6FA5'}
  ]);

  el.innerHTML = items.map(function(a){
    return '<div style="background:'+a.color+';border-left:3px solid '+a.border+';border-radius:10px;padding:10px 12px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">'
      + '<span style="font-size:18px;flex-shrink:0">'+a.icon+'</span>'
      + '<div><div style="font-size:11px;font-weight:800;color:#1A2E4A;margin-bottom:2px">'+a.titre+'</div>'
      + '<div style="font-size:11px;color:#4B5563;line-height:1.5">'+a.texte+'</div></div>'
      + '</div>';
  }).join('');
}

function renderIndicateurs(){
  const el = document.getElementById('indic-wrap');
  if(!el) return;
  const ud = gUD();
  const missions = Object.entries(ud.missions||{});
  const done = missions.filter(function(m){ return m[1].status==='done'; });
  const wip  = missions.filter(function(m){ return m[1].status==='wip'; });
  const scores = done.filter(function(m){ return m[1].score; }).map(function(m){ return m[1].score; });
  const avg = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length).toFixed(1) : '—';
  const totalMissions = getMissions().length;
  const compsAcquis = COMP.filter(function(c){ return calcNiveauComp(c.code, ud) >= 3; }).length;
  const kpis = [
    {label:'Missions completees', value:done.length, total:totalMissions, icon:'✅', color:'#185FA5', bg:'#EBF4FF'},
    {label:'En cours', value:wip.length, total:null, icon:'🔷', color:'#2D5282', bg:'#EBF4FF'},
    {label:'Moyenne generale', value:avg+'', total:null, unit:'/20', icon:'📊', color:'#D97706', bg:'#FEF3C7'},
    {label:'Competences acquises', value:compsAcquis, total:COMP.length, icon:'⭐', color:'#7B2FBE', bg:'#EDE9FE'},
  ];
  el.innerHTML = '<div class="u-grid-2">'
    + kpis.map(function(k){
        const displayVal = k.total !== null ? k.value+'/'+k.total : k.value+(k.unit||'');
        const pct = k.total ? Math.round((k.value/k.total)*100) : null;
        return '<div style="background:'+k.bg+';border-radius:10px;padding:12px 14px">'
          + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><span style="font-size:16px">'+k.icon+'</span>'
          + '<span style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.5px">'+k.label+'</span></div>'
          + '<div style="font-size:22px;font-weight:900;color:'+k.color+'">'+displayVal+'</div>'
          + (pct!==null ? '<div style="margin-top:6px;background:rgba(0,0,0,.08);border-radius:4px;height:4px"><div style="height:100%;width:'+pct+'%;background:'+k.color+';border-radius:4px"></div></div>' : '')
          + '</div>';
      }).join('')
    + '</div>';
}

function getMissions(){
  if(!CU)return[];
  const cls=CU.classe;
  if(cls==='enseignant')return MISSIONS;
  if(cls==='2nde')return MISSIONS.filter(m=>MISSIONS_2NDE.includes(m.id)).sort((a,b)=>a.palier-b.palier||MISSIONS_2NDE.indexOf(a.id)-MISSIONS_2NDE.indexOf(b.id));
  if(cls==='1ere-AGEC')return MISSIONS.filter(m=>MISSIONS_AGEC_1.includes(m.id));
  if(cls==='1ere-PVOC')return MISSIONS.filter(m=>MISSIONS_PVOC_1.includes(m.id)).sort((a,b)=>a.palier-b.palier||MISSIONS_PVOC_1.indexOf(a.id)-MISSIONS_PVOC_1.indexOf(b.id));
  if(cls==='Term-AGEC')return MISSIONS.filter(m=>MISSIONS_AGEC_T.includes(m.id));
  if(cls==='Term-PVOC')return MISSIONS.filter(m=>MISSIONS_PVOC_T.includes(m.id));
  return MISSIONS;
}
function isPalierUnlocked(m,ud){
  if(m.palier===1)return true;
  // Vérifier que le palier précédent de la même compétence est validé >= 11
  const prevPalier=m.palier-1;
  const prevMission=MISSIONS.find(x=>x.comp===m.comp&&x.palier===prevPalier);
  if(!prevMission)return true;
  const prev=ud.missions[prevMission.id];
  return prev&&prev.status==='done'&&prev.score>=11;
}

function compBadge(code){
  const colors = {
    'C1.1':'#4A6FA5','C1.2':'#4A6FA5','C1.3':'#4A6FA5',
    'C2.1':'#E87722','C2.1b':'#E87722','C2.2':'#E87722','C2.3':'#E87722',
    'C3.1':'#0096C7','C3.2':'#0096C7','C3.3':'#0096C7','C3.3b':'#0096C7',
    'G4A':'#2D5282','G4B':'#7B2FBE',
    'B4.1':'#7B2FBE','B4.2':'#7B2FBE','B4.3':'#7B2FBE','B4.4':'#7B2FBE','B4.5':'#7B2FBE',
    'SA1':'#D97706','SA2':'#D97706','SA3':'#D97706',
    'ACC':'#E63B2E','ACC1':'#E63B2E','ACC2':'#E63B2E','ACC3':'#E63B2E','ACC4':'#E63B2E'
  };
  const col = colors[code] || '#6B7280';
  return '<span style="background:'+col+'22;color:'+col+';font-size:9px;font-weight:800;padding:2px 7px;border-radius:6px;display:inline-block">'+code+'</span>';
}

function renderMissions(){
  updateFiltreComp();
  const ud = gUD();
  const fp = document.getElementById('f-pal')?.value;
  const fc = document.getElementById('f-comp')?.value;
  let ms = getMissions();
  if(fp) ms = ms.filter(function(m){ return m.palier==fp; });
  if(fc) ms = ms.filter(function(m){ return m.comp.startsWith(fc); });

  const palierColors = ['','#4A6FA5','#2D5282','#185FA5','#7B2FBE'];
  const palierBgs    = ['','#EBF4FF','#DBEAFE','#D1FAE5','#EDE9FE'];
  const palierLabels = ['','Débutant','Apprenti','Pro compétent','Pro performant'];

  // Grouper par compétence pour un affichage structuré
  const grouped = {};
  ms.forEach(function(m){
    const key = m.comp.split('.')[0];
    if(!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });

  // Stats rapides
  const done   = ms.filter(function(m){ return ud.missions[m.id]?.status==='done'; }).length;
  const wip    = ms.filter(function(m){ return ud.missions[m.id]?.status==='wip'; }).length;
  const todo   = ms.length - done - wip;
  const pct    = ms.length > 0 ? Math.round(done/ms.length*100) : 0;

  // Barre de progression globale
  const statsBar = '<div style="background:#fff;border-radius:12px;padding:12px 16px;border:1px solid var(--gb);margin-bottom:14px;display:flex;align-items:center;gap:16px">'
    + '<div style="flex:1">'
    + '<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:6px">'
    + '<span class="u-subtitle">Progression</span>'
    + '<span style="font-weight:800;color:var(--bl)">'+done+'/'+ms.length+' missions ('+pct+'%)</span>'
    + '</div>'
    + '<div style="background:#E2E8F0;border-radius:6px;height:8px;overflow:hidden">'
    + '<div style="height:100%;width:'+pct+'%;background:var(--bl);border-radius:6px;transition:width .5s"></div>'
    + '</div>'
    + '</div>'
    + '<div style="display:flex;gap:12px;font-size:11px;flex-shrink:0">'
    + '<span class="u-success">✅ '+done+'</span>'
    + '<span style="color:var(--bl);font-weight:700">🔷 '+wip+'</span>'
    + '<span style="color:var(--gm);font-weight:600">○ '+todo+'</span>'
    + '</div>'
    + '</div>';

  // Cards missions
  const cardsHtml = ms.map(function(m){
    const st     = ud.missions[m.id]?.status || 'todo';
    const sc     = ud.missions[m.id]?.score;
    const locked = !isPalierUnlocked(m, ud) && CU.classe !== 'enseignant';
    const pCol   = palierColors[m.palier] || '#4A6FA5';
    const pBg    = palierBgs[m.palier]   || '#EBF4FF';
    const pLbl   = palierLabels[m.palier] || '';

    // Badge statut
    const stBadge = locked
      ? '<span class="sp" style="background:#F3F4F6;color:#9CA3AF">🔒 P'+(m.palier-1)+' requis</span>'
      : st==='done'
        ? '<span class="sp" style="background:#D1FAE5;color:#065F46">✓ '+sc+'/20</span>'
        : st==='att'
        ? '<span class="sp" style="background:#DBEAFE;color:#1E40AF">⏳ En attente</span>'
        : st==='wip'
        ? '<span class="sp" style="background:#FEF3C7;color:#92400E">✏️ En cours</span>'
        : '<span class="sp" style="background:#F3F4F6;color:#6B7280">À faire</span>';

    // Barre de progression si en cours
    const progressBar = st==='wip'
      ? '<div class="pb" style="margin-top:8px"><div class="pf" style="width:40%"></div></div>'
      : st==='done'
      ? '<div class="pb" style="margin-top:8px"><div class="pf" style="width:100%;background:#185FA5"></div></div>'
      : '';

    const clickAction = "handleMission('" + m.id + "')";

    
    return '<div class="mc'+(locked?' locked':'')+'" onclick="'+clickAction+'" style="border-left:5px solid '+(locked?'#CBD5E0':pCol)+'">'

      // En-tête : titre + badge statut
      + '<div class="mh">'
      + '<span class="mt">'+m.titre+'</span>'
      + stBadge
      + '</div>'

      // Meta : compétence + palier + option + durée
      + '<div class="mm" style="margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
      + compBadge(m.comp)
      + '<span style="background:'+pBg+';color:'+pCol+';font-size:9px;font-weight:700;padding:3px 9px;border-radius:10px">'+pLbl+'</span>'
      + '<span style="font-size:9px;color:#94A3B8;background:#F8FAFC;padding:3px 8px;border-radius:6px">'+
        (m.option==='commun'?'Commun':m.option==='2nde'?'2nde':m.option)+
        '</span>'
      + '<span style="font-size:9px;color:#94A3B8">⏱ ~55 min</span>'
      + '</div>'

      + progressBar
      + '</div>';
  }).join('') || '<p style="font-size:12px;color:var(--gm);padding:8px">Aucune mission pour ces filtres.</p>';

  document.getElementById('missions-list').innerHTML = statsBar + cardsHtml;
}

