---
name: fournisseurs-paiements
description: Factures fournisseurs de Boutisse — rapprochement bon de commande / réception / facture, écarts de prix et de quantités, litiges ouverts depuis longtemps, bons à payer en attente, préparation de la liste des paiements de la semaine pour Geoffroy, alerte en cas de RIB fournisseur modifié. Prépare des notes d'écart visibles par Nathalie dans Odoo. Ne valide, ne coche le bon à payer et ne paie jamais.
---

# Fournisseurs et paiements

Utilisateurs : Laurence, Alexandre (compta), Seb (litiges), Geoffroy et Denis (liste à payer). Nathalie voit le résultat dans Odoo (notes, activités) sans compte Claude.
Droits : **lire** ; **préparer** = note interne sur la facture, activité. Jamais : comptabiliser, cocher « Bon à payer », lever un litige, enregistrer un paiement, toucher un RIB.
Circuit et règles : `references/circuit-facture.md`. Lecture Odoo : `boutisse-socle:donnees-odoo`.

## 1. Contrôler une facture (« regarde la facture X »)
1. Lire la facture (`account.move`, `move_type = in_invoice`), ses lignes (`purchase_line_id`, `x_studio_qte_commandee`, `x_studio_ecart_qte`), le PDF joint et **les messages** : le contrôle maison (action 951) y a souvent déjà écrit son verdict.
2. Pour chaque ligne rattachée : quantité commandée / reçue / facturée, prix du bon de commande / prix facturé. Ventiler l'écart total en **quantités**, **prix**, **hors bon de commande** (TGAP, contribution énergie, transport…).
3. Conclure : conforme / écart justifiable (pesées réelles, ligne de taxe connue) / **litige à ouvrir** (prix différent, quantité facturée > commandée, bon introuvable).
4. Proposer une **note interne** pour Nathalie, factuelle : « Écart +282,28 € : quantités +178,33 (pesées réelles), prix −13,10 (3 lignes, article différent du BC), hors BC +117,02 (TGAP). À arbitrer par Seb. » L'écrire seulement après accord.
Si le fournisseur n'a pas de n° de bon de commande sur ses factures (Fayolle, SEI, Caddenz), le dire : le rattachement est manuel.

## 2. Tableau des litiges et bons à payer
- Factures avec écart signalé (`x_studio_differences_commandefacture`) ou activité de litige ouverte : ancienneté, montant, fournisseur, **chez qui ça attend**.
- Bons à payer en attente, et les cas anormaux : bon à payer demandé alors qu'un litige est ouvert ; facture **payée** avec bon à payer encore en attente.
- Trier par ancienneté puis par montant. Signaler ce qui dépasse 30 jours.

## 3. Liste des paiements de la semaine (pour Geoffroy)
Factures fournisseurs **validées**, non payées, échéance ≤ fin de semaine + retard, **sans litige ouvert** :
- total, par fournisseur, par échéance ; en tête, celles déjà en retard (pénalités et indemnité forfaitaire de 40 € par facture en retard) ;
- à part : celles exclues (litige, bon à payer manquant, RIB modifié récemment) avec la raison ;
- rappel : **la décision et la signature des virements restent à Geoffroy** (paiement hors Odoo, banque non connectée).

## 4. RIB modifié
Tout compte bancaire fournisseur (`res.partner.bank`) créé ou modifié dans les 7 derniers jours = **alerte immédiate** à Laurence et Geoffroy : fournisseur, date, auteur de la modification. Recommander un contre-appel du fournisseur à un numéro déjà connu (pas celui du mail reçu) avant tout paiement. C'est le premier risque de fraude d'un circuit de paiement.

## Ne pas faire
Corriger soi-même une facture · supprimer des lignes (la ligne d'écart vient du PDF et ne revient pas) · écrire sur une facture sans relire juste avant (Nathalie peut y travailler au même moment) · présenter le circuit du 21/10 comme décidé.
