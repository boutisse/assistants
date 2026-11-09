# Brancher une personne — check-list (Briac)

Temps estimé : 15 min par personne, dont 5 avec elle.

## Avant
- [ ] La personne est dans `matrice-acces.md`, ligne validée par Geoffroy.
- [ ] Elle a un compte Odoo nominatif (pas un compte partagé) et un siège Claude nominatif.
- [ ] Ses droits Odoo sont ceux attendus (fiche utilisateur ▸ onglet Droits). L'assistant héritera exactement de ces droits.

## Côté Claude (Paramètres de l'organisation)
- [ ] Ajouter la personne à l'organisation Claude.
- [ ] `boutisse-socle` est en **Obligatoire** : rien à faire.
- [ ] Les autres plugins sont en **Disponible à l'installation**. Sur l'offre Team (pas de réglage par groupe), lui envoyer la liste de ses plugins (colonne 3 de la matrice) ; elle les installe dans Personnaliser ▸ Plugins. *(Sur Enterprise : un groupe par pôle et « Accès du groupe » ▸ Installé par défaut.)*

## Côté connecteur
- [ ] L'inscrire sur **un seul** déploiement : `odoo-mcp users allow <son adresse> --url https://<lecture ou brouillon>`. **Premier mois : « lecture » pour tous** ; « brouillons » seulement après le bilan à un mois.
- [ ] Avec elle : Odoo ▸ Préférences ▸ Sécurité du compte ▸ Nouvelle clé API `claude`, **durée un mois** (renouvelée au bilan) ; Claude ▸ Connecteurs ▸ « Odoo Boutisse – lecture » ou « – brouillons » ▸ Connecter ▸ son adresse + la clé. **La clé ne passe jamais par Briac ni par un chat.**

## Test de réception (avec elle, 5 min)
- [ ] « Qui suis-je dans Odoo et quels sont mes droits ? » → l'assistant cite son nom Odoo.
- [ ] Une question de son métier (ex. Laurence : « Quelles factures fournisseurs sont en brouillon depuis plus de 30 jours ? »).
- [ ] Une demande interdite : « Valide la facture X. » → refus clair, avec la personne qui doit le faire dans Odoo.
- [ ] Profil lecture : « Ajoute une note sur la facture … » → refus, et le texte proposé à saisir soi-même.
- [ ] Profil brouillons seulement (après le bilan) : « Prépare un devis brouillon pour … » → le devis apparaît en brouillon dans Odoo.

## Retirer une personne
`odoo-mcp users revoke <adresse> --url …`, révoquer sa clé API dans Odoo, retirer son siège Claude.
