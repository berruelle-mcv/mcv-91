// ================================================
//   LABORO Sport & Outdoor — Modal mission, paliers, compétences
//   Version 1.0 — Architecture modulaire
// ================================================

// ═══ MODAL MISSION ═══

// ═══ CLÉ DE RESSOURCE PÉDAGOGIQUE ═══
// Détermine quelle ressource "Apprendre avant de faire" afficher pour une
// compétence donnée. Centralisé ici (au lieu d'être dupliqué à 3 endroits)
// pour n'avoir qu'un seul endroit à faire évoluer.
function getResKey(comp){
  if(!comp) return comp;
  if(comp.startsWith('ACC')) return 'ACC';
  if(comp.startsWith('G4A')||comp.startsWith('C4A')) return 'G4A';
  if(comp.startsWith('G4B')) return 'G4B';
  if(comp.startsWith('B4.1')) return 'B4.1';
  if(comp.startsWith('B4.2')) return 'B4.2';
  if(comp.startsWith('B4.3')) return 'B4.3';
  if(comp.startsWith('B4.4')) return 'B4.4';
  if(comp.startsWith('B4.5')) return 'B4.5';
  return comp;
}

// Récupère la fiche "Apprendre avant de faire" pour une compétence ET un
// palier donnés. Compatible avec les deux formats de RES (data/competences.js) :
//   - ancien format, une seule fiche pour tous les paliers : {t:..., c:...}
//   - nouveau format différencié par palier : {1:{t,c}, 2:{t,c}, 3:{t,c}, 4:{t,c}}
// Au fur et à mesure qu'une compétence est réécrite en contenu différencié,
// elle passe au nouveau format — aucun autre changement de code nécessaire.
function getRes(comp, palier){
  const key = getResKey(comp);
  const entry = RES[key];
  if(!entry) return null;
  if(entry[1] || entry[2] || entry[3] || entry[4]){
    return entry[palier] || entry[4] || entry[3] || entry[2] || entry[1];
  }
  return entry;
}

// ═══ TIMER MISSION ═══
var moTimerInterval = null;
var moTimerSeconds = 0;
var moTimerDuration = 55 * 60; // 55 minutes par défaut

function startMoTimer(dureeMin){
  stopMoTimer();
  moTimerDuration = (dureeMin || 55) * 60;
  moTimerSeconds = 0;
  const timerEl = document.getElementById('mo-timer');
  const timerVal = document.getElementById('mo-timer-val');
  if(!timerEl || !timerVal) return;
  timerEl.style.display = 'flex';
  timerEl.style.background = 'rgba(255,255,255,.12)';
  timerEl.style.borderColor = 'rgba(255,255,255,.2)';
  updateTimerDisplay(timerVal);
  moTimerInterval = setInterval(function(){
    moTimerSeconds++;
    updateTimerDisplay(timerVal);
    // Alerte à 5 min avant la fin
    if(moTimerSeconds === moTimerDuration - 300){
      timerEl.style.background = 'rgba(255,180,0,.25)';
      timerEl.style.borderColor = 'rgba(255,180,0,.5)';
      showNotifEleve('⏱ Il te reste 5 minutes — pense à finaliser ta réponse !', 'warning');
    }
    // Temps écoulé
    if(moTimerSeconds === moTimerDuration){
      timerEl.style.background = 'rgba(220,38,38,.25)';
      timerEl.style.borderColor = 'rgba(220,38,38,.5)';
      showNotifEleve('⏱ Temps recommandé dépassé — tu peux terminer ta réponse !', 'info');
    }
  }, 1000);
}

function stopMoTimer(){
  if(moTimerInterval){ clearInterval(moTimerInterval); moTimerInterval = null; }
  const timerEl = document.getElementById('mo-timer');
  if(timerEl) timerEl.style.display = 'none';
  moTimerSeconds = 0;
}

function updateTimerDisplay(el){
  const elapsed = moTimerSeconds;
  const remaining = moTimerDuration - elapsed;
  if(remaining > 0){
    const m = Math.floor(remaining/60);
    const s = remaining % 60;
    el.textContent = m+':'+(s<10?'0':'')+s;
  } else {
    const over = elapsed - moTimerDuration;
    const m = Math.floor(over/60);
    const s = over % 60;
    el.textContent = '+'+m+':'+(s<10?'0':'')+s;
  }
}


