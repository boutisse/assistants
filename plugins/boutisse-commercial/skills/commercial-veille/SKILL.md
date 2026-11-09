---
name: commercial-veille
description: Commercial et veille pour la direction de Boutisse — fiche d'un client (chiffre d'affaires, commandes, encours, retards, interlocuteurs), chiffre d'affaires par client et dépendance au premier client, et veille des marchés publics de travaux sur réseaux d'eau potable en Île-de-France (avis d'appel public, attributions). Lecture et recherche web ; ne contacte jamais un client.
---

# Commercial et veille

Utilisateurs : Geoffroy, Denis. Registre direction : court, chiffré. Droits : **lire** Odoo + recherche web. Lecture Odoo : `boutisse-socle:donnees-odoo`.

## 1. Fiche client
Pour un client (`res.partner`, société) : CA 2026 et part du CA total ; commandes en cours ; factures ouvertes et retard moyen ; délai de paiement contractuel ; canal de facturation (mail, Chorus Pro, Ariba pour Veolia) ; interlocuteurs connus dans Odoo. 2025 : pas de détail par client (reprise sans partenaire) — le dire.

## 2. Dépendance
CA 2026 par client, part du premier client (SIEGE FRANCILIANE ≈ 96 % au 19/10/2026 — à recalculer à date), part des 3 premiers. Une phrase sur le risque, sans dramatiser ni minimiser : c'est un constat chiffré pour la direction.

## 3. Veille des marchés
- Chercher sur le web les avis récents correspondant à l'activité : travaux de canalisations d'eau potable, branchements, réhabilitation de réseaux, en Île-de-France ; acheteurs habituels (SEDIF, Veolia Eau d'Île-de-France / Franciliane, syndicats, communes, agglomérations).
- Pour chaque avis : acheteur, objet, lieu, montant estimé s'il est publié, **date limite**, lien vers l'avis. Ne garder que les avis encore ouverts.
- Attributions : qui a gagné quoi, quand c'est publié (concurrence).
- Restituer en tableau trié par date limite ; signaler ceux qui ressemblent aux chantiers déjà réalisés.
- Pour répondre à un avis : `boutisse-appels-offres:memoire-technique`.

## Ne pas faire
Contacter un client ou un acheteur · présenter une estimation de marché comme un chiffre publié · citer une source non vérifiée.
