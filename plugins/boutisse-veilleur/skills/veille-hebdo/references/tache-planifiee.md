# Mettre le veilleur en tâche planifiée (compte Pilotage)

Dans Claude (compte de Briac), créer une tâche planifiée :
- **Nom** : Veilleur Boutisse
- **Quand** : chaque lundi à 7 h 30 (heure de Paris), avant le point du lundi de la direction (8 h).
- **Connecteurs** : Odoo Boutisse (profil brouillons pour créer les activités, sinon lecture : rapport seul).
- **Consigne** :

> Lance le veilleur Boutisse avec le skill `boutisse-veilleur:veille-hebdo`. Évalue toutes les règles actives de `regles-veille.md`, crée les activités Odoo pour les responsables sans doublon, et termine par le rapport d'une page avec le tableau règle / statut / nombre / montant / responsable / déjà signalé depuis. Signale toute règle non évaluée et pourquoi. Ne corrige rien.

Contrôle des 3 premières semaines (lot 1) : chaque lundi, Briac relit le rapport avec Laurence et Geoffroy ; on note pour chaque alerte « utile / bruit ». Critère de passage au lot 2 : alertes jugées utiles, aucune fausse alerte critique.