function openMission(id){
  const m=MISSIONS.find(x=>x.id===id);if(!m)return;
  const ud=gUD();
  const locked=!isPalierUnlocked(m,ud)&&CU.classe!=='enseignant';
  if(locked){alert('Fais d\'abord valider une mission du Palier '+(m.palier-1)+' de cette compétence.');return;}
  CM=m;repBuffer={};
  if(!ud.missions[id]){ud.missions[id]={status:'todo',id};sUD(ud);}
  document.querySelector('.mo').scrollTo(0,0);
  document.getElementById('mo-t').textContent=m.titre;
  // Démarrer le timer
  startMoTimer(55);
  document.getElementById('mo-m').innerHTML=`${compBadge(m.comp)} · Palier ${m.palier} — ${['','Débutant','Apprenti','Professionnel compétent','Professionnel performant'][m.palier]}`;
  const palierDescs=['',"Palier 1 — Découverte · Tu découvres le contexte professionnel de LABORO. L'objectif est de comprendre les bases avant tout. Suis d'abord la ressource, puis réponds aux questions. Mission validée = Palier 2 débloqué.","Palier 2 — Apprenti · Tu connais les bases. Ici tu commences à les appliquer avec un cadre. Les questions demandent de la justification. Mission validée = Palier 3 débloqué.","Palier 3 — Professionnel compétent · Les situations sont complexes, les données plus nombreuses. On attend de toi de l'analyse, de la rigueur et de la réflexivité. Tu travailles comme un(e) professionnel(le) en poste. Mission validée = Palier 4 débloqué.","Palier 4 — Expert · Niveau stratégique. Tu es en autonomie complète. Les missions de ce palier te préparent directement aux épreuves de Terminale. Pas de palier suivant — c'est ici que tout se joue."];
  const pdEl=document.getElementById('mo-palier-desc');
  if(pdEl&&m.palier>=1&&m.palier<=4){pdEl.textContent=palierDescs[m.palier];pdEl.style.display='block';const pc2=['','#E6F1FB','#EBF4FF','#FEF3C7','#F5F0FF'];pdEl.style.background=pc2[m.palier]||'#F7F6F2';pdEl.style.color='#1a1a1a';pdEl.style.fontWeight='500';}
  // Ressource
  const res=getRes(m.comp, m.palier);
  document.getElementById('mo-learn').innerHTML=res?`<div class="res-block"><div class="res-lbl">Apprendre avant de faire — 5 minutes</div><div class="res-t">${res.t}</div><div class="res-b">${res.c}</div></div><div style="text-align:center;margin-top:12px"><button onclick="moTab(1,document.querySelectorAll('.mo-tab')[1])" class="nm-btn" style="padding:10px 22px">J'ai compris → Aller à la mission</button></div>`:'<p class="u-muted">Ressource en préparation.</p>';
  // Mission
  const savedReps=ud.missions[id]?.reponses||{};
  let html='';
  if(m.dossier){html+=`<div class="doc-block"><div class="doc-lbl">Dossier documentaire — ${m.dossier.l}</div><table class="doc-t"><tbody>${m.dossier.rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>`;}
  const isPVOC = CU.classe && CU.classe.includes('PVOC');
  const contexteAffiche = (isPVOC && m.contexte_pvoc) ? m.contexte_pvoc : m.contexte;
  // ── Objectif de la mission (Axe 1 — compétence explicite) ──
  if(m.objectif){
    html+=`<div style="background:#EBF4FF;border:.5px solid #B5D4F4;border-left:3px solid #185FA5;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;color:#185FA5;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">🎯 Objectif de cette mission</div>
      <div style="font-size:12px;color:#1A2E4A;line-height:1.6">${m.objectif}</div>
      <div style="font-size:11px;color:#4A6FA5;margin-top:4px">Compétence travaillée : <strong>${m.comp}</strong> — ${m.comp_libelle}</div>
    </div>`;
  }
  html+=`<div class="ph1"><div class="ph-l" style="color:var(--bl)">Mise en situation</div><div class="ph-c">${contexteAffiche}</div></div>`;
  m.activites.forEach((a,i)=>{
    html+=`<div class="ph2"><div class="ph-l" style="color:var(--vt)">Activité ${i+1} — ${a.t}</div>`;
    a.q.forEach(q=>{
      const qid=`q_${id}_${i}_${q.substring(0,8).replace(/\s/g,'_')}`;
      const saved=reponseSauvee(savedReps,id,i,q,qid);
      const qcm=analyserQCM(q);
      const ph=qcm?(qcm.mode==='ordre'?'Clique les lettres dans l\'ordre ci-dessus, puis justifie si demandé…':'Clique ta/tes réponse(s) ci-dessus, puis justifie si demandé…'):'Rédige ta réponse ici…';
      html+=`<div class="qi"><span class="qn">${q.split(' ')[0]}</span>${q.substring(q.indexOf(' ')+1)}${qcm?renderChoixQCM(qid,qcm,saved):''}<textarea class="zone-rep${saved?' saved':''}" id="${qid}" placeholder="${ph}" oninput="autoSaveRep('${id}','${qid}',this);majChoixQCM('${qid}')">${saved}</textarea></div>`;
    });
    html+='</div>';
  });
  // Question de réflexivité — uniquement P3/P4 et pas en 2nde
  const rfQid=`q_${id}_reflexivite`;
  const rfSaved=savedReps[rfQid]||'';
  const is2nde=CU.classe==='2nde';
  if(!is2nde&&m.reflexivite>0){
    // ── Axe 2 : question de réflexivité précise ou générique selon la mission ──
    const reflexQ={3:"Si tu devais expliquer à un jury professionnel comment tu as traité cette situation, que dirais-tu ? Qu'aurais-tu pu faire différemment ?",4:"En prenant du recul sur cette mission : comment ta pratique a-t-elle évolué ? En quoi cette compétence est-elle transférable à d'autres situations professionnelles ?"};
    const rq=m.reflexivite_q||reflexQ[m.reflexivite]||reflexQ[3];
    html+=`<div class="reflexiv"><div class="reflexiv-l">Question de réflexivité</div><div class="reflexiv-desc">${rq}</div><textarea class="zone-rep${rfSaved?' saved':''}" id="${rfQid}" placeholder="Explique ta démarche…" oninput="autoSaveRep('${id}','${rfQid}',this)">${rfSaved}</textarea></div>`;
  }
  // ── Axe 3 : Grille de critères visible par l'élève AVANT soumission ──
  if(m.criteres && m.criteres.length > 0){
    const niveaux = ['Non acquis','En cours d\'acquisition','Acquis','Maîtrisé'];
    const couleurs = ['#DC2626','#D97706','#1D9E75','#185FA5'];
    html+=`<div style="background:#FFFBEA;border:.5px solid #F0C040;border-left:3px solid #D97706;border-radius:0 8px 8px 0;padding:12px 14px;margin-top:14px">
      <div style="font-size:10px;font-weight:700;color:#8A6500;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">📋 Ce qu'on attend de toi — critères d'évaluation</div>
      <div style="font-size:11px;color:#92400E;margin-bottom:10px;line-height:1.5">Avant de soumettre, vérifie que ta réponse répond à chacun de ces critères.</div>
      ${m.criteres.map((cr,ci) => `
        <div style="display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:.5px solid #FDE68A${ci===m.criteres.length-1?';border-bottom:none':''}">
          <div style="width:20px;height:20px;border-radius:50%;background:#FEF3C7;border:1.5px solid #F0C040;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#B45309;flex-shrink:0;margin-top:1px">${ci+1}</div>
          <div style="flex:1">
            <div style="font-size:11px;font-weight:700;color:#1A2E4A;margin-bottom:2px">${cr.c}</div>
            <div style="font-size:11px;color:#6B7280;line-height:1.4">${cr.i}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
  }
  if(m.livrable) html+=`<div class="livrable"><div class="livrable-l">Livrable attendu</div><strong>${m.livrable}</strong></div>`;
  // Situation imprévue si moy >= 15
  const moy=Object.values(ud.missions).filter(x=>x.comp===m.comp&&x.score!=null).map(x=>x.score);
  const moyComp=moy.length>=2?moy.reduce((a,b)=>a+b,0)/moy.length:0;
  const imprev=IMPREVU[getResKey(m.comp)]||IMPREVU[m.comp];
  if(moyComp>=15&&imprev){
    const siqid=`q_${id}_imprevu`;const siSaved=savedReps[siqid]||'';
    html+=`<div class="imprevu"><div class="imprevu-l"><div class="imprevu-dot"></div>Situation imprévue — niveau Professionnel compétent/Professionnel performant requis</div><div class="imprevu-txt"><strong>${imprev.titre} :</strong> ${imprev.txt}</div><div class="qi"><span class="qn">⚡</span>${imprev.q}<textarea class="zone-rep${siSaved?' saved':''}" id="${siqid}" placeholder="Gère cette situation imprévue…" oninput="autoSaveRep('${id}','${siqid}',this)">${siSaved}</textarea></div></div>`;
  }
  html = '<div style="font-size:11px;color:#4A5568;background:#F1F5F9;border-radius:6px;padding:6px 10px;margin-bottom:10px">🔒 Le copier-coller est désactivé dans les réponses : rédige avec tes propres mots.</div>' + html;
  document.getElementById('mo-mission').innerHTML=html;
  if(typeof integDemarrer === 'function') integDemarrer(id);
  // Afficher le bouton coup de pouce si une ressource existe
  const cpBtn = document.getElementById('cp-btn');
  if(cpBtn){
    const resCp = getRes(m.comp, m.palier);
    if(resCp){ cpBtn.classList.add('visible'); cpBtn.dataset.missionId = m.id; }
    else { cpBtn.classList.remove('visible'); }
  }
  // Feedback existant
  const fb=ud.missions[id]?.feedback;
  const tabFb=document.getElementById('tab-fb');
  const blocProf=renderDecisionProf(ud.missions[id]);
  if(fb||blocProf){tabFb.style.display='';document.getElementById('mo-fb').innerHTML=blocProf+(fb?renderFb(fb):'');}
  else tabFb.style.display='none';
  // Bouton soumettre
  const st=ud.missions[id]?.status;
  const tent=ud.missions[id]?.tentatives||0;
  majBoutonsMission(id);
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
// ═══ Boutons de la fenêtre mission (25/09/2026) ═══
// Règles :
//  • mission validée → plus de soumission possible
//  • mission "à examiner" (= note sous le seuil de validation de la classe,
//    11 par défaut, fixé par le serveur) → l'élève peut corriger ses réponses
//    et soumettre une 2e (et dernière) fois
//  • "Effacer mes réponses" n'existe que pour un brouillon jamais soumis :
//    une mission déjà corrigée est enregistrée sur le serveur, l'effacer
//    dans le navigateur ne ferait que désynchroniser l'élève.
function majBoutonsMission(id){
  const m = gUD().missions[id] || {};
  const st = m.status, tent = m.tentatives || 0;
  const btnS = document.getElementById('btn-submit');
  const btnR = document.getElementById('btn-reset');
  if(btnS){
    btnS.style.display=''; btnS.disabled=false; btnS.style.opacity='1';
    if(st==='done'){ btnS.style.display='none'; }
    else if(tent>=2){ btnS.textContent='Tentatives épuisées (2/2)'; btnS.disabled=true; btnS.style.opacity='.5'; }
    else if(tent===1){ btnS.textContent='✏️ Soumettre ma correction (dernière tentative)'; }
    else { btnS.textContent='Soumettre mes réponses'; }
  }
  if(btnR){
    const soumise = tent>0 || st==='att' || st==='done';
    btnR.style.display = soumise ? 'none' : '';
  }
}
function resetMission(){
  if(!CM)return;
  const m=gUD().missions[CM.id]||{};
  if(m.tentatives>0||m.status==='att'||m.status==='done'){
    alert('Cette mission a déjà été corrigée : tes réponses sont conservées. Tu peux les modifier directement.');
    return;
  }
  if(!confirm('Effacer toutes tes réponses en cours sur cette mission ? (Rien n\'a encore été envoyé à la correction.)'))return;
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
  const nc=fb.note>=12?'ni-h':fb.note>=8?'ni-m':'ni-l'; // barème de maîtrise (26/09/2026)
  return`<div class="fb-box"><div class="fb-l">Feedback IA<span class="note-ia ${nc}">${fb.note}/20</span></div>${texteFeedbackLisible(fb.texte)}</div>`;
}
// Le feedback de l'IA arrive en « markdown » (**gras**, ---, listes) : on l'affiche proprement.
// Le texte est d'abord échappé, puis seules quelques mises en forme sûres sont appliquées.
function texteFeedbackLisible(t){
  const e = String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return e
    .replace(/^\s*-{3,}\s*$/gm, '<hr style="border:none;border-top:1px solid #E2E8F0;margin:10px 0">')
    .replace(/^#{1,4}\s*(.+)$/gm, '<strong>$1</strong>')
    .replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*\*/g, '')
    .replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\n/g, '<br>');
}
function openCoupDePouce(){
  const overlay = document.getElementById('cp-overlay');
  if(!overlay) return;
  const cpBtn = document.getElementById('cp-btn');
  const mId = cpBtn ? cpBtn.dataset.missionId : null;
  if(mId && CM){
    const res = getRes(CM.comp, CM.palier);
    const cpContent = document.getElementById('cp-content');
    if(cpContent && res){ cpContent.innerHTML = '<div class="res-t" style="font-size:13px;font-weight:700;margin-bottom:10px">'+res.t+'</div><div class="res-b">'+res.c+'</div>'; }
  }
  overlay.classList.add('open');
}
function closeCoupDePouce(){
  const overlay = document.getElementById('cp-overlay');
  if(overlay) overlay.classList.remove('open');
}
// ══ GESTION FENÊTRE MISSION ══

