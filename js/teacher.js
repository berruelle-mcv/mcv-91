// ================================================
//   LABORO Sport & Outdoor — Vue enseignant
//   Vue compétences, vue classe, indicateurs pédagogiques
//   Version 2.0 — Catalogue 176 produits
// ================================================

// ═══ VUE COMPÉTENCES ENSEIGNANT ═══
function renderCompetencesEnseignant(){
  const legend = document.getElementById('comp-legend');
  const grid = document.getElementById('comp-grid');
  const allUsers = allU().filter(function(u){ return u.mail && u.classe !== 'enseignant'; });

  if(legend){
    const total = allUsers.length;
    legend.innerHTML = '<div style="background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--gb);margin-bottom:4px">'
      + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:4px">Vue référentiel — Progression de la classe</div>'
      + '<div style="font-size:11px;color:#6B7280">'+(total>0?total+' élève(s) connecté(s)':'Aucun élève connecté pour le moment.')+'</div>'
      + '</div>';
  }

  if(!grid) return;

  const allS = gS();

  grid.innerHTML = COMP.map(function(c){
    const levels = allUsers.map(function(u){
      const ud = allS[u.mail] || {missions:{}, competences:{}};
      return calcNiveauComp(c.code, ud);
    });

    const counts = [0,0,0,0,0];
    levels.forEach(function(l){ counts[l]++; });
    const total = allUsers.length;
    const acquis = counts[3] + counts[4];
    const enCours = counts[1] + counts[2];
    const pctAcquis = total > 0 ? Math.round(acquis/total*100) : 0;

    const niveaux = [
      {label:'Non démarré', col:'#A0AEC0'},
      {label:'Découverte',  col:'#63B3ED'},
      {label:'En progression', col:'#4A6FA5'},
      {label:'Acquis',     col:'#185FA5'},
      {label:'Maîtrisé',  col:'#0A2540'}
    ];

    const barSegments = total > 0 ? niveaux.map(function(n,i){
      const pct = Math.round(counts[i]/total*100);
      return pct > 0 ? '<div style="height:100%;width:'+pct+'%;background:'+n.col+';flex-shrink:0" title="'+n.label+' : '+counts[i]+'"></div>' : '';
    }).join('') : '<div style="height:100%;width:100%;background:#E2E8F0"></div>';

    const statusColor = pctAcquis >= 75 ? '#185FA5' : pctAcquis >= 40 ? '#D97706' : '#A0AEC0';

    return '<div class="cc" style="border-left:4px solid '+statusColor+'">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
      + compBadge(c.code)
      + '<span style="font-size:11px;font-weight:800;color:'+statusColor+'">'+(total>0?pctAcquis+'% acquis':'—')+'</span>'
      + '</div>'
      + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:10px">'+c.label+'</div>'
      + (total > 0
        ? '<div style="display:flex;height:10px;border-radius:8px;overflow:hidden;margin-bottom:8px">'+barSegments+'</div>'
          + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
          + niveaux.map(function(n,i){
              return counts[i] > 0
                ? '<span style="font-size:9px;font-weight:700;color:'+n.col+';background:'+n.col+'1A;padding:2px 7px;border-radius:8px">'+n.label+' : '+counts[i]+'</span>'
                : '';
            }).join('')
          + '</div>'
        : '<div style="height:10px;background:#E2E8F0;border-radius:8px;margin-bottom:8px"></div>'
          + '<div style="font-size:11px;color:#9CA3AF;margin-bottom:8px">Aucun élève connecté</div>')
      + '<div style="font-size:10px;color:#9CA3AF;border-top:1px solid #F3F4F6;padding-top:6px">'
      + (total > 0 ? acquis+'/'+total+' élèves ont acquis · '+enCours+' en cours' : 'En attente de données')
      + '</div>'
      + '</div>';
  }).join('');
}

