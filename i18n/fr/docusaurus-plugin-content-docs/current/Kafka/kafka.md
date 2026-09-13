import TOCInline from '@theme/TOCInline';


# Kafka
# <TOCInline toc={toc} />

## Qu'est-ce qu'Apache Kafka ?
Apache Kafka est une **plateforme de streaming d'événements distribuée** utilisée pour **publier, stocker et traiter des flux d'enregistrements** (messages) en temps réel.
- Elle repose sur un modèle **publish/subscribe**, mais contrairement aux files de messages traditionnelles, elle **persiste les messages sur disque** et permet aux consommateurs de les relire, ce qui en fait à la fois un système de messagerie et un **journal d'événements durable**.
- Cas d'usage courants : découplage de microservices, pipelines d'analytique/streaming en temps réel, event sourcing, agrégation de logs, collecte de métriques.

## Quels sont les concepts de base de Kafka (Topic, Partition, Broker, Producer, Consumer) ?
- **Topic** : un flux/une catégorie nommée d'enregistrements (ex. `orders`, `payments`).
- **Partition** : un topic est divisé en une ou plusieurs partitions — chaque partition est un **journal ordonné, en ajout uniquement**. Le partitionnement est ce qui permet à Kafka de monter en charge horizontalement et de paralléliser la consommation.
- **Broker** : un serveur Kafka qui stocke des partitions et répond aux requêtes des producteurs/consommateurs. Un **cluster** est composé de plusieurs brokers.
- **Producer** : un client qui **publie** (écrit) des enregistrements dans un topic.
- **Consumer** : un client qui **s'abonne** à un topic et **lit** ses enregistrements.
- **Offset** : un identifiant unique et séquentiel d'un enregistrement au sein d'une partition — les consommateurs suivent leur position via l'offset.

## Comment Kafka garantit-il l'ordre des messages ?
Kafka ne garantit l'ordre **qu'au sein d'une même partition**, pas sur l'ensemble d'un topic.
- Les enregistrements ayant la **même clé** sont toujours routés vers la **même partition** (via le hash de la clé), ce qui préserve l'ordre par clé (ex. tous les événements d'un `orderId` donné sont traités dans l'ordre).
- Si un ordre global strict sur tous les messages est requis, le topic doit utiliser une **seule partition** — au prix de perdre le parallélisme qu'offrent plusieurs partitions.

## Qu'est-ce qu'un Consumer Group, et comment Kafka fait-il évoluer la consommation ?
Un **Consumer Group** est un ensemble de consommateurs qui coopèrent pour consommer un topic, identifié par un `group.id` partagé.
- Kafka assigne chaque partition du topic à **exactement un consommateur** du groupe à la fois — ainsi, un topic avec N partitions peut être consommé en parallèle par **jusqu'à N consommateurs** dans le même groupe (les consommateurs excédentaires restent inactifs).
- Différents consumer groups sont **indépendants** : chaque groupe reçoit sa propre copie de chaque message (c'est ainsi que Kafka supporte à la fois un comportement de file d'attente *et* de diffusion pub/sub).
- Si un consommateur du groupe tombe en panne, Kafka déclenche un **rebalancing**, réassignant ses partitions aux consommateurs restants.

## Comment Kafka assure-t-il la durabilité et la tolérance aux pannes (Réplication, Leader/Follower) ?
- Chaque partition a un **facteur de réplication** configurable — des copies de la partition (**réplicas**) sont stockées sur plusieurs brokers.
- Un réplica est le **leader**, gérant toutes les lectures/écritures de cette partition ; les autres sont des **followers** qui répliquent les données du leader.
- **In-Sync Replicas (ISR)** : les followers suffisamment à jour avec le leader. Si le broker leader tombe en panne, un nouveau leader est élu parmi l'ensemble ISR, ce qui maintient la disponibilité de la partition sans perte de données (tant que `acks`/la réplication sont correctement configurés).
- Kafka utilise **ZooKeeper** (anciennes versions) ou **KRaft** (versions récentes, sans ZooKeeper) pour gérer les métadonnées du cluster et l'élection du leader.

## Quelle est la différence entre `acks=0`, `acks=1` et `acks=all` sur un Producer ?
Ce paramètre contrôle le **compromis entre garantie de livraison et durabilité** des messages produits :
- **`acks=0`** : le producteur n'attend aucun accusé de réception — le plus rapide, mais les messages peuvent être **perdus** si le broker tombe en panne.
- **`acks=1`** : le producteur attend l'accusé de réception du **leader** — bon compromis, mais des données peuvent encore être perdues si le leader tombe en panne avant que les followers n'aient répliqué.
- **`acks=all`** (ou `-1`) : le producteur attend l'accusé de réception de **tous les réplicas synchronisés (ISR)** — garantie de durabilité la plus forte, au prix d'une latence plus élevée.

## Comment Kafka se compare-t-il à un broker de messages traditionnel (ex. RabbitMQ) ?
- **Rétention des messages** : Kafka **conserve les messages** pendant une durée configurable (ou indéfiniment) indépendamment de leur consommation, permettant à plusieurs consommateurs de relire l'historique ; RabbitMQ **supprime généralement un message une fois acquitté/consommé**.
- **Modèle** : Kafka est basé sur un journal (modèle pull — les consommateurs récupèrent les messages à leur rythme et suivent leur offset) ; RabbitMQ est un broker traditionnel (modèle push, avec routage via exchanges/queues, logique de routage plus riche comme fanout/topic/direct).
- **Débit vs. fonctionnalités** : Kafka est optimisé pour un **débit très élevé** en streaming et pour le rejeu ; RabbitMQ offre nativement un routage par message plus riche, des priorités et des garanties de livraison, mieux adapté aux scénarios de files de tâches complexes.
- **Ordre et scalabilité** : Kafka s'échelonne via les partitions et garantit l'ordre par partition ; les garanties d'ordre de RabbitMQ dépendent de la configuration des queues.

## Qu'est-ce que le patron Transactional Outbox, et pourquoi est-il utilisé avec Kafka ?
Il résout le **problème de la double écriture (dual-write)** : un service qui doit à la fois **mettre à jour sa base de données** et **publier un événement Kafka** pour ce changement ne peut pas faire les deux de façon atomique — s'il écrit en base puis plante (ou si Kafka est injoignable) avant de publier l'événement, l'événement est perdu et le système devient incohérent, alors même que le commit en base a réussi.
- **Fonctionnement** : au lieu de publier directement dans Kafka, le service écrit le changement métier **et** une ligne décrivant l'événement dans une **table outbox**, au sein de la **même transaction locale** en base — les deux réussissent ou échouent ensemble (atomique, une seule base de données).
- Un processus séparé lit ensuite la table outbox et **publie les événements vers Kafka**, selon l'une de ces deux approches :
  - **Polling publisher** : interroge périodiquement la table outbox pour les nouvelles lignes et les publie, en les marquant comme envoyées.
  - **Change Data Capture (CDC)**, ex. **Debezium** : suit le journal de transactions/write-ahead log de la base de données et diffuse automatiquement les nouvelles lignes outbox vers Kafka, sans polling — plus efficace et à latence plus faible.
- **Garantie** : cela offre une livraison **au moins une fois (at-least-once)** vers Kafka en cohérence avec le changement en base (l'étape de publication peut être rejouée sans risque en cas d'échec, puisque l'événement est stocké de façon durable dans l'outbox jusqu'à confirmation de la publication) — les consommateurs doivent donc être **idempotents** pour gérer d'éventuelles livraisons en double.