// ================================================
//   LABORO Sport & Outdoor — Modal mission, paliers, compétences
//   Version 1.0 — Architecture modulaire
// ================================================

// ═══ MODAL MISSION ═══
function openMission(id){
  const m=MISSIONS.find(x=>x.id===id);if(!m)return;
  const ud=gUD();
  const locked=!isPalierUnlocked(m,ud)&&CU.classe!=='enseignant';
  if(locked){alert('Valide d\'abord le Palier '+(m.palier-1)+' de cette compétence avec une note ≥ 11/20.');return;}
  CM=m;repBuffer={};
  if(!ud.missions[id]){ud.missions[id]={status:'todo',id};sUD(ud);}
  document.querySelector('.mo').scrollTo(0,0);
  document.getElementById('mo-t').textContent=m.titre;
  document.getElementById('mo-m').innerHTML=`${compBadge(m.comp)} · Palier ${m.palier} — ${['','Débutant','Apprenti','Professionnel compétent','Professionnel performant'][m.palier]}`;
  const palierDescs=['',"Palier 1 — Découverte · Tu découvres le contexte professionnel de LABORO. L'objectif est de comprendre les bases avant tout. Suis d'abord la ressource, puis réponds aux questions. Note ≥ 11/20 pour débloquer le Palier 2.","Palier 2 — Apprenti · Tu connais les bases. Ici tu commences à les appliquer avec un cadre. Les questions demandent de la justification. Note ≥ 11/20 pour débloquer le Palier 3.","Palier 3 — Professionnel compétent · Les situations sont complexes, les données plus nombreuses. On attend de toi de l'analyse, de la rigueur et de la réflexivité. Tu travailles comme un(e) professionnel(le) en poste. Note ≥ 11/20 pour débloquer le Palier 4.","Palier 4 — Expert · Niveau stratégique. Tu es en autonomie complète. Les missions de ce palier te préparent directement aux épreuves de Terminale. Pas de palier suivant — c'est ici que tout se joue."];
  const pdEl=document.getElementById('mo-palier-desc');
  if(pdEl&&m.palier>=1&&m.palier<=4){pdEl.textContent=palierDescs[m.palier-1];pdEl.style.display='block';const pc2=['','#E6F1FB','#E1F5EE','#FAEEDA','#F3E8FF'];pdEl.style.background=pc2[m.palier]||'#F7F6F2';pdEl.style.color='#1a1a1a';pdEl.style.fontWeight='500';}
  // Ressource
  const resKey=m.comp.startsWith('ACC')?'ACC':m.comp.startsWith('G4A')?'G4A':m.comp.startsWith('G4B')?'G4B':m.comp.startsWith('B4.1')?'B4.1':m.comp.startsWith('B4.2')?'B4.2':m.comp.startsWith('B4.3')?'B4.3':m.comp.startsWith('B4.4')?'B4.4':m.comp.startsWith('B4.5')?'B4.5':m.comp;
  const res=RES[resKey];
  document.getElementById('mo-learn').innerHTML=res?`<div class="res-block"><div class="res-lbl">Apprendre avant de faire — 5 minutes</div><div class="res-t">${res.t}</div><div class="res-b">${res.c}</div></div><div style="text-align:center;margin-top:12px"><button onclick="moTab(1,document.querySelectorAll('.mo-tab')[1])" class="nm-btn" style="padding:10px 22px">J'ai compris → Aller à la mission</button></div>`:'<p class="u-muted">Ressource en préparation.</p>';
  // Mission
  const savedReps=ud.missions[id]?.reponses||{};
  let html='';
  if(m.dossier){html+=`<div class="doc-block"><div class="doc-lbl">Dossier documentaire — ${m.dossier.l}</div><table class="doc-t"><tbody>${m.dossier.rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>`;}
  const isPVOC = CU.classe && CU.classe.includes('PVOC');
  const contexteAffiche = (isPVOC && m.contexte_pvoc) ? m.contexte_pvoc : m.contexte;
  html+=`<div class="ph1"><div class="ph-l" style="color:var(--bl)">Mise en situation</div><div class="ph-c">${contexteAffiche}</div></div>`;
  m.activites.forEach((a,i)=>{
    html+=`<div class="ph2"><div class="ph-l" style="color:var(--vt)">Activité ${i+1} — ${a.t}</div>`;
    a.q.forEach(q=>{
      const qid=`q_${id}_${i}_${q.substring(0,8).replace(/\s/g,'_')}`;
      const saved=savedReps[qid]||'';
      html+=`<div class="qi"><span class="qn">${q.split(' ')[0]}</span>${q.substring(q.indexOf(' ')+1)}<textarea class="zone-rep${saved?' saved':''}" id="${qid}" placeholder="Rédige ta réponse ici…" oninput="autoSaveRep('${id}','${qid}',this)">${saved}</textarea></div>`;
    });
    html+='</div>';
  });
  // Question de réflexivité — uniquement P3/P4 et pas en 2nde
  const rfQid=`q_${id}_reflexivite`;
  const rfSaved=savedReps[rfQid]||'';
  const is2nde=CU.classe==='2nde';
  if(!is2nde&&m.reflexivite>0){
    const reflexQ={3:"Si tu devais expliquer à un jury professionnel comment tu as traité cette situation, que dirais-tu ? Qu'aurais-tu pu faire différemment ?",4:"En prenant du recul sur cette mission : comment ta pratique a-t-elle évolué ? En quoi cette compétence est-elle transférable à d'autres situations professionnelles ?"};
    const rq=reflexQ[m.reflexivite]||reflexQ[3];
    html+=`<div class="reflexiv"><div class="reflexiv-l">Question de réflexivité</div><div class="reflexiv-desc">${rq}</div><textarea class="zone-rep${rfSaved?' saved':''}" id="${rfQid}" placeholder="Explique ta démarche…" oninput="autoSaveRep('${id}','${rfQid}',this)">${rfSaved}</textarea></div>`;
  }
  html+=`<div class="livrable"><div class="livrable-l">Livrable attendu</div><strong>${m.livrable}</strong></div>`;
  // Situation imprévue si moy >= 15
  const moy=Object.values(ud.missions).filter(x=>x.comp===m.comp&&x.score).map(x=>x.score);
  const moyComp=moy.length>=2?moy.reduce((a,b)=>a+b,0)/moy.length:0;
  const imprev=IMPREVU[resKey]||IMPREVU[m.comp];
  if(moyComp>=15&&imprev){
    const siqid=`q_${id}_imprevu`;const siSaved=savedReps[siqid]||'';
    html+=`<div class="imprevu"><div class="imprevu-l"><div class="imprevu-dot"></div>Situation imprévue — niveau Professionnel compétent/Professionnel performant requis</div><div class="imprevu-txt"><strong>${imprev.titre} :</strong> ${imprev.txt}</div><div class="qi"><span class="qn">⚡</span>${imprev.q}<textarea class="zone-rep${siSaved?' saved':''}" id="${siqid}" placeholder="Gère cette situation imprévue…" oninput="autoSaveRep('${id}','${siqid}',this)">${siSaved}</textarea></div></div>`;
  }
  document.getElementById('mo-mission').innerHTML=html;
  // Afficher le bouton coup de pouce si une ressource existe
  const cpBtn = document.getElementById('cp-btn');
  if(cpBtn){
    const resKeyCp = m.comp.startsWith('ACC')?'ACC':m.comp.startsWith('G4A')?'G4A':m.comp.startsWith('G4B')?'G4B':m.comp.startsWith('B4.1')?'B4.1':m.comp.startsWith('B4.2')?'B4.2':m.comp.startsWith('B4.3')?'B4.3':m.comp.startsWith('B4.4')?'B4.4':m.comp.startsWith('B4.5')?'B4.5':m.comp;
    const resCp = RES[resKeyCp];
    if(resCp){ cpBtn.classList.add('visible'); cpBtn.dataset.missionId = m.id; }
    else { cpBtn.classList.remove('visible'); }
  }
  // Feedback existant
  const fb=ud.missions[id]?.feedback;
  const tabFb=document.getElementById('tab-fb');
  if(fb){tabFb.style.display='';document.getElementById('mo-fb').innerHTML=renderFb(fb);}
  else tabFb.style.display='none';
  // Bouton soumettre
  const st=ud.missions[id]?.status;
  const tent=ud.missions[id]?.tentatives||0;
  const btnS=document.getElementById('btn-submit');
  if(st==='done'){btnS.style.display='none';}
  else if(tent>=2){btnS.textContent='Tentatives épuisées (2/2)';btnS.disabled=true;btnS.style.opacity='.5';}
  else{btnS.style.display='';btnS.disabled=false;btnS.style.opacity='1';btnS.textContent=tent===1?'Soumettre (dernière tentative)':'Soumettre mes réponses';}
  moTab(0,document.querySelectorAll('.mo-tab')[0]);
  document.getElementById('mo').classList.add('open');document.getElementById('mo').classList.add('on');const _modal=document.querySelector('.modal');if(_modal)_modal.style.display='flex';
}
function autoSaveRep(mid,qid,el){
  el.classList.add('saved');
  const ud=gUD();
  if(!ud.missions[mid])ud.missions[mid]={status:'todo',id:mid};
  if(!ud.missions[mid].reponses)ud.missions[mid].reponses={};
  ud.missions[mid].reponses[qid]=el.value;
  // Passer en wip uniquement si l'élève a vraiment commencé (15 caractères au total)
  if(ud.missions[mid].status==='todo'){
    const total=Object.values(ud.missions[mid].reponses).join('').length;
    if(total>=15)ud.missions[mid].status='wip';
  }
  sUD(ud);
}
function resetMission(){
  if(!CM)return;
  const st=gUD().missions[CM.id]?.status;
  const msg=st==='done'
    ? 'Cette mission est déjà validée. La recommencer effacera ta note et tes réponses. Es-tu sûr(e) ?'
    : 'Recommencer cette mission effacera toutes tes réponses en cours. Es-tu sûr(e) ?';
  if(!confirm(msg))return;
  const ud=gUD();
  delete ud.missions[CM.id];
  sUD(ud);
  openMission(CM.id);
}
function sauvegarderEtFermer(){
  // Sauvegarde toutes les réponses visibles
  document.querySelectorAll('.zone-rep').forEach(el=>{if(el.id&&CM)autoSaveRep(CM.id,el.id,el);});
  closeMo();
}
function renderFb(fb){
  const nc=fb.note>=17?'ni-h':fb.note>=11?'ni-m':'ni-l';
  return`<div class="fb-box"><div class="fb-l">Feedback IA<span class="note-ia ${nc}">${fb.note}/20</span></div>${fb.texte}</div>`;
}
function openCoupDePouce(){
  const overlay = document.getElementById('cp-overlay');
  if(!overlay) return;
  const cpBtn = document.getElementById('cp-btn');
  const mId = cpBtn ? cpBtn.dataset.missionId : null;
  if(mId && CM){
    const resKey = CM.comp.startsWith('ACC')?'ACC':CM.comp.startsWith('G4A')?'G4A':CM.comp.startsWith('G4B')?'G4B':CM.comp.startsWith('B4.1')?'B4.1':CM.comp.startsWith('B4.2')?'B4.2':CM.comp.startsWith('B4.3')?'B4.3':CM.comp.startsWith('B4.4')?'B4.4':CM.comp.startsWith('B4.5')?'B4.5':CM.comp;
    const res = RES[resKey];
    const cpContent = document.getElementById('cp-content');
    if(cpContent && res){ cpContent.innerHTML = '<div class="res-t" style="font-size:13px;font-weight:700;margin-bottom:10px">'+res.t+'</div><div class="res-b">'+res.c+'</div>'; }
  }
  overlay.classList.add('open');
}
function closeCoupDePouce(){
  const overlay = document.getElementById('cp-overlay');
  if(overlay) overlay.classList.remove('open');
}
function closeMo(){
  document.getElementById('mo').classList.remove('open');
  document.getElementById('mo').classList.remove('on');
  const modal=document.querySelector('.modal');
  if(modal){ modal.style.display='none'; }
}
function moTab(i,el){
  document.querySelectorAll('.mo-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.mo-tp').forEach(t=>t.classList.remove('on'));
  if(el)el.classList.add('on');
  document.querySelectorAll('.mo-tp')[i]?.classList.add('on');
}
async function soumettreReponses(){
  if(!CM)return;
  const ak=localStorage.getItem('laboro_ak');
  if(!ak){alert('Clé API non configurée. Demandez à M. Berruelle d\'entrer la clé API dans le panneau Génération.');return;}
  const ud=gUD();
  const tent=(ud.missions[CM.id]?.tentatives||0)+1;
  const reps=[];
  CM.activites.forEach((a,i)=>{
    a.q.forEach(q=>{
      const qid=`q_${CM.id}_${i}_${q.substring(0,8).replace(/\s/g,'_')}`;
      const el=document.getElementById(qid);
      if(el&&el.value.trim())reps.push(`${q}\nRéponse : ${el.value.trim()}`);
    });
  });
  const rfEl=document.getElementById(`q_${CM.id}_reflexivite`);
  if(rfEl&&rfEl.value.trim())reps.push(`Question de réflexivité :\nRéponse : ${rfEl.value.trim()}`);
  if(!reps.length){alert('Rédige au moins une réponse avant de soumettre.');return;}
  const btnS=document.getElementById('btn-submit');
  btnS.textContent='Correction en cours…';btnS.disabled=true;
  const prompt=`Tu es un enseignant expert en Bac Pro MCV. Voici une mission LABORO Sport & Outdoor (entreprise fictive, Évry-Courcouronnes 91).

Mission : ${CM.titre}
Compétence : ${CM.comp} — Palier ${CM.palier} (${['','Débutant — guidé pas à pas','Apprenti — guidage partiel','Professionnel compétent — autonome et efficace','Professionnel performant — réflexivité et force de proposition'][CM.palier]})
Contexte : ${(CU.classe&&CU.classe.includes('PVOC')&&CM.contexte_pvoc)?CM.contexte_pvoc:CM.contexte}

Réponses de l'élève :
${reps.join('\n\n')}

Évalue de façon bienveillante et constructive. Réponds en français avec :
NOTE: [entier de 0 à 20, seuil de validation = 11]
NIVEAU: [1=Débutant, 2=Apprenti, 3=Professionnel compétent, 4=Professionnel performant]
FEEDBACK:
[Feedback structuré question par question — ce qui est bien, ce qui manque, conseils concrets pour progresser. Terminer par un conseil global.]`;
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':ak,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
    const d=await r.json();
    const txt=d.content?.map(b=>b.text||'').join('')||'';
    const noteM=txt.match(/NOTE:\s*(\d+)/);const niveauM=txt.match(/NIVEAU:\s*(\d)/);const fbM=txt.match(/FEEDBACK:\s*([\s\S]+)/);
    const note=noteM?Math.min(20,parseInt(noteM[1])):10;
    const niveau=niveauM?parseInt(niveauM[1]):1;
    const feedback=fbM?fbM[1].trim():txt;
    // Calculer progression
    const prevNote=ud.missions[CM.id]?.note_ia||0;
    const progression=Math.max(0,note-prevNote);
    ud.missions[CM.id]={...ud.missions[CM.id],status:'att',tentatives:tent,note_ia:note,niveau_ia:niveau,comp:CM.comp,id:CM.id,progression,feedback:{note,texte:feedback}};
    sUD(ud);
    const tabFb=document.getElementById('tab-fb');
    tabFb.style.display='';
    document.getElementById('mo-fb').innerHTML=renderFb({note,texte:feedback});
    moTab(2,tabFb);
    btnS.style.display='none';
    renderDashboard();renderMissions();
  }catch(e){
    alert('Erreur de connexion à l\'API. Vérifiez la clé API.');
    btnS.textContent='Soumettre mes réponses';btnS.disabled=false;
  }
}