// ═══ FICHE PRODUIT ═══
function openProduit(id){
  const p = PRODUITS.find(function(x){ return x.id===id; });
  if(!p) return;

  const c = CAT_CFG[p.cat] || {col:'#4A6FA5', light:'#EBF4FF'};
  const pImg = PROD_IMAGES[p.id] || '';
  const pvHT = (p.pv/1.2).toFixed(2);
  const margeE = ((p.pv/1.2) - p.pa).toFixed(2);

  const stockHtml = p.stock===0
    ? '<span style="color:#7B2FBE;font-weight:700">Sur commande</span>'
    : p.stock<=p.seuil
    ? '<span style="color:#D97706;font-weight:700">⚠ Stock faible — '+p.stock+' u.</span>'
    : '<span class="u-success">✓ '+p.stock+' en stock</span>';

  const nBg = {'Débutant':'#EBF4FF','Intermédiaire':'#EBF4FF','Expert':'#FEE2E2','Compétition':'#FEE2E2','Tous niveaux':'#F3F4F6','Pro':'#EBF4FF','Entraînement':'#F0FFF4','Loisir':'#FFF7ED','Spécialisé':'#FAF5FF'};
  const nCo = {'Débutant':'#185FA5','Intermédiaire':'#2D5282','Expert':'#C53030','Compétition':'#C53030','Tous niveaux':'#6B7280','Pro':'#185FA5','Entraînement':'#27AE60','Loisir':'#D97706','Spécialisé':'#7B2FBE'};

  // Pastilles coloris
  const colorisHtml = p.coloris && p.coloris.length
    ? '<div style="display:flex;gap:6px;align-items:center;margin-bottom:10px">'
      + '<span style="font-size:10px;color:#6B7280;font-weight:600">Coloris :</span>'
      + p.coloris.map(function(col){
          return '<div style="width:18px;height:18px;border-radius:50%;background:'+col+';border:2px solid rgba(0,0,0,.12);flex-shrink:0" title="'+col+'"></div>';
        }).join('')
      + '</div>'
    : '';

  // Tailles
  const taillesHtml = p.tailles && p.tailles.length
    ? '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">'
      + '<span style="font-size:10px;color:#6B7280;font-weight:600;margin-right:2px">Tailles :</span>'
      + p.tailles.map(function(t){
          return '<span style="background:#F3F4F6;color:#374151;font-size:10px;font-weight:600;padding:3px 8px;border-radius:6px">'+t+'</span>';
        }).join('')
      + '</div>'
    : '';

  // Argumentaire 3 points
  const args = [
    '✓ ' + p.desc.split(',')[0],
    '✓ Marque LABORO — 100% Sport & Outdoor',
    '✓ Disponible' + (p.stock > 0 ? ' en stock immédiat' : ' sur commande')
  ];
  const argsHtml = '<div style="margin-bottom:10px">'
    + args.map(function(a){
        return '<div style="font-size:11px;color:#374151;padding:4px 0;border-bottom:1px solid #F3F4F6">'+a+'</div>';
      }).join('')
    + '</div>';

  // Produits complémentaires — même catégorie, différent produit
  const comps = PRODUITS.filter(function(x){ return x.cat===p.cat && x.id!==p.id; }).slice(0,3);
  const compsHtml = comps.map(function(cp){
    const cpImg = PROD_IMAGES[cp.id] || '';
    const cpC = CAT_CFG[cp.cat] || {col:'#4A6FA5'};
    return '<div onclick="openProduit(\''+cp.id+'\')" style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid #E5E7EB;border-radius:10px;cursor:pointer;background:#fff" onmouseover="this.style.borderColor=\''+cpC.col+'\'" onmouseout="this.style.borderColor=\'#E5E7EB\'">'
      +'<div style="width:44px;height:36px;background:#F8FAFC;border-radius:6px;overflow:hidden;flex-shrink:0">'
      +(cpImg ? '<img src="'+cpImg+'" style="width:100%;height:100%;object-fit:contain;padding:2px">' : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#94A3B8">IMG</div>')
      +'</div>'
      +'<div style="flex:1;min-width:0"><div style="font-size:10px;font-weight:700;color:#1A2E4A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+cp.nom+'</div>'
      +'<div style="font-size:10px;color:'+cpC.col+';font-weight:700">'+cp.pv+' €</div></div></div>';
  }).join('');

  const fiche = document.getElementById('fiche-produit');

  fiche.innerHTML = '<div style="border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid #E8EDF5">'
    // En-tête image + infos
    +'<div style="display:flex;min-height:200px">'
    +'<div style="width:200px;flex-shrink:0;background:#F8FAFC;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center">'
    +(pImg
      ? '<img src="'+pImg+'" alt="'+p.nom+'" style="width:100%;height:100%;object-fit:contain;padding:12px" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">'
        +'<div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:11px;color:#94A3B8">LABORO</div>'
      : '<div style="font-size:11px;color:#94A3B8">LABORO</div>')
    +'<div style="position:absolute;bottom:8px;left:8px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);font-size:9px;font-weight:800;color:#374151;padding:3px 10px;border-radius:20px;border:1px solid rgba(0,0,0,.08)">'+p.marque+'</div>'
    +'</div>'
    +'<div style="flex:1;padding:20px;display:flex;flex-direction:column;justify-content:space-between">'
    +'<div>'
    +'<div style="font-size:10px;color:var(--gm);margin-bottom:4px">'+p.cat+' · Réf. '+p.ref+'</div>'
    +'<div style="font-size:19px;font-weight:900;color:#1A2E4A;line-height:1.2;margin-bottom:6px">'+p.nom+'</div>'
    +'<div style="font-size:12px;color:#4B5563;line-height:1.6;margin-bottom:8px">'+p.desc+'</div>'
    +'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
    +(p.niveau?'<span style="background:'+(nBg[p.niveau]||'#F3F4F6')+';color:'+(nCo[p.niveau]||'#6B7280')+';font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+p.niveau+'</span>':'')
    +'</div>'
    +colorisHtml
    +taillesHtml
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">'
    +'<div style="background:#F0F4FF;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Achat HT</div><div style="font-size:18px;font-weight:900;color:#1A2E4A">'+p.pa+' €</div></div>'
    +'<div style="background:#F0FFF4;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Vente TTC</div><div style="font-size:18px;font-weight:900;color:#27AE60">'+p.pv+' €</div><div style="font-size:10px;color:#6B7280">'+pvHT+' € HT</div></div>'
    +'<div style="background:#FFF7ED;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Marge</div><div style="font-size:18px;font-weight:900;color:'+c.col+'">'+p.mar+' %</div><div style="font-size:10px;color:#6B7280">'+margeE+' €/u</div></div>'
    +'</div></div></div>'
    // Séparateur
    +'<div style="height:1px;background:#F3F4F6"></div>'
    // Caractéristiques + Argumentaire + Produits complémentaires
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0">'
    +'<div style="padding:16px 18px;border-right:1px solid #F3F4F6">'
    +'<div style="font-size:11px;font-weight:800;color:#1A2E4A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">📋 Caractéristiques</div>'
    +'<div style="font-size:11px">Stock : '+stockHtml+'</div>'
    +(p.seuil>0?'<div style="font-size:10px;color:#9CA3AF;margin-top:2px">Seuil : '+p.seuil+' u. · TVA '+p.tva+'%</div>':'')
    +(p.tailles&&p.tailles.length?'<div style="font-size:10px;color:#6B7280;margin-top:6px">Tailles : '+p.tailles.join(', ')+'</div>':'')
    +'</div>'
    +'<div style="padding:16px 18px;border-right:1px solid #F3F4F6">'
    +'<div style="font-size:11px;font-weight:800;color:#1A2E4A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">💬 Argumentaire vendeur</div>'
    +argsHtml
    +'</div>'
    +'<div style="padding:16px 18px">'
    +'<div style="font-size:11px;font-weight:800;color:#1A2E4A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">🔗 Produits complémentaires</div>'
    +(compsHtml?'<div style="display:flex;flex-direction:column;gap:6px">'+compsHtml+'</div>':'<div style="font-size:11px;color:#9CA3AF">Aucun produit associé.</div>')
    +'</div></div>'
    // Actions
    +'<div style="padding:12px 18px;background:#F8FAFF;display:flex;gap:10px;border-top:1px solid #F3F4F6">'
    +'<button onclick="document.getElementById(\'fiche-produit\').classList.remove(\'on\')" style="background:none;border:1px solid #E5E7EB;padding:8px 14px;border-radius:8px;font-size:12px;cursor:pointer;color:#374151;font-weight:600">← Retour</button>'
    +'<button onclick="ajouterDevis(\''+p.id+'\')" style="background:'+c.col+';border:none;color:#fff;padding:8px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">+ Ajouter au devis</button>'
    +'</div></div>';

  fiche.classList.add('on');
  fiche.scrollIntoView({behavior:'smooth', block:'start'});
}

function renderClasse(){
  const allUsers=allU().filter(u=>u.mail&&!u.mail.includes('berruelle'));
  const classes=[...new Set(allUsers.map(u=>u.classe||'Inconnue'))].sort();
  const tabsEl=document.getElementById('classe-tabs');
  if(tabsEl){
    tabsEl.innerHTML=`<div style="font-size:11px;font-weight:700;color:var(--gm);margin-right:4px">Filtrer :</div>
      <div class="cls-tab${classeFiltre===''?' on':''}" onclick="filtrerClasse('',this)">Toutes <span class="${classeFiltre===''?'cls-count':'cls-count-off'}">${allUsers.length}</span></div>
      ${classes.map(cls=>{
        const n=allUsers.filter(u=>(u.classe||'Inconnue')===cls).length;
        const att=allUsers.filter(u=>(u.classe||'Inconnue')===cls&&Object.values(u.missions||{}).some(m=>m.status==='att')).length;
        const clsColor=cls.includes('2nde')?'#2E7D5E':cls.includes('Term')?'#7B2D42':'#185FA5';
        const clsBg=cls.includes('2nde')?'#EBF4FF':cls.includes('Term')?'#F9E8EE':'#E6F1FB';
        const activeStyle=classeFiltre===cls?`background:${clsColor};color:#fff;border-color:${clsColor}`:`border-color:${clsColor};color:${clsColor}`;
        return`<div class="cls-tab${classeFiltre===cls?' on':''}" onclick="filtrerClasse('${cls}',this)" style="${activeStyle}">${cls} <span style="font-size:9px;background:${classeFiltre===cls?'rgba(255,255,255,.25)':clsBg};color:${classeFiltre===cls?'#fff':clsColor};padding:1px 5px;border-radius:8px">${n}</span>${att>0?` <span style="font-size:9px;background:var(--am);color:#fff;padding:1px 5px;border-radius:8px">${att}⚡</span>`:''}</div>`;
      }).join('')}`;
  }

  const users=classeFiltre?allUsers.filter(u=>(u.classe||'Inconnue')===classeFiltre):allUsers;
  const statsEl=document.getElementById('classe-stats');
  if(statsEl&&users.length){
    const totalDone=users.reduce((a,u)=>a+Object.values(u.missions||{}).filter(m=>m.status==='done').length,0);
    const totalAtt=users.reduce((a,u)=>a+Object.values(u.missions||{}).filter(m=>m.status==='att').length,0);
    const allScores=users.flatMap(u=>Object.values(u.missions||{}).filter(m=>m.score).map(m=>m.score));
    const avgGlobal=allScores.length?(allScores.reduce((a,b)=>a+b,0)/allScores.length).toFixed(1):'—';
    statsEl.innerHTML=`
      <div style="background:var(--bc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--bl)">${users.length}</div><div class="u-label-up">Élèves</div></div>
      <div style="background:var(--vc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--vt)">${totalDone}</div><div class="u-label-up">Missions validées</div></div>
      <div style="background:var(--ac);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--am)">${totalAtt}</div><div class="u-label-up">En attente</div></div>
      <div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">${avgGlobal}/20</div><div class="u-label-up">Moyenne classe</div></div>`;
  } else if(statsEl){
    statsEl.innerHTML='';
  }

  const titreEl=document.getElementById('cl-titre');
  if(titreEl)titreEl.textContent=classeFiltre?`Classe : ${classeFiltre} — ${users.length} élève(s)`:'Toutes les classes — cliquer sur un élève pour sa fiche';

  const lc=['var(--gb)','#85B7EB','var(--bl)','var(--vt)','#27500A'];
  const tb=document.getElementById('cl-tbody');
  if(!users.length){
    tb.innerHTML=`<tr><td colspan="9" style="padding:16px;color:var(--gm);font-size:12px">${classeFiltre?'Aucun élève dans cette classe pour le moment.':'Aucun élève connecté pour le moment.'}</td></tr>`;
    renderMDJListe();return;
  }
  tb.innerHTML=users.map(u=>{
    const done=Object.values(u.missions||{}).filter(m=>m.status==='done').length;
    const att=Object.values(u.missions||{}).filter(m=>m.status==='att').length;
    const totalCDP=Object.values(u.missions||{}).reduce((s,m)=>s+(m.coup_de_pouce||0),0);
    const sc2=Object.values(u.missions||{}).filter(m=>m.score).map(m=>m.score);
    const avg=sc2.length?(sc2.reduce((a,b)=>a+b,0)/sc2.length).toFixed(1):'—';
    const sc=calcScore(u);
    const cls=u.classe||'—';
    const c1=Math.max(...COMP.filter(c=>c.g==='G1').map(c=>u.competences?.[c.code]||0),0);
    const c2=Math.max(...COMP.filter(c=>c.g==='G2').map(c=>u.competences?.[c.code]||0),0);
    const c3=Math.max(...COMP.filter(c=>c.g==='G3').map(c=>u.competences?.[c.code]||0),0);
    const c4=Math.max(...COMP.filter(c=>c.g==='G4A'||c.g==='G4B').map(c=>u.competences?.[c.code]||0),0);
    return`<tr data-mail="${u.mail}" onclick="selectEleve('${u.mail}');showFicheEleve('${u.mail}')" style="cursor:pointer;${att>0?'background:var(--ac)':''}">
      <td style="font-weight:700">${u.nom||u.mail}</td>
      <td class="u-label-sm">${cls}</td>
      <td><span class="dl" style="background:${lc[c1]}"></span></td>
      <td><span class="dl" style="background:${lc[c2]}"></span></td>
      <td><span class="dl" style="background:${lc[c3]}"></span></td>
      <td><span class="dl" style="background:${lc[c4]}"></span></td>
      <td style="font-weight:700;color:var(--bl)">${sc}/100</td>
      <td>${(()=>{const pp=calcPosturePro(u);const pl=getPostureLabel(pp);return '<span style="background:'+pl.bg+';color:'+pl.color+';padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700">'+pp+'%</span>';})()}</td>
      <td>${done}${att>0?` <span style="font-size:10px;background:var(--am);color:#fff;padding:1px 5px;border-radius:4px">${att}⚡</span>`:''}</td>
      <td style="font-weight:700;color:${parseFloat(avg)>=11?'var(--vt)':'var(--rg)'}">${avg}</td>
    </tr>`;
  }).join('');
  renderMDJListe();
}

