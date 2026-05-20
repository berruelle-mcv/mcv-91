// ================================================
//   LABORO Sport & Outdoor — Clients & Prospects
//   Gestion fichier clients, prospects, charte LABORO
//   Version 1.0 — Architecture modulaire
// ================================================

// ═══ CHARTE · RAPPELS · POSTURE · CLIENTS ═══




function checkCharte(){
  if(CU.classe==='enseignant') return;
  // Affichée une seule fois par SESSION (pas par connexion lifetime)
  // sessionStorage = effacé à la fermeture de l'onglet
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
  // Marquer dans la session pour éviter le double affichage
  sessionStorage.setItem('laboro_charte_'+CU.mail, '1');
  document.getElementById('charte-laboro').style.display = 'none';
  showNotifEleve("Bienvenue dans l'equipe LABORO ! Bonne premiere mission !", 'success');
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
    setTimeout(function(){
      showNotifEleve(dernier.message, 'rappel');
    }, 1500);
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
  if(score >= 90) return {label:'Excellent', color:'#276749', bg:'#D1FAE5'};
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
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'rappel-modal';
    document.body.appendChild(modal);
  }
  // Construire via DOM
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9997;display:flex;align-items:center;justify-content:center';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:16px;max-width:520px;width:90%;padding:28px;position:relative;max-height:85vh;overflow-y:auto';
  // Titre via DOM
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
  // Choix
  // Choix
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
  // Textarea libre
  const customWrap = document.createElement('div');
  customWrap.id = 'rappel-custom-wrap';
  customWrap.style.cssText = 'display:none;margin-bottom:16px';
  customWrap.innerHTML = '<textarea id="rappel-custom-msg" placeholder="Redigez votre message..." style="width:100%;height:80px;border:1.5px solid #E5E7EB;border-radius:8px;padding:10px;font-size:12px;resize:vertical;box-sizing:border-box"></textarea>';
  box.appendChild(customWrap);
  // Signature + bouton
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
  notifEns.style.cssText = 'position:fixed;top:20px;right:20px;background:#0F4C2A;color:#fff;padding:12px 20px;border-radius:10px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)';
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
  const all=[...CLIENTS,...pros];
  const fidelCols={'Stratégique':'#27500A','Fidèle':'var(--vt)','Régulier':'var(--bl)','Nouveau':'var(--am)','Prospect':'#8E44AD','Dormant':'var(--gm)','Perdu':'var(--rg)'};
  document.getElementById('client-list').innerHTML=`<div class="cl-list">${all.map(c=>{
    const fc=fidelCols[c.fidelite||c.statut]||'var(--gm)';
    const lbl=c.fidelite||c.statut||'Client';
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
      <div style="font-size:10px;color:var(--gm);flex-shrink:0;text-align:right;padding-left:6px">${c.dernier}</div>
    </div></div>`;
  }).join('')}</div>`;
  document.getElementById('fiche-client').classList.remove('on');
  // Bouton ajout prospect
  const addBtn = document.getElementById('btn-add-prospect');
  if(!addBtn){
    const btn = document.createElement('button');
    btn.id = 'btn-add-prospect';
    btn.innerHTML = '+ Ajouter un prospect';
    btn.style.cssText = 'margin:12px 0;padding:10px 20px;background:var(--bl);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;width:100%';
    btn.onclick = function(){ ouvrirFormulaireProspect(null); };
    const cl = document.getElementById('client-list');
    if(cl) cl.parentNode.insertBefore(btn, cl);
  }
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
          <label style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;display:block;margin-bottom:4px">Note / Prochaine action</label>
          <textarea id="pf-note" rows="2" placeholder="Ex: Rappeler en septembre — potentiel élevé..." style="width:100%;padding:10px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;box-sizing:border-box;resize:vertical">${isEdit ? (prospect.prochaine||'') : ''}</textarea>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          ${isEdit ? `<button onclick="supprimerProspect('${prospect.id}')" style="padding:10px 16px;background:#FEE2E2;color:#DC2626;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">🗑 Supprimer</button>` : ''}
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
  if(!confirm('Supprimer ce prospect ?')) return;
  const ud = gUD();
  ud.prospectAjoutes = (ud.prospectAjoutes||[]).filter(function(p){ return p.id !== id; });
  sUD(ud);
  const overlay = document.getElementById('prospect-form-overlay');
  if(overlay) overlay.remove();
  renderClients();
}

function ouvrirFicheClient(id){
  const ud = gUD();
  const pros = ud.prospectAjoutes || [];
  const c = CLIENTS.find(function(x){ return x.id===id; }) || pros.find(function(x){ return x.id===id; });
  if(!c) return;
  const isProspectEleve = c.ajouteParEleve === true;
  const statC={'Strategique':'#1A2E4A','Fidele':'#276749','Actif':'#2D5282','Prospect':'#D97706','Nouveau':'#7B2FBE'};
  const col=statC[c.statut]||'#4A6FA5';
  
  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9990;display:flex;align-items:center;justify-content:center';
  
  const box=document.createElement('div');
  box.style.cssText='background:#fff;border-radius:16px;max-width:560px;width:90%;max-height:85vh;overflow-y:auto;padding:28px;position:relative;border-top:4px solid '+col;
  
  // Fermer
  const closeBtn=document.createElement('button');
  closeBtn.style.cssText='position:absolute;top:14px;right:14px;background:none;border:none;font-size:20px;cursor:pointer;color:#9CA3AF';
  closeBtn.textContent='✕';
  closeBtn.onclick=function(){ modal.remove(); };
  box.appendChild(closeBtn);
  
  // Header
  const h=document.createElement('div');
  h.style.marginBottom='16px';
  const typeEl=document.createElement('div');
  typeEl.style.cssText='font-size:10px;font-weight:700;color:var(--gm);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px';
  typeEl.textContent=(c.type||'B2B')+' · '+(c.fidelite||c.sect||'');
  const nomEl=document.createElement('div');
  nomEl.style.cssText='font-size:20px;font-weight:900;color:var(--t1);margin-bottom:4px';
  nomEl.textContent=c.nom;
  const contactEl=document.createElement('div');
  contactEl.style.cssText='font-size:12px;color:var(--gm)';
  contactEl.textContent=(c.contact||'')+(c.sect?' — '+c.sect:'');
  h.appendChild(typeEl); h.appendChild(nomEl); h.appendChild(contactEl);
  box.appendChild(h);
  
  // Grille infos
  const grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px';
  [[c.tel,'Telephone'],[c.email,'Email'],[c.sport,'Sport'],[(c.ca||0).toLocaleString('fr-FR')+'€','CA total']].forEach(function(item){
    const cell=document.createElement('div');
    cell.style.cssText='background:var(--gc);border-radius:8px;padding:10px';
    const lbl=document.createElement('div');
    lbl.style.cssText='font-size:9px;color:var(--gm);text-transform:uppercase;font-weight:700;margin-bottom:2px';
    lbl.textContent=item[1];
    const val=document.createElement('div');
    val.style.cssText='font-size:12px;font-weight:700'+(item[1]==='CA total'?';color:'+col:'');
    val.textContent=item[0];
    cell.appendChild(lbl); cell.appendChild(val);
    grid.appendChild(cell);
  });
  box.appendChild(grid);
  
  // Historique
  const histoTitle=document.createElement('div');
  histoTitle.style.cssText='font-size:11px;font-weight:800;color:var(--t1);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px';
  histoTitle.textContent='Historique des achats';
  box.appendChild(histoTitle);
  
  (c.historique||[]).forEach(function(h){
    const line=document.createElement('div');
    line.style.cssText='padding:6px 0;border-bottom:1px solid var(--gb);font-size:11px;color:var(--t2)';
    line.textContent='• '+h;
    box.appendChild(line);
  });
  
  if(c.note){
    const note=document.createElement('div');
    note.style.cssText='margin-top:12px;padding:12px;background:var(--gc);border-radius:8px;font-size:11px;color:var(--t2)';
    note.innerHTML='<strong>Note :</strong> '+c.note;
    box.appendChild(note);
  }
  if(c.prochainContact){
    const pc=document.createElement('div');
    pc.style.cssText='margin-top:8px;font-size:11px;color:var(--gm)';
    pc.innerHTML='Prochain contact : <strong>'+c.prochainContact+'</strong>';
    box.appendChild(pc);
  }
  
  modal.appendChild(box);
  document.body.appendChild(modal);
  modal.onclick=function(e){ if(e.target===modal) modal.remove(); };
}


function validerMission(mail,mid){
  const s=gS();if(!s[mail])return;
  const note=s[mail].missions[mid]?.note_ia||10;
  const noteFinale=prompt(`Valider la mission pour ${s[mail].nom||mail}.\nNote IA : ${note}/20. Note finale :`,note);
  if(noteFinale===null)return;
  const nf=Math.min(20,Math.max(0,parseFloat(noteFinale)||note));
  s[mail].missions[mid].status='done';s[mail].missions[mid].score=nf;
  if(nf>=11){
    const m=MISSIONS.find(x=>x.id===mid);
    if(m){
      const compKey=m.comp.startsWith('A4')?'G4A':m.comp.startsWith('B4')?'G4B':m.comp.startsWith('ACC')?'ACC':m.comp;
      const niveauIA=s[mail].missions[mid]?.niveau_ia||1;
      if(!s[mail].competences)s[mail].competences={};
      s[mail].competences[compKey]=Math.max(s[mail].competences[compKey]||0,Math.min(niveauIA,m.palier));
    }
  }
  sS(s);renderClasse();showFicheEleve(mail);
}

function genererPortfolioEleve(mail){
  const s=JSON.parse(localStorage.getItem('laboro_s')||'{}');
  const ud=s[mail]||{missions:{},competences:{}};
  const nom=ud.nom||mail;
  const poste=ud.poste||'—';
  const classe=ud.classe||'—';
  const date=new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
  const score=calcScoreFromUD(ud);
  const allMissions=Object.values(ud.missions||{});
  const done=allMissions.filter(m=>m.status==='done');
  const avg=done.length?Math.round(done.reduce((a,m)=>a+(m.score||0),0)/done.length*10)/10:0;
  const comps=ud.competences||{};
  const compOk=Object.values(comps).filter(v=>v>=3).length;

  // Construire le contenu HTML du portfolio
  let html=`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Portfolio d'activités professionnelles — ${nom}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;font-size:11pt;color:#1a1a1a;background:#fff}
