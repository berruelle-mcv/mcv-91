// ============================================
//  LABORO — Serveur backend (Couche 3 : + authentification)
// ============================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const SECRET = process.env.JWT_SECRET;
const db = new Database(__dirname + '/data/laboro.db');
db.pragma('foreign_keys = ON');

// --- Test : serveur vivant ---
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'LABORO backend vivant 🚀', heure: new Date().toISOString() });
});

// --- Connexion (enseignant ou élève) ---
app.post('/api/login', (req, res) => {
  const { email, motDePasse } = req.body;
  if (!email || !motDePasse) {
    return res.status(400).json({ ok: false, erreur: 'Email et mot de passe requis' });
  }

  // On cherche d'abord parmi les enseignants, puis parmi les élèves
  let user = db.prepare('SELECT * FROM enseignants WHERE email = ?').get(email);
  let role = 'enseignant';
  if (!user) {
    user = db.prepare('SELECT * FROM eleves WHERE email = ?').get(email);
    role = 'eleve';
  }
  if (!user) {
    return res.status(401).json({ ok: false, erreur: 'Identifiants incorrects' });
  }

  // Vérification du mot de passe
  const ok = bcrypt.compareSync(motDePasse, user.mot_de_passe_hash);
  if (!ok) {
    return res.status(401).json({ ok: false, erreur: 'Identifiants incorrects' });
  }

// Récupérer la classe de l'élève (via classe_eleves -> classes -> parcours)
  let classeCode = null;
  if (role === 'eleve') {
    const c = db.prepare(`
      SELECT p.niveau, p.option
      FROM classe_eleves ce
      JOIN classes cl ON cl.id = ce.classe_id
      JOIN parcours p ON p.id = cl.parcours_id
      WHERE ce.eleve_id = ? AND ce.jusqu_a IS NULL
      LIMIT 1
    `).get(user.id);
    if (c) {
      const niveauMap = { '2nde': '2nde', '1ere': '1ere', 'Terminale': 'Term' };
      if (c.niveau === '2nde') classeCode = '2nde';
      else classeCode = (niveauMap[c.niveau] || c.niveau) + '-' + c.option;
    }
  } else {
    classeCode = 'enseignant';
  }
  // Création du jeton d'accès (valable 12h)
  const token = jwt.sign(
    { id: user.id, role, email: user.email },
    SECRET,
    { expiresIn: '12h' }
  );

  res.json({
    ok: true,
    token,
    utilisateur: {
      id: user.id, role, email: user.email,
      nom: user.nom, prenom: user.prenom,
      doit_changer_mdp: user.doit_changer_mdp,
classe: classeCode,
      est_admin: user.est_admin || 0
    }
  });
});

// --- Petit "videur" : vérifie le jeton sur les routes protégées ---
function verifierToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, erreur: 'Jeton manquant' });
  }
  try {
    req.utilisateur = jwt.verify(auth.slice(7), SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, erreur: 'Jeton invalide ou expiré' });
  }
}

// --- Route protégée de test : "qui suis-je ?" ---
app.get('/api/moi', verifierToken, (req, res) => {
  res.json({ ok: true, utilisateur: req.utilisateur });
});

// --- Liste des missions ---
app.get('/api/missions', (req, res) => {
  const missions = db.prepare('SELECT id, titre, comp_id, palier, option FROM missions ORDER BY id').all();
  res.json({ ok: true, total: missions.length, missions });
});

// --- Une mission complète ---
app.get('/api/missions/:id', (req, res) => {
  const m = db.prepare('SELECT * FROM missions WHERE id = ?').get(req.params.id);
  if (!m) return res.status(404).json({ ok: false, erreur: 'Mission introuvable' });
  const activites = db.prepare('SELECT * FROM activites WHERE mission_id = ? ORDER BY ordre').all(m.id);
  for (const act of activites) {
    act.questions = db.prepare('SELECT id, texte, ordre FROM questions WHERE activite_id = ? ORDER BY ordre').all(act.id);
  }
  const criteres = db.prepare('SELECT * FROM criteres WHERE mission_id = ? ORDER BY ordre').all(m.id);
  const dossier = db.prepare('SELECT * FROM dossiers WHERE mission_id = ?').get(m.id);
  if (dossier) {
    dossier.lignes = db.prepare('SELECT ligne, colonne, contenu FROM dossier_lignes WHERE dossier_id = ? ORDER BY ligne, colonne').all(dossier.id);
  }
  res.json({ ok: true, mission: m, activites, criteres, dossier });
});

// --- Missions d'un parcours ---
app.get('/api/parcours/:id', (req, res) => {
  const parcours = db.prepare('SELECT * FROM parcours WHERE id = ?').get(req.params.id);
  if (!parcours) return res.status(404).json({ ok: false, erreur: 'Parcours introuvable' });
  const missions = db.prepare(`
    SELECT m.id, m.titre, m.comp_id, m.palier, m.option, pm.ordre
    FROM parcours_missions pm JOIN missions m ON m.id = pm.mission_id
    WHERE pm.parcours_id = ? ORDER BY pm.ordre
  `).all(parcours.id);
  res.json({ ok: true, parcours, total: missions.length, missions });
});

// ============================================
//  Couche 4 : PROGRESSIONS (travail des élèves)
// ============================================

