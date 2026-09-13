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

## Qu'est-ce que le CQRS (Command Query Responsibility Segregation) ?
Le CQRS est un patron d'architecture qui **sépare le modèle utilisé pour écrire les données (Commandes) du modèle utilisé pour les lire (Requêtes)**.
- Les **Commandes** modifient l'état et ne retournent pas de données (ex. `CreateOrder`, `UpdateStock`).
- Les **Requêtes** retournent des données et ne modifient jamais l'état (ex. `GetOrderById`).
- Le côté écriture et le côté lecture peuvent utiliser **des modèles différents, voire des bases de données différentes**, optimisés indépendamment (le côté écriture normalisé pour la cohérence, le côté lecture dénormalisé pour des requêtes rapides).

## Quel problème le CQRS résout-il, et quels sont ses compromis ?
- **Problème résolu** : dans les domaines complexes, un modèle unique servant à la fois la lecture et l'écriture devient difficile à maintenir et à faire évoluer — lecture et écriture ont souvent des besoins de performance et de forme très différents (ex. un tableau de bord a besoin de vues agrégées dénormalisées, alors que l'écriture exige une validation stricte et de la cohérence).
- **Avantages** :
  - **Mise à l'échelle indépendante** des charges de lecture et d'écriture.
  - Les modèles de lecture peuvent être **dénormalisés/adaptés** à chaque cas d'usage (requêtes plus rapides, code UI simplifié).
  - Séparation claire des responsabilités, logique métier plus facile à raisonner côté écriture.
- **Inconvénients** :
  - **Complexité accrue** (deux modèles, parfois deux sources de données à synchroniser).
  - **Cohérence à terme (eventual consistency)** : le modèle de lecture peut être en retard sur le modèle d'écriture pendant un court instant.
  - Non nécessaire pour des applications CRUD simples — pertinent surtout pour des domaines complexes ou à fort volume.