.page{max-width:210mm;margin:0 auto;padding:20mm}
@media print{.page{padding:15mm;max-width:none}}
.no-print{display:block}
@media print{.no-print{display:none}}

/* EN-TÊTE */
.hd{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #185FA5;padding-bottom:14px;margin-bottom:18px}
.hd-logo{font-size:28pt;font-weight:900;color:#185FA5;font-style:italic;letter-spacing:-1px}
.hd-sub{font-size:8pt;color:#5F5E5A;text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
.hd-r{text-align:right}
.hd-tag{font-size:7pt;background:#185FA5;color:#fff;padding:2px 8px;border-radius:3px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;display:inline-block}
.hd-nom{font-size:14pt;font-weight:700;margin-top:3px}
.hd-info{font-size:9pt;color:#5F5E5A;margin-top:2px}

/* RÉSUMÉ */
.resume{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;background:#E6F1FB;border-radius:8px;padding:12px}
.rk{text-align:center}
.rv{font-size:18pt;font-weight:800;color:#185FA5}
.rl{font-size:7pt;color:#5F5E5A;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}

/* ÉPREUVES */
.epreuve{margin-bottom:20px;break-inside:avoid}
.ep-hd{background:#185FA5;color:#fff;padding:8px 14px;border-radius:6px 6px 0 0;display:flex;justify-content:space-between;align-items:center}
.ep-t{font-size:10pt;font-weight:700}
.ep-coef{font-size:8pt;opacity:.8}
.ep-body{border:1px solid #D3D1C7;border-top:none;border-radius:0 0 6px 6px;overflow:hidden}

/* COMPÉTENCE */
.comp-sec{border-bottom:1px solid #F1EFE8}
.comp-sec:last-child{border-bottom:none}
.comp-hd{padding:8px 14px;background:#F8F7F3;display:flex;justify-content:space-between;align-items:center}
.comp-critere{padding:6px 14px 8px;background:#F0F4FF;border-top:1px solid #E5E7EB;font-size:8.5pt}
.comp-critere-label{font-size:7pt;text-transform:uppercase;letter-spacing:.08em;color:#4A6FA5;font-weight:700;margin-bottom:3px}
.comp-critere-txt{color:#374151;line-height:1.5;margin-bottom:4px}
.comp-niv-desc{font-style:italic;color:#4A6FA5;font-size:8pt;padding:4px 8px;background:#EBF4FF;border-radius:4px;border-left:3px solid #4A6FA5}
.comp-code{font-size:9pt;font-weight:700;color:#185FA5}
.comp-label{font-size:9pt;color:#2C2C2A;flex:1;margin-left:10px}
.niv-badge{font-size:8pt;font-weight:700;padding:2px 8px;border-radius:4px}
.niv-0{background:#D3D1C7;color:#5F5E5A}
.niv-1{background:#E6F1FB;color:#0C447C}
.niv-2{background:#B5D4F4;color:#0C447C}
.niv-3{background:#EBF4FF;color:#2D5282}
.niv-4{background:#2D5282;color:#fff}

/* MISSIONS */
.missions-list{padding:8px 14px}
.mission-row{display:grid;grid-template-columns:1fr 70px 50px 60px 80px;gap:6px;align-items:center;padding:5px 0;border-bottom:.5px solid #F1EFE8;font-size:9pt}
.mission-row:last-child{border-bottom:none}
.mission-row.hdr{font-size:7pt;font-weight:700;color:#5F5E5A;text-transform:uppercase;letter-spacing:.05em;border-bottom:.5px solid #D3D1C7;padding-bottom:5px}
.note-badge{text-align:center;padding:1px 5px;border-radius:3px;font-weight:700;font-size:9pt}
.nb-h{background:#EBF4FF;color:#2D5282}
.nb-m{background:#FAEEDA;color:#BA7517}
.nb-l{background:#FCEBEB;color:#A32D2D}
.nb-x{background:#F1EFE8;color:#5F5E5A}

/* RÉFLEXIVITÉ */
.reflexiv-sec{padding:8px 14px;background:#FFFDF5;border-top:.5px solid #F1EFE8}
.reflexiv-t{font-size:7pt;font-weight:700;color:#BA7517;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}
.reflexiv-item{margin-bottom:8px;padding:6px 10px;background:#fff;border-left:3px solid #BA7517;border-radius:0 4px 4px 0;font-size:8.5pt;line-height:1.5}
.reflexiv-q{font-size:8pt;font-style:italic;color:#5F5E5A;margin-bottom:3px}

/* OBS ENSEIGNANT */
.obs-sec{padding:8px 14px;background:#EEF7FF;border-top:.5px solid #D3D1C7}
.obs-t{font-size:7pt;font-weight:700;color:#185FA5;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.obs-txt{font-size:9pt;line-height:1.6;color:#2C2C2A;font-style:italic}

/* PIED DE PAGE */
.footer{margin-top:24px;padding-top:10px;border-top:.5px solid #D3D1C7;display:flex;justify-content:space-between;font-size:7.5pt;color:#5F5E5A}
.sign-box{border:.5px solid #D3D1C7;border-radius:4px;padding:8px 14px;min-width:150px;min-height:40px;margin-top:6px}
.sign-label{font-size:7pt;color:#5F5E5A;margin-bottom:4px}

.btn-print{position:fixed;top:20px;right:20px;padding:10px 20px;background:#185FA5;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;box-shadow:0 2px 12px rgba(24,95,165,.3)}

/* COUP DE POUCE */
.cp-btn{display:none;align-items:center;gap:6px;padding:7px 14px;background:#FFFBEA;border:1.5px solid #F0C040;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;color:#8A6500;transition:all .15s;margin-top:10px}
.cp-btn:hover{background:#FFF3C0;border-color:#D4A800}
.cp-btn.visible{display:inline-flex}
.cp-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:3000;align-items:center;justify-content:center}
.cp-overlay.open{display:flex}
.cp-modal{background:#fff;border-radius:14px;max-width:680px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.2)}
.cp-modal-hd{background:#FFFBEA;border-bottom:1.5px solid #F0C040;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-radius:14px 14px 0 0;position:sticky;top:0}
.cp-modal-t{font-size:14px;font-weight:800;color:#8A6500}
.cp-modal-sub{font-size:11px;color:#A07800;margin-top:2px}
.cp-modal-cl{background:none;border:none;cursor:pointer;font-size:18px;color:#8A6500;padding:4px}
.cp-modal-body{padding:20px}
.cp-footer{padding:12px 20px;background:#FFFBEA;border-top:1px solid #F0C040;border-radius:0 0 14px 14px;font-size:11px;color:#A07800;text-align:center}

/* ANALYSE DE CLASSE */
.ana-btn{padding:8px 16px;background:linear-gradient(135deg,#185FA5,#0C447C);color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:700;display:flex;align-items:center;gap:6px}
.ana-btn:hover{opacity:.9}
.ana-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:3000;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto}
.ana-overlay.open{display:flex}
.ana-modal{background:#fff;border-radius:14px;width:100%;max-width:860px;box-shadow:0 8px 40px rgba(0,0,0,.2);margin:auto}
.ana-hd{background:linear-gradient(135deg,#185FA5,#0C447C);padding:20px 24px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center}
.ana-hd-t{font-family:system-ui,sans-serif;font-size:17px;font-weight:800;color:#fff}
.ana-hd-s{font-size:11px;color:rgba(255,255,255,.65);margin-top:3px}
.ana-cl{background:none;border:none;cursor:pointer;color:#fff;font-size:20px;padding:4px}
.ana-body{padding:24px}
.ana-section{margin-bottom:24px}
.ana-section-t{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gm);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--gb)}
.ana-table{width:100%;border-collapse:collapse;font-size:12px}
.ana-table th{background:var(--gc);padding:8px 10px;text-align:left;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--gm)}
.ana-table td{padding:8px 10px;border-bottom:.5px solid var(--gb);vertical-align:middle}
.ana-table tr:last-child td{border-bottom:none}
.ana-bar{height:6px;border-radius:3px;background:#eee;margin-top:3px}
.ana-bar-fill{height:100%;border-radius:3px;transition:width .3s}
.ana-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.ana-bdg-r{background:var(--rc);color:var(--rg)}
.ana-bdg-o{background:var(--ac);color:var(--am)}
.ana-bdg-g{background:#EBF4FF;color:#2D5282}
.ana-rem-btn{padding:12px 20px;background:#fff;border:2px solid var(--bl);border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;color:var(--bl);width:100%;margin-top:8px;transition:all .15s}
.ana-rem-btn:hover{background:var(--bl);color:#fff}

/* FICHE DE POSTE & ORGANIGRAMME */
.poste-card{background:linear-gradient(135deg,#0C3D6E,#185FA5);border-radius:12px;padding:16px 20px;color:#fff;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;cursor:pointer;transition:opacity .15s}
.poste-card:hover{opacity:.92}
.poste-card-l{}
.poste-card-tag{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:4px}
.poste-card-titre{font-size:15px;font-weight:800;color:#fff;margin-bottom:2px}
.poste-card-sub{font-size:11px;color:rgba(255,255,255,.7)}
.poste-card-r{text-align:right}
.poste-card-ico{font-size:28px;margin-bottom:4px}
.poste-card-cta{font-size:10px;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:4px}

/* MODALE ORGANIGRAMME */
.org-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:3000;align-items:center;justify-content:center;padding:20px}
.org-overlay.open{display:flex}
.org-modal{background:#fff;border-radius:14px;width:100%;max-width:780px;max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.25)}
.org-hd{background:linear-gradient(135deg,#0C3D6E,#185FA5);padding:20px 24px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center}
.org-hd-t{font-size:16px;font-weight:800;color:#fff}
.org-hd-s{font-size:11px;color:rgba(255,255,255,.6);margin-top:2px}
.org-cl{background:none;border:none;cursor:pointer;color:#fff;font-size:20px}
.org-body{padding:24px}
.org-tabs{display:flex;gap:6px;margin-bottom:20px}
.org-tab{padding:7px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:.5px solid var(--gb);color:var(--gm);background:#fff}
.org-tab.on{background:var(--bl);color:#fff;border-color:var(--bl)}

/* Organigramme */
.org-tree{display:flex;flex-direction:column;align-items:center;gap:0}
.org-level{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;position:relative;margin-bottom:0}
.org-connector{width:1px;height:24px;background:#D3D1C7;margin:0 auto}
.org-h-line{height:1px;background:#D3D1C7;position:absolute;top:0}
.org-node{background:#fff;border:.5px solid #D3D1C7;border-radius:10px;padding:10px 14px;text-align:center;min-width:130px;max-width:160px;position:relative;transition:all .2s}
.org-node.top{border-color:var(--bl);background:var(--bc)}
.org-node.me{border:2.5px solid var(--vt);background:#EBF4FF;box-shadow:0 0 0 4px rgba(29,158,117,.15)}
.org-node.manager{border-color:#6B4FA0;background:#F0EAFA}
.org-node.peer{border-color:#D3D1C7;background:#FAFAF8;opacity:.7}
.org-node-ava{width:36px;height:36px;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff}
.org-node-nom{font-size:11px;font-weight:700;color:var(--gr);line-height:1.3}
.org-node-role{font-size:9px;color:var(--gm);margin-top:2px;line-height:1.3}
.org-node-badge{display:inline-block;margin-top:5px;padding:2px 8px;border-radius:8px;font-size:9px;font-weight:700;background:var(--vt);color:#fff}

/* Fiche de poste */
.fp-section{margin-bottom:18px}
.fp-section-t{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gm);margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--gb)}
.fp-liste{list-style:none;display:flex;flex-direction:column;gap:6px}
.fp-liste li{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--gr);line-height:1.5}
.fp-liste li::before{content:'→';color:var(--bl);font-weight:700;flex-shrink:0}
.fp-manager{display:flex;align-items:center;gap:12px;background:var(--gc);border-radius:10px;padding:12px 16px}
.fp-manager-ava{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;flex-shrink:0}
.fp-manager-nom{font-size:13px;font-weight:700;color:var(--gr)}
.fp-manager-role{font-size:11px;color:var(--gm)}

/* MOT DE PASSE ENSEIGNANT */
#fg-mdp{display:none;margin-top:8px}
#fg-mdp label{font-size:11px;font-weight:700;color:var(--gm);display:block;margin-bottom:4px}
#inp-mdp{width:100%;padding:10px 12px;border:.5px solid var(--gb);border-radius:8px;font-size:13px;background:#fff;outline:none}
#inp-mdp:focus{border-color:var(--bl);box-shadow:0 0 0 3px var(--bc)}
.mdp-hint{font-size:10px;color:var(--gm);margin-top:4px;text-align:center}
.tb2b{background:var(--bc);color:var(--bl);padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.04em}
.tb2c{background:#F3E8FF;color:#8E44AD;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.04em}
.tpros{background:var(--ac);color:var(--am);padding:2px 8px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:.04em}
.cl-pot-bar{height:5px;border-radius:3px;background:var(--gc);margin-top:4px;overflow:hidden}
.cl-pot-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#4A6FA5,#2D5282);transition:width .4s}
.cl-stats-row{display:flex;gap:8px;margin-top:8px}
.cl-stat-chip{flex:1;background:var(--gc);border-radius:7px;padding:7px 10px;text-align:center}
.cl-stat-chip .sv{font-size:14px;font-weight:800;color:var(--gr)}
.cl-stat-chip .sl{font-size:9px;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-top:1px}

/* ONBOARDING ENSEIGNANT */
#ob-ens{background:linear-gradient(135deg,#0A2540,#0C3D6E);align-items:center;justify-content:center;padding:2rem}
.ob-ens-w{width:100%;max-width:760px}
.ob-ens-pg{display:flex;gap:8px;justify-content:center;margin-bottom:32px}
.ob-ens-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.25);transition:all .3s;cursor:pointer}
.ob-ens-dot.cur{background:#fff;width:28px;border-radius:5px}
.ob-ens-p{display:none;animation:fadeInUp .35s ease}
.ob-ens-p.on{display:block}
@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.ob-ens-card{background:rgba(255,255,255,.06);border:.5px solid rgba(255,255,255,.15);border-radius:16px;padding:32px;margin-bottom:20px}
.ob-ens-tag{font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#4A6FA5;margin-bottom:12px}
.ob-ens-titre{font-size:26px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:12px}
.ob-ens-sub{font-size:14px;color:rgba(255,255,255,.7);line-height:1.6;margin-bottom:20px}
.ob-ens-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:4px}
.ob-ens-feat{background:rgba(255,255,255,.08);border-radius:10px;padding:14px 16px;border-left:3px solid var(--vt)}
.ob-ens-feat-ico{font-size:20px;margin-bottom:6px}
.ob-ens-feat-t{font-size:12px;font-weight:700;color:#fff;margin-bottom:3px}
.ob-ens-feat-d{font-size:11px;color:rgba(255,255,255,.6);line-height:1.4}
.ob-ens-nav{display:flex;justify-content:space-between;align-items:center}
.ob-ens-skip{font-size:11px;color:#6B7280;cursor:pointer;padding:8px;background:none;border:none}
.ob-ens-skip:hover{color:rgba(255,255,255,.7)}
.ob-ens-next{padding:12px 28px;background:#fff;color:#0C3D6E;border:none;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;transition:all .15s}
.ob-ens-next:hover{background:var(--bc)}
.ob-ens-mdp{background:rgba(255,255,255,.1);border-radius:8px;padding:10px 16px;font-size:11px;color:#1F2937;display:flex;align-items:center;gap:8px;margin-bottom:12px}

.res-section{margin-bottom:8px}
.res-section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:4px 10px;border-radius:6px;display:inline-block;margin-bottom:10px}
.res-debutant .res-section-label{background:#EBF4FF;color:#2D5282}
.res-section .res-section-label{background:#E3F2FD;color:#1565C0}

/* SIGNATURE MANUSCRITE PDG */
.lb-sig{font-family:'Brush Script MT','Segoe Script',cursive;font-size:28px;color:#1D3461;margin-top:8px;margin-bottom:4px;letter-spacing:1px}
.lb-sig-nom{font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:.12em;font-style:normal}
.lb-entete{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid #E8E4DC}
.lb-entete-logo{font-size:18px;font-weight:900;color:#2563EB;letter-spacing:-.5px}
.lb-entete-sub{font-size:10px;color:#9CA3AF;margin-top:2px}
.lb-entete-date{font-size:11px;color:#9CA3AF;text-align:right}

/* ACTUALITÉS LABORO */
.actu-item{display:flex;gap:12px;padding:10px 0;border-bottom:.5px solid var(--gb)}
.actu-item:last-child{border-bottom:none}
.actu-icon{font-size:20px;flex-shrink:0;width:28px;text-align:center;margin-top:2px}
.actu-titre{font-size:12px;font-weight:700;color:var(--gr);margin-bottom:3px}
.actu-txt{font-size:11px;color:var(--gm);line-height:1.5}
/* INDICATEURS */
.indic-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:8px 0}
.indic-kpi{text-align:center;padding:10px 6px;background:#F8FAFC;border-radius:8px}
.indic-v{font-size:22px;font-weight:900;color:var(--bf);letter-spacing:-1px}
.indic-l{font-size:9px;color:var(--gm);text-transform:uppercase;letter-spacing:.06em;margin-top:3px;line-height:1.4}

/* GRILLE POSITIONNEMENT CCF */
.ccf-grille{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:10px 14px;padding:8px 0;border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB}
.ccf-case{text-align:center;padding:8px 6px;border-radius:6px;border:1.5px solid #E5E7EB;position:relative;background:#fff}
.ccf-active{border-color:#2D5282;background:#EBF4FF}
.ccf-num{font-size:18px;font-weight:900;color:#D1D5DB;line-height:1}
.ccf-active .ccf-num{color:#2D5282}
.ccf-lbl{font-size:8.5pt;color:#9CA3AF;margin-top:2px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.ccf-active .ccf-lbl{color:#2D5282}
.ccf-mark{font-size:20px;font-weight:900;color:#2D5282;margin-top:2px}
/* APPRÉCIATION MOTIVÉE */
.appr-motivee{margin:8px 14px;padding:10px 14px;background:#FFFBEB;border-radius:6px;border-left:3px solid #D97706}
.appr-label{font-size:8pt;font-weight:700;color:#D97706;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
.appr-txt{font-size:10pt;color:#374151;line-height:1.6;font-style:italic}

/* DASHBOARD CCF */
.ccf-dash-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--bf);margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--gb)}
.ccf-dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.ccf-dash-ep{border-radius:10px;padding:14px;border:1.5px solid var(--gb)}
.ccf-ok{border-color:#BEE3F8;background:#F0F8FF}
.ccf-warn{border-color:#FEF3C7;background:#FFFDF5}
.ccf-todo{border-color:#FEE2E2;background:#FFF5F5}
.ccf-dash-ep-hd{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.ccf-dash-code{font-size:13px;font-weight:900;color:var(--bf)}
.ccf-dash-label{font-size:12px;font-weight:600;color:var(--gr);flex:1}
.ccf-dash-coef{font-size:10px;color:var(--gm);background:var(--gb);padding:2px 7px;border-radius:10px}
.ccf-comp-row{display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:.5px solid var(--gb);font-size:11px}
.ccf-comp-row:last-child{border-bottom:none}
.ccf-comp-code{font-weight:700;color:var(--bf);width:36px;flex-shrink:0}
.ccf-comp-name{flex:1;color:var(--gr)}
.ccf-comp-lv{font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;flex-shrink:0}
.ccf-comp-ok .ccf-comp-lv{background:#EBF4FF;color:#1E3A5F}
.ccf-comp-warn .ccf-comp-lv{background:#FEF3C7;color:#92400E}
.ccf-comp-todo .ccf-comp-lv{background:#FEE2E2;color:#991B1B}
.ccf-comp-nb{font-size:10px;color:var(--gm);flex-shrink:0}
.ccf-progress-bar{height:4px;background:var(--gb);border-radius:2px;margin-top:10px;overflow:hidden}
.ccf-progress-fill{height:100%;background:var(--bl);border-radius:2px;transition:width .3s}
.ccf-dash-footer{display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--gb)}

/* ONBOARDING ÉTAPES */
.ob-steps{display:flex;flex-direction:column;gap:10px;margin:14px 0}
.ob-step{display:flex;align-items:flex-start;gap:12px;background:#F0F4FF;border-radius:10px;padding:12px 14px;border:1px solid #BFDBFE}
.ob-step-n{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.ob-step-t{font-size:13px;font-weight:700;color:#1A2E4A;margin-bottom:3px}
.ob-step-d{font-size:11px;color:#374151;line-height:1.5}
/* SCROLLBAR VISIBLE */
.lr::-webkit-scrollbar{width:8px}
.lr::-webkit-scrollbar-track{background:#F3F4F6}
.lr::-webkit-scrollbar-thumb{background:#BEE3F8;border-radius:4px}
.lr::-webkit-scrollbar-thumb:hover{background:#4A6FA5}

.mo-body::-webkit-scrollbar{width:8px}
.mo-body::-webkit-scrollbar-track{background:#F3F4F6}
.mo-body::-webkit-scrollbar-thumb{background:#BEE3F8;border-radius:4px}
.mo-body::-webkit-scrollbar-thumb:hover{background:#4A6FA5}

/* ONBOARDING ENSEIGNANT -- texte foncé sur card blanche */
.ob-ens-card .ob-h1{color:#1A2E4A!important}
.ob-ens-card .ob-sub{color:#374151!important}
.ob-ens-card .ob-steps{margin:10px 0}

/* CATALOGUE PREMIUM */
.cat-tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:18px;border-bottom:1px solid var(--gb);padding-bottom:0}
.cat-tab{padding:8px 14px;border-radius:8px 8px 0 0;font-size:12px;font-weight:600;cursor:pointer;color:var(--gm);transition:all .15s;border-bottom:3px solid transparent;margin-bottom:-1px}
.cat-tab:hover{background:#F0F4FF;color:var(--bl)}
.cat-tab.on{background:#fff;color:var(--bl);border-bottom:3px solid var(--bl);font-weight:700}
.cat-count{background:#EBF4FF;color:var(--bl);font-size:9px;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:4px}
.cat-section{margin-bottom:28px}
.cat-section-title{font-size:14px;font-weight:700;color:var(--t1);margin-bottom:12px;display:flex;align-items:center}
.pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.pc{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);cursor:pointer;transition:all .2s;border:1px solid var(--gb)}
.pc:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.12)}
.pi-wrap{position:relative;overflow:hidden;background:#f8faff}
.pi{width:100%;height:130px;object-fit:cover;display:block}
.prod-marque{position:absolute;top:8px;left:8px;font-size:9px;font-weight:800;color:#fff;padding:2px 8px;border-radius:12px;letter-spacing:.5px}
.prod-badge{display:inline-block;font-size:9px;font-weight:600;padding:2px 8px;border-radius:10px;margin-top:6px}
.prod-badge-ok{background:#D1FAE5;color:#065F46}
.prod-badge-low{background:#FEF3C7;color:#92400E}
.prod-badge-cmd{background:#EDE9FE;color:#5B21B6}
.pin{padding:10px 12px}
.pnom{font-size:12px;font-weight:700;color:var(--t1);line-height:1.3;margin-bottom:2px}
.pref{font-size:10px;color:var(--gm)}
.pprix{font-size:15px;font-weight:800;color:var(--bl)}
.pmarge{font-size:10px;color:#276749;font-weight:600}
#fiche-produit{display:none;margin-bottom:20px}
#fiche-produit.on{display:block}
</style>
</head>
<body>
<button class="btn-print no-print" onclick="window.print()">🖨️ Imprimer / Enregistrer en PDF</button>
<div class="page">

<!-- EN-TÊTE -->
<div class="hd">
  <div><div class="hd-logo">LABORO</div><div class="hd-sub">Sport & Outdoor · Évry-Courcouronnes (91)</div></div>
  <div class="hd-r">
    <div class="hd-tag">Portfolio d'activités professionnelles — Bac Pro MCV</div>
    <div class="hd-nom">${nom}</div>
    <div class="hd-info">${poste}</div>
    <div class="hd-info">${classe} · Généré le ${date}</div>
  </div>
</div>

<!-- RÉSUMÉ -->
${buildResume(ud,score)}

<!-- ÉPREUVES -->
${buildEpreuves(ud,mail,s)}

<!-- PIED DE PAGE -->
<div class="footer">
  <div>
    <div>Document d'aide au positionnement — généré depuis la plateforme LABORO</div>
    <div style="margin-top:2px">Enseignant responsable : M. Pascal Berruelle — Bac Pro MCV</div>
  </div>
  <div style="text-align:right">
    <div class="sign-label">Visa enseignant</div>
    <div class="sign-box"></div>
  </div>
</div>

</div>
<div class="rl">Score LABORO /100</div></div>
    <div class="rk"><div class="rv">${done.length}</div><div class="rl">Missions validées</div></div>
    <div class="rk"><div class="rv">${avg}</div><div class="rl">Moyenne générale /20</div></div>
    <div class="rk"><div class="rv">${compOk}/12</div><div class="rl">Compétences acquises</div></div>
  </div>`;

  try{
    // Essayer d'abord window.open
    const win=window.open('','_blank');
    if(win){
      win.document.write(html);
      win.document.close();
    } else {
      // Fallback : téléchargement direct
      const blob=new Blob([html],{type:'text/html;charset=utf-8'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;
      a.download='portfolio-laboro.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }catch(e){alert('Erreur portfolio: '+e.message);}
}

