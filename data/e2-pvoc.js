// ================================================
//   LABORO — Préparation E2 Option PVOC
//   Sujet fictif + corrigés + fonctions de rendu
//   Version 1.0 — Architecture modulaire
// ================================================

const E2_PVOC_SUJET = {
  titre: "Opération Sport en Entreprise",
  session: "Session d'entraînement — Option PVOC",
  contexte: `LABORO Sport & Outdoor est une enseigne spécialisée dans la vente d'équipements sportifs, basée à Évry-Courcouronnes (91). L'enseigne commercialise ses produits auprès de particuliers via son showroom et son site e-commerce, ainsi qu'auprès de professionnels (clubs sportifs, comités d'entreprise, collectivités).

Vous êtes commercial(e) au sein de LABORO depuis quelques mois. Nina Chevalier, responsable prospection, vous associe à deux opérations commerciales : le lancement d'une nouvelle gamme de vêtements techniques éco-responsables \"EcoPerf\" auprès de revendeurs professionnels, puis la participation à un forum des associations sportives de l'Essonne.`,
  missions: [
    {
      id: 'M1',
      titre: 'Mission 1 — Participer à une opération de prospection',
      intro: `LABORO prépare le lancement de sa nouvelle gamme de vêtements techniques éco-responsables "EcoPerf". Nina Chevalier souhaite vous associer à cette opération de prospection auprès des clubs sportifs et comités d'entreprise de l'Essonne.`,
      activites: [
        {
          id: 'A1',
          titre: 'Activité 1 — Préparer l\'argumentaire de prospection',
          consignes: [
            {
              num: '1.1',
              texte: 'Identifier une opportunité et une menace pour LABORO sur le marché des vêtements techniques sport. Justifier chaque réponse en vous appuyant sur les ressources.',
              type: 'rédactionnel',
              ressources: ['R-A1','R-A2'],
              points: 2,
              corrige: {
                methode: 'Opportunité = facteur externe favorable à LABORO\nMenace = facteur externe défavorable à LABORO',
                reponse: `OPPORTUNITÉ : La tendance éco-responsable dans le sport est en pleine expansion (R-A2). Les acheteurs B2B (CE, clubs) sont de plus en plus sensibles aux critères RSE dans leurs appels d'offres — LABORO peut se différencier sur ce critère face à Decathlon Pro.\n\nMENACE : Le marché est dominé par des acteurs très structurés (Decathlon Pro, Intersport Pro) avec des réseaux nationaux et des prix compétitifs. LABORO, entreprise locale, doit faire face à des concurrents bénéficiant d'économies d'échelle importantes.`
              }
            },
            {
              num: '1.2',
              texte: 'Relever quatre forces et quatre faiblesses de LABORO à partir des ressources disponibles.',
              type: 'rédactionnel',
              ressources: ['R-A1','R-A3'],
              points: 4,
              corrige: {
                methode: 'Forces = atouts internes de LABORO / Faiblesses = limites internes à corriger',
                reponse: `FORCES :\n• Gamme EcoPerf certifiée éco-responsable (matières recyclées, labels)\n• Showroom physique à Évry — proximité clients Essonne\n• Conseil personnalisé et suivi commercial dédié\n• Service flocage intégré — différenciateur vs pure players\n\nFAIBLESSES :\n• Notoriété limitée face aux grandes enseignes nationales\n• Budget communication réduit\n• Réseau de distribution encore restreint (Essonne uniquement)\n• Délai de livraison flocage (3 semaines) parfois supérieur à certains concurrents`
              }
            },
            {
              num: '1.3',
              texte: 'Proposer deux solutions pour remédier aux faiblesses de LABORO en justifiant chaque réponse.',
              type: 'rédactionnel',
              ressources: ['R-A3'],
              points: 2,
              corrige: {
                reponse: `SOLUTION 1 — Développer la notoriété par le digital :\nCréer un compte LinkedIn professionnel dédié aux acheteurs B2B (CE, clubs) pour diffuser des témoignages clients, des cas concrets et des offres. Coût faible, portée ciblée. Cette action répond directement à la faiblesse "notoriété limitée" en touchant les décisionnaires là où ils se trouvent.\n\nSOLUTION 2 — Réduire le délai de flocage :\nNégocier avec le prestataire flocage un service express (7 jours) pour les commandes urgentes, avec surcoût limité répercuté sur le client. Cela répond à la faiblesse "délai flocage 3 semaines" et améliore la compétitivité sur les appels d'offres à délai court.`
              }
            },
            {
              num: '1.4',
              texte: 'Mesurer et analyser les performances de la publication LinkedIn de LABORO sur la gamme EcoPerf. Proposer un axe d\'amélioration.',
              type: 'calcul',
              ressources: ['R-A4'],
              points: 3,
              corrige: {
                methode: 'Taux d\'engagement = (Likes + Commentaires + Partages) ÷ Abonnés × 100\nÉchelle LinkedIn B2B : < 2% faible · 2–4% moyen · 4–6% bon · > 6% excellent',
                calcul: {taux: '4,1', detail: '(28 + 6 + 7) ÷ 1 000 × 100 = 4,1%'},
                conclusion: `Le taux d'engagement de 4,1 % est BON pour une publication LinkedIn B2B. Cela signifie que le contenu EcoPerf intéresse la communauté professionnelle de LABORO.\n\nAXE D'AMÉLIORATION : La publication ne comporte pas de call-to-action (CTA) explicite. Ajouter une invitation concrète ("Contactez-nous pour un devis personnalisé" ou "Visitez notre showroom sur RDV") permettrait de transformer l'engagement en opportunités commerciales qualifiées.`
              }
            }
          ]
        },
        {
          id: 'A2',
          titre: 'Activité 2 — Mettre en œuvre l\'opération de prospection',
          consignes: [
            {
              num: '1.5',
              texte: 'Identifier quatre intérêts pour les clubs sportifs et comités d\'entreprise de proposer la gamme EcoPerf à leurs adhérents.',
              type: 'rédactionnel',
              ressources: ['R-A5','R-A6'],
              points: 2,
              corrige: {
                reponse: `1. VALORISATION RSE : proposer des équipements éco-responsables améliore l'image du CE ou du club auprès de leurs adhérents — argument fort dans les rapports d'activité.\n2. PRIX COMPÉTITIFS AVEC REMISE VOLUME : les tarifs préférentiels B2B (jusqu'à 15% de remise dès 30 unités) permettent d'équiper les membres à moindre coût.\n3. FLOCAGE PERSONNALISÉ INCLUS : différencie le club avec des équipements aux couleurs de l'association — identité visuelle valorisante.\n4. CONSEIL ET SUIVI DÉDIÉ : un interlocuteur commercial unique gère les commandes, les tailles, les délais — gain de temps pour le responsable achats.`
              }
            },
            {
              num: '1.6',
              texte: 'Sélectionner les cibles de l\'opération de prospection à partir du fichier prospects et justifier les choix. L\'opération cible les structures avec un budget sport > 3 000 € HT et situées dans le 91.',
              type: 'rédactionnel',
              ressources: ['R-A7'],
              points: 3,
              corrige: {
                reponse: `CIBLES SÉLECTIONNÉES (budget sport > 3 000 € HT, département 91) :\n\n• CE Safran Massy — Budget 8 500 € — Massy (91) ✅\n• CE PSA Stellantis Évry — Budget 6 200 € — Évry (91) ✅\n• AS Courcouronnes Football — Budget 4 100 € — Courcouronnes (91) ✅\n• Mairie de Ris-Orangis — Budget 5 800 € — Ris-Orangis (91) ✅\n• Club Athlétisme Corbeil-Essonnes — Budget 3 400 € — Corbeil (91) ✅\n\nEXCLUS :\n• AS Longjumeau Basket — Budget 1 800 € — sous le seuil\n• CE Amazon Brétigny — Brétigny (91) mais budget 2 200 € — sous le seuil\n\nJUSTIFICATION : les 5 cibles sélectionnées répondent aux deux critères (91 + budget > 3 000 €). Elles représentent le potentiel commercial le plus immédiat pour LABORO.`
              }
            },
            {
              num: '1.7',
              texte: 'Rédiger le plan d\'appel téléphonique structuré pour convaincre les prospects sélectionnés de commander la gamme EcoPerf en leur communiquant l\'offre de lancement (remise 15% valable jusqu\'au vendredi soir).',
              type: 'rédactionnel',
              ressources: ['R-A6','R-A7'],
              points: 5,
              corrige: {
                methode: 'Structure plan d\'appel : Prise de contact → Accroche → Découverte des besoins → Argumentation → Traitement des objections → Conclusion → Prise de congé',
                reponse: `PLAN D'APPEL — Gamme EcoPerf LABORO\n\n📞 PRISE DE CONTACT\n"Bonjour, je suis [Prénom] de LABORO Sport & Outdoor à Évry. Je souhaitais joindre [Nom du responsable achats / CE], est-il(elle) disponible ?"\n\n🎯 ACCROCHE\n"Je vous contacte car nous venons de lancer notre gamme EcoPerf — des équipements sportifs certifiés éco-responsables à des prix très compétitifs pour les structures comme la vôtre. En ce moment, nous proposons une remise de 15% pour toute première commande passée avant vendredi soir."\n\n🔍 DÉCOUVERTE DES BESOINS\n"Pour vous faire une proposition adaptée : quel type d'équipements commandez-vous habituellement pour vos membres ? En quelle quantité et à quelle fréquence ? Avez-vous des engagements RSE ou une charte environnementale dans votre structure ?"\n\n💬 ARGUMENTATION (méthode CAB)\n"Notre gamme EcoPerf est fabriquée à 60% de matières recyclées, certifiée OEKO-TEX, avec flocage personnalisé inclus et livraison 48h sur l'Essonne. Ce qui signifie pour vous des équipements valorisants pour vos membres, à un prix inférieur de 10 à 15% à nos concurrents nationaux, sans effort logistique de votre côté."\n\n⚡ TRAITEMENT OBJECTION PRIX\n"Je comprends que le prix soit un critère important. Sachez qu'avec la remise de lancement 15% et votre volume estimé, votre commande vous reviendra à [X] € HT — soit [Y] € de moins qu'avec votre fournisseur actuel pour la même qualité."\n\n✅ CONCLUSION\n"Je vous propose de vous envoyer notre catalogue EcoPerf avec la grille tarifaire B2B personnalisée. Si vous me confirmez votre commande avant vendredi, je vous garantis la remise de 15% et je prends en charge personnellement le suivi. Puis-je vous envoyer ça dans l'heure ?"`
              }
            },
            {
              num: '1.8',
              texte: 'Analyser les retombées quantitatives de l\'opération. Calculer le chiffre d\'affaires total, le taux de transformation et la marge réalisée sur les ventes. Le prix d\'achat HT unitaire des articles EcoPerf est de 18 €.',
              type: 'calcul',
              ressources: ['R-A8','R-A9'],
              points: 4,
              corrige: {
                methode: `CALCULS :\n\nCA TOTAL HT = somme des montants commandes reçues\n= 2 856 + 1 904 + 3 332 + 2 380 = 10 472 € HT\n\nOBJECTIF : 10 000 € HT → OBJECTIF DÉPASSÉ ✅\n\nTAUX DE TRANSFORMATION = Prospects ayant commandé ÷ Prospects contactés × 100\n= 4 ÷ 5 × 100 = 80 %\n\nOBJECTIF : 70 % → OBJECTIF DÉPASSÉ ✅\n\nNOMBRE TOTAL D'ARTICLES VENDUS = 34 + 22 + 40 + 28 = 124 articles\n\nPRIX DE VENTE UNITAIRE HT MOYEN (après remise 15%)\n= Prix catalogue HT × (1 - 0,15)\nLot R06 : 2 856 ÷ 34 = 84 € HT/u\n\nMARGE UNITAIRE = 84 - 18 = 66 € HT/u\nMARGE TOTALE = 66 × 124 = 8 184 € HT\n\nTAUX DE MARGE = 66 ÷ 84 × 100 = 78,6 %\n\nANALYSE : L'opération est un succès commercial. Le CA et le taux de transformation dépassent tous deux les objectifs fixés. La marge de 78,6% confirme la rentabilité de l'opération malgré la remise de 15%.`,
                calcul: {taux: '80', detail: '4 commandes ÷ 5 prospects × 100'}
              }
            }
          ]
        }
      ]
    },
    {
      id: 'M2',
      titre: 'Mission 2 — Mettre en œuvre une opération de prospection événementielle',
      intro: `Pour développer sa clientèle B2C et B2B, LABORO participe au Forum des Associations Sportives de l'Essonne qui se tient en septembre à Évry. Nina Chevalier vous confie la préparation de la communication digitale et l'animation du stand.`,
      activites: [
        {
          id: 'A3',
          titre: 'Activité 1 — Préparer la participation à l\'événement',
          consignes: [
            {
              num: '2.1',
              texte: 'Concevoir le post Instagram pour inviter vos abonnés sur le stand LABORO lors du Forum des Associations Sportives de l\'Essonne.',
              type: 'rédactionnel',
              ressources: ['R-B1','R-B2','R-B3'],
              points: 4,
              corrige: {
                methode: 'Éléments d\'un post Instagram réussi : photo qualitative · texte accrocheur · lien · influenceur · hashtags · call-to-action',
                reponse: `📸 VISUEL : Photo dynamique du stand LABORO avec la gamme EcoPerf mise en valeur + présence de Jordan Vidal en tenue LABORO (influenceur sportif Essonne)\n\n✍️ TEXTE :\n"🏃 Forum des Assos Sportives de l'Essonne — on vous attend !\n\nVenez découvrir notre nouvelle gamme EcoPerf 🌿 : des équipements techniques certifiés éco-responsables, avec flocage personnalisé aux couleurs de votre club.\n\nRencontrez Jordan Vidal et toute l'équipe LABORO samedi à Évry ! 🎯\nOffre exclusive sur le stand : -10% sur la gamme EcoPerf le jour J.\n\n📍 Stand LABORO — Gymnase Agora, Évry-Courcouronnes\n🗓 Samedi [date], 9h–18h\n🔗 Lien en bio : laboro-sport.fr"\n\n#LaboRoSport #EcoPerf #ForumAssoEssonne #SportEcoResponsable #EquipementSportif #Essonne #NouvelleCollection #FlocagePerso`
              }
            },
            {
              num: '2.2',
              texte: 'Rédiger quatre questions permettant de découvrir les différents besoins d\'un prospect club sportif pour déclencher l\'achat d\'équipements EcoPerf.',
              type: 'rédactionnel',
              ressources: ['R-B2'],
              points: 4,
              corrige: {
                methode: 'Questions de découverte : alterner questions ouvertes (contexte, besoins) et questions fermées (confirmation)',
                reponse: `Q1 — Contexte (ouverte) : "Vous représentez quel type d'association — club de foot, asso de course à pied, arts martiaux ? Combien d'adhérents comptez-vous cette saison ?"\n\nQ2 — Besoins (ouverte) : "Quels équipements achetez-vous régulièrement pour vos membres — maillots, survêtements, chaussures, accessoires ? Vous les commandez à quelle fréquence ?"\n\nQ3 — Motivations (semi-ouverte) : "Est-ce que la démarche éco-responsable est quelque chose d'important pour votre club ou vos adhérents ? Avez-vous une charte environnementale ?"\n\nQ4 — Budget / Timing (fermée) : "Vous avez habituellement un budget annuel équipements autour de combien ? Votre prochaine commande, c'est pour quand ?"`
              }
            },
            {
              num: '2.3',
              texte: 'Formuler trois réponses différenciées à l\'objection suivante : "Vos équipements EcoPerf sont plus chers que ceux de Decathlon Pro."',
              type: 'rédactionnel',
              ressources: ['R-B2','R-B4'],
              points: 3,
              corrige: {
                methode: 'Méthode de traitement des objections : Écouter → Reformuler → Répondre avec argument → Vérifier',
                reponse: `RÉPONSE 1 — Argument qualité/durabilité :\n"Je comprends que le prix soit un point de vigilance. Nos équipements EcoPerf sont fabriqués pour durer minimum 5 ans versus 2–3 ans pour une gamme entrée de prix. Rapporté au coût par utilisation, ils reviennent souvent moins chers à terme. Et avec le flocage intégré, vous économisez le coût de personnalisation."\n\nRÉPONSE 2 — Argument différence de valeur :\n"C'est vrai que notre prix catalogue est légèrement supérieur. Mais contrairement à Decathlon Pro, vous bénéficiez d'un commercial dédié qui gère tout pour vous — tailles, commandes, relances — et d'une livraison en 48h sur l'Essonne. Pour un responsable de club bénévole, le temps que vous économisez a aussi une valeur."\n\nRÉPONSE 3 — Argument concession / offre du jour :\n"Aujourd'hui sur le forum, nous avons une offre exclusive : -10% sur toute première commande EcoPerf passée avant ce soir. Sur une commande de 30 maillots, ça représente [X] € d'économie. Je vous prépare un devis personnalisé en 5 minutes, qu'est-ce que vous en pensez ?"`
              }
            },
            {
              num: '2.4',
              texte: 'Proposer une prise de congé permettant de fidéliser les nouveaux acheteurs rencontrés sur le stand.',
              type: 'rédactionnel',
              ressources: ['R-B2'],
              points: 2,
              corrige: {
                reponse: `PRISE DE CONGÉ FIDÉLISANTE :\n\n"Merci pour votre commande — je suis ravi(e) de vous accueillir dans la famille LABORO ! Voici ma carte avec mes coordonnées directes : n'hésitez pas à m'appeler pour toute question sur la livraison ou le flocage.\n\nJe vais vous ajouter à notre newsletter professionnelle — vous recevrez en avant-première nos nouvelles collections et nos offres réservées aux clubs partenaires.\n\nOn se retrouve sur le forum l'année prochaine, et d'ici là je vous contacte en janvier pour préparer la commande printemps. Bon événement !"\n\nACTIONS POST-STAND à effectuer dans les 24h :\n• Envoyer un mail de confirmation de commande avec récapitulatif\n• Saisir le contact dans KepkaPro avec toutes ses informations\n• Planifier le prochain appel de suivi à J+30`
              }
            }
          ]
        },
        {
          id: 'A4',
          titre: 'Activité 2 — Évaluer l\'opération de prospection événementielle',
          consignes: [
            {
              num: '2.5',
              texte: 'Estimer les montants des commissions par vendeur. Les commissions sont de 8% sur les ventes HT. Pour calculer le montant HT, utiliser : PVTTC ÷ 1,20.',
              type: 'calcul',
              ressources: ['R-B5','R-B6'],
              points: 3,
              corrige: {
                methode: 'CA HT = CA TTC ÷ 1,20\nCommission = CA HT × 8%',
                reponse: `VENDEUR YANIS :\nCA TTC = 330 € × 18 = 5 940 €\nCA HT = 5 940 ÷ 1,20 = 4 950 € HT\nCommission = 4 950 × 8% = 396 € HT\n\nVENDEUSE NINA :\nCA TTC = 330 € × 22 = 7 260 €\nCA HT = 7 260 ÷ 1,20 = 6 050 € HT\nCommission = 6 050 × 8% = 484 € HT\n\nVENDEUR JORDAN :\nCA TTC = 330 € × 27 = 8 910 €\nCA HT = 8 910 ÷ 1,20 = 7 425 € HT\nCommission = 7 425 × 8% = 594 € HT\n\nTOTAL COMMISSIONS = 396 + 484 + 594 = 1 474 € HT`
              }
            },
            {
              num: '2.6',
              texte: 'Déterminer les coûts hors taxes de l\'opération Forum des Associations Sportives à partir des informations transmises par Nina Chevalier.',
              type: 'calcul',
              ressources: ['R-B7','R-B8'],
              points: 4,
              corrige: {
                methode: 'Additionner tous les postes de coûts en HT\nPour les coûts exprimés TTC : diviser par 1,20',
                reponse: `TABLEAU DES COÛTS HT :\n\n• Location emplacement forum : 65 € × 2 jours = 130 € HT\n• Location stand et mobilier : 420 € HT\n• Forfait repas 3 personnes × 2 jours : 35 € × 3 × 2 = 210 € HT\n• Transport Évry/Gymnase Agora A/R : 0,50 € × 18 km × 2 = 18 € HT\n• Forfait salaires fixes (2 jours) : 600 € HT\n• Goodies LABORO (stylos, sacs) : 96 € HT\n• Totaux commissions vendeurs : 1 474 € HT\n\n──────────────────────────\nTOTAL COÛTS OPÉRATION : 2 948 € HT`
              }
            },
            {
              num: '2.7',
              texte: 'Analyser la rentabilité quantitative de l\'opération. Calculer le CA HT total réalisé sur le stand, le coût total HT et le résultat. Conclure sur la rentabilité.',
              type: 'calcul',
              ressources: ['R-B5','R-B7','R-B8'],
              points: 3,
              corrige: {
                methode: 'CA HT = CA TTC ÷ 1,20\nRésultat = CA HT − Coût total HT\nRentabilité = Résultat ÷ Coût total HT × 100',
                reponse: `CA TTC TOTAL = 330 € × (18 + 22 + 27) = 330 × 67 = 22 110 € TTC\nCA HT TOTAL = 22 110 ÷ 1,20 = 18 425 € HT\n\nCOÛT TOTAL OPÉRATION = 2 948 € HT\n(voir détail question 2.6)\n\nRÉSULTAT = 18 425 − 2 948 = 15 477 € HT\n\nRATIO RENTABILITÉ = 15 477 ÷ 2 948 × 100 = 524,9 %\n\nCONCLUSION : L'opération est très rentable. Pour 1 € investi, LABORO génère plus de 6 € de CA HT. Le résultat positif de 15 477 € HT valide la participation au Forum des Associations Sportives. Nina Chevalier peut reconduire et amplifier cette opération l'année suivante.`
              }
            },
            {
              num: '2.8',
              texte: 'Proposer quatre retombées qualitatives possibles de cette opération pour LABORO.',
              type: 'rédactionnel',
              ressources: ['R-B5'],
              points: 2,
              corrige: {
                reponse: `1. NOTORIÉTÉ LOCALE : la présence physique au Forum des Associations de l'Essonne renforce la visibilité de LABORO auprès de son cœur de cible B2B local — associations et clubs. L'effet "vu sur le forum" crédibilise la marque.\n\n2. CRÉATION D'UNE BASE DE CONTACTS QUALIFIÉS : les fiches prospects collectées sur le stand alimentent directement le CRM KepkaPro — ces contacts sont des acheteurs potentiels pour les prochaines saisons.\n\n3. TEST PRODUIT EN CONDITIONS RÉELLES : la réaction des visiteurs face à la gamme EcoPerf (retours, objections, intérêts) fournit des informations précieuses pour ajuster le positionnement et l'argumentaire commercial.\n\n4. FIDÉLISATION ET PRESCRIPTION : les clubs acheteurs sur le stand deviennent des ambassadeurs locaux — leur satisfaction et l'affichage de leurs équipements flocagés LABORO génèrent du bouche-à-oreille dans le réseau associatif.`
              }
            }
          ]
        }
      ]
    }
  ],
  ressources: {
    'R-A1': {
      titre: 'LABORO présente sa nouvelle gamme EcoPerf',
      type: 'texte',
      data: `Bonjour,\n\nNous sommes heureux de vous présenter notre nouvelle gamme EcoPerf, lancée en partenariat avec notre équipe R&D et des associations locales de sport en entreprise.\n\nLABORO Sport & Outdoor, c'est 6 ans d'expérience dans l'équipement sportif en Essonne, un showroom à Évry-Courcouronnes, une boutique en ligne et aujourd'hui plus de 45 clients B2B actifs (CE, clubs, collectivités).\n\nNotre chiffre d'affaires stagne depuis 18 mois et notre taux de notoriété auprès des structures associatives reste trop faible. Notre ambition est d'augmenter le CA B2B de 20% en 12 mois grâce au lancement EcoPerf.\n\nNina Chevalier, Responsable Prospection LABORO\n\nSource : Document interne LABORO`
    },
    'R-A2': {
      titre: 'Le marché du sport éco-responsable en France',
      type: 'texte',
      data: `Le sport éco-responsable connaît une croissance de 14% par an depuis 2020. Les acheteurs institutionnels (CE, mairies, associations) intègrent désormais des critères environnementaux dans 62% de leurs appels d'offres sport (source : Observatoire du Sport Responsable 2023).\n\nLes principaux acteurs du marché (Decathlon, Intersport, Go Sport) proposent désormais leurs propres gammes "green", intensifiant la concurrence. Cependant, la demande de proximité et de conseil personnalisé reste un levier non exploité par les grandes enseignes.\n\nLe marché des équipements sport B2B en Essonne est estimé à 8–12 millions d'euros par an.\n\nSource : Étude FFF Sport & Responsabilité 2023`
    },
    'R-A3': {
      titre: 'Caractéristiques et engagements de la gamme EcoPerf',
      type: 'liste',
      data: [
        'Fabriquée à 60% de matières recyclées (bouteilles PET, fibres textiles récupérées)',
        'Certifiée OEKO-TEX Standard 100 — aucune substance nocive',
        'Label GRS (Global Recycled Standard) — traçabilité des matières',
        'Durabilité testée : résistance 5 ans minimum en usage intensif',
        'Service flocage personnalisé inclus dans le tarif B2B (délai 3 semaines)',
        'Gamme mixte : maillots, survêtements, vestes, shorts, chaussettes',
        'Tailles XS à 3XL — large couverture pour toutes les morphologies',
        'Prix revendeur : 62 € HT par article · Prix public conseillé : 98 € TTC',
        'Remise B2B : 8% dès 15 unités · 12% dès 30 unités · 15% dès 50 unités',
        'Livraison 48h sur l\'Essonne — gratuite dès 500 € HT de commande',
        'FAIBLESSE IDENTIFIÉE : délai flocage 3 semaines (vs 2 semaines chez certains concurrents)',
        'FAIBLESSE IDENTIFIÉE : budget communication limité — notoriété faible hors Essonne'
      ]
    },
    'R-A4': {
      titre: 'Publication LinkedIn LABORO sur la gamme EcoPerf',
      type: 'instagram',
      data: {
        compte: 'laboro_sport_pro',
        publications: 84,
        followers: '1 000',
        suivis: 312,
        bio: 'Publication du 12 septembre\n\n🌿 LABORO lance sa gamme EcoPerf !\nDes équipements sportifs techniques, certifiés éco-responsables, à destination des clubs et CE de l\'Essonne.\nFlocage personnalisé · Livraison 48h · Conseil dédié\n\n📊 STATISTIQUES :\n• 28 Likes\n• 6 Commentaires\n• 7 Partages\n• Portée : 1 000 abonnés\n\nSource : Compte LinkedIn LABORO Sport & Outdoor'
      }
    },
    'R-A5': {
      titre: 'Mail envoyé aux prospects pour le lancement EcoPerf',
      type: 'texte',
      data: `De : nina.chevalier@laboro-sport.fr\n\nObjet : DÉCOUVREZ EN AVANT-PREMIÈRE LA GAMME ECOFIT LABORO !\n\nCher(e) partenaire,\n\nLa gamme EcoPerf LABORO est fabriquée à 60% de matières recyclées. Elle convient parfaitement aux structures soucieuses de leur image responsable et de la qualité de l'équipement de leurs membres.\n\nCaractéristiques clés :\n• Matières certifiées OEKO-TEX et GRS\n• Service flocage personnalisé aux couleurs de votre structure\n• Livraison 48h sur l'Essonne\n• Remise de lancement 15% valable jusqu'au vendredi 20h\n\nPRIX REVENDEUR : 62 € HT\nPrix public conseillé : 98 € TTC\n\nCommandé sur notre plateforme pro : laboro-sport.fr/pro\n\nL'équipe LABORO\nSource : Document interne LABORO`
    },
    'R-A6': {
      titre: 'Opération "Lancement EcoPerf" — Synthèse réunion commerciale',
      type: 'tableau',
      data: {
        headers: ['Critère', 'Détail'],
        rows: [
          ['Objectif', 'Concrétiser 10 000 € HT de commandes et 70% de taux de transformation'],
          ['Méthode', 'Relancer par téléphone les prospects ayant reçu le mail il y a 5 jours sans commander'],
          ['Offre', 'Remise exceptionnelle 15% sur le prix revendeur HT pour commande passée avant vendredi 20h'],
          ['Cibles', 'Structures avec budget sport > 3 000 € HT situées dans le 91'],
          ['Équipe', 'Nina Chevalier + vous-même'],
          ['Durée', '1 journée d\'appels — jeudi']
        ]
      }
    },
    'R-A7': {
      titre: 'Extrait du fichier prospects — Structures sportives Essonne',
      type: 'tableau',
      data: {
        headers: ['Structure', 'Type', 'Code postal', 'Ville', 'Contact', 'Budget sport HT/an'],
        rows: [
          ['CE Safran Massy', 'CE', '91300', 'Massy', 'M. Bertrand', '8 500 €'],
          ['CE PSA Stellantis Évry', 'CE', '91000', 'Évry', 'Mme Dupont', '6 200 €'],
          ['AS Courcouronnes Football', 'Club', '91080', 'Courcouronnes', 'M. Faure', '4 100 €'],
          ['Mairie de Ris-Orangis', 'Collectivité', '91130', 'Ris-Orangis', 'Mme Laurent', '5 800 €'],
          ['Club Athlétisme Corbeil', 'Club', '91100', 'Corbeil-Essonnes', 'M. Simon', '3 400 €'],
          ['AS Longjumeau Basket', 'Club', '91160', 'Longjumeau', 'M. Petit', '1 800 €'],
          ['CE Amazon Brétigny', 'CE', '91220', 'Brétigny', 'Mme Garcia', '2 200 €'],
          ['AS Viry-Châtillon Natation', 'Club', '91170', 'Viry-Châtillon', 'M. Moreau', '2 900 €']
        ]
      }
    },
    'R-A8': {
      titre: 'Commandes reçues suite à l\'opération "Lancement EcoPerf"',
      type: 'tableau',
      data: {
        headers: ['N° Client', 'N° Commande', 'Référence', 'Quantités', 'Montant Total HT'],
        rows: [
          ['P03', 'C841', 'EcoPerf-Maillot', '34', '2 856,00 €'],
          ['P05', 'C842', 'EcoPerf-Maillot', '22', '1 904,00 €'],
          ['P01', 'C843', 'EcoPerf-Maillot', '40', '3 332,00 €'],
          ['P04', 'C844', 'EcoPerf-Maillot', '28', '2 380,00 €']
        ],
        footer: 'Source : Plateforme commandes LABORO Sport & Outdoor'
      }
    },
    'R-A9': {
      titre: 'Message de Nina Chevalier — Analyse des résultats',
      type: 'texte',
      data: `Pour le bilan, calculer et analyser :\n• Le chiffre d'affaires total de l'opération\n• Le taux de transformation\n• La marge réalisée sur les ventes\n\nPour info : le prix d'achat HT unitaire des articles EcoPerf est de 18,00 €.\n\nNina Chevalier — Responsable Prospection LABORO\nSource : Message interne LABORO`
    },
    'R-B1': {
      titre: 'Forum des Associations Sportives — présentation de l\'événement',
      type: 'texte',
      data: `FORUM DES ASSOCIATIONS SPORTIVES DE L'ESSONNE\nSamedi et dimanche, Gymnase Agora — Évry-Courcouronnes\n\nLe Forum des Associations Sportives de l'Essonne rassemble chaque automne plus de 200 associations et clubs sportifs du département. C'est le rendez-vous incontournable pour :\n• Rencontrer les responsables de clubs et CE du 91\n• Présenter de nouveaux équipements et services\n• Nouer des partenariats locaux\n\n500 visiteurs attendus sur les 2 jours, dont 60% de responsables achats.\nLABORO a réservé un stand de 12m² et bénéficiera de la présence de Jordan Vidal, sportif local suivi par 4 200 abonnés Instagram.\n\nSource : Programme officiel Forum Asso Sport 91`
    },
    'R-B2': {
      titre: 'Conseils pour réussir un stand événementiel B2B',
      type: 'conseils',
      data: [
        {element: 'Accroche', conseil: 'Interpeller le visiteur avec une question ouverte ou un fait marquant plutôt qu\'un discours commercial immédiat'},
        {element: 'Découverte', conseil: 'Poser des questions sur le contexte du club/CE, leurs besoins récurrents, leur budget annuel et leurs critères d\'achat'},
        {element: 'Argumentation', conseil: 'Utiliser la méthode CAB : Caractéristique → Avantage → Bénéfice client. Adapter selon la taille du club'},
        {element: 'Objections', conseil: 'Écouter sans interrompre, reformuler, répondre avec un argument chiffré, puis vérifier que l\'objection est levée'},
        {element: 'Conclusion', conseil: 'Proposer une action concrète immédiate : devis sur tablette, commande sur le stand, prise de RDV post-événement'},
        {element: 'Congé', conseil: 'Laisser une carte, noter le contact dans le CRM, proposer un suivi personnalisé dans les 48h'}
      ]
    },
    'R-B3': {
      titre: 'Comment créer le post parfait sur Instagram ?',
      type: 'liste',
      data: [
        'Publier des photos et vidéos de qualité — éviter les visuels flous ou génériques',
        'Choisir le bon contenu pour accompagner le post — texte accrocheur, information utile',
        'Ajouter un lien vers le site internet en bio',
        'S\'appuyer sur les influenceurs — les mentionner avec @nom',
        'Utiliser les hashtags — 5 à 10 hashtags ciblés par publication',
        'Inclure un call-to-action clair : "Venez nous voir", "Lien en bio", "Contactez-nous"'
      ]
    },
    'R-B4': {
      titre: 'Fiche produit EcoPerf — Arguments commerciaux',
      type: 'tableau',
      data: {
        headers: ['Critère', 'LABORO EcoPerf', 'Decathlon Pro', 'SportRun Pro'],
        rows: [
          ['Prix unitaire HT', '62 €', '54 €', '68 €'],
          ['Certification éco', 'OEKO-TEX + GRS', 'Non certifié', 'OEKO-TEX uniquement'],
          ['Flocage personnalisé', 'Inclus (3 sem.)', '+ 8 € (5 sem.)', 'Inclus (2 sem.)'],
          ['Commercial dédié', 'Oui', 'Non', 'Partiellement'],
          ['Livraison Essonne', '48h gratuite > 500€', '72h payante', 'Non disponible'],
          ['Durée de vie garantie', '5 ans', '2–3 ans', '3–4 ans']
        ],
        footer: 'Source : Étude tarifaire LABORO — septembre 2025'
      }
    },
    'R-B5': {
      titre: 'Ventes réalisées sur le stand LABORO — Forum Asso Sport 91',
      type: 'tableau',
      data: {
        headers: ['Vendeur/se', 'PAHT unitaire', 'PVTTC unitaire', 'Quantités vendues'],
        rows: [
          ['Yanis', '18,00 €', '330,00 €', '18'],
          ['Nina', '18,00 €', '330,00 €', '22'],
          ['Jordan (Guest Star)', '18,00 €', '330,00 €', '27']
        ],
        footer: 'TVA : 20% sur tous les produits LABORO · Source : Document interne'
      }
    },
    'R-B6': {
      titre: 'Message de Nina Chevalier — Commissions commerciaux',
      type: 'texte',
      data: `Bravo à toute l'équipe pour ces deux jours de stand !\n\nJ'ai décidé de vous récompenser avec une commission de 8% sur les ventes hors taxes.\nPour rappel, la TVA est à 20% sur tous nos produits.\n\nJe vous laisse calculer vos commissions respectives.\n\nNina Chevalier 🎉\nSource : Message interne LABORO`
    },
    'R-B7': {
      titre: 'Message de Nina Chevalier — Coûts de l\'opération Forum',
      type: 'texte',
      data: `Bonjour,\n\nVoici les coûts de notre participation au Forum des Associations Sportives :\n\n• L'organisateur nous a loué l'emplacement 65 € HT par jour (2 jours).\n• La location du stand et du mobilier s'est élevée à 420 € HT pour les 2 jours.\n• Le forfait repas était de 35 € HT par personne et par jour pour toi, Jordan et moi.\n• Notre trajet Évry/Gymnase Agora A/R : 0,50 € HT du km pour 18 km aller-retour.\n• Forfait salaires fixes des 3 personnes pour 2 jours : 600 € HT.\n• Sans oublier les goodies LABORO commandés (stylos, sacs éco) : 96 € HT.\n\nJe te laisse estimer le total de ces coûts !\n\nNina Chevalier\nSource : Document interne LABORO`
    },
    'R-B8': {
      titre: 'Commande de goodies LABORO sur packandgo.fr',
      type: 'texte',
      data: `PACK AND GO — Personnalisation événementielle\nCommande N° CMD-20251104\n\nArticles commandés :\n• 100 stylos marqués "LABORO Sport" : 42 € HT\n• 50 sacs coton recyclé marqués "LABORO EcoPerf" : 54 € HT\n\nTotal HT : 96 € HT\nTVA 20% : 19,20 €\nTotal TTC : 115,20 €\n\nSource : packandgo.fr — Document confidentiel`
    }
  }
};

