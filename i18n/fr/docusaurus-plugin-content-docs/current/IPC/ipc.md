import TOCInline from '@theme/TOCInline';


# IPC — Préparation d'entretien personnelle
# <TOCInline toc={toc} />

> Notes de préparation d'entretien personnelles pour **Abderrahmane Sardaoui**, basées sur mon parcours réel (voir le CV à la racine du dépôt). Garder les réponses **cohérentes** entre elles et avec le CV — c'est tout l'intérêt de cette page. Les placeholders du type `[ ... ]` doivent être remplacés par les informations spécifiques à l'entreprise/au projet avant un vrai entretien.

## Présentez-vous
Bonjour, merci de me donner l'opportunité de me présenter.

Je m'appelle **Abderrahmane Sardaoui**. En dehors du travail, je suis marié et je pratique le **judo** — cela me garde discipliné, et honnêtement ça reflète bien ma façon de travailler : un effort constant, le respect du processus, et l'envie d'apprendre des personnes plus expérimentées autour de moi.

Sur le plan professionnel, je suis **développeur backend** avec **plus de 7 ans d'expérience**, principalement dans l'écosystème **Java / Spring**. Je suis titulaire d'un Master en Informatique de l'ESI (Algérie). J'ai travaillé dans différents domaines — l'énergie (Sonelgaz), la santé (CDTA, un système de dossier médical électronique), le CRM/consulting (Poliscrypts), le traitement intelligent de documents (IRIS IMS, filiale du groupe Canon), et actuellement les plateformes industrielles / pièces détachées chez **TVH Group**.

Sur l'ensemble de ces expériences, mon focus a toujours été le **développement backend** : conception d'APIs, modélisation des données, implémentation de la logique métier, en veillant à livrer du code fiable, testé et maintenable — avec Spring Boot, Spring Data/Security, Hibernate, PostgreSQL, Kafka, et des pratiques comme TDD/DDD/BDD.

## Parlez-moi de votre expérience actuelle
Je travaille actuellement comme **Software Developer chez TVH Group**, une entreprise mondiale basée en Belgique, spécialisée dans les pièces détachées et solutions numériques pour la manutention et l'équipement industriel, opérant des plateformes internationales à grande échelle.

**Ce que je fais pour l'équipe :**
- Concevoir, développer et améliorer des fonctionnalités applicatives alignées sur les besoins métier.
- Identifier et résoudre des anomalies critiques, en me concentrant sur la stabilité, la performance et la fiabilité du système.
- Participer aux revues de code et aux discussions techniques/architecturales — je tiens à ce que les décisions soient documentées et comprises par toute l'équipe, pas seulement décidées à deux dans un coin.
- Surveiller la performance du système et aider à résoudre les goulots d'étranglement.
- Écrire des tests BDD avec **Cucumber/Gherkin** afin que développeurs et parties prenantes métier partagent la même définition du « terminé » pour une fonctionnalité.
- Participer aux cérémonies Agile : sprint planning, backlog refinement, daily standups.

**Stack** : Java, Spring, Spring Boot, Spring Security, Spring Data, Apache Kafka, PostgreSQL, Helm, Terraform, Jenkins, Git/GitLab, Maven, Jira/Confluence — en suivant les pratiques TDD/DDD/BDD.

## Donnez-moi un exemple concret de votre travail quotidien
> **Astuce** : remplacez par le nom de la fonctionnalité réelle de votre sprint actuel avant l'entretien — gardez la structure, changez les détails.

Une tâche type ressemble à ceci :
1. **Prendre un ticket** lors du sprint planning/refinement — généralement une fonctionnalité métier liée aux flux de pièces détachées/inventaire.
2. **Clarifier le besoin** avec le product manager si les critères d'acceptation sont ambigus, puis écrire/affiner le **scénario Gherkin** correspondant.
3. **Implémenter** le changement dans un service Spring Boot — un endpoint API ou une logique interne, en persistant via Spring Data/PostgreSQL, et en publiant un **événement Kafka** si d'autres services doivent réagir.
4. **Tester** : tests unitaires pour la logique, scénario BDD pour le comportement, plus une vérification manuelle.
5. **Revue de code** : ouvrir une merge request, traiter les retours, et relire les MR de mes collègues le jour même.
6. **Déployer** via le pipeline CI/CD (Jenkins/GitLab) et surveiller ensuite les éventuelles régressions.

## Que recherchez-vous dans votre prochain poste ?
Je recherche spécifiquement une **mission longue et stable** — je veux rejoindre une équipe et voir réellement le produit évoluer sur plusieurs années plutôt que d'enchaîner des missions courtes. Je crée (et j'apporte) le plus de valeur quand je peux construire une vraie connaissance du code et du domaine dans la durée, plutôt que d'arriver pour quelques mois seulement.

## Pourquoi vous intéressez-vous au data product / data mesh ?
- C'est une évolution naturelle du travail backend que je fais déjà — traiter la donnée comme un produit avec une propriété claire, des contrats (schémas/APIs) et des garanties de qualité, plutôt que comme un simple effet de bord de la base de données d'un service.
- Mon expérience avec l'**intégration événementielle (Kafka)**, la conception de bases de données (PostgreSQL) et des frontières de service claires (DDD/microservices) correspond directement aux principes du data mesh : propriété orientée domaine, infrastructure de données en self-service, et traitement des pipelines de données avec la même rigueur d'ingénierie que le code applicatif.
- C'est une direction dans laquelle je veux continuer à grandir — la suite logique après « développeur backend » : quelqu'un qui pense aussi la donnée comme un produit, pas seulement comme une table de base de données derrière une API.

## Qu'est-ce qui vous motive spécifiquement dans cette opportunité ?
Honnêtement, deux choses : **le projet lui-même** — `[nom/domaine du projet]` — qui m'enthousiasme vraiment par ce qu'il cherche à résoudre, et **la localisation**, proche de chez moi. Cette combinaison compte beaucoup en ce moment : je recherche de la stabilité, et être proche de chez moi soutient cet engagement sur le long terme. Ce n'est pas une question de courir après une technologie précise — je peux apprendre n'importe quelle stack ; ce qui compte, c'est d'être enthousiasmé par le problème à résoudre et de pouvoir maintenir cet engagement dans la durée.

