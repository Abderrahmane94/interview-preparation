---
sidebar_position: 6
---
import TOCInline from '@theme/TOCInline';

# Spring Test
# <TOCInline toc={toc} />

## Pattern Given-When-Then
Pattern pour l'**écriture de cas de test**. Il fournit un format clair et structuré pour définir le contexte, les actions et les résultats attendus d'un test.

## Pattern Arrange-Act-Assert (AAA)
Pattern Arrange-Act-Assert, **structure** pour organiser les **tests unitaires**.

## Qu'est-ce qu'un test d'intégration ?
Niveau de test logiciel qui se concentre sur la **vérification** des **interactions** et de la communication entre différents composants, modules ou systèmes au sein d'une application.

## Qu'est-ce qu'un test unitaire ?
Un test unitaire est un **type de test** où des **unités individuelles**, telles que des fonctions, méthodes ou classes, sont testées en isolation pour vérifier leur comportement.

## Qu'est-ce que JUnit et comment fonctionne-t-il ?
JUnit est un **framework de test Java** qui permet aux développeurs d'écrire et d'exécuter des tests automatisés. Pour écrire un cas de test JUnit, vous étendez la classe **TestCase** de JUnit et définissez une ou plusieurs **méthodes de test**.

## Quelles sont les assertions couramment utilisées dans JUnit ?
Les assertions JUnit courantes incluent **assertTrue()**, **assertFalse()**, **assertEquals()** et **assertNull()**.

## Qu'est-ce que Mockito et en quoi diffère-t-il de JUnit ?
Mockito est un **framework de mock Java** qui crée des **objets mock** pour les tests. Il est utilisé avec JUnit pour isoler des parties spécifiques du code lors des tests.

## Pouvez-vous donner un exemple d'utilisation conjointe de JUnit et Mockito ?
JUnit et Mockito peuvent être utilisés ensemble pour écrire des cas de test JUnit utilisant des objets mock créés avec Mockito pour tester le comportement d'une classe ou méthode.

## Comment gérez-vous les exceptions dans les cas de test JUnit ?
- Avec try-catch.
- Avec une règle JUnit.
- Avec une annotation.

## Quelles sont les nouveautés de JUnit 5 ?

1. **Nouveaux modèles de programmation** :
    - JUnit 5 introduit de nouvelles annotations : `@Test`, `@BeforeEach`, `@AfterEach`, `@BeforeAll` et `@AfterAll`. Elles offrent plus de flexibilité et de contrôle.
    - Les méthodes de test n'ont plus besoin d'être `public void` ; elles peuvent avoir différents modificateurs d'accès, types de retour et accepter des paramètres.

2. **Modèle d'extension** :
    - JUnit 5 introduit un modèle d'extension puissant permettant d'étendre le comportement des classes ou méthodes de test.
    - Les extensions permettent de personnaliser l'exécution des tests, d'ajouter des callbacks de cycle de vie, de l'injection de paramètres, la génération de tests dynamiques, etc.
    - Les extensions peuvent utiliser l'API `Extension` ou les extensions prédéfinies : `@ExtendWith`, `@BeforeEachCallback`, `@AfterEachCallback`, etc.

3. **Tests dynamiques** :
    - JUnit 5 introduit les tests dynamiques, permettant de générer des tests par programmation à l'exécution.
    - Créés avec l'annotation `@TestFactory` en retournant un `Stream`, `Iterable`, `Iterator` ou `Collection<DynamicTest>`.

4. **Tests paramétrés** :
    - JUnit 5 améliore les tests paramétrés avec l'annotation `@ParameterizedTest`.
    - Les paramètres peuvent être fournis depuis des arguments de méthode, des fichiers CSV, des valeurs d'Enum, des fournisseurs personnalisés, etc.

5. **Exécution conditionnelle** :
    - JUnit 5 fournit l'exécution conditionnelle via `@EnabledOnXXX` et `@DisabledOnXXX`.
    - Les conditions peuvent être basées sur le système d'exploitation, la version Java, les propriétés système, les variables d'environnement, etc.

6. **Tests imbriqués** :
    - JUnit 5 supporte les classes de test imbriquées, permettant de regrouper des tests liés et d'améliorer l'organisation.
    - Les tests imbriqués peuvent avoir leur propre cycle de vie et partager des méthodes de configuration/nettoyage.

7. **Cycle de vie de l'instance de test** :
    - JUnit 5 introduit deux options : `PER_CLASS` (une seule instance pour la classe) et `PER_METHOD` (nouvelle instance par méthode de test).

8. **Assertions supplémentaires** :
    - JUnit 5 fournit des méthodes d'assertion supplémentaires : `assertAll()`, `assertThrows()`, `assertTimeout()`, `assertTimeoutPreemptively()`, etc.
