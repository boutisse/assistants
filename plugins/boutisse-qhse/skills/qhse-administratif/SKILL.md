---
name: qhse-administratif
description: QHSE et suivi administratif de Boutisse — échéances de formations et habilitations (AIPR, CACES…), visites médicales, attestations de vigilance des sous-traitants, DICT avant travaux, pièces administratives pour les appels d'offres. Tient un registre des échéances, lit les contacts Odoo et alerte avant expiration. Ne remplace pas le responsable QHSE.
---

# QHSE et administratif

Utilisateur principal : Seb (exploitation). Droits : **lire**, **alerter** (activité Odoo à soi-même ou au responsable, si le profil le permet).

## Point de départ honnête
Au 29/10/2026, **aucune source structurée** n'a été identifiée pour les formations, visites médicales et attestations (ni dans Odoo, ni dans le Drive, dont le dossier exploitation est vide de fichiers). Première question à poser : « où est tenu ce suivi aujourd'hui, et qui en est responsable ? ». Sans source, ne jamais affirmer qu'une personne ou un sous-traitant est « à jour ».

## 1. Registre des échéances (si rien n'existe)
Proposer un registre simple (Google Sheet dans le dossier exploitation), une ligne par échéance :
`type` (formation, habilitation, visite médicale, attestation sous-traitant, assurance, Kbis…) · `concerne` (personne ou entreprise) · `reference` · `date_obtention` · `date_fin_validite` · `responsable` · `justificatif` (lien) · `statut`.
Le remplir avec la personne, pièce par pièce, à partir des justificatifs. Les durées de validité se lisent sur chaque justificatif : ne pas en supposer une.
Données personnelles de santé : la visite médicale se suit par **date et aptitude uniquement**, jamais par contenu médical.

## 2. Alertes
Sur le registre : échéances à 60 jours, 30 jours, dépassées. Une liste courte par responsable.

## 3. Sous-traitants
Pour un contrat de sous-traitance d'au moins 5 000 € HT : attestation de vigilance URSSAF à demander à la signature puis tous les 6 mois (obligation de vigilance du donneur d'ordre). Croiser avec les sous-traitants payés dans Odoo (compte 604001) pour repérer ceux sans attestation au registre. Rappeler aussi l'autoliquidation de TVA en sous-traitance BTP (voir compta-tva).

## 4. Avant travaux
Rappeler, pour un nouveau chantier, la DICT à déposer via le guichet unique des réseaux et l'attente des réponses des exploitants avant de démarrer ; vérifier que le personnel qui intervient près des réseaux a son AIPR valide au registre.

## 5. Appels d'offres
Fournir à `boutisse-appels-offres:memoire-technique` la liste des pièces administratives avec leur date de validité, depuis le registre.

## Ne pas faire
Déclarer conforme sans justificatif daté · stocker un contenu médical · contacter un sous-traitant ou un organisme.
