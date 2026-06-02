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
  'C1.2':{t:'La découverte des besoins et la vente',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Les bases de l'accueil</div>
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

<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <!-- Fond -->
  <rect width="680" height="200" rx="12" fill="#F8FAFF"/>
  
  <!-- Titre -->
  <text x="340" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">MÉTHODE CAB — Argumenter une vente chez LABORO</text>
  
  <!-- Flèches de connexion -->
  <path d="M 188 100 L 228 100" stroke="#4A6FA5" stroke-width="2" marker-end="url(#arrow)" fill="none"/>
  <path d="M 408 100 L 448 100" stroke="#4A6FA5" stroke-width="2" marker-end="url(#arrow)" fill="none"/>
  
  <!-- Marqueur flèche -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4A6FA5"/>
    </marker>
  </defs>
  
  <!-- Bloc C — Caractéristique -->
  <rect x="20" y="60" width="168" height="90" rx="10" fill="#1A2E4A"/>
  <text x="104" y="88" text-anchor="middle" font-size="28" font-weight="900" fill="#4A9EE8">C</text>
  <text x="104" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CARACTÉRISTIQUE</text>
  <text x="104" y="120" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,.8)">Ce que le produit est</text>
  <text x="104" y="133" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.65)">"Semelle Contagrip..."</text>
  
  <!-- Bloc A — Avantage -->
  <rect x="240" y="60" width="168" height="90" rx="10" fill="#2D5282"/>
  <text x="324" y="88" text-anchor="middle" font-size="28" font-weight="900" fill="#63B3ED">A</text>
  <text x="324" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">AVANTAGE</text>
  <text x="324" y="120" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,.8)">Ce que ça apporte</text>
  <text x="324" y="133" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.65)">"...donc meilleure adhérence"</text>
  
  <!-- Bloc B — Bénéfice -->
  <rect x="460" y="60" width="200" height="90" rx="10" fill="#185FA5"/>
  <text x="560" y="88" text-anchor="middle" font-size="28" font-weight="900" fill="#90CDF4">B</text>
  <text x="560" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">BÉNÉFICE CLIENT</text>
  <text x="560" y="120" text-anchor="middle" font-size="9.5" fill="rgba(255,255,255,.8)">Ce que le client ressent</text>
  <text x="560" y="133" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.65)">"...vous ne glisserez plus"</text>
  
  <!-- Exemple terrain -->
  <rect x="20" y="162" width="640" height="28" rx="6" fill="#EBF4FF"/>
  <text x="340" y="180" text-anchor="middle" font-size="9.5" fill="#1A2E4A">
    <tspan font-weight="700">Exemple LABORO : </tspan>
    <tspan>"Ces chaussures ont une semelle Contagrip (C) — donc une excellente adhérence sur terrain humide (A) — vous pourrez courir sereinement même sous la pluie (B)."</tspan>
  </text>
</svg>
</div></div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — La méthode CAB</div>
<p><strong>La méthode CAB — comment construire un argument de vente ?</strong></p>
<p>Une fois que tu connais les besoins du client, tu peux lui proposer le bon produit. La méthode CAB te permet de construire un argument convaincant en 3 parties :</p>
<ul>
<li><strong>C — Caractéristique</strong> : une donnée objective du produit (matière, poids, technologie, prix…)</li>
<li><strong>A — Avantage</strong> : ce que cette caractéristique permet de faire en général</li>
<li><strong>B — Bénéfice</strong> : ce que ça apporte SPÉCIFIQUEMENT à CE client — c'est la partie la plus importante</li>
</ul>
<p><strong>La formule :</strong> "Ce produit a [C], ce qui permet [A], et donc pour vous qui [besoin], [B]."</p>
<div class="res-ex"><div class="res-ex-l">Exemple CAB — LABORO</div>
M. Vidal cherche des chaussures de sport pour débuter, budget 70 €.<br><br>
<strong>C</strong> : "Le Nike Downshifter a une semelle Phylon très souple."<br>
<strong>A</strong> : "Ce qui lui donne un excellent amorti pour protéger les articulations."<br>
<strong>B</strong> : "Et donc pour vous qui débutez et voulez éviter les douleurs, c'est le choix idéal pour commencer en douceur."
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Accueil = sourire + salutation + disponibilité</li>
<li>Question ouverte = commence par Qui/Quoi/Comment/Pourquoi/Quand/Où/Quel</li>
<li>Découvrir les besoins AVANT de proposer un produit</li>
<li>CAB = Caractéristique → Avantage → Bénéfice (toujours lié au besoin du client)</li>
</ul>
</div>`},
  'C1.1':{t:'La veille commerciale',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Comprendre la veille commerciale</div>
<p><strong>La veille commerciale, c'est quoi ?</strong></p>
<p>C'est surveiller régulièrement ce qui se passe autour de toi : tes concurrents, les nouveaux produits, les attentes clients, les tendances du marché. Sans veille, tu découvres les mauvaises nouvelles trop tard.</p>
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
  <!-- Concurrentielle -->
  <rect x="15" y="38" width="155" height="118" rx="10" fill="#1A2E4A"/>
  <text x="92" y="64" text-anchor="middle" font-size="22">🏁</text>
  <text x="92" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CONCURRENTIELLE</text>
  <text x="92" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">SportRun, Decathlon</text>
  <text x="92" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Go Sport, Intersport</text>
  <text x="92" y="126" text-anchor="middle" font-size="8" fill="#63B3ED">Prix · Promos · Nouveautés</text>
  <text x="92" y="140" text-anchor="middle" font-size="8" fill="#63B3ED">Chaque lundi matin</text>
  <!-- Produit -->
  <rect x="178" y="38" width="155" height="118" rx="10" fill="#2D5282"/>
  <text x="255" y="64" text-anchor="middle" font-size="22">📦</text>
  <text x="255" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">PRODUIT</text>
  <text x="255" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Nike, Salomon, Asics</text>
  <text x="255" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Nouveaux catalogues</text>
  <text x="255" y="126" text-anchor="middle" font-size="8" fill="#90CDF4">Salons pro · Newsletters</text>
  <text x="255" y="140" text-anchor="middle" font-size="8" fill="#90CDF4">Fournisseurs</text>
  <!-- Client -->
  <rect x="341" y="38" width="155" height="118" rx="10" fill="#4A6FA5"/>
  <text x="418" y="64" text-anchor="middle" font-size="22">👥</text>
  <text x="418" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CLIENT</text>
  <text x="418" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Avis Google · Retours</text>
  <text x="418" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Questions en magasin</text>
  <text x="418" y="126" text-anchor="middle" font-size="8" fill="#BEE3F8">NPS · Réclamations</text>
  <text x="418" y="140" text-anchor="middle" font-size="8" fill="#BEE3F8">Tendances besoins</text>
  <!-- Réglementaire -->
  <rect x="504" y="38" width="161" height="118" rx="10" fill="#185FA5"/>
  <text x="584" y="64" text-anchor="middle" font-size="22">⚖️</text>
  <text x="584" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">RÉGLEMENTAIRE</text>
  <text x="584" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">Garanties légales</text>
  <text x="584" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">RGPD · Étiquetage</text>
  <text x="584" y="126" text-anchor="middle" font-size="8" fill="#EBF8FF">Journal officiel</text>
  <text x="584" y="140" text-anchor="middle" font-size="8" fill="#EBF8FF">Fédérations sportives</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Mettre en place un dispositif de veille</div>
<p><strong>Sources à utiliser :</strong></p>
<ul>
<li>Sites concurrents + Google Alertes (mot-clé + marque)</li>
<li>Réseaux sociaux des marques (Instagram, LinkedIn fournisseurs)</li>
<li>Newsletters professionnelles (LSA, Sport Stratégies)</li>
<li>Clients eux-mêmes — écoute active en magasin</li>
</ul>
<p><strong>Fréquence recommandée LABORO :</strong> veille hebdomadaire (30 min/semaine) + compte-rendu mensuel à Romain Sauzet.</p>
<p><strong>Indicateurs à suivre :</strong> évolution des prix concurrents, nouveaux produits marchés, NPS Google, tendances recherches clients.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 types : concurrentielle · produit · client · réglementaire</li>
<li>Veille hebdomadaire minimum — noter et partager en équipe</li>
<li>Sources clés : sites concurrents, Google Alertes, réseaux sociaux, clients</li>
<li>Sans veille = mauvaises surprises trop tard</li>
</ul>
</div>`},
  'C1.3':{t:"L'exécution de la vente — de l'accord à la fidélisation",c:`<div class="res-section res-debutant">
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
  <!-- Étape 1 -->
  <rect x="15" y="38" width="148" height="98" rx="10" fill="#276749"/>
  <text x="89" y="66" text-anchor="middle" font-size="22">💳</text>
  <text x="89" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">1. ENCAISSER</text>
  <text x="89" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">CB · Espèces · Chèque</text>
  <text x="89" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Carte fidélité si pas fait</text>
  <path d="M 165 87 L 180 87" stroke="#276749" stroke-width="2" marker-end="url(#arr4)" fill="none"/>
  <!-- Étape 2 -->
  <rect x="182" y="38" width="148" height="98" rx="10" fill="#2F855A"/>
  <text x="256" y="66" text-anchor="middle" font-size="22">🧾</text>
  <text x="256" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">2. DOCUMENTS</text>
  <text x="256" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Ticket obligatoire dès 1€</text>
  <text x="256" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Garantie · Notice</text>
  <path d="M 332 87 L 347 87" stroke="#276749" stroke-width="2" marker-end="url(#arr4)" fill="none"/>
  <!-- Étape 3 -->
  <rect x="349" y="38" width="148" height="98" rx="10" fill="#38A169"/>
  <text x="423" y="66" text-anchor="middle" font-size="22">➕</text>
  <text x="423" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">3. SERVICES +</text>
  <text x="423" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Livraison · Garantie étendue</text>
  <text x="423" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Personnalisation textile</text>
  <path d="M 499 87 L 514 87" stroke="#276749" stroke-width="2" marker-end="url(#arr4)" fill="none"/>
  <!-- Étape 4 -->
  <rect x="516" y="38" width="149" height="98" rx="10" fill="#48BB78"/>
  <text x="590" y="66" text-anchor="middle" font-size="22">👋</text>
  <text x="590" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">4. PRISE DE CONGÉ</text>
  <text x="590" y="99" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Remercier · Inviter</text>
  <text x="590" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">à revenir</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Optimiser la conclusion de vente</div>
<p><strong>Techniques de conclusion :</strong></p>
<ul>
<li><strong>Résumé bénéfices</strong> — "Donc vous avez choisi les Salomon X Ultra pour leur amorti et leur légèreté — excellent choix pour le trail humide."</li>
<li><strong>Alternative positive</strong> — "Vous préférez payer en CB ou en espèces ?"</li>
<li><strong>Urgence factuelle</strong> — "C'est le dernier en taille 43 en stock."</li>
</ul>
<p><strong>Documents obligatoires :</strong> ticket de caisse (dès 1€) · facture pour les pros · bon de garantie légale 2 ans · bon de livraison si commande.</p>
<p><strong>KPI à suivre :</strong> valeur panier moyen, taux d'ajout service complémentaire, taux de carte fidélité proposée.</p>
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
  'C2.1':{t:'Le suivi de la commande client',c:`<div class="res-section res-debutant">
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
  <!-- Livraison standard -->
  <rect x="15" y="38" width="205" height="108" rx="10" fill="#1A2E4A"/>
  <text x="117" y="66" text-anchor="middle" font-size="22">📦</text>
  <text x="117" y="83" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">LIVRAISON DOMICILE</text>
  <text x="117" y="99" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Standard 48h — 6,90€</text>
  <text x="117" y="112" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Express 24h — 12,90€</text>
  <text x="117" y="128" text-anchor="middle" font-size="8" fill="#63B3ED">Chronopost · Numéro de suivi</text>
  <!-- Click and collect -->
  <rect x="228" y="38" width="223" height="108" rx="10" fill="#2D5282"/>
  <text x="340" y="66" text-anchor="middle" font-size="22">🏪</text>
  <text x="340" y="83" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">CLICK &amp; COLLECT</text>
  <text x="340" y="99" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Retrait showroom Évry</text>
  <text x="340" y="112" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Disponible sous 2h — Gratuit</text>
  <text x="340" y="128" text-anchor="middle" font-size="8" fill="#90CDF4">Commande en ligne + retrait</text>
  <!-- Retard -->
  <rect x="459" y="38" width="206" height="108" rx="10" fill="#9B4444"/>
  <text x="562" y="66" text-anchor="middle" font-size="22">⚠️</text>
  <text x="562" y="83" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EN CAS DE RETARD</text>
  <text x="562" y="99" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">Prévenir le client AVANT</text>
  <text x="562" y="112" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.85)">qu'il ne contacte LABORO</text>
  <text x="562" y="128" text-anchor="middle" font-size="8" fill="#FCA5A5">SMS · Délai précis · Excuse</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Le suivi de commande</div>
