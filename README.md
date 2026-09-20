LABORO MCV — Plateforme pédagogique immersive
Baccalauréat Professionnel MCV · Famille des Métiers de la Relation Client (FMRC)
> **LABORO** simule une entreprise fictive — LABORO Sport & Outdoor, basée à Évry-Courcouronnes (91) — dans laquelle les élèves accomplissent des missions professionnelles réelles, alignées sur les référentiels officiels et les épreuves CCF.
Démo en ligne → berruelle-mcv.github.io/mcv-91
---
🎯 Concept
L'élève ne fait pas des exercices — il est collaborateur d'une entreprise. Il répond à des clients, prospecte, prépare des argumentaires, analyse des indicateurs, gère un fichier clients et prépare ses épreuves CCF. Chaque mission est ancrée dans l'univers professionnel réel de sa filière.
Ce que voit l'élève avant chaque mission :
🎯 L'objectif pédagogique explicite ("Dans cette mission, tu vas...")
📋 La grille de critères d'évaluation avant de soumettre
📚 La ressource pédagogique complète, différenciée sur 4 paliers (bases → renforcement → arbitrage → mémo expert)
🪞 Une question de réflexivité précise et contextualisée (palier 3-4 uniquement, jamais en 2nde)
---
🏗️ Architecture — front-end + backend en production
Le front-end (GitHub Pages) est branché sur un vrai backend applicatif — Node.js/Express, base SQLite — hébergé sur un Raspberry Pi (service systemd, API à `mcv.laboro-edu.fr`). Ce n'est plus un prototype localStorage : comptes élèves/enseignants, mots de passe, progressions, notes et cloisonnement par classe sont gérés côté serveur. Le localStorage du navigateur ne sert plus qu'en repli (mode dégradé si le serveur est injoignable) et pour l'outil de test interne ("ana").
```
mcv-91/
├── index.html               # HTML — login, onboarding, app, vitrine prescripteurs
├── style.css                # Interface + variables CSS par niveau
├── README.md
├── data/
│   ├── missions.js          # 131 missions MCV + FMRC (objectifs, critères, dossiers, réflexivité)
│   ├── competences.js       # Référentiel (11 compétences) + 19 fiches ressources différenciées 4 paliers
│   ├── produits.js          # Catalogue produits + fichier clients (dont prospects)
│   ├── e2-agec.js           # Sujet E2 AGEC + corrigés
│   └── e2-pvoc.js           # Sujet E2 PVOC + corrigés
└── js/
    ├── app.js                # État global, Score LABORO, filtre compétences adaptatif
    ├── auth.js               # Connexion serveur, onboarding, raccourci de test "ana"
    ├── dashboard.js          # Dashboard élève, actus, KPI, badges de compétence
    ├── missions.js           # Modal mission, objectif, critères, réflexivité, calcul de niveau
    ├── correction-serveur.js # Soumission/correction IA d'une mission côté serveur
    ├── catalogue.js          # Rendu catalogue produits
    ├── clients.js            # Fichier clients, prospects, fiches produit
    ├── teacher.js            # Vue enseignant : "Mes compétences" (agrégée serveur), mission du jour
    ├── classe-serveur.js     # Vue classe complète (colonnes réelles, export CSV, analyse de classe,
    │                         # validation groupée des notes IA), actions élève (classe, reset, suppression)
    ├── portfolio.js          # Portfolio CCF auto-généré (élève et enseignant)
    ├── admin-classes.js      # Gestion des classes (admin) : créer/attribuer un enseignant/renommer/supprimer
    └── utils.js              # Utilitaires, vitrine prescripteurs
```
Stack front : Vanilla JS · HTML5 · CSS3 · GitHub Pages · 0 dépendance externe.
Stack back : Node.js · Express · better-sqlite3 · Raspberry Pi (systemd).
---
✅ Fonctionnalités
Fonctionnalité	Description
131 missions	2nde FMRC (31, dont 10 Accueil) · 1ère AGEC/PVOC (40/40) · Term. AGEC/PVOC (41/42)
Objectif explicite	Chaque mission affiche l'objectif pédagogique avant la mise en situation
Grille critères	Critères d'évaluation visibles par l'élève avant soumission
Réflexivité contextualisée	Question de réflexivité par compétence × palier, jamais avant le palier 3, jamais en 2nde
Ressources différenciées 4 paliers	Les 19 fiches ressources du référentiel proposent un contenu adapté à chaque palier (P1 bases → P4 mémo expert)
Correction IA	Soumission et correction automatique par IA, avec détection des réponses suspectes (`alerte_ia`)
Cloisonnement enseignant/classes	Chaque enseignant ne voit que les classes qui lui sont attribuées ; l'administrateur voit tout
Gestion des classes	Créer une classe, attribuer/retirer un enseignant (co-animation), renommer, supprimer
Vue classe	Colonnes de progression réelle par élève (C1/C2/C3/G4/Score/Posture/Missions/Moyenne), export CSV, analyse de classe (score moyen, répartition des niveaux, élèves en difficulté), validation groupée des notes IA ≥ 12/20
Mes compétences (enseignant)	Vue agrégée par compétence sur la classe réelle, alimentée par le serveur
Portfolio CCF	Auto-généré et imprimable par épreuve (E31/E32), impression E33 en préparation PFMP
Score LABORO	Score /100 pondéré (60% missions · 20% régularité · 20% progression), classement de classe
Préparation E2	Sujets fictifs AGEC + PVOC — corrigés masqués jusqu'à validation
Vitrine prescripteurs	Page de présentation avec ancres de navigation et mode démo
Sauvegarde/Restauration locale	Export/import JSON de la progression (repli si le serveur est injoignable)
---
📐 Structure pédagogique
Compétences couvertes
Bloc	Compétences	Niveaux	Option
C1 — Conseiller & vendre	C1.1 · C1.2 · C1.3	2nde → Terminale	Commun
C2 — Suivre la commande	C2.1 · C2.1b · C2.2 · C2.3	2nde → Terminale	Commun
C3 — Fidéliser	C3.1 · C3.2 · C3.3 · C3.3b	2nde → Terminale	Commun
C4A — Espace commercial	C4A.1 · C4A.2 · C4A.3	1ère → Terminale	AGEC uniquement
B4 — Prospection B2B	B4.1 → B4.5	1ère → Terminale	PVOC uniquement
ACC — Accueil	Parcours dédié (10 missions)	2nde FMRC	FMRC Accueil
Logique de réflexivité
Niveau	Palier 1-2	Palier 3-4
2nde	Aucune	Aucune (jamais, même en palier 3)
1ère	Aucune	Question guidée contextualisée
Terminale	Aucune	Question autonome contextualisée
---
🚀 Déploiement
```
Front (GitHub Pages)  : branche main, berruelle-mcv.github.io/mcv-91 — déploiement par upload manuel
Backend (Raspberry Pi): service systemd laboro-server.service, API mcv.laboro-edu.fr
```
---
🗺️ Roadmap
Étape	Statut
Prototype fonctionnel	✅
Architecture modulaire + config par référentiel	✅ Mai 2026
131 missions MCV + FMRC, objectifs + critères + réflexivité contextualisée	✅ Juin 2026
Backend Node.js/Express/SQLite en production (Raspberry Pi)	✅ Été 2026
Cloisonnement enseignant/classes + Gestion des classes	✅ Sept. 2026
Vue classe complète (colonnes réelles, export, analyse, validation groupée)	✅ Sept. 2026
Ressources pédagogiques différenciées sur 4 paliers (19/19 compétences)	✅ Sept. 2026
Audit complet plateforme (fond + forme + cohérence missions/ressources)	✅ Sept. 2026
Test terrain avec élèves réels	🔄 Rentrée 2026
Migration React + TypeScript	📋 Avec développeur, non prioritaire
Diffusion académique EAFC	📋 À planifier
---
⚠️ Dette technique connue
Priorité	Description
Faible	Styles inline restants dans certains fichiers JS
Faible	Contenu mineur à finaliser : quelques doublons de scénarios sur des missions B4.x, `README` à revoir à chaque évolution majeure
Décision produit en attente	Usage de noms d'entreprises/collectivités réelles (Stellantis, ArianeGroup, Safran, Thales, Mairie d'Évry) comme clients B2B fictifs — choix assumé par l'auteur, à date
---
🔮 Stack cible (si passage à un développeur professionnel)
Couche	Actuel	Cible envisagée
Frontend	Vanilla JS	React + TypeScript
Styles	CSS custom	Tailwind CSS
Backend	Node.js/Express/SQLite (Raspberry Pi)	Backend managé (Supabase ou équivalent), pour la scalabilité multi-établissement
Déploiement	GitHub Pages + Raspberry Pi	Vercel/hébergement managé
---
👤 Auteur
Pascal Berruelle — Enseignant PLP MCV · Académie de Versailles · Essonne (91)
Développé avec Claude AI (Anthropic)
---
📄 Droits & utilisation
© Pascal Berruelle 2026 — Tous droits réservés.
Ce projet est partagé à titre pédagogique. Toute réutilisation, adaptation ou diffusion sans autorisation explicite de l'auteur est interdite.
Pour toute demande : pascal.berruelle@ac-versailles.fr