// ══════════════════════════════════════════
// FONCTIONS DE RENDU — PRÉPARATION E2 PVOC
// ══════════════════════════════════════════

function renderE2PVOC(){
  const el = document.getElementById('e2pvoc-home');
  if(!el) return;
  const s = E2_PVOC_SUJET;
  const ud = gUD();
  if(!ud.e2pvoc) ud.e2pvoc = {};
  const view = ud.e2pvoc.currentView || 'home';
  if(view === 'home') renderE2PVOCHome(el, s, ud);
  else if(view.startsWith('mission-')) renderE2PVOCMission(el, s, ud, view);
  else if(view.startsWith('ressources-')) renderE2PVOCRessources(el, s, ud, view);
  else if(view.startsWith('corrige-')) renderE2PVOCCorrige(el, s, ud, view);
  else renderE2PVOCHome(el, s, ud);
}

function setE2PVOCView(view){
  const ud = gUD();
  if(!ud.e2pvoc) ud.e2pvoc = {};
  ud.e2pvoc.currentView = view;
  sUD(ud);
  renderE2PVOC();
}

function renderE2PVOCHome(el, s, ud){
  el.innerHTML =
    '<div style="background:linear-gradient(135deg,#0F5B8A,#1A8C6E);border-radius:16px;padding:24px 28px;color:#fff;margin-bottom:20px">'
    + '<div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Baccalauréat Professionnel MCV — Option PVOC</div>'
    + '<div style="font-size:22px;font-weight:900;margin-bottom:4px">Préparation E2 — Analyse et résolution de situations professionnelles</div>'
    + '<div style="font-size:13px;color:rgba(255,255,255,.8)">Entraînement sur sujet fictif LABORO Sport & Outdoor · Évry-Courcouronnes (91)</div>'
    + '<div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap">'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">📋 2 missions · 4 activités</span>'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">⏱ Durée 3h</span>'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">🧮 Calculatrice autorisée</span>'
    + '<span style="background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700">Coefficient 4</span>'
    + '</div>'
    + '</div>'
    + '<div style="background:#fff;border-radius:14px;padding:20px 24px;border:1px solid var(--gb);margin-bottom:20px">'
    + '<div style="font-size:11px;font-weight:800;color:#0F5B8A;text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px">📍 Contexte professionnel</div>'
    + '<div style="display:flex;align-items:center;gap:16px;margin-bottom:14px;padding:14px;background:#F0F9FF;border-radius:10px">'
    + '<div style="width:52px;height:52px;background:#0F5B8A;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;flex-shrink:0">L</div>'
    + '<div><div style="font-size:15px;font-weight:900;color:#1A2E4A">LABORO Sport & Outdoor</div>'
    + '<div style="font-size:11px;color:#6B7280">Évry-Courcouronnes (91) · Responsable prospection : Nina Chevalier</div></div>'
    + '</div>'
    + '<div style="font-size:12px;color:#374151;line-height:1.8;white-space:pre-line">'+s.contexte+'</div>'
    + '</div>'
    + '<div style="background:#E0F2FE;border:1px solid #BAE6FD;border-radius:12px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px">'
    + '<span style="font-size:24px">📂</span>'
    + '<div style="flex:1"><div style="font-size:12px;font-weight:800;color:#0369A1;margin-bottom:2px">Dossier Ressources disponible</div>'
    + '<div style="font-size:11px;color:#0284C7">18 ressources (R-A1 à R-A9 et R-B1 à R-B8) — à consulter lors de chaque activité</div></div>'
    + '<button onclick="setE2PVOCView(\'ressources-all\')" style="background:#0F5B8A;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap">Voir les ressources →</button>'
    + '</div>'
    + '<div style="font-size:13px;font-weight:800;color:#1A2E4A;margin-bottom:12px">Missions</div>'
    + '<div style="display:flex;flex-direction:column;gap:10px">'
    + s.missions.map(function(m){
        const nbQ = m.activites.reduce(function(acc,a){ return acc+a.consignes.length; }, 0);
        const mColor = m.id==='M1' ? '#0F5B8A' : '#1A8C6E';
        return '<div style="background:#fff;border-radius:12px;padding:16px 20px;border:1px solid var(--gb);border-left:4px solid '+mColor+';cursor:pointer" onclick="setE2PVOCView(\'mission-'+m.id+'\')">'
          + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">'
          + '<div style="font-size:13px;font-weight:800;color:'+mColor+'">'+m.titre+'</div>'
          + '<span style="font-size:20px">→</span>'
          + '</div>'
          + '<div style="font-size:11px;color:#6B7280;margin-bottom:10px">'+m.intro.substring(0,120)+'...</div>'
          + '<div style="display:flex;gap:8px">'
          + '<span style="background:#E0F2FE;color:#0369A1;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+m.activites.length+' activités</span>'
          + '<span style="background:#DCFCE7;color:#166534;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px">'+nbQ+' questions</span>'
          + '</div>'
          + '</div>';
      }).join('')
    + '</div>';
}