function closeMo(){
  if(typeof integEnregistrer === 'function'){ integEnregistrer(); INTEG = null; } // fin de la session d'écriture
  stopMoTimer();
  const mo=document.getElementById('mo');
  const modal=document.querySelector('.modal');
  const tb=document.getElementById('mo-taskbar');
  if(mo){ mo.classList.remove('open'); mo.classList.remove('on'); }
  if(modal){ modal.style.display='none'; modal.style.width=''; modal.style.height=''; modal.style.left=''; modal.style.top=''; modal.style.transform='translate(-50%,-50%)'; }
  if(tb){ tb.classList.remove('visible'); }
  moIsFullscreen=false;
}

function moMinimize(){
  if(typeof integEnregistrer === 'function') integEnregistrer();
  const modal=document.querySelector('.modal');
  const mo=document.getElementById('mo');
  const tb=document.getElementById('mo-taskbar');
  const title=document.getElementById('mo-t');
  if(!modal||!mo||!tb) return;
  modal.style.display='none';
  mo.classList.remove('on');
  mo.classList.remove('open');
  const tbTitle=document.getElementById('mo-taskbar-title');
  if(tbTitle&&title) tbTitle.textContent=title.textContent||'Mission en cours';
  tb.classList.add('visible');
}

function moRestore(){
  if(typeof integReprendre === 'function') integReprendre();
  const modal=document.querySelector('.modal');
  const mo=document.getElementById('mo');
  const tb=document.getElementById('mo-taskbar');
  if(!modal||!mo||!tb) return;
  mo.classList.add('open');
  mo.classList.add('on');
  modal.style.display='flex';
  tb.classList.remove('visible');
  // Réinitialiser position si hors écran
  const rect=modal.getBoundingClientRect();
  if(rect.left<0||rect.top<0){
    modal.style.left='50%';
    modal.style.top='50%';
    modal.style.transform='translate(-50%,-50%)';
  }
}