## Quel genre de personne êtes-vous en équipe ?
Je me décrirais comme **sociable et naturellement porté à aider les autres**. Quelques exemples concrets tirés de mon expérience :
- Chez Sonelgaz, j'ai activement **accompagné l'intégration de nouveaux membres de l'équipe**, en leur expliquant l'architecture et le code pour qu'ils deviennent productifs plus rapidement.
- J'ai animé des **sessions de formation utilisateurs** pour que les utilisateurs finaux — pas seulement les développeurs — se sentent à l'aise avec ce qu'on avait construit.
- Je fais régulièrement des **revues de code**, non pas pour bloquer, mais pour partager du contexte et détecter les problèmes tôt, et je prends toujours le temps d'expliquer **pourquoi**, pas juste **quoi** changer.
- Je préfère débloquer un collègue en 5 minutes plutôt que de le laisser galérer en silence pendant une heure — j'aime être la personne à qui on ose poser une « question bête ».

## Vous êtes développeur backend — comment le présentez-vous ?
Je me concentre volontairement sur le **développement backend** : conception d'API, logique métier, modélisation des données, intégration (Kafka/REST) et fiabilité du système. Plus tôt dans ma carrière, j'ai aussi travaillé avec Angular côté front-end, donc je comprends l'ensemble du système et je communique bien avec les équipes front — mais ma force, et là où je veux continuer à progresser, c'est le backend et l'architecture, pas le travail UI.

---

## Révision technique

### Qu'est-ce que le CQRS (Command Query Responsibility Segregation) ?
Le CQRS est un patron d'architecture qui **sépare le modèle utilisé pour écrire les données (Commandes) du modèle utilisé pour les lire (Requêtes)**.
- Les **Commandes** modifient l'état et ne retournent pas de données (ex. `CreateOrder`, `UpdateStock`).
- Les **Requêtes** retournent des données et ne modifient jamais l'état (ex. `GetOrderById`).
- Le côté écriture et le côté lecture peuvent utiliser **des modèles différents, voire des bases de données différentes**, optimisés indépendamment.

### Quel problème le CQRS résout-il, et quels sont ses compromis ?
- **Problème résolu** : dans les domaines complexes, un modèle unique servant lecture et écriture devient difficile à maintenir et à faire évoluer.
- **Avantages** : mise à l'échelle indépendante des charges lecture/écriture, modèles de lecture dénormalisés/adaptés, séparation claire des responsabilités.
- **Inconvénients** : complexité accrue (deux modèles, parfois deux bases), cohérence à terme entre lecture et écriture, non nécessaire pour du CRUD simple.

### Quel est le lien entre CQRS et Event Sourcing ?
CQRS et Event Sourcing sont **complémentaires mais indépendants** — le CQRS peut être utilisé sans Event Sourcing.
- L'**Event Sourcing** persiste l'état comme une séquence ordonnée d'**événements métier** plutôt que l'état courant seul.
- Combiné au CQRS : le **côté écriture** ajoute des événements dans un event store, et le **côté lecture** est construit en **projetant** ces événements dans des modèles de lecture dénormalisés.
- Offre une traçabilité complète, mais augmente la complexité et nécessite de gérer la cohérence à terme entre l'event store et les projections.

### Qu'est-ce que le patron Saga et quel problème résout-il ?
Le patron Saga gère la **cohérence des données à travers plusieurs services**, en remplaçant une transaction ACID unique (impossible entre services) par une **séquence de transactions locales**.
- Chaque service exécute sa transaction locale puis publie un événement pour déclencher l'étape suivante.
- Si une étape échoue, la saga exécute des **transactions compensatoires** pour annuler le travail déjà fait.
- Exemple : saga de commande = réserver le stock → débiter le paiement → expédier. Si le paiement échoue, une compensation libère le stock réservé.

### Chorégraphie vs Orchestration pour coordonner une Saga ?
- **Chorégraphie** : chaque service écoute des événements et publie les siens en réaction — pas de coordinateur central. Faible couplage, mais difficile à suivre quand la saga grandit.
- **Orchestration** : un **orchestrateur** central indique à chaque service quelle transaction exécuter et gère les échecs/compensations. Plus facile à comprendre/surveiller, mais peut devenir un goulot d'étranglement.

### Quel est le lien entre Saga et cohérence à terme (eventual consistency) ?
Une saga étant une séquence de transactions locales indépendantes, le système est seulement **cohérent à terme** — il existe une fenêtre où certains services sont à jour et d'autres non. Les transactions compensatoires gèrent les échecs, mais il faut tolérer une incohérence temporaire.

### Quels sont les principaux patrons de conception microservices ?
- **Décomposition** : par capacité métier/sous-domaine (DDD), **Database per Service**, **Strangler Fig**.
- **Communication** : **API Gateway**, **Service Discovery**, **Backend for Frontend (BFF)**.
- **Données et cohérence** : **Saga**, **CQRS**, **Event Sourcing**, Transactional Outbox.
- **Résilience** : **Circuit Breaker**, Retry, Bulkhead, Timeout.
- **Observabilité** : Agrégation de logs, Traçage distribué, API de Health Check.

### Qu'est-ce que le patron API Gateway ?
Un **point d'entrée unique** devant les microservices qui route les requêtes vers le(s) bon(s) service(s), gérant les préoccupations transverses une seule fois (routage, authentification, rate limiting, agrégation, terminaison SSL) au lieu de les dupliquer partout. Peut être spécialisé par type de client via un **BFF**. Compromis : un saut réseau de plus, et un point de défaillance potentiel s'il n'est pas hautement disponible.

### Qu'est-ce que le patron Circuit Breaker ?
Empêche un service d'appeler en boucle un **service en aval défaillant ou lent**, évitant les pannes en cascade.
- **Fermé** : les appels passent normalement.
- **Ouvert** : après trop d'échecs, les appels échouent immédiatement pendant une période de repos.
- **Semi-ouvert** : après le repos, quelques appels d'essai vérifient si la dépendance s'est rétablie.
- Souvent associé à du fallback et utilisé avec Retry/Timeout. Implémentations courantes : Resilience4j, Hystrix (ancien).

