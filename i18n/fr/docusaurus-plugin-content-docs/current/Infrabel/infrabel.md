---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';


# Infrabel — Préparation d'entretien personnelle
# <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

> Notes de préparation d'entretien personnelles pour **Abderrahmane Sardaoui**, ciblées sur les thématiques signalées pour l'entretien Infrabel. Volontairement autonome — rien ici ne renvoie vers une autre page. Les faits et chiffres sur l'entreprise ci-dessous proviennent de connaissances générales et sont signalés là où ils doivent être **revérifiés auprès des sources officielles/récentes d'Infrabel** avant l'entretien — ne jamais citer un chiffre en entretien sans l'avoir vérifié.

## Présentez-vous
Bonjour, merci de me donner l'opportunité de me présenter.

Je m'appelle **Abderrahmane Sardaoui**. En dehors du travail, je suis marié et je pratique le **judo** — cela me garde discipliné, et honnêtement ça reflète bien ma façon de travailler : un effort constant, le respect du processus, et l'envie d'apprendre des personnes plus expérimentées autour de moi.

Sur le plan professionnel, je suis **développeur backend** avec **plus de 7 ans d'expérience**, principalement dans l'écosystème **Java / Spring**. Je suis titulaire d'un Master en Informatique de l'ESI (Algérie). J'ai travaillé dans différents domaines — l'énergie (Sonelgaz), la santé (CDTA, un système de dossier médical électronique), le CRM/consulting (Poliscrypts), le traitement intelligent de documents (IRIS IMS, filiale du groupe Canon), et actuellement les plateformes industrielles / pièces détachées chez TVH Group.

Sur l'ensemble de ces expériences, mon focus a toujours été le **développement backend** : conception d'APIs, modélisation des données, implémentation de la logique métier, en veillant à livrer du code fiable, testé et maintenable — avec Spring Boot, Spring Data/Security, Hibernate, PostgreSQL, Kafka, et des pratiques comme TDD/DDD/BDD.

## Présentez Infrabel
> **À vérifier avant l'entretien** : tout chiffre ci-dessous (longueur du réseau, effectifs, budget, programmes stratégiques en cours) doit être confirmé auprès de la communication officielle actuelle d'Infrabel — je les cite de mémoire générale, pas d'une source à jour.