var moIsFullscreen=false;
function moFullscreen(){
  const modal=document.querySelector('.modal');
  const btn=document.getElementById('mo-fs-btn');
  if(!modal) return;
  if(!moIsFullscreen){
    modal.dataset.prevW=modal.style.width;
    modal.dataset.prevH=modal.style.height;
    modal.dataset.prevL=modal.style.left;
    modal.dataset.prevT=modal.style.top;
    modal.dataset.prevTr=modal.style.transform;
    modal.style.width='100vw';
    modal.style.height='100vh';
    modal.style.left='0';
    modal.style.top='0';
    modal.style.transform='none';
    modal.style.borderRadius='0';
    if(btn) btn.textContent='⊡';
    moIsFullscreen=true;
  } else {
    modal.style.width=modal.dataset.prevW||'740px';
    modal.style.height=modal.dataset.prevH||'88vh';
    modal.style.left=modal.dataset.prevL||'50%';
    modal.style.top=modal.dataset.prevT||'50%';
    modal.style.transform=modal.dataset.prevTr||'translate(-50%,-50%)';
    modal.style.borderRadius='14px';
    if(btn) btn.textContent='⛶';
    moIsFullscreen=false;
  }
}

// ══ DRAG — déplacement de la fenêtre par le header ══
function initModalDrag(){
  const modal=document.querySelector('.modal');
  const header=document.querySelector('.mo-h');
  if(!modal||!header) return;
  let isDragging=false, startX=0, startY=0, startL=0, startT=0;
  header.style.cursor='grab';
  header.addEventListener('mousedown',function(e){
    if(e.target.tagName==='BUTTON') return;
    isDragging=true;
    header.style.cursor='grabbing';
    // Fixer la position absolue au moment du drag
    const rect=modal.getBoundingClientRect();
    modal.style.left=rect.left+'px';
    modal.style.top=rect.top+'px';
    modal.style.transform='none';
    startX=e.clientX; startY=e.clientY;
    startL=rect.left; startT=rect.top;
    e.preventDefault();
  });
  document.addEventListener('mousemove',function(e){
    if(!isDragging) return;
    const dx=e.clientX-startX, dy=e.clientY-startY;
    const newL=Math.max(0,Math.min(window.innerWidth-100, startL+dx));
    const newT=Math.max(0,Math.min(window.innerHeight-50, startT+dy));
    modal.style.left=newL+'px';
    modal.style.top=newT+'px';
  });
  document.addEventListener('mouseup',function(){
    if(isDragging){ isDragging=false; header.style.cursor='grab'; }
  });
}

