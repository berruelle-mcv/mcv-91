// ═══════════════════════════════════════════════════════════════════════
//   LABORO — Moteur commun : mémos internes et relances (02/10/2026)
//
//   Enseignant (Mission du jour → « ✉️ Mémos et relances ») : choisir une classe,
//   voir qui rend le moins (🔴 rien rendu, 🟠 moins de la moitié des missions
//   assignées), cocher, écrire un mémo signé d'un personnage de l'entreprise.
//   Élève : le mémo glisse en bas à droite de l'écran (sans bloquer le travail),
//   « Lu ✓ » le range ; « ✉️ » rouvre les mémos des 30 derniers jours.
// ═══════════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function jeton(){ return localStorage.getItem('laboro_token'); }
  function entetes(){ return { 'Authorization': 'Bearer ' + jeton(), 'Content-Type': 'application/json' }; }
  function cfg(){ return (typeof getCfg === 'function' ? getCfg() : {}) || {}; }
  function estEleve(){ return typeof CU !== 'undefined' && CU && CU.classe !== 'enseignant' && !!jeton(); }
  function quand(iso){
    if(!iso) return '';
    const d = new Date(iso), j = new Date();
    const h = String(d.getHours()).padStart(2,'0') + 'h' + String(d.getMinutes()).padStart(2,'0');
    if(d.toDateString() === j.toDateString()) return 'aujourd\'hui à ' + h;
    return d.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' }) + ' à ' + h;
  }
  const TONS = {
    info:   { lib:'ℹ️ Information', bord:'#2563EB', fond:'#EFF6FF' },
    urgent: { lib:'⚠️ Urgent',      bord:'#DC2626', fond:'#FEF2F2' },
    bravo:  { lib:'🎉 Félicitations', bord:'#16A34A', fond:'#F0FDF4' }
  };

  // Personnages qui peuvent signer (data/univers.js) + le formateur
  function signataires(){
    const p = cfg().personnages || {}, liste = [];
    Object.keys(p).forEach(function(k){
      const v = p[k];
      (Array.isArray(v) ? v : [v]).forEach(function(x){
        if(x && x.prenom && x.nom) liste.push({ nom: x.prenom + ' ' + x.nom, poste: x.poste || '', avatar: x.avatar || ((x.prenom[0] || '') + (x.nom[0] || '')).toUpperCase() });
      });
    });
    return liste;
  }

  // ─────────────────────────── ÉLÈVE ───────────────────────────
  let MEMOS = [], minuterie = null, histoOuvert = false;
  function styleUneFois(){
    if(document.getElementById('memo-style')) return;
    const s = document.createElement('style'); s.id = 'memo-style';
    s.textContent = '#memo-pile{position:fixed;right:16px;bottom:16px;z-index:9000;display:flex;flex-direction:column-reverse;gap:10px;max-width:min(360px,calc(100vw - 32px))}'
      + '.memo-carte{background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.22);border-left:5px solid #2563EB;padding:12px 14px;font-size:13px;color:#1F2937;animation:memoIn .45s ease-out}'
      + '@keyframes memoIn{from{transform:translateX(120%);opacity:0}to{transform:none;opacity:1}}'
      + '.memo-ent{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#6B7280;font-weight:700;margin-bottom:8px}'
      + '.memo-sig{display:flex;align-items:center;gap:9px;margin-bottom:8px}.memo-av{width:34px;height:34px;border-radius:50%;background:var(--th-principal,#1F2937);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0}'
      + '.memo-txt{white-space:pre-wrap;line-height:1.45;margin:6px 0 10px}.memo-act{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}'
      + '.memo-act button{border:.5px solid #D1D5DB;background:#fff;border-radius:6px;padding:5px 11px;font-size:12px;cursor:pointer}.memo-act .memo-lu{background:var(--th-principal,#1F2937);color:#fff;border-color:transparent;font-weight:700}'
      + '#memo-bouton{position:fixed;right:16px;bottom:16px;z-index:8999;border:none;border-radius:22px;padding:9px 14px;background:var(--th-principal,#1F2937);color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.2)}'
      + '#memo-histo{position:fixed;right:16px;bottom:64px;z-index:9001;width:min(380px,calc(100vw - 32px));max-height:70vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:12px}';
    document.head.appendChild(s);
  }
  function carte(m, dansHisto){
    const t = TONS[m.ton] || TONS.info;
    const ent = (cfg().entreprise || {}).nom || 'LABORO';
    return '<div class="memo-carte" style="border-left-color:'+t.bord+'">'
      + '<div class="memo-ent">✉️ Mémo interne — ' + esc(ent) + (m.ton !== 'info' ? ' · ' + t.lib : '') + '</div>'
      + '<div class="memo-sig"><div class="memo-av">' + esc(m.sign_avatar || '✉') + '</div><div><div style="font-weight:700">' + esc(m.sign_nom) + '</div>'
      + '<div style="font-size:11px;color:#6B7280">' + esc(m.sign_poste || '') + (m.sign_poste ? ' · ' : '') + quand(m.created_at) + '</div></div></div>'
      + '<div class="memo-txt">' + esc(m.texte) + '</div>'
      + '<div class="memo-act">'
      + (m.mission_id && typeof window.openMission === 'function' ? '<button onclick="memoOuvrirMission(\'' + esc(m.id) + '\')">📂 Ouvrir la mission ' + esc(m.mission_id) + '</button>' : '')
      + (dansHisto ? (m.lu_at ? '<span style="font-size:11px;color:#6B7280">Lu ' + quand(m.lu_at) + '</span>' : '') : '<button class="memo-lu" onclick="memoLu(\'' + esc(m.id) + '\')">Lu ✓</button>')
      + '</div></div>';
  }
  function afficher(){
    if(!estEleve()){ retirer(); return; }
    styleUneFois();
    const nonLus = MEMOS.filter(function(m){ return !m.lu_at; }).slice(0, 3);
    let pile = document.getElementById('memo-pile');
    if(!pile){ pile = document.createElement('div'); pile.id = 'memo-pile'; document.body.appendChild(pile); }
    const deja = pile.getAttribute('data-ids') || '', ids = nonLus.map(function(m){ return m.id; }).join(',');
    if(deja !== ids){ pile.innerHTML = nonLus.map(function(m){ return carte(m, false); }).join(''); pile.setAttribute('data-ids', ids); }
    let bt = document.getElementById('memo-bouton');
    if(!bt){ bt = document.createElement('button'); bt.id = 'memo-bouton'; bt.onclick = basculerHisto; document.body.appendChild(bt); }
    bt.style.display = (MEMOS.length && !nonLus.length) ? '' : 'none';
    bt.textContent = '✉️ Mes mémos (' + MEMOS.length + ')';
    if(histoOuvert) dessinerHisto();
  }
  function dessinerHisto(){
    let h = document.getElementById('memo-histo');
    if(!h){ h = document.createElement('div'); h.id = 'memo-histo'; document.body.appendChild(h); }
    h.style.display = '';
    h.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong>✉️ Mes mémos (30 derniers jours)</strong>'
      + '<button onclick="memoFermerHisto()" style="border:none;background:none;font-size:16px;cursor:pointer">✕</button></div>'
      + '<div style="display:flex;flex-direction:column;gap:10px">' + MEMOS.map(function(m){ return carte(m, true); }).join('') + '</div>';
  }
  function basculerHisto(){ histoOuvert = !histoOuvert; if(histoOuvert) dessinerHisto(); else memoFermerHisto(); }
  window.memoFermerHisto = function(){ histoOuvert = false; const h = document.getElementById('memo-histo'); if(h) h.style.display = 'none'; };
  function retirer(){ ['memo-pile','memo-bouton','memo-histo'].forEach(function(id){ const e = document.getElementById(id); if(e) e.remove(); }); MEMOS = []; histoOuvert = false; }
  async function verifier(){
    if(!estEleve()) return;
    const r = await fetchJSON(LABORO_API + '/api/memos/moi', { headers: entetes() });
    if(!r.ok || !r.data || !r.data.ok) return;
    MEMOS = r.data.memos || []; afficher();
  }
  window.memoLu = async function(id){
    const m = MEMOS.find(function(x){ return x.id === id; }); if(m) m.lu_at = new Date().toISOString();
    afficher();
    await fetchJSON(LABORO_API + '/api/memos/' + encodeURIComponent(id) + '/lu', { method: 'POST', headers: entetes(), body: '{}' });
  };
  window.memoOuvrirMission = function(id){
    const m = MEMOS.find(function(x){ return x.id === id; }); if(!m) return;
    memoFermerHisto();
    if(!m.lu_at) window.memoLu(id);
    try { window.openMission(m.mission_id); } catch(e) {}
  };
  if(typeof window.showApp === 'function'){
    const orig = window.showApp;
    window.showApp = function(){
      const r = orig.apply(this, arguments);
      clearInterval(minuterie);
      if(estEleve()){ verifier(); minuterie = setInterval(function(){ if(!document.hidden) verifier(); }, 30 * 1000); }
      else retirer();
      return r;
    };
  }
  if(typeof window.doLogout === 'function'){
    const orig = window.doLogout;
    window.doLogout = function(){ clearInterval(minuterie); retirer(); return orig.apply(this, arguments); };
  }

  // ───────────────────────── ENSEIGNANT ─────────────────────────
  let REL = null;   // { eleves: [...] } de /api/relances
  const COCHES = {};
  const MODELE_ROUGE = "Bonjour {prenom},\nJe n'ai encore reçu aucun travail de ta part. {missions_phrase}\nJe compte sur toi : ouvre ta mission dès maintenant et rends-la avant ce soir. Si tu bloques, dis-le-moi.";
  const MODELE_AUTRES = "Bonjour {prenom},\nIl te reste du travail en attente : {missions}.\nPrends le temps de le terminer et de le rendre, je regarde ta copie dès qu'elle arrive.";

  function zone(){ return document.getElementById('memo-zone'); }
  function optionsClasses(){
    const src = document.getElementById('mdj-cl');
    return src ? Array.from(src.options).filter(function(o){ return o.value; }).map(function(o){ return '<option value="'+esc(o.value)+'">'+esc(o.textContent)+'</option>'; }).join('') : '';
  }
  function renderZone(){
    const z = zone(); if(!z) return;
    if(z.dataset.pret){
      const c = document.getElementById('memo-cl');
      if(c && c.options.length <= 1){ const v = c.value; c.innerHTML = '<option value="">— Classe —</option>' + optionsClasses(); c.value = v; }
      chargerSuivi(); return;
    }
    z.dataset.pret = '1';
    const sel = 'padding:7px 9px;border:.5px solid var(--gb);border-radius:6px;font-size:12.5px';
    z.innerHTML = '<div class="ct">✉️ Mémos et relances</div>'
      + '<div style="font-size:12px;color:var(--gm);margin-bottom:10px">Un mémo s\'affiche sur l\'écran de l\'élève (en bas à droite, sans bloquer son travail), signé du personnage que tu choisis. Les élèves qui n\'ont rien rendu 🔴 ou moins de la moitié de leurs missions 🟠 sont en tête de liste et cochés d\'office.</div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">'
      + '<select id="memo-cl" style="'+sel+'"><option value="">— Classe —</option>'+optionsClasses()+'</select>'
      + '<select id="memo-grp" style="'+sel+'"><option value="">Toute la classe</option><option value="G1">Groupe G1</option><option value="G2">Groupe G2</option></select>'
      + '<button onclick="memoChargerRelances()" style="padding:7px 12px;border:none;border-radius:6px;background:var(--th-principal);color:#fff;font-weight:700;font-size:12.5px;cursor:pointer">📣 Qui relancer ?</button>'
      + '<span id="memo-st" style="font-size:12px;color:var(--gm)"></span></div>'
      + '<div id="memo-table"></div>'
      + '<div id="memo-compo" style="display:none;margin-top:12px;padding:12px;background:var(--gc,#F3F4F6);border-radius:8px">'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px">'
      + '<label style="font-size:12px">Signé par <select id="memo-sig" style="'+sel+'">' + signataires().map(function(s, i){ return '<option value="'+i+'">'+esc(s.nom)+(s.poste ? ' — '+esc(s.poste) : '')+'</option>'; }).join('') + '</select></label>'
      + '<label style="font-size:12px">Ton <select id="memo-ton" style="'+sel+'"><option value="urgent">⚠️ Urgent</option><option value="info">ℹ️ Information</option><option value="bravo">🎉 Félicitations</option></select></label>'
      + '<label style="font-size:12px"><input type="radio" name="memo-mode" value="relance" checked onchange="memoMode()"> Relance personnalisée</label>'
      + '<label style="font-size:12px"><input type="radio" name="memo-mode" value="libre" onchange="memoMode()"> Même mémo pour tous</label></div>'
      + '<div id="memo-txt-relance"><div style="font-size:11.5px;font-weight:700;margin:4px 0">Pour les élèves 🔴 (rien rendu)</div><textarea id="memo-t-rouge" rows="4" style="width:100%;box-sizing:border-box;'+sel+'" oninput="memoApercu()">'+esc(MODELE_ROUGE)+'</textarea>'
      + '<div style="font-size:11.5px;font-weight:700;margin:8px 0 4px">Pour les autres élèves cochés</div><textarea id="memo-t-autres" rows="3" style="width:100%;box-sizing:border-box;'+sel+'" oninput="memoApercu()">'+esc(MODELE_AUTRES)+'</textarea>'
      + '<div style="font-size:11px;color:var(--gm);margin-top:4px">Remplacés pour chaque élève : {prenom}, {missions} (ses missions en attente), {missions_phrase}. Le mémo propose d\'ouvrir sa première mission en attente.</div></div>'
      + '<div id="memo-txt-libre" style="display:none"><textarea id="memo-t-libre" rows="4" style="width:100%;box-sizing:border-box;'+sel+'" placeholder="Ton message ({prenom} est remplacé par le prénom de l\'élève)" oninput="memoApercu()"></textarea></div>'
      + '<div id="memo-apercu" style="margin-top:10px"></div>'
      + '<div style="display:flex;gap:10px;align-items:center;margin-top:10px;flex-wrap:wrap"><button id="memo-envoyer" onclick="memoEnvoyer()" style="padding:8px 14px;border:none;border-radius:6px;background:var(--th-principal);color:#fff;font-weight:700;font-size:13px;cursor:pointer">Envoyer</button><span id="memo-env-st" style="font-size:12px"></span></div>'
      + '</div>'
      + '<div style="margin-top:14px"><div style="font-size:11px;font-weight:700;color:var(--gm);text-transform:uppercase;margin-bottom:6px">Mémos envoyés</div><div id="memo-suivi" style="font-size:12px"></div></div>';
    chargerSuivi();
  }
  function libelleEtat(x){ return x.etat === 'pas_commencee' ? 'pas ouverte' : (x.etat === 'commencee' ? 'commencée' : 'à reprendre'); }
  function badge(p){ return p === 'rouge' ? '🔴' : (p === 'orange' ? '🟠' : '🟢'); }
  window.memoChargerRelances = async function(){
    const cl = document.getElementById('memo-cl').value, st = document.getElementById('memo-st');
    if(!cl){ st.textContent = 'Choisis une classe.'; return; }
    st.textContent = 'Chargement…';
    const r = await fetchJSON(LABORO_API + '/api/relances?classeCode=' + encodeURIComponent(cl) + '&groupe=' + encodeURIComponent(document.getElementById('memo-grp').value), { headers: entetes() });
    if(!r.ok || !r.data.ok){ st.textContent = (r.data && r.data.erreur) || r.erreur || 'Impossible de charger la classe.'; return; }
    REL = r.data; st.textContent = '';
    Object.keys(COCHES).forEach(function(k){ delete COCHES[k]; });
    REL.eleves.forEach(function(e){ COCHES[e.id] = e.priorite !== 'vert'; });
    dessinerTable();
    document.getElementById('memo-compo').style.display = '';
    memoApercu();
  };
  function dessinerTable(){
    const t = document.getElementById('memo-table');
    if(!REL.eleves.length){ t.innerHTML = '<div style="font-size:12px;color:var(--gm)">Aucun élève dans cette classe.</div>'; return; }
    t.innerHTML = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="text-align:left;color:var(--gm)">'
      + '<th style="padding:5px"><input type="checkbox" onchange="memoToutCocher(this.checked)"></th><th style="padding:5px">Élève</th><th style="padding:5px">Copies rendues</th><th style="padding:5px">Missions assignées rendues</th><th style="padding:5px">En attente</th><th style="padding:5px">Dernière remise</th></tr></thead><tbody>'
      + REL.eleves.map(function(e){
          return '<tr style="border-top:.5px solid var(--gc)"><td style="padding:5px"><input type="checkbox" '+(COCHES[e.id]?'checked':'')+' onchange="memoCocher(\''+e.id+'\',this.checked)"></td>'
            + '<td style="padding:5px;font-weight:600">'+badge(e.priorite)+' '+esc((e.nom||'').toUpperCase()+' '+(e.prenom||''))+(e.groupe?' <span style="color:var(--gm);font-weight:400">'+e.groupe+'</span>':'')+'</td>'
            + '<td style="padding:5px">'+e.rendues_total+'</td><td style="padding:5px">'+e.rendues_assignees+' / '+e.assignees+'</td>'
            + '<td style="padding:5px">'+(e.en_cours.length ? e.en_cours.map(function(x){ return esc(x.mission_id)+' <span style="color:var(--gm)">('+libelleEtat(x)+(x.maison_retard?', 🏠 en retard':'')+')</span>'; }).join(', ') : '—')+'</td>'
            + '<td style="padding:5px">'+(e.derniere_remise ? quand(e.derniere_remise) : 'jamais')+'</td></tr>';
        }).join('') + '</tbody></table></div>';
  }
  window.memoCocher = function(id, v){ COCHES[id] = v; memoApercu(); };
  window.memoToutCocher = function(v){ REL.eleves.forEach(function(e){ COCHES[e.id] = v; }); dessinerTable(); memoApercu(); };
  window.memoMode = function(){
    const libre = document.querySelector('input[name="memo-mode"]:checked').value === 'libre';
    document.getElementById('memo-txt-relance').style.display = libre ? 'none' : '';
    document.getElementById('memo-txt-libre').style.display = libre ? '' : 'none';
    memoApercu();
  };
  function texteEleve(e){
    const libre = document.querySelector('input[name="memo-mode"]:checked').value === 'libre';
    let t = libre ? document.getElementById('memo-t-libre').value : document.getElementById(e.priorite === 'rouge' ? 'memo-t-rouge' : 'memo-t-autres').value;
    const ms = e.en_cours.map(function(x){ return x.mission_id + ' « ' + x.titre + ' »'; });
    const listeMs = ms.length ? ms.join(', ') : 'aucune mission en attente pour l\'instant';
    const phrase = ms.length ? (ms.length > 1 ? 'Tes missions ' + ms.join(', ') + ' t\'attendent.' : 'Ta mission ' + ms[0] + ' t\'attend.') : '';
    t = t.replace(/\{prenom\}/g, e.prenom || '').replace(/\{missions_phrase\}/g, phrase).replace(/\{missions\}/g, listeMs);
    return { texte: t.replace(/\n{3,}/g, '\n\n').trim(), mission_id: (!libre && e.en_cours[0]) ? e.en_cours[0].mission_id : null };
  }
  function destinataires(){ return REL ? REL.eleves.filter(function(e){ return COCHES[e.id]; }) : []; }
  window.memoApercu = function(){
    const d = destinataires(), ap = document.getElementById('memo-apercu'), bt = document.getElementById('memo-envoyer');
    if(bt) bt.textContent = 'Envoyer à ' + d.length + ' élève' + (d.length > 1 ? 's' : '');
    if(!ap) return;
    if(!d.length){ ap.innerHTML = ''; return; }
    const s = signataires()[+document.getElementById('memo-sig').value] || {};
    const x = texteEleve(d[0]);
    ap.innerHTML = '<div style="font-size:11px;color:var(--gm);margin-bottom:4px">Aperçu pour ' + esc(d[0].prenom) + ' :</div><div style="max-width:360px">'
      + carte({ id:'apercu', sign_nom: s.nom, sign_poste: s.poste, sign_avatar: s.avatar, ton: document.getElementById('memo-ton').value, texte: x.texte, mission_id: x.mission_id, created_at: new Date().toISOString() }, true).replace(/onclick="[^"]*"/g, '') + '</div>';
  };
  window.memoEnvoyer = async function(){
    const d = destinataires(), st = document.getElementById('memo-env-st');
    if(!d.length){ st.textContent = 'Coche au moins un élève.'; return; }
    const items = d.map(function(e){ const x = texteEleve(e); return { eleve_id: e.id, texte: x.texte, mission_id: x.mission_id }; });
    if(items.some(function(i){ return !i.texte; })){ st.textContent = 'Le texte du mémo est vide.'; return; }
    const libre = document.querySelector('input[name="memo-mode"]:checked').value === 'libre';
    const s = signataires()[+document.getElementById('memo-sig').value] || {};
    st.style.color = 'var(--gm)'; st.textContent = 'Envoi…';
    const r = await fetchJSON(LABORO_API + '/api/memos', { method: 'POST', headers: entetes(),
      body: JSON.stringify({ signataire: s, ton: document.getElementById('memo-ton').value, relance: !libre, items: items }) });
    if(!r.ok || !r.data.ok){ st.style.color = '#B91C1C'; st.textContent = (r.data && r.data.erreur) || r.erreur || 'Envoi impossible (le serveur est-il à jour ?).'; return; }
    st.style.color = '#166534'; st.textContent = '✅ Mémo envoyé à ' + r.data.envoyes + ' élève(s) : il s\'affichera sur leur écran dans les 30 secondes (ou à leur prochaine connexion).';
    chargerSuivi();
  };
  async function chargerSuivi(){
    const el = document.getElementById('memo-suivi'); if(!el) return;
    const r = await fetchJSON(LABORO_API + '/api/memos/suivi', { headers: entetes() });
    if(!r.ok || !r.data.ok){ el.textContent = 'Suivi indisponible (le serveur est-il à jour ?).'; return; }
    if(!r.data.lots.length){ el.innerHTML = '<span style="color:var(--gm)">Aucun mémo envoyé pour l\'instant.</span>'; return; }
    el.innerHTML = r.data.lots.map(function(L){
      const lus = L.eleves.filter(function(e){ return e.lu_at; }).length;
      const nonLus = L.eleves.filter(function(e){ return !e.lu_at; }).map(function(e){ return esc(e.prenom + ' ' + (e.nom||'').toUpperCase()); });
      return '<div style="padding:6px 0;border-bottom:.5px solid var(--gc)"><strong>' + quand(L.created_at) + '</strong> · ' + esc(L.sign_nom) + (L.relance ? ' · 📣 relance' : '') + ' · <span style="color:'+(lus === L.eleves.length ? '#166534' : '#92400E')+'">lu par ' + lus + '/' + L.eleves.length + '</span>'
        + '<div style="color:var(--gm)">« ' + esc(L.extrait) + (L.extrait.length >= 140 ? '…' : '') + ' »</div>'
        + (nonLus.length ? '<div style="font-size:11px;color:#92400E">Pas encore lu : ' + nonLus.join(', ') + '</div>' : '') + '</div>';
    }).join('');
  }
  if(typeof window.renderMDJPanel === 'function'){
    const orig = window.renderMDJPanel;
    window.renderMDJPanel = function(){ const r = orig.apply(this, arguments); try { renderZone(); } catch(e) { console.error('memos', e); } return r; };
  }
})();
