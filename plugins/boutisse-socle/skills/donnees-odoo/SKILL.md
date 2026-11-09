---
name: donnees-odoo
description: Lire correctement les données Odoo de Boutisse avec le connecteur (odoo_search_read, odoo_execute read_group…). À appliquer avant de donner un chiffre tiré d'Odoo : société, écritures validées, comptes clés, champs maison, et pièges connus (lignes de banque datées dans le futur, reprise 2025, mois non verrouillés, doublon d'intérêts, reste à facturer faux, analytique chantier vide).
---

# Lire Odoo sans se tromper

Base : **boutisse.odoo.com**, Odoo 19 Enterprise en ligne. Repères complets (ids, comptes, journaux, champs) : `references/reperes-odoo.md`. Pièges détaillés et chiffres de contrôle : `references/pieges-donnees.md`.

## Méthode
1. **Compter avant de lire** : `odoo_search_count` puis `odoo_search_read` avec `fields` explicites et une `limit`. Pour un total, `odoo_execute` → `formatted_read_group` (Odoo 19) ou, à défaut, `read_group` sur `account.move.line`.
2. **Société BOUTISSE uniquement** (`company_id = 1`). ALLIEMAT (id 2) n'a aucune écriture.
3. **Écritures validées** : `parent_state = 'posted'` sur les lignes, `state = 'posted'` sur les pièces. Un brouillon n'est pas un chiffre comptable : le signaler à part.
4. **Date** : la date comptable (`date`) sert aux soldes. `x_studio_date_de_reporting` existe mais ne sert pas au tableau de bord direction.
5. **Toujours dater la réponse** et dire « au JJ/MM/AAAA, Odoo, écritures validées ». Le mois en cours et les mois non clôturés **bougent** : aucune date de verrouillage n'est posée.
6. **Recouper** tout chiffre important par une deuxième requête indépendante (ex. total par compte puis total par pièce). Si les deux diffèrent, le dire.
7. Si un champ ou un modèle semble manquer : `odoo_fields_get` avant de conclure. Ne jamais deviner un nom de champ.

## Pièges à neutraliser systématiquement
- **Banque** : des lignes de relevé sont datées dans le futur et parfois déjà rapprochées → filtrer `date <= aujourd'hui` pour toute trésorerie, et signaler les lignes futures.
- **2025** : reprise FEC sans partenaire sur le CA → pas d'analyse par client en 2025 ; ~85 k€ de résidu clients 2025 non lettré à exclure des retards.
- **Fournisseurs** : exclure le journal FEC-ACHATS des dettes ouvertes ; KYKLOS pèse ~360 k€ des dettes échues.
- **Intérêts d'emprunt** comptés deux fois en 2026 (banque + journal EMPRUNTS) → EBE non touché, résultat oui.
- **Reste à facturer** des commandes de vente : faux (devis jamais transformés en facture, surtout SIEGE FRANCILIANE). Ne pas le donner sans cet avertissement.
- **Marge par chantier** : l'analytique est presque vide en 2026 (beaucoup sur « Interne » et « TMP - A CLASSER ») → pas de marge par chantier depuis Odoo.
- **TVA** : le rapport de TVA d'Odoo est inutilisable en l'état ; passer par les comptes (voir le spécialiste compta-tva).
- **Paie** passée le 30 du mois : en cours de mois, l'EBE du mois est surestimé.

## Confidentialité
Le connecteur ne montre que ce que les droits Odoo de la personne permettent. Ne cherche pas à contourner un « Access Denied » : dis que la personne n'a pas ce droit et qui l'a. Ne détaille jamais une rémunération individuelle (journal OD DE PAIES, comptes 64) hors demande explicite de la direction.
