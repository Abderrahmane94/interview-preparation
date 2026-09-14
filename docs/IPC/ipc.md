import TOCInline from '@theme/TOCInline';


# IPC — Personal Interview Prep
# <TOCInline toc={toc} />

> Personal interview prep notes for **Abderrahmane Sardaoui**, tailored to my real background (see CV in the repo root). Keep answers here **consistent** with each other and with the CV — that consistency is the whole point of this page. Placeholders like `[ ... ]` should be filled in with the specific company/project before an actual interview.

## Tell me about yourself
Good morning / afternoon, thank you for the opportunity to introduce myself.

My name is **Abderrahmane Sardaoui**. Outside of work, I'm married and I practice **judo** — it keeps me disciplined, and honestly it mirrors how I like to work: consistent effort, respect for process, and staying open to learning from people more experienced than me.

Professionally, I'm a **backend developer** with **more than 7 years of experience**, mostly in the **Java / Spring ecosystem**. I hold a Master's degree in Computer Science from ESI (Algeria). I've worked across different domains — energy (Sonelgaz), healthcare (CDTA, an EMR system), CRM/consulting (Poliscrypts), intelligent document processing (IRIS IMS, part of Canon Group), and currently spare parts / industrial platforms at **TVH Group**.

Across all these roles, my focus has consistently been **backend development**: designing APIs, modeling data, implementing business logic, and making sure what I ship is reliable, tested, and maintainable — using Spring Boot, Spring Data/Security, Hibernate, PostgreSQL, Kafka, and practices like TDD/DDD/BDD.

## Walk me through your current experience
I currently work as a **Software Developer at TVH Group**, a global company headquartered in Belgium, specializing in spare parts and digital solutions for material handling and industrial equipment, operating large-scale international platforms.

**What I do for the team:**
- Design, develop, and enhance application features aligned with business requirements.
- Investigate and resolve critical defects, focusing on system stability, performance, and reliability.
- Take part in code reviews and technical/architectural discussions — I like making sure decisions are documented and understood by the whole team, not just decided ad-hoc between two people.
- Monitor system performance and help resolve bottlenecks.
- Write BDD tests with **Cucumber/Gherkin** so developers and business stakeholders share the same definition of "done" for a feature.
- Participate in Agile ceremonies: sprint planning, backlog refinement, daily standups.

**Stack**: Java, Spring, Spring Boot, Spring Security, Spring Data, Apache Kafka, PostgreSQL, Helm, Terraform, Jenkins, Git/GitLab, Maven, Jira/Confluence — following TDD/DDD/BDD practices.

## Give me a concrete example of your daily work
> **Tip**: swap in the actual feature name from your current sprint before the interview — keep the structure, replace the specifics.

A typical task looks like this:
1. **Pick up a ticket** during sprint planning/refinement — usually a business feature tied to spare-parts/inventory workflows.
2. **Clarify the requirement** with the product manager if acceptance criteria are ambiguous, then write/refine the **Gherkin scenario** for it.
3. **Implement** the change in a Spring Boot service — an API endpoint or internal logic, persisting through Spring Data/PostgreSQL, and publishing a **Kafka event** if other services need to react.
4. **Test**: unit tests for the logic, the BDD scenario for the behavior, plus a manual sanity check.
5. **Code review**: open a merge request, address feedback, and review teammates' MRs the same day.
6. **Deploy** through the CI/CD pipeline (Jenkins/GitLab) and monitor afterward for regressions.

## What are you looking for in your next role?
I'm specifically looking for a **long-term, stable mission** — I want to join a team and actually see the product evolve over years rather than hop between short engagements. I get (and give) the most value when I can build real context on a codebase and a domain over time, not just parachute in for a few months.

## Why are you interested in data product / data mesh?
- It's a natural evolution of the backend work I already do — treating data as a product with clear ownership, contracts (schemas/APIs), and quality guarantees, rather than a side effect of a service's database.
- My experience with **event-driven integration (Kafka)**, database design (PostgreSQL), and clear service boundaries (DDD/microservices) maps directly onto data mesh principles: domain-oriented ownership, self-serve data infrastructure, and treating data pipelines with the same engineering rigor as application code.
- It's a direction I want to keep growing into — the next step from "backend developer" to someone who also thinks about data as a product, not just a database table behind an API.