### Qu'est-ce que le patron Service Discovery ?
Comme les instances de service sont **dynamiques**, les clients ne peuvent pas coder en dur les adresses.
- **Découverte côté client** : le client interroge un **registre de services** (Eureka, Consul) et choisit lui-même une instance.
- **Découverte côté serveur** : le client appelle un **load balancer/routeur** qui interroge le registre et transmet la requête.

### Qu'est-ce que le patron Database per Service, et quel défi crée-t-il ?
Chaque microservice possède **sa propre base de données privée**, accessible uniquement via son API.
- Avantages : fort découplage, persistance polyglotte, mise à l'échelle indépendante.
- Défi : des transactions autrefois ACID **s'étendent désormais sur plusieurs services/bases** — d'où l'existence du patron Saga (et CQRS/Event Sourcing/Transactional Outbox).

### Qu'est-ce que le patron Strangler Fig ?
Une stratégie pour **migrer progressivement un monolithe legacy vers des microservices** sans réécriture complète risquée. Les nouvelles fonctionnalités sont construites en microservices tandis qu'une **façade/routeur** (souvent une API Gateway) redirige les appels vers le nouveau service ou le monolithe existant, jusqu'à ce que ce dernier se réduise et puisse être retiré — le système reste fonctionnel et livrable à chaque étape.

### Qu'est-ce qu'Apache Kafka ?
Une **plateforme de streaming d'événements distribuée** pour **publier, stocker et traiter des flux d'enregistrements** en temps réel.
- Basée sur le publish/subscribe, mais contrairement aux files traditionnelles, elle **persiste les messages sur disque** et permet de les relire — utilisable comme système de messagerie et comme journal d'événements durable.
- Cas d'usage : découplage de microservices, analytique temps réel, event sourcing, agrégation de logs.

### Quels sont les concepts de base de Kafka (Topic, Partition, Broker, Producer, Consumer) ?
- **Topic** : un flux/une catégorie nommée d'enregistrements.
- **Partition** : un topic est divisé en partitions, chacune un **journal ordonné en ajout uniquement** — permet la mise à l'échelle horizontale et la consommation parallèle.
- **Broker** : un serveur Kafka stockant des partitions ; un **cluster** regroupe plusieurs brokers.
- **Producer** / **Consumer** : publient dans / lisent depuis un topic.
- **Offset** : identifiant séquentiel d'un enregistrement dans une partition, utilisé pour suivre la position du consommateur.

### Comment Kafka garantit-il l'ordre des messages ?
Seulement **au sein d'une même partition**, pas sur tout un topic. Les enregistrements avec la **même clé** vont toujours à la **même partition** (via le hash de la clé), préservant l'ordre par clé. Un ordre global strict nécessite une seule partition, au prix du parallélisme.

### Qu'est-ce qu'un Consumer Group, et comment Kafka fait-il évoluer la consommation ?
Un ensemble de consommateurs partageant un `group.id` qui coopèrent pour consommer un topic.
- Kafka assigne chaque partition à **exactement un consommateur** du groupe à la fois — un topic à N partitions peut être consommé en parallèle par jusqu'à N consommateurs.
- Différents consumer groups sont **indépendants** : chacun reçoit sa propre copie de chaque message.
- Si un consommateur tombe en panne, Kafka déclenche un **rebalancing**.

### Comment Kafka assure-t-il la durabilité et la tolérance aux pannes ?
- Chaque partition a un **facteur de réplication** — des réplicas stockés sur plusieurs brokers.
- Un réplica est le **leader** (gère lectures/écritures) ; les autres sont des **followers** qui répliquent depuis lui.
- **In-Sync Replicas (ISR)** : followers à jour avec le leader. Si le leader tombe, un nouveau leader est élu parmi l'ISR.
- Kafka utilise **ZooKeeper** (ancien) ou **KRaft** (récent, sans ZooKeeper) pour les métadonnées du cluster et l'élection du leader.

### `acks=0` vs `acks=1` vs `acks=all` sur un Producer ?
- **`acks=0`** : pas d'attente d'accusé de réception — le plus rapide, mais les messages peuvent être perdus.
- **`acks=1`** : attend l'accusé de réception du **leader** — bon compromis, mais perte possible si le leader tombe avant réplication.
- **`acks=all`** : attend **tous les réplicas synchronisés** — garantie la plus forte, latence plus élevée.

### Comment Kafka se compare-t-il à un broker traditionnel (ex. RabbitMQ) ?
- **Rétention** : Kafka conserve les messages indépendamment de leur consommation (rejeu possible) ; RabbitMQ supprime généralement un message une fois consommé.
- **Modèle** : Kafka est basé sur un journal (pull) ; RabbitMQ est un broker traditionnel (push) avec un routage plus riche (exchanges/queues).
- **Débit vs fonctionnalités** : Kafka optimisé pour un débit très élevé ; RabbitMQ offre nativement un routage par message plus riche.

### Qu'est-ce que le patron Transactional Outbox, et pourquoi est-il utilisé avec Kafka ?
Résout le **problème de la double écriture** : un service qui met à jour sa base **et** publie un événement Kafka ne peut pas faire les deux de façon atomique — s'il plante après le commit DB mais avant la publication, l'événement est perdu.
- **Fonctionnement** : le service écrit le changement métier **et** une ligne décrivant l'événement dans une **table outbox**, dans la **même transaction locale**.
- Un processus séparé lit la table outbox et publie vers Kafka :
  - **Polling publisher** : interroge périodiquement et publie les nouvelles lignes.
  - **Change Data Capture (CDC)**, ex. **Debezium** : suit le write-ahead log de la base et diffuse automatiquement les nouvelles lignes — plus efficace, latence plus faible.
- **Garantie** : livraison **au moins une fois**, en cohérence avec le changement en base — les consommateurs doivent être **idempotents**.

