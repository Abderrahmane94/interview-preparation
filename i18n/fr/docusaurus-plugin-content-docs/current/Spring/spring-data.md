---
sidebar_position: 3
---
import TOCInline from '@theme/TOCInline';

# Spring Data
# <TOCInline toc={toc} />

## Qu'est-ce que Spring Data ?
Spring Data est un **sous-projet** du Spring Framework qui vise à simplifier l'**accès aux données** et la **persistance** dans les applications Java.

## Pouvez-vous expliquer ce qu'est JPA et en quoi il diffère de JDBC ?
- **JDBC** est une **API de bas niveau** qui fournit un ensemble de classes et d'interfaces pour se connecter aux bases de données relationnelles et exécuter des requêtes SQL.
- **JPA** est une **API de haut niveau** qui abstrait l'accès aux données et fournit un framework de mapping objet-relationnel (**ORM**).

## Pouvez-vous expliquer la gestion des transactions et son implémentation dans Spring ?
La gestion des transactions est un concept essentiel dans les systèmes de bases de données, où une transaction représente une unité de travail devant être exécutée de manière atomique (indivisible), cohérente (amenant la base d'un état valide à un autre) et isolée (non affectée par d'autres transactions concurrentes).

Dans le contexte de Spring, la gestion des transactions permet de gérer les transactions de base de données de manière déclarative, permettant aux développeurs de se concentrer sur la logique métier. Spring fournit diverses abstractions pour simplifier cette gestion.

Interfaces et concepts clés :

- **Transaction Manager** : l'interface **PlatformTransactionManager** est l'abstraction centrale. Elle définit les méthodes communes pour démarrer, valider et annuler les transactions. Spring supporte différents types de gestionnaires (JDBC, JTA, etc.).

- **Annotation @Transactional** : Spring offre l'annotation **@Transactional** pour marquer les méthodes ou classes devant s'exécuter dans un contexte transactionnel. Spring gère automatiquement le début, la validation et l'annulation de la transaction.

## Pouvez-vous expliquer les différents types de fetch JPA ?

### 1. Chargement hâtif (Eager Fetching)
- Charge les entités associées immédiatement avec l'entité propriétaire.
- Peut charger une grande quantité de données s'il y a plusieurs associations.
- Se spécifie avec `@ManyToOne`, `@OneToOne` ou `@OneToMany` et `fetch = FetchType.EAGER`.

### 2. Chargement paresseux (Lazy Fetching)
- Diffère le chargement des entités associées jusqu'à ce qu'elles soient explicitement accédées.
- Améliore les performances en évitant des requêtes inutiles.
- Se spécifie avec `fetch = FetchType.LAZY`. C'est le type par défaut pour la plupart des associations JPA.

### 3. Chargement extra-paresseux (spécifique Hibernate)
- Extension Hibernate avec des optimisations supplémentaires pour les collections.
- Se spécifie avec `fetch = FetchType.EXTRA_LAZY`.

### 4. Chargement par lot — Batch Fetching (spécifique Hibernate)
- Récupère plusieurs entités ou associations par lots avec un nombre limité de requêtes.
- Réduit significativement les aller-retours vers la base de données.
- Configurable avec `@BatchSize`.

## Pouvez-vous expliquer les différentes stratégies d'héritage JPA ?
- Héritage sur table unique (Single Table Inheritance) — défaut
- Héritage sur tables jointes (Joined Table Inheritance)
- Héritage par classe (Table Per Class Inheritance)
- Superclasse mappée (Mapped Superclass Inheritance)

## Expliquez le chargement paresseux utilisé par JPA
Le chargement paresseux signifie que les entités associées sont chargées uniquement lorsqu'elles sont explicitement accédées ou demandées par l'application.

## 3 façons courantes de récupérer des données avec Hibernate

1. Avec le **Hibernate Query Language** (**HQL**) :
HQL est un langage de requête orienté objet similaire à SQL. Il permet d'écrire des requêtes en utilisant les classes d'entités et leurs propriétés.

   ```java
   String hql = "FROM VotreClasseEntite";
   Query<VotreClasseEntite> query = session.createQuery(hql, VotreClasseEntite.class);
   List<VotreClasseEntite> entities = query.getResultList();
   ```

2. Avec l'**API Criteria** :
   Approche type-safe et programmatique pour construire des requêtes dynamiquement.

   ```java
   CriteriaBuilder cb = session.getCriteriaBuilder();
   CriteriaQuery<VotreClasseEntite> cq = cb.createQuery(VotreClasseEntite.class);
   Root<VotreClasseEntite> root = cq.from(VotreClasseEntite.class);
   cq.select(root);
   List<VotreClasseEntite> entities = session.createQuery(cq).getResultList();
   ```

3. Avec les **requêtes SQL natives** :
   Pour les requêtes complexes difficiles à exprimer en HQL ou via l'API Criteria.

   ```java
   String sql = "SELECT * FROM votre_table";
   Query<VotreClasseEntite> query = session.createNativeQuery(sql, VotreClasseEntite.class);
   List<VotreClasseEntite> entities = query.getResultList();
   ```

## Qu'est-ce que Criteria ?
Dans le contexte d'Hibernate, un criteria est un **ensemble de conditions** utilisé pour construire une requête dynamiquement. L'API Criteria fournit une façon programmatique de **construire des requêtes** sans écrire de SQL brut, via une interface type-safe et fluide.

Concepts clés :

1. **CriteriaBuilder** : usine pour créer les objets liés aux requêtes (prédicats, expressions de tri, etc.).

2. **CriteriaQuery** : représente la structure globale d'une requête (sélection, jointures, tris, groupements).

3. **Root** : représente l'entité racine — point de départ pour naviguer dans les associations.

4. **Predicate** : représente une condition pour filtrer les résultats.

5. **Order** : représente l'ordre de tri (ascendant ou descendant).

```java
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<VotreClasseEntite> cq = cb.createQuery(VotreClasseEntite.class);
Root<VotreClasseEntite> root = cq.from(VotreClasseEntite.class);

Predicate condition = cb.equal(root.get("nomPropriete"), valeur);
cq.where(condition);

List<VotreClasseEntite> entities = session.createQuery(cq).getResultList();
```
