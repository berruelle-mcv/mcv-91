// ═══════════════════════════════════════════════════════════════════════
//   LABORO — Moteur commun : connexions et activité des élèves (07/10/2026)
//
//   Demande de Pascal, après le cas d'une élève disant avoir travaillé : voir
//   dans LABORO quand un élève s'est connecté et quels jours il a utilisé la
//   plateforme. Le serveur (moteur 2026-10-07b) enregistre chaque connexion et,
//   pour chaque jour, la première et la dernière activité.
//     - Vue classe : colonne « Dernière activité » (clic sur l'en-tête : les plus
//       anciennes d'abord, pour repérer ceux qui ont disparu) ;
//     - Fiche de l'élève sélectionné : encadré « Connexions et activité ».
//   Routes : GET /api/eleves (derniere_activite, mdp_change_at, jamais_connecte)
//            GET /api/eleves/:id/activite
//   Chargé APRÈS classe-serveur.js.
// ═══════════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function dateServeur(v){
    if(!v) return null;
    let t = String(v); if(t.indexOf('T') < 0) t = t.replace(' ', 'T') + 'Z';
    const d = new Date(t); return isNaN(d) ? null : d;
  }
  function heure(d){ return String(d.getHours()).padStart(2, '0') + 'h' + String(d.getMinutes()).padStart(2, '0'); }
  function joursEntre(d){ const a = new Date(d); a.setHours(0,0,0,0); const b = new Date(); b.setHours(0,0,0,0); return Math.round((b - a) / 86400000); }
  function quand(d){
    const n = joursEntre(d);
    if(n === 0) return 'aujourd\'hui ' + heure(d);
    if(n === 1) return 'hier ' + heure(d);
    if(n < 7) return 'il y a ' + n + ' jours';
    return 'le ' + d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  }
  function jourLong(iso){ const d = new Date(iso + 'T12:00:00'); return d.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: '2-digit' }); }
  // La colonne « Dernière activité » n'existe qu'avec un serveur à jour (moteur 2026-10-07b)
  function serveurAJour(){ return typeof ELEVES_SERVEUR !== 'undefined' && ELEVES_SERVEUR.some(function(e){ return 'derniere_activite' in e; }); }

  // ── Vue classe : cellule de la colonne ──
  window.celluleActivite = function(e){
    if(!('derniere_activite' in e)) return '<span style="color:var(--gm);font-size:10px">—</span>';
    const d = dateServeur(e.derniere_activite);
    if(!d){
      return e.jamais_connecte
        ? '<span title="Mot de passe provisoire jamais changé : aucune connexion" style="font-size:10px;font-weight:800;color:#B91C1C">jamais connecté·e</span>'
        : '<span title="Aucune activité enregistrée depuis la mise en place du relevé (07/10/2026)" style="font-size:10px;color:var(--gm)">pas d\'activité relevée</span>';
    }
    const n = joursEntre(d);
    const col = n <= 2 ? '#166534' : (n <= 7 ? '#92400E' : '#B91C1C');
    return '<span title="Dernière activité le ' + d.toLocaleString('fr-FR') + '" style="font-size:10.5px;font-weight:700;color:' + col + ';white-space:nowrap">' + quand(d) + '</span>';
  };

  // ── Vue classe : tri par dernière activité (les plus anciennes, puis « jamais », en haut) ──
  let TRI_ACTIVITE = false;
  window.basculerTriActivite = function(){ TRI_ACTIVITE = !TRI_ACTIVITE; if(typeof afficherClasse === 'function') afficherClasse(); };
  window.trierParActivite = function(liste){
    const th = document.getElementById('th-activite');
    if(th) th.textContent = 'Dernière activité' + (TRI_ACTIVITE ? ' ▲' : '');
    if(!TRI_ACTIVITE) return liste;
    const cle = function(e){ const d = dateServeur(e.derniere_activite); return d ? d.getTime() : (e.jamais_connecte ? -2 : -1); };
    return liste.slice().sort(function(a, b){ return cle(a) - cle(b); });
  };

  // ── Fiche de l'élève sélectionné : encadré « Connexions et activité » ──
  let DEMANDE = 0;
  async function chargerActiviteEleve(e){
    const el = document.getElementById('eleve-activite'); if(!el) return;
    if(!serveurAJour()){ el.innerHTML = ''; return; }
    const n = ++DEMANDE;
    el.innerHTML = '<div style="font-size:11px;color:var(--gm);padding:6px 0">⏳ Connexions et activité…</div>';
    const r = await fetchJSON(LABORO_API + '/api/eleves/' + encodeURIComponent(e.id) + '/activite', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('laboro_token') } });
    if(n !== DEMANDE) return;   // un autre élève a été sélectionné entre-temps
    if(!r.ok || !r.data.ok){ el.innerHTML = '<div style="font-size:11px;color:var(--rg)">Activité indisponible : ' + esc((r.data && r.data.erreur) || r.erreur || '') + '</div>'; return; }
    const a = r.data;
    const pc = dateServeur(a.premiere_connexion);
    const premiere = !a.mot_de_passe_change
      ? '<strong style="color:#B91C1C">jamais</strong> <span style="color:var(--gm)">(mot de passe provisoire jamais changé)</span>'
      : (pc ? 'le ' + pc.toLocaleDateString('fr-FR') + ' à ' + heure(pc) : '<span style="color:var(--gm)">faite avant le 07/10/2026 (date non relevée)</span>');
    // Connexions par jour (heure de Paris = heure du navigateur)
    const cnx = {};
    (a.connexions || []).forEach(function(q){ const d = dateServeur(q); if(!d) return; const k = d.toLocaleDateString('sv-SE'); (cnx[k] = cnx[k] || []).push(heure(d)); });
    const jours = (a.jours || []).slice(0, 10).map(function(j){
      const p = dateServeur(j.premiere), d = dateServeur(j.derniere), c = (cnx[j.jour] || []).reverse();
      return '<div style="display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:.5px solid var(--gc)">'
        + '<span style="font-weight:700">' + jourLong(j.jour) + '</span>'
        + '<span>' + (p ? heure(p) : '?') + (d && p && heure(d) !== heure(p) ? ' → ' + heure(d) : '') + '</span>'
        + '<span style="color:var(--gm);font-size:10.5px">' + (c.length ? c.length + ' connexion' + (c.length > 1 ? 's' : '') + ' (' + c.join(', ') + ')' : 'déjà connecté·e') + '</span></div>';
    }).join('');
    const ligne = function(lib, val){ return '<div style="display:flex;justify-content:space-between;gap:8px;padding:2px 0"><span style="color:var(--gm)">' + lib + '</span><span style="text-align:right">' + val + '</span></div>'; };
    const dd = function(v, fem){ const d = dateServeur(v); return d ? ' <span style="color:var(--gm)">(' + (fem ? 'dernière' : 'dernier') + ' : ' + quand(d) + ')</span>' : ''; };
    el.innerHTML = '<div style="margin:0 0 10px;padding:10px 12px;background:#F8FAFC;border:.5px solid var(--gb);border-radius:8px;font-size:11.5px">'
      + '<div style="font-size:11px;font-weight:800;color:var(--th-fonce);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">🕒 Connexions et activité</div>'
      + ligne('Première connexion', premiere)
      + ligne('Brouillons enregistrés', a.brouillons.n + dd(a.brouillons.dernier))
      + ligne('Temps de travail mesuré', Math.round(a.travail.secondes / 60) + ' min · ' + a.travail.tapes + ' caractères tapés')
      + ligne('Copies rendues', a.copies.n + dd(a.copies.derniere, true))
      + ligne('Mémos lus', a.memos.lus + ' / ' + a.memos.n)
      + '<div style="font-size:10.5px;font-weight:700;color:var(--gm);margin:8px 0 2px">Jours d\'utilisation (10 derniers)</div>'
      + (jours || '<div style="color:var(--gm)">Aucune activité relevée depuis le 07/10/2026.</div>')
      + '<div style="font-size:10px;color:var(--gm);margin-top:6px">Relevé depuis le 07/10/2026, gardé pour l\'année scolaire en cours. « déjà connecté·e » : LABORO était resté ouvert depuis une connexion précédente.</div>'
      + '</div>';
  }

  if(typeof window.selectionnerEleve === 'function'){
    const orig = window.selectionnerEleve;
    window.selectionnerEleve = function(eleveId){
      const r = orig.apply(this, arguments);
      try { if(SELECTED_ELEVE) chargerActiviteEleve(SELECTED_ELEVE); } catch(e) { console.error('activite', e); }
      return r;
    };
  }
})();
