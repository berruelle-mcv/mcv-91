// ================================================
//   LABORO — Moteur commun : tableau de bord élève/enseignant, actualités, indicateurs
//   (contenus propres à l'univers — actualités, postes — lus dans LABORO_CONFIG)
// ================================================

// ═══ DASHBOARD ═══

// --- Missions assignées par l'enseignant (élève uniquement) ---
// Depuis le 25/09/2026 : plusieurs missions à la fois ; chacune disparaît dès
// que l'élève l'a terminée (validée, ou 2 tentatives utilisées).
async function renderMDJEleve(){
  const wrap = document.getElementById('mdj-wrap');
  if(!wrap) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ wrap.innerHTML=''; return; }
  const r = await fetchJSON(LABORO_API + '/api/mission-du-jour/moi', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){ wrap.innerHTML=''; return; }
  let missions = Array.isArray(r.data.missions) ? r.data.missions : (r.data.mission ? [r.data.mission] : []);
  // Double sécurité côté navigateur : ne pas afficher une mission que l'élève vient de terminer
  const ud = (typeof gUD === 'function') ? gUD() : null;
  missions = missions.filter(function(m){
    const loc = ud && ud.missions && ud.missions[m.mission_id];
    return !(loc && (loc.status === 'done' || (loc.tentatives||0) >= 2));
  });
  if(!missions.length){ wrap.innerHTML=''; return; }
  // Un encadré par enseignant (10/10/2026, demande de Pascal pour la classe co-animée) :
  // « donnée par M. Berruelle » sur fond bleu ciel, « par Mme Berruelle » sur fond rose.
  // Couleur et civilité réglées dans la base (enseignants.couleur_eleve / civilite) ;
  // sans réglage : encadré jaune et titre d'origine.
  const THEMES = {
    jaune: { fond:'#FFFBEA', bord:'#FDE68A', titre:'#8A6500', bouton:'#D97706' },
    bleu:  { fond:'#E0F2FE', bord:'#7DD3FC', titre:'#075985', bouton:'#0284C7' },
    rose:  { fond:'#FCE7F3', bord:'#F9A8D4', titre:'#9D174D', bouton:'#DB2777' }
  };
  const groupes = [];
  missions.forEach(function(m){
    const cle = m.donne_par || '';
    let g = groupes.find(function(x){ return x.cle === cle; });
    if(!g){ g = { cle: cle, theme: THEMES[m.couleur] || THEMES.jaune, missions: [] }; groupes.push(g); }
    g.missions.push(m);
  });
  const parSeul = groupes.length === 1 && !groupes[0].cle;
  wrap.innerHTML = groupes.map(function(g, gi){
    const t = g.theme, n = g.missions.length;
    const titre = g.cle
      ? (n > 1 ? 'Missions données par ' + g.cle + ' (' + n + ')' : 'Mission donnée par ' + g.cle)
      : (n > 1 ? 'Missions demandées par ton professeur (' + n + ')' : (parSeul ? 'Mission du jour' : 'Mission demandée par ton professeur'));
    return '<div class="card" style="background:' + t.fond + ';border:1px solid ' + t.bord + ';margin-top:' + (gi ? '10px' : '0') + '">'
      + '<div class="ct" style="color:' + t.titre + '">⭐ ' + titre + '</div>'
      + g.missions.map(function(m, i){
          return '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0'+(i ? ';border-top:1px solid ' + t.bord : '')+'">'
            + '<div><div style="font-size:13px;font-weight:700;margin-bottom:2px">'+m.titre+'</div>'
            + '<div class="u-label-sm">'+m.comp_id+' P'+m.palier
            + (m.maison_jusqu_a && typeof dateMaisonLisible === 'function' ? ' · <strong style="color:#075985">🏠 à terminer à la maison avant '+dateMaisonLisible(m.maison_jusqu_a)+'</strong>' : '')
            + '</div></div>'
            + '<button onclick="handleMission(\''+m.mission_id+'\')" style="flex-shrink:0;padding:6px 14px;background:' + t.bouton + ';color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:11px;font-weight:700">Ouvrir</button>'
            + '</div>';
        }).join('')
      + '</div>';
  }).join('');
}

