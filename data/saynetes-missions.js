// ================================================
//   LABORO Sport & Outdoor — Saynètes des missions
//   Une saynète PROPRE À CHAQUE MISSION, écrite à partir de sa mise en
//   situation (contexte, et contexte_pvoc pour les classes PVOC).
//   Affichée en tête de l'onglet « La mission » par js/moteur-animations.js.
//
//   Règles d'écriture (13/10/2026) :
//   - fidèle au contexte de la mission : mêmes personnages, même client,
//     mêmes faits, aucun chiffre inventé ;
//   - la saynète s'arrête au moment où l'élève doit agir (ligne "fin") :
//     elle ne donne jamais la réponse attendue ;
//   - l'élève ne parle jamais : ses paroles, ce sont ses réponses.
//
//   Format d'une ligne : "a|texte" (personnage de gauche), "b|texte"
//   (personnage de droite), "n|texte" (narration), "fin|texte" (consigne
//   finale « À toi »).
//   Décors : showroom, telephone, bureau, club.
//   Un contrôle automatique vérifie qu'aucune saynète n'est partagée.
// ================================================

const P_ROMAIN = { nom: "Romain Sauzet", role: "Resp. Showroom & Commercial", sexe: "h", couleur: "#185FA5", logo: true };
const P_NINA = { nom: "Nina Chevalier", role: "Resp. commerciale B2B", sexe: "f", couleur: "#7B2D42", logo: true };
const P_MARCO = { nom: "Marco Pellini", role: "Resp. satisfaction client", sexe: "h", couleur: "#0F766E", logo: true };
const P_PASCAL = { nom: "Pascal Berruelle", role: "PDG de LABORO", sexe: "h", couleur: "#0A2540", logo: true };
const P_THOMAS = { nom: "Thomas Moreau", role: "Conseiller de vente", sexe: "h", couleur: "#2D5282", logo: true };
const P_TOI = { nom: "Toi", role: "Stagiaire LABORO", sexe: "", couleur: "#1D9E75", logo: true };
function sayClient(nom, role, sexe, couleur){ return { nom: nom, role: role, sexe: sexe, couleur: couleur || (sexe === "f" ? "#BE123C" : "#D97706") }; }

const SAYNETES_MISSIONS = {};

Object.assign(SAYNETES_MISSIONS, {

"M001": { titre: "Un premier client au showroom", decor: "showroom", a: P_ROMAIN, b: sayClient("M. Vidal", "Client, 42 ans", "h"),
  lignes: [
    "n|Showroom LABORO d'Évry. Un homme entre et regarde autour de lui, un peu perdu.",
    "a|Tu vois ce monsieur ? C'est M. Vidal. Il veut se mettre au sport et il n'a encore aucun équipement.",
    "b|Bonjour… je cherche des chaussures pour commencer le sport, mais je n'y connais pas grand-chose.",
    "a|Il cherche des chaussures pour débuter. Je te laisse le prendre en charge.",
    "fin|À toi : accueille M. Vidal et découvre ses besoins."
  ],
  pvoc: { titre: "Un premier appel sur la ligne commerciale", decor: "telephone", a: P_NINA, b: sayClient("M. Vidal", "Client, depuis son bureau", "h"),
    lignes: [
      "n|Ligne commerciale LABORO. Le téléphone sonne.",
      "a|C'est M. Vidal, 42 ans. Il a vu nos chaussures de sport sur laboro-sport.fr et veut des conseils avant de commander.",
      "a|Il n'a aucun équipement. C'est ton premier entretien de vente à distance : je te le passe.",
      "b|Allô ? J'ai vu vos chaussures sur le site, mais avant de commander j'aimerais un conseil…",
      "fin|À toi : prends l'appel, accueille M. Vidal et découvre ses besoins."
    ] } },

"M002": { titre: "Une note de veille pour Romain", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Bureau du showroom, début de matinée.",
    "a|Dans le sport et les loisirs, en Essonne, on n'est pas seuls. Je veux savoir qui sont nos concurrents.",
    "a|Prépare-moi une note de veille sur eux. Tu as le dossier documentaire pour t'appuyer.",
    "fin|À toi : observe la concurrence et prépare la note de veille."
  ],
  pvoc: { titre: "Une note de veille avant la réunion de vendredi", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Bureau commercial B2B. Nina, ta tutrice, prépare la réunion commerciale de vendredi avec Romain Sauzet.",
      "a|J'ai besoin de ta note de veille concurrentielle pour vendredi.",
      "a|Ta zone : les concurrents de LABORO en Essonne, y compris ceux qui s'adressent aux clubs et aux CSE que tu prospectes.",
      "fin|À toi : observe la concurrence et prépare la note de veille."
    ] } },

"M003": { titre: "Mme Renard n'est pas contente", decor: "showroom", a: P_ROMAIN, b: sayClient("Mme Renard", "Cliente", "f"),
  lignes: [
    "n|Showroom LABORO. Une cliente s'approche du comptoir, un paquet sous le bras.",
    "b|J'ai commandé ce tapis de yoga sur votre site il y a 7 jours. Il est arrivé abîmé !",
    "b|Je ne suis vraiment pas contente. Je voudrais un tapis en bon état, et vite.",
    "n|Romain te fait signe : c'est à toi de t'en occuper.",
    "fin|À toi : identifie la réclamation de Mme Renard et traite-la."
  ],
  pvoc: { titre: "Le mail de Mme Renard", decor: "bureau", a: P_ROMAIN, b: sayClient("Mme Renard", "Cliente, par mail", "f"),
    lignes: [
      "n|Un nouveau mail arrive dans la boîte de LABORO.",
      "b|Le tapis de yoga commandé il y a 7 jours sur laboro-sport.fr est arrivé endommagé. Je suis mécontente et je veux vite un tapis en bon état.",
      "a|Réponds-lui par mail, et appelle-la ensuite pour finaliser.",
      "fin|À toi : identifie la réclamation et prépare ta réponse à Mme Renard."
    ] } },

"M005": { titre: "M. Bensalah attend sa confirmation", decor: "telephone", a: P_TOI, b: sayClient("M. Bensalah", "Client", "h"),
  lignes: [
    "n|19 septembre. Le téléphone du showroom sonne. Tu décroches.",
    "b|Bonjour, Karim Bensalah. J'ai commandé sur laboro-sport.fr il y a 5 jours…",
    "b|…et je n'ai reçu aucune confirmation de livraison. Où en est ma commande ?",
    "fin|À toi : informe M. Bensalah du statut de sa commande."
  ],
  pvoc: { titre: "M. Bensalah s'inquiète", decor: "telephone", a: P_TOI, b: sayClient("M. Bensalah", "Client inquiet", "h"),
    lignes: [
      "n|19 septembre. Ta ligne directe sonne. LABORO Connect est ouvert sur ton écran.",
      "b|Bonjour, Karim Bensalah. J'ai passé commande sur votre site il y a 5 jours.",
      "b|Je n'ai reçu aucune confirmation de livraison, je commence à m'inquiéter.",
      "fin|À toi : renseigne M. Bensalah à distance, à partir de LABORO Connect."
    ] } },

"M007": { titre: "M. Vidal passe en caisse", decor: "showroom", a: P_ROMAIN, b: sayClient("M. Vidal", "Client", "h"),
  lignes: [
    "n|Showroom LABORO. M. Vidal a fait son choix.",
    "b|C'est décidé : je prends les chaussures débutant EasyRun et un tapis de yoga.",
    "a|Parfait. Je te laisse finaliser la vente et prendre congé de M. Vidal comme un pro.",
    "fin|À toi : finalise la transaction et remets les bons documents."
  ],
  pvoc: { titre: "M. Vidal vient finaliser son achat", decor: "showroom", a: P_NINA, b: sayClient("M. Vidal", "Client", "h"),
    lignes: [
      "n|M. Vidal avait appelé la ligne commerciale pour être conseillé. Aujourd'hui, il vient au showroom.",
      "b|Bonjour ! Je viens chercher les chaussures EasyRun et le tapis de yoga dont on avait parlé au téléphone.",
      "a|Finalise la transaction, et prends congé de façon à ce qu'il ait envie de recommander, par téléphone ou sur le site.",
      "fin|À toi : finalise la vente de M. Vidal et prends congé professionnellement."
    ] } },

"M010": { titre: "Les résultats de l'enquête satisfaction", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Bureau satisfaction client. Marco pose un dossier devant toi.",
    "a|Voici les résultats complets de l'enquête satisfaction du trimestre.",
    "a|J'ai besoin de ton analyse et de propositions d'amélioration. On les présentera à Pascal Berruelle, notre PDG.",
    "fin|À toi : observe les résultats et analyse la satisfaction des clients."
  ],
  pvoc: { titre: "118 clients ont répondu", decor: "bureau", a: P_MARCO, b: P_TOI,
    lignes: [
        "a|Notre enquête trimestrielle est terminée : 118 clients de LABORO ont répondu.",
      "a|Analyse les données, comprends le NPS et propose des actions, en pensant surtout à la relation client à distance : téléphone et e-commerce.",
      "fin|À toi : observe les résultats de l'enquête et analyse-les."
    ] } },

"M011": { titre: "La matinée des contacts entrants", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|9 heures. Deux contacts attendent déjà une réponse.",
    "a|Ce matin, c'est toi qui gères les contacts entrants.",
    "a|Il y a un avis Google négatif sur notre page, et un appel de Mme Konaté. Tout est dans le dossier.",
    "fin|À toi : réponds à chaque contact de façon professionnelle."
  ],
  pvoc: { titre: "Un avis négatif et un appel de club", decor: "bureau", a: P_MARCO, b: P_TOI,
    lignes: [
      "n|9 heures. Contacts à distance du jour.",
      "a|Un avis Google négatif vient d'être publié sur la page de LABORO.",
      "a|Et Mme Konaté a appelé : elle cherche des équipements pour un club de football. C'est ta première approche de la prospection.",
      "fin|À toi : traite l'avis et qualifie le contact de Mme Konaté."
    ] } },

