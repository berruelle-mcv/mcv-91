// ================================================
//   LABORO — Moteur commun : génération d'une mission par IA (enseignant)
//   Brouillon à relire, JAMAIS publié automatiquement : l'enseignant le corrige dans
//   l'éditeur de js/missions-publiees.js puis le publie (01/11/2026). Disponible dans les
//   univers dont index.html contient le panneau « Générer mission »
//   (#panel-generation) et dont le serveur a le réglage generation_mission.
// ================================================

// Liste des compétences proposées : celles des missions de l'univers (mêmes codes que la
// base du serveur), limitées à l'option choisie (+ missions communes), dans l'ordre de COMP.
function competencesGeneration(option){
  if(typeof MISSIONS === 'undefined') return [];
  const vues = {};
  const liste = [];
  MISSIONS.forEach(function(m){
    if(!m || !m.comp || vues[m.comp]) return;
    if(option && m.option && m.option !== option && m.option !== 'commun') return;
    vues[m.comp] = true;
    const c = (typeof COMP !== 'undefined') ? COMP.find(function(x){ return x.code === m.comp; }) : null;
    liste.push({ code: m.comp, label: c ? c.label : String(m.comp_libelle || m.comp).replace(/^[^—]*—\s*/, '') });
  });
  const rang = function(code){
    if(typeof COMP === 'undefined') return 1000;
    const i = COMP.findIndex(function(x){ return x.code === code; });
    if(i !== -1) return i;
    const parent = COMP.findIndex(function(x){ return x.code === code.replace(/[a-z]+$/, ''); });
    return parent !== -1 ? parent + 0.5 : 1000;  // ex. C2.1b juste après C2.1
  };
  return liste.sort(function(a, b){ return (rang(a.code) - rang(b.code)) || a.code.localeCompare(b.code); });
}

function initGenerationMission(){
  const selComp = document.getElementById('g-comp');
  const selOpt = document.getElementById('g-opt');
  if(selOpt && !selOpt.dataset.lie){
    selOpt.addEventListener('change', initGenerationMission);
    selOpt.dataset.lie = '1';
  }
  ajouterChampTheme();
  if(selComp){
    const current = selComp.value;
    const comps = competencesGeneration(selOpt ? selOpt.value : '');
    selComp.innerHTML = comps.map(function(c){ return '<option value="'+c.code+'">'+codeComp(c.code)+' — '+c.label+'</option>'; }).join('');
    if(current && comps.some(function(c){ return c.code === current; })) selComp.value = current;
  }
}