// --- Enregistrer / mettre à jour la réponse d'un élève à une mission ---
app.post('/api/progressions', verifierToken, (req, res) => {
  const { mission_id, reponses, statut } = req.body;
  const eleve_id = req.utilisateur.id;

  if (req.utilisateur.role !== 'eleve') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux élèves' });
  }
  if (!mission_id) {
    return res.status(400).json({ ok: false, erreur: 'mission_id requis' });
  }

  const reponsesJSON = reponses ? JSON.stringify(reponses) : null;
  const nouveauStatut = statut || 'wip';
  const submitted = nouveauStatut === 'soumis' ? new Date().toISOString() : null;

  // Existe-t-il déjà une progression pour cet élève sur cette mission ?
  const existante = db.prepare(
    'SELECT id FROM progressions WHERE eleve_id = ? AND mission_id = ?'
  ).get(eleve_id, mission_id);

  if (existante) {
    db.prepare(`UPDATE progressions
      SET reponses = ?, statut = ?, submitted_at = COALESCE(?, submitted_at)
      WHERE id = ?`).run(reponsesJSON, nouveauStatut, submitted, existante.id);
    return res.json({ ok: true, message: 'Progression mise à jour', id: existante.id });
  } else {
    const id = 'PROG_' + eleve_id + '_' + mission_id;
    db.prepare(`INSERT INTO progressions
      (id, eleve_id, mission_id, statut, reponses, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?)`).run(id, eleve_id, mission_id, nouveauStatut, reponsesJSON, submitted);
    return res.json({ ok: true, message: 'Progression créée', id });
  }
});

// --- Lire toutes les progressions de l'élève connecté ---
app.get('/api/progressions', verifierToken, (req, res) => {
  const eleve_id = req.utilisateur.id;
  const progs = db.prepare(
    'SELECT id, mission_id, statut, note_ia, note_finale, submitted_at FROM progressions WHERE eleve_id = ?'
  ).all(eleve_id);
  res.json({ ok: true, total: progs.length, progressions: progs });
});