## What motivates you about this opportunity specifically?
Two things, honestly: **the project itself** — `[name/domain of the project]` — genuinely excites me because of what it's trying to solve, and **the location**, which is close to home. That combination matters a lot to me right now: I'm looking for stability, and being close to home supports that long-term commitment. It's not about chasing a particular technology — I can learn any stack; what matters is being excited about the problem we're solving and being able to sustain that over the long run.

## What kind of person are you within a team?
I'd describe myself as **sociable and a natural helper**. A few concrete examples from my experience:
- At Sonelgaz, I actively **onboarded new team members**, walking them through the architecture and codebase so they could become productive faster.
- I conducted **user training sessions** so end users — not just developers — felt confident using what we built.
- I regularly do **code reviews**, not to gatekeep but to share context and catch issues early, and I make a point of explaining *why*, not just *what* to change.
- I'd rather unblock a teammate in 5 minutes than let them struggle silently for an hour — I like being the person people feel comfortable asking a "silly question" to.

## You're a backend developer — how do you frame that?
I intentionally focus on **backend development**: API design, business logic, data modeling, integration (Kafka/REST), and system reliability. Earlier in my career I also worked with Angular on the front-end, so I understand the full picture and communicate well with front-end teammates — but my strength, and where I want to keep growing, is backend and architecture, not UI work.

---

## Technical quick-review

### What is CQRS (Command Query Responsibility Segregation)?
CQRS is an architectural pattern that **separates the model used to write data (Commands) from the model used to read data (Queries)**.
- **Commands** change state and return no data (e.g. `CreateOrder`, `UpdateStock`).
- **Queries** return data and never change state (e.g. `GetOrderById`).
- The write side and read side can use **different models, and even different databases**, optimized independently (write side normalized for consistency, read side denormalized for fast queries).

### What problem does CQRS solve, and what are its trade-offs?
- **Problem it solves**: in complex domains, a single model trying to serve both reads and writes efficiently becomes bloated and hard to scale — reads and writes usually have very different performance and shape requirements.
- **Benefits**: independent scaling of read/write workloads, denormalized/tailored read models, clearer separation of concerns.
- **Drawbacks**: added complexity (two models, possibly two data stores), eventual consistency between read and write sides, overkill for simple CRUD apps.

### How does CQRS relate to Event Sourcing?
CQRS and Event Sourcing are **complementary but independent** — CQRS can be used without Event Sourcing.
- **Event Sourcing** persists state as an ordered sequence of **domain events** instead of the current state only.
- Combined with CQRS: the **write side** appends events to an event store (source of truth), and the **read side** is built by **projecting** those events into denormalized read models.
- Gives a full audit trail, but increases complexity and requires handling eventual consistency between the event store and the projections.

### What is the Saga pattern and what problem does it solve?
The Saga pattern manages **data consistency across multiple services** in a distributed system, replacing a single ACID transaction (impossible across service boundaries in microservices) with a **sequence of local transactions**.
- Each service performs its own local transaction and publishes an event/message to trigger the next step.
- If a step fails, the saga runs **compensating transactions** to undo the work already done by previous steps.
- Example: an order saga = reserve stock → charge payment → ship order. If payment fails, a compensating action releases the reserved stock.

### Choreography vs Orchestration for coordinating a Saga?
- **Choreography**: each service listens for events and publishes its own events in reaction — no central coordinator. Loosely coupled, but hard to track/debug as the saga grows.
- **Orchestration**: a central **orchestrator** tells each service what local transaction to execute and handles failures/compensation. Easier to understand/monitor, but the orchestrator can become a bottleneck if not designed carefully.

### How does the Saga pattern relate to eventual consistency?
Because a saga is a sequence of independent local transactions rather than one atomic transaction, the system is only **eventually consistent** — there's a window where some services have been updated and others haven't. Compensating transactions handle failures, but application code (and users) must tolerate temporary inconsistency.

### What are the key design patterns used in a microservices architecture?
- **Decomposition**: Decompose by Business Capability / Subdomain (DDD), **Database per Service**, **Strangler Fig**.
- **Communication**: **API Gateway**, **Service Discovery**, **Backend for Frontend (BFF)**.
- **Data & consistency**: **Saga**, **CQRS**, **Event Sourcing**, Transactional Outbox.
- **Resilience**: **Circuit Breaker**, Retry, Bulkhead, Timeout.
- **Observability**: Log Aggregation, Distributed Tracing, Health Check API.

