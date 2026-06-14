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

| | Monolithique | Microservices |
|---|---|---|
| Structure | Unité de déploiement unique | Services indépendants déployés séparément |
| Déploiement | Tout déployer en même temps | Déployer chaque service indépendamment |
| Scalabilité | Scaler toute l'application | Scaler uniquement le service goulot d'étranglement |
| Stack technique | Un seul langage/framework | Chaque service peut utiliser le meilleur outil |
| Données | Une base de données partagée | Chaque service possède sa propre base de données |
| Isolation des pannes | Un bug peut tout faire planter | Une panne est contenue à un seul service |
| Complexité | Simple à démarrer | Complexité opérationnelle plus élevée (réseau, observabilité) |

**Quand utiliser le Monolithe** : petites équipes, produit en phase initiale, domaine simple, time-to-market rapide.

**Quand utiliser les Microservices** : grandes équipes, exigences de scalabilité élevées, cycles de release indépendants, domaine complexe avec des contextes bornés clairs.

> **Règle empirique** : Commencez par un monolithe bien structuré. Extrayez des services lorsque vous rencontrez des problèmes concrets — indépendance des équipes, goulots d'étranglement de scalabilité, ou conflits de déploiement.

## Comment définir une bonne API ?
Une bonne API est celle qui est **facile à utiliser correctement et difficile à utiliser de façon incorrecte**. Critères clés :

**1. Nommage clair et cohérent**
- Utiliser des noms pour les ressources, pas des verbes : `/commandes` pas `/getCommandes`.
- Utiliser le pluriel : `/utilisateurs/{id}`, `/produits`.
- Être cohérent dans la casse (kebab-case pour les URLs : `/lignes-commande`).

**2. Utilisation correcte des méthodes HTTP et codes de statut**
- `GET` → lire, `POST` → créer, `PUT/PATCH` → mettre à jour, `DELETE` → supprimer.
- Retourner `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` de façon appropriée.

**3. Versionnage**
- Inclure la version dans l'URL (`/api/v1/commandes`) ou dans l'en-tête pour éviter de casser les clients existants.

**4. Messages d'erreur significatifs**
```json
{
  "status": 400,
  "error": "VALIDATION_ERROR",
  "message": "Le champ 'email' est obligatoire",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**5. Pagination, filtrage, tri**
- `GET /produits?page=0&size=20&sort=prix,asc`

**6. Sécurité**
- Toujours utiliser HTTPS. S'authentifier avec JWT/OAuth2. Autoriser au niveau de la ressource.

**7. Documentation**
- Spécification OpenAPI/Swagger, avec des exemples pour chaque endpoint.

**8. Idempotence**
- `GET`, `PUT`, `DELETE` doivent être idempotents. `POST` ne l'est pas.

## Comment concevoir une API RESTful ?
Approche étape par étape :

**1. Identifier les ressources**
Mapper les noms du domaine en ressources : `Utilisateur`, `Commande`, `Produit`, `Paiement`.

**2. Définir les endpoints**
```
GET    /api/v1/commandes          → lister les commandes (avec pagination)
GET    /api/v1/commandes/{id}     → récupérer une commande
POST   /api/v1/commandes          → créer une commande
PUT    /api/v1/commandes/{id}     → mise à jour complète
PATCH  /api/v1/commandes/{id}     → mise à jour partielle
DELETE /api/v1/commandes/{id}     → annuler/supprimer une commande
```

**3. Concevoir les corps de requête/réponse (JSON)**
```json
// POST /api/v1/commandes — requête
{ "clientId": 42, "articles": [{ "produitId": 7, "qte": 2 }] }

// réponse 201 Created
{ "id": 101, "statut": "EN_ATTENTE", "total": 59.98, "creeLe": "2024-01-15T10:00:00Z" }
```

**4. Gérer les erreurs de façon cohérente**
Retourner des corps d'erreur structurés avec `status`, `error`, `message` et optionnellement `details`.

**5. Ajouter les préoccupations transversales**
- **Auth** : token JWT Bearer dans l'en-tête `Authorization`.
- **Versionnage** : préfixe `/api/v1/`.
- **Rate limiting** : retourner `429 Too Many Requests` lorsque dépassé.
- **CORS** : configurer pour les clients navigateurs.

**6. Documenter avec OpenAPI**
Utiliser les annotations `@Operation`, `@ApiResponse`, `@Schema` (SpringDoc) pour que l'UI Swagger soit générée automatiquement.

**7. Tester le contrat**
Écrire des tests d'intégration avec MockMvc/RestAssured qui valident les codes de statut et la structure de réponse — pas seulement les cas nominaux.

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
