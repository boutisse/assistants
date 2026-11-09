# Connecteur Odoo Boutisse — garde-fou

## Contexte
La proposition du 19/10/2026 promet des assistants qui **lisent et préparent des brouillons, sans jamais valider, payer ni envoyer**. Le connecteur retenu, `@netlinksinc/odoo-mcp` 0.2.2 (open source, MIT), expose 10 outils dont `odoo_create`, `odoo_write`, `odoo_unlink`, `odoo_execute` (n'importe quelle méthode, y compris `action_post`) et `odoo_call_action`. **Il n'a aucun mode lecture seule.** Chaque personne s'y connecte avec sa propre clé API Odoo : l'assistant a donc exactement ses droits Odoo, validation comprise pour Laurence.

## Objectif
Que la promesse « lecture et brouillons » soit tenue par le serveur, pas seulement par les consignes écrites dans les skills.

## Solution
Deux déploiements de la même image, chacun avec sa propre liste de personnes autorisées :

| Déploiement | `BOUTISSE_PROFIL` | Outils exposés | Écritures permises |
|---|---|---|---|
| **Odoo Boutisse – lecture** | `lecture` | search_read, read, search_count, fields_get, run_report, execute (lecture seule) | aucune |
| **Odoo Boutisse – brouillons** | `brouillon` | + create, write | devis et lignes de devis (sans statut), activités, notes internes (`mail.mt_note`, sans destinataire), photo jointe à un devis / une facture / un projet |
| *(Claude Code de Briac, stdio)* | `admin` | les 10 | tout sauf pièces comptables, paiements, rapprochements, RIB, modules (miroir de `odoo_write.py`) |

**Premier mois : seul le déploiement « lecture » est en service**, pour les 4 comptes (décision du 09/11/2026). « brouillons » se déploie après le bilan à un mois, pour les personnes validées.

Règles détaillées : `regles.js`. Un profil absent ou mal écrit retombe sur **lecture**.

Contrôles en cascade, du plus dur au plus souple :
1. **Droits Odoo de la personne** (sa clé API) : ce qu'elle ne voit pas dans Odoo, l'assistant ne le voit pas.
2. **Liste d'autorisation du déploiement** (`odoo-mcp users allow`) : sans inscription, la connexion échoue.
3. **Garde-fou** : un outil hors profil n'est pas proposé à Claude ; un appel hors règle est refusé avant d'atteindre Odoo, et tracé dans les journaux (`boutisse_garde_fou`).
4. **Consignes des skills** : ce qu'il faut faire, dans quel ordre, avec quels contrôles.

### Mise en place (Briac)
1. Dupliquer la base Odoo (« pour test ») et faire tous les essais dessus d'abord.
2. `fly launch --config fly.lecture.toml --no-deploy`, poser les secrets (`MCP_ENCRYPTION_KEY`, `MCP_ADMIN_PASSWORD`, `ODOO_USERNAME`, `ODOO_API_KEY`), `fly deploy --config fly.lecture.toml`. Après le bilan à un mois seulement : idem avec `fly.brouillon.toml`, **avec d'autres secrets**.
3. Inscrire les personnes : `odoo-mcp users allow <adresse> --url https://<deploiement>` (voir `../../acces/matrice-acces.md`).
4. claude.ai ▸ Paramètres de l'organisation ▸ Connecteurs ▸ ajouter le connecteur « lecture » (puis « brouillons » après le bilan), URL `https://<deploiement>/mcp`.
5. Chaque personne : Odoo ▸ Préférences ▸ Sécurité du compte ▸ Nouvelle clé API (nommée `claude`, durée un mois), puis dans Claude ▸ Connecteurs ▸ connecter **son** connecteur avec son adresse et cette clé.
6. Côté Claude Code de Briac (profil admin) : ajouter `-e BOUTISSE_PROFIL=admin` à la commande `claude mcp add` et pointer vers une copie locale patchée (même procédure que le Dockerfile).

### Test
`node test-garde-fou.mjs <chemin>/dist/tools/index.js` : 21 cas (lecture, brouillon, admin, profil inconnu). Passé le 29/10/2026 contre des doublures, puis **le 09/11/2026 contre le paquet réel** `@netlinksinc/odoo-mcp@0.2.2` (npm, `regles.js` et `index.js` copiés dans `dist/tools/`) : 21/21. À rejouer dans l'image Docker au premier déploiement, et à chaque montée de version.

**De bout en bout, le 09/11/2026**, sur la copie `tests-compta` : `test-bout-en-bout.mjs` (connecteur 0.2.2 + garde-fou, profil lecture, lancé avec la clé de chaque utilisateur de test). Avec `test_compta` (droits de Laurence) et `test_direction` (droits de Geoffroy) : 6 outils de lecture exposés ; « qui suis-je » renvoie bien l'utilisateur de la clé (15, puis 16) ; 5 tentatives d'écriture (comptabiliser, créer, modifier, poster un message, supprimer) refusées par le garde-fou et tracées ; **le journal de paie (OD DE PAIES) et les comptes 64 sont visibles avec les deux profils**, comme dans Odoo. Reste à faire : le même test à travers le déploiement Fly et le connecteur Claude.

Usage : `ODOO_URL=… ODOO_DB=… ODOO_USERNAME=… ODOO_API_KEY=… node test-bout-en-bout.mjs <dossier du paquet patché>` (variables lues depuis un fichier local, jamais dans un chat).

## Impacts / points à vérifier
- **Épinglage** : le garde-fou remplace `dist/tools/index.js`. Toute nouvelle version du connecteur = relecture de ce fichier avant de monter de version.
- **`ODOO_USERNAME` / `ODOO_API_KEY` en mode http** (code de la 0.2.2 relu le 09/11/2026) : ce compte sert seulement au démarrage (vérification de la connexion et instantané des ressources : modules, rapports, sociétés, langue). **Les outils utilisent la clé de la personne connectée**, stockée chiffrée sur le volume `/data` (`dist/bin.js`, résolveur par personne). Mettre quand même un compte peu privilégié, pas Admin – Intégration : la clé est dans les secrets Fly. Conséquence : la ressource `odoo://user-context` décrit ce compte technique, pas la personne ; le socle identifie la personne autrement (skill `orientation`). À confirmer sur la copie avec le test « Qui suis-je ? ».
- **`ODOO_DB`** : `boutisse` (vérifié le 09/11/2026).
- **Licences** : seules les personnes qui ont un compte Odoo peuvent se connecter (10 licences pour ~30 personnes).
- **Coût d'hébergement** : 1 petite machine Fly.io le premier mois (2 ensuite) qui s'arrêtent quand personne ne s'en sert. Non chiffré à ce jour.
- **Limite connue du profil brouillon** : `odoo_write` sur un devis déjà confirmé n'est pas bloqué par le garde-fou (seul le champ `state` l'est). Odoo verrouille une partie des lignes ; la consigne du skill Ventes l'interdit. À durcir si un cas réel se présente.
- Le connecteur envoie les données lues à Claude (Anthropic). À présenter à Geoffroy avant la mise en service, en particulier pour la paie (journal OD DE PAIES, comptes 64).
