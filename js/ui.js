// ================================================
//   LABORO Sport & Outdoor — Catalogue, clients, indicateurs, vue enseignant
//   Version 1.0 — Architecture modulaire
// ================================================

// ═══ CATALOGUE ═══
function renderCatalogue(catFiltre){
  const cats=[...new Set(PRODUITS.map(p=>p.cat))];
  const cfg={
    'Football':      {col:'#E63B2E',bg:'#FFF5F5',emoji:'⚽',desc:'Ballons · Chaussures · Textile club'},
    'Basketball':    {col:'#E87722',bg:'#FFF8F0',emoji:'🏀',desc:'Ballons · Sneakers · Maillots réversibles'},
    'Running':       {col:'#0096C7',bg:'#F0FBFF',emoji:'👟',desc:'Chaussures route/trail · GPS · Textile technique'},
    'Fitness':       {col:'#7B2FBE',bg:'#FAF5FF',emoji:'💪',desc:'Haltères · Tapis · Élastiques · Accessoires'},
    'LABORO Pro Line':{col:'#4A6FA5',bg:'#F0F4FF',emoji:'🏷️',desc:'Textile personnalisé · Sacs · Dossards clubs'}
  };
  const tabsHtml='<div class="cat-tabs">'
    +'<div class="cat-tab '+((!catFiltre)?'on':'')+'" onclick="renderCatalogue(\'\')">Tous <span class="cat-count">'+PRODUITS.length+'</span></div>'
    +cats.map(function(c){
      const count=PRODUITS.filter(function(p){return p.cat===c;}).length;
      const cc=cfg[c]||{col:'#4A6FA5'};
      const isActive=catFiltre===c;
      return '<div class="cat-tab '+(isActive?'on':'')+'" onclick="renderCatalogue(\''+c+'\')" style="'+(isActive?'border-bottom:3px solid '+cc.col+';color:'+cc.col:'')+'">'+cc.emoji+' '+c+' <span class="cat-count">'+count+'</span></div>';
    }).join('')+'</div>';
  let gridHtml='';
  const makeBanner=function(cat,filtered){
    const cc=cfg[cat]||{col:'#4A6FA5',bg:'#F8FAFF',emoji:'📦',desc:''};
    return '<div style="background:linear-gradient(135deg,'+cc.col+'22,'+cc.col+'08);border:1px solid '+cc.col+'33;border-radius:14px;padding:14px 18px;margin-bottom:14px;display:flex;align-items:center;gap:16px">'
      +'<div style="font-size:40px;line-height:1">'+cc.emoji+'</div>'
      +'<div><div style="font-size:15px;font-weight:900;color:'+cc.col+'">'+cat+'</div>'
      +'<div style="font-size:11px;color:#6B7280;margin-top:2px">'+cc.desc+'</div></div>'
      +'<div style="margin-left:auto;font-size:11px;font-weight:700;color:'+cc.col+';background:'+cc.col+'18;padding:4px 12px;border-radius:20px">'+filtered.length+' produits</div>'
      +'</div>';
  };
  if(!catFiltre){
    cats.forEach(function(cat){
      const ps=PRODUITS.filter(function(p){return p.cat===cat;});
      gridHtml+='<div class="cat-section">'+makeBanner(cat,ps)+'<div class="pg">'+ps.map(function(p){return renderProdCard(p);}).join('')+'</div></div>';
    });
  } else {
    const filtered=PRODUITS.filter(function(p){return p.cat===catFiltre;});
    gridHtml=makeBanner(catFiltre,filtered)+'<div class="pg">'+filtered.map(function(p){return renderProdCard(p);}).join('')+'</div>';
  }
  document.getElementById('cat-list').innerHTML=tabsHtml+gridHtml;
  document.getElementById('fiche-produit').classList.remove('on');
}

function renderProdCard(p){
  const cfg = {
    'Football':      {col:'#E63B2E',bg:'#FFF5F5',emoji:'⚽'},
    'Basketball':    {col:'#E87722',bg:'#FFF8F0',emoji:'🏀'},
    'Running':       {col:'#0096C7',bg:'#F0FBFF',emoji:'👟'},
    'Fitness':       {col:'#7B2FBE',bg:'#FAF5FF',emoji:'💪'},
    'LABORO Pro Line':{col:'#4A6FA5',bg:'#F0F4FF',emoji:'🏷️'}
  };
  const c = cfg[p.cat]||{col:'#4A6FA5',bg:'#F0F4FF',emoji:'📦'};
  const stockBadge = p.stock===0
    ? '<span class="prod-badge prod-badge-cmd">Sur commande</span>'
    : p.stock<=p.seuil
    ? '<span class="prod-badge prod-badge-low">⚠ Stock faible</span>'
    : '<span class="prod-badge prod-badge-ok">✓ En stock</span>';
  const niveauEmoji = {'Débutant':'🟢','Intermédiaire':'🔵','Confirmé':'🟡','Compétition':'🔴','Tous niveaux':'⚪'};
  return '<div class="pc" onclick="openProduit(\''+p.id+'\')" style="border-top:3px solid '+c.col+'">'
    + '<div class="pi-wrap" style="background:'+c.bg+';position:relative;height:140px;display:flex;align-items:center;justify-content:center;overflow:hidden">'
    + '<div style="font-size:64px;line-height:1;filter:drop-shadow(0 4px 8px rgba(0,0,0,.15))">'+c.emoji+'</div>'
    + '<div style="position:absolute;top:8px;left:8px;background:'+c.col+';color:#fff;font-size:9px;font-weight:800;padding:2px 8px;border-radius:12px;letter-spacing:.5px">'+p.marque+'</div>'
    + '<div style="position:absolute;top:8px;right:8px;font-size:13px">'+(niveauEmoji[p.niveau]||'⚪')+'</div>'
    + '</div>'
    + '<div class="pin">'
    + '<div class="pnom">'+p.nom+'</div>'
    + '<div style="font-size:10px;color:var(--gm);margin:2px 0">Réf. '+p.ref+'</div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">'
    + '<div style="font-size:16px;font-weight:900;color:'+c.col+'">'+p.pv+'€</div>'
    + '<div style="font-size:10px;color:#276749;font-weight:700;background:#D1FAE5;padding:2px 7px;border-radius:8px">+'+p.mar+'%</div>'
    + '</div>'+stockBadge+'</div></div>';
}

function selectRappel(id){
  RAPPELS_TYPES.forEach(function(r){
    const el = document.getElementById('rc-'+r.id);
    const check = document.getElementById('rc-check-'+r.id);
    if(el) el.style.borderColor = '#E5E7EB';
    if(check) check.style.display = 'none';
  });
  const el = document.getElementById('rc-'+id);
  const check = document.getElementById('rc-check-'+id);
  if(el){ el.style.borderColor='#2D5282'; el.style.background='#EBF4FF'; }
  if(check) check.style.display = 'block';
  selectedRappelId = id;
  const cw = document.getElementById('rappel-custom-wrap');
  if(cw) cw.style.display = (id==='libre') ? 'block' : 'none';
}

function showNotifEleve(message, type){
  type = type || 'info';
  let notif = document.getElementById('laboro-notif');
  if(!notif){
    notif = document.createElement('div');
    notif.id = 'laboro-notif';
    document.body.appendChild(notif);
  }
  const icons = {info:'📋', success:'✅', warning:'⚠️', rappel:'🔔'};
  const bgs = {info:'#1A2E4A', success:'#0F4C2A', warning:'#7B3F00', rappel:'#7B2D2D'};
  const borders = {info:'#4A6FA5', success:'#2D8A4E', warning:'#D97706', rappel:'#C53030'};
  const ic = icons[type]||'📋';
  const bg = bgs[type]||'#1A2E4A';
  const bd = borders[type]||'#4A6FA5';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'background:none;border:none;color:rgba(255,255,255,.5);font-size:18px;cursor:pointer;flex-shrink:0;padding:0;margin-left:8px';
  closeBtn.onclick = function(){ notif.style.display='none'; };
  notif.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;align-items:flex-start;gap:12px';
  wrap.innerHTML = '<div style="font-size:22px;flex-shrink:0">'+ic+'</div>'
    +'<div><div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.6);margin-bottom:4px">MESSAGE LABORO</div>'
    +'<div style="font-size:13px;color:#fff;line-height:1.5">'+message+'</div></div>';
  wrap.appendChild(closeBtn);
  notif.appendChild(wrap);
  notif.style.cssText = 'position:fixed;bottom:24px;right:24px;max-width:380px;background:'+bg+';border:1px solid '+bd+';border-radius:14px;padding:16px 18px;z-index:9998;box-shadow:0 8px 32px rgba(0,0,0,.3);display:block';
  setTimeout(function(){ if(notif) notif.style.display='none'; }, 8000);
}

