// ================================================
//   LABORO Sport & Outdoor — Utilitaires
//   Fonctions utilitaires globales
//   Version 1.0 — Architecture modulaire
// ================================================

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

// ═══ VITRINE PRESCRIPTEUR ═══
function showVitrine(){
  document.getElementById('login').style.display='none';
  const v=document.getElementById('vitrine');
  if(v){ v.style.display='block'; window.scrollTo(0,0); }
}

function hideVitrine(){
  const v=document.getElementById('vitrine');
  if(v) v.style.display='none';
  document.getElementById('login').style.display='flex';
}

function startDemo(){
  // ── MODE DÉMO ──
  // Démo 100% locale (sans serveur) : un faux élève de Terminale AGEC déjà bien avancé,
  // pour montrer la plateforme « vivante » à un prescripteur. Entre directement dans
  // l'app, SANS charte ni onboarding.
  // NB : on n'appelle PAS hideVitrine() car il réaffiche l'écran de login en inline.
  const MAIL_DEMO = 'demo@laboro-demo.fr';

  // Progression de démo crédible : missions Term AGEC validées avec de bonnes notes.
  // Dates réparties sur l'année scolaire pour illustrer la traçabilité.
  const missionsDemo = {
    'M023': { id:'M023', status:'done', score:16, comp:'C1.1', progression:2, date_validation:'2025-09-18T10:00:00.000Z' },
    'M024': { id:'M024', status:'done', score:15, comp:'C1.2', progression:1, date_validation:'2025-10-07T10:00:00.000Z' },
    'M025': { id:'M025', status:'done', score:14, comp:'C2.2', progression:0, date_validation:'2025-10-21T10:00:00.000Z' },
    'M026': { id:'M026', status:'done', score:17, comp:'C1.3', progression:2, date_validation:'2025-11-12T10:00:00.000Z' },
    'M028': { id:'M028', status:'done', score:13, comp:'C2.3', progression:0, date_validation:'2025-12-03T10:00:00.000Z' },
    'M029': { id:'M029', status:'done', score:16, comp:'C3.2', progression:1, date_validation:'2026-01-15T10:00:00.000Z' },
    'M030': { id:'M030', status:'done', score:15, comp:'C3.3', progression:0, date_validation:'2026-02-05T10:00:00.000Z' },
    'M031': { id:'M031', status:'done', score:14, comp:'C3.1', progression:1, date_validation:'2026-03-12T10:00:00.000Z' },
    'M032': { id:'M032', status:'done', score:18, comp:'C4A.3', progression:2, date_validation:'2026-04-02T10:00:00.000Z' },
    'M027': { id:'M027', status:'att',  score:0,  comp:'C2.2', progression:0 }, // une en attente de correction
  };
  // Niveaux de compétences cohérents (0 à 4)
  const compDemo = {
    'C1.1':3,'C1.2':3,'C1.3':3, 'C2.1':2,'C2.2':2,'C2.3':2,
    'C3.1':3,'C3.2':3,'C3.3':3, 'C4A.1':4,'C4A.2':4,'C4A.3':4
  };

  try {
    const s = JSON.parse(localStorage.getItem('laboro_s')||'{}');
    s[MAIL_DEMO] = { missions: missionsDemo, competences: compDemo, notes:{}, classe:'Term-AGEC', nom:'Léa Martin', __ob_done:true };
    // Camarades fictifs de Term AGEC (pour un classement de classe crédible en démo)
    s['camille.demo@laboro-demo.fr'] = { classe:'Term-AGEC', nom:'Camille Bernard', competences:{}, notes:{}, __ob_done:true,
      missions:{ 'M023':{id:'M023',status:'done',score:18,comp:'C1.1',progression:2}, 'M024':{id:'M024',status:'done',score:17,comp:'C1.2',progression:1}, 'M026':{id:'M026',status:'done',score:16,comp:'C1.3',progression:1}, 'M029':{id:'M029',status:'done',score:15,comp:'C3.2',progression:0}, 'M032':{id:'M032',status:'done',score:17,comp:'C4A.3',progression:2} } };
    s['hugo.demo@laboro-demo.fr'] = { classe:'Term-AGEC', nom:'Hugo Lefèvre', competences:{}, notes:{}, __ob_done:true,
      missions:{ 'M023':{id:'M023',status:'done',score:12,comp:'C1.1',progression:0}, 'M024':{id:'M024',status:'done',score:13,comp:'C1.2',progression:1}, 'M025':{id:'M025',status:'done',score:11,comp:'C2.2',progression:0} } };
    localStorage.setItem('laboro_s', JSON.stringify(s));
    localStorage.setItem('laboro_charte_'+MAIL_DEMO, '1');
  } catch(e){ console.warn('Démo: init données', e); }

  // Connexion directe en local (sans serveur, sans charte, sans onboarding)
  CU = { mail:MAIL_DEMO, classe:'Term-AGEC', poste:'Conseiller de vente — Showroom & E-commerce', nom:'Léa Martin' };
  localStorage.setItem('laboro_u', JSON.stringify(CU));

  // Masquer les écrans d'accueil pour ne laisser que l'app.
  ['login','onboarding','ob-ens'].forEach(function(id){
    const el = document.getElementById(id);
    if(el){ el.classList.remove('on'); el.style.display = 'none'; }
  });
  const vit = document.getElementById('vitrine');
  if(vit){ vit.classList.remove('on'); vit.style.display = 'none'; }

  if(typeof showApp === 'function') showApp();
  // Remonter en haut de la page
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