<p><strong>5 étapes du suivi de commande :</strong></p><ul><li><strong>Enregistrer</strong> — Tous les détails dans LABORO Connect immédiatement : référence, produit, quantité, délai, mode de livraison, contact client.</li><li><strong>Vérifier la disponibilité</strong> — Si rupture partielle ou totale, contacter le client AVANT qu'il s'inquiète. Proposer une alternative.</li><li><strong>Suivre l'acheminement</strong> — Transmettre le numéro de suivi transporteur par SMS ou mail dès expédition. Chronopost = lien de suivi automatique.</li><li><strong>Anticiper les retards</strong> — C'est la règle d'or LABORO : contacter le client AVANT qu'il appelle. Un retard annoncé proactivement est presque toujours pardonné.</li><li><strong>Confirmer la réception</strong> — Appel ou mail de suivi J+2 = opportunité de fidélisation et de vente additionnelle.</li></ul><p><strong>Calculs utiles :</strong></p><ul><li>Délai de livraison = date de commande + délai fournisseur + délai transport</li><li>Stock d'alerte = ventes journalières × délai de réassort en jours</li><li>Taux de livraison dans les délais = (livraisons à temps ÷ total livraisons) × 100</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — Commande Mairie d'Évry</div>Commande de 50 ballons Trigon (stock 31 unités). Rupture partielle détectée → appel immédiat à David Chemin → proposition : livraison partielle J+2 + solde J+12. Client satisfait de la transparence.</div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Ne jamais attendre qu'un client appelle pour signaler un problème. LABORO Connect doit être mis à jour à chaque étape — pas en fin de journée. Un suivi proactif coûte 5 minutes et peut sauver un client.</div>
</div>`},
  'C2.1b':{t:'Les services associés — proposer et gérer',c:`<div class="res-section res-debutant">
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
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Gérer les services associés</div>
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
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>5 services : livraison · click and collect · personnalisation · démo · garantie</li>
<li>Proposer pendant la vente, pas après</li>
<li>Tout service engagé = LABORO responsable</li>
</ul>
</div>`},
  'C2.2':{t:'Gérer une réclamation client',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Gérer une réclamation simplement</div>
<p><strong>Une réclamation, c'est quoi ?</strong></p>
<p>C'est quand un client exprime son insatisfaction — il n'a pas reçu ce qu'il attendait. Bien gérer une réclamation = transformer un client mécontent en client fidèle.</p>
<p><strong>La méthode ERESA en 5 étapes :</strong></p>
<ul>
<li><strong>E — Écouter</strong> : laisser le client parler sans interrompre</li>
<li><strong>R — Reformuler</strong> : "Si je comprends bien, votre commande..."</li>
<li><strong>E — Empathie</strong> : "Je comprends votre frustration..."</li>
<li><strong>S — Solution</strong> : proposer une solution concrète</li>
<li><strong>A — Accord</strong> : valider avec le client</li>
</ul>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <!-- Fond -->
  <rect width="680" height="230" rx="12" fill="#FFF8F8"/>
  
  <!-- Titre -->
  <text x="340" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="#7B2D2D">MÉTHODE ERESA — Gérer une réclamation chez LABORO</text>
  
  <!-- Defs -->
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#9B4444"/>
    </marker>
  </defs>
  
  <!-- Étape E1 — Écouter -->
  <rect x="10" y="45" width="116" height="120" rx="10" fill="#7B2D2D"/>
  <text x="68" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FECACA">E</text>
  <text x="68" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">ÉCOUTER</text>
  <text x="68" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Laisser parler</text>
  <text x="68" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">sans interrompre</text>
  <text x="68" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Posture ouverte</text>
  <text x="68" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Regard direct</text>
  
  <!-- Flèche 1 -->
  <path d="M 128 105 L 143 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  
  <!-- Étape R — Reformuler -->
  <rect x="145" y="45" width="116" height="120" rx="10" fill="#9B3636"/>
  <text x="203" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FCA5A5">R</text>
  <text x="203" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">REFORMULER</text>
  <text x="203" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Si je comprends</text>
  <text x="203" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">bien..."</text>
  <text x="203" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Valider le problème</text>
  <text x="203" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Montrer qu'on écoute</text>
  
  <!-- Flèche 2 -->
  <path d="M 263 105 L 278 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  
  <!-- Étape E2 — Empathie -->
  <rect x="280" y="45" width="116" height="120" rx="10" fill="#B45454"/>
  <text x="338" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FCA5A5">E</text>
  <text x="338" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EMPATHIE</text>
  <text x="338" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Je comprends</text>
  <text x="338" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">votre frustration"</text>
  <text x="338" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Se mettre à sa place</text>
  <text x="338" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Jamais se justifier</text>
  
  <!-- Flèche 3 -->
  <path d="M 398 105 L 413 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  
  <!-- Étape S — Solution -->
  <rect x="415" y="45" width="116" height="120" rx="10" fill="#C16060"/>
  <text x="473" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FEE2E2">S</text>
  <text x="473" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">SOLUTION</text>
  <text x="473" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Proposer 1 ou 2</text>
  <text x="473" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">options concrètes</text>
  <text x="473" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Délai précis</text>
  <text x="473" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Engagement ferme</text>
  
  <!-- Flèche 4 -->
  <path d="M 533 105 L 548 105" stroke="#9B4444" stroke-width="1.5" marker-end="url(#arrow2)" fill="none"/>
  
  <!-- Étape A — Accord -->
  <rect x="550" y="45" width="120" height="120" rx="10" fill="#D97B7B"/>
  <text x="610" y="78" text-anchor="middle" font-size="26" font-weight="900" fill="#FFF1F1">A</text>
  <text x="610" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">ACCORD</text>
  <text x="610" y="112" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"Cette solution</text>
  <text x="610" y="124" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">vous convient ?"</text>
  <text x="610" y="140" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Valider avec le client</text>
  <text x="610" y="152" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.65)">Remercier + suivre</text>
  
  <!-- Barre résultat -->
  <rect x="10" y="178" width="660" height="40" rx="8" fill="#FEE2E2" stroke="#FECACA" stroke-width="1"/>
  <text x="340" y="193" text-anchor="middle" font-size="9" font-weight="700" fill="#7B2D2D">Objectif : transformer un client mécontent en ambassadeur LABORO</text>
  <text x="340" y="210" text-anchor="middle" font-size="8.5" fill="#9B4444">Un client dont la réclamation est bien gérée est plus fidèle qu'un client qui n'a jamais eu de problème.</text>
</svg>
</div>
<div class="res-ex"><div class="res-ex-l">Exemple simple</div>
Client : "Ma commande n'est pas arrivée !" — Vous : "Je comprends, c'est frustrant. Votre commande devait arriver hier. Je vérifie immédiatement et je vous rappelle dans 30 minutes avec une solution."
</div>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<p><strong>Les 5 étapes LABORO — méthode ERESA :</strong></p><ul><li><strong>E — Écouter</strong> — Sans interrompre, sans se justifier. Le client a besoin d'être entendu avant tout. Durée : aussi longtemps qu'il le faut.</li><li><strong>R — Reformuler</strong> — "Si je comprends bien, vous avez reçu un produit endommagé alors que vous en avez besoin pour samedi. C'est bien ça ?" Montre qu'on a écouté.</li><li><strong>E — S'excuser</strong> — Au nom de LABORO, même si c'est la faute du transporteur. "Je suis vraiment désolé(e) pour cette situation."</li><li><strong>S — Proposer une Solution</strong> — Avoir en tête les 3 niveaux de compensation LABORO : échange immédiat / remboursement / bon d'achat compensatoire.</li><li><strong>A — Agir et tracer</strong> — Conclure avec un engagement clair, une date, un suivi. Tout noter dans LABORO Connect.</li></ul><p><strong>Droits du consommateur à connaître :</strong></p><ul><li>Droit de rétractation : 14 jours pour les achats en ligne (e-commerce uniquement)</li><li>Garantie légale de conformité : 2 ans sur tous les produits (Code de la consommation)</li><li>Garantie commerciale LABORO : 30 jours échange ou remboursement sans justification</li></ul><p><strong>Niveaux de geste commercial autorisés chez LABORO :</strong></p><ul><li>Conseiller de vente : bon d'achat jusqu'à 20 €</li><li>Responsable : remboursement partiel ou échange</li><li>PDG : geste exceptionnel au-delà</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — Mme Renard</div>Tapis de yoga reçu endommagé. Écouter → reformuler → s'excuser → proposer : échange immédiat en magasin ou remboursement sous 5 jours. Mme Renard choisit l'échange + bon d'achat 10€. Notation LABORO Connect "réclamation résolue — client satisfait".</div><p><strong>L'empathie dans le traitement des réclamations</strong></p>
<p>L'empathie c'est la capacité à se mettre à la place du client et à lui montrer qu'on comprend ce qu'il ressent — sans forcément lui donner raison sur tout. C'est la compétence numéro 1 pour désamorcer une réclamation.</p>
<ul>
<li><strong>Phrases d'empathie efficaces</strong> :
  <ul>
    <li>"Je comprends tout à fait votre frustration, ce n'est pas ce qu'on vous a promis."</li>
    <li>"Je suis sincèrement désolé(e) pour ce désagrément, vous avez eu raison de nous contacter."</li>
    <li>"À votre place, j'aurais réagi de la même façon."</li>
  </ul>
</li>
<li><strong>Ce qu'il ne faut JAMAIS dire</strong> :
  <ul>
    <li>"C'est pas de notre faute" → ça rejette la responsabilité</li>
    <li>"C'est écrit dans les conditions générales" → ça met le client en tort</li>
    <li>"Calmez-vous" → ça amplifie l'énervement</li>
  </ul>
</li>
<li><strong>La règle des 3 E</strong> : Écouter sans interrompre · Exprimer l'empathie · Engager une solution concrète</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — réclamation avec empathie</div>
Client : "J'ai commandé des chaussures il y a 3 semaines, je n'ai toujours rien reçu. C'est un scandale !"<br><br>
Mauvaise réponse : "Le délai c'est 3 semaines, c'est normal."<br><br>
Bonne réponse avec empathie : "Je comprends votre mécontentement, attendre 3 semaines sans nouvelles c'est vraiment frustrant. Je vais vérifier immédiatement où en est votre commande et je vous rappelle dans les 30 minutes avec une réponse concrète."<br><br>
<strong>Résultat</strong> : le client se sent entendu → la tension baisse → il reste client.
</div>
<div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Un client dont la réclamation est bien gérée est souvent plus fidèle qu'un client qui n'a jamais eu de problème. Écouter sans interrompre est la compétence la plus difficile et la plus importante.</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Concevoir une politique de gestion des réclamations</div>
<p><strong>Une politique de réclamations, c'est quoi ?</strong></p>
<p>C'est un ensemble de règles et procédures que l'entreprise applique systématiquement pour traiter les insatisfactions. Elle garantit la cohérence et la qualité du traitement, quel que soit le collaborateur.</p>
<p><strong>Les 4 piliers d'une bonne politique réclamations chez LABORO :</strong></p>
<ul>
<li><strong>1. Traçabilité</strong> — Toute réclamation est enregistrée dans LABORO Connect avec : date, client, nature du problème, solution apportée, délai de traitement.</li>
<li><strong>2. Délais engagés</strong> — Accusé de réception sous 24h. Réponse complète sous 48h max. Solution ou compensation sous 72h.</li>
<li><strong>3. Niveaux de compensation</strong> — Geste commercial (bon d'achat 10-20€) / Remboursement partiel / Remplacement produit / Remboursement total selon la gravité.</li>
<li><strong>4. Analyse et prévention</strong> — Bilan mensuel des réclamations. Identification des causes récurrentes. Actions correctives décidées en équipe.</li>
</ul>
<p><strong>Analyser les réclamations pour s'améliorer :</strong></p>
<ul>
<li>Taux de réclamation = (nb réclamations / nb ventes) × 100. Objectif LABORO : &lt; 2%</li>
<li>Délai moyen de traitement = temps total de résolution / nb réclamations</li>
<li>Taux de satisfaction post-réclamation = clients satisfaits après traitement / total</li>
<li>Réclamations par type : livraison / produit défectueux / erreur commande / SAV</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Bonne pratique LABORO</div>
Chaque mois, Nina Chevalier présente en réunion d'équipe le "Top 3 des réclamations du mois". L'équipe identifie la cause racine et décide d'une action corrective concrète. Résultat : le taux de réclamation a baissé de 3,2% à 1,8% en 6 mois.
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Politique réclamations = traçabilité + délais + compensation + analyse</li>
<li>Taux de réclamation cible LABORO : &lt; 2%</li>
<li>Chaque réclamation est une opportunité d'amélioration</li>
<li>Analyse mensuelle = actions correctives = baisse du taux</li>
</ul>
</div>`},
  'C2.3':{t:'Mesurer et analyser la satisfaction client',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Comprendre la satisfaction client</div>
<p><strong>Pourquoi mesurer la satisfaction ?</strong></p>
<p>Un client satisfait revient et recommande LABORO. Un client insatisfait part et en parle autour de lui. Mesurer la satisfaction permet de s'ameliorer avant qu'il soit trop tard.</p>
<p><strong>Les 2 indicateurs a connaitre :</strong></p>
<ul>
<li><strong>Taux de satisfaction</strong> = (clients satisfaits + tres satisfaits) / total repondants x 100<br><em>Objectif LABORO : 80% minimum</em></li>
<li><strong>NPS (Net Promoter Score)</strong> — on demande au client : de 0 a 10, recommanderiez-vous LABORO ?<br>— Notes 9-10 = Promoteurs (ils recommandent)<br>— Notes 7-8 = Neutres<br>— Notes 0-6 = Detracteurs (ils critiquent)<br><em>NPS = % Promoteurs − % Detracteurs. Un NPS positif est bon.</em></li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO</div>
Sur 50 reponses : 30 tres satisfaits + 15 satisfaits + 5 insatisfaits.<br>
Taux = (30+15)/50 x 100 = <strong>90%</strong><br>
NPS : 20 Promoteurs, 5 Detracteurs = 40% - 10% = <strong>+30</strong>
</div>
</div>

<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="170" rx="12" fill="#FFFBEB"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">LE NPS — Mesurer la satisfaction client LABORO</text>
  <!-- Échelle NPS -->
  <text x="340" y="48" text-anchor="middle" font-size="10" fill="#4A5568">"Recommanderiez-vous LABORO à un ami ?" — Note de 0 à 10</text>
  <!-- Détracteurs 0-6 -->
  <rect x="15" y="58" width="220" height="70" rx="8" fill="#FEE2E2"/>
  <text x="125" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#9B1C1C">😤 DÉTRACTEURS</text>
  <text x="125" y="96" text-anchor="middle" font-size="22" font-weight="900" fill="#EF4444">0 → 6</text>
  <text x="125" y="116" text-anchor="middle" font-size="9" fill="#9B1C1C">Insatisfaits — risque de mauvais avis</text>
  <!-- Passifs 7-8 -->
  <rect x="243" y="58" width="193" height="70" rx="8" fill="#FEF9C3"/>
  <text x="339" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#854D0E">😐 PASSIFS</text>
  <text x="339" y="96" text-anchor="middle" font-size="22" font-weight="900" fill="#D97706">7 → 8</text>
  <text x="339" y="116" text-anchor="middle" font-size="9" fill="#854D0E">Neutres — pas de recommandation</text>
  <!-- Promoteurs 9-10 -->
  <rect x="444" y="58" width="221" height="70" rx="8" fill="#D1FAE5"/>
  <text x="554" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#065F46">😍 PROMOTEURS</text>
  <text x="554" y="96" text-anchor="middle" font-size="22" font-weight="900" fill="#10B981">9 → 10</text>
  <text x="554" y="116" text-anchor="middle" font-size="9" fill="#065F46">Ambassadeurs — bouche-à-oreille</text>
  <!-- Formule -->
  <rect x="15" y="138" width="650" height="24" rx="6" fill="#EBF4FF"/>
  <text x="340" y="154" text-anchor="middle" font-size="9.5" fill="#1A2E4A">
    <tspan font-weight="700">NPS = </tspan>
    <tspan>% Promoteurs − % Détracteurs  ·  </tspan>
    <tspan font-weight="700">Objectif LABORO : NPS &gt; +20  ·  </tspan>
    <tspan>Score actuel : +22 ✅</tspan>
  </text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Analyser et agir</div>
<p><strong>3 indicateurs clés à maîtriser :</strong></p><ul><li><strong>Taux de satisfaction</strong> = (clients satisfaits + très satisfaits) ÷ total répondants × 100. Objectif LABORO : ≥ 80%.</li><li><strong>NPS (Net Promoter Score)</strong> = % Promoteurs (notes 9-10) − % Détracteurs (notes 0-6). Les neutres (7-8) ne comptent pas. Un NPS > 0 est positif, > 30 est excellent.</li><li><strong>Taux de réponse</strong> = répondants ÷ clients interrogés × 100. Taux < 20% = résultats non représentatifs.</li></ul><p><strong>Comment collecter les avis :</strong></p><ul><li>Enquête post-achat par e-mail (J+7 après livraison)</li><li>Avis Google — répondre à TOUS les avis, positifs et négatifs</li><li>Questionnaire en point de vente (tablette ou QR code)</li><li>Appel de satisfaction pour les clients B2B stratégiques</li></ul><p><strong>Comment analyser :</strong> Un taux de satisfaction n'a de sens qu'avec une action corrective. Identifier la cause → proposer une solution → mesurer l'amélioration.</p><div class="res-ex"><div class="res-ex-l">Calcul complet — données LABORO</div>118 répondants : 52 très satisfaits + 37 satisfaits = 89 satisfaits. Taux = 89÷118×100 = <strong>75,4%</strong> (objectif 80% non atteint).<br>NPS : 44 promoteurs (37%) − 11 détracteurs (9%) = <strong>+28</strong> — bon score.<br>Action prioritaire : délais e-commerce (38% des insatisfaits) → négociation avec Chronopost.</div><p><strong>Analyser les verbatims clients</strong></p>
<p>Un <strong>verbatim</strong> est une réponse textuelle libre d'un client dans une enquête de satisfaction ("En quelques mots, comment décririez-vous votre expérience ?"). C'est la donnée la plus riche car elle révèle les vrais motifs de satisfaction ou d'insatisfaction.</p>
<ul>
<li><strong>Verbatim positif</strong> → identifier ce qui crée de la valeur pour le client et amplifier</li>
<li><strong>Verbatim négatif</strong> → identifier le problème précis, prioriser les corrections</li>
<li><strong>Méthode d'analyse</strong> : regrouper les verbatims par thème (livraison, prix, conseil, accueil, produit) · compter les occurrences · identifier les 2-3 sujets les plus cités</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — analyse verbatims rayon running</div>
24 avis Google analysés · Note moyenne : 3,8/5<br><br>
<strong>Verbatims négatifs récurrents :</strong><br>
"Pas assez de choix en tailles" (8 mentions) · "Délai de commande trop long" (5 mentions) · "Prix élevés" (4 mentions)<br><br>
<strong>Verbatims positifs récurrents :</strong><br>
"Conseiller très compétent" (11 mentions) · "Bonne ambiance en magasin" (7 mentions)<br><br>
<strong>Action prioritaire</strong> : élargir les tailles disponibles → s'adresse au problème le plus cité (8/24 = 33% des avis)
</div>
<div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Un chiffre sans analyse ne sert à rien. Les insatisfaits sont plus précieux que les satisfaits — ils disent ce qu'il faut corriger. Comparer les résultats dans le temps est plus utile qu'un résultat isolé.</div>
</div>`},
  'C3.1':{t:"Traiter l'information et le contact client",c:`<div class="res-section res-debutant">
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
  <!-- Email -->
  <rect x="15" y="38" width="202" height="105" rx="10" fill="#1A2E4A"/>
  <text x="116" y="64" text-anchor="middle" font-size="22">📧</text>
  <text x="116" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EMAIL</text>
  <text x="116" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Objet court · Corps 3-4 lignes</text>
  <text x="116" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Signature complète</text>
  <text x="116" y="126" text-anchor="middle" font-size="8" fill="#63B3ED">Réponse &lt; 24h · Toujours</text>
  <!-- Téléphone -->
  <rect x="225" y="38" width="230" height="105" rx="10" fill="#2D5282"/>
  <text x="340" y="64" text-anchor="middle" font-size="22">📞</text>
  <text x="340" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">TÉLÉPHONE</text>
  <text x="340" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">"LABORO bonjour, [prénom]"</text>
  <text x="340" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Avant la 3e sonnerie</text>
  <text x="340" y="126" text-anchor="middle" font-size="8" fill="#90CDF4">Sourire — ça s'entend !</text>
  <!-- En magasin -->
  <rect x="463" y="38" width="202" height="105" rx="10" fill="#4A6FA5"/>
  <text x="564" y="64" text-anchor="middle" font-size="22">🏪</text>
  <text x="564" y="82" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">EN MAGASIN</text>
  <text x="564" y="97" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Accueil sous 30 sec</text>
  <text x="564" y="110" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.85)">Regard · Sourire · Dispo</text>
  <text x="564" y="126" text-anchor="middle" font-size="8" fill="#BEE3F8">Jamais ignorer un client</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Développer la relation client multicanale</div>
