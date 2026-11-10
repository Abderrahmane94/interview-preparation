---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';


# FOD Justice — Personal Interview Prep
# <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

> Personal interview prep notes for **Abderrahmane Sardaoui**, for a backend role on the **Just-on-Web** project at **FOD Justitie / SPF Justice** (Belgian Federal Public Service Justice). Self-contained on purpose. Expect a **very technical, hands-on interview in English**: code shown on screen, "what's wrong / how would you improve it / why", and follow-up questions that challenge the first answer. For every answer: **state the problem → propose the fix → justify the trade-off**.

## Introduction

### Present yourself (short version)
Good morning, thank you for having me.

My name is **Abderrahmane Sardaoui**. I'm a **backend developer** with **more than 7 years of experience**, mostly in **Java and Spring Boot**. I hold a Master's degree in Computer Science from ESI (Algeria), and I've worked in energy (Sonelgaz), healthcare (CDTA — an EMR system), CRM/consulting (Poliscrypts), document processing (IRIS IMS, Canon Group), and currently at **TVH Group** on large international spare-parts platforms.

My focus is **business logic, API design, data modeling and reliability**: Spring Boot, Spring Data/Hibernate, PostgreSQL, Kafka, with TDD, DDD and BDD practices. I also worked with **Angular** earlier in my career, so I'm comfortable on the front-end side and in end-to-end discussions.

### What do you know about FOD Justice and the project?
- **FOD Justitie / SPF Justice** is the Belgian **Federal Public Service Justice**: it supports the courts and prosecution, prisons, and justice services for citizens and professionals — a **bilingual FR/NL** administration.
- **The project** modernizes how Justice handles **victims and case files**, inside the Justice digital ecosystem (and in line with the government agreement). Three pillars:
  1. **Digital victim form on Just-on-Web.** Since **1 September 2022**, victims of certain offences receive an information letter and a **victim form** so they can exercise their rights during the **execution of the offender's sentence**: be informed, be heard, propose conditions (e.g. a **no-contact order**). ~**16,000** letters/forms were sent in 2022. Today it's **paper**: heavy, manual, error-prone and hard for victims to fill in. The digital version brings clear guidance, **online submission from home**, **pre-filled data** (e.g. the offender), a **secure platform**, the possibility to **modify the form after submission**, **direct integration with case-management systems**, and less work for court registries and victim-support services.
  2. **National digital case file** — becomes the **single central source of final procedural documents**. Internal access via **JustView**, external via **KIOSK** and **JustConsult**. The old **E-inventaris** system will be **decommissioned** after its documents are **migrated** → one system to maintain, no repeated scanning, one authentic source for integrations, stronger security/audit/archiving.
  3. **Digital police reports (PV) Police ↔ Justice** — already exchanged digitally through the **JUS** (judicial) and **CIR** (traffic) flows: 13.4 M traffic PVs (276,000 not processed correctly) and 5.1 M judicial PVs (970,000 not processed correctly). Today the digital PV is only a **certified copy without digital signature** — the paper version is still the authentic one. With **JustConsult 2.0 (end of Q4 2026)**, citizens, lawyers and experts will consult the national file including PVs → move to the **authentic digital PV**, end of paper exchange, **strict end-to-end tracking** of the flows.
- **What it means technically for me:** sensitive personal data (**GDPR**, strong **authentication/authorization**, **audit trail**), **integration** with several Justice systems, **data migration**, **reliable message flows** (those "not processed correctly" numbers are exactly an idempotency / error-handling / reconciliation problem), and **long-lived, maintainable** code.

> **Talking point:** "What struck me in the project description is the PV numbers — almost a million judicial PVs not processed correctly. That's the kind of problem I like: making integration flows reliable and traceable, with idempotent processing, clear error handling and monitoring."

### Why this role?
- **Meaningful domain**: software that directly helps **victims** exercise their rights and makes justice more efficient — correctness, security and data integrity really matter, which is exactly where I enjoy working.
- **Technical challenges I like**: integration between systems, reliable message flows, data migration, secure handling of sensitive data.
- **Stability**: I'm looking for a **long-term mission** where I can build deep knowledge of a domain and a codebase.
- **Technical fit**: DDD, hexagonal architecture, Spring Boot, JPA/PostgreSQL — this is my daily work.

### Languages
English for the interview is perfectly fine. I'm a native French speaker; I have **limited notions of Dutch** and I'm **open to developing them** if the role needs it — in a bilingual FR/NL environment that's a natural thing to work on.

### Concrete examples to prepare (architecture, refactoring, complex problems)
> Prepare 3 short stories with **STAR**: Situation → Task → Action → Result (with a number if possible). Fill in the `[ ... ]`.

1. **Architecture** — `[a feature where you separated domain logic from infrastructure: e.g. moving business rules from a service/controller into the entity/aggregate, introducing ports/adapters for an external system]`. Result: `[easier testing, fewer regressions…]`.
2. **Refactoring** — `[an anemic model or a "god service" you refactored: removed public setters, added intention-revealing methods, added tests first]`. Result: `[…]`.
3. **Complex problem** — `[a production bug: N+1/performance, concurrency/duplicates, transaction or Kafka issue — how you diagnosed it (logs, SQL, metrics), the root cause, the fix]`. Result: `[…]`.

---

## Project-specific design questions

> Likely "how would you build it?" questions linked to the project. Answer with the same structure: **requirements → design → trade-offs**.

#### How would you design the digital victim form?
- **Domain model**: a `VictimForm` **aggregate** linked to a **case/execution file by ID**, with a status lifecycle (`DRAFT → SUBMITTED → AMENDED → PROCESSED`) and the victim's choices (be informed, be heard, proposed conditions like a no-contact order) as **value objects** with their own validation.
- **Pre-filling**: data (offender, case reference) comes from the case-management system through an **outbound port / adapter** — an **anti-corruption layer** so the external model doesn't leak into the domain; the victim only sees what they are allowed to see.
- **Security**: strong citizen authentication (e.g. Belgian eID / itsme via the federal authentication service), **authorization per form** (a victim only accesses their own), encryption in transit and at rest, **no personal data in logs** (GDPR), data retention rules.
- **Integration**: on submission, publish a `VictimFormSubmitted` event with the **outbox pattern** so the case-management systems / registries receive it reliably; consumers are **idempotent**.
- **UX for victims**: step-by-step (wizard), clear instructions, save drafts, accessible (WCAG), **FR/NL** (and DE) i18n.

