// ── Affichage erreur inline (remplace les alert() natifs) ──
function showLoginError(msg){
  let el = document.getElementById('login-error');
  if(!el){
    el = document.createElement('div');
    el.id = 'login-error';
    el.style.cssText = 'margin-top:10px;padding:10px 14px;background:#FEE2E2;border:1px solid #FCA5A5;border-radius:8px;font-size:12px;color:#B91C1C;font-weight:600;display:flex;align-items:center;gap:8px;animation:fadeIn .2s ease';
    el.innerHTML = '<span style="flex-shrink:0">⚠️</span><span id="login-error-txt"></span>';
    const btn = document.getElementById('btn-li') || document.querySelector('.btn-li');
    if(btn && btn.parentNode) btn.parentNode.insertBefore(el, btn.nextSibling);
  }
  document.getElementById('login-error-txt').textContent = msg;
  el.style.display = 'flex';
  clearTimeout(el._t);
  el._t = setTimeout(function(){ el.style.display='none'; }, 5000);
}

// ================================================
//   LABORO Sport & Outdoor — Authentification, login, logout, onboarding
//   Version 1.0 — Architecture modulaire
// ================================================

// ═══ LOGIN ═══
function updatePoste(){
  const cls=document.getElementById('inp-classe').value;
  const hint=document.getElementById('poste-hint');
  const fg=document.getElementById('fg-poste');
  const sel=document.getElementById('inp-poste');
  // Toujours masquer le champ poste — poste automatique selon la classe
  fg.style.display='none';
  // Afficher/masquer le champ MDP enseignant
  const fgMdp=document.getElementById('fg-mdp');
  if(fgMdp) fgMdp.style.display=(cls==='enseignant')?'block':'none';
  if(!cls) return;
  if(cls==='enseignant'){
    sel.value='';
    if(hint) hint.style.display='none';
  } else if(cls==='2nde'){
    sel.value='Découverte de la famille des métiers MCV';
    if(hint){hint.style.display='block';hint.textContent="Tu découvres les métiers du commerce et de la vente chez LABORO.";}
  } else if(cls.includes('AGEC')){
    sel.value='Conseiller de vente — Showroom & E-commerce';
    if(hint){hint.style.display='block';hint.textContent="Tu travailles au showroom d'Évry et sur laboro-sport.fr.";}
  } else if(cls.includes('PVOC')){
    sel.value='Commercial terrain — Prospection & Vente B2B';
    if(hint){hint.style.display='block';hint.textContent='Tu prospectes et développes le portefeuille clients professionnels de LABORO.';}
  }
}
function doLogin(){
  const mail=document.getElementById('inp-mail').value.trim();
  const cls=document.getElementById('inp-classe').value;

  if(mail.toLowerCase()==='ana'){
    // Menu de choix rapide — accès direct à tous les profils
    const profils = [
      {cls:'enseignant', label:'👨‍🏫 Enseignant'},
      {cls:'2nde', label:'📗 2nde'},
      {cls:'1ere-AGEC', label:'📘 1ère AGEC'},
      {cls:'1ere-PVOC', label:'📘 1ère PVOC'},
      {cls:'Term-AGEC', label:'📕 Term. AGEC'},
      {cls:'Term-PVOC', label:'📕 Term. PVOC'},
    ];
    const overlay = document.createElement('div');
    overlay.id = 'ana-menu';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;display:flex;align-items:center;justify-content:center';
    const box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:16px;padding:28px;min-width:280px;text-align:center';
    box.innerHTML = '<div style="font-size:16px;font-weight:800;color:#1A2E4A;margin-bottom:20px">🔑 Accès rapide Pascal</div>';
    profils.forEach(function(p){
      const btn = document.createElement('button');
      btn.textContent = p.label;
      btn.style.cssText = 'display:block;width:100%;margin-bottom:8px;padding:12px;background:#EBF4FF;color:#1A2E4A;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700';
      btn.onclick = function(){
        document.body.removeChild(overlay);
        const posteMap={
          'enseignant':'Enseignant — Accès direction',
          '2nde':'Découverte des métiers MCV',
          '1ere-AGEC':'Conseiller de vente — Showroom',
          '1ere-PVOC':'Commercial terrain — Prospection',
          'Term-AGEC':'Conseiller de vente — Showroom & E-commerce',
          'Term-PVOC':'Commercial terrain — Prospection & Vente B2B'
        };
        const poste = posteMap[p.cls] || 'Collaborateur LABORO';
        finishLogin('pascal@laboro.fr', p.cls, poste, 'Pascal');
      };
      box.appendChild(btn);
    });
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    return;
  }

  if(!mail||!cls){showLoginError('Merci de renseigner tous les champs.');return}
  if(!mail.includes('@')){showLoginError('Adresse mail invalide — vérifie le format prenom.nom@monlycee.net.');return}
  const posteMap={'enseignant':'Enseignant — Accès direction','2nde':'Découverte de la famille des métiers MCV'};
  const poste=posteMap[cls]||(cls.includes('AGEC')?'Conseiller de vente — Showroom & E-commerce':cls.includes('PVOC')?'Commercial terrain — Prospection & Vente B2B':'');
  if(!poste){showLoginError('Merci de sélectionner ta classe.');return}
  // Vérification mot de passe enseignant
  if(cls==='enseignant'){
    const mdpVal=document.getElementById('inp-mdp')?.value||'';
    if(!mdpVal){showLoginError('Merci de saisir le code d\'accès enseignant.');return}
    // Hash SHA256 côté client
    const hashMdp=async(str)=>{const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')};
    hashMdp(mdpVal).then(h=>{
      if(h!=='3e4b672e60279a8fc681052361892d4a50239106de51b8dacf93dee8e3dd644d'){showLoginError('Code d\'accès incorrect. Contactez Pascal Berruelle.');return}
      finishLogin(mail,cls,poste,null);
    });
    return;
  }
  finishLogin(mail,cls,poste,null);
}
function finishLogin(mail,cls,poste,nomParam){
  const nom=nomParam||mail.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,l=>l.toUpperCase());
  CU={mail,classe:cls,poste,nom};
  localStorage.setItem('laboro_u',JSON.stringify(CU));
  const s=gS();
  const isNew=!s[mail];
  document.getElementById('login').classList.remove('on');
  if(cls==='enseignant'){
    const s2=gS();
    if(!s2['__ens_ob_done']){startObEns();}
    else{showApp();}
  }
  else if(isNew){
    // Charte d'abord, puis onboarding
    setTimeout(function(){
      if(typeof checkCharte === 'function') checkCharte();
      // Démarrer l'onboarding après acceptation de la charte
      const charteEl = document.getElementById('charte-laboro');
      if(charteEl && charteEl.style.display !== 'none'){
        // La charte est visible — on attend qu'elle soit acceptée
        // accepterCharte() appellera startOb() ensuite
        window.__pendingOnboarding = true;
      } else {
        startOb();
      }
    }, 100);
  }
  else{
    setTimeout(function(){
      if(typeof checkCharte === 'function') checkCharte();
      showApp();
    }, 100);
  }
}
function startOb(){
  document.getElementById('onboarding').classList.add('on');
  const prenom=CU.nom.split(' ')[0];
  document.getElementById('ob-prenom').textContent=prenom;
  // Peupler le badge employé
  const badgeNom=document.getElementById('ob-badge-nom');
  const badgePoste=document.getElementById('ob-badge-poste');
  if(badgeNom) badgeNom.textContent=CU.nom||'—';
  if(badgePoste) badgePoste.textContent=CU.poste||'Collaborateur(trice)';
  const badgeNom2=document.getElementById('ob-badge-nom2');
  const badgePoste2=document.getElementById('ob-badge-poste2');
  const badgeInit=document.getElementById('ob-badge-init');
  if(badgeNom2) badgeNom2.textContent=CU.nom||'—';
  if(badgePoste2) badgePoste2.textContent=CU.poste||'Collaborateur(trice)';
  if(badgeInit) badgeInit.textContent=(CU.nom||'?').split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
  // Adapter le contenu selon le niveau
  const cls=CU.classe||'';
  const ob3=document.getElementById('ob3');
  if(ob3){
    let msg='';
    if(cls.includes('Term')){
      msg=`<div class="ob-h1">Prêt(e) pour les CCF ?</div>
      <div class="ob-sub">Cette année, tu passes tes épreuves de certification. LABORO t'y prépare directement.</div>
      <div class="ob-steps">
        <div class="ob-step"><div class="ob-step-n" style="background:#2D5282">E31</div><div>
          <div class="ob-step-t">Sous-épreuve E31 — Conseiller et vendre <span style="font-size:10px;opacity:.7">coef. 3</span></div>
          <div class="ob-step-d">Veille commerciale · Réalisation de la vente · Exécution de la vente · Communication</div>
        </div></div>
        <div class="ob-step"><div class="ob-step-n" style="background:#4A6FA5">E32</div><div>
          <div class="ob-step-t">Sous-épreuve E32 — Suivre les ventes <span style="font-size:10px;opacity:.7">coef. 2</span></div>
          <div class="ob-step-d">Suivi commande · Services associés · Réclamations · Satisfaction client</div>
        </div></div>
        <div class="ob-step"><div class="ob-step-n" style="background:#1A2E4A">E33</div><div>
          <div class="ob-step-t">Sous-épreuve E33 — Développer la relation client <span style="font-size:10px;opacity:.7">coef. 3</span></div>
          <div class="ob-step-d">Information client · Actions de fidélisation · Évaluation</div>
        </div></div>
      </div>
      <div style="background:rgba(255,255,255,.12);border-radius:10px;padding:12px 16px;margin-top:10px;font-size:12px;color:rgba(255,255,255,.85)">
        💡 <strong>Ton portfolio LABORO</strong> reprend exactement les compétences et critères des grilles CCF. Génère-le depuis ton espace avant chaque épreuve.
      </div>`;
    } else if(cls.includes('1ere')||cls.includes('1ère')){
      msg=`<div class="ob-h1">Comment ça fonctionne ?</div>
      <div class="ob-sub">Tu connais déjà les bases. Cette année on va plus loin — missions plus complexes, contextes B2B, gestion de la relation client.</div>
      <div class="ob-steps">
        <div class="ob-step"><div class="ob-step-n" style="background:#2D5282">1</div><div>
          <div class="ob-step-t">📚 Lis la ressource</div>
          <div class="ob-step-d">Chaque mission inclut la méthode. Lis-la avant d'agir — même si tu penses connaître.</div>
        </div></div>
        <div class="ob-step"><div class="ob-step-n" style="background:#4A6FA5">2</div><div>
          <div class="ob-step-t">✍️ Produis en autonomie</div>
          <div class="ob-step-d">Les questions de 1ère demandent de vrais arguments, des calculs, des analyses. Pas de QCM.</div>
        </div></div>
        <div class="ob-step"><div class="ob-step-n" style="background:#1A2E4A">3</div><div>
          <div class="ob-step-t">⭐ Progresse et monte en compétences</div>
          <div class="ob-step-d">Ton score et ton niveau de maîtrise sont suivis par ton enseignant. Vise le niveau Professionnel compétent ou Professionnel performant.</div>
        </div></div>
      </div>`;
    } else {
      // 2nde
      msg=`<div style="font-size:11px;font-weight:700;color:#4A6FA5;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Mode d'emploi</div>
      <div style="font-size:22px;font-weight:900;color:#1A2E4A;margin-bottom:6px">Comment ça fonctionne ?</div>
      <div style="font-size:13px;color:#6B7280;margin-bottom:20px">3 étapes simples pour chaque mission.</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:8px">
        <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;background:#F8FAFF;border-radius:12px;border:1px solid #DBEAFE">
          <div style="width:34px;height:34px;background:#1A2E4A;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;flex-shrink:0">1</div>
          <div><div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:3px">📚 Tu apprends la notion</div>
          <div style="font-size:12px;color:#6B7280;line-height:1.5">Chaque mission commence par une ressource courte. Lis-la — elle contient tout ce qu'il faut savoir.</div></div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;background:#F8FAFF;border-radius:12px;border:1px solid #DBEAFE">
          <div style="width:34px;height:34px;background:#2D5282;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;flex-shrink:0">2</div>
          <div><div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:3px">✍️ Tu réponds aux questions</div>
          <div style="font-size:12px;color:#6B7280;line-height:1.5">Des situations réelles chez LABORO — tu observes, tu identifies, tu complètes. C'est guidé.</div></div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;background:#F8FAFF;border-radius:12px;border:1px solid #DBEAFE">
          <div style="width:34px;height:34px;background:#185FA5;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;flex-shrink:0">3</div>
          <div><div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:3px">⭐ Tu progresses</div>
          <div style="font-size:12px;color:#6B7280;line-height:1.5">Ton enseignant valide tes réponses. Tu montes en compétences et tu débloques de nouvelles missions.</div></div>
        </div>
      </div>`;
    }
    const wrapStart='<div style="background:#fff;border-radius:16px;padding:28px 32px;max-width:560px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.15)">';
    const navHtml='<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px"><button class="ob-btn-prev" onclick="obPrev()" style="background:#F3F4F6;border:none;color:#374151;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">← Précédent</button><div style="display:flex;gap:10px"><button onclick="skipOb()" style="background:none;border:1px solid #E5E7EB;color:#6B7280;padding:10px 16px;border-radius:8px;font-size:12px;cursor:pointer">Passer</button><button class="ob-btn-next" onclick="obNext()" style="background:#1A2E4A;border:none;color:#fff;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">Commencer mes missions →</button></div></div></div>';
    ob3.innerHTML=wrapStart+msg+navHtml;
  }
  obStep=0;updateOb();
}
function obNext(){obStep++;if(obStep>=4){skipOb();return}updateOb()}
function obPrev(){if(obStep>0){obStep--;updateOb();}}
function updateOb(){
  document.querySelectorAll('.obp').forEach((p,i)=>p.classList.toggle('on',i===obStep));
  document.querySelectorAll('.obs').forEach((s,i)=>{s.className='obs'+(i<obStep?' done':i===obStep?' on':'');});
  // Mettre à jour les boutons nav dans chaque step
  const isLast = obStep>=3;
  const isFirst = obStep===0;
  document.querySelectorAll('.ob-btn-prev').forEach(b=>{b.style.display=isFirst?'none':'inline-flex';});
  document.querySelectorAll('.ob-btn-next').forEach(b=>{b.textContent=isLast?'Commencer mes missions →':'Suivant →';});
}
function skipOb(){document.getElementById('onboarding').classList.remove('on');showApp()}
function showApp(){
  document.getElementById('app').classList.add('on');
  setAccentColor(CU.classe);
  const init=CU.nom.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
  document.getElementById('av-i').textContent=init;
  document.getElementById('sb-n').textContent=CU.nom;
  document.getElementById('sb-r').textContent=CU.poste.split('—')[0].trim();
  document.getElementById('tb-c').textContent=CU.classe;
  document.getElementById('tb-d').textContent=new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'});
  const ens=CU.classe==='enseignant';
  document.body.classList.toggle('ens-mode',ens);
  ['ns-ens','ni-mdj','ni-cl','ni-gn'].forEach(id=>document.getElementById(id).style.display=ens?'':'none');
  const btnGuide=document.getElementById('btn-guide-ens');if(btnGuide)btnGuide.style.display=ens?'block':'none';
  const ak=localStorage.getItem('laboro_ak')||'';
  if(document.getElementById('api-inp'))document.getElementById('api-inp').value=ak;
  // Message personnalisé
  const msgKey=CU.classe.includes('AGEC')?'AGEC':CU.classe.includes('PVOC')?'PVOC':CU.classe.includes('Term')?'Term':CU.classe==='enseignant'?'ens':'2nde';
  const msgCfg=getMsg(CU.classe,CU.poste);
  document.getElementById('msg-f').textContent=msgCfg.from;
  document.getElementById('msg-t').textContent=msgCfg.txt;
  if(ens)populateMDJSelect();
  // Visibilité nav E2 AGEC -- visible pour élèves AGEC et 2nde (tous sauf PVOC pur)
  const niE2 = document.getElementById('ni-e2agec');
  const niE2Pvoc = document.getElementById('ni-e2pvoc');
  // E2 AGEC : visible uniquement pour les Term. AGEC
  const isTermAgec = !ens && CU.classe.toUpperCase() === 'TERM-AGEC';
  const isTermPvoc = !ens && CU.classe.toUpperCase() === 'TERM-PVOC';
  if(niE2) niE2.style.display = isTermAgec ? 'block' : 'none';
  if(niE2Pvoc) niE2Pvoc.style.display = isTermPvoc ? 'block' : 'none';
  // Titre "Préparation examen" visible pour toutes les Terminales
  const nsPrepa = document.getElementById('ns-prepa');
  if(nsPrepa) nsPrepa.style.display = (isTermAgec || isTermPvoc) ? 'block' : 'none';
  // Visibilité nav enseignant
  const niMdj = document.getElementById('ni-mdj');
  const niCl = document.getElementById('ni-cl');
  const niGn = document.getElementById('ni-gn');
  const nsEns = document.getElementById('ns-ens');
  if(niMdj) niMdj.style.display = ens ? 'block' : 'none';
  if(niCl) niCl.style.display = ens ? 'block' : 'none';
  if(niGn) niGn.style.display = ens ? 'block' : 'none';
  if(nsEns) nsEns.style.display = ens ? 'block' : 'none';
  // ── Boutons export/import dans la sidebar (sauvegarde entre postes) ──
  const sbBt = document.querySelector('.sb-bt');
  if(sbBt && !document.getElementById('btn-export') && !ens){
    const exportWrap = document.createElement('div');
    exportWrap.style.cssText = 'display:flex;gap:6px;margin-bottom:8px';
    exportWrap.innerHTML =
      '<button id="btn-export" onclick="exporterDonnees()" title="Sauvegarder ta progression en fichier" '
      + 'style="flex:1;padding:6px 8px;background:none;border:.5px solid var(--gb);border-radius:6px;cursor:pointer;font-size:11px;color:var(--gm);font-weight:600">💾 Sauvegarder</button>'
      + '<button id="btn-import" onclick="importerDonnees()" title="Restaurer une sauvegarde" '
      + 'style="flex:1;padding:6px 8px;background:none;border:.5px solid var(--gb);border-radius:6px;cursor:pointer;font-size:11px;color:var(--gm);font-weight:600">📂 Restaurer</button>';
    sbBt.insertBefore(exportWrap, sbBt.firstChild);
  }
  renderAll();
  // Charte et rappels
  setTimeout(function(){
    checkCharte();
    checkRappelsEnAttente();
  }, 600);
}
function doLogout(){
  CU=null;localStorage.removeItem('laboro_u');
  // Remettre la couleur par défaut
  const r=document.documentElement;
  r.style.setProperty('--bl','#185FA5');r.style.setProperty('--bf','#0C447C');
  r.style.setProperty('--bm','#B5D4F4');r.style.setProperty('--bc','#E6F1FB');
  ['app','onboarding'].forEach(id=>document.getElementById(id).classList.remove('on'));
  document.getElementById('login').classList.add('on');
}
function goP(id,el){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('on'));
  const panel=document.getElementById('panel-'+id); if(panel)panel.classList.add('on');
  if(el)el.classList.add('on');
  const t2={dashboard:'Tableau de bord',missions:'Mes missions',competences:'Mes compétences',catalogue:'Catalogue produits',clients:'Fichier clients',indicateurs:'Indicateurs commerciaux',missiondujour:'Mission du jour',classe:'Vue classe',generation:'Générer une mission',e2agec:'Préparation E2 — Option AGEC',e2pvoc:'Préparation E2 — Option PVOC'};
  document.getElementById('tb-t').textContent=t2[id]||id;
  if(id==='classe')renderClasse();
  if(id==='dashboard')renderDashboard();

  // Callbacks spécifiques par panel
  if(id==='indicateurs' && typeof renderIndicateursPedago==='function') renderIndicateursPedago();
  if(id==='competences' && typeof renderCompetences==='function') renderCompetences();
  if(id==='e2agec' && typeof renderE2AGEC==='function') renderE2AGEC();
  if(id==='e2pvoc' && typeof renderE2PVOC==='function') renderE2PVOC();
}
function renderAll(){
  const safe = function(fn, name){
    try{ fn(); }
    catch(e){ console.error('LABORO renderAll - '+name+' error:', e.message, e); }
  };
  safe(renderDashboard, 'renderDashboard');
  safe(renderMissions, 'renderMissions');
  safe(renderCompetences, 'renderCompetences');
  safe(renderCatalogue, 'renderCatalogue');
  safe(renderClients, 'renderClients');
  if(CU && CU.classe==='enseignant') safe(renderClasse, 'renderClasse');
}


