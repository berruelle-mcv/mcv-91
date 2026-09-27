// ================================================
//   LABORO — Moteur commun : « Trouver une mission » (enseignant)
//   Recherche par mot-clé dans tout le contenu des missions de l'univers
//   (titre, compétence, objectif, mise en situation, dossier, questions,
//   livrable, critères, fiche méthode du palier), avec synonymes du métier,
//   filtres (niveau / palier / compétence) et résultats classés.
//   Fonctionne sans serveur : les missions sont déjà dans data/missions.js.
//   Synonymes propres à un univers : LABORO_CONFIG.recherche_synonymes
//   (liste de groupes de mots équivalents), ajoutés à ceux ci-dessous.
// ================================================

// Groupes de mots équivalents (vocabulaire commercial commun à tous les univers).
// Un mot cherché qui appartient à un groupe trouve aussi les autres mots du groupe.
const RECHERCHE_SYNONYMES = [
  ['prospection', 'prospecter', 'prospect', 'démarchage', 'phoning', 'appel sortant', 'lead'],
  ['objection', 'frein', 'réfutation'],
  ['réclamation', 'plainte', 'litige', 'mécontentement', 'insatisfaction', 'mécontent'],
  ['fidélisation', 'fidéliser', 'fidélité', 'client fidèle', 'parrainage', 'carte de fidélité'],
  ['satisfaction', 'nps', 'enquête', 'avis client', 'questionnaire'],
  ['devis', 'proposition commerciale', 'offre chiffrée', 'cotation'],
  ['remise', 'réduction', 'rabais', 'ristourne', 'geste commercial'],
  ['marge', 'taux de marge', 'taux de marque', 'coefficient multiplicateur', "prix d'achat"],
  ['tva', 'hors taxes', 'toutes taxes', 'ht', 'ttc'],
  ['argumentaire', 'argumentation', 'argument', 'caractéristique avantage preuve', 'cap', 'bénéfice client'],
  ['découverte', 'besoins', 'besoin', 'questionnement', 'reformulation', 'écoute active', 'soncas'],
  ['accueil', 'accueillir', 'prise en charge'],
  ['téléphone', 'téléphonique', 'appel', 'appeler'],
  ['mail', 'courriel', 'e-mail', 'email', 'message écrit'],
  ['veille', 'concurrence', 'concurrent', 'concurrentielle', 'benchmark'],
  ['omnicanal', 'omnicanale', 'multicanal', 'canal', 'canaux', 'site web', 'e-commerce', 'click and collect', 'réseaux sociaux'],
  ['livraison', 'délai', 'retard', 'expédition', 'suivi de commande'],
  ['commande', 'bon de commande', 'suivi de commande'],
  ['financement', 'crédit', 'loa', 'lld', 'leasing', 'mensualité', 'location'],
  ['garantie', 'extension de garantie', 'service après-vente', 'sav'],
  ['crm', 'fichier clients', 'base de données', 'sic', 'qualification'],
  ['segmentation', 'segment', 'cible', 'ciblage', 'persona', 'typologie'],
  ['merchandising', 'implantation', 'linéaire', 'vitrine', 'balisage', 'plv', 'facing'],
  ['animation', 'événement', 'opération commerciale', 'portes ouvertes', 'salon'],
  ['stock', 'inventaire', 'réassort', 'rupture', 'réapprovisionnement'],
  ['indicateur', 'kpi', 'taux de transformation', 'taux de conversion', 'panier moyen', "chiffre d'affaires", 'ratio'],
  ['négociation', 'négocier', 'contrepartie'],
  ['encaissement', 'paiement', 'caisse', 'facture', 'moyen de paiement'],
  ['retour produit', 'remboursement', 'échange standard'],
  ['rendez-vous', 'rdv', 'agenda'],
  ['b2b', 'clientèle professionnelle', 'pme', 'artisan', 'collectivité', "comité d'entreprise"],
  ['vente additionnelle', 'vente complémentaire', 'montée en gamme', 'upselling', 'cross-selling'],
  ['e-réputation', 'avis en ligne', 'réseaux sociaux']
];

// Thèmes proposés quand la recherche est vide (un clic = une recherche)
const RECHERCHE_EXEMPLES = ['objection', 'réclamation', 'devis', 'fidélisation', 'prospection', 'satisfaction', 'marge', 'financement', 'téléphone', 'négociation'];