#### "Victims can modify the form after submission" — how do you handle that?
- Never overwrite silently: keep **versions** (`version` number + `submittedAt`) or an **append-only history**, so registries and judges know **what was declared when** — it can have legal value.
- **Optimistic locking** (`@Version`) if a victim and an agent can edit concurrently.
- Business rule: modification allowed **until** a given step (e.g. before a decision is taken) — enforced in the **aggregate**, not only in the UI.
- Each change raises a `VictimFormAmended` event → the downstream systems are notified, plus a full **audit trail** (who, when, what).

#### How would you migrate documents from E-inventaris to the national file?
- **Inventory and mapping** first (metadata, document types, links to cases), then a **repeatable, idempotent** migration job: each document has a **stable source ID**, so rerunning skips what's already migrated (`ON CONFLICT DO NOTHING` / migration status table).
- **Chunks** with one transaction per chunk, an **error report** per document, retry for the failed ones — never stop everything for one bad record.
- **Verification**: counts per entity, **checksums** of file content, sampling by business users; a **dry run** on a copy of production data.
- **Migrate entity by entity** (as the project plans), with a switch-over per entity and a rollback plan; old system read-only during the cut-over, decommission only after validation.

#### Millions of PVs exchanged, hundreds of thousands "not processed correctly" — how would you make the flow reliable?
- **Find out why** first: categorize failures (invalid format, missing reference data, technical errors, duplicates) with **structured logs and metrics per error type**.
- **Validate at the entry** against a **contract/schema**; reject with a clear, machine-readable reason sent back to the sender.
- **Idempotent processing** keyed on the PV's unique identifier (unique constraint) → retries and re-sends don't create duplicates.
- **Retries with backoff** for technical errors, **dead letter queue** for poison messages, with tooling to **fix and replay**.
- **Reconciliation**: compare what was sent vs received vs processed (counts per day/flow), alert on gaps — the "strict and complete tracking of digital flows" the project requires.
- **Correlation ID** across Police → Justice systems for end-to-end tracing.

#### What changes when the digital PV becomes the authentic document?
- **Integrity and authenticity**: a **digital signature** (e.g. qualified electronic signature/seal under eIDAS) verified on receipt; store a **hash** to prove the document wasn't altered.
- **Immutability**: an authentic document is **never updated** — corrections are new versions/documents linked to the original.
- **Long-term archiving** (formats like PDF/A, signature validation over time), **strict access control and audit** of every consultation (who viewed which PV, via JustConsult/KIOSK/JustView).

---

## 1. DDD & Hexagonal Architecture

#### What are the main principles of Domain-Driven Design?
- **Focus on the domain**: the core value is in the business logic, built **with domain experts**.
- **Ubiquitous language**: the same words in conversations, code and tests (`CaseFile`, `Exhibit`, `Expert`, `Certification`).
- **Bounded contexts**: a model is valid inside a boundary; the same word can mean different things in different contexts.
- **Tactical building blocks**: **entities** (identity), **value objects** (immutable, compared by value), **aggregates** (consistency boundary), **domain services**, **domain events**, **repositories**.
- **Rich domain model**: behavior lives with the data — no anemic "getter/setter bags" with all logic in services.

#### What are the main principles of Hexagonal Architecture?
- The **domain + application core** sits in the middle and depends on **nothing technical** (no Spring, JPA, HTTP).
- The core defines **ports** (interfaces): **inbound** ports (use cases the outside can call) and **outbound** ports (what the core needs: `ExpertRepository`, `NotificationSender`).
- **Adapters** implement ports at the edges: REST controller, Kafka listener (driving); JPA repository, REST client (driven).
- **Dependencies always point inward** (dependency inversion).

```
REST / Kafka (driving adapters) → [ use cases → domain ] ← JPA / clients (driven adapters, implement ports)
```

#### What are the advantages and disadvantages of Hexagonal Architecture?
| Advantages | Disadvantages |
|---|---|
| Business logic **testable without Spring/DB** (fast unit tests) | **More code**: interfaces, mappers (domain ↔ JPA entity ↔ DTO) |
| Technology changes (DB, broker, external API) stay in adapters | **Overkill for simple CRUD** — indirection without benefit |
| Clear boundaries, easier to reason about and review | Learning curve; risk of "ports for everything" over-engineering |
| Framework upgrades have a smaller blast radius | Mapping can hide performance issues (e.g. lazy loading) |

**My position:** use it where there is **real business logic** that must be protected and tested; keep simple CRUD simple.

#### What is an aggregate, and what is the responsibility of the aggregate root?
An **aggregate** is a cluster of objects treated as **one consistency unit** (e.g. `CaseFile` + its `Exhibit`s). The **aggregate root** (`CaseFile`) is the **only entry point**:
- External code holds references only to the root, never modifies children directly.
- The root **enforces the invariants** of the whole aggregate ("no duplicate exhibit", "no exhibit added to a closed case").
- One transaction modifies **one aggregate**; other aggregates are referenced **by ID** and updated via domain events / eventual consistency.
- A repository exists **per aggregate root**, not per child entity.

#### How do you ensure proper encapsulation of business entities?
- **No public setters**; expose **intention-revealing methods** (`certification.revoke(reason)`, not `setStatus(REVOKED)`).
- **Validate in the constructor / factory method** → an object can never exist in an invalid state.
- **Never expose mutable collections**: return `Collections.unmodifiableList(...)` / `List.copyOf(...)`; add/remove through root methods.
- Use **value objects** for concepts with rules (`CertificationNumber`, `Period`, `Email`) — immutable, self-validating.
- JPA needs a no-arg constructor → make it `protected`; use field access so the domain doesn't need setters.

