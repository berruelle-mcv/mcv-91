// ═══════════════════════════════════════════════════════════════════════
//   LABORO — Moteur commun : réinitialiser CERTAINES missions d'un élève (02/10/2026)
//   Vue classe → élève sélectionné → « Réinitialiser certaines missions ».
//   Chaque copie annulée est gardée de côté (consultable ici), rien n'est perdu.
// ═══════════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function jeton(){ return localStorage.getItem('laboro_token'); }
  function quand(iso){
    if(!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day:'numeric', month:'short' }) + ' ' + String(d.getHours()).padStart(2,'0') + 'h' + String(d.getMinutes()).padStart(2,'0');
  }
  let DATA = null, ELEVE = null;
  const COCHE = {};
  function fenetre(){
    let f = document.getElementById('annul-fenetre');
    if(!f){
      f = document.createElement('div'); f.id = 'annul-fenetre';
      f.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(17,24,39,.55);display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;overflow:auto';
      f.addEventListener('click', function(e){ if(e.target === f) fermer(); });
      document.body.appendChild(f);
    }
    f.style.display = 'flex';
    return f;
  }
  function fermer(){ const f = document.getElementById('annul-fenetre'); if(f) f.style.display = 'none'; }
  window.annulFermer = fermer;

  window.ouvrirAnnulationCopies = async function(){
    if(typeof verifierEleveSelectionne === 'function' && !verifierEleveSelectionne()) return;
    ELEVE = SELECTED_ELEVE;
    Object.keys(COCHE).forEach(function(k){ delete COCHE[k]; });
    const f = fenetre();
    f.innerHTML = '<div style="background:#fff;border-radius:12px;padding:20px;width:min(1000px,100%);font-size:13px">Chargement…</div>';
    const r = await fetchJSON(LABORO_API + '/api/eleves/' + encodeURIComponent(ELEVE.id) + '/copies-liste', { headers: { 'Authorization': 'Bearer ' + jeton() } });
    if(!r.ok || !r.data.ok){ f.firstChild.innerHTML = esc((r.data && r.data.erreur) || r.erreur || 'Impossible de charger les copies (le serveur est-il à jour ?).') + ' <button onclick="annulFermer()">Fermer</button>'; return; }
    DATA = r.data;
    dessiner();
  };

  function dessiner(){
    const f = fenetre();
    const nom = esc(((DATA.eleve.prenom || '') + ' ' + (DATA.eleve.nom || '').toUpperCase()).trim());
    const lignes = DATA.copies.map(function(c){
      const v = (typeof raisonsVigilance === 'function') ? raisonsVigilance(c.integrite, c.alerte_ia) : { raisons: [] };
      const maison = c.integrite && c.integrite.maison;
      const statut = c.statut === 'valide' ? '✅ validée' : (c.statut === 'brouillon' ? '✏️ brouillon' : (c.statut === 'a_examiner' ? '🔎 à examiner' : '📝 rendue'));
      return '<tr style="border-top:.5px solid #E5E7EB' + (c.demandee ? '' : ';background:#FFFBEB') + '">'
        + '<td style="padding:6px"><input type="checkbox" ' + (COCHE[c.mission_id] ? 'checked' : '') + ' onchange="annulCocher(\'' + esc(c.mission_id) + '\',this.checked)"></td>'
        + '<td style="padding:6px"><strong>' + esc(c.mission_id) + '</strong> ' + esc(c.titre || '') + '<div style="color:#6B7280;font-size:11px">' + esc(c.comp_id || '') + ' P' + esc(c.palier || '') + '</div></td>'
        + '<td style="padding:6px">' + (c.demandee ? 'oui' : '<strong style="color:#92400E">non</strong>') + '</td>'
        + '<td style="padding:6px">' + statut + (c.note != null ? ' · <strong>' + esc(c.note) + '/20</strong>' : '') + (c.tentatives ? ' · ' + c.tentatives + ' tent.' : '') + '</td>'
        + '<td style="padding:6px;white-space:nowrap">' + quand(c.submitted_at) + (maison ? ' 🏠' : '') + '</td>'
        + '<td style="padding:6px;color:' + (v.raisons.length ? '#B91C1C' : '#6B7280') + '">' + (v.raisons.length ? '⚠ ' + esc(v.raisons.join(' · ')) : '—') + '</td></tr>';
    }).join('');
    const n = Object.keys(COCHE).filter(function(k){ return COCHE[k]; }).length;
    const annulees = DATA.annulees.length ? '<details style="margin-top:14px"><summary style="cursor:pointer;font-weight:700">🗂 Copies déjà annulées (' + DATA.annulees.length + ')</summary>'
      + DATA.annulees.map(function(a){
          const rep = a.reponses ? Object.keys(a.reponses).map(function(k){ return '<div style="margin:4px 0"><span style="color:#6B7280">' + esc(k) + ' :</span> ' + esc(a.reponses[k]) + '</div>'; }).join('') : '<em>aucune réponse enregistrée</em>';
          return '<details style="margin:6px 0 0 12px"><summary style="cursor:pointer">' + esc(a.mission_id) + ' — annulée le ' + quand(a.annulee_at) + (a.note != null ? ' · note ' + esc(a.note) + '/20' : '') + (a.submitted_at ? ' · rendue le ' + quand(a.submitted_at) : '') + '</summary>'
            + '<div style="padding:8px 12px;background:#F9FAFB;border-radius:6px;white-space:pre-wrap;font-size:12px">' + rep + '</div></details>';
        }).join('') + '</details>' : '';
    f.innerHTML = '<div style="background:#fff;border-radius:12px;padding:20px 22px;width:min(1100px,100%);font-size:13px;color:#1F2937">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px"><strong style="font-size:16px">🧹 Réinitialiser certaines missions — ' + nom + '</strong><button onclick="annulFermer()" style="border:none;background:none;font-size:18px;cursor:pointer">✕</button></div>'
      + '<div style="color:#6B7280;margin-bottom:10px">Coche les missions à remettre à zéro (copie, note, brouillon, tentatives). Les autres ne bougent pas. Les missions <strong style="color:#92400E">non demandées</strong> sont sur fond jaune. Chaque copie annulée reste consultable en bas de cette fenêtre.</div>'
      + (DATA.copies.length ? '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12.5px"><thead><tr style="text-align:left;color:#6B7280"><th style="padding:6px"></th><th style="padding:6px">Mission</th><th style="padding:6px">Demandée</th><th style="padding:6px">État</th><th style="padding:6px">Rendue le</th><th style="padding:6px">Signaux</th></tr></thead><tbody>' + lignes + '</tbody></table></div>'
        : '<div style="color:#6B7280">Aucune mission commencée ou rendue.</div>')
      + '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px">'
      + '<button onclick="annulCocherNonDemandees()" style="padding:7px 11px;border:.5px solid #D1D5DB;background:#fff;border-radius:6px;cursor:pointer;font-size:12px">Cocher les missions non demandées</button>'
      + '<button onclick="annulValider()" ' + (n ? '' : 'disabled ') + 'style="padding:8px 14px;border:none;border-radius:6px;background:' + (n ? '#B91C1C' : '#D1D5DB') + ';color:#fff;font-weight:700;cursor:' + (n ? 'pointer' : 'default') + ';font-size:13px">Réinitialiser ' + n + ' mission' + (n > 1 ? 's' : '') + '</button>'
      + '<span id="annul-msg" style="font-size:12px"></span></div>'
      + annulees + '</div>';
  }
  window.annulCocher = function(id, v){ COCHE[id] = v; dessiner(); };
  window.annulCocherNonDemandees = function(){ DATA.copies.forEach(function(c){ if(!c.demandee) COCHE[c.mission_id] = true; }); dessiner(); };
  window.annulValider = async function(){
    const ids = Object.keys(COCHE).filter(function(k){ return COCHE[k]; });
    if(!ids.length) return;
    const nom = ((DATA.eleve.prenom || '') + ' ' + (DATA.eleve.nom || '')).trim();
    if(!confirm('Réinitialiser ' + ids.length + ' mission(s) de ' + nom + ' ?\n\n' + ids.join(', ') + '\n\nSa copie, sa note et ses tentatives sur ces missions seront remises à zéro (une copie de son travail reste consultable ici). Ses autres missions ne changent pas.')) return;
    const msg = document.getElementById('annul-msg'); if(msg) msg.textContent = 'Réinitialisation…';
    const r = await fetchJSON(LABORO_API + '/api/eleves/' + encodeURIComponent(DATA.eleve.id) + '/annuler-copies', {
      method: 'POST', headers: { 'Authorization': 'Bearer ' + jeton(), 'Content-Type': 'application/json' }, body: JSON.stringify({ mission_ids: ids }) });
    if(!r.ok || !r.data.ok){ if(msg){ msg.style.color = '#B91C1C'; msg.textContent = (r.data && r.data.erreur) || r.erreur || 'Échec.'; } return; }
    await window.ouvrirAnnulationCopies();
    const m2 = document.getElementById('annul-msg'); if(m2){ m2.style.color = '#166534'; m2.textContent = '✅ ' + r.data.annulees + ' mission(s) réinitialisée(s). L\'élève les verra « à faire » à sa prochaine connexion.'; }
    if(typeof renderClasse === 'function'){ try { renderClasse(); } catch(e) {} }
  };
})();