// ════════════════════════════════════════════
// EXPORT / IMPORT des données élève
// Solution de secours en attendant un backend —
// permet à l'élève de sauvegarder et restaurer
// sa progression entre différents postes.
// ════════════════════════════════════════════
function exporterDonnees(){
  if(!CU){ showLoginError('Connecte-toi d\'abord.'); return; }
  const s = gS();
  const ud = s[CU.mail] || {};
  const exportData = {
    version: '1.0',
    date: new Date().toISOString(),
    mail: CU.mail,
    classe: CU.classe,
    nom: CU.nom,
    poste: CU.poste,
    donnees: ud
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'laboro_sauvegarde_' + CU.nom.replace(/ /g,'_') + '_' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importerDonnees(){
  if(!CU){ showLoginError('Connecte-toi d\'abord.'); return; }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(ev){
      try {
        const data = JSON.parse(ev.target.result);
        if(!data.donnees || !data.mail){
          alert('Fichier invalide — ce n\'est pas une sauvegarde LABORO.');
          return;
        }
        if(data.mail !== CU.mail){
          if(!confirm('Ce fichier appartient à ' + data.mail + '. Importer quand même sur ton compte ?')) return;
        }
        const s = gS();
        s[CU.mail] = data.donnees;
        sS(s);
        alert('✅ Données restaurées ! La page va se recharger.');
        location.reload();
      } catch(err){
        alert('Erreur de lecture du fichier. Vérifie qu\'il s\'agit bien d\'une sauvegarde LABORO.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
// ════════════════════════════════════════════════
// LOGIN SERVEUR (nouvelle version — branchée sur le backend)
// Coexiste avec doLogin() classique. Ne le remplace pas.
// ════════════════════════════════════════════════
const LABORO_API = 'https://mcv.laboro-edu.fr';

async function doLoginServeur(){
  const mail = document.getElementById('inp-mail').value.trim();
  const mdp  = document.getElementById('inp-mdp').value;

  if(!mail || !mdp){ showLoginError('Merci de saisir ton adresse mail et ton mot de passe.'); return; }

  try{
    const reponse = await fetch(LABORO_API + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: mail, motDePasse: mdp })
    });
    const data = await reponse.json();

    if(!data.ok){
      showLoginError(data.erreur || 'Identifiants incorrects.');
      return;
    }

    localStorage.setItem('laboro_token', data.token);
    const u = data.utilisateur;

    const cls = u.classe || '';
    let poste;
    if(cls === 'enseignant') poste = 'Enseignant — Accès direction';
    else if(cls === '2nde') poste = 'Découverte de la famille des métiers MCV';
    else if(cls.includes('AGEC')) poste = 'Conseiller de vente — Showroom & E-commerce';
    else if(cls.includes('PVOC')) poste = 'Commercial terrain — Prospection & Vente B2B';
    else poste = 'Collaborateur LABORO';

    const nomComplet = (u.prenom || u.nom)
      ? ((u.prenom||'') + ' ' + (u.nom||'')).trim()
      : mail.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, l => l.toUpperCase());

    finishLogin(mail, cls, poste, nomComplet);

  }catch(err){
    showLoginError('Impossible de joindre le serveur LABORO. Vérifie ta connexion internet.');
    console.error('Erreur login serveur:', err);
  }
  // ════════════════════════════════════════════════
// LOGIN SERVEUR (nouvelle version — branchée sur le backend)
// Coexiste avec doLogin() classique. Ne le remplace pas.
// ════════════════════════════════════════════════
const LABORO_API = 'https://mcv.laboro-edu.fr';

async function doLoginServeur(){
  const mail = document.getElementById('inp-mail').value.trim();
  const mdp  = document.getElementById('inp-mdp').value;

  if(!mail || !mdp){ showLoginError('Merci de saisir ton adresse mail et ton mot de passe.'); return; }

  try{
    const reponse = await fetch(LABORO_API + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: mail, motDePasse: mdp })
    });
    const data = await reponse.json();

    if(!data.ok){
      showLoginError(data.erreur || 'Identifiants incorrects.');
      return;
    }

    localStorage.setItem('laboro_token', data.token);
    const u = data.utilisateur;

    const cls = u.classe || '';
    let poste;
    if(cls === 'enseignant') poste = 'Enseignant — Accès direction';
    else if(cls === '2nde') poste = 'Découverte de la famille des métiers MCV';
    else if(cls.includes('AGEC')) poste = 'Conseiller de vente — Showroom & E-commerce';
    else if(cls.includes('PVOC')) poste = 'Commercial terrain — Prospection & Vente B2B';
    else poste = 'Collaborateur LABORO';

    const nomComplet = (u.prenom || u.nom)
      ? ((u.prenom||'') + ' ' + (u.nom||'')).trim()
      : mail.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, l => l.toUpperCase());

    finishLogin(mail, cls, poste, nomComplet);

  }catch(err){
    showLoginError('Impossible de joindre le serveur LABORO. Vérifie ta connexion internet.');
    console.error('Erreur login serveur:', err);
  }
