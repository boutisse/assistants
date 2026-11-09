---
name: chantiers
description: Suivi des chantiers de Boutisse — fiche d'un chantier (Odoo Projets, commandes, factures), avancement prévu / réel, retard et budget consommé depuis les fichiers Journal et Pilotage chantiers, reste à facturer, et prévisionnel de débours d'un nouveau chantier avec la calculette (diamètre, technique, difficulté, longueurs). Lecture ; prépare des activités et notes.
---

# Chantiers

Utilisateurs : Seb (exploitation), Geoffroy et Denis (marges). Droits : **lire** ; **préparer** = activité ou note interne sur un projet. Lecture Odoo : `boutisse-socle:donnees-odoo`.

## Où sont les données
| Donnée | Où | Remarque |
|---|---|---|
| Identité du chantier, tâches, abonnés | Odoo ▸ Projets (`project.project`, `project.task`) | Un chantier = une fiche. Clé commune : **n° d'affaire** |
| Commandes, factures, encaissements | Odoo ▸ Ventes, Comptabilité | filtrer par chantier / référence client |
| Coûts par chantier | Odoo analytique | **quasi vide en 2026** : pas de marge par chantier depuis Odoo |
| Saisie quotidienne (moyens, quantités, fournitures) | Google Sheet « Journal chantiers » | partagé avec la personne qui saisit |
| Prévu / réel / projeté, prix de vente, marge | Google Sheet « Pilotage chantiers » | **confidentiel** : direction seulement |
| Prévisionnel d'un nouveau chantier | Google Sheet « Calculette prévisionnel chantier » | prix de 3 phases encore à remplir par Geoffroy |
Dossier Drive : `Boutisse / 2-BOUTISSE EXPLOITATION / Suivi Chantier`. Les droits Drive de la personne s'appliquent : si elle n'a pas accès à Pilotage, l'assistant non plus — ne pas chercher à reconstituer prix de vente ou marge autrement.

## 1. Fiche chantier
Pour « où en est le chantier X » : identité (client, commune, rue, n° d'affaire), commandes et montant commandé, facturé, encaissé, reste à facturer (avec ses limites), puis, si accessible, avancement par phase (canalisation, réfection, report de branchements, raccordements), dates prévues / fin estimée, budget consommé en % (vert ≤ 90 %, orange 90-100 %, rouge > 100 %). Chaque source citée.

## 2. Vue d'ensemble
Chantiers en dérive : retard planning, budget consommé > 90 %, ou facturation en retard sur l'avancement. Trier par enjeu (montant).

## 3. Prévisionnel d'un nouveau chantier (calculette)
Entrées : diamètre, technique, niveau de difficulté (majoration 0 / 10 / 20 / 30 / 40 % sur les 4 phases), longueur de canalisation, longueur de réfection, nombre de reports de branchement et de raccordements.
- La calculette donne un **débours (coût)**, pas un prix de vente.
- Prix de canalisation = moyenne historique (66 chantiers 2025-2026) ou correction de Geoffroy ; **fiabilité faible si moins de 3 chantiers comparables** — le dire.
- Réfection, report, raccordement : **prix à saisir par Geoffroy** par diamètre × technique. Combinaison vide → ligne vide, jamais un prix inventé.
- Sortie : débours par phase, total, message de fiabilité. Puis rappel : recopier les 4 débours par phase dans Pilotage ▸ Chantiers.

## 4. Nommage
Dossier chantier : `CLIENT - COMMUNE - Rue - n° d'affaire`. Projet Odoo : `COMMUNE - Voie` (adresse remplie automatiquement).

## Ne pas faire
Montrer prix de vente ou marge à une personne qui n'a pas accès à Pilotage · calculer une marge par chantier depuis l'analytique Odoo · utiliser les colonnes ambiguës de l'ancien « Recap.xlsx » (« e/ml », report/raccord) · modifier les fichiers de suivi (ils sont protégés et alimentés par des scripts).