### What is the API Gateway pattern?
A **single entry point** in front of the microservices that routes client requests to the right backend service(s), handling cross-cutting concerns once (routing, auth, rate limiting, request aggregation, SSL termination) instead of in every service. Can be specialized per client type as a **Backend for Frontend (BFF)**. Trade-off: an extra hop, and a potential single point of failure if not made highly available.

### What is the Circuit Breaker pattern?
Prevents a service from repeatedly calling a **downstream service that is failing or slow**, avoiding cascading failures.
- **Closed**: calls pass through normally.
- **Open**: after too many failures, calls fail fast for a cooldown period.
- **Half-Open**: after cooldown, a few trial calls check if the dependency recovered.
- Often paired with fallback logic and used with Retry/Timeout. Common implementations: Resilience4j, Hystrix (legacy).

### What is the Service Discovery pattern?
Since service instances are **dynamic** (auto-scaled, restarted, IPs change), clients can't hardcode addresses.
- **Client-side discovery**: the client queries a **service registry** (Eureka, Consul) and picks an instance itself.
- **Server-side discovery**: the client calls a **load balancer/router** (cloud LB, Kubernetes Service) which queries the registry and forwards the request.

### What is the Database per Service pattern, and what challenge does it create?
Each microservice owns **its own private database**, accessible only through that service's API.
- Benefits: strong loose coupling, polyglot persistence, independent scaling.
- Challenge: transactions that used to be a single ACID transaction now **span multiple services/databases** — this is exactly why Saga (and CQRS/Event Sourcing/Transactional Outbox) exist.

### What is the Strangler Fig pattern?
A strategy for **incrementally migrating a legacy monolith to microservices** without a big-bang rewrite. New functionality is built as new microservices while a **facade/router** (often an API Gateway) intercepts calls and routes them either to the new service or the still-existing monolith, until the monolith shrinks and can be retired — the system stays functional and releasable at every step.

### What is Apache Kafka?
A **distributed event streaming platform** used to **publish, store, and process streams of records** in real time.
- Built around publish/subscribe, but unlike traditional queues, it **persists messages on disk** and lets consumers re-read them — usable both as a messaging system and a durable event log.
- Use cases: decoupling microservices, real-time analytics, event sourcing, log aggregation.

### What are the core concepts of Kafka (Topic, Partition, Broker, Producer, Consumer)?
- **Topic**: a named stream/category of records.
- **Partition**: a topic is split into partitions, each an **ordered, append-only log** — enables horizontal scaling and parallel consumption.
- **Broker**: a Kafka server storing partitions; a **cluster** is multiple brokers.
- **Producer** / **Consumer**: publish to / read from a topic.
- **Offset**: a record's sequential id within a partition, used to track consumer position.

### How does Kafka guarantee message ordering?
Only **within a single partition**, not across a topic. Records with the **same key** always go to the **same partition** (via key hash), preserving per-key ordering (e.g. all events for one `orderId`). Strict global ordering requires a single partition, at the cost of parallelism.

### What is a Consumer Group, and how does Kafka scale consumption?
A set of consumers sharing a `group.id` that cooperate to consume a topic.
- Kafka assigns each partition to **exactly one consumer** in the group at a time — a topic with N partitions can be consumed in parallel by up to N consumers.
- Different consumer groups are **independent**: each gets its own copy of every message.
- If a consumer fails, Kafka triggers a **rebalance**, reassigning its partitions.

### How does Kafka achieve durability and fault tolerance?
- Each partition has a **replication factor** — replicas stored on multiple brokers.
- One replica is the **leader** (handles reads/writes); others are **followers** replicating from it.
- **In-Sync Replicas (ISR)**: followers caught up with the leader. If the leader fails, a new leader is elected from the ISR set.
- Kafka uses **ZooKeeper** (older) or **KRaft** (newer, ZooKeeper-less) for cluster metadata and leader election.

