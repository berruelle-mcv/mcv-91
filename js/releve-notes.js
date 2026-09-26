// ================================================
//   LABORO — Relevé de notes par mission (report Pronote)
//   Chargé APRÈS classe-serveur.js dans index.html.
//   Ajouté le 25/09/2026 à la demande de Pascal.
//
//   Tableau élèves × missions de la classe filtrée dans la Vue classe :
//     • mode "Notes /20"      → pour reporter les notes dans Pronote
//     • mode "Niveaux"        → code couleur Pronote des compétences
//   + export CSV (tableau prêt pour Excel, ou liste détaillée).
//   Lit uniquement les données déjà chargées par renderClasse()
//   (ELEVES_SERVEUR, PROGRESSIONS_BRUTES) : aucune nouvelle route serveur.
// ================================================

// Seuils validés par Pascal le 25/09/2026 : <5 / 5–9,5 / 10–14,5 / ≥15
const NIVEAUX_MAITRISE = [
  { min: 15, code: 'TB', label: 'Très bonne maîtrise',  bg: '#1B7F3B', fg: '#fff' }, // vert foncé
  { min: 10, code: 'S',  label: 'Maîtrise satisfaisante', bg: '#9BE0A6', fg: '#0B3D18' }, // vert clair
  { min: 5,  code: 'F',  label: 'Maîtrise fragile',       bg: '#FFE066', fg: '#5C4700' }, // jaune
  { min: 0,  code: 'I',  label: 'Maîtrise insuffisante',  bg: '#E5484D', fg: '#fff' }  // rouge
];
function niveauPourNote(note){
  if(note == null || isNaN(note)) return null;
  return NIVEAUX_MAITRISE.find(function(n){ return note >= n.min; }) || NIVEAUX_MAITRISE[NIVEAUX_MAITRISE.length-1];
}

let RELEVE_MODE = 'notes';        // 'notes' | 'niveaux'
let RELEVE_VALIDEES_SEULES = false;

function noteProgression(p){
  const n = p.note_finale != null ? p.note_finale : p.note_ia;
  return n == null ? null : Number(n);
}

// Construit les données du relevé pour la classe actuellement filtrée
function donneesReleve(){
  const eleves = ELEVES_SERVEUR
    .filter(function(e){ return e.statut !== 'archive'; })
    .filter(function(e){ return !classeFiltre || (e.classe_libelle||'Sans classe') === classeFiltre; })
    .filter(function(e){ return (typeof filtrerParGroupe === 'function') ? filtrerParGroupe([e]).length > 0 : true; })
    .slice()
    .sort(function(a,b){
      return (a.classe_libelle||'').localeCompare(b.classe_libelle||'','fr')
        || (a.nom||'').localeCompare(b.nom||'','fr')
        || (a.prenom||'').localeCompare(b.prenom||'','fr');
    });

  const missionsVues = {};
  const cellules = {}; // eleveId -> missionId -> {note, valide}
  eleves.forEach(function(e){
    cellules[e.id] = {};
    (PROGRESSIONS_BRUTES[e.id] || []).forEach(function(p){
      if(!p || !p.mission_id) return;
      const note = noteProgression(p);
      if(note == null) return;                       // pas encore corrigée
      const valide = p.statut === 'valide';
      if(RELEVE_VALIDEES_SEULES && !valide) return;
      cellules[e.id][p.mission_id] = { note: note, valide: valide };
      missionsVues[p.mission_id] = true;
    });
  });

  const missions = Object.keys(missionsVues).map(function(id){
    const m = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(x){ return x.id === id; }) : null;
    return { id: id, titre: m ? m.titre : '(mission inconnue)', comp: m ? m.comp : '', palier: m ? m.palier : '' };
  }).sort(function(a,b){ return a.id.localeCompare(b.id,'fr',{numeric:true}); });

  return { eleves: eleves, missions: missions, cellules: cellules };
}

function nomEleve(e){ return ((e.nom||'').toUpperCase() + ' ' + (e.prenom||'')).trim() || e.email; }
function fmtNote(n){ return (Math.round(n*2)/2).toString().replace('.', ','); }

function openReleve(){
  const overlay = document.getElementById('rel-overlay');
  if(!overlay) return;
  if(!ELEVES_SERVEUR.length){ alert('Ouvre d\'abord la Vue classe pour charger la liste des élèves.'); return; }
  const t = document.getElementById('rel-titre'); if(t) t.textContent = 'Relevé de notes par mission';
  renderReleve();
  overlay.classList.add('open');
}
function closeReleve(){
  const overlay = document.getElementById('rel-overlay');
  if(overlay) overlay.classList.remove('open');
}
function changerModeReleve(mode){ RELEVE_MODE = mode; renderReleve(); }
function basculerValideesReleve(el){ RELEVE_VALIDEES_SEULES = !!el.checked; renderReleve(); }

