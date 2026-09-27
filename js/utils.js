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
  const sel = document.getElementById('mdj-ms');
  if(!sel) return;
  sel.innerHTML = '<option value="">— Mission —</option>'
    + MISSIONS.map(function(m){
        return '<option value="'+m.id+'">'+m.titre+' (P'+m.palier+' — '+m.comp+')</option>';
      }).join('');
}

// --- Remplit le sélecteur d'élèves pour l'assignation individuelle ---
async function populateMDJEleveSelect(){
  const sel = document.getElementById('mdj-el');
  if(!sel) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ sel.innerHTML = '<option value="">— Connecte-toi via le serveur —</option>'; return; }
  const r = await fetchJSON(LABORO_API + '/api/eleves', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){
    sel.innerHTML = '<option value="">— Erreur de chargement —</option>';
    return;
  }
  // Élèves archivés exclus (26/09/2026) ; classe réelle affichée (ex. « 2nde FMRC1 »)
  const eleves = (r.data.eleves || []).filter(function(e){ return e.statut !== 'archive'; }).slice().sort(function(a,b){ return (a.nom||'').localeCompare(b.nom||'','fr') || (a.prenom||'').localeCompare(b.prenom||'','fr'); });
  sel.innerHTML = '<option value="">— Élève —</option>'
    + eleves.map(function(e){
        return '<option value="'+e.id+'">'+(e.nom||'').toUpperCase()+' '+(e.prenom||'')+(e.classe_libelle||e.classe?' ('+(e.classe_libelle||e.classe)+(e.groupe?' · '+e.groupe:'')+')':'')+'</option>';
      }).join('');
}

// --- Remplit le sélecteur d'élèves pour le déblocage exceptionnel (Accès élèves, admin) ---
async function populateAccesEleveSelect(){
  const sel = document.getElementById('acc-el');
  if(!sel) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ sel.innerHTML = '<option value="">— Connecte-toi via le serveur —</option>'; return; }
  const r = await fetchJSON(LABORO_API + '/api/eleves', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){
    sel.innerHTML = '<option value="">— Erreur de chargement —</option>';
    return;
  }
  // Élèves archivés exclus (26/09/2026) ; classe réelle affichée (ex. « 2nde FMRC1 »)
  const eleves = (r.data.eleves || []).filter(function(e){ return e.statut !== 'archive'; }).slice().sort(function(a,b){ return (a.nom||'').localeCompare(b.nom||'','fr') || (a.prenom||'').localeCompare(b.prenom||'','fr'); });
  sel.innerHTML = '<option value="">— Élève —</option>'
    + eleves.map(function(e){
        return '<option value="'+e.id+'">'+(e.nom||'').toUpperCase()+' '+(e.prenom||'')+(e.classe_libelle||e.classe?' ('+(e.classe_libelle||e.classe)+(e.groupe?' · '+e.groupe:'')+')':'')+'</option>';
      }).join('');
}

// --- Remplit les listes déroulantes de classes (ajouter élève / mission du jour / changer de classe)
//     avec les classes réellement attribuées à l'enseignant connecté (ou toutes si administrateur) ---
async function populateClasseSelects(){
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const r = await fetchJSON(LABORO_API + '/api/classes', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok) return;
  const classes = (r.data.classes || []).slice().sort(function(a,b){
    return (a.libelle||'').localeCompare(b.libelle||'');
  });
  const options = '<option value="">— Classe —</option>'
    + classes.map(function(c){ return '<option value="'+c.id+'">'+(c.libelle||c.id)+'</option>'; }).join('');
  ['add-cls', 'mdj-cl', 'chcl-select', 'acc-cl'].forEach(function(id){
    const sel = document.getElementById(id);
    if(sel) sel.innerHTML = options;
  });
}

// ═══════════════════════════════════════════════════════
// ESPACE PRÉPARATION E2 AGEC (univers qui la proposent)
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
  // Démo 100 % locale (sans serveur) : un faux élève déjà bien avancé, pour montrer la
  // plateforme « vivante » à un prescripteur. Les données de démo sont propres à chaque
  // univers (LABORO_CONFIG.demo dans data/univers.js). Entre directement dans l'app,
  // SANS charte ni onboarding.
  // NB : on n'appelle PAS hideVitrine() car il réaffiche l'écran de login en inline.
  const D = getCfg().demo;
  if(!D || !D.eleve || !D.eleve.mail){ alert('Le mode démo n\'est pas disponible pour cette plateforme.'); return; }
  function copieMissions(ms){
    const out = {};
    Object.keys(ms || {}).forEach(function(id){ out[id] = Object.assign({ id:id }, ms[id]); });
    return out;
  }
  const E = D.eleve;
  try {
    const s = JSON.parse(localStorage.getItem('laboro_s')||'{}');
    s[E.mail] = { missions: copieMissions(E.missions), competences: E.competences || {}, notes:{}, classe:E.classe, nom:E.nom, __ob_done:true };
    // Camarades fictifs (pour un classement de classe crédible en démo)
    (D.camarades || []).forEach(function(c){
      s[c.mail] = { classe:c.classe || E.classe, nom:c.nom, competences:{}, notes:{}, __ob_done:true, missions: copieMissions(c.missions) };
    });
    localStorage.setItem('laboro_s', JSON.stringify(s));
    // La charte est vérifiée par session (voir checkCharte) : on la marque acceptée pour la démo
    sessionStorage.setItem('laboro_charte_'+E.mail, '1');
  } catch(e){ console.warn('Démo: init données', e); }

  // Connexion directe en local (sans serveur, sans charte, sans onboarding)
  CU = { mail:E.mail, classe:E.classe, poste:E.poste, nom:E.nom };
  localStorage.setItem('laboro_u', JSON.stringify(CU));

  // Masquer les écrans d'accueil pour ne laisser que l'app.
  ['login','onboarding','ob-ens','charte-laboro'].forEach(function(id){
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
