LABORO — Plateforme pédagogique immersive
Baccalauréat Professionnel Métiers du Commerce et de la Vente
> **LABORO** simule une entreprise fictive dans laquelle les élèves de Bac Pro MCV accomplissent des missions professionnelles réelles, alignées sur le référentiel officiel et les épreuves CCF/E2.
Démo en ligne → berruelle-mcv.github.io/mcv-91
---
🎯 Concept
L'élève n'est pas en train de faire des exercices — il travaille dans une entreprise. Il répond à des clients, prépare des argumentaires, analyse des indicateurs, gère un fichier prospects, prépare ses épreuves CCF et E2. Tout est contextualisé dans l'univers professionnel réel du Bac Pro MCV.
---
✅ Fonctionnalités
Fonctionnalité	Description
51 missions	Couvrant 2nde, 1ère AGEC, 1ère PVOC, Term. AGEC, Term. PVOC
Compétences	Référentiel complet C1.1 → G4B + ACC avec ressources intégrées
Préparation E2	Sujets fictifs AGEC et PVOC au format officiel, avec corrigés
Portfolio CCF	Auto-généré et imprimable, structuré par épreuve (E31/E32/E33/E2)
Dashboard élève	Score, paliers, progression, indicateurs commerciaux
Gestion prospects	CRUD complet — créer, éditer, convertir, historique
Vue enseignant	Suivi classe, mission du jour assignable, analytics
Génération IA	Missions contextualisées générées via Claude API
Onboarding	Parcours immersif au premier lancement
Vitrine démo	Mode démonstration sans login
---
🏗️ Architecture
```
mcv-91/
├── index.html              # Coquille HTML — structure et navigation
├── style.css               # Interface complète
├── data/
│   ├── missions.js         # 51 missions MCV (AGEC + PVOC)
│   ├── competences.js      # Référentiel compétences + ressources
│   ├── catalogue.js        # Produits LABORO + clients + imprévus
│   ├── e2-agec.js          # Sujet E2 AGEC fictif + corrigés + rendus
│   └── e2-pvoc.js          # Sujet E2 PVOC fictif + corrigés + rendus
└── js/
    ├── app.js              # État global, score, classement, localStorage
    ├── auth.js             # Login, logout, onboarding
    ├── dashboard.js        # Dashboard élève/enseignant, actualités, KPI
    ├── missions.js         # Modal mission, paliers, coup de pouce
    ├── catalogue.js        # Rendu catalogue produits
    ├── clients.js          # Gestion clients et prospects
    ├── teacher.js          # Vue classe, indicateurs pédagogiques
    └── utils.js            # Fonctions utilitaires
```
Stack : Vanilla JS · HTML5 · CSS3 · GitHub Pages (statique, sans build)
---
🚀 Déploiement
Le projet est hébergé sur GitHub Pages — aucun serveur requis.
```
Branche active   : main
Branche stable   : stable-v1 (sauvegarde avant migration mai 2026)
URL production   : berruelle-mcv.github.io/mcv-91
```
Pour modifier et déployer : éditer les fichiers → commit sur `main` → GitHub Pages met à jour automatiquement (1–2 min).
---
🗺️ Roadmap
Étape	Statut
Prototype fonctionnel	✅ Terminé
Migration architecture modulaire	✅ Terminé (mai 2026)
Test terrain avec élèves	🔄 Prévu rentrée 2026
`config.json` multi-filières	📋 En cours
Migration React + Supabase	📋 À venir (avec développeur)
Extension CAP EPC, BTS MCO, BTS NDRC...	📋 Vision long terme
---
⚠️ Dette technique connue
Styles inline dans les rendus JS (à migrer vers classes CSS)
Pas de gestion d'erreurs si un fichier `data/` ne charge pas
`clients.js` encore dense (39 Ko) — à découper à terme
Pas de tests automatisés
---
🔮 Stack cible (industrialisation)
Couche	Actuel	Cible
Frontend	Vanilla JS	React + TypeScript
Styles	CSS custom	Tailwind CSS
Backend	Aucun	Supabase (PostgreSQL + Auth)
Déploiement	GitHub Pages	Vercel
---
👤 Auteur
Pascal Berruelle — Enseignant PLP Métiers du Commerce et de la Vente  
Académie de Versailles — Essonne (91)  
Développé en collaboration avec Claude AI (Anthropic)
---
Version 1.0 — Mai 2026 — Document confidentiel
