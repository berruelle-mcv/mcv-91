// ================================================
//   LABORO Sport & Outdoor — Compétences & Ressources
//   Référentiel Bac Pro MCV
//   Version 1.0 — Architecture modulaire
// ================================================

const COMP=[
  {code:'C1.1',label:'Veille commerciale',g:'G1'},{code:'C1.2',label:'Vente omnicanale',g:'G1'},{code:'C1.3',label:'Exécution de la vente',g:'G1'},
  {code:'C2.1',label:'Suivi commande & services associés',g:'G2'},{code:'C2.2',label:'Réclamations client',g:'G2'},{code:'C2.3',label:'Satisfaction client',g:'G2'},
  {code:'C3.1',label:'Info & contact client',g:'G3'},{code:'C3.2',label:'Actions de fidélisation',g:'G3'},{code:'C3.3',label:'Évaluation fidélisation',g:'G3'},
  {code:'G4A',label:'Espace commercial (AGEC)',g:'G4A'},{code:'G4B',label:'Prospection & vente B2B (PVOC)',g:'G4B'},
];
const RES={
  'C1.2':{
1:{t:'La découverte des besoins et la vente — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Les fondamentaux — accueil et découverte des besoins</div>
<p><strong>L'accueil professionnel, c'est quoi ?</strong></p>
<p>Quand un client entre chez LABORO, tu es le premier contact de l'entreprise. La façon dont tu l'accueilles crée immédiatement une impression — bonne ou mauvaise.</p>
<p><strong>La formule d'accueil en 3 temps :</strong></p>
<ul>
<li><strong>Saluer</strong> — "Bonjour Madame / Monsieur" (toujours, même si tu es occupé)</li>
<li><strong>Se présenter</strong> — "Je suis [prénom], je suis à votre disposition"</li>
<li><strong>Proposer son aide</strong> — "Puis-je vous aider ?" ou laisser le client regarder et rester disponible</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — bon accueil</div>
Un client entre dans le showroom. Tu es en train de ranger des articles.<br><br>
✅ <strong>Correct :</strong> Tu t'arrêtes, tu souris et tu dis : "Bonjour Monsieur, bienvenue chez LABORO. Je finis dans une seconde et je suis à vous."<br><br>
❌ <strong>À éviter :</strong> Continuer à ranger sans lever la tête, ou dire "C'est pour quoi ?"
</div>
<p><strong>Les questions ouvertes — pourquoi c'est important ?</strong></p>
<p>Pour conseiller un client, tu dois d'abord comprendre ce qu'il cherche. Les <strong>questions ouvertes</strong> t'aident à découvrir ses besoins — elles ne peuvent pas se répondre par oui ou non.</p>
<ul>
<li>❌ Question fermée : "Vous cherchez des chaussures ?" → réponse : oui/non → peu d'info</li>
<li>✅ Question ouverte : "Quel sport pratiquez-vous ?" → réponse développée → beaucoup d'info</li>
</ul>
<p><strong>Les mots qui ouvrent une question :</strong> Qui · Quoi · Comment · Pourquoi · Quand · Où · Quel(le)</p>
<div class="res-ex"><div class="res-ex-l">Exemples de questions ouvertes chez LABORO</div>
• "Quel sport pratiquez-vous en ce moment ?"<br>
• "Comment utiliseriez-vous cet article ?"<br>
• "Quel est votre niveau — débutant, intermédiaire ?"<br>
• "Qu'est-ce qui est important pour vous dans ce type de produit ?"
</div>
</div>
<div class="res-section">
<div class="res-section-label">🔵 Une première fiche CAB — toute simple</div>
<p>Une fois que tu as bien écouté le client, tu dois lui présenter LE produit qui correspond à son besoin. Pour bien présenter un produit, LABORO utilise la méthode <strong>CAB</strong> : Caractéristique → Avantage → Bénéfice.</p>
<ul>
<li><strong>C</strong>aractéristique — ce que le produit EST (une donnée technique, un chiffre du catalogue)</li>
<li><strong>A</strong>vantage — ce que cette caractéristique APPORTE</li>
<li><strong>B</strong>énéfice — ce que le client EN RESSENT, pour lui, concrètement</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple tout fait — chaussures EasyRun</div>
<strong>C</strong>aractéristique : "Cette chaussure a une semelle Contagrip avec des crampons profonds."<br>
<strong>A</strong>vantage : "...donc elle accroche très bien même sur terrain humide."<br>
<strong>B</strong>énéfice : "...vous ne glisserez pas, même sous la pluie."
</div>
<p>Pour t'entraîner sur un autre produit : pars toujours d'une caractéristique du catalogue, puis demande-toi "et donc ?" pour trouver l'avantage, puis "et pour le client, ça veut dire quoi ?" pour trouver le bénéfice.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Accueil = sourire + salutation + disponibilité</li>
<li>Question ouverte = commence par Qui/Quoi/Comment/Pourquoi/Quand/Où/Quel</li>
<li>Toujours découvrir les besoins AVANT de proposer un produit</li>
<li>CAB = Caractéristique (ce que c'est) → Avantage (ce que ça apporte) → Bénéfice (ce que le client en ressent)</li>
</ul>
</div>`},
2:{t:'La découverte des besoins et la vente — Construire un argument',c:`<div class="res-section">
<div class="res-section-label">🟢 Construire un argumentaire de vente convaincant</div>
<p>Le client ne formule pas toujours son besoin clairement : il te donne plusieurs informations, parfois un peu dispersées. C'est à toi de le <strong>faire émerger</strong> et de choisir la question qui t'apportera le plus d'information utile pour orienter ton conseil.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — sélectionner la bonne question</div>
Une cliente dit : "Je cherche une veste, pas trop chère, pour l'automne." Deux questions possibles :<br><br>
① "Vous avez un budget précis ?"<br>
② "Vous comptez l'utiliser pour quel type de sortie — randonnée, ville, les deux ?"<br><br>
La question ② est plus utile ici : elle t'aidera à orienter vers une gamme technique ou plus urbaine, alors que la question ① n'apporte qu'une contrainte sans t'aider à choisir le bon produit.
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="200" rx="12" fill="#F8FAFF"/>
  <text x="340" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">MÉTHODE CAB — Argumenter une vente chez LABORO</text>
  <path d="M 188 100 L 228 100" stroke="#4A6FA5" stroke-width="2" marker-end="url(#arrow2)" fill="none"/>
  <path d="M 408 100 L 448 100" stroke="#4A6FA5" stroke-width="2" marker-end="url(#arrow2)" fill="none"/>
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4A6FA5"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="168" height="90" rx="10" fill="#1A2E4A"/>
  <text x="104" y="88" text-anchor="middle" font-size="28" font-weight="900" fill="#4A9EE8">C</text>
  <text x="104" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CARACTÉRISTIQUE</text>
  <text x="104" y="120" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,.8)">Ce que le produit est</text>
  <text x="104" y="133" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.65)">"Semelle Contagrip..."</text>
  <rect x="240" y="60" width="168" height="90" rx="10" fill="#2D5282"/>
  <text x="324" y="88" text-anchor="middle" font-size="28" font-weight="900" fill="#63B3ED">A</text>
  <text x="324" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">AVANTAGE</text>
  <text x="324" y="120" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,.8)">Ce que ça apporte</text>
  <text x="324" y="133" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.65)">"...donc meilleure adhérence"</text>
  <rect x="460" y="60" width="200" height="90" rx="10" fill="#185FA5"/>
  <text x="560" y="88" text-anchor="middle" font-size="28" font-weight="900" fill="#90CDF4">B</text>
  <text x="560" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">BÉNÉFICE CLIENT</text>
  <text x="560" y="120" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,.8)">Ce que le client ressent</text>
  <text x="560" y="133" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.65)">"...vous ne glisserez plus"</text>
  <rect x="20" y="162" width="640" height="28" rx="6" fill="#EBF4FF"/>
  <text x="340" y="180" text-anchor="middle" font-size="9.5" fill="#1A2E4A">
    <tspan font-weight="700">Exemple LABORO : </tspan>
    <tspan>"Ces chaussures ont une semelle Contagrip (C) — donc une excellente adhérence sur terrain humide (A) — vous pourrez courir sereinement même sous la pluie (B)."</tspan>
  </text>