// --- Lire la progression d'un élève sur UNE mission précise ---
app.get('/api/progressions/:mission_id', verifierToken, (req, res) => {
  const eleve_id = req.utilisateur.id;
  const prog = db.prepare(
    'SELECT * FROM progressions WHERE eleve_id = ? AND mission_id = ?'
  ).get(eleve_id, req.params.mission_id);
  if (!prog) return res.json({ ok: true, progression: null });
  if (prog.reponses) prog.reponses = JSON.parse(prog.reponses);
  res.json({ ok: true, progression: prog });
});
// ============================================
//  Couche 5 : CORRECTION IA (sécurisée — clé côté serveur)
// ============================================
// L'élève envoie ses réponses -> le serveur appelle l'IA avec SA clé
// (jamais exposée au navigateur) -> note + feedback -> sauvegarde en base.
app.post('/api/corriger', verifierToken, async (req, res) => {
  if (req.utilisateur.role !== 'eleve') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux élèves' });
  }
  const eleve_id = req.utilisateur.id;
  const { mission_id, reponses } = req.body;
  if (!mission_id || !reponses) {
    return res.status(400).json({ ok: false, erreur: 'mission_id et reponses requis' });
  }

  // 1. Charger la mission + ses critères depuis la base
  const mission = db.prepare('SELECT * FROM missions WHERE id = ?').get(mission_id);
  if (!mission) return res.status(404).json({ ok: false, erreur: 'Mission introuvable' });
  const criteres = db.prepare('SELECT critere, indicateur FROM criteres WHERE mission_id = ? ORDER BY ordre').all(mission_id);

  // 2. Déterminer le contexte (PVOC ou non) selon la classe de l'élève
  const classeRow = db.prepare(`
    SELECT p.option FROM classe_eleves ce
    JOIN classes cl ON cl.id = ce.classe_id
    JOIN parcours p ON p.id = cl.parcours_id
    WHERE ce.eleve_id = ? AND ce.jusqu_a IS NULL LIMIT 1
  `).get(eleve_id);
  const estPVOC = classeRow && classeRow.option === 'PVOC';
  const contexte = (estPVOC && mission.contexte_pvoc) ? mission.contexte_pvoc : mission.contexte;

  // 3. Récupérer le seuil de validation de la classe (défaut 11)
  const seuilRow = db.prepare(`
    SELECT cl.seuil_validation FROM classe_eleves ce
    JOIN classes cl ON cl.id = ce.classe_id
    WHERE ce.eleve_id = ? AND ce.jusqu_a IS NULL LIMIT 1
  `).get(eleve_id);
  const seuil = (seuilRow && seuilRow.seuil_validation) ? seuilRow.seuil_validation : 11;

  // 4. Construire le prompt de correction
  const paliers = ['', 'Débutant — guidé pas à pas', 'Apprenti — guidage partiel',
                   'Professionnel compétent — autonome et efficace', 'Professionnel performant — réflexivité et force de proposition'];
  const critTxt = criteres.length
    ? criteres.map(c => `- ${c.critere}${c.indicateur ? ' : ' + c.indicateur : ''}`).join('\n')
    : '(pas de critères spécifiques)';
  const repTxt = Array.isArray(reponses)
    ? reponses.join('\n\n')
    : Object.entries(reponses).map(([q, r]) => `${q}\nRéponse : ${r}`).join('\n\n');

  const prompt = `Tu es un enseignant expert en Bac Pro MCV. Voici une mission LABORO Sport & Outdoor (entreprise fictive, Évry-Courcouronnes 91).

Mission : ${mission.titre}
Compétence : ${mission.comp_id} — Palier ${mission.palier} (${paliers[mission.palier] || ''})
Contexte : ${contexte || ''}

Critères d'évaluation :
${critTxt}

Réponses de l'élève :
${repTxt}

Évalue de façon bienveillante et constructive. Réponds en français avec EXACTEMENT ce format :
NOTE: [entier de 0 à 20, seuil de validation = ${seuil}]
NIVEAU: [1=Débutant, 2=Apprenti, 3=Professionnel compétent, 4=Professionnel performant]
FEEDBACK:
[Feedback structuré, ce qui est bien, ce qui manque, conseils concrets. Conseil global pour finir.]`;

  // 5. Appeler l'API Anthropic avec la clé du SERVEUR
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const d = await r.json();
    if (d.error) {
      console.error('Erreur API Anthropic:', d.error);
      return res.status(502).json({ ok: false, erreur: "Erreur du service de correction. Réessaie." });
    }
    const txt = (d.content || []).map(b => b.text || '').join('') || '';

    // 6. Extraire note / niveau / feedback
    const noteM = txt.match(/NOTE:\s*(\d+)/);
    const niveauM = txt.match(/NIVEAU:\s*(\d)/);
    const fbM = txt.match(/FEEDBACK:\s*([\s\S]+)/);
    const note = noteM ? Math.min(20, parseInt(noteM[1])) : 10;
    const niveau = niveauM ? parseInt(niveauM[1]) : 1;
    const feedback = fbM ? fbM[1].trim() : txt;

    // 7. Appliquer la règle d'auto-validation
    const statut = note >= seuil ? 'valide' : 'a_examiner';
    const now = new Date().toISOString();
    const feedbackJSON = JSON.stringify({ note, niveau, texte: feedback });
    const reponsesJSON = JSON.stringify(reponses);

    // 8. Sauvegarder en base (créer ou mettre à jour)
    const existante = db.prepare('SELECT id FROM progressions WHERE eleve_id = ? AND mission_id = ?').get(eleve_id, mission_id);
    if (existante) {
      db.prepare(`UPDATE progressions
        SET reponses = ?, statut = ?, note_ia = ?, note_finale = ?, feedback_ia = ?, submitted_at = ?, validated_at = ?
        WHERE id = ?`).run(reponsesJSON, statut, note, note, feedbackJSON, now, statut === 'valide' ? now : null, existante.id);
    } else {
      const id = 'PROG_' + eleve_id + '_' + mission_id;
      db.prepare(`INSERT INTO progressions
        (id, eleve_id, mission_id, statut, reponses, note_ia, note_finale, feedback_ia, submitted_at, validated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(id, eleve_id, mission_id, statut, reponsesJSON, note, note, feedbackJSON, now, statut === 'valide' ? now : null);
    }

    // 9. Renvoyer le résultat au navigateur
    res.json({ ok: true, note, niveau, feedback, statut, seuil });

  } catch (e) {
    console.error('Erreur correction:', e);
    res.status(500).json({ ok: false, erreur: "Impossible de contacter le service de correction." });
  }
});

// ═══════════════════════════════════════════════════════════
//   Création d'un élève par un enseignant (+ rattachement classe)
//   Ajouté pour réparer le bouton "Ajouter cet élève".
// ═══════════════════════════════════════════════════════════
app.post('/api/eleves', verifierToken, (req, res) => {
  // Seul un enseignant peut créer un élève
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }

  const { nomComplet, email, classeCode } = req.body;
  if (!nomComplet || !email || !classeCode) {
    return res.status(400).json({ ok: false, erreur: 'Nom, email et classe sont obligatoires.' });
  }

  const classe_id = resoudreClasseId(classeCode);
  if (!classe_id) {
    return res.status(400).json({ ok: false, erreur: 'Classe inconnue : ' + classeCode });
  }
  const visibles = classesVisibles(req.utilisateur);
  if (visibles !== null && !visibles.includes(classe_id)) {
    return res.status(403).json({ ok: false, erreur: "Cette classe ne t'est pas attribuée." });
  }

  const classe = db.prepare('SELECT id, etablissement_id FROM classes WHERE id = ?').get(classe_id);
  if (!classe) {
    return res.status(400).json({ ok: false, erreur: "La classe n'existe pas encore en base." });
  }

  const emailNorm = String(email).trim().toLowerCase();
  const existe = db.prepare('SELECT id FROM eleves WHERE email = ?').get(emailNorm);
  if (existe) {
    return res.status(409).json({ ok: false, erreur: 'Un élève avec cet email existe déjà.' });
  }

  // "Nom Prénom" -> prénom = dernier mot, nom = le reste
  const parts = String(nomComplet).trim().split(/\s+/);
  const prenom = parts.length > 1 ? parts.pop() : parts[0];
  const nom = parts.length ? parts.join(' ') : String(nomComplet).trim();

  const motDePasseInitial = 'Laboro2025';
  const hash = bcrypt.hashSync(motDePasseInitial, 10);
  const id = 'ELV_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7).toUpperCase();

  try {
    const tx = db.transaction(() => {
      db.prepare(`INSERT INTO eleves
        (id, nom, prenom, email, mot_de_passe_hash, doit_changer_mdp, etablissement_id, statut)
        VALUES (?, ?, ?, ?, ?, 1, ?, 'actif')`)
        .run(id, nom, prenom, emailNorm, hash, classe.etablissement_id);
      db.prepare('INSERT INTO classe_eleves (classe_id, eleve_id) VALUES (?, ?)')
        .run(classe_id, id);
    });
    tx();
    return res.json({ ok: true, id, nom, prenom, email: emailNorm, classe: classeCode, motDePasseInitial });
  } catch (e) {
    console.error('Erreur création élève:', e);
    return res.status(500).json({ ok: false, erreur: "Impossible de créer l'élève." });
  }
});

// ═══════════════════════════════════════════════════════════
//   Liste des élèves (vue enseignant)
//   Renvoie tous les élèves avec leur classe décodée.
//   Filtré par cloisonnement : un enseignant non-admin ne voit que
//   les élèves des classes qui lui sont attribuées.
// ═══════════════════════════════════════════════════════════
app.get('/api/eleves', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  try {
    const visibles = classesVisibles(req.utilisateur);
    const rows = db.prepare(`
      SELECT e.id, e.nom, e.prenom, e.email, e.statut,
             cl.id AS classe_id, cl.libelle AS classe_libelle,
             p.niveau, p.option
      FROM eleves e
      LEFT JOIN classe_eleves ce ON ce.eleve_id = e.id AND ce.jusqu_a IS NULL
      LEFT JOIN classes cl ON cl.id = ce.classe_id
      LEFT JOIN parcours p ON p.id = cl.parcours_id
      ORDER BY e.nom, e.prenom
    `).all();

    const niveauMap = { '2nde': '2nde', '1ere': '1ere', 'Terminale': 'Term' };
    const eleves = rows
      .filter(r => visibles === null || (r.classe_id && visibles.includes(r.classe_id)))
      .map(function(r){
        // classeCode "historique" (ex: "1ere-AGEC") conservé pour compat (styles AGEC/PVOC du portfolio, filtres existants)
        let classeCode = null;
        if (r.niveau) {
          if (r.niveau === '2nde') classeCode = '2nde';
          else classeCode = (niveauMap[r.niveau] || r.niveau) + '-' + r.option;
        }
        return {
          id: r.id, nom: r.nom, prenom: r.prenom, email: r.email,
          statut: r.statut, classe_id: r.classe_id,
          classe: classeCode, classe_libelle: r.classe_libelle
        };
      });

    return res.json({ ok: true, total: eleves.length, eleves });
  } catch (e) {
    console.error('Erreur liste élèves:', e);
    return res.status(500).json({ ok: false, erreur: 'Impossible de lister les élèves.' });
  }
});

// ═══════════════════════════════════════════════════════════
//   Réinitialisation du mot de passe d'un élève (enseignant)
//   Remet le mot de passe par défaut + force le changement à la
//   prochaine connexion (doit_changer_mdp = 1).
// ═══════════════════════════════════════════════════════════
app.post('/api/eleves/reset-mdp', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const { eleve_id } = req.body;
  if (!eleve_id) {
    return res.status(400).json({ ok: false, erreur: 'eleve_id requis.' });
  }
  const eleve = db.prepare('SELECT id, nom, prenom, email FROM eleves WHERE id = ?').get(eleve_id);
  if (!eleve) {
    return res.status(404).json({ ok: false, erreur: 'Élève introuvable.' });
  }
  if (!verifierAccesEleve(req.utilisateur, eleve_id)) {
    return res.status(403).json({ ok: false, erreur: "Cet élève n'est pas dans une classe qui t'est attribuée." });
  }
  const MDP_DEFAUT = 'Laboro2025';
  const hash = bcrypt.hashSync(MDP_DEFAUT, 10);
  try {
    db.prepare('UPDATE eleves SET mot_de_passe_hash = ?, doit_changer_mdp = 1 WHERE id = ?')
      .run(hash, eleve_id);
    return res.json({ ok: true, prenom: eleve.prenom, nom: eleve.nom, email: eleve.email, motDePasse: MDP_DEFAUT });
  } catch (e) {
    console.error('Erreur reset mdp:', e);
    return res.status(500).json({ ok: false, erreur: 'Impossible de réinitialiser le mot de passe.' });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Serveur LABORO (couche 3 : auth) démarré sur le port ${PORT}`);
});

