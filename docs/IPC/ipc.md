---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';


# IPC — Personal Interview Prep
# <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

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

### CQRS

#### What is CQRS (Command Query Responsibility Segregation)?
CQRS is an architectural pattern that **separates the model used to write data (Commands) from the model used to read data (Queries)**.
- **Commands** change state and return no data (e.g. `CreateOrder`, `UpdateStock`).
- **Queries** return data and never change state (e.g. `GetOrderById`).
- The write side and read side can use **different models, and even different databases**, optimized independently (write side normalized for consistency, read side denormalized for fast queries).

#### What problem does CQRS solve, and what are its trade-offs?
- **Problem it solves**: in complex domains, a single model trying to serve both reads and writes efficiently becomes bloated and hard to scale — reads and writes usually have very different performance and shape requirements.
- **Benefits**: independent scaling of read/write workloads, denormalized/tailored read models, clearer separation of concerns.
- **Drawbacks**: added complexity (two models, possibly two data stores), eventual consistency between read and write sides, overkill for simple CRUD apps.

#### How does CQRS relate to Event Sourcing?
CQRS and Event Sourcing are **complementary but independent** — CQRS can be used without Event Sourcing.
- **Event Sourcing** persists state as an ordered sequence of **domain events** instead of the current state only.
- Combined with CQRS: the **write side** appends events to an event store (source of truth), and the **read side** is built by **projecting** those events into denormalized read models.
- Gives a full audit trail, but increases complexity and requires handling eventual consistency between the event store and the projections.

### Saga

#### What is the Saga pattern and what problem does it solve?
The Saga pattern manages **data consistency across multiple services** in a distributed system, replacing a single ACID transaction (impossible across service boundaries in microservices) with a **sequence of local transactions**.
- Each service performs its own local transaction and publishes an event/message to trigger the next step.
- If a step fails, the saga runs **compensating transactions** to undo the work already done by previous steps.
- Example: an order saga = reserve stock → charge payment → ship order. If payment fails, a compensating action releases the reserved stock.

#### Choreography vs Orchestration for coordinating a Saga?
- **Choreography**: each service listens for events and publishes its own events in reaction — no central coordinator. Loosely coupled, but hard to track/debug as the saga grows.
- **Orchestration**: a central **orchestrator** tells each service what local transaction to execute and handles failures/compensation. Easier to understand/monitor, but the orchestrator can become a bottleneck if not designed carefully.

#### How does the Saga pattern relate to eventual consistency?
Because a saga is a sequence of independent local transactions rather than one atomic transaction, the system is only **eventually consistent** — there's a window where some services have been updated and others haven't. Compensating transactions handle failures, but application code (and users) must tolerate temporary inconsistency.

### Microservices Design Patterns

#### What are the key design patterns used in a microservices architecture?
- **Decomposition**: Decompose by Business Capability / Subdomain (DDD), **Database per Service**, **Strangler Fig**.
- **Communication**: **API Gateway**, **Service Discovery**, **Backend for Frontend (BFF)**.
- **Data & consistency**: **Saga**, **CQRS**, **Event Sourcing**, Transactional Outbox.
- **Resilience**: **Circuit Breaker**, Retry, Bulkhead, Timeout.
- **Observability**: Log Aggregation, Distributed Tracing, Health Check API.

#### What is the API Gateway pattern?
A **single entry point** in front of the microservices that routes client requests to the right backend service(s), handling cross-cutting concerns once (routing, auth, rate limiting, request aggregation, SSL termination) instead of in every service. Can be specialized per client type as a **Backend for Frontend (BFF)**. Trade-off: an extra hop, and a potential single point of failure if not made highly available.

#### What is the Circuit Breaker pattern?
Prevents a service from repeatedly calling a **downstream service that is failing or slow**, avoiding cascading failures.
- **Closed**: calls pass through normally.
- **Open**: after too many failures, calls fail fast for a cooldown period.
- **Half-Open**: after cooldown, a few trial calls check if the dependency recovered.
- Often paired with fallback logic and used with Retry/Timeout. Common implementations: Resilience4j, Hystrix (legacy).

#### What is the Service Discovery pattern?
Since service instances are **dynamic** (auto-scaled, restarted, IPs change), clients can't hardcode addresses.
- **Client-side discovery**: the client queries a **service registry** (Eureka, Consul) and picks an instance itself.
- **Server-side discovery**: the client calls a **load balancer/router** (cloud LB, Kubernetes Service) which queries the registry and forwards the request.

#### What is the Database per Service pattern, and what challenge does it create?
Each microservice owns **its own private database**, accessible only through that service's API.
- Benefits: strong loose coupling, polyglot persistence, independent scaling.
- Challenge: transactions that used to be a single ACID transaction now **span multiple services/databases** — this is exactly why Saga (and CQRS/Event Sourcing/Transactional Outbox) exist.