function renderE2PVOCMission(el, s, ud, view){
  const mId = view.replace('mission-','');
  const m = s.missions.find(function(x){ return x.id===mId; });
  if(!m){ renderE2PVOCHome(el,s,ud); return; }
  const mColor = m.id==='M1' ? '#0F5B8A' : '#1A8C6E';

  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
    + '<button onclick="setE2PVOCView(\'home\')" style="background:none;border:none;color:'+mColor+';font-size:12px;font-weight:600;cursor:pointer;padding:0">← Retour au sujet</button>'
    + '<span style="color:var(--gm)">·</span>'
    + '<span style="font-size:12px;color:var(--gm)">'+m.titre+'</span>'
    + '</div>'
    + '<div style="background:linear-gradient(135deg,'+mColor+'EE,'+mColor+'99);border-radius:14px;padding:20px 24px;color:#fff;margin-bottom:20px">'
    + '<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">'+m.id+'</div>'
    + '<div style="font-size:18px;font-weight:900;margin-bottom:8px">'+m.titre+'</div>'
    + '<div style="font-size:12px;color:rgba(255,255,255,.85);line-height:1.6">'+m.intro+'</div>'
    + '</div>'
    + m.activites.map(function(act){
        return '<div style="background:#fff;border-radius:14px;padding:0;border:1px solid var(--gb);margin-bottom:16px;overflow:hidden">'
          + '<div style="background:#F0F9FF;padding:14px 20px;border-bottom:1px solid var(--gb);display:flex;align-items:center;justify-content:space-between">'
          + '<div style="font-size:12px;font-weight:800;color:#1A2E4A">'+act.titre+'</div>'
          + '<div style="display:flex;gap:6px">'
          + act.consignes.map(function(c){ return '<span style="background:#E0F2FE;color:#0369A1;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px">'+c.num+'</span>'; }).join('')
          + '</div>'
          + '</div>'
          + (function(){
              const allRess = act.consignes.reduce(function(acc,c){ return acc.concat(c.ressources); },[]);
              const uniqRess = allRess.filter(function(v,i,a){ return a.indexOf(v)===i; });
              return uniqRess.length ? '<div style="padding:8px 20px;background:#F0FDF4;border-bottom:1px solid #DCFCE7;font-size:10px;color:#166534;font-weight:600">📂 Ressources : '+uniqRess.map(function(r){ return '<span onclick="setE2PVOCView(\'ressources-'+r+'\')" style="cursor:pointer;text-decoration:underline;margin-right:6px">'+r+'</span>'; }).join('')+'</div>' : '';
            })()
          + '<div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px">'
          + act.consignes.map(function(c){
              const typeIcon = c.type==='calcul' ? '🧮' : '✍️';
              const typeBg = c.type==='calcul' ? '#E0F2FE' : '#DCFCE7';
              const typeColor = c.type==='calcul' ? '#0369A1' : '#166534';
              return '<div style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden">'
                + '<div style="padding:12px 14px;background:#FAFAFA;display:flex;align-items:flex-start;gap:10px">'
                + '<span style="font-size:13px;font-weight:900;color:'+mColor+';flex-shrink:0;min-width:28px">'+c.num+'</span>'
                + '<div style="flex:1">'
                + '<div style="font-size:12px;color:#1A2E4A;line-height:1.6;margin-bottom:8px">'+c.texte+'</div>'
                + '<div style="display:flex;gap:6px;flex-wrap:wrap">'
                + '<span style="background:'+typeBg+';color:'+typeColor+';font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px">'+typeIcon+' '+c.type+'</span>'
                + '<span style="background:#F3F4F6;color:#6B7280;font-size:9px;font-weight:600;padding:2px 8px;border-radius:10px">'+c.points+' pt'+(c.points>1?'s':'')+'</span>'
                + c.ressources.map(function(r){ return '<span onclick="setE2PVOCView(\'ressources-'+r+'\')" style="background:#FEF9C3;color:#854D0E;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;cursor:pointer">📂 '+r+'</span>'; }).join('')
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div style="padding:8px 14px;background:#fff;text-align:right;border-top:1px solid #F3F4F6">'
                + '<button onclick="setE2PVOCView(\'corrige-'+c.num+'\')" style="background:'+mColor+';color:#fff;border:none;padding:6px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer">Voir le corrigé →</button>'
                + '</div>'
                + '</div>';
            }).join('')
          + '</div>'
          + '</div>';
      }).join('');
}

