---
name: mise-en-page
description: Mise en page Word (.docx) à la charte Boutisse — page de garde bordeaux, sommaire, en-têtes et pieds de page, titres H1/H2/H3, corps justifié. À utiliser quand on demande de « mettre en page », « habiller », « appliquer la charte », « faire un beau Word » ou une page de garde Boutisse. Ne modifie jamais le texte source.
---

# Mise en page Boutisse (Word)

Reprise du skill `boutisse-layout` v2 de Briac, chemins rendus relatifs au dossier de ce skill.

## Règle absolue
Ne jamais modifier, couper ou reformuler le texte source. Seule la structure (niveaux de titre) et la forme changent.

## Déroulé
1. Lire `references/charte_tokens.md` (couleurs, polices, tailles).
2. Repérer les niveaux de titre du contenu sans changer un mot.
3. Lire le skill officiel `docx` (création de fichiers Word) et générer le document.
4. Valider le fichier (script de validation du skill `docx`) et l'ouvrir pour contrôle visuel avant de le livrer.

Logos (dans `assets/`) :
- page de garde : `logo_blanc_cover.png` (rapport ≈ 3,82:1) — hauteur 54 pt, largeur 206 pt ;
- en-tête : `logo_rouge_header.png` (rapport ≈ 4,56:1) — hauteur 28 pt, largeur 128 pt.

## Styles
| Niveau | Police | Taille | Couleur | Filet bas | Saut de page avant |
|---|---|---|---|---|---|
| H1 | Arial gras | 18 pt | bordeaux `#8B2A2A` | simple 6 pt | oui |
| H2 | Arial gras | 14 pt | bordeaux `#8B2A2A` | simple 4 pt | oui |
| H3 | Arial gras | 12 pt | marine acier `#3A4B72` | non | non |
| Intertitre gras | Arial gras | 11 pt | bordeaux | non | non |

Corps : Arial 11 pt, graphite `#2A2622`, **justifié**, interligne 1,15, 6 pt après paragraphe. Notes en italique avec filet vertical bordeaux à gauche. En-tête : logo + filet bordeaux 1 pt. Pied de page : « BOUTISSE — Infrastructures et territoires de demain » + numéro de page.

## À éviter
Logos déformés (toujours largeur = hauteur × rapport) · fond coloré sous les H2 · corps aligné à gauche · oubli du saut de page avant H1 et H2 · toute retouche du texte.

Un livrable destiné à Boutisse suit en plus la structure **contexte → objectif → solution → impacts** (skill `orientation`).