// ============================================
//  Couche 6 : MISSION DU JOUR (classe entière ou élève précis)
// ============================================
const MAP_CLASSES_MDJ = {
  '2nde':      'CLS_2026_FMRC1',
  '1ere-AGEC': 'CLS_2026_MCVA',
  '1ere-PVOC': 'CLS_2026_MCVB',
  'Term-AGEC': 'CLS_2026_MCVA',
  'Term-PVOC': 'CLS_2026_MCVB'
};

function dateDuJour() {
  return new Date().toISOString().slice(0, 10);
}

// --- Enseignant : assigner la mission du jour (classe OU élève) ---
app.post('/api/mission-du-jour', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const { classeCode, eleve_id, mission_id } = req.body;
  if (!mission_id || (!classeCode && !eleve_id) || (classeCode && eleve_id)) {
    return res.status(400).json({ ok: false, erreur: 'Choisis soit une classe, soit un élève, plus une mission.' });
  }
  const mission = db.prepare('SELECT id, titre FROM missions WHERE id = ?').get(mission_id);
  if (!mission) {
    return res.status(400).json({ ok: false, erreur: 'Mission introuvable : ' + mission_id });
  }
  const date_jour = dateDuJour();
  const visibles = classesVisibles(req.utilisateur);

  if (classeCode) {
    const classe_id = resoudreClasseId(classeCode);
    if (!classe_id) return res.status(400).json({ ok: false, erreur: 'Classe inconnue : ' + classeCode });
    if (visibles !== null && !visibles.includes(classe_id)) {
      return res.status(403).json({ ok: false, erreur: "Cette classe ne t'est pas attribuée." });
    }
    const id = 'MDJ_C_' + classe_id + '_' + date_jour;
    try {
      db.prepare(`INSERT INTO mission_du_jour (id, classe_id, mission_id, date_jour, assigned_by)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(classe_id, date_jour) WHERE classe_id IS NOT NULL
        DO UPDATE SET mission_id = excluded.mission_id, assigned_by = excluded.assigned_by`)
        .run(id, classe_id, mission_id, date_jour, req.utilisateur.id);
      return res.json({ ok: true, cible: 'classe', classe_id, mission_id, titre: mission.titre, date_jour });
    } catch (e) {
      console.error('Erreur assignation MDJ classe:', e);
      return res.status(500).json({ ok: false, erreur: "Impossible d'assigner la mission du jour." });
    }
  } else {
    const eleve = db.prepare('SELECT id, nom, prenom FROM eleves WHERE id = ?').get(eleve_id);
    if (!eleve) return res.status(400).json({ ok: false, erreur: 'Élève introuvable.' });
    if (!verifierAccesEleve(req.utilisateur, eleve_id)) {
      return res.status(403).json({ ok: false, erreur: "Cet élève n'est pas dans une classe qui t'est attribuée." });
    }
    const id = 'MDJ_E_' + eleve_id + '_' + date_jour;
    try {
      db.prepare(`INSERT INTO mission_du_jour (id, eleve_id, mission_id, date_jour, assigned_by)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(eleve_id, date_jour) WHERE eleve_id IS NOT NULL
        DO UPDATE SET mission_id = excluded.mission_id, assigned_by = excluded.assigned_by`)
        .run(id, eleve_id, mission_id, date_jour, req.utilisateur.id);
      return res.json({ ok: true, cible: 'eleve', eleve_id, nom: eleve.nom, prenom: eleve.prenom, mission_id, titre: mission.titre, date_jour });
    } catch (e) {
      console.error('Erreur assignation MDJ élève:', e);
      return res.status(500).json({ ok: false, erreur: "Impossible d'assigner la mission du jour." });
    }
  }
});

