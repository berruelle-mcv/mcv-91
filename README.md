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
📚 La ressource pédagogique complète (méthodes, exemples, schémas)
🪞 Une question de réflexivité précise et contextualisée (palier 3-4)
---
🗂️ Filières
Config	Plateforme	Filière	Statut
`config.json`	LABORO MCV	Bac Pro MCV (AGEC + PVOC) + FMRC Accueil	✅ Complet
`config-mco.json`	LABORO MCO	BTS MCO	Structure prête
`config-epc.json`	LABORO EPC	CAP EPC	Structure prête
`config-ndrc.json`	LABORO NDRC	BTS NDRC	Structure prête
`config-immo.json`	LABORO IMMO	BTS PI	À créer
`config-banque.json`	LABORO BANQUE	BTS Banque	À créer
---
✅ Fonctionnalités (LABORO MCV)
Fonctionnalité	Description
130 missions	2nde FMRC (26), 1ère AGEC/PVOC (38/39), Term. AGEC/PVOC (40/41)
10 missions Accueil	Parcours FMRC complet — accueil physique, téléphonique, mail, groupe, publics spécifiques
Objectif explicite	Chaque mission affiche l'objectif pédagogique avant la mise en situation
Grille critères	Critères d'évaluation visibles par l'élève avant soumission (3 à 5 critères par mission)
Réflexivité contextualisée	Questions de réflexivité précises par compétence × palier (palier 3-4 uniquement)
Référentiel compétences	C1.1 → C4A.3 (AGEC) · B4.1 → B4.5 (PVOC) · ACC · ressources pédagogiques complètes
Filtre compétences adaptatif	Menu filtré selon la classe connectée (2nde/AGEC/PVOC)
Préparation E2	Sujets fictifs AGEC + PVOC — corrigés masqués jusqu'à validation
Portfolio CCF	Auto-généré et imprimable par épreuve (E31/E32/E33)
Dashboard élève	Score LABORO /100, paliers, compétences, KPI, classement
Sauvegarde/Restauration	Export/import JSON de progression entre postes (en attendant backend)
Fenêtre mission	Déplaçable, redimensionnable, minimisable, plein écran
Vue enseignant	Suivi classe, mission du jour, analytics, portfolio élève
Vitrine prescripteurs	Page de présentation avec ancres de navigation et mode démo
Config multi-filières	Moteur piloté par `config.json`
Gestion d'erreurs	Bandeau rouge si fichier non chargé
---
🏗️ Architecture
```
mcv-91/
├── config.json             # Config active LABORO MCV v1.0.0
├── config-mco.json         # Config BTS MCO
├── config-epc.json         # Config CAP EPC
├── config-ndrc.json        # Config BTS NDRC
├── index.html              # HTML — login, onboarding, app, vitrine prescripteurs
├── style.css               # Interface + variables CSS par niveau
├── README.md
├── data/
│   ├── missions.js         # 130 missions MCV + FMRC (enrichies objectifs + critères)
│   ├── competences.js      # Référentiel C1→C4A/B4/ACC + ressources pédagogiques
│   ├── produits.js         # 176 produits LABORO + 50 clients (11 catégories)
│   ├── e2-agec.js          # Sujet E2 AGEC + corrigés
│   └── e2-pvoc.js          # Sujet E2 PVOC + corrigés
└── js/
    ├── app.js              # État global, score, filtre compétences adaptatif
    ├── auth.js             # Login, onboarding, export/import progression
    ├── dashboard.js        # Dashboard, actus, KPI, classement
    ├── missions.js         # Modal mission, objectif, critères, réflexivité
    ├── catalogue.js        # Rendu catalogue produits
    ├── clients.js          # Clients, prospects, SIC, conversion
    ├── teacher.js          # Vue classe, enseignant, analytics
    └── utils.js            # Utilitaires, vitrine prescripteur
```
Stack : Vanilla JS · HTML5 · CSS3 · GitHub Pages · 0 dépendance externe · Syntaxe validée
---
📐 Structure pédagogique
Compétences couvertes
Bloc	Compétences	Niveaux	Option
C1 — Conseiller & vendre	C1.1 · C1.2 · C1.3	2nde → Terminale	Commun
C2 — Suivre la commande	C2.1 · C2.1b · C2.2 · C2.3	2nde → Terminale	Commun
C3 — Fidéliser	C3.1 · C3.2 · C3.3	2nde → Terminale	Commun
C4A — Espace commercial	C4A.1 · C4A.2 · C4A.3	1ère → Terminale	AGEC uniquement
B4 — Prospection B2B	B4.1 → B4.5	1ère → Terminale	PVOC uniquement
ACC — Accueil	ACC1 → ACC8	2nde FMRC	Accueil
Répartition des missions
Niveau	AGEC	PVOC	Total
2nde FMRC	—	—	26 missions (dont 10 ACC)
1ère	38	39	77 missions
Terminale	40	41	81 missions
Logique de réflexivité
Niveau	Palier 1-2	Palier 3-4
2nde	Aucune	Aucune
1ère	Aucune	Question guidée contextualisée
Terminale	Aucune	Question autonome contextualisée
---
⚙️ Système config.json
Le moteur lit `config.json` au démarrage et adapte automatiquement :
Nom de la plateforme (`LABORO MCV`, `LABORO MCO`...)
Entreprise fictive, personnages, couleurs
Niveaux, options, examens disponibles
Créer une nouvelle filière : dupliquer un `config-[filiere].json` + créer les fichiers `data/` correspondants.
---
🚀 Déploiement
```
Branche active   : main
URL production   : berruelle-mcv.github.io/mcv-91
Version          : v1.0.0
```
---
🗺️ Roadmap
Étape	Statut
Prototype fonctionnel	✅
Architecture modulaire	✅ Mai 2026
Système config.json multi-filières	✅ Mai 2026
130 missions MCV + FMRC	✅ Juin 2026
Objectif + critères sur toutes les missions	✅ Juin 2026
Réflexivité contextualisée par compétence	✅ Juin 2026
Filtre compétences adaptatif par niveau	✅ Juin 2026
Sauvegarde/restauration progression (JSON)	✅ Juin 2026
Parcours FMRC Accueil enrichi (10 missions)	✅ Juin 2026
Test terrain avec élèves	📋 Rentrée 2026
Migration backend (Supabase)	📋 Avec développeur
Migration React + TypeScript	📋 Avec développeur
Diffusion académique EAFC	📋 À planifier
---
⚠️ Dette technique connue
Priorité	Description
Haute	Persistence des données — localStorage lié à l'appareil (solution : backend Supabase)
Moyenne	Catalogue visuel — images produits à intégrer
Faible	Styles inline restants dans certains fichiers JS
---
🔮 Stack cible
Couche	Actuel	Cible
Frontend	Vanilla JS	React + TypeScript
Styles	CSS custom	Tailwind CSS
Backend	Aucun	Supabase
Déploiement	GitHub Pages	Vercel
---
👤 Auteur
Pascal Berruelle — Enseignant PLP MCV · Académie de Versailles · Essonne (91)  
Développé avec Claude AI (Anthropic)
Version 1.0.0 — Juin 2026
---
📄 Droits & utilisation
© Pascal Berruelle 2026 — Tous droits réservés.
Ce projet est partagé à titre pédagogique. Toute réutilisation, adaptation ou diffusion sans autorisation explicite de l'auteur est interdite.
Pour toute demande : pascal.berruelle@ac-versailles.fr
