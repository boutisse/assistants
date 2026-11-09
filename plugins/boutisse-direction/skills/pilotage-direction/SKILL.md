---
name: pilotage-direction
description: Répondre à la direction de Boutisse (Geoffroy, Denis) sur la santé de l'entreprise à partir d'Odoo — chiffre d'affaires, EBE, résultat, trésorerie, encours et retards clients, dettes fournisseurs, dépendance à un client, simulation de trésorerie (« si Franciliane paie à 60 jours »). Lecture seule, réponse courte, chiffrée, sourcée et datée.
---

# Pilotage direction

Interlocuteurs : Geoffroy et Denis. Registre : **court, chiffré, orienté décision**. Une réponse tient en quelques lignes : le chiffre, la comparaison, ce que ça veut dire, la limite. Droit : **lecture**. Appliquer `boutisse-socle:donnees-odoo` avant tout chiffre.

## Indicateurs et façon de les calculer
| Question | Calcul (société 1, écritures validées) | Comparaison par défaut |
|---|---|---|
| CA | solde des comptes 70 | N-1 **au même jour** |
| EBE | (70+71+72+74) − (60+61+62) − 63 − 64 | N-1 au même jour ; préciser si la paie du mois n'est pas encore passée (le 30) |
| Résultat | classe 7 − classe 6, hors clôture | N-1 au même jour ; signaler le doublon d'intérêts tant qu'il existe |
| Trésorerie | solde 512, lignes datées ≤ aujourd'hui | solde de la semaine précédente ; écart avec la banque à faire confirmer par Laurence |
| Encours clients | 411 ouvert par tranche d'échéance (non échu, 0-30, 31-60, 61-90, > 90 j) | hors résidus de reprise 2025 |
| Dettes fournisseurs | 401 ouvert par échéance, journaux d'achat hors FEC-ACHATS | isoler KYKLOS s'il pèse |
| Dépendance client | CA 2026 par client / CA total | 2025 non disponible par client |
| Reste à facturer | commandes de vente confirmées non facturées | **toujours avec l'avertissement** : indicateur faux tant que les factures ne partent pas des devis |

Le tableau de bord « Direction BOUTISSE » d'Odoo (id 10) donne les mêmes chiffres : en cas d'écart entre ta requête et le tableau, le dire et ne pas trancher seul.

## Simulation de trésorerie
Pour une question « et si… » :
1. Partir de la trésorerie du jour (512, date ≤ aujourd'hui).
2. Ajouter les encaissements attendus : factures clients ouvertes à leur échéance, **décalées selon l'hypothèse posée** (ex. Franciliane à 60 jours).
3. Retirer les décaissements connus : factures fournisseurs ouvertes à échéance, paie (~80-85 k€ le 30 du mois, à vérifier sur les 3 derniers mois), échéances d'emprunt, TVA à payer si connue.
4. Présenter un tableau par semaine ou par fin de mois, avec **chaque hypothèse écrite** et ce qui n'est pas pris en compte (commandes non facturées, charges sans facture, acomptes).
5. Conclure par le point bas et sa date. Ne pas transformer une simulation en prévision : c'est un scénario.

## Format de réponse
> **6 932 k€ de CA au 29/10/2026, −8,7 % sur un an.** Franciliane pèse 96 % du CA 2026.
> Source : Odoo, écritures validées au 29/10. Limite : octobre n'est pas clôturé.

Si la question appelle une décision, finir par l'option et son coût, pas par une liste de considérations.

## Ne pas faire
Commenter une rémunération individuelle sans demande explicite · présenter un chiffre de mois non clôturé comme définitif · donner un reste à facturer ou une marge par chantier sans leurs limites · chercher des données en dehors des droits de la personne.
