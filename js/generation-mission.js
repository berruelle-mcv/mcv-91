// ================================================
//   LABORO — Moteur commun : génération d'une mission par IA (enseignant)
//   Brouillon à relire, JAMAIS publié automatiquement. Disponible dans les
//   univers dont index.html contient le panneau « Générer mission »
//   (#panel-generation) et dont le serveur a le réglage generation_mission.
// ================================================

function initGenerationMission(){
  const selComp = document.getElementById('g-comp');
  if(selComp && typeof COMP !== 'undefined'){
    const current = selComp.value;
    selComp.innerHTML = COMP.map(function(c){ return '<option value="'+c.code+'">'+c.code+' — '+c.label+'</option>'; }).join('');
    if(current) selComp.value = current;
  }
}

async function genMission(){
  const btn = document.querySelector('.btn-gen');
  const res = document.getElementById('gen-res');
  if(!res) return;
  const compEl = document.getElementById('g-comp');
  const palEl = document.getElementById('g-pal');
  const cliEl = document.getElementById('g-cli');
  const comp = compEl ? compEl.value : '';
  const palier = palEl ? palEl.value : '1';
  const clientType = cliEl ? cliEl.value : '';

  const token = localStorage.getItem('laboro_token');
  if(!token){
    res.style.color = 'var(--rg)';
    res.textContent = 'Connecte-toi via le serveur pour générer une mission.';
    return;
  }
  const btnTxtOrig = btn ? btn.textContent : null;
  if(btn){ btn.textContent = '⏳ Génération en cours (10-20 secondes)…'; btn.disabled = true; }
  res.style.color = 'var(--gm)';
  res.textContent = "L'IA rédige la mission…";
  try{
    const r = await fetchJSON(LABORO_API + '/api/generer-mission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ comp_code: comp, palier: parseInt(palier, 10), client_type: clientType })
    });
    if(!r.ok || !r.data.ok){
      res.style.color = 'var(--rg)';
      res.textContent = 'Erreur : ' + (r.erreur || (r.data && r.data.erreur) || 'génération impossible');
      return;
    }
    res.style.color = 'var(--gr)';
    res.innerHTML = renderBrouillonMission(r.data.brouillon);
  }finally{
    if(btn){ btn.textContent = btnTxtOrig; btn.disabled = false; }
  }
}

function renderBrouillonMission(m){
  const esc = function(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  const jsonStr = JSON.stringify(m, null, 2);
  const activitesHtml = (m.activites || []).map(function(a, i){
    return '<div style="margin-bottom:8px"><strong>' + (i + 1) + '. ' + esc(a.t) + '</strong>'
      + (a.q || []).map(function(q){ return '<div style="margin-left:14px;font-size:12px">– ' + esc(q) + '</div>'; }).join('')
      + '</div>';
  }).join('');
  const criteresHtml = (m.criteres || []).map(function(c){
    return '<div style="font-size:12px;padding:3px 0">• <strong>' + esc(c.c) + '</strong> — ' + esc(c.i) + '</div>';
  }).join('');
  const dossierRows = ((m.dossier && m.dossier.rows) || []).map(function(r){
    return '<div style="font-size:12px;padding:2px 0"><strong>' + esc(r[0]) + ' :</strong> ' + esc(r[1]) + '</div>';
  }).join('');
  return '<div style="background:#fff;border:.5px solid var(--gb);border-radius:10px;padding:16px;margin-bottom:12px">'
    + '<div style="font-size:10px;font-weight:700;color:var(--am,#D97706);text-transform:uppercase;letter-spacing:.05em">⚠️ Brouillon — à relire avant intégration, jamais publié automatiquement</div>'
    + '<div style="font-size:15px;font-weight:800;color:var(--gr);margin-top:4px">' + esc(m.titre) + '</div>'
    + '<div style="font-size:11px;color:var(--gm);margin-top:2px;margin-bottom:12px">' + esc(m.comp) + ' — Palier ' + esc(m.palier) + ' — ' + esc(m.option) + '</div>'
    + '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Objectif :</strong> ' + esc(m.objectif) + '</div>'
    + '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Contexte :</strong> ' + esc(m.contexte) + '</div>'
    + (dossierRows ? '<div style="background:var(--gc);border-radius:8px;padding:10px;margin-bottom:10px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gm);margin-bottom:6px">📁 ' + esc((m.dossier || {}).l || 'Dossier') + '</div>' + dossierRows + '</div>' : '')
    + '<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gm);margin-bottom:6px">Activités</div>' + activitesHtml + '</div>'
    + '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Livrable :</strong> ' + esc(m.livrable) + '</div>'
    + '<div style="margin-bottom:4px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gm);margin-bottom:6px">Critères d\'évaluation</div>' + criteresHtml + '</div>'
    + (m.reflexivite_q ? '<div style="font-size:12px;color:var(--gr);margin-top:10px;padding-top:10px;border-top:.5px solid var(--gb)"><strong>Question de réflexivité :</strong> ' + esc(m.reflexivite_q) + '</div>' : '')
    + '</div>'
    + '<div style="font-size:11px;font-weight:700;color:var(--gm);text-transform:uppercase;margin-bottom:6px">JSON à relire puis copier dans data/missions.js (remplacer l\'id par un identifiant définitif, ex. B41d-P1)</div>'
    + '<textarea readonly onclick="this.select()" style="width:100%;min-height:240px;font-family:monospace;font-size:11px;padding:10px;border:.5px solid var(--gb);border-radius:8px;background:#1E1E1E;color:#D4D4D4;box-sizing:border-box">' + esc(jsonStr) + '</textarea>';
}