### `acks=0` vs `acks=1` vs `acks=all` on a Producer?
- **`acks=0`**: no wait for acknowledgment — fastest, but messages can be lost.
- **`acks=1`**: waits for the **leader** to acknowledge — good balance, but data can still be lost if the leader fails before replication.
- **`acks=all`**: waits for **all in-sync replicas** — strongest durability, higher latency.

### How does Kafka compare to a traditional message broker (e.g. RabbitMQ)?
- **Retention**: Kafka retains messages regardless of consumption (replay possible); RabbitMQ typically removes a message once consumed.
- **Model**: Kafka is pull-based/log-based; RabbitMQ is push-based with richer routing (exchanges/queues).
- **Throughput vs features**: Kafka optimized for very high throughput streaming; RabbitMQ offers richer per-message routing/priority out of the box.

### What is the Transactional Outbox pattern, and why is it used with Kafka?
Solves the **dual-write problem**: a service updating its DB **and** publishing a Kafka event can't do both atomically — if it crashes after the DB commit but before publishing, the event is lost.
- **How it works**: the service writes the business change **and** a row describing the event to an **outbox table**, in the **same local DB transaction**.
- A separate process reads the outbox table and publishes to Kafka:
  - **Polling publisher**: periodically queries and publishes new rows.
  - **Change Data Capture (CDC)**, e.g. **Debezium**: tails the DB's write-ahead log and streams new rows automatically — more efficient, lower latency.
- **Guarantee**: **at-least-once delivery** in sync with the DB change — consumers must be **idempotent** to handle possible duplicates.

### What's new in recent Java versions? (interview talking points)
- **Records** (Java 16+): concise immutable data carriers — good to mention for DTOs/value objects.
- **Sealed classes** (Java 17): restrict which classes can extend/implement a type — useful for modeling closed domain hierarchies (pairs well with DDD).
- **Pattern matching for `switch`** (Java 21): exhaustive, type-safe branching, great with sealed types.
- **Virtual threads / Project Loom** (Java 21): lightweight threads for massive concurrency without the complexity of reactive programming — a strong topic if asked about scaling I/O-bound services.
- **Sequenced Collections** (Java 21): unified first/last element access across List/Set/Map.
- **Text blocks** (Java 15+): multi-line string literals, handy for embedded SQL/JSON.

### PL/SQL & PostgreSQL (PL/pgSQL) essentials
- **PL/SQL** is Oracle's procedural extension to SQL (stored procedures, functions, packages, triggers, cursors, exception handling). **PL/pgSQL** is PostgreSQL's equivalent — same procedural concepts, different syntax/engine. If asked about "PL/SQL" in a Postgres context, clarify you're familiar with the *concepts* and specifically PL/pgSQL.
- Be ready to explain: **stored procedure vs. function**, **cursors** (row-by-row processing), **triggers** (BEFORE/AFTER INSERT/UPDATE/DELETE), and **exception handling blocks**.
- Be ready to justify **when to use them** (e.g. enforcing invariants at the DB level, bulk data operations) **vs. when not to** (business logic belongs in the application layer for testability/portability — overusing stored procedures makes logic harder to version and test).

