// ================================================
//   LABORO — Gestion des classes (administrateur uniquement)
//   Créer une classe + attribuer/retirer des enseignants
// ================================================

async function renderClassesAdmin(){
  if(typeof populerParcoursSelect === 'function') await populerParcoursSelect();
  await afficherListeClasses();
}

async function populerParcoursSelect(){
  const sel = document.getElementById('ca-parcours');
  if(!sel) return;
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const r = await fetchJSON(LABORO_API + '/api/parcours-liste', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){ sel.innerHTML = '<option value="">— Erreur de chargement —</option>'; return; }
  const parcours = r.data.parcours || [];
  sel.innerHTML = '<option value="">— Parcours —</option>'
    + parcours.map(function(p){
        return '<option value="' + p.id + '">' + (p.libelle || (p.niveau + ' ' + p.option)) + '</option>';
      }).join('');
}

async function creerClasse(){
  const msgEl = document.getElementById('ca-msg');
  const showMsg = function(txt, couleur){ if(msgEl){ msgEl.textContent = txt; msgEl.style.color = couleur; } };

  const parcours_id = document.getElementById('ca-parcours').value;
  const libelle = document.getElementById('ca-libelle').value.trim();
  const annee_scolaire = document.getElementById('ca-annee').value.trim();

  if(!parcours_id || !libelle){
    showMsg('Choisis un parcours et donne un libellé à la classe.', '#C53030');
    return;
  }
  const token = localStorage.getItem('laboro_token');
  if(!token){ showMsg('Session expirée — reconnecte-toi.', '#C53030'); return; }

  showMsg('Création en cours…', '#6B7280');
  const r = await fetchJSON(LABORO_API + '/api/classes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ parcours_id, libelle, annee_scolaire })
  });
  if(!r.ok){ showMsg('⚠️ ' + r.erreur, '#C53030'); return; }
  const d = r.data;
  if(!d.ok){ showMsg('⚠️ ' + (d.erreur || 'Création impossible.'), '#C53030'); return; }

  showMsg('✅ Classe "' + d.libelle + '" créée.', '#2E7D5E');
  document.getElementById('ca-libelle').value = '';
  afficherListeClasses();
  if(typeof populateClasseSelects === 'function') populateClasseSelects();
}

async function afficherListeClasses(){
  const el = document.getElementById('ca-liste');
  if(!el) return;
  const token = localStorage.getItem('laboro_token');
  if(!token){ el.textContent = 'Session expirée.'; return; }

  const [rClasses, rEns] = await Promise.all([
    fetchJSON(LABORO_API + '/api/classes', { headers: { 'Authorization': 'Bearer ' + token } }),
    fetchJSON(LABORO_API + '/api/enseignants', { headers: { 'Authorization': 'Bearer ' + token } })
  ]);

  if(!rClasses.ok || !rClasses.data.ok){ el.textContent = 'Impossible de charger les classes.'; return; }
  const classes = rClasses.data.classes || [];
  const enseignants = (rEns.ok && rEns.data.ok) ? (rEns.data.enseignants || []) : [];

  if(!classes.length){
    el.innerHTML = '<div style="padding:12px;color:var(--gm);font-size:12px">Aucune classe pour le moment.</div>';
    return;
  }

  el.innerHTML = classes.map(function(c){
    const enseignantsActuels = c.enseignants || [];
    const optionsEns = enseignants
      .filter(function(en){ return !enseignantsActuels.some(function(a){ return a.id === en.id; }); })
      .map(function(en){ return '<option value="' + en.id + '">' + en.prenom + ' ' + en.nom + (en.est_admin ? ' (admin)' : '') + '</option>'; })
      .join('');
    const badgesEns = enseignantsActuels.length
      ? enseignantsActuels.map(function(a){
          const nomEns = (a.prenom + ' ' + a.nom).replace(/'/g, '');
          return '<span style="display:inline-flex;align-items:center;gap:4px;background:var(--bc);color:var(--bl);border-radius:12px;padding:3px 8px;font-size:11px;font-weight:700;margin-right:4px;margin-bottom:4px">'
            + a.prenom + ' ' + a.nom
            + '<span style="cursor:pointer" onclick="retirerAttribution(\'' + c.id + '\',\'' + a.id + '\',\'' + nomEns + '\')" title="Retirer l\'attribution">✕</span></span>';
        }).join('')
      : '<span style="font-size:11px;color:var(--gm)">Aucun enseignant attribué pour l\'instant (visible uniquement par toi, l\'administrateur)</span>';

    return '<div style="padding:12px 0;border-bottom:1px solid var(--gb)">'
      + '<div style="font-weight:700;font-size:13px;margin-bottom:2px">' + (c.libelle || c.id) + '</div>'
      + '<div style="font-size:11px;color:var(--gm);margin-bottom:8px">' + (c.parcours_libelle || (c.niveau + ' ' + c.option)) + ' · ' + (c.annee_scolaire || '') + '</div>'
      + '<div style="margin-bottom:8px">' + badgesEns + '</div>'
      + (optionsEns
          ? '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">'
            + '<select id="ca-assign-' + c.id + '" style="padding:5px 8px;border:.5px solid var(--gb);border-radius:6px;font-size:12px"><option value="">— Attribuer à —</option>' + optionsEns + '</select>'
            + '<button onclick="attribuerClasse(\'' + c.id + '\')" style="padding:5px 10px;background:var(--bl);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:11px;font-weight:700">Attribuer</button>'
            + '</div>'
          : '<div style="font-size:11px;color:var(--gm)">Tous les enseignants sont déjà attribués à cette classe.</div>')
      + '</div>';
  }).join('');
}

async function attribuerClasse(classeId){
  const sel = document.getElementById('ca-assign-' + classeId);
  const enseignant_id = sel ? sel.value : '';
  if(!enseignant_id){ alert('Choisis un enseignant dans la liste.'); return; }
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const r = await fetchJSON(LABORO_API + '/api/classes/' + classeId + '/enseignants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ enseignant_id })
  });
  if(!r.ok || !r.data.ok){ alert('Échec : ' + (r.erreur || (r.data && r.data.erreur) || 'erreur inconnue')); return; }
  afficherListeClasses();
}

async function retirerAttribution(classeId, enseignantId, nomEns){
  if(!confirm('Retirer l\'attribution de cette classe à ' + nomEns + ' ?\n\nIl/elle ne verra plus les élèves de cette classe.')) return;
  const token = localStorage.getItem('laboro_token');
  if(!token) return;
  const r = await fetchJSON(LABORO_API + '/api/classes/' + classeId + '/enseignants/' + enseignantId, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if(!r.ok || !r.data.ok){ alert('Échec : ' + (r.erreur || (r.data && r.data.erreur) || 'erreur inconnue')); return; }
  afficherListeClasses();
}
