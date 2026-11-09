# Mode d'emploi Odoo — réglages propres à Boutisse (au 29/10/2026)

## Factures fournisseurs
**Circuit en place**
1. La facture arrive (mail, PDF, ou facture électronique). Quand une facture électronique arrive, Odoo crée une activité « Contrôler la facture électronique » pour Nathalie et prévient la compta.
2. Nathalie la saisit en **brouillon** (son compte ne peut pas comptabiliser).
3. Menu ⚙️ **Actions ▸ Rattacher et contrôler les BC** : Odoo lit le PDF, rattache les bons de commande cités, et écrit un message de contrôle : bons introuvables, prix ou quantités différents, lignes hors bon de commande. Une ligne « ÉCART FACTURE / BC » porte la différence.
4. Si les quantités livrées sont celles de la facture : ⚙️ **Actions ▸ Réceptionner selon la facture**.
5. Colonnes « Qté commandée » et « Écart qté (€) » sur les lignes : rouge = facturé plus que commandé.
6. Laurence ou Alexandre valident depuis le filtre **« À valider »** (favoris partagés : À valider / Validées / Par statut de paiement).
7. À la comptabilisation, les bons de commande rattachés sont réceptionnés automatiquement.

Fournisseurs dont le PDF est lu : YPREMA, Petitdidier, SEG, CEMEX, Tersen, Point P, Lafarge, Chausson (quantités lues pour une partie seulement). Pas de n° de bon de commande sur la facture : Fayolle, SEI, Caddenz → rattachement à la main.

Ne jamais supprimer les lignes d'une facture pour « repartir de zéro » : la ligne d'écart vient du PDF et le rattachement ne la recrée pas.

**Litige et bon à payer** : deux demandes d'approbation (« Différence commande/facture » et « Bon à payer »). Un circuit plus clair (une personne par étape, pas de bon à payer si litige ouvert, visa direction au-delà de 5 000 € HT) a été **proposé le 21/10 mais pas encore validé**.

## Rapprochement bancaire
Dans la fenêtre « Lettrer » d'une ligne de relevé : flèche ▾ ▸ Favoris ▸ **« Sans TVA en attente (4456 / 4457) »** pour masquer les lignes de TVA en attente. Ne pas décocher « Autoriser le lettrage » sur 445740 ou 445664 : c'est ce qui avait bloqué la TVA collectée de mars à octobre 2026.
Ne jamais importer ou saisir de ligne de relevé à une date future.

## Ventes
Le n° du bon de commande du client va dans « Référence client » du devis (repris sur la facture). La photo du bon de commande est jointe au devis. Devis rattaché au chantier. (Chaîne bon de commande → devis → facture : proposée en septembre, à confirmer client par client.)

## Chantiers (Projets)
Un chantier = une fiche projet. Nommer le projet `COMMUNE - Voie` : l'adresse du chantier se remplit seule (si elle est vide). La boîte exploitation@ suit automatiquement chaque nouveau projet et ses tâches.

## Tableau de bord direction
Appli « Tableaux de bord » ▸ « Direction BOUTISSE », visible par Geoffroy, Denis et l'administration. CA, EBE et résultat au jour, comparés à N-1 au même jour. Le mois en cours bouge jusqu'à sa clôture.

## Arrondi de TVA
Arrondi global (et non ligne par ligne) depuis le 09/10/2026, pour les nouvelles factures.
