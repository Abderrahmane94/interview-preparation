---
sidebar_position: 3
---

import TOCInline from '@theme/TOCInline';

# Patrons de Conception
# <TOCInline toc={toc} />

## Qu'est-ce que les patrons de conception ?
Les **patrons de conception** sont des solutions typiques à des problèmes récurrents en conception logicielle.

### 1. Patrons de création
Les patrons de création se concentrent sur les mécanismes d'instanciation des objets.
1. **Singleton** : garantit qu'une seule instance d'une classe existe dans le système.
2. **Factory Method** : définit une interface pour créer des objets, mais laisse les sous-classes décider quelle classe instancier.
3. **Abstract Factory** : fournit une interface pour créer des familles d'objets liés sans spécifier leurs classes concrètes.
4. **Builder** : sépare la construction d'objets complexes de leur représentation, permettant au même processus de construction de créer différentes représentations.
5. **Prototype** : crée de nouveaux objets en clonant des objets existants, sans spécifier explicitement leur classe.

### 2. Patrons structurels
Les patrons structurels se concentrent sur la composition et la structure des classes et des objets.
1. **Adapter** : convertit l'interface d'une classe en une autre interface attendue par les clients. Permet à des classes incompatibles de travailler ensemble.
2. **Bridge** : découple une abstraction de son implémentation, permettant à chacune de varier indépendamment.
3. **Composite** : compose des objets en structure arborescente pour représenter des hiérarchies tout-partie.
4. **Decorator** : ajoute dynamiquement des responsabilités ou comportements aux objets sans héritage.
5. **Facade** : fournit une interface unifiée à un ensemble d'interfaces d'un sous-système, simplifiant son utilisation.
6. **Flyweight** : partage l'état commun entre plusieurs objets pour réduire la consommation mémoire.
7. **Proxy** : fournit un objet substitut qui contrôle l'accès à un autre objet, permettant des fonctionnalités supplémentaires.

### 3. Patrons comportementaux
Les patrons comportementaux se concentrent sur l'interaction et la communication entre objets et classes.
1. **Observer** : définit une dépendance un-à-plusieurs entre objets, de sorte que lorsqu'un objet change d'état, tous les dépendants sont notifiés et mis à jour automatiquement.
2. **Strategy** : encapsule une famille d'algorithmes et les rend interchangeables, permettant à l'algorithme de varier indépendamment des clients.
3. **Command** : encapsule une requête sous forme d'objet, permettant la paramétrisation des clients et le support des opérations annulables.
4. **Template Method** : définit le squelette d'un algorithme dans une classe de base, permettant aux sous-classes de redéfinir certaines étapes sans changer la structure globale.
5. **Iterator** : fournit un moyen d'accéder séquentiellement aux éléments d'un objet agrégat sans exposer sa représentation interne.
6. **State** : permet à un objet de modifier son comportement lorsque son état interne change, en encapsulant les comportements spécifiques à chaque état dans des classes séparées.
7. **Chain of Responsibility** : permet à un objet de passer une requête le long d'une chaîne de gestionnaires potentiels jusqu'à ce que l'un d'eux la traite.
8. **Interpreter** : définit une représentation grammaticale et un interpréteur associé pour interpréter des phrases dans un langage dédié.
