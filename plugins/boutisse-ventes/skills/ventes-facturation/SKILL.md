---
name: ventes-facturation
description: Ventes et facturation clients de Boutisse — transformer la photo ou le PDF d'un bon de commande client (Franciliane, SEDIF, communes…) en devis brouillon dans Odoo rattaché au chantier, lister les commandes à facturer et le reste à facturer, suivre les clients en retard et préparer le texte des relances. Crée des brouillons, n'envoie et ne confirme jamais rien.
---

# Ventes et facturation

Utilisateurs : Seb (exploitation), Laurence et Alexandre (facturation). Droits : **préparer** = devis brouillon (`sale.order` sans statut), photo jointe au devis, activité, note interne. Jamais : confirmer un devis, créer ou valider une facture, envoyer quoi que ce soit au client.
Lecture Odoo : `boutisse-socle:donnees-odoo`.

## 1. Bon de commande client → devis brouillon
1. **Lire le document** (photo ou PDF) : client émetteur, n° de bon de commande, date, adresse et commune du chantier, lignes (désignation, quantité, unité, prix si présent), n° d'affaire s'il y figure. Signaler tout ce qui est illisible plutôt que de le deviner.
2. **Retrouver dans Odoo** : le client (`res.partner`, société) ; le chantier (`project.project`, nom `COMMUNE - Voie` ou n° d'affaire) ; les articles (`product.product`) par désignation. Si plusieurs candidats, demander.
3. **Montrer le devis prévu** : client, chantier, `client_order_ref` = n° du bon de commande, lignes avec article, quantité, prix (prix du bon de commande, sinon prix catalogue de l'article — le dire). Attendre « oui ».
4. **Créer** le devis brouillon, puis joindre la photo (`ir.attachment` sur le devis). Relire le devis créé et donner son n°.
5. Rappeler la suite : confirmation du devis et facture par la personne habilitée ; expéditeur `ventes@` pour un devis, `compta@` pour une facture (jamais une adresse personnelle).
Règle par défaut : 1 bon de commande = 1 devis = 1 facture, sauf exception connue pour ce client.

## 2. À facturer
- Commandes confirmées avec quelque chose à facturer : client, chantier, montant restant, date de commande, ancienneté.
- **Avertissement obligatoire** : beaucoup de commandes anciennes (surtout Franciliane) n'ont jamais été transformées en facture parce que les factures sont faites à part ; ce « reste à facturer » est donc surestimé. Lister plutôt que totaliser, et demander lesquelles sont réellement à facturer.

## 3. Clients en retard et relances
- Factures clients validées non soldées, par tranche de retard (hors résidus de reprise 2025).
- Pour une relance : **préparer le texte** (poli, factuel : n° de facture, montant, échéance, n° de bon de commande) adapté au canal du client (mail, Chorus Pro pour les clients publics, Ariba pour Veolia). L'envoi est fait par la personne, depuis la boîte de service.

## Ne pas faire
Confirmer un devis · modifier un devis confirmé · créer une facture · inventer un prix · écrire une adresse mail Boutisse (domaine non tranché).
