// ================================================
//   LABORO Sport & Outdoor — Génération du Portfolio CCF
//   Portfolio d'activités professionnelles imprimable
//   Recréé en juin 2026 (fonction perdue lors d'un remplacement de fichier)
// ================================================

// Portfolio de l'ÉLÈVE COURANT (bouton "Générer mon portfolio" côté élève)
function genererPortfolio(){
  if(!CU || !CU.mail){ if(typeof showLoginError==='function') showLoginError('Connecte-toi d\'abord.'); return; }
  genererPortfolioEleve(CU.mail);
}

// Portfolio d'un élève donné (bouton "Portfolio" de la fiche élève côté enseignant,
// et réutilisé par genererPortfolio() pour l'élève courant).
function genererPortfolioEleve(mail){
  const s = (typeof gS==='function') ? gS() : {};
  // Données de l'élève : depuis le store, ou l'utilisateur courant
  const ud = s[mail] || (CU && CU.mail===mail ? {missions:CU.missions, competences:CU.competences} : null) || {missions:{}, competences:{}};
  if(!ud.missions) ud.missions = {};
  if(!ud.competences) ud.competences = {};

  const nom = ud.nom || (CU && CU.mail===mail ? CU.nom : null) || mail.split('@')[0];
  const classe = ud.classe || (CU && CU.mail===mail ? CU.classe : '') || '';
  const score = (typeof calcScore==='function') ? calcScore(ud) : 0;

  // Labels de niveau (0 à 4)
  const niveauLabels = ['Non démarré','Découverte','En progression','Acquis','Maîtrisé'];
  const niveauCols   = ['#9CA3AF','#63B3ED','#4A6FA5','#185FA5','#0A2540'];

  // Positionnement global LABORO selon le score
  const posGlobal = score>=75 ? 'Professionnel performant'
                  : score>=50 ? 'Professionnel compétent'
                  : score>=25 ? 'Professionnel en développement'
                  : 'Professionnel débutant';

  // Niveau de chaque compétence (via calcNiveauComp si dispo, sinon données brutes)
  function niveauDe(code){
    if(typeof calcNiveauComp==='function') return calcNiveauComp(code, ud);
    return ud.competences[code] || 0;
  }

  // Missions validées, triées par note décroissante
  const missionsValidees = Object.entries(ud.missions)
    .filter(function(e){ return e[1] && e[1].status==='done'; })
    .map(function(e){
      const m = (typeof MISSIONS!=='undefined') ? MISSIONS.find(function(x){return x.id===e[0];}) : null;
      return { id:e[0], titre: m?m.titre:e[0], comp: m?m.comp:(e[1].comp||''), palier: m?m.palier:'', score: e[1].score||0 };
    })
    .sort(function(a,b){ return b.score - a.score; });

  const nbValidees = missionsValidees.length;
  const moyenne = nbValidees ? (missionsValidees.reduce(function(a,m){return a+m.score;},0)/nbValidees).toFixed(1) : '—';

  // Regrouper les compétences par épreuve CCF (G1→E31, G2→E32, G3→E33, G4A/G4B→E2)
  const epreuves = [
    { code:'E31', titre:'Conseiller et vendre',           coef:'Coef. 3', groupes:['G1'] },
    { code:'E32', titre:'Suivre les ventes',              coef:'Coef. 2', groupes:['G2'] },
    { code:'E33', titre:'Développer la relation client',  coef:'Coef. 3', groupes:['G3'] },
    { code:'E2',  titre:'Gérer l\'espace / Prospecter',   coef:'Bloc 4',  groupes:['G4A','G4B'] },
  ];

  // Construire les cartes de compétences par épreuve
  function carteComp(c){
    const lv = niveauDe(c.code);
    const segments = [0,1,2,3].map(function(i){
      const on = (i < lv);
      return '<div style="width:18px;height:6px;border-radius:3px;background:'+(on?niveauCols[lv]:'#E5E7EB')+'"></div>';
    }).join('');
    return '<div style="background:#fff;border-radius:8px;padding:10px 12px;border:1px solid #E5E7EB">'
      + '<div style="font-size:10px;font-weight:700;color:'+niveauCols[lv]+';margin-bottom:4px">'+c.code+' — '+c.label+'</div>'
      + '<div style="display:flex;gap:3px;margin-bottom:4px">'+segments+'</div>'
      + '<div style="font-size:9px;color:'+niveauCols[lv]+';font-weight:700">Niveau '+lv+' — '+niveauLabels[lv]+'</div>'
      + '</div>';
  }

  const epreuvesHtml = epreuves.map(function(ep){
    const comps = COMP.filter(function(c){ return ep.groupes.indexOf(c.g) >= 0; });
    if(!comps.length) return '';
    return '<div style="margin-bottom:16px">'
      + '<div style="font-size:11px;font-weight:800;color:#2D5282;margin-bottom:8px;text-transform:uppercase;letter-spacing:.04em">'
      + ep.code+' — '+ep.titre+' <span style="font-size:9px;opacity:.6;font-weight:600">'+ep.coef+'</span></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px">'
      + comps.map(carteComp).join('')
      + '</div></div>';
  }).join('');

  // Liste des missions validées (les 8 meilleures pour rester lisible)
  const missionsHtml = nbValidees
    ? missionsValidees.slice(0,8).map(function(m){
        const col = m.score>=14 ? '#185FA5' : m.score>=11 ? '#D97706' : '#C53030';
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #F3F4F6;font-size:11px">'
          + '<span style="color:#374151">'+m.titre+'</span>'
          + '<span style="font-weight:800;color:'+col+';white-space:nowrap;margin-left:10px">'+m.score+'/20</span>'
          + '</div>';
      }).join('')
    : '<div style="font-size:11px;color:#9CA3AF;font-style:italic">Aucune mission validée pour le moment.</div>';

  // Appréciation générée automatiquement
  const compAcquises = COMP.filter(function(c){ return niveauDe(c.code)>=3; });
  const pointsForts = compAcquises.slice(0,2).map(function(c){ return c.label+' ('+c.code+', niveau '+niveauDe(c.code)+')'; }).join(' et ');
  const enCours = COMP.filter(function(c){ const lv=niveauDe(c.code); return lv===1||lv===2; });
  const phraseEnCours = enCours.length ? ' La compétence '+enCours[0].code+' ('+enCours[0].label+') est en cours d\'acquisition.' : '';
  const appreciation = nbValidees
    ? nom+' a validé '+nbValidees+' mission'+(nbValidees>1?'s':'')+' avec une moyenne de '+moyenne+'/20.'
      + (pointsForts ? ' Points forts : '+pointsForts+'.' : '')
      + phraseEnCours
      + ' Positionnement global : '+posGlobal+'.'
    : 'Le parcours de '+nom+' est en cours de constitution. Les premières missions permettront d\'établir le positionnement.';

  // Date du jour
  const dateJour = new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});

  // Construire l'overlay portfolio
  let overlay = document.getElementById('portfolio-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'portfolio-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:24px 16px';
    overlay.onclick = function(e){ if(e.target===overlay) fermerPortfolio(); };
    document.body.appendChild(overlay);
  }

  overlay.innerHTML =
    '<div id="portfolio-doc" style="max-width:780px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 10px 50px rgba(0,0,0,.3)">'
    // En-tête
    + '<div style="background:linear-gradient(135deg,#1A2E4A,#2D5282);padding:22px 26px;color:#fff;display:flex;justify-content:space-between;align-items:flex-start">'
    + '<div>'
    + '<div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Portfolio d\'activités professionnelles</div>'
    + '<div style="font-size:20px;font-weight:900">'+nom+'</div>'
    + '<div style="font-size:11px;color:rgba(255,255,255,.75);margin-top:3px">'+(classe||'Bac Pro MCV')+' · LABORO Sport &amp; Outdoor · '+dateJour+'</div>'
    + '</div>'
    + '<div style="text-align:right">'
    + '<div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:4px">Score LABORO</div>'
    + '<div style="font-size:30px;font-weight:900;color:#93C5FD">'+score+'<span style="font-size:13px;opacity:.6">/100</span></div>'
    + '</div>'
    + '</div>'
    // Corps
    + '<div style="padding:24px 26px">'
    + '<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px">Positionnement par compétence — aligné grilles CCF</div>'
    + epreuvesHtml
    // Missions validées
    + '<div style="margin-top:8px;margin-bottom:16px">'
    + '<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Missions validées · '+nbValidees+' · moyenne '+moyenne+'/20</div>'
    + missionsHtml
    + '</div>'
    // Appréciation
    + '<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Appréciation motivée — générée automatiquement</div>'
    + '<div style="background:#F0F4FF;border-left:3px solid #2D5282;border-radius:0 8px 8px 0;padding:12px 16px;font-size:12px;color:#1A2E4A;line-height:1.7">'+appreciation+'</div>'
    + '<div style="font-size:10px;color:#9CA3AF;font-style:italic;margin-top:10px;text-align:right">Généré par LABORO · '+nbValidees+' missions validées'+(classe?' · '+classe:'')+'</div>'
    + '</div>'
    // Barre d'actions (non imprimée)
    + '<div class="portfolio-actions" style="padding:14px 26px;background:#F8FAFF;border-top:1px solid #F3F4F6;display:flex;gap:10px;justify-content:flex-end">'
    + '<button onclick="window.print()" style="background:#2D5282;color:#fff;border:none;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">🖨 Imprimer / PDF</button>'
    + '<button onclick="fermerPortfolio()" style="background:#fff;color:#4B5563;border:1px solid #E5E7EB;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">Fermer</button>'
    + '</div>'
    + '</div>';

  overlay.style.display = 'block';
  overlay.scrollTop = 0;
}

function fermerPortfolio(){
  const overlay = document.getElementById('portfolio-overlay');
  if(overlay) overlay.style.display = 'none';
}
