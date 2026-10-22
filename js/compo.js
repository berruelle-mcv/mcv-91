// ================================================================
//   LABORO — Zones de rédaction « en situation » (compositeurs)
//   Moteur commun MCV / Auto. Quand une question demande de rédiger un
//   support professionnel (mail, SMS, note, publication…), la zone de
//   réponse prend l'apparence de l'outil réel.
//
//   Principe de sûreté : la zone de texte d'origine (textarea .zone-rep)
//   reste la SEULE mémoire de la réponse. Le compositeur la remplit en
//   texte lisible (lu tel quel par l'IA et par l'enseignant) ; brouillons,
//   reprise sur un autre poste et soumission fonctionnent donc sans
//   changement. Une réponse ancienne (texte libre) s'ouvre en texte libre.
// ================================================================
var COMPO = (function(){
  'use strict';

  // ── 1. Reconnaître le support demandé ─────────────────────────────
  var VERBE = "(?:R[ée]dige[sz]?|[ÉE]cri[st]|Compl[èe]te[sz]?|Pr[ée]pare[sz]?|Formule[sz]?)";
  var DET = "(?:le|la|l'|les|un|une|ton|ta|tes|ce|cette|votre)";
  var MOTS = "(?:[^ .:;,(]+ ){0,3}";
  var NOMS = [
    ['sms', "SMS|texto"],
    ['avis', "r[ée]ponse (?:publique|[àa] l.avis|au commentaire|[àa] (?:ce|son) commentaire)|r[ée]ponse type [àa] un avis"],
    ['reseau', "publication|post(?!-)|message (?:de lancement|Facebook|Instagram)|story"],
    ['mail', "e-?mail(?:ing)?|courriel|mail|r[ée]ponse au mail|objet de ce mail"],
    ['crm', "mise [àa] jour (?:SIC|de la fiche|du SIC|CRM)|fiche (?:SIC|CRM|client|prospect)"],
    ['lettre', "lettre|courrier"],
    ['telephone', "script|trame d.appel|message (?:vocal|laiss[ée] sur le r[ée]pondeur)"],
    ['commande', "bon de commande|avenant au bon de commande|devis|r[ée]capitulatif chiffr[ée]|proposition commerciale chiffr[ée]e"],
    ['visuel', "affiche|[ée]tiquette|panneau|PLV|fiche showroom|accroche de l.affiche|flyer|kak[ée]mono"],
    ['note', "note(?! de veille)|compte[- ]rendu|m[ée]mo|rapport"]
  ];
  var RE = NOMS.map(function(n){
    return [n[0], new RegExp("(?:^|[.;:!?] |, puis |puis |, )"+VERBE+" "+DET+" ?"+MOTS+"(?:"+n[1]+")\\b", "i")];
  });
  var RE_CRM = /SIC|CRM|LABORO Connect|fiche (?:client|entreprise|prospect)|dossier du client/i;

  function detecter(q){
    var t = String(q||'').replace(/^\S+\s+/, '');   // retire le numéro « 2.1 »
    if(/Choisis le canal|D[ée]cide si|ce que tu dis ou [ée]cris/i.test(t)) return null;   // le support est au choix de l'élève
    if(/Que saisis-tu dans|R[ée]dige ce que tu saisis/i.test(t)) return 'crm';
    for(var i=0;i<RE.length;i++){
      if(RE[i][1].test(t)){
        var k = RE[i][0];
        if(k==='note' && RE_CRM.test(t) && /note (?:[àa] (?:ajouter|enregistrer|saisir)|que tu (?:ajoutes|saisis))/i.test(t)) return 'crm';
        return k;
      }
    }
    if(/R[ée]dige ce que tu (?:lui )?dis/i.test(t)) return /t[ée]l[ée]phone|appel|rappel|au bout du fil/i.test(t) ? 'telephone' : 'oral';
    return null;
  }

  // ── 2. Description des supports ──────────────────────────────────
  // champs : {k: clé, l: libellé, type: 'ligne'|'texte'|'choix', ...}
  // Les champs 'ligne'/'choix' s'écrivent « Libellé : valeur », les champs
  // 'texte' en bloc « ▸ Libellé » suivi du texte.
  var SUPPORTS = {
    mail: {nom:'E-mail', marque:'[E-MAIL]', champs:[
      {k:'a', l:'À', type:'ligne', ph:'Nom et adresse du destinataire'},
      {k:'cc', l:'Cc', type:'ligne', ph:'Personne en copie (si demandé)', option:true},
      {k:'objet', l:'Objet', type:'ligne', ph:'Objet clair et précis'},
      {k:'corps', l:'Message', type:'texte', ph:'Formule d\'appel (Bonjour Madame…),\n\nton message…\n\nFormule de politesse,\nPrénom Nom\nFonction — entreprise\nTéléphone', grand:true}]},
    sms: {nom:'SMS', marque:'[SMS]', champs:[
      {k:'a', l:'À', type:'ligne', ph:'Nom du destinataire'},
      {k:'corps', l:'Message', type:'texte', ph:'Écris ton SMS…', compteur:'sms'}]},
    reseau: {nom:'Publication', marque:'[PUBLICATION RÉSEAU SOCIAL]', champs:[
      {k:'reseau', l:'Réseau', type:'choix', options:['Facebook','Instagram','LinkedIn']},
      {k:'visuel', l:'Visuel (décris l\'image ou la vidéo)', type:'texte', ph:'Ex. : photo du showroom avec…', petit:true},
      {k:'corps', l:'Texte', type:'texte', ph:'Texte de la publication…'},
      {k:'hashtags', l:'Hashtags', type:'ligne', ph:'#exemple #exemple'}]},
    avis: {nom:'Réponse publique', marque:'[RÉPONSE PUBLIQUE]', champs:[
      {k:'plateforme', l:'Plateforme', type:'choix', options:['Avis Google','Facebook','Instagram']},
      {k:'corps', l:'Réponse', type:'texte', ph:'Bonjour…, merci pour…'}]},
    crm: {nom:'Fiche client', marque:'[FICHE CLIENT]', lignesLibres:true, champs:[
      {k:'corps', l:'Commentaire', type:'texte', ph:'Commentaire daté, factuel : ce qui a été dit, décidé…', petit:true}]},
    telephone: {nom:'Appel', marque:'[APPEL TÉLÉPHONIQUE]', champs:[
      {k:'a', l:'Interlocuteur', type:'ligne', ph:'Nom de la personne appelée'},
      {k:'corps', l:'Ce que je dis', type:'texte', ph:'Bonjour Madame…, ici… de…', grand:true}]},
    oral: {nom:'Face à face', marque:'[ÉCHANGE EN FACE À FACE]', champs:[
      {k:'a', l:'Interlocuteur', type:'ligne', ph:'Nom ou description de la personne'},
      {k:'corps', l:'Ce que je dis', type:'texte', ph:'Bonjour Madame…', grand:true}]},
    lettre: {nom:'Lettre', marque:'[LETTRE]', champs:[
      {k:'a', l:'Destinataire', type:'texte', ph:'Nom\nAdresse', petit:true},
      {k:'date', l:'Lieu et date', type:'ligne', ph:'Évry-Courcouronnes, le …'},
      {k:'objet', l:'Objet', type:'ligne', ph:'Objet de la lettre'},
      {k:'corps', l:'Lettre', type:'texte', ph:'Madame, Monsieur,\n\n…\n\nVeuillez agréer…', grand:true},
      {k:'signature', l:'Signature', type:'ligne', ph:'Prénom Nom, fonction'}]},
    note: {nom:'Note interne', marque:'[NOTE INTERNE]', champs:[
      {k:'a', l:'À', type:'ligne', ph:'Destinataire de la note'},
      {k:'de', l:'De', type:'ligne', ph:'Ton prénom et ton nom'},
      {k:'date', l:'Date', type:'ligne', ph:'Date'},
      {k:'objet', l:'Objet', type:'ligne', ph:'Objet de la note'},
      {k:'corps', l:'Texte', type:'texte', ph:'Rédige ta note…', grand:true}]},
    visuel: {nom:'Support visuel', marque:'[SUPPORT VISUEL]', champs:[
      {k:'format', l:'Support', type:'choix', options:['Affiche','Étiquette','Panneau','Fiche produit','Vitrine']},
      {k:'titre', l:'Accroche', type:'ligne', ph:'Accroche en gros caractères'},
      {k:'corps', l:'Texte', type:'texte', ph:'Informations utiles, avantages…', petit:true},
      {k:'mentions', l:'Prix et mentions', type:'ligne', ph:'Prix, dates, conditions…'}]},
    commande: {nom:'Bon de commande', marque:'[BON DE COMMANDE]', lignesLibres:true, tableau:true, champs:[
      {k:'corps', l:'Remarques', type:'texte', ph:'Conditions, calculs, remarques…', petit:true}]}
  };

  // ── 3. Outils ─────────────────────────────────────────────────────
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function cap(s){ s=String(s).trim(); return s.charAt(0).toUpperCase()+s.slice(1); }
  function idf(qid,k){ return 'rd_'+qid+'_'+k; }
  // Rubriques annoncées dans la consigne : « … : statut, écart…, et prochaine action. »
  function rubriques(q){
    var t = String(q||'').replace(/^\S+\s+/, '');
    var i = t.indexOf(':'); if(i<0) return [];
    var s = t.slice(i+1).replace(/\([^)]*\)/g,'').split(/[.;]/)[0];
    var p = s.split(/\s*(?:·|,| et (?=[a-zéèàâ]))\s*/i).map(function(x){return x.replace(/^(?:et|puis)\s+/i,'').replace(/^(?:la|le|les)\s+|^l'/i,'').trim();})
             .filter(function(x){return x.length>1 && x.length<=45;});
    return (p.length>=2 && p.length<=8) ? p.map(cap) : [];
  }
  // Longueur attendue annoncée dans la consigne
  function cible(q){
    var t=String(q||''), m;
    if((m=t.match(/(\d+)\s*à\s*(\d+)\s*(lignes|phrases|mots)/i))) return {min:+m[1],max:+m[2],u:m[3].toLowerCase()};
    if((m=t.match(/(\d+)\s*(lignes|phrases|mots)\s*(?:au\s*)?max(?:imum)?/i))) return {min:0,max:+m[1],u:m[2].toLowerCase()};
    if((m=t.match(/(?:au plus|maximum)\s*(\d+)\s*(lignes|phrases|mots)/i))) return {min:0,max:+m[1],u:m[2].toLowerCase()};
    return null;
  }
  function mesurer(txt,u){
    txt=String(txt||'').trim(); if(!txt) return 0;
    if(u==='mots') return txt.split(/\s+/).length;
    if(u==='phrases') return (txt.match(/[^.!?…]+[.!?…]+/g)||[txt]).length;
    return txt.split('\n').filter(function(l){return l.trim();}).length;
  }
  function avecComplements(q){ return /\b(puis|ensuite|justifie)\b/i.test(String(q||'').replace(/^\S+\s+/,'')); }
  // SMS à compléter : « Complète ce SMS : 'Bonjour ___, …' »
  function modeleDansConsigne(q){
    var t = String(q||'');
    var m = t.match(/«\s*([^»]*_{2,}[^»]*?)\s*»/) || t.match(/(?:^|[\s:])['"]([^'"]*_{2,}[^"]*?)['"]\s*\.?\s*$/) || t.match(/:\s*(Bonjour[^]*_{2,}[^]*)$/);
    return m ? m[1].trim() : '';
  }

  // ── 4. Texte ⇄ champs ────────────────────────────────────────────
  function serialiser(type, v){
    var S = SUPPORTS[type], out=[S.marque];
    S.champs.forEach(function(c){ if(c.type!=='texte' && v[c.k]) out.push(c.l+' : '+v[c.k]); });
    (v.lignes||[]).forEach(function(r){ if(r[0]||r[1]) out.push((r[0]||'?')+' : '+(r[1]||'')); });
    if(v.tableau && v.tableau.some(function(r){return r.join('').trim();})){
      out.push('▸ Lignes de la commande'); out.push(ENTETES.join(' | '));
      v.tableau.forEach(function(r){ if(r.join('').trim()) out.push(r.join(' | ')); });
    }
    function prot(x){ return String(x).replace(/^▸ /gm,'▹ '); }
    S.champs.forEach(function(c){ if(c.type==='texte' && v[c.k]){ out.push('▸ '+c.l); out.push(prot(v[c.k])); } });
    if(v.complements){ out.push('▸ Compléments demandés'); out.push(prot(v.complements)); }
    return out.length>1 ? out.join('\n') : '';
  }
  function lire(type, txt){
    var S = SUPPORTS[type], v={lignes:[], tableau:[]};
    var L = String(txt||'').split('\n');
    if(L[0]!==S.marque) return null;
    var parLib={}; S.champs.forEach(function(c){ parLib[c.l]=c; });
    var bloc=null, buf=[];
    function fermer(){
      if(bloc===null) return;
      var b=buf.join('\n');
      if(bloc==='Compléments demandés') v.complements=b;
      else if(bloc==='Lignes de la commande') v.tableau=buf.slice(1).map(function(l){var r=l.split(' | ');while(r.length<ENTETES.length)r.push('');return r.slice(0,ENTETES.length);});
      else if(parLib[bloc]) v[parLib[bloc].k]=b;
      bloc=null; buf=[];
    }
    for(var i=1;i<L.length;i++){
      var l=L[i];
      if(l.indexOf('▸ ')===0){ fermer(); bloc=l.slice(2); continue; }
      if(bloc!==null){ buf.push(l); continue; }
      var j=l.indexOf(' : '); if(j<0) continue;
      var lib=l.slice(0,j), val=l.slice(j+3);
      if(parLib[lib] && parLib[lib].type!=='texte') v[parLib[lib].k]=val;
      else v.lignes.push([lib,val]);
    }
    fermer();
    return v;
  }
  var ENTETES = ['Référence','Désignation','Quantité','Prix unitaire HT','Remise','Montant HT'];

  // ── 5. Affichage ─────────────────────────────────────────────────
  // ctx : {mid, nomCourt, entreprise, crm, eleve, interlocuteur}
  function rendre(qid, q, saved, ctx){
    var type = detecter(q); if(!type) return null;
    ctx = ctx||{};
    var S = SUPPORTS[type];
    var v = saved ? lire(type, saved) : null;
    var libre = !!(saved && !v);           // ancienne réponse en texte libre → on la respecte
    if(!v) v = {lignes:[], tableau:[]};
    if(!saved){                             // valeurs de départ
      if(/\bcompl[èe]te (?:ce|cette)\b/i.test(q)){ var mod=modeleDansConsigne(q); if(mod) v.corps=mod; }
      if(type==='note') v.de = ctx.eleve||'';
      if(S.lignesLibres && !type.match(/commande/) || (type==='commande' && !/fournisseur/i.test(q))){
        var rb = rubriques(q);
        v.lignes = (rb.length ? rb : (type==='crm' ? ['Date','Canal','Interlocuteur','Résultat','Prochaine action','Échéance'] : ['Client','Article / véhicule','Prix','Mode de paiement'])).map(function(x){return [x,''];});
        if(rb.length && type==='crm') v.lignes.unshift(['Date','']);
      }
      if(type==='commande' && /fournisseur/i.test(q)){ v.tableau=[['','','','','',''],['','','','','','']]; v.lignes=[['Fournisseur',''],['Date',''],['Total HT','']]; }
      if(type==='reseau'){ var r=String(q).match(/Instagram|Facebook|LinkedIn/i); if(r) v.reseau=cap(r[0].toLowerCase()).replace('Linkedin','LinkedIn'); }
      if(type==='avis'){ var p=String(q).match(/Google|Facebook|Instagram/i); if(p) v.plateforme=({google:'Avis Google',facebook:'Facebook',instagram:'Instagram'})[p[0].toLowerCase()]; }
    }
    var cb = cible(q), oc = avecComplements(q) || !!v.complements;
    var h = '<div class="rd rd-'+type+'" id="rd_'+qid+'" data-type="'+type+'" data-qid="'+qid+'"'+(libre?' data-libre="1"':'')+'>';
    h += '<div class="rd-barre"><span class="rd-app">'+esc(titreApp(type,ctx,q))+'</span>'
       + '<button type="button" class="rd-bascule" onclick="COMPO.basculer(\''+qid+'\')">'+(libre?'Utiliser la mise en page':'Écrire en texte libre')+'</button></div>';
    h += '<div class="rd-corps"'+(libre?' hidden':'')+'>';
    h += enTete(type, ctx);
    S.champs.forEach(function(c){
      if(c.option && !v[c.k] && !/en copie|\bcc\b/i.test(q)) return;
      if(c.type==='texte' && c.k==='corps' && S.lignesLibres) h += rendreLignes(qid, v, type);
      h += rendreChamp(qid, c, v[c.k], cb, type);
    });
    h += '<details class="rd-compl"'+(oc?' open':'')+'><summary>La consigne demande aussi d\'expliquer ou de justifier ? Écris-le ici</summary>'
       + '<textarea class="rd-in zone-compo" id="'+idf(qid,'complements')+'" rows="3" placeholder="Explication, justification, calcul…">'+esc(v.complements||'')+'</textarea></details>';
    h += '</div></div>';
    return {type:type, html:h, libre:libre};
  }
  function titreApp(type, ctx, q){
    var crm = /SIC\b/.test(q) ? 'SIC' : (/LABORO Connect/.test(q) ? 'LABORO Connect' : (ctx.crm||'Logiciel client'));
    return ({mail:'Messagerie — '+(ctx.entreprise||''), sms:'SMS professionnel', reseau:'Page '+(ctx.nomCourt||''), avis:'Réponse du propriétaire',
      crm:crm+' — fiche client', telephone:'Appel téléphonique', oral:'Échange en face à face', lettre:'Courrier — '+(ctx.entreprise||''), note:'Note interne — '+(ctx.entreprise||''),
      visuel:'Support visuel', commande:/devis/i.test(q)?'Devis':'Bon de commande'})[type];
  }
  function enTete(type, ctx){
    if(type==='mail') return '<div class="rd-ligne rd-fixe"><label>De</label><span>'+esc((ctx.eleve||'Moi')+' — '+(ctx.entreprise||''))+'</span></div>';
    if(type==='reseau') return '<div class="rd-page"><span class="rd-avatar">'+esc((ctx.nomCourt||'?').slice(0,1))+'</span><b>'+esc(ctx.entreprise||'')+'</b></div>';
    return '';
  }
  function rendreChamp(qid, c, val, cb, type){
    var id=idf(qid,c.k), cls='rd-in zone-compo';
    if(c.type==='ligne') return '<div class="rd-ligne"><label for="'+id+'">'+esc(c.l)+'</label><input class="'+cls+'" id="'+id+'" value="'+esc(val||'')+'" placeholder="'+esc(c.ph||'')+'" autocomplete="off"></div>';
    if(c.type==='choix') return '<div class="rd-ligne"><label for="'+id+'">'+esc(c.l)+'</label><select class="'+cls+'" id="'+id+'"><option value="">— choisir —</option>'
      + c.options.map(function(o){return '<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>';}).join('')+'</select></div>';
    var rows = c.grand?9:(c.petit?3:5);
    var compteur = c.k==='corps' ? '<div class="rd-compteur" id="'+idf(qid,'compteur')+'" data-cible="'+(cb?esc(JSON.stringify(cb)):'')+'" data-sms="'+(c.compteur==='sms'?1:'')+'"></div>' : '';
    return '<div class="rd-bloc"><label for="'+id+'">'+esc(c.l)+'</label><textarea class="'+cls+'" id="'+id+'" rows="'+rows+'" placeholder="'+esc(c.ph||'')+'">'+esc(val||'')+'</textarea>'+compteur+'</div>';
  }
  function rendreLignes(qid, v, type){
    var h='<div class="rd-fiche" id="'+idf(qid,'lignes')+'">';
    (v.lignes||[]).forEach(function(r,i){ h+=ligneFiche(qid,i,r); });
    h+='</div><button type="button" class="rd-ajout" onclick="COMPO.ajouterLigne(\''+qid+'\')">+ Ajouter une rubrique</button>';
    if(type==='commande' && v.tableau && v.tableau.length){
      h+='<div class="rd-tab-wrap"><table class="rd-tab" id="'+idf(qid,'tableau')+'"><thead><tr>'+ENTETES.map(function(e){return '<th>'+e+'</th>';}).join('')+'</tr></thead><tbody>';
      v.tableau.forEach(function(r,i){ h+=ligneTableau(qid,i,r); });
      h+='</tbody></table></div><button type="button" class="rd-ajout" onclick="COMPO.ajouterLigneTableau(\''+qid+'\')">+ Ajouter une ligne</button>';
    }
    return h;
  }
  function ligneFiche(qid,i,r){
    return '<div class="rd-rub"><input class="rd-in zone-compo rd-lib" id="'+idf(qid,'l'+i+'a')+'" value="'+esc(r[0])+'" placeholder="Rubrique" aria-label="Rubrique">'
      +'<input class="rd-in zone-compo" id="'+idf(qid,'l'+i+'b')+'" value="'+esc(r[1])+'" placeholder="À compléter" aria-label="'+esc(r[0]||'Valeur')+'"></div>';
  }
  function ligneTableau(qid,i,r){
    return '<tr>'+r.map(function(x,j){return '<td><input class="rd-in zone-compo" id="'+idf(qid,'t'+i+'_'+j)+'" value="'+esc(x)+'" aria-label="'+ENTETES[j]+'"></td>';}).join('')+'</tr>';
  }

  // ── 6. Saisie → zone de réponse ──────────────────────────────────
  function valeurs(qid){
    var box=document.getElementById('rd_'+qid); if(!box) return null;
    var type=box.dataset.type, S=SUPPORTS[type], v={lignes:[],tableau:[]};
    S.champs.forEach(function(c){ var e=document.getElementById(idf(qid,c.k)); if(e) v[c.k]=e.value.replace(/\s+$/,''); });
    var i=0, a; while((a=document.getElementById(idf(qid,'l'+i+'a')))){ v.lignes.push([a.value.trim(), document.getElementById(idf(qid,'l'+i+'b')).value.trim()]); i++; }
    i=0; while(document.getElementById(idf(qid,'t'+i+'_0'))){ var r=[]; for(var j=0;j<ENTETES.length;j++) r.push(document.getElementById(idf(qid,'t'+i+'_'+j)).value.trim()); v.tableau.push(r); i++; }
    var c=document.getElementById(idf(qid,'complements')); if(c) v.complements=c.value.replace(/\s+$/,'');
    return {type:type, v:v};
  }
  function maj(qid){
    var x=valeurs(qid); if(!x) return;
    var ta=document.getElementById(qid); if(!ta) return;
    ta.value = serialiser(x.type, x.v);
    compter(qid, x.v.corps||'');
    if(typeof COMPO.surChangement==='function') COMPO.surChangement(qid, ta);
  }
  function compter(qid, txt){
    var e=document.getElementById(idf(qid,'compteur')); if(!e) return;
    if(e.dataset.sms){ var n=txt.length; e.textContent=n+' caractère'+(n>1?'s':'')+(n>160?' · '+Math.ceil(n/153)+' SMS':''); e.className='rd-compteur'+(n>320?' rd-trop':''); return; }
    var cb=e.dataset.cible?JSON.parse(e.dataset.cible):null;
    if(!cb){ var w=mesurer(txt,'mots'); e.textContent=w?w+' mot'+(w>1?'s':''):''; e.className='rd-compteur'; return; }
    var n2=mesurer(txt,cb.u), att=(cb.min?cb.min+' à ':'')+cb.max+' '+cb.u;
    e.textContent=n2+' '+cb.u.replace(/s$/,'')+(n2>1?'s':'')+' · attendu : '+(cb.min?att:'au plus '+att);
    e.className='rd-compteur'+(n2>cb.max?' rd-trop':(n2>=cb.min&&n2>0?' rd-ok':''));
  }

  // ── 7. Actions ───────────────────────────────────────────────────
  function brancher(racine){
    (racine||document).querySelectorAll('.rd').forEach(function(box){
      if(box.dataset.branche) return; box.dataset.branche='1';
      var qid=box.dataset.qid, ta=document.getElementById(qid);
      if(ta && !box.dataset.libre) ta.style.display='none';
      box.addEventListener('input', function(e){ if(e.target.classList.contains('zone-compo')) maj(qid); });
      box.addEventListener('change', function(e){ if(e.target.tagName==='SELECT') maj(qid); });
      var x=valeurs(qid); if(x) compter(qid, x.v.corps||'');
    });
  }
  function basculer(qid){
    var box=document.getElementById('rd_'+qid), ta=document.getElementById(qid); if(!box||!ta) return;
    var corps=box.querySelector('.rd-corps'), btn=box.querySelector('.rd-bascule');
    if(box.dataset.libre){                         // texte libre → mise en page
      var v=lire(box.dataset.type, ta.value);
      if(ta.value.trim() && !v){
        var c=document.getElementById(idf(qid,'corps'));
        if(c && !c.value.trim()) c.value=ta.value;  // le texte libre devient le corps du support
      }
      delete box.dataset.libre; corps.hidden=false; ta.style.display='none'; btn.textContent='Écrire en texte libre'; maj(qid);
    } else {                                       // mise en page → texte libre (le texte est gardé)
      box.dataset.libre='1'; corps.hidden=true; ta.style.display=''; btn.textContent='Utiliser la mise en page'; ta.focus();
    }
  }
  function ajouterLigne(qid){
    var f=document.getElementById(idf(qid,'lignes')); if(!f) return;
    var i=f.querySelectorAll('.rd-rub').length;
    f.insertAdjacentHTML('beforeend', ligneFiche(qid,i,['','']));
    document.getElementById(idf(qid,'l'+i+'a')).focus();
  }
  function ajouterLigneTableau(qid){
    var t=document.getElementById(idf(qid,'tableau')); if(!t) return;
    var i=t.tBodies[0].rows.length;
    t.tBodies[0].insertAdjacentHTML('beforeend', ligneTableau(qid,i,['','','','','','']));
  }

  // Longueur réellement saisie par l'élève (indices d'intégrité) : sans les libellés
  // de la mise en page ni le modèle à trous déjà écrit dans la consigne
  function longueurSaisie(txt, q){
    txt=String(txt||'');
    var L=txt.split('\n'), marques={};
    Object.keys(SUPPORTS).forEach(function(k){ marques[SUPPORTS[k].marque]=1; });
    if(!marques[L[0]]) return txt.length;
    var n=0;
    L.slice(1).forEach(function(l){
      if(l.indexOf('▸ ')===0) return;
      var j=l.indexOf(' : ');
      n += (j>0 && j<60) ? l.length-j-3 : l.length;
    });
    var mod=modeleDansConsigne(q);
    if(mod && txt.indexOf(mod.split('___')[0])>=0) n -= mod.replace(/_{2,}/g,'').length;
    return Math.max(0,n);
  }
  // Contexte lu dans la plateforme (univers et élève connectés)
  function contexte(){
    var cfg=(typeof LABORO_CONFIG!=='undefined'&&LABORO_CONFIG.entreprise)?LABORO_CONFIG.entreprise:{};
    var nc=cfg.nom_court||'';
    return {entreprise:cfg.nom||'', nomCourt:nc, crm:(typeof LABORO_CONFIG!=='undefined'&&LABORO_CONFIG.logiciel_client)||(nc==='LABORO'?'LABORO Connect':'SIC'),
      eleve:(typeof CU!=='undefined'&&CU&&CU.nom)?CU.nom:''};
  }
  // Chaque saisie met à jour la zone de réponse puis passe par l'enregistrement habituel
  function sauver(qid, ta){
    if(typeof CM!=='undefined' && CM && typeof autoSaveRep==='function') autoSaveRep(CM.id, qid, ta);
  }
  return {detecter:detecter, contexte:contexte, longueurSaisie:longueurSaisie, rendre:rendre, brancher:brancher, basculer:basculer, ajouterLigne:ajouterLigne,
    ajouterLigneTableau:ajouterLigneTableau, lire:lire, serialiser:serialiser, SUPPORTS:SUPPORTS, surChangement:sauver};
})();

// Styles des zones de rédaction (injectés une fois : aucun fichier CSS à modifier)
(function(){
  if(typeof document==='undefined' || document.getElementById('rd-styles')) return;
  var st=document.createElement('style'); st.id='rd-styles';
  st.textContent="/* ═══ LABORO — zones de rédaction en situation (compositeurs) ═══ */\n.rd{margin:10px 0 4px;border:1px solid #D5D9E0;border-radius:10px;background:#fff;overflow:hidden;font-size:13px;color:#1F2937}\n.rd-barre{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 12px;background:#F3F4F6;border-bottom:1px solid #E5E7EB}\n.rd-app{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#4B5563;display:flex;align-items:center;gap:6px}\n.rd-app::before{font-size:13px}\n.rd-bascule{border:0;background:none;color:var(--th-principal,#185FA5);font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;padding:2px 0}\n.rd-corps{padding:4px 0 10px}\n.rd-ligne{display:flex;align-items:center;gap:8px;padding:6px 14px;border-bottom:1px solid #EEF0F3}\n.rd-ligne>label{flex:0 0 92px;font-size:12px;color:#6B7280}\n.rd-ligne>span{color:#374151}\n.rd-ligne input,.rd-ligne select{flex:1;min-width:0;border:0;background:transparent;font:inherit;padding:4px 0;color:#111827}\n.rd-ligne select{border:1px solid #D1D5DB;border-radius:6px;padding:4px 6px;background:#fff;flex:0 1 auto}\n.rd-bloc{padding:8px 14px 0}\n.rd-bloc>label{display:block;font-size:11px;font-weight:600;color:#6B7280;margin-bottom:4px}\n.rd-bloc textarea,.rd-compl textarea{width:100%;box-sizing:border-box;border:1px solid #E5E7EB;border-radius:8px;padding:10px 12px;font:inherit;line-height:1.55;resize:vertical;background:#fff;color:#111827}\n.rd input:focus,.rd textarea:focus,.rd select:focus{outline:2px solid var(--th-principal,#185FA5);outline-offset:1px}\n.rd-ligne input:focus{outline:none;box-shadow:0 2px 0 var(--th-principal,#185FA5)}\n.rd-compteur{font-size:11px;color:#6B7280;text-align:right;margin-top:3px;min-height:14px}\n.rd-compteur.rd-ok{color:#15803D}.rd-compteur.rd-trop{color:#B91C1C;font-weight:600}\n.rd-compl{margin:10px 14px 0;font-size:12px}\n.rd-compl summary{cursor:pointer;color:#4B5563;padding:4px 0}\n.rd-compl textarea{margin-top:6px}\n.rd-ajout{margin:6px 14px 0;border:1px dashed #C7CDD6;background:#fff;border-radius:6px;padding:4px 10px;font-size:11px;color:#4B5563;cursor:pointer}\n/* E-mail */\n.rd-mail .rd-app::before{content:\"✉\"}\n.rd-mail .rd-bloc textarea{border:0;border-radius:0;padding:10px 4px;min-height:180px}\n.rd-mail .rd-bloc>label{display:none}\n/* SMS */\n.rd-sms{max-width:380px;border-radius:22px;border:8px solid #1F2937;background:#F3F4F6}\n.rd-sms .rd-barre{background:#fff}\n.rd-sms .rd-app::before{content:\"💬\"}\n.rd-sms .rd-corps{background:#F3F4F6}\n.rd-sms .rd-ligne{background:#fff;justify-content:center}\n.rd-sms .rd-ligne>label{flex:0 0 auto}\n.rd-sms .rd-ligne input{text-align:center;font-weight:600;flex:0 1 200px}\n.rd-sms .rd-bloc>label{display:none}\n.rd-sms .rd-bloc textarea{border:0;border-radius:18px 18px 4px 18px;background:var(--th-principal,#185FA5);color:#fff;margin-left:12%;width:88%}\n.rd-sms .rd-bloc textarea::placeholder{color:rgba(255,255,255,.75)}\n/* Publication */\n.rd-reseau .rd-app::before{content:\"📣\"}\n.rd-page{display:flex;align-items:center;gap:8px;padding:10px 14px}\n.rd-avatar{width:30px;height:30px;border-radius:50%;background:var(--th-principal,#185FA5);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700}\n.rd-reseau .rd-bloc:first-of-type textarea{background:#F3F4F6;border-style:dashed;text-align:center;min-height:70px}\n.rd-reseau input[id$=\"_hashtags\"]{color:var(--th-principal,#185FA5);font-weight:600}\n/* Réponse publique */\n.rd-avis .rd-app::before{content:\"⭐\"}\n.rd-avis .rd-bloc{margin-left:18px;border-left:3px solid #D1D5DB}\n/* Fiche client et bon de commande */\n.rd-crm .rd-barre,.rd-commande .rd-barre{background:#1F2937;border-color:#1F2937}\n.rd-crm .rd-app,.rd-commande .rd-app{color:#fff}\n.rd-crm .rd-bascule,.rd-commande .rd-bascule{color:#BFDBFE}\n.rd-crm .rd-app::before{content:\"🗂\"}\n.rd-commande .rd-app::before{content:\"🧾\"}\n.rd-fiche{display:grid;gap:6px;padding:10px 14px 0}\n.rd-rub{display:grid;grid-template-columns:minmax(110px,34%) 1fr;gap:6px}\n.rd-rub input{border:1px solid #E5E7EB;border-radius:6px;padding:6px 8px;font:inherit;min-width:0;color:#111827;background:#fff}\n.rd-rub .rd-lib{background:#F9FAFB;font-weight:600;font-size:12px;color:#374151}\n.rd-tab-wrap{overflow-x:auto;margin:10px 14px 0}\n.rd-tab{border-collapse:collapse;width:100%;min-width:560px;font-size:12px}\n.rd-tab th{background:#F3F4F6;text-align:left;padding:5px 6px;border:1px solid #E5E7EB;font-weight:600;color:#374151}\n.rd-tab td{border:1px solid #E5E7EB;padding:0}\n.rd-tab input{width:100%;box-sizing:border-box;border:0;padding:6px;font:inherit;background:transparent}\n/* Appel et face à face */\n.rd-telephone .rd-barre{background:#065F46;border-color:#065F46}\n.rd-telephone .rd-app,.rd-telephone .rd-bascule{color:#fff}\n.rd-telephone .rd-app::before{content:\"📞\"}\n.rd-oral .rd-app::before{content:\"🗣\"}\n.rd-oral .rd-bloc textarea{border-radius:14px 14px 14px 4px;background:#F9FAFB}\n/* Lettre */\n.rd-lettre .rd-app::before{content:\"📄\"}\n.rd-lettre .rd-corps{background:#FCFCFA;font-family:Georgia,\"Times New Roman\",serif;padding:10px 6% 16px}\n.rd-lettre .rd-bloc textarea,.rd-lettre input{font-family:inherit}\n/* Note interne */\n.rd-note .rd-app::before{content:\"📝\"}\n.rd-note .rd-corps::before{content:\"NOTE INTERNE\";display:block;text-align:center;font-weight:800;letter-spacing:.2em;font-size:12px;color:#374151;padding:8px 0 4px}\n/* Support visuel */\n.rd-visuel .rd-app::before{content:\"🖼\"}\n.rd-visuel input[id$=\"_titre\"]{font-size:20px;font-weight:800;text-align:center;color:var(--th-principal,#185FA5)}\n.rd-visuel input[id$=\"_mentions\"]{font-weight:700}\n@media (max-width:520px){.rd-ligne>label{flex-basis:70px}.rd-rub{grid-template-columns:1fr}.rd-sms{border-width:5px}}\n.rd [hidden]{display:none!important}\n";
  document.head.appendChild(st);
})();
