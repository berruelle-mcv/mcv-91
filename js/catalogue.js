// ================================================
//   LABORO Sport & Outdoor — Catalogue produits
//   Rendu catalogue LABORO, produits, navigation
//   Version 2.0 — 11 catégories / 176 produits
// ================================================

// ═══ CONFIGURATION CATÉGORIES ═══
const CAT_CFG = {
  'Football':                  {col:'#E63B2E', light:'#FFF0EF'},
  'Basketball':                {col:'#E87722', light:'#FFF5ED'},
  'Running':                   {col:'#0096C7', light:'#EFF9FF'},
  'Fitness':                   {col:'#7B2FBE', light:'#F8F0FF'},
  'LABORO Pro Line':           {col:'#185FA5', light:'#EBF4FF'},
  'Natation':                  {col:'#0077B6', light:'#E0F4FF'},
  'Tennis / Padel':            {col:'#F5A623', light:'#FFF8E6'},
  'Cyclisme':                  {col:'#27AE60', light:'#EDFBF2'},
  'Sports de combat':          {col:'#C0392B', light:'#FDF0EF'},
  'Outdoor / Randonnée':       {col:'#6B8E23', light:'#F4F8EC'},
  'Rugby / Handball / Volley': {col:'#2C3E7A', light:'#EEF1FF'}
};

// ═══ IMAGES PAR PRODUIT ═══
const BASE = 'https://raw.githubusercontent.com/berruelle-mcv/mcv-91/main/img/';