- **Infrabel** est l'entreprise publique qui gère **l'infrastructure ferroviaire belge** — les voies, les systèmes de signalisation, l'électrification, les passages à niveau, ainsi que la sécurité et le contrôle de la circulation du réseau — par opposition à **NMBS/SNCB**, qui est l'*opérateur* des trains voyageurs. Cette séparation (gestionnaire d'infrastructure vs opérateur) date de la **réforme de 2005** de l'ancienne société ferroviaire belge unifiée, conformément aux directives européennes de libéralisation ferroviaire qui imposent de séparer la gestion de l'infrastructure de l'exploitation des trains.
- C'est une **entreprise publique autonome** relevant de l'État belge, dont le siège est à **Bruxelles**, responsable de l'entretien et de la modernisation du réseau, de la planification des capacités/sillons horaires pour tous les opérateurs ferroviaires (pas seulement la SNCB — aussi les opérateurs fret et internationaux), et de la gestion des **postes de signalisation / centres de contrôle du trafic**.
- La sécurité et la fiabilité sont au cœur de sa mission — Infrabel investit fortement dans la **signalisation numérique/automatisée** (ex. déploiement de l'ETCS — European Train Control System), le renouvellement de l'infrastructure, et des projets visant la ponctualité, l'état de l'infrastructure étant l'un des plus gros leviers sur la ponctualité des trains à l'échelle nationale.
- En tant qu'organisation d'infrastructure critique/de service public, elle valorise généralement la **stabilité, la rigueur d'ingénierie axée sécurité, et la prise en charge de systèmes sur le long terme** — ce qui correspond bien à ce que je recherche personnellement en ce moment (voir ci-dessous).

## Pourquoi Infrabel — qu'est-ce qui vous motive dans cette opportunité ?
Honnêtement, deux choses : **la mission elle-même** — travailler sur des systèmes qui soutiennent une infrastructure nationale critique et la sécurité publique a un sens que n'a pas toujours un produit purement commercial — et **la stabilité** : je recherche spécifiquement une **mission longue et stable**, et une entreprise d'infrastructure publique avec des programmes pluriannuels est exactement ce type d'environnement. Ce n'est pas une question de courir après une technologie précise — je peux apprendre n'importe quelle stack ; ce qui compte, c'est d'être enthousiasmé par le problème à résoudre (maintenir en fonctionnement un réseau national critique pour la sécurité) et de pouvoir maintenir cet engagement sur le long terme.

## Vous êtes développeur backend — comment le présentez-vous ?
Je me concentre volontairement sur le **développement backend** : conception d'API, logique métier, modélisation des données, intégration (Kafka/REST) et fiabilité du système. Plus tôt dans ma carrière, j'ai aussi travaillé avec Angular côté front-end, donc je comprends l'ensemble du système et je communique bien avec les équipes front — mais ma force, et là où je veux continuer à progresser, c'est le backend et l'architecture, pas le travail UI.

## Quel genre de personne êtes-vous en équipe, en particulier dans un cadre collaboratif (mob/pair programming, LeSS) ?
Je me décrirais comme **sociable et naturellement porté à aider les autres** — ce qui compte beaucoup dans une organisation très collaborative :
- Chez Sonelgaz, j'ai activement **accompagné l'intégration de nouveaux membres de l'équipe**, en leur expliquant l'architecture et le code pour qu'ils deviennent productifs plus rapidement.
- Je fais régulièrement des **revues de code**, non pas pour bloquer, mais pour partager du contexte et détecter les problèmes tôt, et je prends toujours le temps d'expliquer **pourquoi**, pas juste **quoi** changer — le même réflexe qui fait bien fonctionner le pair/mob programming.
- Je préfère débloquer un collègue en 5 minutes plutôt que de le laisser galérer en silence pendant une heure. Je suis à l'aise pour **réfléchir à voix haute** et être observé en train de coder, ce qui correspond exactement à l'état d'esprit qu'exigent le mob/pair programming et l'accent mis par LeSS sur la transparence — je ne traite pas le code comme une activité solitaire et défensive.

---

## Méthodes de travail

### TDD et pourquoi les tests d'intégration sont importants
- **TDD (Test-Driven Development)** : écrire un test unitaire qui échoue d'abord, écrire le code minimal pour le faire passer, puis refactoriser (red-green-refactor) — cela pilote autant la *conception* du code que la vérification de sa correction, car un code difficile à tester unitairement est généralement le signe d'une mauvaise séparation des responsabilités.
- **Pourquoi les tests unitaires seuls ne suffisent pas** : un test unitaire mocke ses collaborateurs, donc il prouve que la *logique interne* d'une classe est correcte mais ne dit rien sur le bon **câblage** de cette classe avec la vraie base de données, le vrai broker Kafka, ou un autre vrai service — les erreurs de configuration, les incohérences de sérialisation, les frontières transactionnelles et la correction des requêtes n'apparaissent que quand la vraie infrastructure est impliquée.
- Les **tests d'intégration** comblent cet écart en sollicitant les vraies frontières (ex. `@DataJpaTest` sur une vraie base/base de test, Testcontainers pour Kafka) — moins nombreux que les tests unitaires (plus lents), mais ils détectent une catégorie de bugs que les tests unitaires ne peuvent structurellement pas voir : « est-ce que ça fonctionne réellement de bout en bout sur la vraie stack », pas seulement « est-ce que la logique de cette classe est correcte isolément ».
- Dans un contexte d'infrastructure critique pour la sécurité, cette distinction compte encore plus — une suite de tests unitaires qui passe avec un point d'intégration cassé est exactement le genre de faille qui ne devrait pas arriver en production.

### Mob Programming & Pair Programming
- **Pair Programming** : deux développeurs travaillent ensemble sur un seul poste — l'un « conduit » (tape le code), l'autre « navigue » (relit, anticipe, repère les erreurs) — les rôles s'échangent généralement à intervalles réguliers. La connaissance se propage naturellement, la revue de code se fait en continu plutôt qu'après coup, et cela réduit le risque de « bus factor » où une seule personne comprend un bout de code.
- **Mob Programming** : toute l'équipe (pas seulement deux personnes) travaille ensemble sur le même problème, en même temps, sur un seul écran/poste partagé, avec une seule personne qui « tape » à la fois (le rôle de « pilote » tournant fréquemment, ex. toutes les quelques minutes) pendant que tous les autres naviguent/discutent activement. C'est essentiellement le pair programming étendu à toute l'équipe.
- **Pourquoi les équipes les utilisent** : quasi-absence de silos de connaissance (tout le monde comprend l'ensemble du code, pas seulement son coin), meilleure qualité de code (la revue est continue, pas une porte à la fin), intégration plus rapide des nouveaux arrivants, et meilleure appropriation collective — au prix d'une sensation de lenteur par ligne de code écrite, bien que le débit net (en comptant le rework et les cycles de revue économisés) soit souvent comparable ou meilleur.
- **Ce que ça demande de moi** : être à l'aise pour réfléchir et expliquer à voix haute, être patient quand ce n'est pas moi qui tape, et considérer « je ne comprends pas cette partie » comme quelque chose de normal à dire plutôt qu'à cacher — ce qui correspond déjà à ma façon de travailler en revue de code et en onboarding.

### LeSS (Large-Scale Scrum) — comment ça fonctionne ?
LeSS est un framework pour **passer à l'échelle Scrum sur plusieurs équipes travaillant sur un seul produit**, tout en restant aussi proche que possible du Scrum à une seule équipe plutôt que d'ajouter une nouvelle couche de management (ce qui est la principale différence avec SAFe).
- **Un seul Produit, un seul Product Backlog, un seul Product Owner** : même avec plusieurs équipes, il n'y a qu'un seul Product Backlog et un seul Product Owner pour l'ensemble du produit — les équipes puisent dans le même backlog plutôt que d'avoir chacune leur backlog cloisonné.
- **Alignement des Sprints** : toutes les équipes partagent le même **Sprint** (mêmes dates de début/fin), ce qui garde l'intégration et la coordination synchronisées sur l'ensemble du produit.
- **Le Sprint Planning est divisé en deux parties** : la partie 1 réunit des représentants de toutes les équipes pour décider *quoi* chaque équipe va prendre dans le backlog partagé (évitant le travail en double et clarifiant les dépendances) ; la partie 2 se déroule **par équipe**, où chaque équipe planifie *comment* elle va réaliser son propre travail.
- **La coordination entre équipes** passe surtout par des **mécanismes informels** que LeSS privilégie par rapport aux rôles de coordination formels : une « Communauté de Pratique », des réunions inter-équipes ponctuelles si besoin, un espace de travail ouvert, et une rotation des personnes entre équipes dans le temps — l'idée est de garder la coordination organique et légère plutôt que d'ajouter une hiérarchie supplémentaire façon Scrum-of-Scrums.
- **Sprint Review et Rétrospective** : la Sprint Review est généralement un événement unique pour l'ensemble du produit (parfois une revue conjointe entre équipes) ; chaque équipe fait quand même sa propre Rétrospective, avec souvent en plus une **Rétrospective globale** pour les améliorations de processus inter-équipes.
- **Pourquoi c'est pertinent pour moi** : LeSS repose fortement sur la transparence, l'appropriation partagée de l'ensemble du produit (pas seulement « la partie de mon équipe »), et l'aisance à travailler au-delà des frontières d'équipe — exactement l'état d'esprit que le mob/pair programming et mon propre style collaboratif m'amènent déjà à adopter.

### Comment abordez-vous la réalisation d'une release ?
- **Versionnement** : je suis le **semantic versioning** (`MAJOR.MINOR.PATCH`) afin que les consommateurs d'une API/librairie puissent voir en un coup d'œil si une mise à jour est sûre (patch/minor) ou nécessite de l'attention (major, changement cassant).
- **Préparation** : la branche/tag de release est créée à partir d'un état stable déjà testé (généralement `main` avec la CI au vert) ; les notes de release résument ce qui a changé, référencent les tickets, et signalent tout changement cassant ou étape de migration nécessaire (ex. une migration de base de données à exécuter en premier).
- **Pipeline** : build → exécution de la suite de tests complète (unitaires + intégration) → package/containerisation → déploiement dans un environnement de staging pour une vérification finale → déploiement en production, idéalement via le pipeline CI/CD plutôt que manuellement, en utilisant le même artefact que celui testé (ne jamais rebuilder pour la prod — on veut déployer exactement ce qui a été testé).
- **Stratégie de déploiement** : je privilégie des **releases petites et fréquentes** plutôt que des releases big-bang — des changements plus petits sont plus faciles à valider et, en cas de problème, plus faciles à identifier et à annuler. Pour tout ce qui est risqué, un déploiement rolling/blue-green (ou un feature flag) permet de limiter le rayon d'impact et de revenir en arrière rapidement sans redéploiement complet.
- **Après la release** : surveiller de près les taux d'erreur/la latence/les logs juste après le déploiement (pas seulement « livrer et partir »), et avoir un plan de rollback clair décidé *avant* le déploiement, pas improvisé sous pression en cas de problème — cela compte encore plus dans un contexte d'infrastructure/lié à la sécurité.

---

## Architecture & conception

### Qu'est-ce que le Domain-Driven Design (DDD), et pourquoi l'utiliser ?
Le DDD est une approche de conception logicielle centrée sur **la modélisation du logiciel au plus près d'un domaine métier réel**, développée en collaboration étroite avec des experts métier plutôt que conçue isolément par des ingénieurs.
- Pour les domaines complexes, le plus grand risque n'est généralement pas la technologie — c'est de construire le **mauvais modèle** du problème. Le DDD répond à cela en plaçant la compréhension du domaine au centre du processus de conception, avec un vocabulaire partagé (**Ubiquitous Language**) entre développeurs et experts métier.
- Il se divise en **DDD stratégique** (comment découper un grand domaine en périmètres bien délimités — Bounded Context, Context Mapping) et **DDD tactique** (les briques pour modéliser *à l'intérieur* de l'un de ces périmètres — Entities, Value Objects, Aggregates, Repositories, Domain Events).
- **Pourquoi utiliser l'un ou l'autre** : le DDD stratégique est ce vers quoi on se tourne tôt, au niveau système/organisation, pour décider comment découper un grand domaine en services/équipes — c'est une question de frontières. Le DDD tactique est ce vers quoi on se tourne une fois qu'on est *à l'intérieur* d'un bounded context, pour garder le modèle de domaine lui-même propre et expressif dans le code. On a généralement besoin des deux, à des niveaux de zoom différents — le stratégique sans le tactique donne des services bien séparés mais avec un modèle interne désordonné ; le tactique sans le stratégique donne du code propre à l'intérieur de services dont les frontières ne correspondent pas au métier réel, ce qui cause des intégrations bavardes et fortement couplées.
- Dans une organisation à forte composante infrastructure avec de nombreux sous-systèmes interconnectés (signalisation, planification horaire, gestion d'actifs, systèmes de sécurité), bien définir les frontières des **Bounded Context** apporte souvent plus de valeur que n'importe quel patron de code spécifique — c'est ce qui évite que les systèmes ne deviennent inextricables.

### Architecture Hexagonale (Ports & Adapters)
- **Idée centrale** : la logique métier/domaine se trouve au centre, totalement isolée des frameworks, bases de données et interfaces utilisateur. Elle ne communique avec l'extérieur qu'à travers des **ports** (interfaces qu'elle définit elle-même).
- Les **adaptateurs** implémentent ces ports pour brancher une technologie concrète — un contrôleur REST est un adaptateur driving/primaire (appelle le domaine), une implémentation de repository JPA est un adaptateur driven/secondaire (le domaine l'appelle).
- **Pourquoi c'est important** : le domaine peut être testé unitairement sans base de données ni framework, et changer d'infrastructure (ex. PostgreSQL → un autre stockage, REST → déclenchement Kafka) ne touche pas la logique métier — précieux dans un système à longue durée de vie où la technologie sous-jacente sera inévitablement remplacée au fil des années alors que les règles métier restent stables.
- **Lien avec le DDD** : l'architecture hexagonale est le patron structurel dans lequel le modèle de domaine du DDD s'intègre naturellement — l'« hexagone » représente le domaine + la couche applicative ; le DDD fournit les outils (entités, agrégats, événements de domaine) pour concevoir ce qu'il y a à l'intérieur.

### Architecture Hexagonale vs Onion — est-ce la même chose ?
Ce sont des **variations de la même idée centrale** — les dépendances pointent vers l'intérieur vers le domaine, l'infrastructure reste en périphérie — avec des présentations légèrement différentes :
- **Hexagonale (Ports & Adapters)** : met l'accent sur la symétrie entre les côtés « driving » et « driven », tous deux communiquant à travers des ports.
- **Onion Architecture** : la décrit comme des **couches concentriques** (cœur du domaine → domain services → application services → infrastructure), rendant la *stratification* elle-même plus explicite — plus proche de la façon dont je la dessinerais au tableau pour l'expliquer à une équipe.
- Les deux partagent le même principe sous-jacent que le Dependency Inversion (le « D » de SOLID) appliqué au niveau architectural : **les dépendances pointent vers l'intérieur, jamais vers l'extérieur vers l'infrastructure**. En entretien comme en pratique, je les traite comme la même famille et je me concentre sur ce principe partagé plutôt que de débattre du nommage.

### Architecture microservices & Spring — comment s'articulent-ils ?
- Spring (Boot en particulier) est naturellement adapté aux microservices grâce à son **démarrage rapide, son auto-configuration, et son immense écosystème** pour exactement les besoins des microservices : **Spring Web/WebFlux** pour les API REST, **Spring Data** pour la persistance, **Spring Security** pour l'authentification, **Spring Kafka** pour l'intégration événementielle, et (avec Spring Cloud) des briques pour le **service discovery, le config server, et l'API gateway**.
- Chaque service est déployable indépendamment, possède sa propre base de données (Database per Service), et communique soit de façon synchrone (REST, généralement derrière une **API Gateway**) soit asynchrone (événements Kafka) — avec des patrons de résilience (**Circuit Breaker**, retries, timeouts) protégeant contre un service en aval défaillant qui entraînerait les autres dans sa chute.
- La cohérence inter-services, les transactions distribuées n'étant pas une option, est gérée avec le patron **Saga** (séquence de transactions locales avec compensations) — et si les besoins de scaling lecture/écriture divergent beaucoup, le **CQRS** sépare le modèle d'écriture du modèle de lecture.
- Dans une grande organisation avec de nombreux systèmes interconnectés (comme le sont probablement les domaines signalisation, planification et gestion d'actifs chez Infrabel), la partie difficile n'est généralement pas le câblage Spring — c'est de bien définir les **frontières de service**, exactement là où intervient la réflexion du Bounded Context du DDD.

### Spring vs Spring Boot — quelle est la différence ?
- **Spring (Framework)** est le **conteneur IoC/DI sous-jacent et l'ensemble de modules** (Core, MVC, Data, Security, AOP, etc.) — puissant, mais historiquement nécessitant beaucoup de configuration manuelle XML/Java pour tout assembler (sources de données, résolveurs de vues, filtres de sécurité, etc.).
- **Spring Boot** est construit **par-dessus** le Spring Framework — il ne le remplace pas, il ajoute l'**auto-configuration** (des valeurs par défaut sensées selon ce qui est présent sur le classpath), un **serveur embarqué** (pas besoin d'un serveur d'application séparé/déploiement WAR), des **starter dependencies** (`spring-boot-starter-web`, etc. regroupant des versions compatibles), et des fonctionnalités prêtes pour la production (Actuator pour la santé/les métriques) prêtes à l'emploi.
- En résumé : Spring fournit les briques de base ; Spring Boot fournit un moyen rapide et opinionated de les assembler en une application exécutable avec un minimum de code répétitif. Pratiquement tous les nouveaux projets Spring démarrent aujourd'hui avec Spring Boot plutôt qu'avec Spring brut.

### Quels sont les principes SOLID, et un exemple pratique ?
- **S — Single Responsibility** : une classe doit avoir une seule raison de changer (ex. séparer un `OrderValidator` d'un `OrderRepository` plutôt que mélanger validation et persistance).
- **O — Open/Closed** : ouvert à l'extension, fermé à la modification — ex. ajouter un nouveau mode de paiement via une nouvelle implémentation `PaymentStrategy` plutôt qu'en modifiant un gros `if/else` dans le code existant.
- **L — Liskov Substitution** : un sous-type doit pouvoir être utilisé partout où son type de base est attendu, sans casser le comportement.
- **I — Interface Segregation** : préférer plusieurs interfaces petites et spécifiques à une grande que les clients sont forcés d'implémenter entièrement.
- **D — Dependency Inversion** : dépendre d'abstractions, pas d'implémentations concrètes — exactement ce que permet la DI de Spring en pratique, et le même principe derrière l'architecture hexagonale à plus grande échelle.

### Qu'est-ce que le polymorphisme en Java, et pouvez-vous donner un exemple ?
Le polymorphisme signifie que **le même appel de méthode se comporte différemment selon le type réel de l'objet à l'exécution**, même lorsqu'il est appelé via un type de référence commun.
- **Polymorphisme d'exécution (de sous-type)** : obtenu via l'**héritage/les interfaces et la surcharge de méthode (overriding)** — ex. une interface `PaymentMethod` avec des implémentations `CreditCard`, `BankTransfer` et `DirectDebit`, chacune redéfinissant `process()` différemment ; appeler `paymentMethod.process()` exécute la bonne implémentation selon la classe réelle de l'objet, décidée à l'exécution (**dispatch dynamique**).
- **Polymorphisme à la compilation (surcharge/overloading)** : plusieurs méthodes avec le même nom mais des listes de paramètres différentes (ex. `calculate(int)` vs `calculate(int, int)`) — résolu à la compilation selon les types statiques des arguments, pas vraiment du « vrai » polymorphisme au sens OOP mais généralement classé avec.
- **Pourquoi c'est important en pratique** : c'est ce qui rend possible le **patron Strategy**, et plus généralement l'injection de dépendances contre des interfaces — un code qui dépend d'une abstraction (`PaymentMethod`) n'a pas besoin de connaître ou de se soucier de l'implémentation concrète qu'il reçoit, ce qui est aussi le mécanisme derrière les collections polymorphes de Java (`List<PaymentMethod>` contenant un mélange de types concrets).

---

## Kafka

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

### Comment Kafka garantit-il l'ordre des messages, et qu'est-ce qu'un Consumer Group ?
- L'ordre n'est garanti **qu'au sein d'une même partition**, pas sur tout un topic — les enregistrements avec la **même clé** vont toujours à la **même partition** (via le hash de la clé), préservant l'ordre par clé (ex. tous les événements d'un `orderId` donné).
- Un **Consumer Group** est un ensemble de consommateurs partageant un `group.id` qui coopèrent pour consommer un topic : Kafka assigne chaque partition à **exactement un consommateur** du groupe à la fois, donc un topic à N partitions peut être consommé en parallèle par jusqu'à N consommateurs. Différents consumer groups sont indépendants — chacun reçoit sa propre copie de chaque message.

### Comment Kafka assure-t-il la durabilité et la tolérance aux pannes ?
- Chaque partition a un **facteur de réplication** — des réplicas stockés sur plusieurs brokers. Un réplica est le **leader** (gère lectures/écritures) ; les autres sont des **followers** qui répliquent depuis lui.
- **In-Sync Replicas (ISR)** : followers à jour avec le leader. Si le leader tombe, un nouveau leader est élu parmi l'ISR, ce qui maintient la disponibilité de la partition sans perte de données (tant que `acks`/la réplication sont correctement configurés).
- `acks=0` (pas d'attente, le plus rapide, messages potentiellement perdus) vs `acks=1` (attend le leader) vs `acks=all` (attend tous les réplicas synchronisés — garantie la plus forte).

### Comment Kafka se compare-t-il à un broker traditionnel (ex. RabbitMQ) ?
- **Rétention** : Kafka conserve les messages indépendamment de leur consommation (rejeu possible) ; RabbitMQ supprime généralement un message une fois consommé.
- **Modèle** : Kafka est basé sur un journal (pull) ; RabbitMQ est un broker traditionnel (push) avec un routage plus riche (exchanges/queues).
- **Débit vs fonctionnalités** : Kafka est optimisé pour un débit très élevé en streaming ; RabbitMQ offre nativement un routage par message plus riche.

---

## Angular

### Quelle est la différence entre un Component et un Service en Angular ?
- Un **Component** contrôle une partie de l'**interface utilisateur** : il a un template (vue), des styles, et une classe portant la logique de présentation/l'état de cette partie de l'écran — il est instancié à chaque utilisation dans le template (ex. plusieurs `<app-order-card>` sur une page obtiennent chacune leur propre instance).
- Un **Service** porte de la **logique et de l'état réutilisables qui ne sont pas liés à une vue spécifique** — récupération de données (appels HTTP), logique métier, état partagé, mise en cache — et est typiquement un **singleton** injecté partout où nécessaire via la DI d'Angular (`providedIn: 'root'`), donc la même instance (et son état) est partagée par tous les composants qui l'injectent.
- Cette séparation compte pour la même raison que dans toute application en couches : les composants doivent rester légers (présentation uniquement) et déléguer la logique de données/métier aux services — cela garde les composants faciles à tester et à réutiliser, et centralise la logique métier au lieu de la dupliquer entre les vues.

### Que sont les Signals en Angular, et quelles sont les différentes façons de travailler avec eux ?
Les Signals sont la **primitive réactive** plus récente d'Angular (v16+, stabilisée/étendue jusqu'aux v17-v18) pour la gestion d'état — un wrapper autour d'une valeur qui **notifie quiconque la lit lorsqu'elle change**, permettant une détection de changement fine et efficace sans dépendre de Zone.js pour tout vérifier.
- **`signal(valeurInitiale)`** : crée un **signal modifiable (writable)** — on le lit en l'appelant comme une fonction (`count()`), on le met à jour avec `.set(nouvelleValeur)` ou `.update(actuel => ...)`.
- **`computed(() => ...)`** : dérive un **signal en lecture seule** à partir d'un ou plusieurs autres signaux — se recalcule automatiquement (et uniquement) quand un signal qu'il lit change, dans l'esprit d'un sélecteur mémoïsé.
- **`effect(() => ...)`** : exécute un effet de bord automatiquement chaque fois qu'un signal qu'il lit change (ex. synchronisation vers `localStorage`, logging, manipulation impérative du DOM) — à utiliser avec parcimonie, car la plupart des besoins réactifs côté UI s'expriment mieux avec `computed` ou des bindings de template directs.
- **Les inputs de composant basés sur les signals** (`input()`) et **`model()`** (API plus récentes) : permettent aux équivalents `@Input` et aux valeurs liées en deux sens d'être eux-mêmes des signals, intégrant les inputs dans le même système de réactivité plutôt que d'être un mécanisme séparé de l'état interne.
- **Pourquoi c'est important** : comparés aux Observables RxJS (toujours utilisés pour les flux asynchrones comme le HTTP) ou à la détection de changement basée sur Zone.js, les signals offrent une **réactivité synchrone et fine** — Angular peut savoir précisément quelles parties du DOM dépendent d'une valeur modifiée au lieu de revérifier tout l'arbre de composants, ce qui est aussi une étape vers l'abandon par Angular de la dépendance obligatoire à Zone.js.

### Quelle version d'Angular avez-vous utilisée ?
> **Placeholder — à confirmer avant l'entretien** : mon CV liste une expérience Angular sur plusieurs postes (CDTA, Sonelgaz, Poliscrypts, IRIS IMS) entre 2018 et 2025, mais ne précise pas les versions exactes — vérifier mon historique de projets réel/les `package.json` pour les versions précises avant d'en citer une en entretien, plutôt que de deviner.
- Ce que je peux dire de façon générale : mon expérience Angular couvre **plusieurs versions majeures** sur cette période, à mesure que le framework évoluait de l'ère centrée ViewEngine/NgModule vers les plus récents **composants standalone, la nouvelle syntaxe de contrôle de flux (`@if`/`@for`), et les Signals** (v16+ jusqu'aux v17/v18) — je suis à l'aise pour prendre en main les API les plus récentes puisque les concepts centraux d'Angular (composants, DI, RxJS, routing) sont restés cohérents même si la syntaxe de surface s'est modernisée.
- Vu que mon focus est le backend, je le présenterais honnêtement : des bases Angular solides et concrètes issues d'un vrai travail en production, les API les plus récentes basées sur les Signals étant quelque chose sur lequel je voudrais monter en compétence rapidement plutôt que de prétendre à une expérience de production approfondie si je n'ai pas encore livré avec.