// ═══ COMPÉTENCES ═══

// ═══ CALCUL AUTOMATIQUE NIVEAU COMPÉTENCE ═══
function calcNiveauComp(compCode, ud){
  const missions = MISSIONS.filter(function(m){
    return m.comp === compCode || m.comp.startsWith(compCode+'.');
  });
  if(!missions.length) return 0;
  
  const done = missions.filter(function(m){
    return ud.missions[m.id] && ud.missions[m.id].status === 'done';
  });
  
  if(!done.length) return 0;
  
  const scores = done.map(function(m){ return ud.missions[m.id].score || 0; });
  const avg = scores.reduce(function(a,b){return a+b;},0) / scores.length;
  const hasP1 = done.some(function(m){ return m.palier===1; });
  const hasP2 = done.some(function(m){ return m.palier===2; });
  const hasP3 = done.some(function(m){ return m.palier===3; });
  const hasP4 = done.some(function(m){ return m.palier===4; });
  const totalDone = done.length;
  const totalMissions = missions.length;
  
  // Maîtrisé : P3 ou P4 validé + moyenne >= 14 OU toutes missions faites
  if((hasP3 || hasP4) && avg >= 14) return 4;
  // Acquis : P2 + P3 validés OU >= 75% des missions faites avec bonne moyenne
  if(hasP2 && hasP3) return 3;
  if(totalDone >= Math.ceil(totalMissions * 0.75) && avg >= 11) return 3;
  // En progression : P2 validé OU >= 2 missions faites
  if(hasP2 || totalDone >= 2) return 2;
  // Découverte : au moins P1 validé
  if(hasP1 || totalDone >= 1) return 1;
  return 0;
}