<p><strong>Personnaliser la communication :</strong></p>
<ul>
<li>Utiliser le nom du client dans tous les échanges</li>
<li>Adapter le registre : formel avec les pros, chaleureux avec les particuliers</li>
<li>Mémoriser les préférences dans LABORO Connect (sport pratiqué, pointure, historique)</li>
</ul>
<p><strong>Gérer les situations délicates :</strong></p>
<ul>
<li>Client mécontent au téléphone : écouter, ne pas interrompre, reformuler, proposer une solution</li>
<li>Client absent lors d'une livraison : laisser un message clair, rappeler dans la journée</li>
<li>Demande hors compétence : orienter vers le bon interlocuteur, ne jamais laisser sans réponse</li>
</ul>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Réponse à tout contact en moins de 24h — règle absolue LABORO</li>
<li>Email : objet clair · 3-4 lignes · signature complète</li>
<li>Téléphone : décrocher avant la 3e sonnerie · se présenter</li>
<li>Personnaliser avec le nom du client à chaque échange</li>
</ul>
</div>`},
  'C3.2':{t:'Les actions de fidélisation client',c:`<div class="res-section res-debutant">
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
  
  <!-- Étapes -->
  <!-- 1. Prospect -->
  <circle cx="60" cy="100" r="42" fill="#1A2E4A"/>
  <text x="60" y="93" text-anchor="middle" font-size="18">🔍</text>
  <text x="60" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">PROSPECT</text>
  <text x="60" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">Inconnu</text>
  
  <!-- Flèche 1→2 -->
  <path d="M 103 100 L 143 100" stroke="#D97706" stroke-width="2" marker-end="url(#arr3)" fill="none"/>
  <text x="123" y="93" text-anchor="middle" font-size="7.5" fill="#D97706">1er contact</text>
  
  <!-- 2. Premier achat -->
  <circle cx="185" cy="100" r="42" fill="#2D5282"/>
  <text x="185" y="93" text-anchor="middle" font-size="18">🛒</text>
  <text x="185" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">1er ACHAT</text>
  <text x="185" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">Nouveau client</text>
  
  <!-- Flèche 2→3 -->
  <path d="M 228 100 L 268 100" stroke="#D97706" stroke-width="2" marker-end="url(#arr3)" fill="none"/>
  <text x="248" y="93" text-anchor="middle" font-size="7.5" fill="#D97706">Suivi + carte PRO</text>
  
  <!-- 3. Client régulier -->
  <circle cx="310" cy="100" r="42" fill="#4A6FA5"/>
  <text x="310" y="93" text-anchor="middle" font-size="18">⭐</text>
  <text x="310" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RÉGULIER</text>
  <text x="310" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">>2 achats/an</text>
  
  <!-- Flèche 3→4 -->
  <path d="M 353 100 L 393 100" stroke="#D97706" stroke-width="2" marker-end="url(#arr3)" fill="none"/>
  <text x="373" y="93" text-anchor="middle" font-size="7.5" fill="#D97706">Événements + avantages</text>
  
  <!-- 4. Ambassadeur -->
  <circle cx="435" cy="100" r="42" fill="#185FA5"/>
  <text x="435" y="93" text-anchor="middle" font-size="18">💎</text>
  <text x="435" y="110" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">AMBASSADEUR</text>
  <text x="435" y="123" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">Recommande LABORO</text>
  
  <!-- Flèche risque -->
  <path d="M 310 142 Q 310 165 185 142" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr3)" fill="none"/>
  <text x="248" y="168" text-anchor="middle" font-size="7.5" fill="#EF4444">Risque attrition si pas de suivi</text>
  
  <!-- CLV -->
  <rect x="510" y="60" width="158" height="80" rx="8" fill="#FEF3C7" stroke="#FDE68A"/>
  <text x="589" y="82" text-anchor="middle" font-size="9" font-weight="700" fill="#92400E">CLV LABORO (B2C)</text>
  <text x="589" y="98" text-anchor="middle" font-size="9" fill="#92400E">Panier moyen : 87€</text>
  <text x="589" y="112" text-anchor="middle" font-size="9" fill="#92400E">Fréquence : 3×/an</text>
  <text x="589" y="126" text-anchor="middle" font-size="11" font-weight="900" fill="#D97706">= 1 305€/3 ans</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Piloter la fidélisation</div>
