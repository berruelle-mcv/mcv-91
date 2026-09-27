// ================================================
//   LABORO — Moteur commun : voyant "santé de la correction IA" (enseignants)
//   Chargé après auth.js (dernier script de index.html).
//   Affiche dans la barre du haut, pour les enseignants uniquement :
//     vert   = la correction IA fonctionne
//     orange = test OK, mais la dernière vraie correction d'élève a échoué
//     rouge  = la correction IA est en panne (raison en clair au clic)
//   Vérifié à la connexion, puis toutes les 5 minutes, et à la demande.
// ================================================

(function(){
  const INTERVALLE_MS = 5 * 60 * 1000;
  let minuterie = null;
  let dernierEtat = null;

  const COULEURS = {
    vert:   { fond: '#E6F4EC', texte: '#1F6B45', point: '#2E9E62', libelle: 'IA opérationnelle' },
    orange: { fond: '#FFF4E0', texte: '#8A5300', point: '#E08A00', libelle: 'IA à surveiller' },
    rouge:  { fond: '#FDE8E8', texte: '#9B1C1C', point: '#D93636', libelle: 'IA en panne' },
    gris:   { fond: '#EEF0F3', texte: '#4B5563', point: '#9CA3AF', libelle: 'IA : vérification…' }
  };

  function jeton(){ try{ return localStorage.getItem('laboro_token'); }catch(e){ return null; } }
  function apiBase(){ return LABORO_API; }
  function estEnseignant(){ return typeof CU !== 'undefined' && CU && CU.classe === 'enseignant' && !!jeton(); }

  function heure(iso){
    if(!iso) return null;
    const d = new Date(iso);
    const auj = new Date();
    const memeJour = d.toDateString() === auj.toDateString();
    const h = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return memeJour ? "aujourd'hui à " + h : 'le ' + d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + ' à ' + h;
  }

  // ─── Voyant dans la barre du haut ─────────────────────────────
  function voyant(){
    let v = document.getElementById('sante-ia');
    if(v) return v;
    const tbR = document.querySelector('.topbar .tb-r');
    if(!tbR) return null;
    v = document.createElement('button');
    v.id = 'sante-ia';
    v.type = 'button';
    v.style.cssText = 'display:none;align-items:center;gap:6px;border:none;cursor:pointer;font:inherit;'
      + 'font-size:11px;font-weight:700;padding:4px 10px;border-radius:12px;margin-right:6px';
    v.innerHTML = '<span class="sante-ia-point" style="width:8px;height:8px;border-radius:50%;display:inline-block"></span>'
      + '<span class="sante-ia-txt"></span>';
    v.onclick = ouvrirDetails;
    tbR.insertBefore(v, tbR.firstChild);
    return v;
  }

  function peindre(couleur){
    const v = voyant();
    if(!v) return;
    const c = COULEURS[couleur];
    v.style.display = 'inline-flex';
    v.style.background = c.fond;
    v.style.color = c.texte;
    v.querySelector('.sante-ia-point').style.background = c.point;
    v.querySelector('.sante-ia-txt').textContent = c.libelle;
    v.title = 'Correction IA — cliquer pour le détail';
  }

  function masquer(){
    const v = document.getElementById('sante-ia');
    if(v) v.style.display = 'none';
  }

  function couleurDe(etat){
    if(!etat || !etat.ok) return 'rouge';
    if(!etat.ia.ok) return 'rouge';
    const c = etat.corrections || {};
    const echec = c.dernier_echec && new Date(c.dernier_echec.date).getTime();
    const reussite = c.derniere_reussite && new Date(c.derniere_reussite).getTime();
    const recent = echec && (Date.now() - echec) < 60 * 60 * 1000;
    if(recent && (!reussite || echec > reussite)) return 'orange';
    return 'vert';
  }

  // ─── Interrogation du serveur ─────────────────────────────────
  async function verifier(forcer){
    if(!estEnseignant()){ arreter(); return; }
    try{
      const r = await fetch(apiBase() + '/api/sante-ia' + (forcer ? '?forcer=1' : ''), {
        headers: { 'Authorization': 'Bearer ' + jeton() }
      });
      if(r.status === 401 || r.status === 403){ masquer(); return; }
      dernierEtat = await r.json();
    }catch(e){
      dernierEtat = { ok: false, erreur_reseau: true };
    }
    peindre(couleurDe(dernierEtat));
    if(document.getElementById('sante-ia-modal')) remplirDetails();
  }

  function demarrer(){
    arreter();
    if(!estEnseignant()){ masquer(); return; }
    peindre('gris');
    verifier(false);
    minuterie = setInterval(function(){ if(!document.hidden) verifier(false); }, INTERVALLE_MS);
  }

  function arreter(){
    if(minuterie){ clearInterval(minuterie); minuterie = null; }
    masquer();
  }

  // ─── Fenêtre de détail ────────────────────────────────────────
  function ligne(parent, titre, texte, couleur){
    const d = document.createElement('div');
    d.style.cssText = 'margin-bottom:12px';
    const t = document.createElement('div');
    t.style.cssText = 'font-size:11px;font-weight:700;text-transform:uppercase;color:#6B7280;margin-bottom:3px';
    t.textContent = titre;
    const x = document.createElement('div');
    x.style.cssText = 'font-size:13px;line-height:1.5;color:' + (couleur || '#1F2937');
    x.textContent = texte;
    d.appendChild(t); d.appendChild(x);
    parent.appendChild(d);
  }

  function remplirDetails(){
    const corps = document.getElementById('sante-ia-corps');
    if(!corps) return;
    corps.innerHTML = '';
    const e = dernierEtat;
    if(!e){ ligne(corps, 'État', 'Vérification en cours…'); return; }
    if(e.erreur_reseau){
      ligne(corps, 'État', "Le serveur LABORO ne répond pas. Le Pi est peut-être éteint, sans Internet, ou le réseau de l'établissement bloque l'accès.", '#9B1C1C');
      return;
    }
    if(!e.ok){ ligne(corps, 'État', e.erreur || 'Vérification impossible.', '#9B1C1C'); return; }

    ligne(corps, 'Test de l\'IA', e.ia.ok ? 'La correction IA répond normalement.' : e.ia.motif, e.ia.ok ? '#1F6B45' : '#9B1C1C');
    ligne(corps, 'Testé', heure(e.ia.verifie_a) || '—');

    const c = e.corrections || {};
    ligne(corps, 'Dernière correction d\'élève réussie', heure(c.derniere_reussite) || 'Aucune depuis le dernier redémarrage du serveur');
    if(c.dernier_echec){
      ligne(corps, 'Dernier échec de correction', heure(c.dernier_echec.date) + ' — ' + c.dernier_echec.motif, '#8A5300');
    }
  }

  function ouvrirDetails(){
    if(document.getElementById('sante-ia-modal')) return;
    const ov = document.createElement('div');
    ov.id = 'sante-ia-modal';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;padding:16px';
    ov.onclick = function(ev){ if(ev.target === ov) ov.remove(); };
    const boite = document.createElement('div');
    boite.style.cssText = 'background:#fff;border-radius:12px;max-width:440px;width:100%;padding:22px 22px 18px;box-shadow:0 20px 60px rgba(0,0,0,.3)';
    boite.innerHTML = '<div style="font-size:16px;font-weight:800;color:#1F2937;margin-bottom:14px">Correction IA — état</div>'
      + '<div id="sante-ia-corps"></div>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:6px">'
      + '<button type="button" id="sante-ia-reverif" style="padding:8px 14px;background:var(--bl,#1F4E8C);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:700">Revérifier maintenant</button>'
      + '<button type="button" id="sante-ia-fermer" style="padding:8px 14px;background:#EEF0F3;color:#374151;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:700">Fermer</button>'
      + '</div>';
    ov.appendChild(boite);
    document.body.appendChild(ov);
    boite.querySelector('#sante-ia-fermer').onclick = function(){ ov.remove(); };
    boite.querySelector('#sante-ia-reverif').onclick = async function(){
      this.disabled = true; this.textContent = 'Vérification…';
      await verifier(true);
      this.disabled = false; this.textContent = 'Revérifier maintenant';
    };
    remplirDetails();
  }

  // ─── Branchement sur la connexion ─────────────────────────────
  if(typeof window.showApp === 'function'){
    const showAppOriginal = window.showApp;
    window.showApp = function(){
      showAppOriginal.apply(this, arguments);
      demarrer();
    };
  }
  // Session déjà ouverte au chargement de la page (rechargement)
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){ if(estEnseignant() && document.getElementById('app') && document.getElementById('app').classList.contains('on')) demarrer(); }, 500);
  });
})();