"M012": { titre: "18 maillots pour l'équipe de son fils", decor: "showroom", a: P_ROMAIN, b: sayClient("Mme Konaté", "Cliente", "f", "#9333EA"),
  lignes: [
    "n|28 septembre. Mme Konaté vient d'acheter 18 maillots personnalisables pour l'équipe de football de son fils.",
    "b|J'habite à Corbeil-Essonnes et je ne pourrai pas revenir chercher la commande.",
    "b|Et pour la livraison, je ne veux pas dépenser plus de 10 euros.",
    "a|Finalise la vente et informe-la de tous les services disponibles.",
    "fin|À toi : identifie les services adaptés et propose-les à Mme Konaté."
  ],
  pvoc: { titre: "Finaliser la commande par téléphone", decor: "telephone", a: P_ROMAIN, b: sayClient("Mme Konaté", "Cliente", "f", "#9333EA"),
    lignes: [
      "n|28 septembre. Mme Konaté a commandé à distance 18 maillots personnalisables pour l'équipe de son fils.",
      "b|Je suis à Corbeil-Essonnes, je ne peux pas me déplacer, et je ne veux pas payer plus de 10 euros de livraison.",
      "a|Finalise la commande par téléphone et informe-la de tous nos services.",
      "fin|À toi : identifie les services adaptés et présente-les à Mme Konaté."
    ] } },

"M013": { titre: "La soirée Rentrée Sportive", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Bureau commercial. Le carton d'invitation de la soirée Rentrée Sportive est sur la table.",
    "a|Comme chaque année, LABORO organise sa soirée Rentrée Sportive.",
    "a|Je te confie la sélection des clients à inviter en priorité, et la préparation des invitations.",
    "fin|À toi : sélectionne les clients à inviter et prépare les invitations."
  ],
  pvoc: { titre: "Inviter les meilleurs clients B2B", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
        "a|La soirée Rentrée Sportive, c'est d'abord pour nos comptes B2B : CSE et clubs. Sans oublier quelques particuliers fidèles.",
      "a|Sélectionne les invités, prépare les invitations : tu les envoies par mail, puis tu confirmes par téléphone.",
      "fin|À toi : sélectionne les clients à inviter et prépare les invitations."
    ] } },

"ACC1": { titre: "Ton premier jour à l'accueil", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Premier jour au showroom d'Évry. Les portes vont bientôt ouvrir.",
    "a|Bienvenue ! Ici, l'accueil des visiteurs, c'est la responsabilité de toute l'équipe.",
    "a|Ce matin, plusieurs situations vont se présenter, l'une après l'autre. Tiens-toi prêt.",
    "n|La porte s'ouvre : un premier visiteur entre.",
    "fin|À toi : assure l'accueil physique des visiteurs du showroom."
  ] },

"ACC2": { titre: "La permanence téléphonique", decor: "telephone", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|9 heures. Romain te confie le poste téléphonique du showroom.",
    "a|Tu tiens la permanence téléphonique jusqu'à midi.",
    "a|Trois appels vont tester ton accueil au téléphone. Le premier arrive…",
    "n|Dring… dring…",
    "fin|À toi : décroche et gère les appels de la matinée."
  ] },

"ACC3": { titre: "Un samedi de forte affluence", decor: "showroom", a: P_THOMAS, b: P_TOI,
  lignes: [
    "n|Samedi matin. Le showroom est plein. Romain Sauzet est en réunion.",
    "a|On est tous les deux à l'accueil ce matin, et il y a du monde.",
    "a|Il va y avoir des situations délicates. Garde ton calme et reste professionnel.",
    "fin|À toi : repère les bonnes réactions et gère les situations difficiles."
  ] },

"ACC4": { titre: "Portes Ouvertes Running", decor: "showroom", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Journée Portes Ouvertes Running au showroom d'Évry.",
    "a|Aujourd'hui, c'est toi qui accueilles les visiteurs à l'entrée, toute la journée.",
    "a|Nous attendons 80 personnes entre 10 heures et 18 heures.",
    "fin|À toi : prépare l'ouverture et assure l'accueil de l'événement."
  ] },

"M004": { titre: "Développer le club Trail Val d'Orge", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Bureau commercial B2B. La fiche du club Trail Val d'Orge est ouverte dans LABORO Connect.",
    "a|Ce club est un client récent : une seule petite commande pour l'instant.",
    "a|Prépare ton appel à son président, M. Hervé Lacombe. Propose une offre pour équiper le groupe compétition, puis envoie le devis avec un mail.",
    "fin|À toi : prépare l'appel à M. Lacombe."
  ],
  pvoc: { titre: "Un client récent à développer à distance", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
        "a|Je te confie le club Trail Val d'Orge : un client récent, une petite commande seulement.",
      "a|Tout se fait à distance : ton appel à M. Hervé Lacombe, l'offre pour le groupe compétition, puis le devis par mail.",
      "fin|À toi : prépare ton appel à M. Lacombe."
    ] } },

"M006": { titre: "Les 6 dernières invitations", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Le showroom se prépare pour la soirée Rentrée Sportive.",
    "a|Il reste 6 invitations à attribuer. Je t'en confie le choix et une partie de la préparation.",
    "a|Nina Chevalier suit les comptes professionnels avec toi. Et le soir même, tu accueilles les invités et tu saisis les occasions de vente.",
    "fin|À toi : organise l'événement et prépare la soirée."
  ],
  pvoc: { titre: "Une invitation pour le CSE Hydral Lisses", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Bureau B2B. Nina suit à distance les comptes professionnels : CSE, clubs, établissements scolaires.",
      "a|Aide-moi à attribuer les 6 dernières invitations de la soirée Rentrée Sportive.",
      "a|Tu rédiges aussi le mail d'invitation au CSE Hydral Lisses, que tu relanceras par téléphone. Le soir, tu m'accompagnes auprès des pros.",
      "fin|À toi : organise ta part de l'événement."
    ] } },

"M008": { titre: "40 ballons en retard", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Lundi matin. Un mail du fournisseur SportPro Distribution vient d'arriver.",
    "a|Mauvaise nouvelle : les 40 ballons de l'US Trois-Vallées ont 8 jours de retard.",
    "a|Et le club organise son tournoi jeunes ce samedi ! Trouve une solution avant midi.",
    "a|Ensuite, informe M. Olivier Lacroix, leur responsable du matériel, et fais une réclamation au fournisseur.",
    "fin|À toi : analyse la situation et trouve une solution."
  ],
  pvoc: { titre: "M. Lacroix est furieux", decor: "telephone", a: P_TOI, b: sayClient("M. Lacroix", "US Trois-Vallées", "h", "#15803D"),
    lignes: [
      "n|Lundi matin. Romain Sauzet est en rendez-vous. Ton téléphone sonne.",
      "b|Olivier Lacroix, de l'US Trois-Vallées. On m'apprend que nos 40 ballons ont 8 jours de retard !",
      "b|On les attendait jeudi pour le tournoi jeunes de samedi. Je suis très mécontent.",
      "fin|À toi : gère l'appel, trouve une solution, puis confirme-la par mail."
    ] } },

"M009": { titre: "Opération Printemps du Sport", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Rayon chaussures du showroom.",
    "a|Je prépare l'opération Printemps du Sport. Je te confie la réorganisation de ce rayon et la communication de l'opération.",
    "a|Mon objectif : vendre 20 % de paires de plus que l'an dernier à la même période.",
    "fin|À toi : analyse le rayon et propose ton implantation."
  ] },

"M014": { titre: "3 contrats CSE en 6 semaines", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Je te confie la conception d'une opération de prospection auprès des CSE de l'Essonne.",
    "a|Objectif : signer 3 nouveaux contrats en 6 semaines, avec un budget de 400 euros. Je valide ton plan en réunion lundi.",
    "fin|À toi : conçois l'opération de prospection."
  ] },

"M023": { titre: "Anticiper plutôt que réagir", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|J'ai un constat : LABORO réagit à la concurrence au lieu de l'anticiper.",
    "a|Je te confie la mise en place d'un dispositif de veille commerciale permanent. Budget : 300 euros par an.",
    "fin|À toi : conçois le dispositif de veille de LABORO."
  ],
  pvoc: { titre: "La veille B2B de l'année prochaine", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|Conçois-moi le dispositif de veille commerciale B2B de LABORO pour l'année prochaine.",
      "a|Il doit couvrir les concurrents, les prospects et l'évolution du marché des CSE, clubs et collectivités en Essonne.",
      "fin|À toi : conçois le dispositif de veille B2B."
    ] } },

"M024": { titre: "M. Fontaine contacte LABORO partout à la fois", decor: "bureau", a: P_ROMAIN, b: sayClient("M. Fontaine", "Directeur, centre de remise en forme", "h", "#475569"),
  lignes: [
    "n|En quelques minutes : un mail, un message Instagram et un appel. Tous de M. Fontaine.",
    "b|Je dirige un centre de remise en forme de 450 adhérents à Évry. Je veux équiper mes 8 moniteurs et créer un corner running.",
    "b|Mon budget : 8 000 euros TTC.",
    "a|Gère cette vente de A à Z. Ensuite, tu en tireras une fiche de formation pour Thomas Moreau.",
    "fin|À toi : pilote cette vente omnicanale."
  ],
  pvoc: { titre: "Un dossier B2B à piloter à distance", decor: "telephone", a: P_NINA, b: sayClient("M. Fontaine", "Directeur, centre de remise en forme", "h", "#475569"),
    lignes: [
      "n|Mail, Instagram, téléphone : M. Fontaine a contacté LABORO par tous les canaux presque en même temps.",
      "b|450 adhérents, 8 moniteurs à équiper et un corner running à créer. Budget : 8 000 euros TTC.",
      "a|Je te confie ce dossier B2B. Tu le pilotes à distance jusqu'au rendez-vous, puis tu rédiges une fiche de formation pour Thomas Moreau.",
      "fin|À toi : pilote la vente à distance."
    ] } },

