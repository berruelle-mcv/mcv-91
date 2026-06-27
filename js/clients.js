function addClient(){ ouvrirFormulaireProspect(null); }

// ================================================
//   LABORO Sport & Outdoor — Clients & Prospects
//   Gestion fichier clients, prospects, charte LABORO
//   Version 1.1 — Fiches clients enrichies
// ================================================

function checkCharte(){
  if(CU.classe==='enseignant') return;
  const key = 'laboro_charte_'+CU.mail;
  if(!sessionStorage.getItem(key)){
    document.getElementById('charte-laboro').style.display = 'block';
  }
}

function accepterCharte(){
  const ud = gUD();
  ud.charte_signee = true;
  ud.charte_date = new Date().toLocaleDateString('fr-FR');
  sUD(ud);
  sessionStorage.setItem('laboro_charte_'+CU.mail, '1');
  document.getElementById('charte-laboro').style.display = 'none';
  if(window.__pendingOnboarding){
    window.__pendingOnboarding = false;
    if(typeof startOb === 'function') startOb();
  } else {
    showNotifEleve("Bienvenue dans l'équipe LABORO !", 'success');
  }
}

function checkRappelsEnAttente(){
  if(CU.classe==='enseignant') return;
  const ud = gUD();
  const rappels = ud.rappels || [];
  const nonLus = rappels.filter(function(r){ return !r.lu; });
  if(nonLus.length > 0){
    const dernier = nonLus[nonLus.length-1];
    rappels.forEach(function(r){ r.lu=true; });
    sUD(ud);
    setTimeout(function(){ showNotifEleve(dernier.message, 'rappel'); }, 1500);
  }
}

function calcPosturePro(ud){
  let score = 100;
  const missions = Object.values(ud.missions||{});
  const done = missions.filter(function(m){ return m.status==='done'; });
  const rappels = ud.nb_rappels || 0;
  score -= Math.min(rappels * 8, 40);
  if(done.length >= 5) score += 5;
  if(done.length >= 10) score += 5;
  const scores = done.filter(function(m){ return m.score; }).map(function(m){ return m.score; });
  const avg = scores.length ? scores.reduce(function(a,b){ return a+b; },0)/scores.length : 0;
  if(avg >= 14) score += 10;
  else if(avg >= 11) score += 5;
  return Math.max(0, Math.min(100, score));
}

function getPostureLabel(score){
  if(score >= 90) return {label:'Excellent', color:'#185FA5', bg:'#EBF4FF'};
  if(score >= 75) return {label:'Bien', color:'#2D5282', bg:'#EBF4FF'};
  if(score >= 60) return {label:'A ameliorer', color:'#D97706', bg:'#FEF3C7'};
  return {label:'Insuffisant', color:'#C53030', bg:'#FEE2E2'};
}

function closeNotif(){ var n=document.getElementById('laboro-notif'); if(n) n.style.display='none'; }

