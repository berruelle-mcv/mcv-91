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
  if(!mail||!cls){alert('Merci de renseigner tous les champs.');return}
  if(!mail.includes('@')){alert('Adresse mail invalide.');return}
  const posteMap={'enseignant':'Enseignant — Accès direction','2nde':'Découverte de la famille des métiers MCV'};
  const poste=posteMap[cls]||(cls.includes('AGEC')?'Conseiller de vente — Showroom & E-commerce':cls.includes('PVOC')?'Commercial terrain — Prospection & Vente B2B':'');
  if(!poste){alert('Merci de sélectionner une classe.');return}
  // Vérification mot de passe enseignant
  if(cls==='enseignant'){
    const mdpVal=document.getElementById('inp-mdp')?.value||'';
    if(!mdpVal){alert('Merci de saisir le code d\'accès enseignant.');return}
    // Hash SHA256 côté client
    const hashMdp=async(str)=>{const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')};
    hashMdp(mdpVal).then(h=>{
      if(h!=='3e4b672e60279a8fc681052361892d4a50239106de51b8dacf93dee8e3dd644d'){alert('Code d\'accès incorrect. Contactez Pascal Berruelle.');return}
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
  else if(isNew){startOb();}
  else{showApp();}
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
          <div style="width:34px;height:34px;background:#276749;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;flex-shrink:0">3</div>
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
  const nsPrepa = document.querySelector('.ns-prepa');
  const niE2Pvoc = document.getElementById('ni-e2pvoc');
  // E2 AGEC : visible uniquement pour les Term. AGEC
  const nsPrepa = document.getElementById('ns-prepa');
  if(niE2){
    const isTermAgec = !ens && CU.classe.toUpperCase() === 'TERM-AGEC';
    niE2.style.display = isTermAgec ? 'block' : 'none';
  }
  // E2 PVOC : visible uniquement pour les Term. PVOC
  if(niE2Pvoc){
    const isTermPvoc = !ens && CU.classe.toUpperCase() === 'TERM-PVOC';
    niE2Pvoc.style.display = isTermPvoc ? 'block' : 'none';
  }
  // Titre "Préparation examen" visible seulement si au moins un E2 est visible
  if(nsPrepa){
    const isTerm = !ens && (CU.classe.toUpperCase() === 'TERM-AGEC' || CU.classe.toUpperCase() === 'TERM-PVOC');
    nsPrepa.style.display = isTerm ? 'block' : 'none';
  }
  // Visibilité nav enseignant
  const niMdj = document.getElementById('ni-mdj');
  const niCl = document.getElementById('ni-cl');
  const niGn = document.getElementById('ni-gn');
  const nsEns = document.getElementById('ns-ens');
  if(niMdj) niMdj.style.display = ens ? 'block' : 'none';
  if(niCl) niCl.style.display = ens ? 'block' : 'none';
  if(niGn) niGn.style.display = ens ? 'block' : 'none';
  if(nsEns) nsEns.style.display = ens ? 'block' : 'none';
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