"M025": { titre: "+64 % de réclamations", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Bureau de la direction. Un graphique est affiché à l'écran.",
    "a|Les réclamations ont augmenté de 64 % ce trimestre.",
    "a|Et après une réclamation, seulement 61 % des clients sont satisfaits. L'objectif, c'est 80 %.",
    "a|Je te confie la conception d'une vraie politique de gestion des réclamations.",
    "fin|À toi : analyse la situation et conçois la politique."
  ],
  pvoc: { titre: "Une politique de réclamations pour tous les canaux", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|Je veux une politique de gestion des réclamations qui marche à distance comme en face-à-face.",
      "a|Pour tous nos clients : particuliers du site et professionnels, CSE, clubs, collectivités. Le bilan du trimestre est dans le dossier.",
      "fin|À toi : analyse le bilan et conçois la politique."
    ] } },

"SA1": { titre: "La livraison de M. Bensalah", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Bureau satisfaction client. Les commandes du site s'affichent à l'écran.",
    "a|Aujourd'hui, tu t'occupes des livraisons passées sur laboro-sport.fr.",
    "a|Commence par la commande de M. Karim Bensalah, un habitué du showroom. Conseille-lui le bon mode de livraison… et attention aux imprévus.",
    "fin|À toi : choisis le bon mode de livraison pour M. Bensalah."
  ],
  pvoc: { titre: "Une livraison gérée à distance", decor: "telephone", a: P_MARCO, b: P_TOI,
    lignes: [
        "a|Tu gères entièrement à distance la commande de M. Karim Bensalah, un client régulier : par téléphone et par SMS.",
      "a|D'abord le conseil du mode de livraison. Ensuite… il faudra gérer un retard.",
      "fin|À toi : conseille M. Bensalah sur sa livraison."
    ] } },

"SA2": { titre: "32 kits pour les U17", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|1er octobre. Commande en vue pour l'Entente sportive des Coteaux.",
    "a|Le club veut équiper ses 32 joueurs U17 : maillot brodé et floqué, plus un short, avant le premier match de championnat.",
    "a|Avant de lancer l'atelier, je veux savoir si le budget et la date sont tenables. Je te confie la coordination.",
    "fin|À toi : vérifie et chiffre la commande."
  ],
  pvoc: { titre: "Le bon de commande de Mme Ferrandi", decor: "bureau", a: P_NINA, b: sayClient("Mme Ferrandi", "Secrétaire du club", "f"),
    lignes: [
      "n|1er octobre. Un mail de l'Entente sportive des Coteaux arrive.",
      "b|Bonjour, voici notre bon de commande pour 32 kits personnalisés destinés à nos joueurs U17.",
      "a|Tu coordonnes tout à distance : vérification du bon, chiffrage, échanges avec Mme Ferrandi, atelier de flocage et suivi dans LABORO Connect.",
      "fin|À toi : vérifie et chiffre la commande."
    ] } },

"SA3": { titre: "18 % du chiffre d'affaires", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Nos services associés représentent 18 % du chiffre d'affaires de LABORO.",
    "a|Analyse leurs performances du semestre et propose-moi un plan d'amélioration.",
    "fin|À toi : analyse les performances des services associés."
  ],
  pvoc: { titre: "Des pros très sensibles aux délais", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|Évalue la qualité de nos services associés, livraison et textile personnalisé, à partir du bilan du semestre.",
      "a|Pense surtout aux clubs, CSE et collectivités : ils sont très sensibles aux délais.",
      "fin|À toi : analyse les performances et propose un plan."
    ] } },

"M015": { titre: "Le rayon chaussures, chiffres à l'appui", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Avril approche. Romain prépare l'opération Printemps du Sport.",
    "a|Avant de toucher au rayon chaussures, je veux les chiffres.",
    "a|Analyse les résultats du rayon le mois dernier, puis propose-moi une nouvelle implantation.",
    "fin|À toi : analyse et diagnostique le rayon."
  ] },

"M016": { titre: "Trop de visiteurs repartent sans acheter", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Le showroom est fréquenté… mais beaucoup de visiteurs ressortent les mains vides.",
    "a|Je veux faire passer notre taux de transformation à 40 %.",
    "a|Prépare-moi un plan de développement de la clientèle : je le soumettrai à Pascal Berruelle. Pour les actions, compte sur Marco, toi et moi.",
    "fin|À toi : diagnostique la situation et cible les actions."
  ] },

"M017": { titre: "Les pistes du Forum sport Essonne", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Retour du Forum sport Essonne. Nina pose ses notes sur le bureau.",
    "a|Voici les pistes que j'ai relevées au forum, et nos critères de qualification.",
    "a|Prépare une liste de prospects B2B à contacter pour développer notre portefeuille en Essonne.",
    "fin|À toi : collecte les informations et qualifie les pistes."
  ] },

"M018": { titre: "Premier appel au Comité 91 Handball", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Tu vas prendre contact par téléphone avec Pierre Lambert, du Comité 91 Handball.",
    "a|C'est ton premier appel : il ne te connaît pas encore. Prépare-le bien.",
    "fin|À toi : prépare ton plan d'appel."
  ] },

"M019": { titre: "5 rendez-vous en 3 semaines ?", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Conçois un e-mailing de prospection pour les clubs de l'Essonne qui ne sont pas encore clients.",
    "a|Objectif : 5 rendez-vous en 3 semaines. Mais avant l'envoi, dis-moi si c'est réaliste.",
    "fin|À toi : définis la cible et le message."
  ] },

"M020": { titre: "La tournée Verrières – Massy – Orsay", decor: "club", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Tournée terrain dans le secteur Verrières-le-Buisson, Massy, Orsay.",
    "a|Quatre rendez-vous aujourd'hui : 2 prospects à convaincre et 2 clients à développer.",
    "a|Mon objectif pour toi : 2 devis signés ou commandes confirmées avant ce soir.",
    "fin|À toi : prépare ta tournée."
  ] },

"M021": { titre: "Le bilan de l'opération de prospection", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Lundi. Ton opération de 3 semaines auprès des clubs et associations est terminée.",
    "a|Fais-moi le bilan chiffré de l'opération.",
    "a|Il reste 4 devis sans réponse : organise leur relance. Et remets-moi un rapport avec tes recommandations.",
    "fin|À toi : analyse les résultats de l'opération."
  ] },

"M022": { titre: "L'offre Sportélia Pro de M. Fabre", decor: "club", a: sayClient("M. Fabre", "Les Coureurs de l'Orge", "h", "#15803D"), b: P_TOI,
  lignes: [
    "n|Rendez-vous avec M. Didier Fabre, président des Coureurs de l'Orge, client récent pour des chaussures.",
    "a|Regardez : Sportélia Pro me propose 20 maillots floqués à 24 euros TTC l'unité, avec 10 % de remise.",
    "a|J'hésite à passer la commande chez vous…",
    "n|Tu te souviens de la règle de Nina : pas de remise supplémentaire sans contrepartie.",
    "fin|À toi : analyse l'offre et prépare ton argumentation."
  ] },

"M026": { titre: "Le compte stratégique de la Mairie", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Lundi 28 septembre 2026.",
    "a|Je te confie la gestion complète de la commande de la Mairie d'Évry-Courcouronnes.",
    "a|Elle est suivie par David Chemin, leur responsable achats. C'est un compte stratégique : aucune erreur n'est permise.",
    "fin|À toi : sécurise la transaction."
  ],
  pvoc: { titre: "50 ballons et 20 filets pour le gymnase", decor: "telephone", a: P_PASCAL, b: sayClient("M. Chemin", "Resp. achats, Mairie", "h", "#334155"),
    lignes: [
      "n|Lundi 28 septembre 2026. Commande publique de la Mairie d'Évry-Courcouronnes.",
      "b|Je vous confirme : 50 ballons Pro Match T5 et 20 filets, sur bon de commande public, livrés au gymnase municipal à la date prévue.",
      "a|Tu pilotes l'exécution de cette commande à distance, par téléphone et par mail. Je compte sur toi.",
      "fin|À toi : sécurise la transaction."
    ] } },

"M027": { titre: "Objectif 80 % après réclamation", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Bureau satisfaction client. La pile des réclamations du mois.",
    "a|Ce mois-ci, c'est toi qui prends en charge la gestion des réclamations.",
    "a|Et propose-moi un plan pour atteindre 80 % de clients satisfaits après une réclamation.",
    "fin|À toi : analyse et priorise les réclamations."
  ],
  pvoc: { titre: "Les réclamations du mois, à distance", decor: "bureau", a: P_MARCO, b: P_TOI,
    lignes: [
        "a|Pilote à distance, par mail et téléphone, les réclamations du mois : particuliers du site comme clients professionnels.",
      "a|Et propose un plan pour atteindre 80 % de satisfaction après réclamation.",
      "fin|À toi : analyse et priorise les réclamations."
    ] } },

"M028": { titre: "80 % de satisfaits avant la fin de l'année", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Réunion satisfaction client.",
    "a|Voici les résultats de satisfaction du trimestre.",
    "a|Pascal Berruelle attend un plan d'action pour atteindre 80 % de clients satisfaits avant la fin de l'année.",
    "fin|À toi : analyse les résultats et construis le plan."
  ],
  pvoc: { titre: "Les clients B2B qui commandent à distance", decor: "bureau", a: P_MARCO, b: P_TOI,
    lignes: [
      "n|Réunion satisfaction client.",
      "a|Voici les résultats du trimestre, tous clients confondus. Pascal Berruelle veut 80 % de satisfaits avant la fin de l'année.",
      "a|Analyse, revois notre dispositif de mesure, et regarde de près les CSE et collectivités qui commandent à distance.",
      "fin|À toi : analyse les résultats et construis le plan."
    ] } }

});