### Quoi de neuf dans les versions récentes de Java ? (points à mentionner en entretien)
- **Records** (Java 16+) : porteurs de données immuables concis — bon à mentionner pour les DTOs/value objects.
- **Sealed classes** (Java 17) : restreignent quelles classes peuvent étendre/implémenter un type — utile pour modéliser des hiérarchies de domaine fermées (s'associe bien avec le DDD).
- **Pattern matching pour `switch`** (Java 21) : branchement exhaustif et type-safe, particulièrement efficace avec les types scellés.
- **Virtual threads / Project Loom** (Java 21) : threads légers pour une concurrence massive sans la complexité de la programmation réactive — un sujet fort si on vous interroge sur le passage à l'échelle de services I/O-bound.
- **Sequenced Collections** (Java 21) : accès unifié au premier/dernier élément sur List/Set/Map.
- **Text blocks** (Java 15+) : littéraux de chaînes multi-lignes, pratiques pour du SQL/JSON embarqué.

### Essentiels PL/SQL et PostgreSQL (PL/pgSQL)
- **PL/SQL** est l'extension procédurale d'Oracle pour SQL (procédures stockées, fonctions, packages, triggers, curseurs, gestion des exceptions). **PL/pgSQL** est son équivalent chez PostgreSQL — mêmes concepts procéduraux, syntaxe/moteur différents. Si on vous interroge sur « PL/SQL » dans un contexte Postgres, précisez que vous maîtrisez les *concepts* et spécifiquement PL/pgSQL.
- Soyez prêt à expliquer : **procédure stockée vs fonction**, **curseurs** (traitement ligne par ligne), **triggers** (BEFORE/AFTER INSERT/UPDATE/DELETE), et les **blocs de gestion d'exceptions**.
- Soyez prêt à justifier **quand les utiliser** (ex. imposer des invariants au niveau base de données, opérations de masse) **vs quand ne pas les utiliser** (la logique métier doit rester dans la couche applicative pour la testabilité/portabilité — abuser des procédures stockées rend la logique plus difficile à versionner et à tester).

### Points d'approfondissement PostgreSQL
- **Indexation** : B-tree (par défaut), GIN/GiST (recherche full-text, JSONB, tableaux), index partiels et par expression.
- **JSONB** : données semi-structurées dans une table relationnelle, indexables avec GIN — utile quand un schéma strict est trop rigide pour une partie des données.
- **EXPLAIN / EXPLAIN ANALYZE** : lire un plan d'exécution, repérer les sequential scans vs les index scans, comprendre les estimations de coût.
- **MVCC et niveaux d'isolation** : comment Postgres gère les lectures/écritures concurrentes sans bloquer les lecteurs, et les niveaux d'isolation SQL (Read Committed est le niveau par défaut de Postgres).
- **Partitionnement** : découper de grandes tables (par range/list/hash) pour la performance et une maintenance plus simple (ex. données de type série temporelle).

### Architecture Hexagonale (Ports & Adapters)
- **Idée centrale** : la logique métier/domaine se trouve au centre, totalement isolée des frameworks, bases de données et interfaces utilisateur. Elle ne communique avec l'extérieur qu'à travers des **ports** (interfaces qu'elle définit elle-même).
- Les **adaptateurs** implémentent ces ports pour brancher une technologie concrète — un contrôleur REST est un adaptateur driving/primaire (appelle le domaine), une implémentation de repository JPA est un adaptateur driven/secondaire (le domaine l'appelle).
- **Pourquoi c'est important** : le domaine peut être testé unitairement sans base de données ni framework, et changer d'infrastructure (ex. PostgreSQL → un autre stockage, REST → déclenchement Kafka) ne touche pas la logique métier.
- **Lien avec le DDD** : l'architecture hexagonale est le patron structurel dans lequel le modèle de domaine du DDD s'intègre naturellement — l'« hexagone » représente le domaine + la couche applicative ; le DDD fournit les outils (entités, agrégats, événements de domaine) pour concevoir ce qu'il y a à l'intérieur.

### Domain-Driven Design (DDD) — concepts clés
- **DDD stratégique** :
  - **Bounded Context** : une frontière explicite à l'intérieur de laquelle un modèle de domaine spécifique et son vocabulaire s'appliquent de façon cohérente — c'est exactement ce qui définit le périmètre d'un microservice dans une décomposition alignée sur le DDD.
  - **Ubiquitous Language** : un vocabulaire partagé entre développeurs et experts métier, utilisé de façon cohérente dans le code et les échanges, pour éviter les pertes de sens en traduction.
  - **Context Mapping** : comment différents bounded contexts se relient et s'intègrent entre eux (ex. Shared Kernel, Customer/Supplier, Anti-Corruption Layer).
- **DDD tactique** :
  - **Entity** : possède une identité qui persiste dans le temps, même si ses attributs changent.
  - **Value Object** : défini uniquement par ses attributs, immuable, sans identité (ex. `Money`, `Address`).
  - **Aggregate** : un ensemble d'entités/value objects traité comme une seule frontière de cohérence, avec un unique **Aggregate Root** comme point d'entrée — garantit les invariants.
  - **Repository** : abstraction pour charger/persister des agrégats, cachant les détails de persistance au domaine.
  - **Domain Event** : quelque chose de significatif qui s'est produit dans le domaine (`OrderPlaced`) — le pont naturel vers l'intégration événementielle (Kafka) et les patrons Saga/CQRS.

### Quels sont les principes fondamentaux du Data Mesh ?
À avoir en tête puisque c'est la direction vers laquelle je veux évoluer :
- **Propriété orientée domaine** : chaque domaine métier possède et est responsable de ses propres données, de la même façon qu'il possède ses microservices — pas d'équipe data centrale comme goulot d'étranglement.
- **La donnée comme produit** : les données exposées par un domaine doivent avoir le même niveau d'exigence qu'une API — découvrables, documentées, fiables, avec des SLA clairs, pas juste un export brut de base de données.
- **Plateforme d'infrastructure de données en self-service** : une plateforme commune (stockage, pipelines, catalogage, contrôle d'accès) permettant aux équipes de domaine de publier/consommer des données sans expertise infra poussée.
- **Gouvernance computationnelle fédérée** : des standards globaux (schémas, sécurité, interopérabilité) sont définis collectivement et appliqués/automatisés à travers les domaines, plutôt qu'imposés d'en haut manuellement.

### Communication synchrone (REST) vs asynchrone (événementielle/Kafka) — quand utiliser quoi ?
- **REST/synchrone** : simple à raisonner, réponse immédiate, adapté au request/response (« donne-moi cette ressource maintenant »). Inconvénients : couplage plus fort (l'appelant dépend de la disponibilité de l'appelé), plus difficile à scaler sous charge, risque de panne en cascade sans protection (Circuit Breaker).
- **Événementiel/asynchrone (Kafka)** : les services restent découplés dans le temps (le producteur n'a pas besoin que le consommateur soit disponible), supporte naturellement plusieurs abonnés, mieux adapté au streaming/analytique à fort débit. Inconvénients : cohérence à terme, flux métier plus difficile à tracer/déboguer, nécessite des consommateurs idempotents.
- **En pratique** : j'utilise REST pour les requêtes directes côté client et la messagerie événementielle pour la propagation d'état entre services et les workflows (style Saga).

### Comment fonctionne le conteneur IoC/DI de Spring, et pourquoi est-ce important ?
- **Inversion of Control (IoC)** : au lieu qu'une classe crée elle-même ses dépendances (`new SomeService()`), c'est le framework qui les crée et les fournit — le contrôle de la création d'objets est inversé, confié au conteneur.
- **Dependency Injection (DI)** : le mécanisme utilisé par Spring pour implémenter l'IoC — les dépendances sont injectées par constructeur (préféré), setter, ou champ.
- **Pourquoi c'est important** : cela découple les composants des implémentations concrètes (on dépend d'interfaces/abstractions), rend les tests unitaires triviaux (injecter des mocks), et laisse Spring gérer le cycle de vie/scope des objets (`singleton`, `prototype`, etc.) de façon centralisée.
- L'**auto-configuration de Spring Boot** s'appuie là-dessus : selon ce qui est présent sur le classpath et vos propriétés, Spring Boot enregistre automatiquement des beans sensés (ex. un `DataSource` si un driver JDBC est présent), que vous pouvez toujours surcharger.

### Comment fonctionne `@Transactional` dans Spring, et que faut-il savoir sur la propagation ?
- Spring enveloppe la méthode annotée dans un **proxy** qui démarre une transaction avant l'exécution et commit/rollback après — c'est pourquoi `@Transactional` **ne fonctionne pas lors d'un appel depuis la même classe** (l'auto-invocation contourne le proxy).
- La **propagation** définit le comportement d'une méthode transactionnelle appelée depuis un autre contexte transactionnel — les deux plus courantes :
  - `REQUIRED` (par défaut) : rejoint la transaction existante s'il y en a une, sinon en crée une nouvelle.
  - `REQUIRES_NEW` : démarre toujours une nouvelle transaction indépendante (suspend l'actuelle) — utile par exemple pour un log d'audit qui doit persister même si la transaction englobante est annulée.
- Les **niveaux d'isolation** contrôlent comment les transactions concurrentes voient les changements non validés/validés des autres (Read Committed est le niveau par défaut de PostgreSQL) — pertinent pour discuter des race conditions sur des données partagées.

### Qu'est-ce que le problème N+1, et comment le corriger avec JPA/Hibernate ?
- **Le problème** : récupérer une liste de N entités parentes, puis charger paresseusement une collection/entité liée pour *chacune* individuellement — 1 requête pour les parents + N requêtes pour les enfants = N+1 requêtes, au lieu d'1 ou 2.
- **Corrections** :
  - **`JOIN FETCH`** en JPQL pour charger l'association de façon eager en une seule requête.
  - **`@EntityGraph`** pour déclarer quelles associations charger de façon eager pour une requête spécifique, sans changer le fetch type par défaut de l'entité.
  - **Batch fetching** (`hibernate.default_batch_fetch_size`) pour charger les entités liées par lots plutôt qu'une par une.
- Toujours mettre les associations en **`LAZY`** par défaut et ne charger en eager que là où c'est nécessaire par requête — le `EAGER` par défaut partout est une source fréquente de N+1 cachés.

### Quels sont les principes SOLID, et un exemple pratique ?
- **S — Single Responsibility** : une classe doit avoir une seule raison de changer (ex. séparer un `OrderValidator` d'un `OrderRepository` plutôt que mélanger validation et persistance).
- **O — Open/Closed** : ouvert à l'extension, fermé à la modification — ex. ajouter un nouveau mode de paiement via une nouvelle implémentation `PaymentStrategy` plutôt qu'en modifiant un gros `if/else` dans le code existant.
- **L — Liskov Substitution** : un sous-type doit pouvoir être utilisé partout où son type de base est attendu, sans casser le comportement.
- **I — Interface Segregation** : préférer plusieurs interfaces petites et spécifiques à une grande que les clients sont forcés d'implémenter entièrement.
- **D — Dependency Inversion** : dépendre d'abstractions, pas d'implémentations concrètes — exactement ce que permet la DI de Spring en pratique.

### Comment rendre un endpoint REST idempotent, et pourquoi est-ce important avec Kafka/l'événementiel ?
- **Idempotent** signifie qu'appeler la même opération plusieurs fois a le même effet que l'appeler une fois — essentiel car les réseaux font des retries, et Kafka ne garantit qu'une livraison **au moins une fois**, donc les consommateurs *verront* parfois le même message deux fois.
- **Techniques** : utiliser une **clé d'idempotence** unique par opération logique (générée côté client ou issue de l'id de l'événement) et stocker quelles clés ont déjà été traitées avant de réappliquer l'effet ; concevoir les écritures comme des **upserts de type `PUT`** plutôt que des `POST` « toujours ajouter » ; rendre les effets de bord naturellement idempotents quand c'est possible (ex. « passer le statut à EXPÉDIÉ » est idempotent, « incrémenter le stock de 1 » ne l'est pas).

### Comment gérez-vous les évolutions de schéma de base de données en équipe (Flyway/Liquibase) ?
- Les changements de schéma sont écrits sous forme de **scripts de migration versionnés** (ex. `V1__create_orders_table.sql`), versionnés dans le code source, et appliqués automatiquement au démarrage de l'application ou via la CI/CD.
- Cela garde le schéma **reproductible** sur tous les environnements (local, staging, prod) et fournit une **traçabilité claire** de chaque changement, au lieu de modifications manuelles non documentées.
- Bonnes pratiques : les migrations doivent être **rétrocompatibles** pendant un déploiement progressif (ex. ajouter une colonne nullable d'abord, la remplir, puis la passer en `NOT NULL` dans une release ultérieure) afin que l'ancienne et la nouvelle version de l'application puissent toutes deux fonctionner contre la base pendant un déploiement.

### Comment abordez-vous l'observabilité dans un système distribué/microservices ?
- **Logs centralisés** : logs structurés (JSON) envoyés vers un stockage central (ex. Elastic) pour pouvoir chercher à travers tous les services au lieu de se connecter machine par machine.
- **Correlation/trace ID** : un identifiant unique généré au point d'entrée d'une requête et propagé à travers chaque appel de service en aval (et dans les headers des messages Kafka) — le seul moyen pratique de reconstituer un flux métier qui traverse plusieurs services.
- **Métriques et tableaux de bord** : exposer des métriques clés (latence, taux d'erreur, débit, lag de queue) et les visualiser (ex. Grafana) avec des alertes sur seuils, plutôt que de découvrir les problèmes via les plaintes des utilisateurs.
- **Health checks** : endpoints de readiness/liveness pour que les orchestrateurs (Kubernetes) détectent et contournent automatiquement les instances défaillantes.

### Quelle est la différence entre TDD et BDD, et comment les avez-vous utilisés ensemble ?
- **TDD (Test-Driven Development)** : écrire un test unitaire qui échoue d'abord, écrire le code minimal pour le faire passer, puis refactoriser — une discipline **côté développeur** centrée sur la correction du code au niveau unitaire (red-green-refactor).
- **BDD (Behavior-Driven Development)** : décrire le comportement attendu dans un format partagé et lisible (**Gherkin** : Given/When/Then) que développeurs et parties prenantes métier peuvent comprendre et valider *avant* l'implémentation — un outil de **collaboration** autant que de test.
- **En pratique** : j'utilise le BDD (Cucumber/Gherkin) au niveau fonctionnalité/acceptance pour confirmer que le comportement métier est correct et partagé avec le product owner, et le TDD/tests unitaires en dessous pour piloter les détails d'implémentation et les cas limites que ces scénarios ne couvrent pas.

### Quelle est votre stratégie de branches Git, et comment gérez-vous merge vs rebase ?
- J'ai travaillé avec **Gitflow** (branches feature/develop/release/main) et des workflows plus simples **trunk-based / feature-branch** selon l'équipe — le bon choix dépend du rythme de release, pas d'une préférence personnelle.
- Le **merge** préserve l'historique complet et est sûr pour les branches partagées ; le **rebase** réécrit l'historique sur la base la plus récente pour un **log plus propre et linéaire** — je rebase mes propres branches de feature avant d'ouvrir une merge request, mais je ne rebase jamais une branche sur laquelle d'autres construisent déjà.
- Je garde des merge requests petites et ciblées, car les grosses MR sont à la fois plus difficiles à relire et plus susceptibles de cacher des bugs.

### À quoi ressemble le cycle de build Maven, et comment gérez-vous les dépendances ?
- Le cycle de vie par défaut de Maven exécute des phases dans l'ordre : `validate → compile → test → package → verify → install → deploy`. Lancer `mvn package` exécute toutes les phases jusqu'à `package` incluse.
- **Gestion des dépendances** : déclarées dans le `pom.xml`, résolues de façon transitive depuis des dépôts (cache local → dépôt distant/Nexus/Artifactory) — les conflits sont résolus par la règle « nearest wins » de Maven, d'où l'utilité de `mvn dependency:tree` pour déboguer des conflits de version.
- **Projets multi-modules** : un POM parent centralise les versions de dépendances/plugins partagées (`dependencyManagement`), pour que les modules enfants restent cohérents sans répéter les numéros de version.

### Comment concevez-vous un pipeline CI/CD (ex. avec Jenkins/GitLab) ?
- Étapes typiques : **build → tests unitaires → analyse statique (SonarQube/lint) → package/containerisation → tests d'intégration/BDD → déploiement en staging → déploiement en prod (manuel ou automatisé)**.
- Échouer vite : les vérifications rapides/peu coûteuses (compilation, tests unitaires) s'exécutent avant les plus coûteuses (tests d'intégration, déploiement) pour un retour rapide.
- Je privilégie des **déploiements petits et fréquents** plutôt que des releases big-bang — des changements plus petits sont plus faciles à relire, tester et annuler en cas de problème.
- Les secrets/identifiants ne sont jamais codés en dur dans le pipeline — ils proviennent d'un coffre-fort/gestionnaire de credentials injecté à l'exécution.

### Comment abordez-vous les tests unitaires avec JUnit et Mockito ?
- Les **tests unitaires** isolent une seule classe/méthode — tout collaborateur (repository, client externe) est remplacé par un **mock** (Mockito) afin que le test vérifie la logique de *cette* unité, pas celle de ses dépendances.
- Je suis le schéma **Arrange-Act-Assert** : préparer les mocks/entrées, appeler la méthode testée, vérifier le résultat (valeur de retour, et/ou qu'un mock a été appelé avec les bons arguments via `verify()`).
- J'évite le sur-mocking — mocker chaque collaborateur, y compris de simples value objects, rend les tests fragiles et couplés aux détails d'implémentation plutôt qu'au comportement.
- Pour la logique de persistance, je complète les tests unitaires par un plus petit nombre de **tests d'intégration** (ex. `@DataJpaTest` avec une vraie base de test), car mocker l'ORM lui-même donne une fausse confiance.

### Comment Spring Security gère-t-il l'authentification et l'autorisation (JWT/OAuth2) ?
- L'**authentification** (qui êtes-vous) passe généralement par une **chaîne de filtres** : une requête traverse un `UsernamePasswordAuthenticationFilter` ou un **filtre JWT** personnalisé qui valide le token et alimente le `SecurityContext`.
- **Auth basée sur JWT** : le client envoie un token signé (généralement dans l'en-tête `Authorization: Bearer`) ; le serveur valide la signature/expiration de façon **stateless**, sans session côté serveur — adapté aux microservices puisque n'importe quelle instance peut valider le token indépendamment.
- **OAuth2/OpenID Connect** : délègue l'authentification à un fournisseur d'identité (ex. Keycloak, Azure AD) — l'application fait confiance aux tokens émis par ce fournisseur plutôt que de gérer elle-même les identifiants.
- **Autorisation** : règles au niveau méthode (`@PreAuthorize`) ou au niveau URL, basées sur les rôles/autorités extraits du token/de la session.

### Comment fonctionnent les repositories Spring Data, et que sont les derived query methods ?
- Spring Data génère l'implémentation d'une **interface** de repository à l'exécution — vous déclarez seulement le contrat (ex. `extends JpaRepository<Order, Long>`), et Spring fournit le CRUD + pagination/tri gratuitement.
- **Derived query methods** : nommer une méthode `findByStatusAndCreatedAtAfter(...)` fait que Spring Data analyse le nom de la méthode et génère automatiquement la requête correspondante — pratique pour des requêtes simples, mais pour tout ce qui est complexe je préfère un `@Query` explicite (JPQL ou SQL natif) pour la lisibilité et le contrôle.
- **Pagination/tri** : passer un paramètre `Pageable`/`Sort` et Spring Data gère `LIMIT`/`OFFSET` et `ORDER BY` pour vous.

### Quelles fonctionnalités Java Streams/lambda utilisez-vous au quotidien ?
- Les **Streams** pour un traitement déclaratif des collections : `filter`, `map`, `collect(Collectors.toList()/groupingBy(...))` plutôt que des boucles manuelles — plus lisible et moins sujet aux erreurs pour les transformations/agrégations.
- **Optional** pour rendre explicite l'absence de valeur dans l'API et éviter des `NullPointerException` non contrôlées — j'évite d'appeler `.get()` aveuglément et je préfère `.map()/.orElseThrow()`.
- Les **références de méthode** (`Order::getStatus`) comme alternative plus concise à une lambda d'une ligne.
- Un point de vigilance : les streams ne sont pas toujours plus performants qu'une boucle simple pour des cas basiques, et des streams profondément chaînés/imbriqués peuvent nuire à la lisibilité — je les utilise quand ils clarifient l'intention, pas systématiquement.

### Comment gérez-vous la concurrence/le multithreading en Java ?
- Je privilégie des abstractions de haut niveau plutôt que `Thread`/`synchronized` bruts quand c'est possible : **`ExecutorService`** pour gérer des pools de threads, **`CompletableFuture`** pour composer des pipelines asynchrones non bloquants.
- Pour l'état mutable partagé, je préfère les utilitaires de **`java.util.concurrent`** (`ConcurrentHashMap`, `AtomicInteger`, `ReentrantLock`) plutôt que des blocs `synchronized` manuels, plus sujets aux erreurs et plus difficiles à raisonner.
- Connaissance des **virtual threads de Java 21** : pour les charges I/O-bound (typiques des services backend qui appellent des bases/APIs), les virtual threads permettent d'écrire du code bloquant simple qui passe à l'échelle comme du code asynchrone, sans la complexité de la programmation réactive.

### Quelle est votre approche de la gestion des exceptions dans une application Spring Boot ?
- **Checked vs unchecked** : je privilégie généralement les exceptions unchecked (runtime) pour les erreurs métier dans les apps Spring, car les exceptions checked encombrent les signatures de méthodes à travers les couches sans apporter beaucoup de sécurité.
- **Gestion centralisée** : un `@ControllerAdvice` avec des méthodes `@ExceptionHandler` qui mappent les exceptions métier vers les bons codes de statut HTTP et un corps de réponse d'erreur cohérent, au lieu de disperser des try/catch dans les contrôleurs.
- **Échouer avec du sens** : des exceptions personnalisées (`OrderNotFoundException`, `InsufficientStockException`) plutôt qu'un `RuntimeException` générique, pour que l'erreur soit auto-documentée et facile à mapper au bon niveau de réponse/log.
- Ne jamais avaler une exception silencieusement (bloc `catch` vide) — au minimum, la logger avec assez de contexte pour déboguer plus tard.

### Pouvez-vous citer les principales catégories de patrons GoF avec un exemple utilisé ?
- **Créationnels** (création d'objets) : ex. **Builder** pour construire un objet complexe étape par étape (courant avec des DTOs immuables), **Factory Method** pour décider quelle implémentation instancier selon un type.
- **Structurels** (composition de classes/objets) : ex. **Adapter** pour faire correspondre le client d'une API externe à une interface attendue par mon code, **Facade** pour exposer une interface simple au-dessus d'un sous-système complexe.
- **Comportementaux** (interaction/responsabilité) : ex. **Strategy** pour permuter un algorithme (comme différentes règles de paiement ou de tarification) sans conditionnelles, **Observer** pour publier des événements de domaine vers plusieurs auditeurs.
- Je considère les patrons comme des **outils pour nommer une solution**, pas un objectif en soi — j'en introduis un quand il réduit la complexité, pas pour paraître sophistiqué.

### À l'aise avec les algorithmes et structures de données, et comment cela se traduit-il au quotidien en backend ?
- Je ne mobilise pas la théorie algorithmique tous les jours, mais le modèle mental compte constamment : choisir une `HashMap` vs `TreeMap` vs `List` pour une recherche, savoir qu'une boucle imbriquée `O(n²)` sur une grande collection posera problème à l'échelle, ou qu'un index de base de données transforme un scan `O(n)` en recherche `O(log n)`.
- Concrètement : je fais attention à la **complexité des requêtes/algorithmes quand le volume de données grandit** (pagination plutôt que tout charger, traitement par lots plutôt que ligne par ligne, indexer les bonnes colonnes) — c'est là que la pensée Big-O se manifeste réellement en backend, plus que dans la résolution de puzzles abstraits.

### À quoi sert un outil comme Fivetran, et comment s'inscrit-il dans une logique data product/data mesh ?
- **Fivetran** est un **outil d'ingestion/ELT managé** : il se connecte aux systèmes sources (bases de données, APIs SaaS) et réplique automatiquement les données vers un entrepôt/lac de données, en gérant la dérive de schéma et les synchronisations incrémentales sans code de pipeline écrit à la main.
- Il s'inscrit dans la logique **data-as-a-product** car il permet à une équipe de domaine de publier ses données de façon fiable (via un pipeline bien défini et surveillé) sans que chaque équipe réinvente l'ingestion — plus proche d'une « infrastructure de données en self-service » que des scripts ETL maison par source.
- En tant que développeur backend évoluant vers le data product, je vois la valeur de ce changement : au lieu d'écrire du code d'extraction ponctuel, se concentrer sur la définition de contrats de données propres et laisser l'outillage managé gérer la plomberie.

### Quels sont les principes clés d'une bonne conception d'API REST ?
- **URLs orientées ressources** (`/orders/{id}`, pas `/getOrder?id=`), les bons **verbes HTTP** (GET/POST/PUT/PATCH/DELETE) et **codes de statut** (201 à la création, 404 vs 400 vs 409, etc.) qui portent du sens sans avoir à lire le corps de la réponse.
- **Cohérence** : nommage, pagination, filtrage et format d'erreur prévisibles sur tous les endpoints — un client ne devrait pas avoir à deviner.
- **Versionnement** : anticiper les breaking changes dès le départ (versionnement par URL ou par en-tête) plutôt que de le rajouter sous pression plus tard.
- **Statelessness** : chaque requête porte tout ce qui est nécessaire à son traitement (token d'auth, paramètres) — pas d'état de session côté serveur, ce qui facilite aussi la mise à l'échelle horizontale.

### Comment décidez-vous quand et comment mettre en cache une donnée ?
- Mettre en cache quand une donnée est **lue beaucoup plus souvent qu'elle ne change** et que la recalculer/la récupérer est coûteux — candidats classiques : données de référence, agrégations coûteuses, résultats d'appels à des APIs externes.
- **Où** : en mémoire process (`@Cacheable` de Spring, cache de second niveau d'Hibernate) pour des données à faible churn sur une seule instance ; un cache partagé (Redis) quand plusieurs instances ont besoin d'une vue cohérente ou que le jeu de données est volumineux.
- **L'invalidation est la partie difficile** — je préfère un **TTL** clair combiné à une invalidation explicite à l'écriture (évincer/mettre à jour l'entrée de cache quand la donnée sous-jacente change) plutôt que de se reposer uniquement sur le TTL, pour éviter de servir des données périmées plus longtemps que ce que le cas d'usage tolère.

### Quelle est la différence entre Docker et Podman, et qu'est-ce qu'un bon Dockerfile ?
- **Docker** utilise un modèle client-serveur avec un **daemon** en arrière-plan tournant en root par défaut ; **Podman** est **sans daemon** et supporte des conteneurs entièrement **rootless**, un avantage de sécurité concret dans des environnements partagés/réglementés — la CLI est proche d'un remplacement direct (`podman` reprend la plupart des commandes `docker`).
- Bonnes pratiques **Dockerfile** : utiliser un **build multi-stage** (construire l'app dans une étape, ne copier que l'artefact final dans une image d'exécution allégée) pour garder l'image petite ; figer les versions d'image de base plutôt que `latest` ; s'exécuter avec un **utilisateur non-root** ; ordonner les instructions pour que les couches qui changent rarement (installation des dépendances) précèdent celles qui changent souvent (code applicatif), afin de maximiser la réutilisation du cache de couches.

### Comment expliqueriez-vous les bases de Kubernetes (Pod, Deployment, Service) en entretien ?
- **Pod** : la plus petite unité déployable — un ou plusieurs conteneurs étroitement couplés partageant réseau/stockage. Les Pods sont **éphémères** ; on ne les gère pas directement en pratique.
- **Deployment** : gère un ensemble de réplicas de Pod identiques, gère les mises à jour progressives et les rollbacks, et maintient le nombre de réplicas souhaité (redémarre automatiquement les Pods en échec).
- **Service** : un point de terminaison réseau stable (IP virtuelle/nom DNS) devant un ensemble dynamique de Pods — comme les IP des Pods changent constamment, c'est le Service que les autres composants contactent réellement (c'est le **Service Discovery** natif de Kubernetes).
- Les **health checks** (`readinessProbe`/`livenessProbe`) permettent à Kubernetes de savoir quand un Pod est prêt à recevoir du trafic ou doit être redémarré — directement lié aux patrons de résilience vus plus haut (le Circuit Breaker complète cela au niveau applicatif).

### Pourquoi utiliser Helm, et quel problème résout-il ?
- Helm est un **gestionnaire de paquets pour Kubernetes** : un **chart** regroupe un ensemble de manifestes Kubernetes (Deployment, Service, ConfigMap, etc.) sous forme de template réutilisable, versionné et paramétrable, plutôt que de maintenir du YAML brut par environnement.
- Les **fichiers values** (`values.yaml`) permettent de déployer le même chart différemment selon l'environnement (dev/staging/prod) en surchargeant des paramètres (nombre de réplicas, limites de ressources, tag d'image) sans dupliquer les manifestes.
- Il apporte aussi une **gestion des releases** : `helm upgrade`/`helm rollback` suivent les révisions, ce qui rend simple l'annulation d'un déploiement problématique.

### À quoi sert Terraform, et quel est l'intérêt de l'Infrastructure as Code ?
- Terraform permet de déclarer des ressources cloud/infrastructure (VMs, bases de données, réseau, clusters Kubernetes) en **code** (HCL), plutôt qu'en cliquant dans une console — l'état souhaité est versionné, relisable et reproductible entre environnements.
- **Fichier d'état** : Terraform suit les ressources réelles qu'il gère dans un fichier d'état, et calcule un **plan** (diff entre l'état souhaité et l'état actuel) avant d'appliquer les changements — `terraform plan` avant `terraform apply` est le filet de sécurité contre les changements surprises.
- Avantage par rapport au provisionnement manuel : **reproductibilité** (recréer un environnement identique à partir du même code), **traçabilité** (chaque changement d'infra passe par une pull request relue, comme le code applicatif), et **reprise après sinistre** (reconstruire l'infrastructure à partir du code plutôt que d'une connaissance tribale).