// ════════════════════════════════════════════════
// LOGIN SERVEUR (nouvelle version — branchée sur le backend)
// Coexiste avec doLogin() classique. Ne le remplace pas.
// ════════════════════════════════════════════════
const LABORO_API = 'https://mcv.laboro-edu.fr';

async function doLoginServeur(){
  const mail = document.getElementById('inp-mail').value.trim();
  const mdp  = document.getElementById('inp-mdp').value;

  if(!mail || !mdp){ showLoginError('Merci de saisir ton adresse mail et ton mot de passe.'); return; }

  try{
    const reponse = await fetch(LABORO_API + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: mail, motDePasse: mdp })
    });
    const data = await reponse.json();

    if(!data.ok){
      showLoginError(data.erreur || 'Identifiants incorrects.');
      return;
    }

    localStorage.setItem('laboro_token', data.token);
    const u = data.utilisateur;

    const cls = u.classe || '';
    let poste;
    if(cls === 'enseignant') poste = 'Enseignant — Accès direction';
    else if(cls === '2nde') poste = 'Découverte de la famille des métiers MCV';
    else if(cls.includes('AGEC')) poste = 'Conseiller de vente — Showroom & E-commerce';
    else if(cls.includes('PVOC')) poste = 'Commercial terrain — Prospection & Vente B2B';
    else poste = 'Collaborateur LABORO';

    const nomComplet = (u.prenom || u.nom)
      ? ((u.prenom||'') + ' ' + (u.nom||'')).trim()
      : mail.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, l => l.toUpperCase());

    finishLogin(mail, cls, poste, nomComplet);

  }catch(err){
    showLoginError('Impossible de joindre le serveur LABORO. Vérifie ta connexion internet.');
    console.error('Erreur login serveur:', err);
  }
  }

