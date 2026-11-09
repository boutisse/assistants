# Règles de veille

Lot 1 de la proposition (19/10/2026) : **3 alertes seulement** (V1 à V3), pour que chacune soit jugée utile par Laurence et Geoffroy avant d'en ajouter. Les autres sont prêtes, **inactives** jusqu'au lot 2 : les activer une par une en changeant la colonne « Actif » (et la version du plugin).

Ids utilisateurs Odoo : Briac 2 · Denis 6 · Seb 7 · Laurence 10 · Geoffroy 11 · Alexandre 12 · Nathalie 13. Responsables proposés à partir des rôles documentés : **à confirmer par la direction** (prérequis « un responsable par spécialiste »).

| # | Actif | Règle | Requête (société 1) | Déclenche si | Gravité | Responsable |
|---|---|---|---|---|---|---|
| V1 | **oui** | TVA bloquée | a) `account.account` code in (445740, 445664) : `reconcile` ; b) lignes 445740 `parent_state = posted`, non lettrées, `date < aujourd'hui − 15 j` dont la facture est payée | a) `reconcile = False` ; b) ≥ 1 ligne | critique (a) / haute (b) | Laurence |
| V2 | **oui** | RIB fournisseur créé ou modifié | `res.partner.bank` `create_date` ou `write_date` ≥ aujourd'hui − 7 j ; afficher partenaire, auteur (`write_uid`), `allow_out_payment` | ≥ 1 | critique | Laurence + Geoffroy |
| V3 | **oui** | Abonnement Odoo | `ir.config_parameter` clés `database.expiration_date` et `database.expiration_reason` (lisibles par l'administrateur seulement) | échéance < 30 j, ou raison renseignée | critique | Briac |
| V4 | non | Lignes de banque datées dans le futur | `account.bank.statement.line` `date > aujourd'hui` | ≥ 1 (préciser rapprochées ou non) | haute | Laurence |
| V5 | non | Brouillons anciens | `account.move` `state = draft`, `date < aujourd'hui − 30 j`, journal ≠ EMPRUNTS | ≥ 1 | normale | Laurence (factures fournisseurs : Nathalie) |
| V6 | non | Compte d'attente | lignes 471 non lettrées, `date < aujourd'hui − 30 j` | solde ≠ 0 | haute | Geoffroy |
| V7 | non | Litiges qui traînent | factures fournisseurs avec `x_studio_differences_commandefacture = True` et activité de litige ouverte depuis > 30 j | ≥ 1 | normale | Seb |
| V8 | non | Payée sans bon à payer | factures fournisseurs `payment_state in (paid, in_payment)` avec demande « Bon à payer » non approuvée | ≥ 1 | haute | Geoffroy |
| V9 | non | Clients > 60 j | `account.move` `out_invoice`, `state = posted`, `payment_state in (not_paid, partial)`, `invoice_date_due < aujourd'hui − 60 j`, hors reprise 2025 | montant > 0 | normale | Geoffroy |
| V10 | non | Sous-traitance sans autoliquidation | lignes 604001 de factures fournisseurs sans taxe d'autoliquidation | ≥ 1 | haute | Laurence |
| V11 | non | Facture client vide | `out_invoice` brouillon sans client ou à 0 € | ≥ 1 | normale | Nathalie |
| V12 | non | Pas de date de verrouillage | `res.company` 1 : `tax_lock_date`, `fiscalyear_lock_date` | vide ou > 2 mois | normale | Laurence |
| V13 | non | Séparation des tâches | factures du fournisseur Alexandre Almin (EI) comptabilisées par l'utilisateur 12 | ≥ 1 | critique | Geoffroy |
| V14 | non | Facture électronique non contrôlée | `in_invoice` avec `peppol_message_uuid` renseigné, `state = draft`, créée depuis > 7 j | ≥ 1 | normale | Nathalie |

Notes :
- V1 a) aurait détecté en une semaine l'incident TVA de mars à octobre 2026 (445740 non lettrable).
- V3 : le 19/10/2026, Odoo affichait « abonnement en attente » avec désactivation annoncée vers le 12/11/2026. Si le paramètre n'est pas lisible, le dire et demander à Briac de vérifier le bandeau.
- Toute nouvelle règle : écrire la requête, la tester une fois à la main, désigner un responsable nommé, puis l'activer.