function renderReleve(){
  const d = donneesReleve();
  const sous = document.getElementById('rel-sous');
  if(sous) sous.textContent = (classeFiltre || 'Toutes les classes') + (classeFiltre && typeof libelleGroupeFiltre === 'function' && libelleGroupeFiltre() ? ' (' + libelleGroupeFiltre() + ')' : '') + ' — ' + d.eleves.length + ' élève(s), ' + d.missions.length + ' mission(s) notée(s)';
  const body = document.getElementById('rel-body');
  if(!body) return;

  const btn = function(mode, label){
    const on = RELEVE_MODE === mode;
    return '<button onclick="changerModeReleve(\'' + mode + '\')" style="padding:7px 14px;border-radius:7px;cursor:pointer;font-size:12px;font-weight:700;'
      + (on ? 'background:#185FA5;color:#fff;border:1px solid #185FA5' : 'background:#fff;color:#185FA5;border:1px solid #B5D4F4') + '">' + label + '</button>';
  };
  let html = '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px">'
    + btn('notes', '🔢 Notes /20') + btn('niveaux', '🎨 Niveaux de maîtrise')
    + '<label style="font-size:12px;color:var(--gm);display:flex;align-items:center;gap:6px;margin-left:8px;cursor:pointer">'
    + '<input type="checkbox" ' + (RELEVE_VALIDEES_SEULES ? 'checked ' : '') + 'onchange="basculerValideesReleve(this)"> Notes validées uniquement</label>'
    + '<div style="flex:1"></div>'
    + '<button onclick="exporterReleve(\'tableau\')" style="padding:7px 12px;background:none;border:.5px solid var(--gb);border-radius:7px;cursor:pointer;font-size:12px;color:var(--gm);font-weight:600">📊 Export tableau (Excel)</button>'
    + '<button onclick="exporterReleve(\'liste\')" style="padding:7px 12px;background:none;border:.5px solid var(--gb);border-radius:7px;cursor:pointer;font-size:12px;color:var(--gm);font-weight:600">📋 Export liste détaillée</button>'
    + '</div>';

  if(!classeFiltre){
    html += '<div style="background:#FFF7E6;border:1px solid #F0C040;border-radius:8px;padding:8px 12px;font-size:12px;color:#7A4B00;margin-bottom:12px">'
      + 'Astuce : ferme ce relevé et choisis une classe dans « Filtrer » pour obtenir la liste dans le même ordre que Pronote.</div>';
  }

  // Légende
  if(RELEVE_MODE === 'niveaux'){
    html += '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;font-size:11px">'
      + NIVEAUX_MAITRISE.slice().reverse().map(function(n, i){
          const bornes = ['< 5', '5 à 9,5', '10 à 14,5', '≥ 15'][i];
          return '<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:16px;height:16px;border-radius:4px;background:' + n.bg + ';display:inline-block"></span>' + n.label + ' <span style="color:var(--gm)">(' + bornes + '/20)</span></span>';
        }).join('')
      + '</div>';
  }

  if(!d.missions.length){
    body.innerHTML = html + '<div style="padding:16px;color:var(--gm);font-size:13px">Aucune mission notée pour le moment dans cette sélection.</div>';
    return;
  }

  // Tableau élèves × missions (en-têtes = code mission, survol = titre complet)
  html += '<div style="overflow:auto;max-height:62vh;border:1px solid #E2E8F0;border-radius:8px">'
    + '<table style="border-collapse:collapse;font-size:12px;min-width:100%">'
    + '<thead><tr><th style="position:sticky;top:0;left:0;z-index:3;background:#F1F5F9;text-align:left;padding:8px 10px;border-bottom:1px solid #CBD5E0;min-width:170px">Élève</th>'
    + d.missions.map(function(m){
        return '<th title="' + (m.id + ' — ' + m.titre).replace(/"/g,'&quot;') + '" style="position:sticky;top:0;z-index:2;background:#F1F5F9;padding:6px 6px;border-bottom:1px solid #CBD5E0;border-left:1px solid #E2E8F0;min-width:62px;text-align:center;font-size:11px">'
          + '<div style="font-weight:800;color:#185FA5">' + m.id + '</div><div style="font-weight:600;color:var(--gm);font-size:9px">' + m.comp + ' · P' + m.palier + '</div></th>';
      }).join('')
    + '</tr></thead><tbody>'
    + d.eleves.map(function(e){
        return '<tr><td style="position:sticky;left:0;z-index:1;background:#fff;padding:6px 10px;border-bottom:1px solid #EDF2F7;font-weight:700;white-space:nowrap">' + nomEleve(e) + ((typeof badgeGroupe === 'function') ? badgeGroupe(e.groupe) : '')
          + (classeFiltre ? '' : '<div style="font-size:9px;font-weight:400;color:var(--gm)">' + (e.classe_libelle||'') + '</div>') + '</td>'
          + d.missions.map(function(m){
              const c = d.cellules[e.id][m.id];
              if(!c) return '<td style="border-bottom:1px solid #EDF2F7;border-left:1px solid #EDF2F7;text-align:center;color:#CBD5E0">—</td>';
              const attente = c.valide ? '' : ' ⏳';
              const titre = (c.valide ? 'Note validée' : 'Note IA pas encore validée') + ' — ' + fmtNote(c.note) + '/20';
              if(RELEVE_MODE === 'niveaux'){
                const n = niveauPourNote(c.note);
                return '<td title="' + titre + ' — ' + n.label + '" style="border-bottom:1px solid #fff;border-left:1px solid #fff;text-align:center;background:' + n.bg + ';color:' + n.fg + ';font-weight:800;font-size:11px' + (c.valide ? '' : ';opacity:.75') + '">' + n.code + attente + '</td>';
              }
              return '<td title="' + titre + '" style="border-bottom:1px solid #EDF2F7;border-left:1px solid #EDF2F7;text-align:center;font-weight:700' + (c.valide ? '' : ';color:#9AA5B1;font-style:italic') + '">' + fmtNote(c.note) + attente + '</td>';
            }).join('')
          + '</tr>';
      }).join('')
    + '</tbody></table></div>'
    + '<div style="font-size:11px;color:var(--gm);margin-top:8px">⏳ = note proposée par l\'IA, pas encore validée par toi. Survole une colonne pour voir le titre complet de la mission.</div>';

  // Correspondance code → titre (pour créer les devoirs dans Pronote)
  html += '<div style="margin-top:16px"><div style="font-size:12px;font-weight:800;color:var(--t1,#1A2E4A);margin-bottom:6px">Missions du relevé</div>'
    + '<table style="border-collapse:collapse;font-size:12px;width:100%">'
    + d.missions.map(function(m){
        return '<tr><td style="padding:4px 8px;border-bottom:1px solid #EDF2F7;font-weight:800;color:#185FA5;white-space:nowrap">' + m.id + '</td>'
          + '<td style="padding:4px 8px;border-bottom:1px solid #EDF2F7">' + m.titre + '</td>'
          + '<td style="padding:4px 8px;border-bottom:1px solid #EDF2F7;color:var(--gm);white-space:nowrap">' + m.comp + ' · Palier ' + m.palier + '</td></tr>';
      }).join('')
    + '</table></div>';

  body.innerHTML = html;
}

function exporterReleve(format){
  const d = donneesReleve();
  if(!d.missions.length){ alert('Aucune note à exporter.'); return; }
  const lignes = [];
  if(format === 'tableau'){
    lignes.push(['Nom','Prénom','Classe','Groupe'].concat(d.missions.map(function(m){ return m.id + ' — ' + m.titre; })));
    d.eleves.forEach(function(e){
      lignes.push([e.nom||'', e.prenom||'', e.classe_libelle||'', e.groupe||''].concat(d.missions.map(function(m){
        const c = d.cellules[e.id][m.id];
        if(!c) return '';
        return RELEVE_MODE === 'niveaux' ? niveauPourNote(c.note).label : fmtNote(c.note);
      })));
    });
  } else {
    lignes.push(['Nom','Prénom','Classe','Groupe','Code mission','Mission','Compétence','Palier','Note /20','Niveau de maîtrise','Statut']);
    d.eleves.forEach(function(e){
      d.missions.forEach(function(m){
        const c = d.cellules[e.id][m.id];
        if(!c) return;
        lignes.push([e.nom||'', e.prenom||'', e.classe_libelle||'', e.groupe||'', m.id, m.titre, m.comp, m.palier,
          fmtNote(c.note), niveauPourNote(c.note).label, c.valide ? 'Validée' : 'À valider']);
      });
    });
  }
  const csv = lignes.map(function(l){
    return l.map(function(v){
      const s = String(v==null ? '' : v);
      return /[",;\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
    }).join(';');
  }).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'laboro-releve-' + (format === 'tableau' ? (RELEVE_MODE === 'niveaux' ? 'niveaux' : 'notes') : 'detaille')
    + (classeFiltre ? '-' + classeFiltre.replace(/\s+/g,'_') : '') + ((classeFiltre && typeof groupeFiltre !== 'undefined' && groupeFiltre && groupeFiltre !== 'aucun') ? '-' + groupeFiltre : '') + '-' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// ================================================
//   "À examiner" (25/09/2026) — remplace "Valider notes IA ≥ 12/20"
//   Le serveur valide déjà automatiquement toute note ≥ seuil de la classe
//   (11 par défaut) : ce bouton ne trouvait donc jamais rien. Ce qui reste
//   réellement à regarder, ce sont les missions restées SOUS le seuil.
// ================================================
function openAExaminer(){
  const overlay = document.getElementById('rel-overlay');
  if(!overlay) return;
  if(!ELEVES_SERVEUR.length){ alert('Ouvre d\'abord la Vue classe pour charger la liste des élèves.'); return; }
  const t = document.getElementById('rel-titre'); if(t) t.textContent = 'Missions à examiner';
  const eleves = ELEVES_SERVEUR
    .filter(function(e){ return e.statut !== 'archive'; })
    .filter(function(e){ return !classeFiltre || (e.classe_libelle||'Sans classe') === classeFiltre; })
    .filter(function(e){ return (typeof filtrerParGroupe === 'function') ? filtrerParGroupe([e]).length > 0 : true; });
  const lignes = [];
  eleves.forEach(function(e){
    (PROGRESSIONS_BRUTES[e.id] || []).forEach(function(p){
      if(!p || p.statut !== 'a_examiner') return;
      const note = noteProgression(p);
      const m = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(x){ return x.id === p.mission_id; }) : null;
      lignes.push({ e: e, id: p.mission_id, titre: m ? m.titre : '', comp: m ? m.comp : '', note: note, date: p.submitted_at || '', tentatives: p.tentatives });
    });
  });
  lignes.sort(function(a,b){ return (a.note==null?99:a.note) - (b.note==null?99:b.note) || nomEleve(a.e).localeCompare(nomEleve(b.e),'fr'); });

  const sous = document.getElementById('rel-sous');
  if(sous) sous.textContent = (classeFiltre || 'Toutes les classes') + (classeFiltre && typeof libelleGroupeFiltre === 'function' && libelleGroupeFiltre() ? ' (' + libelleGroupeFiltre() + ')' : '') + ' — ' + lignes.length + ' mission(s) sous le seuil de validation';
  const body = document.getElementById('rel-body');
  if(!body) return;
  if(!lignes.length){
    body.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--gm)">✅ Rien à examiner : toutes les missions corrigées ont atteint le seuil de validation.</div>';
    overlay.classList.add('open');
    return;
  }
  body.innerHTML =
    '<div style="font-size:12px;color:var(--gm);line-height:1.5;margin-bottom:12px">Ces missions ont eu une note sous le seuil de validation de la classe (10/20 pour tes classes actuellement) : elles ne comptent pas encore dans le score de l\'élève. '
    + 'L\'élève peut les corriger une fois ; s\'il a déjà utilisé ses 2 tentatives, c\'est à toi de voir avec lui. Les plus faibles notes sont en haut.</div>'
    + '<table style="border-collapse:collapse;font-size:12px;width:100%">'
    + '<thead><tr style="background:#F1F5F9;text-align:left"><th style="padding:8px">Élève</th><th style="padding:8px">Mission</th><th style="padding:8px;text-align:center">Note IA</th><th style="padding:8px">Dernière soumission</th></tr></thead><tbody>'
    + lignes.map(function(l){
        const n = niveauPourNote(l.note);
        const d = l.date ? new Date(l.date) : null;
        return '<tr><td style="padding:6px 8px;border-bottom:1px solid #EDF2F7;font-weight:700">' + nomEleve(l.e) + ((typeof badgeGroupe === 'function') ? badgeGroupe(l.e.groupe) : '')
          + (classeFiltre ? '' : '<div style="font-size:9px;font-weight:400;color:var(--gm)">' + (l.e.classe_libelle||'') + '</div>') + '</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7"><strong style="color:#185FA5">' + l.id + '</strong> — ' + l.titre + ' <span style="color:var(--gm)">(' + l.comp + ')</span>'
          + (l.tentatives != null ? (l.tentatives >= 2 ? ' <span style="font-size:10px;font-weight:700;color:#B91C1C;background:#FEF2F2;padding:1px 6px;border-radius:8px">⛔ 2/2 tentatives</span>' : ' <span style="font-size:10px;color:#92400E;background:#FFFBEA;padding:1px 6px;border-radius:8px">peut encore corriger</span>') : '')
          + '</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7;text-align:center">'
          + (l.note==null ? '—' : '<span style="display:inline-block;min-width:40px;padding:2px 6px;border-radius:5px;font-weight:800;background:' + n.bg + ';color:' + n.fg + '">' + fmtNote(l.note) + '</span>') + '</td>'
          + '<td style="padding:6px 8px;border-bottom:1px solid #EDF2F7;color:var(--gm)">' + (d && !isNaN(d) ? d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) : '—') + '</td></tr>';
      }).join('')
    + '</tbody></table>';
  overlay.classList.add('open');
}