// Champ « Méthode ou notion à faire travailler » (01/11/2026, demande de Pascal : SONCASE,
// CAP(B)… ne se choisissent pas dans la liste des compétences). Facultatif. En tapant, la page
// montre les missions de la banque déjà sur ce thème (pour économiser du crédit) et la
// compétence la plus proche.
function ajouterChampTheme(){
  if(document.getElementById('g-theme')) return;
  const grille = document.querySelector('#panel-generation .gen-grid');
  if(!grille) return;
  const bloc = document.createElement('div');
  bloc.className = 'gen-theme';
  bloc.innerHTML = '<label for="g-theme">Méthode ou notion à faire travailler <span>(facultatif)</span></label>'
    + '<input id="g-theme" type="text" maxlength="200" autocomplete="off" placeholder="ex. découverte des besoins SONCASE puis argumentation CAP(B)">'
    + '<div id="g-theme-aide" class="gen-theme-aide"></div>';
  grille.parentNode.insertBefore(bloc, grille.nextSibling);
  if(!document.getElementById('gen-theme-style')){
    const st = document.createElement('style'); st.id = 'gen-theme-style';
    st.textContent = '.gen-theme{margin:10px 0 12px}.gen-theme label{display:block;font-size:11px;font-weight:700;color:var(--gm,#6B7280);text-transform:uppercase;margin-bottom:5px}'
      + '.gen-theme label span{text-transform:none;font-weight:400}.gen-theme input{width:100%;box-sizing:border-box;padding:9px 11px;border:.5px solid var(--gb,#D1D5DB);border-radius:6px;font:inherit;font-size:13px}'
      + '.gen-theme-aide{font-size:12px;color:var(--gm,#6B7280);margin-top:6px;line-height:1.5}.gen-theme-aide button{font:inherit;font-size:11px;font-weight:700;border:.5px solid var(--gb,#D1D5DB);background:#fff;border-radius:5px;padding:2px 7px;cursor:pointer;margin-left:4px}';
    document.head.appendChild(st);
  }
  let t = null;
  document.getElementById('g-theme').addEventListener('input', function(){ clearTimeout(t); t = setTimeout(aideTheme, 350); });
}
function missionsSurTheme(theme, n){
  if(!theme || typeof rechercherMissions !== 'function') return [];
  const r = rechercherMissions(theme, {});
  const max = r.resultats.length ? r.resultats[0].trouves : 0;
  return r.resultats.filter(function(x){ return x.trouves === max && max > 0 && !(x.m.publiee && x.m.statut === 'retiree'); }).slice(0, n || 8).map(function(x){ return x.m; });
}
function aideTheme(){
  const aide = document.getElementById('g-theme-aide');
  const theme = (document.getElementById('g-theme') || {}).value || '';
  if(!aide) return;
  if(theme.trim().length < 3){ aide.innerHTML = ''; return; }
  const esc = function(x){ return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  const ms = missionsSurTheme(theme, 8);
  if(!ms.length){ aide.textContent = 'Aucune mission de la banque ne correspond encore à ce thème.'; return; }
  // Compétence la plus fréquente parmi les missions trouvées, si elle est proposée dans la liste
  const nb = {};
  ms.forEach(function(m){ nb[m.comp] = (nb[m.comp] || 0) + 1; });
  const top = Object.keys(nb).sort(function(a, b){ return nb[b] - nb[a]; })[0];
  const selComp = document.getElementById('g-comp');
  const dispo = selComp && Array.from(selComp.options).some(function(o){ return o.value === top; });
  aide.innerHTML = '💡 Déjà dans la banque sur ce thème (à assigner sans crédit) : '
    + ms.slice(0, 4).map(function(m){ return '« ' + esc(m.titre) + ' » (' + esc(codeComp(m.comp)) + ', palier ' + esc(m.palier) + ')'; }).join(' ; ')
    + (ms.length > 4 ? ' et ' + (ms.length - 4) + ' autre(s)' : '') + '.'
    + (top ? '<br>Compétence la plus proche : <strong>' + esc(codeComp(top)) + '</strong>'
      + (dispo && selComp.value !== top ? '<button type="button" id="g-theme-comp">Choisir</button>' : (dispo ? ' (déjà choisie)' : ' (pas proposée pour cette option)')) : '');
  const bt = document.getElementById('g-theme-comp');
  if(bt) bt.onclick = function(){ selComp.value = top; aideTheme(); };
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
  const optEl = document.getElementById('g-opt');
  const option = optEl ? optEl.value : '';
  const theme = ((document.getElementById('g-theme') || {}).value || '').trim().slice(0, 200);

  const token = localStorage.getItem('laboro_token');
  if(!token){
    res.style.color = 'var(--rg)';
    res.textContent = 'Connecte-toi via le serveur pour générer une mission.';
    return;
  }
  const btnTxtOrig = btn ? btn.textContent : null;
  if(window.MP && MP.brouillonEnCours && MP.brouillonEnCours() && !confirm("Un brouillon est en cours : le remplacer par une nouvelle mission ?")) return;
  if(btn){ btn.textContent = '⏳ Génération en cours (20-40 secondes)…'; btn.disabled = true; }
  res.style.color = 'var(--gm)';
  res.textContent = "L'IA rédige la mission…";
  try{
    const r = await fetchJSON(LABORO_API + '/api/generer-mission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      // Contexte de l'univers (01/11/2026) : catalogue réel, personnages, missions existantes
      // sur la compétence, décors des saynètes — pour que l'IA n'invente ni produit ni doublon.
      body: JSON.stringify(Object.assign({ comp_code: comp, palier: parseInt(palier, 10), client_type: clientType, option: option, theme: theme },
        (window.MP && typeof MP.contexteGeneration === 'function') ? MP.contexteGeneration(comp, theme) : {}))
    });
    if(!r.ok || !r.data.ok){
      res.style.color = 'var(--rg)';
      res.textContent = 'Erreur : ' + (r.erreur || (r.data && r.data.erreur) || 'génération impossible');
      return;
    }
    const b = r.data.brouillon;
    if(theme) b.theme = theme;
    // Mêmes références de compétence que les missions existantes de l'univers
    // (comp_ref et intitulé officiel), pour un JSON prêt à coller dans data/missions.js.
    const modele = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(m){ return m.comp === b.comp; }) : null;
    if(modele){ b.comp_ref = modele.comp_ref || b.comp_ref; b.comp_libelle = modele.comp_libelle || b.comp_libelle; }
    // Éditeur + garde-fous + « Publier » (js/missions-publiees.js) ; sinon l'ancien aperçu
    if(window.MP && typeof MP.ouvrirEditeur === 'function'){ MP.ouvrirEditeur(b); return; }
    res.style.color = 'var(--gr)';
    res.innerHTML = renderBrouillonMission(b);
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
    + '<div style="font-size:11px;color:var(--gm);margin-top:2px;margin-bottom:12px">' + esc(codeComp(m.comp)) + ' — Palier ' + esc(m.palier) + ' — ' + esc(m.option) + '</div>'
    + '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Objectif :</strong> ' + esc(m.objectif) + '</div>'
    + '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Contexte :</strong> ' + esc(m.contexte) + '</div>'
    + (m.contexte_pvoc ? '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Contexte PVOC :</strong> ' + esc(m.contexte_pvoc) + '</div>' : '')
    + (dossierRows ? '<div style="background:var(--gc);border-radius:8px;padding:10px;margin-bottom:10px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gm);margin-bottom:6px">📁 ' + esc((m.dossier || {}).l || 'Dossier') + '</div>' + dossierRows + '</div>' : '')
    + '<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gm);margin-bottom:6px">Activités</div>' + activitesHtml + '</div>'
    + '<div style="font-size:12px;color:var(--gr);margin-bottom:10px"><strong>Livrable :</strong> ' + esc(m.livrable) + '</div>'
    + '<div style="margin-bottom:4px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--gm);margin-bottom:6px">Critères d\'évaluation</div>' + criteresHtml + '</div>'
    + (m.reflexivite_q ? '<div style="font-size:12px;color:var(--gr);margin-top:10px;padding-top:10px;border-top:.5px solid var(--gb)"><strong>Question de réflexivité :</strong> ' + esc(m.reflexivite_q) + '</div>' : '')
    + '</div>'
    + '<div style="font-size:11px;font-weight:700;color:var(--gm);text-transform:uppercase;margin-bottom:6px">JSON à relire puis copier dans data/missions.js (remplacer l\'id par un identifiant définitif, ex. B41d-P1)</div>'
    + '<textarea readonly onclick="this.select()" style="width:100%;min-height:240px;font-family:monospace;font-size:11px;padding:10px;border:.5px solid var(--gb);border-radius:8px;background:#1E1E1E;color:#D4D4D4;box-sizing:border-box">' + esc(jsonStr) + '</textarea>';
}