<p><strong>Indicateurs de fidélisation :</strong></p>
<ul>
<li><strong>Taux de rétention</strong> = clients ayant acheté ≥2 fois ÷ clients totaux × 100. Objectif : >60%</li>
<li><strong>NPS</strong> (Net Promoter Score) = % promoteurs − % détracteurs. Objectif LABORO : >+20</li>
<li><strong>Fréquence d'achat</strong> = nombre d'achats moyen par client sur 12 mois</li>
</ul>
<p><strong>Segmentation clients :</strong> clients actifs (achat <6 mois) · clients dormants (6-18 mois) · clients perdus (>18 mois). Actions différentes selon segment.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 outils : carte PRO · newsletter · événements · club sport</li>
<li>Proposer la carte PRO dès le 1er achat — systématiquement</li>
<li>Fidéliser coûte 5 à 7× moins cher que conquérir</li>
<li>Taux de rétention cible : >60% · NPS cible : >+20</li>
</ul>
</div>`},
  'C3.3':{t:'Évaluer les actions de fidélisation',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Les outils de fidélisation LABORO</div>
<p><strong>Fidéliser, c'est quoi ?</strong></p>
<p>Fidéliser un client c'est lui donner envie de <strong>revenir</strong> chez LABORO plutôt que d'aller chez un concurrent. C'est beaucoup moins coûteux que de trouver un nouveau client.</p>
<p><strong>Les 4 outils LABORO :</strong></p>
<ul>
<li><strong>Carte LABORO PRO</strong> — Programme de points. 1€ dépensé = 1 point. 100 points = 10€ de réduction. Réservée aux clients réguliers.</li>
<li><strong>Newsletter mensuelle</strong> — Email envoyé chaque mois avec les nouveautés, promotions et conseils sport. Gratuit, opt-in.</li>
<li><strong>Événements clients</strong> — Soirées, tests produits, sessions sport organisées pour les clients LABORO. Crée du lien et de l'attachement à la marque.</li>
<li><strong>Programme Club Sport</strong> — Avantages spéciaux pour les associations sportives : remises automatiques, livraison prioritaire, interlocuteur dédié.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — M. Ferreira</div>
M. Ferreira achète régulièrement. Grâce à sa carte LABORO PRO, il a accumulé 240 points = 24€ de réduction sur sa prochaine commande. Il a aussi été invité à la soirée test chaussures de trail. Résultat : il est client depuis 3 ans et recommande LABORO à son club.
</div>
<p><strong>La règle d'or :</strong> proposer la carte LABORO PRO à chaque nouveau client dès le premier achat.</p>
</div>

<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="160" rx="12" fill="#FFFBEB"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">4 INDICATEURS DE FIDÉLISATION — Objectifs LABORO</text>
  <!-- Taux rétention -->
  <rect x="10" y="36" width="155" height="110" rx="10" fill="#276749"/>
  <text x="87" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX DE RÉTENTION</text>
  <text x="87" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#9AE6B4">&gt;60%</text>
  <text x="87" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Clients ≥2 achats</text>
  <text x="87" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">÷ clients période préc.</text>
  <text x="87" y="128" text-anchor="middle" font-size="7.5" fill="#9AE6B4">Actuel LABORO : 74% ✅</text>
  <!-- Taux attrition -->
  <rect x="173" y="36" width="155" height="110" rx="10" fill="#9B4444"/>
  <text x="250" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX D'ATTRITION</text>
  <text x="250" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#FECACA">&lt;20%</text>
  <text x="250" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">100 − taux rétention</text>
  <text x="250" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Clients perdus</text>
  <text x="250" y="128" text-anchor="middle" font-size="7.5" fill="#FECACA">&gt;20% = signal d'alarme</text>
  <!-- NPS -->
  <rect x="336" y="36" width="155" height="110" rx="10" fill="#D97706"/>
  <text x="413" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">NPS</text>
  <text x="413" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#FEF3C7">&gt;+20</text>
  <text x="413" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">% Promoteurs</text>
  <text x="413" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">− % Détracteurs</text>
  <text x="413" y="128" text-anchor="middle" font-size="7.5" fill="#FEF3C7">Actuel LABORO : +22 ✅</text>
  <!-- ROI action -->
  <rect x="499" y="36" width="171" height="110" rx="10" fill="#2B6CB0"/>
  <text x="584" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">ROI ACTION</text>
  <text x="584" y="80" text-anchor="middle" font-size="26" font-weight="900" fill="#BEE3F8">&gt;0%</text>
  <text x="584" y="98" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">(CA−Coût)÷Coût×100</text>
  <text x="584" y="110" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Soirée LABORO</text>
  <text x="584" y="128" text-anchor="middle" font-size="7.5" fill="#BEE3F8">ROI = 1 233% ✅</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Mesurer et évaluer la fidélisation</div>
<p><strong>Les 4 indicateurs clés :</strong></p>
<ul>
<li><strong>Taux de rétention</strong> = clients ayant acheté ≥ 2 fois ÷ clients période précédente × 100. Objectif LABORO : > 60%</li>
<li><strong>Taux d'attrition</strong> = 100 − taux de rétention. > 20% = signal d'alarme</li>
<li><strong>ROI d'une action</strong> = (CA généré − coût) ÷ coût × 100. Positif = rentable</li>
<li><strong>CLV</strong> (valeur vie client) = panier moyen × fréquence annuelle × durée fidélité (années)</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Calcul — Soirée Rentrée Sportive LABORO</div>
Coût : 1 200€ · CA soir : 4 200€ · CA 30j suivants : 11 800€<br>
ROI = (4 200 + 11 800 − 1 200) ÷ 1 200 × 100 = <strong>1 233%</strong>
</div>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>4 outils LABORO : carte PRO · newsletter · événements · club sport</li>
<li>Fidéliser coûte 5 à 7× moins cher que conquérir</li>
<li>Taux de rétention cible LABORO : > 60%</li>
<li>ROI positif = action à reconduire</li>
</ul>
</div>`},
  'C3.3b':{t:'La fidélisation avancée — outils et stratégie',c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer — Comprendre la fidélisation</div>
<p><strong>Pourquoi fidéliser ? — La logique économique simple</strong></p><p>Conquérir un nouveau client coûte 5 à 7 fois plus cher que de fidéliser un client existant. Un client fidèle achète plus, revient plus souvent, et recommande LABORO à son entourage.</p><p><strong>Les 4 outils de fidélisation LABORO :</strong></p><ul><li><strong>Carte LABORO PRO</strong> — Points cumulés à chaque achat, offre anniversaire, accès ventes privées. À proposer systématiquement à la caisse.</li><li><strong>Newsletter mensuelle</strong> — Nouveautés, conseils, offres exclusives. Envoi le 1er lundi du mois. Objectif taux d'ouverture : > 30%.</li><li><strong>Soirée clients annuelle</strong> — Événement showroom en novembre. Réservé aux meilleurs clients. Objectif : renforcer le sentiment d'appartenance.</li><li><strong>Programme de parrainage</strong> — Parrain : 15 € de bon d'achat. Filleul : 10 € à la 1re commande. Activation via LABORO Connect.</li></ul><p><strong>Client satisfait vs client fidèle :</strong></p><ul><li><strong>Client satisfait</strong> — Content de son achat mais peut aller ailleurs si un concurrent fait une promo.</li><li><strong>Client fidèle</strong> — Revient automatiquement chez LABORO même si un concurrent est moins cher. Son CA augmente chaque année.</li></ul><p><strong>Construire un objectif SMART :</strong></p><ul><li><strong>S</strong>pécifique — "Passer de 31 à 45 participants à la soirée clients"</li><li><strong>M</strong>esurable — un chiffre précis à atteindre</li><li><strong>A</strong>tteignable — ambitieux mais réaliste avec les moyens disponibles</li><li><strong>R</strong>éaliste — en accord avec le budget et l'équipe</li><li><strong>T</strong>emporel — "Pour le 15 novembre 2026"</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — proposer la carte PRO</div>"M. Vidal, vous êtes client depuis 3 ans — avez-vous votre carte LABORO PRO ? Sur cet achat vous auriez déjà 7 points, soit 7 € à utiliser à votre prochaine visite. Je vous l'active maintenant, c'est gratuit et sans engagement."</div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>La fidélisation commence à la première vente. Proposer la carte LABORO PRO à chaque passage en caisse est une règle. Un client fidèle bien traité peut représenter 5 000 à 20 000 € de CA sur 10 ans.</div>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Stratégie de fidélisation avancée</div>
<p>Voir les indicateurs ROI, CLV et taux de rétention dans la ressource C3.3.</p>
</div>
<div class="res-retenir">
<div class="res-retenir-l">À retenir</div>
<ul>
<li>Fidéliser coûte 5 à 7× moins cher que conquérir</li>
<li>4 outils LABORO : carte PRO · newsletter · événements · club sport</li>
<li>Un client fidèle achète plus, revient plus souvent, recommande</li>
</ul>
</div>`},
  'G4A':{t:"Gérer l'espace commercial et développer la clientèle",c:`<div class="res-section res-debutant">
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
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Gestion et pilotage du rayon</div>
<p><strong>1. Les règles du merchandising — disposer les produits pour vendre</strong></p><p>Le merchandising, c'est l'art de présenter les produits pour maximiser les ventes. Chez LABORO, chaque décision de placement est réfléchie.</p><ul><li><strong>Les 3 niveaux de présentation :</strong><br>· <strong>Niveau yeux</strong> (1,2–1,6m) → produits phares, marges élevées, nouveautés. C'est ici que se font 60% des ventes.<br>· <strong>Niveau mains</strong> (0,8–1,2m) → produits courants, bonne rotation.<br>· <strong>Niveau sol</strong> (< 0,8m) → produits volumineux, articles d'appel, stocks.</li><li><strong>Zones chaudes et froides :</strong><br>· Zones chaudes (entrée, allées principales, caisses) : nouveautés, promotions, best-sellers.<br>· Zones froides (fond, angles) : produits à rotation lente → à animer pour attirer le client.</li><li><strong>Facing</strong> → nombre d'unités visibles côte à côte. Minimum 2 facings pour exister visuellement. Best-sellers = 4 facings minimum.</li><li><strong>PLV</strong> (Publicité sur Lieu de Vente) → stop-rayon, affiche, présentoir. Règle : message lisible à 3 mètres.</li></ul><p><strong>2. Gestion des stocks et approvisionnement</strong></p><ul><li><strong>Stock d'alerte</strong> = ventes journalières × délai de réassort (jours)<br>Exemple : 3 paires/jour × 5 jours délai = stock d'alerte à <strong>15 paires</strong> → déclencher la commande dès ce seuil.</li><li><strong>Quantité à commander</strong> = objectif de ventes × colisage (arrondir à l'entier supérieur)<br>Exemple : 405 paires à commander · colisage par 6 → 405 ÷ 6 = 67,5 → <strong>68 colis</strong> à commander.</li><li><strong>DDM — Date de Durabilité Minimale</strong> → date jusqu'à laquelle le produit garde ses qualités (pour la nutrition sportive). Un produit dont la DDM est inférieure à 1 mois doit être géré en priorité (promotion ou retour fournisseur).</li><li><strong>Sélectionner un fournisseur</strong> → comparer sur : prix d'achat HT · remises · colisage · délai de livraison · frais de port · politique de reprise · origine produit (cohérence avec valeurs LABORO).</li><li><strong>Calcul du montant d'une commande :</strong><br>Montant brut = PAHT × quantité<br>Remise = montant brut × taux de remise<br>Frais de port éventuels<br>Montant net = montant brut − remise + frais de port<br>Exemple : 68 colis × 6 paires × 75 € = 30 600 € · remise 10% = −3 060 € → <strong>27 540 € net</strong></li></ul><p><strong>3. La démarque — identifier et réduire les pertes</strong></p><ul><li><strong>Démarque connue</strong> → pertes identifiées et mesurables : produits abîmés, dates dépassées, erreurs de caisse, retours fournisseur. On sait pourquoi le produit est perdu.</li><li><strong>Démarque inconnue</strong> → pertes non expliquées : vol, erreurs d'inventaire. Plus difficile à mesurer.</li><li><strong>Calcul du taux de démarque connue HT :</strong><br>Formule : (valeur démarque HT ÷ CA HT total) × 100<br>Valeur démarque HT = PAHT × quantités perdues<br>Exemple : 2 tapis abîmés · PAHT 35 € · CA HT du rayon 8 500 €<br>Taux = (2 × 35) ÷ 8 500 × 100 = 70 ÷ 8 500 × 100 = <strong>0,82%</strong><br>Objectif sectoriel : < 1,5%. Au-dessus de 3% → situation critique.</li><li><strong>Gérer les produits à DDM courte</strong> → 2 options :<br>· Opération promotionnelle (−30%, lot 3+1, etc.) pour écouler rapidement<br>· Don à une association (action anti-gaspillage → label green economy)<br>Comparer les 2 promotions sur le CA HT et la marge dégagée pour choisir la plus rentable.</li></ul><p><strong>4. Le site marchand et l'e-commerce</strong></p><ul><li><strong>Taux de conversion</strong> = (commandes passées ÷ visiteurs uniques) × 100<br>Exemple : 312 commandes · 24 680 visiteurs → 312 ÷ 24 680 × 100 = <strong>1,26%</strong><br>Moyenne nationale e-commerce 2022 : 2,96%. En dessous = site à optimiser.</li><li><strong>Pourcentage des ventes en ligne</strong> = (CA site ÷ CA total) × 100<br>Exemple : 18 400 ÷ 278 000 × 100 = <strong>6,62%</strong></li><li><strong>Panier moyen en ligne</strong> = CA site ÷ nombre de commandes<br>Exemple : 18 400 ÷ 312 = <strong>58,97 €</strong></li><li><strong>Points faibles fréquents d'un site marchand</strong> → absence d'avis clients · pas de FAQ · délais de livraison non affichés · pas de pictogrammes de réassurance (paiement sécurisé, retours) · réseaux sociaux inactifs · design non responsive.</li><li><strong>Pour améliorer le taux de conversion</strong> → ajouter des avis clients · afficher clairement les délais · créer une FAQ · optimiser le paiement · réduire l'abandon de panier.</li></ul><p><strong>5. Communication digitale pour développer la clientèle</strong></p><ul><li><strong>Choisir le bon canal</strong> → Instagram : visuels, cible 18-35 ans, trail/running · Facebook : cible 35-55 ans, CE, clubs · Newsletter : clients existants · Google My Business : référencement local.</li><li><strong>Règles d'un post efficace</strong> → visuel accrocheur en premier · texte court et direct (< 150 mots) · 3 à 5 hashtags ciblés · 1 seul call-to-action (lien, inscription, achat).</li><li><strong>Indicateurs de performance digitale</strong> → taux d'engagement = (likes + commentaires + partages) ÷ abonnés × 100 · taux d'ouverture newsletter (objectif > 25%) · taux de clic (objectif > 3%).</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — calcul commande Salomon printemps</div>Objectif : 405 paires · Fournisseur TrailPro · PAHT 75 € · colisage par 6 · remise 10% (> 60 paires) · franco de port<br>Colis : 405 ÷ 6 = 67,5 → <strong>68 colis</strong> · Quantité réelle : 68 × 6 = 408 paires<br>Montant brut : 408 × 75 = 30 600 € · Remise 10% : −3 060 €<br><strong>Montant net : 27 540 € HT</strong></div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">Exemple LABORO — taux de conversion laboro-sport.fr</div>312 commandes · 24 680 visiteurs → taux = 312 ÷ 24 680 × 100 = <strong>1,26%</strong><br>Vs moyenne nationale 2,96% → LABORO est à moins de la moitié de la moyenne → priorité absolue d'amélioration.</div><p><strong>Implantation et zones de vente</strong></p>
<ul>
<li><strong>Zone chaude</strong> : zones naturellement très fréquentées — entrée du magasin, allées principales, caisses. Les produits placés ici se vendent seuls. → Réserver aux nouveautés, promotions, produits à forte marge.</li>
<li><strong>Zone froide</strong> : zones peu fréquentées spontanément — fonds de rayon, coins, étages. → Attirer le client avec de la signalétique, des têtes de gondole attractives.</li>
<li><strong>Niveau yeux</strong> : la zone la plus vendeuse d'un linéaire (1,20m à 1,70m). → Placer les produits phares et à forte marge.</li>
<li><strong>Niveau mains</strong> : zone intermédiaire (0,80m à 1,20m). → Produits courants.</li>
<li><strong>Niveau sol</strong> : zone la moins performante. → Produits lourds, conditionnements en vrac.</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — erreur d'implantation</div>
Rayon running : les Salomon Speedcross 6 (best-seller, marge 38%) sont placés au sol zone froide. Les Nike Pegasus (0 vente ce mois) sont en zone chaude niveau yeux. Résultat : CA 24 800 € vs objectif 28 000 €.<br>
<strong>Correction</strong> : inverser les placements — Salomon au niveau yeux zone chaude, Nike déplacé en zone froide avec une étiquette "Nouveauté". Impact estimé : +15% de CA sur ce rayon.
</div>

