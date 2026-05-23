// ================================================
//   LABORO Sport & Outdoor — Catalogue produits
//   Rendu catalogue LABORO, produits, navigation
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

// ═══ Images par produit ═══
const PROD_IMAGES = {
  'FOO-001': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/ballon-pro-match-t5.png.png',
  'FOO-002': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/ballon-training-t4.png.png',
  'FOO-003': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/chaussures-terrain-souple-fg.png.png',
  'FOO-004': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/chaussure-futsal-ic.png.png',
  'FOO-005': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/maillot-club-personnalisable.png.png',
  'FOO-006': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/short-match-assorti.png.png',
  'FOO-007': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/chasuble-training-x10.png.png',
  'FOO-008': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/football/ballon-gardien-gk.png.png',
  'BAS-001': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/ballon-officiel-t7.png',
  'BAS-002': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/ballon-outdoor-t7.png',
  'BAS-003': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/sneakers-low-top.png',
  'BAS-004': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/sneakers-high-top.png',
  'BAS-005': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/maillot-reversible-club.png',
  'BAS-006': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/short-basket-performance.png',
  'BAS-007': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/sac-de-sport-urbain-30l.png',
  'BAS-008': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/basketball/chaussettes-grip-x3.png',
  'RUN-001': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/chaussures-route-velocity.png',
  'RUN-002': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/chaussures-trail-grip-x.png',
  'RUN-003': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/chaussures-debutant-easyrun.png',
  'RUN-004': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/montre-gps-run-watch.png',
  'RUN-005': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/t-shirt-technique-dri-fit.png',
  'RUN-006': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/veste-coupe-vent-legere.png',
  'RUN-007': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/brassard-smartphone.png',
  'RUN-008': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Running/ceinture-porte-bidon-2x250ml.png',
  'FIT-001': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/halteres-neoprene-2x2kg.png',
  'FIT-002': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/halteres-fonte-2x5kg.png',
  'FIT-003': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/tapis-yoga-6mm.png',
  'FIT-004': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/bandes-elastiques-set-x5.png',
  'FIT-005': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/foam-roller-massage-45cm.png',
  'FIT-006': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/corde-a-sauter-pro.png',
  'FIT-007': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/gourde-isotherme-750ml.png',
  'FIT-008': 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/Fitness/legging-compression.png',
  'LAB-001': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75',
  'LAB-002': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75',
  'LAB-003': 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=75',
  'LAB-004': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75',
  'LAB-005': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=75',
  'LAB-006': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75',
  'LAB-007': 'https://images.unsplash.com/photo-1517747614396-d21a78b850e8?w=400&q=75',
  'LAB-008': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=75',
};

// Couleurs accent par gamme
const CAT_CFG = {
  'Football':       {col:'#E63B2E', light:'#FFF0EF'},
  'Basketball':     {col:'#E87722', light:'#FFF5ED'},
  'Running':        {col:'#0096C7', light:'#EFF9FF'},
  'Fitness':        {col:'#7B2FBE', light:'#F8F0FF'},
  'LABORO Pro Line':{col:'#185FA5', light:'#EBF4FF'}
};

function renderProdCard(p){
  const c = CAT_CFG[p.cat]||{col:'#185FA5', light:'#EBF4FF'};
  const img = PROD_IMAGES[p.id] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75';
  
  const stockBadge = p.stock===0
    ? '<span style="display:inline-block;font-size:9px;font-weight:700;color:#6B7280;background:#F3F4F6;padding:3px 8px;border-radius:6px;margin-top:6px">Sur commande</span>'
    : p.stock<=p.seuil
    ? '<span style="display:inline-block;font-size:9px;font-weight:700;color:#B45309;background:#FEF3C7;padding:3px 8px;border-radius:6px;margin-top:6px">⚠ Stock faible</span>'
    : '<span style="display:inline-block;font-size:9px;font-weight:700;color:#185FA5;background:#EBF4FF;padding:3px 8px;border-radius:6px;margin-top:6px">✓ En stock</span>';

  return '<div class="pc" onclick="openProduit(\''+p.id+'\')">'
    // Zone image
    + '<div style="position:relative;height:148px;overflow:hidden;background:#F8FAFC;border-radius:10px 10px 0 0">'
    + '<img src="'+img+'" alt="'+p.nom+'" loading="lazy" width="400" height="148" style="width:100%;height:100%;object-fit:cover;transition:transform .3s" '
    + 'onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">'
    + '<div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:48px;background:#F1F5F9">🏷️</div>'
    // Badge marque
    + '<div style="position:absolute;bottom:8px;left:8px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);border:1px solid rgba(0,0,0,.08);color:#374151;font-size:9px;font-weight:800;padding:3px 9px;border-radius:20px;letter-spacing:.4px">'+p.marque+'</div>'
    + '</div>'
    // Infos
    + '<div style="padding:12px 14px 14px">'
    + '<div style="font-size:13px;font-weight:800;color:#0A2540;line-height:1.35;margin-bottom:3px">'+p.nom+'</div>'
    + '<div style="font-size:10px;color:#94A3B8;margin-bottom:10px">Réf. '+p.ref+'</div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between">'
    + '<div style="font-size:18px;font-weight:900;color:'+c.col+';letter-spacing:-.5px">'+p.pv+' €</div>'
    + '<div style="font-size:10px;color:'+c.col+';font-weight:700;background:'+c.light+';padding:3px 8px;border-radius:8px">+'+p.mar+'%</div>'
    + '</div>'
    + stockBadge
    + '</div></div>';
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
  const bgs = {info:'#0A2540', success:'#0A2540', warning:'#7B3F00', rappel:'#1A2E4A'};
  const borders = {info:'#185FA5', success:'#4A9EE8', warning:'#D97706', rappel:'#4A6FA5'};
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