## Quel est le lien entre CQRS et Event Sourcing ?
CQRS et Event Sourcing sont des patrons **complémentaires mais indépendants** — le CQRS peut être utilisé sans Event Sourcing.
- L'**Event Sourcing** persiste l'état sous forme d'une séquence ordonnée d'**événements métier** plutôt que l'état courant seul.
- Combiné avec le CQRS, le **côté écriture** ajoute des événements dans un event store (source de vérité), et le **côté lecture** est construit en **projetant** ces événements dans un ou plusieurs modèles de lecture dénormalisés optimisés pour l'interrogation.
- Cette combinaison offre une traçabilité complète (chaque changement d'état est un événement) mais augmente la complexité et nécessite de gérer la cohérence à terme entre l'event store et les projections.

## Qu'est-ce que le patron Saga et quel problème résout-il ?
Le patron Saga gère la **cohérence des données à travers plusieurs services** dans un système distribué, en remplaçant une transaction ACID unique (impossible entre plusieurs services dans une architecture microservices) par une **séquence de transactions locales**.
- Chaque service exécute sa propre transaction locale puis publie un événement/message pour déclencher l'étape suivante.
- Si une étape échoue, la saga exécute des **transactions compensatoires** pour annuler le travail déjà effectué par les étapes précédentes (car on ne peut pas simplement faire un rollback d'une transaction distribuée).
- Exemple : une saga de commande = réserver le stock → débiter le paiement → expédier la commande. Si le paiement échoue, une action compensatoire libère le stock réservé.

## Quelles sont les deux principales façons de coordonner une Saga (Chorégraphie vs Orchestration) ?
- **Chorégraphie** : chaque service écoute des événements et publie ses propres événements en réaction — il n'y a pas de coordinateur central.
  - Avantages : faible couplage, simple pour un petit nombre d'étapes.
  - Inconvénients : difficile à suivre/déboguer dans son ensemble, risque de dépendances cycliques quand la saga grandit.
- **Orchestration** : un **orchestrateur** central (saga manager) indique à chaque service quelle transaction locale exécuter et gère les échecs/compensations.
  - Avantages : logique de flux centralisée et explicite — plus facile à comprendre, surveiller et modifier.
  - Inconvénients : introduit un coordinateur qui peut devenir un goulot d'étranglement ou un point unique de défaillance s'il n'est pas conçu avec soin.

## Quel est le lien entre le patron Saga et la cohérence à terme (eventual consistency) ?
Comme une saga est une séquence de transactions locales indépendantes plutôt qu'une transaction atomique unique, le système est seulement **cohérent à terme** — il existe une fenêtre où certains services ont déjà été mis à jour et d'autres non. Les transactions compensatoires gèrent les cas d'échec, mais le code applicatif (et les utilisateurs) doivent tolérer une incohérence temporaire, contrairement aux transactions ACID traditionnelles.

## Quels sont les principaux patrons de conception utilisés dans une architecture microservices ?
Les microservices introduisent des problèmes de systèmes distribués (appels réseau, pannes partielles, données réparties entre services) qui nécessitent des patrons dédiés :
- **Décomposition** : Décomposer par capacité métier / sous-domaine (DDD), **Database per Service**, **Strangler Fig** (migrer un monolithe progressivement).
- **Communication** : **API Gateway**, **Service Discovery**, **Backend for Frontend (BFF)**.
- **Données et cohérence** : **Saga**, **CQRS**, **Event Sourcing**, Transactional Outbox.
- **Résilience** : **Circuit Breaker**, Retry, Bulkhead, Timeout.
- **Observabilité** : Agrégation de logs, Traçage distribué, API de Health Check.

## Qu'est-ce que le patron API Gateway ?
Une API Gateway est un **point d'entrée unique** placé devant les microservices qui route les requêtes des clients vers le(s) service(s) backend approprié(s).
- Gère les préoccupations transverses une seule fois au lieu de les dupliquer dans chaque service : **routage, authentification, limitation de débit (rate limiting), agrégation de requêtes, transformation de réponses, terminaison SSL**.
- Peut aussi implémenter la variante **Backend for Frontend (BFF)** : une gateway dédiée par type de client (web, mobile) n'exposant que les données/la forme dont ce client a besoin.
- Compromis : c'est un saut réseau supplémentaire et, si elle n'est pas rendue hautement disponible, elle peut devenir un **point unique de défaillance/goulot d'étranglement**.

## Qu'est-ce que le patron Circuit Breaker ?
Un Circuit Breaker empêche un service d'appeler de façon répétée un **service en aval qui échoue ou qui est lent**, évitant ainsi des pannes en cascade dans le système.
- Il encapsule les appels vers le service distant et suit les échecs. États :
  - **Fermé (Closed)** : les appels passent normalement.
  - **Ouvert (Open)** : après trop d'échecs, les appels échouent immédiatement (sans appel réseau) pendant une période de repos.
  - **Semi-ouvert (Half-Open)** : après le temps de repos, quelques appels d'essai sont autorisés pour vérifier si la dépendance s'est rétablie — le circuit se referme s'ils réussissent, se rouvre s'ils échouent.
- Souvent associé à une **logique de repli (fallback)** (retourner des données en cache/par défaut) et utilisé avec les patrons Retry et Timeout. Implémentations courantes : Resilience4j, Hystrix (ancien).

## Qu'est-ce que le patron Service Discovery ?
Comme les instances de service dans une architecture microservices sont **dynamiques** (auto-scaling, redémarrages, IP changeantes), les clients ne peuvent pas coder en dur les adresses — Service Discovery résout le problème de trouver une instance active à appeler.
- **Découverte côté client** : le client interroge directement un **registre de services** (ex. Eureka, Consul) et choisit lui-même une instance (souvent avec équilibrage de charge).
- **Découverte côté serveur** : le client appelle un **équilibreur de charge/routeur** (ex. un LB cloud, un Service Kubernetes) qui interroge le registre et transmet la requête — le client reste simple.
- Les instances de service **s'enregistrent/se désenregistrent** elles-mêmes (ou sont enregistrées par un orchestrateur) auprès du registre, généralement en s'appuyant sur des health checks.

## Qu'est-ce que le patron Database per Service, et quel défi crée-t-il ?
Chaque microservice possède et gère **sa propre base de données privée**, accessible uniquement via l'API de ce service — aucun autre service ne peut y accéder directement.
- Avantages : fort **découplage** (les changements de schéma ne cassent pas les autres services), chaque service peut choisir le type de stockage le plus adapté à ses besoins (persistance polyglotte), mise à l'échelle indépendante.
- Défi : les transactions métier qui étaient auparavant une seule transaction ACID sur des tables **s'étendent désormais sur plusieurs services/bases de données** — c'est précisément pourquoi le patron **Saga** (et des patrons comme CQRS/Event Sourcing/Transactional Outbox) existent, pour gérer la cohérence sans transactions distribuées.

## Qu'est-ce que le patron Strangler Fig ?
Une stratégie pour **migrer progressivement un monolithe legacy vers des microservices** sans une réécriture complète risquée (« big bang »).
- Les nouvelles fonctionnalités (ou des parties refactorisées de fonctionnalités existantes) sont construites en tant que nouveaux microservices, tandis qu'une **façade/routeur** (souvent une API Gateway) intercepte les appels et les redirige soit vers le nouveau service, soit vers le monolithe encore existant.
- Au fil du temps, de plus en plus de responsabilités migrent vers les nouveaux services et le monolithe se réduit (il est « étranglé ») jusqu'à pouvoir être retiré — à chaque étape de la migration, le système reste pleinement fonctionnel et livrable.