// --- Élève : MA mission du jour (priorité à l'assignation individuelle) ---
app.get('/api/mission-du-jour/moi', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'eleve') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux élèves.' });
  }
  const date_jour = dateDuJour();
  const indiv = db.prepare(`
    SELECT m.id AS mission_id, m.titre, m.comp_id, m.palier
    FROM mission_du_jour mdj JOIN missions m ON m.id = mdj.mission_id
    WHERE mdj.eleve_id = ? AND mdj.date_jour = ?
  `).get(req.utilisateur.id, date_jour);
  if (indiv) return res.json({ ok: true, mission: indiv, cible: 'eleve' });

  const classeRow = db.prepare(`
    SELECT cl.id FROM classe_eleves ce
    JOIN classes cl ON cl.id = ce.classe_id
    WHERE ce.eleve_id = ? AND ce.jusqu_a IS NULL LIMIT 1
  `).get(req.utilisateur.id);
  if (!classeRow) return res.json({ ok: true, mission: null });

  const declasse = db.prepare(`
    SELECT m.id AS mission_id, m.titre, m.comp_id, m.palier
    FROM mission_du_jour mdj JOIN missions m ON m.id = mdj.mission_id
    WHERE mdj.classe_id = ? AND mdj.date_jour = ?
  `).get(classeRow.id, date_jour);
  return res.json({ ok: true, mission: declasse || null, cible: declasse ? 'classe' : null });
});

// --- Enseignant : liste des missions du jour assignées aujourd'hui ---
app.get('/api/mission-du-jour/toutes', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const date_jour = dateDuJour();
  const visibles = classesVisibles(req.utilisateur);
  const parClasse = db.prepare(`
    SELECT mdj.classe_id, cl.libelle AS classe_libelle, mdj.mission_id, m.titre, m.comp_id, m.palier
    FROM mission_du_jour mdj
    JOIN missions m ON m.id = mdj.mission_id
    LEFT JOIN classes cl ON cl.id = mdj.classe_id
    WHERE mdj.classe_id IS NOT NULL AND mdj.date_jour = ?
  `).all(date_jour).filter(r => visibles === null || visibles.includes(r.classe_id));
  const parEleve = db.prepare(`
    SELECT mdj.eleve_id, e.nom, e.prenom, mdj.mission_id, m.titre, m.comp_id, m.palier
    FROM mission_du_jour mdj
    JOIN missions m ON m.id = mdj.mission_id
    JOIN eleves e ON e.id = mdj.eleve_id
    WHERE mdj.eleve_id IS NOT NULL AND mdj.date_jour = ?
  `).all(date_jour).filter(r => visibles === null || verifierAccesEleve(req.utilisateur, r.eleve_id));
  return res.json({ ok: true, date_jour, parClasse, parEleve });
});

// ============================================
//  Couche 7 : PORTFOLIO (progressions d'un élève) + CLASSEMENT
// ============================================