// ═══ ACTUALITÉS DE L'ENTREPRISE ═══
// Propres à chaque univers : LABORO_CONFIG.actus (data/univers.js). Liste ci-dessous = repli.
const ACTUS_LABORO=(getCfg().actus && getCfg().actus.length) ? getCfg().actus : [
  {date:'Lun',icon:'📦',titre:'Réception commande',txt:'50 ballons de football LABORO T5 et 30 chasubles LABORO Pro reçus en entrepôt. Mise en rayon prévue demain.'},
  {date:'Lun',icon:'📞',titre:'Prospect à rappeler',txt:'M. Dubois (CSE Renault Évry) a demandé un devis pour 20 maillots personnalisés. Romain Sauzet prend en charge.'},
  {date:'Mar',icon:'🎯',titre:'Objectif semaine',txt:'Objectif : 8 500 € de CA cette semaine. À J+1 : 3 240 € réalisés. Bonne dynamique sur le rayon chaussures.'},
  {date:'Mar',icon:'⚠️',titre:'Stock critique',txt:'Chaussures running LABORO EasyRun taille 42 : 2 unités restantes. Commande fournisseur en cours — délai 5 jours.'},
  {date:'Mer',icon:'🤝',titre:'Visite client B2B',txt:'Isabelle Faure (CSE PSA Stellantis) visite le showroom à 14h. Préparer la salle de réunion et le catalogue B2B.'},
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

// (getIndicateursLive supprimée : code mort, jamais appelée, données de démo d'un seul univers.)




function setAccentColor(classe){
  const colors = {
    '2nde':      {c1:'var(--th-accent)', cf:'var(--th-profond2)', cm:'var(--th-pale)', cb:'var(--th-fond)'},
    '1ere-AGEC': {c1:'var(--th-principal)', cf:'var(--th-profond)', cm:'var(--th-bordure)', cb:'var(--th-voile)'},
    '1ere-PVOC': {c1:'var(--th-principal)', cf:'var(--th-profond)', cm:'var(--th-bordure)', cb:'var(--th-voile)'},
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


// ═══ FICHE DE POSTE & ORGANIGRAMME ═══

// Postes et organigramme : propres à chaque univers (LABORO_CONFIG.postes). Repli ci-dessous.
const POSTES = (getCfg().postes && Object.keys(getCfg().postes).length) ? getCfg().postes : {
  '2NDE': {
    titre: 'Stagiaire découverte des métiers commerciaux',
    dept: 'Découverte — Showroom & Prospection B2B',
    manager: {nom:'Romain Sauzet', role:'Responsable Showroom & Commercial', couleur:'#6B4FA0', initiales:'RS'},
    pdg: {nom:'Pascal Berruelle', role:'PDG — LABORO Sport & Outdoor', couleur:'var(--th-principal)', initiales:'PB'},
    autre_dir: {nom:'Nina Chevalier', role:'Commerciale B2B — Prospection', couleur:'#0891B2', initiales:'NC'},
    autre_dir2: {nom:'Marco Pellini', role:'Responsable Satisfaction Client', couleur:'#1D9E75', initiales:'MP'},
    pairs: ['Léo Girard','Manon Lefèvre'],
    missions_principales: [
      "Découvrir les métiers de la vente et de la relation client en showroom",
      "Observer les techniques d'accueil et de prospection B2B",
      "Participer aux tâches simples du quotidien commercial",
      "Se familiariser avec les outils LABORO (LABORO Connect, catalogue)",
      "Construire son projet d'orientation entre les options AGEC et PVOC",
    ],
    competences_cles: [
      "Posture professionnelle de base (ponctualité, tenue, communication)",
      "Techniques d'accueil et d'écoute active",
      "Repérage des différents métiers de l'entreprise",
      "Utilisation simple des outils numériques LABORO",
      "Travail en équipe et respect des consignes",
    ],
    conditions: "Stage d'observation et de découverte · Showroom Évry-Courcouronnes (91) · Rattaché(e) à Romain Sauzet"
  },
  'AGEC': {
    titre: 'Conseiller(ère) de vente',
    dept: 'Showroom & E-commerce',
    manager: {nom:'Romain Sauzet', role:'Responsable Showroom & Commercial', couleur:'#6B4FA0', initiales:'RS'},
    pdg: {nom:'Pascal Berruelle', role:'PDG — LABORO Sport & Outdoor', couleur:'var(--th-principal)', initiales:'PB'},
    autre_dir: {nom:'Nina Chevalier', role:'Commerciale B2B — Prospection', couleur:'#0891B2', initiales:'NC'},
    autre_dir2: {nom:'Marco Pellini', role:'Responsable Satisfaction Client', couleur:'#1D9E75', initiales:'MP'},
    pairs: ['Alex Moreau','Jade Fontaine'],
    missions_principales: [
      "Accueillir et conseiller les clients au showroom d'Évry",
      "Assurer les ventes en ligne sur laboro-sport.fr",
      "Gérer et optimiser l'espace commercial (merchandising, stocks)",
      "Participer aux opérations commerciales et animations",
      "Contribuer à la fidélisation de la clientèle",
    ],
    competences_cles: [
      "Maîtrise des techniques de vente et de découverte des besoins",
      "Gestion des stocks et approvisionnements",
      "Merchandising et implantation des produits",
      "Utilisation des outils digitaux (site e-commerce, réseaux sociaux)",
      "Traitement des réclamations et suivi SAV",
    ],
    conditions: "CDI · Temps plein · Showroom Évry-Courcouronnes (91) · Rattaché(e) à Romain Sauzet"
  },
  'PVOC': {
    titre: 'Commercial(e) terrain',
    dept: 'Prospection & Vente B2B',
    manager: {nom:'Nina Chevalier', role:'Responsable Commercial B2B', couleur:'#0891B2', initiales:'NC'},
    pdg: {nom:'Pascal Berruelle', role:'PDG — LABORO Sport & Outdoor', couleur:'var(--th-principal)', initiales:'PB'},
    autre_dir: {nom:'Romain Sauzet', role:'Responsable Showroom & Commercial', couleur:'#6B4FA0', initiales:'RS'},
    autre_dir2: {nom:'Marco Pellini', role:'Responsable Satisfaction Client', couleur:'#1D9E75', initiales:'MP'},
    pairs: ['Théo Vasseur','Camille Dumas'],
    missions_principales: [
      "Prospecter et développer un portefeuille de clients professionnels (CSE, clubs, mairies)",
      "Conduire des entretiens de vente en face-à-face et par téléphone",
      "Élaborer et suivre les devis et propositions commerciales",
      "Fidéliser les clients existants et détecter de nouvelles opportunités",
      "Alimenter et mettre à jour LABORO Connect",
    ],
    competences_cles: [
      "Techniques de prospection multicanale (phoning, e-mailing, LinkedIn)",
      "Négociation et traitement des objections",
      "Élaboration de propositions commerciales",
      "Gestion du portefeuille clients et suivi des relances",
      "Reporting et analyse des performances commerciales",
    ],
    conditions: "CDI · Terrain + télétravail · Secteur Essonne (91) · Véhicule fourni · Rattaché(e) à Nina Chevalier"
  }
};

function getPosteKey(){
  const cls = (CU && CU.classe) || '';
  if (cls === '2nde') return '2NDE';
  if (cls.includes('AGEC')) return 'AGEC';
  if (cls.includes('PVOC')) return 'PVOC';
  return null;
}

function renderPosteCard(){
  const wrap = document.getElementById('poste-card-wrap');
  if (!wrap || !CU) return;
  const key = getPosteKey();
  if (!key || !POSTES[key]) { wrap.innerHTML = ''; return; }
  const p = POSTES[key];
  wrap.innerHTML = '<div class="poste-card" onclick="openOrg()">'
    + '<div class="poste-card-l">'
    + '<div class="poste-card-tag">Mon poste chez ' + getNomCourt() + '</div>'
    + '<div class="poste-card-titre">' + p.titre + '</div>'
    + '<div class="poste-card-sub">' + p.dept + ' · Responsable : ' + p.manager.nom + '</div>'
    + '</div>'
    + '<div class="poste-card-r">'
    + '<div class="poste-card-ico">🏢</div>'
    + '<div class="poste-card-cta">Voir l\'organigramme →</div>'
    + '</div>'
    + '</div>';
}

function openOrg(){
  const key = getPosteKey();
  if (!key || !POSTES[key]) return;
  const p = POSTES[key];
  document.getElementById('org-titre').textContent = 'Mon poste chez ' + getNomCourt();
  document.getElementById('org-sous').textContent = p.titre + ' · ' + p.dept;
  renderOrgTree(key);
  renderFichePoste(key);
  document.getElementById('org-overlay').classList.add('open');
}

function closeOrg(){
  document.getElementById('org-overlay').classList.remove('open');
}

function orgTab(idx, el){
  document.querySelectorAll('.org-tab').forEach(function(t){ t.classList.remove('on'); });
  el.classList.add('on');
  document.getElementById('org-content').style.display = idx === 0 ? '' : 'none';
  document.getElementById('org-fp').style.display = idx === 1 ? '' : 'none';
}

function renderOrgTree(key){
  const p = POSTES[key];
  const nom = (CU && CU.nom) || 'Vous';

  function node(initiales, nomP, role, cls, couleur, badge){
    return '<div class="org-node ' + cls + '">'
      + '<div class="org-node-ava" style="background:' + couleur + '">' + initiales + '</div>'
      + '<div class="org-node-nom">' + nomP + '</div>'
      + '<div class="org-node-role">' + role + '</div>'
      + (badge ? '<div class="org-node-badge">' + badge + '</div>' : '')
      + '</div>';
  }

  const initMe = nom.split(' ').map(function(w){ return w[0]; }).join('').substring(0,2).toUpperCase();
  const couleurMe = key === 'AGEC' ? '#1D9E75' : key === 'PVOC' ? '#0891B2' : 'var(--th-accent)';

  let html = ''
    + '<div class="org-tree">'
    + '<div class="org-level">' + node(p.pdg.initiales, p.pdg.nom, p.pdg.role, 'top', p.pdg.couleur, '') + '</div>'
    + '<div class="org-connector"></div>'
    + '<div class="org-level" style="gap:24px;position:relative">'
    + '<div style="position:relative">' + node(p.manager.initiales, p.manager.nom, p.manager.role, 'manager', p.manager.couleur, 'Ton responsable') + '</div>'
    + [p.autre_dir, p.autre_dir2].filter(Boolean).map(function(d){ return '<div style="opacity:.5">' + node(d.initiales, d.nom, d.role, 'peer', d.couleur, '') + '</div>'; }).join('')
    + '</div>'
    + '<div class="org-connector"></div>'
    + '<div class="org-level" style="gap:16px">'
    + (p.pairs || []).map(function(n){ return node(n.split(' ').map(function(w){ return w[0]; }).join(''), n, p.titre, 'peer', '#A0A09A', ''); }).join('')
    + node(initMe, nom, p.titre, 'me', couleurMe, '⭐ Vous')
    + '</div>'
    + '</div>'
    + '<div style="text-align:center;margin-top:16px;padding:10px;background:var(--gc);border-radius:8px;font-size:11px;color:var(--gm)">'
    + 'Tu fais partie de l\'équipe <strong>' + p.dept + '</strong> de ' + getNomEntreprise() + ' — ' + getVille() + ' (91)'
    + (getCfg().note_organigramme ? '<div style="margin-top:6px">' + getCfg().note_organigramme + '</div>' : '')
    + '</div>';

  document.getElementById('org-content').innerHTML = html;
}

function renderFichePoste(key){
  const p = POSTES[key];
  const html = ''
    + '<div class="fp-section">'
    + '<div class="fp-section-t">Responsable direct</div>'
    + '<div class="fp-manager">'
    + '<div class="fp-manager-ava" style="background:' + p.manager.couleur + '">' + p.manager.initiales + '</div>'
    + '<div><div class="fp-manager-nom">' + p.manager.nom + '</div><div class="fp-manager-role">' + p.manager.role + '</div></div>'
    + '</div>'
    + '</div>'
    + (p.mission ? '<div class="fp-section"><div class="fp-section-t">Mission principale</div><p style="font-size:12px;color:var(--gr);line-height:1.6">' + p.mission + '</p></div>' : '')
    + '<div class="fp-section">'
    + '<div class="fp-section-t">Missions principales</div>'
    + '<ul class="fp-liste">' + p.missions_principales.map(function(m){ return '<li>' + m + '</li>'; }).join('') + '</ul>'
    + '</div>'
    + '<div class="fp-section">'
    + '<div class="fp-section-t">Compétences clés attendues</div>'
    + '<ul class="fp-liste">' + p.competences_cles.map(function(c){ return '<li>' + c + '</li>'; }).join('') + '</ul>'
    + '</div>'
    + (p.qualites && p.qualites.length ? '<div class="fp-section"><div class="fp-section-t">Qualités attendues</div><div style="display:flex;gap:6px;flex-wrap:wrap">'
        + p.qualites.map(function(q){ return '<span style="font-size:11px;font-weight:600;background:var(--bc);color:var(--bl);padding:4px 10px;border-radius:12px">' + q + '</span>'; }).join('') + '</div></div>' : '')
    + '<div class="fp-section" style="margin-bottom:0">'
    + '<div class="fp-section-t">Conditions</div>'
    + '<p style="font-size:12px;color:var(--gr)">' + p.conditions + '</p>'
    + '</div>';
  document.getElementById('org-fp').innerHTML = html;
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
    + '<div style="background:var(--bc,var(--th-fond));border-radius:8px;padding:10px 14px;text-align:center">'
    + '<div style="font-size:20px;font-weight:800;color:var(--bl)">' + comps.length + '</div>'
    + '<div class="u-label-sm">Compétences acquises</div></div>'
    + '</div>';
}

function renderDashboard(){
  if(!CU)return;
  // Enseignant : tableau de bord dédié (dashboard-enseignant.js, 26/09/2026)
  const dEns = document.getElementById('dash-ens'), dEl = document.getElementById('dash-eleve');
  if(CU.classe === 'enseignant' && typeof renderDashboardEnseignant === 'function'){
    if(dEns) dEns.style.display = '';
    if(dEl) dEl.style.display = 'none';
    renderDashboardEnseignant();
    return;
  }
  if(dEns) dEns.style.display = 'none';
  if(dEl) dEl.style.display = '';
  const ud=gUD();
  const sc=calcScore(ud);
  document.getElementById('wb-b').textContent='Bonjour '+CU.nom.split(' ')[0]+' !';
  renderPosteCard();
  // Rafraîchir le message du responsable selon la progression
  const msgDyn=getMsg(CU.classe,CU.poste);
  const msgFromEl=document.getElementById('msg-f');
  if(msgFromEl){
    const initials=msgDyn.from.split(' ').slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();
    msgFromEl.innerHTML='<span style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--th-nuit),var(--th-principal));color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;box-shadow:0 2px 6px rgba(10,37,64,.3)">'+initials+'</span>'
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
      renderDetailScore(ud, msDone);
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
  if(clt.length>0&&clt[0].score>0&&now.getDate()<=7){
    const emp=clt[0];
    empW.innerHTML=`<div class="emp-mois"><div class="emp-ico">🏆</div><div><div class="emp-t">Employé du mois — ${now.toLocaleString('fr-FR',{month:'long'})}</div><div class="emp-n">${emp.nom}</div><div class="emp-s">Score LABORO : ${emp.score}/100</div></div></div>`;
  }else empW.innerHTML='';
  // Mission du jour (élève uniquement) — assignée par l'enseignant
  if(CU.classe !== 'enseignant' && typeof renderMDJEleve === 'function') renderMDJEleve();
  // Classement dans le dashboard
  const cltDash=document.getElementById('clt-dash');
  if(cltDash && clt.some(function(u){ return u.score>0; })){
    const medals=['🥇','🥈','🥉'];
    const myIdx=clt.findIndex(function(u){ return u.mail===CU.mail; });
    const myRank=myIdx>=0?myIdx+1:null;
    // Seuls les élèves ayant un score > 0 méritent une place sur le podium —
    // sinon des élèves n'ayant rien fait s'y retrouvaient juste par ordre de liste.
    const scorers=clt.filter(function(u){ return u.score>0; });
    const top3=scorers.slice(0,3);
    const isMeInTop3=top3.some(function(u){ return u.mail===CU.mail; });
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
        +'<div style="font-size:11px;font-weight:700;color:var(--th-fonce);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+(isMe?'<strong>'+u.nom.split(' ')[0]+'</strong>':u.nom.split(' ')[0])+'</div>'
        +'<div style="background:'+ps.bg+';border:1.5px solid '+ps.border+';border-radius:10px;height:'+ps.height+';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px'+(isMe?';box-shadow:0 0 0 2px var(--bl)':'')+';">'
        +'<div style="font-size:20px">'+ps.medal+'</div>'
        +'<div style="font-size:14px;font-weight:900;color:var(--th-fonce)">'+u.score+'</div>'
        +'<div style="font-size:8px;color:#6B7280">pts</div>'
        +'</div></div>';
    });
    podHtml+='</div>';
    // Liste : uniquement le top 3 (on n'expose pas le classement complet de la classe,
    // ni donc la position du dernier, aux autres élèves)
    let listHtml='<div style="display:flex;flex-direction:column;gap:4px">';
    top3.forEach(function(u,i){
      const isMe=u.mail===CU.mail;
      const rankMedal=medals[i];
      listHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:8px;'+(isMe?'background:var(--ac1b,var(--th-fond));font-weight:700':'background:transparent')+'">'
        +'<span style="width:22px;text-align:center;font-size:14px;flex-shrink:0">'+rankMedal+'</span>'
        +'<span style="flex:1;font-size:12px;color:var(--th-fonce);'+(isMe?'font-weight:800':'')+'white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+u.nom.split(' ')[0]+'</span>'
        +'<span style="font-size:11px;font-weight:800;color:var(--bl)">'+u.score+'</span>'
        +'</div>';
    });
    listHtml+='</div>';
    // Mon rang si hors podium — uniquement pour un élève ayant un score > 0
    // (un élève à 0 point n'a pas de "rang" pertinent à afficher, ce serait arbitraire),
    // visible seulement par l'élève lui-même, jamais par les autres.
    if(!isMeInTop3 && myIdx>=0 && clt[myIdx].score>0){
      const myScorerRank=scorers.findIndex(function(u){ return u.mail===CU.mail; })+1;
      listHtml+='<div style="font-size:10px;color:var(--gm);text-align:center;margin-top:6px;padding-top:6px;border-top:1px solid var(--gb)">Ton rang : #'+myScorerRank+' · '+clt[myIdx].score+' pts</div>';
    }
    cltDash.innerHTML=podHtml+listHtml;
  } else if(cltDash){
    cltDash.innerHTML='<div style="text-align:center;padding:20px 12px">'
      +'<div style="font-size:24px;margin-bottom:8px">🏆</div>'
      +'<div style="font-size:12px;font-weight:700;color:var(--gr);margin-bottom:4px">Le classement se construit au fil des missions</div>'
      +'<div style="font-size:11px;color:var(--gm);margin-bottom:12px">Complète ta première mission pour apparaître ici.</div>'
      +'<button onclick="goP(&quot;missions&quot;,null)" style="padding:8px 18px;background:linear-gradient(135deg,var(--th-nuit),var(--th-principal));color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">Voir mes missions →</button>'
      +'</div>';
  }
  // Progression
  const lc=['var(--gb)','var(--th-doux)','var(--bl)','var(--vt)','#27500A'];
  const niveauLabels2=['—','Découverte','En cours','Acquis','Maîtrisé'];
  const niveauCols2=['var(--gb)','var(--th-vif)','var(--th-second)','var(--th-accent)','var(--th-nuit)'];
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
            const palierColors = ['','var(--th-second)','var(--th-accent)','var(--th-principal)','#7B2FBE'];
            const pCol = palierColors[m.palier] || 'var(--th-second)';
            const scoreColor = v.score>=12 ? 'var(--th-principal)' : v.score>=8 ? '#D97706' : '#C53030'; // barème de maîtrise (26/09/2026)
            return '<div style="display:flex;align-items:center;gap:10px;padding:8px;background:#F8FAFF;border-radius:10px;border-left:3px solid '+pCol+'">'
              + '<div class="u-flex-1">'
              + '<div style="font-size:12px;font-weight:700;color:var(--th-fonce);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+m.titre+'</div>'
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
        + '<button onclick="goP(&quot;missions&quot;,null)" style="padding:8px 18px;background:linear-gradient(135deg,var(--th-nuit),var(--th-principal));color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">Lancer ma première mission →</button>'
        + '</div>';
    }
  }
}

