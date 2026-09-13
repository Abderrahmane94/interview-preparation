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

### CQRS, Saga, Kafka Outbox et patrons microservices
Des articles complets existent déjà dans ce dépôt — révisez-les, ne vous contentez pas du résumé ci-dessous :
- [CQRS](../Architecture&CleanCode/architecture-pattern.md#quest-ce-que-le-cqrs-command-query-responsibility-segregation)
- [Patron Saga](../Architecture&CleanCode/architecture-pattern.md#quest-ce-que-le-patron-saga-et-quel-problème-résout-il) (Chorégraphie vs Orchestration)
- [Vue d'ensemble des patrons de conception microservices](../Architecture&CleanCode/architecture-pattern.md#quels-sont-les-principaux-patrons-de-conception-utilisés-dans-une-architecture-microservices) — API Gateway, Circuit Breaker, Service Discovery, Database per Service, Strangler Fig
- [Fondamentaux de Kafka](../Kafka/kafka.md) — topics/partitions, consumer groups, ordre, réplication, `acks`
- [Patron Transactional Outbox](../Kafka/kafka.md#quest-ce-que-le-patron-transactional-outbox-et-pourquoi-est-il-utilisé-avec-kafka) — revient souvent quand on parle de Kafka et de cohérence avec la base de données, soyez prêt.

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