function renderE2PVOCRessources(el, s, ud, view){
  const rId = view.replace('ressources-','');
  const ressToShow = rId==='all' ? Object.keys(s.ressources) : [rId];
  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
    + '<button onclick="setE2PVOCView(\'home\')" style="background:none;border:none;color:#0F5B8A;font-size:12px;font-weight:600;cursor:pointer;padding:0">← Retour au sujet</button>'
    + '</div>'
    + '<div style="font-size:15px;font-weight:900;color:#1A2E4A;margin-bottom:16px">📂 Dossier Ressources — Opération Sport en Entreprise</div>'
    + ressToShow.map(function(rId){
        const r = s.ressources[rId];
        if(!r) return '';
        return renderE2PVOCRessource(rId, r);
      }).join('');
}

function renderE2PVOCRessource(id, r){
  let contenu = '';
  if(r.type==='tableau'){
    contenu = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:11px">'
      + '<thead><tr>'+r.data.headers.map(function(h){ return '<th style="background:#0F5B8A;color:#fff;padding:8px 10px;text-align:left;font-weight:700">'+h+'</th>'; }).join('')+'</tr></thead><tbody>'
      + r.data.rows.map(function(row,i){ return '<tr style="background:'+(i%2===0?'#fff':'#F0F9FF')+'">'+row.map(function(cell){ return '<td style="padding:7px 10px;border-bottom:1px solid #F3F4F6">'+cell+'</td>'; }).join('')+'</tr>'; }).join('')
      + (r.data.footer ? '<tr><td colspan="'+r.data.headers.length+'" style="padding:8px 10px;font-size:10px;color:#6B7280;font-style:italic">'+r.data.footer+'</td></tr>' : '')
      + '</tbody></table></div>';
  } else if(r.type==='liste'){
    contenu = '<ul style="margin:0;padding-left:20px;font-size:12px;color:#374151;line-height:2">'+r.data.map(function(item){ return '<li>'+item+'</li>'; }).join('')+'</ul>';
  } else if(r.type==='texte'){
    contenu = '<div style="font-size:12px;color:#374151;line-height:1.8;white-space:pre-line">'+r.data+'</div>';
  } else if(r.type==='instagram'){
    contenu = '<div style="background:linear-gradient(135deg,#0F5B8A,#1A8C6E);border-radius:10px;padding:16px;color:#fff">'
      + '<div style="font-size:12px;font-weight:800;margin-bottom:4px">@'+r.data.compte+'</div>'
      + '<div style="display:flex;gap:20px;margin:12px 0;font-size:12px">'
      + '<div style="text-align:center"><div style="font-size:18px;font-weight:900">'+r.data.publications+'</div><div style="opacity:.8">Publications</div></div>'
      + '<div style="text-align:center"><div style="font-size:18px;font-weight:900">'+r.data.followers+'</div><div style="opacity:.8">Abonnés</div></div>'
      + '<div style="text-align:center"><div style="font-size:18px;font-weight:900">'+r.data.suivis+'</div><div style="opacity:.8">Suivis</div></div>'
      + '</div>'
      + '<div style="font-size:11px;opacity:.9;line-height:1.6;white-space:pre-line">'+r.data.bio+'</div>'
      + '</div>';
  } else if(r.type==='conseils'){
    contenu = '<div style="display:flex;flex-direction:column;gap:8px">'+r.data.map(function(c){ return '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:#F0F9FF;border-radius:8px"><span style="font-size:11px;font-weight:800;color:#0F5B8A;min-width:80px">'+c.element+'</span><span style="font-size:11px;color:#374151">'+c.conseil+'</span></div>'; }).join('')+'</div>';
  }
  return '<div style="background:#fff;border-radius:12px;border:1px solid var(--gb);margin-bottom:14px;overflow:hidden">'
    + '<div style="background:#0F5B8A;padding:12px 16px">'
    + '<span style="font-size:10px;font-weight:800;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.8px">'+id+'</span>'
    + '<div style="font-size:12px;font-weight:700;color:#fff;margin-top:2px">'+r.titre+'</div>'
    + '</div>'
    + '<div style="padding:14px 16px">'+contenu+'</div>'
    + '</div>';
}