#### Where should business validation rules be implemented?
- **Invariants of one object/aggregate** → in the **domain** (entity, value object, aggregate root). They hold no matter which use case calls them.
- **Input format validation** (required field, size, email format) → at the **edge** (DTO + Bean Validation `@Valid`), to fail fast with a clear 400.
- **Rules needing other data / external systems** (e.g. "certification number unique across all experts") → **domain service** or application service + **database constraint** as the final safety net.
- Never only in the UI or only in the controller: they would be **bypassable** by another entry point (batch, Kafka listener, another API).

#### Domain service vs application service?
| | Domain service | Application service |
|---|---|---|
| Contains | **Business logic** that doesn't belong to a single entity | **Orchestration** of a use case |
| Example | `CertificationEligibilityPolicy`, transfer between two aggregates | `RegisterCertificationUseCase`: load → call domain → save → publish event |
| Depends on | Domain only (pure) | Ports (repositories, messaging), transactions, security |
| Knows about transactions? | No | Yes — the **transaction boundary** is here |

#### How do you separate business logic from application orchestration?
The application service reads like a **script**; the decisions are inside the domain:

```java
@Service
public class AddCertificationService implements AddCertificationUseCase {
    private final ExpertRepository experts;           // outbound port
    private final DomainEventPublisher events;        // outbound port

    @Transactional
    public void add(AddCertificationCommand cmd) {
        Expert expert = experts.findById(cmd.expertId())
            .orElseThrow(() -> new ExpertNotFoundException(cmd.expertId()));
        expert.addCertification(cmd.type(), cmd.number(), cmd.validity()); // business rules inside
        experts.save(expert);
        events.publish(new CertificationAdded(expert.id(), cmd.number()));
    }
}
```

No `if` on business rules in the service: if the rule changes, only the domain changes, and it's unit-tested without Spring.

---

## 2. Java / Spring Boot — Code review & architecture

#### What are the risks of public setters on domain entities?
- **Invariants can be bypassed**: anyone can `setValidUntil(null)` or `setStatus(ACTIVE)` on an expired certification.
- Objects can be in an **invalid intermediate state** (half-built).
- **Business intent is lost**: `setStatus(REVOKED)` doesn't say *why* or *who*; `revoke(reason)` can record it and raise an event.
- **Logic spreads** across services/controllers → duplication and inconsistent rules.
- Mutable collections returned by getters let callers add items **without any check**.

#### How do you make sure business rules cannot be bypassed?
1. Rules live in the **domain** (constructors, factories, methods) — the only way to change state.
2. **Encapsulation**: no setters, unmodifiable collections, package-private/protected constructors for JPA.
3. **Database constraints** as last line of defense: `NOT NULL`, `UNIQUE`, `CHECK`, foreign keys — they also protect against concurrency and other writers.
4. **Tests** on the domain rules (unit) + on constraints (integration with a real PostgreSQL, e.g. Testcontainers).
5. Optionally **ArchUnit** tests to enforce that the domain doesn't depend on adapters.

#### How does `@Transactional` work in Spring?
Spring creates a **proxy** around the bean. On a call **through the proxy**, the interceptor opens (or joins) a transaction, calls the method, then **commits** — or **rolls back** if a `RuntimeException`/`Error` escapes. Consequences: only calls from **outside the bean** are intercepted (no self-invocation, no private methods), and rollback rules apply to exceptions **that leave** the method.

---

## 3. Hibernate / JPA — Entity relationships

#### EAGER vs LAZY fetching?
- **LAZY**: the association is loaded **when accessed** (proxy / persistent collection). Default for `@OneToMany` and `@ManyToMany`.
- **EAGER**: the association is loaded **every time the entity is loaded**, needed or not. Default for `@ManyToOne` and `@OneToOne`.
- Best practice: **LAZY everywhere** (also on `@ManyToOne`) and fetch **explicitly per use case** (`JOIN FETCH`, `@EntityGraph`, DTO projection).

#### What problems can EAGER cause on a `@OneToMany`?
- **Over-fetching**: loading a list of case files loads **all exhibits** of all of them — memory and time explode with data volume.
- **N+1 queries**: with JPQL queries, EAGER collections are often loaded with **one extra query per parent**.
- **Cartesian product**: several EAGER collections joined → rows multiply (and `MultipleBagFetchException` with two `List`s).
- **Pagination breaks**: Hibernate may paginate in memory.
- It **cannot be turned off** per query — LAZY can be fetched on demand, EAGER can't be "un-fetched".

#### How do you manage a bidirectional relationship properly?
- One side **owns** the relationship (the `@ManyToOne` side with the FK); the other side has `mappedBy`.
- Keep **both sides in sync** with helper methods on the aggregate root:

```java
public void addExhibit(Exhibit exhibit) {
    exhibits.add(exhibit);
    exhibit.attachTo(this);      // sets the back-reference
}
public void removeExhibit(Exhibit exhibit) {
    exhibits.remove(exhibit);
    exhibit.detach();
}
```

- Use `cascade = ALL` + `orphanRemoval = true` when the child's lifecycle belongs to the parent.
- Exclude the back-reference from `toString()`, `equals/hashCode` and JSON serialization (infinite recursion) — and don't expose entities in the API: use DTOs.

#### How do you prevent duplicate exhibits in a CaseFile?
Three layers:
1. **Domain rule** in `CaseFile.addExhibit()`: reject (or ignore) an exhibit whose **business key** (e.g. exhibit reference number) already exists — with a clear exception.
2. **Collection type**: a `Set` with **`equals/hashCode` based on the business key** (not on the generated ID, which is null before persist).
3. **Database**: `UNIQUE (case_file_id, reference)` — protects against concurrent requests.

#### What is the N+1 problem, and how do you identify and resolve it?
One query loads N parents, then **one query per parent** loads an association → N+1 round-trips.
- **Identify**: enable SQL logging (`spring.jpa.show-sql` / `org.hibernate.SQL=DEBUG`), **Hibernate statistics** (`hibernate.generate_statistics`), APM traces showing repeated identical queries, or a test asserting the **number of queries** (e.g. datasource-proxy).
- **Resolve**: `JOIN FETCH`, `@EntityGraph`, **DTO projection**, or `@BatchSize` / `hibernate.default_batch_fetch_size` (N+1 → 1 + N/batch). Paginate parents first, then fetch children for the page's IDs.