// Minuscules, sans accents, un caractère pour un caractère (les positions restent
// alignées sur le texte d'origine, pour surligner l'extrait).
function rmNorm(s){
  s = String(s == null ? '' : s);
  let out = '';
  for(let i = 0; i < s.length; i++){
    const c = s[i];
    if(c === 'œ' || c === 'Œ'){ out += 'o'; continue; }
    if(c === 'æ' || c === 'Æ'){ out += 'a'; continue; }
    const d = c.normalize('NFD')[0].toLowerCase();
    out += /[a-z0-9]/.test(d) ? d : ' ';
  }
  return out;
}
function rmSansHtml(s){ return String(s || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
function rmRacine(w){ return w.length > 4 ? w.replace(/(s|x)$/, '') : w; }
function rmEsc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

let RM_INDEX = null;   // index construit au premier usage
const RM_MOTS_VIDES = ['les','des','une','par','pour','avec','sur','dans','aux','est','qui','que','quoi','son','ses','leur','leurs','mon','mes','ton','tes','nos','vos','comment','faire','travailler','mission','missions','eleve','eleves'];

function rmChamps(m){
  const c = (typeof COMP !== 'undefined') ? COMP.find(function(x){ return x.code === m.comp; }) : null;
  let fiche = '';
  try { const r = (typeof getRes === 'function') ? getRes(m.comp, m.palier) : null; if(r) fiche = rmSansHtml((r.t || '') + ' ' + (r.c || '')); } catch(e) {}
  const questions = (m.activites || []).map(function(a){ return (a.t || '') + ' ' + (a.q || []).join(' '); }).join(' ');
  const dossier = m.dossier ? ((m.dossier.l || '') + ' ' + (m.dossier.rows || []).map(function(r){ return r.join(' '); }).join(' ')) : '';
  const criteres = (m.criteres || []).map(function(x){ return (x.c || '') + ' ' + (x.i || ''); }).join(' ');
  return [
    { nom: 'Titre',             poids: 5,   texte: m.titre || '' },
    { nom: 'Compétence',        poids: 3,   texte: (m.comp || '') + ' ' + (c ? c.label : '') + ' ' + (m.comp_libelle || '') },
    { nom: 'Objectif',          poids: 3,   texte: m.objectif || '' },
    { nom: 'Mise en situation', poids: 2,   texte: (m.contexte || '') + ' ' + (m.contexte_pvoc || '') },
    { nom: 'Questions',         poids: 2,   texte: questions },
    { nom: 'Livrable',          poids: 1.5, texte: m.livrable || '' },
    { nom: 'Critères',          poids: 1,   texte: criteres },
    { nom: 'Dossier',           poids: 1,   texte: dossier },
    { nom: 'Fiche méthode',     poids: 0.7, texte: fiche }
  ].map(function(f){ f.texte = rmSansHtml(f.texte); f.norm = ' ' + rmNorm(f.texte) + ' '; return f; });
}

function rmConstruireIndex(){
  if(RM_INDEX) return RM_INDEX;
  const groupes = RECHERCHE_SYNONYMES.concat((getCfg().recherche_synonymes) || [])
    .map(function(g){ return g.map(function(w){ return rmNorm(w).replace(/\s+/g, ' ').trim(); }).filter(Boolean); });
  const missions = (typeof MISSIONS !== 'undefined' ? MISSIONS : []).map(function(m){ return { m: m, champs: rmChamps(m) }; });
  // Expressions de plusieurs mots (les plus longues d'abord) et sigles de 2 lettres connus
  const expressions = [];
  const sigles = [];
  groupes.forEach(function(g){ g.forEach(function(w){ if(w.indexOf(' ') > 0 && expressions.indexOf(w) < 0) expressions.push(w); if(w.length === 2) sigles.push(w); }); });
  expressions.sort(function(a, b){ return b.length - a.length; });
  RM_INDEX = { groupes: groupes, missions: missions, expressions: expressions, sigles: sigles };
  return RM_INDEX;
}

// Un mot (ou expression) cherché → ses variantes : lui-même + ses synonymes
function rmVariantes(terme, groupes){
  const t = rmNorm(terme).replace(/\s+/g, ' ').trim();
  if(!t) return [];
  const r = rmRacine(t);
  const vars = [{ v: t, direct: true }];
  groupes.forEach(function(g){
    if(g.some(function(w){ return w === t || rmRacine(w) === r; })){
      g.forEach(function(w){ if(w !== t && !vars.some(function(x){ return x.v === w; })) vars.push({ v: w, direct: false }); });
    }
  });
  return vars;
}

// Position de la variante dans un texte normalisé : début de mot ; les mots courts
// (sigles : tva, nps, crm…) doivent correspondre au mot entier.
function rmTrouver(norm, v){
  const court = v.length < 4;
  const motif = ' ' + (court ? v + ' ' : rmRacine(v));
  const i = norm.indexOf(motif);
  return i < 0 ? -1 : i;   // index dans « norm » (qui commence par une espace)
}

function rechercherMissions(requete, filtres){
  const idx = rmConstruireIndex();
  const q = String(requete || '').trim();
  // Une expression entre guillemets reste groupée ; sinon mot par mot (mots de 2 lettres ignorés, sauf sigles connus)
  const termes = [];
  // 1. expressions entre guillemets ; 2. expressions connues du métier (« taux de marge »,
  // « appel sortant »…) gardées entières ; 3. le reste mot par mot, sans les petits mots.
  let reste = ' ' + rmNorm(q.replace(/"([^"]+)"/g, function(_, a){ termes.push(a.trim()); return ' '; })).replace(/\s+/g, ' ') + ' ';
  idx.expressions.forEach(function(e){
    if(reste.indexOf(' ' + e + ' ') >= 0){ termes.push(e); reste = reste.split(' ' + e + ' ').join(' '); }
  });
  reste.split(' ').forEach(function(w){
    if(!w || RM_MOTS_VIDES.indexOf(w) >= 0) return;
    if(w.length > 2 || /^[a-z0-9]{2}$/.test(w) && idx.sigles.indexOf(w) >= 0) termes.push(w);
  });
  const listeNiveau = (filtres && filtres.niveau && typeof listesMissionsClasse === 'function') ? listesMissionsClasse(filtres.niveau) : null;
  const res = [];
  idx.missions.forEach(function(e){
    const m = e.m;
    if(filtres){
      if(filtres.palier && String(m.palier) !== String(filtres.palier)) return;
      if(filtres.comp && m.comp !== filtres.comp) return;
      if(listeNiveau && listeNiveau.indexOf(m.id) === -1) return;
    }
    if(!termes.length){ res.push({ m: m, score: 0, trouves: 0, extrait: null }); return; }
    let score = 0, trouves = 0, directs = 0, meilleur = null;
    termes.forEach(function(t){
      const vars = rmVariantes(t, idx.groupes);
      let best = null;
      e.champs.forEach(function(f){
        vars.forEach(function(x){
          const pos = rmTrouver(f.norm, x.v);
          if(pos < 0) return;
          const s = f.poids * (x.direct ? 1 : 0.6);
          // le mot tel quel passe avant ses synonymes ; à égalité, le champ le plus important
          if(!best || (x.direct && !best.direct) || (x.direct === best.direct && s > best.s)) best = { s: s, champ: f, pos: pos, v: x.v, direct: x.direct };
        });
      });
      if(best){ score += best.s; trouves++; if(best.direct) directs++; if(!meilleur || (best.champ.nom !== 'Titre' && (meilleur.champ.nom === 'Titre' || best.s > meilleur.s))) meilleur = best; }
    });
    if(trouves) res.push({ m: m, score: score, trouves: trouves, directs: directs, extrait: meilleur });
  });
  res.sort(function(a, b){ return (b.trouves - a.trouves) || ((b.directs || 0) - (a.directs || 0)) || (b.score - a.score) || (a.m.palier - b.m.palier) || String(a.m.id).localeCompare(String(b.m.id)); });
  return { termes: termes, resultats: res };
}

// Extrait d'environ 160 caractères autour du mot trouvé, surligné
function rmExtrait(ex){
  if(!ex) return '';
  const txt = ex.champ.texte, norm = ex.champ.norm;
  const debutMot = ex.pos;                      // position dans norm (= position dans txt, décalée d'1)
  let fin = debutMot + 1 + ex.v.length;
  while(fin - 1 < txt.length && /[a-z0-9]/.test(norm[fin] || '')) fin++;   // jusqu'à la fin du mot
  const a = Math.max(0, debutMot - 70), b = Math.min(txt.length, fin - 1 + 90);
  return '<span style="font-weight:700;color:var(--gm)">' + rmEsc(ex.champ.nom) + ' · </span>'
    + (a > 0 ? '… ' : '') + rmEsc(txt.slice(a, debutMot))
    + '<mark style="background:#FDE68A;color:inherit;border-radius:3px;padding:0 2px">' + rmEsc(txt.slice(debutMot, fin - 1)) + '</mark>'
    + rmEsc(txt.slice(fin - 1, b)) + (b < txt.length ? ' …' : '');
}

// ── Écran « Trouver une mission » ──
function initRechercheMissions(){
  const selComp = document.getElementById('rm-comp');
  if(selComp && !selComp.options.length){
    const vues = {};
    const comps = [];
    (typeof MISSIONS !== 'undefined' ? MISSIONS : []).forEach(function(m){
      if(!m.comp || vues[m.comp]) return;
      vues[m.comp] = true;
      const c = (typeof COMP !== 'undefined') ? COMP.find(function(x){ return x.code === m.comp; }) : null;
      comps.push({ code: m.comp, label: c ? c.label : String(m.comp_libelle || m.comp).replace(/^[^—]*—\s*/, '') });
    });
    comps.sort(function(a, b){ return a.code.localeCompare(b.code, 'fr', { numeric: true }); });
    selComp.innerHTML = '<option value="">Toutes les compétences</option>' + comps.map(function(c){ return '<option value="' + rmEsc(c.code) + '">' + rmEsc(c.code + ' — ' + c.label) + '</option>'; }).join('');
  }
  const selPal = document.getElementById('rm-pal');
  if(selPal && !selPal.options.length){
    const pals = Array.from(new Set((typeof MISSIONS !== 'undefined' ? MISSIONS : []).map(function(m){ return m.palier; }))).sort();
    selPal.innerHTML = '<option value="">Tous les paliers</option>' + pals.map(function(p){ return '<option value="' + p + '">Palier ' + p + '</option>'; }).join('');
  }
  const selNiv = document.getElementById('rm-niv');
  if(selNiv && !selNiv.options.length){
    const niveaux = (getCfg().niveaux || []).filter(function(n){ const l = (typeof listesMissionsClasse === 'function') ? listesMissionsClasse(n.id) : null; return l && l.length; });
    selNiv.innerHTML = '<option value="">Tous les niveaux</option>' + niveaux.map(function(n){ return '<option value="' + rmEsc(n.id) + '">' + rmEsc(n.label) + '</option>'; }).join('');
    selNiv.style.display = niveaux.length > 1 ? '' : 'none';   // un seul niveau (ex. LABORO Auto) : filtre inutile
  }
  const ex = document.getElementById('rm-exemples');
  if(ex && !ex.innerHTML){
    ex.innerHTML = 'Exemples : ' + RECHERCHE_EXEMPLES.map(function(w){
      return '<button type="button" class="rm-chip" onclick="document.getElementById(\'rm-q\').value=this.textContent;lancerRechercheMissions()">' + rmEsc(w) + '</button>';
    }).join(' ');
  }
  lancerRechercheMissions();
  const q = document.getElementById('rm-q');
  if(q) setTimeout(function(){ q.focus(); }, 50);
}

function lancerRechercheMissions(){
  const zone = document.getElementById('rm-res');
  if(!zone) return;
  const qCourante = (document.getElementById('rm-q') || {}).value || '';
  if(zone.dataset.q !== qCourante){ zone.dataset.q = qCourante; zone.dataset.voirTout = ''; }
  const val = function(id){ const el = document.getElementById(id); return el ? el.value : ''; };
  const r = rechercherMissions(val('rm-q'), { palier: val('rm-pal'), comp: val('rm-comp'), niveau: val('rm-niv') });
  const info = document.getElementById('rm-info');
  const n = r.resultats.length;
  const complets = r.resultats.filter(function(x){ return x.trouves === r.termes.length; });
  const partiels = r.termes.length > 1 && complets.length ? n - complets.length : 0;
  if(info){
    if(!r.termes.length) info.textContent = n + ' mission' + (n > 1 ? 's' : '') + ' avec ces filtres. Tape un mot-clé pour chercher dans leur contenu.';
    else if(!n) info.textContent = 'Aucune mission ne correspond. Essaie un autre mot ou retire un filtre.';
    else if(r.termes.length === 1){
      const d = r.resultats.filter(function(x){ return x.directs; }).length;
      info.textContent = d + ' mission' + (d > 1 ? 's contiennent' : ' contient') + ' « ' + (val('rm-q').trim().replace(/"/g, '') || r.termes[0]) + ' »'
        + (n > d ? ', ' + (n - d) + ' autre' + (n - d > 1 ? 's' : '') + ' un mot voisin du métier (surligné)' : '') + '. Les plus pertinentes en premier.';
    }
    else info.textContent = (complets.length ? complets.length + ' mission' + (complets.length > 1 ? 's contiennent' : ' contient') + ' tous les mots' : 'Aucune mission ne contient tous les mots ; ' + n + ' en contiennent une partie')
      + (partiels ? ' ; ' + partiels + ' autre' + (partiels > 1 ? 's en contiennent' : ' en contient') + ' une partie' : '') + '. Synonymes du métier compris, les plus pertinentes en premier.';
  }
  const voirTout = zone.dataset.voirTout === '1';
  const liste = !r.termes.length ? r.resultats.slice(0, 60) : (partiels && !voirTout ? complets : r.resultats);
  zone.innerHTML = liste.map(function(x){
    const m = x.m;
    const partiel = r.termes.length > 1 && x.trouves < r.termes.length;
    return '<div class="rm-item">'
      + '<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap">'
      +   '<div style="min-width:0;flex:1">'
      +     '<div style="font-size:14px;font-weight:700;color:var(--gr)">' + rmEsc(m.titre) + '</div>'
      +     '<div style="font-size:11px;color:var(--gm);margin-top:3px">'
      +       '<span style="font-family:monospace;font-weight:700">' + rmEsc(m.id) + '</span> · '
      +       (typeof compBadge === 'function' ? compBadge(m.comp) : rmEsc(m.comp)) + ' · Palier ' + rmEsc(m.palier)
      +       (m.option && m.option !== 'PVOC' || (getCfg().options || []).length > 1 ? ' · ' + rmEsc(m.option) : '')
      +       (partiel ? ' · <span style="color:#B45309">' + x.trouves + ' mot' + (x.trouves > 1 ? 's' : '') + ' sur ' + r.termes.length + '</span>' : '')
      +     '</div>'
      +   '</div>'
      +   '<div style="display:flex;gap:6px;flex-shrink:0">'
      +     '<button type="button" class="rm-btn" onclick="voirMissionRecherche(\'' + rmEsc(m.id) + '\')">Voir</button>'
      +     '<button type="button" class="rm-btn rm-btn-p" onclick="assignerMissionRecherche(\'' + rmEsc(m.id) + '\')">Assigner →</button>'
      +   '</div>'
      + '</div>'
      + (x.extrait ? '<div style="font-size:12px;color:#374151;line-height:1.55;margin-top:8px">' + rmExtrait(x.extrait) + '</div>'
                   : (m.objectif ? '<div style="font-size:12px;color:#6B7280;line-height:1.55;margin-top:8px">' + rmEsc(m.objectif) + '</div>' : ''))
      + '</div>';
  }).join('')
    + (partiels && !voirTout ? '<button type="button" class="rm-btn" style="margin-top:4px" onclick="document.getElementById(\'rm-res\').dataset.voirTout=\'1\';lancerRechercheMissions()">Voir aussi les ' + partiels + ' missions qui ne contiennent qu\'une partie des mots</button>' : '')
    + (!r.termes.length && n > liste.length ? '<div style="font-size:12px;color:var(--gm);padding:8px 2px">… ' + (n - liste.length) + ' autres : précise la recherche ou les filtres.</div>' : '');
}

// Lire la mission telle que l'élève la voit
// Lire la mission telle que l'élève la voit, en aperçu : sans chrono ni boutons de copie
function voirMissionRecherche(id){
  if(typeof openMission !== 'function') return;
  openMission(id);
  if(typeof stopMoTimer === 'function') stopMoTimer();
  const mo = document.getElementById('mo');
  if(mo) mo.classList.add('mo-apercu');
  const meta = document.getElementById('mo-m');
  if(meta) meta.innerHTML += ' · <strong>Aperçu enseignant (lecture seule)</strong>';
}

// Ouvrir « Mission du jour » avec cette mission déjà choisie
function assignerMissionRecherche(id){
  goP('missiondujour', document.getElementById('ni-mdj'));
  let essais = 0;
  (function choisir(){
    const sel = document.getElementById('mdj-ms');
    if(sel && Array.from(sel.options).some(function(o){ return o.value === id; })){
      sel.value = id;
      const st = document.getElementById('mdj-st');
      if(st) st.textContent = 'Mission choisie : ' + id + '. Choisis la classe, le demi-groupe ou l\'élève, puis valide.';
      sel.scrollIntoView({ block: 'center' });
      return;
    }
    if(++essais < 20) setTimeout(choisir, 100);
  })();
}
