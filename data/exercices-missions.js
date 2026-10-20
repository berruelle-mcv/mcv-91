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
    ["Combien ont cliqué sur le lien de l'offre ?", 1, "Clics ÷ e-mails envoyés × 100 (règle du dossier)."],
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
    { k: "Caractéristique", txt: "LABORO suit lui-même chaque commande auprès de son atelier partenaire et contrôle le bon à tirer." },
    { k: "Avantage", txt: "…donc une erreur est repérée avant la fabrication." },
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

// ─────────── Palier 1 (34 missions, 13/10/2026) ───────────
// Exercices courts et très guidés (élèves de 2nde et de 1ère en début d'année).
// Situation voisine de la mission : jamais la réponse aux questions.
Object.assign(EXERCICES_MISSIONS, {

"M001": { type: "tri", titre: "Une question qui fait parler le client", consigne: "Au rayon vélo, quelles questions font vraiment parler le client ?",
  categories: ["Le client développe", "Le client répond par oui ou non"],
  items: [
    ["« Où avez-vous l'habitude de rouler ? »", 0, "« Où » ouvre la réponse."],
    ["« Vous avez déjà un vélo ? »", 1, "Une seule réponse possible : oui ou non."],
    ["« Qu'attendez-vous de votre futur casque ? »", 0, "Le client explique ses attentes."],
    ["« C'est pour vous ? »", 1, "Réponse fermée."]
  ] },

"M002": { type: "tri", titre: "Concurrent direct ou pas ?", consigne: "Pour un magasin de sport, qui est un vrai concurrent ?",
  categories: ["Concurrent", "Pas un concurrent"],
  items: [
    ["Un site internet qui vend des raquettes de tennis.", 0, "Il vend les mêmes produits que nous."],
    ["La boulangerie à côté du showroom.", 1, "Elle ne vend pas d'articles de sport."],
    ["Une grande enseigne de sport dans la ville voisine.", 0, "Mêmes clients, mêmes produits."],
    ["Le club de foot qui achète nos maillots.", 1, "C'est un client."]
  ] },

"M003": { type: "tri", titre: "La bonne attitude face à un client mécontent", consigne: "Un client rapporte une gourde qui fuit. Ces réactions sont-elles professionnelles ?",
  categories: ["Professionnel", "À éviter"],
  items: [
    ["Le laisser expliquer sans le couper.", 0, "On écoute d'abord."],
    ["« Vous l'avez sûrement fait tomber. »", 1, "On n'accuse jamais le client."],
    ["« Je comprends, c'est vraiment agaçant. »", 0, "On montre qu'on comprend."],
    ["Lui dire de revenir quand le responsable sera là, sans rien proposer.", 1, "Le client repart sans solution."]
  ] },

"M005": { type: "etapes", titre: "Où en est un colis ?", intro: "Une commande en ligne passe par plusieurs étapes. Les voici dans l'ordre.",
  etapes: [
    { ico: "🛒", k: "Commande passée", s: "Le client paie sur le site" },
    { ico: "📦", k: "Préparation", s: "On rassemble les articles en réserve" },
    { ico: "🚚", k: "Expédition", s: "Le colis part chez le transporteur" },
    { ico: "🏠", k: "Livraison", s: "Le client reçoit son colis" }
  ] },

"M007": { type: "tri", titre: "Avant ou après le paiement ?", consigne: "À la caisse, chaque geste a son moment.",
  categories: ["Avant de payer", "Après avoir payé"],
  items: [
    ["Proposer la carte de fidélité.", 0, "Le client gagne des points sur cet achat."],
    ["Proposer le ticket de caisse.", 1, "Il prouve l'achat qui vient d'être payé."],
    ["Annoncer le montant à payer.", 0, "Le client sait ce qu'il doit."],
    ["Souhaiter une bonne utilisation.", 1, "C'est la prise de congé."]
  ] },

"M010": { type: "tri", titre: "Satisfait ou pas ?", consigne: "Réponses à une enquête : dans quelle colonne compter chaque client ?",
  categories: ["Compte comme satisfait", "Ne compte pas comme satisfait"],
  items: [
    ["Un client qui coche « très satisfait ».", 0, "Il est compté."],
    ["Un client qui coche « satisfait ».", 0, "Il est compté aussi."],
    ["Un client qui coche « neutre ».", 1, "Neutre n'est pas satisfait."],
    ["Un client qui coche « insatisfait ».", 1, "Il n'est pas satisfait."]
  ] },

"M011": { type: "tri", titre: "Répondre à un avis en ligne", consigne: "Un client a laissé 3 étoiles. Ces phrases ont-elles leur place dans la réponse ?",
  categories: ["À écrire", "À éviter"],
  items: [
    ["« Merci d'avoir pris le temps de laisser votre avis. »", 0, "On remercie toujours."],
    ["« Vous êtes le seul à vous plaindre. »", 1, "On ne contredit pas un client en public."],
    ["« Contactez-nous pour que l'on trouve une solution ensemble. »", 0, "On propose de continuer en privé."],
    ["« Votre adresse est bien le 12 rue des Lilas ? »", 1, "Aucune information personnelle en public."]
  ] },

"M012": { type: "tri", titre: "Quel service pour quel client ?", consigne: "Un client achète un vélo d'appartement. Quel service LABORO lui proposer ?",
  categories: ["Livraison", "Démonstration", "Garantie commerciale"],
  items: [
    ["« Il est trop lourd pour ma voiture. »", 0, "On le livre chez lui."],
    ["« Je ne sais pas comment régler la résistance. »", 1, "On lui montre en magasin."],
    ["« Et s'il ne me convient pas une fois à la maison ? »", 2, "30 jours pour échanger ou être remboursé."],
    ["« J'habite au troisième sans ascenseur. »", 0, "La livraison évite de le porter."]
  ] },

"M013": { type: "tri", titre: "Client fidèle ou client de passage ?", consigne: "Pour une soirée de fidélisation, on invite d'abord les clients fidèles.",
  categories: ["Client fidèle", "Client de passage"],
  items: [
    ["Elle achète chez LABORO depuis 4 ans, plusieurs fois par an.", 0, "Achats réguliers."],
    ["Il est venu une fois, il y a deux ans.", 1, "Un seul achat, ancien."],
    ["Un club qui commande ses maillots chaque saison.", 0, "Fidèle depuis plusieurs saisons."],
    ["Un touriste qui a acheté une casquette.", 1, "Achat ponctuel."]
  ] },

"ACC1": { type: "etapes", titre: "Accueillir en 3 gestes", intro: "Même occupé, un bon accueil tient en trois gestes simples.",
  etapes: [
    { ico: "👀", k: "Regarder", s: "Lever les yeux dès que quelqu'un entre" },
    { ico: "😊", k: "Sourire et saluer", s: "« Bonjour ! », même de loin" },
    { ico: "🙋", k: "Se rendre disponible", s: "« Je suis à vous dans un instant. »" }
  ] },

"ACC2": { type: "tri", titre: "Au téléphone : oui ou non ?", consigne: "Ces gestes sont-ils professionnels au téléphone ?",
  categories: ["Oui", "Non"],
  items: [
    ["Sourire en parlant : ça s'entend.", 0, "La voix devient plus chaleureuse."],
    ["Manger pendant l'appel.", 1, "Le client l'entend."],
    ["Demander la permission avant de mettre en attente.", 0, "Le client sait ce qui se passe."],
    ["Raccrocher sans saluer quand on a fini.", 1, "On termine toujours poliment."]
  ] },

"ACC3": { type: "tri", titre: "Calmer ou énerver ?", consigne: "Un client s'impatiente à la caisse. Effet de chaque phrase ?",
  categories: ["Calme la situation", "Énerve davantage"],
  items: [
    ["« Je comprends, je fais au plus vite pour vous. »", 0, "On reconnaît son attente."],
    ["« Ce n'est pas ma faute s'il y a du monde. »", 1, "On se défend au lieu d'aider."],
    ["« Je vous propose de passer à la caisse d'à côté. »", 0, "Une solution concrète."],
    ["Ignorer sa remarque et continuer.", 1, "Le client se sent méprisé."]
  ] },

"ACC4": { type: "tri", titre: "Accueillir lors d'un événement", consigne: "Journée Portes Ouvertes : bonne ou mauvaise idée ?",
  categories: ["Bonne idée", "Mauvaise idée"],
  items: [
    ["Arriver en avance pour préparer le poste d'accueil.", 0, "On est prêt avant les premiers visiteurs."],
    ["Regarder son téléphone quand il n'y a personne.", 1, "Un visiteur peut arriver à tout moment."],
    ["Connaître le programme de la journée par cœur.", 0, "On répond vite aux questions."],
    ["Laisser le poste d'accueil vide pour aller aider en réserve.", 1, "Les visiteurs ne sont plus accueillis."]
  ] },

"SA1": { type: "tri", titre: "Gratuit ou payant ?", consigne: "Les services de livraison LABORO ont-ils un coût pour le client ?",
  categories: ["Gratuit", "Payant"],
  items: [
    ["Le retrait au showroom (click and collect).", 0, "Le client vient chercher sa commande."],
    ["La livraison express en 24 heures.", 1, "Elle coûte 12,90 €."],
    ["La livraison standard en 48 heures.", 1, "Elle coûte 6,90 €."],
    ["La garantie commerciale de 30 jours.", 0, "Elle est incluse."]
  ] },

"M017": { type: "tri", titre: "Où chercher des prospects ?", consigne: "Ces sources aident-elles à trouver des clubs ou des entreprises à contacter ?",
  categories: ["Source utile", "Source inutile"],
  items: [
    ["Le site de la mairie, qui liste les associations.", 0, "Les associations y sont recensées."],
    ["Un forum des associations.", 0, "On y rencontre des présidents de club."],
    ["Un jeu vidéo de football.", 1, "Aucune information sur de vrais clubs."],
    ["Le site d'une fédération sportive du département.", 0, "Il liste les clubs affiliés."]
  ] },

"M018": { type: "etapes", titre: "Avant de décrocher le téléphone", intro: "Un appel de prospection se prépare avant de composer le numéro.",
  etapes: [
    { ico: "📇", k: "Lire la fiche", s: "Nom, structure, besoins estimés" },
    { ico: "🎯", k: "Fixer son objectif", s: "Par exemple, obtenir un rendez-vous" },
    { ico: "🗒️", k: "Préparer son accroche", s: "Deux phrases pour se présenter" },
    { ico: "🛡️", k: "Prévoir une objection", s: "Et la réponse à donner" }
  ] },

"M064": { type: "tri", titre: "Zone chaude ou zone froide ?", consigne: "Dans un magasin, certains endroits voient passer beaucoup plus de monde.",
  categories: ["Zone chaude", "Zone froide"],
  items: [
    ["Juste après l'entrée.", 0, "Tous les clients y passent."],
    ["Un recoin au fond, peu éclairé.", 1, "Peu de passage."],
    ["Près des caisses.", 0, "Les clients y attendent."],
    ["Un rayon sans panneau, derrière un pilier.", 1, "Les clients ne le voient pas."]
  ] },

"M065": { type: "chaine", titre: "Ton premier argument CAB", produit: "Tapis yoga 6mm",
  intro: "Entraîne-toi sur le tapis de yoga 6 mm.",
  questions: ["Et donc ?", "Et pour la cliente ?"],
  maillons: [
    { k: "Caractéristique", txt: "Ce tapis fait 6 mm d'épaisseur." },
    { k: "Avantage", txt: "…donc il amortit bien sur un sol dur." },
    { k: "Bénéfice", txt: "…vous n'aurez pas mal aux genoux pendant vos séances." }
  ] },

"M066": { type: "tri", titre: "Rayon prêt pour l'ouverture ?", consigne: "Ce que tu vois en faisant le tour du rayon à 9 h 45 : tout va bien ?",
  categories: ["Rayon prêt", "À corriger avant l'ouverture"],
  items: [
    ["Chaque produit a son étiquette de prix.", 0, "Obligatoire et utile au client."],
    ["Un carton vide traîne dans l'allée.", 1, "Danger et mauvaise image."],
    ["Les produits sont alignés, faces bien visibles.", 0, "Le rayon donne envie."],
    ["Une étagère est vide alors que le produit est en réserve.", 1, "Il faut faire le réassort."]
  ] },

"M067": { type: "tri", titre: "Quel document ?", consigne: "Associe chaque situation au bon document de vente.",
  categories: ["Devis", "Bon de livraison", "Ticket de caisse"],
  items: [
    ["Un club veut connaître le prix avant de décider.", 0, "Une proposition chiffrée avant la vente."],
    ["Le transporteur remet le colis et fait signer le client.", 1, "Il accompagne la marchandise."],
    ["Un particulier paie ses chaussettes en magasin.", 2, "Sa preuve d'achat."],
    ["Une association demande une estimation pour 20 ballons.", 0, "Un chiffrage avant engagement."]
  ] },

"M068": { type: "tri", titre: "Quel outil de fidélisation ?", consigne: "LABORO dispose de plusieurs outils. Lequel est décrit ?",
  categories: ["Carte LABORO PRO", "Newsletter", "Soirée clients"],
  items: [
    ["1 € dépensé = 1 point.", 0, "Les points donnent droit à des remises."],
    ["Un mail chaque mois avec les nouveautés et des conseils.", 1, "On garde le contact régulièrement."],
    ["Une rencontre au showroom avec essais et avant-premières.", 2, "Un moment vécu ensemble."],
    ["100 points = 10 € de remise.", 0, "Le principe de la carte."]
  ] },

"M069": { type: "tri", titre: "Ça va dans la fiche client ?", consigne: "Après un échange avec un client, que noter dans LABORO Connect ?",
  categories: ["À noter", "À ne pas noter"],
  items: [
    ["Ce qu'il a acheté et la date.", 0, "C'est son historique."],
    ["La prochaine action prévue : le rappeler lundi.", 0, "Personne n'oubliera."],
    ["Ton avis personnel sur sa tenue.", 1, "Ce n'est pas une information commerciale."],
    ["Son sport préféré, qu'il a mentionné.", 0, "Utile pour le conseiller la prochaine fois."]
  ] },

"M055": { type: "tri", titre: "Posséder ou utiliser ?", consigne: "Avoir une carte de fidélité, ce n'est pas forcément s'en servir.",
  categories: ["Porteur qui l'utilise", "Porteur qui ne l'utilise pas"],
  items: [
    ["Elle présente sa carte à chaque passage en caisse.", 0, "Elle l'utilise."],
    ["Il a la carte dans son portefeuille mais l'oublie toujours.", 1, "Il la possède sans s'en servir."],
    ["Elle a utilisé ses points pour une remise le mois dernier.", 0, "Elle l'utilise."],
    ["Il a créé sa carte il y a 2 ans et n'est jamais revenu.", 1, "Carte inutilisée."]
  ] },

"M057": { type: "cartes", titre: "Les mots du rayon", cartes: [
    ["Un facing, c'est…", "Un produit visible de face dans le rayon."],
    ["Un produit phare, c'est…", "Celui qui se vend le plus."],
    ["Pourquoi placer un produit phare à hauteur des yeux ?", "C'est l'endroit que les clients voient le mieux."],
    ["Un produit complémentaire, c'est…", "Un produit qui va avec un autre, comme des chaussettes avec des chaussures."]
  ] },

"M060": { type: "tri", titre: "Bonne ou mauvaise nouvelle ?", consigne: "Lis chaque phrase d'un tableau de bord : est-ce positif pour LABORO ?",
  categories: ["Bonne nouvelle", "Mauvaise nouvelle"],
  items: [
    ["Le chiffre d'affaires du rayon tennis augmente de 10 %.", 0, "Les ventes progressent."],
    ["Le rayon natation baisse de 5 %.", 1, "Les ventes reculent."],
    ["Il y a plus de nouveaux clients que l'an dernier.", 0, "LABORO attire du monde."],
    ["Le panier moyen diminue.", 1, "Les clients dépensent moins à chaque achat."]
  ] },

"M061": { type: "etapes", titre: "Les premiers mots face à un client irrité", intro: "Un client arrive mécontent. Les premières secondes comptent.",
  etapes: [
    { ico: "👋", k: "Saluer", s: "Calmement, en le regardant" },
    { ico: "👂", k: "Écouter", s: "Le laisser tout dire, sans couper" },
    { ico: "🤝", k: "Montrer qu'on comprend", s: "« Je comprends que ce soit agaçant. »" },
    { ico: "🔄", k: "Reformuler", s: "« Si je comprends bien… »" }
  ] },

"M062": { type: "tri", titre: "Calculer un pourcentage : quel total ?", consigne: "Pour calculer un pourcentage, on divise par le bon total.",
  categories: ["Bon total", "Mauvais total"],
  items: [
    ["9 joueurs satisfaits sur 24 interrogés : je divise par 24.", 0, "24 est le nombre de joueurs interrogés."],
    ["9 joueurs satisfaits sur 24 interrogés : je divise par 9.", 1, "On divise toujours par le total."],
    ["30 clients sur 50 répondants : je divise par 50.", 0, "50 est le total des répondants."],
    ["30 clients sur 50 répondants : je divise par 30.", 1, "C'est la partie, pas le total."]
  ] },

"B41-P1": { type: "tri", titre: "Critère rempli ou pas ?", consigne: "Critères LABORO : au moins 15 membres, plus d'un entraînement par semaine, budget de plus de 300 € par an. Ce critère est-il rempli ?",
  categories: ["Rempli", "Pas rempli"],
  items: [
    ["Un club de judo de 15 membres (critère : au moins 15).", 0, "« Au moins 15 » : 15 compte."],
    ["Un club de pétanque qui joue une fois par semaine (critère : plus d'une fois).", 1, "Une fois ne suffit pas."],
    ["Une association avec 280 € de budget (critère : plus de 300 €).", 1, "280 est inférieur à 300."],
    ["Un club de basket qui s'entraîne trois fois par semaine.", 0, "Trois fois, c'est plus d'une fois."]
  ] },

"B42-P1": { type: "tri", titre: "Une bonne accroche téléphonique ?", consigne: "Les deux premières phrases d'un appel de prospection donnent envie d'écouter, ou pas.",
  categories: ["Bonne accroche", "À reprendre"],
  items: [
    ["« Bonjour, je suis Inès, de LABORO Sport à Évry. Nous équipons plusieurs clubs de votre ville. »", 0, "On se présente et on donne une raison d'écouter."],
    ["« Allô, vous voulez acheter des maillots ? »", 1, "Trop direct, sans présentation."],
    ["« Bonjour, c'est pour une enquête… enfin, pour vendre. »", 1, "Pas clair et pas honnête."],
    ["« Bonjour, je suis Hugo, de LABORO. Votre saison reprend bientôt : avez-vous prévu vos équipements ? »", 0, "Elle parle du besoin du club."]
  ] },

"B43-P1": { type: "tri", titre: "Découvrir le besoin d'un club", consigne: "Pendant un entretien de découverte, ces questions sont-elles utiles ?",
  categories: ["Question utile", "Question inutile"],
  items: [
    ["« Combien de licenciés avez-vous cette saison ? »", 0, "On mesure le besoin."],
    ["« Qui décide des achats d'équipement ? »", 0, "On sait à qui s'adresser."],
    ["« Vous regardez le foot à la télé ? »", 1, "Sans lien avec le besoin."],
    ["« Quand commence votre saison ? »", 0, "On connaît le délai."]
  ] },

"B44-P1": { type: "tri", titre: "Une bonne relance ?", consigne: "Un prospect n'a pas répondu à un devis. Ces relances sont-elles réussies ?",
  categories: ["Bonne relance", "Relance maladroite"],
  items: [
    ["« Bonjour, avez-vous pu consulter le devis envoyé lundi pour vos ballons ? »", 0, "Courte, polie, elle rappelle le contexte."],
    ["« Pourquoi vous ne répondez pas ? »", 1, "Agressive."],
    ["Relancer trois fois dans la même journée.", 1, "Trop insistant."],
    ["« Les tailles demandées sont en stock : souhaitez-vous que je bloque la commande ? »", 0, "Elle apporte une information utile."]
  ] },

"B45-P1": { type: "tri", titre: "Réponse au client qui trouve LABORO trop cher", consigne: "Ces réponses respectent-elles la règle LABORO ?",
  categories: ["Bonne réponse", "À éviter"],
  items: [
    ["« Je comprends. Regardons ce qui est inclus dans notre offre. »", 0, "On accepte, puis on montre la valeur."],
    ["« Le concurrent vend de la mauvaise qualité. »", 1, "On ne critique jamais un concurrent."],
    ["« Bon, je vous fais une remise tout de suite. »", 1, "Pas de remise sans contrepartie."],
    ["« Nous livrons plus vite, et vous avez un commercial joignable directement. »", 0, "On met en avant nos services."]
  ] },

"ACC5": { type: "tri", titre: "Accueillir un visiteur professionnel", consigne: "Un livreur ou un technicien arrive. Ces gestes font-ils partie de l'accueil ?",
  categories: ["Oui", "Non"],
  items: [
    ["Lui demander son nom et la personne qu'il vient voir.", 0, "On vérifie l'objet de sa visite."],
    ["Le laisser circuler seul dans les bureaux.", 1, "Un visiteur est accompagné."],
    ["Lui remettre un badge visiteur.", 0, "On sait qui est dans les locaux."],
    ["Noter son heure d'arrivée dans le registre.", 0, "Le registre garde une trace des visites."]
  ] },

"ACC6": { type: "tri", titre: "Que faire de ce mail ?", consigne: "Boîte mail d'un magasin de sport : quel traitement pour chaque message ?",
  categories: ["Répondre soi-même", "Transmettre", "Supprimer"],
  items: [
    ["« À quelle heure ouvrez-vous le samedi ? »", 0, "Une demande simple."],
    ["« Je voudrais un devis pour équiper mon club. »", 1, "À transmettre à la commerciale B2B."],
    ["« Félicitations, vous avez gagné 1 000 € ! Cliquez ici. »", 2, "Un faux message : on ne clique pas."],
    ["« Ma commande est arrivée cassée. »", 1, "À transmettre au service satisfaction client."]
  ] }

});

