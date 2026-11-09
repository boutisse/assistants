# Matrice d'accès — assistants Boutisse

> Version du 09/11/2026, à valider par Geoffroy (décisions du plan de déploiement). Une ligne = une personne qui a un compte Claude.
> **Les plugins donnent un savoir-faire, pas un droit.** Ce qu'un assistant peut lire ou écrire dépend uniquement de la colonne « Connecteur Odoo » et des droits Odoo de la personne.
> **Premier mois : tout le monde en lecture.** Le connecteur « brouillons » n'est pas déployé. Son ouverture se décide au bilan à un mois, personne par personne.

## 1. Qui reçoit quoi

| Personne | Compte | Plugins (en plus du socle, obligatoire) | Connecteur Odoo — mois 1 | Après le bilan (proposé) | Droits Odoo constatés (19-29/10) |
|---|---|---|---|---|---|
| **Geoffroy** | Direction | direction · chantiers · commercial · fournisseurs | lecture | lecture | Compta lecture seule (groupe 23), tableau de bord Direction (82). Peut encore comptabiliser des factures (doc 09, à confirmer) |
| **Laurence** | Comptabilité | compta-tva · fournisseurs · ventes | lecture | brouillons, si validé au bilan | Comptabilité complète, valide les factures |
| **Seb** | Exploitation | chantiers · ventes · fournisseurs · appels-offres · qhse | lecture | brouillons, si validé au bilan | Ventes, Projets, Achats. Approbateur des litiges et BAP (règles Studio 2 et 3) |
| **Briac** | Pilotage | tous + admin-odoo + veilleur | lecture (+ admin en Claude Code, hors connecteur) | lecture | Admin – Intégration (uid 2) |

Pas de compte Claude pour Denis, Alexandre ni Nathalie (organisation à 4 comptes, proposition du 19/10). Ils continuent de travailler dans Odoo comme aujourd'hui.

## 2. Ce que fait chaque plugin, et le droit qu'il demande

Au premier mois, personne n'a le droit « préparer » : la colonne « Sans ce droit » s'applique à tous.

| Plugin | Spécialiste (proposition 19/10) | Droit nécessaire | Sans ce droit |
|---|---|---|---|
| `boutisse-socle` | Orientation, aide Odoo, lecture fiable des données, mise en page | lecture | — |
| `boutisse-direction` | Direction : CA, EBE, trésorerie, point du lundi | lecture | — |
| `boutisse-compta-tva` | Comptabilité & TVA | lecture ; préparer = notes et activités | reste en analyse, liste les corrections à faire |
| `boutisse-fournisseurs` | Fournisseurs & paiements | lecture ; préparer = notes d'écart, activités | idem |
| `boutisse-ventes` | Ventes & facturation | préparer = devis brouillon | rédige le devis dans la conversation, à saisir à la main |
| `boutisse-chantiers` | Chantiers | lecture ; préparer = activités, notes | — |
| `boutisse-appels-offres` | Appels d'offres | aucun accès Odoo (Drive, dossier AO) | — |
| `boutisse-qhse` | QHSE & administratif | lecture | — |
| `boutisse-commercial` | Commercial & veille | lecture + web | — |
| `boutisse-admin-odoo` | Administration Odoo | admin (Claude Code de Briac) | refuse et renvoie vers Briac |
| `boutisse-veilleur` | Veilleur du lundi | lecture ; préparer = activités d'alerte | rapport seul, sans activité |

## 3. Les trois verrous

1. **Droits Odoo** de la personne (sa clé API, durée un mois).
2. **Inscription** sur le déploiement « lecture » du connecteur (`odoo-mcp users allow`). Une personne n'est inscrite que sur **un** déploiement.
3. **Garde-fou** du déploiement (`connecteurs/odoo-garde-fou/regles.js`, `BOUTISSE_PROFIL=lecture`) : créer, modifier et supprimer ne sont pas proposés à l'assistant ; les autres appels sont filtrés sur les méthodes de lecture ; chaque refus est tracé.

Ce qu'**aucun** assistant ne fait, quel que soit le profil : valider ou comptabiliser une pièce, cocher « Bon à payer », enregistrer un paiement, rapprocher une ligne de banque, modifier un RIB, envoyer un mail ou un devis à un client, supprimer quoi que ce soit.

## 4. Décisions à signer avant le branchement

- [ ] Organisation à 4 comptes (Geoffroy, Laurence, Seb, Briac), Standard, paiement annuel.
- [ ] Abonnement, dépôt GitHub et hébergement au nom de Boutisse (Geoffroy propriétaire principal, Briac administrateur).
- [ ] Domaine des adresses (`.com` / `.fr`) : nécessaire pour l'inscription sur le connecteur. Aucune adresse n'est écrite ici tant que ce n'est pas tranché.
- [ ] Données de paie : visibles seulement par ceux qui les voient déjà dans Odoo.
- [ ] Un responsable par pôle qui relit les réponses le premier mois : Laurence (compta), Seb (exploitation), Geoffroy (direction).
- [ ] Lecture seule pour tous le premier mois ; brouillons décidés au bilan, personne par personne.
- [ ] Seb voit-il les prix de vente et marges du fichier Pilotage chantiers ? (Le droit vient du partage Drive, pas de l'assistant.)
