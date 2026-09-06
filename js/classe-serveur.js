// ================================================
//   LABORO — Vue classe (lecture serveur) + actions élève
//   Chargé APRÈS teacher.js dans index.html.
// ================================================

let ELEVES_SERVEUR = [];

async function renderClasse(){
  const token = localStorage.getItem('laboro_token');
  const tb = document.getElementById('cl-tbody');

  if(!token){
    if(tb) tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--gm);font-size:12px">'
      + 'Connecte-toi via le serveur (adresse mail + mot de passe) pour afficher la liste des élèves.'
      + '</td></tr>';
    if(typeof renderMDJListe === 'function') renderMDJListe();
    return;
  }

  try{
    const rep = await fetch(LABORO_API + '/api/eleves', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await rep.json();
    if(!data.ok){
      if(tb) tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--rg);font-size:12px">'
        + 'Erreur : ' + (data.erreur || 'chargement impossible') + '</td></tr>';
      return;
    }
    ELEVES_SERVEUR = data.eleves || [];
  }catch(e){
    if(tb) tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--rg);font-size:12px">'
      + 'Impossible de joindre le serveur LABORO.</td></tr>';
    console.error('renderClasse (serveur) :', e);
    return;
  }

  afficherClasse();
}

function afficherClasse(){
  const eleves = ELEVES_SERVEUR;

  const classes = [...new Set(eleves.map(e => e.classe || 'Sans classe'))].sort();
  const tabsEl = document.getElementById('classe-tabs');
  if(tabsEl){
    tabsEl.innerHTML =
      '<div style="font-size:11px;font-weight:700;color:var(--gm);margin-right:4px">Filtrer :</div>'
      + '<div class="cls-tab' + (classeFiltre===''?' on':'') + '" onclick="filtrerClasse(\'\')">Toutes '
      + '<span class="cls-count">' + eleves.length + '</span></div>'
      + classes.map(function(cls){
          const n = eleves.filter(e => (e.classe||'Sans classe')===cls).length;
          const clsColor = cls.indexOf('2nde')>=0 ? '#2E7D5E' : cls.indexOf('Term')>=0 ? '#7B2D42' : '#185FA5';
          const activeStyle = classeFiltre===cls ? ('background:'+clsColor+';color:#fff;border-color:'+clsColor) : ('border-color:'+clsColor+';color:'+clsColor);
          return '<div class="cls-tab' + (classeFiltre===cls?' on':'') + '" onclick="filtrerClasse(\'' + cls + '\')" style="' + activeStyle + '">'
            + cls + ' <span style="font-size:9px;background:#E6F1FB;color:#185FA5;padding:1px 5px;border-radius:8px">' + n + '</span></div>';
        }).join('');
  }

  const liste = classeFiltre ? eleves.filter(e => (e.classe||'Sans classe')===classeFiltre) : eleves;

  const statsEl = document.getElementById('classe-stats');
  if(statsEl){
    statsEl.innerHTML =
      '<div style="background:var(--bc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--bl)">' + liste.length + '</div><div class="u-label-up">Élèves</div></div>'
      + '<div style="background:var(--vc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--vt)">' + classes.length + '</div><div class="u-label-up">Classe(s)</div></div>'
      + '<div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">—</div><div class="u-label-up">Missions validées</div></div>'
      + '<div style="background:var(--gc);border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gr)">—</div><div class="u-label-up">Moyenne classe</div></div>';
  }

  const titreEl = document.getElementById('cl-titre');
  if(titreEl) titreEl.textContent = classeFiltre
    ? ('Classe : ' + classeFiltre + ' — ' + liste.length + ' élève(s)')
    : ('Tous les élèves — ' + liste.length);

  const tb = document.getElementById('cl-tbody');
  if(!tb){ if(typeof renderMDJListe === 'function') renderMDJListe(); return; }

  if(!liste.length){
    tb.innerHTML = '<tr><td colspan="10" style="padding:16px;color:var(--gm);font-size:12px">'
      + (classeFiltre ? 'Aucun élève dans cette classe.' : 'Aucun élève pour le moment. Ajoute des élèves avec le formulaire ci-dessus.')
      + '</td></tr>';
    if(typeof renderMDJListe === 'function') renderMDJListe();
    return;
  }

  tb.innerHTML = liste.map(function(e){
    const nomAff = ((e.prenom ? e.prenom + ' ' : '') + (e.nom || '')).trim() || e.email;
    const cls = e.classe || '—';
    const btnReset = '<button onclick="resetMdpEleve(\'' + e.id + '\',\'' + (nomAff.replace(/'/g,"")) + '\')" '
      + 'title="Réinitialiser le mot de passe" '
      + 'style="background:none;border:.5px solid var(--gb);border-radius:6px;padding:3px 8px;cursor:pointer;font-size:12px">🔑</button>';
    return '<tr>'
      + '<td style="font-weight:700">' + nomAff + '</td>'
      + '<td class="u-label-sm">' + cls + '</td>'
      + '<td colspan="5" style="font-size:11px;color:var(--gm)">' + e.email + '</td>'
      + '<td style="font-size:10px;color:var(--vt);font-weight:700">' + (e.statut || 'actif') + '</td>'
      + '<td style="text-align:center">' + btnReset + '</td>'
      + '</tr>';
  }).join('');

  if(typeof renderMDJListe === 'function') renderMDJListe();
}

function filtrerClasse(cls){
  classeFiltre = cls || '';
  afficherClasse();
}

async function resetMdpEleve(eleveId, nomAff){
  if(!confirm('Réinitialiser le mot de passe de ' + nomAff + ' ?\n\nSon mot de passe redeviendra "Laboro2025" et il devra en choisir un nouveau à sa prochaine connexion.')) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  try{
    const rep = await fetch(LABORO_API + '/api/eleves/reset-mdp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ eleve_id: eleveId })
    });
    const d = await rep.json();
    if(!d.ok){ alert('Échec : ' + (d.erreur || 'erreur inconnue')); return; }
    alert('✅ Mot de passe réinitialisé pour ' + d.prenom + ' ' + d.nom + '.\n\nNouveau mot de passe : ' + d.motDePasse + '\n(il devra le changer à sa prochaine connexion)');
  }catch(e){
    alert('Impossible de joindre le serveur LABORO.');
    console.error('resetMdpEleve :', e);
  }
}
