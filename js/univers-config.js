// ================================================
//   LABORO — Moteur commun : application des réglages de l'univers
//   Source unique : data/univers.js (chargé juste avant ce fichier).
//   Identique dans tous les univers — ne rien y mettre de propre à un univers.
// ================================================
var LABORO_CONFIG = window.LABORO_CONFIG || null; // défini par data/univers.js

// Applique LABORO_CONFIG au DOM (marque, ville, responsable, couleurs…).
// Appelée dans tous les cas (même si data/univers.js manque), pour garantir que les éléments masqués par .cfg-pending
// sont TOUJOURS révélés, quoi qu'il arrive — jamais de texte figé caché.
function applyConfig() {
  document.title = LABORO_CONFIG.nom_plateforme || 'LABORO';
  const vEls = document.querySelectorAll('#app-version, #tb-version');
  vEls.forEach(el => { if(el) el.textContent = 'v' + LABORO_CONFIG.version; });
  const ent = LABORO_CONFIG.entreprise || {};
  const perso = LABORO_CONFIG.personnages || {};
  const resp = perso.responsable || {};
  const nomEnt = ent.nom || 'LABORO';
  const villeEnt = ent.ville || 'Essonne';
  const secteur = ent.secteur || 'Plateforme pédagogique';
  const nomResp = (resp.prenom || 'Votre') + ' ' + (resp.nom || 'responsable');
  const posteResp = resp.poste || 'Responsable';
  const setTxt = (id, txt) => { const el = document.getElementById(id); if(el) { el.textContent = txt; el.classList.remove('cfg-pending'); } };
  setTxt('cfg-brand', nomEnt);
  setTxt('cfg-brand-sub', villeEnt + ' · Essonne (91)');
  setTxt('cfg-lv', secteur + ' · ' + villeEnt);
  setTxt('cfg-entreprise-sub', secteur + ' · ' + villeEnt + ' (91)');
  setTxt('msg-f', nomResp + ' — ' + posteResp);
  setTxt('mo-m', nomEnt);
  const nomPlateforme = LABORO_CONFIG.nom_plateforme || 'LABORO';
  const nomPlateformeHtml = (() => {
    const parts = nomPlateforme.split(' ');
    if(parts.length < 2) return nomPlateforme;
    const base = parts[0];
    const suffixe = parts.slice(1).join(' ');
    return base + ' <i style="font-style:italic;text-transform:uppercase">' + suffixe + '</i>';
  })();
  window.applyNomPlateforme = function() {
    ['cfg-nom-plateforme','cfg-nom-plateforme-2','cfg-nom-plateforme-3','cfg-nom-plateforme-4'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.innerHTML = nomPlateformeHtml;
    });
    document.querySelectorAll('.btn-li').forEach(el => {
      if(el.textContent.includes('LABORO') || el.textContent.includes('Se connecter')) el.textContent = 'Se connecter à ' + nomPlateforme + ' →';
    });
  };
  if(document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(window.applyNomPlateforme, 100);
  } else {
    window.addEventListener('load', window.applyNomPlateforme);
  }
  if (LABORO_CONFIG.couleurs) {
    document.documentElement.style.setProperty('--laboro-primary', LABORO_CONFIG.couleurs.primaire);
    document.documentElement.style.setProperty('--laboro-secondary', LABORO_CONFIG.couleurs.secondaire);
  }
}

async function loadConfig() {
  if (!LABORO_CONFIG) {
    // data/univers.js n'a pas pu être chargé : le bandeau d'erreur s'affiche (ci-dessous) ;
    // valeurs neutres pour que la page reste lisible.
    console.warn('[LABORO] data/univers.js introuvable — valeurs par défaut utilisées');
    LABORO_CONFIG = { filiere: 'laboro', version: '—', nom_plateforme: 'LABORO', entreprise: { nom: 'LABORO', ville: 'Essonne' } };
  }
  applyConfig();
}

window.addEventListener('error', function(e) {
  if(e.target && e.target.tagName === 'SCRIPT' && e.target.src) {
    const src = e.target.src;
    const fichier = src.split('/').pop();
    console.error('[LABORO] Échec chargement :', fichier);
    const existing = document.getElementById('laboro-error-banner');
    if(!existing) {
      const banner = document.createElement('div');
      banner.id = 'laboro-error-banner';
      banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:#DC2626;color:#fff;padding:12px 20px;font-family:Arial,sans-serif;font-size:13px;font-weight:600;display:flex;align-items:center;gap:12px;';
      banner.innerHTML = "⚠️ Erreur de chargement — Le fichier <strong>" + fichier + "</strong> n'a pas pu être chargé. Vérifiez votre connexion et rechargez la page. &nbsp;<button onclick='location.reload()' style='background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:12px'>Recharger</button>";
      document.body.appendChild(banner);
    }
  }
}, true);

document.addEventListener('DOMContentLoaded', loadConfig);
