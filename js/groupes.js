// ================================================
//   LABORO — Demi-groupes G1 / G2 (26/09/2026)
//   Chargé APRÈS classe-serveur.js et releve-notes.js.
//
//   • Filtre par groupe dans la Vue classe (quand une classe est choisie)
//     — le même filtre s'applique au Relevé Pronote, à « À examiner » et
//     à l'export CSV.
//   • Écran de répartition en lot (POST /api/eleves-groupes).
//   Le groupe est porté par l'inscription actuelle de l'élève dans sa classe
//   (e.groupe renvoyé par /api/eleves : 'G1', 'G2' ou null = pas réparti).
// ================================================

let groupeFiltre = ''; // '' = tous, 'G1', 'G2', 'aucun'

const COULEURS_GROUPES = { G1: { bg: '#E0E7FF', fg: '#3730A3' }, G2: { bg: '#FCE7F3', fg: '#9D174D' } };

function badgeGroupe(g){
  if(!g) return '';
  const c = COULEURS_GROUPES[g] || { bg: '#E5E7EB', fg: '#374151' };
  return ' <span style="display:inline-block;font-size:9px;font-weight:800;padding:1px 6px;border-radius:8px;background:' + c.bg + ';color:' + c.fg + '">' + g + '</span>';
}

function filtrerParGroupe(liste){
  if(!groupeFiltre) return liste;
  return liste.filter(function(e){ return groupeFiltre === 'aucun' ? !e.groupe : e.groupe === groupeFiltre; });
}

function libelleGroupeFiltre(){
  return groupeFiltre === 'aucun' ? 'élèves sans groupe' : (groupeFiltre ? 'groupe ' + groupeFiltre : '');
}

// Onglets Tous / G1 / G2 / Sans groupe — affichés seulement quand une classe est choisie
function renderGroupeTabs(listeClasse){
  const el = document.getElementById('groupe-tabs');
  if(!el) return;
  if(!classeFiltre){ el.style.display = 'none'; el.innerHTML = ''; groupeFiltre = ''; return; }
  const n = { G1: 0, G2: 0, aucun: 0 };
  listeClasse.forEach(function(e){ if(e.groupe === 'G1') n.G1++; else if(e.groupe === 'G2') n.G2++; else n.aucun++; });
  const onglet = function(val, label, nb, coul){
    const on = groupeFiltre === val;
    return '<div class="cls-tab' + (on ? ' on' : '') + '" onclick="filtrerGroupe(\'' + val + '\')" style="' + (on ? 'background:' + coul + ';color:#fff;border-color:' + coul : 'border-color:' + coul + ';color:' + coul) + '">'
      + label + ' <span style="font-size:9px;opacity:.85">' + nb + '</span></div>';
  };
  el.style.display = 'flex';
  el.innerHTML = '<div style="font-size:11px;font-weight:700;color:var(--gm);margin-right:4px">Groupe :</div>'
    + onglet('', 'Tous', listeClasse.length, '#4A5568')
    + onglet('G1', 'G1', n.G1, COULEURS_GROUPES.G1.fg)
    + onglet('G2', 'G2', n.G2, COULEURS_GROUPES.G2.fg)
    + (n.aucun ? onglet('aucun', '⚠ Sans groupe', n.aucun, '#C2410C') : '');
}

function filtrerGroupe(g){
  groupeFiltre = g || '';
  afficherClasse();
}

// ---------- Écran de répartition ----------
let REPARTITION_BROUILLON = {};

function openRepartition(){
  if(!classeFiltre){
    alert('Choisis d\'abord une classe dans « Filtrer », puis clique sur « Répartir en groupes ».');
    return;
  }
  const eleves = ELEVES_SERVEUR
    .filter(function(e){ return e.statut !== 'archive' && (e.classe_libelle || 'Sans classe') === classeFiltre; })
    .sort(function(a,b){ return (a.nom||'').localeCompare(b.nom||'','fr') || (a.prenom||'').localeCompare(b.prenom||'','fr'); });
  REPARTITION_BROUILLON = {};
  eleves.forEach(function(e){ REPARTITION_BROUILLON[e.id] = e.groupe || ''; });
  renderRepartition();
  document.getElementById('grp-overlay').classList.add('open');
}
function closeRepartition(){ document.getElementById('grp-overlay').classList.remove('open'); }

function choisirGroupeBrouillon(id, g){ REPARTITION_BROUILLON[id] = g; renderRepartition(); }
function toutMettreDans(g){ Object.keys(REPARTITION_BROUILLON).forEach(function(id){ REPARTITION_BROUILLON[id] = g; }); renderRepartition(); }
function partagerEnDeux(){
  // Moitié alphabétique : la 1re moitié en G1, la 2de en G2 (point de départ, à ajuster)
  const ids = Object.keys(REPARTITION_BROUILLON);
  const moitie = Math.ceil(ids.length / 2);
  ids.forEach(function(id, i){ REPARTITION_BROUILLON[id] = i < moitie ? 'G1' : 'G2'; });
  renderRepartition();
}

