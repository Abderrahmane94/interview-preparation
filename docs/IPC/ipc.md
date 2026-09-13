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

### CQRS, Saga, Kafka Outbox & microservices patterns
Full write-ups already exist in this repo — review them, don't just memorize the summary below:
- [CQRS](../Architecture&CleanCode/architecture-pattern.md#what-is-cqrs-command-query-responsibility-segregation)
- [Saga pattern](../Architecture&CleanCode/architecture-pattern.md#what-is-the-saga-pattern-and-what-problem-does-it-solve) (Choreography vs. Orchestration)
- [Microservices design patterns overview](../Architecture&CleanCode/architecture-pattern.md#what-are-the-key-design-patterns-used-in-a-microservices-architecture) — API Gateway, Circuit Breaker, Service Discovery, Database per Service, Strangler Fig
- [Kafka fundamentals](../Kafka/kafka.md) — topics/partitions, consumer groups, ordering, replication, `acks`
- [Transactional Outbox pattern](../Kafka/kafka.md#what-is-the-transactional-outbox-pattern-and-why-is-it-used-with-kafka) — comes up often when discussing Kafka + database consistency, be ready for it.

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
