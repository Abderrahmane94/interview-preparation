---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';


# Infrabel — Personal Interview Prep
# <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

> Personal interview prep notes for **Abderrahmane Sardaoui**, scoped to the topics flagged for the Infrabel interview. Self-contained on purpose — nothing here links out to other pages. Company facts and figures below are from general knowledge and marked where they should be **double-checked against Infrabel's own official/recent sources** before the interview — never state a number in an interview you haven't verified.

## Present yourself
Good morning / afternoon, thank you for the opportunity to introduce myself.

My name is **Abderrahmane Sardaoui**. Outside of work, I'm married and I practice **judo** — it keeps me disciplined, and honestly it mirrors how I like to work: consistent effort, respect for process, and staying open to learning from people more experienced than me.

Professionally, I'm a **backend developer** with **more than 7 years of experience**, mostly in the **Java / Spring ecosystem**. I hold a Master's degree in Computer Science from ESI (Algeria). I've worked across different domains — energy (Sonelgaz), healthcare (CDTA, an EMR system), CRM/consulting (Poliscrypts), intelligent document processing (IRIS IMS, part of Canon Group), and currently spare parts / industrial platforms at TVH Group.

Across all these roles, my focus has consistently been **backend development**: designing APIs, modeling data, implementing business logic, and making sure what I ship is reliable, tested, and maintainable — using Spring Boot, Spring Data/Security, Hibernate, PostgreSQL, Kafka, and practices like TDD/DDD/BDD.

## Present Infrabel
> **Verify before the interview**: any figure below (track length, headcount, budget, current strategic programs) should be checked against Infrabel's current official communication — these numbers change and I'm reciting them from general knowledge, not a live source.

- **Infrabel** is the **public company that manages Belgium's railway infrastructure** — the tracks, signaling systems, electrification, level crossings, and the network's safety and traffic control — as opposed to **NMBS/SNCB**, which is the passenger train *operator*. This split (infrastructure manager vs. operator) happened as part of the **2005 reform** of the former unified Belgian rail company, in line with EU rail liberalization directives that require separating infrastructure management from train operations.
- It's an **autonomous public company** under the Belgian state, headquartered in **Brussels**, responsible for maintaining and modernizing the network, planning capacity/timetable slots for all rail operators (not just SNCB — freight operators and international carriers too), and running the **signal boxes / traffic control centers**.
- Safety and reliability are core to its mission — Infrabel invests heavily in **digital/automated signaling** (e.g. ETCS — European Train Control System — rollout), infrastructure renewal, and punctuality-driving projects, since infrastructure condition is one of the biggest levers on nationwide train punctuality.
- As a critical-infrastructure/public-service organization, it tends to value **stability, safety-first engineering discipline, and long-term ownership of systems** — which lines up well with what I'm personally looking for right now (see below).

## Why Infrabel — what motivates you about this opportunity?
Two things, honestly: **the mission itself** — working on systems that support critical national infrastructure and public safety feels meaningful in a way a purely commercial product doesn't always — and **stability**: I'm specifically looking for a **long-term, stable mission**, and a public infrastructure company with multi-year programs is exactly that kind of environment. It's not about chasing a particular technology — I can learn any stack; what matters is being excited about the problem we're solving (keeping a safety-critical national network running) and being able to sustain that commitment over the long run.

## You're a backend developer — how do you frame that?
I intentionally focus on **backend development**: API design, business logic, data modeling, integration (Kafka/REST), and system reliability. Earlier in my career I also worked with Angular on the front-end, so I understand the full picture and communicate well with front-end teammates — but my strength, and where I want to keep growing, is backend and architecture, not UI work.

## What kind of person are you in a team, especially in a collaborative setup (mob/pair programming, LeSS)?
I'd describe myself as **sociable and a natural helper** — which matters a lot in a highly collaborative organization:
- At Sonelgaz, I actively **onboarded new team members**, walking them through the architecture and codebase so they could become productive faster.
- I regularly do **code reviews**, not to gatekeep but to share context and catch issues early, and I make a point of explaining *why*, not just *what* to change — the same instinct that makes pair/mob programming work well.
- I'd rather unblock a teammate in 5 minutes than let them struggle silently for an hour. I'm comfortable **thinking out loud** and being watched while coding, which is exactly the mindset mob/pair programming and LeSS's emphasis on transparency require — I don't treat code as a solo, defensive activity.

