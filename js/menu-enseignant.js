// ═══════════════════════════════════════════════════════════════════════
//   LABORO — Moteur commun : menu de l'espace enseignant (07/10/2026)
//
//   Demande de Pascal : un menu prof épuré et logique. Le menu élève reste
//   celui écrit dans index.html ; pour un enseignant, on range les mêmes
//   entrées autrement (sans rien dupliquer) :
//     Enseignant ............ Tableau de bord, Mission du jour, Suivi des missions,
//                             Vue classe, Indicateurs de la classe, Accès élèves
//     Missions .............. Banque de missions (= « Mes missions »), Trouver,
//                             Générer
//     Ce que voient les élèves  Catalogue produits, Fichier clients
//     Administration ........ Gestion des classes (administrateur)
//   Masqués pour l'enseignant : Mes compétences, Indicateurs de l'entreprise
//   (chiffres fixes de décor), en-têtes « Mon espace » et nom de l'entreprise.
//   Chargé APRÈS auth.js (s'accroche à showApp, comme memos.js).
// ═══════════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  let ORIGINE = null;   // ordre et libellés d'origine (menu élève), relevés une fois

  function nav(){ return document.querySelector('.sb-nv'); }
  function item(page){ return document.querySelector('.sb-nv .ni[onclick^="goP(\'' + page + '\'"]'); }
  function texte(el){ const t = Array.from(el.childNodes).reverse().find(function(n){ return n.nodeType === 3 && n.textContent.trim(); }); return t; }
  function renommer(el, lib){ const t = el && texte(el); if(t) t.textContent = lib; }

  // Éléments propres au menu enseignant (créés une fois, cachés côté élève)
  function enTete(id, lib){
    let e = document.getElementById(id);
    if(!e){ e = document.createElement('div'); e.className = 'ns'; e.id = id; e.textContent = lib; e.setAttribute('data-menu-ens', '1'); }
    return e;
  }
  function entreeIndicateursClasse(){
    let e = document.getElementById('ni-ic');
    if(!e){
      e = document.createElement('div'); e.className = 'ni'; e.id = 'ni-ic'; e.setAttribute('data-menu-ens', '1');
      e.setAttribute('onclick', "goP('indicclasse',this)");
      e.innerHTML = '<div class="nd" style="background:#7B2FBE"></div>Indicateurs de la classe';
    }
    return e;
  }

  function releverOrigine(){
    const n = nav(); if(!n || ORIGINE) return;
    ORIGINE = Array.from(n.children).map(function(el){ const t = texte(el); return { el: el, lib: t ? t.textContent : null }; });
  }

  function menuEnseignant(){
    const n = nav(); if(!n) return;
    const admin = localStorage.getItem('laboro_est_admin') === '1';
    const nsEns = document.getElementById('ns-ens');
    if(nsEns) nsEns.textContent = 'Enseignant';
    const ordre = [
      nsEns, item('dashboard'), document.getElementById('ni-mdj'), document.getElementById('ni-sm'), document.getElementById('ni-cl'), entreeIndicateursClasse(), document.getElementById('ni-acces-eleves'),
      enTete('ns-ens-missions', 'Missions'), item('missions'), document.getElementById('ni-rm'), document.getElementById('ni-gn'),
      enTete('ns-ens-univers', 'Ce que voient les élèves'), item('catalogue'), item('clients'),
      enTete('ns-ens-admin', 'Administration'), document.getElementById('ni-classes-admin')
    ].filter(Boolean);
    // Tout ce qui n'est pas dans l'ordre enseignant est masqué (et rangé à la fin)
    Array.from(n.children).forEach(function(el){ if(ordre.indexOf(el) < 0){ el.style.display = 'none'; n.appendChild(el); } });
    ordre.forEach(function(el){ n.appendChild(el); if(el.id !== 'ni-classes-admin' && el.id !== 'ns-ens-admin') el.style.display = el.classList.contains('ns') ? 'block' : ''; });
    // Les entrées d'administration restent réservées à l'administrateur (auth.js les a déjà réglées)
    document.getElementById('ns-ens-admin').style.display = admin ? 'block' : 'none';
    renommer(item('missions'), 'Banque de missions');
    // Tout en haut du menu, sans en-tête « Mon espace »
    n.insertBefore(nsEns || ordre[0], n.firstChild);
  }

  function menuEleve(){
    const n = nav(); if(!n || !ORIGINE) return;
    ORIGINE.forEach(function(o){
      n.appendChild(o.el);
      if(o.lib != null){ const t = texte(o.el); if(t) t.textContent = o.lib; }
    });
    // Les entrées propres à l'enseignant disparaissent ; les autres retrouvent l'affichage réglé par auth.js
    document.querySelectorAll('.sb-nv [data-menu-ens]').forEach(function(el){ el.style.display = 'none'; });
    ['dashboard','missions','competences','catalogue','clients','indicateurs'].forEach(function(p){ const e = item(p); if(e) e.style.display = ''; });
    Array.from(n.querySelectorAll('.ns:not([id])')).forEach(function(e){ e.style.display = ''; });
  }

  function appliquer(){
    try {
      releverOrigine();
      const ens = typeof CU !== 'undefined' && CU && CU.classe === 'enseignant';
      if(ens) menuEnseignant(); else menuEleve();
    } catch(e) { console.error('menu-enseignant', e); }
  }

  if(typeof window.showApp === 'function'){
    const orig = window.showApp;
    window.showApp = function(){ const r = orig.apply(this, arguments); appliquer(); return r; };
  }
})();