// --- Enseignant : progressions détaillées d'un élève (pour son portfolio) ---
app.get('/api/eleves/:id/progressions', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const eleve = db.prepare('SELECT id, nom, prenom FROM eleves WHERE id = ?').get(req.params.id);
  if (!eleve) return res.status(404).json({ ok: false, erreur: 'Élève introuvable.' });
  if (!verifierAccesEleve(req.utilisateur, eleve.id)) {
    return res.status(403).json({ ok: false, erreur: "Cet élève n'est pas dans une classe qui t'est attribuée." });
  }
  const progressions = db.prepare(
    'SELECT mission_id, statut, note_ia, note_finale, submitted_at, validated_at FROM progressions WHERE eleve_id = ?'
  ).all(eleve.id);
  res.json({ ok: true, eleve, progressions });
});

// --- Élève connecté : classement de SA classe (élèves + leurs progressions brutes) ---
// (le calcul du score reste côté client, comme pour le reste de la plateforme)
app.get('/api/classement/moi', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'eleve') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux élèves.' });
  }
  const classeRow = db.prepare(`
    SELECT cl.id FROM classe_eleves ce
    JOIN classes cl ON cl.id = ce.classe_id
    WHERE ce.eleve_id = ? AND ce.jusqu_a IS NULL LIMIT 1
  `).get(req.utilisateur.id);
  if (!classeRow) return res.json({ ok: true, classe_id: null, eleves: [] });
  const classe_id = classeRow.id;
  const eleves = db.prepare(`
    SELECT e.id, e.nom, e.prenom, e.email FROM eleves e
    JOIN classe_eleves ce ON ce.eleve_id = e.id AND ce.jusqu_a IS NULL
    WHERE ce.classe_id = ?
  `).all(classe_id);
  const progStmt = db.prepare('SELECT mission_id, statut, note_finale FROM progressions WHERE eleve_id = ?');
  const result = eleves.map(function(el){
    const missions = {};
    progStmt.all(el.id).forEach(function(p){
      missions[p.mission_id] = { statut: p.statut, score: p.note_finale };
    });
    return { id: el.id, nom: el.nom, prenom: el.prenom, email: el.email, missions };
  });
  res.json({ ok: true, classe_id, eleves: result });
});

// ============================================
//  Couche 8 : CHANGEMENT DE MOT DE PASSE (élève ou enseignant)
// ============================================
app.post('/api/changer-mdp', verifierToken, (req, res) => {
  const { nouveauMdp } = req.body;
  if (!nouveauMdp || nouveauMdp.length < 6) {
    return res.status(400).json({ ok: false, erreur: 'Le nouveau mot de passe doit contenir au moins 6 caractères.' });
  }
  const table = req.utilisateur.role === 'enseignant' ? 'enseignants' : 'eleves';
  const hash = bcrypt.hashSync(nouveauMdp, 10);
  try {
    db.prepare('UPDATE ' + table + ' SET mot_de_passe_hash = ?, doit_changer_mdp = 0 WHERE id = ?')
      .run(hash, req.utilisateur.id);
    return res.json({ ok: true });
  } catch (e) {
    console.error('Erreur changement mdp:', e);
    return res.status(500).json({ ok: false, erreur: 'Impossible de changer le mot de passe.' });
  }
});

// ============================================
//  Couche 9 : Actions administratives sur un élève
//  (changer de classe, réinitialiser ses missions, archiver/supprimer)
// ============================================

// --- Changer la classe d'un élève (historise l'ancienne affectation) ---
app.put('/api/eleves/:id/classe', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const { classeCode } = req.body;
  const classe_id = resoudreClasseId(classeCode);
  if (!classe_id) {
    return res.status(400).json({ ok: false, erreur: 'Classe inconnue : ' + classeCode });
  }
  const eleve = db.prepare('SELECT id, nom, prenom FROM eleves WHERE id = ?').get(req.params.id);
  if (!eleve) return res.status(404).json({ ok: false, erreur: 'Élève introuvable.' });
  const visibles = classesVisibles(req.utilisateur);
  if (visibles !== null) {
    if (!verifierAccesEleve(req.utilisateur, eleve.id)) {
      return res.status(403).json({ ok: false, erreur: "Cet élève n'est pas dans une classe qui t'est attribuée." });
    }
    if (!visibles.includes(classe_id)) {
      return res.status(403).json({ ok: false, erreur: "La classe de destination ne t'est pas attribuée." });
    }
  }
  const now = new Date().toISOString();
  try {
    const tx = db.transaction(() => {
      db.prepare('UPDATE classe_eleves SET jusqu_a = ? WHERE eleve_id = ? AND jusqu_a IS NULL').run(now, eleve.id);
      db.prepare('INSERT INTO classe_eleves (classe_id, eleve_id) VALUES (?, ?)').run(classe_id, eleve.id);
    });
    tx();
    res.json({ ok: true, id: eleve.id, nom: eleve.nom, prenom: eleve.prenom, classe: classeCode });
  } catch (e) {
    console.error('Erreur changement de classe:', e);
    res.status(500).json({ ok: false, erreur: "Impossible de changer la classe de l'élève." });
  }
});

