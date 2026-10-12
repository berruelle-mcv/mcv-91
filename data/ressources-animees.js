// ================================================
//   LABORO Sport & Outdoor — Contenus animés des ressources
//   Affichés par js/moteur-animations.js en tête de l'onglet
//   « Apprendre d'abord », au-dessus de la fiche (qui reste inchangée).
//
//   Clé : "<compétence>-<palier>" (même clé que RES dans data/competences.js).
//   Palier 1 couvert pour les 19 compétences (12/10/2026).
//   Pour ajouter un palier : copier un bloc, changer la clé, adapter le texte.
//
//   Personnages : uniquement l'équipe et les clients de l'univers LABORO
//   (Thomas Moreau, conseiller de vente ; Nina Chevalier ; Romain Sauzet ;
//   Marco Pellini ; clients déjà présents dans les fiches et missions).
//   Aucune réflexivité ici : ce sont des supports de découverte (palier 1).
// ================================================

const PERSO_THOMAS = { nom: "Thomas", role: "Conseiller de vente", sexe: "h", couleur: "#185FA5", logo: true };
const PERSO_NINA = { nom: "Nina", role: "Commerciale B2B", sexe: "f", couleur: "#7B2D42", logo: true };
const PERSO_MARCO = { nom: "Marco", role: "Satisfaction client", sexe: "h", couleur: "#0F766E", logo: true };

