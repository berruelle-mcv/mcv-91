// ================================================
//   LABORO — Nouvel espace professeur (fichier COMMUN MCV / Auto)
//   Créé le 15/10/2026, d'après la maquette validée par Pascal.
//
//   Menu en 4 entrées, construit sur les questions du prof :
//     Aujourd'hui ........ ce qui demande une action (copies bloquées, à vérifier,
//                          élèves à relancer, notes à reporter), missions en cours
//     Ma classe .......... Suivi des missions | Élèves (fiche élève) | Bilan | Notes → Pronote
//     Donner une mission . Chercher et assigner | Missions données | Générer une mission
//     Réglages ........... accès aux missions, horaires, crédit IA, classes, vue élève
//   + « Voir comme un élève » (compte test de la classe, sans mot de passe).
//   Une seule classe choisie en haut de l'écran, mémorisée dans le navigateur.
//
//   Aucune fonction supprimée : les pages existantes sont réutilisées et rangées
//   autrement (goP est enveloppé ; les anciens écrans restent accessibles).
//   Chargé en DERNIER dans index.html (après menu-enseignant.js et acces-missions.js).
// ================================================
(function(){
  'use strict';

  // ───────── Outils ─────────
  function jeton(){ try{ return localStorage.getItem('laboro_token'); }catch(e){ return null; } }
  function entetes(json){ const h = { 'Authorization': 'Bearer ' + jeton() }; if(json) h['Content-Type'] = 'application/json'; return h; }
  function esc(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  function estProf(){ return typeof CU !== 'undefined' && CU && CU.classe === 'enseignant'; }
  function lireLS(k, d){ try{ const v = localStorage.getItem(k); return v == null ? d : v; }catch(e){ return d; } }
  function ecrireLS(k, v){ try{ localStorage.setItem(k, v); }catch(e){} }
  function dateS(s){ if(!s) return null; let t = String(s); if(t.indexOf('T') < 0) t = t.replace(' ', 'T') + 'Z'; const d = new Date(t); return isNaN(d) ? null : d; }
  function jourCourt(d){ return d ? d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric' }) : ''; }
  function aujourdhui(){ return new Date().toISOString().slice(0, 10); }
  function mission(id){ return (typeof MISSIONS !== 'undefined') ? MISSIONS.find(function(m){ return m.id === id; }) : null; }
  function titre(id){ const m = mission(id); return m ? m.titre : id; }
  function nomE(e){ return ((e.prenom || '') + ' ' + (e.nom || '').toUpperCase()).trim() || e.email; }
  function noteDe(p){ const n = p.note_finale != null ? p.note_finale : p.note_ia; return n == null ? null : Number(n); }
  function fmtNote(n){ return n == null ? '' : String(Math.round(n * 2) / 2).replace('.', ','); }
  function styleProf(c){ return c === 'rose' ? 'background:#FCE7F3;color:#9D174D' : (c === 'bleu' ? 'background:#E0F2FE;color:#075985' : 'background:#FFFBEA;color:#8A6500'); }
  function puceProf(a){
    if(!a || !a.par_nom) return '';
    return '<span class="ep-puce" style="' + styleProf(a.par_couleur) + '">' + (a.par_moi ? 'toi' : esc(a.par_nom)) + '</span>';
  }

  // ───────── Classes du prof et classe choisie ─────────
  let CLASSES = [];   // [{ id, libelle }]
  let ASSIGNATIONS = []; let ASSIGN_A = 0;
  async function chargerClasses(){
    if(CLASSES.length || !jeton()) return CLASSES;
    const r = await fetchJSON(LABORO_API + '/api/classes', { headers: entetes() });
    if(r.ok && r.data && r.data.ok) CLASSES = (r.data.classes || []).map(function(c){ return { id: c.id, libelle: c.libelle || c.id }; });
    return CLASSES;
  }
  async function chargerAssignations(forcer){
    if(!forcer && Date.now() - ASSIGN_A < 30000) return ASSIGNATIONS;
    const r = await fetchJSON(LABORO_API + '/api/mission-du-jour/toutes', { headers: entetes() });
    if(r.ok && r.data && r.data.ok){ ASSIGNATIONS = r.data.assignations || []; ASSIGN_A = Date.now(); if(typeof DASH_ENS_ASSIGNATIONS !== 'undefined') DASH_ENS_ASSIGNATIONS = ASSIGNATIONS; }
    return ASSIGNATIONS;
  }
  window.classeProf = function(){
    const v = lireLS('laboro_prof_classe', '');
    if(CLASSES.length){ if(CLASSES.some(function(c){ return c.libelle === v; })) return v; return CLASSES[0].libelle; }
    return v;
  };
  function classeProfId(){ const lib = window.classeProf(); const c = CLASSES.find(function(x){ return x.libelle === lib; }); return c ? c.id : ''; }
  function appliquerClasse(){
    const lib = window.classeProf();
    try{ if(typeof classeFiltre !== 'undefined') classeFiltre = lib; }catch(e){}
    try{ if(typeof groupeFiltre !== 'undefined') groupeFiltre = ''; }catch(e){}
    const sel = document.getElementById('ep-classe'); if(sel && sel.value !== lib) sel.value = lib;
  }
  window.epChoisirClasse = function(lib){
    ecrireLS('laboro_prof_classe', lib);
    appliquerClasse();
    const ouvert = document.querySelector('.panel.on');
    const id = ouvert ? ouvert.id.replace('panel-', '') : '';
    if(id === 'suivi' && typeof renderSuiviMissions === 'function') renderSuiviMissions();
    if(id === 'indicclasse' && typeof renderIndicateursClasse === 'function') renderIndicateursClasse();
    if(id === 'classe' && typeof afficherClasse === 'function'){ fermerFiche(); afficherClasse(); }
    if(id === 'pronote') renderPronote();
    if(id === 'recherche') marquerResultats();
    if(id === 'missiondujour' && typeof renderMDJPanel === 'function') renderMDJPanel();
  };
  function selecteurClasse(){
    let w = document.getElementById('ep-classe-wrap');
    if(!w){
      const tbT = document.getElementById('tb-t'); if(!tbT) return null;
      w = document.createElement('label');
      w.id = 'ep-classe-wrap'; w.className = 'ep-classe-wrap';
      w.innerHTML = 'Classe <select id="ep-classe" onchange="epChoisirClasse(this.value)"></select>';
      tbT.parentNode.insertBefore(w, tbT.nextSibling);
    }
    const sel = w.querySelector('select');
    sel.innerHTML = CLASSES.map(function(c){ return '<option value="' + esc(c.libelle) + '">' + esc(c.libelle) + '</option>'; }).join('');
    sel.value = window.classeProf();
    return w;
  }

  // ───────── Pages, onglets, menu ─────────
  const GROUPES = {
    auj:      { titre: "Aujourd'hui", pages: ['dashboard'], couleur: '#F59E0B' },
    classe:   { titre: 'Ma classe', pages: ['suivi', 'classe', 'indicclasse', 'pronote'], onglets: ['Suivi des missions', 'Élèves', 'Bilan', 'Notes → Pronote'], couleur: '#10B981', avecClasse: true },
    mission:  { titre: 'Donner une mission', pages: ['recherche', 'missiondujour', 'generation'], onglets: ['Chercher et assigner', 'Missions données', 'Générer une mission'], couleur: '#3B82F6', avecClasse: true },
    reglages: { titre: 'Réglages', pages: ['reglages', 'acceseleves', 'classesadmin', 'missions', 'catalogue', 'clients'], couleur: '#94A3B8' }
  };
  const SOUS_PAGES = { acceseleves: 'Horaires d\'accès des élèves', classesadmin: 'Gestion des classes', missions: 'Banque de missions', catalogue: 'Catalogue produits', clients: 'Fichier clients' };
  function groupeDe(id){ for(const g in GROUPES){ if(GROUPES[g].pages.indexOf(id) >= 0) return g; } return null; }
  let DERNIER_ONGLET = { classe: 'suivi', mission: 'recherche' };

  function itemNav(g){ return document.getElementById('ni-ep-' + g); }
  function construireMenu(){
    const nav = document.querySelector('.sb-nv'); if(!nav) return;
    Object.keys(GROUPES).forEach(function(g){
      let el = itemNav(g);
      if(!el){
        el = document.createElement('div');
        el.className = 'ni ep-ni'; el.id = 'ni-ep-' + g;
        el.setAttribute('data-menu-ens', '1'); el.setAttribute('data-menu-ep', '1');
        el.setAttribute('onclick', "epOuvrir('" + g + "')");
        el.innerHTML = '<div class="nd" style="background:' + GROUPES[g].couleur + '"></div><span class="ep-ni-lib">' + GROUPES[g].titre + '</span><span class="ep-badge" style="display:none"></span>';
      }
      nav.appendChild(el);
    });
    // Tout le reste du menu est masqué (les pages restent accessibles par les onglets)
    Array.from(nav.children).forEach(function(el){ if(!el.hasAttribute('data-menu-ep')) el.style.display = 'none'; else el.style.display = ''; });
    Object.keys(GROUPES).forEach(function(g){ nav.insertBefore(itemNav(g), null); });
    // Bouton « Voir comme un élève » en bas du menu
    const bas = document.querySelector('.sb-bt');
    if(bas && !document.getElementById('ep-btn-vue-eleve')){
      const b = document.createElement('button');
      b.id = 'ep-btn-vue-eleve'; b.type = 'button'; b.className = 'ep-btn-vue-eleve';
      b.textContent = '👁 Voir comme un élève';
      b.onclick = function(){ window.epVueEleve(); };
      bas.insertBefore(b, bas.firstChild);
    }
    const bv = document.getElementById('ep-btn-vue-eleve'); if(bv) bv.style.display = '';
  }
  function masquerMenuProf(){
    document.querySelectorAll('[data-menu-ep]').forEach(function(el){ el.style.display = 'none'; });
    const bv = document.getElementById('ep-btn-vue-eleve'); if(bv) bv.style.display = 'none';
    const w = document.getElementById('ep-classe-wrap'); if(w) w.style.display = 'none';
  }
  window.epOuvrir = function(g){
    const page = g === 'classe' || g === 'mission' ? DERNIER_ONGLET[g] : GROUPES[g].pages[0];
    goP(page, itemNav(g));
  };

  function barreOnglets(id){
    const g = groupeDe(id), G = GROUPES[g];
    const panneau = document.getElementById('panel-' + id); if(!panneau) return;
    let b = panneau.querySelector(':scope > .ep-onglets');
    if(G && G.onglets){
      if(!b){ b = document.createElement('div'); b.className = 'ep-onglets'; b.setAttribute('role', 'tablist'); panneau.insertBefore(b, panneau.firstChild); }
      b.innerHTML = G.pages.map(function(p, i){
        return '<button type="button" role="tab" class="ep-onglet' + (p === id ? ' on' : '') + '" aria-selected="' + (p === id) + '" onclick="goP(\'' + p + '\',document.getElementById(\'ni-ep-' + g + '\'))">' + G.onglets[i] + '</button>';
      }).join('');
    } else if(g === 'reglages' && id !== 'reglages'){
      if(!b){ b = document.createElement('div'); b.className = 'ep-onglets'; panneau.insertBefore(b, panneau.firstChild); }
      b.innerHTML = '<button type="button" class="ep-retour" onclick="epOuvrir(\'reglages\')">← Réglages</button><span class="ep-sous-titre">' + esc(SOUS_PAGES[id] || '') + '</span>';
    }
  }

  // Panneaux nouveaux : Notes → Pronote, Réglages
  function creerPanneaux(){
    const ref = document.getElementById('panel-dashboard'); if(!ref) return;
    ['pronote', 'reglages'].forEach(function(id){
      if(document.getElementById('panel-' + id)) return;
      const p = document.createElement('div'); p.id = 'panel-' + id; p.className = 'panel';
      p.innerHTML = '<div id="ep-' + id + '"></div>';
      ref.parentNode.appendChild(p);
    });
    construireReglages();
  }

  // goP enveloppé : menu actif, titre, onglets, classe, rendu des nouvelles pages
  if(typeof window.goP === 'function'){
    const origGoP = window.goP;
    window.goP = function(id, el){
      if(!estProf()) return origGoP.apply(this, arguments);
      const g = groupeDe(id);
      if(g === 'classe' || g === 'mission') DERNIER_ONGLET[g] = id;
      appliquerClasse();
      const r = origGoP.call(this, id, g ? itemNav(g) : el);
      if(g){
        document.getElementById('tb-t').textContent = GROUPES[g].titre;
        barreOnglets(id);
      }
      const w = document.getElementById('ep-classe-wrap');
      if(w) w.style.display = (g && GROUPES[g].avecClasse) ? '' : 'none';
      if(id === 'pronote') renderPronote();
      if(id === 'reglages') renderReglages();
      if(id === 'classe') preparerEleves();
      if(id === 'recherche') marquerResultats();
      if(id === 'missiondujour' && typeof accesMissionsRenderProf === 'function'){ /* la carte d'accès vit dans Réglages */ }
      return r;
    };
  }

  // ═════════════ AUJOURD'HUI ═════════════
  let PRONOTE = {};   // classe_id -> { mission_id: report }
  function faits(){ try{ return JSON.parse(lireLS('laboro_ep_faits', '{}')) || {}; }catch(e){ return {}; } }
  window.epTraite = function(cle){
    const f = faits(); f[cle] = aujourdhui();
    // on oublie ce qui a plus de 30 jours
    Object.keys(f).forEach(function(k){ if(f[k] < new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10)) delete f[k]; });
    ecrireLS('laboro_ep_faits', JSON.stringify(f));
    if(typeof renderDashboardEnseignant === 'function') renderDashboardEnseignant();
  };
  function ligneAFaire(cle, tag, couleur, texte, detail, boutons){
    return '<div class="ep-todo">'
      + '<span class="ep-tag ep-tag-' + couleur + '">' + tag + '</span>'
      + '<div class="ep-todo-txt"><div class="ep-todo-t">' + texte + '</div>' + (detail ? '<div class="ep-todo-d">' + detail + '</div>' : '') + '</div>'
      + '<div class="ep-todo-b">' + boutons + (cle ? '<button type="button" class="ep-btn2" onclick="epTraite(\'' + esc(cle) + '\')" title="Ne plus l\'afficher">Traité</button>' : '') + '</div>'
      + '</div>';
  }
  function donneesAujourdhui(){
    const f = faits();
    const eleves = sansComptesTest((typeof ELEVES_SERVEUR !== 'undefined' ? ELEVES_SERVEUR : []).filter(function(e){ return e.statut !== 'archive'; }));
    const items = [];
    const sousSeuil = {};   // classe -> [noms]
    const relance = {};     // classe -> [élèves]
    const limite = Date.now() - 7 * 864e5, limiteVerif = Date.now() - 14 * 864e5;
    eleves.forEach(function(e){
      const cls = e.classe_libelle || 'Sans classe';
      let derniere = dateS(e.derniere_activite);
      (PROGRESSIONS_BRUTES[e.id] || []).forEach(function(p){
        const d = dateS(p.submitted_at);
        if(d && (!derniere || d > derniere)) derniere = d;
        const traiteeParProf = !!p.note_modifiee_par;
        const n = noteDe(p);
        if(p.statut === 'a_examiner' && (p.tentatives || 0) >= 2 && !traiteeParProf){
          const cle = 'bloque|' + e.id + '|' + p.mission_id;
          if(!f[cle]) items.push({ ordre: 1, html: ligneAFaire(cle, 'Bloqué', 'rouge', esc(nomE(e)) + ' a utilisé ses 2 essais',
            '« ' + esc(titre(p.mission_id)) + ' » · ' + fmtNote(n) + '/20 · ' + esc(cls),
            '<button type="button" class="ep-btn" onclick="openCopie(\'' + esc(e.id) + '\',\'' + esc(p.mission_id) + '\')">Ouvrir la copie</button>') });
        } else if(p.statut === 'a_examiner' && (p.tentatives || 0) < 2){
          (sousSeuil[cls] = sousSeuil[cls] || []).push(nomE(e));
        }
        if(d && d.getTime() >= limiteVerif && !traiteeParProf && typeof raisonsVigilance === 'function'){
          const v = raisonsVigilance(p.integrite, p.alerte_ia);
          if(v.score >= 2){
            const cle = 'verif|' + e.id + '|' + p.mission_id + '|' + (p.tentatives || 0);
            if(!f[cle]) items.push({ ordre: 2, html: ligneAFaire(cle, 'À vérifier', 'orange', esc(nomE(e)) + ' : ' + esc(v.raisons.join(', ')),
              '« ' + esc(titre(p.mission_id)) + ' » · ' + esc(cls) + ' · lui demander d\'expliquer à l\'oral',
              '<button type="button" class="ep-btn" onclick="openCopie(\'' + esc(e.id) + '\',\'' + esc(p.mission_id) + '\')">Ouvrir la copie</button>') });
          }
        }
      });
      if(!derniere || derniere.getTime() < limite) (relance[cls] = relance[cls] || []).push(e);
    });
    Object.keys(sousSeuil).sort().forEach(function(cls){
      const l = sousSeuil[cls];
      const cle = 'seuil|' + cls + '|' + l.length + '|' + aujourdhui();
      if(!f[cle]) items.push({ ordre: 3, html: ligneAFaire(cle, 'Sous le seuil', 'ambre', l.length + ' copie' + (l.length > 1 ? 's' : '') + ' sous le seuil, 2<sup>e</sup> essai possible — ' + esc(cls),
        esc(l.slice(0, 6).join(', ')) + (l.length > 6 ? '…' : '') + ' · rien à faire, sauf si tu veux les encourager',
        '<button type="button" class="ep-btn2" onclick="epAllerClasse(\'' + esc(cls) + '\',\'suivi\')">Voir le suivi</button>') });
    });
    Object.keys(relance).sort().forEach(function(cls){
      const l = relance[cls];
      const cle = 'relance|' + cls + '|' + aujourdhui();
      if(!f[cle]) items.push({ ordre: 4, html: ligneAFaire(cle, 'À relancer', 'bleu', l.length + ' élève' + (l.length > 1 ? 's' : '') + ' sans activité depuis 7 jours — ' + esc(cls),
        esc(l.slice(0, 8).map(nomE).join(', ')) + (l.length > 8 ? '…' : ''),
        '<button type="button" class="ep-btn" onclick="epRelancer(\'' + esc(cls) + '\')">Envoyer un mémo</button>') });
    });
    items.sort(function(a, b){ return a.ordre - b.ordre; });
    return { items: items, eleves: eleves };
  }
  // Missions terminées et pas encore reportées dans Pronote (toutes les classes)
  async function lignePronote(){
    const zone = document.getElementById('ep-auj-pronote'); if(!zone) return;
    await chargerClasses();
    const parClasse = {};
    for(const c of CLASSES){
      const r = await fetchJSON(LABORO_API + '/api/pronote/' + encodeURIComponent(c.id), { headers: entetes() });
      if(!r.ok || !r.data || !r.data.ok){ if(r.status === 404) return; continue; }
      PRONOTE[c.id] = r.data.reports || {};
      const missions = missionsPronote(c.libelle);
      const aReporter = missions.filter(function(m){ return m.terminee && !(PRONOTE[c.id][m.mission_id] || {}).reporte_le; });
      if(aReporter.length) parClasse[c.libelle] = aReporter;
    }
    const f = faits();
    zone.innerHTML = Object.keys(parClasse).map(function(cls){
      const l = parClasse[cls];
      const cle = 'pronote|' + cls + '|' + l.map(function(m){ return m.mission_id; }).join(',');
      if(f[cle]) return '';
      return ligneAFaire(cle, 'Pronote', 'violet', 'Notes à reporter dans Pronote — ' + esc(cls),
        l.slice(0, 4).map(function(m){ return '« ' + esc(m.titre) + ' »'; }).join(', ') + (l.length > 4 ? '…' : ''),
        '<button type="button" class="ep-btn" onclick="epAllerClasse(\'' + esc(cls) + '\',\'pronote\')">Reporter</button>');
    }).join('');
    majBadge();
  }
  function majBadge(){
    const n = document.querySelectorAll('#dash-ens .ep-todo').length;
    const b = document.querySelector('#ni-ep-auj .ep-badge');
    if(b){ b.textContent = n; b.style.display = n ? '' : 'none'; }
    const vide = document.getElementById('ep-auj-vide'); if(vide) vide.style.display = n ? 'none' : '';
  }
  window.epAllerClasse = function(cls, page){ ecrireLS('laboro_prof_classe', cls); appliquerClasse(); goP(page, itemNav(groupeDe(page))); };
  window.epRelancer = async function(cls){
    ecrireLS('laboro_prof_classe', cls); appliquerClasse();
    goP('missiondujour', itemNav('mission'));
    if(typeof populateClasseSelects === 'function') await populateClasseSelects();
    if(typeof renderMDJPanel === 'function') renderMDJPanel();
    setTimeout(function(){
      const cl = document.getElementById('memo-cl'), zone = document.getElementById('memo-zone');
      if(cl){ const o = Array.from(cl.options).find(function(x){ return x.value && x.textContent.trim() === cls; }); if(o) cl.value = o.value; }
      if(zone) zone.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if(typeof memoChargerRelances === 'function') memoChargerRelances();
    }, 200);
  };
  function blocMissionsEnCours(){
    const enCours = (typeof DASH_ENS_ASSIGNATIONS !== 'undefined' ? DASH_ENS_ASSIGNATIONS : []).filter(function(a){ return !a.retiree_at && a.total > 0 && a.termines < a.total; });
    if(!enCours.length) return '';
    return '<div class="card ep-carte"><div class="ep-lab">Missions en cours</div>'
      + enCours.slice(0, 12).map(function(a){
          const pct = Math.round(a.termines / a.total * 100);
          const qui = a.cible === 'eleve' ? ((a.prenom || '') + ' ' + (a.nom || '')).trim() : ((a.classe_libelle || '') + (a.groupe ? ' · ' + a.groupe : ''));
          const maison = a.maison_jusqu_a ? ' · 🏠 jusqu\'au ' + jourCourt(dateS(a.maison_jusqu_a)) : '';
          return '<div class="ep-mission"><div class="ep-mission-t"><div class="ep-todo-t">' + esc(mission(a.mission_id) ? titre(a.mission_id) : (a.titre || a.mission_id)) + '</div>'
            + '<div class="ep-todo-d">' + puceProf(a) + ' ' + esc(qui) + ' · donnée ' + jourCourt(dateS(a.created_at)) + maison + '</div></div>'
            + '<div class="ep-barre"><div style="width:' + pct + '%"></div></div><span class="ep-barre-n">' + a.termines + ' / ' + a.total + '</span></div>';
        }).join('') + '</div>';
  }
  function contenuAujourdhui(){
    const d = donneesAujourdhui();
    const nbCls = new Set(d.eleves.map(function(e){ return e.classe_libelle; })).size;
    setTimeout(function(){ majBadge(); lignePronote(); }, 0);
    return '<p class="ep-resume">' + d.eleves.length + ' élève' + (d.eleves.length > 1 ? 's' : '') + ' dans ' + nbCls + ' classe' + (nbCls > 1 ? 's' : '') + '</p>'
      + '<div class="card ep-carte"><div class="ep-lab">À traiter</div>'
      + d.items.map(function(x){ return x.html; }).join('')
      + '<div id="ep-auj-pronote"></div>'
      + '<p id="ep-auj-vide" class="ep-vide" style="display:none">Rien à traiter. Bonne journée !</p></div>'
      + blocMissionsEnCours()
      + '<div style="text-align:right"><button type="button" class="ep-lien" onclick="actualiserDashboardEnseignant()">↻ Actualiser</button></div>';
  }
  if(typeof window.contenuDashboardEnseignant === 'function'){
    const origContenu = window.contenuDashboardEnseignant;
    window.contenuDashboardEnseignant = function(){
      if(!estProf()) return origContenu.apply(this, arguments);
      try{ return contenuAujourdhui(); }catch(e){ console.error('[espace prof] Aujourd\'hui', e); return origContenu.apply(this, arguments); }
    };
  }

  // ═════════════ MA CLASSE → ÉLÈVES (fiche élève) ═════════════
  function preparerEleves(){
    fiche();
    const p = document.getElementById('panel-classe'); if(!p || p.dataset.ep) { appliquerClasse(); return; }
    p.dataset.ep = '1';
    const gestion = p.querySelector(':scope > .card');      // « Gestion des élèves »
    if(gestion){
      gestion.classList.add('ep-gestion');
      const cols = gestion.querySelectorAll(':scope > div:nth-child(2) > div');
      const ajout = cols[0], actions = cols[1];
      // Les actions vont dans la fiche élève
      if(actions){ actions.classList.add('ep-actions'); document.getElementById('ep-fiche-actions').appendChild(actions); }
      // L'ajout d'un élève devient un bouton qui déplie le formulaire
      if(ajout){
        const boite = document.createElement('div'); boite.id = 'ep-ajout'; boite.className = 'card ep-carte'; boite.style.display = 'none';
        boite.appendChild(ajout);
        gestion.parentNode.insertBefore(boite, gestion);
      }
      gestion.style.display = 'none';
    }
    // Barre d'actions de la liste : ajouter, répartir, exporter
    const barre = Array.from(p.querySelectorAll(':scope > div')).find(function(d){ return d.querySelector('button[onclick="exporterClasse()"]'); });
    if(barre){
      barre.classList.add('ep-barre-eleves');
      barre.insertAdjacentHTML('afterbegin', '<button type="button" class="ep-btn2" onclick="var b=document.getElementById(\'ep-ajout\');b.style.display=b.style.display===\'none\'?\'\':\'none\'">+ Ajouter un élève</button>');
    }
    appliquerClasse();
    if(typeof afficherClasse === 'function') afficherClasse();
  }
  // Fiche élève : panneau à droite
  function fiche(){
    let f = document.getElementById('ep-fiche');
    if(!f){
      f = document.createElement('div'); f.id = 'ep-fiche'; f.className = 'ep-fiche-voile';
      f.innerHTML = '<aside class="ep-fiche" role="dialog" aria-label="Fiche élève"><div id="ep-fiche-corps"></div>'
        + '<div class="ep-lab" style="margin-top:18px">Actions</div><div id="ep-fiche-actions"></div></aside>';
      f.addEventListener('click', function(ev){ if(ev.target === f) fermerFiche(); });
      document.body.appendChild(f);
    }
    return f;
  }
  function fermerFiche(){ const f = document.getElementById('ep-fiche'); if(f) f.classList.remove('open'); }
  window.epFermerFiche = fermerFiche;
  function etatCopie(p){
    const n = noteDe(p);
    if(p.statut === 'valide') return { txt: fmtNote(n) + '/20', cl: 'ok' };
    if((p.tentatives || 0) >= 2) return { txt: fmtNote(n) + ' · fini', cl: 'ko' };
    if(p.statut === 'a_examiner') return { txt: fmtNote(n) + ' · 2e essai', cl: 'att' };
    return { txt: 'en cours', cl: 'neutre' };
  }
  function remplirFiche(e){
    const ps = (PROGRESSIONS_BRUTES[e.id] || []).filter(function(p){ return p.submitted_at || p.statut === 'valide'; })
      .sort(function(a, b){ return (dateS(b.submitted_at) || 0) - (dateS(a.submitted_at) || 0); });
    const valid = ps.filter(function(p){ return p.statut === 'valide'; });
    const moy = valid.length ? fmtNote(valid.reduce(function(s, p){ return s + (noteDe(p) || 0); }, 0) / valid.length) : '—';
    const ud = (typeof PROGRESSIONS_CLASSE !== 'undefined' && PROGRESSIONS_CLASSE[e.id]) || { missions: {} };
    const score = typeof calcScore === 'function' ? calcScore(ud) : 0;
    const act = dateS(e.derniere_activite);
    const comps = ['C1', 'C2', 'C3'].map(function(c){
      const n = typeof calcNiveauComp === 'function' ? calcNiveauComp(c, ud) : 0;
      return '<div class="ep-ligne-comp"><span>' + c + '</span>' + (typeof badgeNiveau === 'function' ? badgeNiveau(n) : n) + '</div>';
    }).join('');
    const nomAff = nomE(e).replace(/'/g, '');
    document.getElementById('ep-fiche-corps').innerHTML =
      '<div class="ep-fiche-tete"><div><div class="ep-fiche-nom">' + esc(nomE(e)) + (estCompteTest(e) ? ' <span class="ep-puce" style="background:#F3E8FF;color:#6B21A8">compte test</span>' : '') + '</div>'
      + '<div class="ep-todo-d">' + esc(e.classe_libelle || '') + (e.groupe ? ' · groupe ' + esc(e.groupe) : '') + ' · ' + esc(e.email || '') + ' · dernière activité ' + (act ? act.toLocaleDateString('fr-FR') : '—') + '</div></div>'
      + '<button type="button" class="ep-btn2" onclick="epFermerFiche()" aria-label="Fermer la fiche">Fermer</button></div>'
      + '<div class="ep-chiffres"><div><b>' + valid.length + '</b><span>missions validées</span></div><div><b>' + moy + '</b><span>moyenne</span></div><div><b>' + score + '</b><span>score LABORO</span></div></div>'
      + '<div class="ep-lab">Ses copies</div>'
      + (ps.length ? ps.map(function(p){
          const s = etatCopie(p);
          const mt = p.integrite && p.integrite.maitrise;
          const lab = mt === 'confirmee' ? '<span class="ep-maitrise ok">Maîtrise confirmée</span>' : (mt === 'a_verifier' ? '<span class="ep-maitrise ko">Maîtrise à vérifier</span>' : '');
          return '<div class="ep-copie"><div class="ep-copie-t"><div class="ep-todo-t">' + esc(titre(p.mission_id)) + '</div><div class="ep-todo-d">' + (p.submitted_at ? 'rendue ' + jourCourt(dateS(p.submitted_at)) : '') + ' ' + lab + '</div></div>'
            + '<span class="ep-case ep-case-' + s.cl + '">' + s.txt + '</span>'
            + '<button type="button" class="ep-btn2" onclick="openCopie(\'' + esc(e.id) + '\',\'' + esc(p.mission_id) + '\')">Copie</button></div>';
        }).join('') : '<p class="ep-todo-d">Aucune copie rendue pour l\'instant.</p>')
      + '<div class="ep-lab" style="margin-top:16px">Compétences</div>' + comps
      + '<div class="ep-fiche-btns"><button type="button" class="ep-btn" onclick="genererPortfolioEleveServeur(\'' + esc(e.id) + '\',\'' + esc(nomAff) + '\',\'' + esc(e.classe || '') + '\')">Imprimer la fiche</button>'
      + '<button type="button" class="ep-btn2" onclick="resetMdpEleve(\'' + esc(e.id) + '\',\'' + esc(nomAff) + '\')">Réinitialiser le mot de passe</button></div>';
  }
  if(typeof window.selectionnerEleve === 'function'){
    const origSel = window.selectionnerEleve;
    window.selectionnerEleve = function(id){
      const r = origSel.apply(this, arguments);
      if(estProf() && typeof SELECTED_ELEVE !== 'undefined' && SELECTED_ELEVE){
        fiche(); preparerEleves();
        remplirFiche(SELECTED_ELEVE);
        fiche().classList.add('open');
      }
      return r;
    };
  }

  // ═════════════ MA CLASSE → NOTES → PRONOTE ═════════════
  let PN = { mission: '', codeNonRendu: lireLS('laboro_pronote_nrdu', 'N.Rdu') };
  function concerne(a, e){
    if(a.cible === 'eleve') return String(a.eleve_id) === String(e.id);
    if(a.cible === 'groupe') return e.groupe === a.groupe;
    return true;
  }
  // Missions données à la classe (une ligne par mission), les plus récentes d'abord
  function missionsPronote(lib){
    const eleves = sansComptesTest((typeof ELEVES_SERVEUR !== 'undefined' ? ELEVES_SERVEUR : []).filter(function(e){ return e.statut !== 'archive' && e.classe_libelle === lib; }));
    const ids = {}; eleves.forEach(function(e){ ids[String(e.id)] = true; });
    const parM = {};
    ASSIGNATIONS.forEach(function(a){
      if(a.cible === 'eleve' ? !ids[String(a.eleve_id)] : (a.classe_libelle || a.classe_id) !== lib) return;
      (parM[a.mission_id] = parM[a.mission_id] || { mission_id: a.mission_id, titre: (mission(a.mission_id) ? titre(a.mission_id) : a.titre), assignations: [] }).assignations.push(a);
    });
    return Object.keys(parM).map(function(k){
      const m = parM[k];
      m.derniere = Math.max.apply(null, m.assignations.map(function(a){ return (dateS(a.created_at) || 0) - 0; }));
      m.active = m.assignations.some(function(a){ return !a.retiree_at; });
      const conc = eleves.filter(function(e){ return m.assignations.some(function(a){ return concerne(a, e); }); });
      const finis = conc.filter(function(e){ const p = (PROGRESSIONS_BRUTES[e.id] || []).find(function(x){ return x.mission_id === k; }); return p && (p.statut === 'valide' || (p.tentatives || 0) >= 2); });
      m.total = conc.length; m.finis = finis.length;
      m.terminee = !m.active || (conc.length > 0 && finis.length >= conc.length);
      return m;
    }).sort(function(a, b){ return b.derniere - a.derniere; });
  }
  function valeurPronote(e, m, codes){
    if(codes && codes[e.id]) return { val: codes[e.id], cl: 'code', manuel: true };
    if(!m.assignations.some(function(a){ return concerne(a, e); })) return { val: '—', cl: 'neutre', copie: '' };
    const p = (PROGRESSIONS_BRUTES[e.id] || []).find(function(x){ return x.mission_id === m.mission_id; });
    if(p && (p.statut === 'valide' || (p.tentatives || 0) >= 2)) return { val: fmtNote(noteDe(p)), cl: 'note', copie: fmtNote(noteDe(p)) };
    if(p && p.statut === 'a_examiner') return { val: 'En attente', cl: 'att', copie: '', aide: '2e essai encore possible' };
    if(m.active && !m.terminee) return { val: 'Pas rendue', cl: 'neutre', copie: '' };
    return { val: PN.codeNonRendu, cl: 'code', copie: PN.codeNonRendu };
  }
  async function renderPronote(){
    const z = document.getElementById('ep-pronote'); if(!z) return;
    const lib = window.classeProf(), cid = classeProfId();
    z.innerHTML = '<div class="card ep-carte ep-todo-d">⏳ Chargement des notes…</div>';
    if(typeof ELEVES_SERVEUR === 'undefined' || !ELEVES_SERVEUR.length || !Object.keys(PROGRESSIONS_BRUTES || {}).length){
      const r = await fetchJSON(LABORO_API + '/api/eleves', { headers: entetes() });
      if(r.ok && r.data.ok){ ELEVES_SERVEUR = r.data.eleves || []; await chargerProgressionsClasse(ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive'; })); }
    }
    await chargerAssignations();
    if(cid){
      const r = await fetchJSON(LABORO_API + '/api/pronote/' + encodeURIComponent(cid), { headers: entetes() });
      PRONOTE[cid] = (r.ok && r.data && r.data.ok) ? (r.data.reports || {}) : (PRONOTE[cid] || {});
    }
    dessinerPronote();
  }
  function dessinerPronote(){
    const z = document.getElementById('ep-pronote'); if(!z) return;
    const lib = window.classeProf(), cid = classeProfId();
    const missions = missionsPronote(lib);
    if(!missions.length){ z.innerHTML = '<div class="card ep-carte ep-todo-d">Aucune mission donnée à ' + esc(lib) + ' pour le moment.</div>'; return; }
    if(!missions.some(function(m){ return m.mission_id === PN.mission; })){
      const aRep = missions.find(function(m){ return m.terminee && !((PRONOTE[cid] || {})[m.mission_id] || {}).reporte_le; });
      PN.mission = (aRep || missions[0]).mission_id;
    }
    const reports = PRONOTE[cid] || {};
    const m = missions.find(function(x){ return x.mission_id === PN.mission; });
    const rep = reports[m.mission_id] || {};
    const eleves = sansComptesTest(ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive' && e.classe_libelle === lib; }))
      .sort(function(a, b){ return ((a.nom || '') + ' ' + (a.prenom || '')).localeCompare((b.nom || '') + ' ' + (b.prenom || ''), 'fr'); });
    const lignes = eleves.map(function(e){ return { e: e, v: valeurPronote(e, m, rep.codes) }; });
    z.innerHTML = '<div class="ep-pronote">'
      + '<div class="card ep-carte ep-pronote-g"><div class="ep-lab">1. Choisis le devoir</div>'
      + missions.map(function(x){
          const r = reports[x.mission_id] || {};
          const etat = r.reporte_le ? ['ok', 'Reportée dans Pronote' + (r.par ? ' (' + esc(r.par) + ')' : '')] : (x.terminee ? ['ko', 'À reporter'] : ['neutre', 'En cours : ' + x.finis + ' / ' + x.total + ' terminées']);
          return '<button type="button" class="ep-devoir' + (x.mission_id === PN.mission ? ' on' : '') + '" onclick="epPronoteMission(\'' + esc(x.mission_id) + '\')">'
            + '<span class="ep-todo-t">' + esc(x.titre) + '</span><span class="ep-devoir-etat ep-etat-' + etat[0] + '">' + etat[1] + '</span></button>';
        }).join('')
      + '<div class="ep-lab" style="margin-top:18px">Travail non rendu</div>'
      + '<div class="ep-choix">' + ['N.Rdu', 'N.Rdu*'].map(function(c){ return '<button type="button" class="' + (PN.codeNonRendu === c ? 'on' : '') + '" onclick="epPronoteCode(\'' + c + '\')">' + (c === 'N.Rdu*' ? 'N.Rdu* (= 0)' : c) + '</button>'; }).join('') + '</div>'
      + '<p class="ep-todo-d" style="margin-top:8px">Abs ou Nn : clique sur la valeur d\'un élève pour la changer (LABORO ne connaît pas les absences).</p></div>'
      + '<div class="card ep-carte ep-pronote-d">'
      + '<div class="ep-pronote-tete"><div><div class="ep-lab" style="margin-bottom:2px">2. Recopie dans Pronote</div><div class="ep-pronote-titre">' + esc(m.titre) + '</div>'
      + '<div class="ep-todo-d">' + esc(lib) + ' · ordre alphabétique, comme dans Pronote</div></div>'
      + '<button type="button" class="ep-btn2" onclick="epPronoteCopier()">Copier la colonne de notes</button></div>'
      + lignes.map(function(l){
          return '<div class="ep-pn-ligne"><span class="ep-pn-nom"><b>' + esc((l.e.nom || '').toUpperCase()) + '</b> ' + esc(l.e.prenom || '') + '</span>'
            + '<button type="button" class="ep-pn-val ep-pn-' + l.v.cl + '" title="' + esc(l.v.aide || 'Cliquer pour mettre Abs ou Nn') + '" onclick="epPronoteBascule(\'' + esc(l.e.id) + '\')">' + esc(l.v.val) + '</button></div>';
        }).join('')
      + '<p class="ep-todo-d" style="margin-top:10px">« En attente » : 2<sup>e</sup> essai encore possible, rien à reporter pour l\'instant. « Pas rendue » : la mission est encore en cours.</p>'
      + '<div class="ep-pronote-pied"><button type="button" class="ep-btn" onclick="epPronoteReporte(' + (!rep.reporte_le) + ')">' + (rep.reporte_le ? '✓ Reportée dans Pronote — annuler' : 'J\'ai reporté ces notes dans Pronote') + '</button>'
      + '<button type="button" class="ep-btn2" onclick="epPronoteExcel()">Télécharger le relevé Excel</button></div>'
      + '</div></div>';
    PN.lignes = lignes;
  }
  window.epPronoteMission = function(id){ PN.mission = id; dessinerPronote(); };
  window.epPronoteCode = function(c){ PN.codeNonRendu = c; ecrireLS('laboro_pronote_nrdu', c); dessinerPronote(); };
  window.epPronoteCopier = function(){
    const txt = (PN.lignes || []).map(function(l){ return l.v.copie != null ? l.v.copie : l.v.val; }).join('\n');
    const ok = function(){ if(typeof integMessage === 'function') integMessage('Colonne copiée : colle-la dans Pronote.'); else alert('Colonne copiée.'); };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, function(){ prompt('Copie ce texte :', txt); });
    else prompt('Copie ce texte :', txt);
  };
  async function enregistrerPronote(corps){
    const cid = classeProfId(); if(!cid) return;
    const r = await fetchJSON(LABORO_API + '/api/pronote/' + encodeURIComponent(cid) + '/' + encodeURIComponent(PN.mission), { method: 'PUT', headers: entetes(true), body: JSON.stringify(corps) });
    if(!r.ok || !r.data.ok){ alert(r.erreur || 'Enregistrement impossible.'); return; }
    const reports = PRONOTE[cid] = PRONOTE[cid] || {};
    const rep = reports[PN.mission] = reports[PN.mission] || {};
    rep.reporte_le = r.data.reporte_le; rep.codes = r.data.codes; rep.par = r.data.reporte_le ? (CU && CU.nom ? CU.nom.split(' ')[0] : '') : null;
    dessinerPronote();
  }
  window.epPronoteReporte = function(oui){ enregistrerPronote({ reporte: !!oui }); };
  window.epPronoteBascule = function(eid){
    const l = (PN.lignes || []).find(function(x){ return String(x.e.id) === String(eid); }); if(!l) return;
    const suite = { '': 'Abs', 'Abs': 'Nn', 'Nn': 'N.Rdu', 'N.Rdu': 'N.Rdu*', 'N.Rdu*': null };
    const actuel = l.v.manuel ? l.v.val : '';
    const codes = {}; codes[eid] = suite[actuel] === undefined ? null : suite[actuel];
    enregistrerPronote({ codes: codes });
  };
  // Relevé Excel (vrai fichier .xlsx, titres des missions en clair)
  window.epPronoteExcel = async function(){
    try{
      if(typeof XLSX === 'undefined'){
        await new Promise(function(ok, ko){ const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
      }
      const lib = window.classeProf(), cid = classeProfId();
      const missions = missionsPronote(lib).slice().reverse();
      const reports = PRONOTE[cid] || {};
      const eleves = sansComptesTest(ELEVES_SERVEUR.filter(function(e){ return e.statut !== 'archive' && e.classe_libelle === lib; }))
        .sort(function(a, b){ return ((a.nom || '') + ' ' + (a.prenom || '')).localeCompare((b.nom || '') + ' ' + (b.prenom || ''), 'fr'); });
      const lignes = [['Élève'].concat(missions.map(function(m){ return m.titre; }))];
      eleves.forEach(function(e){
        lignes.push([(e.nom || '').toUpperCase() + ' ' + (e.prenom || '')].concat(missions.map(function(m){
          const v = valeurPronote(e, m, (reports[m.mission_id] || {}).codes);
          const n = parseFloat(String(v.val).replace(',', '.'));
          return v.cl === 'note' && isFinite(n) ? n : (v.val === '—' ? '' : v.val);
        })));
      });
      const ws = XLSX.utils.aoa_to_sheet(lignes);
      ws['!cols'] = [{ wch: 28 }].concat(missions.map(function(){ return { wch: 22 }; }));
      ws['!freeze'] = { xSplit: 1, ySplit: 1 };
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, String(lib).slice(0, 30) || 'Classe');
      XLSX.writeFile(wb, 'LABORO-notes-' + String(lib).replace(/\s+/g, '_') + '-' + aujourdhui() + '.xlsx');
    }catch(e){ alert('Le fichier Excel n\'a pas pu être créé (connexion internet ?).'); }
  };

  // ═════════════ DONNER UNE MISSION ═════════════
  // « Déjà donnée par … » sur chaque résultat, et assignation sur place
  async function marquerResultats(){
    await chargerAssignations();
    const lib = window.classeProf();
    document.querySelectorAll('#rm-res .rm-donnee').forEach(function(s){
      const mid = s.getAttribute('data-mid');
      const as = ASSIGNATIONS.filter(function(a){ return a.mission_id === mid && (a.classe_libelle === lib || a.cible === 'eleve'); })
        .filter(function(a){ return a.cible !== 'eleve' || (typeof ELEVES_SERVEUR !== 'undefined' && ELEVES_SERVEUR.some(function(e){ return String(e.id) === String(a.eleve_id) && e.classe_libelle === lib; })); });
      if(!as.length){ s.innerHTML = ''; return; }
      const a = as[0];
      s.innerHTML = '<span class="ep-puce" style="' + styleProf(a.par_couleur) + '">Déjà donnée ' + (a.par_moi ? 'par toi' : (a.par_nom ? 'par ' + esc(a.par_nom) : '')) + ' le ' + jourCourt(dateS(a.created_at)) + (a.total ? ' · faite par ' + a.termines + '/' + a.total : '') + '</span> ';
    });
  }
  if(typeof window.lancerRechercheMissions === 'function'){
    const origRech = window.lancerRechercheMissions;
    window.lancerRechercheMissions = function(){ const r = origRech.apply(this, arguments); if(estProf()) marquerResultats(); return r; };
  }
  window.assignerMissionRecherche = async function(id){
    const btn = Array.from(document.querySelectorAll('#rm-res .rm-btn-p')).find(function(b){ return (b.getAttribute('onclick') || '').indexOf("'" + id + "'") >= 0; });
    const item = btn ? btn.closest('.rm-item') : null;
    if(!item){ return; }
    const deja = item.querySelector('.ep-assign'); if(deja){ deja.remove(); return; }
    await chargerClasses(); await chargerAssignations();
    const lib = window.classeProf(), cid = classeProfId();
    const eleves = sansComptesTest((typeof ELEVES_SERVEUR !== 'undefined' ? ELEVES_SERVEUR : []).filter(function(e){ return e.statut !== 'archive' && e.classe_libelle === lib; }));
    const aGroupes = eleves.some(function(e){ return !!e.groupe; });
    const autre = ASSIGNATIONS.find(function(a){ return a.mission_id === id && !a.retiree_at && a.classe_libelle === lib && !a.par_moi; });
    const moi = ASSIGNATIONS.find(function(a){ return a.mission_id === id && !a.retiree_at && a.classe_libelle === lib && a.par_moi; });
    const box = document.createElement('div'); box.className = 'ep-assign';
    box.innerHTML = (autre ? '<div class="ep-avert">' + esc(autre.par_nom || 'Ton collègue') + ' a déjà donné cette mission à ' + esc(lib) + ' le ' + jourCourt(dateS(autre.created_at)) + ' : ' + autre.termines + ' élève' + (autre.termines > 1 ? 's' : '') + ' sur ' + autre.total + ' l\'' + (autre.termines > 1 ? 'ont' : 'a') + ' faite. Assigner quand même ?</div>' : '')
      + (moi ? '<div class="ep-avert ep-avert-moi">Tu as déjà donné cette mission à ' + esc(lib) + ' le ' + jourCourt(dateS(moi.created_at)) + '.</div>' : '')
      + '<div class="ep-assign-ligne"><select class="ep-assign-cible" aria-label="Pour qui">'
      + '<option value="classe">Toute la classe ' + esc(lib) + '</option>'
      + (aGroupes ? '<option value="G1">Groupe G1</option><option value="G2">Groupe G2</option>' : '')
      + eleves.slice().sort(function(a, b){ return nomE(a).localeCompare(nomE(b), 'fr'); }).map(function(e){ return '<option value="e:' + esc(e.id) + '">' + esc(nomE(e)) + '</option>'; }).join('')
      + '</select>'
      + '<label class="ep-assign-maison"><input type="checkbox" class="ep-assign-m"> 🏠 À terminer à la maison jusqu\'au</label>'
      + '<input type="datetime-local" class="ep-assign-date" style="display:none">'
      + '<button type="button" class="ep-btn ep-assign-ok">Confirmer</button><span class="ep-assign-st ep-todo-d"></span></div>';
    item.appendChild(box);
    const cb = box.querySelector('.ep-assign-m'), dt = box.querySelector('.ep-assign-date');
    cb.onchange = function(){
      dt.style.display = cb.checked ? '' : 'none';
      if(cb.checked && !dt.value){ const d = new Date(Date.now() + 2 * 864e5); d.setHours(18, 0, 0, 0); dt.value = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); }
    };
    box.querySelector('.ep-assign-ok').onclick = async function(){
      const st = box.querySelector('.ep-assign-st'), v = box.querySelector('.ep-assign-cible').value;
      const corps = { mission_id: id };
      if(v.indexOf('e:') === 0) corps.eleve_id = v.slice(2); else { corps.classeCode = cid; if(v === 'G1' || v === 'G2') corps.groupe = v; }
      if(cb.checked){ if(!dt.value){ st.textContent = 'Choisis la date.'; return; } corps.maison_jusqu_a = new Date(dt.value).toISOString(); }
      this.disabled = true; st.textContent = 'Envoi…';
      const r = await fetchJSON(LABORO_API + '/api/mission-du-jour', { method: 'POST', headers: entetes(true), body: JSON.stringify(corps) });
      if(!r.ok || !r.data.ok){ this.disabled = false; st.textContent = '⚠️ ' + ((r.data && r.data.erreur) || r.erreur || 'Échec'); return; }
      box.innerHTML = '<div class="ep-assign-fait">✓ ' + (r.data.deja ? 'Elle était déjà donnée : rien n\'a changé' + (r.data.maison_maj ? ' (échéance « maison » mise à jour)' : '') : 'Mission donnée') + '.</div>';
      await chargerAssignations(true); marquerResultats();
      if(typeof DASH_ENS_CHARGE_A !== 'undefined') DASH_ENS_CHARGE_A = 0;
    };
  };

  // ═════════════ RÉGLAGES ═════════════
  function construireReglages(){
    const z = document.getElementById('ep-reglages'); if(!z || z.dataset.pret) return;
    z.dataset.pret = '1';
    z.innerHTML = '<div class="ep-reglages">'
      + '<div class="card ep-carte"><div class="ep-lab">Accès aux missions</div><div id="ep-reglages-acces"></div></div>'
      + '<div class="card ep-carte"><div class="ep-lab">Horaires d\'accès des élèves</div><p class="ep-todo-d">Horaires d\'ouverture, ouvertures et fermetures exceptionnelles d\'une journée.</p><button type="button" class="ep-btn2" onclick="goP(\'acceseleves\',document.getElementById(\'ni-ep-reglages\'))">Ouvrir les horaires</button></div>'
      + '<div class="card ep-carte"><div class="ep-lab">Crédit IA</div><div id="ep-credit" class="ep-credit">—</div>'
      + '<label class="ep-todo-d" style="display:flex;align-items:center;gap:8px;margin-top:10px">Alerte en haut de l\'écran sous <input id="ep-seuil" type="text" inputmode="decimal" style="width:70px"> $</label>'
      + '<button type="button" class="ep-btn2" style="margin-top:10px" onclick="if(typeof ouvrirCreditIA===\'function\')ouvrirCreditIA()">Détail et saisie du solde</button></div>'
      + '<div class="card ep-carte"><div class="ep-lab">Voir LABORO comme un élève</div><p class="ep-todo-d">Ouvre le compte test de la classe choisie, sans mot de passe. Un bandeau permet de revenir à la vue prof.</p><button type="button" class="ep-btn" onclick="epVueEleve()">Voir comme un élève</button></div>'
      + '<div class="card ep-carte"><div class="ep-lab">Missions et univers</div><div class="ep-liens">'
      + '<button type="button" class="ep-btn2" onclick="goP(\'missions\',document.getElementById(\'ni-ep-reglages\'))">Banque de missions</button>'
      + '<button type="button" class="ep-btn2" onclick="goP(\'catalogue\',document.getElementById(\'ni-ep-reglages\'))">Catalogue produits</button>'
      + '<button type="button" class="ep-btn2" onclick="goP(\'clients\',document.getElementById(\'ni-ep-reglages\'))">Fichier clients</button>'
      + '<button type="button" class="ep-btn2" onclick="if(typeof revoirObEns===\'function\')revoirObEns()">Guide de démarrage</button></div></div>'
      + '<div class="card ep-carte" id="ep-reglages-admin" style="display:none"><div class="ep-lab">Administration</div><button type="button" class="ep-btn2" onclick="goP(\'classesadmin\',document.getElementById(\'ni-ep-reglages\'))">Gestion des classes et des enseignants</button></div>'
      + '</div>';
    const s = z.querySelector('#ep-seuil');
    s.value = lireLS('laboro_seuil_credit', '5');
    s.onchange = function(){ const v = parseFloat(String(s.value).replace(',', '.')); if(isFinite(v) && v >= 0){ ecrireLS('laboro_seuil_credit', String(v)); if(typeof rafraichirCreditIA === 'function') rafraichirCreditIA(); renderReglages(); } };
  }
  function renderReglages(){
    construireReglages();
    const adm = document.getElementById('ep-reglages-admin');
    if(adm) adm.style.display = lireLS('laboro_est_admin', '0') === '1' ? '' : 'none';
    if(typeof accesMissionsRenderProf === 'function') accesMissionsRenderProf();
    const c = typeof creditIAActuel === 'function' ? creditIAActuel() : null;
    const el = document.getElementById('ep-credit');
    if(el) el.textContent = (c && c.ok && c.restant != null) ? '≈ ' + Number(c.restant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' $' : 'Solde pas encore saisi';
  }

  // ═════════════ VOIR COMME UN ÉLÈVE ═════════════
  const CLE_PROF = 'laboro_session_prof';
  window.epVueEleve = async function(){
    if(!estProf()) return;
    await chargerClasses();
    const lib = window.classeProf();
    let liste = (typeof ELEVES_SERVEUR !== 'undefined') ? ELEVES_SERVEUR : [];
    if(!liste.length){ const r = await fetchJSON(LABORO_API + '/api/eleves', { headers: entetes() }); if(r.ok && r.data.ok) liste = ELEVES_SERVEUR = r.data.eleves || []; }
    const test = liste.find(function(e){ return estCompteTest(e) && e.statut !== 'archive' && e.classe_libelle === lib; })
      || liste.find(function(e){ return estCompteTest(e) && e.statut !== 'archive'; });
    if(!test){ alert('Aucun compte test dans ' + lib + '. Crée un élève avec une adresse du type eleve.test@… dans Ma classe → Élèves, puis réessaie.'); return; }
    const r = await fetchJSON(LABORO_API + '/api/vue-eleve', { method: 'POST', headers: entetes(true), body: JSON.stringify({ eleve_id: test.id }) });
    if(!r.ok || !r.data.ok){ alert((r.data && r.data.erreur) || r.erreur || 'Impossible d\'ouvrir la vue élève (serveur pas encore à jour ?).'); return; }
    try{
      sessionStorage.setItem(CLE_PROF, JSON.stringify({ token: jeton(), u: lireLS('laboro_u', ''), admin: lireLS('laboro_est_admin', '0'), classe: test.classe_libelle || lib }));
    }catch(e){ alert('Ton navigateur bloque la mémoire de session : impossible d\'ouvrir la vue élève.'); return; }
    if(typeof closeMo === 'function') try{ closeMo(); }catch(e){}
    fermerFiche();
    const u = r.data.utilisateur;
    ecrireLS('laboro_token', r.data.token); ecrireLS('laboro_est_admin', '0');
    const nom = ((u.prenom || '') + ' ' + (u.nom || '')).trim() || u.email;
    CU = { mail: u.email, classe: u.classe || '', poste: 'Vue élève — ' + (test.classe_libelle || lib), nom: nom };
    ecrireLS('laboro_u', JSON.stringify(CU));
    try{ const s = gS(); if(!s[u.email]){ s[u.email] = { missions: {}, competences: {}, notes: {} }; sS(s); } }catch(e){}
    try{ sessionStorage.setItem('laboro_charte_' + u.email, '1'); }catch(e){}   // pas de charte à chaque essai
    showApp();
    goP('dashboard', document.querySelector('.sb-nv .ni'));
    bandeau();
  };
  window.epQuitterVueEleve = function(){
    let s = null; try{ s = JSON.parse(sessionStorage.getItem(CLE_PROF) || 'null'); }catch(e){}
    if(!s){ doLogout(); return; }
    if(typeof closeMo === 'function') try{ closeMo(); }catch(e){}
    try{ sessionStorage.removeItem(CLE_PROF); }catch(e){}
    ecrireLS('laboro_token', s.token); ecrireLS('laboro_est_admin', s.admin || '0'); ecrireLS('laboro_u', s.u);
    try{ CU = JSON.parse(s.u); }catch(e){}
    const b = document.getElementById('ep-bandeau-eleve'); if(b) b.remove();
    document.body.classList.remove('ep-vue-eleve');
    showApp();
    goP('dashboard', itemNav('auj'));
  };
  function bandeau(){
    let s = null; try{ s = JSON.parse(sessionStorage.getItem(CLE_PROF) || 'null'); }catch(e){}
    const b0 = document.getElementById('ep-bandeau-eleve');
    if(!s || estProf()){ if(b0) b0.remove(); document.body.classList.remove('ep-vue-eleve'); return; }
    document.body.classList.add('ep-vue-eleve');
    if(b0) return;
    const b = document.createElement('div');
    b.id = 'ep-bandeau-eleve'; b.setAttribute('role', 'status');
    b.innerHTML = '<span>👁 Tu vois LABORO comme un élève de <b>' + esc(s.classe || '') + '</b> (compte test). Rien de ce que tu fais ici ne compte dans les notes de la classe.</span>'
      + '<button type="button" onclick="epQuitterVueEleve()">Revenir à la vue prof</button>';
    document.body.appendChild(b);
  }
  // Une déconnexion pendant la vue élève ramène à la vue prof
  if(typeof window.doLogout === 'function'){
    const origOut = window.doLogout;
    window.doLogout = function(){
      let s = null; try{ s = sessionStorage.getItem(CLE_PROF); }catch(e){}
      if(s && !estProf()){ window.epQuitterVueEleve(); return; }
      return origOut.apply(this, arguments);
    };
  }

  // ═════════════ Branchement ═════════════
  if(typeof window.showApp === 'function'){
    const origShow = window.showApp;
    window.showApp = function(){
      const r = origShow.apply(this, arguments);
      try{
        if(estProf()){
          document.body.classList.add('ep');
          creerPanneaux();
          construireMenu();
          chargerClasses().then(function(){ selecteurClasse(); appliquerClasse(); const w = document.getElementById('ep-classe-wrap'); if(w){ const ouvert = document.querySelector('.panel.on'); const g = ouvert ? groupeDe(ouvert.id.replace('panel-', '')) : null; w.style.display = (g && GROUPES[g].avecClasse) ? '' : 'none'; } });
          chargerAssignations();
          const ouvert = document.querySelector('.panel.on');
          const id = ouvert ? ouvert.id.replace('panel-', '') : 'dashboard';
          goP(groupeDe(id) ? id : 'dashboard', null);
        } else {
          document.body.classList.remove('ep');
          masquerMenuProf();
        }
        bandeau();
      }catch(e){ console.error('[espace prof]', e); }
      return r;
    };
  }
})();
