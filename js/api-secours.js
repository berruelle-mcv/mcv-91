// ================================================
//   LABORO — Moteur commun : adresse de secours du serveur
//   Identique dans tous les univers. Chargé juste après js/univers-config.js.
//
//   Si l'adresse habituelle du serveur (LABORO_CONFIG.api) ne répond pas
//   — par exemple quand le réseau d'un lycée bloque Cloudflare —, toutes les
//   demandes au serveur passent automatiquement par l'adresse de secours
//   (LABORO_CONFIG.api_secours). Le même serveur répond aux deux adresses :
//   rien ne change pour l'élève ni pour l'enseignant.
//   Sans api_secours dans data/univers.js, ce fichier ne fait rien.
// ================================================
(function () {
  var cfg = window.LABORO_CONFIG || {};
  var P = String(cfg.api || '').replace(/\/+$/, '');
  var S = String(cfg.api_secours || '').replace(/\/+$/, '');
  if (!P || !S || P === S || typeof window.fetch !== 'function') return;

  var fetchOrigine = window.fetch.bind(window);
  var CLE = 'laboro_api_mode';
  function lire() { try { return localStorage.getItem(CLE); } catch (e) { return null; } }
  function ecrire(v) { try { localStorage.setItem(CLE, v); } catch (e) {} }

  // Teste une adresse (4 s maximum)
  function sonder(base) {
    var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
    var minuteur = setTimeout(function () { if (ctrl) ctrl.abort(); }, 4000);
    return fetchOrigine(base + '/api/ping', { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { clearTimeout(minuteur); return !!(r && r.ok); })
      .catch(function () { clearTimeout(minuteur); return false; });
  }

  // Mode retenu la dernière fois sur ce poste (pour ne pas attendre à chaque page)
  var mode = (lire() === 'secours') ? 'secours' : 'principal';
  function verifier() {
    return sonder(P).then(function (ok) {
      mode = ok ? 'principal' : 'secours';
      ecrire(mode);
      if (window.console) console.info('[LABORO] Serveur joint par l\'adresse ' + (ok ? 'habituelle' : 'de secours') + '.');
      return mode;
    });
  }
  var pret = verifier();
  // En mode secours, on revérifie l'adresse habituelle toutes les 5 minutes
  setInterval(function () { if (mode === 'secours') verifier(); }, 5 * 60 * 1000);

  function versSecours(url) { return S + url.slice(P.length); }

  window.fetch = function (entree, options) {
    var url = (typeof entree === 'string') ? entree : (entree && entree.url);
    if (typeof url !== 'string' || url.indexOf(P) !== 0) return fetchOrigine(entree, options);

    var methode = String((options && options.method) || (entree && entree.method) || 'GET').toUpperCase();
    // Poste déjà connu en mode secours : on n'attend pas la vérification
    var attente = (mode === 'secours') ? Promise.resolve() : pret;

    return attente.then(function () {
      if (mode === 'secours') return fetchOrigine(versSecours(url), options);
      return fetchOrigine(entree, options).catch(function (err) {
        // L'adresse habituelle ne répond plus : on bascule
        mode = 'secours';
        ecrire(mode);
        // Une lecture (GET) est relancée tout de suite par l'adresse de secours.
        // Un envoi (copie, réglage…) ne l'est pas, pour ne jamais l'enregistrer deux fois :
        // le prochain clic passera par l'adresse de secours.
        if (methode === 'GET' || methode === 'HEAD') return fetchOrigine(versSecours(url), options);
        throw err;
      });
    });
  };
})();