function renderActus(){
  const el = document.getElementById('dash-actus');
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
    ? {icon:'🏆', titre:'Excellent travail !', texte:'Ton score LABORO est dans le top 10%. '+getResp().nom+' a noté ta progression — continue ainsi !', color:'var(--th-fond)', border:'var(--th-principal)'}
    : done.length === 0
    ? {icon:'🚀', titre:'Bienvenue chez '+getNomCourt()+' !', texte:'Ta première mission t\'attend. Lis bien la ressource avant de répondre — elle contient tout ce qu\'il faut savoir.', color:'#FEF3C7', border:'#D97706'}
    : done.length < 5
    ? {icon:'💪', titre:'Bonne lancée !', texte:'Tu as complété '+done.length+' mission(s). Chaque mission validée fait progresser tes compétences CCF.', color:'var(--th-fond)', border:'var(--th-second)'}
    : {icon:'⭐', titre:'Progression solide', texte:done.length+' missions complétées. Ton dossier CCF se construit automatiquement. Vise le niveau Professionnel compétent !', color:'#EDE9FE', border:'#7B2FBE'};

  // Agenda mensuel (un message par mois, janvier -> décembre) : LABORO_CONFIG.agenda, sinon repli
  const agendas = (getCfg().agenda && getCfg().agenda.length === 12) ? getCfg().agenda : [
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
    'Cadeaux entreprise et CSE — commandes ouvertes.'
  ];

  const items = [persoMsg].concat(
    displayActus.slice(0,1).map(function(a){
      return {icon:a.icon, titre:a.titre, texte:a.txt, color:'#F8FAFF', border:'#CBD5E0'};
    })
  ).concat([
    {icon:'📅', titre:'Agenda LABORO', texte:agendas[month], color:'var(--th-fond2)', border:'var(--th-second)'}
  ]);

  el.innerHTML = items.map(function(a){
    return '<div style="background:'+a.color+';border-left:3px solid '+a.border+';border-radius:10px;padding:10px 12px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">'
      + '<span style="font-size:18px;flex-shrink:0">'+a.icon+'</span>'
      + '<div><div style="font-size:11px;font-weight:800;color:var(--th-fonce);margin-bottom:2px">'+a.titre+'</div>'
      + '<div style="font-size:11px;color:#4B5563;line-height:1.5">'+a.texte+'</div></div>'
      + '</div>';
  }).join('');
}

