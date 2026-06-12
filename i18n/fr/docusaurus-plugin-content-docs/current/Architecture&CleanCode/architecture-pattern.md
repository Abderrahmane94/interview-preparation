---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Patrons d'Architecture
# <TOCInline toc={toc} />


## Quelle est la différence entre un patron d'architecture et un patron de conception ?
- Un patron d'architecture définit la **structure** et l'**organisation** globale d'un système logiciel. Il fournit des **lignes directrices** et des **principes** de haut niveau pour concevoir les **composants** du système, leurs **relations** et le flux des données ou du contrôle entre eux.
  - Exemples : Model-View-Controller (MVC), Microservices, Architecture en couches, Architecture pilotée par les événements.
- Un patron de conception représente une façon de structurer les classes pour résoudre des problèmes récurrents.

## Pouvez-vous expliquer le patron Model-View-Controller (MVC) ?
Le **Modèle** représente les données et la logique métier, la **Vue** représente la couche de présentation, le **Contrôleur** agit comme intermédiaire entre le Modèle et la Vue.