Object.assign(SAYNETES_MISSIONS, {

"M029": { titre: "De 22 % à moins de 15 % d'attrition", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je veux structurer notre politique de fidélisation.",
    "a|Aujourd'hui, nous perdons 22 % de nos clients. Je veux passer sous les 15 %. Conçois-moi un programme complet.",
    "fin|À toi : conçois le programme de fidélisation."
  ],
  pvoc: { titre: "3 200 clients à fidéliser", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|LABORO, c'est 3 200 clients, particuliers et professionnels. Notre attrition est de 22 % : je la veux sous 15 %.",
      "a|Conçois le programme avec Nina Chevalier. Soigne le niveau B2B, suivi à distance par téléphone, mail et visio.",
      "fin|À toi : conçois le programme de fidélisation."
    ] } },

"M030": { titre: "Reconduire la soirée, ou pas ?", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Bureau de la direction. Le bilan de la soirée Rentrée Sportive est imprimé.",
    "a|Évalue rigoureusement cette soirée, chiffres à l'appui.",
    "a|Ensuite, dis-moi si LABORO doit la reconduire, l'adapter… ou la remplacer par autre chose.",
    "fin|À toi : évalue la soirée et prends position."
  ],
  pvoc: { titre: "Le bilan de la soirée du 15 octobre", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|La soirée Rentrée Sportive du 15 octobre est terminée. Tu avais coordonné à distance les invités B2B.",
      "a|Tes relances téléphoniques et tes mails de confirmation ont fait venir nos CSE et nos clubs.",
      "a|Pascal Berruelle et moi voulons maintenant une évaluation rigoureuse. Reconduire, adapter ou remplacer ?",
      "fin|À toi : évalue la soirée et prends position."
    ] } },

"M031": { titre: "Répondre en moins de 24 heures", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Bureau satisfaction client. Les chiffres des contacts de la semaine s'affichent.",
    "a|Regarde ces chiffres : on n'atteint pas notre objectif de réponse en moins de 24 heures.",
    "a|Conçois un système de traitement plus efficace. Tu présenteras ton tableau de bord à Pascal Berruelle.",
    "fin|À toi : analyse et diagnostique le traitement des contacts."
  ],
  pvoc: { titre: "Tous les canaux en moins de 24 heures", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|Appels, mails, réseaux sociaux, formulaires du site, avis Google : je veux une réponse en moins de 24 heures partout.",
      "a|Optimise le traitement de tous ces contacts, et fais très attention aux demandes B2B traitées à distance.",
      "fin|À toi : analyse et diagnostique le traitement des contacts."
    ] } },

"M032": { titre: "+15 % de CA B2B en 12 mois", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je veux accélérer le développement B2B de LABORO.",
    "a|Conçois un plan pour gagner 15 % de chiffre d'affaires B2B en 12 mois. Tu travailles avec Nina Chevalier, qui suit les pros.",
    "fin|À toi : analyse la situation et fixe les objectifs."
  ] },

"M033": { titre: "Un CA au-dessus de l'objectif… et pourtant", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Tableau de bord du showroom, 1er semestre 2026.",
    "a|Bonne nouvelle : le chiffre d'affaires dépasse l'objectif.",
    "a|Mais le taux de transformation et le panier moyen sont en dessous. Pascal Berruelle attend une analyse et un plan correctif.",
    "fin|À toi : analyse le tableau de bord en profondeur."
  ],
  pvoc: { titre: "Le tableau de bord du semestre", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Réunion avec Romain Sauzet et Nina Chevalier : tableau de bord du showroom, 1er semestre 2026.",
      "a|Le CA dépasse l'objectif, mais la transformation et le panier moyen sont en deçà. Pascal Berruelle veut un plan correctif.",
      "a|Et moi, je veux que tu y intègres des leviers de relation client à distance : téléphone, mail, relances.",
      "fin|À toi : analyse le tableau de bord en profondeur."
    ] } },

"M034": { titre: "3 commandes de maillots défectueuses", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Ce matin, au bureau satisfaction client.",
    "a|Problème majeur : 3 commandes de maillots floqués sont défectueuses.",
    "a|Romain Sauzet est absent aujourd'hui. Tu gères la crise seul.",
    "fin|À toi : gère l'urgence des maillots défectueux."
  ] },

"M035": { titre: "27 % de CA en plus", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Les clients qui utilisent plusieurs canaux génèrent 27 % de chiffre d'affaires en plus.",
    "a|Conçois-moi une stratégie pour développer l'expérience omnicanale de LABORO.",
    "fin|À toi : analyse et diagnostique l'expérience omnicanale."
  ] },

"M036": { titre: "Cinq dossiers B2B ouverts en même temps", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Lundi. Cinq dossiers de commandes B2B sont ouverts sur ton écran.",
    "a|Cette semaine, tu gères toutes les commandes B2B.",
    "a|Attention : certains dossiers demandent une action immédiate.",
    "fin|À toi : priorise les dossiers et agis."
  ] },

"M037": { titre: "Le bilan des 6 premiers mois", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Bureau de la direction. Le programme de fidélisation fête ses 6 mois.",
    "a|Évalue ces 6 premiers mois, le bilan est dans le dossier.",
    "a|Puis prépare-moi le plan du second semestre.",
    "fin|À toi : évalue le programme rigoureusement."
  ],
  pvoc: { titre: "Le programme de fidélisation à mi-parcours", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|Évalue les 6 premiers mois du programme de fidélisation, puis prépare le plan du second semestre.",
      "a|Avec Nina Chevalier, regarde de près nos clients B2B suivis à distance : CSE, clubs, collectivités.",
      "fin|À toi : évalue le programme rigoureusement."
    ] } },

"M038": { titre: "Conquérir les CSE de plus de 500 salariés", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je veux conquérir les CSE des grandes entreprises de l'Essonne, celles de plus de 500 salariés.",
    "a|Je te confie la veille concurrentielle et la constitution de la base de prospection pour cette cible.",
    "fin|À toi : construis la base de prospection."
  ] },

"M039": { titre: "L'objectif du prochain trimestre", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Voici les ressources dont tu disposes, et l'objectif du prochain trimestre.",
    "a|Conçois-moi le plan de prospection complet.",
    "fin|À toi : construis le plan stratégique de prospection."
  ] },

"M040": { titre: "Semaine 6 sur 12", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Mi-opération : semaine 6 sur 12.",
    "a|Faisons le point. L'objectif reste 5 contrats.",
    "a|Fais-moi un bilan intermédiaire, et propose les ajustements pour y arriver.",
    "fin|À toi : analyse les résultats et ajuste l'opération."
  ] },

"M041": { titre: "Rendez-vous chez ArianeGroup Massy", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Tu as décroché un rendez-vous stratégique avec le CSE d'ArianeGroup Massy.",
    "a|28 000 euros hors taxes par an de budget sport : c'est le prospect le plus important de l'opération.",
    "a|Je compte sur toi.",
    "fin|À toi : prépare ta proposition."
  ] },

"M042": { titre: "Cinq comptes clés, cinq situations", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Je te confie la relation avec 5 de nos comptes B2B clés.",
    "a|Chacun est dans une situation différente : il faudra une approche différente pour chacun.",
    "fin|À toi : définis la stratégie pour chaque compte."
  ] },

"M043": { titre: "Fin de l'opération de prospection", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|L'opération de prospection est terminée.",
    "a|J'ai besoin du bilan complet.",
    "a|Et de tes recommandations pour la prochaine opération.",
    "fin|À toi : évalue rigoureusement l'opération."
  ] },

"M044": { titre: "La stratégie B2B de l'année prochaine", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Construis le plan stratégique commercial B2B de l'année prochaine.",
    "a|C'est ta mission de Terminale : tu la présenteras à l'équipe de direction.",
    "fin|À toi : analyse et fixe les orientations."
  ] },

"M080": { titre: "Faire mieux au printemps", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|La Rentrée Sportive de septembre 2026 n'a pas atteint ses objectifs.",
    "a|Au printemps, on fait mieux. Je te confie l'opération Printemps du Sport d'avril 2027.",
    "a|De l'idée jusqu'au bilan. Tu la présenteras à Pascal Berruelle.",
    "fin|À toi : conçois l'opération."
  ] },

"M081": { titre: "4 clients perdus à cause des délais", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Bureau satisfaction client. Marco referme le bilan du trimestre.",
    "a|On a perdu 4 clients à cause des délais. C'est inacceptable.",
    "a|Je veux un plan d'action complet d'ici lundi.",
    "fin|À toi : analyse et diagnostique la situation."
  ],
  pvoc: { titre: "4 CSE perdus à cause des délais", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Marco Pellini vient de présenter le bilan du trimestre : 7 clients perdus.",
      "a|Dont 4 CSE, à cause des délais de livraison.",
      "a|Je veux un plan d'action complet d'ici lundi, pensé pour la relation B2B à distance.",
      "fin|À toi : analyse et diagnostique la situation."
    ] } },

"M082": { titre: "David Chemin est furieux", decor: "telephone", a: P_TOI, b: sayClient("M. Chemin", "Mairie d'Évry-Courcouronnes", "h", "#334155"),
  lignes: [
    "n|Romain Sauzet est absent aujourd'hui. Le téléphone sonne : tu décroches.",
    "b|David Chemin, de la Mairie d'Évry-Courcouronnes. J'ai un très gros problème avec votre livraison !",
    "n|Il est furieux. Tu es seul pour gérer cette crise, et vite.",
    "fin|À toi : gère la crise en temps réel."
  ],
  pvoc: { titre: "15 ballons défectueux, tournoi demain", decor: "telephone", a: P_TOI, b: sayClient("M. Chemin", "Mairie d'Évry-Courcouronnes", "h", "#334155"),
    lignes: [
      "n|Nina Chevalier est en déplacement, injoignable. Ton téléphone sonne.",
      "b|David Chemin, Mairie d'Évry-Courcouronnes. Sur les 50 ballons Pro Match T5 livrés, 15 sont défectueux : coutures décollées !",
      "b|Et notre tournoi municipal, c'est demain à 9 heures.",
      "fin|À toi : gère cette crise à distance, par téléphone et par mail."
    ] } },