#### What is the Strangler Fig pattern?
A strategy for **incrementally migrating a legacy monolith to microservices** without a big-bang rewrite. New functionality is built as new microservices while a **facade/router** (often an API Gateway) intercepts calls and routes them either to the new service or the still-existing monolith, until the monolith shrinks and can be retired — the system stays functional and releasable at every step.

### Kafka

#### What is Apache Kafka?
A **distributed event streaming platform** used to **publish, store, and process streams of records** in real time.
- Built around publish/subscribe, but unlike traditional queues, it **persists messages on disk** and lets consumers re-read them — usable both as a messaging system and a durable event log.
- Use cases: decoupling microservices, real-time analytics, event sourcing, log aggregation.

#### What are the core concepts of Kafka (Topic, Partition, Broker, Producer, Consumer)?
- **Topic**: a named stream/category of records.
- **Partition**: a topic is split into partitions, each an **ordered, append-only log** — enables horizontal scaling and parallel consumption.
- **Broker**: a Kafka server storing partitions; a **cluster** is multiple brokers.
- **Producer** / **Consumer**: publish to / read from a topic.
- **Offset**: a record's sequential id within a partition, used to track consumer position.

#### How does Kafka guarantee message ordering?
Only **within a single partition**, not across a topic. Records with the **same key** always go to the **same partition** (via key hash), preserving per-key ordering (e.g. all events for one `orderId`). Strict global ordering requires a single partition, at the cost of parallelism.

#### What is a Consumer Group, and how does Kafka scale consumption?
A set of consumers sharing a `group.id` that cooperate to consume a topic.
- Kafka assigns each partition to **exactly one consumer** in the group at a time — a topic with N partitions can be consumed in parallel by up to N consumers.
- Different consumer groups are **independent**: each gets its own copy of every message.
- If a consumer fails, Kafka triggers a **rebalance**, reassigning its partitions.

#### How does Kafka achieve durability and fault tolerance?
- Each partition has a **replication factor** — replicas stored on multiple brokers.
- One replica is the **leader** (handles reads/writes); others are **followers** replicating from it.
- **In-Sync Replicas (ISR)**: followers caught up with the leader. If the leader fails, a new leader is elected from the ISR set.
- Kafka uses **ZooKeeper** (older) or **KRaft** (newer, ZooKeeper-less) for cluster metadata and leader election.

#### `acks=0` vs `acks=1` vs `acks=all` on a Producer?
- **`acks=0`**: no wait for acknowledgment — fastest, but messages can be lost.
- **`acks=1`**: waits for the **leader** to acknowledge — good balance, but data can still be lost if the leader fails before replication.
- **`acks=all`**: waits for **all in-sync replicas** — strongest durability, higher latency.

#### How does Kafka compare to a traditional message broker (e.g. RabbitMQ)?
- **Retention**: Kafka retains messages regardless of consumption (replay possible); RabbitMQ typically removes a message once consumed.
- **Model**: Kafka is pull-based/log-based; RabbitMQ is push-based with richer routing (exchanges/queues).
- **Throughput vs features**: Kafka optimized for very high throughput streaming; RabbitMQ offers richer per-message routing/priority out of the box.

#### What is the Transactional Outbox pattern, and why is it used with Kafka?
Solves the **dual-write problem**: a service updating its DB **and** publishing a Kafka event can't do both atomically — if it crashes after the DB commit but before publishing, the event is lost.
- **How it works**: the service writes the business change **and** a row describing the event to an **outbox table**, in the **same local DB transaction**.
- A separate process reads the outbox table and publishes to Kafka:
  - **Polling publisher**: periodically queries and publishes new rows.
  - **Change Data Capture (CDC)**, e.g. **Debezium**: tails the DB's write-ahead log and streams new rows automatically — more efficient, lower latency.
- **Guarantee**: **at-least-once delivery** in sync with the DB change — consumers must be **idempotent** to handle possible duplicates.

### Data Mesh & Integration Style

#### What are the core principles of Data Mesh?
Worth having ready since it's the direction I want to move toward:
- **Domain-oriented ownership**: each business domain owns and is accountable for its own data, the same way it owns its microservices — no central data team as a bottleneck.
- **Data as a product**: data exposed by a domain must have the same quality bar as an API — discoverable, documented, trustworthy, with clear SLAs, not just a raw DB dump.
- **Self-serve data infrastructure platform**: a common platform (storage, pipelines, cataloging, access control) so domain teams can publish/consume data without needing deep infra expertise.
- **Federated computational governance**: global standards (schemas, security, interoperability) are agreed on and automated/enforced across domains, rather than imposed top-down manually.

