# Pièges de données et chiffres de contrôle

Chiffres de contrôle (utiles pour vérifier qu'une requête est juste, pas pour répondre à une question actuelle) :

| Contrôle | Valeur | Date | Source |
|---|---|---|---|
| CA 2025 année | 9 594 k€ | — | tableau de bord direction (filtre 2025) |
| EBE 2025 / résultat 2025 | 1 776 k€ / 1 209 k€ | — | idem |
| CA 2026 au 29/10 | 6 932 k€ (−8,7 % vs 29/10/2025) | 29/10/2026 | idem, recoupé par calcul indépendant |
| Concentration client 2026 | SIEGE FRANCILIANE ≈ 96 % du CA | 19/10/2026 | audit |
| Paie mensuelle | ~80-85 k€ en comptes 64, passée le 30 du mois | 2026 | audit |

## Anomalies connues au 19-21/10/2026 (peuvent avoir été corrigées depuis — vérifier avant de les citer)
1. **Emprunts** : 7 emprunts avec compte long terme = court terme (164) et historique recréé depuis 2021-2025 ; intérêts 2026 en double (banque + EMPRUNTS). 349 écritures EMPRUNTS en brouillon programmées jusqu'en 2030.
2. **Banque** : lignes de relevé datées du 20/10 au 01/12/2026 déjà rapprochées (≈ 78,5 k€) → factures marquées payées alors que rien n'est parti.
3. **TVA** : collectée en attente (445740) très négative tant que le rattrapage n'est pas importé ; aucune écriture de TVA mensuelle en 2026 ; 445510 débiteur.
4. **471** : ≈ 76,6 k€, 17 lignes BNP non justifiées.
5. **Sous-traitance sans autoliquidation** sur 604001 (DINO BTP, PSM).
6. **Brouillons** : ~50 pièces hors emprunts, dont des factures de janvier et juillet.
7. **Commandes de vente** « à facturer » : 44 commandes, 7,14 M€ restant, la plupart antérieures à juillet.
8. **Commandes d'achat** : 374 « à facturer », 581 « rien à facturer » (réceptions non faites).
9. **Immobilisations** : 0 fiche dans Odoo malgré des achats en 2155.
10. **Pas de date de verrouillage** (fiscale, TVA, ventes, achats).

## Règles de lecture qui en découlent
- Trésorerie : `date <= today` sur les lignes de relevé ; mentionner les lignes futures à part.
- Retards clients : exclure les résidus 2025 de la reprise (journal FEC-VENTES / RAN non lettrés).
- Résultat 2026 : signaler le doublon d'intérêts tant qu'il existe (comparer 661 côté banque et côté EMPRUNTS).
- Toute comparaison N-1 : à date égale (même jour), pas mois complet contre mois partiel.