"M083": { titre: "De retour de stage", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Tu reviens de stage. Romain t'attend au bureau.",
    "a|Prépare un bilan professionnel complet : tu le présenteras à l'équipe LABORO.",
    "a|C'est aussi le bon moment pour repérer tes axes de progression.",
    "fin|À toi : analyse ton expérience et structure ton bilan."
  ],
  pvoc: { titre: "Ton bilan de PFMP devant l'équipe", decor: "bureau", a: P_ROMAIN, b: P_TOI,
    lignes: [
      "n|Retour de PFMP dans une entreprise sportive.",
      "a|Prépare ton bilan professionnel pour l'équipe LABORO.",
      "a|Nina Chevalier sera là : elle regardera ce que ces compétences de vente t'apportent pour la relation client à distance.",
      "fin|À toi : analyse ton expérience et structure ton bilan."
    ] } },

"M084": { titre: "3 contrats au lieu de 5", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Bureau commercial B2B. Le bilan de l'opération est sur la table.",
    "a|L'objectif était de 5 contrats. On en a signé 3.",
    "a|Je te confie la conception et le pilotage de la prochaine opération, avec un objectif plus ambitieux.",
    "fin|À toi : analyse le bilan et conçois la prochaine opération."
  ] },

"M085": { titre: "Le CSE de Thales Palaiseau attend ta proposition", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|C'est le rendez-vous le plus important du trimestre.",
    "a|Isabelle Ferreira, responsable du CSE de Thales Palaiseau, attend ta proposition définitive vendredi.",
    "a|C'est le rendez-vous le plus important du trimestre : je compte sur toi pour décrocher ce CSE.",
    "fin|À toi : construis et défends ta proposition."
  ] },

"M086": { titre: "Les chiffres parlent", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Nina te tend ton tableau de bord personnel des 8 dernières semaines.",
    "a|Les chiffres parlent…",
    "a|… mais toi, qu'est-ce que tu en penses ?",
    "fin|À toi : analyse tes résultats de prospection."
  ] },

"M087": { titre: "Isabelle Faure appelle", decor: "telephone", a: P_TOI, b: sayClient("Mme Faure", "CSE PSA Stellantis Évry", "f", "#0369A1"),
  lignes: [
    "n|Tu es seul au bureau. Nina Chevalier est en déplacement. Le téléphone sonne.",
    "b|Isabelle Faure, responsable du CSE PSA Stellantis Évry. Nous avons un problème avec votre livraison.",
    "n|Tu as 2 heures pour trouver une solution et la rappeler.",
    "fin|À toi : trouve une solution pour Mme Faure dans les 2 heures."
  ],
  pvoc: { titre: "30 vestes avec le mauvais logo", decor: "telephone", a: P_TOI, b: sayClient("Mme Faure", "CSE PSA Stellantis Évry", "f", "#0369A1"),
    lignes: [
      "n|Nina Chevalier est en déplacement. Le téléphone sonne.",
      "b|Isabelle Faure, CSE PSA Stellantis Évry. Les 30 vestes softshell que vous avez livrées portent le mauvais logo !",
      "b|Notre événement a lieu dans 48 heures.",
      "fin|À toi : gère la crise à distance, avec l'atelier de broderie."
    ] } },

"M090": { titre: "La stratégie des 2 prochaines années", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je veux qu'une équipe de stagiaires construise la stratégie commerciale de LABORO pour les 2 prochaines années.",
    "a|Je te confie la coordination.",
    "fin|À toi : construis la stratégie."
  ] },

"M091": { titre: "La veille de toute l'équipe", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je t'ai choisi pour concevoir et animer le système de veille de toute l'équipe LABORO.",
    "a|Ce n'est pas juste un document : c'est un vrai projet de changement dans notre organisation.",
    "fin|À toi : conçois le dispositif de veille partagée."
  ] },

"M092": { titre: "Que chaque client ait envie de revenir", decor: "showroom", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Au milieu du showroom d'Évry.",
    "a|Je te confie la refonte complète de l'expérience client du showroom.",
    "a|Je veux que dans 3 mois, chaque client qui pousse notre porte reparte avec l'envie de revenir.",
    "a|Budget : 800 euros TTC. Romain, Marco et Nina sont là pour t'aider.",
    "fin|À toi : conçois la refonte de l'expérience client."
  ] },

"M112": { titre: "Désaccord sur la vitrine", decor: "showroom", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|La Rentrée Sportive démarre vendredi. Nina et Romain ne sont pas d'accord sur la vitrine, et Marco ajoute une contrainte de dernière minute.",
    "a|Je te confie l'arbitrage.",
    "a|Je te fais confiance, mais il me faut une décision d'ici demain matin.",
    "fin|À toi : analyse les positions et arbitre."
  ] },

"M093": { titre: "Deux nouveaux commerciaux à former", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Voici la mission la plus stratégique de LABORO.",
    "a|Conçois notre plan de développement B2B sur 2 ans, et forme les 2 nouveaux commerciaux qui viennent d'arriver.",
    "fin|À toi : conçois la stratégie B2B."
  ] },

"M094": { titre: "L'analyse du portefeuille", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Bureau commercial B2B. L'analyse du portefeuille clients est à l'écran.",
    "a|Voilà où en est notre portefeuille B2B.",
    "a|Construis la stratégie de relation client B2B pour les 12 prochains mois.",
    "fin|À toi : analyse et segmente le portefeuille."
  ] },

"M095": { titre: "L'idée de la machine à café", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Pascal Berruelle t'a entendu parler de ton idée à la machine à café.",
    "a|Mets ça en forme. Tu as 2 semaines.",
    "a|Si c'est convaincant, on teste avec 3 CSE dès la rentrée.",
    "fin|À toi : conçois et évalue ton nouveau service."
  ] },

"M113": { titre: "Deux CSE perdus face à Sportélia Pro", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Nous venons de perdre 2 CSE historiques au profit de Sportélia Pro.",
    "a|Je veux un dispositif de veille B2B qui anticipe au lieu de subir. Tu le conçois, et tu le pilotes.",
    "fin|À toi : conçois et pilote la veille B2B qui protège nos CSE."
  ] },

"M064": { titre: "Comprendre avant de changer", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Ta première semaine au showroom.",
    "a|Avant de toucher quoi que ce soit, observe l'espace de vente et décris-le.",
    "a|Avant de changer les choses, il faut les comprendre.",
    "fin|À toi : observe l'espace de vente et décris-le."
  ] },

"M065": { titre: "Nos 5 produits les plus vendus", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Romain te remet un extrait du catalogue avec les ventes du mois.",
    "a|Avant de conseiller un client, tu dois connaître nos produits sur le bout des doigts.",
    "a|Prépare-moi une fiche argumentaire sur nos 5 produits les plus vendus.",
    "fin|À toi : découvre les produits et prépare ta fiche argumentaire."
  ] },

"M066": { titre: "Avant l'ouverture de 10 heures", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Showroom, 9 heures. Les portes ouvrent à 10 heures.",
    "a|Chaque matin, l'équipe fait une série de vérifications pour que le rayon soit prêt à accueillir les clients.",
    "a|Demain matin, c'est toi qui fais cette routine, seul.",
    "fin|À toi : prépare ta checklist d'ouverture."
  ] },

"M067": { titre: "Ticket, facture, bon de livraison, devis", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Romain étale quatre documents sur le bureau.",
    "a|Ticket de caisse, facture, bon de livraison, devis : chaque document a son rôle.",
    "a|Explique-moi le rôle de chacun. Ensuite, tu vérifieras une facture.",
    "fin|À toi : identifie les documents de vente."
  ] },

"M068": { titre: "M. Ferrand, client depuis 3 ans", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Romain te montre un client qui sort du showroom.",
    "a|Tu vois M. Ferrand ? Il est client chez nous depuis 3 ans.",
    "a|LABORO ne vit pas que de nouveaux clients : la fidélisation est au cœur de notre stratégie. Analyse nos outils de fidélisation et observe-les au quotidien.",
    "fin|À toi : observe et comprends la fidélisation chez LABORO."
  ] },

"M069": { titre: "Tout ce qui n'est pas tracé n'existe pas", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Marco ouvre LABORO Connect, le logiciel de gestion commerciale.",
    "a|Retiens bien ça : tout ce qui n'est pas tracé n'existe pas.",
    "a|Aujourd'hui, tu sers Mme Isabelle Konaté en caisse, puis tu prends l'appel de M. Julien Fontaine.",
    "fin|À toi : découvre l'outil et ses enjeux."
  ] },

"M070": { titre: "Le bilan trimestriel avec les associés", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Bureau de la direction. Pascal prépare la réunion de bilan avec les associés.",
    "a|Voici le tableau de bord du trimestre qui vient de se terminer.",
    "a|Analyse les évolutions, repère les tendances, et propose des orientations pour le prochain trimestre.",
    "fin|À toi : analyse les évolutions du trimestre."
  ] },

"M071": { titre: "La tente Quick 3 places en rupture", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Rayon outdoor du showroom.",
    "a|Ce rayon perd du terrain, et sa meilleure vente, la tente LABORO Quick 3 places, manque souvent.",
    "a|Analyse les chiffres et réorganise le rayon avant le week-end. Je veux aussi une fiche que l'équipe pourra appliquer sans toi.",
    "fin|À toi : diagnostique le rayon et priorise."
  ] }

});

