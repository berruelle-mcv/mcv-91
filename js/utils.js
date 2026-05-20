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
