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