Object.assign(SAYNETES_MISSIONS, {

"M072": { titre: "Le plan d'action d'avril à juin", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "a|Je te confie le plan d'action commercial du prochain trimestre, d'avril à juin.",
    "a|Pascal Berruelle veut développer les ventes aux pros et fidéliser nos clients sportifs. On lui présente le plan vendredi prochain.",
    "fin|À toi : construis le plan d'action commercial."
  ] },

"M073": { titre: "L'enquête par QR code", decor: "showroom", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Pendant deux semaines, un QR code remis en caisse a permis aux clients de noter leur parcours au showroom.",
    "a|L'enquête est terminée : je te confie l'analyse des résultats.",
    "a|Romain Sauzet attend une note avec un plan d'amélioration faisable en moins d'un mois, pour 500 euros TTC maximum.",
    "fin|À toi : analyse les résultats et priorise."
  ] },

"M074": { titre: "La Semaine du Trail", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Rayon trail du showroom.",
    "a|La Semaine du Trail, c'est une opération de fidélisation pour nos clients coureurs. Cette fois, c'est toi qui pilotes.",
    "a|Avant de valider, je veux un planning, une newsletter et un budget. Et après l'opération, un bilan chiffré.",
    "fin|À toi : organise l'opération."
  ] },

"M050": { titre: "La promo agressive de Sportélia", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Un message de Romain arrive sur ton téléphone.",
    "a|Sportélia fait une promo agressive sur les chaussures cette semaine. Analyse ça et dis-moi ce qu'on doit faire.",
    "n|Il te transmet le relevé fait par l'équipe. Tu as la matinée pour préparer ta note.",
    "fin|À toi : observe et analyse l'offre concurrente."
  ],
  pvoc: { titre: "Des clients pros qui comparent les prix", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Message de Romain Sauzet : « Sportélia fait une promo agressive sur les chaussures. Analyse ça et dis-moi ce qu'on doit faire. »",
      "a|Je crains que mes clubs et mes CSE comparent les prix eux aussi.",
      "a|Dans ta note, propose-moi des arguments que je peux utiliser au téléphone et par mail. Tu as la matinée.",
      "fin|À toi : observe et analyse l'offre concurrente."
    ] } },

"M051": { titre: "La pointure 44 est en rupture", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Ce matin. M. Damien Royer, client fidèle, a commandé hier soir des chaussures trail Grip X en 44 sur le site.",
    "a|Problème : la taille 44 est en rupture.",
    "a|Et M. Royer part courir un trail dans 5 jours. Trouve la meilleure solution pour lui.",
    "fin|À toi : gère la situation de M. Royer."
  ],
  pvoc: { titre: "Une rupture à gérer à distance", decor: "bureau", a: P_ROMAIN, b: P_TOI,
    lignes: [
      "n|Ce matin, en vérifiant les commandes, tu découvres un problème.",
      "n|M. Damien Royer a commandé des Grip X en 44 hier soir. La taille est en rupture, et il court un trail dans 5 jours.",
      "a|Je te confie la situation : tu la gères à distance, par téléphone et par mail.",
      "fin|À toi : gère la situation de M. Royer."
    ] } },

"M052": { titre: "La mauvaise pointure de Mme Aubry", decor: "bureau", a: P_MARCO, b: sayClient("Mme Aubry", "Cliente fidèle, par mail", "f"),
  lignes: [
    "n|Un message est arrivé au service client.",
    "b|Les chaussures de trail que j'ai commandées pour l'anniversaire de mon mari ne sont pas à la bonne pointure. Il court un trail dans 10 jours !",
    "a|Réponds-lui avant midi avec une vraie solution. Si tu dépasses ton niveau de geste commercial, demande-moi.",
    "fin|À toi : analyse la réclamation et prépare ta réponse."
  ],
  pvoc: { titre: "Un mail, puis un appel", decor: "bureau", a: P_MARCO, b: sayClient("Mme Aubry", "Cliente fidèle, par mail", "f"),
    lignes: [
      "n|Un message est arrivé au service client.",
      "b|Les chaussures de trail pour l'anniversaire de mon mari ne sont pas à la bonne pointure. Et il court un trail dans 10 jours.",
      "a|Réponds-lui par mail avant midi, appelle-la ensuite pour valider la solution, et trace tout dans LABORO Connect.",
      "fin|À toi : analyse la réclamation et prépare ta réponse."
    ] } },

"M053": { titre: "Un NPS sous l'objectif", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|7 jours après chaque achat, chaque client reçoit un questionnaire par mail.",
    "a|Voici les résultats du trimestre. Notre NPS est sous l'objectif, et je veux comprendre pourquoi.",
    "a|Analyse-les, et propose 3 actions à présenter à Romain Sauzet.",
    "fin|À toi : analyse les résultats de satisfaction."
  ],
  pvoc: { titre: "La satisfaction à distance", decor: "bureau", a: P_MARCO, b: P_TOI,
    lignes: [
      "n|7 jours après chaque achat, chaque client reçoit un questionnaire par mail.",
      "a|Voici les résultats du trimestre. Concentre ton analyse sur la relation à distance : site, livraison, mails et téléphone.",
      "a|Puis propose 3 actions à présenter à Romain Sauzet.",
      "fin|À toi : analyse les résultats de satisfaction."
    ] } },

"M054": { titre: "Tous les contacts avant 18 heures", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Les contacts du jour arrivent sur tous les canaux de LABORO.",
    "a|Classe-les, et traite ou prépare toutes les réponses avant 18 heures.",
    "a|Ensuite, propose des règles simples pour que toute l'équipe priorise de la même façon.",
    "fin|À toi : classe et priorise les contacts du jour."
  ],
  pvoc: { titre: "Nina est en rendez-vous toute la journée", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Mails, appels, réseaux sociaux, formulaire du site : chacun traite les contacts à sa façon.",
      "a|Je suis en rendez-vous toute la journée. Je te confie les contacts du jour : classe-les, réponds-y et trace le suivi dans LABORO Connect.",
      "a|Pour un devis ou un engagement, prépare les infos : je validerai à mon retour. Et propose-nous des règles communes.",
      "fin|À toi : classe et priorise les contacts du jour."
    ] } },

"M055": { titre: "M. Ferrand ne présente jamais sa carte", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Showroom, près de la caisse.",
    "a|Je veux savoir si la carte LABORO PRO est vraiment utilisée par ceux qui l'ont.",
    "a|Voici les chiffres de l'année. Regarde aussi le cas de M. Ferrand : client fidèle, mais il ne présente jamais sa carte.",
    "fin|À toi : mesure l'utilisation de la carte LABORO PRO."
  ],
  pvoc: { titre: "Suivre les porteurs de carte à distance", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
        "a|Je prépare le suivi à distance des porteurs de la carte LABORO PRO. Est-elle vraiment utilisée ?",
      "a|Voici les chiffres de l'année, et le cas de M. Ferrand, qui ne la présente jamais. Tu pourras le contacter par téléphone ou par mail.",
      "fin|À toi : mesure l'utilisation de la carte LABORO PRO."
    ] } },

"M056": { titre: "La soirée clients du 14 novembre", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Bureau du showroom. Le bilan de la dernière soirée clients est dans le dossier.",
    "a|La prochaine soirée clients, c'est le 14 novembre. Avant de fixer le programme, je veux savoir ce que la dernière a vraiment rapporté.",
    "a|Fais le bilan chiffré, puis propose un format amélioré, l'invitation et les indicateurs pour juger la prochaine soirée.",
    "fin|À toi : analyse la dernière soirée et améliore-la."
  ],
  pvoc: { titre: "60 invités, dont 15 professionnels", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
      "n|Bureau commercial B2B. Prochaine soirée clients : le 14 novembre.",
      "a|Je m'occupe des 15 invités professionnels, CSE et clubs. Voici le bilan chiffré de la dernière édition.",
      "a|Propose un format amélioré, prépare l'invitation commune aux 60 invités avec relance téléphonique des pros, et les indicateurs.",
      "fin|À toi : analyse la dernière soirée et améliore-la."
    ] } },

"M057": { titre: "Premier jour au rayon chaussures", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Premier jour au rayon chaussures du showroom.",
    "a|Avant de te laisser en autonomie, je t'explique les bases.",
    "a|Comment le rayon est organisé, quels sont nos produits phares, et les règles de base du merchandising.",
    "fin|À toi : découvre l'organisation du rayon chaussures."
  ] },

"ACC-P2": { titre: "120 à 150 visiteurs ce samedi", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Samedi, journée portes ouvertes au showroom d'Évry.",
    "a|On attend entre 120 et 150 visiteurs. Tu tiens l'accueil avec Thomas Moreau.",
    "a|Règle des 30 secondes toute la journée. Et ce soir, tu me fais un bilan.",
    "fin|À toi : prépare l'accueil de la journée."
  ] },

"ACC-P3": { titre: "Le stand des Foulées du Lac", decor: "club", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Les Foulées du Lac : 800 coureurs, un dimanche. LABORO est partenaire officiel.",
    "a|Je te confie la coordination de l'accueil sur notre stand, avec une équipe de 4 personnes.",
    "a|Tu prépares la journée, puis tu en feras le bilan avec les résultats relevés le soir de la course.",
    "fin|À toi : conçois le dispositif d'accueil."
  ] },

"M058": { titre: "Mme Perrin cherche un cadeau", decor: "showroom", a: P_ROMAIN, b: sayClient("Mme Perrin", "Cliente", "f", "#C2410C"),
  lignes: [
    "n|Depuis 3 semaines, Romain t'observe accueillir les clients. Aujourd'hui, il te laisse seul.",
    "b|Bonjour, je cherche un cadeau pour mon fils.",
    "a|Elle est à toi. Je t'observe de loin.",
    "fin|À toi : découvre les besoins de Mme Perrin et conseille-la."
  ] },

