import TOCInline from '@theme/TOCInline';

# Services Web
# <TOCInline toc={toc} />

## REST vs SOAP
Deux types différents d'**architectures de services web** utilisés pour transmettre des données entre applications :
- **SOAP** est une architecture plus rigide et complexe utilisant des messages basés sur XML.
- **REST** est une architecture légère et flexible utilisant des requêtes/réponses HTTP standard pour échanger des données en divers formats.

## Qu'est-ce qu'une API idempotente ?
Une méthode HTTP idempotente est une méthode qui peut être invoquée plusieurs fois **sans** résultats différents. **POST** est la seule méthode **non idempotente**.

## Comment communiquer entre microservices Java ?
- (HTTP)/REST — Communication synchrone.
- Messagerie — Communication asynchrone.

## Qu'est-ce que RabbitMQ ?
RabbitMQ est un logiciel de **courtier de messages** (message broker) open-source qui permet la communication et la coordination entre systèmes distribués. Il implémente le protocole Advanced Message Queuing Protocol (**AMQP**) et fournit une plateforme de messagerie fiable, évolutive et flexible.

Concepts et fonctionnalités clés de RabbitMQ :

1. **Message Broker** : RabbitMQ agit comme intermédiaire entre les producteurs et les consommateurs de messages. Les producteurs envoient des messages à RabbitMQ, qui les stocke jusqu'à leur consommation.

2. **Files de messages (Queues)** : RabbitMQ utilise des files pour stocker les messages. Une file est un tampon nommé qui contient les messages jusqu'à leur traitement par les consommateurs.

3. **Exchange** : responsable de recevoir les messages des producteurs et de les router vers les files appropriées. RabbitMQ supporte différents types d'exchange : direct, topic, fanout et headers.

4. **Binding** : définit la relation entre les exchanges et les files. Spécifie les règles de routing déterminant comment les messages sont acheminés d'un exchange vers une ou plusieurs files.

5. **Clés de routage (Routing Keys)** : utilisées par les exchanges pour déterminer quelles files doivent recevoir des messages spécifiques.

6. **Accusé de réception (Message Acknowledgement)** : RabbitMQ supporte les accusés de réception pour garantir une livraison fiable. Les consommateurs peuvent accuser réception explicitement d'un message traité avec succès.

7. **Tolérance aux pannes et haute disponibilité** : RabbitMQ supporte le clustering, permettant à plusieurs nœuds de former un cluster. Cela garantit que les messages ne sont pas perdus même si certains nœuds tombent en panne.

8. **Plugins et extensibilité** : RabbitMQ fournit un système de plugins pour étendre ses fonctionnalités (transformation de messages, authentification, autorisation, intégrations).

RabbitMQ est largement utilisé dans les systèmes distribués et les architectures microservices pour la communication asynchrone, l'équilibrage de charge et la scalabilité.

## Quelle est la différence entre PUT et PATCH ?
- **PUT** est utilisé pour remplacer complètement une ressource existante ou en créer une nouvelle à l'URI spécifiée.
- **PATCH** est utilisé pour **mettre à jour partiellement** une ressource existante.

## Monolithique vs Microservices
- **Monolithique** : une seule application déployée comme une unité.
- **Microservices** : les applications sont décomposées en services plus petits et indépendants qui peuvent être développés, déployés et maintenus séparément.

## Comment définir une bonne API ?
## Comment concevoir une API RESTful ?
## Qu'est-ce que le contrat API first ? Utilisez-vous Swagger first ou Code first ?
- **Swagger First** consiste à écrire d'abord la spécification API, puis à générer le code d'implémentation basé sur cette spécification.
- **Code First** consiste à écrire d'abord le code d'implémentation, puis à générer la spécification API basée sur ce code.

## Quelles sont les méthodes HTTP les plus courantes dans les API REST ?
REST (Representational State Transfer) est un style architectural pour la conception d'applications en réseau. Les méthodes HTTP les plus couramment utilisées sont :

1. **GET** : récupère une représentation d'une ressource. Opération sûre et idempotente, sans effets secondaires sur le serveur.

2. **POST** : soumet des données à traiter par le serveur. Généralement utilisé pour créer de nouvelles ressources ou déclencher des actions provoquant un changement d'état.

3. **PUT** : met à jour ou remplace une ressource existante avec une nouvelle représentation. Nécessite l'envoi de la représentation complète de la ressource.

4. **PATCH** : met à jour partiellement une ressource existante. Contrairement à PUT, permet d'envoyer uniquement les changements à appliquer.

5. **DELETE** : supprime une ressource spécifiée. Après suppression, le serveur peut répondre avec un code 204 No Content ou 200 OK.

6. **HEAD** : similaire à GET mais récupère uniquement les en-têtes sans le corps de la réponse. Utile pour obtenir des métadonnées sans transférer tout le contenu.

7. **OPTIONS** : récupère les méthodes, en-têtes et autres capacités supportées par une ressource. Utile pour déterminer les actions disponibles.

8. **TRACE** : principalement utilisé à des fins de diagnostic. Le serveur renvoie la requête reçue au client.

## Quels sont les codes de statut HTTP ?
100 (Information), 200 (Succès), 300 (Redirection), 400 (Erreur client) et 500 (Erreur serveur).

## Qu'est-ce que l'architecture microservices et ses composants clés ?
- Les applications sont décomposées en services plus petits et indépendants pouvant être développés, déployés et maintenus séparément.
- Composants clés : Registre de services, API Gateway, Serveur de configuration, Équilibreur de charge, Surveillance et Journalisation.

## Comment gérer les transactions distribuées entre plusieurs microservices ?
- Il est important d'utiliser le **pattern Saga**.
- Le pattern Saga est un patron de conception pour gérer les transactions longues durée à travers plusieurs microservices.

## Qu'est-ce que SOAP et comment l'implémenter ?
SOAP (Simple Object Access Protocol) est un protocole de messagerie utilisé dans les services web pour faciliter la communication entre différents systèmes. Il est basé sur XML et s'appuie généralement sur HTTP pour le transport.

Pour implémenter SOAP :

1. **Définir le service web** : déterminez la fonctionnalité et les opérations que votre service web fournira.

2. **Définir la structure du message SOAP** : les messages SOAP sont basés sur XML et comprennent une enveloppe, un en-tête et un corps.

3. **Concevoir le WSDL** : WSDL (Web Services Description Language) décrit le service web et ses opérations. Il spécifie les méthodes, paramètres d'entrée/sortie et l'URL d'accès.

4. **Implémenter le service web** : développez l'implémentation réelle qui traite les opérations demandées et génère les réponses SOAP appropriées.

5. **Déployer le service web** : hébergez le service sur un serveur supportant la communication SOAP.

6. **Générer le code client** : les clients consomment le service en générant du code client basé sur le document WSDL.

7. **Interagir avec le service** : les clients utilisent le code généré pour invoquer les méthodes du service et envoyer des requêtes SOAP via HTTP.

8. **Gérer les réponses SOAP** : le service traite les requêtes, exécute les opérations et génère des réponses SOAP envoyées au client.

SOAP fournit un moyen standardisé d'implémenter et de consommer des services web. Cependant, des alternatives plus légères comme REST ont gagné en popularité grâce à leur simplicité et meilleure compatibilité avec les pratiques modernes de développement web.
