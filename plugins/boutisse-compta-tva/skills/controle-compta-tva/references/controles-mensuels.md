# Contrôles mensuels (requêtes avec le connecteur Odoo, société 1)

| # | Contrôle | Requête | Seuil d'alerte | Priorité |
|---|---|---|---|---|
| 1 | 445740 et 445664 lettrables | `account.account` code in (445740, 445664) → `reconcile` | `reconcile = False` | P1 |
| 2 | Lignes de banque datées dans le futur | `account.bank.statement.line` `date > aujourd'hui` (+ `is_reconciled`) | ≥ 1 | P1 |
| 3 | Compte d'attente | `account.move.line` compte 471, `parent_state = posted`, non lettré | solde ≠ 0 ; lignes > 30 j | P1 |
| 4 | Doublon d'intérêts | 661xxx du mois par journal (banque vs EMPRUNTS) | intérêts dans les deux | P1 |
| 5 | Sous-traitance sans autoliquidation | lignes 604001 de factures fournisseurs sans taxe ou avec une taxe ≠ autoliquidation | ≥ 1 | P1 |
| 6 | Brouillons du mois ou plus anciens | `account.move` `state = draft`, `date <= fin du mois`, hors journal EMPRUNTS | ≥ 1 ; signaler ceux > 30 j | P2 |
| 7 | Facture client vide ou sans client | `account.move` `move_type = out_invoice`, `state = draft`, `partner_id = False` ou `amount_total = 0` | ≥ 1 (souvent une facture fournisseur déposée dans Ventes) | P2 |
| 8 | Date comptable ≠ date de facture | `account.move` factures, `date != invoice_date` | ≥ 1 (automatisation 17 censée les aligner en brouillon) | P2 |
| 9 | Imputations douteuses | lignes de factures fournisseurs en brouillon sur 512xxx, 681xxx, ou services (Google, banque, assurance) sur 601000 ; immobilisations 2155 avec « 20% biens » | ≥ 1 | P3 |
| 10 | Grosses factures sans lien commande | factures fournisseurs ≥ 5 000 € HT sans `purchase_line_id` sur aucune ligne | ≥ 1 | P3 |
| 11 | Paiements en cours anciens | `account.payment` `state` non rapproché, `date < aujourd'hui − 30 j` | ≥ 1 | P4 |
| 12 | Paiement pointant une facture annulée | paiements dont la facture liée est `cancel` | ≥ 1 | P4 |
| 13 | Fournisseurs débiteurs | solde 401 par partenaire < 0 (acomptes non lettrés) | ≥ 1 000 € | P4 |
| 14 | Séparation des tâches | factures du fournisseur Alexandre Almin (EI) comptabilisées par l'utilisateur 12 | ≥ 1 | P1 |

Avant de citer un résultat : vérifier le nom exact des champs avec `odoo_fields_get` si une requête renvoie une erreur ou zéro ligne inattendu.
Les anomalies listées dans l'audit du 19/10/2026 ont pu être corrigées depuis : toujours relancer la requête, ne jamais recopier l'audit.
