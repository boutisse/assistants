---
name: point-du-lundi
description: Préparer le point du lundi matin de la direction de Boutisse — une page avec CA cumulé, trésorerie, clients en retard, factures fournisseurs à payer cette semaine, chantiers en dérive et alertes du veilleur. À utiliser quand Geoffroy ou Denis demandent « le point du lundi », « la synthèse de la semaine », « où on en est cette semaine ».
---

# Point du lundi (direction)

Une page, lisible en deux minutes, construite à partir d'Odoo (lecture seule) et, s'il existe, du dernier rapport du veilleur. Calculs : `boutisse-direction:pilotage-direction` et `boutisse-socle:donnees-odoo`.

## Contenu, dans cet ordre
1. **En une phrase** : la chose à retenir cette semaine.
2. **Chiffres** (tableau, valeur + variation) : CA cumulé vs N-1 au même jour · trésorerie du jour vs lundi précédent · encours clients > 60 jours · factures fournisseurs échues ou à échéance dans les 7 jours (montant, nombre).
3. **Clients en retard** : les 5 plus gros montants > 60 jours, avec le nombre de jours.
4. **À payer cette semaine** : factures fournisseurs validées, à échéance ≤ dimanche, sans litige ouvert — total et 5 plus grosses. Préciser que la décision de payer reste à Geoffroy (paiement hors Odoo).
5. **Chantiers** : ceux dont le retard ou le budget consommé dépasse les seuils de Pilotage chantiers, si l'information est accessible ; sinon l'écrire (« suivi chantiers non relié à Odoo »).
6. **Alertes** : celles du veilleur (TVA, RIB modifiés, brouillons anciens, rapprochements futurs…), avec le responsable.
7. **Décisions attendues** : ce qui attend un arbitrage de la direction, s'il y en a.

## Règles
- Chaque chiffre est daté (« au lundi JJ/MM, 8 h »). Ce qui n'a pas pu être lu est écrit comme tel, jamais estimé.
- Pas de jargon : « factures fournisseurs », pas « account.move in_invoice ».
- Livrer dans la conversation ; si la direction veut le garder ou le partager, en faire un document.
- Programmable chaque lundi à 8 h comme tâche planifiée sur le compte Direction (prompt : « Fais le point du lundi de la direction Boutisse avec le skill point-du-lundi »).

## Mesure
La proposition suppose un gain de temps pour la direction. Noter, les 3 premières semaines, le temps que prenait ce point avant et le nombre de corrections demandées.