// ─────────── Paliers 3 et 4 (61 missions, 13/10/2026) ───────────
// Même règle : un exercice par mission, sur une situation voisine,
// sans jamais donner la réponse aux questions de la mission.
Object.assign(EXERCICES_MISSIONS, {

"M023": { type: "tri", titre: "À quel axe de veille rattacher l'information ?", consigne: "Un dispositif de veille se range par axes. Classe chaque information repérée.",
  categories: ["Concurrence", "Clients", "Fournisseurs et produits", "Réglementation"],
  items: [
    ["Un magasin de vélos ouvre à Corbeil avec un atelier de réparation.", 0, "Un nouvel acteur sur notre zone."],
    ["Les clients demandent de plus en plus la location de matériel.", 1, "Une attente qui monte chez les clients."],
    ["Une marque de textile sort une gamme en fibres recyclées.", 2, "Une nouveauté de l'offre fournisseurs."],
    ["L'affichage de l'indice de réparabilité devient obligatoire sur certains produits.", 3, "Un changement de règle à respecter."]
  ] },

"M024": { type: "tri", titre: "Quel canal pour quelle étape ?", consigne: "Un prospect B2B écrit sur plusieurs canaux. Choisis le canal le plus adapté à chaque étape.",
  categories: ["Téléphone", "Mail", "Rendez-vous"],
  items: [
    ["Rassurer vite un prospect qui attend une réponse depuis la veille.", 0, "La voix rassure et permet de dialoguer."],
    ["Envoyer une proposition chiffrée que le client relira à tête reposée.", 1, "L'écrit garde une trace précise."],
    ["Faire essayer les produits et voir l'espace à aménager.", 2, "Le face-à-face permet la démonstration."],
    ["Confirmer la date et l'heure d'une rencontre.", 1, "Une confirmation écrite évite les malentendus."]
  ] },

"M025": { type: "cartes", titre: "Chiffrer le coût d'une réclamation", cartes: [
    ["Coût direct d'une réclamation ?", "Le temps passé et les gestes accordés pour la traiter."],
    ["Coût caché ?", "Le chiffre d'affaires futur perdu si le client ne revient pas."],
    ["Un taux de satisfaction post-réclamation mesure…", "La part des clients satisfaits de la façon dont leur réclamation a été traitée."],
    ["Pourquoi chercher la cause d'une réclamation ?", "Pour l'éviter la prochaine fois, au lieu de la réparer à chaque fois."]
  ] },

"SA3": { type: "tri", titre: "Écart à l'objectif : alerte ou pas ?", consigne: "Services d'un magasin de randonnée : chaque résultat est-il préoccupant ?",
  categories: ["Objectif atteint", "Signal d'alerte"],
  items: [
    ["Satisfaction location de sacs : 4,5 sur 5, objectif 4.", 0, "Au-dessus de l'objectif."],
    ["Délais de réparation tenus : 62 %, objectif 90 %.", 1, "Écart important : il faut agir."],
    ["Retouches livrées à temps : 96 %, objectif 95 %.", 0, "L'objectif est atteint."],
    ["Réclamations sur l'entretien des skis : en hausse de 40 %.", 1, "Une tendance qui se dégrade."]
  ] },

"M026": { type: "cartes", titre: "Vendre à une collectivité", cartes: [
    ["Bon de commande public ?", "Le document officiel qui engage la collectivité : sans lui, on ne livre pas."],
    ["Pourquoi vérifier le stock avant de confirmer ?", "Pour ne promettre que ce qu'on peut livrer à la date imposée."],
    ["Facture d'une collectivité : particularité ?", "Elle doit reprendre exactement les références du bon de commande."],
    ["Après la livraison, on…", "Assure le suivi pour faire de la commande une relation durable."]
  ] },

"M027": { type: "etapes", titre: "Une procédure de réclamation standard", intro: "Une procédure claire permet à chacun de traiter une réclamation de la même façon.",
  etapes: [
    { ico: "📥", k: "Enregistrer", s: "Toute réclamation, avec sa date et son canal" },
    { ico: "🏷️", k: "Qualifier", s: "Type de problème et niveau d'urgence" },
    { ico: "🛠️", k: "Résoudre", s: "Solution dans un délai fixé à l'avance" },
    { ico: "📈", k: "Analyser", s: "Chaque semaine, les causes qui reviennent" }
  ] },

"M028": { type: "tri", titre: "Augmenter le taux de réponse d'une enquête", consigne: "Ces idées font-elles répondre plus de clients ?",
  categories: ["Bonne idée", "Mauvaise idée"],
  items: [
    ["Envoyer un questionnaire de 3 minutes juste après l'achat.", 0, "Court et au bon moment."],
    ["Envoyer 40 questions trois mois après l'achat.", 1, "Trop long, trop tard."],
    ["Proposer un QR code sur le ticket de caisse.", 0, "Facile et immédiat."],
    ["Relancer le même client tous les jours.", 1, "Insistant : on le lasse."]
  ] },

"M029": { type: "tri", titre: "Quel niveau de fidélité pour quel client ?", consigne: "Un programme à niveaux récompense davantage les meilleurs clients.",
  categories: ["Niveau d'entrée", "Niveau intermédiaire", "Niveau premium"],
  items: [
    ["Un client qui vient de faire son premier achat.", 0, "On l'inscrit et on lui donne envie de revenir."],
    ["Un client qui achète 3 ou 4 fois par an.", 1, "Régulier : on le récompense davantage."],
    ["Un club qui commande toute sa saison chez nous.", 2, "Très gros client : avantages exclusifs."],
    ["Un couple qui achète régulièrement depuis 5 ans et nous recommande.", 2, "Fidèle et ambassadeur."]
  ] },

"M030": { type: "cartes", titre: "Au-delà du chiffre d'affaires", cartes: [
    ["Un événement peut être rentable…", "Sans rapporter beaucoup le soir même : on mesure aussi les achats des semaines suivantes."],
    ["Bénéfice non financier ?", "Un effet utile qui ne se compte pas tout de suite en euros."],
    ["Reconduire, adapter ou remplacer : sur quoi décider ?", "Sur les objectifs fixés avant l'action, comparés aux résultats."],
    ["Pourquoi mesurer le NPS après l'événement ?", "Pour savoir si les invités recommandent davantage l'entreprise."]
  ] },

"M031": { type: "tri", titre: "Bon modèle de réponse ou pas ?", consigne: "Une réponse type fait gagner du temps, à condition d'être bien pensée.",
  categories: ["Bon modèle", "À reprendre"],
  items: [
    ["Un modèle avec un espace pour le nom du client et le numéro de commande.", 0, "Personnalisable en quelques secondes."],
    ["Un modèle identique envoyé sans relecture à tout le monde.", 1, "Le client sent la réponse automatique."],
    ["Un modèle qui annonce un délai précis de traitement.", 0, "Le client sait à quoi s'attendre."],
    ["Un modèle qui renvoie le client vers un autre service sans coordonnées.", 1, "Le client est laissé sans solution."]
  ] },

"M032": { type: "tri", titre: "Segment B2B prometteur ou pas ?", consigne: "Pour développer le B2B, on cible les segments qui ont du potentiel.",
  categories: ["Segment prioritaire", "Segment secondaire"],
  items: [
    ["Des écoles de danse avec beaucoup d'élèves et des achats chaque année.", 0, "Volume et régularité."],
    ["Des associations qui achètent une fois tous les cinq ans.", 1, "Achats trop rares."],
    ["Des entreprises qui organisent des challenges sportifs chaque trimestre.", 0, "Besoins réguliers et budget dédié."],
    ["Des clubs déjà sous contrat de 3 ans avec un concurrent.", 1, "Peu accessibles à court terme."]
  ] },

"M033": { type: "cartes", titre: "Quand le CA cache un problème", cartes: [
    ["Le CA peut monter même si moins de visiteurs achètent : pourquoi ?", "Parce que ceux qui achètent dépensent plus, ou que la fréquentation augmente."],
    ["Solde clients ?", "Nouveaux clients − clients perdus."],
    ["Taux de transformation bas : où chercher ?", "Dans chaque étape du parcours du client en magasin."],
    ["Augmenter le panier moyen ?", "Faire acheter plus, ou plus cher, au même client."]
  ] },

"M034": { type: "etapes", titre: "Les premières heures d'une crise", intro: "Face à une crise, on agit vite et dans le bon ordre.",
  etapes: [
    { ico: "🧯", k: "Évaluer", s: "Combien de clients, quel enjeu, quelle échéance" },
    { ico: "📞", k: "Informer", s: "Les clients touchés, avant qu'ils ne le découvrent seuls" },
    { ico: "🔄", k: "Solution de secours", s: "Ce qui peut être fait tout de suite avec le stock" },
    { ico: "📝", k: "Rapport", s: "Faits, actions, coûts, et comment éviter que ça recommence" }
  ] },

"M035": { type: "tri", titre: "Expérience omnicanale ou non ?", consigne: "Le client passe d'un canal à l'autre sans rupture. Ces situations le permettent-elles ?",
  categories: ["Omnicanal réussi", "Rupture entre canaux"],
  items: [
    ["Le client réserve en ligne et retire en magasin deux heures plus tard.", 0, "Les canaux se complètent."],
    ["Le vendeur ne peut pas voir la commande passée sur le site.", 1, "Les informations ne circulent pas."],
    ["Un panier abandonné déclenche un mail avec la disponibilité en magasin.", 0, "On relie le site et le magasin."],
    ["Un produit acheté en ligne ne peut pas être échangé en magasin.", 1, "Le client est bloqué entre deux canaux."]
  ] },

"M036": { type: "tri", titre: "Priorité d'une commande B2B", consigne: "Plusieurs commandes à suivre : laquelle traiter en premier ?",
  categories: ["Priorité haute", "Priorité normale"],
  items: [
    ["Une commande attendue après-demain pour un tournoi, bloquée chez le transporteur.", 0, "Échéance proche et client en risque."],
    ["Une commande livrée hier, sans problème signalé.", 1, "On fera un simple suivi de satisfaction."],
    ["Un client stratégique qui n'a pas reçu sa confirmation de commande.", 0, "Enjeu fort : on rassure vite."],
    ["Une commande prévue dans trois semaines, dans les temps.", 1, "Pas d'urgence aujourd'hui."]
  ] },

"M037": { type: "cartes", titre: "Évaluer un programme de fidélité", cartes: [
    ["ROI d'un programme ?", "(Gain généré − coût du programme) ÷ coût × 100."],
    ["Taux d'inscription faible : comment trouver les causes ?", "Interroger les clients non inscrits et observer le parcours d'inscription."],
    ["Pourquoi comparer inscrits et non-inscrits ?", "Pour voir si le programme change vraiment le comportement d'achat."],
    ["Valeur client (CLV) ?", "Ce qu'un client rapporte sur toute la durée de sa relation avec l'entreprise."]
  ] },

"M038": { type: "tri", titre: "Source de prospection fiable ou pas ?", consigne: "Pour repérer de grandes entreprises, toutes les sources ne se valent pas.",
  categories: ["Source fiable", "Source à vérifier"],
  items: [
    ["L'annuaire officiel des entreprises (Sirene).", 0, "Données publiques et à jour."],
    ["Un message anonyme sur un forum.", 1, "Impossible de vérifier l'auteur."],
    ["Le site de la chambre de commerce de l'Essonne.", 0, "Source institutionnelle."],
    ["Une liste d'entreprises trouvée sans date sur un blog.", 1, "Peut-être ancienne et incomplète."]
  ] },

"M039": { type: "cartes", titre: "Dimensionner une prospection", cartes: [
    ["Point de départ du calcul ?", "L'objectif final (contrats), puis on remonte la chaîne de conversion."],
    ["Si 1 rendez-vous sur 4 donne un contrat…", "Il faut 4 rendez-vous pour signer 1 contrat."],
    ["Pourquoi prévoir les risques ?", "Pour avoir une parade prête au lieu d'improviser."],
    ["Un bon planning de prospection montre…", "Les actions, les volumes et les relances, semaine par semaine."]
  ] },

"M040": { type: "tri", titre: "Accorder une remise ?", consigne: "Un prospect en négociation demande un effort. Réponse conforme à une bonne politique commerciale ?",
  categories: ["Réponse adaptée", "Réponse risquée"],
  items: [
    ["« D'accord pour 5 %, si vous vous engagez sur la saison complète. »", 0, "Une remise contre une contrepartie."],
    ["« Je vous fais 20 % tout de suite pour être sûr de signer. »", 1, "Marge sacrifiée sans contrepartie."],
    ["« Je peux vous offrir la livraison si la commande dépasse le seuil prévu. »", 0, "Un geste encadré et lié au volume."],
    ["« Je dois vérifier avec ma responsable, je vous rappelle demain. »", 0, "On ne dépasse pas sa limite d'autorisation."]
  ] },

"M041": { type: "tri", titre: "Sur quel critère LABORO peut-il gagner ?", consigne: "Un grand CSE note ses fournisseurs. Pour chaque critère, LABORO a-t-il un avantage ?",
  categories: ["Avantage LABORO", "Point à défendre"],
  items: [
    ["Conseil d'un commercial dédié qui se déplace.", 0, "Proximité et suivi personnalisé."],
    ["Prix unitaire le plus bas du marché.", 1, "Un grand réseau national peut être moins cher."],
    ["Flocage livré en 3 semaines au lieu de 5.", 0, "Délai plus court que le concurrent."],
    ["Catalogue très étendu sur toutes les disciplines.", 1, "Un spécialiste régional a une offre plus ciblée."]
  ] },

"M042": { type: "tri", titre: "Quelle stratégie pour quel compte ?", consigne: "Dans un portefeuille B2B, chaque compte demande une approche différente.",
  categories: ["Développer", "Entretenir", "Reconquérir"],
  items: [
    ["Un client qui achète peu mais dont le budget sport augmente.", 0, "Fort potentiel : on lui propose plus."],
    ["Un client fidèle et satisfait qui commande régulièrement.", 1, "On garde le contact et la qualité de service."],
    ["Un client mécontent depuis un incident de livraison.", 2, "On répare la relation avant tout."],
    ["Un ancien client parti chez un concurrent l'an dernier.", 2, "On cherche à le faire revenir."]
  ] },

"M043": { type: "cartes", titre: "Faire le bilan d'une opération", cartes: [
    ["ROI d'une opération de prospection ?", "(Marge ou CA généré − coût de l'opération) ÷ coût × 100."],
    ["Coût d'acquisition d'un client ?", "Coût de l'opération ÷ nombre de nouveaux clients."],
    ["Où se perd-on dans la chaîne de conversion ?", "À l'étape où le taux de passage est le plus faible."],
    ["Un bon enseignement est…", "Concret, appuyé sur un chiffre, et réutilisable pour la prochaine opération."]
  ] },

"M044": { type: "tri", titre: "Classer dans une matrice SWOT", consigne: "Forces et faiblesses viennent de l'entreprise, opportunités et menaces de l'extérieur.",
  categories: ["Force", "Faiblesse", "Opportunité", "Menace"],
  items: [
    ["L'équipe connaît très bien les clubs du département.", 0, "Un atout interne."],
    ["Un seul commercial, à mi-temps, pour tout le B2B.", 1, "Une limite interne."],
    ["Les entreprises développent le sport au travail.", 2, "Une tendance extérieure favorable."],
    ["Un grand réseau national lance une offre B2B agressive.", 3, "Un risque extérieur."]
  ] },

"M080": { type: "tri", titre: "Objectif SMART ou pas ?", consigne: "Un objectif SMART est spécifique, mesurable, atteignable, réaliste et limité dans le temps.",
  categories: ["Objectif SMART", "Objectif flou"],
  items: [
    ["« Vendre plus de raquettes. »", 1, "Ni chiffre ni date."],
    ["« Vendre 60 raquettes de padel du 2 au 9 mai. »", 0, "Précis, chiffré, daté."],
    ["« Que les clients soient contents. »", 1, "Impossible à mesurer tel quel."],
    ["« Atteindre 85 % de satisfaction sur l'animation, mesurée le dernier jour. »", 0, "Mesurable et daté."]
  ] },

"M081": { type: "etapes", titre: "De l'insatisfaction au plan d'action", intro: "Un plan d'amélioration part des causes, pas des symptômes.",
  etapes: [
    { ico: "💸", k: "Chiffrer", s: "Ce que l'insatisfaction coûte à l'entreprise" },
    { ico: "🔍", k: "Trouver les causes", s: "Pourquoi le problème arrive, pas seulement qu'il arrive" },
    { ico: "❓", k: "Mieux mesurer", s: "Des questions d'enquête qui ciblent le problème" },
    { ico: "🗓️", k: "Planifier", s: "Des actions datées, avec un responsable et un indicateur" }
  ] },

"M082": { type: "tri", titre: "Contrôler une livraison à la réception", consigne: "Avant de livrer un client, quelles vérifications auraient évité un problème ?",
  categories: ["Contrôle utile", "Contrôle inutile"],
  items: [
    ["Ouvrir un carton au hasard et vérifier quelques articles.", 0, "Un échantillon détecte les défauts de série."],
    ["Compter les articles par rapport au bon de livraison.", 0, "On repère les manquants avant le client."],
    ["Vérifier la couleur du camion du transporteur.", 1, "Sans rapport avec la qualité livrée."],
    ["Noter les réserves sur le bon de livraison en cas de dommage.", 0, "On garde un recours contre le fournisseur."]
  ] },

"M083": { type: "tri", titre: "Point fort ou axe de progrès ?", consigne: "Un bilan de stage s'appuie sur des faits. Comment classer chaque constat ?",
  categories: ["Point fort", "Axe de progrès"],
  items: [
    ["« Les clients me disent que j'explique clairement les produits. »", 0, "Un retour positif appuyé sur des faits."],
    ["« J'oublie souvent de proposer un produit complémentaire. »", 1, "Une habitude à travailler."],
    ["« Je n'ose pas conclure la vente quand le client hésite. »", 1, "Une compétence à renforcer."],
    ["« Mon tuteur m'a confié la caisse seul dès la deuxième semaine. »", 0, "Une marque de confiance."]
  ] },

"M084": { type: "tri", titre: "Objection et bonne réponse", consigne: "Associe chaque réponse à l'objection qu'elle traite.",
  categories: ["« C'est trop cher »", "« On a déjà un fournisseur »", "« Je n'ai pas le temps »"],
  items: [
    ["« Je comprends. Comparons ce qui est compris dans chaque offre. »", 0, "On ramène la discussion sur la valeur."],
    ["« Très bien. Pourquoi ne pas nous tester sur une petite commande ? »", 1, "Une commande test sans risque."],
    ["« Je vous propose 10 minutes, mardi ou jeudi, quand cela vous arrange. »", 2, "Court, précis, facile à accepter."],
    ["« Qu'est-ce qui vous plaît chez votre fournisseur actuel ? »", 1, "On découvre avant d'argumenter."]
  ] },

"M085": { type: "cartes", titre: "Une offre à trois niveaux", cartes: [
    ["Pourquoi proposer trois niveaux d'offre ?", "Le client choisit selon son budget, sans se sentir piégé."],
    ["Quel niveau est souvent choisi ?", "Celui du milieu, s'il est bien construit."],
    ["Demande de remise importante : réflexe ?", "Vérifier la marge minimale et demander une contrepartie."],
    ["Un argument face à un appel d'offres doit être…", "Relié à un critère de choix du client, et chiffré si possible."]
  ] },

"M086": { type: "cartes", titre: "Lire sa propre chaîne de conversion", cartes: [
    ["Beaucoup d'appels, peu de rendez-vous : piste ?", "Travailler l'accroche et la découverte au téléphone."],
    ["Beaucoup de devis, peu de signatures : piste ?", "Travailler la relance et la réponse aux objections."],
    ["Écart à l'objectif ?", "Résultat − objectif, en nombre et en pourcentage."],
    ["Un bon objectif personnel est…", "Chiffré, daté, et lié à l'étape la plus faible."]
  ] },

"M087": { type: "etapes", titre: "Gérer une urgence avec un partenaire", intro: "Quand la solution dépend d'un partenaire, on coordonne vite et on confirme tout par écrit.",
  etapes: [
    { ico: "📞", k: "Appeler le partenaire", s: "Expliquer l'urgence et demander un délai réaliste" },
    { ico: "🅱️", k: "Préparer un plan B", s: "Une solution de secours si le délai ne tient pas" },
    { ico: "🤝", k: "Rappeler le client", s: "À l'heure promise, avec une solution" },
    { ico: "📧", k: "Confirmer par écrit", s: "Engagements, horaires et coordonnées" }
  ] },

"M090": { type: "tri", titre: "Décliner un objectif global", consigne: "Un objectif d'entreprise se découpe en objectifs plus petits. Comment classer chacun ?",
  categories: ["Par canal", "Par rayon", "Par période"],
  items: [
    ["+12 % de chiffre d'affaires sur le site internet.", 0, "Le site est un canal de vente."],
    ["+8 % sur le rayon cyclisme.", 1, "Un rayon de l'offre."],
    ["60 % de l'objectif atteint dès la première année.", 2, "Un découpage dans le temps."],
    ["+20 % sur les ventes aux entreprises par le commercial terrain.", 0, "Le terrain est un canal."]
  ] },

"M091": { type: "tri", titre: "Frein au changement et parade", consigne: "Lancer une veille partagée, c'est changer les habitudes. Quelle parade pour quel frein ?",
  categories: ["« Je n'ai pas le temps »", "« Ça ne sert à rien »", "« Je ne sais pas faire »"],
  items: [
    ["Une fiche de veille qui se remplit en 2 minutes.", 0, "On réduit l'effort demandé."],
    ["Montrer une vente gagnée grâce à une info de veille.", 1, "On prouve l'utilité."],
    ["Un court atelier de prise en main avec un exemple.", 2, "On forme avant d'exiger."],
    ["Un point de 5 minutes intégré à la réunion du lundi.", 0, "La veille entre dans un temps déjà prévu."]
  ] },

"M092": { type: "etapes", titre: "Les étapes d'un parcours client", intro: "Pour améliorer l'expérience, on regarde chaque moment vécu par le client.",
  etapes: [
    { ico: "🔎", k: "Avant", s: "Il cherche une information, en ligne ou autour de lui" },
    { ico: "🚪", k: "Arrivée", s: "Il entre : accueil, orientation" },
    { ico: "🛍️", k: "Pendant", s: "Conseil, essai, choix, passage en caisse" },
    { ico: "💌", k: "Après", s: "Suivi, avis, raison de revenir" }
  ] },

"M112": { type: "tri", titre: "Arbitrer entre deux demandes", consigne: "Deux responsables veulent des choses différentes. Quelle méthode d'arbitrage est la plus solide ?",
  categories: ["Arbitrage solide", "Arbitrage fragile"],
  items: [
    ["Comparer ce que chaque option a rapporté l'an dernier.", 0, "On s'appuie sur des chiffres."],
    ["Donner raison à celui qui insiste le plus.", 1, "Ce n'est pas un critère objectif."],
    ["Chercher une solution qui garde l'essentiel des deux demandes.", 0, "Un compromis argumenté."],
    ["Décider au hasard pour gagner du temps.", 1, "Impossible à justifier."]
  ] },

"M093": { type: "etapes", titre: "Former un nouveau commercial", intro: "Une bonne formation fait pratiquer, pas seulement écouter.",
  etapes: [
    { ico: "🎯", k: "Objectif", s: "Ce qu'il saura faire à la fin de la séance" },
    { ico: "📖", k: "Apport", s: "Court : l'offre, les cibles, la méthode" },
    { ico: "🎭", k: "Mise en pratique", s: "Jeu de rôle sur un appel ou un rendez-vous" },
    { ico: "✅", k: "Vérification", s: "Un petit test et un retour personnalisé" }
  ] },

"M094": { type: "cartes", titre: "La loi de Pareto", cartes: [
    ["Le principe des 80/20 ?", "Une petite partie des clients fait souvent la plus grosse partie du chiffre d'affaires."],
    ["Conséquence pour le commercial ?", "Les comptes stratégiques méritent un suivi renforcé."],
    ["Les petits clients sont-ils inutiles ?", "Non : certains ont un fort potentiel de développement."],
    ["Un plan de compte contient…", "Objectifs, interlocuteurs, actions et calendrier pour un client."]
  ] },

"M095": { type: "tri", titre: "Bénéfice ou risque d'un nouveau service ?", consigne: "Un magasin imagine un service d'abonnement à l'entretien des vélos.",
  categories: ["Bénéfice", "Risque"],
  items: [
    ["Des revenus réguliers chaque mois.", 0, "Le CA devient plus prévisible."],
    ["L'atelier débordé si trop de clients s'abonnent en même temps.", 1, "Une capacité à anticiper."],
    ["Des clients qui reviennent souvent au magasin.", 0, "Plus d'occasions de vente."],
    ["Un investissement de départ en outillage.", 1, "Un coût engagé avant les premières recettes."]
  ] },

"M113": { type: "tri", titre: "Signal faible ou signal fort ?", consigne: "Une veille efficace repère les signaux avant qu'ils ne deviennent des pertes.",
  categories: ["Signal faible", "Signal fort"],
  items: [
    ["Un client CSE demande « par curiosité » les délais d'un concurrent.", 0, "Un indice discret à surveiller."],
    ["Le CSE annonce qu'il change de fournisseur le mois prochain.", 1, "La décision est déjà prise."],
    ["Le concurrent recrute un commercial dédié aux entreprises de l'Essonne.", 0, "Il prépare une offensive."],
    ["Deux clubs annulent leur commande de la saison.", 1, "La perte est visible."]
  ] },

"B41-P3": { type: "tri", titre: "Pourquoi perd-on des prospects ?", consigne: "Classe chaque situation selon la cause de perte.",
  categories: ["Pas de suivi", "Mauvaise qualification", "Fichier en désordre"],
  items: [
    ["Un prospect intéressé n'a jamais été rappelé.", 0, "Personne n'a assuré la relance."],
    ["On a passé trois rendez-vous avec quelqu'un qui ne décide pas.", 1, "L'autorité n'avait pas été vérifiée."],
    ["Le même club apparaît trois fois avec des contacts différents.", 2, "Des doublons dans le fichier."],
    ["On a proposé une offre à un club sans budget cette année.", 1, "Le budget n'avait pas été vérifié."]
  ] },

"B42-P3": { type: "cartes", titre: "Un plan de prospection annuel", cartes: [
    ["Point de départ ?", "Le chiffre d'affaires à gagner, divisé par le CA moyen d'un nouveau client."],
    ["Pourquoi répartir par cible ?", "Chaque cible a son délai de décision et son potentiel."],
    ["Pourquoi un calendrier trimestriel ?", "Pour tenir compte des moments où les clients décident."],
    ["Un budget bien ventilé montre…", "Ce que coûte chaque action, trimestre par trimestre."]
  ] },

"B43-P3": { type: "tri", titre: "Ajustement à mi-parcours", consigne: "À mi-opération, l'objectif est en danger. Ces ajustements sont-ils pertinents ?",
  categories: ["Ajustement pertinent", "Fausse bonne idée"],
  items: [
    ["Concentrer les efforts sur les prospects déjà en négociation.", 0, "Ils sont les plus proches de la signature."],
    ["Baisser tous les prix de 20 % pour accélérer.", 1, "Marge sacrifiée sans garantie."],
    ["Relancer les rendez-vous qui n'ont pas donné de devis.", 0, "On récupère des affaires en suspens."],
    ["Arrêter de suivre les indicateurs pour gagner du temps.", 1, "On pilote alors à l'aveugle."]
  ] },

"B44-P3": { type: "tri", titre: "Règle de suivi bien formulée ?", consigne: "Une règle de suivi doit être claire et vérifiable.",
  categories: ["Règle claire", "Règle floue"],
  items: [
    ["« Tout devis est relancé à J+5, puis à J+10. »", 0, "Délai précis, facile à contrôler."],
    ["« On relance quand on a le temps. »", 1, "Impossible à vérifier."],
    ["« Chaque échange est saisi dans LABORO Connect sous 24 heures. »", 0, "Précis et mesurable."],
    ["« Il faut bien suivre ses clients. »", 1, "Trop vague pour être appliqué."]
  ] },

"B45-P3": { type: "chaine", titre: "Transformer un service en argument de valeur", produit: "Maillot réversible club",
  intro: "Un club trouve un maillot moins cher ailleurs. Construis un argument de valeur sur le service.",
  questions: ["Et donc ?", "Et pour le club, combien ça vaut ?"],
  maillons: [
    { k: "Caractéristique", txt: "LABORO stocke les tailles du club et réassortit en 48 heures." },
    { k: "Avantage", txt: "…donc un nouveau joueur est équipé sans commande spéciale." },
    { k: "Bénéfice", txt: "…le club n'achète plus de stock d'avance et n'immobilise pas son budget." }
  ] },

"M075": { type: "tri", titre: "Démarque ou pas ?", consigne: "La démarque, c'est une perte de valeur sur le stock : connue (identifiée : casse, produit abîmé) ou inconnue (écart à l'inventaire : vol, erreur). Ces situations en créent-elles ?",
  categories: ["Crée de la démarque", "Ne crée pas de démarque"],
  items: [
    ["Un article volé dans le rayon.", 0, "Démarque inconnue."],
    ["Un produit abîmé en réserve, qui ne peut plus être vendu.", 0, "Démarque connue."],
    ["Un produit vendu normalement en caisse.", 1, "Sortie de stock enregistrée."],
    ["Une erreur de saisie lors de la réception.", 0, "Démarque administrative."]
  ] },

"M096": { type: "etapes", titre: "Le changement de saison d'un rayon", intro: "Un changement de saison se planifie à rebours de la date d'ouverture.",
  etapes: [
    { ico: "📦", k: "Écouler", s: "Les produits de la saison passée achetés ferme" },
    { ico: "↩️", k: "Retourner", s: "Ce que le fournisseur reprend, avec un bon de retour" },
    { ico: "🗺️", k: "Implanter", s: "La nouvelle collection selon un plan" },
    { ico: "📊", k: "Suivre", s: "Les indicateurs du nouveau rayon dès l'ouverture" }
  ] },

"M097": { type: "cartes", titre: "Les indicateurs d'un site marchand", cartes: [
    ["Taux de conversion d'un site ?", "Commandes ÷ visiteurs × 100."],
    ["Taux d'abandon de panier ?", "Paniers non validés ÷ paniers créés × 100."],
    ["Causes fréquentes d'abandon ?", "Frais de livraison découverts trop tard, paiement compliqué, compte obligatoire."],
    ["Panier moyen en ligne ?", "CA du site ÷ nombre de commandes."]
  ] },

"M098": { type: "tri", titre: "Quel réseau pour quel public ?", consigne: "Chaque réseau social touche un public différent.",
  categories: ["Instagram", "Facebook", "LinkedIn"],
  items: [
    ["Des coureurs de 18 à 35 ans qui partagent leurs photos de course.", 0, "Public jeune et visuel."],
    ["Des parents qui suivent le club de leurs enfants.", 1, "Groupes locaux et associations."],
    ["Des responsables de CSE et de ressources humaines.", 2, "Réseau professionnel."],
    ["Les membres d'une association de marche du quartier.", 1, "Communauté locale."]
  ] },

"M099": { type: "tri", titre: "Bon ou mauvais indicateur ?", consigne: "Tableau de bord d'un magasin de sport : l'indicateur est-il bon ou inquiétant ?",
  categories: ["Plutôt bon", "Inquiétant"],
  items: [
    ["Le taux de rupture monte de 2 % à 9 %.", 1, "Plus de ventes perdues."],
    ["Le NPS passe de +15 à +28.", 0, "Les clients recommandent davantage."],
    ["La part des nouveaux clients chute de moitié.", 1, "Le magasin ne se renouvelle plus."],
    ["Le taux de démarque baisse de 3 % à 1,5 %.", 0, "Moins de pertes."]
  ] },

"M103": { type: "tri", titre: "Menace ou opportunité ?", consigne: "Informations de veille pour un magasin de tennis. Comment les classer ?",
  categories: ["Menace", "Opportunité"],
  items: [
    ["Un concurrent ouvre un espace de cordage express à 2 km.", 0, "Il peut attirer nos clients."],
    ["Le padel se développe fortement dans le département.", 1, "Une nouvelle demande à saisir."],
    ["Une grande enseigne baisse ses prix sur les balles.", 0, "Pression sur nos ventes."],
    ["Un club voisin cherche un fournisseur pour son école de tennis.", 1, "Un nouveau client possible."]
  ] },

"M104": { type: "tri", titre: "Quel document pour quelle situation ?", consigne: "Après une vente, le bon document protège le client et le vendeur.",
  categories: ["Ticket de caisse", "Facture", "Bon de garantie"],
  items: [
    ["Un particulier veut pouvoir échanger son article.", 0, "Sa preuve d'achat."],
    ["Un club veut un justificatif pour sa comptabilité.", 1, "Obligatoire pour un professionnel."],
    ["Un client achète une montre GPS et veut connaître sa couverture en cas de panne.", 2, "Il précise ce qui est couvert."],
    ["Un particulier demande un document avec le détail HT et TVA.", 1, "Une facture peut lui être remise."]
  ] },

"M105": { type: "tri", titre: "Gravité d'un problème de commande", consigne: "Un sous-traitant annonce un problème. Quel niveau de gravité ?",
  categories: ["Grave", "Gérable"],
  items: [
    ["Des maillots livrés après le tournoi pour lequel ils étaient commandés.", 0, "Le besoin du client n'est plus couvert."],
    ["Un retard d'une journée, avec trois semaines de marge avant l'événement.", 1, "Le délai reste tenable."],
    ["Une faute d'orthographe sur le nom du club, à 48 heures d'un match.", 0, "Image du client et délai court."],
    ["Un carton livré dans une autre couleur d'emballage.", 1, "Sans impact sur le produit."]
  ] },

"M106": { type: "tri", titre: "Quel canal pour recontacter ce client ?", consigne: "Le bon canal dépend des habitudes du client.",
  categories: ["Mail", "SMS", "Appel"],
  items: [
    ["Un client qui ouvre toutes les newsletters.", 0, "Il lit ses mails."],
    ["Une cliente qui ne lit pas ses mails mais répond vite aux messages.", 1, "Le SMS est court et lu."],
    ["Un très bon client qui n'est pas venu depuis un an.", 2, "Un appel personnel montre qu'on tient à lui."],
    ["Une information courte : la date d'une vente privée.", 1, "Un message bref suffit."]
  ] },

"M107": { type: "tri", titre: "Quel type d'action de fidélisation ?", consigne: "Associe chaque action à son type.",
  categories: ["Avantage financier", "Expérience", "Reconnaissance"],
  items: [
    ["10 € offerts dès 100 points cumulés.", 0, "Un gain en argent."],
    ["Une sortie trail encadrée réservée aux clients.", 1, "Un moment vécu ensemble."],
    ["Un statut « Ambassadeur » affiché sur la carte.", 2, "Le client se sent valorisé."],
    ["Un essai en avant-première des nouveautés.", 1, "Une expérience exclusive."]
  ] },

"M108": { type: "cartes", titre: "Diagnostiquer un rayon", cartes: [
    ["Un produit sans aucune vente : questions à se poser ?", "Est-il visible, au bon prix, au bon endroit, et connu des vendeurs ?"],
    ["Écart à l'objectif en % ?", "(Réalisé − objectif) ÷ objectif × 100."],
    ["Taux de rupture élevé : conséquence ?", "Des ventes perdues et des clients déçus."],
    ["Une bonne action corrective a…", "Un responsable, une date et un indicateur de suivi."]
  ] },

"M109": { type: "tri", titre: "Associations : quelle technique ?", consigne: "Les associations sportives ont leurs propres habitudes. Quelle technique pour quelle situation ?",
  categories: ["E-mailing", "Forum ou événement", "Appel"],
  items: [
    ["Présenter LABORO à 40 associations en une seule journée.", 1, "Un forum des associations réunit beaucoup de contacts."],
    ["Annoncer l'offre de rentrée à toute la liste.", 0, "Un envoi groupé et personnalisé."],
    ["Obtenir un rendez-vous avec un président qui a ouvert le mail.", 2, "L'appel transforme l'intérêt."],
    ["Faire toucher les nouveaux maillots aux bénévoles.", 1, "Un stand permet de montrer les produits."]
  ] },

"M110": { type: "tri", titre: "Statut du prospect après l'appel", consigne: "Après chaque appel, le statut se met à jour dans LABORO Connect.",
  categories: ["Froid", "Tiède", "Chaud"],
  items: [
    ["Le prospect n'a pas décroché et ne connaît pas LABORO.", 0, "Aucun contact, aucun intérêt."],
    ["Le prospect accepte de recevoir une documentation.", 1, "Un premier intérêt, encore vague."],
    ["Le prospect confirme son budget et veut un devis cette semaine.", 2, "Besoin et budget confirmés."],
    ["Le prospect accepte un rendez-vous dans 15 jours.", 1, "Intérêt réel, décision encore loin."]
  ] },

"M111": { type: "tri", titre: "Classer des devis en attente", consigne: "Par quel devis commencer la relance ?",
  categories: ["Relancer en premier", "Relancer ensuite"],
  items: [
    ["Un devis important dont la validité expire vendredi.", 0, "Échéance proche."],
    ["Un petit devis envoyé hier.", 1, "Trop tôt pour relancer."],
    ["Un client qui a dit « je décide cette semaine ».", 0, "La décision est imminente."],
    ["Une collectivité qui vote son budget dans deux mois.", 1, "Son calendrier impose d'attendre."]
  ] },

"M100": { type: "cartes", titre: "Inventaire et démarque", cartes: [
    ["Stock théorique ?", "Stock initial + entrées − sorties enregistrées."],
    ["Démarque ?", "Stock théorique − stock réel, quand le réel est inférieur."],
    ["Surmarque ?", "Le stock réel est supérieur au théorique, souvent à cause d'une erreur de saisie."],
    ["Taux de démarque ?", "Valeur de la démarque ÷ chiffre d'affaires × 100."]
  ] },

"M101": { type: "cartes", titre: "Commander au bon fournisseur", cartes: [
    ["Quantité à commander ?", "Besoin prévu − stock disponible, arrondi au colisage."],
    ["Minimum de commande : conséquence ?", "On commande parfois plus que le besoin, ou on regroupe des références."],
    ["Scoring pondéré ?", "Chaque note est multipliée par l'importance du critère, puis on additionne."],
    ["Un bon de commande précise…", "Fournisseur, références, quantités, prix, date et lieu de livraison."]
  ] },

"M102": { type: "cartes", titre: "Prix, atelier et réseaux sociaux", cartes: [
    ["Prix de vente HT à partir du coût et du taux de marque ?", "Coût d'achat HT ÷ (1 − taux de marque)."],
    ["Taux d'occupation d'un atelier ?", "Places occupées ÷ places proposées × 100."],
    ["Seuil de rentabilité ?", "Le niveau de ventes à partir duquel les coûts sont couverts."],
    ["Taux d'engagement d'une publication ?", "Interactions (j'aime, commentaires, partages) ÷ abonnés ou personnes touchées × 100."]
  ] }

});
