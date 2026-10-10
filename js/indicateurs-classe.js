// ═══════════════════════════════════════════════════════════════════════
//   LABORO — Moteur commun : Indicateurs de la classe (07/10/2026)
//
//   Demande de Pascal : côté prof, remplacer les « Indicateurs » de l'entreprise
//   (chiffres fixes, purement décoratifs) par de vrais indicateurs de la classe.
//   Reprend l'ancienne « Analyse de classe » (fenêtre ouverte depuis la Vue
//   classe) et ajoute : élèves actifs sur 7 jours, missions validées du premier
//   coup, compétences et missions les moins réussies (à retravailler).
//
//   Aucune nouvelle route serveur : /api/eleves + /api/eleves/:id/progressions.
//   Chargé APRÈS classe-serveur.js.
// ═══════════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  function jeton(){ return localStorage.getItem('laboro_token'); }
  function dateServeur(v){
    if(!v) return null;
    let t = String(v); if(t.indexOf('T') < 0) t = t.replace(' ', 'T') + 'Z';
    const d = new Date(t); return isNaN(d) ? null : d;
  }
  function nomE(e){ return ((e.nom || '').toUpperCase() + ' ' + (e.prenom || '')).trim() || e.email || 'Élève'; }
  function noteDe(p){ const n = p.note_finale != null ? p.note_finale : p.note_ia; return n == null ? null : Number(n); }
  function fmt(n, dec){ return n == null || isNaN(n) ? '—' : String(dec ? (Math.round(n * 10) / 10) : Math.round(n)).replace('.', ','); }
  function estRendue(p){ return !!p && p.statut !== 'brouillon' && (p.statut === 'valide' || p.statut === 'a_examiner' || p.statut === 'soumis' || p.statut === 'corrige' || !!p.submitted_at); }
  function encadre(txt, col){ return '<div style="padding:14px 16px;background:var(--gc,#F3F4F6);border-radius:8px;font-size:12.5px;color:' + (col || 'var(--gm,#6B7280)') + ';text-align:center">' + txt + '</div>'; }

  let ETAT = { charge: false, enCours: false, erreur: '', eleves: [] };
  let CHOIX = { classe: '', groupe: '' };

  async function charger(){
    const el = document.getElementById('ic-contenu'); if(!el) return;
    if(!jeton()){ el.innerHTML = encadre('Connecte-toi avec ton compte enseignant pour voir les indicateurs de la classe.'); return; }
    if(ETAT.enCours) return;
    ETAT.enCours = true;
    el.innerHTML = encadre('⏳ Calcul des indicateurs de la classe…');
    try {
      const r = await fetchJSON(LABORO_API + '/api/eleves', { headers: { 'Authorization': 'Bearer ' + jeton() } });
      if(!r.ok || !r.data.ok){ ETAT.erreur = (r.data && r.data.erreur) || r.erreur || 'Impossible de charger les élèves.'; return; }
      ELEVES_SERVEUR = r.data.eleves || [];
      ETAT.eleves = sansComptesTest(ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; }));
      await chargerProgressionsClasse(ETAT.eleves);
      ETAT.erreur = ''; ETAT.charge = true;
      const cl = classes();
      if(!CHOIX.classe || cl.indexOf(CHOIX.classe) < 0) CHOIX.classe = cl[0] || '';
    } finally {
      ETAT.enCours = false;
      dessiner();
    }
  }
  function classeDe(e){ return e.classe_libelle || 'Sans classe'; }
  function classes(){
    const s = []; ETAT.eleves.forEach(function(e){ const c = classeDe(e); if(s.indexOf(c) < 0) s.push(c); });
    return s.sort(function(a, b){ return a.localeCompare(b, 'fr'); });
  }

  function calculer(eleves){
    const ilYa7j = Date.now() - 7 * 24 * 3600 * 1000;
    const parComp = {}, parMission = {};
    let rendues = 0, validees = 0, sommeNotesVal = 0, nbNotesVal = 0, premierCoup = 0, actifs7j = 0;
    // Gain entre 1re et 2e tentative : notes de chaque tentative corrigée (serveur ≥ 2026-10-07, enregistrées depuis le 29/09)
    let historiqueFourni = false, nbRetravail = 0, sommeGain = 0, nbAmeliorees = 0;
    const st = eleves.map(function(e){
      const ps = PROGRESSIONS_BRUTES[e.id] || [];
      const ud = PROGRESSIONS_CLASSE[e.id] || { missions: {} };
      let nbRendues = 0, nbVal = 0, recent = false;
      ps.forEach(function(p){
        if(p && Array.isArray(p.historique)){
          historiqueFourni = true;
          const h = p.historique.filter(function(x){ return x && x.note != null; });
          if(h.length >= 2){ const g = Number(h[1].note) - Number(h[0].note); nbRetravail++; sommeGain += g; if(g > 0) nbAmeliorees++; }
        }
        if(!estRendue(p)) return;
        nbRendues++; rendues++;
        const d = dateServeur(p.submitted_at); if(d && d.getTime() >= ilYa7j) recent = true;
        const n = noteDe(p), ok = p.statut === 'valide';
        if(ok){ nbVal++; validees++; if(n != null){ sommeNotesVal += n; nbNotesVal++; } if((p.tentatives || 1) <= 1) premierCoup++; }
        const m = (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(x){ return x.id === p.mission_id; }) : null;
        const code = m ? m.comp : '?';
        const c = parComp[code] = parComp[code] || { code: code, copies: 0, val: 0, somme: 0, nb: 0, eleves: {} };
        c.copies++; if(ok) c.val++; if(n != null){ c.somme += n; c.nb++; } c.eleves[e.id] = true;
        const mm = parMission[p.mission_id] = parMission[p.mission_id] || { id: p.mission_id, titre: m ? m.titre : '', comp: code, copies: 0, val: 0, somme: 0, nb: 0 };
        mm.copies++; if(ok) mm.val++; if(n != null){ mm.somme += n; mm.nb++; }
      });
      if(recent) actifs7j++;
      return {
        e: e, rendues: nbRendues, validees: nbVal,
        score: (typeof calcScore === 'function') ? calcScore(ud) : 0,
        c1: calcNiveauComp('C1', ud), c2: calcNiveauComp('C2', ud), c3: calcNiveauComp('C3', ud),
        g4: niveauG4PourEleve(ud, e.classe_libelle)
      };
    });
    return { st: st, rendues: rendues, validees: validees, moyenne: nbNotesVal ? sommeNotesVal / nbNotesVal : null,
             premierCoup: validees ? premierCoup / validees : null, actifs7j: actifs7j,
             gain: { fourni: historiqueFourni, nb: nbRetravail, moyen: nbRetravail ? sommeGain / nbRetravail : null, ameliorees: nbRetravail ? nbAmeliorees / nbRetravail : null },
             comps: Object.keys(parComp).map(function(k){ return parComp[k]; }),
             missions: Object.keys(parMission).map(function(k){ return parMission[k]; }) };
  }

  function libelleComp(code){
    const c = (typeof COMP !== 'undefined') ? COMP.find(function(x){ return x.code === code; }) : null;
    return c ? c.label : '';
  }
  function couleurTaux(t){ return t >= 0.75 ? '#166534' : (t >= 0.5 ? '#92400E' : '#B91C1C'); }
  function fondTaux(t){ return t >= 0.75 ? '#DCFCE7' : (t >= 0.5 ? '#FEF3C7' : '#FEE2E2'); }

  function dessiner(){
    const el = document.getElementById('ic-contenu'); if(!el) return;
    if(ETAT.erreur){ el.innerHTML = encadre(esc(ETAT.erreur) + '<br><button onclick="icActualiser()" style="margin-top:8px;padding:6px 12px;border:.5px solid var(--gb);border-radius:6px;background:#fff;cursor:pointer">Réessayer</button>', 'var(--rg,#C53030)'); return; }
    if(!ETAT.charge) return;
    const lesClasses = classes();
    if(!lesClasses.length){ el.innerHTML = encadre('Aucun élève dans tes classes pour le moment.'); return; }
    const c = CHOIX.classe;
    let eleves = ETAT.eleves.filter(function(e){ return classeDe(e) === c; });
    const aGroupes = eleves.some(function(e){ return !!e.groupe; });
    if(CHOIX.groupe) eleves = eleves.filter(function(e){ return CHOIX.groupe === 'aucun' ? !e.groupe : e.groupe === CHOIX.groupe; });
    const sel = 'padding:6px 9px;border:.5px solid var(--gb);border-radius:6px;font-size:12.5px;background:#fff';

    let h = '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px">'
      + lesClasses.map(function(x, i){
          return '<div class="cls-tab' + (x === c ? ' on' : '') + '" onclick="icClasse(' + i + ')" style="' + (x === c ? 'background:var(--th-principal);color:#fff;border-color:var(--th-principal)' : '') + '">' + esc(x) + '</div>';
        }).join('')
      + '<span style="flex:1"></span>'
      + (aGroupes ? '<select onchange="icGroupe(this.value)" style="' + sel + '"><option value=""' + (!CHOIX.groupe ? ' selected' : '') + '>Toute la classe</option><option value="G1"' + (CHOIX.groupe === 'G1' ? ' selected' : '') + '>Groupe G1</option><option value="G2"' + (CHOIX.groupe === 'G2' ? ' selected' : '') + '>Groupe G2</option><option value="aucun"' + (CHOIX.groupe === 'aucun' ? ' selected' : '') + '>Élèves sans groupe</option></select>' : '')
      + '<button onclick="icActualiser()" title="Recharger depuis le serveur" style="' + sel + ';cursor:pointer">↻ Actualiser</button></div>';
    if(!eleves.length){ el.innerHTML = h + encadre('Aucun élève dans ce groupe.'); return; }

    const d = calculer(eleves);
    const sansActivite = d.st.filter(function(s){ return !s.rendues; });

    // 1. Chiffres clés
    const tuile = function(val, lib, sous, coul, fond){
      return '<div style="flex:1 1 150px;background:' + fond + ';border-radius:10px;padding:12px 14px">'
        + '<div style="font-size:24px;font-weight:900;color:' + coul + ';line-height:1">' + val + '</div>'
        + '<div style="font-size:12px;font-weight:800;color:var(--th-fonce);margin-top:4px">' + lib + '</div>'
        + '<div style="font-size:11px;color:var(--gm);margin-top:2px">' + sous + '</div></div>';
    };
    h += '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px">'
      + tuile(d.actifs7j + '/' + eleves.length, 'Élèves actifs cette semaine', 'au moins une copie rendue en 7 jours', '#1E40AF', '#EFF6FF')
      + tuile(d.validees, 'Missions validées', d.rendues + ' copie' + (d.rendues > 1 ? 's' : '') + ' rendue' + (d.rendues > 1 ? 's' : '') + ' au total', '#166534', '#F0FDF4')
      + tuile(d.moyenne != null ? fmt(d.moyenne, true) + '/20' : '—', 'Note moyenne', 'des missions validées', '#7B2FBE', '#FAF5FF')
      + tuile(d.premierCoup != null ? fmt(d.premierCoup * 100) + ' %' : '—', 'Validées du premier coup', 'parmi les validées, sans 2e tentative', '#B45309', '#FFF7ED')
      + (function(){
          const g = d.gain;
          if(!g.fourni) return tuile('—', 'Gain à la 2e tentative', 'disponible après la mise à jour du serveur', 'var(--gm)', '#F0F9FF');
          if(!g.nb) return tuile('—', 'Gain à la 2e tentative', 'aucune copie retravaillée pour l\'instant', 'var(--gm)', '#F0F9FF');
          const v = (g.moyen > 0 ? '+' : '') + fmt(g.moyen, true) + ' pt' + (Math.abs(g.moyen) >= 2 ? 's' : '');
          return tuile(v, 'Gain à la 2e tentative', 'moyenne sur ' + g.nb + ' copie' + (g.nb > 1 ? 's' : '') + ' retravaillée' + (g.nb > 1 ? 's' : '') + ' · ' + fmt(g.ameliorees * 100) + ' % en progrès', g.moyen > 0 ? '#0369A1' : 'var(--gm)', '#F0F9FF');
        })()
      + tuile(sansActivite.length, 'Sans activité', 'aucune copie rendue', sansActivite.length ? '#B91C1C' : 'var(--gm)', 'var(--gc)')
      + '</div>';

    // 2. Niveau par bloc
    const labelsNiveaux = ['Non démarré','Découverte','En progression','Acquis','Maîtrisé'];
    const colsNiveaux = ['#A0AEC0','var(--th-vif)','var(--th-second)','var(--th-principal)','var(--th-nuit)'];
    const barre = function(label, cle){
      const conc = d.st.filter(function(s){ return s[cle] !== null && s[cle] !== undefined; });
      if(!conc.length) return '';
      const n = [0,0,0,0,0]; conc.forEach(function(s){ n[s[cle]]++; });
      return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:700;color:var(--th-fonce);margin-bottom:4px"><span>' + label + '</span>'
        + '<span style="font-weight:600;color:var(--gm)">' + (n[3] + n[4]) + '/' + conc.length + ' ont acquis</span></div>'
        + '<div style="display:flex;height:12px;border-radius:6px;overflow:hidden;background:#E2E8F0">'
        + n.map(function(x, i){ const p = Math.round(x / conc.length * 100); return p > 0 ? '<div style="height:100%;width:' + p + '%;background:' + colsNiveaux[i] + '" title="' + labelsNiveaux[i] + ' : ' + x + ' élève(s)"></div>' : ''; }).join('')
        + '</div></div>';
    };
    const carte = function(titre, corps, sous){ return '<div class="card" style="margin-bottom:12px"><div class="ct">' + titre + '</div>' + (sous ? '<div style="font-size:11.5px;color:var(--gm);margin:-4px 0 10px">' + sous + '</div>' : '') + corps + '</div>'; };
    h += carte('Niveau de la classe par bloc de compétences',
        barre('C1 — Bloc 1 : conseiller et vendre', 'c1') + barre('C2 — Bloc 2 : suivre les ventes', 'c2')
      + barre('C3 — Bloc 3 : fidéliser la clientèle et développer la relation client', 'c3') + barre('Bloc 4 : option', 'g4')
      + '<div style="display:flex;flex-wrap:wrap;gap:4px 12px;font-size:11px;color:var(--gm)">' + labelsNiveaux.map(function(l, i){ return '<span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:' + colsNiveaux[i] + ';margin-right:4px"></span>' + l + '</span>'; }).join('') + '</div>');

    // 3. À retravailler : compétences puis missions les moins réussies
    const comps = d.comps.slice().sort(function(a, b){ return (a.val / a.copies) - (b.val / b.copies) || (a.nb ? a.somme / a.nb : 20) - (b.nb ? b.somme / b.nb : 20); });
    const th = 'padding:6px 8px;text-align:left;font-size:10.5px;color:var(--gm);text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid var(--gb)';
    const td = 'padding:6px 8px;border-bottom:1px solid #EEF2F6';
    const pastilleTaux = function(t){ return '<span style="display:inline-block;min-width:44px;text-align:center;padding:2px 7px;border-radius:9px;font-weight:800;background:' + fondTaux(t) + ';color:' + couleurTaux(t) + '">' + fmt(t * 100) + ' %</span>'; };
    h += carte('🎯 Compétences à retravailler',
      comps.length ? '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="' + th + '">Compétence</th><th style="' + th + '">Copies rendues</th><th style="' + th + '">Élèves</th><th style="' + th + '">Validées</th><th style="' + th + '">Note moyenne</th></tr></thead><tbody>'
        + comps.map(function(x){
            return '<tr><td style="' + td + '"><strong style="color:var(--th-principal)">' + esc(x.code) + '</strong> ' + esc(libelleComp(x.code)) + '</td>'
              + '<td style="' + td + '">' + x.copies + '</td><td style="' + td + '">' + Object.keys(x.eleves).length + '</td>'
              + '<td style="' + td + '">' + pastilleTaux(x.val / x.copies) + '</td><td style="' + td + '">' + (x.nb ? fmt(x.somme / x.nb, true) + '/20' : '—') + '</td></tr>';
          }).join('') + '</tbody></table></div>'
        : encadre('Pas encore de copie rendue dans cette classe.'),
      'Les moins réussies en haut (part des copies validées). Une compétence sous 50 % mérite sans doute une reprise en classe.');

    const ms = d.missions.filter(function(x){ return x.copies >= 2 && x.nb; }).sort(function(a, b){ return (a.somme / a.nb) - (b.somme / b.nb); }).slice(0, 6);
    if(ms.length){
      h += carte('🔍 Missions les moins réussies',
        '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="' + th + '">Mission</th><th style="' + th + '">Copies</th><th style="' + th + '">Validées</th><th style="' + th + '">Note moyenne</th></tr></thead><tbody>'
        + ms.map(function(x){
            return '<tr><td style="' + td + '"><strong style="color:var(--th-principal)">' + esc(x.id) + '</strong> ' + esc(x.titre) + ' <span style="color:var(--gm)">(' + esc(x.comp) + ')</span></td>'
              + '<td style="' + td + '">' + x.copies + '</td><td style="' + td + '">' + pastilleTaux(x.val / x.copies) + '</td><td style="' + td + '">' + fmt(x.somme / x.nb, true) + '/20</td></tr>';
          }).join('') + '</tbody></table></div>',
        'Parmi les missions rendues par au moins 2 élèves : les notes moyennes les plus basses.');
    }

    // 4. Élèves
    const enDiff = d.st.filter(function(s){ return s.validees > 0 && s.score < 40; }).sort(function(a, b){ return a.score - b.score; });
    const rendNonVal = d.st.filter(function(s){ return s.rendues > 0 && !s.validees; });
    const meilleurs = d.st.filter(function(s){ return s.validees > 0; }).sort(function(a, b){ return b.score - a.score; }).slice(0, 5);
    const liste = function(titre, coul, items, rendu, vide){
      return '<div style="flex:1 1 220px;min-width:0"><div style="font-size:12px;font-weight:800;color:' + coul + ';margin-bottom:6px">' + titre + '</div>'
        + (items.length ? items.map(function(s){ return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid var(--gc)">' + rendu(s) + '</div>'; }).join('') : '<div style="font-size:12px;color:var(--gm)">' + vide + '</div>') + '</div>';
    };
    h += carte('👥 Élèves',
      '<div style="display:flex;flex-wrap:wrap;gap:16px">'
      + liste('😴 Rien de validé', 'var(--gm)', sansActivite.concat(rendNonVal), function(s){ return esc(nomE(s.e)) + (s.rendues ? ' <span style="color:var(--gm)">(' + s.rendues + ' rendue(s), aucune validée)</span>' : ''); }, 'Tout le monde a au moins une mission validée.')
      + liste('⚠ En difficulté', '#C53030', enDiff, function(s){ return esc(nomE(s.e)) + ' — ' + s.score + '/100 <span style="color:var(--gm)">(' + s.validees + ' validée(s))</span>'; }, 'Aucun élève sous 40/100.')
      + liste('🏆 Meilleurs scores', 'var(--th-principal)', meilleurs, function(s){ return esc(nomE(s.e)) + ' — ' + s.score + '/100'; }, 'Aucun élève actif pour l\'instant.')
      + '</div>', 'Score LABORO sur 100 (le même que dans la Vue classe). « En difficulté » : sous 40/100 avec au moins une mission validée.');
    el.innerHTML = h;
  }

  window.icClasse = function(i){ const c = classes()[i]; if(c == null) return; CHOIX.classe = c; CHOIX.groupe = ''; dessiner(); };
  window.icGroupe = function(g){ CHOIX.groupe = g; dessiner(); };
  window.icActualiser = function(){ charger(); };
  window.renderIndicateursClasse = function(){ charger(); };

  // Bouton « 📈 Indicateurs de la classe » de la Vue classe : ouvre cette page sur la classe (et le groupe) filtrés
  window.ouvrirIndicateursClasse = function(){
    if(typeof classeFiltre !== 'undefined' && classeFiltre) CHOIX.classe = classeFiltre;
    CHOIX.groupe = (typeof groupeFiltre !== 'undefined' && groupeFiltre) ? groupeFiltre : '';
    goP('indicclasse', document.getElementById('ni-ic'));
  };
})();