function showFicheEleve(mail){
  const s=gS();const u={mail,...(s[mail]||{missions:{},competences:{}})};
  const nom=u.nom||mail;
  const done=Object.values(u.missions).filter(m=>m.status==='done').length;
  const att=Object.entries(u.missions).filter(([,m])=>m.status==='att');
  const sc2=Object.values(u.missions).filter(m=>m.score).map(m=>m.score);
  const avg=sc2.length?(sc2.reduce((a,b)=>a+b,0)/sc2.length).toFixed(1):'—';
  const sc=calcScore(u);
  const lc=['var(--gb)','#85B7EB','var(--bl)','var(--vt)','#27500A'];
  const ll=['Non démarré','Découverte','En progression','Acquis','Maîtrisé'];
  const ini=nom.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
  const savedObs=s[mail]?.obs_ens||'';
  const totalCDP=Object.values(u.missions).reduce((s,m)=>s+(m.coup_de_pouce||0),0);
  const alerts=[];
  COMP.forEach(c=>{const lv=u.competences[c.code]||0;if(lv===0&&(c.g==='G1'||c.g==='G4A'||c.g==='G4B'))alerts.push({type:'warn',txt:`${c.code} — ${c.label} : non démarrée`});if(lv>=3)alerts.push({type:'ok',txt:`${c.code} — Point fort : ${ll[lv]}`});});
  att.forEach(([mid,mv])=>{const m=MISSIONS.find(x=>x.id===mid);if(m)alerts.push({type:'warn',txt:`${m.titre} — soumise, note IA ${mv.note_ia}/20 — en attente de validation`});});
  document.getElementById('fe-wrap').innerHTML=`<div class="fe">
    <div class="fe-hd"><div style="display:flex;align-items:center;gap:12px"><div class="avu" style="width:44px;height:44px;font-size:16px">${ini}</div><div><div style="font-size:16px;font-weight:700">${nom}</div><div style="font-size:11px;opacity:.8;margin-top:2px">${mail}</div></div></div><div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px"><div style="font-size:28px;font-weight:900">${sc}</div><div style="font-size:10px;opacity:.8">Score LABORO /100</div><button onclick="genererPortfolioEleve('${mail}')" style="padding:6px 12px;background:rgba(255,255,255,.2);color:#fff;border:.5px solid rgba(255,255,255,.4);border-radius:6px;cursor:pointer;font-size:11px;font-weight:700">📄 Portfolio</button></div></div>
    <div class="fe-kpis" style="${totalCDP>0?'grid-template-columns:repeat(5,1fr)':'grid-template-columns:repeat(4,1fr)'}"><div class="fe-kpi"><div class="fe-kv">${done}</div><div class="fe-kl">Validées</div></div><div class="fe-kpi"><div class="fe-kv">${avg}</div><div class="fe-kl">Moyenne /20</div></div><div class="fe-kpi"><div class="fe-kv">${Object.values(u.competences).filter(v=>v>0).length}/12</div><div class="fe-kl">Compétences</div></div><div class="fe-kpi"><div class="fe-kv">${att.length}</div><div class="fe-kl">À valider</div></div>${totalCDP>0?'<div class="fe-kpi" style="background:#FFFBEA"><div class="fe-kv" style="color:#8A6500">'+totalCDP+'</div><div class="fe-kl" style="color:#A07800">💡 Coups de pouce</div></div>':''}</div>
    ${alerts.length?`<div class="fe-sec"><div class="fe-st">Points d'attention</div>${alerts.slice(0,4).map(a=>`<div class="al-row al-${a.type}"><div class="al-dot" style="background:${a.type==='warn'?'var(--am)':'var(--vt)'}"></div>${a.txt}</div>`).join('')}</div>`:''}
    <div class="fe-sec"><div class="fe-st">Progression par compétence</div>${COMP.map(c=>{const lv=u.competences[c.code]||0;return`<div class="cr"><span class="cr-code">${c.code}</span><span class="cr-label">${c.label}</span><div class="cr-bar"><div class="cr-fill" style="width:${lv*25}%;background:${lc[lv]}"></div></div><span class="cr-txt" style="color:${lc[lv]}">${ll[lv]}</span></div>`;}).join('')}</div>
    <div class="fe-sec"><div class="fe-st">Missions</div>
      <div class="mr hdr"><span>Mission</span><span>Comp.</span><span>Tent.</span><span>Note</span><span>Statut</span></div>
      ${Object.entries(u.missions).map(([mid,mv])=>{const m=MISSIONS.find(x=>x.id===mid);if(!m)return'';const nc=mv.score>=17?'nb-h':mv.score>=11?'nb-m':'nb-l';return`<div class="mr"><span style="font-size:11px">${m.titre}</span><span class="u-label-sm">${m.comp} P${m.palier}</span><span style="text-align:center">${mv.tentatives||1}/2</span><span><div class="nb2 ${mv.score?nc:''}">${mv.score?mv.score+'/20':mv.note_ia?'IA:'+mv.note_ia:'-'}</div></span><span>${mv.status==='done'?'<span style="color:var(--vt);font-size:11px;font-weight:700">✓ Validée</span>':mv.status==='att'?`<button onclick="validerMission('${mail}','${mid}')" style="padding:3px 8px;background:var(--bl);color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:11px">Valider ${mv.note_ia}/20</button>`:'-'}</span></div>`;}).join('')}
    </div>
    <div class="fe-sec"><div class="fe-st">Observations enseignant</div><textarea class="obs-area" id="obs-${mail}" placeholder="Observations, points forts, axes de progression…">${savedObs}</textarea><button class="btn-obs-s" onclick="saveObs('${mail}')">Enregistrer</button></div>
  </div>`;
  document.getElementById('fe-wrap').scrollIntoView({behavior:'smooth'});
}

function handleMission(id){
  const ud = gUD();
  const m = MISSIONS.find(function(x){ return x.id===id; });
  if(!m) return;
  const locked = !isPalierUnlocked(m, ud) && CU.classe !== 'enseignant';
  if(locked){
    alert('Palier '+(m.palier-1)+' requis. Valide une mission de ce palier avec une note >= 11/20.');
    return;
  }
  openMission(id);
}

function renderIndicateursPedago(){
  const el = document.getElementById('indic-pedago');
  if(!el || !CU) return;
  if(CU.classe === 'enseignant') return;
  const ud = gUD();
  const allMissions = getMissions();
  const done = allMissions.filter(function(m){ return ud.missions[m.id]?.status==='done'; });
  const scores = done.filter(function(m){ return ud.missions[m.id]?.score; }).map(function(m){ return ud.missions[m.id].score; });
  const avg = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length) : 0;
  const byPalier = [0,0,0,0,0];
  done.forEach(function(m){ byPalier[m.palier]++; });
  const reussi = scores.filter(function(s){ return s>=11; }).length;
  const tauxReussite = scores.length ? Math.round(reussi/scores.length*100) : 0;
  const bestScore = scores.length ? Math.max.apply(null, scores) : 0;
  const palierColors = ['','#4A6FA5','#2D5282','#185FA5','#7B2FBE'];
  const palierLabels = ['','Débutant','Apprenti','Pro compétent','Pro performant'];
  const maxByPalier = Math.max.apply(null, byPalier.slice(1)) || 1;

  el.innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    + '<div class="card"><div class="ct">📊 Mes missions par palier</div><div class="u-flex-col">'
    + [1,2,3,4].map(function(p){
        const count = byPalier[p];
        const pct = Math.round(count/maxByPalier*100);
        return '<div><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:11px;font-weight:700;color:'+palierColors[p]+'">'+palierLabels[p]+'</span><span style="font-size:11px;font-weight:800;color:#1A2E4A">'+count+' mission'+(count>1?'s':'')+'</span></div><div style="background:#E2E8F0;border-radius:6px;height:10px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+palierColors[p]+';border-radius:6px;transition:width .5s"></div></div></div>';
      }).join('')
    + '</div></div>'
    + '<div class="card"><div class="ct">🎯 Ma performance</div><div class="u-grid-2">'
    + '<div style="background:#F0FFF4;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Taux de réussite</div><div style="font-size:24px;font-weight:900;color:'+(tauxReussite>=80?'#185FA5':tauxReussite>=60?'#D97706':'#C53030')+'">'+tauxReussite+'%</div><div class="u-label">note ≥ 11/20</div></div>'
    + '<div style="background:#EBF4FF;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Meilleur score</div><div style="font-size:24px;font-weight:900;color:#2D5282">'+(bestScore>0?bestScore+'/20':'—')+'</div><div class="u-label">sur toutes les missions</div></div>'
    + '<div style="background:#FFF7ED;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Missions terminées</div><div style="font-size:24px;font-weight:900;color:#D97706">'+done.length+'/'+allMissions.length+'</div><div class="u-label">'+Math.round(done.length/allMissions.length*100)+'% complété</div></div>'
    + '<div style="background:#FAF5FF;border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;margin-bottom:4px">Moyenne générale</div><div style="font-size:24px;font-weight:900;color:#7B2FBE">'+(avg>0?avg.toFixed(1)+'/20':'—')+'</div><div class="u-label">sur missions notées</div></div>'
    + '</div></div>'
    + '<div class="card" style="grid-column:1/-1"><div class="ct">📈 Progression vers le niveau suivant</div>'
    + (function(){
        const compAcquis = COMP.filter(function(c){ return calcNiveauComp(c.code,ud)>=3; }).length;
        const pct = Math.round(compAcquis/COMP.length*100);
        const nextMilestone = pct<25?25:pct<50?50:pct<75?75:100;
        return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:6px"><span class="u-subtitle">'+compAcquis+'/'+COMP.length+' compétences acquises ('+pct+'%)</span><span class="u-muted">Prochain palier : '+nextMilestone+'%</span></div><div style="position:relative;background:#E2E8F0;border-radius:10px;height:14px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#185FA5,#0A2540);border-radius:10px;transition:width .6s"></div>'
          +[25,50,75].map(function(mark){ return '<div style="position:absolute;top:0;left:'+mark+'%;width:2px;height:100%;background:#fff;opacity:.6"></div>'; }).join('')
          +'</div><div style="display:flex;justify-content:space-between;font-size:9px;color:#9CA3AF;margin-top:3px"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div></div>';
      })()
    + '</div></div>';
}