// --- Réinitialiser les missions d'un élève (efface ses progressions) ---
app.post('/api/eleves/:id/reinitialiser-missions', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const eleve = db.prepare('SELECT id, nom, prenom FROM eleves WHERE id = ?').get(req.params.id);
  if (!eleve) return res.status(404).json({ ok: false, erreur: 'Élève introuvable.' });
  if (!verifierAccesEleve(req.utilisateur, eleve.id)) {
    return res.status(403).json({ ok: false, erreur: "Cet élève n'est pas dans une classe qui t'est attribuée." });
  }
  try {
    const info = db.prepare('DELETE FROM progressions WHERE eleve_id = ?').run(eleve.id);
    res.json({ ok: true, id: eleve.id, nom: eleve.nom, prenom: eleve.prenom, supprimees: info.changes });
  } catch (e) {
    console.error('Erreur réinitialisation missions:', e);
    res.status(500).json({ ok: false, erreur: 'Impossible de réinitialiser les missions.' });
  }
});

// --- Archiver ou supprimer définitivement un élève ---
// Par défaut : archivage (statut='archive'), réversible, l'élève disparaît de la vue classe.
// Suppression définitive : si ?permanent=1, OU par défaut pour les comptes de test
// (email contenant "test"), sauf si ?permanent=0 est explicitement passé.
app.delete('/api/eleves/:id', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const eleve = db.prepare('SELECT id, nom, prenom, email FROM eleves WHERE id = ?').get(req.params.id);
  if (!eleve) return res.status(404).json({ ok: false, erreur: 'Élève introuvable.' });
  if (!verifierAccesEleve(req.utilisateur, eleve.id)) {
    return res.status(403).json({ ok: false, erreur: "Cet élève n'est pas dans une classe qui t'est attribuée." });
  }

  const estCompteTest = (eleve.email || '').toLowerCase().includes('test');
  let permanent;
  if (req.query.permanent === '1') permanent = true;
  else if (req.query.permanent === '0') permanent = false;
  else permanent = estCompteTest;

  try {
    if (permanent) {
      const tx = db.transaction(() => {
        db.prepare('DELETE FROM progressions WHERE eleve_id = ?').run(eleve.id);
        db.prepare('DELETE FROM mission_du_jour WHERE eleve_id = ?').run(eleve.id);
        db.prepare('DELETE FROM classe_eleves WHERE eleve_id = ?').run(eleve.id);
        db.prepare('DELETE FROM eleves WHERE id = ?').run(eleve.id);
      });
      tx();
      res.json({ ok: true, id: eleve.id, mode: 'supprime_definitivement' });
    } else {
      db.prepare("UPDATE eleves SET statut = 'archive' WHERE id = ?").run(eleve.id);
      res.json({ ok: true, id: eleve.id, mode: 'archive' });
    }
  } catch (e) {
    console.error('Erreur suppression élève:', e);
    res.status(500).json({ ok: false, erreur: "Impossible de supprimer l'élève." });
  }
});

// ============================================
//  Couche 10 : CLOISONNEMENT enseignant/classes + GESTION DES CLASSES (admin)
// ============================================

// S'assure que la table de rattachement enseignant <-> classe existe
// (idempotent : ne fait rien si elle existe déjà, aucun risque de perte de données)
db.exec(`CREATE TABLE IF NOT EXISTS enseignant_classes (
  enseignant_id TEXT NOT NULL REFERENCES enseignants(id),
  classe_id     TEXT NOT NULL REFERENCES classes(id),
  PRIMARY KEY (enseignant_id, classe_id)
)`);

// --- Un enseignant est-il administrateur ? (lu en base, jamais fait confiance au jeton seul) ---
function estAdmin(utilisateur) {
  if (!utilisateur || utilisateur.role !== 'enseignant') return false;
  const row = db.prepare('SELECT est_admin FROM enseignants WHERE id = ?').get(utilisateur.id);
  return !!(row && row.est_admin);
}

// --- Classes visibles par un enseignant : null = toutes (admin), sinon liste de classe_id ---
function classesVisibles(utilisateur) {
  if (estAdmin(utilisateur)) return null;
  const rows = db.prepare('SELECT classe_id FROM enseignant_classes WHERE enseignant_id = ?').all(utilisateur.id);
  return rows.map(r => r.classe_id);
}

// --- Un enseignant a-t-il le droit d'agir sur cet élève (via sa classe actuelle) ? ---
function verifierAccesEleve(utilisateur, eleve_id) {
  const visibles = classesVisibles(utilisateur);
  if (visibles === null) return true; // admin : accès total
  const row = db.prepare(`
    SELECT ce.classe_id FROM classe_eleves ce
    WHERE ce.eleve_id = ? AND ce.jusqu_a IS NULL LIMIT 1
  `).get(eleve_id);
  return !!(row && visibles.includes(row.classe_id));
}

// --- Résout un identifiant de classe envoyé par le front (ancien code "1ere-AGEC" OU
//     véritable classe_id "CLS_2026_MCVA") vers un classe_id réel garanti d'exister ---
function resoudreClasseId(valeur) {
  if (!valeur) return null;
  if (MAP_CLASSES_MDJ[valeur]) return MAP_CLASSES_MDJ[valeur];
  const existe = db.prepare('SELECT id FROM classes WHERE id = ?').get(valeur);
  return existe ? existe.id : null;
}