const PROD_IMAGES = {
  // FOOTBALL
  'LAB-FOO-001': BASE+'football/ballon-pro-match-t5.png',
  'LAB-FOO-002': BASE+'football/ballon-training-t4.png',
  'LAB-FOO-003': BASE+'football/chaussures-terrain-souple-fg.png',
  'LAB-FOO-004': BASE+'football/chaussures-futsal-ic.png',
  'LAB-FOO-005': BASE+'football/maillot-club-personnalisable.png',
  'LAB-FOO-006': BASE+'football/short-match-assorti.png',
  'LAB-FOO-007': BASE+'football/chasuble-training-x10.png',
  'LAB-FOO-008': BASE+'football/ballon-gardien-gk.png',
  'LAB-FOO-009': BASE+'football/gants-gardien-pro.png',
  'LAB-FOO-010': BASE+'football/protege-tibias-adulte.png',
  'LAB-FOO-011': BASE+'football/sac-50l.png',
  'LAB-FOO-012': BASE+'football/filet-but-entrainement.png',
  'LAB-FOO-013': BASE+'football/pompe-ballon-manuelle.png',
  'LAB-FOO-014': BASE+'football/bandeau-manchettes-assortis.png',
  'LAB-FOO-015': BASE+'football/veste-entrainement-coupe-vent.png',
  'LAB-FOO-016': BASE+'football/survetement-club-2-pieces.png',
  // BASKETBALL
  'LAB-BAS-001': BASE+'basketball/ballon-officiel-t7.png',
  'LAB-BAS-002': BASE+'basketball/ballon-outdoor-t7.png',
  'LAB-BAS-003': BASE+'basketball/sneakers-low-top.png',
  'LAB-BAS-004': BASE+'basketball/sneakers-high-top.png',
  'LAB-BAS-005': BASE+'basketball/maillot-reversible-club.png',
  'LAB-BAS-006': BASE+'basketball/short-basket-performance.png',
  'LAB-BAS-007': BASE+'basketball/sac-sport-urbain-30l.png',
  'LAB-BAS-008': BASE+'basketball/chaussettes-grip-x3.png',
  'LAB-BAS-009': BASE+'basketball/panier-basket-portable.png',
  'LAB-BAS-010': BASE+'basketball/protege-genoux-basketball.png',
  'LAB-BAS-011': BASE+'basketball/debardeur-technique-mesh.png',
  'LAB-BAS-012': BASE+'basketball/manchettes-bras-compression.png',
  'LAB-BAS-013': BASE+'basketball/sac-a-dos-basketball-25l.png',
  'LAB-BAS-014': BASE+'basketball/bouteille-sport-1l.png',
  'LAB-BAS-015': BASE+'basketball/bandeau-frontal-sport.png',
  'LAB-BAS-016': BASE+'basketball/chaussettes-mi-mollet-x3.png',
  // RUNNING
  'LAB-RUN-001': BASE+'running/chaussures-route-velocity.png',
  'LAB-RUN-002': BASE+'running/chaussures-trail-grip-x.png',
  'LAB-RUN-003': BASE+'running/chaussures-debutant-easyrun.png',
  'LAB-RUN-004': BASE+'running/montre-gps-run-watch.png',
  'LAB-RUN-005': BASE+'running/t-shirt-technique-dry-fit.png',
  'LAB-RUN-006': BASE+'running/veste-coupe-vent-legere.png',
  'LAB-RUN-007': BASE+'running/brassard-smartphone.png',
  'LAB-RUN-008': BASE+'running/ceinture-porte-bidon-2x250ml.png',
  'LAB-RUN-009': BASE+'running/chaussures-trail-expert-carbone.png',
  'LAB-RUN-010': BASE+'running/chaussettes-anti-ampoules-x3.png',
  'LAB-RUN-011': BASE+'running/bonnet-running-thermique.png',
  'LAB-RUN-012': BASE+'running/gants-running-tactiles.png',
  'LAB-RUN-013': BASE+'running/gilet-reflechissant-haute-visibilite.png',
  'LAB-RUN-014': BASE+'running/sac-hydratation-10l.png',
  'LAB-RUN-015': BASE+'running/semelles-orthopediques-sport.png',
  'LAB-RUN-016': BASE+'running/short-running-2-en-1.png',
  // FITNESS
  'LAB-FIT-001': BASE+'fitness/halteres-neoprene-2x2kg.png',
  'LAB-FIT-002': BASE+'fitness/halteres-fonte-2x5kg.png',
  'LAB-FIT-003': BASE+'fitness/tapis-yoga-6mm.png',
  'LAB-FIT-004': BASE+'fitness/bandes-elastiques-set-x5.png',
  'LAB-FIT-005': BASE+'fitness/foam-roller-massage-45cm.png',
  'LAB-FIT-006': BASE+'fitness/corde-a-sauter-pro.png',
  'LAB-FIT-007': BASE+'fitness/gourde-isotherme-750ml.png',
  'LAB-FIT-008': BASE+'fitness/legging-compression.png',
  'LAB-FIT-009': BASE+'fitness/kettlebell-fonte-12kg.png',
  'LAB-FIT-010': BASE+'fitness/barre-traction-murale.png',
  'LAB-FIT-011': BASE+'fitness/rouleau-massage-vibrant.png',
  'LAB-FIT-012': BASE+'fitness/tapis-sol-15mm.png',
  'LAB-FIT-013': BASE+'fitness/gants-musculation.png',
  'LAB-FIT-014': BASE+'fitness/shaker-proteine-700ml.png',
  'LAB-FIT-015': BASE+'fitness/banc-musculation-pliable.png',
  'LAB-FIT-016': BASE+'fitness/chaussures-cross-training.png',
  // LABORO PRO LINE
  'LAB-PRO-001': BASE+'laboro-pro-line/polo-club-personnalisable.png',
  'LAB-PRO-002': BASE+'laboro-pro-line/veste-softshell-logo-brode.png',
  'LAB-PRO-003': BASE+'laboro-pro-line/sac-a-dos-30l-personnalise.png',
  'LAB-PRO-004': BASE+'laboro-pro-line/dossards-equipe-x10.png',
  'LAB-PRO-005': BASE+'laboro-pro-line/bonnet-tricote-logo-laboro.png',
  'LAB-PRO-006': BASE+'laboro-pro-line/t-shirt-coton-premium-logo.png',
  'LAB-PRO-007': BASE+'laboro-pro-line/casquette-snapback-laboro.png',
  'LAB-PRO-008': BASE+'laboro-pro-line/chaussettes-logo-x3.png',
  'LAB-PRO-009': BASE+'laboro-pro-line/veste-pluie-personnalisable.png',
  'LAB-PRO-010': BASE+'laboro-pro-line/pantalon-jogging-logo.png',
  'LAB-PRO-011': BASE+'laboro-pro-line/gilet-sans-manches-club.png',
  'LAB-PRO-012': BASE+'laboro-pro-line/tour-de-cou-laboro.png',
  'LAB-PRO-013': BASE+'laboro-pro-line/porte-bidon-personnalise.png',
  'LAB-PRO-014': BASE+'laboro-pro-line/parapluie-laboro.png',
  'LAB-PRO-015': BASE+'laboro-pro-line/carnet-sport-laboro.png',
  'LAB-PRO-016': BASE+'laboro-pro-line/tote-bag-laboro.png',
  // NATATION
  'LAB-NAT-001': BASE+'natation/maillot-natation-competition-femme.png',
  'LAB-NAT-002': BASE+'natation/maillot-natation-competition-homme.png',
  'LAB-NAT-003': BASE+'natation/lunettes-natation-pro.png',
  'LAB-NAT-004': BASE+'natation/lunettes-natation-junior.png',
  'LAB-NAT-005': BASE+'natation/bonnet-silicone-adulte.png',
  'LAB-NAT-006': BASE+'natation/bonnet-silicone-junior.png',
  'LAB-NAT-007': BASE+'natation/palmes-entrainement.png',
  'LAB-NAT-008': BASE+'natation/planche-natation.png',
  'LAB-NAT-009': BASE+'natation/pull-buoy.png',
  'LAB-NAT-010': BASE+'natation/tuba-frontal.png',
  'LAB-NAT-011': BASE+'natation/combinaison-triathlon-femme.png',
  'LAB-NAT-012': BASE+'natation/combinaison-triathlon-homme.png',
  'LAB-NAT-013': BASE+'natation/serviette-microfibre-xl.png',
  'LAB-NAT-014': BASE+'natation/bouchons-oreilles-x3.png',
  'LAB-NAT-015': BASE+'natation/clip-nez.png',
  'LAB-NAT-016': BASE+'natation/montre-natation-gps.png',
  // TENNIS / PADEL
  'LAB-TEN-001': BASE+'tennis-padel/raquette-tennis-adulte.png',
  'LAB-TEN-002': BASE+'tennis-padel/raquette-tennis-junior.png',
  'LAB-TEN-003': BASE+'tennis-padel/raquette-padel-pro.png',
  'LAB-TEN-004': BASE+'tennis-padel/balles-tennis-x3.png',
  'LAB-TEN-005': BASE+'tennis-padel/balles-padel-x3.png',
  'LAB-TEN-006': BASE+'tennis-padel/sac-raquette-3-compartiments.png',
  'LAB-TEN-007': BASE+'tennis-padel/chaussures-tennis-terre-battue.png',
  'LAB-TEN-008': BASE+'tennis-padel/chaussures-tennis-dur.png',
  'LAB-TEN-009': BASE+'tennis-padel/chaussures-padel.png',
  'LAB-TEN-010': BASE+'tennis-padel/surgrip-x5.png',
  'LAB-TEN-011': BASE+'tennis-padel/bracelet-eponge-x2.png',
  'LAB-TEN-012': BASE+'tennis-padel/t-shirt-tennis-technique.png',
  'LAB-TEN-013': BASE+'tennis-padel/short-tennis-performance.png',
  'LAB-TEN-014': BASE+'tennis-padel/jupe-tennis-femme.png',
  'LAB-TEN-015': BASE+'tennis-padel/protege-coude-tennis.png',
  'LAB-TEN-016': BASE+'tennis-padel/vibrateur-anti-vibration-x2.png',
  // CYCLISME
  'LAB-CYC-001': BASE+'cyclisme/casque-route-aero.png',
  'LAB-CYC-002': BASE+'cyclisme/casque-vtt-integral.png',
  'LAB-CYC-003': BASE+'cyclisme/cuissard-route-pro.png',
  'LAB-CYC-004': BASE+'cyclisme/maillot-cyclisme-manches-courtes.png',
  'LAB-CYC-005': BASE+'cyclisme/maillot-cyclisme-manches-longues.png',
  'LAB-CYC-006': BASE+'cyclisme/veste-cyclisme-coupe-vent.png',
  'LAB-CYC-007': BASE+'cyclisme/chaussures-route-spd.png',
  'LAB-CYC-008': BASE+'cyclisme/chaussures-vtt-spd.png',
  'LAB-CYC-009': BASE+'cyclisme/gants-cyclisme-ete.png',
  'LAB-CYC-010': BASE+'cyclisme/gants-cyclisme-hiver.png',
  'LAB-CYC-011': BASE+'cyclisme/lunettes-cyclisme-polarisees.png',
  'LAB-CYC-012': BASE+'cyclisme/bidon-velo-750ml.png',
  'LAB-CYC-013': BASE+'cyclisme/sacoche-selle.png',
  'LAB-CYC-014': BASE+'cyclisme/casquette-cyclisme-sous-casque.png',
  'LAB-CYC-015': BASE+'cyclisme/chaussettes-cyclisme-x3.png',
  'LAB-CYC-016': BASE+'cyclisme/cuissard-vtt-baggy.png',
  // SPORTS DE COMBAT
  'LAB-COM-001': BASE+'sports-combat/gants-boxe-pro-10oz.png',
  'LAB-COM-002': BASE+'sports-combat/gants-boxe-pro-12oz.png',
  'LAB-COM-003': BASE+'sports-combat/protege-dents.png',
  'LAB-COM-004': BASE+'sports-combat/coquille-protection.png',
  'LAB-COM-005': BASE+'sports-combat/casque-boxe-sparring.png',
  'LAB-COM-006': BASE+'sports-combat/bandages-mains-4m-x2.png',
  'LAB-COM-007': BASE+'sports-combat/sac-de-frappe-90cm.png',
  'LAB-COM-008': BASE+'sports-combat/kimono-judo-blanc.png',
  'LAB-COM-009': BASE+'sports-combat/kimono-judo-bleu.png',
  'LAB-COM-010': BASE+'sports-combat/ceintures-judo.png',
  'LAB-COM-011': BASE+'sports-combat/protege-pieds-karate.png',
  'LAB-COM-012': BASE+'sports-combat/plastron-taekwondo.png',
  'LAB-COM-013': BASE+'sports-combat/gants-mma-pro.png',
  'LAB-COM-014': BASE+'sports-combat/short-mma-performance.png',
  'LAB-COM-015': BASE+'sports-combat/protege-tibias-combat.png',
  'LAB-COM-016': BASE+'sports-combat/sac-sport-arts-martiaux.png',
  // OUTDOOR / RANDONNÉE
  'LAB-OUT-001': BASE+'outdoor-randonnee/chaussures-trek-basses.png',
  'LAB-OUT-002': BASE+'outdoor-randonnee/chaussures-trek-hautes.png',
  'LAB-OUT-003': BASE+'outdoor-randonnee/chaussures-approche-escalade.png',
  'LAB-OUT-004': BASE+'outdoor-randonnee/sac-a-dos-trek-40l.png',
  'LAB-OUT-005': BASE+'outdoor-randonnee/sac-a-dos-trek-60l.png',
  'LAB-OUT-006': BASE+'outdoor-randonnee/batons-randonnee-x2.png',
  'LAB-OUT-007': BASE+'outdoor-randonnee/veste-impermeable-gore-tex.png',
  'LAB-OUT-008': BASE+'outdoor-randonnee/softshell-randonnee.png',
  'LAB-OUT-009': BASE+'outdoor-randonnee/t-shirt-merino-trek.png',
  'LAB-OUT-010': BASE+'outdoor-randonnee/pantalon-trek-convertible.png',
  'LAB-OUT-011': BASE+'outdoor-randonnee/guetres-randonnee.png',
  'LAB-OUT-012': BASE+'outdoor-randonnee/bonnet-merino.png',
  'LAB-OUT-013': BASE+'outdoor-randonnee/gants-trek-impermeables.png',
  'LAB-OUT-014': BASE+'outdoor-randonnee/lampe-frontale-300lm.png',
  'LAB-OUT-015': BASE+'outdoor-randonnee/gourde-inox-1l.png',
  'LAB-OUT-016': BASE+'outdoor-randonnee/couverture-de-survie.png',
  // RUGBY / HANDBALL / VOLLEY
  'LAB-RHV-001': BASE+'rugby-handball-volley/ballon-rugby-competition.png',
  'LAB-RHV-002': BASE+'rugby-handball-volley/ballon-rugby-training.png',
  'LAB-RHV-003': BASE+'rugby-handball-volley/ballon-handball-t3.png',
  'LAB-RHV-004': BASE+'rugby-handball-volley/ballon-handball-t2.png',
  'LAB-RHV-005': BASE+'rugby-handball-volley/ballon-volley-beach.png',
  'LAB-RHV-006': BASE+'rugby-handball-volley/ballon-volley-indoor.png',
  'LAB-RHV-007': BASE+'rugby-handball-volley/chaussures-handball-indoor.png',
  'LAB-RHV-008': BASE+'rugby-handball-volley/chaussures-volley-indoor.png',
  'LAB-RHV-009': BASE+'rugby-handball-volley/protege-doigts-volley-x2.png',
  'LAB-RHV-010': BASE+'rugby-handball-volley/genouilleres-volley-x2.png',
  'LAB-RHV-011': BASE+'rugby-handball-volley/short-rugby-performance.png',
  'LAB-RHV-012': BASE+'rugby-handball-volley/maillot-rugby-club.png',
  'LAB-RHV-013': BASE+'rugby-handball-volley/protege-dents-rugby.png',
  'LAB-RHV-014': BASE+'rugby-handball-volley/casque-rugby-soft.png',
  'LAB-RHV-015': BASE+'rugby-handball-volley/short-handball-performance.png',
  'LAB-RHV-016': BASE+'rugby-handball-volley/maillot-handball-reversible.png',
};