function renderRepartition(){
  const ids = Object.keys(REPARTITION_BROUILLON);
  const eleves = ids.map(function(id){ return ELEVES_SERVEUR.find(function(e){ return e.id === id; }); }).filter(Boolean);
  const n = { G1: 0, G2: 0, '': 0 };
  ids.forEach(function(id){ n[REPARTITION_BROUILLON[id] || '']++; });
  document.getElementById('grp-sous').textContent = classeFiltre + ' — ' + eleves.length + ' élève(s) · G1 : ' + n.G1 + ' · G2 : ' + n.G2 + (n[''] ? ' · sans groupe : ' + n[''] : '');

  const choix = function(id, val, label, coul){
    const on = (REPARTITION_BROUILLON[id] || '') === val;
    return '<button onclick="choisirGroupeBrouillon(\'' + id + '\',\'' + val + '\')" style="min-width:58px;padding:5px 10px;border-radius:7px;cursor:pointer;font-size:12px;font-weight:800;'
      + (on ? 'background:' + coul + ';color:#fff;border:1.5px solid ' + coul : 'background:#fff;color:' + coul + ';border:1.5px solid #E2E8F0') + '">' + label + '</button>';
  };
  const btnOutil = function(action, label){
    return '<button onclick="' + action + '" style="padding:6px 12px;background:none;border:.5px solid var(--gb);border-radius:7px;cursor:pointer;font-size:12px;color:var(--gm);font-weight:600">' + label + '</button>';
  };

  document.getElementById('grp-body').innerHTML =
    '<div style="font-size:12px;color:var(--gm);line-height:1.5;margin-bottom:10px">Clique sur G1 ou G2 pour chaque élève, puis enregistre. Un élève sans groupe continue de recevoir les missions données à toute la classe, mais pas celles données à un demi-groupe.</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">'
    + btnOutil('partagerEnDeux()', '✂️ Couper la liste en deux (ordre alphabétique)')
    + btnOutil("toutMettreDans('')", 'Tout remettre « sans groupe »')
    + '</div>'
    + '<div style="border:1px solid #E2E8F0;border-radius:8px;overflow:hidden">'
    + eleves.map(function(e, i){
        return '<div style="display:flex;align-items:center;gap:8px;padding:7px 12px;' + (i ? 'border-top:1px solid #EDF2F7;' : '') + '">'
          + '<div style="flex:1;font-size:13px;font-weight:700">' + (e.nom||'').toUpperCase() + ' <span style="font-weight:400">' + (e.prenom||'') + '</span></div>'
          + choix(e.id, 'G1', 'G1', COULEURS_GROUPES.G1.fg)
          + choix(e.id, 'G2', 'G2', COULEURS_GROUPES.G2.fg)
          + choix(e.id, '', '—', '#9CA3AF')
          + '</div>';
      }).join('')
    + '</div>'
    + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;align-items:center">'
    + '<span id="grp-msg" style="font-size:12px;color:var(--gm);flex:1"></span>'
    + '<button onclick="closeRepartition()" style="padding:8px 16px;background:none;border:.5px solid var(--gb);border-radius:7px;cursor:pointer;font-size:12px">Annuler</button>'
    + '<button onclick="enregistrerRepartition()" style="padding:8px 18px;background:#6B4EA8;color:#fff;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:800">Enregistrer la répartition</button>'
    + '</div>';
}

async function enregistrerRepartition(){
  const token = localStorage.getItem('laboro_token');
  if(!token){ alert('Session expirée — reconnecte-toi en tant qu\'enseignant.'); return; }
  // On n'envoie que les élèves dont le groupe a changé
  const affectations = Object.keys(REPARTITION_BROUILLON).filter(function(id){
    const e = ELEVES_SERVEUR.find(function(x){ return x.id === id; });
    return e && (e.groupe || '') !== (REPARTITION_BROUILLON[id] || '');
  }).map(function(id){ return { eleve_id: id, groupe: REPARTITION_BROUILLON[id] || null }; });
  const msg = document.getElementById('grp-msg');
  if(!affectations.length){ closeRepartition(); return; }
  if(msg) msg.textContent = 'Enregistrement…';
  const r = await fetchJSON(LABORO_API + '/api/eleves-groupes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ affectations: affectations })
  });
  if(!r.ok || !r.data.ok){
    if(msg){ msg.style.color = 'var(--rg)'; msg.textContent = (r.data && r.data.erreur) || r.erreur || 'Enregistrement impossible.'; }
    return;
  }
  affectations.forEach(function(a){
    const e = ELEVES_SERVEUR.find(function(x){ return x.id === a.eleve_id; });
    if(e) e.groupe = a.groupe;
  });
  if(typeof DASH_ENS_CHARGE_A !== 'undefined') DASH_ENS_CHARGE_A = 0; // le tableau de bord se rechargera
  closeRepartition();
  afficherClasse();
}
