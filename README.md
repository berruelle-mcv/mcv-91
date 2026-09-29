# LABORO MCV — Sport & Outdoor

Plateforme pédagogique immersive pour le Bac Pro Métiers du Commerce et de la Vente (MCV).
Les élèves travaillent comme collaborateurs d'une entreprise fictive, **LABORO Sport & Outdoor (Évry-Courcouronnes)**, sur des missions alignées sur le référentiel officiel.

- Site : https://laboro-edu.fr
- Serveur (API) : https://mcv.laboro-edu.fr

## Principe

L'élève ne fait pas des exercices : il est collaborateur de l'entreprise. Pour chaque mission, il lit une situation professionnelle et un dossier documentaire, rédige ses réponses, puis reçoit une note et un feedback de l'IA qui donne des indices, jamais la réponse. Il peut retravailler sa copie une fois. Les missions sont organisées en paliers qui se débloquent progressivement (logique spiralaire), et les missions validées alimentent un portfolio classé par compétences.

## Architecture

Deux dépôts partagent le **même moteur** et ne diffèrent que par leur habillage :

| | LABORO Auto | LABORO MCV (Sport & Outdoor) |
|---|---|---|
| Dépôt | berruelle-mcv/laboro-auto | berruelle-mcv/mcv-91 |
| Site | auto.laboro-edu.fr | laboro-edu.fr |
| Serveur | auto-api.laboro-edu.fr | mcv.laboro-edu.fr |

- **Front** (ce dépôt, GitHub Pages) : HTML, CSS et JavaScript sans dépendance externe.
- **Serveur** : Node.js, Express et SQLite sur un Raspberry Pi (un service systemd par LABORO). Un seul `server.js`, identique pour tous les univers ; seul `laboro-config.json` change. Il gère comptes, classes, copies, notes, brouillons et correction par l'IA (la clé API reste sur le serveur).

```
mcv-91/
├── index.html      # Écrans : connexion, accueil, application, vitrine prescripteurs
├── moteur.css      # Mise en page COMMUNE à tous les univers (identique dans chaque dépôt)
├── style.css       # Couleurs et particularités de CET univers
├── CNAME           # Nom de domaine (laboro-edu.fr)
├── data/           # Contenu propre à l'univers
│   ├── univers.js      # Réglages : entreprise, personnages, adresse du serveur, démo, synonymes…
│   ├── missions.js     # Missions (131 missions, de la 2nde à la Terminale)
│   ├── competences.js  # Référentiel et fiches méthode par palier
│   └── produits.js, e2-agec.js, e2-pvoc.js   # Catalogue, fichier clients, sujets E2 + corrigés
└── js/             # MOTEUR COMMUN : identique dans laboro-auto et mcv-91
    ├── app.js, auth.js, utils.js, univers-config.js   # Démarrage, connexion, réglages
    ├── dashboard.js, missions.js, catalogue.js, clients.js
    ├── correction-serveur.js, brouillons-serveur.js, maison.js
    ├── teacher.js, dashboard-enseignant.js, classe-serveur.js, copie.js, groupes.js
    ├── recherche-missions.js, generation-mission.js, releve-notes.js, portfolio.js
    └── admin-classes.js, admin-acces.js, mot-de-passe.js, sante-ia.js
```

**Règle** : `js/` et `moteur.css` sont identiques dans tous les dépôts. Une modification du moteur se fait à l'identique partout ; ce qui est propre à un univers va dans `data/`, `style.css` ou `index.html`.

## Contenu

131 missions. Chaque élève en voit selon son niveau et son option : 2nde FMRC 31, 1re AGEC 39 ou PVOC 38, Terminale AGEC 41 ou PVOC 35 (les missions communes aux deux options sont comptées dans chacune). Options : bloc 4A (animer et gérer l'espace commercial) ou 4B (prospecter et valoriser l'offre commerciale), évaluées à l'écrit E2.

## Fonctions principales

- Correction par l'IA avec feedback concis (réussi / à améliorer avec indices / conseil), 2 tentatives, meilleure note retenue ; l'enseignant peut revoir la note, commenter et accorder une tentative.
- Indices d'intégrité (temps, texte tapé, collages bloqués) et bloc « Copies à vérifier à l'oral ».
- Mission du jour (classe, demi-groupe ou élève), avec aperçu « déjà assignée ? faite par qui ? » et option « à terminer à la maison ».
- Trouver une mission (recherche par mot-clé avec synonymes du métier), génération de mission par l'IA (brouillon relu par l'enseignant).
- Vue classe, relevé de notes, portfolio, horaires d'accès des élèves, brouillons sauvegardés sur le serveur.
- Pastille « Crédit IA » (solde estimé) et voyant de santé de l'IA.

## Déploiement

- Front : upload manuel sur la branche `main` (GitHub Pages).
- Serveur : script d'installation copié sur le Pi, qui vérifie la version en place, essaie le nouveau serveur sur une copie de la base, puis installe.
- Sauvegardes : chaque nuit, copie contrôlée des bases sur le Pi et sur clé USB.

## Auteur

Pascal Berruelle — enseignant PLP en Économie-Gestion, commerce et vente · LP Paul Belmondo, Arpajon · Académie de Versailles.
Développé avec Claude (Anthropic).

## Droits et utilisation

© Pascal Berruelle 2026 — Tous droits réservés.
Ce projet est partagé à titre pédagogique. Toute réutilisation, adaptation ou diffusion sans autorisation explicite de l'auteur est interdite.
Pour toute demande : pascal.berruelle@ac-versailles.fr