const RAPPELS_TYPES = [
  {id:'tenue', label:'Tenue vestimentaire', icon:'👔',
   msg:'Rappel professionnel : la tenue vestimentaire chez LABORO doit etre soignee et adaptee au poste. Merci de vous y conformer.'},
  {id:'telephone', label:'Telephone portable', icon:'📱',
   msg:'Votre responsable vous demande de ranger votre telephone personnel. Pendant les heures de travail, seul KepkaPro est autorise.'},
  {id:'materiel', label:'Materiel de travail', icon:'🖊️',
   msg:'Un collaborateur LABORO arrive toujours equipe : stylo, carnet, materiel necessaire. Pensez-y pour votre prochaine session.'},
  {id:'posture', label:'Posture et attitude', icon:'💺',
   msg:"Rappel : la posture physique fait partie de l'image professionnelle chez LABORO. Tenez-vous droit et restez concentre(e)."},
  {id:'concentration', label:'Concentration', icon:'🎯',
   msg:'Votre responsable note un manque de concentration. Chez LABORO, chaque mission compte. Reprenez votre travail avec serieux.'},
  {id:'ponctualite', label:'Ponctualite', icon:'⏰',
   msg:"La ponctualite est une valeur fondamentale chez LABORO. Merci d'etre a l'heure et de respecter les delais."},
  {id:'respect', label:"Respect et esprit d'equipe", icon:'🤝',
   msg:"Rappel : le respect mutuel est au coeur des valeurs LABORO. Adoptez un comportement professionnel en toutes circonstances."},
  {id:'libre', label:'Message personnalise...', icon:'✏️', msg:''}
];

let selectedRappelId = null;