---

## 4. Spring Boot — Transactions & exception handling

#### What happens when an exception occurs inside a transactional method?
- **Unchecked** (`RuntimeException`, `Error`) leaving the method → **rollback** of the whole transaction.
- **Checked** exception → **commit** by default (!), unless `rollbackFor = ...`.
- Exception **caught inside** the method and not rethrown → no rollback (commit), **unless** an inner transactional proxy already marked the transaction **rollback-only** → `UnexpectedRollbackException` at commit.

#### Checked vs unchecked exceptions and rollback?
Default rule: rollback on **unchecked**, commit on **checked**. Historical reason: checked exceptions were seen as "expected business outcomes". Make it explicit: `@Transactional(rollbackFor = Exception.class)`, or use unchecked domain exceptions.

#### What happens if a transactional method calls another method in the same class?
**Self-invocation** bypasses the proxy → the called method's `@Transactional` settings (e.g. `REQUIRES_NEW`, `rollbackFor`) are **ignored**; it runs inside the caller's transaction (or without any if the caller has none). Fix: move it to **another bean**, or put the boundary on the caller.

#### How do you handle partial failures when processing a batch of records?
First **ask the business**: *all-or-nothing* or *best effort*?
- **All-or-nothing**: one transaction around the batch; validate everything **first**, then write.
- **Best effort**: **one transaction per item** (or per chunk) via **another bean** with `REQUIRES_NEW` (or no outer transaction), catch the failure per item, **collect errors** and return a **report** (`199 succeeded, 1 failed: #137 – reason`).
- For big volumes: **chunks** (e.g. 100 items/transaction), Spring Batch (skip/retry policies), keep transactions short, make processing **idempotent** so a rerun is safe.

See **Exercise 3** for the "200 certifications, #137 fails" question.

---

## 5. PostgreSQL — Data integrity & uniqueness

#### How do you enforce uniqueness for a certification?
With a **database constraint** — it's the only reliable guarantee:

```sql
ALTER TABLE certification
  ADD CONSTRAINT uk_certification_number UNIQUE (certification_number);

-- Unique per expert and type, only among active certifications (partial unique index)
CREATE UNIQUE INDEX uk_active_cert_per_expert_type
  ON certification (expert_id, type)
  WHERE revoked_at IS NULL;
```

Plus a check in the domain/application layer for a **nice error message**.

#### Is checking for duplicates in the application layer sufficient?
**No.** `existsBy...()` then `save()` is **check-then-act**: two concurrent requests both see "no duplicate" and both insert. It also doesn't protect against other writers (scripts, other services, migrations). The app check is for **user experience**; the **constraint** is for **correctness**.

#### What happens if two concurrent requests insert the same unique value?
The first insert succeeds. The second one **waits** on the uncommitted row of the first (unique index check), then fails with **`23505 unique_violation`** when the first commits (or succeeds if the first rolls back). In Spring it surfaces as **`DataIntegrityViolationException`** (often at **flush/commit**, not at `save()`).

#### How do you handle a constraint violation?
- Translate it into a **business error**: catch `DataIntegrityViolationException`, check the **constraint name**, throw `DuplicateCertificationException` → handled by `@RestControllerAdvice` → **HTTP 409 Conflict** with a clear message.
- Call `saveAndFlush()` (or flush) **inside** the try if you need to catch it in the service, because the insert may otherwise happen only at commit.
- For idempotent inserts: `INSERT ... ON CONFLICT (certification_number) DO NOTHING` (native query) and check the affected row count.
- The transaction is **aborted** after the error in PostgreSQL — don't continue using it; retry in a new transaction if needed.

#### How do you keep business validation and DB constraints consistent?
- Treat them as **two layers of the same rule**: domain/app check = **fast, readable feedback**; constraint = **guarantee**.
- Define both from the **same rule** (name the constraint after it, e.g. `uk_active_cert_per_expert_type`), version the schema with **Flyway/Liquibase**, and **integration-test** both with a real PostgreSQL (Testcontainers) — including a concurrent-insert test.
- Map every constraint name to a business error in one place.

---

## 6. Angular — Component review & performance

#### What are the risks of calling methods directly from a template?
`{{ getFilteredItems() }}` or `*ngFor="let i of filter(items)"` is **re-executed on every change detection cycle** (every click, keystroke, timer, HTTP response anywhere in the app with default strategy). Expensive work (filtering, sorting, new arrays) runs constantly → **slow UI**, and returning a **new array each time** forces the DOM list to be re-rendered.

#### How do you improve filtering logic and avoid recomputation during change detection?
- Compute **once when inputs change**: an Angular **`computed()` signal**, a **pure pipe**, or an RxJS stream (`combineLatest` + `map`) rendered with the `async` pipe.
- Use **`trackBy`** / `@for (...; track item.id)` so only changed rows are re-rendered.
- **Debounce** search input (`debounceTime(300)`), and filter server-side for large data.

```ts
readonly search = signal('');
readonly experts = input.required<Expert[]>();
readonly filtered = computed(() => {
  const term = this.search().toLowerCase();
  return this.experts().filter(e => e.name.toLowerCase().includes(term));
});
```

#### How do you optimize change detection in a component?
- `changeDetection: ChangeDetectionStrategy.OnPush` → checked only when an **input reference** changes, an event fires in it, an `async` pipe/signal emits.
- Use **immutable updates** (new references) so OnPush sees changes.
- Prefer **signals** (fine-grained updates; zoneless-ready) and the `async` pipe over manual subscriptions.
- Avoid heavy getters/functions in templates; `trackBy` on lists; lazy-load/defer heavy parts (`@defer`).

#### How do you structure a component for readability, maintainability and testability?
- **Smart (container) vs dumb (presentational)** components: the container talks to services/state; presentational components get `input()`s and emit `output()`s.
- Data access and business logic in **services**, injected; components stay thin.
- **No manual subscriptions** without cleanup → `async` pipe, `takeUntilDestroyed()`, or signals (`toSignal`).
- Strong **typing** (no `any`), small templates, unit tests on services and presentational components with inputs/outputs.

---

## 7. Playwright — Testing & reliability

