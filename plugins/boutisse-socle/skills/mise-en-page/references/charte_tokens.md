# Boutisse — Tokens charte graphique

Source : Charte graphique Boutisse — Édition 01 · Avril 2026

---

## Palette couleurs

| Token | Nom | Hex | Usage Word |
|-------|-----|-----|-----------|
| bordeaux (primaire) | Bordeaux Boutisse | `#8B2A2A` | Titres H1, page de garde, filets forts, bandeau couverture |
| bordeaux-deep | Bordeaux profond | `#6E1F1F` | Hover, ombres de titre, sous-titres de couverture |
| bordeaux-tint | Terracotta | `#B04545` | Accents uniquement, numérotation |
| bordeaux-wash | Rose argile | `#F4E8E8` | Fond encadré secondaire, background H2 léger |
| marine | Marine institutionnel | `#1B2A4E` | Titres H2, tableaux, données techniques |
| marine-deep | Marine nuit | `#0F1A32` | Emphase, tableaux en-tête |
| marine-tint | Marine acier | `#3A4B72` | H3, libellés tableau |
| marine-wash | Brume | `#E6EAF2` | Fond cellule tableau header, fond encadré données |
| ink | Encre | `#15110E` | Texte courant principal |
| graphite | Graphite | `#2A2622` | Corps de texte, paragraphes |
| sand | Sable | `#E8DFD2` | Séparateur, filet horizontal |
| paper | Ivoire | `#FDFBF7` | Fond page, texte sur fond bordeaux/marine |

---

## Typographie (Word — fallbacks sans-serif)

> Manrope n'est pas natif Office. Fallback validé : **Arial** (disponible partout).
> Fraunces → **Georgia** (italic). JetBrains Mono → **Courier New**.

| Rôle | Font Word | Taille | Graisse | Couleur |
|------|-----------|--------|---------|---------|
| Titre couverture | Arial | 28pt | Bold | Ivoire `#FDFBF7` |
| Sous-titre couverture | Arial | 16pt | Regular | Ivoire `#FDFBF7` |
| Tagline couverture | Arial (italic) | 12pt | Regular Italic | Ivoire `#FDFBF7` |
| H1 (Heading1) | Arial | 18pt | Bold | Bordeaux `#8B2A2A` |
| H2 (Heading2) | Arial | 14pt | Bold | Marine `#1B2A4E` |
| H3 (Heading3) | Arial | 12pt | Bold | Marine acier `#3A4B72` |
| Corps (Normal) | Arial | 11pt | Regular | Graphite `#2A2622` |
| En-tête doc (Header) | Arial | 9pt | Regular | Muted `#7A7570` |
| Pied de page (Footer) | Arial | 8pt | Regular | Muted `#7A7570` |
| Tableau header | Arial | 10pt | Bold | Ivoire `#FDFBF7` (fond marine) |
| Tableau corps | Arial | 10pt | Regular | Graphite `#2A2622` |

---

## Mise en page A4

- **Format** : A4 (11906 × 16838 DXA)
- **Marges** : haut 1700, bas 1700, gauche 1800, droite 1700 DXA (≈ 3cm gauche, 2.99cm autres)
- **En-tête** : 709 DXA depuis le bord (1.25cm)
- **Pied de page** : 709 DXA depuis le bord
- **Interligne corps** : 1.15 (276 DXA) avec 6pt after paragraph
- **Espacement H1** : 24pt before, 12pt after
- **Espacement H2** : 18pt before, 8pt after
- **Espacement H3** : 12pt before, 6pt after

---

## Structure obligatoire d'un document Boutisse

1. **Page de couverture** (section séparée, fond bordeaux `#8B2A2A`, marges 0)
   - Logo blanc centré en haut (logo_blanc.png)
   - Titre document en gros blanc, centré
   - Sous-titre / objet, centré
   - Tagline "Infrastructures et territoires de demain" en italic ivoire
   - Date en bas, ivoire
   
2. **Sommaire** (Table of Contents auto — suit couverture)
   - Titre "Sommaire" en H1 bordeaux
   - TOC 2 niveaux (H1 + H2)

3. **Corps du document** (sections normales)
   - En-tête : logo_rouge.png (40px de haut) + séparateur horizontal bordeaux + "BOUTISSE" en petit gris
   - Pied de page : "BOUTISSE — Infrastructures et territoires de demain" gauche + numéro de page droite
   - Filet bordeaux sous chaque H1
   - Background bordeaux-wash `#F4E8E8` sur les H2 en bande (via paragraph shading)

---

## Règles inviolables

- ❌ **JAMAIS modifier un mot du texte source** — mise en page uniquement
- ❌ **JAMAIS couper une phrase** à cause de la mise en page
- ❌ Ne pas ajouter de contenu non présent dans la source
- ✅ Appliquer TOUS les styles définis ci-dessus
- ✅ Générer un vrai TOC auto-généré (pas un faux texte)
- ✅ Logo blanc sur fond bordeaux, logo rouge sur fond blanc
- ✅ Numéroter toutes les pages sauf la couverture
