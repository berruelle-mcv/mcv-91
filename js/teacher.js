// ================================================
//   LABORO Sport & Outdoor — Vue enseignant
//   Vue compétences, vue classe, indicateurs pédagogiques
//   Version 2.0 — Catalogue 176 produits
// ================================================

// ═══ VUE COMPÉTENCES ENSEIGNANT ═══
// Lit la progression réelle depuis le serveur (mêmes données que la Vue classe :
// ELEVES_SERVEUR / PROGRESSIONS_CLASSE, js/classe-serveur.js), et non plus le
// localStorage du navigateur enseignant — vide en conditions réelles puisque
// les élèves travaillent depuis leurs propres appareils.
async function renderCompetencesEnseignant(){
  const legend = document.getElementById('comp-legend');
  const grid = document.getElementById('comp-grid');

  const token = localStorage.getItem('laboro_token');
  if(!token){
    if(legend) legend.innerHTML = '<div style="background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--gb)">'
      + '<div style="font-size:12px;color:var(--gm)">Connecte-toi via le serveur (adresse mail + mot de passe) pour afficher la progression réelle des élèves.</div></div>';
    if(grid) grid.innerHTML = '';
    return;
  }

  if(legend) legend.innerHTML = '<div style="background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--gb)">'
    + '<div style="font-size:12px;color:var(--gm)">Chargement de la progression des élèves…</div></div>';
  if(grid) grid.innerHTML = '';

  if(!ELEVES_SERVEUR.length){
    const r = await fetchJSON(LABORO_API + '/api/eleves', { headers: { 'Authorization': 'Bearer ' + token } });
    if(!r.ok || !r.data.ok){
      if(legend) legend.innerHTML = '<div style="background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--gb)">'
        + '<div style="font-size:12px;color:var(--rg)">Impossible de charger les élèves.</div></div>';
      return;
    }
    ELEVES_SERVEUR = r.data.eleves || [];
  }
  const actifs = ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; });
  const manquants = actifs.filter(function(e){ return !PROGRESSIONS_CLASSE[e.id]; });
  if(manquants.length) await chargerProgressionsClasse(manquants);

  const eleves = actifs.map(function(e){ return { e: e, ud: PROGRESSIONS_CLASSE[e.id] || {missions:{}} }; });

  // G4A/G4B ne concernent que les élèves AGEC/PVOC respectivement (2nde n'a pas de bloc 4) ;
  // les missions portent comp:'C4A.x'/'B4.x', pas 'G4A.x'/'G4B.x' — d'où le calcNiveauComp
  // sur les deux clés (miroir de niveauG4PourEleve dans classe-serveur.js).
  function eleveConcerne(e, c){
    if(c.code !== 'G4A' && c.code !== 'G4B') return true;
    const cl = (e.classe_libelle || '').toUpperCase();
    return c.code === 'G4A' ? cl.includes('AGEC') : cl.includes('PVOC');
  }
  function niveauPourCompetence(c, ud){
    if(c.code === 'G4A') return Math.max(calcNiveauComp('C4A', ud), calcNiveauComp('G4A', ud));
    if(c.code === 'G4B') return Math.max(calcNiveauComp('B4', ud), calcNiveauComp('G4B', ud));
    return calcNiveauComp(c.code, ud);
  }

  if(legend){
    const total = eleves.length;
    legend.innerHTML = '<div style="background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--gb);margin-bottom:4px">'
      + '<div style="font-size:13px;font-weight:800;color:var(--th-fonce);margin-bottom:4px">Vue référentiel — Progression de la classe</div>'
      + '<div style="font-size:11px;color:#6B7280">'+(total>0?total+' élève(s)':'Aucun élève pour le moment.')+'</div>'
      + '</div>';
  }

  if(!grid) return;

  grid.innerHTML = COMP.map(function(c){
    const concernes = eleves.filter(function(x){ return eleveConcerne(x.e, c); });
    const levels = concernes.map(function(x){ return niveauPourCompetence(c, x.ud); });

    const counts = [0,0,0,0,0];
    levels.forEach(function(l){ counts[l]++; });
    const total = concernes.length;
    const acquis = counts[3] + counts[4];
    const enCours = counts[1] + counts[2];
    const pctAcquis = total > 0 ? Math.round(acquis/total*100) : 0;

    const niveaux = [
      {label:'Non démarré', col:'#A0AEC0'},
      {label:'Découverte',  col:'var(--th-vif)'},
      {label:'En progression', col:'var(--th-second)'},
      {label:'Acquis',     col:'var(--th-principal)'},
      {label:'Maîtrisé',  col:'var(--th-nuit)'}
    ];

    const barSegments = total > 0 ? niveaux.map(function(n,i){
      const pct = Math.round(counts[i]/total*100);
      return pct > 0 ? '<div style="height:100%;width:'+pct+'%;background:'+n.col+';flex-shrink:0" title="'+n.label+' : '+counts[i]+'"></div>' : '';
    }).join('') : '<div style="height:100%;width:100%;background:#E2E8F0"></div>';

    const statusColor = pctAcquis >= 75 ? 'var(--th-principal)' : pctAcquis >= 40 ? '#D97706' : '#A0AEC0';

    return '<div class="cc" style="border-left:4px solid '+statusColor+'">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
      + compBadge(c.code)
      + '<span style="font-size:11px;font-weight:800;color:'+statusColor+'">'+(total>0?pctAcquis+'% acquis':'—')+'</span>'
      + '</div>'
      + '<div style="font-size:13px;font-weight:800;color:var(--th-fonce);margin-bottom:10px">'+c.label+'</div>'
      + (total > 0
        ? '<div style="display:flex;height:10px;border-radius:8px;overflow:hidden;margin-bottom:8px">'+barSegments+'</div>'
          + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
          + niveaux.map(function(n,i){
              return counts[i] > 0
                ? '<span style="font-size:9px;font-weight:700;color:'+n.col+';background:'+hexTheme(n.col)+'1A;padding:2px 7px;border-radius:8px">'+n.label+' : '+counts[i]+'</span>'
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
}

// ═══ FICHE PRODUIT ═══
function openProduit(id){
  const p = PRODUITS.find(function(x){ return x.id===id; });
  if(!p) return;

  const c = CAT_CFG[p.cat] || {col:'var(--th-second)', light:'var(--th-fond)'};
  const pImg = PROD_IMAGES[p.id] || (typeof carPlaceholder==='function' ? carPlaceholder(p.segment) : '');
  const pvHT = (p.pv/1.2).toFixed(2);
  const margeE = ((p.pv/1.2) - p.pa).toFixed(2);

  const stockHtml = p.stock===0
    ? '<span style="color:#7B2FBE;font-weight:700">Sur commande</span>'
    : p.stock<=p.seuil
    ? '<span style="color:#D97706;font-weight:700">⚠ Stock faible — '+p.stock+' u.</span>'
    : '<span class="u-success">✓ '+p.stock+' en stock</span>';

  const nBg = {'Débutant':'var(--th-fond)','Intermédiaire':'var(--th-fond)','Expert':'#FEE2E2','Compétition':'#FEE2E2','Tous niveaux':'#F3F4F6','Pro':'var(--th-fond)','Entraînement':'#F0FFF4','Loisir':'#FFF7ED','Spécialisé':'#FAF5FF'};
  const nCo = {'Débutant':'var(--th-principal)','Intermédiaire':'var(--th-accent)','Expert':'#C53030','Compétition':'#C53030','Tous niveaux':'#6B7280','Pro':'var(--th-principal)','Entraînement':'#27AE60','Loisir':'#D97706','Spécialisé':'#7B2FBE'};

  // Pastilles coloris
  const colorisHtml = p.coloris && p.coloris.length
    ? '<div style="display:flex;gap:6px;align-items:center;margin-bottom:10px">'
      + '<span style="font-size:10px;color:#6B7280;font-weight:600">Coloris :</span>'
      + p.coloris.map(function(col){
          return '<div style="width:18px;height:18px;border-radius:50%;background:'+col+';border:2px solid rgba(0,0,0,.12);flex-shrink:0" title="'+col+'"></div>';
        }).join('')
      + '</div>'
    : '';

  // Tailles
  const taillesHtml = p.tailles && p.tailles.length
    ? '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">'
      + '<span style="font-size:10px;color:#6B7280;font-weight:600;margin-right:2px">Tailles :</span>'
      + p.tailles.map(function(t){
          return '<span style="background:#F3F4F6;color:#374151;font-size:10px;font-weight:600;padding:3px 8px;border-radius:6px">'+t+'</span>';
        }).join('')
      + '</div>'
    : '';

  // Argumentaire 3 points (univers à fiches simples) — ou, si la fiche liste des
  // équipements (univers Auto), ces faits bruts SANS argumentaire pré-rédigé :
  // c'est à l'élève de construire le raisonnement.
  const avecEquipements = !!(p.equipements && p.equipements.length);
  const args = [
    '✓ ' + String(p.desc || '').split(',')[0],
    '✓ ' + (((getCfg().textes||{}).argument_marque) || 'Marque LABORO — 100% Sport & Outdoor'),
    '✓ Disponible' + (p.stock > 0 ? ' en stock immédiat' : ' sur commande')
  ];
  const argsHtml = avecEquipements
    ? '<div style="margin-bottom:10px">' + p.equipements.map(function(e){
        return '<div style="font-size:11px;color:#374151;padding:4px 0;border-bottom:1px solid #F3F4F6">✓ '+e+'</div>';
      }).join('') + '</div>'
    : '<div style="margin-bottom:10px">'
    + args.map(function(a){
        return '<div style="font-size:11px;color:#374151;padding:4px 0;border-bottom:1px solid #F3F4F6">'+a+'</div>';
      }).join('')
    + '</div>';

  // Produits complémentaires — même catégorie, différent produit
  const comps = PRODUITS.filter(function(x){ return x.cat===p.cat && x.id!==p.id; }).slice(0,3);
  const compsHtml = comps.map(function(cp){
    const cpImg = PROD_IMAGES[cp.id] || (typeof carPlaceholder==='function' ? carPlaceholder(cp.segment) : '');
    const cpC = CAT_CFG[cp.cat] || {col:'var(--th-second)'};
    return '<div onclick="openProduit(\''+cp.id+'\')" style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid #E5E7EB;border-radius:10px;cursor:pointer;background:#fff" onmouseover="this.style.borderColor=\''+cpC.col+'\'" onmouseout="this.style.borderColor=\'#E5E7EB\'">'
      +'<div style="width:44px;height:36px;background:#F8FAFC;border-radius:6px;overflow:hidden;flex-shrink:0">'
      +(cpImg ? '<img src="'+cpImg+'" style="width:100%;height:100%;object-fit:contain;padding:2px">' : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94A3B8">IMG</div>')
      +'</div>'
      +'<div style="flex:1;min-width:0"><div style="font-size:10px;font-weight:700;color:var(--th-fonce);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+cp.nom+'</div>'
      +'<div style="font-size:10px;color:'+cpC.col+';font-weight:700">'+cp.pv+' €</div></div></div>';
  }).join('');

  const fiche = document.getElementById('fiche-produit');

  fiche.innerHTML = '<div style="border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid #E8EDF5">'
    // En-tête image + infos
    +'<div style="display:flex;min-height:200px">'
    +'<div style="width:200px;flex-shrink:0;background:#F8FAFC;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center">'
    +(pImg
      ? '<img src="'+pImg+'" alt="'+p.nom+'" style="width:100%;height:100%;object-fit:contain;padding:12px" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">'
        +'<div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:11px;color:#94A3B8">LABORO</div>'
      : '<div style="font-size:11px;color:#94A3B8">LABORO</div>')
    +'<div style="position:absolute;bottom:8px;left:8px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);font-size:9px;font-weight:800;color:#374151;padding:3px 10px;border-radius:20px;border:1px solid rgba(0,0,0,.08)">'+p.marque+'</div>'
    +'</div>'
    +'<div style="flex:1;padding:20px;display:flex;flex-direction:column;justify-content:space-between">'
    +'<div>'
    +'<div style="font-size:10px;color:var(--gm);margin-bottom:4px">'+p.cat+' · Réf. '+p.ref+'</div>'
    +'<div style="font-size:19px;font-weight:900;color:var(--th-fonce);line-height:1.2;margin-bottom:6px">'+p.nom+'</div>'
    +'<div style="font-size:12px;color:#4B5563;line-height:1.6;margin-bottom:8px">'+p.desc+'</div>'
    +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
    +(p.niveau?'<span style="background:'+(nBg[p.niveau]||'#F3F4F6')+';color:'+(nCo[p.niveau]||'#6B7280')+';font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+p.niveau+'</span>':'')
    +'</div>'
    +colorisHtml
    +taillesHtml
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">'
    +'<div style="background:var(--th-fond2);border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Achat HT</div><div style="font-size:18px;font-weight:900;color:var(--th-fonce)">'+p.pa+' €</div></div>'
    +'<div style="background:#F0FFF4;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Vente TTC</div><div style="font-size:18px;font-weight:900;color:#27AE60">'+p.pv+' €</div><div style="font-size:10px;color:#6B7280">'+pvHT+' € HT</div></div>'
    +'<div style="background:#FFF7ED;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Marge</div><div style="font-size:18px;font-weight:900;color:'+c.col+'">'+p.mar+' %</div><div style="font-size:10px;color:#6B7280">'+margeE+' €/u</div></div>'
    +'</div></div></div>'
    // Séparateur
    +'<div style="height:1px;background:#F3F4F6"></div>'
    // Caractéristiques + Argumentaire + Produits complémentaires
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0">'
    +'<div style="padding:16px 18px;border-right:1px solid #F3F4F6">'
    +'<div style="font-size:11px;font-weight:800;color:var(--th-fonce);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">📋 Caractéristiques</div>'
    +'<div style="font-size:11px">Stock : '+stockHtml+'</div>'
    +(p.seuil>0?'<div style="font-size:10px;color:#9CA3AF;margin-top:2px">Seuil : '+p.seuil+' u. · TVA '+p.tva+'%</div>':'')
    +(p.tailles&&p.tailles.length?'<div style="font-size:10px;color:#6B7280;margin-top:6px">Tailles : '+p.tailles.join(', ')+'</div>':'')
    +(p.puissance?'<div style="font-size:11px;color:#374151;margin-top:6px">⚙️ Puissance : <strong>'+p.puissance+' ch</strong></div>':'')
    +(p.zero_100?'<div style="font-size:11px;color:#374151;margin-top:3px">🚀 0 à 100 km/h : <strong>'+p.zero_100+'</strong></div>':'')
    +(p.vitesse_max?'<div style="font-size:11px;color:#374151;margin-top:3px">🏁 Vitesse max : <strong>'+p.vitesse_max+'</strong></div>':'')
    +(p.boite?'<div style="font-size:11px;color:#374151;margin-top:3px">⚙️ Boîte : <strong>'+p.boite+'</strong></div>':'')
    +(p.consommation_urbaine?'<div style="font-size:11px;color:#374151;margin-top:6px">⛽ Conso. urbaine : <strong>'+p.consommation_urbaine+'</strong></div>':(p.consommation?'<div style="font-size:11px;color:#374151;margin-top:6px">⛽ Consommation : <strong>'+p.consommation+'</strong></div>':''))
    +(p.consommation_mixte?'<div style="font-size:11px;color:#374151;margin-top:3px">⛽ Conso. mixte : <strong>'+p.consommation_mixte+'</strong></div>':'')
    +(p.reservoir?'<div style="font-size:11px;color:#374151;margin-top:3px">⛽ Réservoir : <strong>'+p.reservoir+'</strong></div>':'')
    +(p.co2?'<div style="font-size:11px;color:#374151;margin-top:3px">🌱 Émissions CO2 : <strong>'+p.co2+'</strong></div>':'')
    +(p.dimensions?'<div style="font-size:11px;color:#374151;margin-top:6px">📐 Dimensions : <strong>'+p.dimensions+'</strong></div>':'')
    +(p.places?'<div style="font-size:11px;color:#374151;margin-top:3px">💺 Places : <strong>'+p.places+'</strong></div>':'')
    +(p.coffre?'<div style="font-size:11px;color:#374151;margin-top:3px">🧳 Coffre : <strong>'+p.coffre+'</strong></div>':'')
    +(p.garantie?'<div style="font-size:11px;color:#374151;margin-top:3px">🛡️ Garantie : <strong>'+p.garantie+'</strong></div>':'')
    +(p.historique?'<div style="font-size:11px;color:#374151;margin-top:6px">📖 Historique : <strong>'+p.historique+'</strong></div>':'')
    +(p.controle_technique?'<div style="font-size:11px;color:#374151;margin-top:3px">🔍 Contrôle technique : <strong>'+p.controle_technique+'</strong></div>':'')
    +(p.garantie_occasion?'<div style="font-size:11px;color:#374151;margin-top:3px">🛡️ Garantie occasion : <strong>'+p.garantie_occasion+'</strong></div>':'')
    +'</div>'
    +'<div style="padding:16px 18px;border-right:1px solid #F3F4F6">'
    +'<div style="font-size:11px;font-weight:800;color:var(--th-fonce);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">'+(avecEquipements?'🔧 Équipements':'💬 Argumentaire vendeur')+'</div>'
    +argsHtml
    +'</div>'
    +'<div style="padding:16px 18px">'
    +'<div style="font-size:11px;font-weight:800;color:var(--th-fonce);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">🔗 Produits complémentaires</div>'
    +(compsHtml?'<div style="display:flex;flex-direction:column;gap:6px">'+compsHtml+'</div>':'<div style="font-size:11px;color:#9CA3AF">Aucun produit associé.</div>')
    +'</div></div>'
    // Actions
    +'<div style="padding:12px 18px;background:#F8FAFF;display:flex;gap:10px;border-top:1px solid #F3F4F6">'
    +'<button onclick="document.getElementById(\'fiche-produit\').classList.remove(\'on\')" style="background:none;border:1px solid #E5E7EB;padding:8px 14px;border-radius:8px;font-size:12px;cursor:pointer;color:#374151;font-weight:600">← Retour</button>'
    +'<button onclick="ajouterDevis(\''+p.id+'\')" style="background:'+c.col+';border:none;color:#fff;padding:8px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">+ Ajouter au devis</button>'
    +'</div></div>';

  fiche.classList.add('on');
  fiche.scrollIntoView({behavior:'smooth', block:'start'});
}

// La vue classe (liste des élèves) passe désormais exclusivement par le
// serveur : voir renderClasse() et afficherClasse() dans js/classe-serveur.js
// (chargé après ce fichier). L'ancienne version ci-dessus, basée sur le
// localStorage du navigateur, a été retirée (code mort, jamais exécutée).
// NB : elle calculait des statistiques (missions validées, moyenne, niveaux
// de compétence) que la vue serveur n'affiche pas encore — utile comme base
// de départ le jour où la route d'agrégation par classe sera construite
// (historique disponible dans Git si besoin de la retrouver).

// ═══════════════════════════════════════════════════════════
//   Mission du jour — assignation (classe entière ou élève précis)
//   et affichage des assignations du jour (vue enseignant)
// ═══════════════════════════════════════════════════════════

// --- Appelé à l'ouverture du panneau "Mission du jour" ---
function renderMDJPanel(){
  if(typeof populateMDJSelect === 'function') populateMDJSelect();
  if(typeof populateMDJEleveSelect === 'function') populateMDJEleveSelect();
  if(typeof populateClasseSelects === 'function') populateClasseSelects();
  toggleMDJCible();
  toggleMDJMaison();
  renderMDJListe();
  brancherApercuMDJ();
  apercuMDJ();
}

// ═══ Avant d'assigner : déjà assignée ? déjà faite par qui ? (29/09/2026) ═══
// Dès qu'on choisit une cible (classe, demi-groupe, élève) et une mission, un encadré
// dit si elle est déjà assignée à cette cible et où en est chaque élève. La liste des
// missions est marquée : 📌 déjà assignée à cette cible, « faite par x/y ».
let MDJ_APERCU_T = null, MDJ_APERCU_N = 0, MDJ_APERCU_NOMS = false;
function brancherApercuMDJ(){
  ['mdj-cible','mdj-cl','mdj-grp','mdj-el','mdj-ms'].forEach(function(id){
    const el = document.getElementById(id);
    if(el && !el.dataset.apercu){ el.dataset.apercu = '1'; el.addEventListener('change', apercuMDJ); }
  });
}
function cibleMDJCourante(){
  const cible = document.getElementById('mdj-cible');
  if(!cible) return null;
  if(cible.value === 'eleve'){
    const v = (document.getElementById('mdj-el') || {}).value;
    return v ? { q: 'eleve_id=' + encodeURIComponent(v), libelle: 'cet élève' } : null;
  }
  const cl = (document.getElementById('mdj-cl') || {}).value;
  if(!cl) return null;
  if(cible.value === 'groupe'){
    const g = (document.getElementById('mdj-grp') || {}).value || 'G1';
    return { q: 'classeCode=' + encodeURIComponent(cl) + '&groupe=' + g, libelle: 'ce groupe (' + g + ')' };
  }
  return { q: 'classeCode=' + encodeURIComponent(cl), libelle: 'cette classe' };
}
function apercuMDJ(){ clearTimeout(MDJ_APERCU_T); MDJ_APERCU_T = setTimeout(apercuMDJMaintenant, 150); }
function libellesMissionsMDJ(resume, total){
  const sel = document.getElementById('mdj-ms');
  if(!sel) return;
  Array.from(sel.options).forEach(function(o){
    if(!o.value) return;
    if(!o.dataset.base) o.dataset.base = o.textContent;
    const r = resume && resume[o.value];
    let t = o.dataset.base;
    if(r && r.assignee) t = '📌 ' + t;
    if(r && r.faits && total) t += r.faits >= total ? ' — ✓ déjà faite par tous' : ' — faite par ' + r.faits + '/' + total;
    o.textContent = t;
  });
}
async function apercuMDJMaintenant(){
  const box = document.getElementById('mdj-apercu');
  const token = localStorage.getItem('laboro_token');
  const c = cibleMDJCourante();
  const n = ++MDJ_APERCU_N;
  if(!box) return;
  if(!c || !token){ box.innerHTML = ''; libellesMissionsMDJ(null, 0); return; }
  const mid = (document.getElementById('mdj-ms') || {}).value;
  const h = { headers: { 'Authorization': 'Bearer ' + token } };
  const [rs, rd] = await Promise.all([
    fetchJSON(LABORO_API + '/api/mission-du-jour/apercu?' + c.q, h),
    mid ? fetchJSON(LABORO_API + '/api/mission-du-jour/apercu?' + c.q + '&mission_id=' + encodeURIComponent(mid), h) : Promise.resolve(null)
  ]);
  if(n !== MDJ_APERCU_N) return;   // une sélection plus récente a pris le relais
  if(rs && rs.ok && rs.data.ok) libellesMissionsMDJ(rs.data.resume, rs.data.total);
  if(!mid){ box.innerHTML = ''; return; }
  if(!rd || !rd.ok || !rd.data.ok){ box.innerHTML = ''; return; }
  box.innerHTML = htmlApercuMDJ(rd.data, c.libelle);
}
function htmlApercuMDJ(d, libelle){
  const nomE = function(e){ return ((e.nom||'').toUpperCase() + ' ' + (e.prenom||'')).trim(); };
  const pour = function(a){ return a.cible === 'eleve' ? 'à ' + nomE(a) : (a.cible === 'groupe' ? 'au groupe ' + a.groupe : 'à toute la classe'); };
  const seul = libelle === 'cet élève';
  const actives = d.assignations.filter(function(a){ return !a.retiree_at; });
  const retirees = d.assignations.filter(function(a){ return a.retiree_at; });
  const eleves = d.eleves || [];
  const cat = { validee: [], epuisee: [], commencee: [], a_faire: [] };
  eleves.forEach(function(e){ (cat[e.etat] || cat.a_faire).push(e); });
  const restants = cat.commencee.length + cat.a_faire.length;
  let l1;
  if(actives.length){
    l1 = '<strong>📌 Déjà assignée</strong> : ' + actives.map(function(a){
      return pour(a) + ' le ' + fmtDateHeure(a.created_at).split(' ')[0] + (a.maison_jusqu_a ? ' (🏠 jusqu\'au ' + fmtDateHeure(a.maison_jusqu_a) + ')' : '');
    }).join(' · ') + '.';
  } else l1 = 'Pas encore assignée à ' + libelle + '.';
  if(retirees.length) l1 += ' <span style="color:var(--gm)">Assignée puis retirée : ' + retirees.map(function(a){ return pour(a) + ' le ' + fmtDateHeure(a.created_at).split(' ')[0]; }).join(' · ') + '.</span>';
  const pastille = function(txt, n, bg, fg){ return n ? '<span style="display:inline-block;padding:2px 9px;border-radius:10px;font-size:11.5px;font-weight:700;background:'+bg+';color:'+fg+';margin:2px 4px 2px 0">'+txt+' : '+n+'</span>' : ''; };
  const l2 = !seul || !eleves.length
    ? pastille('✅ validée', cat.validee.length, '#DCFCE7', '#166534') + pastille('⛔ 2 tentatives sans validation', cat.epuisee.length, '#FEE2E2', '#991B1B')
      + pastille('✏️ commencée', cat.commencee.length, '#FEF3C7', '#92400E') + pastille('⬜ pas commencée', cat.a_faire.length, '#F1F5F9', '#475569')
    : ({ validee: '✅ Déjà validée' + (eleves[0].note != null ? ' (' + eleves[0].note + '/20)' : ''), epuisee: '⛔ 2 tentatives utilisées sans validation', commencee: '✏️ Commencée', a_faire: '⬜ Pas encore commencée' })[eleves[0].etat];
  let l3;
  if(!eleves.length) l3 = '<span style="color:#92400E">Aucun élève dans ' + libelle + '.</span>';
  else if(!restants) l3 = '<strong style="color:#B45309">⚠️ ' + (!seul ? 'Tous l\'ont déjà terminée' : 'Il ou elle l\'a déjà terminée') + ' : si tu l\'assignes, elle n\'apparaîtra chez personne.</strong>'
    + (cat.epuisee.length ? ' Pour faire retravailler un élève, accorde-lui une tentative depuis sa copie (Vue classe).' : '');
  else if(restants < eleves.length) l3 = 'Si tu l\'assignes, elle apparaîtra chez les <strong>' + restants + ' élève' + (restants > 1 ? 's' : '') + '</strong> qui ne l\'ont pas terminée (les autres ne la verront pas).';
  else l3 = !seul ? 'Aucun élève ne l\'a encore terminée : elle apparaîtra chez tous.' : '';
  const noms = !seul && eleves.length ? '<div style="margin-top:4px"><a href="#" onclick="MDJ_APERCU_NOMS=!MDJ_APERCU_NOMS;apercuMDJ();return false" style="font-size:11.5px">' + (MDJ_APERCU_NOMS ? '▲ masquer les noms' : '▼ voir les noms') + '</a></div>'
    + (MDJ_APERCU_NOMS ? '<div style="font-size:11.5px;line-height:1.6;margin-top:4px">'
      + [['validee','✅ Validée'],['epuisee','⛔ 2 tentatives'],['commencee','✏️ Commencée'],['a_faire','⬜ Pas commencée']].filter(function(x){ return cat[x[0]].length; })
        .map(function(x){ return '<div><strong>' + x[1] + ' :</strong> ' + cat[x[0]].map(function(e){ return nomE(e) + (x[0] === 'validee' && e.note != null ? ' (' + e.note + ')' : ''); }).join(', ') + '</div>'; }).join('')
      + '</div>' : '') : '';
  return '<div style="margin-top:10px;padding:10px 12px;border-radius:8px;font-size:12.5px;line-height:1.55;background:' + (actives.length || !restants ? '#FFFBEA' : '#F8FAFC') + ';border:1px solid ' + (actives.length || !restants ? '#FDE68A' : '#E2E8F0') + '">'
    + '<div>' + l1 + '</div><div style="margin-top:4px">' + l2 + '</div>' + (l3 ? '<div style="margin-top:4px">' + l3 + '</div>' : '') + noms + '</div>';
}

// « À terminer à la maison jusqu'au… » (29/09/2026) : échéance proposée = demain 8h
function toggleMDJMaison(){
  const cb = document.getElementById('mdj-maison');
  const dt = document.getElementById('mdj-maison-date');
  if(!cb || !dt) return;
  dt.style.display = cb.checked ? '' : 'none';
  if(cb.checked && !dt.value){
    const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(8, 0, 0, 0);
    const p2 = function(n){ return String(n).padStart(2, '0'); };
    dt.value = d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + 'T08:00';
  }
}
function etiquetteMaison(a){
  if(!a.maison_jusqu_a) return '';
  const passee = new Date(a.maison_jusqu_a).getTime() <= Date.now();
  return ' <span style="display:inline-block;padding:1px 7px;border-radius:9px;font-size:10.5px;font-weight:700;background:' + (passee ? '#F3F4F6;color:#6B7280' : '#E0F2FE;color:#075985') + '">🏠 '
    + (passee ? 'maison (échéance passée)' : 'à la maison jusqu\'au ' + fmtDateHeure(a.maison_jusqu_a)) + '</span>';
}

// --- Bascule l'affichage entre sélection "classe" et "élève" ---
function toggleMDJCible(){
  const cible = document.getElementById('mdj-cible');
  const selCl = document.getElementById('mdj-cl');
  const selEl = document.getElementById('mdj-el');
  if(!cible || !selCl || !selEl) return;
  const isEleve = cible.value === 'eleve';
  selCl.style.display = isEleve ? 'none' : '';
  selEl.style.display = isEleve ? '' : 'none';
  const selGr = document.getElementById('mdj-grp');
  if(selGr) selGr.style.display = cible.value === 'groupe' ? '' : 'none'; // demi-groupe G1 / G2 (26/09/2026)
}

// --- Assigner la mission du jour (classe ou élève selon le mode choisi) ---
async function assignerMDJ(){
  const st = document.getElementById('mdj-st');
  const cible = document.getElementById('mdj-cible');
  const mid = document.getElementById('mdj-ms').value;
  if(!mid){ if(st) st.textContent = 'Choisis une mission.'; return; }

  const isEleve = cible && cible.value === 'eleve';
  const body = { mission_id: mid };
  if(isEleve){
    const elId = document.getElementById('mdj-el').value;
    if(!elId){ if(st) st.textContent = 'Choisis un élève.'; return; }
    body.eleve_id = elId;
  } else {
    const clCode = document.getElementById('mdj-cl').value;
    if(!clCode){ if(st) st.textContent = 'Choisis une classe.'; return; }
    body.classeCode = clCode;
    if(cible && cible.value === 'groupe'){
      const g = document.getElementById('mdj-grp');
      body.groupe = g ? g.value : 'G1';
    }
  }

  const cbMaison = document.getElementById('mdj-maison');
  if(cbMaison && cbMaison.checked){
    const v = (document.getElementById('mdj-maison-date') || {}).value;
    const d = v ? new Date(v) : null;
    if(!d || isNaN(d) || d.getTime() <= Date.now()){ if(st) st.textContent = 'Choisis une échéance « à la maison » à venir (date et heure).'; return; }
    body.maison_jusqu_a = d.toISOString();
  }

  const token = localStorage.getItem('laboro_token');
  if(!token){ if(st) st.textContent = 'Connecte-toi via le serveur (enseignant) pour assigner une mission.'; return; }

  if(st) st.textContent = 'Assignation en cours…';
  const r = await fetchJSON(LABORO_API + '/api/mission-du-jour', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body)
  });
  if(!r.ok){ if(st) st.textContent = r.erreur; return; }
  const d = r.data;
  if(!d.ok){ if(st) st.textContent = 'Échec : ' + (d.erreur || 'erreur inconnue'); return; }

  if(st){
    const qui = d.cible === 'eleve' ? ('à ' + d.prenom+' '+d.nom) : (d.cible === 'groupe' ? 'au groupe ' + d.groupe + (d.nb_eleves_groupe != null ? ' (' + d.nb_eleves_groupe + ' élève(s))' : '') : 'à la classe');
    if(d.cible === 'groupe' && d.nb_eleves_groupe === 0 && !d.deja){
      st.textContent = '⚠️ Mission assignée au groupe ' + d.groupe + ', mais aucun élève de cette classe n\'est encore dans ce groupe. Répartis-les depuis la Vue classe (bouton « Répartir en groupes »).';
    } else {
      const maisonTxt = d.maison_jusqu_a ? ' 🏠 À terminer à la maison jusqu\'au ' + fmtDateHeure(d.maison_jusqu_a) + ' : hors horaires, les élèves concernés ne pourront travailler que sur elle.' : '';
      apercuMDJ();
      st.textContent = d.deja
        ? (d.maison_maj ? 'ℹ️ La mission "'+d.titre+'" était déjà en cours ('+qui+').' + maisonTxt
                        : 'ℹ️ La mission "'+d.titre+'" est déjà en cours ('+qui+') : rien à refaire.')
        : '✅ Mission "'+d.titre+'" assignée '+qui+'.' + (maisonTxt || ' Elle s\'ajoute aux missions déjà en cours.');
    }
  }
  renderMDJListe();
}

// ═══ Missions assignées : en cours + historique (25/09/2026) ═══
// Le serveur garde toutes les assignations (datées). Une mission disparaît de
// l'écran de l'élève dès qu'il l'a terminée (validée ou 2 tentatives) ; ici,
// l'enseignant voit l'avancement, peut retirer une mission, et garde l'historique.
let MDJ_ASSIGNATIONS = [];
let MDJ_DEPLIE = {};

function fmtDateHeure(iso){
  if(!iso) return '—';
  const d = new Date(iso);
  if(isNaN(d)) return '—';
  return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}) + ' ' + d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}
function cibleAssignation(a){
  if(a.cible === 'classe') return (a.classe_libelle || a.classe_id);
  if(a.cible === 'groupe') return (a.classe_libelle || a.classe_id) + ' · ' + a.groupe;
  return (((a.nom||'').toUpperCase() + ' ' + (a.prenom||'')).trim() || 'Élève');
}
function etatAssignation(a){
  if(a.retiree_at) return { code:'retiree', label:'Retirée', bg:'#F3F4F6', fg:'#6B7280' };
  if(a.total > 0 && a.termines >= a.total) return { code:'terminee', label:'✅ Terminée', bg:'#DCFCE7', fg:'#166534' };
  return { code:'encours', label:'🟡 En cours', bg:'#FEF3C7', fg:'#92400E' };
}
function barreAvancement(a){
  const pct = a.total ? Math.round(a.termines / a.total * 100) : 0;
  return '<div style="display:flex;align-items:center;gap:8px;min-width:150px">'
    + '<div style="flex:1;height:8px;background:#E5E7EB;border-radius:5px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:#1B7F3B"></div></div>'
    + '<span style="font-size:11px;font-weight:700;white-space:nowrap">'+a.termines+'/'+a.total+'</span></div>';
}

async function renderMDJListe(){
  const el = document.getElementById('mdj-liste');
  if(!el) return;
  const token = localStorage.getItem('laboro_token');
  const encadre = function(txt, col){ return '<div style="padding:14px 16px;background:var(--gc,#F3F4F6);border-radius:8px;font-size:12px;color:'+(col||'var(--gm,#6B7280)')+';text-align:center">'+txt+'</div>'; };
  if(!token){ el.innerHTML = encadre('Connecte-toi via le serveur (enseignant) pour voir les missions assignées.'); return; }
  const r = await fetchJSON(LABORO_API + '/api/mission-du-jour/toutes', { headers: { 'Authorization': 'Bearer ' + token } });
  if(!r.ok || !r.data.ok){ el.innerHTML = encadre('Impossible de charger les missions assignées.', 'var(--rg,#C53030)'); return; }
  MDJ_ASSIGNATIONS = r.data.assignations || [];

  const enCours = MDJ_ASSIGNATIONS.filter(function(a){ return etatAssignation(a).code === 'encours'; });
  if(!enCours.length){
    el.innerHTML = encadre('Aucune mission en cours. Les missions terminées par tous les élèves concernés passent automatiquement dans l\'historique.');
  } else {
    el.innerHTML = enCours.map(function(a){
      const deplie = !!MDJ_DEPLIE[a.id];
      const restants = (a.restants||[]).map(function(x){ return ((x.nom||'').toUpperCase()+' '+(x.prenom||'')).trim(); });
      return '<div style="padding:10px 0;border-bottom:.5px solid var(--gc)">'
        + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">'
        + '<div style="flex:1;min-width:220px;cursor:pointer" onclick="basculerRestantsMDJ(\''+a.id+'\')" title="Voir qui ne l\'a pas encore terminée">'
        + '<div style="font-size:12px"><strong>'+cibleAssignation(a)+'</strong> — <strong style="color:var(--th-principal)">'+a.mission_id+'</strong> '+(a.titre||'')+'</div>'
        + '<div class="u-label-sm">Assignée le '+fmtDateHeure(a.created_at)+' · '+(a.comp_id||'')+' P'+(a.palier||'')+' · '+(deplie?'▲ masquer':'▼ qui reste ?')+etiquetteMaison(a)+'</div></div>'
        + barreAvancement(a)
        + '<button onclick="retirerMDJ(\''+a.id+'\')" title="Retirer cette mission (elle reste dans l\'historique)" style="background:none;border:.5px solid var(--gb);border-radius:6px;padding:3px 9px;cursor:pointer;font-size:12px;color:var(--gm)">✕</button>'
        + '</div>'
        + (deplie ? '<div style="margin-top:6px;font-size:11px;color:#92400E;background:#FFFBEA;border-radius:6px;padding:6px 10px">'
            + (restants.length ? '<strong>Pas encore terminée par :</strong> ' + restants.join(', ') : 'Tout le monde l\'a terminée.') + '</div>' : '')
        + '</div>';
    }).join('');
  }
  remplirFiltreHistoriqueMDJ();
  renderMDJHistorique();
}

function basculerRestantsMDJ(id){ MDJ_DEPLIE[id] = !MDJ_DEPLIE[id]; renderMDJListe(); }

async function retirerMDJ(id){
  const a = MDJ_ASSIGNATIONS.find(function(x){ return x.id === id; });
  if(!confirm('Retirer la mission ' + (a ? a.mission_id + ' pour ' + cibleAssignation(a) : '') + ' ?\n\nElle disparaîtra de l\'écran des élèves mais restera dans ton historique. Les réponses et notes déjà obtenues ne sont pas touchées.')) return;
  const token = localStorage.getItem('laboro_token');
  const r = await fetchJSON(LABORO_API + '/api/mission-du-jour/' + encodeURIComponent(id), { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } });
  if(!r.ok || !r.data.ok){ alert(r.erreur || 'Retrait impossible.'); return; }
  renderMDJListe();
  apercuMDJ();
}

function remplirFiltreHistoriqueMDJ(){
  const sel = document.getElementById('mdj-hist-filtre');
  if(!sel) return;
  const actuel = sel.value;
  const classes = [];
  MDJ_ASSIGNATIONS.forEach(function(a){ const c = a.cible !== 'eleve' ? (a.classe_libelle||a.classe_id) : 'Élèves (individuel)'; if(classes.indexOf(c) < 0) classes.push(c); });
  classes.sort();
  sel.innerHTML = '<option value="">Toutes les classes</option>' + classes.map(function(c){ return '<option value="'+c+'"'+(c===actuel?' selected':'')+'>'+c+'</option>'; }).join('');
}

function renderMDJHistorique(){
  const el = document.getElementById('mdj-historique');
  if(!el) return;
  const sel = document.getElementById('mdj-hist-filtre');
  const filtre = sel ? sel.value : '';
  const liste = MDJ_ASSIGNATIONS.filter(function(a){
    if(!filtre) return true;
    const c = a.cible !== 'eleve' ? (a.classe_libelle||a.classe_id) : 'Élèves (individuel)';
    return c === filtre;
  });
  if(!liste.length){ el.innerHTML = '<div style="padding:12px;font-size:12px;color:var(--gm)">Aucune mission assignée pour le moment.</div>'; return; }
  el.innerHTML = '<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:12px;width:100%">'
    + '<thead><tr style="background:#F1F5F9;text-align:left"><th style="padding:7px 8px">Date</th><th style="padding:7px 8px">Pour qui</th><th style="padding:7px 8px">Mission</th><th style="padding:7px 8px">Avancement</th><th style="padding:7px 8px">État</th></tr></thead><tbody>'
    + liste.map(function(a){
        const e = etatAssignation(a);
        return '<tr><td style="padding:6px 8px;border-bottom:1px solid #EDF2F7;white-space:nowrap">'+fmtDateHeure(a.created_at)+'</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7;font-weight:700">'+cibleAssignation(a)+'</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7"><strong style="color:var(--th-principal)">'+a.mission_id+'</strong> — '+(a.titre||'')+' <span style="color:var(--gm)">('+(a.comp_id||'')+')</span>'+etiquetteMaison(a)+'</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7">'+a.termines+'/'+a.total+' terminée(s)</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7"><span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;background:'+e.bg+';color:'+e.fg+'">'+e.label
          + (a.retiree_at ? ' le '+fmtDateHeure(a.retiree_at).split(' ')[0] : '') + '</span></td></tr>';
      }).join('')
    + '</tbody></table></div>';
}

// (ancienne fiche élève détaillée showFicheEleve(), supprimée le 20/09/2026 —
// code mort : plus aucun bouton de l'interface actuelle ne l'appelait depuis le
// passage de la Vue classe au serveur. La sélection d'un élève dans la Vue
// classe passe désormais par selectionnerEleve(), classe-serveur.js.)

function handleMission(id){
  const ud = gUD();
  const m = MISSIONS.find(function(x){ return x.id===id; });
  if(!m) return;
  const locked = !isPalierUnlocked(m, ud) && CU.classe !== 'enseignant';
  if(locked){
    alert('Palier '+(m.palier-1)+' requis : fais d\'abord valider une mission de ce palier.');
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
  const scores = done.filter(function(m){ return ud.missions[m.id]?.score != null; }).map(function(m){ return ud.missions[m.id].score; });
  const avg = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length) : 0;
  const byPalier = [0,0,0,0,0];
  done.forEach(function(m){ byPalier[m.palier]++; });
  const reussi = scores.filter(function(s){ return s>=10; }).length; // seuil de validation des classes
  const tauxReussite = scores.length ? Math.round(reussi/scores.length*100) : 0;
  const bestScore = scores.length ? Math.max.apply(null, scores) : 0;
  const palierColors = ['','var(--th-second)','var(--th-accent)','var(--th-principal)','#7B2FBE'];
  const palierLabels = ['','Débutant','Apprenti','Pro compétent','Pro performant'];
  const maxByPalier = Math.max.apply(null, byPalier.slice(1)) || 1;

  el.innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    + '<div class="card"><div class="ct">📊 Mes missions par palier</div><div class="u-flex-col">'
    + [1,2,3,4].map(function(p){
        const count = byPalier[p];
        const pct = Math.round(count/maxByPalier*100);
        return '<div><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:11px;font-weight:700;color:'+palierColors[p]+'">'+palierLabels[p]+'</span><span style="font-size:11px;font-weight:800;color:var(--th-fonce)">'+count+' mission'+(count>1?'s':'')+'</span></div><div style="background:#E2E8F0;border-radius:6px;height:10px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+palierColors[p]+';border-radius:6px;transition:width .5s"></div></div></div>';
      }).join('')
    + '</div></div>'
    + '<div class="card"><div class="ct">🎯 Ma performance</div><div class="u-grid-2">'
    + '<div style="background:#F0FFF4;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Taux de réussite</div><div style="font-size:24px;font-weight:900;color:'+(tauxReussite>=80?'var(--th-principal)':tauxReussite>=60?'#D97706':'#C53030')+'">'+tauxReussite+'%</div><div class="u-label">note ≥ 10/20 (validée)</div></div>'
    + '<div style="background:var(--th-fond);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Meilleur score</div><div style="font-size:24px;font-weight:900;color:var(--th-accent)">'+(bestScore>0?bestScore+'/20':'—')+'</div><div class="u-label">sur toutes les missions</div></div>'
    + '<div style="background:#FFF7ED;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Missions terminées</div><div style="font-size:24px;font-weight:900;color:#D97706">'+done.length+'/'+allMissions.length+'</div><div class="u-label">'+Math.round(done.length/allMissions.length*100)+'% complété</div></div>'
    + '<div style="background:#FAF5FF;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Moyenne générale</div><div style="font-size:24px;font-weight:900;color:#7B2FBE">'+(avg>0?avg.toFixed(1)+'/20':'—')+'</div><div class="u-label">sur missions notées</div></div>'
    + '</div></div>'
    + '<div class="card" style="grid-column:1/-1"><div class="ct">📈 Progression vers le niveau suivant</div>'
    + (function(){
        const compAcquis = COMP.filter(function(c){ return calcNiveauComp(c.code,ud)>=3; }).length;
        const pct = Math.round(compAcquis/COMP.length*100);
        const nextMilestone = pct<25?25:pct<50?50:pct<75?75:100;
        return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:6px"><span class="u-subtitle">'+compAcquis+'/'+COMP.length+' compétences acquises ('+pct+'%)</span><span class="u-muted">Prochain palier : '+nextMilestone+'%</span></div><div style="position:relative;background:#E2E8F0;border-radius:10px;height:14px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,var(--th-principal),var(--th-nuit));border-radius:10px;transition:width .6s"></div>'
          +[25,50,75].map(function(mark){ return '<div style="position:absolute;top:0;left:'+mark+'%;width:2px;height:100%;background:#fff;opacity:.6"></div>'; }).join('')
          +'</div><div style="display:flex;justify-content:space-between;font-size:9px;color:#9CA3AF;margin-top:3px"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div></div>';
      })()
    + '</div></div>';
}