#### Why are E2E tests flaky?
- **Fixed waits** (`waitForTimeout(2000)`) — too short on a slow CI, too long locally.
- **Fragile selectors** (`div > span:nth-child(3)`, generated CSS classes).
- **Non-retrying assertions**: `expect(await locator.textContent()).toBe(...)` reads once, instead of web-first `await expect(locator).toHaveText(...)`.
- **Missing `await`** → race conditions.
- **Shared state / test order dependency**: tests reuse the same data or the same user, run in parallel.
- **Real backends / external services** with variable latency or data.

#### How do you make them reliable?
- Use **locators** with user-facing semantics: `getByRole('button', { name: 'Save' })`, `getByLabel`, `getByTestId` — Playwright **auto-waits** for them to be actionable.
- Use **web-first assertions** (`toBeVisible`, `toHaveText`, `toHaveURL`) which **retry** until timeout.
- Wait for **the real event**: `page.waitForResponse('**/api/experts')`, or an assertion on the resulting UI — never a sleep.
- **Isolate tests**: own data per test (API seeding / fixtures), fresh browser context, no ordering dependency.
- **Mock** unstable external dependencies with `page.route()` where the test doesn't target them.

#### What are the risks of fixed timeouts?
**Flaky** when the environment is slower than expected, **slow** suites when it's faster (you always pay the full wait), and they **hide** the real condition you're waiting for — when it breaks, the failure message says nothing useful.

#### How do you handle asynchronous operations in E2E tests?
Wait on **observable conditions**: an element state (web-first assertion), a **network response** (`waitForResponse`), a URL (`toHaveURL`), or `expect.poll()` for a backend state. Combine an action and its awaited response with `Promise.all` to avoid missing a fast response.

#### How do you tell a real bug from an unstable test?
- **Reproduce**: run the test repeatedly (`--repeat-each=20`), in isolation and in parallel, locally and on CI.
- Inspect the **trace viewer** (`trace: 'on-first-retry'`), screenshots, videos, network and console logs.
- A **consistent failure** in the same step with a wrong app behavior → **bug**. Random failures on timing/selection with a correct app → **test problem**. If it fails only under load/parallelism, it may be a **real race condition in the app** — don't just add retries.
- Track flaky tests (Playwright reports "flaky" when passing on retry) and **fix or quarantine** them, never ignore.

---

## 8. System design & application integration

#### Synchronous (REST) vs asynchronous (messaging) integration?
- **REST**: the caller needs the **answer now** (query, validation). Simple, but **temporal coupling**: if the other system is down or slow, so are you → timeouts, retries, circuit breaker.
- **Messaging (Kafka/queues)**: notify others that **something happened**; decoupled, resilient, absorbs load — but **eventual consistency**, duplicates (idempotent consumers), ordering and monitoring to handle.

#### How do you make integration with another (government) system robust?
- **Timeouts** everywhere, **retries with backoff** only on idempotent calls, **circuit breaker** (Resilience4j) to fail fast.
- **Idempotency keys** for commands, **Outbox pattern** for reliable event publishing, **dead letter** handling.
- An **anti-corruption layer** (adapter) so the external model doesn't leak into the domain.
- **Contract** with OpenAPI / schema registry, **versioning** (`/v1`), backward-compatible changes.
- **Observability**: correlation ID propagated, structured logs, metrics, alerts.

#### What do you check for security in a public-sector application?
Authentication/authorization (OAuth2/OIDC, roles **checked server-side** on every action), input validation, no sensitive data in logs (**GDPR**), **audit trail** of who changed what and when, least privilege for DB accounts, dependency vulnerability scanning, HTTPS everywhere.

#### How would you design an audit trail for legal records?
Every change records **who / when / what / why**: an append-only audit table or event log (e.g. **Hibernate Envers** or domain events persisted with the change in the **same transaction**). Never update/delete audit records; consider soft deletes for business data and retention rules.

---

## Exercises (with solutions)

> Do them like in the interview: read the code, **say out loud** what's wrong, then propose and justify the fix. Open the solution only after.

### Exercise 1 — Code review: the `Expert` class
What do you think of this class? What would you change?

```java
@Entity
public class Expert {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String status;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Certification> certifications = new ArrayList<>();

    public Expert() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }
}

@Entity
public class Certification {
    @Id @GeneratedValue
    private Long id;
    private String number;
    private String type;
    private Date validUntil;
    // + public getters and setters for everything
}
```

<details>
<summary>Solution</summary>

**Problems:**
- **Anemic model**: only data + public setters → all rules are elsewhere and **can be bypassed** (anyone can `setStatus("ACTIVE")`, `setValidUntil(null)`, `setId(...)`).
- `getCertifications()` returns the **mutable internal list**; `setCertifications()` replaces it → duplicates, invalid certifications, broken Hibernate collection tracking.
- `status` and `type` as free **`String`** → typos, invalid values; use **enums**.
- **`java.util.Date`** (mutable, legacy) → `LocalDate`.
- **No validation**: name/email can be null or invalid; no invariant like "no two certifications with the same number".
- **Public no-arg constructor** lets callers build an empty, invalid expert.
- `@OneToMany` without `mappedBy`/`@JoinColumn` → Hibernate creates a **join table**; probably not intended.
- No `equals/hashCode` strategy; `setId` exposes the technical identity.

**Refactoring (DDD + encapsulation):**

```java
@Entity
public class Expert {
    @Id @GeneratedValue
    private Long id;
    private String name;
    @Embedded
    private Email email;                       // value object, self-validating
    @Enumerated(EnumType.STRING)
    private ExpertStatus status;

    @OneToMany(mappedBy = "expert", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Certification> certifications = new HashSet<>();

    protected Expert() {}                      // for JPA only

    public static Expert register(String name, Email email) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name is required");
        Expert expert = new Expert();
        expert.name = name;
        expert.email = Objects.requireNonNull(email);
        expert.status = ExpertStatus.ACTIVE;
        return expert;
    }

    public void addCertification(CertificationType type, String number, LocalDate validUntil) {
        if (status != ExpertStatus.ACTIVE)
            throw new ExpertNotActiveException(id);
        if (certifications.stream().anyMatch(c -> c.hasNumber(number)))
            throw new DuplicateCertificationException(number);
        certifications.add(new Certification(this, type, number, validUntil));
    }

    public void revokeCertification(String number, String reason) {
        findCertification(number).revoke(reason);
    }

    public Set<Certification> certifications() {
        return Collections.unmodifiableSet(certifications);
    }
    // getters only where needed, no setters
}
```

