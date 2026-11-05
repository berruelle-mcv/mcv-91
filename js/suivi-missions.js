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
  // vue (15/10/2026) : 'encours' (par défaut) | 'dernieres' (8 plus récentes) | 'toutes' (y compris retirées)
  let CHOIX = { classe: '', groupe: '', retirees: true, tri: 'nom', vue: (function(){ try{ return localStorage.getItem('laboro_sm_vue') || 'encours'; }catch(e){ return 'encours'; } })(),
    // Récap des compétences (05/11/2026) : mode 'eleves' (tableau) | 'recap' ; depuis = 'AAAA-MM-JJ' ou '' ; par = nom de l'enseignant ou ''
    mode: (function(){ try{ return localStorage.getItem('laboro_sm_mode') || 'eleves'; }catch(e){ return 'eleves'; } })(), depuis: '', par: '' };

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
  function fmtMoy(n){ return n == null ? '' : String(Math.round(n * 10) / 10).replace('.', ','); }
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
      // Qui l'a donnée, avec la couleur vue par les élèves (15/10/2026)
      col.parNoms = [];
      col.assignations.forEach(function(a){ if(a.par_nom && !col.parNoms.some(function(p){ return p.nom === a.par_nom; })) col.parNoms.push({ nom: a.par_nom, couleur: a.par_couleur }); });
      const maisons = col.assignations.filter(function(a){ return !a.retiree_at && a.maison_jusqu_a; }).map(function(a){ return dateServeur(a.maison_jusqu_a); }).filter(Boolean);
      col.maison = maisons.length ? new Date(Math.max.apply(null, maisons)) : null;
      const m = missionParId(k); if(m){ col.titre = m.titre || col.titre; col.comp_id = col.comp_id || m.comp; col.palier = col.palier || m.palier; }
      return col;
    }).sort(function(a, b){ return (b.derniere || 0) - (a.derniere || 0); });
  }
  function styleEnseignant(c){
    return c === 'rose' ? 'background:#FCE7F3;color:#9D174D' : (c === 'bleu' ? 'background:#E0F2FE;color:#075985' : 'background:#FFFBEA;color:#8A6500');
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

    // Espace prof (15/10/2026) : la classe choisie en haut de l'écran s'applique partout
    if(typeof classeProf === 'function'){ const g = classeProf(); if(g && lesClasses.indexOf(g) >= 0 && g !== CHOIX.classe){ CHOIX.classe = g; CHOIX.groupe = ''; } }
    const c = CHOIX.classe;
    let eleves = elevesDeClasse(c);
    if(CHOIX.groupe) eleves = eleves.filter(function(e){ return CHOIX.groupe === 'aucun' ? !e.groupe : e.groupe === CHOIX.groupe; });
    titreCarte();
    if(CHOIX.mode === 'recap'){ dessinerRecap(el, lesClasses, c, eleves); return; }
    CHOIX.retirees = CHOIX.vue === 'toutes';
    const cols = colonnes(c);
    // Colonnes affichées : missions en cours, les 8 dernières, ou toutes (le bilan « Validées » compte toujours tout)
    let colsAff = cols, repli = false;
    if(CHOIX.vue === 'encours'){
      colsAff = cols.filter(function(col){
        return col.active && eleves.some(function(e){ const x = caseEleve(e, col); return x.concerne && x.etat !== 'valide' && x.etat !== 'epuisee'; });
      });
      if(!colsAff.length){ colsAff = cols.slice(0, 8); repli = true; }
    } else if(CHOIX.vue === 'dernieres') colsAff = cols.slice(0, 8);

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
      return { e: e, cases: cases, casesAff: colsAff.map(function(col){ return caseEleve(e, col); }), b: b };
    });
    if(CHOIX.tri === 'retard') lignes.sort(function(x, y){ return (y.b.reste - x.b.reste) || (y.b.epuisee - x.b.epuisee) || nomE(x.e).localeCompare(nomE(y.e), 'fr'); });
    else lignes.sort(function(x, y){ return nomE(x.e).localeCompare(nomE(y.e), 'fr'); });

    const sel = 'padding:6px 9px;border:.5px solid var(--gb);border-radius:6px;font-size:12.5px;background:#fff';
    const aGroupes = elevesDeClasse(c).some(function(e){ return !!e.groupe; });
    let h = barreMode() + ongletsClasses(lesClasses, c)
      + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px">'
      + (aGroupes ? choixGroupe(sel) : '')
      + '<select onchange="smTri(this.value)" style="' + sel + '"><option value="nom"' + (CHOIX.tri === 'nom' ? ' selected' : '') + '>Ordre alphabétique</option><option value="retard"' + (CHOIX.tri === 'retard' ? ' selected' : '') + '>Les plus en retard d\'abord</option></select>'
      + '<select onchange="smVue(this.value)" style="' + sel + ';font-weight:700" aria-label="Missions affichées">'
      + '<option value="encours"' + (CHOIX.vue === 'encours' ? ' selected' : '') + '>Missions en cours</option>'
      + '<option value="dernieres"' + (CHOIX.vue === 'dernieres' ? ' selected' : '') + '>Les 8 dernières</option>'
      + '<option value="toutes"' + (CHOIX.vue === 'toutes' ? ' selected' : '') + '>Toutes (y compris retirées)</option></select>'
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
      + cols.length + ' mission' + (cols.length > 1 ? 's' : '') + ' assignée' + (cols.length > 1 ? 's' : '')
      + (colsAff.length < cols.length ? ' (' + colsAff.length + ' affichée' + (colsAff.length > 1 ? 's' : '') + (repli ? ' : aucune en cours, voici les dernières' : '') + ')' : '') + ' · '
      + '<span style="color:#166534">' + nbAJour + ' à jour</span> · <span style="color:#92400E">' + nbRetard + ' avec du travail en attente</span>'
      + ' · <button type="button" onclick="var l=document.getElementById(\'sm-legende\');l.style.display=l.style.display===\'none\'?\'\':\'none\'" style="border:1px solid var(--gb);background:#fff;border-radius:10px;padding:1px 8px;cursor:pointer;font-size:11.5px;font-weight:700;color:var(--gm)">? Légende</button></div>';

    // Légende (repliée : un clic sur « ? Légende » l'affiche — 15/10/2026)
    h += '<div id="sm-legende" style="display:none"><div style="display:flex;flex-wrap:wrap;gap:6px 12px;font-size:11px;color:var(--gm);margin-bottom:10px">'
      + ['valide','reprendre','epuisee','rendue','commencee','afaire'].map(function(k){ return '<span>' + STYLES[k].ico + ' ' + STYLES[k].lib + '</span>'; }).join('')
      + '<span style="opacity:.55">✅ grisé : faite sans lui avoir été demandée</span><span>· : pas demandée (ou mission retirée)</span></div>'
      + '<div style="font-size:11px;color:var(--gm);margin:-4px 0 10px">Devant le nom : 🟢 à jour · 🟡 du travail en attente · 🟠 moins de la moitié validée · 🔴 rien de validé</div></div>';

    // Tableau
    // En-têtes figés un par un (15/10/2026) : fond opaque, au-dessus des cases quand on fait défiler
    const th = 'padding:6px 8px;border-bottom:1px solid var(--gb);font-size:11px;vertical-align:bottom;background:#F8FAFC;position:sticky;top:0;z-index:3;background-clip:padding-box;';
    const stickyTh = 'left:0;z-index:4;';
    h += '<div style="overflow:auto;max-height:70vh;border:.5px solid var(--gb);border-radius:8px">'
      + '<table style="border-collapse:separate;border-spacing:0;font-size:12px;min-width:100%">'
      + '<thead><tr>'
      + '<th style="' + th + stickyTh + 'text-align:left;min-width:170px">Élève</th>'
      + '<th style="' + th + 'text-align:center;min-width:70px" title="Missions validées / missions qui lui sont demandées (hors missions retirées)">Validées</th>'
      + colsAff.map(function(col){
          const faits = lignes.filter(function(l){ const x = caseEleve(l.e, col); return x.concerne && (x.etat === 'valide' || x.etat === 'epuisee'); }).length;
          const conc = lignes.filter(function(l){ return caseEleve(l.e, col).concerne; }).length;
          const badge = !col.active ? '<span style="background:#F3F4F6;color:#6B7280;border-radius:8px;padding:0 5px">retirée</span>'
            : (conc && faits >= conc ? '<span style="background:#DCFCE7;color:#166534;border-radius:8px;padding:0 5px">terminée</span>'
            : '<span style="background:#FEF3C7;color:#92400E;border-radius:8px;padding:0 5px">en cours</span>');
          const maison = (col.active && col.maison) ? '<div title="À terminer à la maison" style="color:' + (col.maison < new Date() ? '#6B7280' : '#075985') + '">🏠 ' + (col.maison < new Date() ? 'échue ' : 'jusqu\'au ') + jourCourt(col.maison) + '</div>' : '';
          return '<th style="' + th + 'text-align:center;min-width:120px;max-width:170px;font-weight:600;color:var(--gm)" title="' + esc(col.titre || '') + '">'
            + '<div style="font-weight:800;color:var(--th-fonce);font-size:12px;line-height:1.3;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(col.titre || col.mission_id) + '</div>'
            + '<div>' + esc(codeComp(col.comp_id || '')) + (col.palier ? ' · P' + esc(col.palier) : '') + ' · ' + jourCourt(col.premiere) + '</div>'
            + (col.parNoms && col.parNoms.length ? '<div title="Donnée par" style="margin-top:2px">' + col.parNoms.map(function(p){ return '<span style="font-weight:800;border-radius:6px;padding:0 6px;' + styleEnseignant(p.couleur) + '">' + esc(p.nom) + '</span>'; }).join(' ') + '</div>'
              : (col.par && col.par.length ? '<div title="Assignée par">par ' + esc(col.par.join(', ')) + '</div>' : ''))
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
            + l.casesAff.map(function(x, j){ return celluleHTML(l.e, colsAff[j], x, td); }).join('')
            + '</tr>';
        }).join('')
      + '</tbody></table></div>'
      + '<div style="font-size:11px;color:var(--gm);margin-top:8px">Clique sur une case pour ouvrir la copie de l\'élève (noter, valider, accorder une tentative). « Validées » compte les missions qui lui sont demandées, hors missions retirées.</div>';
    el.innerHTML = h;
  }

  // ── Éléments communs aux deux vues ──
  function titreCarte(){
    const p = document.getElementById('panel-suivi'); const t = p && p.querySelector('.ct'); if(!t) return;
    t.textContent = CHOIX.mode === 'recap' ? 'Compétences travaillées avec la classe' : 'Où en est chaque élève dans les missions assignées ?';
  }
  function barreMode(){
    const b = function(m, txt){
      const on = CHOIX.mode === m;
      return '<button type="button" onclick="smMode(\'' + m + '\')" style="padding:7px 14px;border:none;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;'
        + (on ? 'background:var(--th-principal);color:#fff' : 'background:transparent;color:var(--gm)') + '">' + txt + '</button>';
    };
    return '<div style="display:inline-flex;gap:2px;padding:3px;background:var(--gc,#F3F4F6);border-radius:8px;margin-bottom:12px">'
      + b('eleves', '👥 Élève par élève') + b('recap', '📋 Récap des compétences') + '</div>';
  }
  function ongletsClasses(lesClasses, c){
    return '<div class="sm-classes" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px">'
      + lesClasses.map(function(x, ix){
          const n = assignationsDeClasse(x).filter(function(a){ return !a.retiree_at && a.total > 0 && a.termines < a.total; }).length;
          return '<div class="cls-tab' + (x === c ? ' on' : '') + '" onclick="smClasse(' + ix + ')" style="' + (x === c ? 'background:var(--th-principal);color:#fff;border-color:var(--th-principal)' : '') + '">' + esc(x)
            + (n && CHOIX.mode !== 'recap' ? ' <span style="font-size:9px;background:#FEF3C7;color:#92400E;padding:1px 5px;border-radius:8px" title="Missions en cours">' + n + ' en cours</span>' : '') + '</div>';
        }).join('')
      + '</div>';
  }
  function choixGroupe(sel){
    return '<select onchange="smGroupe(this.value)" style="' + sel + '"><option value=""' + (!CHOIX.groupe ? ' selected' : '') + '>Toute la classe</option><option value="G1"' + (CHOIX.groupe === 'G1' ? ' selected' : '') + '>Groupe G1</option><option value="G2"' + (CHOIX.groupe === 'G2' ? ' selected' : '') + '>Groupe G2</option><option value="aucun"' + (CHOIX.groupe === 'aucun' ? ' selected' : '') + '>Élèves sans groupe</option></select>';
  }

  // ── Récap des compétences (05/11/2026) ──
  // Demande de Pascal : voir d'un coup d'œil les compétences abordées avec une classe
  // (pour construire un DST). Une ligne par compétence du programme de la classe,
  // regroupées par bloc ; en face, les missions données. Compétences jamais travaillées en grisé.
  const BLOCS = [
    { cle: 'Seconde', titre: 'Seconde — Découverte des métiers de la relation client' },
    { cle: 'Bloc 1',  titre: 'Bloc 1 — Conseiller et vendre' },
    { cle: 'Bloc 2',  titre: 'Bloc 2 — Suivre les ventes' },
    { cle: 'Bloc 3',  titre: 'Bloc 3 — Fidéliser la clientèle et développer la relation client' },
    { cle: 'Bloc 4A', titre: 'Bloc 4A — Animer et gérer l\'espace commercial' },
    { cle: 'Bloc 4B', titre: 'Bloc 4B — Prospecter et valoriser l\'offre commerciale' }
  ];
  const BLOC_AUTRE = { cle: 'Autre', titre: 'Autres compétences' };
  function rangBloc(cle){ const i = BLOCS.findIndex(function(b){ return b.cle === cle; }); return i < 0 ? 99 : i; }
  // Compétence d'une mission : code moteur (clé), code affiché, bloc et intitulé officiel (comp_libelle « Bloc 1 — … »)
  function infoComp(comp, m){
    let lib = m && m.comp_libelle;
    if(!lib && typeof MISSIONS !== 'undefined'){ const autre = MISSIONS.find(function(x){ return x.comp === comp && x.comp_libelle; }); if(autre) lib = autre.comp_libelle; }
    let bloc = 'Autre', intitule = '';
    if(lib){
      const k = lib.indexOf(' — ');
      if(k > 0){ bloc = lib.slice(0, k).trim(); intitule = lib.slice(k + 3).trim(); } else intitule = lib;
    }
    if(!intitule && typeof COMP !== 'undefined'){ const x = COMP.find(function(y){ return y.code === comp; }); if(x) intitule = x.label; }
    return { cle: comp, code: codeComp(comp), bloc: bloc, intitule: intitule || comp };
  }
  function ordreComp(a, b){
    return (rangBloc(a.bloc) - rangBloc(b.bloc)) || String(a.code).localeCompare(String(b.code), 'fr', { numeric: true });
  }
  // Programme de la classe : les compétences des missions que ses élèves peuvent voir (data/missions.js)
  function programmeClasse(c){
    const ids = {}; let liste = false;
    elevesDeClasse(c).forEach(function(e){
      const l = (typeof listesMissionsClasse === 'function') ? listesMissionsClasse(e.classe) : null;
      if(l){ liste = true; l.forEach(function(id){ ids[id] = true; }); }
    });
    const ms = (typeof MISSIONS !== 'undefined' ? MISSIONS : []).filter(function(m){ return !liste || ids[m.id]; });
    const comps = {};
    ms.forEach(function(m){ if(m.comp && !comps[m.comp]) comps[m.comp] = infoComp(m.comp, m); });
    return comps;
  }
  function dateCourte(d){ return d ? d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' }) : ''; }
  function nomsPar(col){
    if(col.parNoms && col.parNoms.length) return col.parNoms.map(function(p){ return p.nom; });
    return col.par || [];
  }
  // Toutes les données du récap (servent à l'écran, à l'impression et au texte à copier)
  function donneesRecap(c, eleves){
    const memo = CHOIX.retirees; CHOIX.retirees = true;           // une mission retirée a quand même été vue
    let cols = colonnes(c); CHOIX.retirees = memo;
    const tousPar = []; cols.forEach(function(col){ nomsPar(col).forEach(function(n){ if(tousPar.indexOf(n) < 0) tousPar.push(n); }); });
    const depuis = CHOIX.depuis ? new Date(CHOIX.depuis + 'T00:00:00') : null;
    cols = cols.filter(function(col){
      if(depuis && col.derniere && col.derniere < depuis) return false;
      if(CHOIX.par && nomsPar(col).indexOf(CHOIX.par) < 0) return false;
      // avec un groupe choisi : seulement les missions demandées à au moins un de ses élèves
      return eleves.some(function(e){ return caseEleve(e, col).concerne; });
    });
    const comps = programmeClasse(c);
    const parComp = {};
    cols.forEach(function(col){
      const m = missionParId(col.mission_id);
      const comp = (m && m.comp) || col.comp_id || '?';   // la compétence actuelle de la mission (rattachements de l'audit du 22/10)
      if(!comps[comp]) comps[comp] = infoComp(comp, m);
      let conc = 0, rendues = 0, faites = 0, somme = 0, nbNotes = 0;
      eleves.forEach(function(e){
        const x = caseEleve(e, col); if(!x.concerne) return;
        conc++;
        if(x.etat === 'valide' || x.etat === 'epuisee') faites++;
        if(x.etat !== 'afaire' && x.etat !== 'commencee'){ rendues++; if(x.note != null){ somme += x.note; nbNotes++; } }
      });
      (parComp[comp] = parComp[comp] || []).push({
        id: col.mission_id, titre: col.titre || col.mission_id, palier: col.palier || (m && m.palier) || '',
        date: col.premiere, active: col.active, par: nomsPar(col),
        conc: conc, rendues: rendues, faites: faites, moyenne: nbNotes ? somme / nbNotes : null
      });
    });
    Object.keys(parComp).forEach(function(k){ parComp[k].sort(function(a, b){ return (a.date || 0) - (b.date || 0); }); });
    const liste = Object.keys(comps).map(function(k){ return comps[k]; }).sort(ordreComp);
    const blocs = [];
    liste.forEach(function(ci){
      let b = blocs.find(function(x){ return x.cle === ci.bloc; });
      if(!b){ const ref = BLOCS.find(function(x){ return x.cle === ci.bloc; }) || BLOC_AUTRE; b = { cle: ci.bloc, titre: ref.titre, comps: [] }; blocs.push(b); }
      b.comps.push({ info: ci, missions: parComp[ci.cle] || [] });
    });
    const vues = liste.filter(function(ci){ return (parComp[ci.cle] || []).length; }).length;
    return { blocs: blocs, nbMissions: cols.length, nbComps: liste.length, nbVues: vues, tousPar: tousPar };
  }

  function dessinerRecap(el, lesClasses, c, eleves){
    const sel = 'padding:6px 9px;border:.5px solid var(--gb);border-radius:6px;font-size:12.5px;background:#fff';
    const aGroupes = elevesDeClasse(c).some(function(e){ return !!e.groupe; });
    const D = donneesRecap(c, eleves);
    let h = barreMode() + ongletsClasses(lesClasses, c)
      + '<div class="sm-recap-filtres" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px">'
      + (aGroupes ? choixGroupe(sel) : '')
      + '<label style="font-size:12.5px;color:var(--gm);display:flex;align-items:center;gap:6px">Depuis le <input type="date" value="' + esc(CHOIX.depuis) + '" onchange="smDepuis(this.value)" style="' + sel + '"></label>'
      + (CHOIX.depuis ? '<button type="button" onclick="smDepuis(\'\')" style="' + sel + ';cursor:pointer">Depuis la rentrée</button>' : '')
      + (D.tousPar.length > 1 ? '<select onchange="smPar(this.value)" style="' + sel + '"><option value="">Données par tous les enseignants</option>'
          + D.tousPar.map(function(n){ return '<option value="' + esc(n) + '"' + (CHOIX.par === n ? ' selected' : '') + '>Données par ' + esc(n) + '</option>'; }).join('') + '</select>' : '')
      + '<span style="flex:1"></span>'
      + '<button type="button" onclick="smCopierRecap()" style="padding:7px 12px;border:none;border-radius:6px;background:var(--th-principal);color:#fff;font-weight:700;font-size:12.5px;cursor:pointer" title="Copie la liste en texte, à coller dans un message ou un document">📋 Copier la liste</button>'
      + '<button type="button" onclick="smImprimerRecap()" style="' + sel + ';cursor:pointer">🖨 Imprimer</button>'
      + '<button type="button" onclick="smActualiser()" title="Recharger depuis le serveur" style="' + sel + ';cursor:pointer">↻</button>'
      + '</div>';

    // Bilan en une ligne
    h += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">'
      + pastilleChiffre(D.nbVues + ' / ' + D.nbComps, 'compétences travaillées', '#166534', '#DCFCE7')
      + pastilleChiffre(String(D.nbComps - D.nbVues), 'pas encore travaillée' + (D.nbComps - D.nbVues > 1 ? 's' : ''), '#64748B', '#F1F5F9')
      + pastilleChiffre(String(D.nbMissions), 'mission' + (D.nbMissions > 1 ? 's' : '') + ' donnée' + (D.nbMissions > 1 ? 's' : ''), 'var(--th-fonce)', '#F8FAFC')
      + '</div>';

    if(!D.nbMissions) h += encadre('Aucune mission donnée à ' + esc(c) + (CHOIX.groupe ? ' (ce groupe)' : '') + (CHOIX.depuis ? ' depuis cette date' : '') + '. Toutes les compétences du programme apparaissent ci-dessous, en grisé.') + '<div style="height:10px"></div>';

    h += D.blocs.map(function(b){
      const vues = b.comps.filter(function(x){ return x.missions.length; }).length;
      return '<div style="margin-bottom:14px;border:.5px solid var(--gb);border-radius:8px;overflow:hidden">'
        + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:center;padding:8px 12px;background:#F8FAFC;border-bottom:.5px solid var(--gb)">'
        + '<strong style="color:var(--th-fonce);font-size:13px">' + esc(b.titre) + '</strong>'
        + '<span style="font-size:11.5px;color:var(--gm);white-space:nowrap">' + vues + ' / ' + b.comps.length + ' travaillée' + (vues > 1 ? 's' : '') + '</span></div>'
        + b.comps.map(function(x){
            const ok = x.missions.length > 0;
            return '<div style="display:flex;gap:12px;padding:8px 12px;border-bottom:1px solid #EEF2F6;align-items:flex-start;' + (ok ? '' : 'opacity:.55') + '">'
              + '<div style="flex:0 0 32%;min-width:180px;font-size:12.5px">'
              + '<span style="display:inline-block;font-weight:800;font-size:11px;padding:1px 7px;border-radius:6px;margin-right:6px;' + (ok ? 'background:#DCFCE7;color:#166534' : 'background:#F1F5F9;color:#64748B') + '">' + (ok ? '✓ ' : '') + esc(x.info.code) + '</span>'
              + '<span style="color:var(--th-fonce)">' + esc(x.info.intitule) + '</span></div>'
              + '<div style="flex:1;display:flex;flex-wrap:wrap;gap:6px">'
              + (ok ? x.missions.map(puceMission).join('') : '<span style="font-size:12px;color:#94A3B8;font-style:italic;padding-top:2px">Pas encore travaillée</span>')
              + '</div></div>';
          }).join('')
        + '</div>';
    }).join('');
    h += '<div style="font-size:11px;color:var(--gm);margin-top:4px">Clique sur une mission pour la relire telle que l\'élève la voit. « Rendue » compte les élèves à qui elle a été demandée ; la moyenne porte sur les copies notées. Une mission retirée reste dans le récap : elle a été vue.</div>';
    el.innerHTML = h;
  }
  function pastilleChiffre(chiffre, texte, fg, bg){
    return '<div style="padding:8px 14px;border-radius:8px;background:' + bg + ';display:flex;align-items:baseline;gap:6px">'
      + '<strong style="font-size:20px;color:' + fg + '">' + esc(chiffre) + '</strong><span style="font-size:12px;color:var(--gm)">' + esc(texte) + '</span></div>';
  }
  function puceMission(m){
    const moy = m.moyenne != null ? ' · moy. ' + fmtMoy(m.moyenne) : '';
    const titre = m.id + ' — ' + m.titre + ' (palier ' + m.palier + ', donnée le ' + dateCourte(m.date) + (m.par.length ? ' par ' + m.par.join(', ') : '') + ') : rendue par ' + m.rendues + '/' + m.conc + moy;
    return '<div onclick="smVoirMission(\'' + esc(m.id) + '\')" title="' + esc(titre) + '" style="cursor:pointer;border:1px solid var(--gb);border-radius:6px;padding:4px 8px;background:#fff;font-size:11.5px;max-width:330px">'
      + '<div style="font-weight:700;color:var(--th-fonce);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(m.titre) + '</div>'
      + '<div style="color:var(--gm);white-space:nowrap">' + esc(m.id) + (m.palier ? ' · P' + esc(m.palier) : '') + ' · ' + dateCourte(m.date)
      + ' · <span style="color:' + (m.conc && m.rendues >= m.conc ? '#166534' : '#92400E') + '">rendue ' + m.rendues + '/' + m.conc + '</span>' + esc(moy) + (m.active ? '' : ' · retirée') + '</div></div>';
  }
  // Texte simple : à coller dans un message (par exemple pour préparer un DST avec Claude) ou un document
  function texteRecap(){
    const D = donneesRecap(CHOIX.classe, elevesAffiches());
    const univ = (typeof LABORO_CONFIG !== 'undefined' && LABORO_CONFIG && LABORO_CONFIG.nom_plateforme) || 'LABORO';
    const l = [];
    l.push(univ + ' — ' + CHOIX.classe + (CHOIX.groupe ? ' (' + (CHOIX.groupe === 'aucun' ? 'élèves sans groupe' : 'groupe ' + CHOIX.groupe) + ')' : '')
      + ' — missions données ' + (CHOIX.depuis ? 'depuis le ' + new Date(CHOIX.depuis + 'T00:00:00').toLocaleDateString('fr-FR') : 'depuis la rentrée')
      + (CHOIX.par ? ' par ' + CHOIX.par : '') + ' (au ' + new Date().toLocaleDateString('fr-FR') + ')');
    l.push(D.nbVues + ' compétences travaillées sur ' + D.nbComps + ', ' + D.nbMissions + ' missions.');
    const pas = [];
    D.blocs.forEach(function(b){
      const vues = b.comps.filter(function(x){ return x.missions.length; });
      b.comps.forEach(function(x){ if(!x.missions.length) pas.push(x.info.code + ' ' + x.info.intitule); });
      if(!vues.length) return;
      l.push(''); l.push(b.titre);
      vues.forEach(function(x){
        l.push('• ' + x.info.code + ' — ' + x.info.intitule);
        x.missions.forEach(function(m){
          l.push('   - ' + m.id + ' « ' + m.titre + ' » (palier ' + m.palier + ', ' + dateCourte(m.date) + ') : rendue ' + m.rendues + '/' + m.conc + (m.moyenne != null ? ', moyenne ' + fmtMoy(m.moyenne) + '/20' : ''));
        });
      });
    });
    if(pas.length){ l.push(''); l.push('Pas encore travaillées : ' + pas.join(' ; ') + '.'); }
    return l.join('\n');
  }
  function elevesAffiches(){
    let e = elevesDeClasse(CHOIX.classe);
    if(CHOIX.groupe) e = e.filter(function(x){ return CHOIX.groupe === 'aucun' ? !x.groupe : x.groupe === CHOIX.groupe; });
    return e;
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
  window.smRetirees = function(v){ CHOIX.vue = v ? 'toutes' : 'encours'; dessiner(); };
  window.smVue = function(v){ CHOIX.vue = v; try{ localStorage.setItem('laboro_sm_vue', v); }catch(e){} dessiner(); };
  window.smActualiser = function(){ charger(); };
  // Récap des compétences (05/11/2026)
  window.smMode = function(m){ CHOIX.mode = m === 'recap' ? 'recap' : 'eleves'; try{ localStorage.setItem('laboro_sm_mode', CHOIX.mode); }catch(e){} dessiner(); };
  window.smDepuis = function(v){ CHOIX.depuis = /^\d{4}-\d{2}-\d{2}$/.test(v || '') ? v : ''; dessiner(); };
  window.smPar = function(v){ CHOIX.par = v || ''; dessiner(); };
  window.smVoirMission = function(id){
    if(typeof voirMissionRecherche === 'function') voirMissionRecherche(id);
    else if(typeof openMission === 'function') openMission(id);
  };
  window.smCopierRecap = function(){
    const txt = texteRecap();
    const fini = function(ok){
      const b = document.querySelector('#sm-contenu [onclick="smCopierRecap()"]');
      if(!b) return; const avant = b.textContent;
      b.textContent = ok ? '✓ Liste copiée' : 'Copie impossible : utilise Imprimer';
      setTimeout(function(){ b.textContent = avant; }, 2500);
    };
    const secours = function(){
      try{
        const t = document.createElement('textarea'); t.value = txt; t.setAttribute('readonly', '');
        t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select();
        const ok = document.execCommand('copy'); document.body.removeChild(t); fini(ok);
      }catch(e){ fini(false); }
    };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ fini(true); }, secours);
    else secours();
  };
  window.smImprimerRecap = function(){
    const D = donneesRecap(CHOIX.classe, elevesAffiches());
    const lignes = texteRecap().split('\n');
    const w = window.open('', '_blank');
    if(!w){ alert('Ton navigateur a bloqué la fenêtre d\'impression : autorise les fenêtres pour ce site, ou utilise « Copier la liste ».'); return; }
    const corps = D.blocs.map(function(b){
      return '<h2>' + esc(b.titre) + '</h2><table>' + b.comps.map(function(x){
        return '<tr class="' + (x.missions.length ? '' : 'pas') + '"><td class="c"><b>' + esc(x.info.code) + '</b> ' + esc(x.info.intitule) + '</td><td>'
          + (x.missions.length ? x.missions.map(function(m){
              return '<div><b>' + esc(m.id) + '</b> ' + esc(m.titre) + ' <span>(P' + esc(m.palier) + ', ' + dateCourte(m.date) + ' — rendue ' + m.rendues + '/' + m.conc + (m.moyenne != null ? ', moy. ' + fmtMoy(m.moyenne) : '') + ')</span></div>';
            }).join('') : '<i>Pas encore travaillée</i>') + '</td></tr>';
      }).join('') + '</table>';
    }).join('');
    w.document.write('<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Récap des compétences — ' + esc(CHOIX.classe) + '</title><style>'
      + 'body{font-family:Arial,sans-serif;font-size:11pt;margin:18mm;color:#111}h1{font-size:15pt;margin:0 0 4px}p{margin:0 0 12px;color:#444}'
      + 'h2{font-size:12pt;margin:14px 0 4px;border-bottom:1px solid #999}table{width:100%;border-collapse:collapse}td{vertical-align:top;padding:4px 6px;border-bottom:1px solid #ddd}'
      + 'td.c{width:38%}tr.pas{color:#888}span{color:#555;font-size:9.5pt}@media print{body{margin:10mm}}</style></head><body>'
      + '<h1>' + esc(lignes[0]) + '</h1><p>' + esc(lignes[1]) + '</p>' + corps
      + '<script>window.onload=function(){window.print();}<\/script></body></html>');
    w.document.close();
  };
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