<p style="margin-top:14px"><strong>Stock théorique et démarque</strong></p>
<ul>
<li><strong>Stock théorique</strong> = Stock initial + Livraisons reçues − Quantités vendues</li>
<li><strong>Démarque</strong> = Stock théorique − Stock réel (si positif) → produits manquants non vendus (vol, casse, erreur)</li>
<li><strong>Surmarque</strong> = Stock réel − Stock théorique (si positif) → produits en plus (erreur de comptage, livraison non enregistrée)</li>
<li><strong>Taux de démarque</strong> = Démarque ÷ CA × 100 · Objectif sectoriel : < 1,5%</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — calcul démarque</div>
Crème Squirrel : stock initial 35 · livraison 0 · vendues 28 → stock théorique = 35 + 0 − 28 = <strong>7</strong><br>
Stock réel au 30/04 : 10 → surmarque de 3 (stock supérieur au théorique — probablement erreur de comptage)<br>
Stock réel au 30/04 : 3 → démarque de 4 (4 unités manquantes — vol possible ou casse non signalée)
</div>

<p style="margin-top:14px"><strong>Calcul du prix de vente — taux de marge</strong></p>
<ul>
<li><strong>Taux de marge</strong> = (PVHT − PAHT) ÷ PVHT × 100 · exprimé en %</li>
<li><strong>PVHT</strong> = PAHT ÷ (1 − taux de marge) · le prix de vente hors taxe</li>
<li><strong>PVTTC</strong> = PVHT × (1 + taux de TVA) · le prix payé par le client</li>
<li><strong>TVA courante sport/textile</strong> : 20% · <strong>TVA alimentation</strong> : 5,5%</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — calcul PVTTC Salomon Speedcross 6</div>
PAHT = 89 € · Taux de marge souhaité = 38% · TVA = 20%<br>
PVHT = 89 ÷ (1 − 0,38) = 89 ÷ 0,62 = <strong>143,55 €</strong><br>
PVTTC = 143,55 × 1,20 = <strong>172,26 €</strong><br><br>
Vérification taux de marge : (143,55 − 89) ÷ 143,55 × 100 = 54,55 ÷ 143,55 = <strong>38%</strong> ✓
</div>
<div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Le niveau des yeux c'est le niveau qui vend. Taux de démarque > 3% = situation critique à traiter immédiatement. Taux de conversion < 1% = site qui n'est pas optimisé. Un post Instagram sans call-to-action ne génère pas de ventes. Tout se mesure, tout se compare à un objectif ou une moyenne nationale.</div>
</div>`},
  'B4.1':{t:"Rechercher et qualifier les informations de prospection",c:`<div class="res-section res-debutant">
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
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin</div>
<p><strong>3 sources essentielles pour trouver des prospects B2B :</strong></p><ul><li><strong>Sources officielles</strong> — Societe.com, Infogreffe, annuaires des CCI, registres des associations sportives (DRAJES). Fiables, gratuites, exhaustives.</li><li><strong>Sources sectorielles</strong> — Fédérations sportives (FFT, FFA, FF Football), annuaires des CE, répertoires des collectivités. Ciblées sur le sport et les achats groupés.</li><li><strong>Sources terrain et réseaux</strong> — Salons professionnels (ISPO, Forum sport Essonne), LinkedIn, recommandations de clients actuels. Prospects chauds à requalifier rapidement.</li></ul><p><strong>Qualifier un prospect avec la méthode BANT :</strong></p><ul><li><strong>B</strong>udget — Quel budget annuel sport/équipement ? Ordre de grandeur suffisant.</li><li><strong>A</strong>uthority — Qui decide ? Responsable CE, DRH, responsable achats, directeur sportif ?</li><li><strong>N</strong>eed — Quel besoin réel identifié ? Équipements récurrents ou commandes ponctuelles ?</li><li><strong>T</strong>iming — Dans quel délai peut-il acheter ? Projet immédiat ou besoin à moyen terme ?</li></ul><p><strong>Champs obligatoires dans LABORO Connect pour chaque prospect :</strong></p><ul><li>Raison sociale, secteur, taille (effectif), contact décisionnaire, téléphone, e-mail</li><li>Source d'identification, score BANT (de 1 à 4), besoins estimés, statut (froid/tiède/chaud)</li><li>Prochaine action à mener et date de relance</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — fichier prospect CE Essonne</div>Airbus Defence Élancourt — 1 400 salariés — Responsable CE : Mme Dufour — Budget sport estimé 20 000 €/an — Besoin : maillots clubs internes + équipement fitness — Score BANT : 3/4 — Statut : tiède — Prochaine action : e-mailing ciblé J+3.</div><p><strong>Qualifier un prospect — méthode BANT approfondie</strong></p>
<p>La <strong>qualification</strong> d'un prospect consiste à évaluer s'il a le potentiel de devenir client. Un prospect non qualifié = du temps perdu. La méthode BANT permet de noter chaque prospect sur 4 critères :</p>
<ul>
<li><strong>B — Budget</strong> : a-t-il les moyens d'acheter ? Quel est son budget habituel pour ce type d'achat ? Score 0-3.</li>
<li><strong>A — Autorité</strong> : est-il décisionnaire ? Peut-il signer un bon de commande seul ? Score 0-3.</li>
<li><strong>N — Need (Besoin)</strong> : a-t-il un besoin réel que LABORO peut satisfaire ? Score 0-3.</li>
<li><strong>T — Timing</strong> : a-t-il besoin de la solution maintenant ou dans un futur proche ? Score 0-3.</li>
</ul>
<p><strong>Score de qualification</strong> : total ÷ 12 × 100</p>
<ul>
<li>Score ≥ 75% → prospect chaud → à contacter en priorité cette semaine</li>
<li>Score 50-74% → prospect tiède → à contacter dans le mois</li>
<li>Score < 50% → prospect froid → à mettre en veille</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — qualification Club Trail Sénart</div>
Contact : Marc Girault, Président · 42 licenciés · achat maillots/an<br><br>
<strong>B</strong> — Budget estimé 1 500 € → score 2/3<br>
<strong>A</strong> — Président = décisionnaire → score 3/3<br>
<strong>N</strong> — Commande maillots chaque saison → score 3/3<br>
<strong>T</strong> — Saison reprend en septembre → score 2/3<br><br>
<strong>Score total : 10/12 = 83% → Prospect CHAUD → contacter cette semaine</strong>
</div>
<div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Un fichier prospect bien qualifié vaut 10 fois plus qu'une liste non travaillée. Priorité aux prospects BANT 3 ou 4. Un prospect sans date de relance est un prospect perdu. Tout se trace dans LABORO Connect dès le premier contact.</div>
</div>`},
  'B4.2':{t:"Concevoir un plan et des supports de prospection",c:`<div class="res-section res-debutant">
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
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin</div>
<p><strong>1. Dimensionner une opération de prospection</strong></p><p>Avant de rédiger quoi que ce soit, il faut calculer combien de prospects contacter pour atteindre l'objectif de contrats. On remonte la <strong>chaîne de conversion</strong> :</p><ul><li><strong>Objectif</strong> : 3 contrats à signer</li><li>Taux de transformation devis-contrat moyen : 30% → il faut <strong>10 devis envoyés</strong></li><li>Taux de RDV-devis : 60% → il faut <strong>17 RDV effectués</strong></li><li>Taux de contact-RDV (phoning) : 12% → il faut <strong>142 appels passés</strong></li><li><strong>Formule générale</strong> : Nombre de prospects = objectif ÷ (taux1 × taux2 × taux3)</li></ul><p>Exemple LABORO : objectif 3 contrats CE · taux contact 60% · taux RDV 12% · taux devis-contrat 30% → 3 ÷ (0,60 × 0,12 × 0,30) = 3 ÷ 0,0216 = <strong>139 prospects à contacter</strong></p><p><strong>2. Choisir les techniques de prospection adaptées</strong></p><ul><li><strong>Phoning (appel à froid ou tiède)</strong> — Taux de RDV : 5 à 15%. Adapté aux CE et collectivités. Rapide mais nécessite un bon plan d'appel. Coût : faible.</li><li><strong>E-mailing</strong> — Taux d'ouverture B2B : 20-25%. Taux de clic : 2-4%. Efficace pour amorcer le contact avant un appel. Jamais suffisant seul.</li><li><strong>Visite terrain</strong> — La plus qualitative. Taux de succès > 40% si bien préparée. Coûteuse en temps. À réserver aux prospects BANT 3-4.</li><li><strong>LinkedIn</strong> — Prospection douce. Commenter/partager avant de contacter. Efficace sur les décisionnaires en entreprise (DRH, responsable CE).</li><li><strong>Salons / événements sportifs</strong> — Contacts chauds à requalifier rapidement (< 48h). Forum sport Essonne = source n°1 LABORO.</li></ul><p><strong>3. Concevoir un e-mailing de prospection efficace</strong></p><ul><li><strong>Objet</strong> : 4 à 6 mots maximum · personnalisé si possible · ne pas mettre le mot "gratuit" (filtre anti-spam) · exemples : "Équipez vos joueurs 48h" · "Votre commande textile pour [mois]"</li><li><strong>Accroche</strong> (1-2 phrases) : chiffre ou constat qui parle au prospect · son secteur · son problème probable</li><li><strong>Corps</strong> (3 arguments max) : ciblés sur ses besoins supposés · 1 argument = 1 bénéfice concret + 1 preuve (chiffre, exemple client)</li><li><strong>Call-to-action unique</strong> : une seule action demandée — RDV, devis, lien catalogue · jamais 3 options</li><li><strong>Signature</strong> : photo + prénom + titre + téléphone direct + lien LinkedIn</li><li><strong>Règle des 150 mots</strong> : au-delà, le taux de lecture chute de 60%</li></ul><p><strong>4. Établir le budget d'une opération de prospection</strong></p><ul><li>Poste déplacements : km × tarif barème URSSAF (ou véhicule LABORO)</li><li>Poste supports : impression plaquettes, catalogues, cartes de visite</li><li>Poste outils : abonnement LinkedIn Premium si utilisé, logiciel e-mailing</li><li>Poste temps commercial : coût horaire × heures dédiées (souvent le poste le plus lourd)</li><li><strong>ROI prospection</strong> = (CA généré − coût total) ÷ coût total × 100 · Objectif LABORO : ROI > 500%</li></ul><p><strong>5. Fixer les indicateurs AVANT le lancement</strong></p><ul><li>Taux de contact = prospects joints ÷ prospects appelés × 100 · objectif : > 60%</li><li>Taux de RDV = RDV obtenus ÷ contacts × 100 · objectif phoning : > 10%</li><li>Taux d'ouverture e-mailing · objectif B2B : > 25%</li><li>Taux de transformation devis-contrat · objectif LABORO : > 30%</li><li>Coût d'acquisition = budget opération ÷ nombre de nouveaux clients</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — campagne clubs sportifs Essonne (4 semaines)</div>Objectif : 2 contrats. Budget : 350 €. Cible : 68 clubs qualifiés BANT.<br>Calcul : 2 ÷ (0,60 × 0,12 × 0,30) = 93 contacts minimum.<br>Technique : e-mailing J1 → phoning relance J3 → visite terrain pour les BANT 3+.<br>E-mailing : objet "Équipez vos joueurs — livraison 48h" · 3 arguments (flocage inclus, remise 8-15%, commercial dédié) · call-to-action : "Je demande un devis gratuit".<br><strong>Résultat : taux d'ouverture 31% · 7 RDV · 2 contrats signés · ROI 1 840%</strong></div><p><strong>Structure d'un plan de prospection</strong></p>
<p>Un plan de prospection c'est le document qui formalise TOUTE l'opération avant de commencer. Un commercial qui prospecte sans plan perd du temps et des opportunités.</p>
<ul>
<li><strong>1. Objectif chiffré</strong> : nombre de contrats visés · CA cible · délai</li>
<li><strong>2. Cible qualifiée</strong> : profil du prospect idéal (secteur, taille, localisation, décisionnaire)</li>
<li><strong>3. Calcul du nombre de prospects à contacter</strong> : remonter la chaîne de conversion depuis l'objectif</li>
<li><strong>4. Techniques retenues</strong> : phoning, e-mailing, visite terrain, LinkedIn, salons</li>
<li><strong>5. Planning semaine par semaine</strong> : qui fait quoi, quand, combien d'appels/mails</li>
<li><strong>6. Budget</strong> : déplacements, supports, outils</li>
<li><strong>7. Indicateurs de suivi</strong> : taux de contact, taux de RDV, taux de transformation</li>
</ul>
<p><strong>Construire le planning hebdomadaire</strong></p>
<ul>
<li>Répartir les actions sur les semaines disponibles en tenant compte des contraintes (stages, vacances)</li>
<li>Augmenter progressivement le volume : semaine 1 = 20 contacts · semaine 2 = 30 · semaine 3 = 40</li>
<li>Prévoir des semaines de relance entre les semaines d'appels</li>
<li>Garder la dernière semaine pour les visites terrain sur les prospects chauds</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — planning prospection 6 semaines (associations sportives Essonne)</div>
Objectif : 4 contrats · Cible : 320 associations · Budget : 300 €<br><br>
S1 : Qualification base de données → sélectionner 100 associations BANT ≥ 50% · 0 €<br>
S2 : E-mailing lot 1 (50 contacts) + phoning relance lot 1 → 25 appels · 0 €<br>
S3 : E-mailing lot 2 (50 contacts) + phoning relance lot 2 → 25 appels · 0 €<br>
S4 : Phoning prospects tièdes → 30 appels · RDV obtenus → 0 €<br>
S5 : Visites terrain prospects chauds → 5 visites · déplacements 80 €<br>
S6 : Relances finales + devis → signature · supports 50 €<br>
<strong>Budget total : 130 € (bien en dessous des 300 €)</strong>
</div>
<div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Calculer d'abord combien de prospects contacter, puis choisir les techniques. L'e-mailing seul ne suffit pas — le relancer par téléphone double le taux de RDV. Moins de 150 mots dans le corps du message. Un seul call-to-action. Fixer les indicateurs avant le lancement, pas après. Le ROI justifie le budget auprès de Pascal Berruelle.</div>
</div>`},
  'B4.3':{t:"Mettre en oeuvre la prospection commerciale",c:`<div class="res-section res-debutant">
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
  <!-- 6 étapes horizontales -->
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
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin</div>
<p><strong>1. Structurer un appel de prospection — le plan en 6 étapes</strong></p><ul><li><strong>1. Présentation</strong> (15 secondes) — "Bonjour M. X, je suis [prénom], commercial chez LABORO Sport & Outdoor à Évry-Courcouronnes."</li><li><strong>2. Accroche personnalisée</strong> (20 secondes) — "Je vous contacte car nous équipons plusieurs clubs de handball/CE/mairies de votre secteur. Nous venons notamment de livrer [exemple concret récent]."</li><li><strong>3. Permission de continuer</strong> — "Est-ce que vous avez 3 minutes ?" → jamais "J'espère que je ne vous dérange pas" (trop soumis).</li><li><strong>4. Découverte BANT</strong> — 2 à 3 questions ouvertes maximum. Écouter plus que parler.</li><li><strong>5. Proposition ciblée</strong> — 1 à 2 avantages LABORO directement liés à ce qu'il vient de dire. Jamais le catalogue en vrac.</li><li><strong>6. Prise de RDV</strong> — "Seriez-vous disponible mardi 14h ou jeudi 10h ?" Toujours proposer 2 créneaux. Confirmer par mail dans l'heure.</li></ul><p><strong>2. Gérer les objections — méthode ARA (Accepter · Reformuler · Argumenter)</strong></p><ul><li><strong>"On travaille avec Decathlon"</strong> → Accepter : "Je comprends, ils sont bien implantés." Reformuler : "Quelle est votre principale difficulté avec eux ?" Argumenter sur la faille identifiée (délai flocage, absence de commercial dédié, etc.)</li><li><strong>"On n'a pas de budget"</strong> → "Quel est votre budget habituel pour ce type d'achat ?" Requalifier plutôt qu'insister. S'il n'y a vraiment pas de budget → noter pour l'année prochaine dans LABORO Connect.</li><li><strong>"Envoyez-moi une documentation"</strong> → "Bien sûr. Pour vous envoyer quelque chose d'utile, puis-je vous poser 2 questions rapides ?" Reprendre la main avant d'envoyer quoi que ce soit.</li><li><strong>"Rappelez dans 6 mois"</strong> → "D'accord. Pour être sûr de ne pas vous manquer — quelle est la meilleure date précise pour vous rappeler ?" Fixer une date réelle dans LABORO Connect.</li><li><strong>"C'est trop cher"</strong> → "Par rapport à quoi ?" Identifier le point de comparaison avant de défendre le prix. Jamais baisser le prix sans contrepartie.</li></ul><p><strong>3. Mener une visite terrain efficace</strong></p><ul><li><strong>Préparation obligatoire</strong> : accroche personnalisée par prospect (leur actualité, leur résultat sportif récent, leur secteur) · objectif clair de la visite (RDV de découverte ? devis ? signature ?)</li><li><strong>Documents à emporter</strong> : catalogue LABORO + grille tarifaire clubs/CE + échantillons textile + tablette pour devis immédiat + cartes de visite</li><li><strong>Pendant la visite</strong> : prendre des notes manuscrites visibles par le prospect (montre l'attention) · reformuler avant de proposer · ne jamais sortir le catalogue avant d'avoir qualifié les besoins</li><li><strong>Après la visite</strong> : compte-rendu rédigé dans les 2 heures · devis envoyé dans les 24h · mise à jour LABORO Connect immédiate</li></ul><p><strong>4. Indicateurs de performance de la mise en oeuvre</strong></p><ul><li>Taux de contact = prospects joints ÷ prospects appelés × 100</li><li>Taux de RDV = RDV obtenus ÷ contacts joints × 100 · objectif LABORO phoning : > 10%</li><li>Taux de transformation RDV-devis = devis envoyés ÷ RDV effectués × 100 · objectif : > 50%</li><li>Durée moyenne d'un appel de prospection : 4 à 8 minutes pour un appel qualifié</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — objection Decathlon (Comité 91 Handball)</div>Pierre Lambert : "On commande déjà chez Decathlon, on est satisfaits."<br>Réponse : "Je comprends, ils sont bien implantés. Dites-moi — quand vous commandez des maillots flocage pour vos 42 clubs, quel est votre délai de livraison habituel avec eux ?"<br>Pierre Lambert : "Environ 5 semaines."<br>Réponse : "Chez nous c'est 3 semaines flocage inclus. Et si vous avez un souci de livraison, vous avez un commercial dédié joignable directement — pas un centre d'appels. Est-ce que ça change quelque chose pour vous ?"<br><strong>→ RDV obtenu 3 jours plus tard.</strong></div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Ne jamais répondre à une objection sans l'avoir d'abord acceptée et reformulée. Les 30 premières secondes sont décisives — l'accroche se prépare par écrit. Proposer toujours 2 créneaux de RDV, jamais un seul. Un compte-rendu de visite rédigé dans les 2 heures vaut 3 relances. Jamais de catalogue sans découverte préalable.</div>
</div>`},
  'B4.4':{t:"Assurer le suivi de la prospection et des devis",c:`<div class="res-section res-debutant">
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
  <defs><marker id="arr8" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#D97706"/></marker></defs>
  <!-- Timeline -->
  <line x1="40" y1="90" x2="640" y2="90" stroke="#D97706" stroke-width="2" stroke-dasharray="5,3"/>
  <!-- RDV -->
  <circle cx="80" cy="90" r="22" fill="#1A2E4A"/>
  <text x="80" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RDV</text>
  <text x="80" y="98" text-anchor="middle" font-size="8" fill="#63B3ED">J0</text>
  <text x="80" y="126" text-anchor="middle" font-size="8" fill="#4A5568">Qualifier</text>
  <text x="80" y="138" text-anchor="middle" font-size="8" fill="#4A5568">le besoin</text>
  <!-- Devis -->
  <circle cx="240" cy="90" r="22" fill="#D97706"/>
  <text x="240" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">DEVIS</text>
  <text x="240" y="98" text-anchor="middle" font-size="8" fill="#fff">J+1</text>
  <text x="240" y="126" text-anchor="middle" font-size="8" fill="#D97706" font-weight="700">⚡ 24h max</text>
  <text x="240" y="138" text-anchor="middle" font-size="8" fill="#4A5568">Personnalisé</text>
  <!-- Relance 1 -->
  <circle cx="400" cy="90" r="22" fill="#2D5282"/>
  <text x="400" y="83" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RELANCE</text>
  <text x="400" y="95" text-anchor="middle" font-size="8" fill="#fff">J+5</text>
  <text x="400" y="126" text-anchor="middle" font-size="8" fill="#4A5568">"Avez-vous pu</text>
  <text x="400" y="138" text-anchor="middle" font-size="8" fill="#4A5568">consulter..."</text>
  <!-- Relance 2 -->
  <circle cx="560" cy="90" r="22" fill="#4A6FA5"/>
  <text x="560" y="83" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">RELANCE</text>
  <text x="560" y="95" text-anchor="middle" font-size="8" fill="#fff">J+10</text>
  <text x="560" y="126" text-anchor="middle" font-size="8" fill="#4A5568">Dernière</text>
  <text x="560" y="138" text-anchor="middle" font-size="8" fill="#4A5568">tentative</text>
  <!-- Règle -->
  <rect x="10" y="36" width="660" height="28" rx="6" fill="#FEF3C7"/>
  <text x="340" y="55" text-anchor="middle" font-size="9" fill="#92400E">
    <tspan font-weight="700">Règle LABORO : </tspan>
    <tspan>devis envoyé dans les 24h après RDV · Sinon le prospect passe à la concurrence</tspan>
  </text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin</div>
