# DuckDuckGo Scraper

Un flux RPA [Robomotion](https://robomotion.io) qui recherche sur DuckDuckGo et exporte les résultats dans un fichier Excel.

## Comment ça fonctionne

1. **Demande une requête de recherche** via une boîte de dialogue
2. **Ouvre un navigateur** et accède à [duckduckgo.com](https://duckduckgo.com)
3. **Saisit la requête** dans la barre de recherche et la soumet (via un sous-flux qui clique sur le bouton de recherche)
4. **Attend les résultats**, puis extrait les titres et liens des articles à l'aide d'un script navigateur
5. **Analyse les résultats** et les écrit dans `~/results.xlsx`

## Structure du projet

- `main.ts` — Définition du flux principal (saisie de requête, automatisation du navigateur, extraction, export Excel)
- `main.designer.ts` — Métadonnées du concepteur (positions des nœuds, caméra)
- `subflows/beeb5c.ts` — Sous-flux qui clique sur le bouton de recherche DuckDuckGo
- `subflows/beeb5c.designer.ts` — Métadonnées du concepteur du sous-flux

## Sortie

Un fichier Excel (`results.xlsx`) est créé dans le répertoire personnel de l'utilisateur avec deux colonnes :

| Titre | Lien |
|-------|------|
| Titre du résultat | URL du résultat |

## Prérequis

- Runtime [Robomotion](https://robomotion.io) avec prise en charge de l'automatisation du navigateur
