# Mécanique de TVA chez Boutisse (réglages constatés au 09-19/10/2026)

## Ventes (travaux BTP : TVA sur encaissement)
- Taxes « 20% services » (id 53) et « 10% services » (id 54) : exigibilité **à l'encaissement**.
- À la facture : TVA en **445740** (collectée en attente).
- Au rapprochement bancaire de l'encaissement (lettrage du 411), Odoo crée une écriture dans le journal « Cash Basis Taxes » (id 11) qui bascule 445740 → **445714** (20 %) ou **445716** (10 %).
- Condition : **445740 doit être lettrable**. Décoché du 19/03 au 09/10/2026 → 208 bascules à 0 € ; rattrapage mois par mois préparé (167 factures, 934 k€), janvier et février à ne pas importer en l'état.
- « 0% AUTOLIQUIDATION » (id 139, grille E2), « 0% EXEMPT » (id 61).

## Achats
- « 20% biens » (id 5) : exigibilité **au paiement** depuis le 09/10/2026 : 445664 à la facture → 445663 au rapprochement du paiement. Ne s'applique qu'aux factures comptabilisées depuis le 09/10.
- « 10% biens », « 5.5% biens », « 20% Carburant » : directement en 445663. « 20% services » transite par 445640 (à aligner si la règle « au paiement pour tout » est retenue).
- Les lignes HT des bascules vont sur le compte d'origine (601000, 613600…), plus sur un compte de TVA (depuis le 09/10).

## Déclaration et paiement
- Aucune écriture de TVA mensuelle en 2026 : les paiements à l'État sont au débit de 445510 sans contrepartie → 445510 très débiteur.
- Écriture mensuelle cible : solder 445714 / 445716 / 445663 / 445665 / 445621 vers 445510 (ou 445670 si crédit).
- Après chaque mois déclaré : poser la **date de verrouillage TVA** (réglage, fait par Laurence).

## Pièges
- Ne jamais défaire puis refaire le rapprochement d'une facture déjà basculée : double bascule.
- Rapport de TVA Odoo : ignore les écritures importées sans grille.
- Encaissements de factures 2025 (reprise FEC) : hors mécanisme Odoo, TVA à traiter avec l'expert-comptable.