function ouvrirRappelModal(mail){
  const u = allU().find(function(x){ return x.mail===mail; });
  if(!u) return;
  const prenom = (u.nom||mail).split(' ')[0];
  let modal = document.getElementById('rappel-modal');
  if(!modal){ modal = document.createElement('div'); modal.id = 'rappel-modal'; document.body.appendChild(modal); }
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9997;display:flex;align-items:center;justify-content:center';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:16px;max-width:520px;width:90%;padding:28px;position:relative;max-height:85vh;overflow-y:auto';
  const closeBtn2 = document.createElement('button');
  closeBtn2.style.cssText = 'position:absolute;top:14px;right:14px;background:none;border:none;font-size:20px;cursor:pointer;color:#9CA3AF';
  closeBtn2.textContent = 'X';
  closeBtn2.onclick = function(){ document.getElementById('rappel-modal').style.display='none'; };
  box.appendChild(closeBtn2);
  const titleDiv = document.createElement('div');
  titleDiv.style.marginBottom = '20px';
  titleDiv.innerHTML = '<div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Rappel professionnel</div>'
    + '<div style="font-size:18px;font-weight:800;color:#1A2E4A">Message pour ' + prenom + '</div>'
    + '<div style="font-size:12px;color:#6B7280;margin-top:4px">Visible dans son espace au prochain chargement</div>';
  box.appendChild(titleDiv);
  const choicesDiv = document.createElement('div');
  choicesDiv.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-bottom:18px';
  RAPPELS_TYPES.forEach(function(r){
    const item = document.createElement('div');
    item.id = 'rc-' + r.id;
    item.style.cssText = 'display:flex;align-items:center;gap:12px;padding:10px 14px;border:1.5px solid #E5E7EB;border-radius:10px;cursor:pointer';
    item.innerHTML = '<div style="font-size:20px;flex-shrink:0">' + r.icon + '</div>'
      + '<div style="font-size:12px;font-weight:600;color:#1A2E4A;flex:1">' + r.label + '</div>'
      + '<div id="rc-check-' + r.id + '" style="display:none;color:#2D5282;font-size:16px">✓</div>';
    item.onclick = function(){ selectRappel(r.id); };
    choicesDiv.appendChild(item);
  });
  box.appendChild(choicesDiv);
  const customWrap = document.createElement('div');
  customWrap.id = 'rappel-custom-wrap';
  customWrap.style.cssText = 'display:none;margin-bottom:16px';
  customWrap.innerHTML = '<textarea id="rappel-custom-msg" placeholder="Redigez votre message..." style="width:100%;height:80px;border:1.5px solid #E5E7EB;border-radius:8px;padding:10px;font-size:12px;resize:vertical;box-sizing:border-box"></textarea>';
  box.appendChild(customWrap);
  const footer = document.createElement('div');
  footer.innerHTML = '<div style="background:#FEF3C7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:11px;color:#92400E"><strong>Signe :</strong> Romain Sauzet — Responsable LABORO Sport & Outdoor</div>';
  const sendBtn = document.createElement('button');
  sendBtn.style.cssText = 'width:100%;background:#1A2E4A;color:#fff;border:none;padding:12px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer';
  sendBtn.textContent = '📨 Envoyer le rappel';
  sendBtn.onclick = function(){ envoyerRappel(mail); };
  footer.appendChild(sendBtn);
  box.appendChild(footer);
  modal.innerHTML = '';
  modal.appendChild(box);
}

function envoyerRappel(mail){
  if(!selectedRappelId){ alert('Choisissez un type de rappel.'); return; }
  const rappelType = RAPPELS_TYPES.find(function(r){ return r.id===selectedRappelId; });
  let message = rappelType.msg;
  if(selectedRappelId==='libre'){
    const custom = document.getElementById('rappel-custom-msg');
    message = custom ? custom.value.trim() : '';
    if(!message){ alert('Redigez votre message.'); return; }
  }
  const s = gS();
  if(!s[mail]) s[mail] = {missions:{}, competences:{}};
  if(!s[mail].rappels) s[mail].rappels = [];
  s[mail].rappels.push({date: new Date().toLocaleDateString('fr-FR'), type: selectedRappelId, message: message, lu: false});
  s[mail].nb_rappels = (s[mail].nb_rappels || 0) + 1;
  sS(s);
  document.getElementById('rappel-modal').style.display = 'none';
  selectedRappelId = null;
  const notifEns = document.createElement('div');
  notifEns.style.cssText = 'position:fixed;top:20px;right:20px;background:#0A2540;color:#fff;padding:12px 20px;border-radius:10px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)';
  notifEns.textContent = '✓ Rappel envoye — visible au prochain chargement';
  document.body.appendChild(notifEns);
  setTimeout(function(){ notifEns.remove(); }, 4000);
  renderClasse();
}

function openClient(id){ ouvrirFicheClient(id); }

