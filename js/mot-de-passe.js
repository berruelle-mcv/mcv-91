// ================================================
//   LABORO — Bouton « œil » sur les champs mot de passe (26/09/2026)
//   Chargé en dernier dans index.html. Ajoute à chaque champ de type
//   mot de passe un bouton pour afficher / masquer ce qui est tapé.
//   Le champ repasse automatiquement en masqué quand on quitte la page
//   de connexion (connexion réussie ou déconnexion).
// ================================================
(function(){
  function ajouterOeil(input){
    if(!input || input.dataset.oeil) return;
    input.dataset.oeil = '1';
    const enveloppe = document.createElement('span');
    enveloppe.style.cssText = 'position:relative;display:block;width:100%';
    // La marge basse du champ passe à l'enveloppe pour garder la même mise en page
    const mb = input.style.marginBottom;
    if(mb){ enveloppe.style.marginBottom = mb; input.style.marginBottom = '0'; }
    input.parentNode.insertBefore(enveloppe, input);
    enveloppe.appendChild(input);
    input.style.paddingRight = '42px';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.tabIndex = -1;
    btn.setAttribute('aria-label', 'Afficher le mot de passe');
    btn.title = 'Afficher le mot de passe';
    btn.textContent = '👁';
    btn.style.cssText = 'position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:17px;line-height:1;padding:6px;opacity:.55;border-radius:6px';
    btn.addEventListener('mousedown', function(e){ e.preventDefault(); }); // garde le curseur dans le champ
    btn.addEventListener('click', function(){
      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';
      btn.textContent = visible ? '🙈' : '👁';
      btn.title = visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe';
      btn.setAttribute('aria-label', btn.title);
      btn.style.opacity = visible ? '.9' : '.55';
    });
    enveloppe.appendChild(btn);
    input._boutonOeil = btn;
  }

  function remasquer(){
    document.querySelectorAll('input[data-oeil]').forEach(function(i){
      if(i.type !== 'password'){ i.type = 'password'; if(i._boutonOeil){ i._boutonOeil.textContent = '👁'; i._boutonOeil.style.opacity = '.55'; i._boutonOeil.title = 'Afficher le mot de passe'; } }
    });
  }

  function init(){
    document.querySelectorAll('input[type="password"]').forEach(ajouterOeil);
    // Remasquer automatiquement à l'entrée dans l'application
    if(typeof window.showApp === 'function'){
      const original = window.showApp;
      window.showApp = function(){ remasquer(); return original.apply(this, arguments); };
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