const RES_ANIMEES = {

  // ─────────── BLOC 1 — VENTE ───────────
  "C1.2-1": [
    { type: "saynete", titre: "Deux accueils : lequel est le bon ?", decor: "showroom",
      consigne: "Observe les deux accueils. Lequel donne envie à M. Vidal de rester ?",
      persos: { a: PERSO_THOMAS, b: { nom: "M. Vidal", role: "Client", sexe: "h", couleur: "#D97706" } },
      lignes: [
        { prise: "Prise 1 — à éviter", occupe: true, qui: null, txt: "Thomas range des cartons. M. Vidal entre dans le showroom…" },
        { qui: "a", txt: "C'est pour quoi ?" },
        { qui: "b", txt: "Euh… je regardais juste." },
        { verdict: "ko", qui: null, txt: "Thomas n'a ni levé la tête ni dit bonjour. M. Vidal se sent de trop." },
        { prise: "Prise 2 — le bon accueil", occupe: false, verdict: "off", qui: null, txt: "On recommence. Thomas pose son carton dès que M. Vidal entre." },
        { qui: "a", txt: "Bonjour Monsieur, bienvenue chez LABORO ! Je suis Thomas, je suis à votre disposition." },
        { qui: "b", txt: "Bonjour ! Je voudrais me mettre à la course à pied." },
        { qui: "a", txt: "Avec plaisir ! Sur quel type de parcours aimeriez-vous courir ?" },
        { verdict: "ok", qui: null, txt: "Saluer, se présenter, proposer son aide, puis une question ouverte pour découvrir le besoin." }
      ] },
    { type: "tri", titre: "Question ouverte ou fermée ?", consigne: "Une question ouverte ne se répond pas par oui ou non. Classe chaque question.",
      categories: ["Ouverte", "Fermée"],
      items: [
        ["« Vous faites du sport ? »", 1, "On peut répondre oui ou non."],
        ["« Quel sport pratiquez-vous ? »", 0, "Le client doit développer : il commence par « Quel »."],
        ["« Vous avez un budget ? »", 1, "Oui ou non : peu d'information."],
        ["« Comment utiliseriez-vous ces chaussures ? »", 0, "« Comment » ouvre la réponse."],
        ["« Vous courez sur route ? »", 1, "Oui ou non."],
        ["« Qu'est-ce qui est important pour vous dans ce produit ? »", 0, "Le client explique ses attentes."]
      ] },
    { type: "chaine", titre: "Construire un argument CAB", produit: "Chaussures trail Grip X",
      intro: "Chaussures trail Grip X, 95 €. Pars d'une caractéristique du catalogue, puis pose-toi deux questions.",
      questions: ["Et donc ?", "Et pour le client, ça veut dire quoi ?"],
      maillons: [
        { k: "Caractéristique", txt: "Cette chaussure a une semelle à crampons profonds." },
        { k: "Avantage", txt: "…donc elle accroche très bien, même sur terrain humide." },
        { k: "Bénéfice", txt: "…vous ne glisserez pas, même sous la pluie." }
      ] }
  ],

  "C1.1-1": [
    { type: "saynete", titre: "Lundi matin : la veille de Nina", decor: "bureau",
      consigne: "Écoute Nina : que fait-elle de l'information qu'elle a trouvée ?",
      persos: { a: PERSO_NINA, b: PERSO_THOMAS },
      lignes: [
        { qui: null, txt: "Lundi, 9 heures. Comme chaque semaine, Nina consulte le site de Sportélia." },
        { qui: "a", txt: "Thomas, regarde : Sportélia lance des chaussures trail à 69 euros." },
        { qui: "b", txt: "Nos Grip X sont à 95 euros. Les clients vont nous en parler !" },
        { qui: "a", txt: "Justement. Préparons trois arguments : crampons profonds, conseil personnalisé, retour possible au showroom." },
        { qui: "b", txt: "Je les note pour toute l'équipe de vente." },
        { verdict: "ok", qui: null, txt: "La veille sert à agir : une information trouvée devient un argument pour les clients." }
      ] },
    { type: "etapes", titre: "Les 4 types de veille chez LABORO", voix: true,
      etapes: [
        { ico: "🏁", k: "Concurrentielle", s: "Prix, promos et nouveautés de SportRun, Sportélia, Go Sport" },
        { ico: "📦", k: "Produit", s: "Nouveaux catalogues, salons pro, fournisseurs" },
        { ico: "👥", k: "Client", s: "Avis Google, questions en magasin, réclamations" },
        { ico: "⚖️", k: "Réglementaire", s: "Garanties, étiquetage, RGPD" }
      ] },
    { type: "tri", titre: "Quel type de veille ?", consigne: "Pour chaque information, choisis le type de veille qui permet de la trouver.",
      categories: ["Concurrentielle", "Produit", "Client", "Réglementaire"],
      items: [
        ["Sportélia baisse ses chaussures trail à 69 €.", 0, "On surveille un concurrent."],
        ["Plusieurs avis Google se plaignent de l'attente en caisse le samedi.", 2, "C'est ce que disent nos clients."],
        ["Un fournisseur sort une nouvelle gourde isotherme plus légère.", 1, "C'est une nouveauté produit."],
        ["Une nouvelle règle change l'étiquetage des textiles.", 3, "C'est un changement de loi."],
        ["SportRun Évry ouvre un rayon padel.", 0, "On surveille l'offre d'un concurrent."],
        ["Des clients demandent souvent des chaussures de trail pour enfants.", 2, "C'est un besoin exprimé par les clients."]
      ] }
  ],

  "C1.3-1": [
    { type: "saynete", titre: "M. Kowalski passe en caisse", decor: "showroom",
      consigne: "Compare les deux fins de vente : qu'a oublié Thomas dans la première ?",
      persos: { a: PERSO_THOMAS, b: { nom: "M. Kowalski", role: "Client", sexe: "h", couleur: "#475569" } },
      lignes: [
        { prise: "Prise 1 — à éviter", qui: null, txt: "M. Kowalski a choisi ses chaussures trail à 149 euros." },
        { qui: "a", txt: "Ça fera 149 euros. Carte ? Voilà, c'est bon, au revoir." },
        { verdict: "ko", qui: null, txt: "Pas de services proposés, pas de ticket, pas de remerciement. La vente est finie, la relation aussi." },
        { prise: "Prise 2 — la bonne fin de vente", verdict: "off", qui: null, txt: "On recommence, avant l'encaissement." },
        { qui: "a", txt: "Souhaitez-vous la livraison à domicile ? Et je vous rappelle que notre garantie commerciale de 30 jours est incluse." },
        { qui: "b", txt: "Je les emporte, merci." },
        { qui: "a", txt: "Paiement accepté. Voulez-vous votre ticket de caisse ? C'est votre preuve d'achat." },
        { qui: "a", txt: "Merci Monsieur, bonne sortie trail ! N'hésitez pas à revenir si vous avez une question." },
        { verdict: "ok", qui: null, txt: "Services, encaissement, documents, prise de congé : les 4 étapes après le oui." }
      ] },
    { type: "etapes", titre: "Finaliser une vente : les 4 étapes après le « oui »",
      etapes: [
        { ico: "➕", k: "Services", s: "Livraison, garantie 30 jours, carte fidélité, avant d'encaisser" },
        { ico: "💳", k: "Encaisser", s: "CB, espèces, chèque. Vérifier la monnaie" },
        { ico: "🧾", k: "Documents", s: "Ticket proposé et remis sur demande, garantie, notice" },
        { ico: "👋", k: "Prise de congé", s: "Remercier, souhaiter bonne utilisation, inviter à revenir" }
      ] },
    { type: "calcul", calc: "ttc", titre: "Passer du TTC au HT", intro: "Change le prix TTC et observe le calcul. La TVA sur les articles de sport est de 20 %." }
  ],

  // ─────────── BLOC 2 — SUIVI ET SERVICES ───────────
  "C2.1-1": [
    { type: "saynete", titre: "Mme Konaté a un tournoi vendredi", decor: "telephone",
      consigne: "Écoute l'appel : quel mode de livraison Thomas propose-t-il, et pourquoi ?",
      persos: { a: PERSO_THOMAS, b: { nom: "Mme Konaté", role: "Cliente", sexe: "f", couleur: "#9333EA" } },
      lignes: [
        { qui: null, txt: "Mercredi, fin de journée. Mme Konaté appelle LABORO." },
        { qui: "b", txt: "Bonjour, je commande dix ballons pour le tournoi de vendredi, mais je ne peux pas passer au showroom." },
        { qui: "a", txt: "Je comprends. En livraison standard, 48 heures, vous les recevriez vendredi : c'est trop juste." },
        { qui: "a", txt: "Je vous conseille l'express, en 24 heures, pour 12 euros 90. Vous les aurez jeudi, avec un jour de marge." },
        { qui: "b", txt: "Parfait, je prends l'express." },
        { verdict: "ok", qui: null, txt: "Thomas choisit le mode adapté à l'urgence réelle, pas le moins cher par défaut." }
      ] },
    { type: "etapes", titre: "Où en est la commande ? Les statuts dans LABORO Connect",
      etapes: [
        { ico: "📝", k: "Enregistrée", s: "La commande est saisie et confirmée par mail" },
        { ico: "📦", k: "En préparation", s: "On rassemble les articles" },
        { ico: "🚚", k: "Expédiée", s: "Remise au transporteur, numéro de suivi envoyé" },
        { ico: "🏠", k: "Livrée", s: "Le client a reçu son colis" }
      ] },
    { type: "tri", titre: "Quel mode de livraison conseiller ?", consigne: "Lis chaque situation et choisis le mode le plus adapté.",
      categories: ["Click and collect (2 h, gratuit)", "Standard 48 h (6,90 €)", "Express 24 h (12,90 €)"],
      items: [
        ["Un client habite à 5 minutes du showroom et veut ses chaussures cet après-midi.", 0, "Produit en stock, prêt en 2 h, et c'est gratuit."],
        ["Une cliente commande un cadeau pour un anniversaire dans 10 jours.", 1, "Pas d'urgence : la livraison standard suffit."],
        ["Un club a besoin de chasubles demain soir et ne peut pas se déplacer.", 2, "Seule l'express arrive à temps."],
        ["Un client de Lille commande une gourde, sans date particulière.", 1, "Loin du showroom, sans urgence."]
      ] }
  ],

  "C2.1b-1": [
    { type: "saynete", titre: "M. Diallo commande 12 maillots", decor: "showroom",
      consigne: "Compte les services que Thomas propose pendant la vente.",
      persos: { a: PERSO_THOMAS, b: { nom: "M. Diallo", role: "Président de club", sexe: "h", couleur: "#15803D" } },
      lignes: [
        { qui: "b", txt: "Il me faut 12 maillots pour mon équipe." },
        { qui: "a", txt: "Très bien. Le flocage des numéros est inclus. Voulez-vous aussi le logo du club brodé ? C'est 2 euros par maillot." },
        { qui: "b", txt: "Oui, ce serait bien." },
        { qui: "a", txt: "Je peux aussi vous les livrer au club en 48 heures, pour 6 euros 90. Et la garantie commerciale de 30 jours est incluse." },
        { qui: "b", txt: "Livraison au club, parfait." },
        { verdict: "ok", qui: null, txt: "Panier : 336 + 24 + 6,90 = 366,90 euros. Les services sont proposés pendant la vente, jamais après l'encaissement." }
      ] },
    { type: "tri", titre: "Quel service associé répond au besoin ?", consigne: "Choisis le service LABORO qui correspond à chaque demande.",
      categories: ["Livraison", "Click and collect", "Personnalisation", "Démonstration", "Garantie commerciale"],
      items: [
        ["« Je voudrais essayer ce vélo d'appartement avant de l'acheter. »", 3, "Essai de 10 à 15 minutes pour les produits techniques."],
        ["« Je commande en ligne mais je passe à Évry ce midi. »", 1, "Retrait au showroom sous 2 h, gratuit."],
        ["« Il faut le nom de chaque joueur au dos des maillots. »", 2, "Flocage (inclus) ou broderie, à partir de 10 unités."],
        ["« Et si la taille ne va pas à mon fils ? »", 4, "30 jours pour échanger ou être remboursé, sans justification."],
        ["« Je ne peux pas porter ce tapis jusqu'à chez moi. »", 0, "Livraison standard 48 h ou express 24 h."]
      ] }
  ],

  "C2.2-1": [
    { type: "saynete", titre: "Mme Renard : le tapis arrivé abîmé", decor: "showroom",
      consigne: "Repère les 5 étapes ERESA dans la réponse de Marco.",
      persos: { a: PERSO_MARCO, b: { nom: "Mme Renard", role: "Cliente", sexe: "f", couleur: "#BE123C" } },
      lignes: [
        { qui: "b", txt: "J'ai commandé un tapis de yoga sur votre site et il est arrivé déchiré ! C'est inadmissible." },
        { qui: null, txt: "Écouter : Marco la laisse parler jusqu'au bout, sans l'interrompre." },
        { qui: "a", txt: "Si je comprends bien, votre tapis de yoga commandé en ligne est arrivé endommagé ?" },
        { qui: "a", txt: "Je suis vraiment désolé pour cette situation, Madame." },
        { qui: "a", txt: "Je vous propose de l'échanger tout de suite : nous l'avons en stock. Les frais de retour sont pour nous." },
        { qui: "b", txt: "D'accord, merci, c'est rapide." },
        { qui: "a", txt: "Je fais l'échange et je note l'incident dans LABORO Connect." },
        { verdict: "ok", qui: null, txt: "Écouter, Reformuler, s'Excuser, proposer une Solution, Agir et tracer : ERESA." }
      ] },
    { type: "etapes", titre: "La méthode ERESA",
      etapes: [
        { ico: "E", k: "Écouter", s: "Laisser parler sans interrompre" },
        { ico: "R", k: "Reformuler", s: "« Si je comprends bien… »" },
        { ico: "E", k: "S'excuser", s: "Au nom de LABORO, même sans faute directe" },
        { ico: "S", k: "Solution", s: "Concrète, avec un délai précis" },
        { ico: "A", k: "Agir et tracer", s: "Appliquer et noter dans LABORO Connect" }
      ] },
    { type: "tri", titre: "Quelle étape ERESA ?", consigne: "Pour chaque phrase du vendeur, retrouve l'étape de la méthode.",
      categories: ["Écouter", "Reformuler", "S'excuser", "Solution", "Agir et tracer"],
      items: [
        ["« Si je comprends bien, la semelle s'est décollée après une semaine ? »", 1, "On redit avec ses mots pour vérifier."],
        ["« Je suis désolé pour ce désagrément. »", 2, "On s'excuse au nom de LABORO."],
        ["« Je vous propose un remplacement immédiat, nous l'avons en stock. »", 3, "Une solution concrète."],
        ["Le vendeur hoche la tête et laisse le client terminer.", 0, "On écoute sans couper la parole."],
        ["« Je note votre demande dans LABORO Connect et je vous rappelle demain à 10 h. »", 4, "On agit et on garde une trace datée."]
      ] }
  ],

  "C2.3-1": [
    { type: "etapes", titre: "Le NPS : recommanderiez-vous LABORO ?", intro: "On demande une note de 0 à 10. Selon la note, le client entre dans un des trois groupes.",
      etapes: [
        { ico: "😤", k: "Détracteurs", s: "Notes 0 à 6 : risque de mauvais avis" },
        { ico: "😐", k: "Passifs", s: "Notes 7 et 8 : ni pour, ni contre" },
        { ico: "😍", k: "Promoteurs", s: "Notes 9 et 10 : ils recommandent LABORO" }
      ] },
    { type: "tri", titre: "Promoteur, passif ou détracteur ?", consigne: "Classe chaque client selon la note qu'il a donnée.",
      categories: ["Détracteur", "Passif", "Promoteur"],
      items: [
        ["Mme Torres donne la note 9.", 2, "9 et 10 = promoteurs."],
        ["M. Lopez donne la note 6.", 0, "De 0 à 6 = détracteurs. Attention, 6 n'est pas « moyen » ici."],
        ["M. Vidal donne la note 8.", 1, "7 et 8 = passifs."],
        ["Mme Konaté donne la note 10.", 2, "Promotrice."],
        ["M. Kowalski donne la note 7.", 1, "Passif : il ne critique pas mais ne recommande pas non plus."]
      ] },
    { type: "calcul", calc: "nps", titre: "Calculer le NPS", intro: "Modifie les nombres de réponses et observe le NPS. C'est un nombre, pas un pourcentage : on l'écrit avec son signe." },
    { type: "calcul", calc: "satisfaction", titre: "Calculer le taux de satisfaction" }
  ],

  // ─────────── BLOC 3 — RELATION CLIENT ───────────
  "C3.1-1": [
    { type: "saynete", titre: "Le téléphone sonne chez LABORO", decor: "telephone",
      consigne: "Compare les deux façons de décrocher.",
      persos: { a: PERSO_THOMAS, b: { nom: "Mme Laurent", role: "Cliente", sexe: "f", couleur: "#0369A1" } },
      lignes: [
        { prise: "Prise 1 — à éviter", qui: null, txt: "Le téléphone sonne cinq fois avant que Thomas ne décroche." },
        { qui: "a", txt: "Allô ?" },
        { qui: "b", txt: "Euh… je suis bien chez LABORO ?" },
        { verdict: "ko", qui: null, txt: "Trop tard, et sans se présenter : la cliente ne sait même pas à qui elle parle." },
        { prise: "Prise 2 — le bon réflexe", verdict: "off", qui: null, txt: "On recommence. Thomas décroche avant la troisième sonnerie." },
        { qui: "a", txt: "LABORO bonjour, Thomas à l'appareil. Que puis-je faire pour vous ?" },
        { qui: "b", txt: "Bonjour, je voulais savoir quand ma commande de chaussures arrivera." },
        { qui: "a", txt: "Je regarde tout de suite. Livraison prévue jeudi, entre 9 heures et 13 heures. Je vous envoie la confirmation par mail." },
        { verdict: "ok", qui: null, txt: "Décrocher vite, se présenter en souriant, donner une information précise et vérifiée." }
      ] },
    { type: "etapes", titre: "Les 4 parties d'un mail professionnel",
      etapes: [
        { ico: "✉️", k: "Objet", s: "Court et précis : « Votre commande n°2847 — livraison jeudi »" },
        { ico: "👋", k: "Formule d'appel", s: "« Bonjour Mme Laurent, »" },
        { ico: "📝", k: "Corps", s: "3 à 4 lignes, une idée par paragraphe" },
        { ico: "✍️", k: "Signature", s: "Prénom, poste, LABORO, téléphone" }
      ] },
    { type: "tri", titre: "Bon objet de mail ou pas ?", consigne: "Un bon objet dit précisément de quoi parle le mail.",
      categories: ["Bon objet", "À reprendre"],
      items: [
        ["« Votre commande n°2847 — livraison jeudi »", 0, "Le client sait tout de suite de quoi il s'agit."],
        ["« Info »", 1, "Trop vague : le client ne sait pas de quoi on parle."],
        ["« Réponse à votre question sur la garantie de vos chaussures »", 0, "Précis et utile."],
        ["« URGENT !!! »", 1, "Agressif et sans contenu."],
        ["(objet vide)", 1, "Un mail sans objet risque de ne pas être lu."]
      ] }
  ],

  "C3.2-1": [
    { type: "saynete", titre: "Mme Torres et la carte LABORO PRO", decor: "showroom",
      consigne: "Pourquoi Mme Torres a-t-elle maintenant une bonne raison de revenir ?",
      persos: { a: PERSO_THOMAS, b: { nom: "Mme Torres", role: "Cliente", sexe: "f", couleur: "#C2410C" } },
      lignes: [
        { qui: null, txt: "Mme Torres achète pour 89 euros." },
        { qui: "a", txt: "Avez-vous la carte LABORO PRO ?" },
        { qui: "b", txt: "Non, je ne crois pas." },
        { qui: "a", txt: "Je vous la crée tout de suite, c'est gratuit : vous gagnez déjà 89 points aujourd'hui. À 100 points, vous avez 10 euros de remise." },
        { qui: "b", txt: "Ah, il m'en manque 11 seulement ? Je reviendrai !" },
        { verdict: "ok", qui: null, txt: "Proposer la carte dès le premier achat : la cliente a maintenant une raison de revenir." }
      ] },
    { type: "etapes", titre: "Le cycle de vie d'un client LABORO",
      etapes: [
        { ico: "🔍", k: "Prospect", s: "Pas encore client : premier contact" },
        { ico: "🛒", k: "1er achat", s: "Nouveau client : suivi et carte PRO" },
        { ico: "⭐", k: "Régulier", s: "Plus de 2 achats par an : événements, avantages" },
        { ico: "💎", k: "Ambassadeur", s: "Il recommande LABORO autour de lui" }
      ] },
    { type: "calcul", calc: "points", titre: "Calculer une remise de fidélité", intro: "1 € dépensé = 1 point. Chaque tranche complète de 100 points = 10 € de remise." }
  ],

  "C3.3-1": [
    { type: "calcul", calc: "retention", titre: "Taux de rétention et taux d'attrition", intro: "Combien de clients de l'an dernier sont revenus acheter ? Change les nombres et observe." },
    { type: "tri", titre: "Quel indicateur utiliser ?", consigne: "Pour chaque question que se pose LABORO, choisis l'indicateur qui y répond.",
      categories: ["Taux de rétention", "Taux d'attrition", "NPS", "ROI"],
      items: [
        ["Combien de clients de l'an dernier sont revenus acheter ?", 0, "Clients qui ont racheté ÷ clients de la période précédente."],
        ["La soirée test trail a-t-elle rapporté plus qu'elle n'a coûté ?", 3, "ROI = (CA − coût) ÷ coût × 100."],
        ["Nos clients recommanderaient-ils LABORO à un ami ?", 2, "C'est la question du NPS."],
        ["Quelle part de nos clients avons-nous perdue ?", 1, "Attrition = 100 − taux de rétention."]
      ] },
    { type: "cartes", titre: "Teste-toi sur les indicateurs",
      cartes: [
        ["Objectif LABORO pour la rétention ?", "Plus de 60 %. Actuellement 74 %."],
        ["À partir de quel taux d'attrition faut-il s'alarmer ?", "Plus de 20 %."],
        ["Un taux passe de 34 % à 40 % : il gagne…", "6 points (et non 6 %)."],
        ["Les 3 éléments d'un compte rendu chiffré ?", "Le résultat, l'écart avec l'objectif, une action pour progresser."]
      ] }
  ],

  "C3.3b-1": [
    { type: "saynete", titre: "M. Vidal, client depuis 3 ans", decor: "showroom",
      consigne: "M. Vidal est satisfait. Que fait Thomas pour qu'il devienne fidèle ?",
      persos: { a: PERSO_THOMAS, b: { nom: "M. Vidal", role: "Client", sexe: "h", couleur: "#D97706" } },
      lignes: [
        { qui: "b", txt: "Je prends ces chaussettes. Vous savez, SportRun fait une promo en ce moment…" },
        { qui: "a", txt: "Vous êtes client depuis 3 ans, M. Vidal. Avez-vous votre carte LABORO PRO ?" },
        { qui: "b", txt: "Non, jamais pensé à la demander." },
        { qui: "a", txt: "Je vous l'active maintenant : c'est gratuit et sans engagement. Et si vous parrainez un ami, vous recevez 15 euros, et lui 10 euros à sa première commande." },
        { qui: "b", txt: "Mon collègue court aussi… je vais lui en parler !" },
        { verdict: "ok", qui: null, txt: "Un client satisfait peut partir pour une promo. La carte et le parrainage lui donnent des raisons de rester." }
      ] },
    { type: "tri", titre: "Client satisfait ou client fidèle ?", consigne: "Lis chaque comportement et classe le client.",
      categories: ["Satisfait", "Fidèle"],
      items: [
        ["Il a aimé ses chaussures mais achète la suite chez SportRun, en promo.", 0, "Content, mais il part pour un meilleur prix."],
        ["Il revient chez LABORO même quand un concurrent est moins cher.", 1, "Il reste malgré le prix."],
        ["Ses achats chez LABORO augmentent chaque année.", 1, "Signe d'un client fidèle."],
        ["Il laisse un bon avis Google mais n'est jamais revenu.", 0, "Satisfait, pas encore fidèle."]
      ] }
  ],

  // ─────────── BLOC 4 A — ESPACE COMMERCIAL ───────────
  "G4A-1": [
    { type: "etapes", titre: "La règle des 5B du merchandising",
      etapes: [
        { ico: "🎯", k: "Bon produit", s: "Adapté à la saison" },
        { ico: "📍", k: "Bon endroit", s: "À hauteur des yeux : de 1,20 m à 1,70 m" },
        { ico: "📅", k: "Bon moment", s: "Rentrée, fêtes, saisons sportives" },
        { ico: "📊", k: "Bonne quantité", s: "2 à 3 facings minimum, pas de rupture" },
        { ico: "💶", k: "Bon prix", s: "Étiquette lisible, cohérent avec la concurrence" }
      ] },
    { type: "tri", titre: "Où placer ce produit dans le rayon trail ?", consigne: "Rappel LABORO : forte marge à hauteur des yeux, produits d'appel en bas, produits complémentaires en haut.",
      categories: ["En haut", "À hauteur des yeux", "En bas"],
      items: [
        ["Les chaussures trail Grip X, produit à forte marge.", 1, "Le niveau des yeux est celui qui vend le plus."],
        ["Les semelles, produit d'appel à petit prix.", 2, "Les produits d'appel se placent en bas."],
        ["Les bâtons de trail, achat complémentaire.", 0, "Les complémentaires vont en haut."],
        ["Les chaussures trail expert carbone, nouveauté à forte marge.", 1, "Forte marge : hauteur des yeux."]
      ] },
    { type: "cartes", titre: "Teste-toi sur le merchandising",
      cartes: [
        ["Une seule référence avec 1 facing, c'est…", "Invisible. Il en faut 2 à 3 minimum."],
        ["Zone chaude ?", "Endroit où passent beaucoup de clients : entrée, allée principale, caisse."],
        ["À quoi sert la tête de gondole ?", "Promotions, nouveautés, produits mis en avant."],
        ["Un rayon vide, c'est…", "Une vente perdue : il faut faire le réassort."]
      ] }
  ],

  // ─────────── BLOC 4 B — PROSPECTION ───────────
  "B4.1-1": [
    { type: "etapes", titre: "Où trouver des prospects ?",
      etapes: [
        { ico: "🏛️", k: "Fichiers officiels", s: "Mairie, fédérations sportives, annuaires CSE, Sirene" },
        { ico: "💻", k: "Réseaux sociaux", s: "LinkedIn pour les CSE, Facebook et Instagram pour les clubs" },
        { ico: "🤝", k: "Terrain", s: "Tournois, forums des associations, bouche-à-oreille" }
      ] },
    { type: "tri", titre: "Prospect qualifié ou non ?", consigne: "Critères LABORO : au moins 15 membres, plus d'un entraînement par semaine, budget estimé de plus de 300 € par an. Un seul critère manqué suffit à écarter.",
      categories: ["Qualifié", "Non qualifié"],
      items: [
        ["Club de foot : 22 licenciés, 2 entraînements par semaine, budget 450 €.", 0, "Les 3 critères sont remplis."],
        ["Club de tennis : 12 membres, 3 entraînements par semaine, budget 600 €.", 1, "Moins de 15 membres."],
        ["Club de handball : 15 licenciés, 2 entraînements par semaine, budget 350 €.", 0, "« Au moins 15 » : 15 compte."],
        ["Association de marche : 40 membres, 1 sortie par semaine, budget 500 €.", 1, "« Plus d'un entraînement » : une fois par semaine ne suffit pas."],
        ["Club de basket : 30 licenciés, 3 entraînements par semaine, budget 300 €.", 1, "« Plus de 300 € » : 300 € tout juste ne suffit pas."]
      ] },
    { type: "cartes", titre: "La fiche prospect LABORO Connect",
      cartes: [
        ["Combien de champs de base ?", "8 champs."],
        ["Lesquels sur l'identité ?", "Raison sociale, secteur, effectif."],
        ["Lesquels pour joindre ?", "Contact (nom et fonction), téléphone ou e-mail."],
        ["Lesquels pour la suite ?", "Source d'identification, besoins estimés, date de relance."]
      ] }
  ],

  "B4.2-1": [
    { type: "etapes", titre: "Le plan d'appel LABORO en 5 étapes",
      etapes: [
        { ico: "👋", k: "Présentation", s: "Qui tu es, de LABORO Sport à Évry" },
        { ico: "📣", k: "Accroche", s: "La raison de ton appel" },
        { ico: "🔍", k: "Découverte", s: "Les besoins du prospect" },
        { ico: "💬", k: "Proposition", s: "Un rendez-vous ou une offre" },
        { ico: "✅", k: "Conclusion", s: "Confirmer, remercier, noter la suite" }
      ] },
    { type: "tri", titre: "À quelle étape du plan d'appel ?", consigne: "Retrouve l'étape de chaque phrase.",
      categories: ["Présentation", "Accroche", "Découverte", "Proposition", "Conclusion"],
      items: [
        ["« Bonjour, je suis Nina, de LABORO Sport à Évry. »", 0, "On dit qui on est."],
        ["« Je vous appelle car nous équipons plusieurs clubs de votre secteur. »", 1, "On donne la raison de l'appel."],
        ["« Combien de licenciés avez-vous cette saison ? »", 2, "On découvre le besoin."],
        ["« Je vous propose de venir vous présenter nos maillots : mardi 10 h ou jeudi 14 h ? »", 3, "On propose un rendez-vous avec deux créneaux."],
        ["« C'est noté pour jeudi 14 h, je vous envoie la confirmation par mail. Merci ! »", 4, "On confirme et on remercie."]
      ] },
    { type: "cartes", titre: "Préparer l'opération",
      cartes: [
        ["Les 3 étapes avant l'opération ?", "Cibler, préparer les outils, fixer des objectifs chiffrés."],
        ["La règle des 3 contacts ?", "Appel, mail, appel : sans réponse, on passe au prospect suivant."],
        ["Prospect tiède ?", "Un premier contact, un intérêt encore vague (un rendez-vous accepté par exemple)."],
        ["Pourquoi proposer deux créneaux ?", "Le choix est simple : le rendez-vous se fixe tout de suite."]
      ] }
  ],

  "B4.3-1": [
    { type: "saynete", titre: "Nina appelle M. Ferreira", decor: "telephone",
      consigne: "Suis le plan d'appel. Comment Nina obtient-elle le rendez-vous ?",
      persos: { a: PERSO_NINA, b: { nom: "M. Ferreira", role: "Président de club", sexe: "h", couleur: "#15803D" } },
      lignes: [
        { qui: "a", txt: "Bonjour M. Ferreira, je suis Nina, de LABORO Sport à Évry." },
        { qui: "a", txt: "Nous équipons douze clubs de foot en Essonne. Votre club commence sa préparation d'hiver : avez-vous prévu votre équipement ?" },
        { qui: "b", txt: "Pas encore. Nous avons une quarantaine de licenciés." },
        { qui: "a", txt: "Comment équipez-vous vos équipes aujourd'hui ?" },
        { qui: "b", txt: "On a déjà un fournisseur, vous savez." },
        { qui: "a", txt: "Je comprends, et justement : notre flocage est inclus et livré en 3 semaines, avant la reprise." },
        { qui: "a", txt: "Je vous propose d'en parler de vive voix : mardi 10 heures ou jeudi 14 heures ?" },
        { qui: "b", txt: "Jeudi, ça me va." },
        { verdict: "ok", qui: null, txt: "Présentation, accroche, découverte, proposition avec réponse à l'objection, conclusion avec deux créneaux." }
      ] },
    { type: "tri", titre: "Découvrir ou confirmer ?", consigne: "On découvre avec des questions ouvertes, on confirme avec des questions fermées.",
      categories: ["Question ouverte", "Question fermée"],
      items: [
        ["« Comment équipez-vous vos équipes aujourd'hui ? »", 0, "Le prospect s'exprime librement."],
        ["« Votre saison commence-t-elle en septembre ? »", 1, "Oui ou non : on confirme."],
        ["« Qu'attendez-vous d'un fournisseur ? »", 0, "Ouverte : idéale pour la découverte."],
        ["« C'est vous qui décidez des achats ? »", 1, "Fermée : on vérifie qui décide."]
      ] },
    { type: "cartes", titre: "Qualifier avec BANT",
      cartes: [
        ["B", "Budget : combien peut-il dépenser ?"],
        ["A", "Autorité : qui décide ?"],
        ["N", "Besoin (Need) : que lui faut-il vraiment ?"],
        ["T", "Temps : quand décide-t-il ou achète-t-il ?"]
      ] }
  ],

  "B4.4-1": [
    { type: "etapes", titre: "Le suivi commercial : la règle des 24 h",
      etapes: [
        { ico: "🤝", k: "J0 — Rendez-vous", s: "Qualifier le besoin" },
        { ico: "⚡", k: "J+1 — Devis", s: "Envoyé dans les 24 h, personnalisé" },
        { ico: "📧", k: "J+5 — Relance", s: "« Avez-vous pu consulter notre proposition ? »" },
        { ico: "📞", k: "J+10 — Relance", s: "Dernière tentative, proposer une alternative" }
      ] },
    { type: "calcul", calc: "relance", titre: "Quel jour relancer ?", intro: "Choisis le jour d'envoi du devis. Si la relance tombe un samedi ou un dimanche, on relance le premier jour ouvré suivant." },
    { type: "saynete", titre: "La relance de M. Kowalski", decor: "telephone",
      consigne: "Que contient une bonne relance ?",
      persos: { a: PERSO_NINA, b: { nom: "M. Kowalski", role: "Club de basket", sexe: "h", couleur: "#475569" } },
      lignes: [
        { qui: null, txt: "Devis envoyé mardi : 15 maillots et shorts, 847 euros HT. Pas de réponse." },
        { qui: "a", txt: "Bonjour M. Kowalski, Nina de LABORO. Je reviens vers vous au sujet du devis de mardi pour vos maillots." },
        { qui: "a", txt: "Bonne nouvelle : les tailles sont en stock, la livraison peut se faire avant votre premier match. Avez-vous pu consulter notre proposition ?" },
        { qui: "b", txt: "Oui, ça nous convient. Je vous la renvoie signée aujourd'hui." },
        { verdict: "ok", qui: null, txt: "Courte, rappel du contexte, un élément nouveau et vrai, une seule demande claire. Nina trace la relance dans LABORO Connect." }
      ] }
  ],

  "B4.5-1": [
    { type: "saynete", titre: "« Sportélia Pro est moins cher »", decor: "telephone",
      consigne: "Repère les 3 temps de la réponse de Nina.",
      persos: { a: PERSO_NINA, b: { nom: "M. Diallo", role: "Président de club", sexe: "h", couleur: "#15803D" } },
      lignes: [
        { prise: "Prise 1 — à éviter", qui: "b", txt: "Chez Sportélia Pro, c'est 60 euros de moins pour 15 maillots." },
        { qui: "a", txt: "Ah… bon, je peux vous faire 60 euros de remise." },
        { verdict: "ko", qui: null, txt: "Nina baisse le prix sans rien démontrer : LABORO perd de la marge pour rien." },
        { prise: "Prise 2 — valoriser l'offre", verdict: "off", qui: "b", txt: "Chez Sportélia Pro, c'est 60 euros de moins pour 15 maillots." },
        { qui: "a", txt: "Je comprends que le prix soit un critère important pour vous." },
        { qui: "a", txt: "Avec LABORO, le flocage est livré en 3 semaines au lieu de 5, et vous avez un commercial joignable directement." },
        { qui: "a", txt: "Si vous voulez vérifier par vous-même, commençons par une petite commande test." },
        { verdict: "ok", qui: null, txt: "Accepter l'objection, quantifier la valeur, proposer une alternative." }
      ] },
    { type: "tri", titre: "Bonne réponse à l'objection prix ?", consigne: "Le client dit : « C'est trop cher. » Ces réponses respectent-elles la méthode LABORO ?",
      categories: ["Bonne réponse", "À éviter"],
      items: [
        ["« Je comprends. Comparons ce que comprend chaque offre. »", 0, "On accepte, puis on démontre la valeur."],
        ["« Sportélia, c'est de la mauvaise qualité de toute façon. »", 1, "On ne critique jamais le concurrent."],
        ["« Bon, je vous fais 10 % tout de suite. »", 1, "Une baisse sans contrepartie réduit la marge pour rien."],
        ["« Notre offre Essentiel pourrait mieux correspondre à votre budget. »", 0, "On propose une alternative."],
        ["« Vous avez tort, nous ne sommes pas chers. »", 1, "On ne réfute jamais d'emblée."]
      ] }
  ],

  "G4B-1": [
    { type: "etapes", titre: "L'entonnoir de prospection B2B",
      etapes: [
        { ico: "400", k: "Suspects", s: "Toutes les associations sportives de l'Essonne" },
        { ico: "120", k: "Prospects qualifiés", s: "Budget, effectif, activité régulière" },
        { ico: "60", k: "Contacts aboutis", s: "Appels décrochés" },
        { ico: "12", k: "Rendez-vous", s: "Objectif : 3 ventes par mois" }
      ] },
    { type: "calcul", calc: "entonnoir", titre: "Les taux de l'entonnoir", intro: "Chaque taux se calcule par rapport à l'étape précédente. Modifie les nombres pour voir l'effet." },
    { type: "tri", titre: "Quelle technique de prospection ?", consigne: "Choisis la technique décrite.",
      categories: ["Phoning", "Emailing", "Réseaux sociaux", "Événements", "Recommandation"],
      items: [
        ["Nina appelle les clubs avec son plan d'appel.", 0, "Appel téléphonique structuré."],
        ["Un client actuel donne le contact du président d'un autre club.", 4, "« Connaissez-vous quelqu'un qui… »"],
        ["LABORO tient un stand au forum des associations d'Évry.", 3, "Salons, tournois, forums."],
        ["Nina contacte le responsable du CSE sur LinkedIn.", 2, "LinkedIn pour les entreprises."],
        ["Un message court et personnalisé est envoyé à 20 clubs de trail.", 1, "Un seul objectif par mail."]
      ] }
  ],

  // ─────────── ACCUEIL ───────────
  "ACC-1": [
    { type: "saynete", titre: "La règle des 30 secondes", decor: "showroom",
      consigne: "Thomas est occupé. Comment fait-il pour que M. Leroy se sente attendu ?",
      persos: { a: PERSO_THOMAS, b: { nom: "M. Leroy", role: "Visiteur", sexe: "h", couleur: "#6D28D9" } },
      lignes: [
        { occupe: true, qui: null, txt: "Thomas range un rayon. M. Leroy entre." },
        { qui: null, txt: "Détecter : Thomas lève les yeux tout de suite et sourit." },
        { qui: "a", txt: "Bonjour ! Je suis à vous dans 30 secondes." },
        { occupe: false, qui: null, txt: "Thomas termine rapidement et s'approche." },
        { qui: "a", txt: "Voilà ! Vous cherchez quelque chose de particulier ?" },
        { qui: "b", txt: "Oui, un équipement de randonnée." },
        { qui: "a", txt: "Suivez-moi, l'univers outdoor est juste ici." },
        { verdict: "ok", qui: null, txt: "Détecter, accueillir, orienter, accompagner : en moins de 30 secondes." }
      ] },
    { type: "etapes", titre: "Les 4 étapes de l'accueil",
      etapes: [
        { ico: "👁️", k: "Détecter", s: "Repérer l'arrivée du client, en moins de 30 secondes" },
        { ico: "😊", k: "Accueillir", s: "« Bonjour ! » avec le sourire, regard direct" },
        { ico: "🗺️", k: "Orienter", s: "« Je peux vous aider ? » ou « Je suis à vous dans un instant »" },
        { ico: "🤝", k: "Accompagner", s: "Guider vers le bon univers, rester disponible" }
      ] },
    { type: "tri", titre: "Trier la boîte mail de l'accueil", consigne: "Que fais-tu de chaque mail ?",
      categories: ["En priorité", "À traiter ou transmettre", "Supprimer sans répondre"],
      items: [
        ["« Ma commande devait arriver hier et je n'ai rien reçu. »", 0, "C'est une réclamation : priorité."],
        ["« Vous avez gagné un iPhone ! Cliquez ici pour le recevoir. »", 2, "Hameçonnage : on ne clique pas, on supprime."],
        ["« Quels sont vos horaires le dimanche ? »", 1, "Simple demande de renseignement."],
        ["« Je confirme notre rendez-vous de 10 h ce matin avec Romain Sauzet. »", 0, "Rendez-vous imminent : on prévient tout de suite."],
        ["« Proposez-vous des tarifs pour les clubs ? »", 1, "À transmettre à Nina Chevalier, commerciale B2B."]
      ] }
  ]
};