// --- Liste des classes ---
// Admin : toutes les classes + les enseignants qui y sont attribués.
// Non-admin : uniquement ses classes attribuées (pour peupler ses menus déroulants).
app.get('/api/classes', verifierToken, (req, res) => {
  if (req.utilisateur.role !== 'enseignant') {
    return res.status(403).json({ ok: false, erreur: 'Réservé aux enseignants.' });
  }
  const admin = estAdmin(req.utilisateur);
  const toutes = db.prepare(`
    SELECT cl.id, cl.libelle, cl.annee_scolaire, cl.seuil_validation,
           p.niveau, p.option, p.libelle AS parcours_libelle
    FROM classes cl
    JOIN parcours p ON p.id = cl.parcours_id
    ORDER BY p.niveau, p.option, cl.libelle
  `).all();

  if (!admin) {
    const visibles = classesVisibles(req.utilisateur);
    const classes = toutes.filter(c => visibles.includes(c.id));
    return res.json({ ok: true, classes });
  }

  const assignStmt = db.prepare(`
    SELECT en.id, en.nom, en.prenom FROM enseignant_classes ec
    JOIN enseignants en ON en.id = ec.enseignant_id
    WHERE ec.classe_id = ?
  `);
  const classes = toutes.map(c => ({ ...c, enseignants: assignStmt.all(c.id) }));
  res.json({ ok: true, classes });
});

// --- Liste des parcours existants (pour le formulaire de création de classe) ---
app.get('/api/parcours-liste', verifierToken, (req, res) => {
  if (!estAdmin(req.utilisateur)) {
    return res.status(403).json({ ok: false, erreur: 'Réservé à l\'administrateur.' });
  }
  const parcours = db.prepare('SELECT id, niveau, option, libelle FROM parcours ORDER BY niveau, option').all();
  res.json({ ok: true, parcours });
});

// --- Liste des enseignants (pour le formulaire d'attribution) ---
app.get('/api/enseignants', verifierToken, (req, res) => {
  if (!estAdmin(req.utilisateur)) {
    return res.status(403).json({ ok: false, erreur: 'Réservé à l\'administrateur.' });
  }
  const enseignants = db.prepare('SELECT id, nom, prenom, email, est_admin FROM enseignants ORDER BY nom, prenom').all();
  res.json({ ok: true, enseignants });
});

// --- Créer une nouvelle classe (admin uniquement) ---
app.post('/api/classes', verifierToken, (req, res) => {
  if (!estAdmin(req.utilisateur)) {
    return res.status(403).json({ ok: false, erreur: 'Réservé à l\'administrateur.' });
  }
  const { parcours_id, libelle, annee_scolaire, seuil_validation } = req.body;
  if (!parcours_id || !libelle) {
    return res.status(400).json({ ok: false, erreur: 'Parcours et libellé sont obligatoires.' });
  }
  const parcours = db.prepare('SELECT id FROM parcours WHERE id = ?').get(parcours_id);
  if (!parcours) {
    return res.status(400).json({ ok: false, erreur: 'Parcours introuvable : ' + parcours_id });
  }
  const admin = db.prepare('SELECT etablissement_id FROM enseignants WHERE id = ?').get(req.utilisateur.id);
  const etablissement_id = admin && admin.etablissement_id;
  if (!etablissement_id) {
    return res.status(400).json({ ok: false, erreur: "Établissement de l'administrateur introuvable." });
  }
  const id = 'CLS_' + new Date().getFullYear() + '_' + Math.random().toString(36).slice(2, 8).toUpperCase();
  try {
    db.prepare(`INSERT INTO classes (id, etablissement_id, parcours_id, annee_scolaire, libelle, seuil_validation)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .run(id, etablissement_id, parcours_id, annee_scolaire || '2026-2027', libelle, seuil_validation || 10);
    res.json({ ok: true, id, libelle });
  } catch (e) {
    console.error('Erreur création classe:', e);
    res.status(500).json({ ok: false, erreur: 'Impossible de créer la classe.' });
  }
});

// --- Attribuer une classe à un enseignant (admin uniquement) ---
app.post('/api/classes/:id/enseignants', verifierToken, (req, res) => {
  if (!estAdmin(req.utilisateur)) {
    return res.status(403).json({ ok: false, erreur: 'Réservé à l\'administrateur.' });
  }
  const { enseignant_id } = req.body;
  if (!enseignant_id) {
    return res.status(400).json({ ok: false, erreur: 'enseignant_id requis.' });
  }
  const classe = db.prepare('SELECT id FROM classes WHERE id = ?').get(req.params.id);
  if (!classe) return res.status(404).json({ ok: false, erreur: 'Classe introuvable.' });
  const enseignant = db.prepare('SELECT id FROM enseignants WHERE id = ?').get(enseignant_id);
  if (!enseignant) return res.status(404).json({ ok: false, erreur: 'Enseignant introuvable.' });
  try {
    db.prepare('INSERT OR IGNORE INTO enseignant_classes (enseignant_id, classe_id) VALUES (?, ?)')
      .run(enseignant_id, classe.id);
    res.json({ ok: true });
  } catch (e) {
    console.error('Erreur attribution classe:', e);
    res.status(500).json({ ok: false, erreur: "Impossible d'attribuer cette classe." });
  }
});

// --- Retirer l'attribution d'une classe à un enseignant (admin uniquement) ---
app.delete('/api/classes/:id/enseignants/:enseignantId', verifierToken, (req, res) => {
  if (!estAdmin(req.utilisateur)) {
    return res.status(403).json({ ok: false, erreur: 'Réservé à l\'administrateur.' });
  }
  try {
    db.prepare('DELETE FROM enseignant_classes WHERE classe_id = ? AND enseignant_id = ?')
      .run(req.params.id, req.params.enseignantId);
    res.json({ ok: true });
  } catch (e) {
    console.error('Erreur retrait attribution:', e);
    res.status(500).json({ ok: false, erreur: "Impossible de retirer cette attribution." });
  }
});