// ═══ CATALOGUE ═══
function renderCatalogue(catFiltre){
  const cats=[...new Set(PRODUITS.map(p=>p.cat))];
  const tabsHtml='<div class="cat-tabs">'
    +'<div class="cat-tab '+((!catFiltre)?'on':'')+'" onclick="renderCatalogue(\'\')">Tous <span class="cat-count">'+PRODUITS.length+'</span></div>'
    +cats.map(function(c){
      const count=PRODUITS.filter(function(p){return p.cat===c;}).length;
      const cc=CAT_CFG[c]||{col:'#4A6FA5'};
      const isActive=catFiltre===c;
      return '<div class="cat-tab '+(isActive?'on':'')+'" onclick="renderCatalogue(\''+c+'\')" style="'+(isActive?'border-bottom:3px solid '+cc.col+';color:'+cc.col:'')+'">'+c+' <span class="cat-count">'+count+'</span></div>';
    }).join('')+'</div>';

  let gridHtml='';
  const makeBanner=function(cat,filtered){
    const cc=CAT_CFG[cat]||{col:'#4A6FA5'};
    return '<div style="background:#F0F4FF;border:1px solid #D0DCF0;border-radius:14px;padding:14px 18px;margin-bottom:14px;display:flex;align-items:center;gap:16px">'
      +'<div style="width:10px;height:10px;border-radius:50%;background:'+cc.col+';flex-shrink:0"></div>'
      +'<div><div style="font-size:15px;font-weight:900;color:#0A2540">'+cat+'</div>'
      +'<div style="font-size:11px;color:#6B7280;margin-top:2px">'+PRODUITS.filter(function(p){return p.cat===cat;})[0]&&''+'</div></div>'
      +'<div style="margin-left:auto;font-size:11px;font-weight:700;color:#185FA5;background:#D6E8FF;padding:4px 12px;border-radius:20px">'+filtered.length+' produits</div>'
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

// ═══ CARD PRODUIT ═══
function renderProdCard(p){
  const c = CAT_CFG[p.cat]||{col:'#185FA5', light:'#EBF4FF'};
  const img = PROD_IMAGES[p.id] || 'https://via.placeholder.com/400x400/F8FAFC/94A3B8?text=LABORO';

  const stockBadge = p.stock===0
    ? '<span style="display:inline-block;font-size:9px;font-weight:700;color:#6B7280;background:#F3F4F6;padding:3px 8px;border-radius:6px;margin-top:6px">Sur commande</span>'
    : p.stock<=p.seuil
    ? '<span style="display:inline-block;font-size:9px;font-weight:700;color:#B45309;background:#FEF3C7;padding:3px 8px;border-radius:6px;margin-top:6px">⚠ Stock faible</span>'
    : '<span style="display:inline-block;font-size:9px;font-weight:700;color:#185FA5;background:#EBF4FF;padding:3px 8px;border-radius:6px;margin-top:6px">✓ En stock</span>';

  return '<div class="pc" onclick="openProduit(\''+p.id+'\')">'
    + '<div style="position:relative;height:120px;overflow:hidden;background:#F8FAFC;border-radius:10px 10px 0 0">'
    + '<img src="'+img+'" alt="'+p.nom+'" loading="lazy" style="width:100%;height:100%;object-fit:contain;padding:8px;transition:transform .3s" '
    + 'onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">'
    + '<div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:32px;background:#F1F5F9;color:#94A3B8">LABORO</div>'
    + '<div style="position:absolute;bottom:8px;left:8px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);border:1px solid rgba(0,0,0,.08);color:#374151;font-size:9px;font-weight:800;padding:3px 9px;border-radius:20px;letter-spacing:.4px">'+p.marque+'</div>'
    + '</div>'
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

// ═══ RAPPELS ═══
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
   msg:'Votre responsable vous demande de ranger votre telephone personnel. Pendant les heures de travail, seul LABORO Connect est autorise.'},
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