<p><strong>1. La règle des 24h — envoyer le devis vite</strong></p><p>Un devis envoyé dans les <strong>24h après le RDV</strong> a 3 fois plus de chances d'aboutir qu'un devis envoyé 72h après. Le prospect est encore chaud, il se souvient de la conversation. Au-delà de 48h : le taux de signature chute de 40%.</p><p><strong>Structure d'un devis LABORO efficace :</strong></p><ul><li>En-tête : logo LABORO + coordonnées + date + numéro de devis</li><li>Destinataire : nom du décisionnaire (pas juste la société)</li><li>Tableau des produits : référence · désignation · quantité · PAHT · remise · PVHT · TVA · PVTTC</li><li>Conditions : délai de livraison garanti · conditions de paiement · validité du devis (30 jours)</li><li>Bas de page : signature du commercial + formule d'engagement</li></ul><p><strong>2. Stratégie de relance selon le délai — ne jamais laisser un devis sans suivi</strong></p><ul><li><strong>J+5 (moins d'une semaine)</strong> — Relance courte par mail : "Suite à notre échange du [date], avez-vous eu l'occasion d'étudier notre proposition ? Je reste disponible si vous avez des questions." Pas de pression.</li><li><strong>J+10 (10 jours)</strong> — Apporter un élément nouveau : témoignage d'un client similaire, actualité LABORO (nouvelle référence, promotion en cours), information sectorielle. L'objectif : rouvrir la conversation sans répéter le même message.</li><li><strong>J+15 ou plus</strong> — Appel direct. Identifier le blocage réel : budget (décision interne reportée ?), concurrent plus rapide (qui ?), besoin redéfini ? Adapter la proposition en conséquence.</li><li><strong>Au-delà de J+20 sans réponse</strong> — Qualifier le statut dans LABORO Connect : prospect perdu (raison), en veille (date de relance future), ou à réactiver (conditions à remplir).</li></ul><p><strong>3. Calculer et analyser les indicateurs de suivi</strong></p><ul><li><strong>Taux de relance</strong> = prospects relancés ÷ devis envoyés × 100 · objectif : 100% (tout devis doit être relancé)</li><li><strong>Taux de transformation devis-contrat</strong> = contrats signés ÷ devis envoyés × 100 · objectif LABORO : > 30%</li><li><strong>Délai moyen de signature</strong> = somme des jours entre envoi du devis et signature ÷ nombre de contrats</li><li><strong>CA en négociation</strong> = somme des devis en attente × taux de transformation estimé · indicateur de pilotage du pipeline commercial</li></ul><p><strong>4. Mettre à jour LABORO Connect après chaque action</strong></p><ul><li>Champs à renseigner obligatoirement après chaque contact : date de l'action · type (appel, mail, visite) · résultat (RDV, devis, refus, en attente) · prochaine action · date de relance</li><li>Statuts possibles dans LABORO Connect : Prospect froid · Prospect tiède · Prospect chaud · Devis envoyé · En négociation · Client · Perdu (raison)</li><li>Un prospect sans date de relance dans LABORO Connect = prospect invisible pour toute l'équipe = prospect perdu</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — relance CE Thales J+10 (aucune réponse)</div>Objet : "Votre commande LABORO — un retour d'expérience qui pourrait vous intéresser"<br>Corps : "Bonjour Isabelle, je reviens vers vous suite à notre échange du [date]. Depuis, nous venons de livrer une commande textile pour le CE Air France Toulouse dans le même contexte que le vôtre — leur retour est très positif sur nos délais. Je me permets de vous le partager si vous souhaitez. Seriez-vous disponible 10 min cette semaine pour que j'ajuste notre proposition ?"<br><strong>Résultat : rappel reçu le lendemain → devis accepté sous 48h.</strong></div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>Devis dans les 24h — pas de dérogation. 80% des ventes B2B se signent après la 5e prise de contact. Chaque relance doit apporter quelque chose de nouveau. Toujours qualifier le blocage avant de baisser le prix. LABORO Connect mis à jour dans les 10 minutes suivant chaque action — sans exception.</div>
</div>`},
  'B4.5':{t:"Valoriser l'offre LABORO face à la concurrence",c:`<div class="res-section res-debutant">
<div class="res-section-label">🔵 Pour commencer</div>
<p><strong>B4.5 — Analyser les résultats et ajuster.</strong> Après une opération de prospection, il faut mesurer pour s'améliorer.</p>
<p><strong>Les 3 indicateurs clés :</strong></p>
<ul>
<li><strong>Taux de contact</strong> = appels aboutis ÷ appels passés × 100. Objectif : >60%</li>
<li><strong>Taux de RDV</strong> = RDV obtenus ÷ contacts aboutis × 100. Objectif : >15%</li>
<li><strong>Taux de transformation</strong> = ventes ÷ RDV × 100. Objectif : >25%</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — bilan opération</div>
50 appels · 32 contacts (64%) · 6 RDV (19%) · 2 ventes (33%). CA généré : 1 840€. Coût opération : 0€. ROI excellent. Point faible : peu d'appels convertis en RDV — améliorer l'accroche téléphonique.
</div>
</div>

<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="150" rx="12" fill="#F8FAFF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">B4.5 — ANALYSER LES RÉSULTATS DE PROSPECTION</text>
  <rect x="10" y="36" width="202" height="100" rx="10" fill="#1A2E4A"/>
  <text x="111" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX DE CONTACT</text>
  <text x="111" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#63B3ED">&gt;60%</text>
  <text x="111" y="96" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Appels aboutis</text>
  <text x="111" y="108" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">÷ appels passés × 100</text>
  <text x="111" y="124" text-anchor="middle" font-size="7.5" fill="#63B3ED">Si &lt;40% → changer horaires</text>
  <rect x="220" y="36" width="238" height="100" rx="10" fill="#2D5282"/>
  <text x="339" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX DE RDV</text>
  <text x="339" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#90CDF4">&gt;15%</text>
  <text x="339" y="96" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">RDV obtenus</text>
  <text x="339" y="108" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">÷ contacts aboutis × 100</text>
  <text x="339" y="124" text-anchor="middle" font-size="7.5" fill="#90CDF4">Si &lt;10% → revoir l'accroche</text>
  <rect x="466" y="36" width="204" height="100" rx="10" fill="#4A6FA5"/>
  <text x="568" y="60" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">TAUX DE TRANSFORMATION</text>
  <text x="568" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#BEE3F8">&gt;25%</text>
  <text x="568" y="96" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">Ventes</text>
  <text x="568" y="108" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.8)">÷ RDV × 100</text>
  <text x="568" y="124" text-anchor="middle" font-size="7.5" fill="#BEE3F8">Si &lt;15% → revoir argumentaire</text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin</div>
