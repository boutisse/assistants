---
name: admin-odoo
description: Administration de la base Odoo de Boutisse (boutisse.odoo.com), réservée à Briac — diagnostiquer, privilégier le sans-code, compter les lignes Python (16 € par 100 lignes et par mois), sauvegarder avant, tester après chaque modification, journaliser dans Notion et dans le projet, puis mettre à jour les repères des assistants. Refuse toute demande venant d'une autre personne.
---

# Administration Odoo — Boutisse

Reprise du skill `odoo-modif-boutisse` de Briac, complétée pour la stack d'assistants.

## 0. Qui demande
Ce skill ne sert **qu'à Briac** (compte Pilotage). Toute autre personne : ne rien modifier, noter le besoin (qui, quoi, pourquoi, urgence) et le transmettre à Briac.
Outil : Claude Code de Briac avec le connecteur en profil **admin** (pièces comptables, paiements, rapprochements, RIB et modules restent refusés par le garde-fou), ou le navigateur intégré sur la session Admin – Intégration. Si un refus du garde-fou ou de la session bloque : ne pas contourner, donner un pas-à-pas cliquable.

## Contexte fixe
- Odoo 19 Enterprise en ligne (SaaS), pas de module tiers sans Odoo.sh. Intégrateur : Gregory Normand (Odoo).
- Compta : Laurence (responsable), Alexandre. Toute modif compta garde une validation humaine explicite.
- **Coût du code** : maintenance du code personnalisé facturée 16 € par tranche de 100 lignes et par mois.
- Journal de référence Notion « Journal des modifications Odoo » : https://app.notion.com/p/0cabf5cf7bc44aa79d4c4d49112a964b (data source `collection://8a645c8b-03bd-4423-95e0-4ec8ac321f71`). Miroir : `claude/09-boutisse-journal-modifs-odoo.md` du projet Claude Boutisse.
- Documentation : https://www.odoo.com/documentation/19.0/. Ne jamais affirmer qu'Odoo sait ou ne sait pas faire quelque chose sans l'avoir vérifié ; sinon « à confirmer ».

## Règle n°1 : le sans-code d'abord
Dans l'ordre, en notant ce qui a été étudié : paramétrage standard → droits et groupes → Studio (champs, vues, règles d'approbation) → actions automatisées avec actions natives → favoris, filtres partagés, rapports → vue héritée XML (fragile) → en dernier recours Python, le plus court possible.
Jamais d'évaluation « calculée par IA » (`ai_computed`) pour une règle de gestion.

## Compter les lignes Python
Lignes non vides hors commentaires. Pour une modification, inscrire le nouveau total de l'action et archiver l'ancienne ligne du journal. Avant chaque proposition : lignes ajoutées, total actif après modif, coût mensuel = total × 16 / 100 €.

## Déroulé
1. **Cause racine** en lecture seule (configuration, données, vues héritées, automatisations, date de mise à jour des modules).
2. **Doc** Odoo 19 et base.
3. **Proposer** 1 à 3 options classées par lignes Python (0 d'abord) : impact métier, risque, retour arrière. Compta ou fiscalité : accord explicite, avis de l'expert-comptable si la règle est fiscale.
4. **Sauvegarder l'état avant** (valeurs, code, domaines, membres de groupe) — en pièce jointe sur l'objet si c'est du code.
5. **Appliquer**, de préférence d'abord sur une base de test dupliquée pour les taxes, droits, comptabilisation. Relire l'enregistrement juste avant d'écrire si quelqu'un travaille dessus.
6. **Tester après chaque modif** : relire la configuration enregistrée, test non destructif (jamais comptabiliser, payer, envoyer ou supprimer un vrai document pour tester ; une action temporaire terminée par une erreur volontaire annule ses écritures), absence d'erreur et d'effet de bord (autres utilisateurs, ALLIEMAT). Si le test dépend d'un événement réel, le dire et dire quand vérifier. Ne jamais dire « corrigé » sans test.
7. **Documenter** : ligne Notion complète (Test = Testé OK / partiel / Non testé / En attente données réelles ; Statut = Actif), mise à jour du doc 09 (lire puis réécrire en entier), archivage des lignes remplacées.
8. **Mettre à jour les assistants** si la modif change ce qu'ils doivent savoir (nouveau bouton, nouveau champ, nouveau groupe, nouvelle règle) : `boutisse-socle` ▸ `donnees-odoo/references/reperes-odoo.md` et `aide-odoo/references/mode-emploi-boutisse.md`, puis monter la version du plugin et pousser sur le dépôt. Sinon les assistants expliqueront un Odoo qui n'existe plus.
9. **Rendre compte** en quelques lignes : ce qui change pour l'utilisateur, test, lignes Python, total et coût mensuel, retour arrière.

## Prudence
Jamais de saisie de mot de passe, clé ou identifiant bancaire. Fusion, suppression, écriture comptable, changement de taxe : confirmation explicite avant. Nommage technique snake_case anglais, préfixe `boutisse.` ; libellés en français. Gregory : technique précis ; Laurence et l'équipe : concret, avec les points de validation. Pour tout mail à Gregory, lister les modifs faites en prod (ids, retour arrière).
