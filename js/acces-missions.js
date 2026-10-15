// ================================================
//   LABORO — Accès des élèves aux missions (fichier COMMUN MCV / Auto)
//   Créé le 14/10/2026, demande de Pascal : pouvoir fermer l'accès libre aux
//   missions et ne laisser ouvertes que celles qui sont assignées (évite de
//   « faire un maximum de missions chez soi avec l'IA »).
//
//   • Professeur : dans « Mission du jour », un réglage par classe :
//       Toutes les missions  |  Seulement les missions assignées
//   • Élève : les missions non assignées sont grisées dans « Mes missions » et
//     ne s'ouvrent pas (une mission déjà validée reste consultable).
//   • Le serveur refuse aussi brouillons et corrections hors assignation.
//
//   Routes : PUT /api/classes/:id/acces-missions ; GET /api/classes
//            (missions_libres) ; GET /api/mission-du-jour/moi (acces_missions).
// ================================================
(function(){
  "use strict";

  var ACCES = { libre: true, ouvertes: [] };
  var minuterie = null;

  function jeton(){ return localStorage.getItem("laboro_token"); }
  function esc(t){ return String(t == null ? "" : t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function estEleve(){
    return typeof CU !== "undefined" && CU && CU.classe && CU.classe !== "enseignant" && !!jeton();
  }
  function estEnseignant(){ return typeof CU !== "undefined" && CU && CU.classe === "enseignant"; }

  // Une mission est-elle fermée pour cet élève ?
  function fermee(id){
    if(ACCES.libre || !estEleve()) return false;
    if(ACCES.ouvertes.indexOf(id) >= 0) return false;
    var m = (typeof gUD === "function") ? ((gUD().missions || {})[id] || {}) : {};
    return m.status !== "done";   // une mission validée reste consultable
  }
  var MESSAGE = "Ton professeur a ouvert seulement les missions qu'il t'a données. Celle-ci n'en fait pas partie pour le moment.";

  // ── Élève : lire le réglage ──
  function actualiser(){
    if(!estEleve()){ ACCES = { libre: true, ouvertes: [] }; return Promise.resolve(); }
    return fetchJSON(LABORO_API + "/api/mission-du-jour/moi", { headers: { "Authorization": "Bearer " + jeton() } })
      .then(function(r){
        if(!r.ok || !r.data || !r.data.ok) return;
        var a = r.data.acces_missions;
        var avant = JSON.stringify(ACCES);
        ACCES = (a && a.libre === false) ? { libre: false, ouvertes: a.ouvertes || [] } : { libre: true, ouvertes: [] };
        if(typeof memoriserAssignees === "function"){
          memoriserAssignees(ACCES.ouvertes);
          memoriserAssignees((r.data.missions || []).map(function(m){ return m.mission_id; }));
        }
        if(avant !== JSON.stringify(ACCES)) griser();
      });
  }
  window.accesMissionsActualiser = actualiser;

  // ── Élève : griser les missions fermées dans « Mes missions » ──
  function griser(){
    var liste = document.getElementById("missions-list");
    if(!liste) return;
    var vieux = liste.querySelector(".am-bandeau"); if(vieux) vieux.remove();
    if(ACCES.libre || !estEleve()){
      // Réglage rouvert : on redessine la liste normalement
      if(liste.querySelector(".am-ferme") && typeof window.renderMissions === "function" && !griser.enCours){
        griser.enCours = true; try{ window.renderMissions(); }finally{ griser.enCours = false; }
      }
      return;
    }
    var n = 0;
    Array.prototype.forEach.call(liste.querySelectorAll(".mc"), function(c){
      var m = /handleMission\('([^']+)'\)/.exec(c.getAttribute("onclick") || "");
      if(!m) return;
      if(!fermee(m[1])){ n++; return; }
      if(c.classList.contains("am-ferme")) return;
      c.classList.add("locked", "am-ferme");
      c.setAttribute("onclick", "accesMissionFermee()");
      c.title = MESSAGE;
      var badge = c.querySelector(".mh .sp");
      if(badge){ badge.textContent = "🔒 Pas encore donnée"; badge.style.background = "#F3F4F6"; badge.style.color = "#6B7280"; }
    });
    var bandeau = document.createElement("div");
    bandeau.className = "am-bandeau";
    bandeau.innerHTML = "🔒 <strong>Ton professeur a ouvert seulement les missions qu'il t'a données</strong>"
      + (n ? " (" + n + " accessible" + (n > 1 ? "s" : "") + ")." : " : aucune pour l'instant.")
      + " Les autres sont grisées.";
    liste.insertBefore(bandeau, liste.firstChild);
  }
  window.accesMissionFermee = function(){ alert(MESSAGE); };

  if(typeof window.renderMissions === "function"){
    var origRender = window.renderMissions;
    window.renderMissions = function(){
      var r = origRender.apply(this, arguments);
      try{ griser(); }catch(e){ if(window.console) console.warn("[accès missions]", e); }
      return r;
    };
  }
  if(typeof window.openMission === "function"){
    var origOpen = window.openMission;
    window.openMission = function(id){
      var mo = document.getElementById("mo");
      if(fermee(id) && !(mo && mo.classList.contains("mo-apercu"))){ alert(MESSAGE); return; }
      return origOpen.apply(this, arguments);
    };
  }

  // ── Professeur : le réglage, en haut de « Mission du jour » ──
  function carteProf(){
    var panneau = document.getElementById("ep-reglages-acces") || document.getElementById("panel-missiondujour");
    if(!panneau) return null;
    var c = document.getElementById("am-carte");
    if(!c){
      c = document.createElement("div");
      c.id = "am-carte";
      c.className = "card";
      panneau.insertBefore(c, panneau.firstChild);
    }
    return c;
  }
  function renderProf(){
    var c = carteProf(); if(!c) return;
    c.innerHTML = '<div class="ct">🔐 Accès des élèves aux missions</div><div class="am-aide">Chargement…</div>';
    fetchJSON(LABORO_API + "/api/classes", { headers: { "Authorization": "Bearer " + jeton() } }).then(function(r){
      if(!r.ok || !r.data || !r.data.ok){ c.querySelector(".am-aide").textContent = r.erreur || "Impossible de lire les classes."; return; }
      var classes = r.data.classes || [];
      if(!classes.length){ c.querySelector(".am-aide").textContent = "Aucune classe ne t'est attribuée."; return; }
      c.innerHTML = '<div class="ct">🔐 Accès des élèves aux missions</div>'
        + '<div class="am-aide">« Seulement les missions assignées » : tes élèves ne peuvent ouvrir que les missions que tu leur as données ici ; les autres sont grisées (une mission déjà validée reste consultable).</div>'
        + classes.map(function(cl){
            var libre = cl.missions_libres !== 0;
            return '<div class="am-ligne" data-id="' + esc(cl.id) + '"><span class="am-classe">' + esc(cl.libelle || cl.id) + '</span>'
              + '<span class="am-choix"><button type="button" data-libre="1" class="' + (libre ? "am-on" : "") + '">Toutes les missions</button>'
              + '<button type="button" data-libre="0" class="' + (!libre ? "am-on" : "") + '">Seulement les missions assignées</button></span>'
              + '<span class="am-etat"></span></div>';
          }).join("");
      Array.prototype.forEach.call(c.querySelectorAll(".am-ligne button"), function(b){
        b.onclick = function(){
          var ligne = b.closest(".am-ligne"), libre = b.getAttribute("data-libre") === "1";
          if(b.classList.contains("am-on")) return;
          var etat = ligne.querySelector(".am-etat");
          etat.textContent = "…";
          fetchJSON(LABORO_API + "/api/classes/" + encodeURIComponent(ligne.getAttribute("data-id")) + "/acces-missions", {
            method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + jeton() },
            body: JSON.stringify({ libre: libre })
          }).then(function(r2){
            if(!r2.ok || !r2.data || !r2.data.ok){ etat.textContent = "⚠️ " + (r2.erreur || "Échec"); return; }
            Array.prototype.forEach.call(ligne.querySelectorAll("button"), function(x){ x.classList.toggle("am-on", x === b); });
            var n = r2.data.missions_assignees;
            etat.textContent = libre ? "✔ Toutes les missions sont ouvertes."
              : "✔ Seules les missions assignées sont ouvertes (" + n + " pour toute la classe" + (n ? "" : " : pense à en assigner") + ").";
          });
        };
      });
    });
  }
  window.accesMissionsRenderProf = function(){ try{ if(estEnseignant()) renderProf(); }catch(e){} };
  if(typeof window.renderMDJPanel === "function"){
    var origPanel = window.renderMDJPanel;
    window.renderMDJPanel = function(){
      var r = origPanel.apply(this, arguments);
      try{ if(estEnseignant()) renderProf(); }catch(e){ if(window.console) console.warn("[accès missions]", e); }
      return r;
    };
  }

  // ── Lancement ──
  if(typeof window.showApp === "function"){
    var origShow = window.showApp;
    window.showApp = function(){
      var r = origShow.apply(this, arguments);
      clearInterval(minuterie);
      if(estEleve()){
        actualiser();
        minuterie = setInterval(function(){ if(!document.hidden) actualiser(); }, 2 * 60 * 1000);
      } else ACCES = { libre: true, ouvertes: [] };
      return r;
    };
  }
  if(typeof window.doLogout === "function"){
    var origOut = window.doLogout;
    window.doLogout = function(){ clearInterval(minuterie); ACCES = { libre: true, ouvertes: [] }; return origOut.apply(this, arguments); };
  }
})();
