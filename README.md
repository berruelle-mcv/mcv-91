LABORO — Moteur pédagogique immersif multi-filières
Baccalauréat Professionnel · CAP · BTS tertiaires
> **LABORO** simule une entreprise fictive dans laquelle les élèves accomplissent des missions professionnelles réelles, alignées sur les référentiels officiels et les épreuves CCF/E2.
Démo en ligne → berruelle-mcv.github.io/mcv-91
---
🎯 Concept
L'élève ne fait pas des exercices — il travaille dans une entreprise. Il répond à des clients, prospecte, prépare des argumentaires, analyse des indicateurs, gère un fichier clients, prépare ses épreuves CCF et E2. Tout est contextualisé dans l'univers professionnel réel de sa filière.
---
🗂️ Filières
Config	Plateforme	Filière	Statut
`config.json`	LABORO MCV	Bac Pro MCV (AGEC + PVOC)	✅ Complet
`config-mco.json`	LABORO MCO	BTS MCO	Structure prête
`config-epc.json`	LABORO EPC	CAP EPC	Structure prête
`config-ndrc.json`	LABORO NDRC	BTS NDRC	Structure prête
`config-immo.json`	LABORO IMMO	BTS PI	À créer
`config-banque.json`	LABORO BANQUE	BTS Banque	À créer
`config-assurance.json`	LABORO ASSURANCE	BTS Assurance	À créer
---
✅ Fonctionnalités (LABORO MCV)
Fonctionnalité	Description
51 missions	2nde, 1ère AGEC/PVOC, Term. AGEC/PVOC
Référentiel compétences	C1.1 → G4B + ACC avec ressources
Préparation E2	Sujets fictifs AGEC + PVOC — corrigés masqués jusqu'à validation
Portfolio CCF	Auto-généré et imprimable par épreuve
Dashboard élève	Score, paliers, compétences, KPI
Cycle prospect complet	Créer, modifier, SIC, convertir, supprimer
Fenêtre mission	Déplaçable, redimensionnable, minimisable, plein écran
Vue enseignant	Suivi classe, mission du jour, analytics
Config multi-filières	Moteur piloté par config.json
Gestion d'erreurs	Bandeau rouge si fichier non chargé
Versioning	v1.0.0 depuis config.json
---
🏗️ Architecture
```
mcv-91/
├── config.json             # Config active LABORO MCV v1.0.0
├── config-mcv.json         # Config MCV nomenclature v2
├── config-mco.json         # Config BTS MCO
├── config-epc.json         # Config CAP EPC
├── config-ndrc.json        # Config BTS NDRC
├── index.html              # HTML pur — 66 Ko
├── style.css               # Interface + classes utilitaires
├── README.md
├── data/
│   ├── missions.js         # 51 missions MCV (219 Ko)
│   ├── competences.js      # Référentiel + ressources (148 Ko)
│   ├── catalogue.js        # Produits + clients (103 Ko)
│   ├── e2-agec.js          # Sujet E2 AGEC + corrigés (63 Ko)
│   └── e2-pvoc.js          # Sujet E2 PVOC + corrigés (52 Ko)
└── js/
    ├── app.js              # État global, score, getCfg()
    ├── auth.js             # Login, onboarding, connexion rapide
    ├── dashboard.js        # Dashboard, actus, KPI
    ├── missions.js         # Modal déplaçable, minimisable
    ├── catalogue.js        # Rendu catalogue
    ├── clients.js          # Clients, prospects, SIC, conversion
    ├── teacher.js          # Vue classe, enseignant
    └── utils.js            # Utilitaires, vitrine prescripteur
```
Stack : Vanilla JS · HTML5 · CSS3 · GitHub Pages · 0 doublon · Syntaxe validée
---
⚙️ Système config.json
Le moteur lit `config.json` au démarrage et adapte automatiquement :
Nom de la plateforme (`LABORO MCV`, `LABORO MCO`...)
Entreprise fictive, personnages, couleurs
Niveaux, options, examens disponibles
Fichiers de données à charger
Créer une nouvelle filière : dupliquer un `config-[filiere].json` + créer les fichiers `data/` correspondants.
---
🚀 Déploiement
```
Branche active   : main
Branche stable   : stable-v1
URL production   : berruelle-mcv.github.io/mcv-91
Version          : v1.0.0
```
---
🗺️ Roadmap
Étape	Statut
Prototype fonctionnel	✅
Migration architecture modulaire	✅ Mai 2026
Système config.json multi-filières	✅ Mai 2026
0 doublon — architecture propre	✅ Mai 2026
Cycle prospect complet + SIC	✅ Mai 2026
Fenêtre mission déplaçable	✅ Mai 2026
Refonte catalogue visuel	🔄 À faire
Test terrain avec élèves	📋 Rentrée 2026
Migration React + Supabase	📋 Avec développeur
---
⚠️ Dette technique connue
Priorité	Description
Haute	Catalogue visuel à refondre
Faible	Styles inline restants dans le JS
Faible	localStorage — limite à terme
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
Version 1.0.0 — Mai 2026 — Document confidentiel