function renderIndicateurs(){
  const el = document.getElementById('dash-indic');
  if(!el) return;
  const ud = gUD();
  const missions = Object.entries(ud.missions||{});
  const done = missions.filter(function(m){ return m[1].status==='done'; });
  const aCorriger = missions.filter(function(m){ return etatMissionEleve(m[1]).code==='a_corriger'; });
  const scores = done.filter(function(m){ return m[1].score != null; }).map(function(m){ return m[1].score; });
  const avg = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length).toFixed(1) : '—';
  const totalMissions = getMissions().length;
  const compsAcquis = COMP.filter(function(c){ return calcNiveauComp(c.code, ud) >= 3; }).length;
  const kpis = [
    {label:'Missions complétées', value:done.length, total:totalMissions, icon:'✅', color:'var(--th-principal)', bg:'var(--th-fond)'},
    {label:'À corriger', value:aCorriger.length, total:null, icon:'✏️', color:'#C2410C', bg:'#FFEDD5'},
    {label:'Moyenne générale', value:avg+'', total:null, unit:'/20', icon:'📊', color:'#D97706', bg:'#FEF3C7'},
    {label:'Compétences acquises', value:compsAcquis, total:COMP.length, icon:'⭐', color:'#7B2FBE', bg:'#EDE9FE'},
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

// Missions proposées à l'élève selon sa classe. Chaque univers déclare ses listes
// dans data/missions.js ; une liste peut être découpée par palier (MISSIONS_PVOC_1,
// MISSIONS_PVOC_2, MISSIONS_PVOC_3…) : les morceaux présents sont mis bout à bout.
// Une liste absente (filière non ouverte dans cet univers) donne une liste vide
// au lieu de faire planter la page.
function listesMissionsClasse(cls){
  const L = function(v){ return Array.isArray(v) ? v : []; };
  if(cls==='2nde') return L(typeof MISSIONS_2NDE!=='undefined'?MISSIONS_2NDE:null);
  if(cls==='1ere-AGEC') return L(typeof MISSIONS_AGEC_1!=='undefined'?MISSIONS_AGEC_1:null);
  if(cls==='1ere-PVOC') return L(typeof MISSIONS_PVOC_1!=='undefined'?MISSIONS_PVOC_1:null)
    .concat(L(typeof MISSIONS_PVOC_2!=='undefined'?MISSIONS_PVOC_2:null))
    .concat(L(typeof MISSIONS_PVOC_3!=='undefined'?MISSIONS_PVOC_3:null));
  if(cls==='Term-AGEC') return L(typeof MISSIONS_AGEC_T!=='undefined'?MISSIONS_AGEC_T:null);
  if(cls==='Term-PVOC') return L(typeof MISSIONS_PVOC_T!=='undefined'?MISSIONS_PVOC_T:null);
  return null;
}
function getMissions(){
  if(!CU)return[];
  const cls=CU.classe;
  if(cls==='enseignant')return MISSIONS;
  const liste=listesMissionsClasse(cls);
  if(!liste)return MISSIONS;
  const trie=(cls==='2nde'||cls==='1ere-PVOC');
  const res=MISSIONS.filter(m=>liste.includes(m.id));
  return trie?res.sort((a,b)=>a.palier-b.palier||liste.indexOf(a.id)-liste.indexOf(b.id)):res;
}
function isPalierUnlocked(m,ud){
  if(m.palier===1)return true;
  // Le palier précédent de la même compétence doit être VALIDÉ. C'est le serveur qui
  // valide, selon le seuil réglé pour la classe (10/20 aujourd'hui) — l'ancien seuil
  // fixe "≥ 11" côté site bloquait à tort un élève validé avec 10/20 (25/09/2026).
  const prevPalier=m.palier-1;
  const prevMission=MISSIONS.find(x=>x.comp===m.comp&&x.palier===prevPalier);
  if(!prevMission)return true;
  const prev=ud.missions[prevMission.id];
  return !!(prev&&prev.status==='done');
}

function compBadge(code){
  const colors = {
    'C1.1':'var(--th-second)','C1.2':'var(--th-second)','C1.3':'var(--th-second)',
    'C2.1':'#E87722','C2.1b':'#E87722','C2.2':'#E87722','C2.3':'#E87722','C2.4':'#E87722',
    'C3.1':'#0096C7','C3.2':'#0096C7','C3.3':'#0096C7','C3.3b':'#0096C7',
    'G4A':'var(--th-accent)','C4A.1':'var(--th-accent)','C4A.2':'var(--th-accent)','C4A.3':'var(--th-accent)','G4B':'#7B2FBE',
    'B4.1':'#7B2FBE','B4.2':'#7B2FBE','B4.3':'#7B2FBE','B4.4':'#7B2FBE','B4.5':'#7B2FBE',
    'SA1':'#D97706','SA2':'#D97706','SA3':'#D97706',
    'ACC':'#E63B2E','ACC1':'#E63B2E','ACC2':'#E63B2E','ACC3':'#E63B2E','ACC4':'#E63B2E'
  };
  const col = hexTheme(colors[code] || '#6B7280');
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

  const palierColors = ['','var(--th-second)','var(--th-accent)','var(--th-principal)','#7B2FBE'];
  const palierBgs    = ['','var(--th-fond)','var(--th-ciel)','#D1FAE5','#EDE9FE'];
  const palierLabels = ['','Débutant','Apprenti','Pro compétent','Pro performant'];

  // Grouper par compétence pour un affichage structuré
  const grouped = {};
  ms.forEach(function(m){
    const key = m.comp.split('.')[0];
    if(!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });

  // Stats rapides
  const etatDe = function(m){ return etatMissionEleve(ud.missions[m.id]); };
  const done   = ms.filter(function(m){ return etatDe(m).code==='validee'; }).length;
  const aCorr  = ms.filter(function(m){ return etatDe(m).code==='a_corriger'; }).length;
  const nonVal = ms.filter(function(m){ return etatDe(m).code==='non_validee'; }).length;
  const wip    = ms.filter(function(m){ return etatDe(m).code==='brouillon'; }).length;
  const todo   = ms.length - done - aCorr - nonVal - wip;
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
    + '<span class="u-success" title="Validées">✅ '+done+' validée(s)</span>'
    + (aCorr ? '<span style="color:#C2410C;font-weight:700" title="Note sous le seuil : tu peux corriger">✏️ '+aCorr+' à corriger</span>' : '')
    + (nonVal ? '<span style="color:#B91C1C;font-weight:700" title="2 tentatives utilisées">⛔ '+nonVal+' non validée(s)</span>' : '')
    + (wip ? '<span style="color:#92400E;font-weight:700" title="Commencées, pas encore envoyées">📝 '+wip+' brouillon(s)</span>' : '')
    + '<span style="color:var(--gm);font-weight:600">○ '+todo+' à faire</span>'
    + '</div>'
    + '</div>';

  // Cards missions
  const cardsHtml = ms.map(function(m){
    const etat   = etatMissionEleve(ud.missions[m.id]);
    const locked = !isPalierUnlocked(m, ud) && CU.classe !== 'enseignant';
    const pCol   = palierColors[m.palier] || 'var(--th-second)';
    const pBg    = palierBgs[m.palier]   || 'var(--th-fond)';
    const pLbl   = palierLabels[m.palier] || '';

    // Badge statut
    const stBadge = locked
      ? '<span class="sp" style="background:#F3F4F6;color:#9CA3AF">🔒 P'+(m.palier-1)+' requis</span>'
      : '<span class="sp" title="'+etat.aide+'" style="background:'+etat.bg+';color:'+etat.fg+'">'+etat.label+'</span>';

    // Barre de progression si en cours
    const progressBar = etat.aide && etat.code !== 'a_faire'
      ? '<div style="margin-top:6px;font-size:11px;color:'+etat.fg+'">'+etat.aide+'</div>'
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


// ═══ Explication du Score LABORO côté élève (25/09/2026) ═══
// Les élèves ne comprenaient pas pourquoi un camarade avec une moyenne plus basse
// pouvait avoir plus de points : on affiche le détail de LEUR calcul, en clair.
function renderDetailScore(ud, msDone){
  const wbr = document.querySelector('.wb-r');
  if(!wbr) return;
  let el = document.getElementById('wb-detail');
  if(!el){
    el = document.createElement('div');
    el.id = 'wb-detail';
    el.style.cssText = 'margin-top:6px';
    wbr.appendChild(el);
  }
  if(!msDone){ el.innerHTML = ''; return; }
  const d = calcScoreDetail(ud);
  const ouvert = el.dataset.ouvert === '1';
  const moy = d.moyenne.toFixed(1).replace('.', ',');
  const reste = Math.max(0, SCORE_MISSIONS_MAX - d.nb);
  el.innerHTML =
    '<button type="button" onclick="basculerDetailScore()" style="background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:14px;padding:3px 10px;font-size:10px;font-weight:700;cursor:pointer">'
    + (ouvert ? '▲ Masquer le détail' : 'ℹ️ Comment est calculé mon score ?') + '</button>'
    + (ouvert ? '<div style="margin-top:8px;background:#fff;color:var(--th-fonce);border-radius:10px;padding:10px 12px;font-size:11px;line-height:1.55;text-align:left;max-width:280px;box-shadow:0 4px 14px rgba(0,0,0,.18)">'
      + '<div style="display:flex;justify-content:space-between;font-weight:800"><span>🎯 Qualité</span><span>' + d.qualite + ' / 70</span></div>'
      + '<div style="color:#4A5568;margin-bottom:6px">Ta moyenne sur tes missions validées : <strong>' + moy + '/20</strong>. Mieux tu réussis, plus tu gagnes de points.</div>'
      + '<div style="display:flex;justify-content:space-between;font-weight:800"><span>💪 Engagement</span><span>' + d.engagement + ' / 30</span></div>'
      + '<div style="color:#4A5568;margin-bottom:6px">' + d.nb + ' mission(s) validée(s) × 3 pts'
      + (reste > 0 ? ' — encore ' + reste + ' mission(s) pour avoir les 30 pts.' : ' — maximum atteint !') + '</div>'
      + '<div style="border-top:1px solid #E2E8F0;padding-top:6px;color:#4A5568">Deux élèves peuvent avoir la même moyenne mais pas le même score : celui qui a validé plus de missions gagne des points d\'engagement. Seules les missions <strong>validées</strong> comptent.</div>'
      + '</div>' : '');
}
function basculerDetailScore(){
  const el = document.getElementById('wb-detail');
  if(!el) return;
  el.dataset.ouvert = el.dataset.ouvert === '1' ? '0' : '1';
  renderDetailScore(gUD(), 1);
}


// ═══ État d'une mission vu par l'élève (26/09/2026) ═══
// Un seul endroit décide du libellé, pour que « Mes missions » soit sans ambiguïté.
function etatMissionEleve(m){
  const fmt = function(n){ return String(n).replace('.', ','); };
  if(!m || !m.status || m.status === 'todo')
    return { code:'a_faire', label:'À faire', bg:'#F3F4F6', fg:'#6B7280', aide:'' };
  if(m.status === 'done'){
    const n = m.note_revue != null ? m.note_revue : m.score;
    return { code:'validee', label:'✅ Validée' + (n != null ? ' · ' + fmt(n) + '/20' : ''), bg:'#D1FAE5', fg:'#065F46',
             aide: m.commentaire_prof ? '💬 Ton professeur a laissé un commentaire : ouvre la mission, onglet Feedback.' : '' };
  }
  if(m.status === 'att'){
    const n = m.note_revue != null ? m.note_revue : m.note_ia;
    if((m.tentatives || 0) >= 2)
      return { code:'non_validee', label:'⛔ Non validée' + (n != null ? ' · ' + fmt(n) + '/20' : ''), bg:'#FEE2E2', fg:'#B91C1C',
               aide:'Tu as utilisé tes 2 tentatives : parles-en à ton professeur.' };
    return { code:'a_corriger', label:'✏️ À corriger' + (n != null ? ' · ' + fmt(n) + '/20' : ''), bg:'#FFEDD5', fg:'#C2410C',
             aide:'Note sous le seuil : lis le feedback et soumets ta correction (1 tentative restante).' };
  }
  // 'wip' : commencée dans ce navigateur, jamais envoyée
  return { code:'brouillon', label:'📝 Brouillon', bg:'#FEF3C7', fg:'#92400E', aide:'Commencée mais pas encore envoyée : termine-la et clique sur « Soumettre ».' };
}