### PostgreSQL deep-dive points
- **Indexing**: B-tree (default), GIN/GiST (full-text search, JSONB, arrays), partial and expression indexes.
- **JSONB**: semi-structured data inside a relational table, indexable with GIN — useful when a strict schema is too rigid for part of the data.
- **EXPLAIN / EXPLAIN ANALYZE**: reading a query plan, spotting sequential scans vs. index scans, understanding cost estimates.
- **MVCC & isolation levels**: how Postgres handles concurrent reads/writes without blocking readers, and the SQL isolation levels (Read Committed is Postgres's default).
- **Partitioning**: splitting large tables (by range/list/hash) for performance and easier maintenance (e.g. time-series data).

### Hexagonal Architecture (Ports & Adapters)
- **Core idea**: the business/domain logic sits at the center, fully isolated from frameworks, databases, and UI. It only talks to the outside world through **ports** (interfaces it defines).
- **Adapters** implement those ports to plug in a concrete technology — a REST controller is a driving/primary adapter (calls into the domain), a JPA repository implementation is a driven/secondary adapter (the domain calls out to it).
- **Why it matters**: the domain can be unit-tested with no DB/framework involved, and swapping infrastructure (e.g. PostgreSQL → another store, REST → Kafka trigger) doesn't touch business logic.
- **Relation to DDD**: hexagonal architecture is the structural pattern that DDD's domain model naturally fits into — the "hexagon" is the domain + application layer; DDD gives you the tools (entities, aggregates, domain events) to design what's inside it.

### Domain-Driven Design (DDD) — key concepts
- **Strategic DDD**:
  - **Bounded Context**: an explicit boundary within which a specific domain model and its terms apply consistently — this is exactly what defines a microservice's scope in a DDD-aligned decomposition.
  - **Ubiquitous Language**: a shared vocabulary between developers and domain experts, used consistently in code and conversation, to avoid translation gaps.
  - **Context Mapping**: how different bounded contexts relate to and integrate with each other (e.g. Shared Kernel, Customer/Supplier, Anti-Corruption Layer).
- **Tactical DDD**:
  - **Entity**: has identity that persists over time, even if its attributes change.
  - **Value Object**: defined only by its attributes, immutable, no identity (e.g. `Money`, `Address`).
  - **Aggregate**: a cluster of entities/value objects treated as a single consistency boundary, with one **Aggregate Root** as the only entry point — enforces invariants.
  - **Repository**: abstraction to load/persist aggregates, hiding persistence details from the domain.
  - **Domain Event**: something meaningful that happened in the domain (`OrderPlaced`) — the natural bridge to event-driven integration (Kafka) and the Saga/CQRS patterns.

### What are the core principles of Data Mesh?
Worth having ready since it's the direction I want to move toward:
- **Domain-oriented ownership**: each business domain owns and is accountable for its own data, the same way it owns its microservices — no central data team as a bottleneck.
- **Data as a product**: data exposed by a domain must have the same quality bar as an API — discoverable, documented, trustworthy, with clear SLAs, not just a raw DB dump.
- **Self-serve data infrastructure platform**: a common platform (storage, pipelines, cataloging, access control) so domain teams can publish/consume data without needing deep infra expertise.
- **Federated computational governance**: global standards (schemas, security, interoperability) are agreed on and automated/enforced across domains, rather than imposed top-down manually.

### Synchronous (REST) vs asynchronous (event-driven/Kafka) communication — when to use which?
- **REST/synchronous**: simple to reason about, immediate response, good for request/response use cases (e.g. "get me this resource now"). Downsides: tighter coupling (caller waits on callee's availability), harder to scale under bursty load, failure cascades if not protected (Circuit Breaker).
- **Event-driven/asynchronous (Kafka)**: services stay decoupled in time (producer doesn't need the consumer to be up), naturally supports multiple subscribers, better for high-throughput/streaming/analytics. Downsides: eventual consistency, harder to trace/debug a business flow, requires idempotent consumers.
- **In practice**: I use REST for direct client-facing queries and event-driven messaging for cross-service state propagation and workflows (Saga-style).

### How does Spring's IoC/DI container work, and why does it matter?
- **Inversion of Control (IoC)**: instead of a class creating its own dependencies (`new SomeService()`), the framework creates and provides them — control over object creation is inverted, given to the container.
- **Dependency Injection (DI)**: the mechanism Spring uses to implement IoC — dependencies are injected via constructor (preferred), setter, or field.
- **Why it matters**: it decouples components from concrete implementations (you depend on interfaces/abstractions), makes unit testing trivial (inject mocks), and lets Spring manage object lifecycle/scope (`singleton`, `prototype`, etc.) centrally.
- **Spring Boot auto-configuration** builds on this: based on what's on the classpath and your properties, Spring Boot automatically registers sensible beans (e.g. a `DataSource` if a JDBC driver is present), which you can always override.

### How does `@Transactional` work in Spring, and what should you know about propagation?
- Spring wraps the annotated method in a **proxy** that starts a transaction before the method runs and commits/rolls back after — this is why `@Transactional` **doesn't work when called from within the same class** (self-invocation bypasses the proxy).
- **Propagation** defines how a transactional method behaves when called from another transactional context — the two most common:
  - `REQUIRED` (default): joins the existing transaction if there is one, or creates a new one.
  - `REQUIRES_NEW`: always starts a new, independent transaction (suspends the current one) — useful for things like audit logging that must persist even if the outer transaction rolls back.
- **Isolation levels** control how concurrent transactions see each other's uncommitted/committed changes (Read Committed is PostgreSQL's default) — relevant when discussing race conditions on shared data.

### What is the N+1 query problem, and how do you fix it with JPA/Hibernate?
- **The problem**: fetching a list of N parent entities, then lazily fetching a related collection/entity for *each* one individually — 1 query for the parents + N queries for the children = N+1 queries, instead of 1 or 2.
- **Fixes**:
  - **`JOIN FETCH`** in JPQL to eagerly load the association in a single query.
  - **`@EntityGraph`** to declare which associations to fetch eagerly for a specific query, without changing the entity's default fetch type.
  - **Batch fetching** (`hibernate.default_batch_fetch_size`) to fetch related entities in batches instead of one-by-one.
- Always default associations to **`LAZY`** and fetch eagerly only where needed per query — defaulting to `EAGER` everywhere is a common source of hidden N+1 problems.

### What are the SOLID principles, and can you give a practical example?
- **S — Single Responsibility**: a class should have one reason to change (e.g. separate a `OrderValidator` from `OrderRepository` rather than mixing validation and persistence).
- **O — Open/Closed**: open for extension, closed for modification — e.g. adding a new payment method via a new `PaymentStrategy` implementation instead of editing a big `if/else` in existing code.
- **L — Liskov Substitution**: a subtype must be usable wherever its base type is expected, without breaking behavior.
- **I — Interface Segregation**: prefer several small, specific interfaces over one large one clients are forced to implement in full.
- **D — Dependency Inversion**: depend on abstractions, not concrete implementations — exactly what Spring's DI enables in practice.

### How do you make a REST API endpoint idempotent, and why does it matter with Kafka/event-driven systems?
- **Idempotent** means calling the same operation multiple times has the same effect as calling it once — critical because networks retry, and Kafka only guarantees **at-least-once delivery**, so consumers *will* occasionally see the same message twice.
- **Techniques**: use a unique **idempotency key** per logical operation (client-generated or from the event id) and store which keys have already been processed before applying the effect again; design writes as **`PUT`-style upserts** rather than `POST`-style "always append"; make side effects naturally idempotent where possible (e.g. "set status to SHIPPED" is idempotent, "increment stock by 1" is not).

### How do you manage database schema changes in a team (Flyway/Liquibase)?
- Schema changes are written as **versioned migration scripts** (e.g. `V1__create_orders_table.sql`) checked into source control alongside the code, and applied automatically on application startup or via CI/CD.
- This keeps the schema **reproducible** across environments (local, staging, prod) and gives a clear **audit trail** of every change, instead of manual, undocumented DB edits.
- Best practices: migrations should be **backward-compatible** during rolling deployments (e.g. add a nullable column first, backfill, then make it `NOT NULL` in a later release) so the old and new application versions can both run against the DB during a deploy.

### How do you approach observability in a distributed/microservices system?
- **Centralized logging**: structured logs (JSON) shipped to a central store (e.g. Elastic) so you can search across all services instead of SSH-ing into individual machines.
- **Correlation/trace ID**: a unique id generated at the entry point of a request and propagated through every downstream service call (and Kafka message header) — the only practical way to reconstruct a business flow that spans multiple services.
- **Metrics & dashboards**: exposing key metrics (latency, error rate, throughput, queue lag) and visualizing them (e.g. Grafana) with alerts on thresholds, rather than discovering problems from user complaints.
- **Health checks**: readiness/liveness endpoints so orchestrators (Kubernetes) can detect and route around unhealthy instances automatically.

### What's the difference between TDD and BDD, and how have you used them together?
- **TDD (Test-Driven Development)**: write a failing unit test first, write the minimal code to pass it, then refactor — a **developer-facing** discipline focused on code correctness at the unit level (red-green-refactor).
- **BDD (Behavior-Driven Development)**: describe expected behavior in a shared, readable format (**Gherkin**: Given/When/Then) that both developers and business stakeholders can understand and agree on *before* implementation — a **collaboration** tool as much as a testing one.
- **In practice**: I use BDD (Cucumber/Gherkin) at the feature/acceptance level to confirm the business behavior is correct and shared with the product owner, and TDD/unit tests underneath to drive the implementation details and edge cases those scenarios don't cover.
