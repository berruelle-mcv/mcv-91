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
  hideVitrine();
  // Connexion directe en mode démo — bypass onboarding
  const mail=document.getElementById('inp-mail');
  const mdp=document.getElementById('inp-mdp');
  const cls=document.getElementById('inp-classe');
  if(mail) mail.value='demo@laboro-demo.fr';
  if(mdp) mdp.value='demo';
  if(cls) cls.value='Term-AGEC';
  // Marquer l'onboarding comme déjà fait pour le compte démo
  try {
    const s = JSON.parse(localStorage.getItem('laboro_s')||'{}');
    if(!s['demo@laboro-demo.fr']) s['demo@laboro-demo.fr']={missions:{},competences:{},notes:{}};
    s['demo@laboro-demo.fr'].__ob_done = true;
    localStorage.setItem('laboro_s', JSON.stringify(s));
  } catch(e){}
  doLogin();
}