- `Certification` constructor validates (`validUntil` in the future, number format…), exposes `revoke(reason)`, `isValidOn(date)` instead of setters.
- Add the **DB constraints** (`UNIQUE (certification_number)`, `NOT NULL`) as the final guarantee.
- Map to **DTOs** at the API boundary; never expose the entity as JSON.

**Expected follow-ups:** *"Isn't this too much code?"* → for real business rules, yes it's worth it (testable, safe); for pure CRUD, keep it simple. *"What about JPA requiring a no-arg constructor?"* → `protected` constructor + field access.

</details>

### Exercise 2 — `CaseFile` with an EAGER `@OneToMany`
What problems do you see? How would you improve it?

```java
@Entity
public class CaseFile {
    @Id @GeneratedValue
    private Long id;
    private String reference;

    @OneToMany(mappedBy = "caseFile", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Exhibit> exhibits = new ArrayList<>();

    public List<Exhibit> getExhibits() { return exhibits; }
    public void setExhibits(List<Exhibit> exhibits) { this.exhibits = exhibits; }
}

@Entity
public class Exhibit {
    @Id @GeneratedValue
    private Long id;
    private String reference;
    private String description;

    @ManyToOne
    private CaseFile caseFile;
    // public getters/setters
}

// Service
public List<CaseFileSummary> listOpenCases() {
    return caseFileRepository.findByStatus("OPEN").stream()
        .map(c -> new CaseFileSummary(c.getId(), c.getReference()))
        .toList();
}
```

<details>
<summary>Solution</summary>

**Problems:**
- **EAGER** on `@OneToMany`: `listOpenCases()` only needs id + reference, but **all exhibits** of all open cases are loaded → over-fetching; with a derived query, typically **N+1** (1 query for cases + 1 per case for exhibits).
- **No encapsulation**: `getExhibits()` returns the mutable list, `setExhibits()` replaces it → **duplicates** possible, back-reference `exhibit.caseFile` **not synchronized**, invariants (e.g. closed case) bypassable.
- **No duplicate protection**: `List` + no business-key equality + no DB constraint.
- `@ManyToOne` on `Exhibit` is **EAGER by default** too.
- `cascade = ALL` without `orphanRemoval` → removing from the list doesn't delete the row.

**Improved version:**

```java
@Entity
public class CaseFile {
    @Id @GeneratedValue
    private Long id;
    private String reference;
    @Enumerated(EnumType.STRING)
    private CaseStatus status;

    @OneToMany(mappedBy = "caseFile", cascade = CascadeType.ALL, orphanRemoval = true) // LAZY by default
    private Set<Exhibit> exhibits = new HashSet<>();

    protected CaseFile() {}

    public void addExhibit(String exhibitReference, String description) {
        if (status == CaseStatus.CLOSED) throw new CaseFileClosedException(reference);
        boolean exists = exhibits.stream().anyMatch(e -> e.hasReference(exhibitReference));
        if (exists) throw new DuplicateExhibitException(exhibitReference);
        exhibits.add(new Exhibit(this, exhibitReference, description)); // back-reference set in constructor
    }

    public void removeExhibit(String exhibitReference) {
        exhibits.removeIf(e -> e.hasReference(exhibitReference)); // orphanRemoval deletes it
    }

    public Set<Exhibit> exhibits() { return Collections.unmodifiableSet(exhibits); }
}

@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "uk_exhibit_ref_per_case",
                                             columnNames = {"case_file_id", "reference"}))
public class Exhibit {
    @Id @GeneratedValue
    private Long id;
    private String reference;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private CaseFile caseFile;

    protected Exhibit() {}
    Exhibit(CaseFile caseFile, String reference, String description) { /* validate + assign */ }

    boolean hasReference(String ref) { return reference.equals(ref); }
    // equals/hashCode on (caseFile, reference) or on ID with a stable strategy — never on a mutable field
}
```

- **Read side:** a **DTO projection** for the list — no entity, no exhibits loaded:
  ```java
  @Query("select new be.just.CaseFileSummary(c.id, c.reference) from CaseFile c where c.status = :status")
  List<CaseFileSummary> findSummariesByStatus(CaseStatus status);
  ```
- When exhibits **are** needed: `@EntityGraph(attributePaths = "exhibits")` or `join fetch` for that use case only.

**Follow-up:** *"Loading all exhibits to check duplicates is expensive for a case with 10,000 exhibits?"* → true: rely on the **DB unique constraint** + a targeted `existsByCaseFileIdAndReference` query, instead of loading the collection; or model exhibits as a separate aggregate referencing the case by ID.

</details>

### Exercise 3 — 200 certifications, number 137 fails validation
How many certifications are actually updated? Answer for each version.

```java
// Version A
@Transactional
public void renewAll(List<Long> ids) {
    for (Long id : ids) {
        Certification c = repository.findById(id).orElseThrow();
        c.renew();                     // #137 throws InvalidCertificationException (RuntimeException)
    }
}

// Version B — same loop, no @Transactional on renewAll, repository.save(c) after renew()

// Version C
@Transactional
public void renewAll(List<Long> ids) {
    for (Long id : ids) {
        try {
            renewalService.renew(id);  // other bean, @Transactional (REQUIRED)
        } catch (InvalidCertificationException e) {
            log.warn("Certification {} skipped", id);
        }
    }
}

// Version D — like C, but renewalService.renew() is @Transactional(propagation = REQUIRES_NEW)

// Version E — Version A, but InvalidCertificationException extends Exception (checked) and renewAll declares throws
```

<details>
<summary>Solution</summary>

