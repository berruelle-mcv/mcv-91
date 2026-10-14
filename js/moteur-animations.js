// ================================================
//   LABORO — Moteur d'animations pédagogiques
//   Rend les ressources et les missions plus vivantes, sans toucher
//   aux données des missions ni aux réponses des élèves.
//
//   Ce fichier ne contient AUCUN contenu pédagogique. Il affiche :
//     - la saynète PROPRE À CHAQUE MISSION (data/saynetes-missions.js,
//       SAYNETES_MISSIONS), en tête de l'onglet « La mission » ;
//     - l'exercice animé PROPRE À CHAQUE MISSION (data/exercices-missions.js,
//       EXERCICES_MISSIONS), en tête de l'onglet « Apprendre d'abord » ;
//     - les blocs de méthode d'une compétence (data/ressources-animees.js,
//       RES_ANIMEES), en tête de l'onglet « Apprendre d'abord ».
//   Ajouter ou modifier une animation = modifier ces fichiers de données,
//   sans toucher à ce fichier.
//   13/10/2026 : les saynètes ne sont plus rattachées à la compétence
//   (deux missions de même compétence affichaient la même scène) mais à
//   la mission elle-même, avec sa variante PVOC.
//
//   Types de blocs :
//     saynete  : petite scène jouée (personnages, sous-titres, voix) —
//                utilisée pour les saynètes de mission
//     etapes   : étapes qui s'allument l'une après l'autre
//     tri      : exercice de classement avec correction immédiate
//     chaine   : raisonnement qui se construit (ex. CAB)
//     calcul   : calculatrice guidée (NPS, TTC, points, rétention…)
//     cartes   : cartes à retourner (auto-évaluation)
//
//   Enrichissements automatiques (toutes les ressources, toutes les missions) :
//     - bouton « Écouter » sur chaque partie de la fiche ressource
//     - « Les notions à connaître » repliables terme par terme
//     - « À retenir » transformé en cartes à retourner
//     - mise en situation présentée comme un message, avec écoute
//     - répliques des clients dans les questions : bouton « Écouter »
//     - images du catalogue dans les dossiers documentaires
//
//   Branchement : enveloppe window.openMission (même principe que
//   js/brouillons-serveur.js et js/maison.js). Chargé en dernier.
//   Créé le 12/10/2026.
// ================================================
(function(){
  "use strict";

  var MA = window.MOTEUR_ANIM = {};
  var DONNEES = function(){ return (typeof RES_ANIMEES !== "undefined") ? RES_ANIMEES : {}; };

  // ─────────────────────────────────────────────
  //  Utilitaires
  // ─────────────────────────────────────────────
  function el(tag, cls, html){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(html != null) e.innerHTML = html;
    return e;
  }
  function esc(s){
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function texteDe(node){ return (node && (node.innerText || node.textContent) || "").replace(/\s+/g, " ").trim(); }
  function normaliser(s){
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }
  var REDUIT = false;
  try{ REDUIT = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}

  // ─────────────────────────────────────────────
  //  Voix (synthèse vocale du navigateur, aucun fichier audio)
  // ─────────────────────────────────────────────
  var voixFr = [];
  var jetonVoix = 0;
  var FEMININES = /amelie|amélie|audrey|aurelie|aurélie|julie|marie|virginie|hortense|denise|celine|céline|eloise|éloïse|vivienne|brigitte|chantal|sylvie|lea|léa|female|femme/i;
  var MASCULINES = /thomas|paul|henri|claude|remy|rémy|mathieu|antoine|jean|nicolas|gerard|gérard|male|homme/i;
  function chargerVoix(){
    try{ voixFr = window.speechSynthesis.getVoices().filter(function(v){ return /^fr/i.test(v.lang); }); }catch(e){ voixFr = []; }
  }
  MA.voixDispo = function(){ return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function"; };
  if(MA.voixDispo()){
    chargerVoix();
    try{ window.speechSynthesis.addEventListener("voiceschanged", chargerVoix); }catch(e){}
  }
  function choisirVoix(ton, langue){
    if(langue && !/^fr/i.test(langue)){
      try{
        var autres = window.speechSynthesis.getVoices().filter(function(v){ return v.lang.slice(0, 2).toLowerCase() === langue.slice(0, 2).toLowerCase(); });
        return autres[0] || null;
      }catch(e){ return null; }
    }
    if(!voixFr.length) chargerVoix();
    if(!voixFr.length) return null;
    var fr = voixFr.filter(function(v){ return /fr-FR/i.test(v.lang); });
    var liste = fr.length ? fr : voixFr;
    var cible = ton === "f" ? FEMININES : (ton === "h" ? MASCULINES : null);
    if(cible){
      var v = liste.filter(function(x){ return cible.test(x.name); })[0];
      if(v) return v;
    }
    return liste[0];
  }
  MA.stop = function(){
    jetonVoix++;
    try{ if(MA.voixDispo()) window.speechSynthesis.cancel(); }catch(e){}
    document.querySelectorAll(".ma-ecoute.on").forEach(function(b){ b.classList.remove("on"); b.innerHTML = b.dataset.libelle; });
  };
  // Lit un texte. ton : "f" (voix féminine), "h" (voix masculine), "" (narrateur)
  // Renvoie une promesse résolue à la fin de la lecture (ou tout de suite si pas de voix).
  MA.parler = function(texte, ton, langue){
    return new Promise(function(resolve){
      if(!MA.voixDispo() || !texte) return resolve(false);
      try{
        var u = new window.SpeechSynthesisUtterance(texte);
        u.lang = langue || "fr-FR";
        u.rate = ton ? 1 : 1.05;
        u.pitch = ton === "h" ? 0.85 : (ton === "f" ? 1.15 : 1);
        var v = choisirVoix(ton, langue);
        if(v) u.voice = v;
        var fini = false;
        var finir = function(){ if(!fini){ fini = true; resolve(true); } };
        u.onend = finir; u.onerror = finir;
        setTimeout(finir, 3000 + texte.length * 110);   // filet de sécurité si le navigateur n'émet pas "onend"
        window.speechSynthesis.speak(u);
      }catch(e){ resolve(false); }
    });
  };
  // Bouton « Écouter » réutilisable
  MA.boutonEcoute = function(texte, ton, libelle, langue){
    var lib = libelle || "🔊 Écouter";
    var b = el("button", "ma-ecoute", lib);
    b.type = "button";
    b.dataset.libelle = lib;
    if(!MA.voixDispo()){ b.hidden = true; return b; }
    b.addEventListener("click", function(ev){
      ev.preventDefault(); ev.stopPropagation();
      var dejaOn = b.classList.contains("on");
      MA.stop();
      if(dejaOn) return;
      b.classList.add("on"); b.innerHTML = "■ Arrêter";
      var t = typeof texte === "function" ? texte() : texte;
      var mon = jetonVoix;
      MA.parler(t, ton, langue).then(function(){ if(mon === jetonVoix){ b.classList.remove("on"); b.innerHTML = lib; } });
    });
    return b;
  };

  // ─────────────────────────────────────────────
  //  Bloc SAYNÈTE
  //  { type:"saynete", titre, decor:"showroom"|"telephone"|"bureau",
  //    persos:{ a:{nom, role, sexe:"f"|"h", couleur}, b:{…} },
  //    lignes:[ {prise:"Prise 1 — à éviter", qui:"a"|"b"|null, txt, verdict:"ok"|"ko"|"off", occupe:true|false} ] }
  // ─────────────────────────────────────────────
  function svgPerso(x, p, id, decor){
    var f = p.sexe === "f";
    var peau = p.peau || (f ? "#F1C7A5" : "#E3B48F");
    var cheveux = p.cheveux || (f ? "#3B2A20" : "#5A4A3A");
    var corps = p.couleur || "#185FA5";
    var tete = f
      ? '<path d="M' + (x-15) + ' 92c-2-22 32-22 30 0l2 22c-6-6-8-14-8-22-4-6-14-6-18 0 0 8-2 16-8 22z" fill="' + cheveux + '"/>'
      : '<path d="M' + (x-13) + ' 86c2-12 24-12 26 0-6-4-20-4-26 0z" fill="' + cheveux + '"/>';
    var tel = decor === "telephone"
      ? '<rect x="' + (x + (x < 220 ? 9 : -17)) + '" y="84" width="8" height="15" rx="2" fill="#1F2937"/>'
      : "";
    return '<g class="ma-perso" id="' + id + '">'
      + '<circle cx="' + x + '" cy="92" r="13" fill="' + peau + '"/>' + tete + tel
      + '<rect x="' + (x-16) + '" y="106" width="32" height="46" rx="12" fill="' + corps + '"/>'
      + (p.logo ? '<text x="' + x + '" y="132" font-size="6" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">LABORO</text>' : "")
      + '<text x="' + x + '" y="170" font-size="10" font-weight="700" fill="#0A2540" text-anchor="middle" font-family="system-ui,sans-serif">' + esc(p.nom) + '</text>'
      + (p.role ? '<text x="' + x + '" y="182" font-size="7.5" fill="#4A6FA5" text-anchor="middle" font-family="system-ui,sans-serif">' + esc(p.role) + '</text>' : "")
      + '</g>';
  }
  function svgDecor(decor){
    var enseigne = '<text x="220" y="28" font-size="13" font-weight="800" fill="#0A2540" font-family="system-ui,sans-serif" text-anchor="middle">LABORO</text>'
      + '<text x="220" y="41" font-size="7" fill="#4A6FA5" font-family="system-ui,sans-serif" text-anchor="middle" letter-spacing="1">SPORT &amp; OUTDOOR · ÉVRY</text>';
    if(decor === "telephone"){
      return '<rect width="440" height="200" fill="#EEF3F9"/>'
        + '<rect x="0" y="0" width="218" height="200" fill="#E6EEF8"/><rect x="222" y="0" width="218" height="200" fill="#F6F1E7"/>'
        + '<line x1="220" y1="0" x2="220" y2="200" stroke="#B9C9DD" stroke-width="2" stroke-dasharray="5 5"/>'
        + '<text x="110" y="24" font-size="9" font-weight="700" fill="#185FA5" text-anchor="middle" font-family="system-ui,sans-serif">LABORO · ÉVRY</text>'
        + '<text x="330" y="24" font-size="9" font-weight="700" fill="#8A4B00" text-anchor="middle" font-family="system-ui,sans-serif">AU BOUT DU FIL</text>'
        + '<rect x="30" y="150" width="160" height="6" rx="3" fill="#C9D6E6"/><rect x="250" y="150" width="160" height="6" rx="3" fill="#E5DAC4"/>';
    }
    if(decor === "club"){
      return '<rect width="440" height="200" fill="#E8F3EC"/><rect y="148" width="440" height="52" fill="#9FCFAE"/>'
        + '<path d="M0 148h440" stroke="#fff" stroke-width="2"/><circle cx="220" cy="174" r="16" fill="none" stroke="#fff" stroke-width="2"/>'
        + '<rect x="18" y="58" width="44" height="90" fill="none" stroke="#fff" stroke-width="3"/><rect x="378" y="58" width="44" height="90" fill="none" stroke="#fff" stroke-width="3"/>'
        + '<rect x="160" y="16" width="120" height="30" rx="4" fill="#fff" opacity=".85"/>'
        + '<text x="220" y="31" font-size="11" font-weight="800" fill="#0A2540" font-family="system-ui,sans-serif" text-anchor="middle">LABORO</text>'
        + '<text x="220" y="41" font-size="6.5" fill="#4A6FA5" font-family="system-ui,sans-serif" text-anchor="middle" letter-spacing="1">CHEZ LE CLIENT</text>';
    }
    if(decor === "bureau"){
      return '<rect width="440" height="200" fill="#EEF2F7"/><rect y="152" width="440" height="48" fill="#D6DFEA"/>'
        + '<rect x="186" y="118" width="68" height="34" rx="3" fill="#B98A57"/><rect x="200" y="98" width="40" height="22" rx="2" fill="#0A2540"/><rect x="203" y="101" width="34" height="16" fill="#63B3ED"/>'
        + enseigne;
    }
    // showroom (par défaut)
    return '<rect width="440" height="200" fill="#E9F0F8"/><rect y="152" width="440" height="48" fill="#CFDAE8"/>'
      + '<g fill="#B9C9DD"><rect x="14" y="44" width="70" height="5" rx="2"/><rect x="14" y="84" width="70" height="5" rx="2"/><rect x="14" y="124" width="70" height="5" rx="2"/></g>'
      + '<g fill="#185FA5" opacity=".7"><rect x="20" y="30" width="16" height="14" rx="3"/><rect x="44" y="33" width="14" height="11" rx="3"/><rect x="60" y="70" width="18" height="14" rx="3"/><rect x="24" y="110" width="22" height="14" rx="3"/></g>'
      + '<g fill="#B9C9DD"><rect x="356" y="44" width="70" height="5" rx="2"/><rect x="356" y="84" width="70" height="5" rx="2"/></g>'
      + '<g fill="#D97706" opacity=".6"><rect x="364" y="30" width="18" height="14" rx="3"/><rect x="396" y="72" width="20" height="12" rx="3"/></g>'
      + enseigne;
  }
  function blocSaynete(b){
    var racine = el("div", "ma-bloc ma-film");
    var persos = b.persos || {};
    var decor = b.decor || "showroom";
    var xa = decor === "telephone" ? 110 : 150, xb = decor === "telephone" ? 330 : 292;
    var uid = "ma" + Math.random().toString(36).slice(2, 8);
    racine.innerHTML =
        '<div class="ma-film-tete"><strong>🎬 ' + esc(b.titre || "Saynète") + '</strong><span class="ma-prise"></span></div>'
      + '<svg class="ma-scene" viewBox="0 0 440 200" role="img" aria-label="' + esc(b.titre || "Saynète") + '">'
      +   svgDecor(decor)
      +   '<g class="ma-carton" opacity="0"><rect x="' + (xa+12) + '" y="130" width="26" height="20" rx="2" fill="#B98A57"/><path d="M' + (xa+12) + ' 136h26" stroke="#8A6236"/></g>'
      +   (persos.a ? svgPerso(xa, persos.a, uid + "a", decor) : "")
      +   (persos.b ? svgPerso(xb, persos.b, uid + "b", decor) : "")
      +   '<g class="ma-verdict" opacity="0"><circle cx="410" cy="62" r="17" fill="#DC2626"/><text x="410" y="68" font-size="18" font-weight="800" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">✗</text></g>'
      + '</svg>'
      + '<div class="ma-sous-titre" aria-live="polite"></div>'
      + '<div class="ma-film-pied"><button type="button" class="ma-btn ma-lancer">' + (b.mission ? "▶ Découvrir la situation" : "▶ Lancer la scène") + '</button>'
      + (MA.voixDispo() ? '<label class="ma-voix"><input type="checkbox" checked> Voix</label>' : "")
      + '<span class="ma-avance"></span></div>';
    var $ = function(s){ return racine.querySelector(s); };
    var pA = racine.querySelector("#" + uid + "a"), pB = racine.querySelector("#" + uid + "b");
    var lignes = (b.lignes || []).map(function(l){
      if(typeof l !== "string") return l;
      var k = l.indexOf("|"), cle = l.slice(0, k), t = l.slice(k + 1);
      if(cle === "a" || cle === "b") return { qui: cle, txt: t };
      return { qui: null, txt: t, fin: cle === "fin" };
    });
    var idx = 0, enCours = false, minuteur = null, jeton = 0;

    function afficher(l){
      if(l.prise) $(".ma-prise").textContent = l.prise;
      if(l.occupe != null){
        $(".ma-carton").setAttribute("opacity", l.occupe ? "1" : "0");
        if(pA) pA.classList.toggle("ma-detourne", !!l.occupe);
      }
      if(l.verdict){
        var v = $(".ma-verdict");
        if(l.verdict === "off"){ v.setAttribute("opacity", "0"); }
        else{
          v.setAttribute("opacity", "1");
          v.querySelector("circle").setAttribute("fill", l.verdict === "ok" ? "#1D9E75" : "#DC2626");
          v.querySelector("text").textContent = l.verdict === "ok" ? "✓" : "✗";
        }
      }
      if(pA) pA.classList.toggle("ma-parle", l.qui === "a");
      if(pB) pB.classList.toggle("ma-parle", l.qui === "b");
      var p = l.qui ? persos[l.qui] : null;
      var st = $(".ma-sous-titre");
      st.classList.toggle("ma-fin", !!l.fin);
      st.innerHTML = p
        ? "<b>" + esc(p.nom) + " :</b> « " + esc(l.txt) + " »"
        : (l.fin ? "🎯 <strong>" + esc(l.txt) + "</strong>" : "<i>" + esc(l.txt) + "</i>");
    }
    function terminer(){
      enCours = false;
      if(pA) pA.classList.remove("ma-parle");
      if(pB) pB.classList.remove("ma-parle");
      $(".ma-lancer").textContent = b.mission ? "↻ Revoir la situation" : "↻ Revoir la scène";
      $(".ma-avance").textContent = "";
    }
    function suivante(){
      if(!enCours) return;
      if(idx >= lignes.length) return terminer();
      var l = lignes[idx++];
      $(".ma-avance").textContent = idx + " / " + lignes.length;
      afficher(l);
      var duree = Math.max(1900, l.txt.length * 65);
      var case_ = $(".ma-voix input");
      var avecVoix = case_ && case_.checked;
      var mon = jeton;
      if(avecVoix){
        var ton = l.qui && persos[l.qui] ? persos[l.qui].sexe : "";
        MA.parler(l.txt, ton).then(function(){ if(mon === jeton && enCours){ minuteur = setTimeout(suivante, 450); } });
      } else {
        minuteur = setTimeout(function(){ if(mon === jeton) suivante(); }, duree);
      }
    }
    $(".ma-lancer").addEventListener("click", function(){
      clearTimeout(minuteur); MA.stop(); jeton++;
      idx = 0; enCours = true;
      $(".ma-lancer").textContent = "■ En cours…";
      suivante();
    });
    racine._arreter = function(){ jeton++; clearTimeout(minuteur); if(enCours) terminer(); };
    // État au repos : premier plan visible, consigne d'observation
    var premiere = lignes[0] || {};
    afficher({ prise: premiere.prise || "", occupe: premiere.occupe || false, verdict: "off", qui: null,
      txt: b.consigne || (b.mission ? "Clique sur « Découvrir la situation » : ta mission commence ici." : "Clique sur « Lancer la scène » et observe bien.") });
    return racine;
  }

  // ─────────────────────────────────────────────
  //  Bloc ÉTAPES  { type:"etapes", titre, intro, etapes:[{ico, k, s}] }
  // ─────────────────────────────────────────────
  function blocEtapes(b){
    var racine = el("div", "ma-bloc ma-carte");
    var et = b.etapes || [];
    racine.innerHTML = '<div class="ma-titre">' + esc(b.titre) + '</div>'
      + (b.intro ? '<p class="ma-intro">' + esc(b.intro) + '</p>' : "")
      + '<div class="ma-etapes" style="--n:' + et.length + '">' + et.map(function(e, i){
          return '<div class="ma-etape on"><div class="ma-etape-ico">' + (e.ico || (i + 1)) + '</div><div class="ma-etape-k">' + esc(e.k) + '</div><div class="ma-etape-s">' + esc(e.s || "") + '</div></div>';
        }).join("") + '</div>'
      + '<div class="ma-barre"><i style="width:100%"></i></div>'
      + '<div class="ma-ligne"><button type="button" class="ma-btn ma-anim">▶ Animer les étapes</button></div>';
    var cases = racine.querySelectorAll(".ma-etape"), barre = racine.querySelector(".ma-barre i");
    var min = null, jeton = 0;
    racine.querySelector(".ma-anim").addEventListener("click", function(){
      clearTimeout(min); MA.stop(); jeton++; var mon = jeton;
      cases.forEach(function(c){ c.classList.remove("on", "vu"); }); barre.style.width = "0";
      var i = 0;
      (function suite(){
        if(mon !== jeton) return;
        if(i > 0) cases[i - 1].classList.replace("on", "vu");
        if(i >= cases.length){ cases.forEach(function(c){ c.classList.remove("vu"); c.classList.add("on"); }); return; }
        cases[i].classList.add("on");
        barre.style.width = ((i + 1) / cases.length * 100) + "%";
        var e = et[i]; i++;
        var t = e.k + (e.s ? ". " + e.s : "");
        if(b.voix !== false && MA.voixDispo()) MA.parler(t, "").then(function(){ min = setTimeout(suite, 350); });
        else min = setTimeout(suite, 1500);
      })();
    });
    racine._arreter = function(){ jeton++; clearTimeout(min); cases.forEach(function(c){ c.classList.remove("vu"); c.classList.add("on"); }); barre.style.width = "100%"; };
    return racine;
  }

  // ─────────────────────────────────────────────
  //  Bloc TRI  { type:"tri", titre, consigne, categories:[…], items:[[texte, indexCategorie, explication]] }
  // ─────────────────────────────────────────────
  function blocTri(b){
    var racine = el("div", "ma-bloc ma-carte");
    var items = b.items || [], cats = b.categories || [];
    racine.innerHTML = '<div class="ma-titre">🧩 ' + esc(b.titre) + '</div>'
      + (b.consigne ? '<p class="ma-intro">' + esc(b.consigne) + '</p>' : "")
      + '<div class="ma-tri-q"></div>'
      + '<div class="ma-ligne ma-tri-choix">' + cats.map(function(c, i){ return '<button type="button" class="ma-btn ma-choix" data-i="' + i + '">' + esc(c) + '</button>'; }).join("")
      + '<span class="ma-score"></span></div>'
      + '<div class="ma-retour" aria-live="polite"></div>';
    var q = racine.querySelector(".ma-tri-q"), ret = racine.querySelector(".ma-retour"), sc = racine.querySelector(".ma-score");
    var choix = racine.querySelectorAll(".ma-choix");
    var i = 0, bons = 0, attente = false;
    function montrer(){
      if(i >= items.length){
        q.innerHTML = "<strong>Terminé : " + bons + " / " + items.length + " bonne" + (bons > 1 ? "s" : "") + " réponse" + (bons > 1 ? "s" : "") + ".</strong> "
          + (bons === items.length ? "Parfait, tu es prêt(e) pour la mission." : "Relis la fiche, puis recommence pour viser le sans-faute.");
        choix.forEach(function(c){ c.hidden = true; });
        sc.innerHTML = '<button type="button" class="ma-btn ma-sec ma-rejouer">↻ Recommencer</button>';
        sc.querySelector(".ma-rejouer").addEventListener("click", function(){ i = 0; bons = 0; ret.textContent = ""; ret.className = "ma-retour"; choix.forEach(function(c){ c.hidden = false; }); montrer(); });
        return;
      }
      q.textContent = items[i][0];
      sc.textContent = (i + 1) + " / " + items.length;
      choix.forEach(function(c){ c.disabled = false; });
      attente = false;
    }
    choix.forEach(function(c){
      c.addEventListener("click", function(){
        if(attente || i >= items.length) return;
        attente = true;
        var it = items[i], ok = Number(c.dataset.i) === it[1];
        if(ok) bons++;
        ret.className = "ma-retour " + (ok ? "ok" : "ko");
        ret.innerHTML = (ok ? "✓ Bien vu. " : "✗ Non : c'est <strong>" + esc(cats[it[1]]) + "</strong>. ") + esc(it[2] || "");
        choix.forEach(function(x){ x.disabled = true; });
        i++;
        setTimeout(montrer, REDUIT ? 300 : 900);
      });
    });
    montrer();
    return racine;
  }

  // ─────────────────────────────────────────────
  //  Bloc CHAÎNE  { type:"chaine", titre, intro, produit (nom catalogue, facultatif), maillons:[{k, txt}], questions:[…] }
  // ─────────────────────────────────────────────
  function imageProduit(nom){
    if(!nom || typeof PRODUITS === "undefined" || typeof PROD_IMAGES === "undefined") return null;
    var n = normaliser(nom);
    var p = PRODUITS.filter(function(x){ return normaliser(x.nom) === n; })[0];
    return p && PROD_IMAGES[p.id] ? { src: PROD_IMAGES[p.id], p: p } : null;
  }
  function blocChaine(b){
    var racine = el("div", "ma-bloc ma-carte");
    var m = b.maillons || [], qs = b.questions || [];
    var img = imageProduit(b.produit);
    racine.innerHTML = '<div class="ma-titre">🔗 ' + esc(b.titre) + '</div>'
      + '<div class="ma-chaine-tete">' + (img ? '<img src="' + esc(img.src) + '" alt="' + esc(img.p.nom) + '" loading="lazy" onerror="this.remove()">' : "")
      + (b.intro ? '<p class="ma-intro">' + esc(b.intro) + '</p>' : "") + '</div>'
      + '<div class="ma-chaine">' + m.map(function(x, i){
          return (i ? '<div class="ma-fleche">→</div>' : "") + '<div class="ma-maillon' + (i ? "" : " on") + '"><small>' + esc(x.k) + '</small>' + esc(x.txt) + '</div>';
        }).join("") + '</div>'
      + '<div class="ma-ligne"><button type="button" class="ma-btn ma-suite"></button><button type="button" class="ma-btn ma-sec ma-raz">↻ Recommencer</button></div>';
    var mail = racine.querySelectorAll(".ma-maillon"), fl = racine.querySelectorAll(".ma-fleche"), bt = racine.querySelector(".ma-suite");
    var etat = 0;
    function maj(){
      mail.forEach(function(x, i){ x.classList.toggle("on", i <= etat); });
      fl.forEach(function(x, i){ x.classList.toggle("on", i < etat); });
      if(etat >= m.length - 1){ bt.textContent = "Raisonnement complet ✓"; bt.disabled = true; }
      else { bt.textContent = qs[etat] || "Et ensuite ?"; bt.disabled = false; }
    }
    bt.addEventListener("click", function(){ etat++; maj(); });
    racine.querySelector(".ma-raz").addEventListener("click", function(){ etat = 0; maj(); });
    maj();
    return racine;
  }

  // ─────────────────────────────────────────────
  //  Bloc CALCUL  { type:"calcul", titre, intro, calc:"nps"|"ttc"|"points"|"retention"|"entonnoir"|"relance"|"satisfaction" }
  // ─────────────────────────────────────────────
  function fmt(n, d){
    if(!isFinite(n)) return "—";
    var f = Math.pow(10, d == null ? 1 : d);
    return (Math.round(n * f) / f).toLocaleString("fr-FR");
  }
  var CALCS = {
    nps: {
      champs: [["Promoteurs (notes 9-10)", 20], ["Passifs (notes 7-8)", 25], ["Détracteurs (notes 0-6)", 5]],
      calc: function(v){
        var t = v[0] + v[1] + v[2]; if(!t) return "Saisis au moins une réponse.";
        var pp = v[0] / t * 100, pd = v[2] / t * 100, nps = Math.round(pp - pd);
        return "Total : " + t + " répondants<br>% promoteurs = " + v[0] + " ÷ " + t + " × 100 = <b>" + fmt(pp) + " %</b><br>% détracteurs = " + v[2] + " ÷ " + t + " × 100 = <b>" + fmt(pd) + " %</b><br>"
          + "NPS = " + fmt(pp) + " − " + fmt(pd) + " = <b class='ma-gros'>" + (nps > 0 ? "+" : "") + nps + "</b> "
          + (nps > 20 ? "✅ objectif LABORO (> +20) atteint" : "⚠️ sous l'objectif LABORO (> +20)");
      }
    },
    satisfaction: {
      champs: [["Très satisfaits", 30], ["Satisfaits", 15], ["Insatisfaits", 5]],
      calc: function(v){
        var t = v[0] + v[1] + v[2]; if(!t) return "Saisis au moins une réponse.";
        var taux = (v[0] + v[1]) / t * 100;
        return "Taux = (" + v[0] + " + " + v[1] + ") ÷ " + t + " × 100 = <b class='ma-gros'>" + fmt(taux) + " %</b> " + (taux >= 80 ? "✅ objectif LABORO (≥ 80 %) atteint" : "⚠️ sous l'objectif LABORO (≥ 80 %)");
      }
    },
    ttc: {
      champs: [["Prix TTC (€)", 60]],
      calc: function(v){
        var ht = v[0] / 1.2;
        return "HT = TTC ÷ 1,20 = " + fmt(v[0], 2) + " ÷ 1,20 = <b class='ma-gros'>" + fmt(ht, 2) + " € HT</b><br>TVA = TTC − HT = " + fmt(v[0], 2) + " − " + fmt(ht, 2) + " = <b>" + fmt(v[0] - ht, 2) + " €</b><br>"
          + "<span class='ma-piege'>Piège : retirer 20 % du TTC donne " + fmt(v[0] * 0.8, 2) + " €, ce qui est faux.</span>";
      }
    },
    points: {
      champs: [["Montant des achats (€)", 850]],
      calc: function(v){
        var pts = Math.floor(v[0]), tr = Math.floor(pts / 100);
        return "Points gagnés = " + pts + " (1 € = 1 point)<br>Tranches complètes de 100 points = <b>" + tr + "</b><br>Remise = " + tr + " × 10 € = <b class='ma-gros'>" + (tr * 10) + " €</b>"
          + (pts % 100 ? "<br>Il reste " + (pts % 100) + " points pour la prochaine fois." : "");
      }
    },
    retention: {
      champs: [["Clients de la période précédente", 200], ["Parmi eux, clients qui ont racheté", 148]],
      calc: function(v){
        if(!v[0]) return "Saisis le nombre de clients de la période précédente.";
        if(v[1] > v[0]) return "Les clients qui ont racheté ne peuvent pas être plus nombreux que les clients de départ.";
        var r = v[1] / v[0] * 100;
        return "Rétention = " + v[1] + " ÷ " + v[0] + " × 100 = <b class='ma-gros'>" + fmt(r) + " %</b> " + (r > 60 ? "✅ (objectif > 60 %)" : "⚠️ (objectif > 60 %)")
          + "<br>Attrition = 100 − " + fmt(r) + " = <b>" + fmt(100 - r) + " %</b> " + (100 - r < 20 ? "✅ (objectif < 20 %)" : "⚠️ signal d'alarme (> 20 %)");
      }
    },
    entonnoir: {
      champs: [["Suspects (toutes les associations)", 400], ["Prospects qualifiés", 120], ["Contacts aboutis", 60], ["Rendez-vous obtenus", 12]],
      calc: function(v){
        var t = function(a, b){ return b ? fmt(a / b * 100) + " %" : "—"; };
        var max = Math.max(v[0], 1);
        var barres = v.map(function(x, i){ return "<div class='ma-ent'><i style='width:" + Math.max(4, Math.min(100, x / max * 100)) + "%'></i><span>" + ["Suspects", "Qualifiés", "Aboutis", "RDV"][i] + " : " + x + "</span></div>"; }).join("");
        return barres + "Taux de qualification = " + v[1] + " ÷ " + v[0] + " = <b>" + t(v[1], v[0]) + "</b> · Taux de contact = " + v[2] + " ÷ " + v[1] + " = <b>" + t(v[2], v[1]) + "</b> · Taux de RDV = " + v[3] + " ÷ " + v[2] + " = <b>" + t(v[3], v[2]) + "</b>";
      }
    },
    relance: {
      jours: true,
      calc: function(v){
        var J = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        var j = v[0];
        function ouvre(d){ var x = d % 7; var dec = x === 5 ? 2 : (x === 6 ? 1 : 0); return { j: J[(x + dec) % 7], decale: dec, brut: J[x] }; }
        var r1 = ouvre(j + 1), r5 = ouvre(j + 5), r10 = ouvre(j + 10);
        var l = function(lib, r){ return lib + " : <b>" + r.j + "</b>" + (r.decale ? " <span class='ma-piege'>(" + r.brut + " n'est pas travaillé → premier jour ouvré suivant)</span>" : ""); };
        return "Devis (J) envoyé un <b>" + J[j] + "</b><br>" + l("J+5, première relance", r5) + "<br>" + l("J+10, dernière relance", r10)
          + "<br><span class='ma-intro'>Rappel : le devis part dans les 24 h après le rendez-vous.</span>";
      }
    }
  };
  function blocCalcul(b){
    var def = CALCS[b.calc];
    if(!def) return null;
    var racine = el("div", "ma-bloc ma-carte");
    var champs = def.jours
      ? '<label class="ma-champ">Jour d\'envoi du devis <select>' + ["lundi", "mardi", "mercredi", "jeudi", "vendredi"].map(function(j, i){ return '<option value="' + i + '"' + (i === 2 ? " selected" : "") + '>' + j + '</option>'; }).join("") + '</select></label>'
      : def.champs.map(function(c){ return '<label class="ma-champ">' + esc(c[0]) + ' <input type="number" min="0" step="1" inputmode="numeric" value="' + c[1] + '"></label>'; }).join("");
    racine.innerHTML = '<div class="ma-titre">🧮 ' + esc(b.titre) + '</div>'
      + (b.intro ? '<p class="ma-intro">' + esc(b.intro) + '</p>' : "")
      + '<div class="ma-champs">' + champs + '</div><div class="ma-resultat" aria-live="polite"></div>';
    var entrees = racine.querySelectorAll("input,select"), res = racine.querySelector(".ma-resultat");
    function maj(){
      var v = Array.prototype.map.call(entrees, function(x){ var n = parseFloat(String(x.value).replace(",", ".")); return isFinite(n) && n >= 0 ? n : 0; });
      res.innerHTML = def.calc(v);
    }
    entrees.forEach(function(x){ x.addEventListener("input", maj); x.addEventListener("change", maj); });
    maj();
    return racine;
  }

  // ─────────────────────────────────────────────
  //  Bloc CARTES  { type:"cartes", titre, cartes:[[recto, verso]] }
  // ─────────────────────────────────────────────
  function blocCartes(b){
    var racine = el("div", "ma-bloc ma-carte");
    racine.innerHTML = '<div class="ma-titre">🃏 ' + esc(b.titre || "Teste-toi") + '</div><p class="ma-intro">Réponds de tête, puis retourne la carte pour vérifier.</p>';
    racine.appendChild(grilleCartes(b.cartes || []));
    return racine;
  }
  function grilleCartes(cartes){
    var g = el("div", "ma-cartes");
    cartes.forEach(function(c){
      var bt = el("button", "ma-flip", '<span class="ma-recto">' + esc(c[0]) + '</span><span class="ma-verso">' + esc(c[1]) + '</span><span class="ma-indice">Retourner ↺</span>');
      bt.type = "button";
      bt.addEventListener("click", function(){ bt.classList.toggle("ouverte"); });
      g.appendChild(bt);
    });
    return g;
  }

  var RENDUS = { saynete: blocSaynete, etapes: blocEtapes, tri: blocTri, chaine: blocChaine, calcul: blocCalcul, cartes: blocCartes };
  MA.rendreBloc = function(b){
    var f = RENDUS[b && b.type];
    if(!f) return null;
    try{ return f(b); }catch(e){ if(window.console) console.warn("[animations] bloc ignoré :", b && b.type, e); return null; }
  };

  // ─────────────────────────────────────────────
  //  Ressource (onglet « Apprendre d'abord »)
  // ─────────────────────────────────────────────
  function cleRessource(m){
    var cle = (typeof getResKey === "function") ? getResKey(m.comp) : m.comp;
    return cle;
  }
  function blocsPour(m){
    var d = DONNEES(), cle = cleRessource(m);
    return d[cle + "-" + m.palier] || d[cle] || null;
  }

  // Découpe « Terme = définition », « Terme : … », « Terme — … » pour en faire une carte
  function decouperRetenir(t){
    var seps = [" = ", " : ", " — ", " → "];
    for(var i = 0; i < seps.length; i++){
      var k = t.indexOf(seps[i]);
      if(k > 2 && k < 70 && t.length - k > 4) return [t.slice(0, k).trim(), t.slice(k + seps[i].length).trim()];
    }
    return null;
  }
  function enrichirFiche(bloc){
    if(!bloc || bloc.dataset.maFiche) return;
    bloc.dataset.maFiche = "1";
    // 1. Bouton « Écouter » sur chaque partie
    bloc.querySelectorAll(".res-section").forEach(function(sec){
      var lab = sec.querySelector(".res-section-label");
      if(!lab || lab.querySelector(".ma-ecoute")) return;
      lab.appendChild(MA.boutonEcoute(function(){ return texteDe(sec).replace(/🔊 Écouter|■ Arrêter/g, ""); }, ""));
    });
    // 2. Notions à connaître : un terme = une ligne repliable
    bloc.querySelectorAll(".res-section").forEach(function(sec){
      var lab = sec.querySelector(".res-section-label");
      if(!lab || !/notion/i.test(lab.textContent)) return;
      sec.querySelectorAll(":scope > ul > li").forEach(function(li){
        var fort = li.querySelector("strong");
        if(!fort || li.firstElementChild !== fort) return;
        var terme = fort.textContent.trim();
        var reste = li.innerHTML.slice(li.innerHTML.indexOf("</strong>") + 9).replace(/^\s*[—:–-]\s*/, "");
        var d = el("details", "ma-notion", "<summary>" + esc(terme) + "</summary><div>" + reste + "</div>");
        li.innerHTML = ""; li.appendChild(d); li.classList.add("ma-li-notion");
      });
    });
    // 3. À retenir → cartes à retourner (la liste reste lisible si le découpage échoue)
    bloc.querySelectorAll(".res-retenir").forEach(function(r){
      var lis = r.querySelectorAll("li");
      var cartes = [];
      lis.forEach(function(li){ var c = decouperRetenir(texteDe(li)); if(c) cartes.push(c); });
      // Au moins 2 phrases découpables : elles deviennent des cartes ;
      // les autres restent affichées en liste juste en dessous.
      if(cartes.length >= 2){
        var ul = r.querySelector("ul");
        if(!ul) return;
        var aide = el("div", "ma-intro", "Teste-toi : réponds de tête, puis retourne chaque carte.");
        r.insertBefore(aide, ul);
        r.insertBefore(grilleCartes(cartes), ul);
        lis.forEach(function(li){ if(decouperRetenir(texteDe(li))) li.hidden = true; });
        if(cartes.length === lis.length) ul.hidden = true;
      }
    });
  }

  function enrichirRessource(m){
    var zone = document.getElementById("mo-learn");
    if(!zone) return;
    var fiche = zone.querySelector(".res-block");
    // Un seul exercice, propre à la mission (data/exercices-missions.js).
    // Les blocs de compétence (data/ressources-animees.js) ne servent plus
    // que de secours pour une future mission qui n'aurait pas encore le sien
    // (13/10/2026 : « une animation par mission », jamais partagée).
    var propre = (typeof EXERCICES_MISSIONS !== "undefined") ? EXERCICES_MISSIONS[m.id] : null;
    var blocs = propre ? [propre] : (blocsPour(m) || []);
    if(blocs.length && !zone.querySelector(".ma-zone")){
      var z = el("div", "ma-zone");
      z.appendChild(el("div", "ma-zone-tete", "<span>Découvrir en action</span><small>Regarde, manipule, vérifie que tu as compris. La fiche complète est juste en dessous.</small>"));
      blocs.forEach(function(b){ var n = MA.rendreBloc(b); if(n) z.appendChild(n); });
      zone.insertBefore(z, zone.firstChild);
    }
    if(fiche) enrichirFiche(fiche.querySelector(".res-b") || fiche);
  }

  // ─────────────────────────────────────────────
  //  Mission (onglet « La mission »)
  // ─────────────────────────────────────────────
  var EQUIPE = [
    ["Romain Sauzet", "Responsable Showroom & Commercial", "#185FA5", "h"],
    ["Nina Chevalier", "Responsable commerciale B2B", "#7B2D42", "f"],
    ["Marco Pellini", "Responsable Satisfaction Client", "#0F766E", "h"],
    ["Pascal Berruelle", "PDG de LABORO", "#0A2540", "h"],
    ["Thomas Moreau", "Conseiller de vente", "#2D5282", "h"],
    ["Yannick Perrot", "Responsable des achats", "#6B4E16", "h"]
  ];
  function expediteur(texte){
    var t = texte || "", meilleur = null, pos = Infinity;
    EQUIPE.forEach(function(p){ var i = t.indexOf(p[0]); if(i >= 0 && i < pos){ pos = i; meilleur = p; } });
    return meilleur;
  }
  function enrichirSituation(zone){
    var ph = zone.querySelector(".ph1");
    if(!ph || ph.dataset.maSit) return;
    var c = ph.querySelector(".ph-c");
    if(!c) return;
    ph.dataset.maSit = "1";
    var texte = texteDe(c);
    var exp = expediteur(texte);
    var ini = exp ? exp[0].split(" ").map(function(x){ return x[0]; }).join("") : "📍";
    var tete = el("div", "ma-sit-tete",
      '<span class="ma-avatar" style="background:' + (exp ? exp[2] : "var(--th-principal,#185FA5)") + '">' + ini + '</span>'
      + '<span class="ma-sit-qui"><strong>' + (exp ? esc(exp[0]) : "Ta mission chez LABORO") + '</strong><small>' + (exp ? esc(exp[1]) + " · message pour toi" : "Mise en situation") + '</small></span>');
    tete.appendChild(MA.boutonEcoute(texte, exp ? exp[3] : ""));
    ph.classList.add("ma-situation");
    ph.insertBefore(tete, ph.firstChild);
    c.classList.add("ma-bulle");
  }
  // Répliques citées dans les questions (« M. Vidal te répond : '…' ») → bouton Écouter
  var RE_REPLIQUE = /(?:r[ée]pond|dit|explique|demande|ajoute|[ée]crit|d[ée]clare|lance|pr[ée]cise|insiste|s'exclame|r[ée]torque|objecte|t'appelle|te dit)[^:«'"“]{0,60}:\s*(?:«\s*|['"“])([\s\S]{20,}?[.!?…])\s*(?:»|['"”])/i;
  function enrichirRepliques(zone){
    zone.querySelectorAll(".qi").forEach(function(qi){
      if(qi.dataset.maRep) return;
      qi.dataset.maRep = "1";
      var brut = "";
      for(var n = qi.firstChild; n; n = n.nextSibling){
        if(n.nodeType === 3) brut += n.textContent;
        else if(n.nodeType === 1 && (n.classList.contains("qcm-wrap") || n.tagName === "TEXTAREA")) break;
        else if(n.nodeType === 1 && !n.classList.contains("qn")) brut += n.textContent;
      }
      var m = RE_REPLIQUE.exec(brut);
      if(!m || m[1].indexOf("___") >= 0) return;   // phrase à compléter par l'élève : rien à écouter
      var anglais = /\b(I'm|I am|the|you|please|looking|where|thank)\b/i.test(m[1]);
      var avant = brut.slice(0, m.index + 1);
      var ton = /\bMme\b|\bMadame\b|\belle\b/.test(avant.slice(-80)) ? "f" : (/\bM\.\s|\bMonsieur\b|\bil\b/.test(avant.slice(-80)) ? "h" : "");
      var b = MA.boutonEcoute(m[1], ton, "🔊 Écouter la réplique", anglais ? "en-GB" : "");
      b.classList.add("ma-ecoute-q");
      var ref = qi.querySelector(".qcm-wrap, textarea");
      qi.insertBefore(b, ref || null);
    });
  }
  // Images du catalogue dans les dossiers documentaires
  var indexProduits = null;
  function produitPour(libelle){
    if(typeof PRODUITS === "undefined" || typeof PROD_IMAGES === "undefined") return null;
    if(!indexProduits){
      indexProduits = PRODUITS.filter(function(p){ return PROD_IMAGES[p.id]; }).map(function(p){ return { n: normaliser(p.nom), p: p }; })
        .filter(function(x){ return x.n.length >= 8; })
        .sort(function(a, b){ return b.n.length - a.n.length; });
    }
    var l = normaliser(String(libelle).replace(/^\s*[A-Z0-9]{1,2}\s*[)\-.]\s*/, ""));
    if(l.length < 6) return null;
    for(var i = 0; i < indexProduits.length; i++){
      var x = indexProduits[i];
      if(l === x.n || l.indexOf(x.n) === 0 || (x.n.indexOf(l) === 0 && l.length >= 12)) return x.p;
    }
    return null;
  }
  function enrichirDossier(zone){
    zone.querySelectorAll(".doc-t th").forEach(function(th){
      if(th.dataset.maImg) return;
      th.dataset.maImg = "1";
      var p = produitPour(th.textContent);
      if(!p) return;
      var img = el("img", "ma-vignette");
      img.src = PROD_IMAGES[p.id]; img.alt = p.nom; img.loading = "lazy";
      img.addEventListener("error", function(){ img.remove(); });
      th.classList.add("ma-th-img");
      th.insertBefore(img, th.firstChild);
    });
  }
  // Saynète propre à la mission (variante PVOC si la classe est en PVOC,
  // même règle que l'affichage du contexte dans js/missions.js)
  function saynetePour(m){
    var tout = (typeof SAYNETES_MISSIONS !== "undefined") ? SAYNETES_MISSIONS : {};
    var s = tout[m.id];
    if(!s) return null;
    var pvoc = typeof CU !== "undefined" && CU && CU.classe && String(CU.classe).indexOf("PVOC") >= 0;
    return (pvoc && s.pvoc) ? s.pvoc : s;
  }
  function insererSaynete(zone, m){
    if(zone.querySelector(".ma-film-mission")) return;
    var s = saynetePour(m);
    if(!s) return;
    var film = MA.rendreBloc({ type: "saynete", mission: true, titre: s.titre, decor: s.decor, persos: { a: s.a, b: s.b }, lignes: s.lignes });
    if(!film) return;
    film.classList.add("ma-film-mission");
    // Après le rappel « copier-coller désactivé » (premier bloc), avant le dossier
    var premier = zone.firstElementChild;
    if(premier && /copier-coller/i.test(premier.textContent || "")) zone.insertBefore(film, premier.nextSibling);
    else zone.insertBefore(film, zone.firstChild);
  }
  function enrichirMission(){
    var zone = document.getElementById("mo-mission");
    if(!zone) return;
    if(typeof CM !== "undefined" && CM) insererSaynete(zone, CM);
    enrichirSituation(zone);
    enrichirRepliques(zone);
    enrichirDossier(zone);
  }

  // ─────────────────────────────────────────────
  //  Branchements
  // ─────────────────────────────────────────────
  function arreterTout(){
    MA.stop();
    document.querySelectorAll(".ma-bloc").forEach(function(b){ if(typeof b._arreter === "function") b._arreter(); });
  }
  MA.arreterTout = arreterTout;
  function apresOuverture(id){
    if(typeof CM === "undefined" || !CM || CM.id !== id) return;
    try{ enrichirRessource(CM); }catch(e){ if(window.console) console.warn("[animations] ressource :", e); }
    try{ enrichirMission(); }catch(e){ if(window.console) console.warn("[animations] mission :", e); }
  }
  MA.enrichirMissionOuverte = function(){ if(typeof CM !== "undefined" && CM) apresOuverture(CM.id); };

  if(typeof window.openMission === "function"){
    var origOpen = window.openMission;
    window.openMission = function(id){
      arreterTout();
      var r = origOpen.apply(this, arguments);
      apresOuverture(id);
      return r;
    };
  }
  if(typeof window.closeMo === "function"){
    var origClose = window.closeMo;
    window.closeMo = function(){ arreterTout(); return origClose.apply(this, arguments); };
  }
  if(typeof window.moTab === "function"){
    var origTab = window.moTab;
    window.moTab = function(){ arreterTout(); return origTab.apply(this, arguments); };
  }
})();