// Initialiser le drag quand la modal s'ouvre
const _origOpenMission=typeof openMission==='function'?openMission:null;
function moTab(i,el){
  document.querySelectorAll('.mo-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.mo-tp').forEach(t=>t.classList.remove('on'));
  if(el)el.classList.add('on');
  document.querySelectorAll('.mo-tp')[i]?.classList.add('on');
}
// La correction des missions passe désormais exclusivement par le serveur
// (voir js/correction-serveur.js, qui définit soumettreReponses() et est
// chargé après ce fichier dans index.html). L'ancienne version avec appel
// direct à l'API Anthropic depuis le navigateur a été retirée (code mort,
// jamais exécutée, et clé API exposée côté client).

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
  
  // Maîtrisé : P3 ou P4 validé + moyenne ≥ 15 (très bonne maîtrise — barème du 26/09/2026)
  if((hasP3 || hasP4) && avg >= 15) return 4;
  // Acquis : P2 + P3 validés OU >= 75% des missions faites avec bonne moyenne
  if(hasP2 && hasP3) return 3;
  if(totalDone >= Math.ceil(totalMissions * 0.75) && avg >= 12) return 3; // moyenne satisfaisante
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
    {label:'Acquis',         col:'#185FA5', bg:'#F0FFF4', icon:'◕'},
    {label:'Maîtrisé',      col:'#185FA5', bg:'#EBF4FF', icon:'●'}
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
    const scores = mDone.filter(function(m){ return ud.missions[m.id].score != null; }).map(function(m){ return ud.missions[m.id].score; });
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