| Version | Updated | Why |
|---|---|---|
| **A** | **0** | One transaction; the runtime exception leaves the method → **full rollback** of the 136 changes. |
| **B** | **136** | No outer transaction: each `save()` runs in its **own** repository transaction and commits; the loop stops at #137 → 1–136 saved, 137–200 never processed. |
| **C** | **0** + `UnexpectedRollbackException` | Inner `REQUIRED` joins the outer transaction; the exception crossing the inner proxy marks it **rollback-only**; catching it doesn't help → commit fails, everything rolled back. |
| **D** | **199** | Each item has its **own** transaction; #137 rolls back alone, the others commit. (Note: the outer transaction is suspended; `REQUIRES_NEW` needs an extra connection per call.) |
| **E** | **136** | **Checked** exception → by default Spring **commits** what was done before the exception (1–136); 137–200 not processed. Use `rollbackFor` if that's not intended. ⚠️ If `renew()` modified #137 **before** throwing, that dirty state is flushed too — validate **before** mutating. |

**What the interviewer wants to hear:** you reason about **where the transaction boundary is**, **which exception type**, and **whether it crosses a proxy**. Then: *ask the business* — all-or-nothing (A, with validation **before** writing) or best effort (D-like: one transaction per item/chunk, collect errors, return a report "199 OK, 1 failed: #137 – reason"), and make it **idempotent** so the batch can be rerun.

**Bonus — clean best-effort version:**

```java
public BatchReport renewAll(List<Long> ids) {           // no transaction here
    BatchReport report = new BatchReport();
    for (Long id : ids) {
        try {
            renewalService.renew(id);                  // @Transactional on another bean
            report.success(id);
        } catch (InvalidCertificationException e) {
            report.failure(id, e.getMessage());
        }
    }
    return report;
}
```

</details>

### Exercise 4 — Uniqueness of a certification number
Is this code safe? What would you change?

```java
@Transactional
public CertificationDto register(RegisterCertificationRequest req) {
    if (repository.existsByNumber(req.number())) {
        throw new DuplicateCertificationException(req.number());
    }
    Certification saved = repository.save(new Certification(req.number(), req.type(), req.validUntil()));
    return mapper.toDto(saved);
}
```

<details>
<summary>Solution</summary>

**Problem:** **check-then-act race**. Two concurrent requests with the same number both pass `existsByNumber()` (neither has committed yet) and both insert → **duplicate**. It also doesn't protect against other writers.

**Fix:**
1. **Unique constraint** in PostgreSQL (Flyway migration):
   ```sql
   ALTER TABLE certification ADD CONSTRAINT uk_certification_number UNIQUE (number);
   ```
2. **Keep** the `exists` check for a clean error message in the common case.
3. **Translate** the violation into a business error:

```java
@Transactional
public CertificationDto register(RegisterCertificationRequest req) {
    if (repository.existsByNumber(req.number())) {
        throw new DuplicateCertificationException(req.number());
    }
    try {
        Certification saved = repository.saveAndFlush(
            new Certification(req.number(), req.type(), req.validUntil()));
        return mapper.toDto(saved);
    } catch (DataIntegrityViolationException e) {
        if (isConstraint(e, "uk_certification_number")) {
            throw new DuplicateCertificationException(req.number());
        }
        throw e;
    }
}

// @RestControllerAdvice
@ExceptionHandler(DuplicateCertificationException.class)
ResponseEntity<ProblemDetail> duplicate(DuplicateCertificationException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage()));
}
```

- `saveAndFlush` so the INSERT runs **inside** the `try` (otherwise the violation may only appear at commit, outside the method).
- Challenge-ready nuance: the exception crosses the repository's own transactional proxy, so the transaction is already marked **rollback-only** — fine here because we **rethrow**; you could not "catch and continue" in the same transaction.
- After a constraint violation PostgreSQL **aborts the transaction** — don't keep using it.
- **Test it**: integration test with Testcontainers PostgreSQL firing two inserts **concurrently** and asserting one 201 + one 409.

**Follow-up:** *"Uniqueness only for active certifications?"* → **partial unique index** `... WHERE revoked_at IS NULL`. *"Case-insensitive?"* → unique index on `lower(number)` (or a normalized value object).

</details>

### Exercise 5 — Angular component review
Identify the performance and design problems.

```ts
@Component({
  selector: 'app-expert-list',
  template: `
    <input (keyup)="search = $any($event.target).value" />
    <div *ngFor="let expert of getFilteredExperts()">
      {{ expert.name }} — {{ formatCertifications(expert) }}
    </div>
  `,
})
export class ExpertListComponent implements OnInit {
  experts: any[] = [];
  search = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/experts').subscribe(data => this.experts = data);
  }

  getFilteredExperts() {
    return this.experts
      .filter(e => e.name.toLowerCase().includes(this.search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  formatCertifications(expert: any) {
    return expert.certifications.map((c: any) => c.type).join(', ');
  }
}
```

<details>
<summary>Solution</summary>

**Problems:**
- `getFilteredExperts()` and `formatCertifications()` are **called from the template** → re-executed on **every change detection cycle** (any event in the app), filtering + sorting the whole list each time.
- It returns a **new array** every time and there's **no `trackBy`** → Angular re-creates the DOM rows.
- **Default change detection** (no `OnPush`).
- Search on **every keyup** without debounce; filtering client-side may not scale to large data.
- **`any` everywhere** → no type safety.
- **HTTP call directly in the component** → hard to test, logic not reusable; manual `subscribe` (fine for HttpClient since it completes, but a bad habit for long-lived streams); **no loading/error handling**.

**Improved version (Angular 17+ with signals):**

```ts
@Component({
  selector: 'app-expert-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input [value]="search()" (input)="search.set($any($event.target).value)" />
    @for (expert of filteredExperts(); track expert.id) {
      <app-expert-row [expert]="expert" />
    } @empty {
      <p>No expert found.</p>
    }
  `,
})
export class ExpertListComponent {
  private readonly expertService = inject(ExpertService);

  readonly search = signal('');
  readonly experts = toSignal(this.expertService.getExperts(), { initialValue: [] as Expert[] });