function renderClients(){
  if(!CU)return;
  const ud=gUD();
  const pros=(ud.prospectAjoutes||[]);
  const clientsConverts=(ud.clientsAjoutes||[]);
  const all=[...CLIENTS,...clientsConverts,...pros];
  const fidelCols={'Stratégique':'#27500A','Fidèle':'var(--vt)','Régulier':'var(--bl)','Nouveau':'var(--am)','Prospect':'#8E44AD','Dormant':'var(--gm)','Perdu':'var(--rg)'};
  document.getElementById('client-list').innerHTML=`<div class="cl-list">${all.map(c=>{
    const fc=fidelCols[c.fidelite||c.statut]||'var(--gm)';
    const lbl=c.convertiFin?'Client actif':(c.fidelite||c.statut||'Client');
    return`<div class="cl-card" onclick="ouvrirFicheClient('${c.id}')"><div class="cl-h">
      <div class="cl-av" style="background:${c.col||'var(--bl)'}">${c.ini}</div>
      <div class="u-flex-1">
        <div class="u-flex-gap"><div class="cl-nom">${c.nom}</div><span class="${c.type==='B2C'?'tb2c':c.fidelite==='Prospect'?'tpros':'tb2b'}">${c.type||'B2C'}</span></div>
        ${c.ca&&c.potentiel?`<div class="cl-pot-bar"><div class="cl-pot-fill" style="width:${Math.min(100,Math.round(c.ca/c.potentiel*100))}%"></div></div>`:''}
        <div class="cl-meta">
          <span class="${c.type==='B2C'?'tb2c':lbl==='Prospect'?'tpros':'tb2b'}">${c.type}</span>
          <span style="color:${fc};font-weight:600;font-size:10px">${lbl}</span>
          ${c.ca?`<span style="font-weight:700;color:var(--bf)">${c.ca.toLocaleString('fr-FR')} €</span>`:'<span class="u-muted">Prospect</span>'}
        </div>
        ${c.prochaine?`<div style="font-size:10px;color:var(--am);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">⚡ ${c.prochaine}</div>`:''}
      </div>
      <div style="font-size:10px;color:var(--gm);flex-shrink:0;text-align:right;padding-left:6px">${c.dernier||''}</div>
    </div></div>`;
  }).join('')}</div>`;
  document.getElementById('fiche-client').classList.remove('on');
}

