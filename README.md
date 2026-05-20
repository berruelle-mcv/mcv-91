LABORO — Plateforme pédagogique immersive
Moteur pédagogique multi-filières · Bac Pro & BTS tertiaires
> **LABORO** est un moteur pédagogique configurable qui simule une entreprise fictive dans laquelle les élèves accomplissent des missions professionnelles réelles, alignées sur les référentiels officiels.
Démo en ligne → berruelle-mcv.github.io/mcv-91
---
🎯 Concept
L'élève ne fait pas des exercices — il travaille dans une entreprise. Il répond à des clients, prépare des argumentaires, analyse des indicateurs, prépare ses épreuves CCF et E2. Tout est contextualisé dans l'univers professionnel réel de sa filière.
---
🗂️ Filières disponibles
Config	Plateforme	Filière	Statut
`config.json`	LABORO MCV	Bac Pro MCV (AGEC + PVOC)	✅ Complet
`config-mcv.json`	LABORO MCV	Bac Pro MCV (nomenclature v2)	✅ Prêt
`config-mco.json`	LABORO MCO	BTS MCO	🔄 Structure prête — contenu à développer
Filières en projet : LABORO NDRC · LABORO IMMO · LABORO BANQUE · LABORO ASSURANCE
---
✅ Fonctionnalités (LABORO MCV)
Fonctionnalité	Description
51 missions	2nde, 1ère AGEC/PVOC, Term. AGEC/PVOC
Compétences	Référentiel C1.1 → G4B + ACC avec ressources
Préparation E2	Sujets fictifs AGEC et PVOC + corrigés
Portfolio CCF	Auto-généré et imprimable par épreuve
Dashboard élève	Score, paliers, progression, KPI
Gestion prospects	CRUD complet
Vue enseignant	Suivi classe, mission du jour, analytics
Génération IA	Missions via Claude API
Config multi-filières	Moteur piloté par config.json
Gestion d'erreurs	Bandeau rouge si fichier non chargé
Versioning	v1.0.0 affiché depuis config.json
---
🏗️ Architecture
```
mcv-91/
├── config.json             # Config active — LABORO MCV
├── config-mcv.json         # Config MCV (nomenclature v2)
├── config-mco.json         # Config BTS MCO (structure prête)
├── index.html              # HTML pur — 66 Ko
├── style.css               # Interface + classes utilitaires
├── README.md
├── data/
│   ├── missions.js         # 51 missions MCV
│   ├── competences.js      # Référentiel + ressources
│   ├── catalogue.js        # Produits + clients + imprévus
│   ├── e2-agec.js          # Sujet E2 AGEC + corrigés
│   └── e2-pvoc.js          # Sujet E2 PVOC + corrigés
└── js/
    ├── app.js              # État global, score, getCfg()
    ├── auth.js             # Login, logout, onboarding
    ├── dashboard.js        # Dashboard, actus, KPI
    ├── missions.js         # Modal mission, paliers
    ├── catalogue.js        # Rendu catalogue
    ├── clients.js          # Clients et prospects
    ├── teacher.js          # Vue classe, enseignant
    └── utils.js            # Utilitaires
```
Stack : Vanilla JS · HTML5 · CSS3 · GitHub Pages (statique, sans build)
---
⚙️ Système de configuration filière
Le moteur lit `config.json` au démarrage et adapte automatiquement :
Nom de la plateforme (`LABORO MCV`, `LABORO MCO`...)
Nom et ville de l'entreprise fictive
Personnages (responsable, tutrice)
Niveaux et options disponibles
Couleurs et identité visuelle
Fichiers de données à charger
Créer une nouvelle filière : dupliquer un `config-[filiere].json` + créer les fichiers `data/` correspondants.
---
🚀 Déploiement
```
Branche active   : main
Branche stable   : stable-v1 (sauvegarde avant migration mai 2026)
URL production   : berruelle-mcv.github.io/mcv-91
Version          : v1.0.0
```
---
🗺️ Roadmap
Étape	Statut
Prototype fonctionnel	✅
Migration architecture modulaire	✅ Mai 2026
Système config.json multi-filières	✅ Mai 2026
Classes CSS utilitaires	✅ Mai 2026
Gestion d'erreurs	✅ Mai 2026
Test terrain avec élèves	🔄 Rentrée 2026
Réparation bugs mineurs	🔄 En cours
Migration React + Supabase	📋 Avec développeur
LABORO MCO (contenu)	📋 À développer
Multi-filières complet	📋 Vision long terme
---
⚠️ Bugs connus
Priorité	Description
Moyen	Espace prescripteur non fonctionnel
Moyen	Création/modification contacts élèves disparue
Faible	Modal mission — redimensionnement cosmétique
Faible	Corrigé E2 visible sans validation préalable
---
🔮 Stack cible
Couche	Actuel	Cible
Frontend	Vanilla JS	React + TypeScript
Styles	CSS custom + utilitaires	Tailwind CSS
Backend	Aucun	Supabase
Déploiement	GitHub Pages	Vercel
---
👤 Auteur
Pascal Berruelle — Enseignant PLP MCV · Académie de Versailles · Essonne (91)  
Développé avec Claude AI (Anthropic)
Version 1.0.0 — Mai 2026
