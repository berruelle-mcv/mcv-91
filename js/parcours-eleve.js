// ================================================
//   LABORO — Parcours de l'élève dans une mission (fichier COMMUN MCV / Auto)
//   Créé le 14/10/2026.
//
//   1. « Apprendre d'abord » avant la mission : l'élève fait l'exercice animé
//      de la mission, puis coche « J'ai lu la fiche et fait l'exercice ».
//      Tant que la case n'est pas cochée, l'onglet « La mission » reste fermé.
//      (Une mission déjà commencée avant cette nouveauté n'est jamais bloquée.)
//   2. Temps passé sur la fiche avant de cocher la case.
//   3. Sorties de la page pendant la mission (autre onglet, autre fenêtre) :
//      nombre et durée. Les sorties de moins de 3 secondes sont ignorées
//      (boîtes de confirmation, clics hors de la fenêtre…).
//
//   Ces mesures sont des INDICES pour le professeur, jamais une sanction :
//   elles sont ajoutées aux indices d'intégrité envoyés avec la copie
//   (integPourSoumission, js/missions.js) et affichées dans la copie.
//   Rien ne s'applique au compte enseignant ni à l'aperçu enseignant.
//
//   Branchement : enveloppe window.openMission, window.moTab et
//   window.integPourSoumission. Chargé APRÈS js/moteur-animations.js.
// ================================================
(function(){
  "use strict";

  var SEUIL_SORTIE = 3;        // secondes : en dessous, on ne compte pas
  var MAX_SORTIE = 3 * 3600;   // une sortie plus longue = l'élève est parti (on plafonne)

  function estEleve(){
    var mo = document.getElementById("mo");
    return typeof CU !== "undefined" && CU && CU.classe && CU.classe !== "enseignant"
      && !(mo && mo.classList.contains("mo-apercu"));
  }
  function missionOuverte(){
    var mo = document.getElementById("mo");
    return mo && mo.classList.contains("open") && typeof CM !== "undefined" && CM ? CM.id : null;
  }

  // ── Mémoire locale, par élève (résiste à la resynchronisation serveur) ──
  function cle(){ return "laboro_parcours_" + ((typeof CU !== "undefined" && CU && (CU.mail || CU.email)) || "anonyme"); }
  function lire(){
    try{ return JSON.parse(localStorage.getItem(cle()) || "{}") || {}; }catch(e){ return {}; }
  }
  function ecrire(d){ try{ localStorage.setItem(cle(), JSON.stringify(d)); }catch(e){} }
  function etat(mid){
    var d = lire();
    var e = d[mid] || {};
    e.fiche_sec = e.fiche_sec || 0; e.sorties = e.sorties || 0; e.sorties_sec = e.sorties_sec || 0;
    return e;
  }
  function majEtat(mid, f){
    var d = lire();
    var e = d[mid] || {};
    f(e);
    d[mid] = e;
    ecrire(d);
  }

  // Mission déjà commencée (tentative, brouillon, réponses) : jamais bloquée
  function dejaCommencee(mid){
    try{
      var m = (gUD().missions || {})[mid] || {};
      if((m.tentatives || 0) > 0 || m.status === "att" || m.status === "done") return true;
      var r = m.reponses || {};
      return Object.keys(r).some(function(k){ return String(r[k] || "").trim().length > 0; });
    }catch(e){ return false; }
  }
  function ficheValidee(mid){
    return !!etat(mid).fiche_cochee || dejaCommencee(mid);
  }

  // ── 1 + 2. Case à cocher et temps passé sur la fiche ──
  var chrono = { mid: null, depuis: 0 };   // temps sur l'onglet « Apprendre d'abord »
  function ongletFicheVisible(){
    var l = document.getElementById("mo-learn");
    return l && l.classList.contains("on") && !document.hidden;
  }
  function chronoArreter(){
    if(chrono.mid && chrono.depuis){
      var s = Math.round((Date.now() - chrono.depuis) / 1000);
      var mid = chrono.mid;
      if(s > 0 && s < 4 * 3600) majEtat(mid, function(e){ e.fiche_sec = (e.fiche_sec || 0) + s; });
    }
    chrono.depuis = 0;
  }
  function chronoRelancer(){
    chronoArreter();
    var mid = missionOuverte();
    chrono.mid = mid;
    if(mid && estEleve() && !etat(mid).fiche_cochee && ongletFicheVisible()) chrono.depuis = Date.now();
  }

  function message(t){
    if(typeof integMessage === "function") integMessage(t);
    else alert(t);
  }

  function installerCase(mid){
    var learn = document.getElementById("mo-learn");
    if(!learn || learn.querySelector(".pe-case")) return;
    // Le bouton « J'ai compris → Aller à la mission » est remplacé par la case
    var ancien = Array.prototype.slice.call(learn.querySelectorAll("button")).filter(function(b){
      return /J'ai compris|Aller à la mission/i.test(b.textContent || "");
    })[0];
    var zoneExo = learn.querySelector(".ma-zone .ma-bloc");
    var exoFait = !zoneExo;   // pas d'exercice : la case est disponible tout de suite
    var bloc = document.createElement("div");
    bloc.className = "pe-case";
    bloc.innerHTML =
        '<label class="pe-label"><input type="checkbox" class="pe-input"' + (exoFait ? "" : " disabled") + '>'
      + '<span>J\'ai lu la fiche et fait l\'exercice : je commence la mission</span></label>'
      + '<div class="pe-aide">' + (exoFait ? "" : "Termine d'abord l'exercice « Découvrir en action » en haut de la page.") + '</div>';
    var input = bloc.querySelector(".pe-input"), aide = bloc.querySelector(".pe-aide");
    learn.addEventListener("ma-termine", function(){
      input.disabled = false;
      aide.textContent = "Exercice terminé. Relis la fiche si besoin, puis coche la case.";
      bloc.classList.add("pe-pret");
    });
    input.addEventListener("change", function(){
      if(!input.checked) return;
      chronoArreter();
      majEtat(mid, function(e){ e.fiche_cochee = new Date().toISOString(); });
      input.disabled = true;
      aide.textContent = "C'est noté. Bonne mission !";
      setTimeout(function(){
        var onglet = document.querySelectorAll(".mo-tab")[1];
        if(typeof window.moTab === "function") window.moTab(1, onglet);
      }, 350);
    });
    if(ancien){
      var parent = ancien.parentNode;
      parent.parentNode.insertBefore(bloc, parent);
      parent.remove();
    } else {
      learn.appendChild(bloc);
    }
  }

  // ── 3. Sorties de page pendant la mission ──
  var sortie = { depuis: 0, mid: null };
  function debutSortie(){
    var mid = missionOuverte();
    if(!mid || !estEleve() || sortie.depuis) return;
    sortie.depuis = Date.now(); sortie.mid = mid;
  }
  function finSortie(){
    if(!sortie.depuis) return;
    var s = Math.round((Date.now() - sortie.depuis) / 1000);
    var mid = sortie.mid;
    sortie.depuis = 0; sortie.mid = null;
    if(s < SEUIL_SORTIE) return;
    majEtat(mid, function(e){ e.sorties = (e.sorties || 0) + 1; e.sorties_sec = (e.sorties_sec || 0) + Math.min(s, MAX_SORTIE); });
  }
  document.addEventListener("visibilitychange", function(){
    if(document.hidden){ debutSortie(); chronoArreter(); }
    else { finSortie(); chronoRelancer(); }
  });
  window.addEventListener("blur", debutSortie);
  window.addEventListener("focus", function(){ finSortie(); chronoRelancer(); });

  // ── 4. Parties de la fiche, envoyées avec la copie : le feedback dit quelle partie relire ──
  window.ficheEnCours = function(){
    try{
      if(typeof CM === "undefined" || !CM || typeof getRes !== "function") return null;
      var res = getRes(CM.comp, CM.palier);
      if(!res) return null;
      var tmp = document.createElement("div");
      tmp.innerHTML = res.c || "";
      var court = function(t){ return String(t || "").replace(/\s+/g, " ").replace(/[:\s]+$/, "").trim(); };
      var parties = Array.prototype.map.call(tmp.querySelectorAll(".res-section-label"), function(x){ return court(x.textContent); });
      if(!parties.length){
        parties = Array.prototype.map.call(tmp.querySelectorAll("p > strong:first-child, li > strong:first-child"), function(x){ return court(x.textContent); });
      }
      parties = parties.filter(function(t, i, a){ return t && t.length <= 110 && a.indexOf(t) === i; }).slice(0, 10);
      var titre = document.createElement("div"); titre.innerHTML = res.t || "";
      return { titre: court(titre.textContent).slice(0, 140), parties: parties };
    }catch(e){ return null; }
  };

  // ── Branchements ──
  if(typeof window.openMission === "function"){
    var origOpen = window.openMission;
    window.openMission = function(id){
      chronoArreter();
      var r = origOpen.apply(this, arguments);
      try{
        if(estEleve() && typeof CM !== "undefined" && CM && CM.id === id && !ficheValidee(id)) installerCase(id);
        chronoRelancer();
      }catch(e){ if(window.console) console.warn("[parcours] ouverture :", e); }
      return r;
    };
  }
  if(typeof window.moTab === "function"){
    var origTab = window.moTab;
    window.moTab = function(i){
      var mid = missionOuverte();
      if(i === 1 && mid && estEleve() && !ficheValidee(mid)){
        message("Commence par « Apprendre d'abord » : fais l'exercice, puis coche la case en bas de la fiche.");
        return;
      }
      chronoArreter();
      var r = origTab.apply(this, arguments);
      chronoRelancer();
      return r;
    };
  }
  if(typeof window.closeMo === "function"){
    var origClose = window.closeMo;
    window.closeMo = function(){ chronoArreter(); chrono.mid = null; return origClose.apply(this, arguments); };
  }
  // Les mesures partent avec la copie, dans les indices d'intégrité
  if(typeof window.integPourSoumission === "function"){
    var origInteg = window.integPourSoumission;
    window.integPourSoumission = function(mid){
      var r = origInteg.apply(this, arguments) || {};
      try{
        chronoArreter(); finSortie();
        var e = etat(mid);
        r.fiche_sec = e.fiche_sec || 0;
        r.fiche_cochee = e.fiche_cochee || null;
        r.sorties = e.sorties || 0;
        r.sorties_sec = e.sorties_sec || 0;
        chronoRelancer();
      }catch(x){}
      return r;
    };
  }
})();
