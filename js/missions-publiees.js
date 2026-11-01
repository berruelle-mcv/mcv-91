// ================================================
//   LABORO — Moteur commun : missions publiées depuis l'espace enseignant (01/11/2026)
//
//   « Générer une mission » → le brouillon s'ouvre dans un éditeur (tout est modifiable),
//   des garde-fous le vérifient en direct, puis « Publier » l'enregistre sur le serveur :
//   plus de fichier à déposer sur GitHub ni de script à lancer sur le Pi.
//
//   • Publier : réservé à l'administrateur (le serveur le vérifie aussi).
//   • Une mission publiée n'entre dans aucune liste de classe : les élèves la voient
//     seulement quand elle leur est assignée (Chercher et assigner / Mission du jour).
//   • Retirer : la mission n'est plus proposée ; les copies déjà rendues restent lisibles.
//
//   Au chargement de l'application, les missions publiées sont ajoutées à MISSIONS
//   (avec leur saynète et leur exercice) : tout le reste du site les traite comme
//   les autres missions (ouverture, correction, suivi, Pronote, portfolio…).
//
//   Routes : GET/POST /api/missions-publiees ; POST /api/missions-publiees/:id/statut
// ================================================
(function(){
  "use strict";

  var MP = window.MP = window.MP || {};
  var LISTE = [];            // missions publiées connues (enseignant : toutes)
  var chargement = null;     // promesse du chargement en cours
  var BROUILLON = null;      // brouillon en cours d'édition
  var CLE_BROUILLON = "laboro_brouillon_generation";

  function jeton(){ return localStorage.getItem("laboro_token"); }
  function esc(t){ return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function estEnseignant(){ return typeof CU !== "undefined" && CU && CU.classe === "enseignant"; }
  function estAdminLocal(){ try{ return localStorage.getItem("laboro_est_admin") === "1"; }catch(e){ return false; } }
  function copie(o){ return JSON.parse(JSON.stringify(o)); }
  function norm(s){ return String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/\s+/g, " ").trim(); }
  function codeC(c){ return (typeof codeComp === "function") ? codeComp(c) : c; }
  function cfg(){ return (typeof LABORO_CONFIG !== "undefined" && LABORO_CONFIG) ? LABORO_CONFIG : {}; }

  // ─────────────────────────────────────────────
  //  Personnages et décors connus (tirés des saynètes existantes de l'univers)
  // ─────────────────────────────────────────────
  var PERSOS = null, DECORS = null;
  function indexerSaynetes(){
    if(PERSOS) return;
    PERSOS = {}; DECORS = [];
    var tout = (typeof SAYNETES_MISSIONS !== "undefined") ? SAYNETES_MISSIONS : {};
    function noter(p){ if(p && typeof p === "object" && p.nom && !PERSOS[norm(p.nom)]) PERSOS[norm(p.nom)] = p; }
    Object.keys(tout).forEach(function(k){
      var s = tout[k]; if(!s || s.genere) return;
      [s, s.pvoc].forEach(function(v){
        if(!v) return;
        noter(v.a); noter(v.b);
        if(v.decor && DECORS.indexOf(v.decor) < 0) DECORS.push(v.decor);
      });
    });
    if(!DECORS.length) DECORS = ["bureau"];
  }
  // Membres de l'équipe (personnages avec le logo de l'entreprise), sauf l'élève
  function equipe(){
    indexerSaynetes();
    return Object.keys(PERSOS).map(function(k){ return PERSOS[k]; })
      .filter(function(p){ return p.logo && norm(p.nom) !== "toi"; });
  }
  function persoPour(p){
    indexerSaynetes();
    if(p === "toi" || (p && norm(p.nom) === "toi")) return PERSOS["toi"] || { nom: "Toi", role: "Stagiaire", sexe: "", couleur: "#1D9E75", logo: true };
    if(!p || typeof p !== "object") return null;
    var connu = PERSOS[norm(p.nom)];
    if(connu) return connu;
    return { nom: p.nom || "?", role: p.role || "", sexe: p.sexe || "", couleur: p.sexe === "f" ? "#BE123C" : "#D97706" };
  }
  MP.contexteGeneration = function(comp){
    indexerSaynetes();
    var catalogue = (typeof PRODUITS !== "undefined" && Array.isArray(PRODUITS)) ? PRODUITS.map(function(p){
      var prix = (p.pv != null) ? p.pv : p.prix;
      return (p.nom || "") + (prix != null ? " — " + prix + " €" : "");
    }).filter(Boolean) : [];
    var existantes = (typeof MISSIONS !== "undefined" ? MISSIONS : []).filter(function(m){ return m.comp === comp; })
      .map(function(m){ return m.titre + " (palier " + m.palier + ")"; });
    return {
      catalogue: catalogue.slice(0, 200),
      existantes: existantes.slice(0, 40),
      decors: DECORS.slice(),
      personnages: equipe().map(function(p){ return p.nom + " — " + (p.role || ""); })
    };
  };

  // ─────────────────────────────────────────────
  //  Intégrer une mission publiée dans le site
  // ─────────────────────────────────────────────
  function integrer(m){
    if(!m || !m.id || typeof MISSIONS === "undefined") return;
    m.publiee = true;
    var i = MISSIONS.findIndex(function(x){ return x.id === m.id; });
    if(i >= 0) MISSIONS[i] = m; else MISSIONS.push(m);
    if(m.saynete && typeof SAYNETES_MISSIONS !== "undefined"){
      var s = m.saynete;
      SAYNETES_MISSIONS[m.id] = { titre: s.titre, decor: s.decor || "bureau", a: persoPour(s.a), b: persoPour(s.b) || persoPour("toi"), lignes: s.lignes || [], genere: true };
    }
    if(m.exercice && typeof EXERCICES_MISSIONS !== "undefined"){
      var x = m.exercice;
      EXERCICES_MISSIONS[m.id] = { type: "tri", titre: x.titre, consigne: x.consigne, categories: x.categories || [], items: x.items || [] };
    }
  }
  function apresChargement(){
    try{ if(typeof RM_INDEX !== "undefined") RM_INDEX = null; }catch(e){}
    if(estEnseignant()){
      if(typeof populateMDJSelect === "function") populateMDJSelect();
      renderListePubliees();
    } else {
      var liste = document.getElementById("missions-list");
      if(liste && liste.offsetParent && typeof window.renderMissions === "function") window.renderMissions();
    }
  }
  MP.charger = function(){
    if(!jeton() || typeof LABORO_API === "undefined" || typeof fetchJSON !== "function") return Promise.resolve();
    chargement = fetchJSON(LABORO_API + "/api/missions-publiees", { headers: { "Authorization": "Bearer " + jeton() } })
      .then(function(r){
        if(!r.ok || !r.data || !r.data.ok) return;   // serveur ancien ou hors ligne : rien à ajouter
        LISTE = r.data.missions || [];
        LISTE.forEach(integrer);
        apresChargement();
      })
      .catch(function(e){ if(window.console) console.warn("[missions publiées]", e); });
    return chargement;
  };
  function retiree(m){ return m && m.publiee && m.statut === "retiree"; }

  // ─────────────────────────────────────────────
  //  Branchements sur le reste du site
  // ─────────────────────────────────────────────
  // Élève : les missions publiées qui le concernent s'ajoutent à sa liste
  if(typeof window.getMissions === "function"){
    var origGet = window.getMissions;
    window.getMissions = function(){
      var res = origGet.apply(this, arguments);
      if(!estEnseignant() && Array.isArray(res) && typeof MISSIONS !== "undefined"){
        MISSIONS.forEach(function(m){ if(m.publiee && res.indexOf(m) < 0) res.push(m); });
      }
      return res;
    };
  }
  // Une mission pas encore chargée : on attend le chargement puis on l'ouvre
  if(typeof window.openMission === "function"){
    var origOpen = window.openMission;
    window.openMission = function(id){
      var connue = typeof MISSIONS !== "undefined" && MISSIONS.some(function(m){ return m.id === id; });
      var self = this, args = arguments;
      if(!connue && chargement) return chargement.then(function(){ return origOpen.apply(self, args); });
      return origOpen.apply(this, arguments);
    };
  }
  // Enseignant : une mission retirée n'est plus proposée à l'assignation ni dans la recherche
  if(typeof window.populateMDJSelect === "function"){
    var origPop = window.populateMDJSelect;
    window.populateMDJSelect = function(){
      var r = origPop.apply(this, arguments);
      var sel = document.getElementById("mdj-ms");
      if(sel && typeof MISSIONS !== "undefined"){
        MISSIONS.forEach(function(m){
          if(!m.publiee) return;
          var o = sel.querySelector('option[value="' + m.id + '"]');
          if(o && retiree(m)) o.remove();
          else if(o && o.textContent.indexOf("✨") !== 0) o.textContent = "✨ " + o.textContent;
        });
      }
      return r;
    };
  }
  if(typeof window.rechercherMissions === "function"){
    var origRech = window.rechercherMissions;
    window.rechercherMissions = function(requete, filtres){
      var r = origRech.apply(this, arguments);
      // Le filtre « niveau » s'appuie sur les listes de classe, où les missions publiées ne
      // figurent pas : on les ajoute selon leur option (commun, AGEC, PVOC, 2nde).
      if(filtres && filtres.niveau && r && r.resultats){
        var f2 = Object.assign({}, filtres); delete f2.niveau;
        var sans = origRech.call(this, requete, f2);
        var niv = String(filtres.niveau);
        (sans.resultats || []).forEach(function(x){
          var m = x.m; if(!m.publiee) return;
          var o = m.option || "commun";
          var va = (niv === "2nde") ? (o === "2nde") : (o === "commun" || niv.indexOf(o) >= 0);
          if(va && !r.resultats.some(function(y){ return y.m === m; })) r.resultats.push(x);
        });
      }
      if(r && r.resultats) r.resultats = r.resultats.filter(function(x){ return !retiree(x.m); });
      return r;
    };
  }
  if(typeof window.showApp === "function"){
    var origShow = window.showApp;
    window.showApp = function(){
      var r = origShow.apply(this, arguments);
      try{ MP.charger(); }catch(e){ if(window.console) console.warn("[missions publiées]", e); }
      return r;
    };
  }

  // ─────────────────────────────────────────────
  //  Garde-fous (sans IA, donc sans coût)
  // ─────────────────────────────────────────────
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var MOIS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
  function anScolaire(){ var d = new Date(); return d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1; }
  function sansCitations(t){ return String(t || "").replace(/«[^»]*»/g, " ").replace(/"[^"]*"/g, " ").replace(/“[^”]*”/g, " "); }
  function numeroter(q, i, j){ return (i + 1) + "." + (j + 1) + "  " + String(q || "").replace(/^\s*\d+\s*[.,]\s*\d+\s*[-–.:)]?\s*/, "").trim(); }
  function textesMission(B){
    var t = [
      ["le titre", B.titre], ["l'objectif", B.objectif], ["le contexte", B.contexte], ["le livrable", B.livrable],
      ["la légende du dossier", (B.dossier || {}).l]
    ];
    ((B.dossier || {}).rows || []).forEach(function(r, k){ t.push(["la ligne " + (k + 1) + " du dossier", (r[0] || "") + " : " + (r[1] || "")]); });
    (B.activites || []).forEach(function(a, i){ (a.q || []).forEach(function(q, j){ t.push(["la question " + (i + 1) + "." + (j + 1), q]); }); });
    (B.criteres || []).forEach(function(c, k){ t.push(["le critère " + (k + 1), (c.c || "") + " : " + (c.i || "")]); });
    if(B.reflexivite_q) t.push(["la question de réflexivité", B.reflexivite_q]);
    return t;
  }
  function catalogue(){
    return (typeof PRODUITS !== "undefined" && Array.isArray(PRODUITS)) ? PRODUITS.map(function(p){ return { nom: p.nom, n: norm(p.nom), pv: (p.pv != null ? p.pv : p.prix) }; }).filter(function(p){ return p.n; }) : [];
  }
  function similarite(a, b){
    var mots = function(s){ return norm(s).replace(/[^a-z0-9 ]/g, " ").split(" ").filter(function(w){ return w.length > 3; }); };
    var A = mots(a), Bm = mots(b); if(!A.length || !Bm.length) return 0;
    var inter = A.filter(function(w){ return Bm.indexOf(w) >= 0; }).length;
    return inter / (A.length + Bm.length - inter);
  }
  MP.verifier = function(B){
    var bloq = [], avert = [];
    if(!B) return { bloq: ["Aucun brouillon."], avert: [] };
    indexerSaynetes();
    ["titre", "objectif", "contexte", "livrable"].forEach(function(k){ if(!String(B[k] || "").trim()) bloq.push("Le champ « " + k + " » est vide."); });
    var rows = ((B.dossier || {}).rows || []).filter(function(r){ return String(r[0] || "").trim() || String(r[1] || "").trim(); });
    if(rows.length < 2) bloq.push("Le dossier doit contenir au moins 2 lignes.");
    else if(rows.length < 4) avert.push("Le dossier est très court (" + rows.length + " lignes) : vérifie qu'il contient tout ce qu'il faut pour répondre.");
    var nq = 0; (B.activites || []).forEach(function(a){ nq += (a.q || []).filter(function(q){ return String(q).trim(); }).length; });
    if(!nq) bloq.push("Il faut au moins une question.");
    var crit = (B.criteres || []).filter(function(c){ return String(c.c || "").trim(); });
    if(crit.length < 3 || crit.length > 4) bloq.push("Il faut 3 ou 4 critères d'évaluation (il y en a " + crit.length + ").");
    var pasJe = crit.filter(function(c){ return !/^\s*je\s|^\s*j['’]/i.test(c.i || ""); }).map(function(c){ return "« " + c.c + " »"; });
    if(pasJe.length) avert.push("Critère(s) pas rédigé(s) à la 1re personne (« Je … ») : " + pasJe.join(", ") + ".");
    if(String(B.reflexivite_q || "").trim() && (B.palier < 3 || B.option === "2nde")) bloq.push("Pas de question de réflexivité avant le palier 3 (ni en 2nde) : vide ce champ.");
    if(B.palier >= 3 && B.option !== "2nde" && !String(B.reflexivite_q || "").trim()) avert.push("Palier " + B.palier + " : une question de réflexivité est attendue.");

    // Tutoiement
    var vous = [];
    textesMission(B).forEach(function(t){
      if(/^la ligne/.test(t[0]) || /^la légende/.test(t[0])) return;   // le dossier peut citer un client qui vouvoie
      if(/\b(vous|votre|vos)\b/i.test(sansCitations(t[1]))) vous.push(t[0]);
    });
    if(vous.length) bloq.push("Vouvoiement de l'élève dans " + vous.join(", ") + " : LABORO tutoie l'élève (les paroles d'un client entre « » ne comptent pas).");

    // Produits et prix
    var cat = catalogue();
    if(cat.length){
      var trouve = function(nom){ var n = norm(nom); return cat.find(function(p){ return p.n === n; }) || cat.find(function(p){ return n && (p.n.indexOf(n) >= 0 || n.indexOf(p.n) >= 0); }); };
      (B.produits_cites || []).forEach(function(nom){ if(String(nom).trim() && !trouve(nom)) bloq.push("Produit absent du catalogue : « " + nom + " »."); });
      var tout = textesMission(B).map(function(t){ return t[1]; }).join("\n");
      var nt = norm(tout);
      cat.forEach(function(p){
        var pos = nt.indexOf(p.n);
        while(pos >= 0){
          var suite = nt.slice(pos + p.n.length, pos + p.n.length + 40);
          var mp = /^[^\n€]*?(\d+(?:[.,]\d+)?)\s*€/.exec(suite);
          if(mp && p.pv != null && Math.abs(parseFloat(mp[1].replace(",", ".")) - Number(p.pv)) > 0.001){
            bloq.push("Prix de « " + p.nom + " » : " + p.pv + " € dans le catalogue, " + mp[1] + " € dans la mission.");
            break;
          }
          pos = nt.indexOf(p.n, pos + 1);
        }
      });
      // « MARQUE Nom-Inventé » (ex. un modèle qui n'existe pas) : le mot qui suit le nom de
      // l'entreprise, avec une majuscule, doit correspondre à un produit du catalogue
      var marque = (cfg().entreprise && cfg().entreprise.nom_court) || "";
      if(marque){
        var re = new RegExp(marque.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s+([A-Z][\\wÀ-ÿ-]*(?:\\s+[A-Z0-9][\\wÀ-ÿ-]*)?)", "g"), mm;
        var permis = ["sport", "connect", "outdoor", "auto", "mcv", "pro"];
        var vus = {};
        while((mm = re.exec(tout))){
          var nom = mm[1], premier = norm(nom.split(/\s+/)[0]);
          if(permis.indexOf(premier) >= 0 || vus[nom]) continue;
          vus[nom] = 1;
          if(!cat.some(function(p){ return p.n.indexOf(premier) >= 0; })) bloq.push("« " + marque + " " + nom + " » ressemble à un produit qui n'existe pas dans le catalogue.");
        }
      }
    }

    // Dates (jour de la semaine cohérent)
    var an0 = anScolaire();
    var reD = /\b(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(1er|\d{1,2})\s+(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)(?:\s+(\d{4}))?/g;
    var datesVues = {};
    textesMission(B).concat([["la saynète", ((B.saynete || {}).lignes || []).join(" ")]]).forEach(function(t){
      var n = norm(t[1]), d;
      reD.lastIndex = 0;
      while((d = reD.exec(n))){
        var jour = d[2] === "1er" ? 1 : parseInt(d[2], 10), mois = MOIS.indexOf(d[3]);
        var an = d[4] ? parseInt(d[4], 10) : (mois >= 7 ? an0 : an0 + 1);
        var dt = new Date(an, mois, jour);
        var cle = d[0];
        if(datesVues[cle]) continue; datesVues[cle] = 1;
        if(dt.getMonth() !== mois) bloq.push("Date impossible : « " + d[0] + " ».");
        else if(JOURS[dt.getDay()] !== d[1]) bloq.push("Date incohérente dans " + t[0] + " : le " + jour + " " + d[3] + " " + an + " est un " + JOURS[dt.getDay()] + ", pas un " + d[1] + ".");
      }
    });

    // Saynète et exercice (une animation propre à chaque mission)
    var s = B.saynete || {};
    var lignes = (s.lignes || []).map(function(l){ return String(l).trim(); }).filter(Boolean);
    if(!s.a || !String((s.a || {}).nom || "").trim() || lignes.length < 2) bloq.push("La saynète est incomplète (un personnage et au moins 2 lignes).");
    else {
      if(!/^fin\|/.test(lignes[lignes.length - 1])) bloq.push("La dernière ligne de la saynète doit commencer par « fin| » (ex. « fin|À toi : … »).");
      var malFormees = lignes.filter(function(l){ return !/^(a|n|fin)\|/.test(l); });
      if(malFormees.length) bloq.push("Ligne(s) de saynète sans préfixe valide (a| réplique, n| narration, fin| consigne) : « " + malFormees[0].slice(0, 40) + " ».");
      var connu = PERSOS && PERSOS[norm(s.a.nom)];
      if(!connu && !/client|cliente|président|presidente|responsable|directeur|directrice|gérant|gerante/i.test(s.a.role || "")) avert.push("« " + s.a.nom + " » n'est pas un personnage connu de l'entreprise : vérifie son nom et son rôle.");
    }
    var x = B.exercice || {};
    var cats = (x.categories || []).filter(function(c){ return String(c).trim(); });
    var items = (x.items || []).filter(function(it){ return String(it[0] || "").trim(); });
    if(cats.length < 2 || cats.length > 4) bloq.push("L'exercice doit avoir 2 à 4 catégories.");
    if(items.length < 3) bloq.push("L'exercice doit avoir au moins 3 phrases à classer.");
    if(items.some(function(it){ return !(it[1] >= 0 && it[1] < cats.length); })) bloq.push("Une phrase de l'exercice n'a pas de catégorie valide.");

    // Doublons
    (typeof MISSIONS !== "undefined" ? MISSIONS : []).forEach(function(m){
      if(m.comp !== B.comp || m.id === B.id || m.id === "BROUILLON") return;
      var sim = similarite((B.titre || "") + " " + (B.objectif || ""), (m.titre || "") + " " + (m.objectif || ""));
      if(sim >= 0.3) avert.push("Ressemble à la mission « " + m.titre + " » (palier " + m.palier + ") : vérifie que la situation est vraiment différente.");
    });
    if(textesMission(B).some(function(t){ return /[<>]/.test(t[1]); })) avert.push("Évite les caractères < et > (écris « inférieur à », « supérieur à »).");
    var uniq = function(l){ return l.filter(function(t, k){ return l.indexOf(t) === k; }); };
    return { bloq: uniq(bloq), avert: uniq(avert) };
  };

  // ─────────────────────────────────────────────
  //  Éditeur du brouillon
  // ─────────────────────────────────────────────
  function sauverBrouillon(){ try{ localStorage.setItem(CLE_BROUILLON, JSON.stringify(BROUILLON)); }catch(e){} }
  function lireBrouillon(){ try{ return JSON.parse(localStorage.getItem(CLE_BROUILLON) || "null"); }catch(e){ return null; } }
  function oublierBrouillon(){ try{ localStorage.removeItem(CLE_BROUILLON); }catch(e){} }

  function preparer(b){
    var B = copie(b);
    B.dossier = B.dossier || { l: "", rows: [] };
    B.dossier.rows = B.dossier.rows || [];
    B.activites = (B.activites || []).map(function(a){ return { t: a.t || "", q: (a.q || []).map(function(q){ return numeroter(q, 0, 0).replace(/^1\.1 {2}/, ""); }) }; });
    B.criteres = B.criteres || [];
    var s = B.saynete || {};
    B.saynete = { titre: s.titre || "", decor: s.decor || "bureau", a: (s.a && typeof s.a === "object") ? s.a : { nom: "", role: "", sexe: "h" }, b: "toi", lignes: s.lignes || [] };
    var x = B.exercice || {};
    B.exercice = { type: "tri", titre: x.titre || "", consigne: x.consigne || "", categories: x.categories || [], items: x.items || [] };
    B.produits_cites = B.produits_cites || [];
    return B;
  }
  // Mission prête à publier (questions numérotées, lignes vides retirées)
  function finaliser(B){
    var m = copie(B);
    m.dossier.rows = m.dossier.rows.filter(function(r){ return String(r[0] || "").trim() || String(r[1] || "").trim(); });
    m.activites = m.activites.map(function(a, i){
      return { t: a.t, q: a.q.filter(function(q){ return String(q).trim(); }).map(function(q, j){ return numeroter(q, i, j); }) };
    }).filter(function(a){ return a.q.length; });
    m.criteres = m.criteres.filter(function(c){ return String(c.c || "").trim(); });
    m.saynete.lignes = m.saynete.lignes.map(function(l){ return String(l).trim(); }).filter(Boolean);
    m.exercice.categories = m.exercice.categories.map(function(c){ return String(c).trim(); }).filter(Boolean);
    m.exercice.items = m.exercice.items.filter(function(it){ return String(it[0] || "").trim(); }).map(function(it){ return [it[0], parseInt(it[1], 10), it[2] || ""]; });
    if(!String(m.reflexivite_q || "").trim()) delete m.reflexivite_q;
    if(!String(m.contexte_pvoc || "").trim()) delete m.contexte_pvoc;
    delete m.id;
    return m;
  }

  function champ(label, chemin, valeur, opts){
    opts = opts || {};
    var attr = ' data-ch="' + esc(chemin) + '"';
    var input = opts.multi
      ? '<textarea' + attr + ' rows="' + (opts.rows || 3) + '">' + esc(valeur) + "</textarea>"
      : '<input' + attr + ' value="' + esc(valeur) + '"' + (opts.ph ? ' placeholder="' + esc(opts.ph) + '"' : "") + ">";
    return '<label class="mp-champ"><span>' + label + "</span>" + input + "</label>";
  }
  function bouton(txt, action, cls){ return '<button type="button" class="mp-btn ' + (cls || "") + '" data-act="' + esc(action) + '">' + txt + "</button>"; }

  function dessiner(){
    var zone = document.getElementById("gen-res");
    if(!zone || !BROUILLON) return;
    var B = BROUILLON;
    var decors = (indexerSaynetes(), DECORS);
    var h = '<div class="mp-ed">'
      + '<div class="mp-bandeau-brouillon">✏️ Brouillon — modifie ce que tu veux. Rien n\'est visible des élèves tant que tu n\'as pas publié.</div>'
      + '<div class="mp-meta">' + esc(codeC(B.comp)) + " — " + esc(B.comp_libelle || "") + " · Palier " + esc(B.palier) + " · " + esc(B.option) + "</div>"
      + '<div id="mp-verif"></div>'
      + '<div class="mp-sec"><div class="mp-sec-t">La mission</div>'
      + champ("Titre", "titre", B.titre)
      + champ("Objectif", "objectif", B.objectif, { multi: true, rows: 2 })
      + champ("Mise en situation (contexte)", "contexte", B.contexte, { multi: true, rows: 4 })
      + (B.option === "commun" ? champ("Mise en situation pour les classes PVOC (facultatif)", "contexte_pvoc", B.contexte_pvoc || "", { multi: true, rows: 3 }) : "")
      + "</div>"
      + '<div class="mp-sec"><div class="mp-sec-t">Dossier documentaire</div>'
      + champ("Titre du document", "dossier.l", B.dossier.l)
      + '<div class="mp-calc">🔢 L\'IA peut se tromper dans les calculs : refais chaque calcul que demandent les questions avec les chiffres ci-dessous.</div>'
      + B.dossier.rows.map(function(r, k){
          return '<div class="mp-ligne"><input data-ch="dossier.rows.' + k + '.0" value="' + esc(r[0]) + '" placeholder="Libellé">'
            + '<input data-ch="dossier.rows.' + k + '.1" value="' + esc(r[1]) + '" placeholder="Valeur">'
            + bouton("✕", "sup-row:" + k, "mp-x") + "</div>";
        }).join("")
      + bouton("+ Ajouter une ligne", "add-row", "mp-plus") + "</div>"
      + '<div class="mp-sec"><div class="mp-sec-t">Activités et questions</div>'
      + '<div class="mp-aide">Les questions sont numérotées automatiquement (1.1, 1.2…).</div>'
      + B.activites.map(function(a, i){
          return '<div class="mp-act"><div class="mp-ligne"><input data-ch="activites.' + i + '.t" value="' + esc(a.t) + '" placeholder="Titre de l\'activité ' + (i + 1) + '">' + bouton("✕", "sup-act:" + i, "mp-x") + "</div>"
            + a.q.map(function(q, j){
                return '<div class="mp-ligne"><span class="mp-num">' + (i + 1) + "." + (j + 1) + '</span><textarea rows="2" data-ch="activites.' + i + ".q." + j + '">' + esc(q) + "</textarea>" + bouton("✕", "sup-q:" + i + ":" + j, "mp-x") + "</div>";
              }).join("")
            + bouton("+ Question", "add-q:" + i, "mp-plus") + "</div>";
        }).join("")
      + bouton("+ Activité", "add-act", "mp-plus")
      + (B.palier >= 3 && B.option !== "2nde" ? champ("Question de réflexivité", "reflexivite_q", B.reflexivite_q || "", { multi: true, rows: 2 }) : "")
      + "</div>"
      + '<div class="mp-sec"><div class="mp-sec-t">Livrable et critères d\'évaluation</div>'
      + champ("Livrable", "livrable", B.livrable, { multi: true, rows: 2 })
      + B.criteres.map(function(c, k){
          return '<div class="mp-ligne"><input data-ch="criteres.' + k + '.c" value="' + esc(c.c) + '" placeholder="Critère">'
            + '<input class="mp-large" data-ch="criteres.' + k + '.i" value="' + esc(c.i) + '" placeholder="Je …">' + bouton("✕", "sup-crit:" + k, "mp-x") + "</div>";
        }).join("")
      + bouton("+ Critère", "add-crit", "mp-plus") + "</div>"
      + '<div class="mp-sec"><div class="mp-sec-t">Saynète (en tête de « La mission »)</div>'
      + champ("Titre de la scène", "saynete.titre", B.saynete.titre)
      + '<div class="mp-ligne"><label class="mp-champ"><span>Décor</span><select data-ch="saynete.decor">'
      + decors.map(function(d){ return '<option value="' + esc(d) + '"' + (d === B.saynete.decor ? " selected" : "") + ">" + esc(d) + "</option>"; }).join("")
      + "</select></label>" + champ("Personnage qui parle", "saynete.a.nom", B.saynete.a.nom) + champ("Son rôle", "saynete.a.role", B.saynete.a.role) + "</div>"
      + champ("Répliques (une par ligne) — a| le personnage · n| narration · fin| consigne finale « À toi : … »", "saynete.lignes", B.saynete.lignes.join("\n"), { multi: true, rows: 5 })
      + "</div>"
      + '<div class="mp-sec"><div class="mp-sec-t">Exercice (en tête de « Apprendre d\'abord »)</div>'
      + champ("Titre", "exercice.titre", B.exercice.titre)
      + champ("Consigne (situation voisine, jamais la réponse de la mission)", "exercice.consigne", B.exercice.consigne)
      + champ("Catégories (séparées par des points-virgules)", "exercice.categories", B.exercice.categories.join(" ; "))
      + B.exercice.items.map(function(it, k){
          return '<div class="mp-ligne"><input class="mp-large" data-ch="exercice.items.' + k + '.0" value="' + esc(it[0]) + '" placeholder="Phrase à classer">'
            + '<select data-ch="exercice.items.' + k + '.1">' + B.exercice.categories.map(function(c, ci){ return '<option value="' + ci + '"' + (ci === parseInt(it[1], 10) ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("") + "</select>"
            + '<input data-ch="exercice.items.' + k + '.2" value="' + esc(it[2]) + '" placeholder="Explication">' + bouton("✕", "sup-item:" + k, "mp-x") + "</div>";
        }).join("")
      + bouton("+ Phrase", "add-item", "mp-plus") + "</div>"
      + '<div class="mp-actions">'
      + bouton("👁 Voir comme un élève", "apercu", "mp-sec-btn")
      + bouton("Publier la mission", "publier", "mp-pub")
      + bouton("Abandonner ce brouillon", "abandon", "mp-sec-btn")
      + '<span id="mp-msg" class="mp-msg"></span></div>'
      + "</div>";
    zone.style.color = "";
    zone.style.fontStyle = "normal";
    zone.innerHTML = h;
    brancher(zone);
    verifierAffichage();
  }

  // Écrit une valeur à un chemin « a.b.0.1 »
  function ecrire(chemin, valeur){
    var p = chemin.split("."), o = BROUILLON;
    for(var k = 0; k < p.length - 1; k++) o = o[/^\d+$/.test(p[k]) ? parseInt(p[k], 10) : p[k]];
    var der = p[p.length - 1];
    if(chemin === "saynete.lignes") valeur = String(valeur).split("\n");
    if(chemin === "exercice.categories") valeur = String(valeur).split(";").map(function(c){ return c.trim(); });
    if(/^exercice\.items\.\d+\.1$/.test(chemin)) valeur = parseInt(valeur, 10);
    o[/^\d+$/.test(der) ? parseInt(der, 10) : der] = valeur;
  }
  var minuterie = null;
  function brancher(zone){
    zone.querySelectorAll("[data-ch]").forEach(function(el){
      el.addEventListener("input", function(){
        ecrire(el.getAttribute("data-ch"), el.value);
        sauverBrouillon();
        clearTimeout(minuterie); minuterie = setTimeout(verifierAffichage, 300);
      });
      // Les catégories de l'exercice alimentent les listes de choix : on redessine en quittant le champ
      if(el.getAttribute("data-ch") === "exercice.categories") el.addEventListener("change", dessiner);
    });
    zone.querySelectorAll("[data-act]").forEach(function(b){
      b.addEventListener("click", function(){ action(b.getAttribute("data-act")); });
    });
  }
  function action(a){
    var B = BROUILLON, p = a.split(":");
    var i = parseInt(p[1], 10), j = parseInt(p[2], 10);
    switch(p[0]){
      case "add-row": B.dossier.rows.push(["", ""]); break;
      case "sup-row": B.dossier.rows.splice(i, 1); break;
      case "add-act": B.activites.push({ t: "", q: [""] }); break;
      case "sup-act": if(confirm("Supprimer cette activité et ses questions ?")) B.activites.splice(i, 1); else return; break;
      case "add-q": B.activites[i].q.push(""); break;
      case "sup-q": B.activites[i].q.splice(j, 1); break;
      case "add-crit": B.criteres.push({ c: "", i: "Je " }); break;
      case "sup-crit": B.criteres.splice(i, 1); break;
      case "add-item": B.exercice.items.push(["", 0, ""]); break;
      case "sup-item": B.exercice.items.splice(i, 1); break;
      case "apercu": return apercu();
      case "publier": return publier();
      case "abandon":
        if(!confirm("Abandonner ce brouillon ? Il sera perdu.")) return;
        BROUILLON = null; oublierBrouillon();
        var z = document.getElementById("gen-res"); if(z){ z.innerHTML = "La mission générée apparaîtra ici…"; z.style.fontStyle = "italic"; }
        return;
    }
    sauverBrouillon();
    dessiner();
  }
  function verifierAffichage(){
    var box = document.getElementById("mp-verif");
    if(!box || !BROUILLON) return;
    var v = MP.verifier(finaliserPourVerif());
    var ok = !v.bloq.length;
    box.className = "mp-verif " + (ok ? (v.avert.length ? "mp-orange" : "mp-vert") : "mp-rouge");
    box.innerHTML = '<div class="mp-verif-t">' + (ok ? (v.avert.length ? "🟠 Publiable — " + v.avert.length + " point(s) à vérifier" : "✅ Contrôles automatiques réussis") : "🔴 " + v.bloq.length + " point(s) à corriger avant de publier") + "</div>"
      + v.bloq.map(function(t){ return '<div class="mp-v mp-v-r">• ' + esc(t) + "</div>"; }).join("")
      + v.avert.map(function(t){ return '<div class="mp-v mp-v-o">• ' + esc(t) + "</div>"; }).join("")
      + '<div class="mp-v mp-v-b">Contrôlés automatiquement : champs, structure, tutoiement, produits et prix du catalogue, dates, saynète, exercice, missions proches. À vérifier par toi : les calculs et le sens des questions.</div>';
    var pub = document.querySelector('.mp-ed [data-act="publier"]');
    if(pub){
      var admin = estAdminLocal();
      pub.disabled = !ok || !admin;
      pub.title = !admin ? "Seul l'administrateur peut publier une mission." : (!ok ? "Corrige d'abord les points en rouge." : "");
    }
  }
  function finaliserPourVerif(){
    var m = finaliser(BROUILLON);
    m.id = BROUILLON.id;
    return m;
  }

  function apercu(){
    var m = finaliser(BROUILLON);
    m.id = "BROUILLON";
    integrer(m);
    if(typeof voirMissionRecherche === "function") voirMissionRecherche("BROUILLON");
    else if(typeof openMission === "function") openMission("BROUILLON");
    // Le brouillon ne doit apparaître dans aucune liste
    var i = MISSIONS.findIndex(function(x){ return x.id === "BROUILLON"; });
    if(i >= 0) MISSIONS.splice(i, 1);
    try{ if(typeof RM_INDEX !== "undefined") RM_INDEX = null; }catch(e){}
  }

  function publier(){
    var msg = document.getElementById("mp-msg");
    var m = finaliser(BROUILLON);
    var v = MP.verifier(m);
    if(v.bloq.length){ if(msg) msg.textContent = "Corrige d'abord les points en rouge."; return; }
    if(!confirm("Publier « " + m.titre + " » ?\n\nElle sera visible dans « Chercher et assigner ». Les élèves la verront seulement quand tu la leur assigneras.")) return;
    var btn = document.querySelector('.mp-ed [data-act="publier"]');
    if(btn){ btn.disabled = true; btn.textContent = "Publication…"; }
    fetchJSON(LABORO_API + "/api/missions-publiees", {
      method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + jeton() },
      body: JSON.stringify({ mission: m })
    }).then(function(r){
      if(!r.ok || !r.data || !r.data.ok){
        if(btn){ btn.disabled = false; btn.textContent = "Publier la mission"; }
        if(msg) msg.textContent = "⚠️ " + ((r.data && r.data.erreur) || r.erreur || "Publication impossible.");
        return;
      }
      var pub = r.data.mission;
      integrer(pub);
      LISTE.unshift(pub);
      apresChargement();
      BROUILLON = null; oublierBrouillon();
      var zone = document.getElementById("gen-res");
      if(zone) zone.innerHTML = '<div class="mp-ok"><div class="mp-ok-t">✅ Mission publiée : « ' + esc(pub.titre) + " »</div>"
        + "<div>Elle est maintenant dans « Chercher et assigner ». Tes élèves la verront quand tu la leur assigneras.</div>"
        + '<div class="mp-actions">' + '<button type="button" class="mp-btn mp-pub" onclick="MP.assigner(\'' + esc(pub.id) + '\')">Assigner →</button>'
        + '<button type="button" class="mp-btn mp-sec-btn" onclick="voirMissionRecherche(\'' + esc(pub.id) + '\')">👁 Voir</button></div></div>';
    });
  }

  // Ouvert par genMission() quand l'IA a rendu son brouillon
  MP.ouvrirEditeur = function(b){
    BROUILLON = preparer(b);
    sauverBrouillon();
    dessiner();
    var zone = document.getElementById("gen-res");
    if(zone && zone.scrollIntoView) zone.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  MP.brouillonEnCours = function(){ return !!BROUILLON; };
  MP.reprendreBrouillon = function(){
    var b = lireBrouillon(); if(!b) return;
    BROUILLON = b; dessiner();
  };

  // ─────────────────────────────────────────────
  //  Liste des missions publiées (sous le générateur)
  // ─────────────────────────────────────────────
  function carteListe(){
    var panneau = document.getElementById("panel-generation");
    if(!panneau) return null;
    var c = document.getElementById("mp-liste");
    if(!c){
      c = document.createElement("div");
      c.id = "mp-liste"; c.className = "card";
      panneau.appendChild(c);
    }
    return c;
  }
  function renderListePubliees(){
    var c = carteListe(); if(!c) return;
    // Reprendre un brouillon resté en cours (page fermée, autre jour…)
    var enCours = !BROUILLON && lireBrouillon();
    var reprise = document.getElementById("mp-reprise");
    var res = document.getElementById("gen-res");
    if(enCours && res && !reprise){
      reprise = document.createElement("div"); reprise.id = "mp-reprise"; reprise.className = "mp-reprise";
      reprise.innerHTML = "📝 Un brouillon n'est pas terminé : « " + esc(enCours.titre || "sans titre") + " ». "
        + '<button type="button" class="mp-btn mp-sec-btn">Le reprendre</button>';
      reprise.querySelector("button").onclick = function(){ reprise.remove(); MP.reprendreBrouillon(); };
      res.parentNode.insertBefore(reprise, res);
    }
    var admin = estAdminLocal();
    if(!LISTE.length){
      c.innerHTML = '<div class="ct">Missions publiées</div><div class="mp-aide">Aucune pour l\'instant. Génère une mission, relis-la, puis publie-la : elle apparaîtra ici et dans « Chercher et assigner ».</div>';
      return;
    }
    c.innerHTML = '<div class="ct">Missions publiées (' + LISTE.length + ")</div>"
      + LISTE.map(function(m){
          var ret = m.statut === "retiree";
          var d = m.created_at ? new Date(m.created_at).toLocaleDateString("fr-FR") : "";
          return '<div class="mp-pub-l' + (ret ? " mp-retiree" : "") + '"><div><div class="mp-pub-titre">✨ ' + esc(m.titre) + (ret ? " <em>(retirée)</em>" : "") + "</div>"
            + '<div class="mp-aide">' + esc(codeC(m.comp)) + " · Palier " + esc(m.palier) + " · " + esc(m.option) + (d ? " · publiée le " + d : "")
            + " · " + (m.nb_copies || 0) + " copie(s) rendue(s)" + (m.nb_assignations ? " · assignée actuellement" : "") + "</div></div>"
            + '<div class="mp-pub-b"><button type="button" class="mp-btn mp-sec-btn" onclick="voirMissionRecherche(\'' + esc(m.id) + '\')">👁 Voir</button>'
            + (ret ? "" : '<button type="button" class="mp-btn mp-sec-btn" onclick="MP.assigner(\'' + esc(m.id) + '\')">Assigner →</button>')
            + (admin ? '<button type="button" class="mp-btn mp-sec-btn" data-statut="' + esc(m.id) + '" data-vers="' + (ret ? "publiee" : "retiree") + '">' + (ret ? "Remettre en service" : "Retirer") + "</button>" : "")
            + "</div></div>";
        }).join("")
      + '<div class="mp-aide" id="mp-liste-msg"></div>';
    c.querySelectorAll("[data-statut]").forEach(function(b){
      b.onclick = function(){
        var id = b.getAttribute("data-statut"), vers = b.getAttribute("data-vers");
        if(vers === "retiree" && !confirm("Retirer cette mission ? Elle ne sera plus proposée ; les copies déjà rendues restent consultables.")) return;
        fetchJSON(LABORO_API + "/api/missions-publiees/" + encodeURIComponent(id) + "/statut", {
          method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + jeton() },
          body: JSON.stringify({ statut: vers })
        }).then(function(r){
          var info = document.getElementById("mp-liste-msg");
          if(!r.ok || !r.data || !r.data.ok){ if(info) info.textContent = "⚠️ " + ((r.data && r.data.erreur) || r.erreur || "Échec."); return; }
          LISTE.forEach(function(m){ if(m.id === id) m.statut = r.data.statut; });
          var mm = MISSIONS.find(function(m){ return m.id === id; }); if(mm) mm.statut = r.data.statut;
          apresChargement();
        });
      };
    });
  }
  MP.renderListe = renderListePubliees;
  // « Assigner → » : ouvre « Chercher et assigner » sur cette mission, avec le choix de la cible
  MP.assigner = function(id){
    var m = (typeof MISSIONS !== "undefined") ? MISSIONS.find(function(x){ return x.id === id; }) : null;
    if(!m || typeof goP !== "function") return;
    goP("recherche", document.getElementById("ni-rm"));
    var q = document.getElementById("rm-q");
    if(q) q.value = m.titre;
    ["rm-pal", "rm-comp", "rm-niv"].forEach(function(f){ var el = document.getElementById(f); if(el) el.value = ""; });
    if(typeof lancerRechercheMissions === "function") lancerRechercheMissions();
    setTimeout(function(){ if(typeof assignerMissionRecherche === "function") assignerMissionRecherche(id); }, 150);
  };

  // Styles de l'éditeur (une seule fois)
  (function styles(){
    if(document.getElementById("mp-style")) return;
    var st = document.createElement("style"); st.id = "mp-style";
    st.textContent = ".mp-ed{background:#fff;border:.5px solid var(--gb,#E5E7EB);border-radius:10px;padding:16px;font-style:normal;color:var(--gr,#111827)}"
      + ".mp-bandeau-brouillon{font-size:12px;font-weight:700;color:var(--am,#B45309);background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:8px 10px;margin-bottom:8px}"
      + ".mp-meta{font-size:11px;color:var(--gm,#6B7280);margin-bottom:10px}"
      + ".mp-sec{border-top:.5px solid var(--gb,#E5E7EB);padding-top:12px;margin-top:12px}"
      + ".mp-sec-t{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--gm,#6B7280);margin-bottom:8px}"
      + ".mp-champ{display:block;margin-bottom:8px;flex:1}.mp-champ span{display:block;font-size:11px;font-weight:700;color:var(--gm,#6B7280);margin-bottom:3px}"
      + ".mp-ed input,.mp-ed textarea,.mp-ed select{width:100%;box-sizing:border-box;font:inherit;font-size:13px;padding:7px 9px;border:.5px solid var(--gb,#D1D5DB);border-radius:6px;background:#fff;color:inherit}"
      + ".mp-ed textarea{resize:vertical;line-height:1.4}"
      + ".mp-ligne{display:flex;gap:6px;align-items:flex-start;margin-bottom:6px}.mp-ligne>input,.mp-ligne>textarea{flex:1}.mp-ligne>.mp-large{flex:2}.mp-ligne>select{flex:0 0 170px}"
      + ".mp-num{flex:0 0 30px;font-size:12px;font-weight:800;padding-top:8px;color:var(--gm,#6B7280)}"
      + ".mp-act{background:var(--gc,#F9FAFB);border-radius:8px;padding:8px;margin-bottom:8px}"
      + ".mp-btn{font:inherit;font-size:12px;font-weight:700;border-radius:6px;padding:7px 12px;cursor:pointer;border:.5px solid var(--gb,#D1D5DB);background:#fff;color:inherit}"
      + ".mp-btn:disabled{opacity:.45;cursor:not-allowed}.mp-x{flex:0 0 auto;padding:6px 9px;color:#B91C1C}.mp-plus{color:var(--bl,#1D4ED8);margin-bottom:6px}"
      + ".mp-pub{background:var(--bl,#1D4ED8);color:#fff;border-color:transparent}.mp-sec-btn{background:#fff}"
      + ".mp-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:14px}.mp-msg{font-size:12px;color:#B91C1C}"
      + ".mp-verif{border-radius:8px;padding:10px 12px;margin-bottom:6px;font-size:12px}.mp-verif-t{font-weight:800;margin-bottom:4px}"
      + ".mp-rouge{background:#FEF2F2;border:1px solid #FECACA}.mp-orange{background:#FFFBEB;border:1px solid #FDE68A}.mp-vert{background:#ECFDF5;border:1px solid #A7F3D0}"
      + ".mp-v{padding:1px 0}.mp-v-r{color:#B91C1C}.mp-v-o{color:#92400E}.mp-v-b{color:var(--gm,#6B7280);margin-top:6px;font-size:11px}"
      + ".mp-calc{font-size:12px;background:#EFF6FF;border:1px solid #BFDBFE;color:#1E40AF;border-radius:6px;padding:6px 9px;margin-bottom:8px}"
      + ".mp-aide{font-size:11px;color:var(--gm,#6B7280);margin-bottom:6px}"
      + ".mp-ok{background:#ECFDF5;border:1px solid #A7F3D0;border-radius:10px;padding:14px;font-style:normal;color:var(--gr,#111827);font-size:13px}.mp-ok-t{font-weight:800;margin-bottom:4px}"
      + ".mp-reprise{font-size:12px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:8px 10px;margin:10px 0;display:flex;gap:10px;align-items:center;flex-wrap:wrap}"
      + ".mp-pub-l{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:10px 0;border-top:.5px solid var(--gb,#E5E7EB)}.mp-pub-titre{font-size:13px;font-weight:700}"
      + ".mp-pub-b{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.mp-retiree{opacity:.6}";
    document.head.appendChild(st);
  })();
})();
