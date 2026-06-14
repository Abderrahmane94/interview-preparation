---
sidebar_position: 7
---
import TOCInline from '@theme/TOCInline';

# Java Enterprise Edition
# <TOCInline toc={toc} />

## Qu'est-ce qu'un EJB ?
**EJB (Enterprise JavaBeans)** est une architecture de composants côté serveur pour créer des applications d'entreprise Java scalables, transactionnelles et sécurisées. Les EJBs s'exécutent dans un **conteneur EJB** (fourni par un serveur d'application Jakarta EE comme WildFly ou GlassFish), qui gère automatiquement leur cycle de vie, les transactions, la sécurité et la concurrence.

Il existe trois types d'EJBs :
- **Session Beans** — implémentent la logique métier. Peuvent être *Stateless* (pas d'état client entre les appels), *Stateful* (maintiennent un état conversationnel) ou *Singleton* (une instance partagée).
- **Message-Driven Beans (MDB)** — consomment des messages asynchrones depuis une file ou un topic JMS.
- **Entity Beans** — (dépréciés depuis EJB 3.0, remplacés par les entités JPA).

```java
@Stateless
public class OrderService {
    @PersistenceContext
    private EntityManager em;

    public void placeOrder(Order order) {
        em.persist(order); // transaction gérée par le conteneur
    }
}
```

> Dans le développement Java moderne, Spring Boot a largement remplacé les EJBs pour la plupart des cas d'usage, grâce à une configuration plus simple et des exigences d'exécution allégées. Les EJBs restent pertinents dans les grands environnements Jakarta EE d'entreprise.

## Quels sont les différents types d'EJB ?
Il existe trois types d'EJB dans JEE :
- **Session Beans** : représentent la logique métier. Classifiés en beans de session stateful et stateless.
- **Entity Beans** (dépréciés depuis EJB 3.0) : représentent les données persistantes stockées en base de données.
- **Message-Driven Beans** : utilisés pour traiter des messages asynchrones dans un système de messagerie.

## Quel est le rôle d'un session bean ?
Les session beans encapsulent la logique métier d'une application. Ils fournissent des services aux clients : exécuter des méthodes métier, gérer des transactions, et maintenir un état conversationnel (pour les beans stateful).

## Quelle est la différence entre les beans de session stateful et stateless ?
Les **beans de session stateful** maintiennent un état conversationnel avec les clients à travers plusieurs invocations de méthodes. Chaque client est associé à une instance spécifique du bean stateful.
En revanche, les **beans de session stateless** ne maintiennent aucun état conversationnel. Ils sont sans état et peuvent servir plusieurs clients simultanément.

## Quel est le rôle d'un entity bean ?
Les **entity beans** (dépréciés dans EJB 3.0) représentent des données persistantes stockées en base de données. Ils fournissent une vue orientée objet des données et encapsulent les opérations CRUD (création, lecture, mise à jour, suppression).

## Qu'est-ce qu'un Message-Driven Bean (MDB) ?
Les **Message-Driven Beans** traitent des messages asynchrones dans un système JMS (Java Message Service). Ils agissent comme des consommateurs de messages et sont déclenchés lorsqu'un message arrive à une destination spécifiée.

## Quel est le rôle du conteneur EJB ?
Le conteneur EJB fournit un environnement d'exécution pour les composants EJB. Il gère leur cycle de vie, les transactions, la sécurité, la concurrence et d'autres services. Il est responsable de l'instanciation, du pooling et de la gestion des instances EJB, ainsi que de la communication entre clients et composants EJB.

## Quels sont les différents attributs de transaction dans EJB ?
EJB supporte différents attributs de transaction :
- **Required** : la méthode doit s'exécuter dans une transaction. Si une transaction existe déjà, elle la rejoint ; sinon, une nouvelle est démarrée.
- **RequiresNew** : la méthode doit s'exécuter dans une nouvelle transaction. Si une transaction existe, elle est suspendue.
- **Mandatory** : la méthode doit s'exécuter dans une transaction. Si aucune n'existe, une exception est levée.

## Comment fonctionne l'injection de dépendances dans EJB ?
L'**injection de dépendances** dans EJB permet au conteneur d'injecter les ressources et dépendances nécessaires dans un EJB (sources de données, session beans, autres EJBs). Cela réduit le couplage. Les EJBs utilisent des annotations comme `@EJB` ou `@Resource` pour déclarer et injecter des dépendances.

## Comment gérer les exceptions dans EJB ?
Dans EJB, vous pouvez gérer les exceptions via le **mécanisme Java standard**. Les EJBs peuvent lancer des exceptions applicatives ou des exceptions système comme **javax.ejb.EJBException**. Vous pouvez les intercepter dans les méthodes EJB ou les laisser se propager au client appelant.

## Quel est le rôle de l'annotation `@Stateless` dans EJB ?
L'annotation `@Stateless` déclare un session bean comme stateless dans EJB. Stateless signifie que le bean ne maintient aucun état conversationnel avec les clients entre les invocations. Chaque appel de méthode est indépendant des précédents.

## Quel est le rôle de l'annotation `@TransactionAttribute` dans EJB ?
L'annotation `@TransactionAttribute` spécifie l'attribut de transaction pour une méthode EJB, définissant comment la méthode doit participer aux transactions. Par exemple : `TransactionAttributeType.REQUIRED` ou `TransactionAttributeType.NOT_SUPPORTED`.

## Comment implémenter le traitement asynchrone dans EJB ?
Le traitement asynchrone peut être implémenté via des Message-Driven Beans (MDB). En annotant une classe MDB avec `@MessageDriven`, vous définissez le listener de messages et spécifiez la destination depuis laquelle les messages doivent être consommés.

## Quel est le rôle de l'annotation `@Singleton` dans EJB ?
L'annotation `@Singleton` déclare un session bean comme singleton dans EJB. Les beans singleton sont conçus pour avoir une seule instance partagée par plusieurs clients. Ils sont couramment utilisés pour gérer des ressources à l'échelle de l'application ou maintenir un état global.

## Comment passer des données entre EJBs ?
Les données peuvent être passées entre EJBs via les paramètres et valeurs de retour des méthodes. Vous pouvez définir des signatures de méthode dans les interfaces EJB. De plus, les EJBs peuvent utiliser l'injection de dépendances (`@EJB`) pour obtenir des références à d'autres EJBs.

## Pouvez-vous expliquer le cycle de vie d'un bean de session stateful ?
Le cycle de vie d'un bean de session stateful comprend :

1. **Création** : le conteneur crée une instance du bean stateful à la demande d'un client.
2. **Invocation de méthode** : le client interagit avec le bean en invoquant ses méthodes.
3. **Passivation** : si le bean n'est pas activement utilisé, le conteneur peut le passiver (sérialiser) pour libérer des ressources mémoire.
4. **Activation** : lorsque le client doit accéder à nouveau au bean, le conteneur l'active (désérialise).
5. **Suppression** : le client ou le conteneur peut supprimer le bean, détruisant son instance et libérant les ressources associées.

## Comment gérer la concurrence dans EJB ?
EJB fournit des mécanismes intégrés pour gérer la concurrence. Par défaut, les beans stateless et les MDB sont conçus pour être concurrents. Pour les beans stateful, vous pouvez configurer la concurrence avec `@ConcurrencyManagement` et `@Lock` pour spécifier les stratégies de verrouillage.

## MVC dans JEE
MVC (Model-Vue-Contrôleur) est un patron architectural couramment utilisé dans les applications JEE pour séparer les préoccupations et améliorer la maintenabilité :

- **Modèle** : représente les données et la logique métier de l'application. Peut être implémenté avec des EJBs, des classes entités ou d'autres mécanismes d'accès aux données.

- **Vue** : représente la couche de présentation. Responsable du rendu de l'interface utilisateur. Peut être implémentée avec JavaServer Faces (JSF), JSP ou des templates HTML/CSS.

- **Contrôleur** : intermédiaire entre le Modèle et la Vue. Reçoit les entrées utilisateur, invoque les méthodes appropriées sur le Modèle et détermine quelle Vue afficher. Peut être implémenté avec des servlets, des managed beans ou d'autres composants de gestion des requêtes.

## Conteneurs dans JEE

1. **Conteneur EJB** :
   Gère l'exécution des composants EJB. Fournit des services tels que la gestion des transactions, la sécurité, la concurrence et le pooling de ressources. Gère le cycle de vie des EJBs et assure la conformité à la spécification EJB.

2. **Conteneur Web** :
   Aussi connu sous le nom de conteneur de servlets, il gère l'exécution des composants web (servlets, JSP). Fournit des services pour le traitement des requêtes/réponses HTTP, la gestion des sessions, le mapping d'URL, la sécurité et la concurrence.

## JSF
JSF (JavaServer Faces) est un framework web basé sur les composants faisant partie de la plateforme JEE. Il simplifie le développement d'interfaces utilisateur pour les applications web.

1. **Architecture basée sur les composants** : l'interface utilisateur est construite avec des composants UI réutilisables définis de manière déclarative ou programmatique. JSF fournit un ensemble riche de composants intégrés (champs de saisie, boutons, tableaux, panneaux) et permet de créer des composants personnalisés.

2. **Modèle de programmation événementiel** : JSF utilise un modèle événementiel où les interactions utilisateur déclenchent des événements traités par le mécanisme JSF. Différents types d'événements sont supportés : action, changement de valeur, validation.

3. **Managed Bean** : JSF s'appuie sur des managed beans pour stocker et gérer les données et comportements de l'application. Un managed bean est un objet Java géré par le framework JSF, servant de pont entre les composants UI et la logique métier.

4. **Navigation et flux de pages** : JSF fournit des fonctionnalités pour gérer la navigation. Les développeurs définissent des règles de navigation spécifiant la page destination selon les actions ou événements.

5. **Intégration** : JSF s'intègre avec les autres technologies JEE : conteneurs Java EE, EJBs, CDI (Contexts and Dependency Injection) et JPA (Java Persistence API).