function renderCompetences(){
  if(!CU) return;
  if(CU.classe==='enseignant'){ renderCompetencesEnseignant(); return; }

  const ud = gUD();

  const niveaux = [
    {label:'Non démarré',    col:'#A0AEC0', bg:'#F7FAFC', icon:'○'},
    {label:'Découverte',     col:'#63B3ED', bg:'#EBF8FF', icon:'◔'},
    {label:'En progression', col:'#4A6FA5', bg:'#EBF4FF', icon:'◑'},
    {label:'Acquis',         col:'#38A169', bg:'#F0FFF4', icon:'◕'},
    {label:'Maîtrisé',      col:'#276749', bg:'#C6F6D5', icon:'●'}
  ];

  // Calcul automatique pour tous les comps
  const niveauCounts = [0,0,0,0,0];
  COMP.forEach(function(c){
    const lv = calcNiveauComp(c.code, ud);
    // Mettre à jour les compétences dans ud (sync auto)
    if(!ud.competences) ud.competences = {};
    ud.competences[c.code] = lv;
    niveauCounts[lv]++;
  });
  // Sauvegarder la progression calculée
  sUD(ud);

  const acquises = niveauCounts[3] + niveauCounts[4];
  const enCours  = niveauCounts[1] + niveauCounts[2];

  // Légende + stats
  const legend = document.getElementById('comp-legend');
  if(legend){
    const legendDiv = document.createElement('div');
    legendDiv.style.cssText = 'background:#fff;border-radius:10px;padding:12px 16px;margin-bottom:16px;border:1px solid var(--gb)';
    
    const badgesDiv = document.createElement('div');
    badgesDiv.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px';
    niveaux.forEach(function(n,i){
      const span = document.createElement('span');
      span.style.cssText = 'display:flex;align-items:center;gap:5px;background:'+n.bg+';border:1px solid '+n.col+'66;color:'+n.col+';font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px';
      span.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:'+n.col+';flex-shrink:0;display:inline-block"></span>'
        + n.label + ' <span style="opacity:.65">('+niveauCounts[i]+')</span>';
      badgesDiv.appendChild(span);
    });
    
    const statsDiv = document.createElement('div');
    statsDiv.style.cssText = 'font-size:11px;color:#6B7280;padding-top:8px;border-top:1px solid #F3F4F6;display:flex;gap:16px';
    statsDiv.innerHTML = '<span>✅ <strong>'+acquises+'</strong> acquise(s)</span>'
      + '<span>🔷 <strong>'+enCours+'</strong> en cours</span>'
      + '<span>○ <strong>'+niveauCounts[0]+'</strong> non démarrée(s)</span>'
      + '<span style="color:#4A6FA5;font-style:italic">Progression calculée automatiquement</span>';
    
    legend.innerHTML = '';
    legend.appendChild(badgesDiv);
    legend.appendChild(statsDiv);
  }

  // Cards
  document.getElementById('comp-grid').innerHTML = COMP.map(function(c){
    const lv  = calcNiveauComp(c.code, ud);
    const n   = niveaux[lv];
    const pct = lv * 25;

    const mComp = MISSIONS.filter(function(m){ return m.comp===c.code || m.comp.startsWith(c.code+'.'); });
    const mDone = mComp.filter(function(m){ return ud.missions[m.id] && ud.missions[m.id].status==='done'; });
    const scores = mDone.filter(function(m){ return ud.missions[m.id].score; }).map(function(m){ return ud.missions[m.id].score; });
    const avg = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length).toFixed(1) : null;

    // Prochaine étape
    const nextMission = mComp.find(function(m){ return !ud.missions[m.id]||ud.missions[m.id].status!=='done'; });
    const nextHint = nextMission ? 'Prochaine : '+nextMission.titre.substring(0,30)+'...' : 'Toutes les missions complétées !';

    return '<div class="cc" style="border-left:4px solid '+n.col+';background:'+n.bg+';cursor:default">'

      // En-tête
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
      + '<div class="u-flex-gap">'
      + compBadge(c.code)
      + '<span style="font-size:9px;color:#6B7280;font-weight:600">'+c.g+'</span>'
      + '</div>'
      + '<span style="width:22px;height:22px;border-radius:50%;background:'+n.col+';display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:900;flex-shrink:0">'+(lv===0?'0':lv)+'</span>'
      + '</div>'

      // Nom
      + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:10px;line-height:1.3">'+c.label+'</div>'

      // Barre de progression
      + '<div style="background:#E2E8F0;border-radius:8px;height:12px;overflow:hidden;margin-bottom:6px;position:relative">'
      + '<div style="height:100%;width:'+pct+'%;background:'+n.col+';border-radius:8px;transition:width .5s ease"></div>'
      + (pct>0?'<div style="position:absolute;right:6px;top:50%;transform:translateY(-50%);font-size:8px;color:#fff;font-weight:700">'+pct+'%</div>':'')
      + '</div>'

      // Niveau + missions
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'
      + '<span style="font-size:11px;font-weight:800;color:'+n.col+'">'+n.label+'</span>'
      + '<span style="font-size:10px;color:#6B7280">'+mDone.length+'/'+mComp.length+' missions'+(avg?' · '+avg+'/20':'')+'</span>'
      + '</div>'

      // Hint prochaine mission
      + '<div style="font-size:10px;color:#9CA3AF;border-top:1px solid #E2E8F0;padding-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">→ '+nextHint+'</div>'

      + '</div>';
  }).join('');
}

