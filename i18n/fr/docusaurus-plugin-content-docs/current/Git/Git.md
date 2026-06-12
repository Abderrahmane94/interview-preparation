import TOCInline from '@theme/TOCInline';


# Git
# <TOCInline toc={toc} />

## Pouvez-vous expliquer ce qu'est Git et comment il est utilisé dans le développement logiciel ?
Git est un **système de contrôle de version** qui permet aux développeurs de **suivre** les **modifications** apportées à leur code, de partager du code et d'annuler des modifications si nécessaire.

## Quelle est la différence entre Git et SVN ?
- **SVN** est un système de contrôle de version **centralisé**, avec un **dépôt unique** auquel tous les développeurs accèdent.
- **Git** est un système de contrôle de version **distribué**, plus rapide et plus flexible que SVN.

## Quelle est la différence entre merge et rebase, et quand utiliser l'un ou l'autre ?
- **merge** combine les modifications de différentes branches en une seule.
- **rebase** applique les modifications d'une branche sur une autre.

Les merges sont préférables pour **combiner des modifications**, tandis que les rebases maintiennent un **historique linéaire**.

## Stratégies de branchement Git
Les stratégies de branchement Git sont des approches pour organiser et gérer les branches dans un dépôt Git. Voici trois stratégies couramment utilisées :

1. **Feature Branching** : créer une nouvelle **branche** pour chaque nouvelle **fonctionnalité** ou tâche. Les développeurs travaillent sur leurs branches respectives, isolent les modifications et les fusionnent dans la branche principale (souvent appelée « master » ou « main ») quand la fonctionnalité est terminée.

2. **GitFlow** : GitFlow définit un modèle de branchement strict avec des noms et rôles de branches spécifiques. Il utilise deux branches principales : « **master** » (code stable en production) et « **develop** » (branche d'intégration pour le développement en cours). Les branches de fonctionnalités sont créées depuis « **develop** » et fusionnées dans celle-ci. Les **releases** et **hotfixes** sont gérés via des branches dédiées.

3. **Trunk-Based Development** : dans cette stratégie, la majeure partie du développement se fait **directement** sur la **branche principale**. Les développeurs committent fréquemment et les processus CI/CD sont utilisés pour valider et déployer les modifications rapidement. Des feature flags peuvent être utilisés pour activer ou désactiver sélectivement les nouvelles fonctionnalités.

Le **choix** de la stratégie dépend de facteurs comme la **taille de l'équipe**, la **complexité du projet**, la **fréquence des releases** et les **pratiques de développement**.