</svg>
</div>
<p><strong>La méthode CAB — comment construire un argument de vente ?</strong></p>
<ul>
<li><strong>C — Caractéristique</strong> : une donnée objective du produit (matière, poids, technologie, prix…)</li>
<li><strong>A — Avantage</strong> : ce que cette caractéristique permet de faire en général</li>
<li><strong>B — Bénéfice</strong> : ce que ça apporte SPÉCIFIQUEMENT à CE client — c'est la partie la plus importante</li>
</ul>
<p><strong>La formule :</strong> "Ce produit a [C], ce qui permet [A], et donc pour vous qui [besoin], [B]."</p>
<p>C'est à toi d'identifier, parmi les caractéristiques du produit fourni dans le dossier, laquelle est vraiment pertinente pour CE client — ne recopie pas toutes les caractéristiques, choisis celle qui répond à son besoin.</p>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🟢 La méthode SONCASE — comprendre les motivations d'achat</div>
<p>Pour choisir le bon argument, il faut d'abord comprendre <strong>ce qui motive vraiment ce client à acheter</strong>. La méthode SONCASE liste 7 mobiles d'achat possibles :</p>
<ul>
<li><strong>S — Sécurité</strong> : le client veut être rassuré, éviter le risque ("solide", "garantie", "fiable")</li>
<li><strong>O — Orgueil</strong> : il veut se distinguer, être valorisé ("édition limitée", "haut de gamme")</li>
<li><strong>N — Nouveauté</strong> : il aime la dernière technologie, l'innovation ("nouvelle collection")</li>
<li><strong>C — Confort</strong> : il recherche la simplicité, le bien-être ("facile à utiliser", "léger")</li>
<li><strong>A — Argent</strong> : le prix, le rapport qualité/prix, l'économie réalisée</li>
<li><strong>S — Sympathie</strong> : il achète parce qu'il apprécie le vendeur ou la marque</li>
<li><strong>E — Environnement</strong> : il est sensible à l'écologie, au local, au durable ("matériaux recyclés")</li>
</ul>
<p>Chaque client a en général 1 ou 2 mobiles dominants — à toi de les repérer dans ce qu'il dit, pour orienter ton argument CAB sur le bon levier plutôt que d'argumenter au hasard.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — repérer le mobile SONCASE</div>
Une cliente dit : "Je ne veux pas d'un article qui va s'user en 6 mois, j'ai déjà été déçue une fois." → mobile dominant : <strong>Sécurité</strong>. Ton argument doit insister sur la solidité et la garantie du produit, pas sur son prix ou sa nouveauté.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Une question ouverte n'a de valeur que si elle t'aide vraiment à orienter ton conseil</li>
<li>CAB = Caractéristique → Avantage → Bénéfice, toujours relié au besoin exprimé</li>
<li>Sélectionne LA caractéristique pertinente, n'énumère pas tout le catalogue</li>
<li>SONCASE = Sécurité · Orgueil · Nouveauté · Confort · Argent · Sympathie · Environnement — identifie le mobile dominant du client</li>
</ul>
</div>`},
3:{t:'La découverte des besoins et la vente — Situations complexes',c:`<div class="res-section">
<div class="res-section-label">🟠 Gérer les situations de vente complexes</div>
<p>Ici, le client n'a pas un besoin simple et unique. Il exprime souvent <strong>plusieurs critères qui se contredisent en partie</strong> (budget serré mais exigence de qualité, envie d'un produit technique mais méconnaissance du sport, avis contradictoires entre deux personnes qui achètent ensemble…). Ton rôle est d'identifier la priorité réelle du client, pas seulement d'additionner ses demandes.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — besoins contradictoires</div>
Un couple : lui veut "le meilleur modèle, peu importe le prix", elle rappelle "on avait dit budget 150 € max". Tu dois reformuler pour faire émerger la vraie contrainte du foyer, sans braquer l'un ou l'autre : "Je comprends que la performance compte beaucoup — je vais vous montrer ce qui existe autour de 150 €, et si besoin l'option juste au-dessus pour comparer."
</div>
<p><strong>Gérer une objection avec CAB :</strong> quand le client hésite ou objecte ("c'est cher", "je ne suis pas sûr d'en avoir besoin"), reprends ton argument B (bénéfice) en le reformulant à partir de l'objection précise, plutôt que de répéter le même argumentaire.</p>
<p><strong>SONCASE face à des mobiles multiples :</strong> à ce niveau, le client exprime souvent plusieurs mobiles à la fois, parfois contradictoires (ex. Sécurité ET Argent). Il faut alors choisir sur quel mobile appuyer ton argument principal — celui qui semble le plus déterminant dans sa décision — sans ignorer les autres.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — arbitrer entre deux mobiles SONCASE</div>
Un client dit : "Je veux du solide, mais je ne peux pas mettre plus de 100 €." Mobiles présents : Sécurité ET Argent. Tu arbitres : "Ce modèle à 95 € a une garantie 3 ans (Sécurité) — c'est le meilleur compromis solidité/prix de la gamme (Argent)." Tu relies les deux mobiles dans un seul argument plutôt que de choisir l'un contre l'autre.
</div>
<div class="res-ex"><div class="res-ex-l">Exemple — traiter une objection</div>
Client : "70 € pour des chaussures de running, c'est cher pour débuter."<br><br>
Réponse : "Je comprends — c'est justement parce que vous débutez que l'amorti est important : sans un bon amorti, le risque de douleurs aux tendons est réel et ça peut vous décourager. Ce modèle vous permet de démarrer sereinement et de tenir dans la durée."
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ta propre pratique — par exemple : qu'aurais-tu pu faire différemment si le client était resté sur son objection ? Cette question n'est pas un résumé de la mission, c'est un vrai retour critique sur ton choix.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à des besoins contradictoires, cherche la vraie priorité du client — ne les additionne pas</li>
<li>Une objection se traite en reformulant le bénéfice, pas en répétant l'argument</li>
<li>Face à plusieurs mobiles SONCASE, relie-les dans un seul argument plutôt que de choisir</li>
<li>La réflexivité = un vrai retour critique sur ta pratique, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'La découverte des besoins et la vente — Niveau expert',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — vendeur confirmé</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve ou face à un client exigeant, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>Découverte</strong> : questions ouvertes → reformulation → besoin validé par le client lui-même ("si je comprends bien, ce qui compte pour vous c'est…")</li>
<li><strong>Argumentation</strong> : CAB centré sur LE bénéfice décisif, pas un catalogue d'arguments</li>
<li><strong>Objection</strong> : traiter sans se justifier ni céder — reformuler le bénéfice à la lumière de l'objection</li>
<li><strong>Omnicanal</strong> : le parcours client ne s'arrête pas au magasin — un besoin identifié en showroom peut se conclure via le site ou l'appli LABORO (stock, click & collect, service après-vente) ; pense à orienter le client vers le bon canal si le produit n'est pas disponible sur place</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Client pressé, besoin mal défini au départ, produit demandé indisponible en magasin, budget non précisé spontanément. Tu dois, en autonomie complète : cadrer le besoin en 2-3 questions maximum, argumenter sur un produit de substitution disponible ou orienter vers le canal digital, et anticiper une objection probable (délai, prix) avant même qu'elle soit formulée.
</div>
<p><strong>Passer de la vente à la stratégie — l'outil SWOT :</strong> quand la mission te demande de concevoir ou défendre une stratégie commerciale (pas juste une vente), tu dois analyser la situation de LABORO avec l'outil SWOT :</p>
<ul>
<li><strong>S — Forces (Strengths)</strong> : atouts internes de LABORO (ex. commercial dédié, flocage rapide)</li>
<li><strong>W — Faiblesses (Weaknesses)</strong> : points faibles internes (ex. prix parfois plus élevé que Decathlon)</li>
<li><strong>O — Opportunités (Opportunities)</strong> : éléments externes favorables (ex. essor du trail, demande locale en hausse)</li>
<li><strong>T — Menaces (Threats)</strong> : éléments externes défavorables (ex. nouveau concurrent, hausse des coûts transporteur)</li>
</ul>
<p>Une stratégie solide s'appuie sur les forces pour saisir les opportunités, tout en anticipant comment limiter l'effet des faiblesses et des menaces — ce n'est pas une simple liste, c'est un raisonnement croisé.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale sur la méthode — aucune fiche de secours en conditions réelles</li>
<li>Un bénéfice décisif bien choisi vaut mieux que trois arguments dilués</li>
<li>Pense toujours coordination omnicanale : magasin, site, appli</li>
</ul>
</div>`}
},
  'C1.1':{
1:{t:'La veille commerciale — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Comprendre la veille commerciale</div>
<p><strong>La veille commerciale, c'est quoi ?</strong></p>
<p>C'est surveiller régulièrement ce qui se passe autour de toi : tes concurrents, les nouveaux produits, les attentes clients, les tendances du marché. Sans veille, tu découvres les mauvaises nouvelles trop tard — un concurrent a baissé ses prix depuis un mois et tu ne le savais pas.</p>
<p><strong>Les 4 types de veille chez LABORO :</strong></p>
<ul>
<li><strong>Veille concurrentielle</strong> — Surveiller SportRun Évry, Decathlon, Go Sport. Leurs prix, leurs promos, leurs nouveautés.</li>
<li><strong>Veille produit</strong> — Suivre les nouvelles sorties marques (Nike, Salomon, Asics). Catalogues fournisseurs, salons pro.</li>
<li><strong>Veille client</strong> — Écouter les avis Google, les retours en magasin, les questions posées. Comprendre ce qui manque.</li>
<li><strong>Veille réglementaire</strong> — Suivre les changements de loi (garanties, étiquetage, RGPD).</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — veille concurrentielle</div>
Nina Chevalier consulte le site de Decathlon chaque lundi matin. Elle note les nouveautés et les prix. Cette semaine : Decathlon lance un trail shoe à 59€ — LABORO a un équivalent à 79€. Elle prépare 3 arguments pour justifier l'écart de prix auprès des clients.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="170" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">LES 4 TYPES DE VEILLE — LABORO Sport &amp; Outdoor</text>
  <rect x="15" y="38" width="155" height="118" rx="10" fill="#1A2E4A"/>
  <text x="92" y="64" text-anchor="middle" font-size="22">🏁</text>
  <text x="92" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CONCURRENTIELLE</text>
  <text x="92" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">SportRun, Decathlon</text>
  <text x="92" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Go Sport, Intersport</text>
  <text x="92" y="126" text-anchor="middle" font-size="8" fill="#63B3ED">Prix · Promos · Nouveautés</text>
  <text x="92" y="140" text-anchor="middle" font-size="8" fill="#63B3ED">Chaque lundi matin</text>
  <rect x="178" y="38" width="155" height="118" rx="10" fill="#2D5282"/>
  <text x="255" y="64" text-anchor="middle" font-size="22">📦</text>
  <text x="255" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">PRODUIT</text>
  <text x="255" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Nike, Salomon, Asics</text>
  <text x="255" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Nouveaux catalogues</text>
  <text x="255" y="126" text-anchor="middle" font-size="8" fill="#90CDF4">Salons pro · Newsletters</text>
  <text x="255" y="140" text-anchor="middle" font-size="8" fill="#90CDF4">Fournisseurs</text>
  <rect x="341" y="38" width="155" height="118" rx="10" fill="#4A6FA5"/>
  <text x="418" y="64" text-anchor="middle" font-size="22">👥</text>
  <text x="418" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CLIENT</text>
  <text x="418" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Avis Google · Retours</text>
  <text x="418" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Questions en magasin</text>
  <text x="418" y="126" text-anchor="middle" font-size="8" fill="#BEE3F8">NPS · Réclamations</text>
  <text x="418" y="140" text-anchor="middle" font-size="8" fill="#BEE3F8">Tendances besoins</text>
  <rect x="504" y="38" width="161" height="118" rx="10" fill="#185FA5"/>
  <text x="584" y="64" text-anchor="middle" font-size="22">⚖️</text>
  <text x="584" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">RÉGLEMENTAIRE</text>
  <text x="584" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Garanties légales</text>
  <text x="584" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">RGPD · Étiquetage</text>
  <text x="584" y="126" text-anchor="middle" font-size="8" fill="#EBF8FF">Journal officiel</text>
  <text x="584" y="140" text-anchor="middle" font-size="8" fill="#EBF8FF">Fédérations sportives</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 types de veille : concurrentielle · produit · client · réglementaire</li>
<li>Chaque type a ses propres sources — ne confonds pas surveiller un concurrent et écouter un client</li>
<li>La veille sert à agir, pas juste à savoir : chaque info doit déboucher sur quelque chose (un argument, une alerte, un ajustement)</li>
</ul>
</div>`},
2:{t:'La veille commerciale — Organiser sa veille et en tirer un argument',c:`<div class="res-section">
<div class="res-section-label">🟢 Mettre en place un vrai dispositif de veille</div>
<p>À ce niveau, tu ne te contentes plus de repérer une info isolée : tu organises ta veille pour qu'elle soit régulière et exploitable par toute l'équipe.</p>
<p><strong>Sources à utiliser :</strong></p>
<ul>
<li>Sites concurrents + Google Alertes (mot-clé + nom de marque)</li>
<li>Réseaux sociaux des marques (Instagram, LinkedIn fournisseurs)</li>
<li>Newsletters professionnelles (LSA, Sport Stratégies)</li>
<li>Clients eux-mêmes — écoute active en magasin, avis en ligne</li>
</ul>
<p><strong>Fréquence recommandée LABORO :</strong> veille hebdomadaire (30 min/semaine) + compte-rendu mensuel à Romain Sauzet. Une veille qu'on ne partage pas ne sert à personne d'autre que soi.</p>
<p><strong>Indicateurs à suivre :</strong> évolution des prix concurrents, nouveaux produits marché, note Google, tendances des recherches clients.</p>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🟢 Transformer une information de veille en argument de vente</div>
<p>Une veille qui reste dans un tableau ne sert à rien : elle doit se transformer en argument concret face au client. La méthode : identifier l'écart avec le concurrent, puis construire une réponse qui ne dénigre jamais le concurrent par son nom.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — de la veille à l'argument</div>
Nina a repéré que Decathlon vend un trail shoe équivalent 20€ moins cher. Face à un client qui compare : "C'est vrai que certains modèles d'entrée de gamme sont moins chers. Ce modèle-ci a une semelle Contagrip et une garantie 3 ans — sur la durée, c'est vous qui économisez en ne rachetant pas de chaussures tous les ans." Elle ne cite jamais Decathlon par son nom devant le client, elle compare les offres.
</div>
<p><strong>Construire un tableau de veille simple :</strong> pour chaque concurrent suivi, note la date, le prix observé, l'info clé, et l'action à en tirer (rien / en parler à l'équipe / préparer un argument). Un tableau de veille sans colonne "action" n'est qu'une liste de curiosités.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Une veille organisée = régulière (hebdo), tracée (tableau), partagée (compte-rendu)</li>
<li>Chaque ligne de veille doit avoir une action associée, sinon elle ne sert à rien</li>
<li>Une veille se transforme en argument sans jamais dénigrer un concurrent par son nom devant le client</li>
</ul>
</div>`},
3:{t:'La veille commerciale — Arbitrer des signaux contradictoires',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand la veille donne plusieurs signaux en même temps</div>
<p>À ce niveau, tu ne reçois plus une seule information claire : plusieurs signaux arrivent en même temps, parfois contradictoires ou de priorité différente. Ton rôle est de décider lequel traiter en premier, pas de tout traiter à la fois de la même façon.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — deux signaux le même jour</div>
Le même lundi : (1) un client se plaint sur Google que le délai de livraison s'allonge, et (2) Decathlon lance une promo agressive sur les vestes trail, en pleine saison. Tu ne peux pas traiter les deux de la même urgence. Le signal client touche la réputation immédiate de LABORO (à remonter tout de suite au service concerné) ; la promo concurrente touche les ventes à venir (à préparer pour la semaine, pas dans l'heure).
</div>
<p><strong>Prioriser avec deux questions :</strong> "Est-ce que ça touche un client maintenant ?" (urgent) et "Est-ce que ça touche mes ventes des prochaines semaines ?" (important mais pas urgent). Un signal peut être les deux à la fois — c'est celui-là qu'il faut traiter en premier.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — signal à la fois urgent et important</div>
Plusieurs avis Google mentionnent la même rupture de stock sur un article très demandé, ET un concurrent communique justement sur la disponibilité de cet article. Ce signal est prioritaire sur tous les autres : il touche des clients maintenant ET les ventes des prochaines semaines.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton choix de priorité — par exemple : si tu avais traité les deux signaux dans l'autre ordre, qu'est-ce que ça aurait changé concrètement ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta décision d'arbitrage.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à plusieurs signaux, distingue ce qui est urgent (touche un client maintenant) de ce qui est important (touche les ventes à venir)</li>
<li>Un signal à la fois urgent ET important passe toujours en premier</li>
<li>La réflexivité = un vrai retour critique sur ton arbitrage, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'La veille commerciale — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — veille stratégique</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage, et relier ta veille à une décision stratégique plus large.</p>
<ul>
<li><strong>4 types de veille</strong> : concurrentielle · produit · client · réglementaire — chacune a ses sources propres</li>
<li><strong>Chaque info de veille</strong> doit déboucher sur une action (argument client, alerte équipe, ajustement)</li>
<li><strong>Priorisation</strong> : urgent (touche un client maintenant) vs important (touche les ventes à venir) — traiter en premier ce qui est les deux à la fois</li>
<li><strong>Ne jamais dénigrer un concurrent par son nom</strong> devant un client : comparer les offres, pas les entreprises</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Trois informations de veille arrivent le même jour : une baisse de prix concurrente, un avis client négatif répété, et un nouveau produit fournisseur. En autonomie complète, tu dois hiérarchiser les trois, décider laquelle remonter en urgence, et convertir au moins une des trois en argument de vente exploitable immédiatement.
</div>
<p><strong>Relier la veille à la stratégie — nourrir le SWOT :</strong> ta veille alimente directement les colonnes Opportunités et Menaces d'une analyse SWOT (voir C1.2 palier 4) — un concurrent qui baisse ses prix est une menace ; un besoin client mal couvert par le marché est une opportunité. Une veille bien menée transforme une observation en levier stratégique, pas en simple constat.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : repérer, prioriser et exploiter un signal de veille sans guidage</li>
<li>Une veille sans action est une veille inutile</li>
<li>La veille nourrit le SWOT : elle transforme une observation en donnée stratégique (Opportunité ou Menace)</li>
</ul>
</div>`},
},
'C1.3':{
1:{t:"L'exécution de la vente — Les bases",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Les étapes finales d'une vente</div>
<p><strong>La vente ne s'arrête pas au "oui" du client.</strong></p>
<p>Après l'accord, il reste 4 étapes importantes pour finaliser correctement.</p>
<ul>
<li><strong>1. Encaisser</strong> — CB, espèces, chèque. Vérifier le rendu monnaie. Proposer la carte fidélité si pas encore fait.</li>
<li><strong>2. Remettre les documents</strong> — Ticket de caisse obligatoire dès 1€. Bon de garantie si produit technique. Notice si nécessaire.</li>
<li><strong>3. Proposer les services complémentaires</strong> — Livraison, personnalisation, garantie étendue. C'est le dernier moment.</li>
<li><strong>4. Prendre congé</strong> — Remercier, souhaiter bonne utilisation, inviter à revenir. La dernière impression compte autant que la première.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — vente de chaussures trail</div>
M. Kowalski achète des chaussures Salomon à 149€. Avant l'encaissement : "Je vous propose aussi notre garantie étendue 30 jours — c'est gratuit." Pendant : paiement CB, ticket remis, bon de garantie expliqué. Après : "Bonne sortie trail ! N'hésitez pas si vous avez la moindre question."
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#F0FFF4"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">FINALISER UNE VENTE — Les 4 étapes après le "oui"</text>
  <defs>
    <marker id="arr4" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#276749"/>
    </marker>
  </defs>
  <rect x="15" y="38" width="148" height="98" rx="10" fill="#276749"/>
  <text x="89" y="66" text-anchor="middle" font-size="22">💳</text>
  <text x="89" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">1. ENCAISSER</text>
  <text x="89" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">CB · Espèces · Chèque</text>
  <text x="89" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Carte fidélité si pas fait</text>
  <path d="M 165 87 L 180 87" stroke="#276749" stroke-width="2" marker-end="url(#arr4)" fill="none"/>
  <rect x="182" y="38" width="148" height="98" rx="10" fill="#2F855A"/>
  <text x="256" y="66" text-anchor="middle" font-size="22">🧾</text>
  <text x="256" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">2. DOCUMENTS</text>
  <text x="256" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Ticket obligatoire dès 1€</text>
  <text x="256" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Garantie · Notice</text>
  <path d="M 332 87 L 347 87" stroke="#276749" stroke-width="2" marker-end="url(#arr4)" fill="none"/>
  <rect x="349" y="38" width="148" height="98" rx="10" fill="#38A169"/>
  <text x="423" y="66" text-anchor="middle" font-size="22">➕</text>
  <text x="423" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">3. SERVICES +</text>
  <text x="423" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Livraison · Garantie étendue</text>
  <text x="423" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Personnalisation textile</text>
  <path d="M 499 87 L 514 87" stroke="#276749" stroke-width="2" marker-end="url(#arr4)" fill="none"/>
  <rect x="516" y="38" width="149" height="98" rx="10" fill="#48BB78"/>
  <text x="590" y="66" text-anchor="middle" font-size="22">👋</text>
  <text x="590" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">4. PRISE DE CONGÉ</text>
  <text x="590" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Remercier · Inviter</text>
  <text x="590" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">à revenir</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 étapes : encaisser · documents · services complémentaires · prise de congé</li>
<li>Ticket de caisse obligatoire dès 1€</li>
<li>Proposer la carte fidélité ET les services avant l'encaissement</li>
<li>La dernière impression = fidélisation ou perte du client</li>
</ul>
</div>`},
2:{t:"L'exécution de la vente — Optimiser la conclusion",c:`<div class="res-section">
<div class="res-section-label">🟢 Des techniques pour conclure sans forcer</div>
<p>À ce niveau, tu ne te contentes plus d'appliquer les 4 étapes dans l'ordre : tu choisis la bonne formulation pour que le client se sente accompagné jusqu'au bout, jamais pressé.</p>
<p><strong>Techniques de conclusion :</strong></p>
<ul>
<li><strong>Résumé bénéfices</strong> — "Donc vous avez choisi les Salomon X Ultra pour leur amorti et leur légèreté — excellent choix pour le trail humide."</li>
<li><strong>Alternative positive</strong> — "Vous préférez payer en CB ou en espèces ?" (jamais "Vous voulez payer ?" qui laisse la porte ouverte au renoncement)</li>
<li><strong>Urgence factuelle</strong> — "C'est le dernier en taille 43 en stock." (vrai fait, jamais inventé pour forcer la vente)</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — proposer un service sans être insistant</div>
Après l'accord sur une veste à 89€ : "Pour cette veste technique, on propose un traitement déperlant renouvelé, 8€ — ça double sa durée de vie face à la pluie. Je vous le montre rapidement ou vous préférez sans ?" La proposition est justifiée par un bénéfice concret, et le client garde le choix clairement formulé.
</div>
<p><strong>Documents obligatoires :</strong> ticket de caisse (dès 1€) · facture pour les pros · bon de garantie légale 2 ans · bon de livraison si commande.</p>
<p><strong>KPI à suivre :</strong> valeur panier moyen, taux d'ajout service complémentaire, taux de carte fidélité proposée. Un(e) bon(ne) vendeur(se) LABORO regarde ces chiffres, pas seulement le nombre de ventes.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Une alternative positive engage plus qu'une question fermée</li>
<li>Une urgence doit toujours être un fait vérifiable, jamais inventée</li>
<li>Un service complémentaire se propose avec un bénéfice concret, pas comme une case à cocher</li>
</ul>
</div>`},
3:{t:"L'exécution de la vente — Gérer les imprévus de fin de vente",c:`<div class="res-section">
<div class="res-section-label">🟠 Quand la conclusion ne se passe pas comme prévu</div>
<p>À ce niveau, un imprévu survient juste au moment de conclure : le client hésite au dernier moment, revient sur sa décision, ou une contrainte pratique complique l'encaissement. Ton rôle est de sécuriser la vente sans braquer le client, sans jamais le forcer.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — hésitation de dernière minute</div>
Juste avant de payer, le client dit : "Finalement je ne suis pas sûr, c'est peut-être un peu cher." Mauvais réflexe : répéter l'argumentaire depuis le début. Bon réflexe : identifier PRÉCISÉMENT ce qui bloque maintenant — "Qu'est-ce qui vous fait hésiter, le prix ou autre chose ?" — puis répondre à ce point précis, pas à une objection générale.
</div>
<p><strong>Un document manquant ou une contrainte de paiement :</strong> le client n'a pas sa carte de fidélité sur lui, ou veut payer en plusieurs fois sans que ce soit prévu chez LABORO. Tu dois proposer une solution concrète (créer la carte avec son numéro de téléphone, orienter vers les modalités de paiement réellement disponibles) sans jamais promettre ce que LABORO ne peut pas faire.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — contrainte de paiement</div>
Client : "Je peux payer en 3 fois ?" Si LABORO ne propose pas cette option en caisse magasin : "Ce n'est pas possible en magasin, mais je peux vous montrer comment c'est proposé sur notre site pour les achats à partir de 100€ si ça vous intéresse." Tu ne dis jamais simplement "non", tu réorientes vers une solution réelle.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ta gestion de l'imprévu — par exemple : qu'est-ce qui, dans ta façon de conclure la vente initialement, aurait pu éviter cette hésitation de dernière minute ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta pratique.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à une hésitation de dernière minute, identifie le point de blocage précis avant de répondre</li>
<li>Une contrainte que LABORO ne peut pas satisfaire se traite en réorientant vers une solution réelle, jamais par un simple refus</li>
<li>La réflexivité = un vrai retour critique sur ta pratique, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:"L'exécution de la vente — Fiche mémo express",c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — conclure et enchaîner sur la fidélisation</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>4 étapes</strong> : encaisser · documents (ticket obligatoire dès 1€) · services complémentaires · prise de congé</li>
<li><strong>Conclusion</strong> : résumé des bénéfices choisis, alternative positive, jamais d'urgence inventée</li>
<li><strong>Imprévu de dernière minute</strong> : identifier le point de blocage précis avant de répondre, jamais répéter l'argumentaire en entier</li>
<li><strong>Contrainte que LABORO ne peut pas satisfaire</strong> : toujours réorienter vers une solution réelle, jamais un simple refus</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un client conclut son achat, hésite sur le paiement, puis demande un service complémentaire non prévu au catalogue en magasin. En autonomie complète, tu dois sécuriser la vente, traiter l'hésitation, réorienter la demande de service vers une solution réelle, et finir sur une prise de congé qui donne envie de revenir.
</div>
<p><strong>De la vente à la fidélisation :</strong> la dernière impression laissée au client n'est jamais neutre — c'est la première brique de sa fidélisation (voir C3.2, Actions de fidélisation). Une vente bien conclue, avec une carte fidélité proposée et un service complémentaire pertinent, prépare directement le retour du client.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : sécuriser une vente jusqu'au bout, imprévu compris, sans guidage</li>
<li>Jamais de refus sec — toujours une solution réelle en remplacement</li>
<li>La conclusion de vente est le point de départ de la fidélisation, pas une simple formalité</li>
</ul>
</div>`},
},
'C2.1':{
1:{t:'Le suivi de la commande client — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Les modes de livraison LABORO</div>
<p><strong>Chez LABORO, 3 modes de livraison sont proposés aux clients :</strong></p>
<ul>
<li><strong>Retrait en magasin</strong> — disponible sous 24h · Gratuit · Le client vient au showroom d'Évry</li>
<li><strong>Livraison à domicile</strong> — délai 3 à 5 jours ouvrés · Tarif : 4,90€ (offert dès 60€)</li>
<li><strong>Livraison express</strong> — délai 24-48h · Tarif : 9,90€ · Transporteur Chronopost</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — Mme Konaté commande 10 ballons</div>
Mme Konaté passe commande le lundi. Elle a besoin des ballons pour son tournoi vendredi.<br><br>
✅ Conseil : proposer la livraison express (48h) pour être sûr d'avoir les ballons jeudi.<br>
❌ À éviter : proposer la livraison standard (3-5 jours) qui risque d'arriver trop tard.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="160" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">SUIVI COMMANDE — Les 3 modes LABORO</text>
  <rect x="15" y="38" width="205" height="108" rx="10" fill="#1A2E4A"/>
  <text x="117" y="66" text-anchor="middle" font-size="22">📦</text>
  <text x="117" y="83" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">LIVRAISON DOMICILE</text>
  <text x="117" y="99" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Standard 3-5j — 4,90€ (offert dès 60€)</text>
  <text x="117" y="112" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Express 24-48h — 9,90€</text>
  <text x="117" y="128" text-anchor="middle" font-size="8" fill="#63B3ED">Chronopost · Numéro de suivi</text>
  <rect x="228" y="38" width="223" height="108" rx="10" fill="#2D5282"/>
  <text x="340" y="66" text-anchor="middle" font-size="22">🏪</text>
  <text x="340" y="83" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CLICK &amp; COLLECT</text>
  <text x="340" y="99" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Retrait showroom Évry</text>
  <text x="340" y="112" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Disponible sous 2h — Gratuit</text>
  <text x="340" y="128" text-anchor="middle" font-size="8" fill="#90CDF4">Commande en ligne + retrait</text>
  <rect x="459" y="38" width="206" height="108" rx="10" fill="#9B4444"/>
  <text x="562" y="66" text-anchor="middle" font-size="22">⚠️</text>
  <text x="562" y="83" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EN CAS DE RETARD</text>
  <text x="562" y="99" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Prévenir le client AVANT</text>
  <text x="562" y="112" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">qu'il ne contacte LABORO</text>
  <text x="562" y="128" text-anchor="middle" font-size="8" fill="#FCA5A5">SMS · Délai précis · Excuse</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>3 modes : retrait magasin (24h, gratuit) · domicile (3-5j) · express (24-48h)</li>
<li>Toujours choisir le mode adapté à l'urgence réelle du client, pas le moins cher par défaut</li>
<li>Un retard doit être annoncé au client AVANT qu'il ne s'inquiète</li>
</ul>
</div>`},
2:{t:'Le suivi de la commande client — Les 5 étapes du suivi',c:`<div class="res-section">
<div class="res-section-label">🟢 Les 5 étapes d'un suivi de commande rigoureux</div>
<ul><li><strong>Enregistrer</strong> — Tous les détails dans LABORO Connect immédiatement : référence, produit, quantité, délai, mode de livraison, contact client.</li><li><strong>Vérifier la disponibilité</strong> — Si rupture partielle ou totale, contacter le client AVANT qu'il s'inquiète. Proposer une alternative.</li><li><strong>Suivre l'acheminement</strong> — Transmettre le numéro de suivi transporteur par SMS ou mail dès expédition. Chronopost = lien de suivi automatique.</li><li><strong>Anticiper les retards</strong> — C'est la règle d'or LABORO : contacter le client AVANT qu'il appelle. Un retard annoncé proactivement est presque toujours pardonné.</li><li><strong>Confirmer la réception</strong> — Appel ou mail de suivi J+2 = opportunité de fidélisation et de vente additionnelle.</li></ul>
<p><strong>Calculs utiles :</strong></p>
<ul><li>Délai de livraison = date de commande + délai fournisseur + délai transport</li><li>Stock d'alerte = ventes journalières × délai de réassort en jours</li><li>Taux de livraison dans les délais = (livraisons à temps ÷ total livraisons) × 100</li></ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — Commande Mairie d'Évry</div>Commande de 50 ballons Trigon (stock 31 unités). Rupture partielle détectée → appel immédiat à David Chemin → proposition : livraison partielle J+2 + solde J+12. Client satisfait de la transparence.</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Mettre à jour LABORO Connect à chaque étape, pas en fin de journée</li>
<li>Ne jamais attendre qu'un client appelle pour signaler un problème</li>
<li>Un suivi proactif coûte 5 minutes et peut sauver un client</li>
</ul>
</div>`},
3:{t:'Le suivi de la commande client — Arbitrer entre plusieurs commandes',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand plusieurs commandes se disputent le même stock</div>
<p>À ce niveau, la difficulté n'est plus une simple rupture isolée : plusieurs clients ont des besoins qui entrent en concurrence sur un stock limité, avec des urgences différentes. Ton rôle est d'arbitrer, pas seulement d'informer.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — deux commandes, un seul stock</div>
Il reste 20 maillots en stock. Le club A (commande de 15, passée en premier, pas d'urgence signalée) et le club B (commande de 12, passée après, mais tournoi dans 3 jours) sont tous deux en attente. Servir dans l'ordre d'arrivée pénaliserait le club B alors que son besoin est réellement urgent ; tout donner au club B pénaliserait le club A qui a réservé en premier.
</div>
<p><strong>Méthode d'arbitrage :</strong> contacter les deux clients avant de trancher plutôt que de décider seul dans son coin. Proposer une solution qui limite la frustration des deux côtés (livraison partielle immédiate + réassort planifié et confirmé par écrit), et toujours documenter la décision dans LABORO Connect pour que toute l'équipe sache pourquoi ce choix a été fait.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — solution d'arbitrage</div>
Club A : 15 maillots dont 10 disponibles tout de suite + 5 en réassort sous 5 jours (délai qu'il peut tenir, pas d'urgence). Club B : 10 maillots immédiats (suffisant pour l'entraînement de la semaine) + 2 en réassort avant le tournoi. Les deux clients sont prévenus le même jour, avec une date précise et non une promesse vague.</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton arbitrage — par exemple : sur quel critère t'es-tu appuyé pour départager les deux commandes, et cet arbitrage était-il le plus juste possible pour LABORO comme pour les deux clients ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta décision.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à un stock disputé entre plusieurs clients, informe et arbitre — ne laisse jamais le premier arrivé écraser l'autre sans explication</li>
<li>Une solution d'arbitrage se documente toujours (LABORO Connect), pour que l'équipe comprenne le choix fait</li>
<li>La réflexivité = un vrai retour critique sur ton arbitrage, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'Le suivi de la commande client — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter le suivi de commande</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>5 étapes</strong> : enregistrer · vérifier disponibilité · suivre l'acheminement · anticiper les retards · confirmer la réception</li>
<li><strong>Règle d'or</strong> : toujours prévenir le client AVANT qu'il s'inquiète ou qu'il appelle</li>
<li><strong>Stock disputé entre plusieurs commandes</strong> : arbitrer sur des critères objectifs (urgence réelle, ordre d'arrivée), informer les deux parties, documenter la décision</li>
<li><strong>Calculs réflexes</strong> : délai livraison = commande + fournisseur + transport ; stock d'alerte = ventes/jour × délai réassort ; taux de livraison à temps = (livraisons à temps ÷ total) × 100</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Deux commandes concurrentes sur un stock limité, l'une avec un délai serré non signalé au départ. En autonomie complète, tu dois détecter le conflit, arbitrer selon des critères objectifs, prévenir les deux clients avec une date ferme, et tracer la décision.
</div>
<p><strong>Du suivi à la satisfaction client :</strong> un suivi de commande bien mené est l'un des premiers leviers de la satisfaction client (voir C2.3) — un client bien informé, même en cas de retard, reste en confiance ; un client livré sans nouvelle perd confiance même si le colis arrive à temps.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : détecter un conflit de stock, arbitrer, communiquer, tracer — sans guidage</li>
<li>Un client informé proactivement pardonne presque tout ; un client silencieux ne pardonne rien</li>
<li>Le suivi de commande est le socle de la satisfaction client, pas une simple formalité logistique</li>
</ul>
</div>`},
},
'C2.1b':{
1:{t:'Les services associés — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Les services associés LABORO</div>
<p><strong>Un service associé, c'est quoi ?</strong></p>
<p>C'est un service supplémentaire proposé <strong>en plus du produit</strong>. Chez LABORO, 5 services sont disponibles.</p>
<p><strong>Les 5 services LABORO :</strong></p>
<ul>
<li><strong>Livraison à domicile</strong> — Standard 48h (6,90 €) ou express 24h (12,90 €)</li>
<li><strong>Click and collect</strong> — Retrait au showroom Évry sous 2h. Gratuit.</li>
<li><strong>Personnalisation textile</strong> — Flocage/broderie sur maillots et polos. Délai 2-4 semaines. Min. 10 unités.</li>
<li><strong>Démonstration produit</strong> — Essai de 10-15 min pour les produits techniques.</li>
<li><strong>Garantie étendue</strong> — 30 jours échange ou remboursement sans justification.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — Mme Konaté commande 15 maillots</div>
On lui propose : personnalisation textile + livraison à domicile + garantie étendue.<br>
Son panier passe de 420 € à 447 €. Elle est plus satisfaite et reviendra.
</div>
<p><strong>La règle d'or :</strong> proposer les services <strong>pendant</strong> la vente, jamais après l'encaissement.</p>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="155" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">5 SERVICES ASSOCIÉS LABORO — À proposer systématiquement</text>
  <rect x="10" y="36" width="126" height="105" rx="10" fill="#1A2E4A"/>
  <text x="73" y="62" text-anchor="middle" font-size="20">🚚</text>
  <text x="73" y="78" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">LIVRAISON</text>
  <text x="73" y="93" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Standard 48h</text>
  <text x="73" y="105" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">6,90€</text>
  <text x="73" y="118" text-anchor="middle" font-size="8" fill="#63B3ED">Express 24h 12,90€</text>
  <rect x="144" y="36" width="126" height="105" rx="10" fill="#2D5282"/>
  <text x="207" y="62" text-anchor="middle" font-size="20">🏪</text>
  <text x="207" y="78" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">CLICK &amp; COLLECT</text>
  <text x="207" y="93" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Retrait Évry</text>
  <text x="207" y="105" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Sous 2h · Gratuit</text>
  <text x="207" y="118" text-anchor="middle" font-size="8" fill="#90CDF4">Idéal clubs locaux</text>
  <rect x="278" y="36" width="126" height="105" rx="10" fill="#4A6FA5"/>
  <text x="341" y="62" text-anchor="middle" font-size="20">🎽</text>
  <text x="341" y="78" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">PERSONNALISATION</text>
  <text x="341" y="93" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Flocage · Broderie</text>
  <text x="341" y="105" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Min. 10 unités</text>
  <text x="341" y="118" text-anchor="middle" font-size="8" fill="#BEE3F8">Délai 2-4 semaines</text>
  <rect x="412" y="36" width="126" height="105" rx="10" fill="#185FA5"/>
  <text x="475" y="62" text-anchor="middle" font-size="20">🧪</text>
  <text x="475" y="78" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">DÉMONSTRATION</text>
  <text x="475" y="93" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Essai 10-15 min</text>
  <text x="475" y="105" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Produits techniques</text>
  <text x="475" y="118" text-anchor="middle" font-size="8" fill="#EBF8FF">En showroom</text>
  <rect x="546" y="36" width="124" height="105" rx="10" fill="#0C3D6E"/>
  <text x="608" y="62" text-anchor="middle" font-size="20">🛡️</text>
  <text x="608" y="78" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">GARANTIE ÉTENDUE</text>
  <text x="608" y="93" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">30 jours échange</text>
  <text x="608" y="105" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">ou remboursement</text>
  <text x="608" y="118" text-anchor="middle" font-size="8" fill="#93C5FD">Sans justification</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>5 services : livraison · click and collect · personnalisation · démo · garantie</li>
<li>Proposer pendant la vente, pas après l'encaissement</li>
<li>Un service bien choisi augmente le panier ET la satisfaction du client</li>
</ul>
</div>`},
2:{t:'Les services associés — Gérer et chiffrer',c:`<div class="res-section">
<div class="res-section-label">🟢 Gérer les services associés dans la durée</div>
<p><strong>Règles de gestion LABORO :</strong></p>
<ul>
<li>Proposer systématiquement — ne pas attendre que le client demande</li>
<li>Confirmer par écrit tous les engagements (délais, conditions)</li>
<li>Tracer dans LABORO Connect — tout service engagé = LABORO est responsable</li>
<li>Anticiper : vérifier l'avancement avant la date promise</li>
</ul>
<p><strong>Calculs commande textile :</strong></p>
<ul>
<li>HT = prix unitaire × quantité</li>
<li>TTC = HT × 1,20</li>
<li>Remise clubs : 8% (≥10u) · 12% (≥30u) · 15% (≥50u)</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — chiffrer une commande textile</div>
Club de 22 licenciés, maillots à 18€ HT/unité avec flocage. HT = 18 × 22 = 396€. Remise clubs applicable (≥10u) : 8% → 396 × 0,92 = 364,32€ HT. TTC = 364,32 × 1,20 = 437,18€.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un service proposé s'engage par écrit — LABORO en devient responsable</li>
<li>Le calcul d'une commande textile suit toujours le même ordre : HT → remise → TTC</li>
<li>Anticiper l'avancement d'un service évite de découvrir un retard au dernier moment</li>
</ul>
</div>`},
3:{t:'Les services associés — Arbitrer des services incompatibles',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand deux services demandés entrent en conflit</div>
<p>À ce niveau, le client demande plusieurs services à la fois, mais tous ne sont pas compatibles entre eux dans les délais ou les conditions annoncées. Ton rôle est d'identifier le vrai conflit et de proposer un compromis réaliste, pas de tout promettre pour satisfaire le client sur l'instant.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — livraison express + personnalisation, incompatibles</div>
Un club demande une livraison express (24-48h) ET une personnalisation textile (délai 2-4 semaines) pour la même commande. Les deux délais sont incompatibles : la personnalisation ne peut pas être express. Mauvais réflexe : promettre les deux sans vérifier. Bon réflexe : expliquer le vrai délai combiné et proposer une alternative (ex. livrer les maillots non personnalisés en express pour l'entraînement, puis les floqués en différé pour la compétition).
</div>
<p><strong>Vérifier avant de promettre :</strong> chaque service a ses propres contraintes (délai minimum, quantité minimum, disponibilité). Avant d'accepter une combinaison de services, vérifie que chacun est réalisable dans le délai global annoncé au client — ne combine jamais deux promesses sans les avoir confrontées.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — quantité minimum non atteinte</div>
Un client veut une personnalisation textile pour 6 maillots seulement (minimum LABORO : 10 unités). Tu ne peux pas promettre le service tel quel : "La personnalisation démarre à partir de 10 pièces chez LABORO. Je peux vous proposer d'attendre une commande groupée avec un autre client, ou l'appliquer si vous complétez à 10 maillots."</p>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton arbitrage — par exemple : qu'aurais-tu pu vérifier plus tôt dans l'échange pour éviter de devoir revenir sur une promesse ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta pratique.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Avant de combiner deux services, vérifie que leurs contraintes (délai, quantité minimum) sont compatibles</li>
<li>Ne jamais promettre deux services incompatibles pour satisfaire le client sur l'instant — proposer un compromis réaliste</li>
<li>La réflexivité = un vrai retour critique sur ta pratique, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'Les services associés — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter les services associés</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage, en allant jusqu'au chiffrage et au pilotage.</p>
<p><strong>Chiffrer le coût d'un dysfonctionnement (retard, erreur, service mal exécuté) :</strong></p>
<ul>
<li><strong>Coût du temps perdu</strong> = temps passé à gérer le problème × coût horaire moyen d'un collaborateur</li>
<li><strong>+ Coût du geste commercial</strong> = bon d'achat, remise ou remboursement partiel accordé pour compenser</li>
<li><strong>+ Risque de perte du client</strong> = probabilité de non-retour × valeur de son panier annuel moyen</li>
<li><strong>Coût total estimé</strong> = temps perdu + geste commercial + risque de perte du client</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — retard flocage</div>
1h de gestion à 18 €/h = 18 € · Bon d'achat accordé = 30 € · Panier annuel estimé 900 € avec 30% de risque de perte = 270 €. Coût total estimé : 318 €.
</div>
<p><strong>Construire un tableau de bord des services associés (5 indicateurs) :</strong> pour chacun, préciser nom, formule, fréquence, objectif cible et seuil d'alerte.</p>
<ul>
<li><strong>Taux de retard livraison</strong> — (retards / total) × 100 — hebdo — objectif &lt;8% — alerte &gt;12%</li>
<li><strong>Taux d'erreur personnalisation</strong> — (erreurs / total textile) × 100 — mensuel — objectif &lt;5% — alerte &gt;10%</li>
<li><strong>Délai moyen de résolution</strong> — somme des délais / nb incidents — mensuel — objectif &lt;3j — alerte &gt;5j</li>
<li><strong>Coût moyen des erreurs</strong> — gestes commerciaux / nb erreurs — mensuel — objectif &lt;20€ — alerte &gt;40€</li>
<li><strong>Satisfaction services associés</strong> — note moyenne /5 — trimestriel — objectif ≥4/5 — alerte &lt;3,5/5</li>
</ul>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : chiffrer un dysfonctionnement et construire un tableau de bord sans guidage</li>
<li>Un tableau de bord se construit avec 5 éléments par indicateur : nom, formule, fréquence, objectif, seuil d'alerte</li>
<li>Chiffrer un problème permet de décider objectivement s'il faut agir en urgence ou non</li>
</ul>
</div>`},
},
'C2.2':{
1:{t:'Gérer une réclamation client — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Gérer une réclamation simplement</div>
<p><strong>Une réclamation, c'est quoi ?</strong></p>
<p>C'est quand un client exprime son insatisfaction — il n'a pas reçu ce qu'il attendait. Bien gérer une réclamation = transformer un client mécontent en client fidèle.</p>
<p><strong>La méthode ERESA en 5 étapes :</strong></p>
<ul>
<li><strong>E — Écouter</strong> : laisser le client parler sans interrompre</li>
<li><strong>R — Reformuler</strong> : "Si je comprends bien, votre commande..."</li>
<li><strong>E — S'excuser</strong> : "Je suis désolé(e) pour cette situation..."</li>
<li><strong>S — Solution</strong> : proposer une solution concrète</li>
<li><strong>A — Agir et tracer</strong> : appliquer la solution et noter l'incident dans LABORO Connect</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple simple</div>
Client : "Ma commande n'est pas arrivée !" — Vous : "Je comprends, c'est frustrant. Votre commande devait arriver hier. Je vérifie immédiatement et je vous rappelle dans 30 minutes avec une solution."
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="230" rx="12" fill="#FFF8F8"/>
  <text x="340" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#7B2D2D">MÉTHODE ERESA — Gérer une réclamation chez LABORO</text>
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#9B4444"/>
    </marker>
  </defs>
  <rect x="10" y="45" width="116" height="120" rx="10" fill="#7B2D2D"/>
  <text x="68" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FECACA">E</text>
  <text x="68" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">ÉCOUTER</text>
  <text x="68" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Laisser parler</text>
  <text x="68" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">sans interrompre</text>
  <text x="68" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Posture ouverte</text>
  <text x="68" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Regard direct</text>
  <path d="M 128 105 L 143 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  <rect x="145" y="45" width="116" height="120" rx="10" fill="#9B3636"/>
  <text x="203" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FCA5A5">R</text>
  <text x="203" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">REFORMULER</text>
  <text x="203" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Si je comprends</text>
  <text x="203" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">bien..."</text>
  <text x="203" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Valider le problème</text>
  <text x="203" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Montrer qu'on écoute</text>
  <path d="M 263 105 L 278 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  <rect x="280" y="45" width="116" height="120" rx="10" fill="#B45454"/>
  <text x="338" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FCA5A5">E</text>
  <text x="338" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">S'EXCUSER</text>
  <text x="338" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Je suis désolé(e)</text>
  <text x="338" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">pour la situation"</text>
  <text x="338" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Au nom de LABORO</text>
  <text x="338" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Même sans faute directe</text>
  <path d="M 398 105 L 413 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  <rect x="415" y="45" width="116" height="120" rx="10" fill="#C16060"/>
  <text x="473" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FEE2E2">S</text>
  <text x="473" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">SOLUTION</text>
  <text x="473" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Proposer 1 ou 2</text>
  <text x="473" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">options concrètes</text>
  <text x="473" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Délai précis</text>
  <text x="473" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Engagement ferme</text>
  <path d="M 533 105 L 548 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  <rect x="550" y="45" width="120" height="120" rx="10" fill="#D97B7B"/>
  <text x="610" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FFF1F1">A</text>
  <text x="610" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">AGIR ET TRACER</text>
  <text x="610" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Appliquer la solution</text>
  <text x="610" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">et suivre</text>
  <text x="610" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Noter dans LABORO Connect</text>
  <text x="610" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Engagement + date</text>
  <rect x="10" y="178" width="660" height="40" rx="8" fill="#FEE2E2" stroke="#FECACA" stroke-width="1"/>
  <text x="340" y="193" text-anchor="middle" font-size="9" font-weight="700" fill="#7B2D2D">Objectif : transformer un client mécontent en ambassadeur LABORO</text>
  <text x="340" y="210" text-anchor="middle" font-size="8.5" fill="#9B4444">Un client dont la réclamation est bien gérée est plus fidèle qu'un client qui n'a jamais eu de problème.</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>ERESA : Écouter · Reformuler · S'excuser · Solution · Agir et tracer</li>
<li>Toujours écouter en entier avant de proposer quoi que ce soit</li>
<li>S'excuser au nom de LABORO, même sans faute personnelle directe</li>
</ul>
</div>`},
2:{t:'Gérer une réclamation client — Empathie et droits du consommateur',c:`<div class="res-section">
<div class="res-section-label">🟢 Les 5 étapes détaillées et les droits à connaître</div>
<ul><li><strong>E — Écouter</strong> — Sans interrompre, sans se justifier. Le client a besoin d'être entendu avant tout.</li><li><strong>R — Reformuler</strong> — "Si je comprends bien, vous avez reçu un produit endommagé alors que vous en avez besoin pour samedi. C'est bien ça ?"</li><li><strong>E — S'excuser</strong> — Au nom de LABORO, même si c'est la faute du transporteur.</li><li><strong>S — Proposer une Solution</strong> — 3 niveaux de compensation LABORO : échange immédiat / remboursement / bon d'achat compensatoire.</li><li><strong>A — Agir et tracer</strong> — Engagement clair, date, suivi, tout noté dans LABORO Connect.</li></ul>
<p><strong>Droits du consommateur à connaître :</strong></p>
<ul><li>Droit de rétractation : 14 jours pour les achats en ligne (e-commerce uniquement)</li><li>Garantie légale de conformité : 2 ans sur tous les produits (Code de la consommation)</li><li>Garantie commerciale LABORO : 30 jours échange ou remboursement sans justification</li></ul>
<p><strong>Niveaux de geste commercial autorisés chez LABORO :</strong></p>
<ul><li>Conseiller de vente : bon d'achat jusqu'à 20 €</li><li>Responsable : remboursement partiel ou échange</li><li>PDG : geste exceptionnel au-delà</li></ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — Mme Renard</div>Tapis de yoga reçu endommagé. Écouter → reformuler → s'excuser → proposer : échange immédiat en magasin ou remboursement sous 5 jours. Mme Renard choisit l'échange + bon d'achat 10€.</div>
<p><strong>L'empathie — la compétence numéro 1 pour désamorcer une réclamation :</strong></p>
<ul>
<li><strong>Phrases d'empathie efficaces</strong> : "Je comprends tout à fait votre frustration" · "Vous avez eu raison de nous contacter" · "À votre place, j'aurais réagi de la même façon"</li>
<li><strong>Ce qu'il ne faut JAMAIS dire</strong> : "C'est pas de notre faute" (rejette la responsabilité) · "C'est écrit dans les conditions générales" (met le client en tort) · "Calmez-vous" (amplifie l'énervement)</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — réclamation avec empathie</div>
Client : "J'ai commandé il y a 3 semaines, toujours rien reçu. C'est un scandale !" — Bonne réponse : "Je comprends votre mécontentement, attendre 3 semaines sans nouvelles c'est vraiment frustrant. Je vérifie immédiatement et je vous rappelle dans les 30 minutes avec une réponse concrète."
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Garantie légale 2 ans, garantie commerciale LABORO 30 jours, rétractation 14 jours en ligne</li>
<li>Chaque niveau hiérarchique a un plafond de compensation défini</li>
<li>Une phrase d'empathie ne donne pas forcément raison au client, mais reconnaît son ressenti</li>
</ul>
</div>`},
3:{t:'Gérer une réclamation client — Réclamations sensibles',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand la réclamation dépasse le cadre habituel</div>
<p>À ce niveau, la réclamation n'est plus simple à traiter avec la grille habituelle : le client demande une compensation supérieure à ce que tu peux accorder, ou il a en partie tort mais reste légitimement mécontent. Ton rôle est de trouver une solution juste, ni en cédant à tout, ni en refusant sèchement.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — demande de compensation excessive</div>
Un client réclame un remboursement total pour une paire de chaussures légèrement décousue après 3 mois d'usage intensif, alors que la garantie couvre un défaut de fabrication, pas l'usure. Mauvais réflexe : refuser sec "ce n'est pas couvert". Bon réflexe : "Je comprends votre déception. Ce type d'usure après un usage intensif n'entre pas dans la garantie de conformité, mais je peux vous proposer un geste commercial de 15% sur une nouvelle paire, en reconnaissance de votre fidélité."
</div>
<p><strong>Un client en partie responsable :</strong> quand le client a lui-même contribué au problème (mauvais entretien, erreur de commande de sa part), l'empathie reste de mise, mais la solution doit rester proportionnée — accorder un geste commercial n'est pas reconnaître une faute LABORO qui n'existe pas.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — dépasser son plafond de compensation</div>
Un conseiller de vente (plafond 20€) fait face à une réclamation qui mériterait un geste de 50€. Il ne doit ni promettre ce montant seul, ni laisser le client sans réponse : "Je vais transmettre votre dossier à mon responsable qui peut vous proposer un geste plus important — je vous confirme sous 24h maximum." Il ne fait jamais de fausse promesse pour clore l'échange plus vite.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ta décision — par exemple : ta solution était-elle juste à la fois pour le client et pour LABORO, ou as-tu cédé/refusé par facilité ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta pratique.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à une demande excessive, ne refuse jamais sèchement — explique le cadre et propose une alternative proportionnée</li>
<li>Si la solution dépasse ton plafond, transmets avec un engagement de délai — ne promets jamais à la place de ton responsable</li>
<li>La réflexivité = un vrai retour critique sur ta décision, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'Gérer une réclamation client — Concevoir une politique de réclamations',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter la gestion des réclamations</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage, en allant jusqu'au pilotage global.</p>
<p><strong>Les 4 piliers d'une politique réclamations LABORO :</strong></p>
<ul>
<li><strong>Traçabilité</strong> — chaque réclamation enregistrée dans LABORO Connect (date, client, problème, solution, délai)</li>
<li><strong>Délais engagés</strong> — accusé de réception sous 24h, réponse sous 48h max, solution sous 72h</li>
<li><strong>Niveaux de compensation</strong> — geste commercial / remboursement partiel / remplacement / remboursement total selon la gravité</li>
<li><strong>Analyse et prévention</strong> — bilan mensuel, causes récurrentes identifiées, actions correctives décidées en équipe</li>
</ul>
<p><strong>Indicateurs de pilotage :</strong></p>
<ul>
<li>Taux de réclamation = (nb réclamations / nb ventes) × 100 — objectif LABORO &lt; 2%</li>
<li>Délai moyen de traitement = temps total de résolution / nb réclamations</li>
<li>Taux de satisfaction post-réclamation = clients satisfaits après traitement / total</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Bonne pratique LABORO</div>
Chaque mois, Nina Chevalier présente en réunion d'équipe le "Top 3 des réclamations du mois". L'équipe identifie la cause racine et décide d'une action corrective. Résultat : le taux de réclamation a baissé de 3,2% à 1,8% en 6 mois.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : concevoir et piloter une politique de réclamations complète, pas seulement en traiter une</li>
<li>Chaque réclamation est une opportunité d'amélioration, pas juste un incident à clore</li>
<li>Une analyse mensuelle sans action corrective ne sert à rien</li>
</ul>
</div>`},
},
'C2.3':{
1:{t:'Mesurer et analyser la satisfaction client — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Comprendre la satisfaction client</div>
<p><strong>Pourquoi mesurer la satisfaction ?</strong></p>
<p>Un client satisfait revient et recommande LABORO. Un client insatisfait part et en parle autour de lui. Mesurer la satisfaction permet de s'améliorer avant qu'il soit trop tard.</p>
<p><strong>Les 2 indicateurs à connaître :</strong></p>
<ul>
<li><strong>Taux de satisfaction</strong> = (clients satisfaits + très satisfaits) / total répondants x 100<br><em>Objectif LABORO : 80% minimum</em></li>
<li><strong>NPS (Net Promoter Score)</strong> — on demande au client : de 0 à 10, recommanderiez-vous LABORO ?<br>— Notes 9-10 = Promoteurs (ils recommandent)<br>— Notes 7-8 = Neutres<br>— Notes 0-6 = Détracteurs (ils critiquent)<br><em>NPS = % Promoteurs − % Détracteurs. Un NPS positif est bon.</em></li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO</div>
Sur 50 réponses : 30 très satisfaits + 15 satisfaits + 5 insatisfaits.<br>
Taux = (30+15)/50 x 100 = <strong>90%</strong><br>
NPS : 20 Promoteurs, 5 Détracteurs = 40% - 10% = <strong>+30</strong>
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="170" rx="12" fill="#FFFBEB"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">LE NPS — Mesurer la satisfaction client LABORO</text>
  <text x="340" y="48" text-anchor="middle" font-size="10" fill="#4A5568">"Recommanderiez-vous LABORO à un ami ?" — Note de 0 à 10</text>
  <rect x="15" y="58" width="220" height="70" rx="8" fill="#FEE2E2"/>
  <text x="125" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#9B1C1C">😤 DÉTRACTEURS</text>
  <text x="125" y="96" text-anchor="middle" font-size="22" font-weight="900" fill="#EF4444">0 → 6</text>
  <text x="125" y="116" text-anchor="middle" font-size="9" fill="#9B1C1C">Insatisfaits — risque de mauvais avis</text>
  <rect x="243" y="58" width="193" height="70" rx="8" fill="#FEF9C3"/>
  <text x="339" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#854D0E">😐 PASSIFS</text>
  <text x="339" y="96" text-anchor="middle" font-size="22" font-weight="900" fill="#D97706">7 → 8</text>
  <text x="339" y="116" text-anchor="middle" font-size="9" fill="#854D0E">Neutres — pas de recommandation</text>
  <rect x="444" y="58" width="221" height="70" rx="8" fill="#D1FAE5"/>
  <text x="554" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#065F46">😍 PROMOTEURS</text>
  <text x="554" y="96" text-anchor="middle" font-size="22" font-weight="900" fill="#10B981">9 → 10</text>
  <text x="554" y="116" text-anchor="middle" font-size="9" fill="#065F46">Ambassadeurs — bouche-à-oreille</text>
  <rect x="15" y="138" width="650" height="24" rx="6" fill="#EBF4FF"/>
  <text x="340" y="154" text-anchor="middle" font-size="9.5" fill="#1A2E4A">
    <tspan font-weight="700">NPS = </tspan>
    <tspan>% Promoteurs − % Détracteurs  ·  </tspan>
    <tspan font-weight="700">Objectif LABORO : NPS &gt; +20  ·  </tspan>
    <tspan>Score actuel : +22 ✅</tspan>
  </text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Taux de satisfaction = satisfaits ÷ répondants × 100 — objectif LABORO ≥ 80%</li>
<li>NPS = % Promoteurs − % Détracteurs — objectif LABORO &gt; +20</li>
<li>Mesurer permet d'agir avant qu'un client insatisfait ne parte définitivement</li>
</ul>
</div>`},
2:{t:'Mesurer et analyser la satisfaction client — Collecter et calculer',c:`<div class="res-section">
<div class="res-section-label">🟢 3 indicateurs et comment collecter les avis</div>
<p><strong>3 indicateurs clés à maîtriser :</strong></p><ul><li><strong>Taux de satisfaction</strong> = (clients satisfaits + très satisfaits) ÷ total répondants × 100. Objectif LABORO : ≥ 80%.</li><li><strong>NPS</strong> = % Promoteurs (9-10) − % Détracteurs (0-6). Les neutres (7-8) ne comptent pas.</li><li><strong>Taux de réponse</strong> = répondants ÷ clients interrogés × 100. Taux &lt; 20% = résultats non représentatifs.</li></ul>
<p><strong>Comment collecter les avis :</strong></p><ul><li>Enquête post-achat par e-mail (J+7 après livraison)</li><li>Avis Google — répondre à TOUS les avis, positifs et négatifs</li><li>Questionnaire en point de vente (tablette ou QR code)</li><li>Appel de satisfaction pour les clients B2B stratégiques</li></ul>
<div class="res-ex"><div class="res-ex-l">Calcul complet — données LABORO</div>118 répondants : 52 très satisfaits + 37 satisfaits = 89 satisfaits. Taux = 89÷118×100 = <strong>75,4%</strong> (objectif 80% non atteint).<br>NPS : 44 promoteurs (37%) − 11 détracteurs (9%) = <strong>+28</strong> — bon score.<br>Action prioritaire : délais e-commerce (38% des insatisfaits) → négociation avec Chronopost.</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un taux de réponse trop bas rend le résultat non fiable, quel que soit le score obtenu</li>
<li>Un taux de satisfaction n'a de sens qu'avec une action corrective derrière</li>
<li>Diversifier les canaux de collecte (mail, avis Google, magasin) donne une vision plus complète</li>
</ul>
</div>`},
3:{t:'Mesurer et analyser la satisfaction client — Signaux contradictoires',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand les indicateurs racontent des histoires différentes</div>
<p>À ce niveau, tu ne reçois plus un seul chiffre clair : le NPS peut être bon alors que le taux de satisfaction est décevant, ou l'inverse. Ton rôle est de comprendre pourquoi les indicateurs divergent avant de conclure trop vite.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — NPS bon, taux de satisfaction décevant</div>
NPS = +28 (bon score) mais taux de satisfaction = 75,4% (sous l'objectif de 80%). Comment expliquer ce grand écart ? Le NPS mesure la recommandation future (l'image globale de LABORO), le taux de satisfaction mesure le vécu réel de LA dernière expérience. Un client peut rester fidèle à la marque (bon NPS) tout en étant déçu d'un achat précis (mauvaise note satisfaction) — les deux ne mesurent pas exactement la même chose.
</div>
<p><strong>Croiser les indicateurs avec les verbatims :</strong> quand un chiffre surprend, il faut aller chercher l'explication dans les commentaires libres des clients (verbatims) plutôt que de se contenter du chiffre seul. Un chiffre isolé peut induire en erreur ; un chiffre expliqué par des verbatims devient exploitable.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — expliquer l'écart par les verbatims</div>
En lisant les commentaires liés aux notes basses de satisfaction, on découvre que 38% des insatisfaits mentionnent le même problème : les délais e-commerce. Le NPS reste bon car le produit et le conseil restent appréciés — seul un point précis (la livraison) tire le taux de satisfaction vers le bas. La priorité d'action devient claire : ce n'est pas toute l'expérience LABORO qui est en cause, mais un maillon logistique précis.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton interprétation — par exemple : qu'aurais-tu risqué de conclure à tort si tu n'avais regardé que le NPS, ou que le taux de satisfaction, séparément ? Ce n'est pas un résumé des chiffres, c'est un vrai retour critique sur ta méthode d'analyse.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>NPS et taux de satisfaction ne mesurent pas exactement la même chose — un écart entre les deux n'est pas une erreur, c'est une info à creuser</li>
<li>Un chiffre qui surprend s'explique en croisant avec les verbatims, jamais en l'ignorant</li>
<li>La réflexivité = un vrai retour critique sur ta méthode d'analyse, pas un résumé des chiffres</li>
</ul>
</div>`},
4:{t:'Mesurer et analyser la satisfaction client — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — analyser les verbatims et piloter</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage, jusqu'à l'analyse qualitative.</p>
<p><strong>Analyser les verbatims clients :</strong> un verbatim est une réponse textuelle libre d'un client dans une enquête ("En quelques mots, comment décririez-vous votre expérience ?") — c'est la donnée la plus riche car elle révèle les vrais motifs de satisfaction ou d'insatisfaction.</p>
<ul>
<li><strong>Méthode d'analyse</strong> : regrouper les verbatims par thème (livraison, prix, conseil, accueil, produit) · compter les occurrences · identifier les 2-3 sujets les plus cités</li>
<li><strong>Verbatim positif</strong> → identifier ce qui crée de la valeur et l'amplifier</li>
<li><strong>Verbatim négatif</strong> → identifier le problème précis, prioriser les corrections sur le sujet le plus cité, pas sur le plus récent</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — analyse verbatims rayon running</div>
24 avis Google analysés · Note moyenne : 3,8/5<br><br>
<strong>Négatifs récurrents :</strong> "Pas assez de choix en tailles" (8 mentions) · "Délai de commande trop long" (5) · "Prix élevés" (4)<br>
<strong>Positifs récurrents :</strong> "Conseiller très compétent" (11) · "Bonne ambiance en magasin" (7)<br><br>
<strong>Action prioritaire</strong> : élargir les tailles disponibles → s'adresse au problème le plus cité (8/24 = 33% des avis), pas au plus facile à corriger.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : croiser indicateurs chiffrés et verbatims, prioriser l'action sur le sujet le plus cité</li>
<li>Les insatisfaits sont plus précieux que les satisfaits — ils disent ce qu'il faut corriger</li>
<li>Comparer les résultats dans le temps est plus utile qu'un résultat isolé</li>
</ul>
</div>`},
},
'C3.1':{
1:{t:"Traiter l'information et le contact client — Les bases",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Informer et communiquer avec les clients</div>
<p><strong>La règle d'or LABORO :</strong> répondre à tout contact client en moins de 24h.</p>
<p><strong>Les 3 canaux de communication LABORO :</strong></p>
<ul>
<li><strong>Email</strong> — Réponse pro, objet clair, signature complète. Délai max 24h.</li>
<li><strong>Téléphone</strong> — Décrocher avant la 3e sonnerie. Se présenter : "LABORO bonjour, [prénom]."</li>
<li><strong>En magasin</strong> — Accueillir sous 30 secondes. Sourire visible, regard, disponibilité.</li>
</ul>
<p><strong>Structure d'un email professionnel :</strong></p>
<ul>
<li>Objet : court et précis ("Votre commande n°1234 — confirmation")</li>
<li>Formule d'appel : "Bonjour M./Mme [nom],"</li>
<li>Corps : 3-4 lignes max, une idée par paragraphe</li>
<li>Signature : prénom, poste, LABORO, téléphone</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — réponse email client</div>
Objet : "Votre commande n°2847 — livraison jeudi"<br>
"Bonjour Mme Laurent, votre commande de chaussures Asics est bien enregistrée. Livraison prévue jeudi 16 entre 9h et 13h par Chronopost. Cordialement, Sophie — LABORO 01 XX XX XX XX"
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="155" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">COMMUNICATION CLIENT — Les 3 canaux LABORO · Règle des 24h</text>
  <rect x="15" y="38" width="202" height="105" rx="10" fill="#1A2E4A"/>
  <text x="116" y="64" text-anchor="middle" font-size="22">📧</text>
  <text x="116" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EMAIL</text>
  <text x="116" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Objet court · Corps 3-4 lignes</text>
  <text x="116" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Signature complète</text>
  <text x="116" y="126" text-anchor="middle" font-size="8" fill="#63B3ED">Réponse &lt; 24h · Toujours</text>
  <rect x="225" y="38" width="230" height="105" rx="10" fill="#2D5282"/>
  <text x="340" y="64" text-anchor="middle" font-size="22">📞</text>
  <text x="340" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">TÉLÉPHONE</text>
  <text x="340" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"LABORO bonjour, [prénom]"</text>
  <text x="340" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Avant la 3e sonnerie</text>
  <text x="340" y="126" text-anchor="middle" font-size="8" fill="#90CDF4">Sourire — ça s'entend !</text>
  <rect x="463" y="38" width="202" height="105" rx="10" fill="#4A6FA5"/>
  <text x="564" y="64" text-anchor="middle" font-size="22">🏪</text>
  <text x="564" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EN MAGASIN</text>
  <text x="564" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Accueil sous 30 sec</text>
  <text x="564" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Regard · Sourire · Dispo</text>
  <text x="564" y="126" text-anchor="middle" font-size="8" fill="#BEE3F8">Jamais ignorer un client</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Réponse à tout contact en moins de 24h — règle absolue LABORO</li>
<li>Email : objet clair · 3-4 lignes · signature complète</li>
<li>Téléphone : décrocher avant la 3e sonnerie · se présenter</li>
</ul>
</div>`},
2:{t:"Traiter l'information et le contact client — Personnaliser et suivre",c:`<div class="res-section">
<div class="res-section-label">🟢 Développer la relation client multicanale</div>
<p><strong>Personnaliser la communication :</strong></p>
<ul><li>Utiliser le nom du client dans tous les échanges</li><li>Adapter le registre : formel avec les pros, chaleureux avec les particuliers</li><li>Mémoriser les préférences dans LABORO Connect (sport pratiqué, pointure, historique)</li></ul>
<p><strong>Gérer les situations délicates :</strong></p>
<ul><li>Client mécontent au téléphone : écouter, ne pas interrompre, reformuler, proposer une solution</li><li>Client absent lors d'une livraison : laisser un message clair, rappeler dans la journée</li><li>Demande hors compétence : orienter vers le bon interlocuteur, ne jamais laisser sans réponse</li></ul>
<p><strong>Construire un tableau de bord de suivi des contacts :</strong></p>
<ul><li>Choisir des indicateurs simples : nom · formule de calcul · objectif cible · fréquence de mise à jour</li><li>Exemples utiles : délai moyen de réponse par canal · taux de contacts non traités · volume de contacts/semaine</li><li>Un bon tableau de bord se lit en moins de 30 secondes</li></ul>
<div class="res-ex"><div class="res-ex-l">Exemple — personnaliser un échange</div>
Plutôt que "Bonjour, votre commande est en cours" : "Bonjour M. Renard, votre paire de chaussures trail est bien en cours de préparation — vous devriez la recevoir jeudi, comme prévu pour votre sortie du week-end."
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Personnaliser = nom du client + détail de sa situation, pas juste une formule polie</li>
<li>Une demande hors compétence s'oriente vers le bon interlocuteur, elle ne reste jamais sans réponse</li>
<li>Un tableau de bord utile est court et lisible en 30 secondes</li>
</ul>
</div>`},
3:{t:"Traiter l'information et le contact client — Prioriser sous contrainte",c:`<div class="res-section">
<div class="res-section-label">🟠 Quand plusieurs contacts demandent une réponse en même temps</div>
<p>À ce niveau, tu ne traites plus un contact isolé : plusieurs demandes arrivent en même temps et tu ne peux pas toutes les traiter dans l'instant avec le même soin. Ton rôle est de prioriser selon des critères objectifs, pas selon l'ordre d'arrivée ou la facilité.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — trois contacts, un temps limité</div>
En fin de journée : un email de réclamation reçu ce matin (délai de réponse LABORO : 24h, encore de la marge), un appel manqué d'un client B2B stratégique (jamais rappelé depuis 2 jours), et un client en magasin qui attend. Le client en magasin passe avant tout (présence physique immédiate) ; le rappel B2B en retard passe avant l'email qui a encore de la marge, car le délai LABORO est déjà dépassé pour lui.
</div>
<p><strong>Segmenter pour prioriser :</strong> tous les clients ne demandent pas le même traitement — à relancer en priorité (fort potentiel ou contact resté sans réponse), à entretenir (client actif satisfait), à réactiver (client dormant). Cette segmentation doit guider l'ordre de traitement quand le temps manque, pas seulement une organisation théorique.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — segmenter un fichier clients LABORO</div>
Isabelle Morin (8 mois sans achat, abonnée newsletter) → à réactiver, par mail avec une offre trail. Thomas Renard (achat il y a 3 semaines) → à entretenir, pas d'action urgente. Sophie Aubert (14 mois sans achat, non abonnée) → à réactiver en priorité, par téléphone puisque le mail ne suffira pas.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton choix de priorité — par exemple : sur quel critère t'es-tu appuyé, et un collègue avec un autre critère aurait-il fait le même choix ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ton arbitrage.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à plusieurs contacts, priorise sur des critères objectifs (délai déjà dépassé, présence physique, enjeu client), pas sur l'ordre d'arrivée</li>
<li>La segmentation (à relancer / entretenir / réactiver) sert à décider vite quand le temps manque</li>
<li>La réflexivité = un vrai retour critique sur ton arbitrage, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:"Traiter l'information et le contact client — Fiche mémo express",c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter la relation contact client</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>Règle des 24h</strong> : aucun contact ne reste sans réponse au-delà</li>
<li><strong>3 canaux</strong> : email (structuré, signé), téléphone (avant la 3e sonnerie), magasin (sous 30 secondes)</li>
<li><strong>Segmentation</strong> : à relancer en priorité · à entretenir · à réactiver — sert à arbitrer quand plusieurs contacts arrivent en même temps</li>
<li><strong>Priorisation sous contrainte</strong> : délai déjà dépassé et présence physique passent avant une marge encore disponible</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Trois contacts en attente simultanée avec des enjeux différents (client B2B stratégique, réclamation dans les temps, client en magasin). En autonomie complète, tu dois établir l'ordre de traitement, le justifier, et ne laisser personne totalement sans réponse.
</div>
<p><strong>Du contact à la fidélisation :</strong> une segmentation bien tenue du fichier clients est la base de toute action de fidélisation (voir C3.2) — sans contact traité et qualifié correctement, aucune campagne de fidélisation ne peut cibler juste.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : prioriser plusieurs contacts simultanés sur des critères objectifs, sans guidage</li>
<li>Un contact bien qualifié aujourd'hui prépare la fidélisation de demain</li>
<li>Ne jamais laisser un contact totalement sans réponse, même en priorité basse</li>
</ul>
</div>`},
},
'C3.2':{
1:{t:'Les actions de fidélisation client — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Les outils de fidélisation</div>
<p><strong>Fidéliser = donner envie de revenir.</strong> Un client fidèle coûte 5 à 7× moins cher à conserver qu'à en trouver un nouveau.</p>
<p><strong>Les 4 actions de fidélisation LABORO :</strong></p>
<ul>
<li><strong>Carte LABORO PRO</strong> — 1€ = 1 point. 100 points = 10€ de remise. À proposer dès le 1er achat.</li>
<li><strong>Newsletter mensuelle</strong> — Actualités, promos, conseils sport. Envoyée le 1er lundi du mois.</li>
<li><strong>Événements clients</strong> — Soirées test, sessions sport, avant-premières produits.</li>
<li><strong>Programme Club Sport</strong> — Pour les associations : remises automatiques, interlocuteur dédié.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — fidélisation client</div>
Mme Torres achète pour 89€. À la caisse : "Vous avez une carte LABORO PRO ? Non ? Je vous la fais tout de suite — vous gagnez déjà 89 points aujourd'hui." Elle reviendra : elle a un compte, elle veut utiliser ses points.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="180" rx="12" fill="#FFFBEB"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">CYCLE DE VIE CLIENT LABORO</text>
  <defs>
    <marker id="arr3" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#D97706"/>
    </marker>
  </defs>
  <circle cx="60" cy="100" r="42" fill="#1A2E4A"/>
  <text x="60" y="93" text-anchor="middle" font-size="18">🔍</text>
  <text x="60" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">PROSPECT</text>
  <text x="60" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">Inconnu</text>
  <path d="M 103 100 L 143 100" stroke="#D97706" stroke-width="2" marker-end="url(#arr3)" fill="none"/>
  <text x="123" y="93" text-anchor="middle" font-size="7.5" fill="#D97706">1er contact</text>
  <circle cx="185" cy="100" r="42" fill="#2D5282"/>
  <text x="185" y="93" text-anchor="middle" font-size="18">🛒</text>
  <text x="185" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">1er ACHAT</text>
  <text x="185" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">Nouveau client</text>
  <path d="M 228 100 L 268 100" stroke="#D97706" stroke-width="2" marker-end="url(#arr3)" fill="none"/>
  <text x="248" y="93" text-anchor="middle" font-size="7.5" fill="#D97706">Suivi + carte PRO</text>
  <circle cx="310" cy="100" r="42" fill="#4A6FA5"/>
  <text x="310" y="93" text-anchor="middle" font-size="18">⭐</text>
  <text x="310" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RÉGULIER</text>
  <text x="310" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">>2 achats/an</text>
  <path d="M 353 100 L 393 100" stroke="#D97706" stroke-width="2" marker-end="url(#arr3)" fill="none"/>
  <text x="373" y="93" text-anchor="middle" font-size="7.5" fill="#D97706">Événements + avantages</text>
  <circle cx="435" cy="100" r="42" fill="#185FA5"/>
  <text x="435" y="93" text-anchor="middle" font-size="18">💎</text>
  <text x="435" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">AMBASSADEUR</text>
  <text x="435" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">Recommande LABORO</text>
  <path d="M 310 142 Q 310 165 185 142" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr3)" fill="none"/>
  <text x="248" y="168" text-anchor="middle" font-size="7.5" fill="#EF4444">Risque attrition si pas de suivi</text>
  <rect x="510" y="60" width="158" height="80" rx="8" fill="#FEF3C7" stroke="#FDE68A"/>
  <text x="589" y="82" text-anchor="middle" font-size="9" font-weight="700" fill="#92400E">CLV LABORO (B2C)</text>
  <text x="589" y="98" text-anchor="middle" font-size="9" fill="#92400E">Panier moyen : 87€</text>
  <text x="589" y="112" text-anchor="middle" font-size="9" fill="#92400E">Fréquence : 3×/an</text>
  <text x="589" y="126" text-anchor="middle" font-size="11" font-weight="900" fill="#D97706">= 1 305€/3 ans</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 outils : carte PRO · newsletter · événements · club sport</li>
<li>Proposer la carte PRO dès le 1er achat — systématiquement</li>
<li>Fidéliser coûte 5 à 7× moins cher que conquérir un nouveau client</li>
</ul>
</div>`},
2:{t:'Les actions de fidélisation client — Piloter et segmenter',c:`<div class="res-section">
<div class="res-section-label">🟢 Piloter la fidélisation avec des indicateurs</div>
<p><strong>Indicateurs de fidélisation :</strong></p>
<ul>
<li><strong>Taux de rétention</strong> = clients ayant acheté ≥2 fois ÷ clients totaux × 100. Objectif : >60%</li>
<li><strong>NPS</strong> = % promoteurs − % détracteurs. Objectif LABORO : >+20</li>
<li><strong>Fréquence d'achat</strong> = nombre d'achats moyen par client sur 12 mois</li>
</ul>
<p><strong>Segmentation clients :</strong> clients actifs (achat &lt;6 mois) · clients dormants (6-18 mois) · clients perdus (&gt;18 mois). Actions différentes selon segment.</p>
<p><strong>La vente au rebond :</strong> c'est saisir une opportunité commerciale qui se présente de façon inattendue, au détour d'un autre échange — sans que ce soit l'objet initial du contact.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — vente au rebond LABORO</div>
Pendant la soirée Rentrée Sportive, le directeur du Club Sportif Sénart discute maillots floqués avec Nina et laisse échapper : "En fait il nous faudrait aussi de nouveaux ballons pour la rentrée." Nina rebondit aussitôt : "On peut justement vous faire une offre groupée maillots + ballons avec une remise club — je vous envoie un devis dès demain ?"
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Taux de rétention cible LABORO : &gt;60% · NPS cible : &gt;+20</li>
<li>Un client dormant (6-18 mois) n'a pas les mêmes besoins qu'un client actif — l'action doit être adaptée</li>
<li>Vente au rebond : saisir une opportunité imprévue sans forcer, tout de suite</li>
</ul>
</div>`},
3:{t:'Les actions de fidélisation client — Choisir la bonne action',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand les signaux du client se contredisent</div>
<p>À ce niveau, la segmentation simple (actif/dormant/perdu) ne suffit plus toujours : un client peut techniquement paraître dormant selon la fréquence, tout en montrant des signaux positifs qui changent l'action à mener. Ton rôle est de croiser les signaux avant de choisir l'action de fidélisation.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — client "dormant" mais pas vraiment</div>
Un client n'a pas acheté depuis 8 mois (statistiquement "dormant"), mais son dernier panier était le plus gros de son historique (300€, contre 80€ en moyenne avant), suite à un achat de matériel durable (une paire de chaussures trail haut de gamme). Le traiter comme un client perdu classique (relance générique) serait une erreur : le produit acheté explique l'absence (il n'a simplement pas eu besoin de revenir), ce n'est pas un désintérêt.
</div>
<p><strong>Choisir l'action selon la cause probable, pas seulement selon la date :</strong> avant de lancer une action de réactivation générique, il faut se demander pourquoi le client n'est pas revenu — produit durable acheté, déménagement, mécontentement non signalé, simple oubli. Chaque cause appelle une action différente.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — deux clients dormants, deux actions différentes</div>
Client A (dernier achat : consommable sportif classique, panier moyen) → probablement un oubli ou une baisse d'intérêt : relance avec une offre découverte nouveauté. Client B (dernier achat : équipement technique durable, gros panier) → probablement pas encore besoin de racheter : plutôt une action de lien (newsletter, invitation événement) qu'une offre commerciale insistante.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton choix — par exemple : qu'est-ce qui aurait pu t'induire en erreur si tu t'étais fié uniquement à la date du dernier achat ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta méthode de segmentation.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Une segmentation par date seule peut induire en erreur — croise-la toujours avec le type de produit acheté</li>
<li>Chaque cause probable d'inactivité appelle une action de fidélisation différente</li>
<li>La réflexivité = un vrai retour critique sur ta méthode, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'Les actions de fidélisation client — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter une stratégie de fidélisation</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>4 outils</strong> : carte PRO · newsletter · événements · club sport</li>
<li><strong>Indicateurs</strong> : taux de rétention (&gt;60%) · NPS (&gt;+20) · fréquence d'achat</li>
<li><strong>Segmentation</strong> : actif / dormant / perdu — mais toujours croisée avec le type de produit acheté, jamais la date seule</li>
<li><strong>Vente au rebond</strong> : saisir une opportunité imprévue, tout de suite, sans forcer</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un client "dormant" selon les chiffres, mais dont l'historique révèle une explication plausible autre que le désintérêt. En autonomie complète, tu dois choisir l'action de fidélisation la plus pertinente et justifier pourquoi une relance générique serait une erreur ici.
</div>
<p><strong>De la fidélisation à l'évaluation :</strong> une action de fidélisation ne vaut que si elle est évaluée après coup (voir C3.3) — sans mesure du résultat, impossible de savoir si l'action a vraiment fonctionné ou si le client serait revenu de toute façon.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : choisir une action de fidélisation adaptée à la vraie situation du client, pas au segment théorique</li>
<li>Une action de fidélisation non évaluée est une action dont on ne sait jamais si elle a fonctionné</li>
</ul>
</div>`},
},
'C3.3':{
1:{t:'Évaluer les actions de fidélisation — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Pourquoi évaluer une action de fidélisation</div>
<p><strong>Proposer une carte PRO, une newsletter ou un événement client (voir C3.2) ne suffit pas</strong> : il faut ensuite vérifier si l'action a vraiment donné envie au client de revenir. Sans évaluation, impossible de savoir si une action mérite d'être reconduite ou arrêtée.</p>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — M. Ferreira</div>
M. Ferreira achète régulièrement. Grâce à sa carte LABORO PRO, il a accumulé 240 points = 24€ de réduction sur sa prochaine commande. Il a aussi été invité à la soirée test chaussures de trail. Résultat : il est client depuis 3 ans et recommande LABORO à son club — la carte PRO et la soirée ont visiblement fonctionné sur lui.
</div>
<p><strong>Un premier indicateur simple : le taux de rétention.</strong> Il mesure combien de clients reviennent acheter une seconde fois.</p>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="160" rx="12" fill="#FFFBEB"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">4 INDICATEURS DE FIDÉLISATION — Objectifs LABORO</text>
  <rect x="10" y="36" width="155" height="110" rx="10" fill="#276749"/>
  <text x="87" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX DE RÉTENTION</text>
  <text x="87" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#9AE6B4">&gt;60%</text>
  <text x="87" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Clients ≥2 achats</text>
  <text x="87" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">÷ clients période préc.</text>
  <text x="87" y="128" text-anchor="middle" font-size="7.5" fill="#9AE6B4">Actuel LABORO : 74% ✅</text>
  <rect x="173" y="36" width="155" height="110" rx="10" fill="#9B4444"/>
  <text x="250" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX D'ATTRITION</text>
  <text x="250" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#FECACA">&lt;20%</text>
  <text x="250" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">100 − taux rétention</text>
  <text x="250" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Clients perdus</text>
  <text x="250" y="128" text-anchor="middle" font-size="7.5" fill="#FECACA">&gt;20% = signal d'alarme</text>
  <rect x="336" y="36" width="155" height="110" rx="10" fill="#D97706"/>
  <text x="413" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">NPS</text>
  <text x="413" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#FEF3C7">&gt;+20</text>
  <text x="413" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">% Promoteurs</text>
  <text x="413" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">− % Détracteurs</text>
  <text x="413" y="128" text-anchor="middle" font-size="7.5" fill="#FEF3C7">Actuel LABORO : +22 ✅</text>
  <rect x="499" y="36" width="171" height="110" rx="10" fill="#2B6CB0"/>
  <text x="584" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">ROI ACTION</text>
  <text x="584" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#BEE3F8">&gt;0%</text>
  <text x="584" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">(CA−Coût)÷Coût×100</text>
  <text x="584" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Soirée LABORO</text>
  <text x="584" y="128" text-anchor="middle" font-size="7.5" fill="#BEE3F8">ROI = 1 233% ✅</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Une action de fidélisation se mesure, elle ne se suppose pas</li>
<li>4 indicateurs clés : taux de rétention · taux d'attrition · NPS · ROI</li>
<li>Sans évaluation, impossible de savoir si une action mérite d'être reconduite</li>
</ul>
</div>`},
2:{t:'Évaluer les actions de fidélisation — Calculer et interpréter',c:`<div class="res-section">
<div class="res-section-label">🟢 Les 4 indicateurs clés et leurs formules</div>
<ul>
<li><strong>Taux de rétention</strong> = clients ayant acheté ≥ 2 fois ÷ clients période précédente × 100. Objectif LABORO : &gt; 60%</li>
<li><strong>Taux d'attrition</strong> = 100 − taux de rétention. &gt; 20% = signal d'alarme</li>
<li><strong>ROI d'une action</strong> = (CA généré − coût) ÷ coût × 100. Positif = rentable</li>
<li><strong>CLV</strong> (valeur vie client) = panier moyen × fréquence annuelle × durée fidélité (années)</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Calcul — Soirée Rentrée Sportive LABORO</div>
Coût : 1 200€ · CA soir : 4 200€ · CA 30j suivants : 11 800€<br>
ROI = (4 200 + 11 800 − 1 200) ÷ 1 200 × 100 = <strong>1 233%</strong>
</div>
<p><strong>Interpréter, pas seulement calculer :</strong> un ROI positif ne dit pas tout — il faut aussi regarder si les clients de cette action reviennent ensuite (taux de rétention) ou s'ils n'ont acheté qu'une fois grâce à la promotion de l'événement.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>ROI positif = action rentable, mais à confirmer avec le taux de rétention des clients touchés</li>
<li>La CLV aide à savoir combien investir raisonnablement pour garder un client</li>
<li>Toujours comparer un résultat à l'objectif LABORO, pas seulement regarder s'il est positif</li>
</ul>
</div>`},
3:{t:'Évaluer les actions de fidélisation — Arbitrer entre indicateurs',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand les indicateurs ne pointent pas dans le même sens</div>
<p>À ce niveau, une action peut être rentable sur un indicateur et décevante sur un autre. Ton rôle est de décider si l'action doit être reconduite, ajustée ou arrêtée — pas seulement de constater les chiffres.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — ROI excellent, rétention décevante</div>
La soirée Rentrée Sportive a un ROI de 1 233% (excellent), mais parmi les clients venus ce soir-là, seuls 22% ont racheté dans les 6 mois suivants (bien sous l'objectif de 60%). L'événement génère du chiffre immédiat mais ne fidélise pas réellement sur la durée — la remise ponctuelle a peut-être attiré des chasseurs de promo plutôt que de futurs clients réguliers.
</div>
<p><strong>Ne pas s'arrêter au premier chiffre favorable :</strong> avant de recommander de reconduire une action à l'identique, il faut vérifier si son bon résultat immédiat se traduit aussi par un bon résultat dans la durée. Un ROI élevé sur un événement ponctuel n'est pas la même chose qu'une vraie fidélisation.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — décision d'ajustement</div>
Plutôt que d'arrêter la soirée (ROI trop bon pour ça) ou de la reconduire à l'identique (rétention trop faible), la décision est d'ajuster : conditionner une partie de la remise du soir à l'inscription à la carte LABORO PRO, pour transformer l'attrait ponctuel en lien durable.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ta décision — par exemple : qu'est-ce qui t'a permis de ne pas t'arrêter au ROI seul, et qu'est-ce que tu risquais de manquer si tu l'avais fait ? Ce n'est pas un résumé des chiffres, c'est un vrai retour critique sur ta méthode d'évaluation.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un bon résultat sur un indicateur ne suffit pas à décider seul — croise toujours plusieurs indicateurs avant de conclure</li>
<li>Une action peut être ajustée plutôt que reconduite à l'identique ou arrêtée</li>
<li>La réflexivité = un vrai retour critique sur ta méthode d'évaluation, pas un résumé des chiffres</li>
</ul>
</div>`},
4:{t:'Évaluer les actions de fidélisation — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — décider de l'avenir d'une action</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage, jusqu'à la décision finale.</p>
<ul>
<li><strong>4 indicateurs</strong> : taux de rétention (&gt;60%) · taux d'attrition (&lt;20%) · NPS (&gt;+20) · ROI (&gt;0%)</li>
<li><strong>Ne jamais décider sur un seul indicateur</strong> : un bon ROI ponctuel peut cacher une mauvaise rétention</li>
<li><strong>3 décisions possibles</strong> : reconduire à l'identique / ajuster / arrêter — choisir selon l'ensemble des indicateurs, pas le plus flatteur</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Une action affiche des résultats contradictoires selon les indicateurs. En autonomie complète, tu dois croiser les chiffres, identifier la vraie cause de la contradiction, et recommander une décision argumentée (reconduire / ajuster / arrêter).
</div>
<p><strong>De l'évaluation à la stratégie :</strong> les résultats d'évaluation alimentent directement la définition des futurs objectifs de fidélisation (voir C3.3b, construction d'objectifs SMART) — on ne fixe pas un nouvel objectif sans avoir regardé ce que le précédent a donné.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : croiser les indicateurs et trancher entre reconduire, ajuster ou arrêter une action</li>
<li>Une évaluation sert à décider, pas seulement à constater</li>
</ul>
</div>`},
},
'C3.3b':{
1:{t:'La fidélisation avancée — Client satisfait vs client fidèle',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Deux notions à ne pas confondre</div>
<p><strong>Client satisfait vs client fidèle :</strong></p>
<ul>
<li><strong>Client satisfait</strong> — Content de son achat mais peut aller ailleurs si un concurrent fait une promo.</li>
<li><strong>Client fidèle</strong> — Revient automatiquement chez LABORO même si un concurrent est moins cher. Son CA augmente chaque année.</li>
</ul>
<p><strong>Le programme de parrainage LABORO :</strong> Parrain : 15 € de bon d'achat. Filleul : 10 € à la 1re commande. Activation via LABORO Connect.</p>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — proposer la carte PRO</div>
"M. Vidal, vous êtes client depuis 3 ans — avez-vous votre carte LABORO PRO ? Sur cet achat vous auriez déjà 7 points, soit 7 € à utiliser à votre prochaine visite. Je vous l'active maintenant, c'est gratuit et sans engagement."
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un client satisfait n'est pas automatiquement fidèle — il peut partir pour une promo concurrente</li>
<li>Un client fidèle reste même si un concurrent est moins cher</li>
<li>Le parrainage récompense parrain ET filleul — les deux ont intérêt à l'activer</li>
</ul>
</div>`},
2:{t:'La fidélisation avancée — Construire un objectif SMART',c:`<div class="res-section">
<div class="res-section-label">🟢 Fixer un objectif de fidélisation avec la méthode SMART</div>
<ul>
<li><strong>S</strong>pécifique — "Passer de 31 à 45 participants à la soirée clients"</li>
<li><strong>M</strong>esurable — un chiffre précis à atteindre</li>
<li><strong>A</strong>tteignable — ambitieux mais réaliste avec les moyens disponibles</li>
<li><strong>R</strong>éaliste — en accord avec le budget et l'équipe</li>
<li><strong>T</strong>emporel — "Pour le 15 novembre 2026"</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — objectif SMART complet</div>
"Augmenter le nombre d'adhérents à la carte LABORO PRO de 320 à 400 (S, M) d'ici la fin de l'année scolaire (T), en formant l'équipe à la proposer systématiquement en caisse (A, R)." Chaque lettre de SMART est vérifiable dans cette phrase.
</div>
<p><strong>Un objectif qui n'est pas SMART</strong> reste un vœu pieux : "améliorer la fidélisation" ne dit ni combien, ni comment, ni pour quand — impossible ensuite de savoir s'il est atteint.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un objectif de fidélisation doit toujours pouvoir se vérifier par un chiffre et une date</li>
<li>SMART : Spécifique · Mesurable · Atteignable · Réaliste · Temporel</li>
<li>Un objectif vague ne peut jamais être déclaré "atteint" ou "raté"</li>
</ul>
</div>`},
3:{t:'La fidélisation avancée — Arbitrer entre plusieurs objectifs',c:`<div class="res-section">
<div class="res-section-label">🟠 Quand deux objectifs SMART se disputent les mêmes moyens</div>
<p>À ce niveau, tu ne fixes plus un seul objectif isolé : plusieurs objectifs de fidélisation légitimes se présentent en même temps, mais le budget ou le temps de l'équipe ne permet pas de tout mener de front. Ton rôle est d'arbitrer, pas de tout promettre.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — deux objectifs, un seul budget</div>
Objectif A : "Passer de 320 à 400 adhérents carte PRO d'ici juin" (nécessite du temps de formation d'équipe). Objectif B : "Organiser 2 soirées clients supplémentaires cette année" (nécessite un budget de 2 400€, déjà utilisé ailleurs). Le budget et le temps disponibles ne permettent pas les deux à pleine échelle cette année.
</div>
<p><strong>Arbitrer avec des critères, pas au hasard :</strong> lequel des deux objectifs a le meilleur rapport impact/coût ? Lequel s'appuie sur des ressources déjà disponibles (l'équipe peut être formée sans coût supplémentaire, contrairement à un nouvel événement) ? L'arbitrage doit s'appuyer sur les résultats d'évaluation des actions passées (voir C3.3), pas sur une préférence personnelle.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — arbitrage argumenté</div>
"Je priorise l'objectif A (carte PRO) cette année : il ne demande pas de budget supplémentaire, juste de la formation, et l'évaluation de la dernière soirée client a montré un ROI ponctuel élevé mais une rétention décevante — un nouvel événement au même format risquerait de reproduire ce défaut avant de l'avoir corrigé."
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton arbitrage — par exemple : quel critère a été décisif dans ton choix, et un collègue avec un autre critère aurait-il tranché différemment ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur ta décision.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à plusieurs objectifs légitimes, arbitre sur des critères (impact/coût, ressources déjà disponibles), jamais au hasard</li>
<li>Les résultats d'évaluation des actions passées doivent nourrir le choix du prochain objectif</li>
<li>La réflexivité = un vrai retour critique sur ton arbitrage, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:'La fidélisation avancée — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — construire et arbitrer une stratégie de fidélisation</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>Client satisfait ≠ client fidèle</strong> — le fidèle reste même face à une offre concurrente moins chère</li>
<li><strong>Objectif SMART</strong> : Spécifique · Mesurable · Atteignable · Réaliste · Temporel — toujours vérifiable par un chiffre et une date</li>
<li><strong>Plusieurs objectifs en concurrence</strong> : arbitrer sur l'impact/coût et les ressources déjà disponibles, pas au hasard</li>
<li><strong>S'appuyer sur l'évaluation passée</strong> (voir C3.3) pour ne pas répéter un défaut déjà identifié</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Deux objectifs de fidélisation légitimes, un budget ou un temps insuffisant pour les deux. En autonomie complète, tu dois formuler chaque objectif en SMART, arbitrer lequel prioriser, et justifier ta décision à partir des résultats d'évaluation disponibles.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : formuler un objectif SMART et arbitrer entre plusieurs priorités concurrentes</li>
<li>Une stratégie de fidélisation se construit sur les résultats passés, pas sur de bonnes intentions</li>
</ul>
</div>`},
},
'G4A':{
1:{t:"Gérer l'espace commercial — Les bases du merchandising",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Le merchandising chez LABORO</div>
<p><strong>Le merchandising c'est l'art de présenter les produits pour donner envie d'acheter.</strong></p>
<p><strong>Les 3 règles de base :</strong></p>
<ul>
<li><strong>La règle des 5B</strong> — Bon produit · Bon endroit · Bon moment · Bonne quantité · Bon prix</li>
<li><strong>La règle du niveau des yeux</strong> — Les produits à forte marge se placent à hauteur des yeux (1,20m-1,70m). Les produits d'appel en bas, les produits complémentaires en haut.</li>
<li><strong>La règle du facing</strong> — Minimum 2-3 facings par référence pour être visible. 1 seul facing = invisible.</li>
</ul>
<p><strong>Chez LABORO :</strong> le showroom est organisé par univers (trail, fitness, team sport). Chaque univers a sa tête de gondole avec les nouveautés et les promos.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — rayon trail LABORO</div>
Les chaussures trail Salomon sont placées à hauteur des yeux au centre du rayon. Les chaussettes techniques sont juste à côté (vente complémentaire). Les bâtons de trail sont en haut. Les semelles en bas. Résultat : le panier moyen trail = 167€ (vs 89€ moyenne magasin).
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="155" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">RÈGLE DES 5B — Merchandising LABORO</text>
  <rect x="10" y="36" width="124" height="105" rx="10" fill="#1A2E4A"/>
  <text x="72" y="60" text-anchor="middle" font-size="20">🎯</text>
  <text x="72" y="76" text-anchor="middle" font-size="14" font-weight="900" fill="#63B3ED">BON</text>
  <text x="72" y="91" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">PRODUIT</text>
  <text x="72" y="107" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Référence adaptée</text>
  <text x="72" y="119" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">à la saison</text>
  <rect x="142" y="36" width="124" height="105" rx="10" fill="#2D5282"/>
  <text x="204" y="60" text-anchor="middle" font-size="20">📍</text>
  <text x="204" y="76" text-anchor="middle" font-size="14" font-weight="900" fill="#90CDF4">BON</text>
  <text x="204" y="91" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">ENDROIT</text>
  <text x="204" y="107" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Niveau des yeux</text>
  <text x="204" y="119" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">1,20m à 1,70m</text>
  <rect x="274" y="36" width="124" height="105" rx="10" fill="#4A6FA5"/>
  <text x="336" y="60" text-anchor="middle" font-size="20">📅</text>
  <text x="336" y="76" text-anchor="middle" font-size="14" font-weight="900" fill="#BEE3F8">BON</text>
  <text x="336" y="91" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">MOMENT</text>
  <text x="336" y="107" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Saisonnier</text>
  <text x="336" y="119" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Rentrée · Fêtes</text>
  <rect x="406" y="36" width="124" height="105" rx="10" fill="#185FA5"/>
  <text x="468" y="60" text-anchor="middle" font-size="20">📊</text>
  <text x="468" y="76" text-anchor="middle" font-size="14" font-weight="900" fill="#EBF8FF">BONNE</text>
  <text x="468" y="91" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">QUANTITÉ</text>
  <text x="468" y="107" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Min. 2-3 facings</text>
  <text x="468" y="119" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Rupture = vente perdue</text>
  <rect x="538" y="36" width="132" height="105" rx="10" fill="#0C3D6E"/>
  <text x="604" y="60" text-anchor="middle" font-size="20">💶</text>
  <text x="604" y="76" text-anchor="middle" font-size="14" font-weight="900" fill="#93C5FD">BON</text>
  <text x="604" y="91" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">PRIX</text>
  <text x="604" y="107" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Étiquette lisible</text>
  <text x="604" y="119" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.75)">Cohérent concurrence</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>5B : Bon produit · Bon endroit · Bon moment · Bonne quantité · Bon prix</li>
<li>Le niveau des yeux (1,20m-1,70m) est le niveau qui vend le plus</li>
<li>Minimum 2-3 facings par référence pour être visible</li>
</ul>
</div>`},
2:{t:"Gérer l'espace commercial — Implantation, stocks et prix",c:`<div class="res-section">
<div class="res-section-label">🟢 Implantation et zones de vente</div>
<ul>
<li><strong>Zone chaude</strong> : entrée, allées principales, caisses — les produits s'y vendent seuls. → Réserver aux nouveautés, promotions, forte marge.</li>
<li><strong>Zone froide</strong> : fonds de rayon, coins, étages, peu fréquentés spontanément. → Attirer avec de la signalétique, des têtes de gondole attractives.</li>
<li><strong>Niveau yeux</strong> (1,20-1,70m) : zone la plus vendeuse → produits phares et à forte marge.</li>
<li><strong>Niveau mains</strong> (0,80-1,20m) : produits courants.</li>
<li><strong>Niveau sol</strong> (&lt;0,80m) : produits lourds, conditionnements en vrac.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — erreur d'implantation</div>
Rayon running : les Salomon Speedcross 6 (best-seller, marge 38%) sont placés au sol zone froide. Les Nike Pegasus (0 vente ce mois) sont en zone chaude niveau yeux. Résultat : CA 24 800 € vs objectif 28 000 €. <strong>Correction</strong> : inverser les placements. Impact estimé : +15% de CA sur ce rayon.
</div>
<p><strong>Gestion des stocks — les calculs de base :</strong></p>
<ul>
<li><strong>Stock d'alerte</strong> = ventes journalières × délai de réassort (jours). Ex : 3 paires/jour × 5 jours = <strong>15 paires</strong> → déclencher la commande dès ce seuil.</li>
<li><strong>Quantité à commander</strong> = objectif de ventes ÷ colisage (arrondir au supérieur). Ex : 405 paires, colisage 6 → 405÷6 = 67,5 → <strong>68 colis</strong>.</li>
<li><strong>Montant net de commande</strong> = montant brut − remise + frais de port. Ex : 68×6×75€ = 30 600€ · remise 10% = −3 060€ → <strong>27 540€ net</strong>.</li>
</ul>
<p><strong>Calcul du prix de vente — taux de marge :</strong></p>
<ul>
<li><strong>Taux de marge</strong> = (PVHT − PAHT) ÷ PVHT × 100</li>
<li><strong>PVHT</strong> = PAHT ÷ (1 − taux de marge)</li>
<li><strong>PVTTC</strong> = PVHT × (1 + taux de TVA) — TVA sport/textile 20%, alimentation 5,5%</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — calcul PVTTC Salomon Speedcross 6</div>
PAHT = 89€ · marge souhaitée 38% · TVA 20%<br>
PVHT = 89 ÷ (1−0,38) = 89 ÷ 0,62 = <strong>143,55€</strong> · PVTTC = 143,55 × 1,20 = <strong>172,26€</strong>
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Zone chaude = nouveautés/promos ; zone froide = à animer avec signalétique</li>
<li>Stock d'alerte = ventes/jour × délai réassort ; commander avant d'atteindre la rupture</li>
<li>PVHT se calcule à partir du taux de marge souhaité, jamais l'inverse</li>
</ul>
</div>`},
3:{t:"Gérer l'espace commercial — Arbitrer stocks, fournisseurs et démarque",c:`<div class="res-section">
<div class="res-section-label">🟠 Comparer, arbitrer, diagnostiquer une perte</div>
<p><strong>Comparer des fournisseurs par scoring pondéré :</strong> tous les critères ne se valent pas — on leur attribue un poids selon leur importance pour LABORO (ex. Prix 40% · Délai 30% · Qualité 20% · Service 10%). Pour chaque fournisseur, noter chaque critère sur 5, multiplier par le poids, additionner.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — scoring fournisseur</div>
Fournisseur A : Prix 4/5, Délai 5/5, Qualité 4/5, Service 3/5 → (4×0,40)+(5×0,30)+(4×0,20)+(3×0,10) = 1,6+1,5+0,8+0,3 = <strong>4,2/5</strong>.
</div>
<p><strong>La quantité économique de commande (QEC) :</strong> c'est la quantité qui minimise le coût total, en équilibrant le <strong>coût de passation</strong> (commander souvent = frais qui grimpent) et le <strong>coût de stockage</strong> (commander de grandes quantités = espace et argent immobilisés). La bonne quantité évite les deux excès — ni rupture, ni surstock.</p>
<p><strong>Diagnostiquer une démarque :</strong></p>
<ul>
<li><strong>Stock théorique</strong> = Stock initial + Livraisons − Quantités vendues</li>
<li><strong>Démarque</strong> = Stock théorique − Stock réel (si positif) → produits manquants (vol, casse, erreur)</li>
<li><strong>Taux de démarque</strong> = Démarque ÷ CA × 100 · objectif sectoriel &lt; 1,5%</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — calcul démarque</div>
Crème Squirrel : stock initial 35, livraison 0, vendues 28 → stock théorique = 7. Stock réel : 3 → démarque de 4 unités (vol possible ou casse non signalée).
</div>
<p><strong>Gérer un produit à DDM courte :</strong> deux options s'opposent — promotion (−30%, lot 3+1) pour écouler vite, ou don à une association (anti-gaspillage). Il faut comparer les deux sur le CA et la marge dégagée avant de choisir, pas prendre l'option la plus rapide par réflexe.</p>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton arbitrage — par exemple : qu'est-ce qui a fait pencher la balance entre les deux options (fournisseur, quantité, ou gestion de la démarque), et un autre critère aurait-il changé ta décision ? Ce n'est pas un résumé des calculs, c'est un vrai retour critique sur ta méthode de décision.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un scoring pondéré évite de choisir un fournisseur sur un seul critère (souvent le prix)</li>
<li>La QEC arbitre entre coût de passation et coût de stockage — jamais l'un sans l'autre</li>
<li>Taux de démarque &gt; 3% = situation critique à traiter immédiatement</li>
</ul>
</div>`},
4:{t:"Gérer l'espace commercial — Fiche mémo express",c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter la performance globale</div>
<p>Cette fiche est volontairement dense : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage, en croisant plusieurs leviers.</p>
<p><strong>E-commerce — indicateurs clés :</strong> taux de conversion = commandes ÷ visiteurs × 100 (moyenne nationale 2,96%) · % ventes en ligne = CA site ÷ CA total × 100 · panier moyen en ligne = CA site ÷ nb commandes.</p>
<p><strong>Communication digitale :</strong> Instagram (18-35 ans, visuel) · Facebook (35-55 ans, CE/clubs) · Newsletter (clients existants) · Google My Business (référencement local). Un post efficace : visuel d'abord, texte &lt;150 mots, 3-5 hashtags, 1 seul call-to-action.</p>
<p><strong>Piloter avec le SWOT :</strong> Forces (ce qui marche) · Faiblesses (ce qui freine) · Opportunités (à saisir) · Menaces (risques externes). Prioriser les actions sur les faiblesses qui limitent une force, ou les opportunités les plus faciles à saisir.</p>
<p><strong>Seuil de rentabilité</strong> (en quantité) = charges fixes ÷ (prix de vente unitaire − coût variable unitaire). En dessous = déficitaire, au-dessus = chaque vente dégage du bénéfice.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — atelier "Entretien & Prolongation équipement"</div>
Charges fixes 600€ · prix d'inscription 35€ · coût variable 12€/participant. Seuil = 600 ÷ (35−12) = 600÷23 = <strong>27 participants</strong> pour être rentable.
</div>
<p><strong>Construire une offre B2B</strong> (clubs, CE, collectivités) : tarification dégressive par volume, paiement différé (30-60 jours), interlocuteur dédié, contrat annuel — à la différence du B2C (comptant, sans volume, sans interlocuteur attitré).</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : croiser merchandising, stocks, digital et rentabilité dans une seule analyse</li>
<li>Le SWOT structure une vision d'ensemble avant de prioriser des actions concrètes</li>
<li>Une offre B2B se différencie du B2C par le volume, le paiement différé et le service dédié</li>
</ul>
</div>`},
},
'B4.1':{
1:{t:'Rechercher des prospects — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer</div>
<p><strong>B4.1 — Rechercher des prospects.</strong> Un prospect c'est un client potentiel qu'on n'a pas encore. Le but : constituer une liste de contacts à démarcher.</p>
<p><strong>3 sources principales chez LABORO :</strong></p>
<ul>
<li><strong>Fichiers existants</strong> — Mairie (associations déclarées), fédérations sportives départementales, annuaires CE</li>
<li><strong>Réseaux sociaux</strong> — Facebook (groupes sport locaux), LinkedIn (DRH et responsables CE), Instagram (clubs sportifs)</li>
<li><strong>Terrain</strong> — Tournois locaux, forums associations, bouche-à-oreille clients actuels</li>
</ul>
<p><strong>Critères de qualification d'un prospect LABORO :</strong></p>
<ul>
<li>Association ou entreprise avec au moins 15 membres/salariés</li>
<li>Activité sportive régulière (>1 entraînement/semaine)</li>
<li>Budget équipement estimé >300€/an</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — recherche de prospects</div>
Nina cherche des associations de foot en Essonne. Elle consulte le site de la FFF, section clubs affiliés 91. Elle trouve 47 clubs. Elle filtre : clubs de plus de 30 licenciés = 18 prospects qualifiés. Elle les saisit dans LABORO Connect avec téléphone et nom du président.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">B4.1 — SOURCES DE PROSPECTION B2B LABORO</text>
  <rect x="10" y="36" width="202" height="100" rx="10" fill="#1A2E4A"/>
  <text x="111" y="62" text-anchor="middle" font-size="20">🏛️</text>
  <text x="111" y="78" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">FICHIERS OFFICIELS</text>
  <text x="111" y="94" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Mairie · Fédérations sport</text>
  <text x="111" y="107" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Annuaires CE · Sirene</text>
  <text x="111" y="123" text-anchor="middle" font-size="7.5" fill="#63B3ED">Gratuits et fiables</text>
  <rect x="220" y="36" width="240" height="100" rx="10" fill="#2D5282"/>
  <text x="340" y="62" text-anchor="middle" font-size="20">💻</text>
  <text x="340" y="78" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">RÉSEAUX SOCIAUX</text>
  <text x="340" y="94" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">LinkedIn (DRH, CE) · Facebook</text>
  <text x="340" y="107" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Instagram (clubs sportifs)</text>
  <text x="340" y="123" text-anchor="middle" font-size="7.5" fill="#90CDF4">Identifier le bon interlocuteur</text>
  <rect x="468" y="36" width="202" height="100" rx="10" fill="#4A6FA5"/>
  <text x="569" y="62" text-anchor="middle" font-size="20">🤝</text>
  <text x="569" y="78" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">TERRAIN</text>
  <text x="569" y="94" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Tournois · Forums asso</text>
  <text x="569" y="107" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Bouche-à-oreille clients</text>
  <text x="569" y="123" text-anchor="middle" font-size="7.5" fill="#BEE3F8">La recommandation = or</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>3 sources : fichiers existants · réseaux sociaux · terrain</li>
<li>Un prospect qualifié a un effectif, une pratique régulière et un budget estimé</li>
<li>Tout prospect trouvé se saisit dans LABORO Connect avec ses coordonnées</li>
</ul>
</div>`},
2:{t:'Rechercher des prospects — Qualifier avec BANT',c:`<div class="res-section">
<div class="res-section-label">🟢 Sources approfondies et méthode BANT</div>
<p><strong>3 sources essentielles :</strong></p><ul><li><strong>Sources officielles</strong> — Societe.com, Infogreffe, annuaires des CCI, registres des associations sportives (DRAJES). Fiables, gratuites, exhaustives.</li><li><strong>Sources sectorielles</strong> — Fédérations sportives, annuaires des CE, répertoires des collectivités.</li><li><strong>Sources terrain et réseaux</strong> — Salons professionnels (ISPO, Forum sport Essonne), LinkedIn, recommandations de clients actuels.</li></ul>
<p><strong>Qualifier un prospect avec la méthode BANT :</strong></p>
<ul><li><strong>B</strong>udget — Quel budget annuel sport/équipement ?</li><li><strong>A</strong>uthority — Qui décide ? Responsable CE, DRH, directeur sportif ?</li><li><strong>N</strong>eed — Quel besoin réel identifié ?</li><li><strong>T</strong>iming — Dans quel délai peut-il acheter ?</li></ul>
<p><strong>Champs obligatoires dans LABORO Connect :</strong> raison sociale, secteur, taille, contact décisionnaire, source d'identification, score BANT, besoins estimés, statut (froid/tiède/chaud), prochaine action et date de relance.</p>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — fichier prospect CE Essonne</div>Airbus Defence Élancourt — 1 400 salariés — Responsable CE : Mme Dufour — Budget sport estimé 20 000 €/an — Besoin : maillots clubs internes + équipement fitness — Score BANT : 3/4 — Statut : tiède — Prochaine action : e-mailing ciblé J+3.</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>BANT : Budget · Authority · Need · Timing</li>
<li>Un prospect sans date de relance est un prospect perdu</li>
<li>Tout se trace dans LABORO Connect dès le premier contact</li>
</ul>
</div>`},
3:{t:'Rechercher des prospects — Scorer et arbitrer',c:`<div class="res-section">
<div class="res-section-label">🟠 Calculer un score BANT précis et choisir qui contacter en premier</div>
<p><strong>Score de qualification BANT (chaque critère noté 0-3, total ÷ 12 × 100) :</strong></p>
<ul>
<li>Score ≥ 75% → prospect chaud → à contacter en priorité cette semaine</li>
<li>Score 50-74% → prospect tiède → à contacter dans le mois</li>
<li>Score &lt; 50% → prospect froid → à mettre en veille</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — qualification Club Trail Sénart</div>
Contact : Marc Girault, Président · 42 licenciés · achat maillots/an<br>
B — Budget estimé 1 500€ → 2/3 · A — Président décisionnaire → 3/3 · N — Commande chaque saison → 3/3 · T — Saison reprend en septembre → 2/3<br>
<strong>Score total : 10/12 = 83% → CHAUD → contacter cette semaine</strong>
</div>
<p><strong>Quand deux prospects sont à égalité de score :</strong> le score seul ne suffit pas toujours à décider qui contacter en premier. Il faut regarder aussi la capacité réelle à agir vite (un prospect chaud dont la saison démarre dans 2 semaines est plus urgent qu'un prospect chaud dont le budget ne sera voté que dans 6 mois), même à score BANT identique.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — deux prospects chauds, une seule priorité</div>
Club A : score 83%, saison qui démarre dans 2 semaines. Club B : score 83%, mais budget voté seulement en assemblée générale dans 4 mois. Malgré le même score, Club A doit être contacté en premier — sa fenêtre d'achat est immédiate, celle de Club B ne l'est pas encore.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton choix de priorité — par exemple : le score BANT seul t'aurait-il conduit à la bonne décision, et qu'est-ce qui a fait la différence ? Ce n'est pas un résumé du calcul, c'est un vrai retour critique sur ta méthode de priorisation.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Score BANT = total ÷ 12 × 100 — seuils 75%/50% pour chaud/tiède/froid</li>
<li>À score égal, la fenêtre d'achat réelle (timing) départage les priorités</li>
<li>La réflexivité = un vrai retour critique sur ta méthode, pas un résumé du calcul</li>
</ul>
</div>`},
4:{t:'Rechercher des prospects — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — organiser une veille de prospection continue</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<p><strong>Mettre en place une veille automatisée</strong> — être alerté en continu sans relancer chaque recherche soi-même :</p>
<ul>
<li><strong>Alertes Google</strong> — mots-clés ciblés, fréquence quotidienne/hebdomadaire</li>
<li><strong>Veille des avis en ligne</strong> — clubs et CE, hebdomadaire</li>
<li><strong>Suivi des prix concurrents</strong> — Decathlon Pro/SportRun, mensuel</li>
<li><strong>Newsletters sectorielles</strong> — fédérations, CCI, à réception</li>
<li><strong>Flux LinkedIn suivis</strong> — pages cibles, quotidien</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un lot de nouveaux prospects arrive via plusieurs canaux de veille en même temps. En autonomie complète, tu dois les qualifier avec BANT, calculer leur score, et établir l'ordre de contact en croisant score et fenêtre d'achat réelle.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : organiser une veille continue et qualifier chaque prospect détecté avant de le contacter</li>
<li>La veille automatisée ne remplace pas la qualification BANT — elle alimente le fichier en continu</li>
</ul>
</div>`},
},
'B4.2':{
1:{t:'Préparer une opération de prospection — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer</div>
<p><strong>B4.2 — Préparer et conduire une opération de prospection.</strong></p>
<p><strong>Avant l'opération — les 3 étapes :</strong></p>
<ul>
<li><strong>Définir la cible</strong> — Qui ? Associations fitness en Essonne avec 20+ membres</li>
<li><strong>Préparer les outils</strong> — Script d'appel, email type, fiche prospect LABORO Connect</li>
<li><strong>Fixer les objectifs</strong> — Ex : 50 appels/semaine · 10 RDV/mois · 3 ventes/mois</li>
</ul>
<p><strong>Pendant — la règle des 3 contacts :</strong> si pas de réponse après 3 tentatives (appel + email + appel), passer au prospect suivant. Ne pas insister.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — plan d'opération</div>
Opération "Clubs de trail Essonne" : 30 clubs ciblés · période 4 semaines · objectif 8 RDV · budget 0€ (phoning + emailing). Semaine 1 : appels de présentation. Semaine 2 : relances email. Semaines 3-4 : RDV et propositions.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">B4.2 — PRÉPARER UNE OPÉRATION DE PROSPECTION</text>
  <defs><marker id="arr6" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#2C5282"/></marker></defs>
  <rect x="10" y="36" width="190" height="100" rx="10" fill="#1A2E4A"/>
  <text x="105" y="60" text-anchor="middle" font-size="18">🎯</text>
  <text x="105" y="76" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">1. CIBLER</text>
  <text x="105" y="92" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Qui ? Clubs Essonne</text>
  <text x="105" y="105" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Budget &gt;300€ · 15+ membres</text>
  <text x="105" y="120" text-anchor="middle" font-size="7.5" fill="#63B3ED">Qualifier AVANT d'appeler</text>
  <path d="M 202 86 L 217 86" stroke="#2C5282" stroke-width="2" marker-end="url(#arr6)" fill="none"/>
  <rect x="219" y="36" width="240" height="100" rx="10" fill="#2D5282"/>
  <text x="339" y="60" text-anchor="middle" font-size="18">🛠️</text>
  <text x="339" y="76" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">2. PRÉPARER LES OUTILS</text>
  <text x="339" y="92" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Script d'appel · Email type</text>
  <text x="339" y="105" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Fiche prospect LABORO Connect</text>
  <text x="339" y="120" text-anchor="middle" font-size="7.5" fill="#90CDF4">Argumentaire produits prêt</text>
  <path d="M 461 86 L 476 86" stroke="#2C5282" stroke-width="2" marker-end="url(#arr6)" fill="none"/>
  <rect x="478" y="36" width="192" height="100" rx="10" fill="#4A6FA5"/>
  <text x="574" y="60" text-anchor="middle" font-size="18">📊</text>
  <text x="574" y="76" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">3. FIXER LES OBJECTIFS</text>
  <text x="574" y="92" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">50 appels/semaine</text>
  <text x="574" y="105" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">10 RDV/mois · 3 ventes</text>
  <text x="574" y="120" text-anchor="middle" font-size="7.5" fill="#BEE3F8">SMART + mesurables</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>3 étapes avant : cibler · préparer les outils · fixer des objectifs chiffrés</li>
<li>Règle des 3 contacts : au-delà, passer au prospect suivant</li>
</ul>
</div>`},
2:{t:'Préparer une opération de prospection — Dimensionner et rédiger',c:`<div class="res-section">
<div class="res-section-label">🟢 Dimensionner l'opération et choisir les techniques</div>
<p><strong>Remonter la chaîne de conversion</strong> pour savoir combien de prospects contacter : Nombre de prospects = objectif ÷ (taux1 × taux2 × taux3).</p>
<p>Exemple : objectif 3 contrats CE · taux contact 60% · taux RDV 12% · taux devis-contrat 30% → 3 ÷ (0,60×0,12×0,30) = <strong>139 prospects à contacter</strong>.</p>
<p><strong>Techniques de prospection :</strong></p>
<ul>
<li><strong>Phoning</strong> — Taux de RDV 5-15%. Rapide, coût faible.</li>
<li><strong>E-mailing</strong> — Taux d'ouverture B2B 20-25%. À combiner avec un appel, jamais suffisant seul.</li>
<li><strong>Visite terrain</strong> — Taux de succès &gt;40% si bien préparée. Coûteuse en temps, réservée aux BANT 3-4.</li>
<li><strong>LinkedIn</strong> — Prospection douce, efficace sur les décisionnaires.</li>
<li><strong>Salons/événements</strong> — Contacts chauds à requalifier sous 48h.</li>
</ul>
<p><strong>Structurer un e-mailing de prospection :</strong> objet 4-6 mots (jamais "gratuit") · accroche avec chiffre/constat · 3 arguments max avec preuve · un seul call-to-action · signature complète · corps &lt;150 mots (au-delà, taux de lecture −60%).</p>
<div class="res-ex"><div class="res-ex-l">Exemple — e-mailing clubs sportifs</div>
Objet : "Équipez vos joueurs — livraison 48h". 3 arguments : flocage inclus, remise 8-15%, commercial dédié. Call-to-action unique : "Je demande un devis gratuit". Résultat : taux d'ouverture 31%.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Toujours calculer le volume de prospects nécessaire avant de choisir une technique</li>
<li>Un e-mailing seul ne suffit jamais — le relancer par téléphone double le taux de RDV</li>
<li>Un seul call-to-action par e-mail, jamais trois options</li>
</ul>
</div>`},
3:{t:"Préparer une opération de prospection — Arbitrer sous contrainte de budget",c:`<div class="res-section">
<div class="res-section-label">🟠 Choisir un mix de techniques avec un budget limité</div>
<p>À ce niveau, tu ne choisis plus une seule technique idéale : le budget et le temps disponibles obligent à arbitrer entre plusieurs options, sachant que chacune a un rendement et un coût différents.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — arbitrage budget limité</div>
Budget disponible : 300€. Objectif : 2 contrats. La visite terrain (taux de succès le plus élevé) coûterait environ 80€/visite en déplacement — viable seulement pour un petit nombre de prospects déjà qualifiés BANT 3-4. Le phoning et l'e-mailing (quasi gratuits) doivent donc qualifier et filtrer en amont, pour réserver les visites terrain (le budget) aux prospects les plus prometteurs identifiés au fil de l'opération.
</div>
<p><strong>Établir le budget d'une opération :</strong> déplacements (km × barème), supports (impression), outils (abonnements), temps commercial (souvent le poste le plus lourd). ROI prospection = (CA généré − coût total) ÷ coût total × 100 — objectif LABORO &gt; 500%.</p>
<p><strong>Fixer les indicateurs de suivi AVANT le lancement</strong> (pas après) : taux de contact (&gt;60%), taux de RDV (&gt;10%), taux d'ouverture e-mailing (&gt;25%), taux de transformation devis-contrat (&gt;30%), coût d'acquisition = budget ÷ nouveaux clients.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — planning 6 semaines, budget serré</div>
S1-S3 : qualification + e-mailing/phoning (0€, filtre les prospects). S4 : phoning tièdes. S5 : visites terrain sur les seuls prospects chauds identifiés (80€). S6 : relances et devis (50€). <strong>Budget total : 130€</strong>, bien en dessous des 300€ disponibles, en réservant le poste le plus cher aux prospects les plus qualifiés.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton arbitrage — par exemple : qu'aurais-tu risqué si tu avais dépensé le budget de visite terrain trop tôt, avant d'avoir qualifié les prospects ? Ce n'est pas un résumé du planning, c'est un vrai retour critique sur ta gestion du budget.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Utilise les techniques gratuites pour qualifier et filtrer, réserve les techniques coûteuses aux prospects les plus prometteurs</li>
<li>Les indicateurs de suivi se fixent avant le lancement de l'opération, jamais après</li>
<li>La réflexivité = un vrai retour critique sur ta gestion du budget, pas un résumé du planning</li>
</ul>
</div>`},
4:{t:'Préparer une opération de prospection — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — construire un plan de prospection complet</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<p><strong>Structure d'un plan de prospection (7 points) :</strong> objectif chiffré · cible qualifiée · calcul du nombre de prospects · techniques retenues · planning semaine par semaine · budget · indicateurs de suivi.</p>
<p><strong>Construire le planning :</strong> augmenter progressivement le volume (S1 20 contacts, S2 30, S3 40…), prévoir des semaines de relance, garder la dernière semaine pour les visites terrain sur les prospects chauds.</p>
<p><strong>Utiliser le SWOT pour choisir sa stratégie</strong> avant de décider qui cibler et comment : Forces (atouts LABORO sur ce marché), Faiblesses (limites internes), Opportunités (tendances externes favorables), Menaces (risques externes). Une bonne stratégie s'appuie sur les forces pour capter les opportunités, en évitant les segments où les faiblesses ou menaces sont trop fortes.</p>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un objectif de contrats à atteindre, un budget limité, un délai court. En autonomie complète, tu dois construire le plan complet (7 points), dimensionner le volume de prospects, et justifier le choix de techniques avec un raisonnement SWOT.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : construire un plan de prospection complet et argumenté, pas juste une liste d'actions</li>
<li>Le SWOT structure le choix des segments avant même de calculer les volumes</li>
</ul>
</div>`},
},
'B4.3':{
1:{t:"Conduire un entretien de prospection — Les bases",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer</div>
<p><strong>B4.3 — Conduire un entretien de prospection.</strong> L'entretien suit un plan en 6 étapes.</p>
<p><strong>Le plan d'appel LABORO :</strong></p>
<ul>
<li><strong>1. Accroche</strong> — "Bonjour M. [nom], je suis [prénom] de LABORO Sport à Évry..."</li>
<li><strong>2. Objet</strong> — "Je vous appelle car nous équipons plusieurs clubs de votre secteur..."</li>
<li><strong>3. Découverte</strong> — "Vous avez combien de licenciés ? Quelle est votre saison ?"</li>
<li><strong>4. Argumentation</strong> — "Nous pouvons vous proposer..."</li>
<li><strong>5. Traitement objections</strong> — "Je comprends, et justement..."</li>
<li><strong>6. Conclusion</strong> — "Je vous propose un RDV mardi ou jeudi ?"</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — accroche téléphonique</div>
"Bonjour M. Ferreira, je suis Sophie de LABORO Sport à Évry. Nous équipons 12 clubs de foot en Essonne. Je vous contacte car votre club commence sa préparation d'hiver — est-ce que vous avez prévu votre équipement ?"
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="155" rx="12" fill="#F0FFF4"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">B4.3 — PLAN D'APPEL EN 6 ÉTAPES — LABORO</text>
  <defs><marker id="arr7" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#276749"/></marker></defs>
  <rect x="5" y="40" width="102" height="100" rx="8" fill="#276749"/>
  <text x="56" y="65" text-anchor="middle" font-size="16">👋</text>
  <text x="56" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">ACCROCHE</text>
  <text x="56" y="94" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">"Bonjour M. [nom]</text>
  <text x="56" y="106" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">je suis [prénom]</text>
  <text x="56" y="118" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">de LABORO..."</text>
  <path d="M 109 90 L 118 90" stroke="#276749" stroke-width="1.5" marker-end="url(#arr7)" fill="none"/>
  <rect x="120" y="40" width="102" height="100" rx="8" fill="#2F855A"/>
  <text x="171" y="65" text-anchor="middle" font-size="16">📋</text>
  <text x="171" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">OBJET</text>
  <text x="171" y="94" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">"Je vous contacte</text>
  <text x="171" y="106" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">car nous équipons</text>
  <text x="171" y="118" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">des clubs comme..."</text>
  <path d="M 224 90 L 233 90" stroke="#276749" stroke-width="1.5" marker-end="url(#arr7)" fill="none"/>
  <rect x="235" y="40" width="102" height="100" rx="8" fill="#38A169"/>
  <text x="286" y="65" text-anchor="middle" font-size="16">🔍</text>
  <text x="286" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">DÉCOUVERTE</text>
  <text x="286" y="94" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">"Combien de</text>
  <text x="286" y="106" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">licenciés ? Quelle</text>
  <text x="286" y="118" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">saison ?"</text>
  <path d="M 339 90 L 348 90" stroke="#276749" stroke-width="1.5" marker-end="url(#arr7)" fill="none"/>
  <rect x="350" y="40" width="102" height="100" rx="8" fill="#48BB78"/>
  <text x="401" y="65" text-anchor="middle" font-size="16">💬</text>
  <text x="401" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">ARGUMENTATION</text>
  <text x="401" y="94" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">CAB adapté au</text>
  <text x="401" y="106" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">profil du prospect</text>
  <text x="401" y="118" text-anchor="middle" font-size="7.5" fill="rgba(255,255,255,.8)">Bénéfice client</text>
  <path d="M 454 90 L 463 90" stroke="#276749" stroke-width="1.5" marker-end="url(#arr7)" fill="none"/>
  <rect x="465" y="40" width="102" height="100" rx="8" fill="#68D391"/>
  <text x="516" y="65" text-anchor="middle" font-size="16">🛡️</text>
  <text x="516" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#1A2E4A">OBJECTIONS</text>
  <text x="516" y="94" text-anchor="middle" font-size="7.5" fill="rgba(0,0,0,.7)">"Je comprends,</text>
  <text x="516" y="106" text-anchor="middle" font-size="7.5" fill="rgba(0,0,0,.7)">et justement c'est</text>
  <text x="516" y="118" text-anchor="middle" font-size="7.5" fill="rgba(0,0,0,.7)">pourquoi..."</text>
  <path d="M 569 90 L 578 90" stroke="#276749" stroke-width="1.5" marker-end="url(#arr7)" fill="none"/>
  <rect x="580" y="40" width="95" height="100" rx="8" fill="#9AE6B4"/>
  <text x="627" y="65" text-anchor="middle" font-size="16">✅</text>
  <text x="627" y="80" text-anchor="middle" font-size="9" font-weight="700" fill="#1A2E4A">CONCLUSION</text>
  <text x="627" y="94" text-anchor="middle" font-size="7.5" fill="rgba(0,0,0,.7)">"RDV mardi</text>
  <text x="627" y="106" text-anchor="middle" font-size="7.5" fill="rgba(0,0,0,.7)">ou jeudi ?"</text>
  <text x="627" y="118" text-anchor="middle" font-size="7.5" fill="rgba(0,0,0,.7)">Alternative positive</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>6 étapes : accroche · objet · découverte · argumentation · objections · conclusion</li>
<li>Toujours proposer un créneau de RDV précis, jamais une question ouverte sur la disponibilité</li>
</ul>
</div>`},
2:{t:"Conduire un entretien de prospection — Détailler le plan et traiter les objections",c:`<div class="res-section">
<div class="res-section-label">🟢 Le plan d'appel détaillé et la méthode ARA</div>
<ul><li><strong>1. Présentation</strong> (15s) — "Bonjour M. X, je suis [prénom], commercial chez LABORO Sport & Outdoor à Évry."</li><li><strong>2. Accroche personnalisée</strong> (20s) — un exemple concret récent lié à son secteur.</li><li><strong>3. Permission de continuer</strong> — "Est-ce que vous avez 3 minutes ?" (jamais "j'espère ne pas déranger", trop soumis).</li><li><strong>4. Découverte BANT</strong> — 2-3 questions ouvertes maximum, écouter plus que parler.</li><li><strong>5. Proposition ciblée</strong> — 1-2 avantages liés directement à ce qu'il vient de dire, jamais le catalogue en vrac.</li><li><strong>6. Prise de RDV</strong> — toujours 2 créneaux proposés, confirmation par mail dans l'heure.</li></ul>
<p><strong>Méthode ARA (Accepter · Reformuler · Argumenter) pour les objections :</strong></p>
<ul><li><strong>"On travaille avec Decathlon"</strong> → Accepter, puis reformuler : "Quelle est votre principale difficulté avec eux ?" puis argumenter sur la faille identifiée.</li><li><strong>"On n'a pas de budget"</strong> → Requalifier plutôt qu'insister : "Quel est votre budget habituel pour ce type d'achat ?"</li><li><strong>"Envoyez-moi une documentation"</strong> → Reprendre la main avant d'envoyer : "Puis-je vous poser 2 questions rapides ?"</li><li><strong>"C'est trop cher"</strong> → "Par rapport à quoi ?" avant de défendre le prix.</li></ul>
<div class="res-ex"><div class="res-ex-l">Exemple — objection Decathlon</div>
Pierre Lambert : "On commande déjà chez Decathlon, on est satisfaits." Réponse : "Je comprends, ils sont bien implantés. Quel est votre délai de livraison habituel ?" — "Environ 5 semaines." — "Chez nous c'est 3 semaines flocage inclus, avec un commercial dédié joignable directement." <strong>→ RDV obtenu 3 jours plus tard.</strong>
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>ARA : Accepter · Reformuler · Argumenter — jamais répondre sans avoir accepté d'abord</li>
<li>Une objection prix se traite en identifiant le point de comparaison, jamais en baissant le prix sans contrepartie</li>
</ul>
</div>`},
3:{t:"Conduire un entretien de prospection — Gérer plusieurs objections et la visite terrain",c:`<div class="res-section">
<div class="res-section-label">🟠 Quand les objections s'enchaînent</div>
<p>À ce niveau, le prospect ne soulève plus une seule objection isolée : il en enchaîne plusieurs dans le même échange, parfois pour tester ta réaction plus que par vraie difficulté. Ton rôle est de traiter la bonne objection en premier, pas toutes en même temps.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — objections en cascade</div>
"On est satisfaits de notre fournisseur actuel, et de toute façon le budget est déjà voté, et on n'a pas le temps de changer maintenant." Trois objections en une phrase. Mauvais réflexe : répondre aux trois d'un coup. Bon réflexe : identifier la plus bloquante ("le budget déjà voté" empêche tout achat cette année) et vérifier si c'est vraiment un frein définitif ou un prétexte : "Je comprends pour le budget de cette année — est-ce qu'un devis pour la saison prochaine, sans engagement, aurait un intérêt pour vous dès maintenant ?"
</div>
<p><strong>Préparer et mener une visite terrain :</strong> accroche personnalisée par prospect, objectif clair de la visite (découverte, devis, signature), documents à emporter (catalogue, grille tarifaire, échantillons, tablette pour devis immédiat). Pendant la visite : prendre des notes visibles, reformuler avant de proposer, ne jamais sortir le catalogue avant d'avoir qualifié les besoins.</p>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ta gestion des objections — par exemple : comment as-tu choisi quelle objection traiter en premier, et cet ordre a-t-il changé l'issue de l'entretien ? Ce n'est pas un résumé de l'échange, c'est un vrai retour critique sur ta méthode.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Face à plusieurs objections enchaînées, traite la plus bloquante en premier, jamais toutes à la fois</li>
<li>Une objection répétée par réflexe n'est pas toujours un frein définitif — vérifie-le avant d'abandonner</li>
<li>La réflexivité = un vrai retour critique sur ta méthode, pas un résumé de l'échange</li>
</ul>
</div>`},
4:{t:"Conduire un entretien de prospection — Fiche mémo express",c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter la performance des entretiens</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<ul>
<li><strong>Plan d'appel</strong> : présentation · accroche perso · permission · découverte BANT · proposition ciblée · RDV (2 créneaux)</li>
<li><strong>ARA</strong> : Accepter · Reformuler · Argumenter, objection par objection</li>
<li><strong>Après une visite</strong> : compte-rendu sous 2h · devis sous 24h · mise à jour LABORO Connect immédiate</li>
</ul>
<p><strong>Indicateurs de performance :</strong> taux de contact = joints ÷ appelés × 100 · taux de RDV = RDV ÷ contacts joints × 100 (objectif &gt;10%) · taux de transformation RDV-devis (objectif &gt;50%) · durée moyenne d'appel qualifié : 4-8 minutes.</p>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un prospect enchaîne plusieurs objections dans le même appel, dont une qui semble définitive. En autonomie complète, tu dois identifier la vraie objection bloquante, la traiter avec ARA, et conclure sur une action concrète (RDV ou date de relance précise) même en cas de refus immédiat.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : gérer un enchaînement d'objections et conclure sur une action, même face à un refus</li>
<li>Un compte-rendu rédigé rapidement vaut mieux que plusieurs relances improvisées plus tard</li>
</ul>
</div>`},
},
'B4.4':{
1:{t:'Assurer le suivi commercial — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer</div>
<p><strong>B4.4 — Assurer le suivi commercial.</strong> Après un premier contact, le suivi c'est ce qui transforme un prospect en client.</p>
<p><strong>La règle des 24h :</strong> envoyer le devis dans les 24h après un RDV. Un devis envoyé tard = client perdu.</p>
<p><strong>Le suivi en 3 étapes :</strong></p>
<ul>
<li><strong>Devis rapide</strong> — Envoyer le lendemain avec un récap de la conversation</li>
<li><strong>Relance J+5</strong> — "Avez-vous pu consulter notre proposition ?"</li>
<li><strong>Relance J+10</strong> — Dernière tentative, proposer une alternative si refus</li>
</ul>
<p><strong>Tracer dans LABORO Connect :</strong> date du RDV, devis envoyé, date de relance, résultat.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — suivi devis</div>
RDV lundi avec M. Kowalski (club basket). Mardi : devis envoyé (15 maillots + shorts = 847€ HT). Lundi suivant : relance mail "Bonjour M. Kowalski, avez-vous pu consulter notre proposition ?" — Il répond et signe.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#FFFBEB"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">B4.4 — SUIVI COMMERCIAL — La règle des 24h LABORO</text>
  <line x1="40" y1="90" x2="640" y2="90" stroke="#D97706" stroke-width="2" stroke-dasharray="5,3"/>
  <circle cx="80" cy="90" r="22" fill="#1A2E4A"/>
  <text x="80" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RDV</text>
  <text x="80" y="98" text-anchor="middle" font-size="8" fill="#63B3ED">J0</text>
  <text x="80" y="126" text-anchor="middle" font-size="8" fill="#4A5568">Qualifier</text>
  <text x="80" y="138" text-anchor="middle" font-size="8" fill="#4A5568">le besoin</text>
  <circle cx="240" cy="90" r="22" fill="#D97706"/>
  <text x="240" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">DEVIS</text>
  <text x="240" y="98" text-anchor="middle" font-size="8" fill="#fff">J+1</text>
  <text x="240" y="126" text-anchor="middle" font-size="8" fill="#D97706" font-weight="700">⚡ 24h max</text>
  <text x="240" y="138" text-anchor="middle" font-size="8" fill="#4A5568">Personnalisé</text>
  <circle cx="400" cy="90" r="22" fill="#2D5282"/>
  <text x="400" y="83" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RELANCE</text>
  <text x="400" y="95" text-anchor="middle" font-size="8" fill="#fff">J+5</text>
  <text x="400" y="126" text-anchor="middle" font-size="8" fill="#4A5568">"Avez-vous pu</text>
  <text x="400" y="138" text-anchor="middle" font-size="8" fill="#4A5568">consulter..."</text>
  <circle cx="560" cy="90" r="22" fill="#4A6FA5"/>
  <text x="560" y="83" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RELANCE</text>
  <text x="560" y="95" text-anchor="middle" font-size="8" fill="#fff">J+10</text>
  <text x="560" y="126" text-anchor="middle" font-size="8" fill="#4A5568">Dernière</text>
  <text x="560" y="138" text-anchor="middle" font-size="8" fill="#4A5568">tentative</text>
  <rect x="10" y="36" width="660" height="28" rx="6" fill="#FEF3C7"/>
  <text x="340" y="55" text-anchor="middle" font-size="9" fill="#92400E">
    <tspan font-weight="700">Règle LABORO : </tspan>
    <tspan>devis envoyé dans les 24h après RDV · Sinon le prospect passe à la concurrence</tspan>
  </text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Devis envoyé dans les 24h après le RDV, sans exception</li>
<li>3 étapes : devis rapide · relance J+5 · relance J+10</li>
<li>Chaque action se trace dans LABORO Connect</li>
</ul>
</div>`},
2:{t:'Assurer le suivi commercial — Structurer le devis et les relances',c:`<div class="res-section">
<div class="res-section-label">🟢 Structurer un devis et relancer efficacement</div>
<p><strong>Structure d'un devis LABORO efficace :</strong></p>
<ul>
<li>En-tête : logo LABORO + coordonnées + date + numéro de devis</li>
<li>Destinataire : nom du décisionnaire (pas juste la société)</li>
<li>Tableau des produits : référence · désignation · quantité · PAHT · remise · PVHT · TVA · PVTTC</li>
<li>Conditions : délai de livraison garanti · conditions de paiement · validité du devis (30 jours)</li>
<li>Bas de page : signature du commercial + formule d'engagement</li>
</ul>
<p><strong>Stratégie de relance selon le délai — ne jamais laisser un devis sans suivi :</strong></p>
<ul>
<li><strong>J+5</strong> — Relance courte par mail, sans pression : "Suite à notre échange du [date], avez-vous eu l'occasion d'étudier notre proposition ?"</li>
<li><strong>J+10</strong> — Apporter un élément nouveau (témoignage client similaire, actualité LABORO) pour rouvrir la conversation sans répéter le même message</li>
<li><strong>J+15 ou plus</strong> — Appel direct pour identifier le blocage réel (budget, concurrent, besoin redéfini)</li>
<li><strong>Au-delà de J+20 sans réponse</strong> — Qualifier le statut dans LABORO Connect : perdu, en veille, ou à réactiver</li>
</ul>
<p><strong>Indicateurs de suivi :</strong> taux de relance = prospects relancés ÷ devis envoyés × 100 (objectif 100%) · taux de transformation devis-contrat = contrats signés ÷ devis envoyés × 100 (objectif LABORO &gt; 30%) · délai moyen de signature.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — relance CE Thales J+10</div>
"Bonjour Isabelle, je reviens vers vous suite à notre échange du [date]. Nous venons de livrer une commande textile pour le CE Air France Toulouse dans le même contexte — leur retour est très positif sur nos délais. Seriez-vous disponible 10 min cette semaine ?" → Résultat : rappel reçu le lendemain, devis accepté sous 48h.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un devis LABORO complet inclut toujours le tableau produits avec PVHT/TVA/PVTTC et une validité de 30 jours</li>
<li>Chaque relance doit apporter un élément nouveau, jamais répéter le même message</li>
<li>Taux de transformation devis-contrat visé chez LABORO : &gt; 30%</li>
</ul>
</div>`},
3:{t:'Assurer le suivi commercial — Calculer le ROI et prioriser avec Pareto',c:`<div class="res-section">
<div class="res-section-label">🟠 Mesurer la rentabilité et prioriser un portefeuille</div>
<p><strong>Calculer le ROI (retour sur investissement)</strong> d'une action commerciale : ROI (%) = (Gain généré − Coût de l'action) ÷ Coût de l'action × 100. Un ROI positif signifie que l'action a rapporté plus qu'elle n'a coûté.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — calcul de ROI</div>
LABORO a investi 780 € dans une opération de prospection, qui a généré 31 200 € de CA sur l'année.<br>
ROI = (31 200 − 780) ÷ 780 × 100 ≈ <strong>3900%</strong>. Chaque euro investi en a rapporté environ 39 — l'opération est très rentable, même si l'objectif initial de contrats signés n'est pas atteint à 100%.
</div>
<p><strong>Appliquer la loi de Pareto (règle des 80/20)</strong> à un portefeuille : environ 80% du CA provient souvent de 20% des clients. Étapes : classer les clients du CA le plus élevé au plus faible → repérer ceux qui représentent ~80% du CA cumulé → adapter le suivi (les comptes prioritaires méritent un suivi rapproché en cas de temps limité, sans pour autant abandonner les autres).</p>
<div class="res-ex"><div class="res-ex-l">Exemple — portefeuille B2B LABORO</div>
Sur 5 comptes B2B, CE PSA Stellantis (22 400 €/an) et ArianeGroup (28 000 € potentiel) représentent à eux seuls la majorité du CA du portefeuille. En cas de charge de travail élevée, ce sont ces deux comptes qu'il faut prioriser — sans pour autant délaisser un compte plus petit comme Club Sportif Sénart.
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton arbitrage de priorisation — par exemple : qu'aurais-tu risqué si tu avais traité tous les comptes à égalité de temps, sans tenir compte du poids de chacun dans le CA ? Ce n'est pas un résumé du calcul de ROI ou du classement Pareto, c'est un vrai retour critique sur ta méthode de priorisation.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>ROI = (Gain − Coût) ÷ Coût × 100 — un ROI très élevé n'annule pas un objectif de contrats non atteint</li>
<li>Pareto : ~80% du CA vient souvent de ~20% des clients — c'est un ordre de grandeur, pas une règle exacte</li>
<li>La réflexivité = un vrai retour critique sur ta méthode de priorisation, pas un résumé des calculs</li>
</ul>
</div>`},
4:{t:'Assurer le suivi commercial — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — piloter un portefeuille de prospects en autonomie</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<p><strong>Champs à renseigner dans LABORO Connect après chaque action :</strong> date de l'action · type (appel, mail, visite) · résultat · prochaine action · date de relance.</p>
<p><strong>Statuts possibles :</strong> Prospect froid · Prospect tiède · Prospect chaud · Devis envoyé · En négociation · Client · Perdu (raison). Un prospect sans date de relance = prospect invisible pour toute l'équipe = prospect perdu.</p>
<p><strong>Réflexes à mobiliser :</strong> devis sous 24h · relance qui apporte du nouveau · calcul de ROI pour justifier un choix d'action · classement Pareto pour prioriser un portefeuille chargé.</p>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un portefeuille de prospects à statuts variés (devis envoyés, en négociation, en veille) et un temps limité. En autonomie complète, tu dois prioriser les comptes à traiter en premier, calculer le ROI d'une action passée pour la justifier, et mettre à jour le statut de chaque prospect dans LABORO Connect.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : piloter un portefeuille entier en priorisant selon le poids réel de chaque compte, pas dans l'ordre d'arrivée</li>
<li>LABORO Connect mis à jour dans les 10 minutes suivant chaque action, sans exception</li>
</ul>
</div>`},
},
'B4.5':{
1:{t:"Valoriser l'offre LABORO — Les bases",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer</div>
<p><strong>B4.5 — Valoriser l'offre LABORO face à la concurrence.</strong> Face à un concurrent moins cher, le rôle du commercial n'est pas de baisser le prix mais de démontrer la valeur réelle de l'offre LABORO.</p>
<p><strong>La méthode en 3 temps face à l'objection prix :</strong></p>
<ul>
<li><strong>Accepter</strong> — "Je comprends que le prix soit un critère important pour vous." Ne jamais réfuter d'emblée.</li>
<li><strong>Quantifier la valeur</strong> — chiffrer ou illustrer ce que LABORO apporte en plus (délais plus courts, commercial dédié, SAV, garanties...)</li>
<li><strong>Proposer une alternative</strong> — une offre d'entrée de gamme ou une commande test si l'écart de prix reste trop important</li>
</ul>
<p><strong>Construire une offre à plusieurs niveaux</strong> (Essentiel · Confort · Partenaire) permet au client de choisir selon son budget, sans se sentir piégé dans une seule option.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — répondre à l'objection prix</div>
Un client dit : "Chez Decathlon Pro, c'est 80 € de moins pour 20 maillots." Réponse : "Vous avez raison sur le prix — et avec LABORO, vous gagnez 2 semaines de délai de flocage en plus, et un commercial joignable directement en cas de souci. C'est aussi ça, la différence."
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">B4.5 — UNE OFFRE À PLUSIEURS NIVEAUX POUR VALORISER LABORO</text>
  <rect x="10" y="36" width="202" height="100" rx="10" fill="#1A2E4A"/>
  <text x="111" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">OFFRE ESSENTIEL</text>
  <text x="111" y="82" text-anchor="middle" font-size="11" font-weight="900" fill="#63B3ED">Produits standards</text>
  <text x="111" y="96" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Délai normal</text>
  <text x="111" y="108" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Paiement 30j</text>
  <text x="111" y="124" text-anchor="middle" font-size="7.5" fill="#63B3ED">Entrée de gamme</text>
  <rect x="220" y="36" width="238" height="100" rx="10" fill="#2D5282"/>
  <text x="339" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">OFFRE CONFORT</text>
  <text x="339" y="82" text-anchor="middle" font-size="11" font-weight="900" fill="#90CDF4">Produits premium</text>
  <text x="339" y="96" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Livraison prioritaire</text>
  <text x="339" y="108" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Suivi commercial mensuel</text>
  <text x="339" y="124" text-anchor="middle" font-size="7.5" fill="#90CDF4">Le choix le plus fréquent</text>
  <rect x="466" y="36" width="204" height="100" rx="10" fill="#4A6FA5"/>
  <text x="568" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">OFFRE PARTENAIRE</text>
  <text x="568" y="82" text-anchor="middle" font-size="11" font-weight="900" fill="#BEE3F8">Contrat annuel</text>
  <text x="568" y="96" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Commercial dédié</text>
  <text x="568" y="108" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Conditions négociées</text>
  <text x="568" y="124" text-anchor="middle" font-size="7.5" fill="#BEE3F8">Fidélisation maximale</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Méthode en 3 temps face au prix : accepter · quantifier la valeur · proposer une alternative</li>
<li>Une offre à 3 niveaux laisse le prospect choisir sans se sentir piégé</li>
</ul>
</div>`},
2:{t:"Valoriser l'offre LABORO — Comparer objectivement et argumenter",c:`<div class="res-section">
<div class="res-section-label">🟢 Construire un comparatif et une offre à plusieurs niveaux</div>
<p><strong>Analyser les forces et faiblesses concurrentielles :</strong> avant tout RDV stratégique, construire un tableau comparatif objectif sur les critères qui comptent pour CE prospect (prix, délai livraison, délai flocage, service commercial dédié, note clients...). Règle d'or : ne comparer que les critères où LABORO est supérieur ou égal, et ne jamais dénigrer un concurrent par son nom — comparer les offres, pas les entreprises.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — tableau comparatif clubs sportifs</div>
Prix maillots flocage : LABORO 28 €/u · Decathlon Pro 24 €/u · SportRun 31 €/u.<br>
Délai flocage : LABORO 3 semaines · Decathlon Pro 5 semaines · SportRun 2 semaines.<br>
Commercial dédié : LABORO Oui · Decathlon Non · SportRun Partiellement → différenciateur fort pour LABORO.
</div>
<p><strong>Construire une offre à plusieurs niveaux :</strong></p>
<ul>
<li><strong>Offre Essentiel</strong> — produits standards, délai normal, paiement 30j</li>
<li><strong>Offre Confort</strong> — produits premium + flocage, livraison prioritaire, suivi commercial mensuel</li>
<li><strong>Offre Partenaire</strong> — contrat annuel, commercial dédié, conditions négociées</li>
</ul>
<p><strong>Répondre à l'objection prix en 3 temps :</strong> accepter ("je comprends que le prix soit un critère important") → quantifier la valeur (chiffrer ce que LABORO apporte en plus) → proposer une entrée de gamme ou une commande test si l'écart reste trop important.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Comparer objectivement, sans dénigrer un concurrent nommément</li>
<li>3 niveaux d'offre : Essentiel · Confort · Partenaire</li>
</ul>
</div>`},
3:{t:"Valoriser l'offre LABORO — Calculer la valeur réelle et arbitrer",c:`<div class="res-section">
<div class="res-section-label">🟠 Calculer la valeur perçue et arbitrer un argumentaire concurrentiel</div>
<p><strong>Calculer la valeur de l'offre pour le prospect</strong> — comparer le coût total sur la durée réelle d'utilisation, pas sur le prix unitaire seul. <strong>Formule de la valeur perçue</strong> : Valeur = Bénéfices obtenus ÷ Prix payé. Augmenter la valeur = augmenter les bénéfices perçus, pas forcément baisser le prix.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — l'écart de prix qui devient nul</div>
LABORO 28 €/maillot · Decathlon 24 €/maillot · pour 20 maillots → écart 80 €. Mais délai flocage LABORO 3 semaines vs 5 semaines chez Decathlon = 14 jours gagnés. Si le tournoi du client est dans 3,5 semaines, Decathlon ne peut pas livrer à temps — l'écart de 80 € devient sans objet face au risque de ne pas être livré.
</div>
<p>Quand plusieurs arguments sont disponibles (prix, délai, service, garanties), il faut choisir lesquels mettre en avant selon ce qui compte réellement pour CE prospect précis — un argument fort pour un client (délai serré) peut être sans intérêt pour un autre (stock déjà constitué).</p>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — réponse construite (Marc Girault, Club Trail Sénart)</div>
Marc Girault : "LABORO c'est 80 € de plus que Decathlon pour 20 maillots."<br>
Réponse : "Vous avez raison sur le prix unitaire — et je comprends que 80 € ça compte. Ce que vous gagnez avec LABORO : le flocage en 3 semaines contre 5 chez eux. Votre tournoi est dans 3,5 semaines — avec Decathlon, vous ne seriez pas livré à temps. Et si un problème survient à la livraison, je suis joignable directement." <strong>Marc Girault signe le devis le lendemain.</strong>
</div>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton choix d'arguments — par exemple : pourquoi as-tu mis en avant le délai plutôt que le service commercial dédié dans ce cas précis, et qu'est-ce qui aurait changé avec un autre prospect ? Ce n'est pas un résumé de l'argumentaire, c'est un vrai retour critique sur ta sélection d'arguments.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Valeur perçue = Bénéfices ÷ Prix — un écart de prix peut devenir sans objet selon le contexte du prospect</li>
<li>Sélectionner les arguments selon ce qui compte pour CE prospect précis, pas une liste générique</li>
<li>La réflexivité = un vrai retour critique sur ta sélection d'arguments, pas un résumé</li>
</ul>
</div>`},
4:{t:"Valoriser l'offre LABORO — Fiche mémo express",c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — argumenter face à la concurrence en autonomie</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<p><strong>Réflexes à mobiliser :</strong> comparatif objectif et ciblé sur le prospect · méthode en 3 temps face au prix (accepter, quantifier, alternative) · calcul de la valeur perçue sur la durée réelle · offre à plusieurs niveaux si le budget est un frein.</p>
<p><strong>Jamais dénigrer un concurrent par son nom</strong> — comparer les offres, pas les entreprises. Un client LABORO satisfait reste en moyenne 4,2 ans : l'entrée de gamme est un investissement relationnel, pas juste une vente.</p>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un prospect compare LABORO à un concurrent moins cher sur un critère précis. En autonomie complète, tu dois construire un argumentaire chiffré qui dépasse le simple prix, en t'appuyant sur la valeur réelle pour ce client (délai, service, garanties) et proposer une offre adaptée à son budget si besoin.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : construire un argumentaire chiffré et adapté au prospect, jamais une réponse générique sur le prix</li>
</ul>
</div>`},
},
  'G4B':{
1:{t:'La prospection commerciale B2B — Les bases',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — La prospection chez LABORO</div>
<p><strong>Prospecter = trouver de nouveaux clients.</strong> Chez LABORO, la cible B2B = associations sportives, comités d'entreprise, clubs.</p>
<p><strong>Les 3 questions avant de prospecter :</strong></p>
<ul>
<li>Qui je cherche ? (profil client idéal : association de +20 membres, budget >500€/an)</li>
<li>Où je les trouve ? (fichiers mairie, fédérations sportives, LinkedIn, bouche-à-oreille)</li>
<li>Comment je les contacte ? (téléphone d'abord, email si pas joignable)</li>
</ul>
<p><strong>Les 5 techniques LABORO :</strong></p>
<ul>
<li><strong>Phoning</strong> — Appel téléphonique avec un plan structuré</li>
<li><strong>Emailing</strong> — Message court, personnalisé, avec un seul objectif</li>
<li><strong>Réseaux sociaux</strong> — LinkedIn pour les entreprises, Instagram pour les clubs</li>
<li><strong>Événements</strong> — Salons sport, tournois locaux, forums associations</li>
<li><strong>Recommandation</strong> — "Connaissez-vous quelqu'un qui pourrait..."</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — premier contact téléphonique</div>
"Bonjour, je suis [prénom] de LABORO Sport à Évry. Nous équipons plusieurs clubs de foot de l'Essonne. Je vous appelle car votre club reprend les entraînements en septembre — est-ce que vous avez déjà votre équipement ?"
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="260" rx="12" fill="#F8FAFF"/>
  <text x="340" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">ENTONNOIR DE PROSPECTION B2B — LABORO</text>
  <polygon points="100,40 580,40 520,88 160,88" fill="#1A2E4A"/>
  <text x="340" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">SUSPECTS</text>
  <text x="340" y="76" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">Toutes les associations sportives de l'Essonne (~400)</text>
  <text x="88" y="68" text-anchor="end" font-size="18" font-weight="900" fill="#1A2E4A">400</text>
  <text x="88" y="82" text-anchor="end" font-size="8" fill="#4A6FA5">contacts</text>
  <polygon points="160,96 520,96 460,144 220,144" fill="#2D5282"/>
  <text x="340" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">PROSPECTS QUALIFIÉS</text>
  <text x="340" y="132" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">Budget >300€, 15+ membres, actifs (~120)</text>
  <text x="148" y="124" text-anchor="end" font-size="18" font-weight="900" fill="#2D5282">120</text>
  <text x="148" y="138" text-anchor="end" font-size="8" fill="#4A6FA5">qualifiés</text>
  <polygon points="220,152 460,152 400,200 280,200" fill="#4A6FA5"/>
  <text x="340" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CONTACTS ABOUTIS</text>
  <text x="340" y="188" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">Appels décrochés (~60)</text>
  <text x="208" y="180" text-anchor="end" font-size="18" font-weight="900" fill="#4A6FA5">60</text>
  <text x="208" y="194" text-anchor="end" font-size="8" fill="#4A6FA5">aboutis</text>
  <polygon points="280,208 400,208 368,240 312,240" fill="#63B3ED"/>
  <text x="340" y="224" text-anchor="middle" font-size="10" font-weight="700" fill="#1A2E4A">RDV</text>
  <text x="340" y="237" text-anchor="middle" font-size="9" fill="#1A2E4A">~12</text>
  <text x="268" y="228" text-anchor="end" font-size="18" font-weight="900" fill="#63B3ED">12</text>
  <text x="268" y="242" text-anchor="end" font-size="8" fill="#4A6FA5">RDV</text>
  <text x="592" y="68" font-size="9" fill="#4A6FA5">Taux qualification</text>
  <text x="592" y="80" font-size="10" font-weight="700" fill="#1A2E4A">30%</text>
  <text x="592" y="124" font-size="9" fill="#4A6FA5">Taux contact</text>
  <text x="592" y="136" font-size="10" font-weight="700" fill="#1A2E4A">50%</text>
  <text x="592" y="180" font-size="9" fill="#4A6FA5">Taux RDV</text>
  <text x="592" y="192" font-size="10" font-weight="700" fill="#1A2E4A">20%</text>
  <rect x="10" y="246" width="660" height="10" rx="4" fill="#EBF4FF"/>
  <text x="340" y="254" text-anchor="middle" font-size="8.5" fill="#1A2E4A">
    <tspan font-weight="700">Objectif LABORO : </tspan>
    <tspan>3 ventes/mois sur 12 RDV = taux de transformation 25%</tspan>
  </text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>3 questions avant de prospecter : qui, où, comment</li>
<li>5 techniques : phoning · emailing · réseaux sociaux · événements · recommandation</li>
</ul>
</div>`},
2:{t:'La prospection commerciale B2B — Qualifier et mener un appel',c:`<div class="res-section">
<div class="res-section-label">🟢 Méthode BANT et plan d'appel structuré</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="160" rx="12" fill="#F0F9FF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">MÉTHODE BANT — Qualifier un prospect B2B</text>
  <rect x="15" y="38" width="155" height="108" rx="10" fill="#1A2E4A"/>
  <text x="92" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#63B3ED">B</text>
  <text x="92" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">BUDGET</text>
  <text x="92" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Quel est votre</text>
  <text x="92" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">budget équipement ?"</text>
  <text x="92" y="132" text-anchor="middle" font-size="8" fill="#63B3ED">Seuil LABORO : >300€</text>
  <rect x="178" y="38" width="155" height="108" rx="10" fill="#2D5282"/>
  <text x="255" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#90CDF4">A</text>
  <text x="255" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">AUTORITÉ</text>
  <text x="255" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Qui décide des</text>
  <text x="255" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">achats d'équipement ?"</text>
  <text x="255" y="132" text-anchor="middle" font-size="8" fill="#90CDF4">Parler au décideur</text>
  <rect x="341" y="38" width="155" height="108" rx="10" fill="#4A6FA5"/>
  <text x="418" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#BEE3F8">N</text>
  <text x="418" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">BESOIN</text>
  <text x="418" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Quels équipements</text>
  <text x="418" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">vous manquent ?"</text>
  <text x="418" y="132" text-anchor="middle" font-size="8" fill="#BEE3F8">Identifier le problème</text>
  <rect x="504" y="38" width="161" height="108" rx="10" fill="#185FA5"/>
  <text x="584" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#EBF8FF">T</text>
  <text x="584" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">TIMING</text>
  <text x="584" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Pour quand avez-vous</text>
  <text x="584" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">besoin de l'équipement ?"</text>
  <text x="584" y="132" text-anchor="middle" font-size="8" fill="#EBF8FF">Urgence = priorité</text>
</svg>
</div>
<p><strong>Structure du plan d'appel (à mémoriser) :</strong></p>
<ul>
<li>1. Présentation : "Bonjour M. X, je suis [prénom], commercial chez LABORO Sport à Évry."</li>
<li>2. Accroche : "Je vous contacte car nous équipons plusieurs clubs de votre secteur…"</li>
<li>3. Découverte : 2-3 questions BANT ouvertes</li>
<li>4. Proposition de valeur : 1-2 avantages LABORO ciblés sur ses besoins</li>
<li>5. Prise de RDV : "Seriez-vous disponible mardi ou jeudi pour un échange de 20 minutes ?"</li>
</ul>
<p><strong>Indicateurs d'une opération de prospection :</strong> taux de contact = prospects joints ÷ prospects appelés × 100 · taux de RDV = RDV obtenus ÷ contacts × 100 · taux de transformation = contrats signés ÷ devis envoyés × 100 · coût d'acquisition = budget ÷ nouveaux clients · ROI = (CA généré − coût) ÷ coût × 100.</p>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — opération CE Essonne</div>
47 appels → 16 RDV (34%) → 11 devis → 4 contrats (36%). Budget : 780 €. CA an 1 : 31 200 € HT. ROI = (31 200 − 780) ÷ 780 × 100 = <strong>3 900%</strong>.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>BANT : Budget · Authority · Need · Timing</li>
<li>Plan d'appel en 5 étapes, toujours dans le même ordre</li>
</ul>
</div>`},
3:{t:'La prospection commerciale B2B — Construire un plan complet',c:`<div class="res-section">
<div class="res-section-label">🟠 Le plan de prospection — construire une stratégie, pas des actions isolées</div>
<p>En PVOC, le plan de prospection est le document central qui structure toute l'activité commerciale. Il se distingue du simple "appel à froid" par sa dimension stratégique.</p>
<ul>
<li><strong>Prospection = processus</strong>, pas un acte isolé. Un prospect contacté une seule fois est perdu dans 80% des cas.</li>
<li><strong>La règle des 7 contacts</strong> : en B2B, il faut en moyenne 7 interactions avant une décision d'achat.</li>
<li><strong>Mix de prospection</strong> : combiner au minimum 2 techniques (e-mail + phoning, ou LinkedIn + visite) multiplie les chances de contact par 2,5.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — plan de prospection CE Essonne</div>
Contexte : Nina Chevalier veut conquérir 5 CE sur le secteur Essonne en 2 mois.<br><br>
Cible qualifiée : CE d'entreprises > 200 salariés · budget sport > 3 000 €/an · décisionnaire = responsable CE<br>
Nombre de prospects à contacter : 5 contrats ÷ (0,60 × 0,12 × 0,30) = 232 contacts nécessaires<br>
Techniques : LinkedIn (semaine 1-2) → e-mailing (semaine 3-4) → phoning (semaine 5-6) → visites (semaine 7-8)<br>
Budget : 400 € · Indicateurs : taux de contact > 60%, taux de RDV > 10%, taux de transformation > 25%<br>
<strong>Résultat : 7 contrats signés en 8 semaines (objectif dépassé)</strong>
</div>
<p>Le choix du mix et de l'ordre des techniques n'est jamais figé : si un premier canal ne produit pas les résultats attendus à mi-parcours, il faut savoir réajuster le plan en cours de route plutôt que d'attendre la fin de l'opération pour constater l'échec.</p>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur la construction de ton plan — par exemple : qu'est-ce qui t'a fait choisir cet ordre de techniques plutôt qu'un autre, et qu'aurais-tu ajusté si le taux de contact avait été plus faible que prévu à mi-parcours ? Ce n'est pas un résumé du planning, c'est un vrai retour critique sur ta stratégie.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un plan de prospection combine cible qualifiée, calcul du volume nécessaire, mix de techniques, budget et indicateurs</li>
<li>La règle des 7 contacts justifie de ne jamais abandonner après un seul essai</li>
<li>La réflexivité = un vrai retour critique sur ta stratégie, pas un résumé du plan</li>
</ul>
</div>`},
4:{t:'La prospection commerciale B2B — Fiche mémo express',c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — mener une opération de prospection de bout en bout</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<p><strong>Enchaînement complet à maîtriser :</strong> qualifier la cible (BANT) → dimensionner le volume de prospects nécessaire → choisir un mix d'au moins 2 techniques → construire le plan d'appel en 5 étapes → fixer les indicateurs avant le lancement → suivre et relancer avec la règle des 24h · assurer le suivi et le ROI (voir B4.4) → argumenter la valeur face à la concurrence (voir B4.5).</p>
<p>G4B mobilise l'ensemble des sous-compétences B4.1 à B4.5 : c'est la vision d'ensemble d'une opération de prospection B2B, de la recherche du prospect jusqu'à la signature.</p>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Un objectif commercial B2B à atteindre en un temps limité. En autonomie complète, tu dois construire et mener l'opération de bout en bout : cibler, qualifier, dimensionner, planifier le mix de techniques, exécuter les appels/e-mails, suivre les devis, et argumenter face à la concurrence si nécessaire.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : mener une opération de prospection complète, de la cible à la signature</li>
<li>G4B = la vue d'ensemble qui relie B4.1 à B4.5</li>
</ul>
</div>`},
},
  'ACC':{
1:{t:"L'accueil professionnel chez LABORO — Les bases",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — L'accueil chez LABORO</div>
<p><strong>La règle des 30 secondes :</strong> tout visiteur doit être pris en charge en moins de 30 secondes. Un regard et un sourire suffisent si on est occupé.</p>
<p><strong>Les 4 étapes d'un accueil réussi :</strong></p>
<ul>
<li><strong>Détecter</strong> — Repérer l'arrivée du client immédiatement</li>
<li><strong>Accueillir</strong> — "Bonjour !" avec le sourire, regard direct</li>
<li><strong>Orienter</strong> — "Je peux vous aider ?" ou "Je suis à vous dans un instant"</li>
<li><strong>Accompagner</strong> — Guider vers le bon univers, rester disponible</li>
</ul>
<p><strong>Au téléphone :</strong> décrocher avant la 3e sonnerie. "LABORO bonjour, [prénom] à l'appareil."</p>
<div class="res-ex"><div class="res-ex-l">Exemple — accueil showroom</div>
M. Leroy entre. Vous êtes en train de ranger un rayon. Vous levez les yeux, souriez : "Bonjour ! Je suis à vous dans 30 secondes." Vous finissez rapidement, vous vous approchez : "Voilà ! Vous cherchez quelque chose de particulier ?" — Il se sent attendu, pas ignoré.
</div>
</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">ACCUEIL LABORO — Les 4 étapes · Règle des 30 secondes</text>
  <defs>
    <marker id="arr5" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#2C5282"/>
    </marker>
  </defs>
  <rect x="15" y="38" width="148" height="98" rx="10" fill="#1A2E4A"/>
  <text x="89" y="63" text-anchor="middle" font-size="20">👁️</text>
  <text x="89" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">1. DÉTECTER</text>
  <text x="89" y="96" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Repérer l'arrivée</text>
  <text x="89" y="109" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">du client</text>
  <text x="89" y="124" text-anchor="middle" font-size="8" fill="#63B3ED">&lt; 30 secondes</text>
  <path d="M 165 87 L 180 87" stroke="#2C5282" stroke-width="2" marker-end="url(#arr5)" fill="none"/>
  <rect x="182" y="38" width="148" height="98" rx="10" fill="#2D5282"/>
  <text x="256" y="63" text-anchor="middle" font-size="20">😊</text>
  <text x="256" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">2. ACCUEILLIR</text>
  <text x="256" y="96" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Bonjour !"</text>
  <text x="256" y="109" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Sourire · Regard direct</text>
  <text x="256" y="124" text-anchor="middle" font-size="8" fill="#90CDF4">Toujours, même occupé</text>
  <path d="M 332 87 L 347 87" stroke="#2C5282" stroke-width="2" marker-end="url(#arr5)" fill="none"/>
  <rect x="349" y="38" width="148" height="98" rx="10" fill="#4A6FA5"/>
  <text x="423" y="63" text-anchor="middle" font-size="20">🗺️</text>
  <text x="423" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">3. ORIENTER</text>
  <text x="423" y="96" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Je peux vous aider ?"</text>
  <text x="423" y="109" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Identifier le besoin</text>
  <text x="423" y="124" text-anchor="middle" font-size="8" fill="#BEE3F8">Questions ouvertes</text>
  <path d="M 499 87 L 514 87" stroke="#2C5282" stroke-width="2" marker-end="url(#arr5)" fill="none"/>
  <rect x="516" y="38" width="149" height="98" rx="10" fill="#185FA5"/>
  <text x="590" y="63" text-anchor="middle" font-size="20">🤝</text>
  <text x="590" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">4. ACCOMPAGNER</text>
  <text x="590" y="96" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Guider vers le bon</text>
  <text x="590" y="109" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">univers · Rester dispo</text>
  <text x="590" y="124" text-anchor="middle" font-size="8" fill="#EBF8FF">Jusqu'à la vente</text>
</svg>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 étapes : détecter · accueillir · orienter · accompagner</li>
<li>30 secondes maximum pour prendre en charge un visiteur — c'est la règle absolue</li>
</ul>
</div>`},
2:{t:"L'accueil professionnel chez LABORO — Situations spécifiques et écrit",c:`<div class="res-section">
<div class="res-section-label">🟢 Gérer les situations difficiles et l'accueil professionnel</div>
<p><strong>La méthode des 3R</strong> pour gérer un visiteur mécontent ou impatient :</p>
<ul>
<li><strong>Reconnaître</strong> — "Je comprends que vous attendez depuis longtemps, c'est tout à fait normal de vous impatienter."</li>
<li><strong>Reformuler</strong> — "Si je comprends bien, vous cherchez…"</li>
<li><strong>Résoudre ou orienter</strong> — Apporter une solution ou rediriger vers la bonne personne avec une présentation complète.</li>
</ul>
<p><strong>Accueil d'un visiteur professionnel</strong> (fournisseur, partenaire, inspecteur) en 5 étapes : accueillir → vérifier identité/objet/RDV → prévenir l'interlocuteur interne avant de faire patienter → remettre un badge visiteur → accompagner ou orienter. Le registre des visites (heure d'arrivée/départ) est une obligation de sécurité.</p>
<p><strong>Communication écrite — trier et prioriser une boîte mail :</strong> urgent et important (réclamation, RDV imminent) à traiter en priorité · important non urgent (renseignement, partenariat) à transmettre · non important (spam) à supprimer sans répondre.</p>
<p><strong>5 règles d'un mail professionnel :</strong> objet clair · formule d'introduction · message concis (3-5 phrases) · formule de politesse finale · signature complète.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — réponse professionnelle à un client</div>
"Bonjour Madame Lambert, je prends bonne note de votre demande concernant votre commande n°2847. Je transmets immédiatement votre message à notre service e-commerce qui reviendra vers vous dans les 24 heures. Cordialement, [Prénom] — LABORO Sport & Outdoor"
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Méthode 3R : reconnaître · reformuler · résoudre ou orienter</li>
<li>Tout visiteur professionnel reçoit un badge et est inscrit au registre des visites</li>
<li>Un mail professionnel reste concis : 3 à 5 phrases</li>
</ul>
</div>`},
3:{t:"L'accueil professionnel chez LABORO — Coordonner et adapter",c:`<div class="res-section">
<div class="res-section-label">🟠 Accueillir un groupe et adapter son accueil à des publics spécifiques</div>
<p><strong>Préparer l'accueil d'un groupe</strong> (classe, délégation, groupe de clients) : confirmer le nombre de personnes et les besoins spécifiques (accessibilité, durée, intervenants) · préparer le matériel (badges, supports, salle) · briefer l'équipe · prévoir un plan B pour les imprévus (intervenant absent, retard, groupe plus important que prévu).</p>
<div class="res-ex"><div class="res-ex-l">Exemple — imprévu géré</div>
Un intervenant prévu pour la visite est absent au dernier moment. Plutôt que d'annuler une partie du programme, on réorganise l'ordre de la visite pour combler le créneau sans que le groupe perçoive de problème — l'accompagnateur improvise une présentation supplémentaire sur un autre univers LABORO.
</div>
<p><strong>Adapter son accueil à des publics spécifiques</strong> — un bon accueil, c'est le même niveau de service pour tous, mais adapté à chaque personne :</p>
<ul>
<li><strong>Client anglophone</strong> — quelques formules suffisent ("Welcome to LABORO, how can I help you?"), sinon trouver un collègue ou montrer plutôt qu'expliquer</li>
<li><strong>Client malentendant</strong> — se placer face à la personne, parler distinctement sans exagérer, proposer d'écrire si besoin</li>
<li><strong>Client en fauteuil roulant</strong> — se mettre à la même hauteur, vérifier l'accessibilité du parcours, proposer de l'aide sans l'imposer</li>
<li><strong>Client âgé</strong> — parler clairement, éviter le jargon, accompagner avec patience sur le numérique</li>
</ul>
<p>Quand plusieurs situations se superposent (par exemple un groupe qui inclut à la fois des visiteurs pressés et une personne à mobilité réduite), il faut choisir comment répartir son attention sans que personne ne se sente moins bien traité — ce qui suppose parfois de déléguer une partie de l'accueil à un collègue plutôt que de vouloir tout gérer seul.</p>
<p><strong>Réflexivité :</strong> la question réflexive de la mission te demande de revenir sur ton organisation face à une situation complexe — par exemple : comment as-tu réparti ton attention entre plusieurs visiteurs aux besoins différents, et qu'aurais-tu fait différemment si la situation avait duré plus longtemps ? Ce n'est pas un résumé de la situation, c'est un vrai retour critique sur tes choix d'organisation.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Un accueil de groupe se prépare en amont : logistique, briefing d'équipe, plan B</li>
<li>Adapter sa communication n'est pas faire moins bien, c'est faire autrement pour le même résultat</li>
<li>La réflexivité = un vrai retour critique sur ton organisation, pas un résumé de la situation</li>
</ul>
</div>`},
4:{t:"L'accueil professionnel chez LABORO — Fiche mémo express",c:`<div class="res-section">
<div class="res-section-label">🔴 Fiche mémo express — gérer l'accueil en autonomie complète</div>
<p>Cette fiche est volontairement courte : en situation d'épreuve, tu dois mobiliser ces réflexes seul, sans guidage.</p>
<p><strong>Réflexes à mobiliser selon la situation :</strong> accueil standard → 4 étapes en moins de 30 secondes · visiteur mécontent → méthode 3R · visiteur professionnel → vérifier/prévenir/badge/registre · communication écrite → trier par urgence et rédiger en 5 points · groupe → préparer en amont avec plan B · public spécifique → adapter sans dégrader le service.</p>
<div class="res-ex"><div class="res-ex-l">Cas type d'épreuve</div>
Plusieurs visiteurs aux profils différents se présentent en même temps (un groupe, un visiteur professionnel sans rendez-vous, un client mécontent). En autonomie complète, tu dois prioriser sans jamais donner l'impression à quelqu'un d'être ignoré, et mobiliser la bonne méthode pour chaque situation.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Autonomie totale : reconnaître la bonne méthode à appliquer selon la situation rencontrée, sans guidage</li>
<li>Un visiteur mal accueilli ne reviendra jamais et en parlera à 10 personnes — l'accueil reflète l'image de LABORO</li>
</ul>
</div>`},
},
};
// Missions filtrées par classe