"M059": { titre: "Le message des Coquelicots", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Lundi matin. Un message est arrivé hier soir sur laboro-sport.fr.",
    "a|Il vient de l'Accueil de loisirs Les Coquelicots, déjà client chez nous.",
    "a|Réponds-lui avant ce soir, de façon professionnelle. C'est un client pro à développer.",
    "fin|À toi : prépare ta réponse à l'accueil de loisirs."
  ] },

"M060": { titre: "Le tableau de bord du 2e trimestre", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Voici le tableau de bord du 2e trimestre.",
    "a|Analyse-le et repère les points clés avant la réunion d'équipe de vendredi.",
    "fin|À toi : lis et comprends les données."
  ],
  pvoc: { titre: "Avant tes rendez-vous avec les clubs", decor: "bureau", a: P_PASCAL, b: P_TOI,
    lignes: [
        "a|Voici le tableau de bord du T2 : CA par rayon, paniers moyens B2C et B2B, nouveaux clients dont les B2B.",
      "a|Avant tes prochains rendez-vous avec les clubs et les CSE, analyse-le pour la réunion de vendredi.",
      "fin|À toi : lis et comprends les données."
    ] } },

"M061": { titre: "M. Marchand, les chaussures dans un sac", decor: "showroom", a: P_ROMAIN, b: sayClient("M. Marchand", "Client", "h", "#475569"),
  lignes: [
    "n|Ce matin. M. Thierry Marchand entre au showroom, des chaussures dans un sac. Il est visiblement irrité.",
    "b|Bonjour. Il faut qu'on parle de ces chaussures…",
    "a|Prends-le en charge. C'est un très bon client.",
    "fin|À toi : accueille M. Marchand et comprends sa réclamation."
  ],
  pvoc: { titre: "La semelle décollée après 4 sorties", decor: "telephone", a: P_TOI, b: sayClient("M. Marchand", "Client", "h", "#475569"),
    lignes: [
      "n|Ton téléphone sonne.",
      "b|Thierry Marchand. Mes Grip X achetées il y a 3 mois sur votre site ont la semelle décollée, après seulement 4 sorties !",
      "n|Romain Sauzet te glisse : « Gère ça par téléphone. C'est un très bon client, propose-lui quelque chose de bien. »",
      "fin|À toi : accueille M. Marchand et comprends sa réclamation."
    ] } },

"M062": { titre: "Le sondage des 18 clients B2B", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|J'ai fait un sondage rapide auprès de nos 18 clients B2B actifs.",
    "a|Calcule les taux de satisfaction, et dis-moi ce que LABORO doit améliorer en priorité.",
    "fin|À toi : calcule et lis les résultats."
  ],
  pvoc: { titre: "Un sondage par téléphone et par mail", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
        "a|J'ai sondé nos 18 clients B2B actifs, par téléphone et par mail. Voici les résultats.",
      "a|Calcule les taux de satisfaction, interprète le NPS et trouve la priorité d'amélioration.",
      "fin|À toi : calcule et lis les résultats."
    ] } },

"M063": { titre: "Deux jours d'attente, ou pas de réponse", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "a|Dans l'équipe, les contacts clients ne sont pas suivis de la même façon.",
    "a|Certains clients attendent deux jours une réponse, d'autres n'en reçoivent jamais. Construis-nous un tableau de bord commun et des règles de traitement.",
    "fin|À toi : conçois le tableau de bord de suivi."
  ],
  pvoc: { titre: "Des demandes de pros qui se perdent", decor: "bureau", a: P_NINA, b: P_TOI,
    lignes: [
        "a|Des demandes de clients pros reçues à distance se perdent, ou attendent trop longtemps.",
      "a|Avec l'accord de Romain Sauzet, construis un tableau de bord commun et des règles de traitement, surtout pour les contacts B2B à distance.",
      "fin|À toi : conçois le tableau de bord de suivi."
    ] } },

"B41-P1": { titre: "Une matinée pour trouver des prospects", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Bureau commercial B2B. Le fichier clients est ouvert à l'écran.",
    "a|Trouve-moi de nouveaux prospects B2B en Essonne pour développer notre portefeuille.",
    "a|Voici le fichier actuel et mes pistes du Forum sport Essonne. Tu as la matinée pour les analyser et les qualifier.",
    "fin|À toi : identifie les sources et collecte les données."
  ] },

"B41-P2": { titre: "5 prospects à qualifier en 2 semaines", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Préparation de la prochaine campagne de prospection.",
    "a|Voici l'extrait de LABORO Connect avec nos 5 prospects en cours.",
    "a|Qualifie-les, classe-les par priorité et complète les fiches incomplètes d'ici 2 semaines.",
    "fin|À toi : analyse la qualité du fichier."
  ] },

"B41-P3": { titre: "Trop de prospects perdus", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|LABORO perd trop de prospects, faute d'un vrai système de veille et de qualification.",
    "a|Conçois-moi un dispositif permanent.",
    "fin|À toi : conçois le dispositif de veille et de qualification."
  ] },

"B42-P1": { titre: "Ton premier appel : M. Grandin", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Mardi. Bureau commercial B2B.",
    "a|Voici ton premier appel de prospection : M. Grandin, responsable administratif de l'US Villebon Football.",
    "a|Il ne te connaît pas. Prépare bien ton appel.",
    "fin|À toi : prépare ton appel à M. Grandin."
  ] },

"B42-P2": { titre: "8 rendez-vous et 2 contrats en 4 semaines", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Conçois une campagne de prospection pour les clubs de l'Essonne qui ne sont pas encore clients.",
    "a|Objectif : 8 rendez-vous et 2 contrats signés en 4 semaines, avec 350 euros de budget.",
    "fin|À toi : définis la stratégie et le message."
  ] },

"B42-P3": { titre: "+67 200 euros de CA B2B", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Conçois le plan de prospection annuel : je veux 67 200 euros hors taxes de CA B2B en plus, grâce à de nouveaux clients.",
    "a|Nina Chevalier le validera avec moi.",
    "fin|À toi : dimensionne et planifie la prospection."
  ] },

"B43-P1": { titre: "20 minutes avec Pierre Lambert", decor: "telephone", a: P_TOI, b: sayClient("M. Lambert", "Comité 91 Handball", "h", "#15803D"),
  lignes: [
    "n|Suite à ton appel de prospection, Pierre Lambert, responsable achats du Comité 91 Handball, t'a accordé un rendez-vous téléphonique.",
    "n|20 minutes. C'est ton premier vrai entretien de découverte.",
    "b|Allô ? Pierre Lambert, je vous écoute.",
    "fin|À toi : conduis l'entretien de découverte."
  ] },

"B43-P2": { titre: "Brétigny – Sainte-Geneviève – Courcouronnes", decor: "club", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Tournée de prospection dans le secteur Brétigny-sur-Orge, Sainte-Geneviève-des-Bois, Courcouronnes.",
    "a|Tu as quatre visites aujourd'hui, avec des profils très différents.",
    "a|Objectif de la journée : 1 devis accepté et au moins 2 rendez-vous productifs.",
    "fin|À toi : prépare et mène tes visites."
  ] },

"B43-P3": { titre: "Semaine 5 sur 10", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Mi-parcours de l'opération de prospection : semaine 5 sur 10.",
    "a|L'objectif, c'est 4 contrats.",
    "a|Fais-moi un état des lieux complet, et propose des ajustements pour l'atteindre.",
    "fin|À toi : analyse et ajuste l'opération."
  ] },

"B44-P1": { titre: "Pas de nouvelles de Stéphane Roche", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Lundi. Il y a 5 jours, tu as envoyé un devis de 12 paires de chaussures EasyRun aux Foulées de Draveil.",
    "a|Stéphane Roche, le président du club, n'a toujours pas répondu.",
    "a|Relance-le.",
    "fin|À toi : prépare et mène la relance."
  ] },

"B44-P2": { titre: "6 devis encore en attente", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Mardi. L'opération de 4 semaines auprès des clubs et des CSE est terminée.",
    "a|Il reste 6 devis en attente.",
    "a|Analyse les résultats, organise le suivi pour en transformer un maximum, et remets-moi un rapport.",
    "fin|À toi : analyse les résultats et priorise les relances."
  ] },

"B44-P3": { titre: "Des affaires perdues faute de suivi", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Nous perdons trop d'affaires parce que notre suivi n'est pas structuré.",
    "a|Conçois un système d'alerte et de suivi commercial intégré à LABORO Connect.",
    "fin|À toi : conçois le système de suivi."
  ] },

"B45-P1": { titre: "35,20 euros de moins chez Sportélia Pro", decor: "club", a: sayClient("M. Moreau", "AS Palaiseau Football", "h", "#15803D"), b: P_TOI,
  lignes: [
    "n|Rendez-vous avec Kevin Moreau, président de l'AS Palaiseau Football. Le club t'achète du petit matériel, mais ses maillots ailleurs.",
    "a|Regardez ce devis de Sportélia Pro : les mêmes maillots, 35 euros 20 hors taxes de moins.",
    "a|J'hésite…",
    "n|Tu te souviens du brief de Nina : ne jamais baisser le prix sans contrepartie.",
    "fin|À toi : analyse et argumente."
  ] },

"B45-P2": { titre: "La MJC de Brunoy consulte", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|La MJC de Brunoy, déjà cliente pour de petits achats, consulte plusieurs fournisseurs pour tous ses achats sportifs de l'année, dont Sportélia Pro.",
    "a|C'est notre chance de devenir son fournisseur principal.",
    "a|Mme Élodie Marchetti attend une proposition complète d'ici vendredi.",
    "fin|À toi : analyse et conçois la proposition."
  ] },