function renderE2PVOCCorrige(el, s, ud, view){
  const num = view.replace('corrige-','');
  let found = null;
  s.missions.forEach(function(m){
    m.activites.forEach(function(a){
      a.consignes.forEach(function(c){
        if(c.num===num) found={c:c, m:m};
      });
    });
  });
  if(!found){ renderE2PVOCHome(el,s,ud); return; }
  const c = found.c;
  const m = found.m;
  const mColor = m.id==='M1' ? '#0F5B8A' : '#1A8C6E';

  let corrigeHtml = '';

  if(c.corrige.methode){
    corrigeHtml += '<div style="background:#E0F2FE;border-left:3px solid #0F5B8A;border-radius:8px;padding:12px 14px;margin-bottom:14px">'
      + '<div style="font-size:10px;font-weight:800;color:#0F5B8A;text-transform:uppercase;margin-bottom:6px">📐 Méthode</div>'
      + '<div style="font-size:12px;color:#1A2E4A;font-weight:600;white-space:pre-line">'+c.corrige.methode+'</div>'
      + '</div>';
  }

  const reponseKey = c.corrige.reponse || (c.corrige.calcul && c.corrige.calcul.detail && c.corrige.reponse);
  const mainText = c.corrige.reponse || c.corrige.reponse;

  if(c.corrige.reponse){
    corrigeHtml += '<div style="background:#F8FAFF;border:1px solid #DBEAFE;border-radius:10px;padding:16px;margin-bottom:14px">'
      + '<div style="font-size:10px;font-weight:800;color:#1A2E4A;text-transform:uppercase;margin-bottom:8px">✍️ Éléments de réponse</div>'
      + '<div style="font-size:12px;color:#374151;line-height:1.8;white-space:pre-line">'+c.corrige.reponse+'</div>'
      + '</div>';
  }

  if(c.corrige.calcul){
    const calc = c.corrige.calcul;
    if(calc.taux !== undefined){
      corrigeHtml += '<div style="background:#DCFCE7;border:1px solid #A7F3D0;border-radius:10px;padding:16px;text-align:center;margin-bottom:14px">'
        + '<div style="font-size:11px;color:#6B7280;margin-bottom:8px">'+calc.detail+'</div>'
        + '<div style="font-size:28px;font-weight:900;color:#166534">'+calc.taux+' %</div>'
        + '</div>';
    }
  }

  if(c.corrige.conclusion){
    corrigeHtml += '<div style="background:#DCFCE7;border-left:3px solid #166534;border-radius:8px;padding:12px 14px;margin-bottom:14px">'
      + '<div style="font-size:10px;font-weight:800;color:#166534;text-transform:uppercase;margin-bottom:4px">✅ Conclusion</div>'
      + '<div style="font-size:12px;color:#1A2E4A;line-height:1.6;white-space:pre-line">'+c.corrige.conclusion+'</div>'
      + '</div>';
  }

  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">'
    + '<button onclick="setE2PVOCView(\'mission-'+m.id+'\')" style="background:none;border:none;color:'+mColor+';font-size:12px;font-weight:600;cursor:pointer;padding:0">← Retour à la mission</button>'
    + '</div>'
    + '<div style="background:'+mColor+';border-radius:12px;padding:16px 20px;color:#fff;margin-bottom:20px">'
    + '<div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Corrigé — Question '+c.num+'</div>'
    + '<div style="font-size:14px;font-weight:800">'+c.texte+'</div>'
    + '<div style="display:flex;gap:8px;margin-top:10px">'
    + '<span style="background:rgba(255,255,255,.2);padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">'+(c.type==='calcul'?'🧮':'✍️')+' '+c.type+'</span>'
    + '<span style="background:rgba(255,255,255,.2);padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">'+c.points+' pt'+(c.points>1?'s':'')+'</span>'
    + '</div>'
    + '</div>'
    + corrigeHtml;
}

// ══════════════════════════════════════════
