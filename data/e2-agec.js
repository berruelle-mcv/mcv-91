// ================================================
//   LABORO — Préparation E2 Option AGEC
//   Sujet fictif + corrigés + fonctions de rendu
//   Version 1.0 — Architecture modulaire
// ================================================

const E2_AGEC_SUJET = {
  titre: "Opération Trail Automne",
  session: "Session d'entraînement — Option AGEC",
  contexte: `LABORO Sport & Outdoor est une enseigne spécialisée dans la vente d'équipements sportifs, basée à Évry-Courcouronnes (91). L'enseigne propose des produits pour le football, le basketball, le running, le fitness et le trail. Elle développe également des services associés : ateliers techniques, personnalisation et conseil expert.

Vous êtes employé(e) en tant que conseiller(ère) de vente au sein de LABORO depuis quelques mois. Votre responsable commercial, Romain Sauzet, vous confie plusieurs missions autour de l'opération "Collection Trail Automne" qui met en avant les équipements trail running pour la saison automne/hiver. Il souhaite également que vous participiez à l'organisation d'un atelier trail running pour développer la clientèle.`,
  missions: [
    {
      id: 'M1',
      titre: 'Mission 1 — Assurer les opérations préalables à la vente',
      intro: `Dans le cadre de l'opération "Collection Trail Automne", LABORO a mis en avant 6 références de la gamme STRYD Trail en tête de gondole (TG). Romain Sauzet vous demande d'analyser les résultats de cette opération et de préparer le réassort.`,
      activites: [
        {
          id: 'A1',
          titre: 'Activité 1 — Analyser les résultats de l\'inventaire',
          consignes: [
            {
              num: '1.1',
              texte: 'Calculer pour les six références de la TG Trail : le stock théorique et la démarque ou la surmaque.',
              type: 'calcul',
              ressources: ['R-A1','R-A2','R-A3'],
              points: 3,
              corrige: {
                methode: 'Stock théorique = Stock initial + Livraisons - Quantités vendues\nDémarque = Stock théorique - Stock réel (si positif = démarque / si négatif = surmaque)',
                tableau: [
                  {ref:'STR-T1',produit:'Chaussures Trail X-Grip T42',si:8,livr:12,qv:14,st:6,sr:4,dem:2},
                  {ref:'STR-T2',produit:'Veste Trail Waterproof',si:10,livr:8,qv:12,st:6,sr:5,dem:1},
                  {ref:'STR-T3',produit:'Short Trail Aero',si:15,livr:10,qv:18,st:7,sr:6,dem:1},
                  {ref:'STR-T4',produit:'Chaussettes Trail Pro',si:30,livr:20,qv:35,st:15,sr:14,dem:1},
                  {ref:'STR-T5',produit:'Sac Hydratation 10L',si:6,livr:6,qv:8,st:4,sr:3,dem:1},
                  {ref:'STR-T6',produit:'Lampe Frontale Trail 400lm',si:12,livr:0,qv:7,st:5,sr:5,dem:0},
                ]
              }
            },
            {
              num: '1.2',
              texte: 'Indiquer deux causes et deux conséquences éventuelles de cette démarque lors de l\'opération "Collection Trail Automne".',
              type: 'redaction',
              ressources: [],
              points: 2,
              corrige: {
                causes: ['Vol à l\'étalage de petits accessoires (chaussettes, lampe)', 'Erreurs de caisse ou de scanning lors des ventes promotionnelles'],
                consequences: ['Perte financière directe pour LABORO (manque à gagner)', 'Rupture de stock anticipée perturbant la disponibilité produits']
              }
            },
            {
              num: '1.3',
              texte: 'Rédiger un compte-rendu à l\'attention de Romain Sauzet dans lequel vous proposez trois actions pour lutter contre la démarque lors de la prochaine opération.',
              type: 'redaction',
              ressources: [],
              points: 4,
              corrige: {
                elements: [
                  'Renforcer la surveillance visuelle de la TG Trail (positionnement stratégique des caméras)',
                  'Utiliser des antivols adaptés sur les références les plus démarquées (chaussettes, accessoires)',
                  'Réaliser des inventaires tournants quotidiens pendant toute la durée de l\'opération'
                ],
                modele: `Évry-Courcouronnes, le [date]\n\nÀ l'attention de Romain Sauzet\nObjet : Bilan démarque — Opération Trail Automne\n\nMonsieur Sauzet,\n\nSuite à l'analyse de l'inventaire post-opération "Collection Trail Automne", j'ai constaté une démarque totale de 6 unités sur les 6 références de la tête de gondole STRYD Trail.\n\nAfin de limiter ce phénomène lors de la prochaine opération, je vous propose les trois actions suivantes : [...]`
              }
            }
          ]
        },
        {
          id: 'A2',
          titre: 'Activité 2 — Établir les commandes',
          consignes: [
            {
              num: '2.1',
              texte: 'Déterminer pour chacune des six références les besoins en produits pour la prochaine opération (augmentation de 25% des ventes prévue) et les quantités à commander en tenant compte du stock réel.',
              type: 'calcul',
              ressources: ['R-A3','R-A4'],
              points: 3,
              corrige: {
                methode: 'Besoins = Quantités vendues × 1,25 (arrondi à l\'entier supérieur)\nQuantité à commander = Besoins - Stock réel (si négatif = 0)',
                tableau: [
                  {ref:'STR-T1',qv:14,besoin:18,sr:4,cmd:14},
                  {ref:'STR-T2',qv:12,besoin:15,sr:5,cmd:10},
                  {ref:'STR-T3',qv:18,besoin:23,sr:6,cmd:17},
                  {ref:'STR-T4',qv:35,besoin:44,sr:14,cmd:30},
                  {ref:'STR-T5',qv:8,besoin:10,sr:3,cmd:7},
                  {ref:'STR-T6',qv:7,besoin:9,sr:5,cmd:4},
                ]
              }
            },
            {
              num: '2.2',
              texte: 'Calculer le nombre d\'unités de conditionnement à commander pour chaque référence. Arrondir à l\'entier supérieur.',
              type: 'calcul',
              ressources: ['R-A4'],
              points: 2,
              corrige: {
                methode: 'Unités de conditionnement = Quantité à commander ÷ UC (arrondi à l\'entier supérieur)',
                tableau: [
                  {ref:'STR-T1',cmd:14,uc:2,nb_uc:7},
                  {ref:'STR-T2',cmd:10,uc:5,nb_uc:2},
                  {ref:'STR-T3',cmd:17,uc:5,nb_uc:4},
                  {ref:'STR-T4',cmd:30,uc:10,nb_uc:3},
                  {ref:'STR-T5',cmd:7,uc:3,nb_uc:3},
                  {ref:'STR-T6',cmd:4,uc:4,nb_uc:1},
                ]
              }
            },
            {
              num: '2.3',
              texte: 'Sélectionner le fournisseur le plus adapté en réalisant un scoring selon les critères définis par Romain Sauzet.',
              type: 'calcul',
              ressources: ['R-A5','R-A6'],
              points: 3,
              corrige: {
                methode: 'Scoring : noter chaque fournisseur sur chaque critère (0 ou 1), additionner les points.',
                tableau: [
                  {fourn:'Sport Pro Distribution',livr_j:0,tarifs:1,note:1,paiement:1,delai:1,total:4},
                  {fourn:'AthlèteShop Grossiste',livr_j:1,tarifs:1,note:1,paiement:1,delai:0,total:4},
                  {fourn:'RunStore Pro',livr_j:0,tarifs:0,note:0,paiement:1,delai:1,total:2},
                ],
                conclusion: 'Sport Pro Distribution et AthlèteShop Grossiste sont ex-aequo (4/5). Le critère déterminant est la livraison quotidienne : AthlèteShop Grossiste est retenu car il livre tous les jours, ce qui garantit la réactivité pendant l\'opération.'
              }
            },
            {
              num: '2.4',
              texte: 'Rédiger, au nom de Romain Sauzet, l\'e-mail de commande au fournisseur retenu.',
              type: 'redaction',
              ressources: ['R-A6'],
              points: 3,
              corrige: {
                modele: `De : romain.sauzet@laboro-sport.fr\nÀ : commandes@athleteshop-grossiste.fr\nObjet : Commande réassort Trail Automne — LABORO Évry\n\nBonjour,\n\nSuite à notre accord commercial, je vous adresse la commande suivante pour notre opération "Collection Trail Automne 2" :\n\n- STR-T1 Chaussures Trail X-Grip T42 : 7 cartons (UC=2)\n- STR-T2 Veste Trail Waterproof : 2 cartons (UC=5)\n- STR-T3 Short Trail Aero : 4 cartons (UC=5)\n- STR-T4 Chaussettes Trail Pro : 3 cartons (UC=10)\n- STR-T5 Sac Hydratation 10L : 3 cartons (UC=3)\n- STR-T6 Lampe Frontale Trail 400lm : 1 carton (UC=4)\n\nLivraison souhaitée sous 48h à notre entrepôt d'Évry-Courcouronnes.\n\nCordialement,\nRomain Sauzet — Responsable Commercial\nLABORO Sport & Outdoor`
              }
            }
          ]
        },
        {
          id: 'A3',
          titre: 'Activité 3 — Fixer les prix des produits',
          consignes: [
            {
              num: '3.1',
              texte: 'Calculer le prix de vente TTC des chaussures Trail X-Grip et du sac hydratation 10L en fonction des taux de marge souhaités. Détailler les calculs. Arrondir à deux décimales.',
              type: 'calcul',
              ressources: ['R-A7'],
              points: 3,
              corrige: {
                methode: 'PV HT = PA HT / (1 - taux de marge)\nPV TTC = PV HT × (1 + taux TVA)',
                calculs: [
                  {produit:'Chaussures Trail X-Grip',pa:42,taux_marge:0.45,tva:0.20,pvht:76.36,pvttc:91.64},
                  {produit:'Sac Hydratation 10L',pa:18.50,taux_marge:0.38,tva:0.20,pvht:29.84,pvttc:35.81},
                ]
              }
            },
            {
              num: '3.2',
              texte: 'Comparer les prix des chaussures Trail X-Grip et du sac hydratation par rapport aux prix pratiqués par la concurrence.',
              type: 'redaction',
              ressources: ['R-A7','R-A8'],
              points: 2,
              corrige: {
                analyse: 'Les chaussures Trail X-Grip (91,64€ TTC) sont positionnées dans la fourchette haute de la concurrence (Decathlon 79,99€ / Sport 2000 89,99€ / Go Sport 94,99€). Le sac hydratation (35,81€) est légèrement au-dessus du prix moyen constaté (32€-38€). LABORO maintient un positionnement légèrement premium cohérent avec son image spécialiste.'
              }
            },
            {
              num: '3.3',
              texte: 'Romain Sauzet décide de s\'aligner sur le prix de Decathlon pour les chaussures. Calculer le nouveau taux de marge. Détailler les calculs.',
              type: 'calcul',
              ressources: ['R-A7','R-A8'],
              points: 2,
              corrige: {
                methode: 'PV HT = PV TTC / (1 + taux TVA)\nTaux de marge = (PV HT - PA HT) / PV HT × 100',
                calcul: {pvttc:79.99,tva:0.20,pvht:66.66,pa:42,marge_e:24.66,taux_marge:36.99}
              }
            },
            {
              num: '3.4',
              texte: 'Analyser l\'opportunité pour LABORO d\'appliquer ce nouveau prix d\'alignement sur Decathlon.',
              type: 'redaction',
              ressources: [],
              points: 2,
              corrige: {
                analyse: 'L\'alignement sur Decathlon réduit le taux de marge de 45% à 36,99%, soit une perte de 8 points de marge. Cependant, cela permet à LABORO de rester compétitif face au leader du marché. L\'opportunité est réelle si l\'augmentation du volume de ventes compense la perte de marge unitaire. Il convient de s\'interroger sur le positionnement de LABORO : en tant que spécialiste, un prix premium peut se justifier si l\'offre de service (conseil expert, atelier trail) est mise en avant.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'M2',
      titre: 'Mission 2 — Développer la clientèle',
      intro: `Fort du succès de l'opération "Collection Trail Automne", Romain Sauzet souhaite organiser un atelier trail running pour développer la clientèle et renforcer l'image expert de LABORO. Il souhaite également accroître la visibilité de LABORO sur Instagram.`,
      activites: [
        {
          id: 'A4',
          titre: 'Activité 4 — Organiser l\'atelier "Initiation Trail Running LABORO"',
          consignes: [
            {
              num: '4.1',
              texte: 'Citer deux avantages pour le client et trois avantages pour LABORO d\'organiser l\'atelier "Initiation Trail Running".',
              type: 'redaction',
              ressources: ['R-B1'],
              points: 3,
              corrige: {
                client: ['Bénéficier des conseils d\'un expert pour choisir le bon équipement trail', 'Découvrir les techniques de base du trail running dans un cadre convivial'],
                magasin: ['Fidéliser la clientèle existante en créant une expérience unique', 'Générer du trafic en magasin et augmenter le CA sur les produits trail', 'Renforcer le positionnement "expert trail" de LABORO face à la grande distribution']
              }
            },
            {
              num: '4.2',
              texte: 'Calculer le coût total des 8 ateliers prévus. Détailler les calculs.',
              type: 'calcul',
              ressources: ['R-B2','R-B3'],
              points: 3,
              corrige: {
                methode: 'Charges fixes + Charges variables × nombre d\'ateliers',
                detail: {
                  fixes: {materiel_fixe: 180, communication: 150, total_fixes: 330},
                  variables_par_atelier: {coach: 80, ingredients: 12, total_var: 92},
                  nb_ateliers: 8,
                  total_variables: 736,
                  cout_total: 1066
                }
              }
            },
            {
              num: '4.3',
              texte: 'Calculer le taux d\'occupation actuel de l\'ensemble des ateliers. Arrondir à deux décimales.',
              type: 'calcul',
              ressources: ['R-B4'],
              points: 2,
              corrige: {
                methode: 'Taux d\'occupation = (Total réservations / Total places disponibles) × 100',
                calcul: {reservations: 28, places: 80, taux: 35.00}
              }
            },
            {
              num: '4.4',
              texte: 'Calculer la prévision de chiffre d\'affaires des ateliers à partir des inscriptions actuelles. Détailler les calculs.',
              type: 'calcul',
              ressources: ['R-B3','R-B4'],
              points: 2,
              corrige: {
                methode: 'CA prévisionnel = Nombre de réservations × Prix TTC de l\'atelier',
                calcul: {reservations: 28, prix_ttc: 35, ca: 980}
              }
            },
            {
              num: '4.5',
              texte: 'Déterminer le nombre de participants supplémentaires nécessaires pour rentabiliser les ateliers. Détailler les calculs.',
              type: 'calcul',
              ressources: ['R-B3','R-B4'],
              points: 2,
              corrige: {
                methode: 'Seuil de rentabilité en volume = Coût total / Prix TTC\nParticipants supplémentaires = Seuil - Réservations actuelles',
                calcul: {cout_total: 1066, prix_ttc: 35, seuil: 31, reservations: 28, supplementaires: 3}
              }
            },
            {
              num: '4.6',
              texte: 'Calculer le taux d\'occupation minimal pour couvrir le coût des ateliers. Arrondir à deux décimales.',
              type: 'calcul',
              ressources: [],
              points: 1,
              corrige: {
                methode: 'Taux occupation minimal = (Participants seuil / Places totales) × 100',
                calcul: {seuil: 31, places: 80, taux: 38.75}
              }
            },
            {
              num: '4.7',
              texte: 'Énoncer trois propositions pour atteindre le taux d\'occupation minimal lors des ateliers.',
              type: 'redaction',
              ressources: [],
              points: 2,
              corrige: {
                propositions: [
                  'Relancer par e-mail les clients ayant déjà acheté des équipements trail chez LABORO',
                  'Proposer un tarif de groupe (à partir de 3 participants) pour inciter les inscriptions collectives',
                  'Diffuser des flyers dans les clubs d\'athlétisme et associations sportives de l\'Essonne (91)'
                ]
              }
            }
          ]
        },
        {
          id: 'A5',
          titre: 'Activité 5 — Recourir au réseau social Instagram',
          consignes: [
            {
              num: '5.1',
              texte: 'Rédiger les éléments de la publication Instagram annonçant l\'atelier "Initiation Trail Running LABORO".',
              type: 'redaction',
              ressources: ['R-B5','R-B6'],
              points: 3,
              corrige: {
                elements: {
                  titre: '🏃 Tu veux te lancer dans le trail ? On t\'accompagne !',
                  contenu: 'LABORO organise ses premiers ateliers "Initiation Trail Running" avec notre coach expert ! Au programme : choix du matériel, techniques de base, conseils nutrition. 🌿⛰️',
                  hashtags: '#TrailRunning #LABORO #SportEssonne #Trail91 #InitiationTrail #RunningCommunity',
                  cta: '👉 Inscris-toi en story ou en boutique — Places limitées à 10 participants !'
                }
              }
            },
            {
              num: '5.2',
              texte: 'Calculer et commenter le taux d\'engagement de la publication Instagram. Arrondir à deux décimales.',
              type: 'calcul',
              ressources: ['R-B7','R-B8'],
              points: 3,
              corrige: {
                methode: 'Taux d\'engagement = (Likes + Commentaires + Partages) / Followers × 100',
                calcul: {likes: 47, commentaires: 12, partages: 8, followers: 1840, taux: 3.64},
                commentaire: 'Avec un taux d\'engagement de 3,64%, la publication se situe dans la tranche "bon taux d\'engagement" (entre 1,5% et 3,5%). Cela signifie que la communauté Instagram de LABORO réagit favorablement au contenu. Ce résultat est encourageant pour une enseigne locale spécialisée.'
              }
            },
            {
              num: '5.3',
              texte: 'Proposer trois actions pour développer la visibilité de cette publication Instagram.',
              type: 'redaction',
              ressources: ['R-B6'],
              points: 2,
              corrige: {
                actions: [
                  'Booster la publication avec un budget publicitaire ciblé sur les 18-45 ans sportifs de l\'Essonne',
                  'Collaborer avec un micro-influenceur trail local pour partager la publication à sa communauté',
                  'Publier des stories courtes montrant la préparation de l\'atelier pour maintenir l\'intérêt'
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  ressources: {
    'R-A1': {
      titre: 'Ressource A1 — Références TG "Collection Trail Automne"',
      type: 'tableau',
      data: {
        headers: ['Référence','Désignation','Catégorie'],
        rows: [
          ['STR-T1','Chaussures Trail X-Grip T42','Non alimentaire'],
          ['STR-T2','Veste Trail Waterproof S/M/L','Non alimentaire'],
          ['STR-T3','Short Trail Aero S/M/L','Non alimentaire'],
          ['STR-T4','Chaussettes Trail Pro (lot 3)','Non alimentaire'],
          ['STR-T5','Sac Hydratation 10L','Non alimentaire'],
          ['STR-T6','Lampe Frontale Trail 400lm','Non alimentaire'],
        ]
      }
    },
    'R-A2': {
      titre: 'Ressource A2 — État des stocks TG Trail au 04 octobre 2024',
      type: 'tableau',
      data: {
        headers: ['Référence','Désignation','Stock initial','Livraison','Stock réel au 04/10'],
        rows: [
          ['STR-T1','Chaussures Trail X-Grip T42',8,12,4],
          ['STR-T2','Veste Trail Waterproof',10,8,5],
          ['STR-T3','Short Trail Aero',15,10,6],
          ['STR-T4','Chaussettes Trail Pro',30,20,14],
          ['STR-T5','Sac Hydratation 10L',6,6,3],
          ['STR-T6','Lampe Frontale Trail 400lm',12,0,5],
        ]
      }
    },
    'R-A3': {
      titre: 'Ressource A3 — Quantités vendues du 25 septembre au 04 octobre 2024',
      type: 'tableau',
      data: {
        headers: ['Référence','Désignation','Quantités vendues'],
        rows: [
          ['STR-T1','Chaussures Trail X-Grip T42',14],
          ['STR-T2','Veste Trail Waterproof',12],
          ['STR-T3','Short Trail Aero',18],
          ['STR-T4','Chaussettes Trail Pro',35],
          ['STR-T5','Sac Hydratation 10L',8],
          ['STR-T6','Lampe Frontale Trail 400lm',7],
        ]
      }
    },
    'R-A4': {
      titre: 'Ressource A4 — Tableau de bord au 04 octobre 2024',
      type: 'tableau',
      data: {
        headers: ['Référence','Désignation','Stock réel','Qté vendues','Unité de conditionnement'],
        rows: [
          ['STR-T1','Chaussures Trail X-Grip T42',4,14,2],
          ['STR-T2','Veste Trail Waterproof',5,12,5],
          ['STR-T3','Short Trail Aero',6,18,5],
          ['STR-T4','Chaussettes Trail Pro',14,35,10],
          ['STR-T5','Sac Hydratation 10L',3,8,3],
          ['STR-T6','Lampe Frontale Trail 400lm',5,7,4],
        ]
      }
    },
    'R-A5': {
      titre: 'Ressource A5 — Critères de choix fournisseur (Romain Sauzet)',
      type: 'liste',
      data: [
        'Si livraison tous les jours : 1 point, sinon 0',
        'Si tarifs préférentiels : 1 point, sinon 0',
        'Si note clients supérieure à 4/5 : 1 point, sinon 0',
        'Si délais de paiement accordés : 1 point, sinon 0',
        'Si délai de livraison inférieur à 72h : 1 point, sinon 0',
      ]
    },
    'R-A6': {
      titre: 'Ressource A6 — Comparatif fournisseurs équipements trail',
      type: 'fournisseurs',
      data: [
        {
          nom: 'Sport Pro Distribution',
          adresse: '15 av. de la République, 91000 Évry',
          email: 'commandes@sportpro-dist.fr',
          contact: 'Julie Marchand',
          details: ['Livraison lundi, mercredi, vendredi','Délai de livraison : 48h','Tarifs préférentiels -8% dès 2000€','Paiement 30 jours fin de mois','Note clients : 4,2/5'],
          bonus: 'Catalogue digital interactif'
        },
        {
          nom: 'AthlèteShop Grossiste',
          adresse: '8 rue des Entrepreneurs, 75015 Paris',
          email: 'pro@athleteshop-grossiste.fr',
          contact: 'Karim Benali',
          details: ['Livraison tous les jours','Délai de livraison : 48h','Tarifs préférentiels -5% dès 1500€','Paiement 60 jours fin de mois','Note clients : 4,6/5'],
          bonus: 'Commercial attitré dédié'
        },
        {
          nom: 'RunStore Pro',
          adresse: '22 bd du Sport, 69007 Lyon',
          email: 'b2b@runstore-pro.fr',
          contact: 'Émilie Perrot',
          details: ['Livraison mardi et jeudi','Délai de livraison : 24h','Pas de tarifs préférentiels','Paiement comptant','Note clients : 3,8/5'],
          bonus: 'Emballages éco-responsables'
        }
      ]
    },
    'R-A7': {
      titre: 'Ressource A7 — Informations prix produits au 04 octobre 2024',
      type: 'tableau',
      data: {
        headers: ['Référence','Désignation','Prix d\'achat HT','Taux de marge','TVA'],
        rows: [
          ['STR-T1','Chaussures Trail X-Grip T42','42,00 €','45%','20%'],
          ['STR-T5','Sac Hydratation 10L','18,50 €','38%','20%'],
        ]
      }
    },
    'R-A8': {
      titre: 'Ressource A8 — Prix concurrents zone de chalandise',
      type: 'tableau',
      data: {
        headers: ['Concurrent','PV TTC Chaussures Trail','PV TTC Sac Hydratation 10L'],
        rows: [
          ['Decathlon','79,99 €','32,99 €'],
          ['Sport 2000','89,99 €','37,50 €'],
          ['Go Sport','94,99 €','38,99 €'],
        ]
      }
    },
    'R-B1': {
      titre: 'Ressource B1 — Les ateliers sport, un levier de fidélisation',
      type: 'texte',
      data: `Les enseignes sportives spécialisées misent de plus en plus sur les ateliers techniques pour se différencier de la grande distribution. Ces ateliers permettent de créer une communauté autour de la marque, de fidéliser une clientèle passionnée et de générer des ventes additionnelles sur les produits utilisés en atelier.

Selon une étude Nielsen 2023, 67% des participants à un atelier sport en magasin y effectuent un achat le jour même. Le panier moyen est 2,3 fois supérieur à celui d'une visite classique.

Les réseaux sociaux jouent un rôle clé : les photos et vidéos publiées par les participants génèrent en moyenne 4 fois plus d'engagement que les publications institutionnelles de la marque.

Chez LABORO, les ateliers trail running s'inscrivent dans une stratégie de positionnement "expert de proximité" face aux géants de la distribution sportive.`
    },
    'R-B2': {
      titre: 'Ressource B2 — Description de l\'atelier "Initiation Trail Running LABORO"',
      type: 'fiche',
      data: {
        titre: '🏃 Atelier Initiation Trail Running',
        details: [
          'Durée : 2h', 'Tarif : 35€ TTC/personne',
          'Nombre de participants : 10 max',
          'Dates : tous les samedis de novembre 2024',
          'Lieu : LABORO Évry-Courcouronnes + sortie terrain',
          'Animateur : Coach trail certifié LABORO',
          'Niveau requis : Débutant',
          'Inclus : matériel de test STRYD, collation'
        ],
        programme: [
          'Accueil et présentation des équipements trail essentiels',
          'Conseils posture et foulée adaptées au trail',
          'Sortie terrain 45min sur le parc du Grand Gouffre',
          'Retour en boutique : conseils personnalisés et débrief'
        ]
      }
    },
    'R-B3': {
      titre: 'Ressource B3 — Coût prévisionnel des ateliers Trail',
      type: 'cout',
      data: {
        fixes: [
          {poste:'Matériel fixe (dossards, chronomètres, GPS)',montant:180},
          {poste:'Communication (affiches, flyers)',montant:150},
        ],
        variables: [
          {poste:'Honoraires coach trail (par atelier)',montant:80},
          {poste:'Collation participants (par atelier)',montant:12},
        ],
        nb_ateliers: 8
      }
    },
    'R-B4': {
      titre: 'Ressource B4 — Planning de réservation ateliers Trail (novembre 2024)',
      type: 'tableau',
      data: {
        headers: ['Atelier','Date','Places disponibles','Réservations'],
        rows: [
          ['Atelier Trail #1','02/11/2024',10,3],
          ['Atelier Trail #2','09/11/2024',10,5],
          ['Atelier Trail #3','16/11/2024',10,4],
          ['Atelier Trail #4','23/11/2024',10,6],
          ['Atelier Trail #5','30/11/2024',10,2],
          ['Atelier Trail #6','07/12/2024',10,3],
          ['Atelier Trail #7','14/12/2024',10,4],
          ['Atelier Trail #8','21/12/2024',10,1],
        ],
        footer: 'Prix de l\'atelier : 35€ TTC/personne'
      }
    },
    'R-B5': {
      titre: 'Ressource B5 — Compte Instagram LABORO Sport & Outdoor',
      type: 'instagram',
      data: {
        compte: 'laboro_sport_evry',
        publications: 312,
        followers: 1840,
        suivis: 423,
        bio: 'LABORO Sport & Outdoor — Évry-Courcouronnes (91)\nTon spécialiste running, trail & sports collectifs 🏃⚽🏀\nDu lundi au samedi 9h-19h30'
      }
    },
    'R-B6': {
      titre: 'Ressource B6 — Conseils pour réaliser une publication Instagram',
      type: 'conseils',
      data: [
        {element:'Titre', conseil:'Piquer la curiosité avec un titre accrocheur'},
        {element:'Contenu', conseil:'Partager une histoire, des astuces ou des conseils'},
        {element:'Hashtags', conseil:'Catégoriser le contenu pour le rendre visible'},
        {element:'Visuel', conseil:'Choisir un visuel attractif pour capter l\'attention'},
        {element:'Call to action', conseil:'Inciter les lecteurs à passer à l\'action (commenter, s\'inscrire, partager)'},
      ]
    },
    'R-B7': {
      titre: 'Ressource B7 — Interactions publication Instagram ateliers Trail',
      type: 'tableau',
      data: {
        headers: ['Interactions','Résultats'],
        rows: [
          ['Likes','47'],
          ['Commentaires','12'],
          ['Partages','8'],
          ['Followers','1 840'],
        ]
      }
    },
    'R-B8': {
      titre: 'Ressource B8 — Calcul et pertinence du taux d\'engagement Instagram',
      type: 'texte',
      data: `Le taux d'engagement mesure le rapport entre les interactions générées par une publication et le nombre d'abonnés du compte.

Formule : Taux d'engagement = (Likes + Commentaires + Partages) / Followers × 100

Échelle de référence :
• 1% ou moins : faible taux d'engagement
• Entre 1% et 1,5% : taux moyen
• Entre 1,5% et 3,5% : bon taux d'engagement
• Entre 3,5% et 6% : taux élevé
• 6% ou plus : taux très élevé

Plus la communauté est petite, plus le taux d'engagement est naturellement élevé.`
    }
  }
};

// ══════════════════════════════════════════
// RENDU DU PANEL E2 AGEC

// ══════════════════════════════════════════
// PRÉPARATION E2 PVOC — SUJET FICTIF LABORO
// ══════════════════════════════════════════

function renderE2AGEC(){
  const el = document.getElementById('e2-home');
  if(!el) return;
  const s = E2_AGEC_SUJET;

  // Récupérer la progression de l'élève dans E2
  const ud = gUD();
  if(!ud.e2) ud.e2 = {};

  // Déterminer quelle vue afficher
  const view = ud.e2.currentView || 'home';

  if(view === 'home') renderE2Home(el, s, ud);
  else if(view.startsWith('mission-')) renderE2Mission(el, s, ud, view);
  else if(view.startsWith('ressources-')) renderE2Ressources(el, s, ud, view);
  else if(view.startsWith('corrige-')) renderE2Corrige(el, s, ud, view);
  else renderE2Home(el, s, ud);
}

function setE2View(view){
  const ud = gUD();
  if(!ud.e2) ud.e2 = {};
  ud.e2.currentView = view;
  sUD(ud);
  renderE2AGEC();
}

function renderE2Home(el, s, ud){
  el.innerHTML =
    // Header
    '<div style="background:linear-gradient(135deg,#1A2E4A,#B7410E);border-radius:16px;padding:24px 28px;color:#fff;margin-bottom:20px">'
    + '<div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Baccalauréat Professionnel MCV — Option AGEC</div>'
    + '<div style="font-size:22px;font-weight:900;margin-bottom:4px">Préparation E2 — Analyse et résolution de situations professionnelles</div>'
    + '<div style="font-size:13px;color:rgba(255,255,255,.8)">Entraînement sur sujet fictif LABORO Sport & Outdoor · Évry-Courcouronnes (91)</div>'
    + '<div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap">'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">📋 2 missions · 5 activités</span>'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">⏱ Durée 3h</span>'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">🧮 Calculatrice autorisée</span>'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">Coefficient 4</span>'
    + '</div>'
    + '</div>'

    // Contexte professionnel
    + '<div style="background:#fff;border-radius:14px;padding:20px 24px;border:1px solid var(--gb);margin-bottom:20px">'
    + '<div style="font-size:11px;font-weight:800;color:#B7410E;text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px">📍 Contexte professionnel</div>'
    + '<div style="display:flex;align-items:center;gap:16px;margin-bottom:14px;padding:14px;background:#F8FAFF;border-radius:10px">'
    + '<div style="width:52px;height:52px;background:#1A2E4A;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;flex-shrink:0">L</div>'
    + '<div><div style="font-size:15px;font-weight:900;color:#1A2E4A">LABORO Sport & Outdoor</div>'
    + '<div style="font-size:11px;color:#6B7280">Évry-Courcouronnes (91) · Responsable : Romain Sauzet</div></div>'
    + '</div>'
    + '<div style="font-size:12px;color:#374151;line-height:1.8;white-space:pre-line">'+s.contexte+'</div>'
    + '</div>'

    // Bouton dossier ressources
    + '<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:12px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px">'
    + '<span style="font-size:24px">📂</span>'
    + '<div style="flex:1"><div style="font-size:12px;font-weight:800;color:#92400E;margin-bottom:2px">Dossier Ressources disponible</div>'
    + '<div style="font-size:11px;color:#B45309">16 ressources (A1-A8 et B1-B8) — à consulter lors de chaque activité</div></div>'
    + '<button onclick="setE2View(\'ressources-all\')" style="background:#B7410E;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap">Voir les ressources →</button>'
    + '</div>'

    // Missions
    + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:12px">Missions</div>'
    + '<div style="display:flex;flex-direction:column;gap:10px">'
    + s.missions.map(function(m){
        const nbQ = m.activites.reduce(function(acc,a){ return acc+a.consignes.length; }, 0);
        const nbActs = m.activites.length;
        const mColor = m.id==='M1' ? '#1A2E4A' : '#B7410E';
        return '<div style="background:#fff;border-radius:12px;padding:16px 20px;border:1px solid var(--gb);border-left:4px solid '+mColor+';cursor:pointer" onclick="setE2View(\'mission-'+m.id+'\')">'
          + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">'
          + '<div style="font-size:13px;font-weight:800;color:'+mColor+'">'+m.titre+'</div>'
          + '<span style="font-size:20px">→</span>'
          + '</div>'
          + '<div style="font-size:11px;color:#6B7280;margin-bottom:10px">'+m.intro.substring(0,120)+'...</div>'
          + '<div style="display:flex;gap:8px">'
          + '<span style="background:#EBF4FF;color:#2D5282;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+nbActs+' activités</span>'
          + '<span style="background:#F0FFF4;color:#276749;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+nbQ+' questions</span>'
          + '</div>'
          + '</div>';
      }).join('')
    + '</div>';
}

function renderE2Mission(el, s, ud, view){
  const mId = view.replace('mission-','');
  const m = s.missions.find(function(x){ return x.id===mId; });
  if(!m){ renderE2Home(el,s,ud); return; }
  const mColor = m.id==='M1' ? '#1A2E4A' : '#B7410E';

  el.innerHTML =
    // Breadcrumb
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
    + '<button onclick="setE2View(\'home\')" style="background:none;border:none;color:var(--bl);font-size:12px;font-weight:600;cursor:pointer;padding:0">← Retour au sujet</button>'
    + '<span style="color:var(--gm)">·</span>'
    + '<span style="font-size:12px;color:var(--gm)">'+m.titre+'</span>'
    + '</div>'

    // En-tête mission
    + '<div style="background:linear-gradient(135deg,'+mColor+'EE,'+mColor+'BB);border-radius:14px;padding:20px 24px;color:#fff;margin-bottom:20px">'
    + '<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">'+m.id+'</div>'
    + '<div style="font-size:18px;font-weight:900;margin-bottom:8px">'+m.titre+'</div>'
    + '<div style="font-size:12px;color:rgba(255,255,255,.85);line-height:1.6">'+m.intro+'</div>'
    + '</div>'

    // Activités
    + m.activites.map(function(act){
        return '<div style="background:#fff;border-radius:14px;padding:0;border:1px solid var(--gb);margin-bottom:16px;overflow:hidden">'

          // En-tête activité
          + '<div style="background:#F8FAFF;padding:14px 20px;border-bottom:1px solid var(--gb);display:flex;align-items:center;justify-content:space-between">'
          + '<div style="font-size:12px;font-weight:800;color:#1A2E4A">'+act.titre+'</div>'
          + '<div style="display:flex;gap:6px">'
          + act.consignes.map(function(c){ return '<span style="background:#EBF4FF;color:#2D5282;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px">'+c.num+'</span>'; }).join('')
          + '</div>'
          + '</div>'

          // Ressources de l'activité
          + (function(){
              const allRess = act.consignes.reduce(function(acc,c){ return acc.concat(c.ressources); },[]);
              const uniqRess = allRess.filter(function(v,i,a){ return a.indexOf(v)===i; });
              return uniqRess.length ? '<div style="padding:8px 20px;background:#FFFBEB;border-bottom:1px solid #FEF3C7;font-size:10px;color:#92400E;font-weight:600">📂 Ressources : '+uniqRess.map(function(r){ return '<span onclick="setE2View(\'ressources-'+r+'\')" style="cursor:pointer;text-decoration:underline;margin-right:6px">'+r+'</span>'; }).join('')+'</div>' : '';
            })()

          // Questions
          + '<div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px">'
          + act.consignes.map(function(c){
              const typeIcon = c.type==='calcul' ? '🧮' : '✍️';
              const typeBg = c.type==='calcul' ? '#EBF8FF' : '#F0FFF4';
              const typeColor = c.type==='calcul' ? '#2D5282' : '#276749';
              return '<div style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden">'
                + '<div style="padding:12px 14px;background:#FAFAFA;display:flex;align-items:flex-start;gap:10px">'
                + '<span style="font-size:13px;font-weight:900;color:'+mColor+';flex-shrink:0;min-width:28px">'+c.num+'</span>'
                + '<div style="flex:1">'
                + '<div style="font-size:12px;color:#1A2E4A;line-height:1.6;margin-bottom:8px">'+c.texte+'</div>'
                + '<div style="display:flex;gap:6px;flex-wrap:wrap">'
                + '<span style="background:'+typeBg+';color:'+typeColor+';font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px">'+typeIcon+' '+c.type+'</span>'
                + '<span style="background:#F3F4F6;color:#6B7280;font-size:9px;font-weight:600;padding:2px 8px;border-radius:10px">'+c.points+' pt'+(c.points>1?'s':'')+'</span>'
                + c.ressources.map(function(r){ return '<span onclick="setE2View(\'ressources-'+r+'\')" style="background:#FEF3C7;color:#92400E;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;cursor:pointer">📂 '+r+'</span>'; }).join('')
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div style="padding:8px 14px;background:#fff;text-align:right;border-top:1px solid #F3F4F6">'
                + '<button onclick="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline-block\'" style="background:#F0FDF4;color:#166534;border:1.5px solid #A7F3D0;padding:6px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer">✅ J\'ai répondu</button>'
                + '<button onclick="setE2View(\'corrige-'+c.num+'\')" style="display:none;background:'+mColor+';color:#fff;border:none;padding:6px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer">Voir le corrigé →</button>'
                + '</div>'
                + '</div>';
            }).join('')
          + '</div>'
          + '</div>';
      }).join('');
}

function renderE2Ressources(el, s, ud, view){
  const rId = view.replace('ressources-','');
  const ressToShow = rId==='all' ? Object.keys(s.ressources) : [rId];
  const missionView = ud.e2 && ud.e2.prevView ? ud.e2.prevView : 'home';

  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
    + '<button onclick="setE2View(\'home\')" style="background:none;border:none;color:var(--bl);font-size:12px;font-weight:600;cursor:pointer;padding:0">← Retour au sujet</button>'
    + '</div>'
    + '<div style="font-size:15px;font-weight:900;color:#1A2E4A;margin-bottom:16px">📂 Dossier Ressources — Opération Trail Automne</div>'
    + ressToShow.map(function(rId){
        const r = s.ressources[rId];
        if(!r) return '';
        return renderE2Ressource(rId, r);
      }).join('');
}

function renderE2Ressource(id, r){
  let contenu = '';

  if(r.type==='tableau'){
    contenu = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:11px">'
      + '<thead><tr>'
      + r.data.headers.map(function(h){ return '<th style="background:#1A2E4A;color:#fff;padding:8px 10px;text-align:left;font-weight:700">'+h+'</th>'; }).join('')
      + '</tr></thead><tbody>'
      + r.data.rows.map(function(row,i){
          return '<tr style="background:'+(i%2===0?'#fff':'#F8FAFF')+'">'
            + row.map(function(cell){ return '<td style="padding:7px 10px;border-bottom:1px solid #F3F4F6">'+cell+'</td>'; }).join('')
            + '</tr>';
        }).join('')
      + (r.data.footer ? '<tr><td colspan="'+r.data.headers.length+'" style="padding:8px 10px;font-size:10px;color:#6B7280;font-style:italic">'+r.data.footer+'</td></tr>' : '')
      + '</tbody></table></div>';
  }
  else if(r.type==='liste'){
    contenu = '<ul style="margin:0;padding-left:20px;font-size:12px;color:#374151;line-height:2">'
      + r.data.map(function(item){ return '<li>'+item+'</li>'; }).join('')
      + '</ul>';
  }
  else if(r.type==='texte'){
    contenu = '<div style="font-size:12px;color:#374151;line-height:1.8;white-space:pre-line">'+r.data+'</div>';
  }
  else if(r.type==='fournisseurs'){
    contenu = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">'
      + r.data.map(function(f){
          return '<div style="border:1px solid #E5E7EB;border-radius:10px;padding:14px">'
            + '<div style="font-size:12px;font-weight:800;color:#1A2E4A;margin-bottom:4px">'+f.nom+'</div>'
            + '<div style="font-size:10px;color:#6B7280;margin-bottom:8px">'+f.adresse+'</div>'
            + '<ul style="margin:0;padding-left:16px;font-size:11px;color:#374151;line-height:1.8">'
            + f.details.map(function(d){ return '<li>'+d+'</li>'; }).join('')
            + '</ul>'
            + '<div style="margin-top:8px;font-size:10px;font-weight:700;color:#B7410E;background:#FFF7ED;padding:4px 8px;border-radius:6px">✨ '+f.bonus+'</div>'
            + '</div>';
        }).join('')
      + '</div>';
  }
  else if(r.type==='fiche'){
    contenu = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
      + '<div><div style="font-size:11px;font-weight:700;color:#1A2E4A;margin-bottom:8px">Informations</div>'
      + '<ul style="margin:0;padding-left:16px;font-size:11px;color:#374151;line-height:1.9">'
      + r.data.details.map(function(d){ return '<li>'+d+'</li>'; }).join('')
      + '</ul></div>'
      + '<div><div style="font-size:11px;font-weight:700;color:#1A2E4A;margin-bottom:8px">Programme</div>'
      + '<ol style="margin:0;padding-left:16px;font-size:11px;color:#374151;line-height:1.9">'
      + r.data.programme.map(function(p){ return '<li>'+p+'</li>'; }).join('')
      + '</ol></div>'
      + '</div>';
  }
  else if(r.type==='cout'){
    const totalFixes = r.data.fixes.reduce(function(a,f){return a+f.montant;},0);
    const totalVar = r.data.variables.reduce(function(a,v){return a+v.montant;},0);
    const totalVarTot = totalVar * r.data.nb_ateliers;
    contenu = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
      + '<div><div style="font-size:11px;font-weight:700;color:#1A2E4A;margin-bottom:8px">Charges fixes (pour les '+r.data.nb_ateliers+' ateliers)</div>'
      + r.data.fixes.map(function(f){ return '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #F3F4F6;font-size:11px"><span>'+f.poste+'</span><span style="font-weight:700">'+f.montant+' €</span></div>'; }).join('')
      + '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12px;font-weight:800;color:#1A2E4A"><span>Total charges fixes</span><span>'+totalFixes+' €</span></div>'
      + '</div>'
      + '<div><div style="font-size:11px;font-weight:700;color:#1A2E4A;margin-bottom:8px">Charges variables (par atelier)</div>'
      + r.data.variables.map(function(v){ return '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #F3F4F6;font-size:11px"><span>'+v.poste+'</span><span style="font-weight:700">'+v.montant+' €</span></div>'; }).join('')
      + '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:12px;font-weight:800;color:#1A2E4A"><span>Total var. × '+r.data.nb_ateliers+' ateliers</span><span>'+totalVarTot+' €</span></div>'
      + '</div>'
      + '</div>';
  }
  else if(r.type==='instagram'){
    contenu = '<div style="background:linear-gradient(135deg,#833AB4,#FD1D1D,#F77737);border-radius:10px;padding:16px;color:#fff">'
      + '<div style="font-size:12px;font-weight:800;margin-bottom:4px">@'+r.data.compte+'</div>'
      + '<div style="display:flex;gap:20px;margin:12px 0;font-size:12px">'
      + '<div style="text-align:center"><div style="font-size:18px;font-weight:900">'+r.data.publications+'</div><div style="opacity:.8">Publications</div></div>'
      + '<div style="text-align:center"><div style="font-size:18px;font-weight:900">'+r.data.followers+'</div><div style="opacity:.8">Abonnés</div></div>'
      + '<div style="text-align:center"><div style="font-size:18px;font-weight:900">'+r.data.suivis+'</div><div style="opacity:.8">Suivis</div></div>'
      + '</div>'
      + '<div style="font-size:11px;opacity:.9;line-height:1.6;white-space:pre-line">'+r.data.bio+'</div>'
      + '</div>';
  }
  else if(r.type==='conseils'){
    contenu = '<div style="display:flex;flex-direction:column;gap:8px">'
      + r.data.map(function(c){
          return '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:#F8FAFF;border-radius:8px">'
            + '<span style="font-size:11px;font-weight:800;color:#1A2E4A;min-width:70px">'+c.element+'</span>'
            + '<span style="font-size:11px;color:#374151">'+c.conseil+'</span>'
            + '</div>';
        }).join('')
      + '</div>';
  }

  return '<div style="background:#fff;border-radius:12px;border:1px solid var(--gb);margin-bottom:14px;overflow:hidden">'
    + '<div style="background:#1A2E4A;padding:12px 16px">'
    + '<span style="font-size:10px;font-weight:800;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.8px">'+id+'</span>'
    + '<div style="font-size:12px;font-weight:700;color:#fff;margin-top:2px">'+r.titre+'</div>'
    + '</div>'
    + '<div style="padding:14px 16px">'+contenu+'</div>'
    + '</div>';
}

function renderE2Corrige(el, s, ud, view){
  const num = view.replace('corrige-','');
  // Trouver la consigne
  let found = null;
  s.missions.forEach(function(m){
    m.activites.forEach(function(a){
      a.consignes.forEach(function(c){
        if(c.num===num) found={c:c, m:m};
      });
    });
  });
  if(!found){ renderE2Home(el,s,ud); return; }
  const c = found.c;
  const m = found.m;
  const mColor = m.id==='M1' ? '#1A2E4A' : '#B7410E';

  let corrigeHtml = '';

  if(c.corrige.methode){
    corrigeHtml += '<div style="background:#EBF4FF;border-left:3px solid #2D5282;border-radius:8px;padding:12px 14px;margin-bottom:14px">'
      + '<div style="font-size:10px;font-weight:800;color:#2D5282;text-transform:uppercase;margin-bottom:6px">📐 Méthode</div>'
      + '<div style="font-size:12px;color:#1A2E4A;font-weight:600;white-space:pre-line">'+c.corrige.methode+'</div>'
      + '</div>';
  }

  if(c.corrige.tableau){
    corrigeHtml += '<div style="margin-bottom:14px;overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:11px">';
    // Générer en-têtes selon le type de question
    if(c.num==='1.1'){
      corrigeHtml += '<thead><tr>'
        + ['Référence','Produit','Stock initial','Livraison','Qté vendue','Stock théorique','Stock réel','Démarque'].map(function(h){ return '<th style="background:#1A2E4A;color:#fff;padding:7px 10px;text-align:left">'+h+'</th>'; }).join('')
        + '</tr></thead><tbody>';
      c.corrige.tableau.forEach(function(row,i){
        corrigeHtml += '<tr style="background:'+(i%2===0?'#fff':'#F8FAFF')+'">'
          + '<td style="padding:6px 10px">'+row.ref+'</td>'
          + '<td style="padding:6px 10px">'+row.produit+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.si+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.livr+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.qv+'</td>'
          + '<td style="padding:6px 10px;text-align:center;font-weight:700">'+row.st+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.sr+'</td>'
          + '<td style="padding:6px 10px;text-align:center;font-weight:800;color:'+(row.dem>0?'#C53030':row.dem<0?'#276749':'#6B7280')+'">'+(row.dem>0?'+'+row.dem:row.dem)+'</td>'
          + '</tr>';
      });
    } else if(c.num==='2.1'){
      corrigeHtml += '<thead><tr>'
        + ['Référence','Qté vendues','Besoins (+25%)','Stock réel','À commander'].map(function(h){ return '<th style="background:#1A2E4A;color:#fff;padding:7px 10px;text-align:left">'+h+'</th>'; }).join('')
        + '</tr></thead><tbody>';
      c.corrige.tableau.forEach(function(row,i){
        corrigeHtml += '<tr style="background:'+(i%2===0?'#fff':'#F8FAFF')+'">'
          + '<td style="padding:6px 10px">'+row.ref+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.qv+'</td>'
          + '<td style="padding:6px 10px;text-align:center;font-weight:700">'+row.besoin+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.sr+'</td>'
          + '<td style="padding:6px 10px;text-align:center;font-weight:800;color:#276749">'+row.cmd+'</td>'
          + '</tr>';
      });
    } else if(c.num==='2.2'){
      corrigeHtml += '<thead><tr>'
        + ['Référence','À commander','UC','Nb cartons'].map(function(h){ return '<th style="background:#1A2E4A;color:#fff;padding:7px 10px;text-align:left">'+h+'</th>'; }).join('')
        + '</tr></thead><tbody>';
      c.corrige.tableau.forEach(function(row,i){
        corrigeHtml += '<tr style="background:'+(i%2===0?'#fff':'#F8FAFF')+'">'
          + '<td style="padding:6px 10px">'+row.ref+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.cmd+'</td>'
          + '<td style="padding:6px 10px;text-align:center">'+row.uc+'</td>'
          + '<td style="padding:6px 10px;text-align:center;font-weight:800;color:#276749">'+row.nb_uc+'</td>'
          + '</tr>';
      });
    } else if(c.num==='2.3'){
      corrigeHtml += '<thead><tr>'
        + ['Fournisseur','Livr. quotidienne','Tarifs pref.','Note > 4','Délais paiement','Délai < 72h','Total /5'].map(function(h){ return '<th style="background:#1A2E4A;color:#fff;padding:7px 10px;text-align:left">'+h+'</th>'; }).join('')
        + '</tr></thead><tbody>';
      c.corrige.tableau.forEach(function(row,i){
        corrigeHtml += '<tr style="background:'+(i%2===0?'#fff':'#F8FAFF')+'">'
          + '<td style="padding:6px 10px;font-weight:600">'+row.fourn+'</td>'
          + [row.livr_j,row.tarifs,row.note,row.paiement,row.delai].map(function(v){ return '<td style="padding:6px 10px;text-align:center">'+(v?'✅':'❌')+'</td>'; }).join('')
          + '<td style="padding:6px 10px;text-align:center;font-weight:900;font-size:14px;color:'+(row.total>=4?'#276749':'#C53030')+'">'+row.total+'/5</td>'
          + '</tr>';
      });
    }
    corrigeHtml += '</tbody></table></div>';
  }

  if(c.corrige.conclusion){
    corrigeHtml += '<div style="background:#D1FAE5;border-left:3px solid #276749;border-radius:8px;padding:12px 14px;margin-bottom:14px">'
      + '<div style="font-size:10px;font-weight:800;color:#276749;text-transform:uppercase;margin-bottom:4px">✅ Conclusion</div>'
      + '<div style="font-size:12px;color:#1A2E4A;line-height:1.6">'+c.corrige.conclusion+'</div>'
      + '</div>';
  }

  if(c.corrige.calculs){
    c.corrige.calculs.forEach(function(calc){
      corrigeHtml += '<div style="background:#F8FAFF;border:1px solid #DBEAFE;border-radius:10px;padding:14px;margin-bottom:10px">'
        + '<div style="font-size:12px;font-weight:800;color:#1A2E4A;margin-bottom:10px">'+calc.produit+'</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
        + '<div style="background:#fff;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">PA HT</div><div style="font-size:18px;font-weight:900;color:#1A2E4A">'+calc.pa+' €</div></div>'
        + '<div style="background:#EBF4FF;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">PV HT</div><div style="font-size:18px;font-weight:900;color:#2D5282">'+calc.pvht+' €</div><div style="font-size:10px;color:#6B7280">('+calc.pa+' / '+(1-calc.taux_marge)+' ≈ '+calc.pvht+')</div></div>'
        + '<div style="background:#FFF7ED;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Taux marge</div><div style="font-size:18px;font-weight:900;color:#D97706">'+(calc.taux_marge*100)+'%</div></div>'
        + '<div style="background:#D1FAE5;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">PV TTC ✅</div><div style="font-size:18px;font-weight:900;color:#276749">'+calc.pvttc+' €</div><div style="font-size:10px;color:#6B7280">('+calc.pvht+' × '+(1+calc.tva)+')</div></div>'
        + '</div></div>';
    });
  }

  if(c.corrige.calcul){
    const calc = c.corrige.calcul;
    if(calc.taux !== undefined){
      corrigeHtml += '<div style="background:#F0FFF4;border:1px solid #A7F3D0;border-radius:10px;padding:16px;text-align:center">'
        + '<div style="font-size:11px;color:#6B7280;margin-bottom:8px">'+c.corrige.methode+'</div>'
        + '<div style="font-size:28px;font-weight:900;color:#276749">'+calc.taux+' %</div>'
        + '</div>';
    } else if(calc.ca !== undefined){
      corrigeHtml += '<div style="background:#F0FFF4;border:1px solid #A7F3D0;border-radius:10px;padding:16px">'
        + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Réservations</div><div style="font-size:22px;font-weight:900;color:#1A2E4A">'+calc.reservations+'</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Prix TTC</div><div style="font-size:22px;font-weight:900;color:#1A2E4A">'+calc.prix_ttc+' €</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">CA prévisionnel ✅</div><div style="font-size:22px;font-weight:900;color:#276749">'+calc.ca+' €</div></div>'
        + '</div></div>';
    } else if(calc.seuil !== undefined){
      corrigeHtml += '<div style="background:#EBF4FF;border:1px solid #BFDBFE;border-radius:10px;padding:16px">'
        + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Coût total</div><div style="font-size:20px;font-weight:900;color:#1A2E4A">'+calc.cout_total+' €</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Seuil (÷'+calc.prix_ttc+'€)</div><div style="font-size:20px;font-weight:900;color:#2D5282">'+calc.seuil+' pers.</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Supplémentaires ✅</div><div style="font-size:20px;font-weight:900;color:#276749">'+calc.supplementaires+' pers.</div></div>'
        + '</div></div>';
    } else if(calc.pvttc !== undefined && calc.taux_marge !== undefined){
      corrigeHtml += '<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:16px">'
        + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">PV TTC concurrent</div><div style="font-size:18px;font-weight:900;color:#1A2E4A">'+calc.pvttc+' €</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">PV HT</div><div style="font-size:18px;font-weight:900;color:#D97706">'+calc.pvht.toFixed(2)+' €</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Marge €</div><div style="font-size:18px;font-weight:900;color:#2D5282">'+calc.marge_e.toFixed(2)+' €</div></div>'
        + '<div><div style="font-size:9px;color:#6B7280;font-weight:700;text-transform:uppercase;margin-bottom:4px">Taux marge ✅</div><div style="font-size:18px;font-weight:900;color:#276749">'+calc.taux_marge.toFixed(2)+' %</div></div>'
        + '</div></div>';
    }
  }

  if(c.corrige.causes || c.corrige.consequences){
    if(c.corrige.causes) corrigeHtml += '<div style="margin-bottom:10px"><div style="font-size:11px;font-weight:800;color:#C53030;margin-bottom:6px">Causes :</div><ul style="margin:0;padding-left:18px;font-size:12px;color:#374151;line-height:1.8">'
      + c.corrige.causes.map(function(ca){ return '<li>'+ca+'</li>'; }).join('')
      + '</ul></div>';
    if(c.corrige.consequences) corrigeHtml += '<div><div style="font-size:11px;font-weight:800;color:#D97706;margin-bottom:6px">Conséquences :</div><ul style="margin:0;padding-left:18px;font-size:12px;color:#374151;line-height:1.8">'
      + c.corrige.consequences.map(function(co){ return '<li>'+co+'</li>'; }).join('')
      + '</ul></div>';
  }

  if(c.corrige.elements){
    if(Array.isArray(c.corrige.elements)){
      corrigeHtml += '<ul style="margin:0;padding-left:18px;font-size:12px;color:#374151;line-height:1.9">'
        + c.corrige.elements.map(function(e){ return '<li>'+e+'</li>'; }).join('')
        + '</ul>';
    } else {
      const el2 = c.corrige.elements;
      if(el2.titre) corrigeHtml += '<div style="background:#F0F4FF;border-radius:8px;padding:12px;margin-bottom:8px"><span style="font-weight:700;font-size:11px">Titre :</span> <span style="font-size:12px">'+el2.titre+'</span></div>';
      if(el2.contenu) corrigeHtml += '<div style="background:#F0F4FF;border-radius:8px;padding:12px;margin-bottom:8px"><span style="font-weight:700;font-size:11px">Contenu :</span> <div style="font-size:12px;margin-top:4px">'+el2.contenu+'</div></div>';
      if(el2.hashtags) corrigeHtml += '<div style="background:#EDE9FE;border-radius:8px;padding:12px;margin-bottom:8px"><span style="font-weight:700;font-size:11px">Hashtags :</span> <span style="font-size:12px;color:#7B2FBE">'+el2.hashtags+'</span></div>';
      if(el2.cta) corrigeHtml += '<div style="background:#FEF3C7;border-radius:8px;padding:12px"><span style="font-weight:700;font-size:11px">Call to action :</span> <span style="font-size:12px">'+el2.cta+'</span></div>';
    }
  }

  if(c.corrige.propositions || c.corrige.actions){
    const items = c.corrige.propositions || c.corrige.actions;
    corrigeHtml += '<ul style="margin:0;padding-left:18px;font-size:12px;color:#374151;line-height:1.9">'
      + items.map(function(p){ return '<li>'+p+'</li>'; }).join('')
      + '</ul>';
  }

  if(c.corrige.client || c.corrige.magasin){
    if(c.corrige.client) corrigeHtml += '<div style="margin-bottom:10px"><div style="font-size:11px;font-weight:800;color:#2D5282;margin-bottom:6px">Avantages pour le client :</div><ul style="margin:0;padding-left:18px;font-size:12px;color:#374151;line-height:1.8">'+c.corrige.client.map(function(a){ return '<li>'+a+'</li>'; }).join('')+'</ul></div>';
    if(c.corrige.magasin) corrigeHtml += '<div><div style="font-size:11px;font-weight:800;color:#276749;margin-bottom:6px">Avantages pour LABORO :</div><ul style="margin:0;padding-left:18px;font-size:12px;color:#374151;line-height:1.8">'+c.corrige.magasin.map(function(a){ return '<li>'+a+'</li>'; }).join('')+'</ul></div>';
  }

  if(c.corrige.analyse){
    corrigeHtml += '<div style="background:#F8FAFF;border-left:3px solid #4A6FA5;border-radius:8px;padding:12px 14px;font-size:12px;color:#374151;line-height:1.7">'+c.corrige.analyse+'</div>';
  }

  if(c.corrige.modele){
    corrigeHtml += '<div style="background:#F8FAFF;border:1px solid #E5E7EB;border-radius:10px;padding:14px;font-size:11px;color:#374151;white-space:pre-line;font-family:monospace;line-height:1.8">'+c.corrige.modele+'</div>';
  }

  if(c.corrige.commentaire){
    corrigeHtml += '<div style="background:#D1FAE5;border-left:3px solid #276749;border-radius:8px;padding:12px 14px;margin-top:10px"><div style="font-size:10px;font-weight:800;color:#276749;text-transform:uppercase;margin-bottom:4px">💬 Commentaire</div><div style="font-size:12px;color:#1A2E4A;line-height:1.7">'+c.corrige.commentaire+'</div></div>';
  }

  if(c.corrige.detail){
    const d = c.corrige.detail;
    corrigeHtml += '<div style="background:#F8FAFF;border:1px solid #DBEAFE;border-radius:10px;padding:14px;margin-bottom:10px">'
      + '<div style="font-size:11px;font-weight:800;color:#1A2E4A;margin-bottom:10px">Détail du calcul :</div>'
      + '<div style="display:flex;flex-direction:column;gap:6px;font-size:12px">'
      + '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #E5E7EB"><span>Charges fixes totales</span><span style="font-weight:700">'+d.fixes.total_fixes+' €</span></div>'
      + '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #E5E7EB"><span>Charges variables × '+d.nb_ateliers+' ateliers</span><span style="font-weight:700">'+d.total_variables+' €</span></div>'
      + '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;font-weight:900;color:#276749"><span>Coût total ✅</span><span>'+d.cout_total+' €</span></div>'
      + '</div></div>';
  }

  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
    + '<button onclick="setE2View(\'mission-'+m.id+'\')" style="background:none;border:none;color:var(--bl);font-size:12px;font-weight:600;cursor:pointer;padding:0">← Retour à la mission</button>'
    + '</div>'
    + '<div style="background:linear-gradient(135deg,#276749,#38A169);border-radius:14px;padding:18px 22px;color:#fff;margin-bottom:20px">'
    + '<div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">✅ Corrigé — Question '+c.num+' ('+c.points+' pt'+(c.points>1?'s':'')+')</div>'
    + '<div style="font-size:14px;font-weight:800;line-height:1.5">'+c.texte+'</div>'
    + '</div>'
    + '<div style="background:#fff;border-radius:12px;padding:20px;border:1px solid var(--gb)">'
    + corrigeHtml
    + '</div>';
}