<p><strong>1. Analyser les forces et faiblesses concurrentielles — construire le tableau comparatif</strong></p><p>Avant tout RDV stratégique, construire un tableau comparatif objectif sur les critères qui comptent pour CE prospect :</p><ul><li><strong>Critères à comparer</strong> : prix unitaire · remises · délai de livraison · délai flocage/broderie · service commercial dédié · livraison domicile · showroom physique · politique de retour · note clients</li><li><strong>Règle d'or</strong> : ne comparer que les critères sur lesquels LABORO est supérieur ou égal — ignorer ceux où l'écart est défavorable (les mentionner si le prospect les soulève)</li><li><strong>Jamais dénigrer un concurrent par son nom</strong> : comparer les offres, pas les entreprises. "Certains concurrents pratiquent un délai flocage de 5 semaines" — pas "Decathlon c'est nul".</li></ul><p><strong>Tableau type LABORO vs concurrents — secteur clubs sportifs :</strong></p><ul><li>Prix maillots flocage : LABORO 28 €/u · Decathlon Pro 24 €/u · SportRun 31 €/u → LABORO dans la moyenne</li><li>Délai flocage : LABORO 3 semaines · Decathlon Pro 5 semaines · SportRun 2 semaines → LABORO avantageux vs Decathlon</li><li>Remise clubs : LABORO 8-15% · Decathlon Pro 5-10% · SportRun 7-12% → LABORO meilleur</li><li>Commercial dédié : LABORO Oui · Decathlon Non · SportRun Partiellement → LABORO différenciateur fort</li><li>Livraison 48h domicile : LABORO Oui · Decathlon Oui 72h · SportRun Non → LABORO avantageux</li></ul><p><strong>2. Répondre à l'objection prix — méthode en 3 temps</strong></p><ul><li><strong>Temps 1 — Accepter</strong> : "Je comprends que le prix soit un critère important pour vous." Ne jamais réfuter d'emblée.</li><li><strong>Temps 2 — Quantifier la valeur</strong> : "Permettez-moi de vous montrer ce que notre offre inclut que les autres ne proposent pas." Chiffrer la valeur additionnelle : 2 semaines gagnées sur le flocage = possibilité de commander plus tard → moins de stock immobilisé · un commercial joignable = zéro perte de temps en SAV.</li><li><strong>Temps 3 — Proposer l'entrée de gamme si besoin</strong> : Si l'écart de prix reste rédhibitoire, proposer une première commande test à conditions préférentielles pour démontrer la valeur par l'expérience. "Pourquoi ne pas tester sur une commande de 20 unités pour voir ?"</li></ul><p><strong>3. Construire une proposition commerciale à plusieurs niveaux</strong></p><ul><li><strong>Offre Essentiel</strong> : produits standards · délai normal · paiement 30j · remise palier 1</li><li><strong>Offre Confort</strong> : produits premium + flocage · livraison prioritaire · suivi commercial mensuel · remise palier 2</li><li><strong>Offre Partenaire</strong> : contrat annuel · gamme complète · commercial dédié · accès showroom hors heures · conditions tarifaires préférentielles négociées</li><li>Avantage : le prospect choisit — il ne se sent pas piégé dans une seule option. Le coût d'opportunité est visible entre les niveaux.</li></ul><p><strong>4. Calculer la valeur de l'offre pour le prospect</strong></p><ul><li>Comparer le coût total LABORO vs concurrent sur la durée réelle d'utilisation, pas sur le prix unitaire seul</li><li>Exemple : LABORO 28 €/maillot · Decathlon 24 €/maillot · pour 20 maillots → écart 80 €. Mais délai flocage LABORO 3 semaines vs 5 semaines Decathlon = 14 jours gagnés. Si le tournoi est dans 3,5 semaines → Decathlon ne peut pas livrer à temps → l'écart de 80 € est nul.</li><li><strong>Formule de la valeur perçue</strong> : Valeur = Bénéfices obtenus ÷ Prix payé. Augmenter la valeur = augmenter les bénéfices perçus, pas forcément baisser le prix.</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — réponse à l'objection prix (Marc Girault, Club Trail Sénart)</div>Marc Girault : "LABORO c'est 80 € de plus que Decathlon pour 20 maillots."<br>Réponse : "Vous avez raison sur le prix unitaire — et je comprends que 80 € ça compte. Ce que vous gagnez avec LABORO : le flocage en 3 semaines contre 5 chez eux. Votre tournoi est dans 3,5 semaines — avec Decathlon, vous ne seriez pas livré à temps. Avec nous, vous avez les maillots 7 jours avant. Et si un problème survient à la livraison, je suis joignable directement — pas un centre d'appels. La différence de 80 €, c'est aussi cette tranquillité."<br><strong>Marc Girault signe le devis le lendemain.</strong></div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>On ne gagne jamais contre Decathlon sur le prix — on gagne sur la valeur et la relation. Chaque argument doit être chiffré ou illustré. L'offre à 3 niveaux laisse le prospect décider sans se sentir forcé. Calculer la valeur sur la durée réelle, pas sur le prix unitaire isolé. L'entrée de gamme est un investissement : un client LABORO satisfait reste en moyenne 4,2 ans.</div>
</div>`},
  'G4B':{t:'La prospection commerciale B2B',c:`<div class="res-section res-debutant">
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
  
  <!-- Niveau 1 — Suspects -->
  <polygon points="100,40 580,40 520,88 160,88" fill="#1A2E4A"/>
  <text x="340" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">SUSPECTS</text>
  <text x="340" y="76" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">Toutes les associations sportives de l'Essonne (~400)</text>
  <!-- Chiffre gauche -->
  <text x="88" y="68" text-anchor="end" font-size="18" font-weight="900" fill="#1A2E4A">400</text>
  <text x="88" y="82" text-anchor="end" font-size="8" fill="#4A6FA5">contacts</text>
  
  <!-- Niveau 2 — Prospects qualifiés -->
  <polygon points="160,96 520,96 460,144 220,144" fill="#2D5282"/>
  <text x="340" y="116" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">PROSPECTS QUALIFIÉS</text>
  <text x="340" y="132" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">Budget >300€, 15+ membres, actifs (~120)</text>
  <text x="148" y="124" text-anchor="end" font-size="18" font-weight="900" fill="#2D5282">120</text>
  <text x="148" y="138" text-anchor="end" font-size="8" fill="#4A6FA5">qualifiés</text>
  
  <!-- Niveau 3 — Contacts aboutis -->
  <polygon points="220,152 460,152 400,200 280,200" fill="#4A6FA5"/>
  <text x="340" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">CONTACTS ABOUTIS</text>
  <text x="340" y="188" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">Appels décrochés (~60)</text>
  <text x="208" y="180" text-anchor="end" font-size="18" font-weight="900" fill="#4A6FA5">60</text>
  <text x="208" y="194" text-anchor="end" font-size="8" fill="#4A6FA5">aboutis</text>
  
  <!-- Niveau 4 — RDV obtenus -->
  <polygon points="280,208 400,208 368,240 312,240" fill="#63B3ED"/>
  <text x="340" y="224" text-anchor="middle" font-size="10" font-weight="700" fill="#1A2E4A">RDV</text>
  <text x="340" y="237" text-anchor="middle" font-size="9" fill="#1A2E4A">~12</text>
  <text x="268" y="228" text-anchor="end" font-size="18" font-weight="900" fill="#63B3ED">12</text>
  <text x="268" y="242" text-anchor="end" font-size="8" fill="#4A6FA5">RDV</text>
  
  <!-- Légende droite -->
  <text x="592" y="68" font-size="9" fill="#4A6FA5">Taux qualification</text>
  <text x="592" y="80" font-size="10" font-weight="700" fill="#1A2E4A">30%</text>
  <text x="592" y="124" font-size="9" fill="#4A6FA5">Taux contact</text>
  <text x="592" y="136" font-size="10" font-weight="700" fill="#1A2E4A">50%</text>
  <text x="592" y="180" font-size="9" fill="#4A6FA5">Taux RDV</text>
  <text x="592" y="192" font-size="10" font-weight="700" fill="#1A2E4A">20%</text>
  
  <!-- Objectif -->
  <rect x="10" y="246" width="660" height="10" rx="4" fill="#EBF4FF"/>
  <text x="340" y="254" text-anchor="middle" font-size="8.5" fill="#1A2E4A">
    <tspan font-weight="700">Objectif LABORO : </tspan>
    <tspan>3 ventes/mois sur 12 RDV = taux de transformation 25%</tspan>
  </text>
</svg>
</div>
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin</div>
<div class="res-visual" style="margin:18px 0">
<svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;margin:0 auto;font-family:system-ui,sans-serif">
  <rect width="680" height="160" rx="12" fill="#F0F9FF"/>
  <text x="340" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1A2E4A">MÉTHODE BANT — Qualifier un prospect B2B</text>
  
  <!-- B -->
  <rect x="15" y="38" width="155" height="108" rx="10" fill="#1A2E4A"/>
  <text x="92" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#63B3ED">B</text>
  <text x="92" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">BUDGET</text>
  <text x="92" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Quel est votre</text>
  <text x="92" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">budget équipement ?"</text>
  <text x="92" y="132" text-anchor="middle" font-size="8" fill="#63B3ED">Seuil LABORO : >300€</text>
  
  <!-- A -->
  <rect x="178" y="38" width="155" height="108" rx="10" fill="#2D5282"/>
  <text x="255" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#90CDF4">A</text>
  <text x="255" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">AUTORITÉ</text>
  <text x="255" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Qui décide des</text>
  <text x="255" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">achats d'équipement ?"</text>
  <text x="255" y="132" text-anchor="middle" font-size="8" fill="#90CDF4">Parler au décideur</text>
  
  <!-- N -->
  <rect x="341" y="38" width="155" height="108" rx="10" fill="#4A6FA5"/>
  <text x="418" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#BEE3F8">N</text>
  <text x="418" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">BESOIN</text>
  <text x="418" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Quels équipements</text>
  <text x="418" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">vous manquent ?"</text>
  <text x="418" y="132" text-anchor="middle" font-size="8" fill="#BEE3F8">Identifier le problème</text>
  
  <!-- T -->
  <rect x="504" y="38" width="161" height="108" rx="10" fill="#185FA5"/>
  <text x="584" y="68" text-anchor="middle" font-size="30" font-weight="900" fill="#EBF8FF">T</text>
  <text x="584" y="86" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">TIMING</text>
  <text x="584" y="102" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">"Pour quand avez-vous</text>
  <text x="584" y="114" text-anchor="middle" font-size="8.5" fill="rgba(255,255,255,.8)">besoin de l'équipement ?"</text>
  <text x="584" y="132" text-anchor="middle" font-size="8" fill="#EBF8FF">Urgence = priorité</text>
