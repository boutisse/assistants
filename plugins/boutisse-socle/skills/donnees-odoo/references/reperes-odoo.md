# Repères Odoo Boutisse (constatés du 09 au 29/10/2026 — à revérifier si une requête donne un résultat inattendu)

## Instance
- URL : https://boutisse.odoo.com — Odoo 19.0+e (SaaS). Pas de module tiers sans Odoo.sh.
- Sociétés : BOUTISSE = 1, ALLIEMAT = 2 (vide).
- Pas d'appli Inventaire : réception saisie à la main sur la ligne de commande d'achat (`qty_received_method = manual`).
- Banque non synchronisée : relevés importés (BNP à jour, CIC en retard), sans solde d'ouverture.

## Utilisateurs (`res.users`)
2 Admin – Intégration (Briac) · 6 Denis · 7 Sébastien · 10 Laurence · 11 Geoffroy · 12 Alexandre · 13 Nathalie.
Groupes maison : 81 « Facturation : brouillon uniquement » (Nathalie) · 82 « Dashboard / Direction » (Geoffroy, Denis, Admin) · 23 Comptabilité / Lecture seule.

## Journaux
Ventes, Achats (Purchases), OD DE PAIES, OS (cut-off : FNP, PCA, CCA), banques BNP et CIC, EMPRUNTS, Cash Basis Taxes (id 11, bascules de TVA), et pour la reprise 2025 : FEC-VENTES, FEC-ACHATS, FEC-SALAIRES, FEC-OS, FEC-BNP, FEC-CIC, RAN.

## Comptes utiles
| Compte | Rôle |
|---|---|
| 70x (704001…) | Chiffre d'affaires |
| 60, 61, 62 / 63 / 64 | Achats et charges externes / impôts et taxes / personnel |
| 512 (BNP, CIC) | Trésorerie |
| 411 / 401 | Clients / fournisseurs |
| 418 | Factures à établir (aucune à ce jour) |
| 471 | Compte d'attente (lignes de banque non justifiées) |
| 164 / 661 | Emprunts / intérêts |
| 604001 | Sous-traitance (doit porter l'autoliquidation) |
| 445740 | TVA collectée en attente d'encaissement (doit être **lettrable**) |
| 445714 / 445716 | TVA collectée 20 % / 10 % exigible |
| 445664 | TVA déductible en attente de paiement (lettrable depuis le 09/10) |
| 445663 / 445665 / 445621 | TVA déductible biens / services / immobilisations |
| 445510 | TVA à décaisser (paiements à l'État) |

Définitions retenues pour la direction (tableau de bord id 10) :
- **CA** = solde des comptes 70.
- **EBE** = (70 + 71 + 72 + 74) − (60 + 61 + 62) − 63 − 64.
- **Résultat** = classe 7 − classe 6 (hors écritures de clôture).
- **Trésorerie** = solde 512 à date ≤ aujourd'hui.

## Taxes
Ventes « 20% services » (id 53) et « 10% services » (id 54) : TVA sur encaissement via 445740. « 0% AUTOLIQUIDATION » id 139. Achats « 20% biens » (id 5) : TVA au paiement via 445664 → 445663 (depuis le 09/10). Arrondi global.

## Champs maison
| Champ | Objet | Sens |
|---|---|---|
| `x_studio_differences_commandefacture` | facture | case « écart commande / facture » (ne distingue pas litige ouvert ou levé) |
| `x_studio_bon_a_payer` | facture | case « bon à payer » (peu fiable : 241 approbations pour 65 cases cochées) |
| `x_studio_date_de_reporting` | pièce | date de reporting (= date de facture, ou date de l'OD) |
| `x_studio_qte_commandee`, `x_studio_ecart_qte` | ligne de facture | quantité du bon de commande, écart de quantité en € |
| `client_order_ref` | commande de vente | n° du bon de commande client, repris sur la facture |
| `peppol_message_uuid` | facture | rempli = facture électronique reçue |

## Actions maison (menu ⚙️ Actions d'une facture fournisseur)
- 951 « Rattacher et contrôler les BC » : lit le PDF, rattache les bons de commande, écrit un message de contrôle (quantités, prix, hors BC).
- 955 « Réceptionner selon la facture » : quantités livrées = quantités lues, ligne « ÉCART FACTURE / BC » ajustée.
- Automatisation 27 : à la comptabilisation, réception des BC rattachés.
- Formats lus : YPREMA, Petitdidier, SEG, CEMEX, Tersen, Point P, Lafarge, Chausson (partiel selon fournisseur). Impossibles (pas de n° de BC sur la facture) : Fayolle, SEI, Caddenz.

## Projets
Un chantier = un `project.project`. Nom au format `COMMUNE - Voie` repris automatiquement dans l'adresse (automatisation 20). `exploitation@` abonné à chaque nouveau projet et tâche (automatisations 25 et 26). Modèle de projet : « Modèle FRANCILIANE ».
