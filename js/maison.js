// ================================================
//   LABORO — Moteur commun : « mission à terminer à la maison » (29/09/2026)
//   Chargé après auth.js, missions.js, dashboard.js et brouillons-serveur.js.
//
//   L'enseignant peut assigner une mission « à terminer à la maison jusqu'au… ».
//   En dehors des horaires d'ouverture, l'élève concerné peut se connecter, mais
//   ne voit QUE cette ou ces missions (écran dédié) ; le serveur refuse tout le
//   reste. À l'échéance, ou quand la mission est terminée, l'accès se referme.
//   Pendant les horaires normaux, rien ne change (simple mention « 🏠 » dans
//   les missions demandées par le professeur).
// ================================================
(function(){
  let MAISON = null;          // { missions: [...] } quand le mode maison est actif
  let minuterie = null;

  function estEleve(){ return typeof CU !== 'undefined' && CU && CU.classe !== 'enseignant' && !!localStorage.getItem('laboro_token'); }
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // « jeudi 2 octobre à 8h00 »
  window.dateMaisonLisible = function(iso){
    const d = new Date(iso);
    if(isNaN(d)) return '';
    return d.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' })
      + ' à ' + d.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }).replace(':', 'h');
  };

  function ecran(){
    let e = document.getElementById('maison-ecran');
    if(!e){
      e = document.createElement('div');
      e.id = 'maison-ecran';
      e.style.cssText = 'position:fixed;inset:0;z-index:900;background:var(--th-voile,#F7F6F2);overflow-y:auto;padding:32px 16px';
      document.body.appendChild(e);
    }
    return e;
  }

  function afficher(){
    if(!MAISON) return;
    const ud = (typeof gUD === 'function') ? gUD() : { missions:{} };
    const cartes = MAISON.missions.map(function(x){
      const m = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(y){ return y.id === x.mission_id; }) : null;
      const bloquee = m && typeof isPalierUnlocked === 'function' && !isPalierUnlocked(m, ud);
      return '<div style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:14px 16px;margin-bottom:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">'
        + '<div style="flex:1;min-width:200px"><div style="font-weight:800;font-size:14px;margin-bottom:3px">' + esc((m && m.titre) || x.titre) + '</div>'
        + '<div style="font-size:12px;color:#4A5568">' + esc(x.comp_id) + ' · Palier ' + esc(x.palier) + ' · à terminer avant ' + esc(dateMaisonLisible(x.jusqu_a)) + '</div></div>'
        + (bloquee
            ? '<div style="font-size:12px;color:#92400E;background:#FFFBEA;border-radius:8px;padding:6px 10px">🔒 Palier pas encore débloqué pour toi</div>'
            : (x.termine ? '<div style="font-size:12px;color:#166534;background:#DCFCE7;border-radius:8px;padding:6px 10px">✅ Terminée</div>' : '')
              + '<button onclick="openMission(\'' + x.mission_id + '\')" style="padding:9px 18px;background:' + (x.termine ? '#4A5568' : 'var(--th-principal,#B5651D)') + ';color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer">' + (x.termine ? 'Relire mon feedback' : 'Ouvrir la mission') + '</button>')
        + '</div>';
    }).join('');
    ecran().innerHTML = '<div style="max-width:720px;margin:0 auto">'
      + '<div style="font-size:30px;margin-bottom:6px">🏠</div>'
      + '<h2 style="font-size:20px;margin:0 0 6px">Mission à terminer à la maison</h2>'
      + '<p style="font-size:13px;color:#4A5568;line-height:1.55;margin:0 0 18px">' + esc(getNomPlateformeMaison()) + ' est fermé à cette heure-ci, mais ton professeur t\'a donné '
      + (MAISON.missions.length > 1 ? 'ces missions' : 'cette mission') + ' à terminer chez toi. Tu ne peux travailler que sur '
      + (MAISON.missions.length > 1 ? 'elles' : 'elle') + ' jusqu\'à l\'échéance. Les règles restent les mêmes qu\'en classe : travail personnel, sans assistant IA.</p>'
      + (MAISON.missions.every(function(x){ return x.termine; }) ? '<p style="font-size:13px;color:#166534;background:#DCFCE7;border-radius:8px;padding:10px 12px;margin:0 0 16px">Bravo, tu as terminé ! Tu peux relire ton feedback pendant encore quelques minutes, puis l\'accès se refermera jusqu\'au prochain cours.</p>' : '')
      + cartes
      + '<button onclick="doLogout()" style="margin-top:8px;background:none;border:1px solid #CBD5E0;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;color:#4A5568">Se déconnecter</button>'
      + '</div>';
    ecran().style.display = 'block';
  }
  function getNomPlateformeMaison(){
    try{ return (getCfg().nom_plateforme) || 'LABORO'; }catch(e){ return 'LABORO'; }
  }

  function activer(m){ MAISON = m; document.body.classList.add('mode-maison'); afficher(); }
  function desactiver(){
    MAISON = null; document.body.classList.remove('mode-maison');
    const e = document.getElementById('maison-ecran'); if(e) e.style.display = 'none';
  }

  // Interroge le serveur : hors horaires ? missions à la maison ?
  async function verifier(){
    if(!estEleve()){ desactiver(); return; }
    const r = await fetchJSON(LABORO_API + '/api/mission-du-jour/moi', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('laboro_token') } });
    // (si l'accès est complètement fermé, fetchJSON affiche déjà l'écran de fermeture)
    if(!r.ok || !r.data || !r.data.ok) return;
    if(r.data.hors_horaires && r.data.mode_maison && r.data.mode_maison.missions && r.data.mode_maison.missions.length) activer(r.data.mode_maison);
    else desactiver();
  }

  // Pendant le mode maison, seules les missions données à la maison s'ouvrent
  if(typeof window.openMission === 'function'){
    const orig = window.openMission;
    window.openMission = function(id){
      if(MAISON && !MAISON.missions.some(function(x){ return x.mission_id === id; })){
        alert('En dehors des horaires, tu peux seulement travailler sur la mission à terminer à la maison.');
        return;
      }
      return orig.apply(this, arguments);
    };
  }
  // Fermeture de la mission : l'écran se met à jour (mission terminée → elle disparaît)
  if(typeof window.closeMo === 'function'){
    const orig = window.closeMo;
    window.closeMo = function(){
      const r = orig.apply(this, arguments);
      if(MAISON) setTimeout(verifier, 300);
      return r;
    };
  }

  if(typeof window.showApp === 'function'){
    const orig = window.showApp;
    window.showApp = function(){
      const r = orig.apply(this, arguments);
      if(estEleve()){
        verifier();
        clearInterval(minuterie);
        minuterie = setInterval(function(){ if(!document.hidden) verifier(); }, 2 * 60 * 1000);
      } else desactiver();
      return r;
    };
  }
  if(typeof window.doLogout === 'function'){
    const orig = window.doLogout;
    window.doLogout = function(){ clearInterval(minuterie); desactiver(); return orig.apply(this, arguments); };
  }
})();
