// ================================================================
//   LABORO Sport & Outdoor (MCV) — Réglages de l'univers
//   Seul fichier (avec data/*.js, index.html et style.css) propre à cet
//   univers : le moteur commun (js/*.js) est identique pour tous les LABORO.
//   Chargé en tout premier dans index.html (avant le moteur).
//   Contenu = config.json + l'adresse du serveur (api) + le nom court.
//   Les contenus non listés ici (actualités, postes, agenda…) sont les
//   valeurs d'origine de LABORO Sport & Outdoor, intégrées au moteur.
// ================================================================
var LABORO_CONFIG = {
  "filiere": "mcv",
  "version": "1.0.0",
  "nom_plateforme": "LABORO MCV",
  "slogan": "Votre espace professionnel immersif",
  "entreprise": {
    "nom": "LABORO Sport & Outdoor",
    "ville": "Évry-Courcouronnes",
    "departement": "91",
    "secteur": "Sport & Outdoor",
    "description": "Enseigne spécialisée dans la vente d'équipements sportifs",
    "nom_court": "LABORO"
  },
  "personnages": {
    "responsable": {
      "prenom": "Romain",
      "nom": "Sauzet",
      "poste": "Responsable commercial",
      "avatar": "RS"
    },
    "tutrice": {
      "prenom": "Nina",
      "nom": "Chevalier",
      "poste": "Responsable prospection",
      "avatar": "NC"
    },
    "createur": {
      "prenom": "Pascal",
      "nom": "Berruelle",
      "poste": "Formateur LABORO"
    }
  },
  "niveaux": [
    {
      "id": "2nde",
      "label": "2nde",
      "couleur": "#2E7D32",
      "ordre": 1
    },
    {
      "id": "1ere-AGEC",
      "label": "1ère AGEC",
      "couleur": "#1565C0",
      "ordre": 2
    },
    {
      "id": "1ere-PVOC",
      "label": "1ère PVOC",
      "couleur": "#1565C0",
      "ordre": 3
    },
    {
      "id": "Term-AGEC",
      "label": "Term. AGEC",
      "couleur": "#6A1B4D",
      "ordre": 4
    },
    {
      "id": "Term-PVOC",
      "label": "Term. PVOC",
      "couleur": "#6A1B4D",
      "ordre": 5
    }
  ],
  "options": [
    {
      "id": "AGEC",
      "label": "Animation et Gestion de l'Espace Commercial"
    },
    {
      "id": "PVOC",
      "label": "Prospection et Valorisation de l'Offre Commerciale"
    }
  ],
  "couleurs": {
    "primaire": "#1A2E4A",
    "secondaire": "#0F5B8A",
    "accent_2nde": "#2E7D32",
    "accent_1ere": "#1565C0",
    "accent_term": "#6A1B4D"
  },
  "score": {
    "poids_missions": 60,
    "poids_competences": 20,
    "poids_reflexivite": 20,
    "paliers": [
      {
        "min": 0,
        "max": 24,
        "label": "Stagiaire",
        "emoji": "🌱"
      },
      {
        "min": 25,
        "max": 49,
        "label": "Assistant commercial",
        "emoji": "📋"
      },
      {
        "min": 50,
        "max": 74,
        "label": "Conseiller de vente",
        "emoji": "💼"
      },
      {
        "min": 75,
        "max": 89,
        "label": "Commercial confirmé",
        "emoji": "🏆"
      },
      {
        "min": 90,
        "max": 100,
        "label": "Expert LABORO",
        "emoji": "⭐"
      }
    ]
  },
  "fichiers_data": {
    "missions": "data/missions.js",
    "competences": "data/competences.js",
    "catalogue": "data/catalogue.js",
    "e2_agec": "data/e2-agec.js",
    "e2_pvoc": "data/e2-pvoc.js"
  },
  "api": "https://mcv.laboro-edu.fr",
  "demo": {
    "eleve": {
      "mail": "demo@laboro-demo.fr",
      "nom": "Léa Martin",
      "classe": "Term-AGEC",
      "poste": "Conseiller de vente — Showroom & E-commerce",
      "missions": {
        "M023": {
          "status": "done",
          "score": 16,
          "comp": "C1.1",
          "progression": 2,
          "date_validation": "2025-09-18T10:00:00.000Z"
        },
        "M024": {
          "status": "done",
          "score": 15,
          "comp": "C1.2",
          "progression": 1,
          "date_validation": "2025-10-07T10:00:00.000Z"
        },
        "M025": {
          "status": "done",
          "score": 14,
          "comp": "C2.2",
          "progression": 0,
          "date_validation": "2025-10-21T10:00:00.000Z"
        },
        "M026": {
          "status": "done",
          "score": 17,
          "comp": "C1.3",
          "progression": 2,
          "date_validation": "2025-11-12T10:00:00.000Z"
        },
        "M028": {
          "status": "done",
          "score": 13,
          "comp": "C2.3",
          "progression": 0,
          "date_validation": "2025-12-03T10:00:00.000Z"
        },
        "M029": {
          "status": "done",
          "score": 16,
          "comp": "C3.2",
          "progression": 1,
          "date_validation": "2026-01-15T10:00:00.000Z"
        },
        "M030": {
          "status": "done",
          "score": 15,
          "comp": "C3.3",
          "progression": 0,
          "date_validation": "2026-02-05T10:00:00.000Z"
        },
        "M031": {
          "status": "done",
          "score": 14,
          "comp": "C3.1",
          "progression": 1,
          "date_validation": "2026-03-12T10:00:00.000Z"
        },
        "M032": {
          "status": "done",
          "score": 18,
          "comp": "C4A.3",
          "progression": 2,
          "date_validation": "2026-04-02T10:00:00.000Z"
        },
        "M027": {
          "status": "att",
          "score": 0,
          "comp": "C2.2",
          "progression": 0
        }
      },
      "competences": {
        "C1.1": 3,
        "C1.2": 3,
        "C1.3": 3,
        "C2.1": 2,
        "C2.2": 2,
        "C2.3": 2,
        "C3.1": 3,
        "C3.2": 3,
        "C3.3": 3,
        "C4A.1": 4,
        "C4A.2": 4,
        "C4A.3": 4
      }
    },
    "camarades": [
      {
        "mail": "camille.demo@laboro-demo.fr",
        "nom": "Camille Bernard",
        "classe": "Term-AGEC",
        "missions": {
          "M023": {
            "status": "done",
            "score": 18,
            "comp": "C1.1",
            "progression": 2
          },
          "M024": {
            "status": "done",
            "score": 17,
            "comp": "C1.2",
            "progression": 1
          },
          "M026": {
            "status": "done",
            "score": 16,
            "comp": "C1.3",
            "progression": 1
          },
          "M029": {
            "status": "done",
            "score": 15,
            "comp": "C3.2",
            "progression": 0
          },
          "M032": {
            "status": "done",
            "score": 17,
            "comp": "C4A.3",
            "progression": 2
          }
        }
      },
      {
        "mail": "hugo.demo@laboro-demo.fr",
        "nom": "Hugo Lefèvre",
        "classe": "Term-AGEC",
        "missions": {
          "M023": {
            "status": "done",
            "score": 12,
            "comp": "C1.1",
            "progression": 0
          },
          "M024": {
            "status": "done",
            "score": 13,
            "comp": "C1.2",
            "progression": 1
          },
          "M025": {
            "status": "done",
            "score": 11,
            "comp": "C2.2",
            "progression": 0
          }
        }
      }
    ]
  }
};
