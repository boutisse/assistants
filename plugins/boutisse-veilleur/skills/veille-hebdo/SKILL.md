---
name: veille-hebdo
description: Veilleur hebdomadaire de Boutisse — chaque lundi (ou sur demande « lance le veilleur », « contrôle les anomalies »), passe en revue les règles de veille sur Odoo (TVA bloquée, RIB modifié, abonnement Odoo, lignes de banque futures, brouillons anciens, compte d'attente, litiges et bons à payer, clients en retard…), prévient chaque responsable par une activité Odoo et produit un rapport d'une page. Ne corrige jamais rien.
---

# Veilleur du lundi

Tourne sur le compte **Pilotage** (Briac), en tâche planifiée le lundi à 7 h 30, avant le point du lundi de la direction. Règles : `references/regles-veille.md`. Mise en place de la tâche : `references/tache-planifiee.md`. Lecture Odoo : `boutisse-socle:donnees-odoo`.

## Déroulé
1. Pour chaque règle **active** de `regles-veille.md` : lancer la requête, compter, garder au plus 10 exemples (pièce, partenaire, montant, date, ancienneté).
2. **Recouper** toute règle qui se déclenche par une seconde requête (ex. compter puis lire). En cas de doute sur un champ, `odoo_fields_get` ; si la règle ne peut pas être évaluée, l'écrire « non évaluée » avec la raison — ne jamais conclure « rien à signaler » sur une requête en erreur.
3. **Prévenir le responsable** de chaque règle déclenchée par une activité Odoo (`mail.activity`, type À faire) sur l'objet concerné, ou sur la fiche société si c'est global :
   - résumé : `[Veilleur] <titre de la règle>` ;
   - note : constat chiffré, 3 exemples, action attendue ;
   - échéance : selon la gravité (critique : aujourd'hui ; haute : 3 jours ; normale : 7 jours).
   **Avant de créer**, chercher une activité ouverte avec le même résumé pour ce responsable : si elle existe, ne pas en créer une seconde, le noter « déjà signalé depuis le JJ/MM ». Odoo envoie lui-même la notification par mail au responsable : aucun mail n'est envoyé par l'assistant.
   Sans profil brouillons (connecteur lecture), ne créer aucune activité : tout va dans le rapport.
4. **Rapport** (une page, dans la conversation ou comme message à Briac) : tableau règle / statut (déclenchée, ras, non évaluée) / nombre / montant / responsable / déjà signalé depuis ; puis le détail des règles critiques ; puis les règles non évaluées.
5. Comparer au rapport de la semaine précédente s'il est disponible : nouvelles alertes, alertes résolues, alertes qui durent depuis plus de 3 semaines (à remonter à la direction).

## Règles d'or
- Constater, jamais corriger. Pas d'écriture, pas de lettrage, pas de suppression d'activité d'autrui.
- Pas plus d'une activité par règle et par responsable : une alerte qui inonde n'est plus lue.
- Les seuils et responsables viennent de `regles-veille.md`. Un responsable « à nommer » → alerte adressée à Briac, avec la mention « responsable à nommer ».
- Mesurer : noter chaque semaine le nombre d'alertes ouvertes, créées et résolues. C'est le seul moyen de montrer que le veilleur sert à quelque chose.
