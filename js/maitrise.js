// ================================================
//   LABORO — Vérification de maîtrise (fichier COMMUN MCV / Auto)
//   Créé le 14/10/2026.
//
//   Après une mission RÉUSSIE, l'élève répond à 2 questions courtes construites
//   par l'IA à partir de SA copie : une question à la fois, 60 secondes chacune,
//   sans retour en arrière, sans coller de texte. Le chrono est tenu par le serveur.
//   Le feedback (et la note) s'affichent une fois les 2 questions passées.
//   Le résultat (« Maîtrise confirmée » / « À vérifier ») n'est montré qu'au
//   professeur, dans la copie. Jamais de sanction : la note ne change pas.
//
//   Routes : GET /api/maitrise/:mission ; POST …/question ; POST …/reponse
//   Branchement : window.lancerMaitrise (appelée par js/correction-serveur.js)
//   et enveloppe window.openMission (reprise d'une vérification pas terminée).
// ================================================
(function(){
  "use strict";

  var EN_COURS = null;   // { mid, n, nb, fin (ms), minuterie }

  function jeton(){ return localStorage.getItem("laboro_token"); }
  function api(methode, chemin, corps){
    return fetchJSON(LABORO_API + "/api/maitrise/" + encodeURIComponent(chemin.mid) + (chemin.suite || ""), {
      method: methode,
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + jeton() },
      body: corps ? JSON.stringify(corps) : undefined
    });
  }
  function esc(t){ return String(t == null ? "" : t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function estEleve(){
    var mo = document.getElementById("mo");
    return typeof CU !== "undefined" && CU && CU.classe && CU.classe !== "enseignant"
      && !(mo && mo.classList.contains("mo-apercu")) && !!jeton();
  }
  function missionAffichee(mid){
    var mo = document.getElementById("mo");
    return mo && mo.classList.contains("open") && typeof CM !== "undefined" && CM && CM.id === mid;
  }

  // Le feedback reste caché tant que les 2 questions ne sont pas passées
  function feedbackVisible(oui){
    var fb = document.getElementById("mo-fb");
    if(!fb) return;
    Array.prototype.forEach.call(fb.children, function(c){
      if(!c.classList.contains("mt-bloc")) c.style.display = oui ? "" : "none";
    });
  }
  function bloc(){
    var fb = document.getElementById("mo-fb");
    if(!fb) return null;
    var b = fb.querySelector(".mt-bloc");
    if(!b){
      b = document.createElement("div");
      b.className = "mt-bloc";
      fb.insertBefore(b, fb.firstChild);
    }
    return b;
  }
  function arreter(){
    if(EN_COURS && EN_COURS.minuterie) clearInterval(EN_COURS.minuterie);
    EN_COURS = null;
  }

  function ecranAccueil(mid, apresCorrection){
    var b = bloc(); if(!b) return;
    feedbackVisible(false);
    b.innerHTML = '<div class="mt-titre">' + (apresCorrection ? "🎉 Mission validée !" : "⏱️ Il te reste une étape") + '</div>'
      + '<p>Avant de voir ta note et ton feedback : <strong>2 questions rapides sur TA copie</strong>, pour montrer que tu maîtrises ce que tu as écrit.</p>'
      + '<ul><li>1 minute par question, une ou deux phrases suffisent ;</li><li>une seule fois, sans retour en arrière ;</li><li>réponds avec tes mots, seul(e) : c\'est ton travail qui parle.</li></ul>'
      + '<button type="button" class="mt-btn">Je suis prêt(e) : question 1</button>';
    b.querySelector(".mt-btn").onclick = function(){ this.disabled = true; question(mid); };
    var onglet = document.getElementById("tab-fb");
    if(onglet){ onglet.style.display = ""; if(typeof moTab === "function") moTab(2, onglet); }
  }

  function question(mid){
    api("POST", { mid: mid, suite: "/question" }).then(function(r){
      if(!r.ok){
        if(r.data && r.data.code === "MAITRISE_TERMINEE") return termine(mid);
        var b = bloc(); if(b) b.innerHTML = '<p class="mt-err">' + esc(r.erreur) + '</p><button type="button" class="mt-btn">Réessayer</button>';
        if(b) b.querySelector(".mt-btn").onclick = function(){ question(mid); };
        return;
      }
      var d = r.data;
      arreter();
      EN_COURS = { mid: mid, n: d.n, nb: d.nb, fin: Date.now() + d.secondes_restantes * 1000 };
      var b = bloc(); if(!b) return;
      b.innerHTML = '<div class="mt-entete"><span>Question ' + (d.n + 1) + ' / ' + d.nb + '</span><span class="mt-chrono">' + d.secondes_restantes + ' s</span></div>'
        + '<div class="mt-barre"><div class="mt-barre-in"></div></div>'
        + '<div class="mt-question">' + esc(d.question) + '</div>'
        + '<textarea class="mt-rep" rows="3" placeholder="Ta réponse, avec tes mots…" autocomplete="off" spellcheck="true"></textarea>'
        + '<button type="button" class="mt-btn">Valider ma réponse</button>';
      var zone = b.querySelector(".mt-rep"), btn = b.querySelector(".mt-btn");
      zone.addEventListener("paste", function(e){ e.preventDefault(); if(typeof integMessage === "function") integMessage("Le collage est désactivé : écris ta réponse toi-même."); });
      zone.addEventListener("drop", function(e){ e.preventDefault(); });
      setTimeout(function(){ try{ zone.focus(); }catch(e){} }, 50);
      var envoye = false;
      function envoyer(){
        if(envoye) return; envoye = true;
        btn.disabled = true; zone.readOnly = true;
        var n = EN_COURS ? EN_COURS.n : d.n;
        arreter();
        api("POST", { mid: mid, suite: "/reponse" }, { n: n, texte: zone.value }).then(function(r2){
          if(r2.ok && r2.data && r2.data.termine) return termine(mid);
          question(mid);   // question suivante (ou reprise si la réponse a été refusée)
        });
      }
      btn.onclick = envoyer;
      var total = 60;
      function tic(){
        if(!EN_COURS) return;
        var reste = Math.max(0, Math.ceil((EN_COURS.fin - Date.now()) / 1000));
        var c = b.querySelector(".mt-chrono"), barre = b.querySelector(".mt-barre-in");
        if(c){ c.textContent = reste + " s"; c.classList.toggle("mt-urgent", reste <= 10); }
        if(barre) barre.style.width = Math.round(reste / total * 100) + "%";
        if(reste <= 0) envoyer();
      }
      tic();
      EN_COURS.minuterie = setInterval(tic, 250);
    });
  }

  function termine(mid){
    arreter();
    var b = bloc();
    if(b){
      b.innerHTML = '<div class="mt-titre">✅ Merci, c\'est enregistré.</div><p>Voici ton feedback.</p>';
      b.classList.add("mt-fini");
    }
    feedbackVisible(true);
    if(typeof synchroniserProgressionsServeur === "function") try{ synchroniserProgressionsServeur(); }catch(e){}
  }

  // Appelée juste après une correction réussie
  window.lancerMaitrise = function(mid, apresCorrection){
    if(!estEleve() || !missionAffichee(mid)) return;
    arreter();
    ecranAccueil(mid, apresCorrection);
  };

  // Mission réussie rouverte avec une vérification pas terminée : on la reprend
  function verifierALouverture(mid){
    var m = (gUD().missions || {})[mid] || {};
    if(m.status !== "done") return;
    api("GET", { mid: mid }).then(function(r){
      if(!r.ok || !r.data || r.data.etat !== "en_attente" || !missionAffichee(mid)) return;
      if(r.data.prochaine > 0 || (EN_COURS && EN_COURS.mid === mid)) return question(mid);
      ecranAccueil(mid, false);
    });
  }
  if(typeof window.openMission === "function"){
    var origOpen = window.openMission;
    window.openMission = function(id){
      arreter();
      var r = origOpen.apply(this, arguments);
      try{ if(estEleve()) verifierALouverture(id); }catch(e){}
      return r;
    };
  }
  if(typeof window.closeMo === "function"){
    var origClose = window.closeMo;
    window.closeMo = function(){ arreter(); return origClose.apply(this, arguments); };
  }
})();
