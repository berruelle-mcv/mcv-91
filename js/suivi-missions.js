// ═══════════════════════════════════════════════════════════════════════
//   LABORO — Moteur commun : Suivi des missions (07/10/2026)
//
//   Demande de Pascal : « s'y retrouver dans les missions assignées, réalisées
//   ou pas par les élèves ». Un tableau par classe : une ligne par élève, une
//   colonne par mission assignée (la plus récente à gauche), et dans chaque
//   case où en est l'élève. Clic sur une case → sa copie (openCopie, copie.js).
//
//   Aucune nouvelle route serveur : on croise ce que le serveur fournit déjà
//     GET /api/eleves                    → élèves (classe_libelle, groupe)
//     GET /api/eleves/:id/progressions   → statut, notes, tentatives
//     GET /api/mission-du-jour/toutes    → missions assignées (cible, dates)
//   Chargé APRÈS classe-serveur.js, copie.js et memos.js.
// ═══════════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  function jeton(){ return localStorage.getItem('laboro_token'); }
  function entetes(){ return { 'Authorization': 'Bearer ' + jeton() }; }
  // Dates du serveur : ISO, ou « AAAA-MM-JJ HH:MM:SS » (SQLite, en UTC)
  function dateServeur(v){
    if(!v) return null;
    let t = String(v); if(t.indexOf('T') < 0) t = t.replace(' ', 'T') + 'Z';
    const d = new Date(t); return isNaN(d) ? null : d;
  }
  function jourCourt(d){ return d ? d.toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'numeric' }) : ''; }
  function nomE(e){ return ((e.nom || '').toUpperCase() + ' ' + (e.prenom || '')).trim() || e.email || 'Élève'; }
  function missionParId(id){ return (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(m){ return m.id === id; }) : null; }

  let ETAT = { charge: false, enCours: false, erreur: '', eleves: [], assignations: [] };
  let CHOIX = { classe: '', groupe: '', retirees: true, tri: 'nom' };

  // ── États d'une case (élève × mission) ──
  const STYLES = {
    valide:    { ico:'✅', lib:'Validée',                                bg:'#DCFCE7', fg:'#166534' },
    epuisee:   { ico:'⛔', lib:'2 essais utilisés, sous le seuil',       bg:'#FEE2E2', fg:'#991B1B' },
    reprendre: { ico:'🔁', lib:'Sous le seuil : peut encore la corriger', bg:'#FFEDD5', fg:'#9A3412' },
    rendue:    { ico:'📨', lib:'Rendue, correction en cours',            bg:'#DBEAFE', fg:'#1E40AF' },
    commencee: { ico:'✏️', lib:'Commencée, pas encore rendue',           bg:'#FEF3C7', fg:'#92400E' },
    afaire:    { ico:'⬜', lib:'Pas commencée',                          bg:'#F8FAFC', fg:'#64748B' }
  };
  function etatProgression(p){
    if(!p) return 'afaire';
    if(p.statut === 'valide') return 'valide';
    if(p.statut === 'a_examiner') return (p.tentatives || 0) >= 2 ? 'epuisee' : 'reprendre';
    if(p.statut === 'soumis' || p.statut === 'corrige') return 'rendue';
    return 'commencee'; // brouillon
  }
  function noteDe(p){ if(!p) return null; const n = p.note_finale != null ? p.note_finale : p.note_ia; return n == null ? null : Number(n); }
  function fmtNote(n){ return n == null ? '' : String(Math.round(n * 2) / 2).replace('.', ','); }

  // ── Chargement (toujours frais à l'ouverture de l'écran) ──
  async function charger(){
    const el = document.getElementById('sm-contenu'); if(!el) return;
    if(!jeton()){ el.innerHTML = encadre('Connecte-toi avec ton compte enseignant pour voir le suivi des missions.'); return; }
    if(ETAT.enCours) return;
    ETAT.enCours = true;
    el.innerHTML = encadre('⏳ Chargement des élèves et de leurs missions…');
    try {
      const [rE, rA] = await Promise.all([
        fetchJSON(LABORO_API + '/api/eleves', { headers: entetes() }),
        fetchJSON(LABORO_API + '/api/mission-du-jour/toutes', { headers: entetes() })
      ]);
      if(!rE.ok || !rE.data.ok){ ETAT.erreur = (rE.data && rE.data.erreur) || rE.erreur || 'Impossible de charger les élèves.'; return; }
      if(!rA.ok || !rA.data.ok){ ETAT.erreur = (rA.data && rA.data.erreur) || rA.erreur || 'Impossible de charger les missions assignées.'; return; }
      // On alimente les données partagées de l'espace enseignant (copie.js s'en sert pour l'en-tête de la copie)
      ELEVES_SERVEUR = rE.data.eleves || [];
      MDJ_ASSIGNATIONS = rA.data.assignations || [];
      ETAT.eleves = sansComptesTest(ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; }));
      ETAT.assignations = MDJ_ASSIGNATIONS;
      await chargerProgressionsClasse(ETAT.eleves);
      ETAT.erreur = ''; ETAT.charge = true;
      if(!CHOIX.classe || classes().indexOf(CHOIX.classe) < 0) CHOIX.classe = classeParDefaut();
    } finally {
      ETAT.enCours = false;
      dessiner();
    }
  }
  function encadre(txt, col){ return '<div style="padding:14px 16px;background:var(--gc,#F3F4F6);border-radius:8px;font-size:12.5px;color:' + (col || 'var(--gm,#6B7280)') + ';text-align:center">' + txt + '</div>'; }

  // ── Classes, élèves et missions concernés ──
  function classeDe(e){ return e.classe_libelle || 'Sans classe'; }
  function classes(){
    const s = []; ETAT.eleves.forEach(function(e){ const c = classeDe(e); if(s.indexOf(c) < 0) s.push(c); });
    return s.sort(function(a, b){ return a.localeCompare(b, 'fr'); });
  }
  function elevesDeClasse(c){ return ETAT.eleves.filter(function(e){ return classeDe(e) === c; }); }
  function assignationsDeClasse(c){
    const ids = {}; elevesDeClasse(c).forEach(function(e){ ids[String(e.id)] = true; });
    return ETAT.assignations.filter(function(a){
      if(a.cible === 'eleve') return !!ids[String(a.eleve_id)];
      return (a.classe_libelle || a.classe_id) === c;
    });
  }
  function classeParDefaut(){
    // La classe de la dernière mission assignée ; sinon la première de la liste
    const tri = ETAT.assignations.slice().sort(function(a, b){ return (dateServeur(b.created_at) || 0) - (dateServeur(a.created_at) || 0); });
    for(let i = 0; i < tri.length; i++){
      const c = classes().find(function(x){ return assignationsDeClasse(x).indexOf(tri[i]) >= 0; });
      if(c) return c;
    }
    return classes()[0] || '';
  }
  function concerne(a, e){
    if(a.cible === 'eleve') return String(a.eleve_id) === String(e.id);
    if(a.cible === 'groupe') return e.groupe === a.groupe;
    return true;
  }
  // Une colonne par mission (si la même mission a été assignée à G1 puis à G2, une seule colonne)
  function colonnes(c){
    const parMission = {};
    assignationsDeClasse(c).forEach(function(a){
      if(a.retiree_at && !CHOIX.retirees) return;
      const k = a.mission_id;
      (parMission[k] = parMission[k] || { mission_id: k, titre: a.titre, comp_id: a.comp_id, palier: a.palier, assignations: [] }).assignations.push(a);
    });
    return Object.keys(parMission).map(function(k){
      const col = parMission[k];
      const dates = col.assignations.map(function(a){ return dateServeur(a.created_at); }).filter(Boolean);
      col.premiere = dates.length ? new Date(Math.min.apply(null, dates)) : null;
      col.derniere = dates.length ? new Date(Math.max.apply(null, dates)) : null;
      col.active = col.assignations.some(function(a){ return !a.retiree_at; });
      // Qui a assigné (10/10/2026) : prénom(s) des enseignants, sans doublon
      col.par = col.assignations.map(function(a){ return a.assigne_par; }).filter(function(n, i, t){ return n && t.indexOf(n) === i; });
      const maisons = col.assignations.filter(function(a){ return !a.retiree_at && a.maison_jusqu_a; }).map(function(a){ return dateServeur(a.maison_jusqu_a); }).filter(Boolean);
      col.maison = maisons.length ? new Date(Math.max.apply(null, maisons)) : null;
      const m = missionParId(k); if(m){ col.titre = col.titre || m.titre; col.comp_id = col.comp_id || m.comp; col.palier = col.palier || m.palier; }
      return col;
    }).sort(function(a, b){ return (b.derniere || 0) - (a.derniere || 0); });
  }
  function caseEleve(e, col){
    const p = (PROGRESSIONS_BRUTES[e.id] || []).find(function(x){ return x && x.mission_id === col.mission_id; }) || null;
    const conc = col.assignations.some(function(a){ return concerne(a, e); });
    return { p: p, etat: etatProgression(p), note: noteDe(p), concerne: conc };
  }

  // ── Dessin ──
  function dessiner(){
    const el = document.getElementById('sm-contenu'); if(!el) return;
    if(ETAT.erreur){ el.innerHTML = encadre(esc(ETAT.erreur) + '<br><button onclick="smActualiser()" style="margin-top:8px;padding:6px 12px;border:.5px solid var(--gb);border-radius:6px;background:#fff;cursor:pointer">Réessayer</button>', 'var(--rg,#C53030)'); return; }
    if(!ETAT.charge) return;
    const lesClasses = classes();
    if(!lesClasses.length){ el.innerHTML = encadre('Aucun élève dans tes classes pour le moment.'); return; }

    const c = CHOIX.classe;
    let eleves = elevesDeClasse(c);
    if(CHOIX.groupe) eleves = eleves.filter(function(e){ return CHOIX.groupe === 'aucun' ? !e.groupe : e.groupe === CHOIX.groupe; });
    const cols = colonnes(c);

    // Ligne de chaque élève + bilan
    const lignes = eleves.map(function(e){
      const cases = cols.map(function(col){ return caseEleve(e, col); });
      // Bilan : missions encore actives qui lui sont demandées (une mission retirée n'est plus due)
      const assignees = cases.filter(function(x, j){ return x.concerne && cols[j].active; });
      const b = { assignees: assignees.length, valide: 0, epuisee: 0, rendue: 0, reste: 0 };
      assignees.forEach(function(x){
        if(x.etat === 'valide') b.valide++; else if(x.etat === 'epuisee') b.epuisee++;
        else if(x.etat === 'rendue') b.rendue++; else b.reste++;   // reste = pas commencée, commencée, à reprendre
      });
      return { e: e, cases: cases, b: b };
    });
    if(CHOIX.tri === 'retard') lignes.sort(function(x, y){ return (y.b.reste - x.b.reste) || (y.b.epuisee - x.b.epuisee) || nomE(x.e).localeCompare(nomE(y.e), 'fr'); });
    else lignes.sort(function(x, y){ return nomE(x.e).localeCompare(nomE(y.e), 'fr'); });

    const sel = 'padding:6px 9px;border:.5px solid var(--gb);border-radius:6px;font-size:12.5px;background:#fff';
    const aGroupes = elevesDeClasse(c).some(function(e){ return !!e.groupe; });
    let h = '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px">'
      + lesClasses.map(function(x, ix){
          const n = assignationsDeClasse(x).filter(function(a){ return !a.retiree_at && a.total > 0 && a.termines < a.total; }).length;
          return '<div class="cls-tab' + (x === c ? ' on' : '') + '" onclick="smClasse(' + ix + ')" style="' + (x === c ? 'background:var(--th-principal);color:#fff;border-color:var(--th-principal)' : '') + '">' + esc(x)
            + (n ? ' <span style="font-size:9px;background:#FEF3C7;color:#92400E;padding:1px 5px;border-radius:8px" title="Missions en cours">' + n + ' en cours</span>' : '') + '</div>';
        }).join('')
      + '</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px">'
      + (aGroupes ? '<select onchange="smGroupe(this.value)" style="' + sel + '"><option value=""' + (!CHOIX.groupe ? ' selected' : '') + '>Toute la classe</option><option value="G1"' + (CHOIX.groupe === 'G1' ? ' selected' : '') + '>Groupe G1</option><option value="G2"' + (CHOIX.groupe === 'G2' ? ' selected' : '') + '>Groupe G2</option><option value="aucun"' + (CHOIX.groupe === 'aucun' ? ' selected' : '') + '>Élèves sans groupe</option></select>' : '')
      + '<select onchange="smTri(this.value)" style="' + sel + '"><option value="nom"' + (CHOIX.tri === 'nom' ? ' selected' : '') + '>Ordre alphabétique</option><option value="retard"' + (CHOIX.tri === 'retard' ? ' selected' : '') + '>Les plus en retard d\'abord</option></select>'
      + '<label style="font-size:12.5px;display:flex;align-items:center;gap:5px;cursor:pointer"><input type="checkbox"' + (CHOIX.retirees ? ' checked' : '') + ' onchange="smRetirees(this.checked)"> Missions retirées</label>'
      + '<span style="flex:1"></span>'
      + '<button onclick="smRelancer()" style="padding:7px 12px;border:none;border-radius:6px;background:var(--th-principal);color:#fff;font-weight:700;font-size:12.5px;cursor:pointer">📣 Relancer les élèves en retard</button>'
      + '<button onclick="smActualiser()" title="Recharger depuis le serveur" style="' + sel + ';cursor:pointer">↻ Actualiser</button>'
      + '</div>';

    if(!cols.length){
      el.innerHTML = h + encadre('Aucune mission assignée à ' + esc(c) + (CHOIX.retirees ? '' : ' (hors missions retirées)') + ' pour le moment. Assigne-en une depuis <a href="#" onclick="goP(\'missiondujour\',document.getElementById(\'ni-mdj\'));return false">Mission du jour</a>.');
      return;
    }
    if(!lignes.length){ el.innerHTML = h + encadre('Aucun élève dans ce groupe.'); return; }

    // Bilan de la classe
    const nbAJour = lignes.filter(function(l){ return l.b.assignees && !l.b.reste && !l.b.epuisee && !l.b.rendue; }).length;
    const nbRetard = lignes.filter(function(l){ return l.b.reste > 0; }).length;
    h += '<div style="font-size:12.5px;color:var(--gm);margin-bottom:8px">'
      + '<strong style="color:var(--th-fonce)">' + lignes.length + ' élève' + (lignes.length > 1 ? 's' : '') + '</strong> · '
      + cols.length + ' mission' + (cols.length > 1 ? 's' : '') + ' assignée' + (cols.length > 1 ? 's' : '') + ' · '
      + '<span style="color:#166534">' + nbAJour + ' à jour</span> · <span style="color:#92400E">' + nbRetard + ' avec du travail en attente</span></div>';

    // Légende
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px 12px;font-size:11px;color:var(--gm);margin-bottom:10px">'
      + ['valide','reprendre','epuisee','rendue','commencee','afaire'].map(function(k){ return '<span>' + STYLES[k].ico + ' ' + STYLES[k].lib + '</span>'; }).join('')
      + '<span style="opacity:.55">✅ grisé : faite sans lui avoir été demandée</span><span>· : pas demandée (ou mission retirée)</span></div>'
      + '<div style="font-size:11px;color:var(--gm);margin:-4px 0 10px">Devant le nom : 🟢 à jour · 🟡 du travail en attente · 🟠 moins de la moitié validée · 🔴 rien de validé</div>';

    // Tableau
    const th = 'padding:6px 8px;border-bottom:1px solid var(--gb);font-size:11px;vertical-align:bottom;background:#F8FAFC';
    const stickyTh = 'position:sticky;left:0;z-index:2;';
    h += '<div style="overflow:auto;max-height:70vh;border:.5px solid var(--gb);border-radius:8px">'
      + '<table style="border-collapse:separate;border-spacing:0;font-size:12px;min-width:100%">'
      + '<thead style="position:sticky;top:0;z-index:3"><tr>'
      + '<th style="' + th + stickyTh + 'text-align:left;min-width:170px">Élève</th>'
      + '<th style="' + th + 'text-align:center;min-width:70px" title="Missions validées / missions qui lui sont demandées (hors missions retirées)">Validées</th>'
      + cols.map(function(col){
          const faits = lignes.filter(function(l){ const x = caseEleve(l.e, col); return x.concerne && (x.etat === 'valide' || x.etat === 'epuisee'); }).length;
          const conc = lignes.filter(function(l){ return caseEleve(l.e, col).concerne; }).length;
          const badge = !col.active ? '<span style="background:#F3F4F6;color:#6B7280;border-radius:8px;padding:0 5px">retirée</span>'
            : (conc && faits >= conc ? '<span style="background:#DCFCE7;color:#166534;border-radius:8px;padding:0 5px">terminée</span>'
            : '<span style="background:#FEF3C7;color:#92400E;border-radius:8px;padding:0 5px">en cours</span>');
          const maison = (col.active && col.maison) ? '<div title="À terminer à la maison" style="color:' + (col.maison < new Date() ? '#6B7280' : '#075985') + '">🏠 ' + (col.maison < new Date() ? 'échue ' : 'jusqu\'au ') + jourCourt(col.maison) + '</div>' : '';
          return '<th style="' + th + 'text-align:center;min-width:92px;font-weight:600;color:var(--gm)" title="' + esc(col.mission_id + ' — ' + (col.titre || '')) + '">'
            + '<div style="font-weight:800;color:var(--th-principal);font-size:12px">' + esc(col.mission_id) + '</div>'
            + '<div style="max-width:120px;margin:0 auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600;color:var(--th-fonce)">' + esc(col.titre || '') + '</div>'
            + '<div>' + esc(col.comp_id || '') + (col.palier ? ' · P' + esc(col.palier) : '') + '</div>'
            + '<div>' + jourCourt(col.premiere) + '</div>'
            + (col.par && col.par.length ? '<div title="Assignée par">par ' + esc(col.par.join(', ')) + '</div>' : '')
            + maison
            + '<div style="margin-top:3px">' + badge + ' <strong>' + faits + '/' + conc + '</strong></div></th>';
        }).join('')
      + '</tr></thead><tbody>'
      + lignes.map(function(l, i){
          const fond = i % 2 ? '#FCFCFD' : '#fff';
          const td = 'padding:5px 6px;border-bottom:1px solid #EEF2F6;background:' + fond + ';';
          const b = l.b;
          const couleurBilan = !b.assignees ? 'var(--gm)' : (!b.reste && !b.epuisee && !b.rendue ? '#166534' : (b.valide * 2 < b.assignees ? '#B91C1C' : '#92400E'));
          const pastille = !b.assignees ? '' : (!b.reste && !b.epuisee && !b.rendue ? '🟢' : (b.valide === 0 && !b.rendue ? '🔴' : (b.valide * 2 < b.assignees ? '🟠' : '🟡')));
          return '<tr>'
            + '<td style="' + td + 'position:sticky;left:0;z-index:1;font-weight:700;white-space:nowrap">' + pastille + ' ' + esc(nomE(l.e)) + ((typeof badgeGroupe === 'function') ? badgeGroupe(l.e.groupe) : '') + '</td>'
            + '<td style="' + td + 'text-align:center;white-space:nowrap"><strong style="color:' + couleurBilan + '">' + b.valide + '/' + b.assignees + '</strong>'
            + (b.epuisee ? '<div style="font-size:10px;color:#991B1B">⛔ ' + b.epuisee + '</div>' : '') + '</td>'
            + l.cases.map(function(x, j){ return celluleHTML(l.e, cols[j], x, td); }).join('')
            + '</tr>';
        }).join('')
      + '</tbody></table></div>'
      + '<div style="font-size:11px;color:var(--gm);margin-top:8px">Clique sur une case pour ouvrir la copie de l\'élève (noter, valider, accorder une tentative). « Validées » compte les missions qui lui sont demandées, hors missions retirées.</div>';
    el.innerHTML = h;
  }

  function celluleHTML(e, col, x, td){
    const st = STYLES[x.etat];
    if(!x.p && (!x.concerne || !col.active)) return '<td style="' + td + 'text-align:center;color:#CBD5E1" title="' + (x.concerne ? 'Mission retirée : plus rien à faire' : 'Pas demandée à cet élève') + '">·</td>';
    const cliquable = !!x.p && x.etat !== 'commencee';
    const note = (x.note != null && x.etat !== 'commencee') ? ' <strong>' + fmtNote(x.note) + '</strong>' : '';
    const essais = (x.p && x.etat === 'reprendre') ? '<div style="font-size:9.5px">1 essai restant</div>' : '';
    const titre = nomE(e) + ' — ' + col.mission_id + ' : ' + st.lib + (x.note != null && x.etat !== 'commencee' ? ' (' + fmtNote(x.note) + '/20)' : '')
      + (!x.concerne ? ' — faite sans lui avoir été demandée' : '') + (cliquable ? ' — cliquer pour ouvrir la copie' : '');
    return '<td style="' + td + 'text-align:center;padding:3px 4px">'
      + '<div ' + (cliquable ? 'onclick="openCopie(\'' + esc(e.id) + '\',\'' + esc(col.mission_id) + '\')" ' : '') + 'title="' + esc(titre) + '" '
      + 'style="border-radius:6px;padding:4px 2px;background:' + st.bg + ';color:' + st.fg + ';' + (cliquable ? 'cursor:pointer;' : '') + (!x.concerne ? 'opacity:.5;' : '') + 'white-space:nowrap">'
      + st.ico + note + essais + '</div></td>';
  }

  // ── Actions ──
  window.smClasse = function(i){ const c = classes()[i]; if(c == null) return; CHOIX.classe = c; CHOIX.groupe = ''; dessiner(); };
  window.smGroupe = function(g){ CHOIX.groupe = g; dessiner(); };
  window.smTri = function(t){ CHOIX.tri = t; dessiner(); };
  window.smRetirees = function(v){ CHOIX.retirees = !!v; dessiner(); };
  window.smActualiser = function(){ charger(); };
  window.renderSuiviMissions = function(){ charger(); };

  // « Relancer » : ouvre Mémos et relances (Mission du jour) sur la classe et le groupe affichés
  window.smRelancer = async function(){
    const classe = CHOIX.classe, groupe = (CHOIX.groupe === 'G1' || CHOIX.groupe === 'G2') ? CHOIX.groupe : '';
    goP('missiondujour', document.getElementById('ni-mdj'));
    if(typeof populateClasseSelects === 'function') await populateClasseSelects();
    if(typeof renderMDJPanel === 'function') renderMDJPanel(); // remplit l'encadré des mémos avec la liste des classes
    const cl = document.getElementById('memo-cl'), gr = document.getElementById('memo-grp');
    const zone = document.getElementById('memo-zone');
    if(!cl){ if(zone) zone.scrollIntoView({ behavior: 'smooth' }); return; }
    const opt = Array.from(cl.options).find(function(o){ return o.value && o.textContent.trim() === classe; });
    if(opt) cl.value = opt.value;
    if(gr) gr.value = groupe;
    if(zone) zone.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if(opt && typeof window.memoChargerRelances === 'function') window.memoChargerRelances();
  };

  // Après une décision sur une copie (note, validation, tentative), le tableau se met à jour
  if(typeof window.majDonneesApresDecision === 'function'){
    const orig = window.majDonneesApresDecision;
    window.majDonneesApresDecision = function(){
      const r = orig.apply(this, arguments);
      try { const p = document.getElementById('panel-suivi'); if(p && p.classList.contains('on')) dessiner(); } catch(e) { console.error('suivi', e); }
      return r;
    };
  }
})();