</svg>
</div>
<p><strong>Les 5 techniques de prospection :</strong></p><ul><li><strong>Phoning</strong> — Appel à froid ou à tiède. Efficace si bien préparé. Taux de RDV moyen : 5 à 15%.</li><li><strong>E-mailing</strong> — Masse ou personnalisé. Taux d'ouverture moyen B2B : 20-25%. Taux de clic : 3-5%.</li><li><strong>Visite terrain</strong> — La plus qualitative mais la plus coûteuse en temps. Réserver aux prospects à fort potentiel.</li><li><strong>Salons et événements</strong> — Forum sport, foires locales. Contacts chauds à requalifier rapidement après.</li><li><strong>Réseaux sociaux (LinkedIn)</strong> — Prospection douce. Commenter, partager, puis contacter.</li></ul><p><strong>Structure du plan d'appel (à mémoriser) :</strong></p><ul><li>1. Présentation : "Bonjour M. X, je suis [prénom], commercial chez LABORO Sport à Évry."</li><li>2. Accroche : "Je vous contacte car nous équipons plusieurs clubs de votre secteur…"</li><li>3. Découverte : 2-3 questions BANT ouvertes</li><li>4. Proposition de valeur : 1-2 avantages LABORO ciblés sur ses besoins</li><li>5. Prise de RDV : "Seriez-vous disponible mardi ou jeudi pour un échange de 20 minutes ?"</li></ul><p><strong>Méthode BANT pour qualifier :</strong> Budget disponible · Authority (est-il décisionnaire ?) · Need (besoin réel identifié ?) · Timing (quand va-t-il acheter ?)</p><p><strong>Indicateurs d'une opération de prospection :</strong></p><ul><li>Taux de contact = prospects joints ÷ prospects appelés × 100</li><li>Taux de RDV = RDV obtenus ÷ contacts ×100</li><li>Taux de transformation = contrats signés ÷ devis envoyés × 100</li><li>Coût d'acquisition = budget opération ÷ nombre de nouveaux clients</li><li>ROI = (CA généré − coût) ÷ coût × 100</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — opération CE Essonne</div>47 appels → 16 RDV (34%) → 11 devis → 4 contrats (36%). Budget : 780 €. CA an 1 : 31 200 € HT. ROI = (31 200 − 780) ÷ 780 × 100 = <strong>3 900%</strong>.</div><p><strong>Le plan de prospection — vue d'ensemble</strong></p>
<p>En PVOC, le plan de prospection est le document central qui structure toute l'activité commerciale. Il se distingue du simple "appel à froid" par sa dimension stratégique.</p>
<ul>
<li><strong>Prospection = processus</strong>, pas un acte isolé. Un prospect contacté une seule fois = prospect perdu dans 80% des cas.</li>
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
<div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>
</div>`},
  'ACC':{t:"L'accueil professionnel chez LABORO",c:`<div class="res-section res-debutant">
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
<hr style="border:none;border-top:1px solid var(--gb);margin:16px 0">
<div class="res-section">
<div class="res-section-label">🔵 Pour aller plus loin — Gérer les situations difficiles</div>
<p><strong>4 étapes d'un accueil réussi :</strong></p><ul><li><strong>Détecter</strong> — Tout visiteur pris en charge sous 30 secondes. Même si on est occupé : un regard, un sourire et "Je suis à vous dans un instant" suffisent. L'attente sans reconnaissance est insupportable.</li><li><strong>Accueillir</strong> — Formule LABORO : "Bonjour, bienvenue chez LABORO, je suis [prénom], que puis-je faire pour vous ?" Debout, sourire, regard. Ne jamais rester assis.</li><li><strong>Orienter et accompagner</strong> — Jamais laisser un visiteur seul chercher. Accompagner physiquement ou confier à un collègue avec une présentation : "Je te confie M. Vidal, il cherche des chaussures trail."</li><li><strong>Prendre congé</strong> — "Au revoir M. Vidal, merci de votre visite, n'hésitez pas à revenir !" Toujours se lever, toujours sourire, toujours nommer le client.</li></ul><p><strong>L'accueil téléphonique — formule et règles :</strong></p><ul><li>Décrocher avant la 3e sonnerie</li><li>Formule : "LABORO Sport & Outdoor, [prénom], bonjour !"</li><li>Identifier l'appelant et l'objet de l'appel avant de transférer</li><li>Mettre en attente : "Je vous mets en attente un instant, ne quittez pas." Revenir toutes les 30 secondes si l'attente se prolonge.</li><li>Prendre un message complet : nom + prénom + coordonnées + objet + heure d'appel + meilleur moment pour rappeler</li></ul><p><strong>Gérer les situations difficiles — méthode des 3R :</strong></p><ul><li><strong>Reconnaître</strong> — "Je comprends que vous attendez depuis longtemps, c'est tout à fait normal de vous impatienter."</li><li><strong>Reformuler</strong> — "Si je comprends bien, vous cherchez…"</li><li><strong>Résoudre ou orienter</strong> — Apporter une solution ou rediriger vers la bonne personne avec une présentation complète.</li></ul><p><strong>Cas particuliers à maîtriser :</strong></p><ul><li>Visiteur en attente longue → reconnaître l'attente régulièrement, proposer de s'asseoir</li><li>Forte affluence → prioriser sans jamais ignorer un visiteur</li><li>Demande impossible → "Ce n'est pas possible de cette façon, mais voici ce que je peux faire pour vous…"</li><li>Situation d'urgence (malaise) → alerter immédiatement, appeler le 15 si doute, ne pas laisser la personne seule</li></ul><div class="res-ex"><div class="res-ex-l">Exemple LABORO — journée Portes Ouvertes</div>3 visiteurs entrent en même temps. Thomas Moreau en prend un en charge. Toi : "Bonjour à tous ! Bienvenue chez LABORO. Je suis [prénom]. Je m'occupe de vous dans l'ordre, je reviens dans 2 minutes." → Sourire à chacun. Aucun ne se sent ignoré.</div><div class="res-ex" style="margin-top:8px"><div class="res-ex-l">À retenir</div>30 secondes max pour prendre en charge un visiteur — c'est la règle absolue. Au téléphone, le sourire s'entend. Un visiteur mal accueilli ne reviendra jamais et en parlera à 10 personnes. L'accueil reflète l'image de LABORO.</div>
</div>
<div class="res-section">
<div class="res-section-label">🟢 Accueil d'un visiteur professionnel</div>
<p><strong>Un visiteur professionnel, c'est l'image de LABORO qui est en jeu.</strong> Fournisseur, partenaire, inspecteur, technicien — chaque visiteur professionnel suit un protocole spécifique.</p>
<p><strong>Les 5 étapes de l'accueil professionnel :</strong></p>
<ul>
<li><strong>Accueillir</strong> — Formule professionnelle, se lever, sourire</li>
<li><strong>Vérifier</strong> — Identité, objet de la visite, rendez-vous</li>
<li><strong>Prévenir</strong> — Contacter l'interlocuteur interne avant de faire patienter</li>
<li><strong>Remettre un badge</strong> — Tout visiteur externe reçoit un badge visiteur</li>
<li><strong>Accompagner ou orienter</strong> — Ne jamais laisser un visiteur seul chercher son chemin</li>
</ul>
<p><strong>Le registre des visites :</strong> noter l'heure d'arrivée et de départ de chaque visiteur. C'est une obligation de sécurité (évacuation, assurance) et une trace professionnelle.</p>
<div class="res-ex"><div class="res-ex-l">Exemple LABORO — visiteur sans rendez-vous</div>
Un technicien arrive sans rendez-vous. ✅ Correct : "Bonjour, je suis [prénom]. Puis-je vous demander l'objet de votre visite et le nom de votre interlocuteur chez LABORO ?" → Vous vérifiez, vous prévenez, vous accompagnez. ❌ À éviter : le laisser entrer seul ou le renvoyer sans solution.
</div>
</div>

<div class="res-section">
<div class="res-section-label">🟢 Gérer la communication écrite — mails professionnels</div>
<p><strong>La boîte mail d'accueil est souvent le premier contact d'un client ou d'un partenaire avec LABORO.</strong> Trier, prioriser et répondre sont des compétences clés.</p>
<p><strong>Trier et prioriser :</strong></p>
<ul>
<li><strong>Urgent et important</strong> — Réclamation client, demande de rendez-vous imminent → traiter en priorité</li>
<li><strong>Important, non urgent</strong> — Demande de renseignement, demande de partenariat → transmettre au bon interlocuteur</li>
<li><strong>Non important</strong> — Spam, publicité, mail hors sujet → supprimer sans répondre</li>
</ul>
<p><strong>Les 5 règles d'un mail professionnel :</strong></p>
<ul>
<li>Objet clair et précis dès la première lecture</li>
<li>Formule d'introduction professionnelle ("Bonjour Madame, Monsieur,")</li>
<li>Message concis — aller à l'essentiel en 3-5 phrases</li>
<li>Formule de politesse finale ("Cordialement," ou "Bien cordialement,")</li>
<li>Signature complète — prénom, nom, poste, coordonnées LABORO</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Exemple — réponse professionnelle à un client</div>
"Bonjour Madame Lambert, je prends bonne note de votre demande concernant votre commande n°2847. Je transmets immédiatement votre message à notre service e-commerce qui reviendra vers vous dans les 24 heures. Cordialement, [Prénom] — LABORO Sport & Outdoor"
</div>
</div>

<div class="res-section">
<div class="res-section-label">🟡 Accueil de groupe et coordination</div>
<p><strong>Accueillir un groupe demande une préparation en amont.</strong> Classe en visite, délégation, groupe de clients — la logistique conditionne la qualité de l'accueil.</p>
<p><strong>Préparer l'accueil d'un groupe :</strong></p>
<ul>
<li>Confirmer le nombre de personnes et les besoins spécifiques (accessibilité, durée, intervenants)</li>
<li>Préparer le matériel : badges, supports de présentation, salle configurée</li>
<li>Briefer l'équipe : qui fait quoi, à quelle heure</li>
<li>Prévoir les imprévus : intervenant absent, retard, groupe plus important que prévu</li>
</ul>
<p><strong>Le discours d'accueil groupe :</strong> bienvenue + présentation de l'entreprise (30 sec) + programme de la visite + consignes de sécurité. Court, clair, professionnel.</p>
<p><strong>Gérer les imprévus :</strong> toujours avoir un plan B. Un intervenant absent ? On réorganise le programme sans que le groupe le perçoive comme un problème.</p>
<div class="res-ex"><div class="res-ex-l">Exemple — discours d'accueil groupe</div>
"Bonjour à tous et bienvenue chez LABORO Sport & Outdoor. Je m'appelle [prénom] et je vais vous accompagner ce matin. LABORO, c'est [2 phrases courtes sur l'entreprise]. Au programme ce matin : [3 étapes]. Quelques consignes : [sécurité, règles de visite]. Des questions avant de commencer ?"
</div>
</div>

<div class="res-section">
<div class="res-section-label">🟡 Adapter son accueil à des publics spécifiques</div>
<p><strong>Un bon accueil, c'est le même niveau de service pour tous — mais adapté à chaque personne.</strong></p>
<p><strong>Client anglophone :</strong></p>
<ul>
<li>Pas besoin de parler couramment anglais — quelques formules suffisent</li>
<li>"Welcome to LABORO, how can I help you?" · "Do you speak French?" · "Let me find someone who can help you."</li>
<li>Si la barrière est trop importante : trouver un collègue, utiliser un traducteur en ligne, montrer plutôt qu'expliquer</li>
</ul>
<p><strong>Client malentendant :</strong></p>
<ul>
<li>Se placer face à la personne, à hauteur des yeux</li>
<li>Parler distinctement, à rythme normal — ne pas exagérer l'articulation</li>
<li>Proposer d'écrire si la communication est difficile</li>
<li>Ne jamais parler à la place du client, ni montrer d'impatience</li>
</ul>
<p><strong>Client en fauteuil roulant :</strong></p>
<ul>
<li>Se mettre à la même hauteur pour converser (s'accroupir ou s'asseoir)</li>
<li>Vérifier l'accessibilité du parcours avant de l'accompagner</li>
<li>Proposer de l'aide sans l'imposer : "Puis-je vous aider ?" — respecter la réponse</li>
</ul>
<p><strong>Client âgé :</strong></p>
<ul>
<li>Parler clairement, à rythme adapté, sans condescendance</li>
<li>Éviter le jargon technique et les abréviations</li>
<li>Proposer de l'aide pour les démarches numériques (borne, site) avec patience</li>
</ul>
<div class="res-ex"><div class="res-ex-l">Règle d'or</div>
Adapter sa communication, ce n'est pas faire moins bien — c'est faire autrement pour atteindre le même résultat professionnel. Chaque client mérite la même qualité d'accueil, quelle que soit sa situation.
</div>
</div>
`},
};
// Missions filtrées par classe
