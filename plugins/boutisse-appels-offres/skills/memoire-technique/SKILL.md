---
name: memoire-technique
description: Répondre à un appel d'offres public de Boutisse (travaux AEP, canalisations, réseaux d'eau potable en Île-de-France) — analyse du règlement de consultation (RC, CCTP, CCAP), liste des pièces à fournir, questions ciblées, plan à valider puis mémoire technique Word à la charte Boutisse. À utiliser dès qu'on parle de règlement de consultation, mémoire technique, appel d'offres, réponse à marché ou qu'un PDF de RC est joint.
---

# Appels d'offres — mémoire technique Boutisse

Reprise du skill `boutisse-memo` de Briac (chemins rendus relatifs à ce dossier), complétée par l'analyse du dossier et la liste des pièces.

**Sortie** : une fiche d'analyse du dossier, puis un mémoire `.docx` avec charte Boutisse, sommaire et emplacements photo. Rien n'est déposé sur une plateforme par l'assistant : le dépôt et la signature restent faits par la personne habilitée.

## Étape 1 — Analyser le dossier
Lire le RC (et CCTP / CCAP si fournis ; skill `pdf-reading` si besoin) et produire une **fiche d'analyse** courte :
- objet, lots, sites, maître d'ouvrage (SEDIF, Veolia Franciliane, commune, syndicat…) ;
- **date et heure limite de remise**, plateforme de dépôt, visite obligatoire ;
- plan du mémoire imposé (souvent dans « pièces à remettre ») et **critères de notation** avec leur poids ;
- points obligatoires (méthodologie par site, moyens, HSE, développement durable…), contraintes (délais, accès, ZFE, sites sensibles) ;
- **pièces administratives demandées** (DC1/DC2 ou DUME, attestations fiscales et sociales, Kbis, assurances, certificats, références) : liste à cocher, avec ce qui est périmé ou manquant à demander. Ne jamais déclarer une pièce « à jour » sans l'avoir vue avec sa date.

## Étape 2 — Charger la connaissance Boutisse
Lire `references/company_knowledge.md` (présentation, chiffres, certifications, procédés, moyens, HSE, innovations). Si le connecteur Google Drive est disponible, chercher des mémoires proches dans :
- mémoires de référence : https://drive.google.com/drive/folders/1rVdBXZ5_B7csM9gzw1WlAE3oy79bWWzj
- photos chantiers : https://drive.google.com/drive/folders/1EjditrBP9tvCi8yc7N2jL79oIOxMJLdA

Si le serveur de fichiers de l'entreprise (lecteur R) est accessible depuis le poste, y chercher un mémoire comparable ; ne jamais ouvrir les dossiers RH ou paie.

## Étape 3 — Questions ciblées
Seulement ce que le dossier ne dit pas, **8 questions maximum**, regroupées : sites et contraintes locales, conducteur de travaux pressenti, délai global, spécificités techniques (diamètres, matériaux), exigences RSE du pouvoir adjudicateur, photos à inclure.

## Étape 4 — Plan à valider
Proposer le plan (structure type ci-dessous, adaptée au plan imposé par le RC) et **attendre la validation** avant de rédiger.

1. Présentation de l'entreprise (histoire et territoire, expertise AEP et références, organisation)
2. Procédés et modes d'exécution (préparation, sections du RC, méthodologie par site)
3. Organisation (moyens humains dédiés, moyens matériels, approvisionnements)
4. Hygiène et sécurité
5. Développement durable
6. Innovations (si demandé ou pertinent)

## Étape 5 — Rédiger
Lire `references/tone_and_style.md`. Première personne du pluriel (« nous », « Boutisse s'engage à… »), ton assertif, jamais de conditionnel pour un engagement. Adapter la méthodologie à chaque site listé. Mettre en avant les éléments différenciants et certifications présents dans `company_knowledge.md` **uniquement** — ne jamais inventer une référence chantier, un chiffre ou une certification.

## Étape 6 — Générer le Word
Lire le skill officiel `docx`, puis appliquer la charte :
- bordeaux `#8B1C1C`, gris texte `#333333`, Arial 11 pt, titres Arial gras ;
- logos `assets/logo_boutisse_blanc.png` (sur fond bordeaux) et `assets/logo_boutisse_rouge.png` (sur fond blanc) ;
- couverture bordeaux pleine page : « MÉMOIRE TECHNIQUE », titre du marché (24 pt), pouvoir adjudicateur (14 pt), « Infrastructures et territoires de demain » en italique, date ;
- sommaire automatique, en-tête logo + nom, pied « BOUTISSE — Infrastructures et territoires de demain » + pagination ;
- emplacements `[PHOTO : description]` sur fond `#F0F0F0`.

Pour une mise en page plus fine, le skill `boutisse-socle:mise-en-page` donne la charte v2.

## À éviter
Conditionnel sur un engagement · texte générique non adapté au RC · référence inventée · Word généré sans plan validé · couverture oubliée · pièce administrative déclarée valide sans date vérifiée.

## Mesure
La proposition du 19/10 vise un gain de temps sur les appels d'offres. Noter pour chaque réponse : date de réception du dossier, temps passé, date de dépôt. Sans ce relevé, aucun gain ne pourra être démontré.