#### Synchronous (REST) vs asynchronous (event-driven/Kafka) communication — when to use which?
- **REST/synchronous**: simple to reason about, immediate response, good for request/response use cases (e.g. "get me this resource now"). Downsides: tighter coupling (caller waits on callee's availability), harder to scale under bursty load, failure cascades if not protected (Circuit Breaker).
- **Event-driven/asynchronous (Kafka)**: services stay decoupled in time (producer doesn't need the consumer to be up), naturally supports multiple subscribers, better for high-throughput/streaming/analytics. Downsides: eventual consistency, harder to trace/debug a business flow, requires idempotent consumers.
- **In practice**: I use REST for direct client-facing queries and event-driven messaging for cross-service state propagation and workflows (Saga-style).

### Domain-Driven Design (DDD)

#### What is Domain-Driven Design (DDD)?
DDD is an approach to software design that focuses on **modeling software to closely match a real business domain**, developed in close collaboration with domain experts rather than designed in isolation by engineers.
- Its core premise: for complex business domains, the biggest risk isn't the technology — it's building the **wrong model** of the problem. DDD tackles that by putting domain understanding at the center of the design process.
- It's split into two halves: **strategic DDD** (how to carve up a large domain into well-bounded pieces — Bounded Context, Ubiquitous Language, Context Mapping) and **tactical DDD** (the building blocks used to model *inside* one of those pieces — Entities, Value Objects, Aggregates, Repositories, Domain Events).
- I see it less as "extra rules to follow" and more as a discipline for keeping the code's vocabulary and structure honest to how the business actually thinks about the problem — which pays off directly when decomposing a system into microservices.

#### DDD — key concepts
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

#### What's the difference between an Entity and a Value Object, with an example?
- An **Entity** is defined by its **identity** (an id), which persists even if every attribute changes over time — e.g. a `Customer` is still the same customer after they change their address or name.
- A **Value Object** is defined entirely by its **attributes**, has no identity of its own, and is **immutable** — e.g. `Money(amount, currency)` or `Address(street, city, zip)`. Two `Money` objects with the same amount/currency are interchangeable; you never "update" a Value Object, you replace it.
- Practical rule of thumb: if two instances with identical data should be considered the *same thing*, it's a Value Object; if they should still be distinguishable (like two customers who happen to share a name), it's an Entity.

#### How do you decide the boundaries of an Aggregate?
- An Aggregate should be the **smallest cluster of objects that must stay consistent together** within a single transaction — not "everything conceptually related."
- Rule of thumb I follow: **reference other aggregates by id only**, never hold a direct object reference — this keeps aggregates small and avoids loading half the object graph to change one field.
- Example: an `Order` aggregate holds its `OrderLines` (they can't exist meaningfully without the order and must stay consistent with it — e.g. total must match line items), but it references `Customer` and `Product` only by id, since those are separate aggregates with their own lifecycle and consistency rules.
- Smaller aggregates mean **less lock contention** and better scalability; oversized aggregates are a common source of performance and concurrency problems.

#### What's the difference between a Domain Service and an Application Service?
- A **Domain Service** contains **business logic that doesn't naturally belong to a single Entity or Value Object** — e.g. a `PricingService` that calculates a discount based on rules spanning multiple aggregates. It's still pure domain logic, framework-agnostic.
- An **Application Service** (sometimes called a use case) **orchestrates** a use case: it loads aggregates via repositories, calls domain logic/domain services, handles transactions, and publishes events — but it contains **no business rules itself**, just coordination.
- Keeping this split explicit prevents business logic from leaking into controllers or infrastructure code — a mistake I actively watch for in code review.

#### What is an Anti-Corruption Layer, and when do you need one?
- An **Anti-Corruption Layer (ACL)** is a translation layer placed at the boundary between your Bounded Context and an external system (a legacy system, a third-party API, another team's service) with a different or messy model.
- It converts the external system's model/language into your own domain's Ubiquitous Language, so external concepts, naming, and quirks don't leak into and "corrupt" your clean domain model.
- I'd reach for one when integrating with a legacy system I don't control, or a vendor API whose data shapes don't match how my domain actually thinks about the problem — better to isolate the mess at one boundary than scatter workarounds through the codebase.

#### How does a Bounded Context map to a microservice in practice?
- In a DDD-aligned decomposition, each **Bounded Context** typically becomes one **microservice** (or a small, cohesive group of services) — the service boundary and the model boundary line up, which is what keeps each service's domain model coherent and independently evolvable.
- This is why "decompose by business capability/subdomain" (from the microservices patterns list) and "Bounded Context" are really the same idea seen from two angles — one from architecture, one from domain modeling.
- Getting this wrong (e.g. splitting services along technical layers instead of business capabilities) is a common cause of chatty, tightly-coupled "distributed monoliths."

### Hexagonal Architecture

#### Hexagonal Architecture (Ports & Adapters)
- **Core idea**: the business/domain logic sits at the center, fully isolated from frameworks, databases, and UI. It only talks to the outside world through **ports** (interfaces it defines).
- **Adapters** implement those ports to plug in a concrete technology — a REST controller is a driving/primary adapter (calls into the domain), a JPA repository implementation is a driven/secondary adapter (the domain calls out to it).
- **Why it matters**: the domain can be unit-tested with no DB/framework involved, and swapping infrastructure (e.g. PostgreSQL → another store, REST → Kafka trigger) doesn't touch business logic.
- **Relation to DDD**: hexagonal architecture is the structural pattern that DDD's domain model naturally fits into — the "hexagon" is the domain + application layer; DDD gives you the tools (entities, aggregates, domain events) to design what's inside it.

#### How does Hexagonal Architecture differ from a traditional layered (N-tier) architecture?
- **Layered architecture** typically has strict top-down dependencies: UI → Service → Repository → Database, where the domain/business layer often ends up **depending on the persistence layer** (e.g. domain classes annotated with JPA annotations) — infrastructure concerns leak inward.
- **Hexagonal architecture inverts that dependency**: the domain defines **ports** (interfaces) it needs, and infrastructure (DB, REST, messaging) implements them as adapters — dependencies point **inward**, toward the domain, not outward toward infrastructure. This is the same idea as the Dependency Inversion Principle (the "D" in SOLID), applied at the architecture level.
- Practical consequence: in a layered architecture, swapping the database usually means touching the domain/service layer; in hexagonal, it only means writing a new adapter.

#### Can you give concrete examples of driving vs. driven adapters?
- **Driving (primary) adapters** — things that call *into* the application: a REST controller, a Kafka `@KafkaListener` consumer, a scheduled job, a CLI command. They translate an external trigger into a call on the application's port (use case).
- **Driven (secondary) adapters** — things the application calls *out* to: a JPA repository implementation, a Kafka producer, an email-sending client, a call to an external payment API. They implement a port the domain/application layer defined.
- Both sides depend on the hexagon (the domain/application core) through ports — the domain never depends on Spring, JPA, or Kafka classes directly.

#### How would you structure packages for a hexagonal Spring Boot application?
A common layout I've used:
- `domain/` — entities, value objects, aggregates, domain services, domain events, and the **port interfaces** (e.g. `OrderRepository`, `PaymentGateway`) — zero framework dependencies, plain Java.
- `application/` — application services/use cases that orchestrate the domain via ports, handle transactions (`@Transactional`).
- `adapter/in/web/` — REST controllers (driving adapters) calling into application services.
- `adapter/in/messaging/` — Kafka consumers (driving adapters).
- `adapter/out/persistence/` — JPA repository implementations of the domain's port interfaces (driven adapters).
- `adapter/out/messaging/` — Kafka producers implementing an outbound port (driven adapters).
- The dependency rule to enforce: `domain` has no dependency on `adapter` or frameworks; `adapter` depends on `domain`/`application`, never the reverse.

#### How does Hexagonal Architecture make testing easier in practice?
- Because the domain only depends on **ports (interfaces)**, tests can provide **in-memory/fake implementations** of those ports instead of a real database or message broker — fast, deterministic unit tests for business logic with zero infrastructure setup.
- Integration tests are then narrowed to **just the adapters** (e.g. `@DataJpaTest` for the persistence adapter, a Testcontainers-backed test for the Kafka adapter), each verified in isolation rather than through one slow end-to-end test.
- This mirrors how I approach TDD/BDD: fast unit tests around the domain, a smaller number of focused integration tests around the edges.

#### Is Hexagonal Architecture the same as Clean Architecture or Onion Architecture?
They're **variations of the same core idea** — dependencies point inward toward the domain, infrastructure is kept at the edges — but with slightly different framings:
- **Hexagonal (Ports & Adapters)**: emphasizes symmetry between "driving" and "driven" sides, all through ports.
- **Onion Architecture**: describes it as concentric layers (domain core → domain services → application services → infrastructure), making the *layering* more explicit.
- **Clean Architecture** (Uncle Bob): adds explicit **use case** and **interface adapter** layers with a strong emphasis on the Dependency Rule ("source code dependencies only point inward").
- In interviews I treat them as the same family of architecture and focus on the shared principle (dependency inversion, domain isolation) rather than debating naming — that's what actually matters day to day.

### Spring & Spring Boot

#### How does Spring's IoC/DI container work, and why does it matter?
- **Inversion of Control (IoC)**: instead of a class creating its own dependencies (`new SomeService()`), the framework creates and provides them — control over object creation is inverted, given to the container.
- **Dependency Injection (DI)**: the mechanism Spring uses to implement IoC — dependencies are injected via constructor (preferred), setter, or field.
- **Why it matters**: it decouples components from concrete implementations (you depend on interfaces/abstractions), makes unit testing trivial (inject mocks), and lets Spring manage object lifecycle/scope (`singleton`, `prototype`, etc.) centrally.
- **Spring Boot auto-configuration** builds on this: based on what's on the classpath and your properties, Spring Boot automatically registers sensible beans (e.g. a `DataSource` if a JDBC driver is present), which you can always override.

#### How does `@Transactional` work in Spring, and what should you know about propagation?
- Spring wraps the annotated method in a **proxy** that starts a transaction before the method runs and commits/rolls back after — this is why `@Transactional` **doesn't work when called from within the same class** (self-invocation bypasses the proxy).
- **Propagation** defines how a transactional method behaves when called from another transactional context — the two most common:
  - `REQUIRED` (default): joins the existing transaction if there is one, or creates a new one.
  - `REQUIRES_NEW`: always starts a new, independent transaction (suspends the current one) — useful for things like audit logging that must persist even if the outer transaction rolls back.
- **Isolation levels** control how concurrent transactions see each other's uncommitted/committed changes (Read Committed is PostgreSQL's default) — relevant when discussing race conditions on shared data.

#### How does Spring Security handle authentication and authorization (JWT/OAuth2)?
- **Authentication** (who are you) typically flows through a **filter chain**: a request hits a `UsernamePasswordAuthenticationFilter` or a custom **JWT filter** that validates the token and populates the `SecurityContext`.
- **JWT-based auth**: the client sends a signed token (usually in the `Authorization: Bearer` header); the server validates the signature/expiry **statelessly**, without a server-side session — a good fit for microservices since any instance can validate the token independently.
- **OAuth2/OpenID Connect**: delegates authentication to an identity provider (e.g. Keycloak, Azure AD) — the app trusts tokens issued by that provider instead of managing credentials itself.
- **Authorization**: method-level (`@PreAuthorize`) or URL-level rules based on roles/authorities extracted from the token/session.

#### How do Spring Data repositories work, and what are derived query methods?
- Spring Data generates the implementation of a repository **interface** at runtime — you only declare the contract (e.g. `extends JpaRepository<Order, Long>`), and Spring provides CRUD + paging/sorting for free.
- **Derived query methods**: naming a method `findByStatusAndCreatedAtAfter(...)` makes Spring Data parse the method name and generate the corresponding query automatically — convenient for simple queries, but for anything complex I prefer an explicit `@Query` (JPQL or native SQL) for readability and control.
- **Paging/sorting**: pass a `Pageable`/`Sort` parameter and Spring Data handles the `LIMIT`/`OFFSET` and `ORDER BY` for you.

#### What's your approach to exception handling in a Spring Boot application?
- **Checked vs unchecked**: I generally favor unchecked (runtime) exceptions for business errors in Spring apps, since checked exceptions clutter method signatures across layers without adding much safety.
- **Centralized handling**: a `@ControllerAdvice` with `@ExceptionHandler` methods maps domain exceptions to proper HTTP status codes and a consistent error response body, instead of scattering try/catch across controllers.
- **Fail with meaning**: custom exceptions (`OrderNotFoundException`, `InsufficientStockException`) instead of generic `RuntimeException`, so the error is self-documenting and easy to map to the right response/log level.
- Never swallow an exception silently (empty `catch` block) — at minimum log it with enough context to debug later.

### JPA / Hibernate

#### What is the N+1 query problem, and how do you fix it with JPA/Hibernate?
- **The problem**: fetching a list of N parent entities, then lazily fetching a related collection/entity for *each* one individually — 1 query for the parents + N queries for the children = N+1 queries, instead of 1 or 2.
- **Fixes**:
  - **`JOIN FETCH`** in JPQL to eagerly load the association in a single query.
  - **`@EntityGraph`** to declare which associations to fetch eagerly for a specific query, without changing the entity's default fetch type.
  - **Batch fetching** (`hibernate.default_batch_fetch_size`) to fetch related entities in batches instead of one-by-one.
- Always default associations to **`LAZY`** and fetch eagerly only where needed per query — defaulting to `EAGER` everywhere is a common source of hidden N+1 problems.

### Design Principles (SOLID & GoF Patterns)

#### What are the SOLID principles, and can you give a practical example?
- **S — Single Responsibility**: a class should have one reason to change (e.g. separate a `OrderValidator` from `OrderRepository` rather than mixing validation and persistence).
- **O — Open/Closed**: open for extension, closed for modification — e.g. adding a new payment method via a new `PaymentStrategy` implementation instead of editing a big `if/else` in existing code.
- **L — Liskov Substitution**: a subtype must be usable wherever its base type is expected, without breaking behavior.
- **I — Interface Segregation**: prefer several small, specific interfaces over one large one clients are forced to implement in full.
- **D — Dependency Inversion**: depend on abstractions, not concrete implementations — exactly what Spring's DI enables in practice.

#### Can you name the main GoF design pattern categories with an example you've used?
- **Creational** (object creation): e.g. **Builder** for constructing a complex object step by step (common with immutable DTOs), **Factory Method** to decide which implementation to instantiate based on a type.
- **Structural** (composition of classes/objects): e.g. **Adapter** to make an external API's client match an interface my code expects, **Facade** to expose a simple interface over a complex subsystem.
- **Behavioral** (interaction/responsibility): e.g. **Strategy** to swap an algorithm (like different payment or pricing rules) without conditionals, **Observer** for publishing domain events to multiple listeners.
- I treat patterns as **tools to name a solution**, not a goal in themselves — I introduce one when it reduces complexity, not to look sophisticated.

### API Design

#### How do you make a REST API endpoint idempotent, and why does it matter with Kafka/event-driven systems?
- **Idempotent** means calling the same operation multiple times has the same effect as calling it once — critical because networks retry, and Kafka only guarantees **at-least-once delivery**, so consumers *will* occasionally see the same message twice.
- **Techniques**: use a unique **idempotency key** per logical operation (client-generated or from the event id) and store which keys have already been processed before applying the effect again; design writes as **`PUT`-style upserts** rather than `POST`-style "always append"; make side effects naturally idempotent where possible (e.g. "set status to SHIPPED" is idempotent, "increment stock by 1" is not).

#### What are the key principles of good REST API design?
- **Resource-oriented URLs** (`/orders/{id}`, not `/getOrder?id=`), proper **HTTP verbs** (GET/POST/PUT/PATCH/DELETE) and **status codes** (201 on creation, 404 vs 400 vs 409, etc.) that convey meaning without reading the response body.
- **Consistency**: predictable naming, pagination, filtering, and error response shape across all endpoints — a client shouldn't have to guess.
- **Versioning**: plan for breaking changes from day one (URL or header-based versioning) rather than retrofitting it under pressure later.
- **Statelessness**: each request carries everything needed to process it (auth token, params) — no server-side session state, which is also what makes horizontal scaling straightforward.

### Testing

#### What's the difference between TDD and BDD, and how have you used them together?
- **TDD (Test-Driven Development)**: write a failing unit test first, write the minimal code to pass it, then refactor — a **developer-facing** discipline focused on code correctness at the unit level (red-green-refactor).
- **BDD (Behavior-Driven Development)**: describe expected behavior in a shared, readable format (**Gherkin**: Given/When/Then) that both developers and business stakeholders can understand and agree on *before* implementation — a **collaboration** tool as much as a testing one.
- **In practice**: I use BDD (Cucumber/Gherkin) at the feature/acceptance level to confirm the business behavior is correct and shared with the product owner, and TDD/unit tests underneath to drive the implementation details and edge cases those scenarios don't cover.

#### How do you approach unit testing with JUnit and Mockito?
- **Unit tests** isolate a single class/method — any collaborator (repository, external client) is replaced with a **mock** (Mockito) so the test verifies *this* unit's logic, not its dependencies.
- I follow **Arrange-Act-Assert**: set up the mocks/inputs, call the method under test, assert the outcome (return value, and/or that a mock was called with the right arguments via `verify()`).
- I avoid over-mocking — mocking every single collaborator (including simple value objects) makes tests brittle and coupled to implementation details rather than behavior.
- For persistence-layer logic, I complement unit tests with a smaller number of **integration tests** (e.g. `@DataJpaTest` with a real/test DB) since mocking the ORM itself gives false confidence.

### Java

#### What's new in recent Java versions? (interview talking points)
- **Records** (Java 16+): concise immutable data carriers — good to mention for DTOs/value objects.
- **Sealed classes** (Java 17): restrict which classes can extend/implement a type — useful for modeling closed domain hierarchies (pairs well with DDD).
- **Pattern matching for `switch`** (Java 21): exhaustive, type-safe branching, great with sealed types.
- **Virtual threads / Project Loom** (Java 21): lightweight threads for massive concurrency without the complexity of reactive programming — a strong topic if asked about scaling I/O-bound services.
- **Sequenced Collections** (Java 21): unified first/last element access across List/Set/Map.
- **Text blocks** (Java 15+): multi-line string literals, handy for embedded SQL/JSON.

#### What Java Streams/lambda features do you use day to day?
- **Streams** for declarative collection processing: `filter`, `map`, `collect(Collectors.toList()/groupingBy(...))` instead of manual loops — more readable and less error-prone for transformations/aggregations.
- **Optional** to make the absence of a value explicit in the API and avoid unchecked `NullPointerException`s — I avoid calling `.get()` blindly and prefer `.map()/.orElseThrow()`.
- **Method references** (`Order::getStatus`) as a more concise alternative to a one-line lambda.
- Caveat I keep in mind: streams aren't always more performant than a plain loop for simple cases, and deeply chained/nested streams can hurt readability — I use them where they clarify intent, not everywhere by default.

#### How do you handle concurrency/multithreading in Java?
- I prefer higher-level abstractions over raw `Thread`/`synchronized` where possible: **`ExecutorService`** for managing thread pools, **`CompletableFuture`** for composing asynchronous, non-blocking pipelines.
- For shared mutable state, I reach for **`java.util.concurrent`** utilities (`ConcurrentHashMap`, `AtomicInteger`, `ReentrantLock`) rather than manual `synchronized` blocks, which are more error-prone and harder to reason about.
- Awareness of **Java 21 virtual threads**: for I/O-bound workloads (typical of backend services calling DBs/APIs), virtual threads let you write simple blocking-style code that scales like async code, without the complexity of reactive programming.

### Databases (PL/SQL, PostgreSQL & Migrations)

#### PL/SQL & PostgreSQL (PL/pgSQL) essentials
- **PL/SQL** is Oracle's procedural extension to SQL (stored procedures, functions, packages, triggers, cursors, exception handling). **PL/pgSQL** is PostgreSQL's equivalent — same procedural concepts, different syntax/engine. If asked about "PL/SQL" in a Postgres context, clarify you're familiar with the *concepts* and specifically PL/pgSQL.
- Be ready to explain: **stored procedure vs. function**, **cursors** (row-by-row processing), **triggers** (BEFORE/AFTER INSERT/UPDATE/DELETE), and **exception handling blocks**.
- Be ready to justify **when to use them** (e.g. enforcing invariants at the DB level, bulk data operations) **vs. when not to** (business logic belongs in the application layer for testability/portability — overusing stored procedures makes logic harder to version and test).

#### PostgreSQL deep-dive points
- **Indexing**: B-tree (default), GIN/GiST (full-text search, JSONB, arrays), partial and expression indexes.
- **JSONB**: semi-structured data inside a relational table, indexable with GIN — useful when a strict schema is too rigid for part of the data.
- **EXPLAIN / EXPLAIN ANALYZE**: reading a query plan, spotting sequential scans vs. index scans, understanding cost estimates.
- **MVCC & isolation levels**: how Postgres handles concurrent reads/writes without blocking readers, and the SQL isolation levels (Read Committed is Postgres's default).
- **Partitioning**: splitting large tables (by range/list/hash) for performance and easier maintenance (e.g. time-series data).

#### How do you manage database schema changes in a team (Flyway/Liquibase)?
- Schema changes are written as **versioned migration scripts** (e.g. `V1__create_orders_table.sql`) checked into source control alongside the code, and applied automatically on application startup or via CI/CD.
- This keeps the schema **reproducible** across environments (local, staging, prod) and gives a clear **audit trail** of every change, instead of manual, undocumented DB edits.
- Best practices: migrations should be **backward-compatible** during rolling deployments (e.g. add a nullable column first, backfill, then make it `NOT NULL` in a later release) so the old and new application versions can both run against the DB during a deploy.

### Git, Build & CI/CD

#### What's your Git branching strategy, and how do you handle merge vs rebase?
- I've worked with **Gitflow** (feature/develop/release/main branches) and simpler **trunk-based / feature-branch** workflows depending on the team — the right choice depends on release cadence, not personal preference.
- **Merge** preserves full history and is safe for shared branches; **rebase** rewrites history onto the latest base for a **cleaner, linear log** — I rebase my own feature branches before opening a merge request, but never rebase a branch others are already building on.
- I keep merge requests small and focused, since large MRs are both harder to review and more likely to hide bugs.

#### What does the Maven build lifecycle look like, and how do you manage dependencies?
- Maven's default lifecycle runs phases in order: `validate → compile → test → package → verify → install → deploy`. Running e.g. `mvn package` runs every phase up to and including `package`.
- **Dependency management**: declared in `pom.xml`, resolved transitively from repositories (local cache → remote/Nexus/Artifactory) — conflicts are resolved by Maven's "nearest wins" rule, which is why `mvn dependency:tree` is essential for debugging version clashes.
- **Multi-module projects**: a parent POM centralizes shared dependency/plugin versions (`dependencyManagement`), so child modules stay consistent without repeating version numbers.

#### How do you design a CI/CD pipeline (e.g. with Jenkins/GitLab)?
- Typical stages: **build → unit test → static analysis (SonarQube/lint) → package/containerize → integration/BDD tests → deploy to a staging env → (manual or automated) deploy to prod**.
- Fail fast: cheap/fast checks (compile, unit tests) run before expensive ones (integration tests, deployment) so feedback comes quickly.
- I favor **small, frequent deployments** over big-bang releases — smaller changes are easier to review, test, and roll back if something goes wrong.
- Secrets/credentials are never hardcoded in the pipeline — they come from a vault/credentials store injected at runtime.

### Containers & Infrastructure

#### What's the difference between Docker and Podman, and what makes a good Dockerfile?
- **Docker** uses a client-server model with a background **daemon** running as root by default; **Podman** is **daemonless** and supports fully **rootless** containers, which is a meaningful security advantage in shared/regulated environments — the CLI is close to a drop-in replacement (`podman` mirrors most `docker` commands).
- Good **Dockerfile** habits: use a **multi-stage build** (build the app in one stage, copy only the final artifact into a slim runtime image) to keep the image small; pin base image versions instead of `latest`; run as a **non-root user**; order instructions so rarely-changing layers (dependency install) come before frequently-changing ones (application code) to maximize layer-cache reuse.

#### How would you explain Kubernetes basics (Pod, Deployment, Service) in an interview?
- **Pod**: the smallest deployable unit — one or more tightly-coupled containers sharing network/storage. Pods are **ephemeral**; you don't manage them directly in practice.
- **Deployment**: manages a set of identical Pod replicas, handles rolling updates and rollbacks, and keeps the desired replica count running (restarts failed Pods automatically).
- **Service**: a stable network endpoint (virtual IP/DNS name) in front of a dynamic set of Pods — since Pod IPs change constantly, the Service is what other components actually talk to (this is Kubernetes' built-in **Service Discovery**).
- **Health checks** (`readinessProbe`/`livenessProbe`) let Kubernetes know when a Pod is ready to receive traffic or needs to be restarted — directly relevant to the resilience patterns discussed earlier (Circuit Breaker complements this at the application level).

#### Why use Helm, and what problem does it solve?
- Helm is a **package manager for Kubernetes**: a **chart** bundles a set of Kubernetes manifests (Deployment, Service, ConfigMap, etc.) as a reusable, versioned, parameterized template instead of maintaining raw YAML per environment.
- **Values files** (`values.yaml`) let the same chart be deployed differently per environment (dev/staging/prod) by overriding parameters (replica count, resource limits, image tag) without duplicating manifests.
- It also gives **release management**: `helm upgrade`/`helm rollback` track revisions, making it straightforward to roll back a bad deployment.

#### What is Terraform used for, and what's the benefit of Infrastructure as Code?
- Terraform lets you declare cloud/infrastructure resources (VMs, databases, networking, Kubernetes clusters) in **code** (HCL), rather than clicking through a console — the desired state is version-controlled, reviewable, and repeatable across environments.
- **State file**: Terraform tracks the real-world resources it manages in a state file, and computes a **plan** (diff between desired and current state) before applying changes — `terraform plan` before `terraform apply` is the safety net against surprise changes.
- Benefit over manual provisioning: **reproducibility** (spin up an identical environment from the same code), **auditability** (every infra change goes through a reviewed pull request, like application code), and **disaster recovery** (rebuild infrastructure from code instead of tribal knowledge).

### Observability

#### How do you approach observability in a distributed/microservices system?
- **Centralized logging**: structured logs (JSON) shipped to a central store (e.g. Elastic) so you can search across all services instead of SSH-ing into individual machines.
- **Correlation/trace ID**: a unique id generated at the entry point of a request and propagated through every downstream service call (and Kafka message header) — the only practical way to reconstruct a business flow that spans multiple services.
- **Metrics & dashboards**: exposing key metrics (latency, error rate, throughput, queue lag) and visualizing them (e.g. Grafana) with alerts on thresholds, rather than discovering problems from user complaints.
- **Health checks**: readiness/liveness endpoints so orchestrators (Kubernetes) can detect and route around unhealthy instances automatically.

### Caching

#### How do you decide when and how to cache something?
- Cache when a piece of data is **read far more often than it changes** and recomputing/refetching it is costly — classic candidates: reference/lookup data, expensive aggregations, results of external API calls.
- **Where**: in-process (Spring's `@Cacheable`, Hibernate second-level cache) for single-instance/low-churn data; a shared cache (Redis) when multiple instances need a consistent view or the dataset is large.
- **Invalidation is the hard part** — I prefer a clear **TTL** plus explicit invalidation on write (evict/update the cache entry when the underlying data changes) over relying on TTL alone, to avoid serving stale data longer than acceptable for the use case.

### Data Engineering

#### What is a tool like Fivetran used for, and how does it fit a data product/data mesh mindset?
- **Fivetran** is a **managed data ingestion/ELT tool**: it connects to source systems (databases, SaaS APIs) and automatically replicates data into a warehouse/lake, handling schema drift and incremental syncs without hand-written pipeline code.
- It fits the **data-as-a-product** mindset because it lets a domain team reliably publish its data (as a well-defined, monitored pipeline) without every team reinventing ingestion — closer to "self-serve data infrastructure" than custom ETL scripts per source.
- As a backend developer moving toward data product work, I see the value in this shift: instead of writing one-off extraction code, focus on defining clean data contracts and let managed tooling handle the plumbing.

### Algorithms & Data Structures

#### How comfortable are you with algorithms and data structures, and how does that show up in day-to-day backend work?
- I don't reach for algorithm theory daily, but the mental model matters constantly: choosing a `HashMap` vs `TreeMap` vs `List` for a lookup, knowing that an `O(n²)` nested loop over a large collection will hurt at scale, or that a DB index turns an `O(n)` scan into an `O(log n)` lookup.
- Concretely: I pay attention to **query/algorithm complexity when data volume grows** (pagination instead of loading everything, batch processing instead of row-by-row, indexing the right columns) — that's where Big-O thinking actually shows up in backend work, more than solving abstract puzzles.