function ouvrirFormulaireProspect(prospect){
  const isEdit = prospect !== null;
  const overlay = document.createElement('div');
  overlay.id = 'prospect-form-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9995;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;max-width:480px;width:90%;padding:28px;position:relative;border-top:4px solid var(--bl);max-height:85vh;overflow-y:auto">
      <button onclick="document.getElementById('prospect-form-overlay').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:20px;cursor:pointer;color:#6B7280">✕</button>
      <div style="font-size:16px;font-weight:800;color:#1A2E4A;margin-bottom:20px">${isEdit ? '✏️ Modifier le prospect' : '➕ Nouveau prospect'}</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div>
          <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Nom / Entreprise *</label>
          <input id="pf-nom" type="text" value="${isEdit ? prospect.nom : ''}" placeholder="Ex: Mairie d'Évry, M. Dupont..." style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Type</label>
            <select id="pf-type" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px">
              <option value="B2C" ${!isEdit||prospect.type==='B2C'?'selected':''}>B2C</option>
              <option value="B2B" ${isEdit&&prospect.type==='B2B'?'selected':''}>B2B</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Secteur</label>
            <input id="pf-sect" type="text" value="${isEdit ? (prospect.sect||'') : ''}" placeholder="Ex: Sport, Collectivité..." style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box">
          </div>
        </div>
        <div>
          <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Contact</label>
          <input id="pf-contact" type="text" value="${isEdit ? (prospect.contact||'') : ''}" placeholder="Prénom Nom du décideur" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Téléphone</label>
            <input id="pf-tel" type="text" value="${isEdit ? (prospect.tel||'') : ''}" placeholder="06 XX XX XX XX" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Email</label>
            <input id="pf-email" type="email" value="${isEdit ? (prospect.email||'') : ''}" placeholder="contact@exemple.fr" style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box">
          </div>
        </div>
        <div>
          <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Prochaine action</label>
          <input id="pf-note" type="text" value="${isEdit ? (prospect.prochaine||'') : ''}" placeholder="Ex: Rappeler en septembre, envoyer devis..." style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box">
        </div>
        <div>
          <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Commentaire SIC</label>
          <textarea id="pf-commentaire" rows="3" placeholder="Client intéressé par... Sensible à... À relancer..." style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box;resize:vertical">${isEdit ? (prospect.commentaire||'') : ''}</textarea>
          <div style="font-size:10px;color:#6B7280;margin-top:4px">💡 Enrichissez cette fiche avec les informations collectées lors de vos échanges.</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          ${isEdit ? `<button onclick="if(this.dataset.confirming==='1'){supprimerProspect('${prospect.id}')}else{this.dataset.confirming='1';this.textContent='Confirmer ?';this.style.background='#DC2626';this.style.color='#fff';setTimeout(()=>{if(this.dataset.confirming){this.dataset.confirming='';this.textContent='🗑 Supprimer';this.style.background='#FEE2E2';this.style.color='#DC2626'}},3000)}" style="padding:10px 16px;background:#FEE2E2;color:#DC2626;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">🗑 Supprimer</button>` : ''}
          <button onclick="sauvegarderProspect(${isEdit ? `'${prospect.id}'` : 'null'})" style="flex:1;padding:12px;background:var(--bl);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700">${isEdit ? 'Enregistrer les modifications' : 'Ajouter le prospect'}</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function sauvegarderProspect(existingId){
  const nom = document.getElementById('pf-nom').value.trim();
  if(!nom){ alert('Le nom est obligatoire.'); return; }
  const ud = gUD();
  if(!ud.prospectAjoutes) ud.prospectAjoutes = [];
  const newProspect = {
    id: existingId || 'P' + Date.now(),
    nom: nom,
    type: document.getElementById('pf-type').value,
    sect: document.getElementById('pf-sect').value.trim(),
    contact: document.getElementById('pf-contact').value.trim(),
    tel: document.getElementById('pf-tel').value.trim(),
    email: document.getElementById('pf-email').value.trim(),
    prochaine: document.getElementById('pf-note').value.trim(),
    commentaire: document.getElementById('pf-commentaire').value.trim(),
    ini: nom.substring(0,2).toUpperCase(),
    col: '#8E44AD',
    fidelite: 'Prospect',
    ca: 0,
    dernier: new Date().toLocaleDateString('fr-FR'),
    ajouteParEleve: true
  };
  if(existingId){
    const idx = ud.prospectAjoutes.findIndex(function(p){ return p.id === existingId; });
    if(idx >= 0) ud.prospectAjoutes[idx] = newProspect;
    else ud.prospectAjoutes.push(newProspect);
  } else {
    ud.prospectAjoutes.push(newProspect);
  }
  sUD(ud);
  document.getElementById('prospect-form-overlay').remove();
  renderClients();
}

function supprimerProspect(id){
  const ud = gUD();
  ud.prospectAjoutes = (ud.prospectAjoutes||[]).filter(function(p){ return p.id !== id; });
  sUD(ud);
  const overlay = document.getElementById('prospect-form-overlay');
  if(overlay) overlay.remove();
  showNotifEleve('Prospect supprimé.', 'info');
  renderClients();
}

function convertirProspect(id, modal){
  if(!confirm('Convertir ce prospect en client actif ?')) return;
  const ud = gUD();
  const pros = ud.prospectAjoutes || [];
  const idx = pros.findIndex(function(p){ return p.id === id; });
  if(idx < 0) return;
  const p = pros[idx];
  const newClient = {
    id: 'CC' + Date.now(),
    nom: p.nom,
    type: p.type || 'B2C',
    ini: p.ini || p.nom.substring(0,2).toUpperCase(),
    col: '#185FA5',
    sect: p.sect || '',
    contact: p.contact || '',
    tel: p.tel || '',
    email: p.email || '',
    ca: 0,
    fidelite: 'Nouveau',
    dernier: new Date().toLocaleDateString('fr-FR'),
    prochaine: p.prochaine || '',
    note: (p.commentaire ? 'SIC : ' + p.commentaire : '') + '\nConverti depuis prospect le ' + new Date().toLocaleDateString('fr-FR'),
    hist: ['Conversion prospect → client le ' + new Date().toLocaleDateString('fr-FR')],
    ajouteParEleve: true,
    convertiFin: true
  };
  ud.prospectAjoutes.splice(idx, 1);
  if(!ud.clientsAjoutes) ud.clientsAjoutes = [];
  ud.clientsAjoutes.push(newClient);
  sUD(ud);
  if(modal) modal.remove();
  showNotifEleve('✅ ' + p.nom + ' converti(e) en client actif !', 'success');
  renderClients();
}

function ouvrirFicheClient(id){
  const ud = gUD();
  const pros = ud.prospectAjoutes || [];
  const clientsConverts = ud.clientsAjoutes || [];
  const c = CLIENTS.find(function(x){ return x.id===id; }) || clientsConverts.find(function(x){ return x.id===id; }) || pros.find(function(x){ return x.id===id; });
  if(!c) return;
  const isProspectEleve = c.ajouteParEleve === true;

  // Couleur selon fidélité
  const fidelCols={'Stratégique':'#27500A','Fidèle':'#185FA5','Régulier':'#2D5282','Nouveau':'#D97706','Prospect':'#8E44AD','Dormant':'#6B7280','Perdu':'#C53030'};
  const col = fidelCols[c.fidelite||c.statut] || '#4A6FA5';

  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9990;display:flex;align-items:center;justify-content:center';

  const box=document.createElement('div');
  box.style.cssText='background:#fff;border-radius:16px;max-width:600px;width:92%;max-height:88vh;overflow-y:auto;padding:28px;position:relative;border-top:4px solid '+col;

  // Fermer
  const closeBtn=document.createElement('button');
  closeBtn.style.cssText='position:absolute;top:14px;right:14px;background:none;border:none;font-size:20px;cursor:pointer;color:#9CA3AF';
  closeBtn.textContent='✕';
  closeBtn.onclick=function(){ modal.remove(); };
  box.appendChild(closeBtn);

  // ── HEADER ──
  const h=document.createElement('div');
  h.style.marginBottom='16px';
  h.innerHTML=
    '<div style="font-size:10px;font-weight:700;color:var(--gm);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">'
      +(c.type||'B2B')+' · '+(c.fidelite||c.statut||'')
    +'</div>'
    +'<div style="font-size:20px;font-weight:900;color:var(--t1);margin-bottom:4px">'+c.nom+'</div>'
    +'<div style="font-size:12px;color:var(--gm)">'+(c.contact||'')+(c.sect?' — '+c.sect:'')+'</div>';
  box.appendChild(h);

  if(isProspectEleve){
    // ── FICHE PROSPECT ÉLÈVE ──
    const grid=document.createElement('div');
    grid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px';
    [[c.tel||'—','Téléphone'],[c.email||'—','Email'],[c.sect||'—','Secteur'],[c.type||'B2C','Type']].forEach(function(item){
      const cell=document.createElement('div');
      cell.style.cssText='background:var(--gc);border-radius:8px;padding:10px';
      cell.innerHTML='<div style="font-size:9px;color:var(--gm);text-transform:uppercase;font-weight:700;margin-bottom:2px">'+item[1]+'</div>'
        +'<div style="font-size:12px;font-weight:700;color:var(--t1)">'+item[0]+'</div>';
      grid.appendChild(cell);
    });
    box.appendChild(grid);
    if(c.prochaine){
      const n=document.createElement('div');
      n.style.cssText='margin-bottom:12px;padding:12px;background:#FEF9C3;border-radius:8px;border-left:3px solid #F59E0B;font-size:12px;color:#92400E';
      n.innerHTML='<strong>⚡ Prochaine action :</strong> '+c.prochaine;
      box.appendChild(n);
    }
    if(c.commentaire){
      const st=document.createElement('div');
      st.style.cssText='font-size:11px;font-weight:800;color:var(--t1);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px';
      st.textContent='📝 Commentaire SIC';
      box.appendChild(st);
      const sc=document.createElement('div');
      sc.style.cssText='padding:12px;background:#F0FDF4;border-radius:8px;border-left:3px solid var(--vt);font-size:12px;color:var(--t2);line-height:1.6;margin-bottom:12px;white-space:pre-wrap';
      sc.textContent=c.commentaire;
      box.appendChild(sc);
    }
    const addSicBtn=document.createElement('button');
    addSicBtn.textContent=c.commentaire?'✏️ Modifier le commentaire SIC':'📝 Ajouter un commentaire SIC';
    addSicBtn.style.cssText='width:100%;margin-bottom:8px;padding:8px;background:#F0FDF4;color:#0A2540;border:1.5px solid #A7F3D0;border-radius:8px;cursor:pointer;font-size:11px;font-weight:700';
    addSicBtn.onclick=function(){
      const txt=prompt('Commentaire SIC :',c.commentaire||'');
      if(txt!==null){
        const ud2=gUD();
        const idx=(ud2.prospectAjoutes||[]).findIndex(function(p){ return p.id===c.id; });
        if(idx>=0){ ud2.prospectAjoutes[idx].commentaire=txt; sUD(ud2); c.commentaire=txt; modal.remove(); ouvrirFicheClient(c.id); }
      }
    };
    box.appendChild(addSicBtn);
    const statEl=document.createElement('div');
    statEl.style.cssText='padding:10px 14px;background:#F5F3FF;border-radius:8px;font-size:11px;color:#6D28D9;font-weight:700;text-align:center;margin-bottom:8px';
    statEl.textContent='🟣 Prospect — en cours de qualification';
    box.appendChild(statEl);
    // Boutons prospect
    const convertBtn=document.createElement('button');
    convertBtn.textContent='🔄 Convertir en client';
    convertBtn.style.cssText='width:100%;margin-top:12px;padding:10px;background:#EBF4FF;color:#065F46;border:1.5px solid #A7F3D0;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700';
    convertBtn.onclick=function(){ convertirProspect(c.id,modal); };
    box.appendChild(convertBtn);
    const editBtn=document.createElement('button');
    editBtn.textContent='✏️ Modifier ce prospect';
    editBtn.style.cssText='width:100%;margin-top:8px;padding:10px;background:#EBF4FF;color:var(--bl);border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700';
    editBtn.onclick=function(){ modal.remove(); ouvrirFormulaireProspect(c); };
    box.appendChild(editBtn);

  } else {
    // ── FICHE CLIENT COMPLÈTE ──

    // KPIs — 4 cases
    const kpis=document.createElement('div');
    kpis.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px';
    const caFmt=(c.ca||0).toLocaleString('fr-FR')+' €';
    const potFmt=c.potentiel?(c.ca&&c.potentiel?Math.round(c.ca/c.potentiel*100)+'%':'—'):'—';
    const panierFmt=c.panier?c.panier.toLocaleString('fr-FR')+' €':'—';
    const freqFmt=c.freq?c.freq+'×/an':'—';
    [
      [caFmt,'CA total',col],
      [potFmt,'Réalisation potentiel','#185FA5'],
      [panierFmt,'Panier moyen','#2D5282'],
      [freqFmt,'Fréquence','#6B7280']
    ].forEach(function(k){
      const cell=document.createElement('div');
      cell.style.cssText='background:var(--gc);border-radius:8px;padding:10px;text-align:center';
      cell.innerHTML='<div style="font-size:14px;font-weight:900;color:'+k[2]+'">'+k[0]+'</div>'
        +'<div style="font-size:9px;color:var(--gm);text-transform:uppercase;font-weight:700;margin-top:3px">'+k[1]+'</div>';
      kpis.appendChild(cell);
    });
    box.appendChild(kpis);

    // Barre potentiel
    if(c.ca && c.potentiel){
      const pct=Math.min(100,Math.round(c.ca/c.potentiel*100));
      const barWrap=document.createElement('div');
      barWrap.style.cssText='margin-bottom:16px';
      barWrap.innerHTML='<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--gm);margin-bottom:4px">'
        +'<span>Potentiel estimé : <strong>'+(c.potentiel||0).toLocaleString('fr-FR')+' €</strong></span>'
        +'<span style="font-weight:700;color:'+col+'">'+pct+'% réalisé</span></div>'
        +'<div style="background:#E2E8F0;border-radius:6px;height:8px;overflow:hidden">'
        +'<div style="height:100%;width:'+pct+'%;background:'+col+';border-radius:6px;transition:width .4s"></div></div>';
      box.appendChild(barWrap);
    }

    // Coordonnées
    const coords=document.createElement('div');
    coords.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px';
    [[c.tel||'—','Téléphone'],[c.email||'—','Email']].forEach(function(item){
      const cell=document.createElement('div');
      cell.style.cssText='background:var(--gc);border-radius:8px;padding:10px';
      cell.innerHTML='<div style="font-size:9px;color:var(--gm);text-transform:uppercase;font-weight:700;margin-bottom:2px">'+item[1]+'</div>'
        +'<div style="font-size:12px;font-weight:700;color:var(--t1)">'+item[0]+'</div>';
      coords.appendChild(cell);
    });
    // NPS si disponible
    if(c.nps){
      const npsCol=c.nps>=75?'#185FA5':c.nps>=50?'#D97706':'#C53030';
      const npsCell=document.createElement('div');
      npsCell.style.cssText='background:var(--gc);border-radius:8px;padding:10px;text-align:center';
      npsCell.innerHTML='<div style="font-size:9px;color:var(--gm);text-transform:uppercase;font-weight:700;margin-bottom:2px">NPS</div>'
        +'<div style="font-size:16px;font-weight:900;color:'+npsCol+'">'+c.nps+'</div>';
      coords.appendChild(npsCell);
    }
    box.appendChild(coords);

    // Prochaine action
    if(c.prochaine){
      const pa=document.createElement('div');
      pa.style.cssText='margin-bottom:14px;padding:10px 14px;background:#FEF9C3;border-radius:8px;border-left:3px solid #F59E0B;font-size:12px;color:#92400E';
      pa.innerHTML='<strong>⚡ Prochaine action :</strong> '+c.prochaine;
      box.appendChild(pa);
    }

    // Historique (champ hist)
    const histData = c.hist || c.historique || [];
    if(histData.length){
      const ht=document.createElement('div');
      ht.style.cssText='font-size:11px;font-weight:800;color:var(--t1);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px';
      ht.textContent='Historique des achats';
      box.appendChild(ht);
      const hlist=document.createElement('div');
      hlist.style.cssText='margin-bottom:14px;border:1px solid var(--gb);border-radius:8px;overflow:hidden';
      histData.forEach(function(line,i){
        const row=document.createElement('div');
        row.style.cssText='padding:7px 12px;font-size:11px;color:var(--t2);'+(i%2===0?'background:#F8FAFF':'background:#fff');
        row.textContent='• '+line;
        hlist.appendChild(row);
      });
      box.appendChild(hlist);
    } else {
      const noHist=document.createElement('div');
      noHist.style.cssText='margin-bottom:14px;font-size:11px;color:var(--gm);font-style:italic';
      noHist.textContent='Aucun historique d\'achat enregistré.';
      box.appendChild(noHist);
    }

    // Note commerciale
    if(c.note){
      const noteEl=document.createElement('div');
      noteEl.style.cssText='margin-bottom:14px;padding:12px;background:#F0F4FF;border-radius:8px;border-left:3px solid var(--bl);font-size:11px;color:var(--t2);line-height:1.6';
      noteEl.innerHTML='<div style="font-size:9px;font-weight:800;color:var(--bl);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">📋 Note commerciale</div>'+c.note;
      box.appendChild(noteEl);
    }

    // Tags
    if(c.tags && c.tags.length){
      const tagsWrap=document.createElement('div');
      tagsWrap.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px';
      c.tags.forEach(function(tag){
        const t=document.createElement('span');
        t.style.cssText='font-size:10px;font-weight:700;padding:3px 10px;border-radius:12px;background:#EBF4FF;color:#2D5282';
        t.textContent=tag;
        tagsWrap.appendChild(t);
      });
      box.appendChild(tagsWrap);
    }
  }

  modal.appendChild(box);
  document.body.appendChild(modal);
  modal.onclick=function(e){ if(e.target===modal) modal.remove(); };
}

function validerMission(mail,mid){
  const s=gS();if(!s[mail])return;
  const mv=s[mail].missions[mid];if(!mv)return;
  const note=mv.note_ia||10;
  const noteFinale=prompt(`Valider la mission pour ${s[mail].nom||mail}.\nNote IA : ${note}/20. Note finale :`,note);
  if(noteFinale===null)return;
  const nf=Math.min(20,Math.max(0,parseFloat(noteFinale)||note));
  mv.status='done';mv.score=nf;
  // Datation : on n'écrase PAS la date de soumission si elle existe (c'est la date où
  // l'élève a produit le travail, plus juste pédagogiquement). On comble seulement le
  // trou pour les missions anciennes / cas limites validées manuellement par l'enseignant.
  if(!mv.date_validation){ mv.date_validation=new Date().toISOString(); }
  if(nf>=11){
    const m=MISSIONS.find(x=>x.id===mid);
    if(m){
      const compKey=m.comp.startsWith('A4')?'G4A':m.comp.startsWith('B4')?'G4B':m.comp.startsWith('ACC')?'ACC':m.comp;
      const niveauIA=mv.niveau_ia||1;
      if(!s[mail].competences)s[mail].competences={};
      s[mail].competences[compKey]=Math.max(s[mail].competences[compKey]||0,Math.min(niveauIA,m.palier));
    }
  }
  sS(s);renderClasse();showFicheEleve(mail);
}
