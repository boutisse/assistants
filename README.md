# Assistants Boutisse — plugins et skills

> Dépôt de plugins (« marketplace ») à synchroniser dans l'organisation Claude de Boutisse. Version 0.2.0 du 09/11/2026 (0.1.0 du 29/10/2026), construite à partir de la proposition « Équipe d'assistants IA » du 19/10/2026. Dépôt : `boutisse/assistants` (privé, organisation GitHub de Boutisse).

## Contexte
La proposition prévoit **4 comptes Claude** (Direction : Geoffroy · Comptabilité : Laurence · Exploitation : Seb · Pilotage : Briac), onze spécialistes partagés, un veilleur le lundi, et un principe : **l'humain garde la main** — les assistants lisent, préparent et alertent, ils ne valident, ne paient et n'envoient rien.

## Objectif
Avoir tout prêt pour qu'au moment du branchement il ne reste qu'à **choisir, par personne, ses plugins et son niveau d'accès à Odoo**.

## Solution

### Architecture
```
Personne ──► Compte Claude ──► boutisse-socle (obligatoire) ── orientation : choisit le spécialiste, garde-fous, format
                    │                                 └─ donnees-odoo, aide-odoo, mise-en-page
                    ├──► plugins de son pôle (spécialistes)
                    └──► connecteur Odoo : « lecture » OU « brouillons » ──► garde-fou ──► Odoo (droits de SA clé API)
```
Un plugin = un spécialiste de la proposition. Le **socle** joue le rôle du « master agent » : dans chaque compte, il identifie la personne, choisit le bon spécialiste et applique les garde-fous.

| Plugin | Skill(s) | Accès Odoo nécessaire |
|---|---|---|
| `boutisse-socle` | `orientation`, `donnees-odoo`, `aide-odoo`, `mise-en-page` | lecture |
| `boutisse-direction` | `pilotage-direction`, `point-du-lundi` | lecture |
| `boutisse-compta-tva` | `controle-compta-tva` | lecture, notes |
| `boutisse-fournisseurs` | `fournisseurs-paiements` | lecture, notes |
| `boutisse-ventes` | `ventes-facturation` | brouillons (devis) |
| `boutisse-chantiers` | `chantiers` | lecture |
| `boutisse-appels-offres` | `memoire-technique` | aucun (Drive) |
| `boutisse-qhse` | `qhse-administratif` | lecture |
| `boutisse-commercial` | `commercial-veille` | lecture + web |
| `boutisse-admin-odoo` | `admin-odoo` | admin (Briac seul) |
| `boutisse-veilleur` | `veille-hebdo` | lecture, activités |

### Les droits ne viennent pas des plugins
Installer un plugin donne un **savoir-faire**, pas un droit. Ce qu'un assistant peut lire ou écrire dépend de trois verrous :
1. les **droits Odoo** de la personne (elle se connecte avec sa propre clé API) ;
2. son **inscription** sur un seul des deux déploiements du connecteur (`lecture` ou `brouillons`) ;
3. le **garde-fou** du connecteur (`connecteurs/odoo-garde-fou/`), qui masque les outils hors profil et refuse avant Odoo tout ce qui valide, comptabilise, paie, rapproche, touche un RIB, supprime ou écrit à l'extérieur.

**Premier mois : tout le monde en lecture** (décision du 09/11/2026). Seul le déploiement « lecture » est en service ; les assistants préparent dans la conversation ce que la personne saisit elle-même. L'ouverture des brouillons se décide au bilan à un mois, personne par personne.

Qui reçoit quoi : `acces/matrice-acces.md`. Procédure : `acces/brancher-une-personne.md`.

### Mise en service (ordre conseillé)
1. **Connecteur** : déployer le profil « lecture » (« brouillons » après le bilan à un mois), tester d'abord sur une copie de la base (`connecteurs/odoo-garde-fou/README.md`).
2. **Dépôt** : dépôt GitHub **privé** `boutisse/assistants`, application GitHub de Claude installée sur ce seul dépôt ; claude.ai ▸ Paramètres de l'organisation ▸ Plugins et skills ▸ Ajouter ▸ Synchroniser depuis GitHub, synchronisation automatique.
3. **Disponibilité** : `boutisse-socle` en **Obligatoire** ; les autres en **Installé par défaut**, sauf `boutisse-admin-odoo` et `boutisse-veilleur` en **Disponible à l'installation** (l'offre Team n'a pas de réglage par groupe ; sur Enterprise, un groupe par pôle). Les droits restent tenus par le connecteur, pas par l'installation.
4. **Connecteurs** : ajouter « Odoo Boutisse – lecture » dans Paramètres de l'organisation ▸ Connecteurs (« – brouillons » après le bilan).
5. **Personnes** : une par une avec la check-list.
6. **Veilleur** : tâche planifiée du lundi sur le compte Pilotage (`plugins/boutisse-veilleur/skills/veille-hebdo/references/tache-planifiee.md`).
7. **Retirer les doublons personnels** de Briac (`boutisse-memo`, `boutisse-layout`, `odoo-modif-boutisse`), désormais dans les plugins.

### Faire évoluer
- Une modif Odoo qui change un bouton, un champ ou un droit → mettre à jour `boutisse-socle` (repères et mode d'emploi), monter `version` dans son `plugin.json`, ouvrir une pull request et la fusionner : la synchronisation automatique ne part qu'au merge d'une PR qui monte une version (un push direct sur `main` ne synchronise rien ; sinon, bouton « Update » de la marketplace). Le skill `admin-odoo` le rappelle (étape 8).
- Nouvelle règle de veille → `regles-veille.md`, testée à la main, responsable nommé, puis activée.

## Impacts
- **Pour chaque personne** : une seule porte d'entrée, en français, qui répond à partir des vraies données et dit toujours qui valide quoi.
- **Pour Laurence** : aucun assistant ne peut valider, lettrer, payer ou modifier un RIB, quel que soit le compte — c'est bloqué dans le connecteur, pas seulement écrit dans une consigne.
- **Pour Briac** : un seul dépôt à maintenir, des versions, un retour arrière par plugin.
- **Prérequis non levés** : domaine des adresses, un responsable nommé par spécialiste, mesures de départ (temps par facture, par appel d'offres, par point direction) **avant** le test, sans quoi aucun gain ne sera démontrable.
- **Données envoyées à Claude** : tout ce que l'assistant lit dans Odoo part vers Anthropic pour être traité. À présenter à la direction avant la mise en service.