  readonly filteredExperts = computed(() => {
    const term = this.search().toLowerCase();
    return this.experts()
      .filter(e => e.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
}
```

- `computed()` recalculates **only when `search` or `experts` change**.
- `track expert.id` → minimal DOM updates; `OnPush` → fewer checks.
- `ExpertService` handles HTTP (mockable in tests); typed `Expert` interface.
- Certification labels: compute them **once** in the mapping/service or a **pure pipe** (`{{ expert.certifications | certificationTypes }}`), inside a presentational `ExpertRowComponent`.
- For large lists: **server-side** filtering with debounced search (`debounceTime(300)`, `switchMap`), pagination or virtual scroll.

</details>

### Exercise 6 — Flaky Playwright tests
Why are these tests flaky? How would you fix them?

```ts
test('create expert', async ({ page }) => {
  await page.goto('/experts');
  await page.click('.btn-primary');
  await page.fill('#name', 'John Doe');
  await page.click('text=Save');
  await page.waitForTimeout(3000);
  const rows = await page.locator('table tr').count();
  expect(rows).toBe(6);
});

test('delete expert', async ({ page }) => {
  await page.goto('/experts');
  await page.click('table tr:nth-child(6) .delete');
  await page.waitForTimeout(2000);
  expect(await page.locator('table tr').count()).toBe(5);
});
```

<details>
<summary>Solution</summary>

**Why flaky:**
- **`waitForTimeout`**: arbitrary sleeps — too short on a slow CI, wasted time when fast.
- **Non-retrying assertions**: `count()` is read **once**; if the table isn't refreshed yet, it fails.
- **Depends on existing data**: "6 rows" assumes exactly 5 experts in the DB — other tests or parallel runs change that.
- **Test order dependency**: `delete expert` relies on the row created by `create expert` (and `nth-child(6)`); with parallel/random order or a retry, it breaks.
- **Fragile selectors**: `.btn-primary`, `table tr:nth-child(6)`, `text=Save` (ambiguous if two "Save" exist).
- `table tr` also counts the **header row**.

**Fixed version:**

```ts
test('create expert', async ({ page }) => {
  const name = `Expert ${Date.now()}`;                    // unique test data
  await page.goto('/experts');
  await page.getByRole('button', { name: 'New expert' }).click();
  await page.getByLabel('Name').fill(name);

  const created = page.waitForResponse(r =>
    r.url().includes('/api/experts') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Save' }).click();
  expect((await created).ok()).toBeTruthy();

  await expect(page.getByRole('row', { name })).toBeVisible();   // retries until visible
});

test('delete expert', async ({ page, request }) => {
  const name = `Expert ${Date.now()}`;
  await request.post('/api/experts', { data: { name } });   // own setup, independent of other tests

  await page.goto('/experts');
  const row = page.getByRole('row', { name });
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(row).toHaveCount(0);                          // retries until gone
});
```

- **Role/label locators** (auto-wait, resilient to CSS changes), or `data-testid`.
- **Web-first assertions** that retry; wait for the **real** network response instead of sleeping.
- **Each test creates its own data** (API seeding/fixtures) and asserts on **that** data, not on global counts.
- Config: `retries` on CI + `trace: 'on-first-retry'` to **diagnose**, not to hide flakiness.

**Bug or flaky test?** Run with `--repeat-each`, check the **trace**: if the app really shows a wrong state → bug; if the app is correct but the test read too early / matched the wrong element → test problem; if it fails only in parallel → possibly a **real concurrency bug** in the app.

</details>

### Exercise 7 — Where does the business logic belong?
Review this application service.

```java
@Service
public class CertificationService {
    @Transactional
    public void renew(Long certificationId, LocalDate newValidUntil) {
        Certification c = repository.findById(certificationId).orElseThrow();
        if (c.getStatus().equals("REVOKED")) {
            throw new IllegalStateException("Revoked certification");
        }
        if (newValidUntil.isBefore(c.getValidUntil())) {
            throw new IllegalArgumentException("Invalid date");
        }
        if (newValidUntil.isAfter(LocalDate.now().plusYears(5))) {
            throw new IllegalArgumentException("Max 5 years");
        }
        c.setValidUntil(newValidUntil);
        c.setStatus("ACTIVE");
        c.setRenewalCount(c.getRenewalCount() + 1);
        repository.save(c);
        mailService.sendRenewalMail(c.getExpert().getEmail());
    }
}
```

<details>
<summary>Solution</summary>

**Problems:**
- **Business rules in the application service** (revoked check, date rules, 5-year max) + entity mutated via **setters** → another use case (batch, Kafka listener) can renew without these rules.
- String status, generic exceptions (`IllegalStateException`) → unclear API errors.
- `LocalDate.now()` hard-coded → hard to test; inject a **`Clock`**.
- `repository.save(c)` is **unnecessary** (managed entity, dirty checking).
- **Mail sent inside the transaction**: if the commit fails afterwards, the mail is already sent; a slow SMTP holds the transaction/connection open. → publish a **domain event** handled **after commit** (`@TransactionalEventListener(phase = AFTER_COMMIT)`) or via an **outbox**.
- `c.getExpert().getEmail()` → potential lazy loading inside the service.

**Refactored:**

```java
// Domain
public class Certification {
    public void renew(LocalDate newValidUntil, Clock clock) {
        if (status == CertificationStatus.REVOKED) throw new CertificationRevokedException(number);
        if (!newValidUntil.isAfter(validUntil)) throw new InvalidRenewalDateException(number, newValidUntil);
        if (newValidUntil.isAfter(LocalDate.now(clock).plusYears(5))) throw new RenewalTooLongException(number);
        this.validUntil = newValidUntil;
        this.status = CertificationStatus.ACTIVE;
        this.renewalCount++;
        registerEvent(new CertificationRenewed(id, newValidUntil));
    }
}

// Application service = orchestration only
@Transactional
public void renew(RenewCertificationCommand cmd) {
    Certification c = repository.findById(cmd.id()).orElseThrow(() -> new CertificationNotFoundException(cmd.id()));
    c.renew(cmd.newValidUntil(), clock);
}

// Side effect after commit
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
void on(CertificationRenewed event) { notificationPort.sendRenewalConfirmation(event); }
```

The rules are now **unit-testable without Spring**, impossible to bypass, and the mail is sent **only if the data is committed**.

</details>