"B45-P3": { titre: "Gagner sur la valeur, pas sur le prix", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je veux que LABORO gagne sur la valeur, et jamais sur le prix.",
    "a|Conçois la stratégie de valorisation de notre offre pour tout le portefeuille B2B.",
    "fin|À toi : analyse et conçois la stratégie de valorisation."
  ] },

"M075": { titre: "Avant le changement de saison", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Rayon running et accessoires.",
    "a|Avant le changement de saison, fais le point sur les stocks de ce rayon.",
    "a|Certains produits posent problème. Tout est dans le dossier.",
    "fin|À toi : identifie les produits à traiter."
  ] },

"M076": { titre: "Deux offres pour les Velocity", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Le contrat avec le fournisseur actuel des chaussures route Velocity prend fin.",
    "a|J'ai reçu deux offres pour la saison d'été.",
    "a|Compare-les selon notre politique d'achat, et établis la commande auprès du fournisseur le plus adapté.",
    "fin|À toi : calcule et compare les deux offres."
  ] },

"M096": { titre: "Rayon printemps prêt le 15 avril", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Rayon chaussures, fin d'hiver.",
    "a|Je te confie tout le changement de saison du rayon. C'est la première fois que tu pilotes ça seul.",
    "a|Objectif : un rayon printemps opérationnel le jeudi 15 avril 2027.",
    "fin|À toi : gère les stocks sortants et prépare le changement."
  ] },

"M097": { titre: "Moins de 7 % du CA en ligne", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|Bureau de la direction. laboro-sport.fr est ouvert à l'écran.",
    "a|Notre site fait moins de 7 % de notre chiffre d'affaires.",
    "a|Dans le secteur sportif, l'e-commerce, c'est 18 % en moyenne. Fais-moi un diagnostic complet et un plan d'action.",
    "fin|À toi : calcule et analyse les performances du site."
  ] },

"M098": { titre: "Partenaire du Sport en Essonne", decor: "club", a: P_PASCAL, b: P_TOI,
  lignes: [
    "n|LABORO est partenaire officiel du Sport en Essonne, une course à pied du département, et y tiendra un stand.",
    "a|Je te confie notre stratégie de communication digitale.",
    "a|Je veux un maximum de visibilité, et de nouveaux clients au stand, puis au showroom d'Évry.",
    "fin|À toi : conçois la stratégie de communication digitale."
  ] }

});

Object.assign(SAYNETES_MISSIONS, {

"M099": { titre: "Le plan de performance sur 2 ans", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Voici la mission la plus stratégique de LABORO : le plan de performance de notre espace commercial sur 2 ans.",
    "a|Le showroom d'Évry-Courcouronnes et le site laboro-sport.fr. Romain, Nina et Marco sont là pour t'aider.",
    "fin|À toi : diagnostique la situation et priorise."
  ] },

"M103": { titre: "Une note de veille pour vendredi", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Fais-moi le point sur ce qui se passe autour de LABORO : concurrents, tendances, nouveautés.",
    "a|Je veux une note de veille synthétique avant la réunion de direction de vendredi.",
    "fin|À toi : collecte et organise les informations."
  ] },

"M104": { titre: "Marion Tessier a choisi ses Velocity", decor: "showroom", a: P_ROMAIN, b: sayClient("Mme Tessier", "Cliente", "f", "#0369A1"),
  lignes: [
    "n|Après ton conseil, Marion Tessier a choisi les chaussures route Velocity, en pointure 38.",
    "b|C'est parfait, je les prends !",
    "n|Romain t'observe de loin : c'est une évaluation informelle de tes techniques de vente.",
    "fin|À toi : finalise la vente, remets les documents et assure le suivi."
  ] },

"M105": { titre: "Le mail de Flocage Rapide SARL", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Mercredi 28 avril 2027. Romain te montre un mail reçu ce matin de Flocage Rapide SARL, notre sous-traitant flocage.",
    "a|Rachid Amrani, du Football Club Fleury 91, n'est encore au courant de rien.",
    "a|Leur tournoi a lieu dans 4 jours. Il faut agir vite, et proprement.",
    "fin|À toi : analyse la situation et agis."
  ] },

"M106": { titre: "Faire revenir 5 clients avant la Semaine du Trail", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Bureau satisfaction client. Un extrait du fichier clients est imprimé : 5 clients.",
    "a|Prépare une action de contact ciblée avant la Semaine du Trail de mai.",
    "a|Objectif : les faire revenir en magasin.",
    "fin|À toi : analyse et segmente ces clients."
  ] },

"M107": { titre: "Faire revenir nos clients sportifs", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Showroom, quelques semaines avant la Semaine du Trail de mai 2027.",
    "a|Conçois une action de fidélisation pour nos clients sportifs, à lancer avant la Semaine du Trail.",
    "a|L'objectif est simple : qu'ils reviennent, et qu'ils achètent.",
    "fin|À toi : conçois l'action de fidélisation."
  ] },

"M108": { titre: "Le bilan d'avril du rayon chaussures", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Rayon chaussures. Romain tient le bilan d'avril.",
    "a|Les chiffres du rayon sont en dessous des objectifs.",
    "a|Analyse, comprends, et propose un plan d'action concret pour mai. L'équipe du rayon : moi, deux vendeurs et toi.",
    "fin|À toi : analyse le bilan d'avril et diagnostique les problèmes."
  ] },

"M109": { titre: "6 semaines et 300 euros", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "a|Prépare une opération de prospection vers les associations sportives de l'Essonne qui ne sont pas encore clientes.",
    "a|Tu as 6 semaines et 300 euros.",
    "fin|À toi : dimensionne et planifie l'opération."
  ] },

"M110": { titre: "Fin de ta première semaine de phoning", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Vendredi 9 octobre 2026. Fin de ta première semaine de prospection téléphonique.",
    "a|Je t'ai observé toute la semaine.",
    "a|Fais ton bilan, et prépare tes réponses aux objections que tu as rencontrées.",
    "fin|À toi : analyse ta semaine et prépare tes réponses."
  ] },

"M111": { titre: "Une semaine pour transformer 2 devis", decor: "bureau", a: P_NINA, b: P_TOI,
  lignes: [
    "n|Lundi 26 avril 2027. Nina te remet la liste des devis en attente.",
    "a|Tu as une semaine pour en transformer au moins 2.",
    "a|Commence par les bons, dans le bon ordre.",
    "fin|À toi : priorise les devis et relance."
  ] },

"M100": { titre: "L'inventaire après la Semaine Running & Fitness", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|L'opération Semaine Running & Fitness vient de se terminer. L'inventaire est fait.",
    "a|Analyse les écarts de stock relevés.",
    "a|On s'en servira pour préparer la prochaine opération, Été Sport & Loisirs, en juin 2027.",
    "fin|À toi : analyse les résultats de l'inventaire."
  ] },

"M101": { titre: "Trois fournisseurs pour l'été", decor: "bureau", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Préparation de l'opération Été Sport & Loisirs, du 14 au 19 juin 2027.",
    "a|Je veux changer de fournisseur principal. Voici les résultats de l'appel d'offres auprès de trois fournisseurs, avec mes notes.",
    "a|Je te confie le scoring et la commande.",
    "fin|À toi : calcule les quantités à commander."
  ] },

"M102": { titre: "Trois dossiers en une journée", decor: "bureau", a: P_PASCAL, b: P_TOI,
  lignes: [
    "a|Je veux renforcer notre stratégie commerciale sur trois fronts.",
    "a|Les prix de deux produits clés, le lancement d'ateliers Entretien et Prolongation de l'équipement, et notre présence sur Instagram. Une seule journée, comme à l'épreuve E2.",
    "fin|À toi : commence par fixer les prix et analyser la concurrence."
  ] },

"ACC5": { titre: "Des visiteurs professionnels attendus", decor: "showroom", a: P_ROMAIN, b: sayClient("Visiteur", "Professionnel attendu", "h", "#6D28D9"),
  lignes: [
    "n|Romain t'a confié l'accueil du showroom pour toute la journée. Plusieurs visiteurs professionnels sont attendus.",
    "a|Un visiteur professionnel, c'est l'image de LABORO qui est en jeu dès les premières secondes.",
    "n|Un homme en tenue de travail s'approche de l'accueil.",
    "fin|À toi : accueille et oriente les visiteurs professionnels."
  ] },

"ACC6": { titre: "La boîte contact@laboro-sport.fr", decor: "bureau", a: P_MARCO, b: P_TOI,
  lignes: [
    "n|Poste d'accueil. La boîte mail de LABORO est ouverte.",
    "a|La boîte contact reçoit 15 à 20 messages par jour.",
    "a|Ton rôle : trier, prioriser, transmettre aux bonnes personnes, ou répondre toi-même aux demandes simples. C'est souvent notre premier contact avec un client ou un partenaire.",
    "fin|À toi : trie et priorise les messages."
  ] },

"ACC7": { titre: "18 élèves du lycée des Prés-Verts", decor: "showroom", a: P_ROMAIN, b: P_TOI,
  lignes: [
    "n|Vendredi prochain, 18 élèves de 2nde et 2 professeurs du lycée des Prés-Verts visitent le showroom.",
    "a|Certains pourraient ensuite nous demander un stage. Je te confie la préparation et l'accueil du groupe.",
    "a|Je veux que chaque élève reparte avec une bonne image de LABORO.",
    "fin|À toi : prépare l'accueil du groupe."
  ] },

"ACC8": { titre: "Seul à l'accueil pendant 20 minutes", decor: "showroom", a: P_THOMAS, b: P_TOI,
  lignes: [
    "n|Samedi après-midi au showroom. Ce matin, Romain t'a dit : un bon accueil, c'est s'adapter à chaque personne.",
    "a|Je dois m'absenter 20 minutes. Tu tiens l'accueil seul.",
    "n|Thomas s'éloigne. Les situations commencent à s'enchaîner…",
    "fin|À toi : adapte ton accueil à chaque public."
  ] }

});