---

## Ways of working

### TDD & why integration tests matter
- **TDD (Test-Driven Development)**: write a failing unit test first, write the minimal code to pass it, then refactor (red-green-refactor) — it drives the *design* of the code as much as it verifies correctness, since code that's hard to unit-test is usually a signal of poor separation of concerns.
- **Why unit tests alone aren't enough**: a unit test mocks its collaborators, so it proves a class's *internal logic* is correct but says nothing about whether that class is correctly **wired** to the real database, the real Kafka broker, or another real service — configuration mistakes, serialization mismatches, transaction boundaries, and query correctness only show up when the real infrastructure is involved.
- **Integration tests** close that gap by exercising the actual boundaries (e.g. `@DataJpaTest` against a real/test database, Testcontainers for Kafka) — fewer of them than unit tests (they're slower), but they catch the class of bugs unit tests structurally cannot: "does this actually work end-to-end through the real stack," not just "is this class's logic correct in isolation."
- In a safety-critical infrastructure context, this distinction matters even more — a passing unit test suite with a broken integration point is exactly the kind of gap that shouldn't reach production.

### Mob Programming & Pair Programming
- **Pair Programming**: two developers work together at one workstation — one "driving" (typing), one "navigating" (reviewing, thinking ahead, catching mistakes) — roles typically swap regularly. Knowledge spreads naturally, code review happens continuously instead of after the fact, and it reduces the bus-factor risk of one person being the only one who understands a piece of code.
- **Mob Programming**: the whole team (not just two people) works together on the same problem, at the same time, on one shared screen/workstation, with one person "typing" at a time (the "driver" role rotating frequently, e.g. every few minutes) while everyone else actively navigates/discusses. It's essentially pair programming scaled up to the whole team.
- **Why teams use them**: near-zero knowledge silos (everyone understands the whole codebase, not just their corner of it), higher code quality (review is continuous, not a gate at the end), faster onboarding of new members, and better collective ownership — at the cost of feeling slower per line of code written, though the net throughput (counting rework and review cycles saved) is often comparable or better.
- **What it requires from me**: comfort thinking and explaining out loud, patience when I'm not the one typing, and treating "I don't understand this part" as a normal thing to say rather than something to hide — which matches how I already like to work in code reviews and onboarding.

### LeSS (Large-Scale Scrum) — how does it work?
LeSS is a framework for **scaling Scrum to multiple teams working on one product**, while staying as close as possible to single-team Scrum rather than adding a new management layer (which is the main way it differs from SAFe).
- **One Product, one Product Backlog, one Product Owner**: even with several teams, there's still a single Product Backlog and a single Product Owner for the whole product — teams pull items from the same backlog rather than each having their own siloed backlog.
- **Sprint alignment**: all teams share the same **Sprint** (same start/end dates), which keeps integration and coordination synchronized across the whole product.
- **Sprint Planning is split in two parts**: Part 1 involves representatives from all teams together, deciding *what* each team will work on from the shared backlog (avoiding duplicate work and clarifying dependencies); Part 2 happens **per team**, where each team plans *how* it will do its own work.
- **Coordination between teams** happens mainly through **informal mechanisms** LeSS encourages over formal coordination roles: a "Community of Practice," cross-team standing meetings when needed, open workspace, and rotating people between teams over time — the idea is to keep coordination organic and lightweight rather than adding a Scrum-of-Scrums-style extra hierarchy.
- **Sprint Review and Retrospective**: Sprint Review is typically a single overall event for the whole product (sometimes a joint review across teams); each team still does its own Retrospective, plus there's often an **overall Retrospective** for cross-team process improvements.
- **Why it's relevant to me**: LeSS depends heavily on transparency, shared ownership of the whole product (not "my team's part only"), and comfort working across team boundaries — exactly the mindset that mob/pair programming and my own collaborative style already push me toward.

### How do you approach doing a release?
- **Versioning**: I follow **semantic versioning** (`MAJOR.MINOR.PATCH`) so consumers of an API/library can tell at a glance whether an upgrade is safe (patch/minor) or requires attention (major, breaking change).
- **Preparation**: the release branch/tag is cut from a stable, already-tested state (typically `main` after CI is green); release notes are written summarizing what changed, referencing tickets, and calling out any breaking changes or required migration steps (e.g. a DB migration that needs to run first).
- **Pipeline**: build → run the full test suite (unit + integration) → package/containerize → deploy to a staging environment for a final sanity check → deploy to production, ideally through the CI/CD pipeline rather than manually, using the same artifact that was tested (never rebuild for prod — you want to deploy the exact thing you tested).
- **Deployment strategy**: I favor **small, frequent releases** over big-bang ones — smaller changes are easier to validate and, if something goes wrong, easier to pinpoint and roll back. For anything risky, a rolling/blue-green deployment (or a feature flag) lets you limit blast radius and roll back quickly without a full redeploy.
- **After release**: monitor error rates/latency/logs closely right after deploying (not just "ship and walk away") and have a clear rollback plan decided *before* deploying, not improvised under pressure if something breaks — this matters even more in an infrastructure/safety-adjacent context.

---

## Architecture & design

### What is Domain-Driven Design (DDD), and why use it?
DDD is an approach to software design that focuses on **modeling software to closely match a real business domain**, developed in close collaboration with domain experts rather than designed in isolation by engineers.
- For complex domains, the biggest risk usually isn't the technology — it's building the **wrong model** of the problem. DDD tackles that by putting domain understanding at the center of the design process, using a shared vocabulary (**Ubiquitous Language**) between developers and business experts.
- It splits into **strategic DDD** (how to carve a large domain into well-bounded pieces — Bounded Context, Context Mapping) and **tactical DDD** (the building blocks to model *inside* one of those pieces — Entities, Value Objects, Aggregates, Repositories, Domain Events).
- **Why use one or the other**: strategic DDD is what you reach for early, at the system/organization level, when deciding how to split a large domain into services/teams — it's about boundaries. Tactical DDD is what you reach for once you're *inside* a bounded context, to keep the domain model itself clean and expressive in code. You typically need both, at different zoom levels — strategic without tactical gives you well-separated services with a messy internal model; tactical without strategic gives you clean code inside services whose boundaries don't match the real business, which causes chatty, tightly-coupled integrations.
- In an infrastructure-heavy organization with many interconnected subsystems (signaling, timetabling, asset management, safety systems), getting the **Bounded Context** boundaries right is often more valuable than any specific coding pattern — it's what prevents systems from becoming tangled.

### Hexagonal Architecture (Ports & Adapters)
- **Core idea**: the business/domain logic sits at the center, fully isolated from frameworks, databases, and UI. It only talks to the outside world through **ports** (interfaces it defines).
- **Adapters** implement those ports to plug in a concrete technology — a REST controller is a driving/primary adapter (calls into the domain), a JPA repository implementation is a driven/secondary adapter (the domain calls out to it).
- **Why it matters**: the domain can be unit-tested with no DB/framework involved, and swapping infrastructure (e.g. PostgreSQL → another store, REST → Kafka trigger) doesn't touch business logic — valuable in a long-lived system where the underlying tech will inevitably be replaced over the years while the business rules stay stable.
- **Relation to DDD**: hexagonal architecture is the structural pattern that DDD's domain model naturally fits into — the "hexagon" is the domain + application layer; DDD gives you the tools (entities, aggregates, domain events) to design what's inside it.

### Hexagonal vs. Onion Architecture — are they the same?
They're **variations of the same core idea** — dependencies point inward toward the domain, infrastructure stays at the edges — with slightly different framings:
- **Hexagonal (Ports & Adapters)**: emphasizes symmetry between "driving" and "driven" sides, all communicating through ports.
- **Onion Architecture**: describes it as **concentric layers** (domain core → domain services → application services → infrastructure), making the *layering* itself more explicit — closer to how I'd draw it on a whiteboard when explaining it to a team.
- Both share the same underlying principle as Dependency Inversion (the "D" in SOLID) applied at the architecture level: **dependencies point inward, never outward toward infrastructure**. In interviews and in practice, I treat them as the same family and focus on that shared principle rather than debating naming.

### Microservices architecture & Spring — how do they fit together?
- Spring (Boot in particular) is a natural fit for microservices because of its **fast startup, auto-configuration, and huge ecosystem** for exactly the concerns microservices need: **Spring Web/WebFlux** for REST APIs, **Spring Data** for persistence, **Spring Security** for auth, **Spring Kafka** for event-driven integration, and (in a Spring Cloud setup) building blocks for **service discovery, config server, and API gateway**.
- Each service is independently deployable, owns its own database (Database per Service), and communicates either synchronously (REST, typically behind an **API Gateway**) or asynchronously (Kafka events) — with resilience patterns (**Circuit Breaker**, retries, timeouts) protecting against a failing downstream service taking others down with it.
- Cross-service consistency, since distributed transactions aren't an option, is handled with the **Saga** pattern (sequence of local transactions with compensations) — and if read/write scaling needs diverge a lot, **CQRS** separates the write model from the read model.
- In a large organization with many interconnected systems (like Infrabel's signaling, planning, and asset-management domains likely are), the hard part usually isn't the Spring wiring — it's getting the **service boundaries** right, which is exactly where DDD's Bounded Context thinking comes in.

### Spring vs. Spring Boot — what's the difference?
- **Spring (Framework)** is the underlying **IoC/DI container and set of modules** (Core, MVC, Data, Security, AOP, etc.) — powerful, but historically required a lot of manual XML/Java configuration to wire everything together (data sources, view resolvers, security filters, etc.).
- **Spring Boot** is built **on top of** the Spring Framework — it doesn't replace it, it adds **auto-configuration** (sensible defaults based on what's on the classpath), an **embedded server** (no separate application server/WAR deployment needed), **starter dependencies** (`spring-boot-starter-web`, etc. bundling compatible versions), and production-ready features (Actuator for health/metrics) out of the box.
- In short: Spring gives you the building blocks; Spring Boot gives you a fast, opinionated way to assemble them into a runnable application with minimal boilerplate. Virtually all new Spring projects today start from Spring Boot rather than raw Spring.

### What are the SOLID principles, and can you give a practical example?
- **S — Single Responsibility**: a class should have one reason to change (e.g. separate an `OrderValidator` from an `OrderRepository` rather than mixing validation and persistence).
- **O — Open/Closed**: open for extension, closed for modification — e.g. adding a new payment method via a new `PaymentStrategy` implementation instead of editing a big `if/else` in existing code.
- **L — Liskov Substitution**: a subtype must be usable wherever its base type is expected, without breaking behavior.
- **I — Interface Segregation**: prefer several small, specific interfaces over one large one clients are forced to implement in full.
- **D — Dependency Inversion**: depend on abstractions, not concrete implementations — exactly what Spring's DI enables in practice, and the same principle behind hexagonal architecture at a larger scale.

### What is polymorphism in Java, and can you give an example?
Polymorphism means **the same method call behaves differently depending on the actual runtime type of the object**, even when called through a common reference type.
- **Runtime (subtype) polymorphism**: achieved through **inheritance/interfaces and method overriding** — e.g. a `PaymentMethod` interface with `CreditCard`, `BankTransfer`, and `DirectDebit` implementations, each overriding `process()` differently; calling `paymentMethod.process()` runs the correct implementation based on the object's actual class, decided at runtime (**dynamic dispatch**).
- **Compile-time polymorphism (overloading)**: multiple methods with the same name but different parameter lists (e.g. `calculate(int)` vs `calculate(int, int)`) — resolved at compile time based on the arguments' static types, not really "true" polymorphism in the OOP sense but commonly grouped with it.
- **Why it matters in practice**: it's what makes the **Strategy pattern**, and dependency injection against interfaces in general, possible — code that depends on an abstraction (`PaymentMethod`) doesn't need to know or care which concrete implementation it's handed, which is also the mechanism behind Java's polymorphic collections (`List<PaymentMethod>` holding a mix of concrete types).

---

## Kafka

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

### How does Kafka guarantee message ordering, and what is a Consumer Group?
- Ordering is only guaranteed **within a single partition**, not across a topic — records with the **same key** always go to the **same partition** (via key hash), preserving per-key ordering (e.g. all events for one `orderId`).
- A **Consumer Group** is a set of consumers sharing a `group.id` that cooperate to consume a topic: Kafka assigns each partition to **exactly one consumer** in the group at a time, so a topic with N partitions can be consumed in parallel by up to N consumers. Different consumer groups are independent — each gets its own copy of every message.

### How does Kafka achieve durability and fault tolerance?
- Each partition has a **replication factor** — replicas stored on multiple brokers. One replica is the **leader** (handles reads/writes); others are **followers** replicating from it.
- **In-Sync Replicas (ISR)**: followers caught up with the leader. If the leader fails, a new leader is elected from the ISR set, so the partition stays available with no data loss (as long as `acks`/replication is configured correctly).
- `acks=0` (no wait, fastest, can lose messages) vs `acks=1` (waits for the leader) vs `acks=all` (waits for all in-sync replicas — strongest durability).

### How does Kafka compare to a traditional message broker (e.g. RabbitMQ)?
- **Retention**: Kafka retains messages regardless of consumption (replay possible); RabbitMQ typically removes a message once consumed.
- **Model**: Kafka is pull-based/log-based; RabbitMQ is push-based with richer routing (exchanges/queues).
- **Throughput vs features**: Kafka is optimized for very high throughput streaming; RabbitMQ offers richer per-message routing/priority out of the box.

---

## Angular

### What's the difference between a Component and a Service in Angular?
- A **Component** controls a piece of the **UI**: it has a template (view), styles, and a class holding the presentation logic/state for that piece of the screen — it's instantiated per usage in the template (e.g. multiple `<app-order-card>` on a page each get their own instance).
- A **Service** holds **reusable logic and state that isn't tied to a specific view** — data fetching (HTTP calls), business logic, shared state, caching — and is typically a **singleton** injected wherever needed via Angular's DI (`providedIn: 'root'`), so the same instance (and its state) is shared across every component that injects it.
- The separation matters for the same reason it does in any layered app: components should stay thin (presentation only) and delegate data/business logic to services — that keeps components easy to test and reuse, and keeps business logic in one place instead of duplicated across views.

### What are Signals in Angular, and what are the different ways to work with them?
Signals are Angular's newer (v16+, stabilized/expanded through v17–v18) **reactive primitive** for state management — a wrapper around a value that **notifies whoever reads it when it changes**, enabling fine-grained, efficient change detection without relying on Zone.js to check everything.
- **`signal(initialValue)`**: creates a **writable signal** — read it by calling it as a function (`count()`), update it with `.set(newValue)` or `.update(current => ...)`.
- **`computed(() => ...)`**: derives a **read-only signal** from one or more other signals — automatically recalculates (and only recalculates) when a signal it reads from changes, similar in spirit to a memoized selector.
- **`effect(() => ...)`**: runs a side effect automatically whenever any signal it reads changes (e.g. syncing to `localStorage`, logging, imperative DOM work) — used sparingly, since most reactive UI needs are better expressed with `computed` or template bindings directly.
- **Signal-based component inputs** (`input()`) and **`model()`** (newer APIs): let component `@Input`-equivalents and two-way-bindable values be signals themselves, integrating inputs into the same reactivity system instead of being a separate mechanism from internal state.
- **Why they matter**: compared to `RxJS` Observables (still used for async streams like HTTP) or Zone.js-based change detection, signals give **synchronous, fine-grained reactivity** — Angular can know precisely which parts of the DOM depend on a changed value instead of re-checking the whole component tree, which is also a step toward Angular's move away from requiring Zone.js at all.

### Which Angular version have you used?
> **Placeholder — confirm before the interview**: my CV lists Angular experience across several roles (CDTA, Sonelgaz, Poliscrypts, IRIS IMS) between 2018 and 2025, but doesn't pin exact versions — check my actual project history/`package.json`s for the precise versions before stating one in an interview, rather than guessing.
- What I can say generally: my Angular experience spans **several major versions** over that period as the framework evolved from the ViewEngine/NgModule-centric era toward the more recent **standalone components, the new control-flow syntax (`@if`/`@for`), and Signals** (v16+ through v17/v18) — I'm comfortable picking up the latest APIs since Angular's core concepts (components, DI, RxJS, routing) have stayed consistent even as the surface syntax modernized.
- Given my focus is backend, I'd frame this honestly: solid, hands-on Angular fundamentals from real production work, with the newest Signals-based APIs being something I'd want to ramp up on quickly rather than claim deep production experience with if I haven't shipped with them yet.
