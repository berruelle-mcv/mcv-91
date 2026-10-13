// ================================================
//   LABORO Sport & Outdoor — Exercices animés propres à chaque mission
//   Affichés par js/moteur-animations.js en tête de l'onglet
//   « Apprendre d'abord », au-dessus des blocs de la compétence et de la fiche.
//
//   Règle (13/10/2026) : UN EXERCICE PAR MISSION, jamais partagé.
//   L'exercice entraîne la méthode de la mission sur une situation
//   VOISINE (autres clients, autres chiffres) : il ne donne jamais la
//   réponse aux questions de la mission.
//   Palier 2 couvert (36 missions). Types : tri, etapes, chaine, cartes
//   (voir js/moteur-animations.js).
// ================================================

const EXERCICES_MISSIONS = {

"M004": { type: "tri", titre: "Repérer un mobile d'achat (SONCASE)", consigne: "Un président de club parle à Nina. Quel mobile d'achat se cache derrière chaque phrase ?",
  categories: ["Sécurité", "Confort", "Argent", "Orgueil"],
  items: [
    ["« Je ne veux pas qu'un coureur se torde la cheville sur un sentier glissant. »", 0, "Peur d'un risque : mobile Sécurité."],
    ["« Je veux que mes coureurs soient bien dans leurs chaussures, même après 30 km. »", 1, "Recherche du bien-être : mobile Confort."],
    ["« Avec 14 coureurs, chaque euro économisé compte pour notre budget. »", 2, "Attention au prix : mobile Argent."],
    ["« Je veux que notre club ait fière allure sur la ligne de départ. »", 3, "Image et fierté : mobile Orgueil."]
  ] },

"M006": { type: "tri", titre: "B2B ou B2C ?", consigne: "Avant d'attribuer des invitations, sache distinguer les deux grands segments de clients LABORO.",
  categories: ["Client B2B", "Client B2C"],
  items: [
    ["Le CSE d'une entreprise de Lisses qui équipe ses salariés.", 0, "Une organisation qui achète pour ses membres : B2B."],
    ["Une maman qui achète des protège-tibias pour son fils.", 1, "Un particulier : B2C."],
    ["Une association de course à pied de Ris-Orangis.", 0, "Une association : B2B."],
    ["Un coureur qui achète sa troisième paire de chaussures cette année.", 1, "Un particulier fidèle : B2C."],
    ["Le service des sports d'une mairie.", 0, "Une collectivité : B2B."]
  ] },

"M008": { type: "etapes", titre: "Annoncer un retard : les 4 temps", intro: "Quand une livraison prend du retard, on prévient le client avant qu'il ne l'apprenne seul.",
  etapes: [
    { ico: "🔎", k: "Vérifier", s: "La nouvelle date exacte, et ce que le client a prévu" },
    { ico: "🧭", k: "Chercher", s: "Toutes les solutions possibles, en stock et chez les fournisseurs" },
    { ico: "📞", k: "Prévenir", s: "Le client, avec des excuses et une solution concrète" },
    { ico: "📝", k: "Tracer", s: "Le suivi dans LABORO Connect et la réclamation au fournisseur" }
  ] },

"M009": { type: "tri", titre: "Les étages d'une gondole", consigne: "Rayon chaussettes et semelles : où placer chaque produit ?",
  categories: ["Niveau des yeux", "Niveau des mains", "Niveau du sol"],
  items: [
    ["La nouveauté à forte marge que l'on veut faire découvrir.", 0, "Le niveau des yeux est le plus vu : on y met ce qu'on veut vendre en priorité."],
    ["Le produit d'appel que les clients viennent chercher de toute façon.", 2, "Le client se baissera pour lui."],
    ["Le produit complémentaire, facile à prendre au passage.", 1, "À portée de main, il s'ajoute facilement au panier."],
    ["Les lots lourds et volumineux.", 2, "En bas, pour la sécurité et la stabilité."]
  ] },

"M014": { type: "etapes", titre: "La chaîne de conversion d'une prospection", intro: "À chaque étape, une partie des contacts seulement passe à l'étape suivante.",
  etapes: [
    { ico: "📇", k: "Prospects contactés", s: "Toutes les entreprises de la cible" },
    { ico: "☎️", k: "Contacts aboutis", s: "Le bon interlocuteur a répondu" },
    { ico: "🤝", k: "Rendez-vous", s: "Le prospect accepte d'en parler" },
    { ico: "✍️", k: "Contrats signés", s: "L'objectif final de l'opération" }
  ] },

"SA2": { type: "tri", titre: "Bon de commande complet ou pas ?", consigne: "Un club envoie un bon de commande de textile personnalisé. Peut-on lancer l'atelier tel quel ?",
  categories: ["Information présente", "Il faut la demander au client"],
  items: [
    ["Le bon indique 25 maillots, sans préciser les tailles.", 1, "Sans les tailles, l'atelier ne peut rien produire."],
    ["Le bon indique le nom du club et l'adresse de livraison.", 0, "Ces informations permettent d'expédier."],
    ["Le bon parle de « numéros au dos », sans la liste des numéros.", 1, "Il faut la liste joueur par joueur."],
    ["Le logo du club est joint en fichier haute définition.", 0, "L'atelier peut l'utiliser directement."],
    ["Aucune date de besoin n'est indiquée.", 1, "Sans date, impossible de savoir si le délai est tenable."]
  ] },

"M015": { type: "cartes", titre: "Les indicateurs d'un rayon", cartes: [
    ["Taux de transformation ?", "Nombre d'acheteurs ÷ nombre de visiteurs × 100."],
    ["Panier moyen ?", "Chiffre d'affaires ÷ nombre de ventes."],
    ["Marge totale d'une référence ?", "Marge par article × nombre d'articles vendus."],
    ["Une rupture de stock, c'est…", "Une vente perdue, et un client qui risque d'aller ailleurs."]
  ] },

"M016": { type: "tri", titre: "Quel levier pour faire acheter les visiteurs ?", consigne: "Le showroom attire du monde. Chaque action agit sur un levier différent.",
  categories: ["Accueil et conseil", "Aménagement", "Fidélisation"],
  items: [
    ["Aborder chaque visiteur dans les 30 secondes.", 0, "Un visiteur conseillé achète plus souvent."],
    ["Créer un espace d'essai pour les chaussures de running.", 1, "L'aménagement donne envie d'essayer, donc d'acheter."],
    ["Proposer la carte LABORO PRO à chaque passage en caisse.", 2, "On donne une raison de revenir."],
    ["Signaler clairement les univers avec des panneaux.", 1, "Le client trouve seul ce qu'il cherche."],
    ["Inviter les clients réguliers à une soirée test.", 2, "On entretient la relation avec les fidèles."]
  ] },

"M019": { type: "tri", titre: "Taux d'ouverture ou taux de clic ?", consigne: "Un e-mailing se mesure à plusieurs étapes. Associe chaque situation au bon indicateur.",
  categories: ["Taux d'ouverture", "Taux de clic", "Taux de rendez-vous"],
  items: [
    ["Combien de clubs ont ouvert le mail ?", 0, "Ouvertures ÷ mails délivrés × 100."],
    ["Combien ont cliqué sur le lien de l'offre ?", 1, "Clics ÷ mails ouverts × 100 (selon la règle du dossier)."],
    ["Combien ont accepté un rendez-vous ?", 2, "L'indicateur qui compte pour l'objectif."],
    ["L'objet du mail était-il assez accrocheur ?", 0, "C'est l'objet qui fait ouvrir le mail."]
  ] },

"M020": { type: "tri", titre: "Prospect ou client à développer ?", consigne: "Pour une tournée, on ne fixe pas le même objectif selon qui on visite.",
  categories: ["Prospect à convaincre", "Client à développer"],
  items: [
    ["Un club qui n'a jamais rien acheté chez LABORO.", 0, "Objectif : obtenir un premier engagement."],
    ["Une école qui commande déjà ses ballons chez LABORO.", 1, "Objectif : vendre davantage ou d'autres produits."],
    ["Un CSE rencontré une seule fois sur un salon.", 0, "Pas encore client : c'est un prospect."],
    ["Une association qui a passé deux commandes l'an dernier.", 1, "Cliente : on développe la relation."]
  ] },

"M021": { type: "etapes", titre: "Relancer un devis sans réponse", intro: "Une bonne relance est courte, polie et apporte quelque chose de nouveau.",
  etapes: [
    { ico: "📅", k: "Rappeler le contexte", s: "La date du devis et ce qu'il contient" },
    { ico: "✨", k: "Apporter un élément nouveau", s: "Vrai et utile : stock, délai, témoignage d'un client" },
    { ico: "❓", k: "Une seule demande", s: "Claire, pour faire avancer la décision" },
    { ico: "🗂️", k: "Tracer", s: "La relance et la date de la suivante dans LABORO Connect" }
  ] },

"M022": { type: "chaine", titre: "Un argument CAB face à un concurrent", produit: "Polo club personnalisable",
  intro: "Un club compare LABORO à un concurrent pour des polos personnalisés. Construis l'argument sur le service, pas sur le prix.",
  questions: ["Et donc ?", "Et pour le club, ça change quoi ?"],
  maillons: [
    { k: "Caractéristique", txt: "LABORO floque dans son propre atelier, en interne." },
    { k: "Avantage", txt: "…donc une erreur se corrige vite, sans renvoyer les polos ailleurs." },
    { k: "Bénéfice", txt: "…vos joueurs ne restent pas sans tenue avant un match." }
  ] },

"M070": { type: "cartes", titre: "Lire un tableau de bord", cartes: [
    ["Taux d'évolution ?", "(Valeur d'arrivée − valeur de départ) ÷ valeur de départ × 100."],
    ["Un taux d'évolution négatif signifie…", "Une baisse."],
    ["Le CA total monte mais un rayon baisse : que faire ?", "Chercher des hypothèses sur ce rayon, puis les vérifier."],
    ["Pour qui écrit-on une synthèse ?", "Pour son lecteur : on garde l'indispensable, chiffré et hiérarchisé."]
  ] },

"M071": { type: "tri", titre: "Bonne ou mauvaise implantation ?", consigne: "Rayon cyclisme : chaque situation respecte-t-elle les règles de merchandising ?",
  categories: ["Bonne pratique", "Erreur d'implantation"],
  items: [
    ["Le casque le plus vendu est placé au ras du sol, au fond du rayon.", 1, "Un best-seller doit être visible et accessible."],
    ["Les gants sont placés juste à côté des casques.", 0, "Produits complémentaires côte à côte : vente additionnelle."],
    ["Une référence qui se vend peu occupe 4 facings.", 1, "Le linéaire doit suivre les ventes."],
    ["Un stock d'alerte déclenche le réassort avant la rupture.", 0, "On évite les ventes perdues."]
  ] },

"M072": { type: "etapes", titre: "Construire un plan d'action commercial", intro: "Un plan d'action part d'un objectif chiffré et se termine par des risques anticipés.",
  etapes: [
    { ico: "🎯", k: "Objectif", s: "Chiffré, et comparé à l'an dernier" },
    { ico: "🧩", k: "Actions", s: "Reliées aux priorités de la direction" },
    { ico: "💶", k: "Budget", s: "Ventilé action par action" },
    { ico: "⚠️", k: "Risques", s: "Ce qui pourrait échouer, et la parade prévue" }
  ] },

"M073": { type: "tri", titre: "Classer les notes de recommandation du showroom", consigne: "Pour le NPS, on regarde la note de recommandation de 0 à 10.",
  categories: ["Détracteur (0-6)", "Passif (7-8)", "Promoteur (9-10)"],
  items: [
    ["Une cliente du rayon fitness donne 4.", 0, "De 0 à 6 : détracteur."],
    ["Un client du rayon vélo donne 10.", 2, "9 ou 10 : promoteur."],
    ["Une cliente du rayon natation donne 7.", 1, "7 ou 8 : passif."],
    ["Un client du rayon tennis donne 6.", 0, "6 reste un détracteur."],
    ["Une cliente du rayon randonnée donne 9.", 2, "Promotrice."]
  ] },

"M074": { type: "etapes", titre: "Une opération de fidélisation en 4 temps", intro: "Une opération se prépare avant, se vit pendant et se mesure après.",
  etapes: [
    { ico: "🗓️", k: "Préparer", s: "Planning, cible, partenaires, budget" },
    { ico: "📣", k: "Annoncer", s: "Newsletter et invitations aux bons segments" },
    { ico: "🏃", k: "Animer", s: "Le jour J, accueillir et faire vivre l'opération" },
    { ico: "📊", k: "Mesurer", s: "Indicateurs chiffrés et bilan pour le responsable" }
  ] },

"M050": { type: "tri", titre: "Information de veille : utile ou pas ?", consigne: "Relevé de veille chez un concurrent : qu'est-ce qui compte vraiment pour LABORO ?",
  categories: ["Utile pour LABORO", "Sans intérêt"],
  items: [
    ["Le concurrent baisse le prix de ses raquettes de padel de 20 %.", 0, "Un écart de prix peut faire partir nos clients."],
    ["Le concurrent a repeint sa façade.", 1, "Aucun effet sur nos ventes."],
    ["Le concurrent lance un service de cordage en 24 heures.", 0, "Un nouveau service peut attirer nos clients."],
    ["Ses avis Google se plaignent de l'attente en caisse.", 0, "Un point faible du concurrent devient un argument pour nous."],
    ["Le gérant change de voiture.", 1, "Information sans lien avec le commerce."]
  ] },

"M051": { type: "tri", titre: "Que dit la règle ?", consigne: "Situations de vente en ligne : vrai ou faux ?",
  categories: ["Vrai", "Faux"],
  items: [
    ["Quand un produit commandé est en rupture, on prévient le client avant qu'il ne s'en aperçoive.", 0, "On garde la confiance en prenant les devants."],
    ["On peut remplacer un produit par un autre sans demander l'accord du client.", 1, "Le client doit toujours accepter la solution."],
    ["HT = TTC ÷ 1,20 pour un article de sport.", 0, "TVA de 20 % sur les articles de sport."],
    ["Un remboursement partiel ne se note pas dans LABORO Connect.", 1, "Tout geste et tout montant se tracent."]
  ] },

"M052": { type: "tri", titre: "Défectueux ou non conforme ?", consigne: "Deux mots proches, deux situations différentes.",
  categories: ["Produit défectueux", "Produit non conforme"],
  items: [
    ["Le zip d'une veste casse au deuxième usage.", 0, "Le produit ne fonctionne pas normalement."],
    ["Le client a commandé un sac bleu et reçoit un sac rouge.", 1, "Ce n'est pas ce qui a été commandé."],
    ["La gourde fuit dès le premier remplissage.", 0, "Défaut de fonctionnement."],
    ["Le ballon livré est en taille 4 au lieu de 5.", 1, "Écart avec la commande."]
  ] },

"M053": { type: "cartes", titre: "Satisfaction : les bons calculs", cartes: [
    ["Taux de réponse ?", "Répondants ÷ questionnaires envoyés × 100."],
    ["Taux de satisfaction ?", "(Satisfaits + très satisfaits) ÷ répondants × 100."],
    ["NPS ?", "% de promoteurs − % de détracteurs. C'est un nombre, avec son signe."],
    ["Pourquoi comparer showroom et site ?", "Un bon résultat global peut cacher un canal en difficulté."]
  ] },

"M054": { type: "tri", titre: "Urgent, important ou les deux ?", consigne: "Contacts reçus à l'accueil : comment les prioriser ?",
  categories: ["À traiter tout de suite", "Dans la journée", "Peut attendre"],
  items: [
    ["Un client dont le colis est bloqué alors qu'il part en vacances demain.", 0, "Urgent et important : délai très court."],
    ["Un club qui demande un devis pour la saison prochaine.", 1, "Important, mais pas urgent dans l'heure."],
    ["Un commentaire Instagram qui dit « Super magasin ! ».", 2, "On remercie, sans urgence."],
    ["Un client furieux qui rappelle pour la troisième fois.", 0, "La tension monte : on traite tout de suite."]
  ] },

"M056": { type: "cartes", titre: "Évaluer une soirée clients", cartes: [
    ["Taux de présence ?", "Présents ÷ invités × 100."],
    ["ROI d'un événement ?", "(Chiffre d'affaires − coût) ÷ coût × 100."],
    ["Un objectif SMART, c'est…", "Spécifique, mesurable, atteignable, réaliste, limité dans le temps."],
    ["Pourquoi lire les retours clients ?", "Les chiffres disent combien, les retours disent pourquoi."]
  ] },

"ACC-P2": { type: "tri", titre: "Face à un visiteur mécontent", consigne: "Méthode 3R : Reconnaître, Reformuler, Répondre. Quelle étape ?",
  categories: ["Reconnaître", "Reformuler", "Répondre"],
  items: [
    ["« Je comprends votre agacement, Madame. »", 0, "On reconnaît l'émotion du client."],
    ["« Si je comprends bien, vous attendez depuis 10 minutes à la caisse ? »", 1, "On redit avec ses mots pour vérifier."],
    ["« Je vous accompagne tout de suite à la caisse rapide. »", 2, "On apporte une solution concrète."],
    ["« Vous avez raison, ce n'est pas agréable d'attendre. »", 0, "On reconnaît sans se justifier."]
  ] },

"ACC-P3": { type: "etapes", titre: "Briefer une équipe d'accueil", intro: "Avant un événement, un brief court et clair met toute l'équipe d'accord.",
  etapes: [
    { ico: "🎯", k: "Objectifs", s: "Chiffrés : contacts, ventes, satisfaction" },
    { ico: "👥", k: "Rôles", s: "Qui fait quoi, et où" },
    { ico: "⏱️", k: "Horaires", s: "Pauses et moments de forte affluence" },
    { ico: "🚨", k: "Imprévus", s: "Que faire en cas de problème, et qui prévenir" }
  ] },

"M058": { type: "chaine", titre: "Un argument CAB pour un cadeau", produit: "Gourde isotherme 750ml",
  intro: "Un client cherche un cadeau pour sa fille qui fait du vélo. Entraîne-toi sur la gourde isotherme.",
  questions: ["Et donc ?", "Et pour sa fille, ça veut dire quoi ?"],
  maillons: [
    { k: "Caractéristique", txt: "Cette gourde est isotherme et contient 750 ml." },
    { k: "Avantage", txt: "…donc l'eau reste fraîche pendant toute la sortie." },
    { k: "Bénéfice", txt: "…votre fille boit frais, même en plein été." }
  ] },

"M059": { type: "etapes", titre: "Un mail professionnel de réponse", intro: "Répondre à un client professionnel, c'est être précis et complet.",
  etapes: [
    { ico: "✉️", k: "Objet précis", s: "Le client sait tout de suite de quoi on parle" },
    { ico: "👋", k: "Formule d'appel", s: "Avec le nom de la personne" },
    { ico: "📋", k: "Réponse complète", s: "Prix, délai, conditions : tout ce qu'il a demandé" },
    { ico: "✍️", k: "Signature", s: "Prénom, poste, LABORO, téléphone" }
  ] },

"M063": { type: "tri", titre: "Indicateur ou règle de traitement ?", consigne: "Un tableau de bord mesure, une règle organise. Classe chaque élément.",
  categories: ["Indicateur à suivre", "Règle de traitement"],
  items: [
    ["Délai moyen de réponse, en heures.", 0, "C'est une mesure."],
    ["« Toute réclamation reçoit une réponse avant la fin de la journée. »", 1, "C'est une consigne pour l'équipe."],
    ["Part des contacts traités dans le délai.", 0, "C'est un pourcentage à suivre."],
    ["« Chaque contact est noté dans LABORO Connect avec la date. »", 1, "C'est une règle de fonctionnement."]
  ] },

"B41-P2": { type: "tri", titre: "Quelle lettre de BANT ?", consigne: "Informations relevées sur un club de natation. Quel critère BANT chacune permet-elle de confirmer ?",
  categories: ["Budget", "Autorité", "Besoin", "Temps"],
  items: [
    ["« Le bureau du club vote les achats en assemblée générale. »", 1, "On sait qui décide : Autorité."],
    ["« Nous avons 1 200 € prévus pour l'équipement cette année. »", 0, "Un montant disponible : Budget."],
    ["« Il nous faut des maillots de bain identiques pour les compétitions. »", 2, "Ce dont le club a besoin : Besoin."],
    ["« Nous commandons toujours avant la reprise de septembre. »", 3, "Le moment de l'achat : Temps."],
    ["« C'est la trésorière qui signe les bons de commande. »", 1, "La personne qui valide : Autorité."]
  ] },

"B42-P2": { type: "tri", titre: "Choisir sa technique selon l'objectif", consigne: "Chaque technique a ses forces. Laquelle est décrite ?",
  categories: ["E-mailing", "Phoning", "Terrain"],
  items: [
    ["Toucher beaucoup de clubs d'un coup, pour un coût faible.", 0, "Un envoi groupé et personnalisé."],
    ["Échanger en direct et répondre aux objections tout de suite.", 1, "L'appel permet le dialogue."],
    ["Montrer les maillots et les toucher pendant un entraînement.", 2, "La visite permet la démonstration."],
    ["Relancer rapidement ceux qui ont ouvert le mail.", 1, "Le téléphone transforme l'intérêt en rendez-vous."]
  ] },

"B43-P2": { type: "tri", titre: "Une bonne accroche de visite ?", consigne: "L'accroche ouvre la visite en moins de 2 phrases. Celle-ci fonctionne-t-elle ?",
  categories: ["Bonne accroche", "À reprendre"],
  items: [
    ["« Bonjour, je suis de LABORO, vous voulez acheter quelque chose ? »", 1, "Trop direct, aucun intérêt pour le prospect."],
    ["« Votre saison reprend dans un mois : nous équipons déjà trois clubs voisins. »", 0, "Elle parle de lui et donne une raison de l'écouter."],
    ["« Je passais dans le coin… »", 1, "Pas de raison claire pour la visite."],
    ["« Vous m'aviez parlé de votre tournoi de juin au forum : j'ai une idée pour vos équipes. »", 0, "Elle reprend un échange précédent."]
  ] },

"B44-P2": { type: "tri", titre: "Quelle relance pour quel devis ?", consigne: "On ne relance pas tous les devis de la même façon.",
  categories: ["Relance par mail", "Relance par téléphone", "Classer « perdu »"],
  items: [
    ["Un devis envoyé il y a 5 jours, sans réponse.", 0, "Première relance courte et écrite."],
    ["Un devis déjà relancé par mail, toujours sans réponse.", 1, "On passe à l'appel pour dialoguer."],
    ["Le prospect a signé chez un concurrent.", 2, "On le note, et on demande pourquoi pour progresser."],
    ["Le prospect hésite entre deux options.", 1, "Un échange direct aide à décider."]
  ] },

"B45-P2": { type: "tri", titre: "Critère de choix d'un acheteur public", consigne: "Une MJC compare plusieurs fournisseurs. Sur quoi porte chaque remarque ?",
  categories: ["Prix", "Qualité", "Service"],
  items: [
    ["« Vos ballons tiennent-ils une saison entière ? »", 1, "La durée de vie du produit."],
    ["« Livrez-vous directement dans nos locaux ? »", 2, "Un service autour du produit."],
    ["« Pouvez-vous faire mieux sur le total ? »", 0, "Le montant de l'offre."],
    ["« Qui contacter en cas de problème ? »", 2, "Le suivi après-vente."],
    ["« Les maillots résistent-ils aux lavages répétés ? »", 1, "La qualité du textile."]
  ] },

"M076": { type: "cartes", titre: "Choisir un fournisseur", cartes: [
    ["Prix net d'achat ?", "Prix catalogue − remise + frais éventuels, ramené à l'unité."],
    ["Taux de marque ?", "(Prix de vente HT − coût d'achat HT) ÷ prix de vente HT × 100."],
    ["Conditionnement par carton : conséquence ?", "On commande par cartons entiers, parfois un peu plus que le besoin."],
    ["Le moins cher est-il toujours le meilleur ?", "Non : délai, qualité, conditions et politique d'achat comptent aussi."]
  ] },

"ACC7": { type: "etapes", titre: "Accueillir un groupe", intro: "Un groupe se prépare comme un petit événement.",
  etapes: [
    { ico: "📋", k: "La veille", s: "Programme, salles, matériel, intervenants confirmés" },
    { ico: "♿", k: "Accessibilité", s: "Un parcours possible pour chacun" },
    { ico: "🎤", k: "L'accueil", s: "Un mot de bienvenue court et chaleureux" },
    { ico: "📝", k: "Le retour", s: "Une fiche d'évaluation pour progresser" }
  ] },

"ACC8": { type: "tri", titre: "Adapter son accueil", consigne: "Chaque visiteur a besoin d'une attention particulière. Quelle adaptation est la bonne ?",
  categories: ["Adaptation juste", "Maladresse"],
  items: [
    ["Parler lentement et face à un client malentendant.", 0, "Il peut lire sur les lèvres."],
    ["Parler plus fort à un client étranger pour qu'il comprenne.", 1, "Le volume n'aide pas : on simplifie, on montre."],
    ["Se mettre à hauteur d'un client en fauteuil pour lui parler.", 0, "On échange d'égal à égal."],
    ["Faire à la place d'un client âgé sans lui demander.", 1, "On propose son aide, on ne l'impose pas."]
  ] }

};
