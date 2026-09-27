// ================================================
//   LABORO — Moteur commun : brouillons des élèves sauvegardés sur le serveur
//   Chargé après missions.js, correction-serveur.js et auth.js.
//
//   Avant : les réponses en cours n'étaient gardées que dans le navigateur
//   (localStorage) → perdues en changeant de poste OU de navigateur.
//   Maintenant : chaque saisie est aussi envoyée au serveur (2,5 s après
//   la dernière frappe), et récupérée à la connexion sur n'importe quel
//   poste / navigateur. La copie locale reste en place (secours hors ligne).
//
//   Règle de fusion à la connexion, mission par mission :
//   - modifications locales pas encore envoyées → le local gagne (et part au serveur)
//   - sinon, si le serveur a une version plus récente → elle remplace le local
//   - missions déjà validées → jamais touchées
// ================================================

(function(){
  const DELAI_MS = 2500;
  const minuteries = {};   // mission_id -> timer
  const versions = {};     // mission_id -> compteur de modifications (évite d'effacer un "à envoyer" trop tôt)

  function jeton(){ try{ return localStorage.getItem('laboro_token'); }catch(e){ return null; } }
  function apiBase(){ return LABORO_API; }
  function estEleve(){ return typeof CU !== 'undefined' && CU && CU.classe !== 'enseignant' && !!jeton(); }

  // ─── Petit indicateur dans la fenêtre de mission ──────────────
  function indicateur(texte, couleur){
    const act = document.querySelector('#mo .mo-act');
    if(!act) return;
    let el = document.getElementById('brouillon-etat');
    if(!el){
      el = document.createElement('span');
      el.id = 'brouillon-etat';
      el.style.cssText = 'font-size:11px;flex-basis:100%;order:99;min-height:14px';
      act.appendChild(el);
    }
    el.textContent = texte;
    el.style.color = couleur || 'var(--gm,#6B7280)';
  }

  // ─── Envoi d'un brouillon ─────────────────────────────────────
  async function envoyer(mid, surDepart){
    if(!estEleve()) return;
    const ud = gUD();
    const m = ud.missions && ud.missions[mid];
    if(!m || !m.reponses || m.status === 'done') return;
    const versionEnvoyee = versions[mid] || 0;
    if(!surDepart && typeof CM !== 'undefined' && CM && CM.id === mid) indicateur('Enregistrement…');
    try{
      const r = await fetch(apiBase() + '/api/brouillons/' + encodeURIComponent(mid), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jeton() },
        body: JSON.stringify({ reponses: m.reponses }),
        keepalive: !!surDepart
      });
      const d = await r.json().catch(function(){ return {}; });
      if(!r.ok || !d.ok) throw new Error(d.erreur || ('HTTP ' + r.status));
      // Marquer "synchronisé" seulement si rien n'a été retapé entre-temps
      if((versions[mid] || 0) === versionEnvoyee){
        const ud2 = gUD();
        if(ud2.missions[mid]){
          ud2.missions[mid].brouillon_a_envoyer = false;
          ud2.missions[mid].brouillon_serveur_maj = d.updated_at;
          sUD(ud2);
        }
      }
      if(typeof CM !== 'undefined' && CM && CM.id === mid){
        const h = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        indicateur('✓ Sauvegardé sur le serveur à ' + h, '#2E7D5E');
      }
    }catch(e){
      if(typeof CM !== 'undefined' && CM && CM.id === mid){
        indicateur('⚠ Sauvegardé sur ce poste seulement — nouvel essai automatique', '#B45309');
      }
    }
  }

  function programmer(mid){
    clearTimeout(minuteries[mid]);
    minuteries[mid] = setTimeout(function(){ delete minuteries[mid]; envoyer(mid, false); }, DELAI_MS);
  }

  function envoyerTout(surDepart){
    Object.keys(minuteries).forEach(function(mid){
      clearTimeout(minuteries[mid]); delete minuteries[mid];
      envoyer(mid, surDepart);
    });
  }

  // ─── Branchements sur les fonctions existantes ────────────────
  if(typeof window.autoSaveRep === 'function'){
    const orig = window.autoSaveRep;
    window.autoSaveRep = function(mid, qid, el){
      orig.apply(this, arguments);
      if(!estEleve()) return;
      versions[mid] = (versions[mid] || 0) + 1;
      const ud = gUD();
      if(ud.missions[mid] && !ud.missions[mid].brouillon_a_envoyer){
        ud.missions[mid].brouillon_a_envoyer = true;
        sUD(ud);
      }
      programmer(mid);
    };
  }

  // "Continuer la prochaine fois" : envoi immédiat
  if(typeof window.sauvegarderEtFermer === 'function'){
    const orig = window.sauvegarderEtFermer;
    window.sauvegarderEtFermer = function(){
      const mid = (typeof CM !== 'undefined' && CM) ? CM.id : null;
      orig.apply(this, arguments);
      if(mid && minuteries[mid]){ clearTimeout(minuteries[mid]); delete minuteries[mid]; }
      if(mid) envoyer(mid, false);
    };
  }

  // Soumission : annuler l'envoi en attente (le serveur efface le brouillon après correction)
  if(typeof window.soumettreReponses === 'function'){
    const orig = window.soumettreReponses;
    window.soumettreReponses = async function(){
      const mid = (typeof CM !== 'undefined' && CM) ? CM.id : null;
      if(mid && minuteries[mid]){ clearTimeout(minuteries[mid]); delete minuteries[mid]; }
      const res = await orig.apply(this, arguments);
      if(mid){
        const ud = gUD();
        const m = ud.missions[mid];
        // Soumission réussie = statut passé à "att" ou "done" → plus rien à envoyer
        if(m && (m.status === 'att' || m.status === 'done')){
          m.brouillon_a_envoyer = false;
          sUD(ud);
          const el = document.getElementById('brouillon-etat'); if(el) el.textContent = '';
        }
      }
      return res;
    };
  }

  // "Recommencer" : effacer aussi le brouillon du serveur
  if(typeof window.resetMission === 'function'){
    const orig = window.resetMission;
    window.resetMission = function(){
      const mid = (typeof CM !== 'undefined' && CM) ? CM.id : null;
      const avant = mid ? JSON.stringify((gUD().missions || {})[mid] || null) : null;
      orig.apply(this, arguments);
      if(!mid || !estEleve()) return;
      const apres = JSON.stringify((gUD().missions || {})[mid] || null);
      if(avant === apres) return; // l'élève a annulé la confirmation
      if(minuteries[mid]){ clearTimeout(minuteries[mid]); delete minuteries[mid]; }
      fetch(apiBase() + '/api/brouillons/' + encodeURIComponent(mid), {
        method: 'DELETE', headers: { 'Authorization': 'Bearer ' + jeton() }
      }).catch(function(){});
    };
  }

  // Fenêtre de mission rouverte : effacer l'ancien état affiché
  if(typeof window.openMission === 'function'){
    const orig = window.openMission;
    window.openMission = function(){
      const r = orig.apply(this, arguments);
      const el = document.getElementById('brouillon-etat'); if(el) el.textContent = '';
      return r;
    };
  }

  // Onglet fermé / page quittée : dernier envoi
  window.addEventListener('pagehide', function(){ envoyerTout(true); });
  document.addEventListener('visibilitychange', function(){ if(document.hidden) envoyerTout(true); });

  // ─── Récupération à la connexion ──────────────────────────────
  async function recupererBrouillons(){
    if(!estEleve()) return;
    let d;
    try{
      const r = await fetch(apiBase() + '/api/brouillons', { headers: { 'Authorization': 'Bearer ' + jeton() } });
      d = await r.json();
      if(!d.ok || !d.brouillons) return;
    }catch(e){ return; }

    const ud = gUD();
    let change = false;
    Object.keys(d.brouillons).forEach(function(mid){
      const serv = d.brouillons[mid];
      const local = ud.missions[mid];
      if(local && local.status === 'done') return;
      if(local && local.brouillon_a_envoyer) return; // le local, plus récent, sera envoyé juste après
      if(local && local.brouillon_serveur_maj && local.brouillon_serveur_maj >= serv.updated_at) return;
      const base = local || { status: 'todo', id: mid };
      base.reponses = serv.reponses || {};
      base.brouillon_serveur_maj = serv.updated_at;
      base.brouillon_a_envoyer = false;
      if(base.status === 'todo' && Object.values(base.reponses).join('').length >= 15) base.status = 'wip';
      ud.missions[mid] = base;
      change = true;
    });
    if(change){
      sUD(ud);
      if(typeof renderDashboard === 'function') try{ renderDashboard(); }catch(e){}
      if(typeof renderMissions === 'function') try{ renderMissions(); }catch(e){}
      // Mission déjà ouverte (clic très rapide après connexion) et rien tapé depuis :
      // la réafficher avec les réponses récupérées
      const mo = document.getElementById('mo');
      if(typeof CM !== 'undefined' && CM && d.brouillons[CM.id] && mo && mo.classList.contains('open')
         && !(ud.missions[CM.id] && ud.missions[CM.id].brouillon_a_envoyer)){
        try{ window.openMission(CM.id); }catch(e){}
      }
    }

    // Renvoyer ce qui a été tapé sur ce poste sans avoir pu partir au serveur
    Object.keys(ud.missions || {}).forEach(function(mid){
      const m = ud.missions[mid];
      if(m && m.brouillon_a_envoyer && m.status !== 'done') envoyer(mid, false);
    });
  }

  // À chaque entrée dans l'application (connexion normale, premier passage
  // sur un nouveau navigateur après la charte/l'accueil, rechargement).
  if(typeof window.showApp === 'function'){
    const orig = window.showApp;
    window.showApp = function(){
      orig.apply(this, arguments);
      if(!estEleve()) return;
      recupererBrouillons();
      // (La synchronisation des progressions est déjà lancée à chaque showApp()
      //  par correction-serveur.js.)
    };
  }
})();