// Initialiser le drag de la modal au chargement
document.addEventListener('DOMContentLoaded', function(){ setTimeout(initModalDrag, 500); });


// ═══ Choix cliquables pour les questions à options A) B) C)… (25/09/2026) ═══
// Beaucoup de questions disent "Coche…", "Laquelle…", "Remets dans l'ordre…"
// mais n'affichaient qu'une zone de texte. On détecte les options dans l'énoncé
// et on affiche des cases cliquables. Le choix est écrit en 1re ligne de la
// zone de réponse ("Réponse : A, C" ou "Ordre : B → A → C") : la correction IA
// reçoit donc exactement le même format texte qu'avant, sans rien changer côté serveur.
// Brouillon d'une question (26/09/2026) : si l'énoncé a été reformulé depuis,
// on retrouve la réponse de l'élève par le numéro de la question (1.2, 2.1…).
function reponseSauvee(savedReps, id, i, q, qid){
  if(savedReps[qid]) return savedReps[qid];
  const num = q.split(' ')[0];
  if(!/^\d+\.\d+$/.test(num)) return '';
  const prefixe = 'q_' + id + '_' + i + '_' + num + '_';
  const cles = Object.keys(savedReps).filter(function(k){ return k.indexOf(prefixe) === 0 && savedReps[k]; });
  return cles.length === 1 ? savedReps[cles[0]] : '';
}
function analyserQCM(q){
  const re=/(?:^|\s)([A-F])\)\s+/g;
  const pos=[];let mm;
  while((mm=re.exec(q))!==null){ pos.push({l:mm[1],debut:mm.index+mm[0].length,idx:mm.index}); }
  if(pos.length<2) return null;
  // Les lettres doivent se suivre à partir de A (A, B, C…)
  for(let i=0;i<pos.length;i++){ if(pos[i].l!==String.fromCharCode(65+i)) return null; }
  const options=pos.map(function(p,i){
    let txt=q.substring(p.debut, i+1<pos.length?pos[i+1].idx:q.length);
    txt=txt.replace(/\s*[—–]\s*$/,'').replace(/\s*[.;]\s*$/,'').trim();
    // Dernière option : couper une éventuelle consigne qui suit (". Donne…", ". Justifie…")
    if(i===pos.length-1){ const cut=txt.search(/[.?!]?['’"»]?\s+(Justifie|Explique|Donne|Coche|Réponds|Puis|Pour chaque|Précise|Dans quel)/); if(cut>0) txt=txt.substring(0,cut+1); }
    return {l:p.l, t:txt.replace(/^['"«\s]+|['"»\s]+$/g,'')};
  });
  const avant=q.substring(0,pos[0].idx).toLowerCase();
  let mode='un';
  if(/ordre|classe-les|classe les|numérote/.test(avant) || /dans quel ordre/i.test(q)) mode='ordre';
  else if(/coche les|lesquel(le)?s|identifie les|choisis les|les \d+ (bonne|meilleur|plus|mauvaise)|\d+ bonnes|\bles \d+ |plusieurs/.test(avant)) mode='plusieurs';
  return {mode:mode, options:options};
}
function lireChoixQCM(val){
  const l1=String(val||'').split('\n')[0];
  const mm=l1.match(/^(Réponse|Ordre)\s*:\s*(.*)$/);
  if(!mm) return [];
  return (mm[2].match(/\b[A-F]\b/g)||[]);
}
function renderChoixQCM(qid,qcm,saved){
  const choisis=lireChoixQCM(saved);
  const aide=qcm.mode==='ordre'?'Clique dans l\'ordre':(qcm.mode==='plusieurs'?'Plusieurs réponses possibles':'Une seule réponse');
  return '<div class="qcm-wrap" id="qcm_'+qid+'" data-mode="'+qcm.mode+'" style="margin:8px 0 6px">'
    +'<div style="font-size:10px;font-weight:700;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px">'+aide+'</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:6px">'
    +qcm.options.map(function(o){
      const rang=choisis.indexOf(o.l);
      const court=o.t.length>70?o.t.substring(0,67)+'…':o.t;
      return '<button type="button" class="qcm-opt" data-l="'+o.l+'" onclick="choisirQCM(\''+qid+'\',\''+o.l+'\')" title="'+o.t.replace(/"/g,'&quot;')+'" style="'+styleOptQCM(rang>=0)+'">'
        +'<span class="qcm-case" style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:'+(qcm.mode==='un'?'50%':'4px')+';border:1.5px solid currentColor;font-size:10px;font-weight:800;margin-right:6px">'
        +(rang>=0?(qcm.mode==='ordre'?(rang+1):'✓'):'')+'</span><strong style="margin-right:4px">'+o.l+')</strong>'+court+'</button>';
    }).join('')
    +'</div></div>';
}
function styleOptQCM(on){
  return 'display:inline-flex;align-items:center;text-align:left;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:12px;line-height:1.35;max-width:100%;'
    +(on?'background:#185FA5;color:#fff;border:1.5px solid #185FA5':'background:#fff;color:#1A2E4A;border:1.5px solid #CBD5E0');
}
function choisirQCM(qid,lettre){
  const wrap=document.getElementById('qcm_'+qid), ta=document.getElementById(qid);
  if(!wrap||!ta) return;
  const mode=wrap.dataset.mode;
  let choisis=lireChoixQCM(ta.value);
  if(mode==='un') choisis=(choisis[0]===lettre)?[]:[lettre];
  else if(choisis.indexOf(lettre)>=0) choisis=choisis.filter(function(x){return x!==lettre;});
  else choisis.push(lettre);
  if(mode==='plusieurs') choisis.sort();
  const lignes=ta.value.split('\n');
  const aUneLigneChoix=/^(Réponse|Ordre)\s*:/.test(lignes[0]||'');
  const reste=(aUneLigneChoix?lignes.slice(1):lignes).join('\n');
  const ligne=choisis.length?(mode==='ordre'?'Ordre : '+choisis.join(' → '):'Réponse : '+choisis.join(', ')):'';
  ta.value=ligne?(ligne+(reste.trim()?'\n'+reste:'\n')):reste;
  if(typeof integNoterFrappe === 'function') integNoterFrappe(ligne.length); // clic sur une case = saisie de l'élève
  if(CM) autoSaveRep(CM.id,qid,ta);
  majChoixQCM(qid);
}
function majChoixQCM(qid){
  const wrap=document.getElementById('qcm_'+qid), ta=document.getElementById(qid);
  if(!wrap||!ta) return;
  const mode=wrap.dataset.mode, choisis=lireChoixQCM(ta.value);
  wrap.querySelectorAll('.qcm-opt').forEach(function(b){
    const rang=choisis.indexOf(b.dataset.l);
    b.setAttribute('style',styleOptQCM(rang>=0));
    const c=b.querySelector('.qcm-case');
    if(c) c.textContent=rang>=0?(mode==='ordre'?String(rang+1):'✓'):'';
  });
}


// Décision du professeur sur la copie (26/09/2026) : note revue + commentaire
function renderDecisionProf(m){
  if(!m || (m.note_revue == null && !m.commentaire_prof)) return '';
  const e = function(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
  return '<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-left:4px solid #16A34A;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12.5px;line-height:1.55;color:#14532D">'
    + '<div style="font-weight:800;margin-bottom:4px">👩‍🏫 Ton professeur a relu ta copie' + (m.note_revue != null ? ' — note retenue : ' + String(m.note_revue).replace('.', ',') + '/20' : '') + '</div>'
    + (m.commentaire_prof ? '<div style="white-space:pre-wrap">' + e(m.commentaire_prof) + '</div>' : '')
    + '</div>';
}


// ═══ Intégrité des copies (26/09/2026) ═══
// Copier-coller bloqué dans les réponses ; copie du feedback bloquée ;
// mesures simples envoyées avec la copie : temps passé sur la mission,
// caractères tapés au clavier, tentatives de collage bloquées.
// Ce ne sont que des indices pour l'enseignant, jamais une sanction automatique.
let INTEG = null; // { mid, t0, tapes, collages }

function integDemarrer(mid){
  INTEG = { mid: mid, t0: Date.now(), tapes: 0, collages: 0 };
  const zone = document.getElementById('mo-mission');
  if(zone && !zone.dataset.integ){
    zone.dataset.integ = '1';
    const bloquer = function(e){
      if(!e.target || !e.target.classList || !e.target.classList.contains('zone-rep')) return;
      e.preventDefault();
      if(INTEG) INTEG.collages++;
      integMessage('📋 Le copier-coller est désactivé : rédige ta réponse avec tes propres mots.');
    };
    zone.addEventListener('paste', bloquer, true);
    zone.addEventListener('drop', bloquer, true);
    zone.addEventListener('input', function(e){
      if(!INTEG || !e.target.classList || !e.target.classList.contains('zone-rep')) return;
      if(e.inputType === 'insertText' || e.inputType === 'insertCompositionText') INTEG.tapes += (e.data || '').length;
      else if(e.inputType === 'insertLineBreak') INTEG.tapes += 1;
    }, true);
  }
  const fb = document.getElementById('mo-fb');
  if(fb && !fb.dataset.integ){
    fb.dataset.integ = '1';
    fb.style.userSelect = 'none'; fb.style.webkitUserSelect = 'none';
    ['copy','cut','contextmenu','dragstart'].forEach(function(ev){
      fb.addEventListener(ev, function(e){ e.preventDefault(); if(ev === 'copy' || ev === 'cut') integMessage('Le feedback ne peut pas être copié : relis-le et corrige avec tes propres mots.'); }, true);
    });
  }
}
function integNoterFrappe(n){ if(INTEG) INTEG.tapes += Math.max(0, n|0); }
function integReprendre(){ if(INTEG) INTEG.t0 = Date.now(); }
// Ajoute la session en cours aux compteurs de la mission (mémorisés dans le navigateur)
function integEnregistrer(){
  if(!INTEG || !INTEG.mid) return;
  const ud = gUD();
  if(!ud.missions[INTEG.mid]) ud.missions[INTEG.mid] = { status: 'todo', id: INTEG.mid };
  const m = ud.missions[INTEG.mid];
  const cumul = m.integ || { secondes: 0, tapes: 0, collages_bloques: 0 };
  cumul.secondes += Math.min(7200, Math.max(0, Math.round((Date.now() - INTEG.t0) / 1000)));
  cumul.tapes += INTEG.tapes;
  cumul.collages_bloques += INTEG.collages;
  m.integ = cumul;
  sUD(ud);
  INTEG.t0 = Date.now(); INTEG.tapes = 0; INTEG.collages = 0;
}
// Valeurs envoyées au serveur avec la copie
function integPourSoumission(mid, reponses){
  if(INTEG && INTEG.mid === mid) integEnregistrer();
  const m = gUD().missions[mid] || {};
  const c = m.integ || { secondes: 0, tapes: 0, collages_bloques: 0 };
  const longueur = Object.keys(reponses || {}).reduce(function(a, k){ return a + String(reponses[k] || '').length; }, 0);
  return { secondes: c.secondes, tapes: c.tapes, collages_bloques: c.collages_bloques, longueur: longueur };
}
function integMessage(txt){
  let t = document.getElementById('integ-toast');
  if(!t){
    t = document.createElement('div'); t.id = 'integ-toast';
    t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#1A2E4A;color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;z-index:5000;box-shadow:0 6px 20px rgba(0,0,0,.25);max-width:90vw;text-align:center';
    document.body.appendChild(t);
  }
  t.textContent = txt; t.style.display = 'block';
  clearTimeout(t._h); t._h = setTimeout(function(){ t.style.display = 'none'; }, 3200);
}
window.addEventListener('beforeunload', function(){ try{ integEnregistrer(); }catch(e){} });
