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
  "_codes_note": "Numéros de compétences AFFICHÉS selon le référentiel officiel (code interne → code affiché). Les codes internes des missions ne changent pas.",
  "codes_competences": {
    "C2.1b": "C2.2",
    "C2.2": "C2.3",
    "C2.3": "C2.4",
    "B4.1": "C4B.1",
    "B4.2": "C4B.2",
    "B4.3": "C4B.3",
    "B4.4": "C4B.4",
    "B4.5": "C4B.5",
    "G4A": "Bloc 4A",
    "G4B": "Bloc 4B"
  },
  "demo": {
    "eleve": {
      "mail": "demo@laboro-demo.fr",
      "nom": "Léa Martin",
      "classe": "Term-AGEC",
      "poste": "Conseiller de vente — Showroom & E-commerce",
      "missions": {
        "M001": {
          "status": "done",
          "score": 13,
          "comp": "C1.2",
          "progression": 0,
          "date_validation": "2025-09-25T10:00:00.000Z"
        },
        "M002": {
          "status": "done",
          "score": 14,
          "comp": "C1.1",
          "progression": 0,
          "date_validation": "2025-10-09T10:00:00.000Z"
        },
        "M003": {
          "status": "done",
          "score": 12,
          "comp": "C2.2",
          "progression": 0,
          "date_validation": "2025-11-13T10:00:00.000Z"
        },
        "M007": {
          "status": "done",
          "score": 15,
          "comp": "C1.3",
          "progression": 0,
          "date_validation": "2025-11-27T10:00:00.000Z"
        },
        "M010": {
          "status": "done",
          "score": 13,
          "comp": "C2.3",
          "progression": 0,
          "date_validation": "2026-01-08T10:00:00.000Z"
        },
        "M011": {
          "status": "done",
          "score": 14,
          "comp": "C3.1",
          "progression": 0,
          "date_validation": "2026-01-22T10:00:00.000Z"
        },
        "M013": {
          "status": "done",
          "score": 15,
          "comp": "C3.2",
          "progression": 0,
          "date_validation": "2026-02-05T10:00:00.000Z"
        },
        "M016": {
          "status": "done",
          "score": 16,
          "comp": "C4A.3",
          "progression": 0,
          "date_validation": "2026-03-12T10:00:00.000Z"
        },
        "M004": {
          "status": "done",
          "score": 14,
          "comp": "C1.2",
          "progression": 0,
          "date_validation": "2026-03-26T10:00:00.000Z"
        },
        "M052": {
          "status": "done",
          "score": 13,
          "comp": "C2.2",
          "progression": 0,
          "date_validation": "2026-04-02T10:00:00.000Z"
        },
        "M051": {
          "status": "done",
          "score": 15,
          "comp": "C1.3",
          "progression": 0,
          "date_validation": "2026-04-30T10:00:00.000Z"
        },
        "M006": {
          "status": "done",
          "score": 14,
          "comp": "C3.2",
          "progression": 0,
          "date_validation": "2026-05-14T10:00:00.000Z"
        },
        "M054": {
          "status": "done",
          "score": 15,
          "comp": "C3.1",
          "progression": 0,
          "date_validation": "2026-05-28T10:00:00.000Z"
        },
        "M070": {
          "status": "done",
          "score": 15,
          "comp": "C1.1",
          "progression": 0,
          "date_validation": "2026-09-08T10:00:00.000Z"
        },
        "M055": {
          "status": "done",
          "score": 14,
          "comp": "C3.3",
          "progression": 0,
          "date_validation": "2026-09-10T10:00:00.000Z"
        },
        "M056": {
          "status": "done",
          "score": 16,
          "comp": "C3.3",
          "progression": 0,
          "date_validation": "2026-09-17T10:00:00.000Z"
        },
        "M023": {
          "status": "done",
          "score": 16,
          "comp": "C1.1",
          "progression": 0,
          "date_validation": "2026-09-22T10:00:00.000Z"
        },
        "M024": {
          "status": "done",
          "score": 15,
          "comp": "C1.2",
          "progression": 0,
          "date_validation": "2026-09-29T10:00:00.000Z"
        },
        "M073": {
          "status": "done",
          "score": 14,
          "comp": "C2.3",
          "progression": 0,
          "date_validation": "2026-10-01T10:00:00.000Z"
        },
        "M026": {
          "status": "done",
          "score": 17,
          "comp": "C1.3",
          "progression": 0,
          "date_validation": "2026-10-06T10:00:00.000Z"
        },
        "M032": {
          "status": "done",
          "score": 18,
          "comp": "C4A.3",
          "progression": 0,
          "date_validation": "2026-10-13T10:00:00.000Z"
        },
        "M027": {
          "status": "att",
          "score": 0,
          "comp": "C2.2",
          "progression": 0,
          "tentatives": 1
        }
      },
      "competences": {}
    },
    "camarades": [
      {
        "mail": "camille.demo@laboro-demo.fr",
        "nom": "Camille Bernard",
        "classe": "Term-AGEC",
        "missions": {
          "M001": {
            "status": "done",
            "score": 15,
            "comp": "C1.2",
            "progression": 0,
            "date_validation": "2025-09-25T10:00:00.000Z"
          },
          "M002": {
            "status": "done",
            "score": 16,
            "comp": "C1.1",
            "progression": 0,
            "date_validation": "2025-10-09T10:00:00.000Z"
          },
          "M007": {
            "status": "done",
            "score": 14,
            "comp": "C1.3",
            "progression": 0,
            "date_validation": "2025-11-27T10:00:00.000Z"
          },
          "M013": {
            "status": "done",
            "score": 15,
            "comp": "C3.2",
            "progression": 0,
            "date_validation": "2026-02-05T10:00:00.000Z"
          },
          "M016": {
            "status": "done",
            "score": 17,
            "comp": "C4A.3",
            "progression": 0,
            "date_validation": "2026-03-12T10:00:00.000Z"
          },
          "M004": {
            "status": "done",
            "score": 15,
            "comp": "C1.2",
            "progression": 0,
            "date_validation": "2026-03-26T10:00:00.000Z"
          },
          "M051": {
            "status": "done",
            "score": 14,
            "comp": "C1.3",
            "progression": 0,
            "date_validation": "2026-04-30T10:00:00.000Z"
          },
          "M006": {
            "status": "done",
            "score": 15,
            "comp": "C3.2",
            "progression": 0,
            "date_validation": "2026-05-14T10:00:00.000Z"
          },
          "M070": {
            "status": "done",
            "score": 16,
            "comp": "C1.1",
            "progression": 0,
            "date_validation": "2026-09-08T10:00:00.000Z"
          },
          "M023": {
            "status": "done",
            "score": 18,
            "comp": "C1.1",
            "progression": 0,
            "date_validation": "2026-09-22T10:00:00.000Z"
          },
          "M024": {
            "status": "done",
            "score": 17,
            "comp": "C1.2",
            "progression": 0,
            "date_validation": "2026-09-29T10:00:00.000Z"
          },
          "M026": {
            "status": "done",
            "score": 16,
            "comp": "C1.3",
            "progression": 0,
            "date_validation": "2026-10-06T10:00:00.000Z"
          },
          "M029": {
            "status": "done",
            "score": 15,
            "comp": "C3.2",
            "progression": 0,
            "date_validation": "2026-10-08T10:00:00.000Z"
          },
          "M032": {
            "status": "done",
            "score": 17,
            "comp": "C4A.3",
            "progression": 0,
            "date_validation": "2026-10-13T10:00:00.000Z"
          }
        }
      },
      {
        "mail": "hugo.demo@laboro-demo.fr",
        "nom": "Hugo Lefèvre",
        "classe": "Term-AGEC",
        "missions": {
          "M001": {
            "status": "done",
            "score": 11,
            "comp": "C1.2",
            "progression": 0,
            "date_validation": "2025-09-25T10:00:00.000Z"
          },
          "M002": {
            "status": "done",
            "score": 12,
            "comp": "C1.1",
            "progression": 0,
            "date_validation": "2025-10-09T10:00:00.000Z"
          },
          "M003": {
            "status": "done",
            "score": 10,
            "comp": "C2.2",
            "progression": 0,
            "date_validation": "2025-11-13T10:00:00.000Z"
          },
          "M004": {
            "status": "done",
            "score": 11,
            "comp": "C1.2",
            "progression": 0,
            "date_validation": "2026-03-26T10:00:00.000Z"
          },
          "M052": {
            "status": "done",
            "score": 12,
            "comp": "C2.2",
            "progression": 0,
            "date_validation": "2026-04-02T10:00:00.000Z"
          },
          "M070": {
            "status": "done",
            "score": 12,
            "comp": "C1.1",
            "progression": 0,
            "date_validation": "2026-09-08T10:00:00.000Z"
          },
          "M023": {
            "status": "done",
            "score": 12,
            "comp": "C1.1",
            "progression": 0,
            "date_validation": "2026-09-22T10:00:00.000Z"
          },
          "M024": {
            "status": "done",
            "score": 13,
            "comp": "C1.2",
            "progression": 0,
            "date_validation": "2026-09-29T10:00:00.000Z"
          },
          "M025": {
            "status": "done",
            "score": 11,
            "comp": "C2.2",
            "progression": 0,
            "date_validation": "2026-10-08T10:00:00.000Z"
          }
        }
      }
    ]
  },
  "recherche_synonymes": [
    [
      "chaussure",
      "chaussures",
      "running",
      "trail"
    ],
    [
      "vélo",
      "cyclisme"
    ],
    [
      "randonnée",
      "outdoor"
    ],
    [
      "club",
      "association sportive",
      "licencié"
    ],
    [
      "textile",
      "maillot",
      "vêtement",
      "tenue"
    ]
  ]
};