// ═══ VUE COMPÉTENCES ENSEIGNANT ═══
function renderCompetencesEnseignant(){
  const legend = document.getElementById('comp-legend');
  const grid = document.getElementById('comp-grid');
  const allUsers = allU().filter(function(u){ return u.mail && u.classe !== 'enseignant'; });

  // Stats globales par compétence
  if(legend){
    const total = allUsers.length;
    legend.innerHTML = '<div style="background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--gb);margin-bottom:4px">'
      + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:4px">Vue référentiel — Progression de la classe</div>'
      + '<div style="font-size:11px;color:#6B7280">'+(total>0?total+' élève(s) connecté(s)':'Aucun élève connecté pour le moment.')+'</div>'
      + '</div>';
  }

  if(!grid) return;

  const allS = gS();

  grid.innerHTML = COMP.map(function(c){
    // Calculer la progression de chaque élève sur cette compétence
    const levels = allUsers.map(function(u){
      const ud = allS[u.mail] || {missions:{}, competences:{}};
      return calcNiveauComp(c.code, ud);
    });

    const counts = [0,0,0,0,0];
    levels.forEach(function(l){ counts[l]++; });
    const total = allUsers.length;
    const acquis = counts[3] + counts[4];
    const enCours = counts[1] + counts[2];
    const pctAcquis = total > 0 ? Math.round(acquis/total*100) : 0;

    const niveaux = [
      {label:'Non démarré', col:'#A0AEC0'},
      {label:'Découverte',  col:'#63B3ED'},
      {label:'En progression', col:'#4A6FA5'},
      {label:'Acquis',     col:'#38A169'},
      {label:'Maîtrisé',  col:'#276749'}
    ];

    // Barre empilée
    const barSegments = total > 0 ? niveaux.map(function(n,i){
      const pct = Math.round(counts[i]/total*100);
      return pct > 0 ? '<div style="height:100%;width:'+pct+'%;background:'+n.col+';flex-shrink:0" title="'+n.label+' : '+counts[i]+'"></div>' : '';
    }).join('') : '<div style="height:100%;width:100%;background:#E2E8F0"></div>';

    const statusColor = pctAcquis >= 75 ? '#276749' : pctAcquis >= 40 ? '#D97706' : '#A0AEC0';

    return '<div class="cc" style="border-left:4px solid '+statusColor+'">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
      + compBadge(c.code)
      + '<span style="font-size:11px;font-weight:800;color:'+statusColor+'">'+(total>0?pctAcquis+'% acquis':'—')+'</span>'
      + '</div>'
      + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:10px">'+c.label+'</div>'

      // Barre empilée
      + (total > 0
        ? '<div style="display:flex;height:10px;border-radius:8px;overflow:hidden;margin-bottom:8px">'+barSegments+'</div>'
          + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
          + niveaux.map(function(n,i){
              return counts[i] > 0
                ? '<span style="font-size:9px;font-weight:700;color:'+n.col+';background:'+n.col+'1A;padding:2px 7px;border-radius:8px">'+n.label+' : '+counts[i]+'</span>'
                : '';
            }).join('')
          + '</div>'
        : '<div style="height:10px;background:#E2E8F0;border-radius:8px;margin-bottom:8px"></div>'
          + '<div style="font-size:11px;color:#9CA3AF;margin-bottom:8px">Aucun élève connecté</div>')

      + '<div style="font-size:10px;color:#9CA3AF;border-top:1px solid #F3F4F6;padding-top:6px">'
      + (total > 0 ? acquis+'/'+total+' élèves ont acquis · '+enCours+' en cours' : 'En attente de données')
      + '</div>'
      + '</div>';
  }).join('');
}function openProduit(id){
  const p=PRODUITS.find(function(x){return x.id===id;});
  if(!p) return;
  const cfg={'Football':{col:'#E63B2E',bg:'#FFF5F5',emoji:'⚽'},'Basketball':{col:'#E87722',bg:'#FFF8F0',emoji:'🏀'},'Running':{col:'#0096C7',bg:'#F0FBFF',emoji:'👟'},'Fitness':{col:'#7B2FBE',bg:'#FAF5FF',emoji:'💪'},'LABORO Pro Line':{col:'#4A6FA5',bg:'#F0F4FF',emoji:'🏷️'}};
  const c=cfg[p.cat]||{col:'#4A6FA5',bg:'#F0F4FF',emoji:'📦'};
  const pvHT=(p.pv/1.2).toFixed(2);
  const margeE=((p.pv/1.2)-p.pu).toFixed(2);
  const stockHtml=p.stock===0?'<span style="color:#7B2FBE;font-weight:700">Sur commande</span>':p.stock<=p.seuil?'<span style="color:#D97706;font-weight:700">⚠ Stock faible — '+p.stock+' u.</span>':'<span class="u-success">✓ '+p.stock+' en stock</span>';
  const nBg={'Débutant':'#D1FAE5','Intermédiaire':'#EBF4FF','Confirmé':'#FEF3C7','Compétition':'#FEE2E2','Tous niveaux':'#F3F4F6'};
  const nCo={'Débutant':'#276749','Intermédiaire':'#2D5282','Confirmé':'#D97706','Compétition':'#C53030','Tous niveaux':'#6B7280'};
  const specsHtml=(p.specs||[]).map(function(s){return '<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F3F4F6"><span style="font-size:11px;color:#6B7280;font-weight:600">'+s[0]+'</span><span style="font-size:11px;color:#1A2E4A;font-weight:700">'+s[1]+'</span></div>';}).join('');
  const compsHtml=(p.comp_ids||[]).slice(0,3).map(function(cid){
    const cp=PRODUITS.find(function(x){return x.id===cid;});
    if(!cp) return '';
    const cpC=cfg[cp.cat]||{col:'#4A6FA5',bg:'#F0F4FF',emoji:'📦'};
    return '<div onclick="openProduit(\''+cp.id+'\')" style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid #E5E7EB;border-radius:10px;cursor:pointer;background:#fff" onmouseover="this.style.borderColor=\''+c.col+'\'" onmouseout="this.style.borderColor=\'#E5E7EB\'">'
      +'<div style="width:44px;height:36px;background:'+cpC.bg+';border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">'+cpC.emoji+'</div>'
      +'<div class="u-flex-1"><div style="font-size:10px;font-weight:700;color:#1A2E4A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+cp.nom+'</div>'
      +'<div style="font-size:10px;color:'+cpC.col+';font-weight:700">'+cp.pv+'€</div></div></div>';
  }).join('');
  const fiche=document.getElementById('fiche-produit');
  fiche.innerHTML='<div style="border-top:4px solid '+c.col+';border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.08)">'
    +'<div style="display:flex;min-height:230px">'
    +'<div style="width:220px;flex-shrink:0;background:'+c.bg+';display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px">'
    +'<div style="font-size:76px;line-height:1;filter:drop-shadow(0 6px 12px rgba(0,0,0,.15));margin-bottom:8px">'+c.emoji+'</div>'
    +'<div style="font-size:10px;font-weight:800;color:'+c.col+';background:#fff;padding:3px 10px;border-radius:12px">'+p.marque+'</div>'
    +'</div>'
    +'<div style="flex:1;padding:20px;display:flex;flex-direction:column;justify-content:space-between">'
    +'<div>'
    +'<div style="font-size:10px;color:var(--gm);margin-bottom:4px">'+p.cat+' · Réf. '+p.ref+'</div>'
    +'<div style="font-size:19px;font-weight:900;color:#1A2E4A;line-height:1.2;margin-bottom:6px">'+p.nom+'</div>'
    +'<div style="font-size:12px;color:#4B5563;line-height:1.6;margin-bottom:10px">'+p.desc+'</div>'
    +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">'
    +(p.niveau?'<span style="background:'+(nBg[p.niveau]||'#F3F4F6')+';color:'+(nCo[p.niveau]||'#6B7280')+';font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+p.niveau+'</span>':'')
    +(p.ages?'<span style="background:#F3F4F6;color:#374151;font-size:10px;font-weight:600;padding:3px 10px;border-radius:20px">👤 '+p.ages+'</span>':'')
    +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">'
    +'<div style="background:#F0F4FF;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Achat HT</div><div class="u-title">'+p.pu+'€</div></div>'
    +'<div style="background:#F0FFF4;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Vente TTC</div><div class="u-title">'+p.pv+'€</div><div class="u-label">'+pvHT+'€ HT</div></div>'
    +'<div style="background:#FFF7ED;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Marge</div><div style="font-size:18px;font-weight:900;color:#276749">'+p.mar+'%</div><div class="u-label">'+margeE+'€/u</div></div>'
    +'</div></div></div>'
    +'<div style="height:1px;background:#F3F4F6"></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:0">'
    +'<div style="padding:16px 18px;border-right:1px solid #F3F4F6">'
    +'<div style="font-size:11px;font-weight:800;color:#1A2E4A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">📋 Caractéristiques</div>'
    +(specsHtml||'<div class="u-label-muted">—</div>')
    +'<div style="margin-top:8px;font-size:11px">Stock : '+stockHtml+'</div>'
    +(p.seuil>0?'<div style="font-size:10px;color:#9CA3AF;margin-top:2px">Seuil : '+p.seuil+' u. · TVA '+p.tva+'%</div>':'')
    +'</div>'
    +'<div style="padding:16px 18px">'
    +'<div style="font-size:11px;font-weight:800;color:#1A2E4A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">🔗 Produits complémentaires</div>'
    +(compsHtml?'<div class="u-flex-col">'+compsHtml+'</div>':'<div class="u-label-muted">Aucun produit associé.</div>')
    +'</div></div>'
    +'<div style="padding:12px 18px;background:#F8FAFF;display:flex;gap:10px;border-top:1px solid #F3F4F6">'
    +'<button onclick="document.getElementById(\'fiche-produit\').classList.remove(\'on\')" style="background:none;border:1px solid #E5E7EB;padding:8px 14px;border-radius:8px;font-size:12px;cursor:pointer;color:#374151;font-weight:600">← Retour</button>'
    +'<button onclick="ajouterDevis(\''+p.id+'\')" style="background:'+c.col+';border:none;color:#fff;padding:8px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">+ Ajouter au devis</button>'
    +'</div></div>';
  fiche.classList.add('on');
  fiche.scrollIntoView({behavior:'smooth',block:'start'});
}



// ═══ CHARTE · RAPPELS · POSTURE · CLIENTS ═══




// checkCharte() et accepterCharte() définies dans clients.js



function checkRappelsEnAttente(){
  if(CU.classe==='enseignant') return;
  const ud = gUD();
  const rappels = ud.rappels || [];
  const nonLus = rappels.filter(function(r){ return !r.lu; });
  if(nonLus.length > 0){
    const dernier = nonLus[nonLus.length-1];
    rappels.forEach(function(r){ r.lu=true; });
    sUD(ud);
    setTimeout(function(){
      showNotifEleve(dernier.message, 'rappel');
    }, 1500);
  }
}

function calcPosturePro(ud){
  let score = 100;
  const missions = Object.values(ud.missions||{});
  const done = missions.filter(function(m){ return m.status==='done'; });
  const rappels = ud.nb_rappels || 0;
  score -= Math.min(rappels * 8, 40);
  if(done.length >= 5) score += 5;
  if(done.length >= 10) score += 5;
  const scores = done.filter(function(m){ return m.score; }).map(function(m){ return m.score; });
  const avg = scores.length ? scores.reduce(function(a,b){ return a+b; },0)/scores.length : 0;
  if(avg >= 14) score += 10;
  else if(avg >= 11) score += 5;
  return Math.max(0, Math.min(100, score));
}

function getPostureLabel(score){
  if(score >= 90) return {label:'Excellent', color:'#276749', bg:'#D1FAE5'};
  if(score >= 75) return {label:'Bien', color:'#2D5282', bg:'#EBF4FF'};
  if(score >= 60) return {label:'A ameliorer', color:'#D97706', bg:'#FEF3C7'};
  return {label:'Insuffisant', color:'#C53030', bg:'#FEE2E2'};
}

function closeNotif(){ var n=document.getElementById('laboro-notif'); if(n) n.style.display='none'; }

function ouvrirRappelModal(mail){
  const u = allU().find(function(x){ return x.mail===mail; });
  if(!u) return;
  const prenom = (u.nom||mail).split(' ')[0];
  let modal = document.getElementById('rappel-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'rappel-modal';
    document.body.appendChild(modal);
  }
  // Construire via DOM
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9997;display:flex;align-items:center;justify-content:center';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:16px;max-width:520px;width:90%;padding:28px;position:relative;max-height:85vh;overflow-y:auto';
  // Titre via DOM
  const closeBtn2 = document.createElement('button');
  closeBtn2.style.cssText = 'position:absolute;top:14px;right:14px;background:none;border:none;font-size:20px;cursor:pointer;color:#9CA3AF';
  closeBtn2.textContent = 'X';
  closeBtn2.onclick = function(){ document.getElementById('rappel-modal').style.display='none'; };
  box.appendChild(closeBtn2);
  const titleDiv = document.createElement('div');
  titleDiv.style.marginBottom = '20px';
  titleDiv.innerHTML = '<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Rappel professionnel</div>'
    + '<div style="font-size:18px;font-weight:800;color:#1A2E4A">Message pour ' + prenom + '</div>'
    + '<div style="font-size:12px;color:#6B7280;margin-top:4px">Visible dans son espace au prochain chargement</div>';
  box.appendChild(titleDiv);
  // Choix
  // Choix
  const choicesDiv = document.createElement('div');
  choicesDiv.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-bottom:18px';
  RAPPELS_TYPES.forEach(function(r){
    const item = document.createElement('div');
    item.id = 'rc-' + r.id;
    item.style.cssText = 'display:flex;align-items:center;gap:12px;padding:10px 14px;border:1.5px solid #E5E7EB;border-radius:10px;cursor:pointer';
    item.innerHTML = '<div style="font-size:20px;flex-shrink:0">' + r.icon + '</div>'
      + '<div style="font-size:12px;font-weight:600;color:#1A2E4A;flex:1">' + r.label + '</div>'
      + '<div id="rc-check-' + r.id + '" style="display:none;color:#2D5282;font-size:16px">✓</div>';
    item.onclick = function(){ selectRappel(r.id); };
    choicesDiv.appendChild(item);
  });
  box.appendChild(choicesDiv);
  // Textarea libre
  const customWrap = document.createElement('div');
  customWrap.id = 'rappel-custom-wrap';
  customWrap.style.cssText = 'display:none;margin-bottom:16px';
  customWrap.innerHTML = '<textarea id="rappel-custom-msg" placeholder="Redigez votre message..." style="width:100%;height:80px;border:1.5px solid #E5E7EB;border-radius:8px;padding:10px;font-size:12px;resize:vertical;box-sizing:border-box"></textarea>';
  box.appendChild(customWrap);
  // Signature + bouton
  const footer = document.createElement('div');
  footer.innerHTML = '<div style="background:#FEF3C7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:11px;color:#92400E"><strong>Signe :</strong> '+getResp().nom+' — Responsable '+getNomEntreprise()+'</div>';
  const sendBtn = document.createElement('button');
  sendBtn.style.cssText = 'width:100%;background:#1A2E4A;color:#fff;border:none;padding:12px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer';
  sendBtn.textContent = '📨 Envoyer le rappel';
  sendBtn.onclick = function(){ envoyerRappel(mail); };
  footer.appendChild(sendBtn);
  box.appendChild(footer);
  modal.innerHTML = '';
  modal.appendChild(box);
}



function envoyerRappel(mail){
  if(!selectedRappelId){ alert('Choisissez un type de rappel.'); return; }
  const rappelType = RAPPELS_TYPES.find(function(r){ return r.id===selectedRappelId; });
  let message = rappelType.msg;
  if(selectedRappelId==='libre'){
    const custom = document.getElementById('rappel-custom-msg');
    message = custom ? custom.value.trim() : '';
    if(!message){ alert('Redigez votre message.'); return; }
  }
  const s = gS();
  if(!s[mail]) s[mail] = {missions:{}, competences:{}};
  if(!s[mail].rappels) s[mail].rappels = [];
  s[mail].rappels.push({date: new Date().toLocaleDateString('fr-FR'), type: selectedRappelId, message: message, lu: false});
  s[mail].nb_rappels = (s[mail].nb_rappels || 0) + 1;
  sS(s);
  document.getElementById('rappel-modal').style.display = 'none';
  selectedRappelId = null;
  const notifEns = document.createElement('div');
  notifEns.style.cssText = 'position:fixed;top:20px;right:20px;background:#0F4C2A;color:#fff;padding:12px 20px;border-radius:10px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)';
  notifEns.textContent = '✓ Rappel envoye — visible au prochain chargement';
  document.body.appendChild(notifEns);
  setTimeout(function(){ notifEns.remove(); }, 4000);
  renderClasse();
}


function openClient(id){ ouvrirFicheClient(id); }
// renderClients() et ouvrirFicheClient() définies dans clients.js

function validerMission(mail,mid){
  const s=gS();if(!s[mail])return;
  const note=s[mail].missions[mid]?.note_ia||10;
  const noteFinale=prompt(`Valider la mission pour ${s[mail].nom||mail}.\nNote IA : ${note}/20. Note finale :`,note);
  if(noteFinale===null)return;
  const nf=Math.min(20,Math.max(0,parseFloat(noteFinale)||note));
  s[mail].missions[mid].status='done';s[mail].missions[mid].score=nf;
  if(nf>=11){
    const m=MISSIONS.find(x=>x.id===mid);
    if(m){
      const compKey=m.comp.startsWith('A4')?'G4A':m.comp.startsWith('B4')?'G4B':m.comp.startsWith('ACC')?'ACC':m.comp;
      const niveauIA=s[mail].missions[mid]?.niveau_ia||1;
      if(!s[mail].competences)s[mail].competences={};
      s[mail].competences[compKey]=Math.max(s[mail].competences[compKey]||0,Math.min(niveauIA,m.palier));
    }
  }
  sS(s);renderClasse();showFicheEleve(mail);
}

function genererPortfolioEleve(mail){
  const s=JSON.parse(localStorage.getItem('laboro_s')||'{}');
  const ud=s[mail]||{missions:{},competences:{}};
  const nom=ud.nom||mail;
  const poste=ud.poste||'—';
  const classe=ud.classe||'—';
  const date=new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
  const score=calcScoreFromUD(ud);
  const allMissions=Object.values(ud.missions||{});
  const done=allMissions.filter(m=>m.status==='done');
  const avg=done.length?Math.round(done.reduce((a,m)=>a+(m.score||0),0)/done.length*10)/10:0;
  const comps=ud.competences||{};
  const compOk=Object.values(comps).filter(v=>v>=3).length;

  // Construire le contenu HTML du portfolio
  let html=`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Portfolio d'activités professionnelles — ${nom}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;font-size:11pt;color:#1a1a1a;background:#fff}
.page{max-width:210mm;margin:0 auto;padding:20mm}
@media print{.page{padding:15mm;max-width:none}}
.no-print{display:block}
@media print{.no-print{display:none}}

/* EN-TÊTE */
.hd{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #185FA5;padding-bottom:14px;margin-bottom:18px}
.hd-logo{font-size:28pt;font-weight:900;color:#185FA5;font-style:italic;letter-spacing:-1px}
.hd-sub{font-size:8pt;color:#5F5E5A;text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
.hd-r{text-align:right}
.hd-tag{font-size:7pt;background:#185FA5;color:#fff;padding:2px 8px;border-radius:3px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;display:inline-block}
.hd-nom{font-size:14pt;font-weight:700;margin-top:3px}
.hd-info{font-size:9pt;color:#5F5E5A;margin-top:2px}

/* RÉSUMÉ */
.resume{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;background:#E6F1FB;border-radius:8px;padding:12px}
.rk{text-align:center}
.rv{font-size:18pt;font-weight:800;color:#185FA5}
.rl{font-size:7pt;color:#5F5E5A;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}

/* ÉPREUVES */
.epreuve{margin-bottom:20px;break-inside:avoid}
.ep-hd{background:#185FA5;color:#fff;padding:8px 14px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center}
.ep-t{font-size:10pt;font-weight:700}
.ep-coef{font-size:8pt;opacity:.8}
.ep-body{border:1px solid #D3D1C7;border-top:none;border-radius:0 0 6px 6px;overflow:hidden}

/* COMPÉTENCE */
.comp-sec{border-bottom:1px solid #F1EFE8}
.comp-sec:last-child{border-bottom:none}
.comp-hd{padding:8px 14px;background:#F8F7F3;display:flex;justify-content:space-between;align-items:center}
.comp-critere{padding:6px 14px 8px;background:#F0F4FF;border-top:1px solid #E5E7EB;font-size:8.5pt}
.comp-critere-label{font-size:7pt;text-transform:uppercase;letter-spacing:.08em;color:#4A6FA5;font-weight:700;margin-bottom:3px}
.comp-critere-txt{color:#374151;line-height:1.5;margin-bottom:4px}
.comp-niv-desc{font-style:italic;color:#4A6FA5;font-size:8pt;padding:4px 8px;background:#EBF4FF;border-radius:4px;border-left:3px solid #4A6FA5}
.comp-code{font-size:9pt;font-weight:700;color:#185FA5}
.comp-label{font-size:9pt;color:#2C2C2A;flex:1;margin-left:10px}
.niv-badge{font-size:8pt;font-weight:700;padding:2px 8px;border-radius:4px}
.niv-0{background:#D3D1C7;color:#5F5E5A}
.niv-1{background:#E6F1FB;color:#0C447C}
.niv-2{background:#B5D4F4;color:#0C447C}
.niv-3{background:#EBF4FF;color:#2D5282}
.niv-4{background:#2D5282;color:#fff}

/* MISSIONS */
.missions-list{padding:8px 14px}
.mission-row{display:grid;grid-template-columns:1fr 70px 50px 60px 80px;gap:6px;align-items:center;padding:5px 0;border-bottom:.5px solid #F1EFE8;font-size:9pt}
.mission-row:last-child{border-bottom:none}
.mission-row.hdr{font-size:7pt;font-weight:700;color:#5F5E5A;text-transform:uppercase;letter-spacing:.05em;border-bottom:.5px solid #D3D1C7;padding-bottom:5px}
.note-badge{text-align:center;padding:1px 5px;border-radius:3px;font-weight:700;font-size:9pt}
.nb-h{background:#EBF4FF;color:#2D5282}
.nb-m{background:#FAEEDA;color:#BA7517}
.nb-l{background:#FCEBEB;color:#A32D2D}
.nb-x{background:#F1EFE8;color:#5F5E5A}

/* RÉFLEXIVITÉ */
.reflexiv-sec{padding:8px 14px;background:#FFFDF5;border-top:.5px solid #F1EFE8}
.reflexiv-t{font-size:7pt;font-weight:700;color:#BA7517;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}
.reflexiv-item{margin-bottom:8px;padding:6px 10px;background:#fff;border-left:3px solid #BA7517;border-radius:0 4px 4px 0;font-size:8.5pt;line-height:1.5}
.reflexiv-q{font-size:8pt;font-style:italic;color:#5F5E5A;margin-bottom:3px}

/* OBS ENSEIGNANT */
.obs-sec{padding:8px 14px;background:#EEF7FF;border-top:.5px solid #D3D1C7}
.obs-t{font-size:7pt;font-weight:700;color:#185FA5;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.obs-txt{font-size:9pt;line-height:1.6;color:#2C2C2A;font-style:italic}

/* PIED DE PAGE */
.footer{margin-top:24px;padding-top:10px;border-top:.5px solid #D3D1C7;display:flex;justify-content:space-between;font-size:7.5pt;color:#5F5E5A}
.sign-box{border:.5px solid #D3D1C7;border-radius:4px;padding:8px 14px;min-width:150px;min-height:40px;margin-top:6px}
.sign-label{font-size:7pt;color:#5F5E5A;margin-bottom:4px}

.btn-print{position:fixed;top:20px;right:20px;padding:10px 20px;background:#185FA5;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;box-shadow:0 2px 12px rgba(24,95,165,.3)}

/* COUP DE POUCE */
.cp-btn{display:none;align-items:center;gap:6px;padding:7px 14px;background:#FFFBEA;border:1.5px solid #F0C040;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;color:#8A6500;transition:all .15s;margin-top:10px}
.cp-btn:hover{background:#FFF3C0;border-color:#D4A800}
.cp-btn.visible{display:inline-flex}
.cp-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:3000;align-items:center;justify-content:center}
.cp-overlay.open{display:flex}
.cp-modal{background:#fff;border-radius:14px;max-width:680px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.2)}
.cp-modal-hd{background:#FFFBEA;border-bottom:1.5px solid #F0C040;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-radius:14px 14px 0 0;position:sticky;top:0}
.cp-modal-t{font-size:14px;font-weight:800;color:#8A6500}
.cp-modal-sub{font-size:11px;color:#A07800;margin-top:2px}
.cp-modal-cl{background:none;border:none;cursor:pointer;font-size:18px;color:#8A6500;padding:4px}
.cp-modal-body{padding:20px}
.cp-footer{padding:12px 20px;background:#FFFBEA;border-top:1px solid #F0C040;border-radius:0 0 14px 14px;font-size:11px;color:#A07800;text-align:center}

/* ANALYSE DE CLASSE */
.ana-btn{padding:8px 16px;background:linear-gradient(135deg,#185FA5,#0C447C);color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:700;display:flex;align-items:center;gap:6px}
.ana-btn:hover{opacity:.9}
.ana-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:3000;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto}
.ana-overlay.open{display:flex}
.ana-modal{background:#fff;border-radius:14px;width:100%;max-width:860px;box-shadow:0 8px 40px rgba(0,0,0,.2);margin:auto}
.ana-hd{background:linear-gradient(135deg,#185FA5,#0C447C);padding:20px 24px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center}
.ana-hd-t{font-family:system-ui,sans-serif;font-size:17px;font-weight:800;color:#fff}
.ana-hd-s{font-size:11px;color:rgba(255,255,255,.65);margin-top:3px}
.ana-cl{background:none;border:none;cursor:pointer;color:#fff;font-size:20px;padding:4px}
.ana-body{padding:24px}
.ana-section{margin-bottom:24px}
.ana-section-t{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gm);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--gb)}
.ana-table{width:100%;border-collapse:collapse;font-size:12px}
.ana-table th{background:var(--gc);padding:8px 10px;text-align:left;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--gm)}
.ana-table td{padding:8px 10px;border-bottom:.5px solid var(--gb);vertical-align:middle}
.ana-table tr:last-child td{border-bottom:none}
.ana-bar{height:6px;border-radius:3px;background:#eee;margin-top:3px}
.ana-bar-fill{height:100%;border-radius:3px;transition:width .3s}
.ana-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.ana-bdg-r{background:var(--rc);color:var(--rg)}
.ana-bdg-o{background:var(--ac);color:var(--am)}
.ana-bdg-g{background:#EBF4FF;color:#2D5282}
.ana-rem-btn{padding:12px 20px;background:#fff;border:2px solid var(--bl);border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;color:var(--bl);width:100%;margin-top:8px;transition:all .15s}
.ana-rem-btn:hover{background:var(--bl);color:#fff}

/* FICHE DE POSTE & ORGANIGRAMME */
.poste-card{background:linear-gradient(135deg,#0C3D6E,#185FA5);border-radius:12px;padding:16px 20px;color:#fff;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;cursor:pointer;transition:opacity .15s}
.poste-card:hover{opacity:.92}
.poste-card-l{}
.poste-card-tag{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:4px}
.poste-card-titre{font-size:15px;font-weight:800;color:#fff;margin-bottom:2px}
.poste-card-sub{font-size:11px;color:rgba(255,255,255,.7)}
.poste-card-r{text-align:right}
.poste-card-ico{font-size:28px;margin-bottom:4px}
.poste-card-cta{font-size:10px;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:4px}

/* MODALE ORGANIGRAMME */
.org-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:3000;align-items:center;justify-content:center;padding:20px}
.org-overlay.open{display:flex}
.org-modal{background:#fff;border-radius:14px;width:100%;max-width:780px;max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.25)}
.org-hd{background:linear-gradient(135deg,#0C3D6E,#185FA5);padding:20px 24px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center}
.org-hd-t{font-size:16px;font-weight:800;color:#fff}
.org-hd-s{font-size:11px;color:rgba(255,255,255,.6);margin-top:2px}
.org-cl{background:none;border:none;cursor:pointer;color:#fff;font-size:20px}
.org-body{padding:24px}
.org-tabs{display:flex;gap:6px;margin-bottom:20px}
.org-tab{padding:7px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:.5px solid var(--gb);color:var(--gm);background:#fff}
.org-tab.on{background:var(--bl);color:#fff;border-color:var(--bl)}

/* Organigramme */
.org-tree{display:flex;flex-direction:column;align-items:center;gap:0}
.org-level{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;position:relative;margin-bottom:0}
.org-connector{width:1px;height:24px;background:#D3D1C7;margin:0 auto}
.org-h-line{height:1px;background:#D3D1C7;position:absolute;top:0}
.org-node{background:#fff;border:.5px solid #D3D1C7;border-radius:10px;padding:10px 14px;text-align:center;min-width:130px;max-width:160px;position:relative;transition:all .2s}
.org-node.top{border-color:var(--bl);background:var(--bc)}
.org-node.me{border:2.5px solid var(--vt);background:#EBF4FF;box-shadow:0 0 0 4px rgba(29,158,117,.15)}
.org-node.manager{border-color:#6B4FA0;background:#F0EAFA}
.org-node.peer{border-color:#D3D1C7;background:#FAFAF8;opacity:.7}
.org-node-ava{width:36px;height:36px;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff}
.org-node-nom{font-size:11px;font-weight:700;color:var(--gr);line-height:1.3}
.org-node-role{font-size:9px;color:var(--gm);margin-top:2px;line-height:1.3}
.org-node-badge{display:inline-block;margin-top:5px;padding:2px 8px;border-radius:8px;font-size:9px;font-weight:700;background:var(--vt);color:#fff}

/* Fiche de poste */
.fp-section{margin-bottom:18px}
.fp-section-t{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gm);margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--gb)}
.fp-liste{list-style:none;display:flex;flex-direction:column;gap:6px}
.fp-liste li{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--gr);line-height:1.5}
.fp-liste li::before{content:'→';color:var(--bl);font-weight:700;flex-shrink:0}
.fp-manager{display:flex;align-items:center;gap:12px;background:var(--gc);border-radius:10px;padding:12px 16px}
.fp-manager-ava{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;flex-shrink:0}
.fp-manager-nom{font-size:13px;font-weight:700;color:var(--gr)}
.fp-manager-role{font-size:11px;color:var(--gm)}

/* MOT DE PASSE ENSEIGNANT */
#fg-mdp{display:none;margin-top:8px}
#fg-mdp label{font-size:11px;font-weight:700;color:var(--gm);display:block;margin-bottom:4px}
#inp-mdp{width:100%;padding:10px 12px;border:.5px solid var(--gb);border-radius:8px;font-size:13px;background:#fff;outline:none}
#inp-mdp:focus{border-color:var(--bl);box-shadow:0 0 0 3px var(--bc)}
.mdp-hint{font-size:10px;color:var(--gm);margin-top:4px;text-align:center}
.tb2b{background:var(--bc);color:var(--bl);padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.04em}
.tb2c{background:#F3E8FF;color:#8E44AD;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.04em}
.tpros{background:var(--ac);color:var(--am);padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.04em}
.cl-pot-bar{height:5px;border-radius:3px;background:var(--gc);margin-top:4px;overflow:hidden}
.cl-pot-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#4A6FA5,#2D5282);transition:width .4s}
.cl-stats-row{display:flex;gap:8px;margin-top:8px}
.cl-stat-chip{flex:1;background:var(--gc);border-radius:7px;padding:7px 10px;text-align:center}
.cl-stat-chip .sv{font-size:14px;font-weight:800;color:var(--gr)}
.cl-stat-chip .sl{font-size:9px;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-top:1px}

/* ONBOARDING ENSEIGNANT */
#ob-ens{background:linear-gradient(135deg,#0A2540,#0C3D6E);align-items:center;justify-content:center;padding:2rem}
.ob-ens-w{width:100%;max-width:760px}
.ob-ens-pg{display:flex;gap:8px;justify-content:center;margin-bottom:32px}
.ob-ens-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.25);transition:all .3s;cursor:pointer}
.ob-ens-dot.cur{background:#fff;width:28px;border-radius:5px}
.ob-ens-p{display:none;animation:fadeInUp .35s ease}
.ob-ens-p.on{display:block}
@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.ob-ens-card{background:rgba(255,255,255,.06);border:.5px solid rgba(255,255,255,.15);border-radius:16px;padding:32px;margin-bottom:20px}
.ob-ens-tag{font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#4A6FA5;margin-bottom:12px}
.ob-ens-titre{font-size:26px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:12px}
.ob-ens-sub{font-size:14px;color:rgba(255,255,255,.7);line-height:1.6;margin-bottom:20px}
.ob-ens-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:4px}
.ob-ens-feat{background:rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;border-left:3px solid var(--vt)}
.ob-ens-feat-ico{font-size:20px;margin-bottom:6px}
.ob-ens-feat-t{font-size:12px;font-weight:700;color:#fff;margin-bottom:3px}
.ob-ens-feat-d{font-size:11px;color:rgba(255,255,255,.6);line-height:1.4}
.ob-ens-nav{display:flex;justify-content:space-between;align-items:center}
.ob-ens-skip{font-size:11px;color:#6B7280;cursor:pointer;padding:8px;background:none;border:none}
.ob-ens-skip:hover{color:rgba(255,255,255,.7)}
.ob-ens-next{padding:12px 28px;background:#fff;color:#0C3D6E;border:none;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;transition:all .15s}
.ob-ens-next:hover{background:var(--bc)}
.ob-ens-mdp{background:rgba(255,255,255,.1);border-radius:8px;padding:10px 16px;font-size:11px;color:#1F2937;display:flex;align-items:center;gap:8px;margin-bottom:12px}

.res-section{margin-bottom:8px}
.res-section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:4px 10px;border-radius:6px;display:inline-block;margin-bottom:10px}
.res-debutant .res-section-label{background:#EBF4FF;color:#2D5282}
.res-section .res-section-label{background:#E3F2FD;color:#1565C0}

/* SIGNATURE MANUSCRITE PDG */
.lb-sig{font-family:'Brush Script MT','Segoe Script',cursive;font-size:28px;color:#1D3461;margin-top:8px;margin-bottom:4px;letter-spacing:1px}
.lb-sig-nom{font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:.12em;font-style:normal}
.lb-entete{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid #E8E4DC}
.lb-entete-logo{font-size:18px;font-weight:900;color:#2563EB;letter-spacing:-.5px}
.lb-entete-sub{font-size:10px;color:#9CA3AF;margin-top:2px}
.lb-entete-date{font-size:11px;color:#9CA3AF;text-align:right}

/* ACTUALITÉS LABORO */
.actu-item{display:flex;gap:12px;padding:10px 0;border-bottom:.5px solid var(--gb)}
.actu-item:last-child{border-bottom:none}
.actu-icon{font-size:20px;flex-shrink:0;width:28px;text-align:center;margin-top:2px}
.actu-titre{font-size:12px;font-weight:700;color:var(--gr);margin-bottom:3px}
.actu-txt{font-size:11px;color:var(--gm);line-height:1.5}
/* INDICATEURS */
.indic-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:8px 0}
.indic-kpi{text-align:center;padding:10px 6px;background:#F8FAFC;border-radius:8px}
.indic-v{font-size:22px;font-weight:900;color:var(--bf);letter-spacing:-1px}
.indic-l{font-size:9px;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-top:3px;line-height:1.4}

/* GRILLE POSITIONNEMENT CCF */
.ccf-grille{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:10px 14px;padding:8px 0;border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB}
.ccf-case{text-align:center;padding:8px 6px;border-radius:6px;border:1.5px solid #E5E7EB;position:relative;background:#fff}
.ccf-active{border-color:#2D5282;background:#EBF4FF}
.ccf-num{font-size:18px;font-weight:900;color:#D1D5DB;line-height:1}
.ccf-active .ccf-num{color:#2D5282}
.ccf-lbl{font-size:8.5pt;color:#9CA3AF;margin-top:2px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.ccf-active .ccf-lbl{color:#2D5282}
.ccf-mark{font-size:20px;font-weight:900;color:#2D5282;margin-top:2px}
/* APPRÉCIATION MOTIVÉE */
.appr-motivee{margin:8px 14px;padding:10px 14px;background:#FFFBEB;border-radius:6px;border-left:3px solid #D97706}
.appr-label{font-size:8pt;font-weight:700;color:#D97706;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
.appr-txt{font-size:10pt;color:#374151;line-height:1.6;font-style:italic}

/* DASHBOARD CCF */
.ccf-dash-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--bf);margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--gb)}
.ccf-dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.ccf-dash-ep{border-radius:10px;padding:14px;border:1.5px solid var(--gb)}
.ccf-ok{border-color:#BEE3F8;background:#F0F8FF}
.ccf-warn{border-color:#FEF3C7;background:#FFFDF5}
.ccf-todo{border-color:#FEE2E2;background:#FFF5F5}
.ccf-dash-ep-hd{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.ccf-dash-code{font-size:13px;font-weight:900;color:var(--bf)}
.ccf-dash-label{font-size:12px;font-weight:600;color:var(--gr);flex:1}
.ccf-dash-coef{font-size:10px;color:var(--gm);background:var(--gb);padding:2px 7px;border-radius:10px}
.ccf-comp-row{display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:.5px solid var(--gb);font-size:11px}
.ccf-comp-row:last-child{border-bottom:none}
.ccf-comp-code{font-weight:700;color:var(--bf);width:36px;flex-shrink:0}
.ccf-comp-name{flex:1;color:var(--gr)}
.ccf-comp-lv{font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;flex-shrink:0}
.ccf-comp-ok .ccf-comp-lv{background:#EBF4FF;color:#1E3A5F}
.ccf-comp-warn .ccf-comp-lv{background:#FEF3C7;color:#92400E}
.ccf-comp-todo .ccf-comp-lv{background:#FEE2E2;color:#991B1B}
.ccf-comp-nb{font-size:10px;color:var(--gm);flex-shrink:0}
.ccf-progress-bar{height:4px;background:var(--gb);border-radius:2px;margin-top:10px;overflow:hidden}
.ccf-progress-fill{height:100%;background:var(--bl);border-radius:2px;transition:width .3s}
.ccf-dash-footer{display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--gb)}

/* ONBOARDING ÉTAPES */
.ob-steps{display:flex;flex-direction:column;gap:10px;margin:14px 0}
.ob-step{display:flex;align-items:flex-start;gap:12px;background:#F0F4FF;border-radius:10px;padding:12px 14px;border:1px solid #BFDBFE}
.ob-step-n{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.ob-step-t{font-size:13px;font-weight:700;color:#1A2E4A;margin-bottom:3px}
.ob-step-d{font-size:11px;color:#374151;line-height:1.5}
/* SCROLLBAR VISIBLE */
.lr::-webkit-scrollbar{width:8px}
.lr::-webkit-scrollbar-track{background:#F3F4F6}
.lr::-webkit-scrollbar-thumb{background:#BEE3F8;border-radius:4px}
.lr::-webkit-scrollbar-thumb:hover{background:#4A6FA5}

.mo-body::-webkit-scrollbar{width:8px}
.mo-body::-webkit-scrollbar-track{background:#F3F4F6}
.mo-body::-webkit-scrollbar-thumb{background:#BEE3F8;border-radius:4px}
.mo-body::-webkit-scrollbar-thumb:hover{background:#4A6FA5}

/* ONBOARDING ENSEIGNANT -- texte foncé sur card blanche */
.ob-ens-card .ob-h1{color:#1A2E4A!important}
.ob-ens-card .ob-sub{color:#374151!important}
.ob-ens-card .ob-steps{margin:10px 0}

/* CATALOGUE PREMIUM */
.cat-tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:18px;border-bottom:1px solid var(--gb);padding-bottom:0}
.cat-tab{padding:8px 14px;border-radius:8px 8px 0 0;font-size:12px;font-weight:600;cursor:pointer;color:var(--gm);transition:all .15s;border-bottom:3px solid transparent;margin-bottom:-1px}
.cat-tab:hover{background:#F0F4FF;color:var(--bl)}
.cat-tab.on{background:#fff;color:var(--bl);border-bottom:3px solid var(--bl);font-weight:700}
.cat-count{background:#EBF4FF;color:var(--bl);font-size:9px;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:4px}
.cat-section{margin-bottom:28px}
.cat-section-title{font-size:14px;font-weight:700;color:var(--t1);margin-bottom:12px;display:flex;align-items:center}
.pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.pc{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);cursor:pointer;transition:all .2s;border:1px solid var(--gb)}
.pc:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.12)}
.pi-wrap{position:relative;overflow:hidden;background:#f8faff}
.pi{width:100%;height:130px;object-fit:cover;display:block}
.prod-marque{position:absolute;top:8px;left:8px;font-size:9px;font-weight:800;color:#fff;padding:2px 8px;border-radius:12px;letter-spacing:.5px}
.prod-badge{display:inline-block;font-size:9px;font-weight:600;padding:2px 8px;border-radius:10px;margin-top:6px}
.prod-badge-ok{background:#D1FAE5;color:#065F46}
.prod-badge-low{background:#FEF3C7;color:#92400E}
.prod-badge-cmd{background:#EDE9FE;color:#5B21B6}
.pin{padding:10px 12px}
.pnom{font-size:12px;font-weight:700;color:var(--t1);line-height:1.3;margin-bottom:2px}
.pref{font-size:10px;color:var(--gm)}
.pprix{font-size:15px;font-weight:800;color:var(--bl)}
.pmarge{font-size:10px;color:#276749;font-weight:600}
#fiche-produit{display:none;margin-bottom:20px}
#fiche-produit.on{display:block}
</style>
</head>
<body>
<button class="btn-print no-print" onclick="window.print()">🖨️ Imprimer / Enregistrer en PDF</button>
<div class="page">

<!-- EN-TÊTE -->
<div class="hd">
  <div><div class="hd-logo">'+getNomEntreprise()+'</div><div class="hd-sub">'+getVille()+' (91)</div></div>
  <div class="hd-r">
    <div class="hd-tag">Portfolio d'activités professionnelles — Bac Pro MCV</div>
    <div class="hd-nom">${nom}</div>
    <div class="hd-info">${poste}</div>
    <div class="hd-info">${classe} · Généré le ${date}</div>
  </div>
</div>

<!-- RÉSUMÉ -->
${buildResume(ud,score)}

<!-- ÉPREUVES -->
${buildEpreuves(ud,mail,s)}

<!-- PIED DE PAGE -->
<div class="footer">
  <div>
    <div>Document d'aide au positionnement — généré depuis la plateforme LABORO</div>
    <div style="margin-top:2px">Enseignant responsable : M. Pascal Berruelle — Bac Pro MCV</div>
  </div>
  <div style="text-align:right">
    <div class="sign-label">Visa enseignant</div>
    <div class="sign-box"></div>
  </div>
</div>

</div>
<div class="rl">Score LABORO /100</div></div>
    <div class="rk"><div class="rv">${done.length}</div><div class="rl">Missions validées</div></div>
    <div class="rk"><div class="rv">${avg}</div><div class="rl">Moyenne générale /20</div></div>
    <div class="rk"><div class="rv">${compOk}/12</div><div class="rl">Compétences acquises</div></div>
  </div>`;

  try{
    // Essayer d'abord window.open
    const win=window.open('','_blank');
    if(win){
      win.document.write(html);
      win.document.close();
    } else {
      // Fallback : téléchargement direct
      const blob=new Blob([html],{type:'text/html;charset=utf-8'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;
      a.download='portfolio-laboro.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }catch(e){alert('Erreur portfolio: '+e.message);}
}

function renderClasse(){
  const allUsers=allU().filter(u=>u.mail&&!u.mail.includes('berruelle'));

  // Construire les onglets dynamiquement à partir des classes détectées
  const classes=[...new Set(allUsers.map(u=>u.classe||'Inconnue'))].sort();
  const tabsEl=document.getElementById('classe-tabs');
  if(tabsEl){
    // Garder le bouton "Toutes" et reconstruire les onglets de classe
    tabsEl.innerHTML=`<div style="font-size:11px;font-weight:700;color:var(--gm);margin-right:4px">Filtrer :</div>
      <div class="cls-tab${classeFiltre===''?' on':''}" onclick="filtrerClasse('',this)">Toutes <span class="${classeFiltre===''?'cls-count':'cls-count-off'}">${allUsers.length}</span></div>
      ${classes.map(cls=>{
        const n=allUsers.filter(u=>(u.classe||'Inconnue')===cls).length;
        const att=allUsers.filter(u=>(u.classe||'Inconnue')===cls&&Object.values(u.missions||{}).some(m=>m.status==='att')).length;
        const clsColor=cls.includes('2nde')?'#2E7D5E':cls.includes('Term')?'#7B2D42':'#185FA5';
        const clsBg=cls.includes('2nde')?'#E1F5EE':cls.includes('Term')?'#F9E8EE':'#E6F1FB';
        const activeStyle=classeFiltre===cls?`background:${clsColor};color:#fff;border-color:${clsColor}`:`border-color:${clsColor};color:${clsColor}`;
        return`<div class="cls-tab${classeFiltre===cls?' on':''}" onclick="filtrerClasse('${cls}',this)" style="${activeStyle}">${cls} <span style="font-size:9px;background:${classeFiltre===cls?'rgba(255,255,255,.25)':clsBg};color:${classeFiltre===cls?'#fff':clsColor};padding:1px 5px;border-radius:8px">${n}</span>${att>0?` <span style="font-size:9px;background:var(--am);color:#fff;padding:1px 5px;border-radius:8px">${att}⚡</span>`:''}</div>`;
      }).join('')}`;
  }

  // Filtrer les élèves selon l'onglet actif
  const users=classeFiltre?allUsers.filter(u=>(u.classe||'Inconnue')===classeFiltre):allUsers;

  // Stats rapides de la sélection
  const statsEl=document.getElementById('classe-stats');
  if(statsEl&&users.length){
    const totalDone=users.reduce((a,u)=>a+Object.values(u.missions||{}).filter(m=>m.status==='done').length,0);
    const totalAtt=users.reduce((a,u)=>a+Object.values(u.missions||{}).filter(m=>m.status==='att').length,0);
    const allScores=users.flatMap(u=>Object.values(u.missions||{}).filter(m=>m.score).map(m=>m.score));
    const avgGlobal=allScores.length?(allScores.reduce((a,b)=>a+b,0)/allScores.length).toFixed(1):'—';
    const avgScore=users.length?(users.reduce((a,u)=>a+calcScore(u),0)/users.length).toFixed(0):'—';
    statsEl.innerHTML=`
      <div style="background:var(--bc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--bl)">${users.length}</div><div class="u-label-up">Élèves</div></div>
      <div style="background:var(--vc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--vt)">${totalDone}</div><div class="u-label-up">Missions validées</div></div>
      <div style="background:var(--ac);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--am)">${totalAtt}</div><div class="u-label-up">En attente</div></div>
      <div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">${avgGlobal}/20</div><div class="u-label-up">Moyenne classe</div></div>`;
  } else if(statsEl){
    statsEl.innerHTML='';
  }

  // Titre du tableau
  const titreEl=document.getElementById('cl-titre');
  if(titreEl)titreEl.textContent=classeFiltre?`Classe : ${classeFiltre} — ${users.length} élève(s)`:'Toutes les classes — cliquer sur un élève pour sa fiche';

  const lc=['var(--gb)','#85B7EB','var(--bl)','var(--vt)','#27500A'];
  const tb=document.getElementById('cl-tbody');
  if(!users.length){
    tb.innerHTML=`<tr><td colspan="9" style="padding:16px;color:var(--gm);font-size:12px">${classeFiltre?'Aucun élève dans cette classe pour le moment.':'Aucun élève connecté pour le moment.'}</td></tr>`;
    renderMDJListe();return;
  }
  tb.innerHTML=users.map(u=>{
    const done=Object.values(u.missions||{}).filter(m=>m.status==='done').length;
    const att=Object.values(u.missions||{}).filter(m=>m.status==='att').length;
    const totalCDP=Object.values(u.missions||{}).reduce((s,m)=>s+(m.coup_de_pouce||0),0);
    const sc2=Object.values(u.missions||{}).filter(m=>m.score).map(m=>m.score);
    const avg=sc2.length?(sc2.reduce((a,b)=>a+b,0)/sc2.length).toFixed(1):'—';
    const sc=calcScore(u);
    const cls=u.classe||'—';
    const c1=Math.max(...COMP.filter(c=>c.g==='G1').map(c=>u.competences?.[c.code]||0),0);
    const c2=Math.max(...COMP.filter(c=>c.g==='G2').map(c=>u.competences?.[c.code]||0),0);
    const c3=Math.max(...COMP.filter(c=>c.g==='G3').map(c=>u.competences?.[c.code]||0),0);
    const c4=Math.max(...COMP.filter(c=>c.g==='G4A'||c.g==='G4B').map(c=>u.competences?.[c.code]||0),0);
    return`<tr data-mail="${u.mail}" onclick="selectEleve('${u.mail}');showFicheEleve('${u.mail}')" style="cursor:pointer;${att>0?'background:var(--ac)':''}">
      <td style="font-weight:700">${u.nom||u.mail}</td>
      <td class="u-label-sm">${cls}</td>
      <td><span class="dl" style="background:${lc[c1]}"></span></td>
      <td><span class="dl" style="background:${lc[c2]}"></span></td>
      <td><span class="dl" style="background:${lc[c3]}"></span></td>
      <td><span class="dl" style="background:${lc[c4]}"></span></td>
      <td style="font-weight:700;color:var(--bl)">${sc}/100</td>
      <td>${(()=>{const pp=calcPosturePro(u);const pl=getPostureLabel(pp);return '<span style="background:'+pl.bg+';color:'+pl.color+';padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700">'+pp+'%</span>';})()}</td>
      <td>${done}${att>0?` <span style="font-size:10px;background:var(--am);color:#fff;padding:1px 5px;border-radius:4px">${att}⚡</span>`:''}</td>
      <td style="font-weight:700;color:${parseFloat(avg)>=11?'var(--vt)':'var(--rg)'}">${avg}</td>
    </tr>`;
  }).join('');
  renderMDJListe();
}

function showFicheEleve(mail){
  const s=gS();const u={mail,...(s[mail]||{missions:{},competences:{}})};
  const nom=u.nom||mail;
  const done=Object.values(u.missions).filter(m=>m.status==='done').length;
  const att=Object.entries(u.missions).filter(([,m])=>m.status==='att');
  const sc2=Object.values(u.missions).filter(m=>m.score).map(m=>m.score);
  const avg=sc2.length?(sc2.reduce((a,b)=>a+b,0)/sc2.length).toFixed(1):'—';
  const sc=calcScore(u);
  const lc=['var(--gb)','#85B7EB','var(--bl)','var(--vt)','#27500A'];
  const ll=['Non démarré','Découverte','En progression','Acquis','Maîtrisé'];
  const ini=nom.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
  const savedObs=s[mail]?.obs_ens||'';
  const alerts=[];
  COMP.forEach(c=>{const lv=u.competences[c.code]||0;if(lv===0&&(c.g==='G1'||c.g==='G4A'||c.g==='G4B'))alerts.push({type:'warn',txt:`${c.code} — ${c.label} : non démarrée`});if(lv>=3)alerts.push({type:'ok',txt:`${c.code} — Point fort : ${ll[lv]}`});});
  att.forEach(([mid,mv])=>{const m=MISSIONS.find(x=>x.id===mid);if(m)alerts.push({type:'warn',txt:`${m.titre} — soumise, note IA ${mv.note_ia}/20 — en attente de validation`});});
  document.getElementById('fe-wrap').innerHTML=`<div class="fe">
    <div class="fe-hd"><div style="display:flex;align-items:center;gap:12px"><div class="avu" style="width:44px;height:44px;font-size:16px">${ini}</div><div><div style="font-size:16px;font-weight:700">${nom}</div><div style="font-size:11px;opacity:.8;margin-top:2px">${mail}</div></div></div><div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px"><div style="font-size:28px;font-weight:900">${sc}</div><div style="font-size:10px;opacity:.8">Score LABORO /100</div><button onclick="genererPortfolioEleve('${mail}')" style="padding:6px 12px;background:rgba(255,255,255,.2);color:#fff;border:.5px solid rgba(255,255,255,.4);border-radius:6px;cursor:pointer;font-size:11px;font-weight:700">📄 Portfolio</button></div></div>
    <div class="fe-kpis" style="${totalCDP>0?'grid-template-columns:repeat(5,1fr)':'grid-template-columns:repeat(4,1fr)'}"><div class="fe-kpi"><div class="fe-kv">${done}</div><div class="fe-kl">Validées</div></div><div class="fe-kpi"><div class="fe-kv">${avg}</div><div class="fe-kl">Moyenne /20</div></div><div class="fe-kpi"><div class="fe-kv">${Object.values(u.competences).filter(v=>v>0).length}/12</div><div class="fe-kl">Compétences</div></div><div class="fe-kpi"><div class="fe-kv">${att.length}</div><div class="fe-kl">À valider</div></div>${totalCDP>0?'<div class="fe-kpi" style="background:#FFFBEA"><div class="fe-kv" style="color:#8A6500">'+(totalCDP)+ '</div><div class="fe-kl" style="color:#A07800">💡 Coups de pouce</div></div>':''}</div>
    ${alerts.length?`<div class="fe-sec"><div class="fe-st">Points d'attention</div>${alerts.slice(0,4).map(a=>`<div class="al-row al-${a.type}"><div class="al-dot" style="background:${a.type==='warn'?'var(--am)':'var(--vt)'}"></div>${a.txt}</div>`).join('')}</div>`:''}
    <div class="fe-sec"><div class="fe-st">Progression par compétence</div>${COMP.map(c=>{const lv=u.competences[c.code]||0;return`<div class="cr"><span class="cr-code">${c.code}</span><span class="cr-label">${c.label}</span><div class="cr-bar"><div class="cr-fill" style="width:${lv*25}%;background:${lc[lv]}"></div></div><span class="cr-txt" style="color:${lc[lv]}">${ll[lv]}</span></div>`;}).join('')}</div>
    <div class="fe-sec"><div class="fe-st">Missions</div>
      <div class="mr hdr"><span>Mission</span><span>Comp.</span><span>Tent.</span><span>Note</span><span>Statut</span></div>
      ${Object.entries(u.missions).map(([mid,mv])=>{const m=MISSIONS.find(x=>x.id===mid);if(!m)return'';const nc=mv.score>=17?'nb-h':mv.score>=11?'nb-m':'nb-l';return`<div class="mr"><span style="font-size:11px">${m.titre}</span><span class="u-label-sm">${m.comp} P${m.palier}</span><span style="text-align:center">${mv.tentatives||1}/2</span><span><div class="nb2 ${mv.score?nc:''}">${mv.score?mv.score+'/20':mv.note_ia?'IA:'+mv.note_ia:'-'}</div></span><span>${mv.status==='done'?'<span style="color:var(--vt);font-size:11px;font-weight:700">✓ Validée</span>':mv.status==='att'?`<button onclick="validerMission('${mail}','${mid}')" style="padding:3px 8px;background:var(--bl);color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:11px">Valider ${mv.note_ia}/20</button>`:'-'}</span></div>`;}).join('')}
    </div>
    <div class="fe-sec"><div class="fe-st">Observations enseignant</div><textarea class="obs-area" id="obs-${mail}" placeholder="Observations, points forts, axes de progression…">${savedObs}</textarea><button class="btn-obs-s" onclick="saveObs('${mail}')">Enregistrer</button></div>
  </div>`;
  document.getElementById('fe-wrap').scrollIntoView({behavior:'smooth'});
}
function handleMission(id){
  const ud = gUD();
  const m = MISSIONS.find(function(x){ return x.id===id; });
  if(!m) return;
  const locked = !isPalierUnlocked(m, ud) && CU.classe !== 'enseignant';
  if(locked){
    alert('Palier '+(m.palier-1)+' requis. Valide une mission de ce palier avec une note >= 11/20.');
    return;
  }
  openMission(id);
}
function renderIndicateursPedago(){
  const el = document.getElementById('indic-pedago');
  if(!el || !CU) return;
  if(CU.classe === 'enseignant') return;
  const ud = gUD();
  const allMissions = getMissions();
  const done = allMissions.filter(function(m){ return ud.missions[m.id]?.status==='done'; });
  const wip  = allMissions.filter(function(m){ return ud.missions[m.id]?.status==='wip'; });
  const scores = done.filter(function(m){ return ud.missions[m.id]?.score; }).map(function(m){ return ud.missions[m.id].score; });
  const avg = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length) : 0;

  // Répartition par palier
  const byPalier = [0,0,0,0,0];
  done.forEach(function(m){ byPalier[m.palier]++; });

  // Répartition par compétence
  const byComp = {};
  done.forEach(function(m){
    const key = m.comp.split('.')[0];
    byComp[key] = (byComp[key]||0) + 1;
  });

  // Taux de réussite (score >= 11)
  const reussi = scores.filter(function(s){ return s>=11; }).length;
  const tauxReussite = scores.length ? Math.round(reussi/scores.length*100) : 0;

  // Meilleur score
  const bestScore = scores.length ? Math.max.apply(null, scores) : 0;

  const palierColors = ['','#4A6FA5','#2D5282','#276749','#7B2FBE'];
  const palierLabels = ['','Débutant','Apprenti','Pro compétent','Pro performant'];
  const maxByPalier = Math.max.apply(null, byPalier.slice(1)) || 1;

  el.innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'

    // Graphique répartition par palier
    + '<div class="card">'
    + '<div class="ct">📊 Mes missions par palier</div>'
    + '<div class="u-flex-col">'
    + [1,2,3,4].map(function(p){
        const count = byPalier[p];
        const pct = Math.round(count/maxByPalier*100);
        return '<div>'
          + '<div style="display:flex;justify-content:space-between;margin-bottom:4px">'
          + '<span style="font-size:11px;font-weight:700;color:'+palierColors[p]+'">'+palierLabels[p]+'</span>'
          + '<span style="font-size:11px;font-weight:800;color:#1A2E4A">'+count+' mission'+(count>1?'s':'')+'</span>'
          + '</div>'
          + '<div style="background:#E2E8F0;border-radius:6px;height:10px;overflow:hidden">'
          + '<div style="height:100%;width:'+pct+'%;background:'+palierColors[p]+';border-radius:6px;transition:width .5s"></div>'
          + '</div>'
          + '</div>';
      }).join('')
    + '</div>'
    + '</div>'

    // Stats de performance
    + '<div class="card">'
    + '<div class="ct">🎯 Ma performance</div>'
    + '<div class="u-grid-2">'

    + '<div style="background:#F0FFF4;border-radius:10px;padding:12px;text-align:center">'
    + '<div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Taux de réussite</div>'
    + '<div style="font-size:24px;font-weight:900;color:'+(tauxReussite>=80?'#276749':tauxReussite>=60?'#D97706':'#C53030')+'">'+tauxReussite+'%</div>'
    + '<div class="u-label">note ≥ 11/20</div>'
    + '</div>'

    + '<div style="background:#EBF4FF;border-radius:10px;padding:12px;text-align:center">'
    + '<div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Meilleur score</div>'
    + '<div style="font-size:24px;font-weight:900;color:#2D5282">'+( bestScore>0 ? bestScore+'/20' : '—')+'</div>'
    + '<div class="u-label">sur toutes les missions</div>'
    + '</div>'

    + '<div style="background:#FFF7ED;border-radius:10px;padding:12px;text-align:center">'
    + '<div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Missions terminées</div>'
    + '<div style="font-size:24px;font-weight:900;color:#D97706">'+done.length+'/'+allMissions.length+'</div>'
    + '<div class="u-label">'+Math.round(done.length/allMissions.length*100)+'% complété</div>'
    + '</div>'

    + '<div style="background:#FAF5FF;border-radius:10px;padding:12px;text-align:center">'
    + '<div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Moyenne générale</div>'
    + '<div style="font-size:24px;font-weight:900;color:#7B2FBE">'+(avg>0?avg.toFixed(1)+'/20':'—')+'</div>'
    + '<div class="u-label">sur missions notées</div>'
    + '</div>'

    + '</div>'
    + '</div>'

    // SVG Jauge niveau global
    + '<div class="card" style="grid-column:1/-1">'
    + '<div class="ct">📈 Progression vers le niveau suivant</div>'
    + (function(){
        const compAcquis = COMP.filter(function(c){ return calcNiveauComp(c.code,ud)>=3; }).length;
        const pct = Math.round(compAcquis/COMP.length*100);
        const nextMilestone = pct<25?25:pct<50?50:pct<75?75:100;
        const pctToNext = Math.round((pct/(nextMilestone))*100);
        return '<div style="margin-bottom:10px">'
          + '<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:6px">'
          + '<span class="u-subtitle">'+compAcquis+'/'+COMP.length+' compétences acquises ('+pct+'%)</span>'
          + '<span class="u-muted">Prochain palier : '+nextMilestone+'%</span>'
          + '</div>'
          + '<div style="position:relative;background:#E2E8F0;border-radius:10px;height:14px;overflow:hidden">'
          + '<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#4A6FA5,#276749);border-radius:10px;transition:width .6s"></div>'
          + [25,50,75].map(function(mark){
              return '<div style="position:absolute;top:0;left:'+mark+'%;width:2px;height:100%;background:#fff;opacity:.6"></div>';
            }).join('')
          + '</div>'
          + '<div style="display:flex;justify-content:space-between;font-size:9px;color:#9CA3AF;margin-top:3px">'
          + '<span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>'
          + '</div>'
          + '</div>';
      })()
    + '</div>'

    + '</div>';
}

// ═══ FONCTIONS UTILITAIRES MANQUANTES ═══

function ajouterDevis(pid){
  const p = PRODUITS.find(function(x){ return x.id===pid; });
  if(!p) return;
  showNotifEleve('Produit "'+p.nom+'" noté pour le devis. Fonctionnalité disponible dans les missions de négociation B2B.', 'info');
}

function voirMissionsLiees(cat){
  goP('missions', null);
  setTimeout(function(){ renderMissions(); }, 100);
}

// addClient() définie dans clients.js

function populateMDJSelect(){
  const sel = document.getElementById('mdj-select');
  if(!sel) return;
  sel.innerHTML = '<option value="">-- Choisir une mission du jour --</option>'
    + MISSIONS.map(function(m){
        return '<option value="'+m.id+'">'+m.titre+' (P'+m.palier+' — '+m.comp+')</option>';
      }).join('');
}

// ═══════════════════════════════════════════════════════
// ESPACE PRÉPARATION E2 AGEC — LABORO Sport & Outdoor
// ═══════════════════════════════════════════════════════

// Données et rendus E2 chargés depuis les fichiers externes :
// - data/e2-agec.js  (sujet + corrigés + fonctions AGEC)
// - data/e2-pvoc.js  (sujet + corrigés + fonctions PVOC)
