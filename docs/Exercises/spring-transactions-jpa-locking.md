---
sidebar_position: 1
title: Spring Transactions, JPA & Locking
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import TOCInline from '@theme/TOCInline';

# Spring Transactions, JPA & Locking — Exercises

**How to use this page:** read the code or scenario, answer **out loud** as if you were in the interview, then click **Solution** to check yourself.
A good answer structure: *define the concept → explain the problem → short example → one trade-off → link it to a production scenario.*

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={3} />

## Part 1 — Code review: find the bug

### Exercise 1 — Private transactional method
What's wrong with this code?

```java
@Service
public class InvoiceService {
    public void createInvoice() {
        saveInvoice();
    }

    @Transactional
    private void saveInvoice() {
        // Insert invoice and invoice lines.
    }
}
```

<details>
<summary>Solution</summary>

Two problems: the method is **private** and it is called through **self-invocation** (`this.saveInvoice()`). The Spring proxy intercepts neither, so **no transaction is started** — if inserting a line fails, the invoice may already be saved.

**Fix:** put `@Transactional` on the public, externally invoked method (`createInvoice()`), or move `saveInvoice()` to another Spring bean and call it through that bean.

</details>

### Exercise 2 — Checked exception
The file is invalid. Is the `DataRecord` saved?

```java
@Transactional
public void importData() throws IOException {
    repository.save(new DataRecord());
    throw new IOException("Invalid input");
}
```

<details>
<summary>Solution</summary>

**Yes, it is committed.** By default Spring rolls back only on `RuntimeException` and `Error` — **not on checked exceptions** like `IOException`.

**Fix:** `@Transactional(rollbackFor = IOException.class)` (or `rollbackFor = Exception.class`). The opposite option, `noRollbackFor`, lists exceptions that should *not* trigger a rollback.

</details>

### Exercise 3 — Self-invocation and `REQUIRES_NEW`
The goal is: the audit row must be saved even if `runJob()` fails. Does it work?

```java
@Service
public class JobService {
    @Transactional
    public void runJob() {
        saveAudit();
        // ... job work that may throw
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveAudit() {
        // Audit insert
    }
}
```

<details>
<summary>Solution</summary>

**No.** `saveAudit()` is called internally on `this`, which **bypasses the proxy** — `REQUIRES_NEW` is ignored and the audit insert runs **inside `runJob()`'s transaction**. If the job fails, the audit row is rolled back too.

**Fix:** move `saveAudit()` to a separate `AuditService` bean and inject it. Then it runs in its own transaction B, which commits independently of A.

</details>

### Exercise 4 — Catching the inner exception
`reserve()` fails, but `checkout()` catches the exception. What happens when `checkout()` returns?

```java
@Service
public class CheckoutService {
    private final InventoryService inventory;

    public CheckoutService(InventoryService inventory) {
        this.inventory = inventory;
    }

    @Transactional
    public void checkout() {
        try {
            inventory.reserve();
        } catch (RuntimeException ex) {
            // log and continue
        }
    }
}

@Service
public class InventoryService {
    @Transactional // REQUIRED by default
    public void reserve() {
        throw new IllegalStateException("Cannot reserve");
    }
}
```

<details>
<summary>Solution</summary>

Both methods share **one physical transaction** (`REQUIRED`). When the exception leaves `reserve()` through the proxy, the interceptor marks the shared transaction **rollback-only**. Catching the exception does **not** clear that marker.

When `checkout()` tries to commit, Spring rolls back and throws **`UnexpectedRollbackException`** — the caller thinks it succeeded, but nothing is saved.

**Fixes:** let the exception propagate; or make `reserve()` `REQUIRES_NEW` if it really should be independent; or don't throw across a transactional boundary (return a result instead).

</details>

### Exercise 5 — Concurrent stock decrease
Two requests call this method at the same time for the same product. What can go wrong?

```java
@Transactional
public void decreaseStock(Long id, int amount) {
    Inventory inventory = repository.findById(id).orElseThrow();
    inventory.setQuantity(inventory.getQuantity() - amount);
}
```

<details>
<summary>Solution</summary>

A **lost update**: both transactions read the same quantity and the last write overwrites the first one. There is also no check against negative stock (overselling).

**Fixes:**
- **Optimistic locking**: add `@Version` — the second update hits 0 rows and fails with an optimistic locking exception.
- **Pessimistic locking**: load with `@Lock(PESSIMISTIC_WRITE)` (`SELECT … FOR UPDATE`) so the second transaction waits.
- **Atomic conditional update**: `UPDATE inventory SET quantity = quantity - :amount WHERE id = :id AND quantity >= :amount` and check the row count.

</details>

### Exercise 6 — Ignoring the `merge()` return value
Is the new name saved?

```java
Product detached = loadDetachedProduct();
entityManager.merge(detached);
detached.setName("New name");
```

<details>
<summary>Solution</summary>

**No.** `merge()` copies the state into a **managed** instance and **returns it**; the object you passed in **stays detached**, so changes to it are not tracked.

```java
Product managed = entityManager.merge(detached);
managed.setName("New name"); // tracked by dirty checking
```

</details>

### Exercise 7 — Flush mistaken for commit
A colleague says: "I called `flush()`, so the product is in the database even if the method fails." True?

```java
@Transactional
public void save() {
    repository.save(new Product());
    entityManager.flush();
    throw new RuntimeException("Failure after flush");
}
```

<details>
<summary>Solution</summary>

**False.** `flush()` **sends the SQL** but does **not commit**. The unchecked exception causes a rollback, which also undoes the flushed `INSERT`.

Same for `saveAndFlush()` in Spring Data JPA: it forces a flush, never a commit.

</details>

### Exercise 8 — Lazy loading after the transaction
This controller sometimes throws an exception. Which one, and why?

```java
@GetMapping("/orders/{id}/customer-name")
public String customerName(@PathVariable Long id) {
    Order order = orderService.findById(id); // @Transactional(readOnly = true) inside the service
    return order.getCustomer().getName();     // customer is LAZY
}
```

<details>
<summary>Solution</summary>

**`LazyInitializationException`**: the transaction (and persistence context) ended when `findById()` returned, so the lazy `customer` proxy can no longer be initialized. (It may "work" only if Open Session in View is enabled — don't rely on it.)

**Fix:** fetch what the use case needs **inside the service transaction** (`JOIN FETCH` / `@EntityGraph`) and return a **DTO** instead of the entity.

</details>

### Exercise 9 — Slow order list
This endpoint is very slow with 100 orders. Why?

```java
@Transactional(readOnly = true)
public List<OrderDto> list() {
    return orderRepository.findAll().stream()
        .map(o -> new OrderDto(o.getId(), o.getCustomer().getName())) // customer is LAZY
        .toList();
}
```

<details>
<summary>Solution</summary>

**N+1 queries:** 1 query for the orders + 1 query per order to load its customer = **101 queries**.

**Fix:** a fetch join, an entity graph, a DTO projection, or batch fetching:

```java
@Query("select o from Order o join fetch o.customer")
List<Order> findAllWithCustomer();
```

Don't make the association `EAGER` everywhere, and be careful with **collection** fetch joins + pagination.

</details>

### Exercise 10 — Database update + Kafka
Is this method safe?

```java
@Transactional
public void createOrder(CreateOrderCommand command) {
    Order order = orderRepository.save(Order.create(command));
    kafkaTemplate.send("orders", order.getId().toString(), new OrderCreated(order.getId()));
}
```

<details>
<summary>Solution</summary>

**No.** `@Transactional` covers the **database only** — the save and the Kafka send are not atomic:
- Kafka send succeeds but the DB commit fails → consumers see an order that doesn't exist.
- DB commits but the Kafka send fails → the order exists but nobody is notified.

**Fix: Transactional Outbox.** Save the order **and** an `OutboxEvent` row in the same DB transaction; a separate publisher (polling or CDC/Debezium) sends outbox rows to Kafka. Publication can happen more than once, so **consumers must be idempotent**.

</details>

### Exercise 11 — Idempotent consumer under concurrency
The same event can be delivered twice, possibly at the same time on two instances. Is this handler safe?

```java
@Transactional
public void handle(OrderCreated event) {
    if (processedEventRepository.existsById(event.eventId())) {
        return;
    }
    orderProjectionRepository.updateFrom(event);
    processedEventRepository.save(new ProcessedEvent(event.eventId()));
}
```

<details>
<summary>Solution</summary>

**Almost.** Sequential duplicates are handled, and the business update and the "processed" marker are committed in the **same transaction** (correct). But two **concurrent** deliveries can both pass `existsById()` before either commits.

**Fix:** add a **unique constraint / primary key on the event ID** in the processed-events table. The second transaction then fails on insert and rolls back its business update.

</details>

## Part 2 — Scenarios: predict and design

### Scenario 1 — Lost update in numbers
Stock is **10**. Transaction A reads 10, transaction B reads 10. A subtracts 2 and writes. B subtracts 3 and writes. What is the final stock, and what should it be?

<details>
<summary>Solution</summary>

Final value: **7** (B overwrites A's 8). Correct value: **5**. A's update is **lost** because B wrote a value computed from a **stale read**.

With `@Version`, B's update would affect 0 rows → optimistic locking exception → B reloads (stock 8) and retries → 5.

</details>

### Scenario 2 — `REQUIRED` vs `REQUIRES_NEW`
`OrderService.createOrder()` (transaction A) calls `auditService.recordAttempt()` through the injected bean, then throws a `RuntimeException`. Is the audit row saved if `recordAttempt()` uses **(a)** `REQUIRED`, **(b)** `REQUIRES_NEW`?

<details>
<summary>Solution</summary>

- **(a) `REQUIRED`**: the audit joins transaction A → **rolled back** with the order.
- **(b) `REQUIRES_NEW`**: A is suspended, the audit runs in transaction B which **commits** → the audit row **survives** A's rollback.

Use `REQUIRES_NEW` only when independent commit is intentional (audit, error log): it needs a **second DB connection** while A is suspended and increases connection-pool pressure.

</details>

### Scenario 3 — "Nobody can read this row"
A developer says: "After `PESSIMISTIC_WRITE`, nobody can read this row until I commit." Correct?

<details>
<summary>Solution</summary>

**Not necessarily.** Conflicting lock requests (`FOR UPDATE`) and writes are blocked, but in databases like PostgreSQL an **ordinary `SELECT` still reads the last committed version** (MVCC). Exact behavior depends on the database and isolation level.

</details>

### Scenario 4 — The last item in stock
Two users click "Buy" on the last item at the same moment. How do you make sure only one succeeds?

<details>
<summary>Solution</summary>

Options (pick based on contention):
1. **Atomic conditional update** — simplest and very efficient:
   ```sql
   UPDATE inventory SET quantity = quantity - :amount
   WHERE id = :id AND quantity >= :amount;
   ```
   1 row updated → reserved; 0 rows → out of stock (or item missing — distinguish if the API needs it).
2. **Optimistic locking** (`@Version`) + bounded retry — good when conflicts are rare.
3. **Pessimistic lock** (`PESSIMISTIC_WRITE`) with a short transaction — good for hot items with high contention.

</details>

### Scenario 5 — Deadlock
Transaction A locks account 1 then wants account 2. Transaction B locks account 2 then wants account 1. What happens, and how do you reduce the risk?

<details>
<summary>Solution</summary>

A **deadlock**: each waits for a lock held by the other. The database detects it and aborts one transaction.

Reduce the risk:
- Acquire locks in a **consistent order** (e.g. always lock the lower account ID first).
- Keep transactions **short**; no remote/HTTP calls while holding locks.
- Use **bounded retries** for operations that are safe to repeat.

Pessimistic locking does **not** prevent deadlocks by itself — it can make them more likely.

</details>

### Scenario 6 — Isolation of a joined transaction
`reportService.generate()` is annotated `@Transactional(isolation = Isolation.REPEATABLE_READ)` and is called from a method that already runs a `READ_COMMITTED` transaction (default `REQUIRED` propagation). Which isolation level applies?

<details>
<summary>Solution</summary>

**`READ_COMMITTED`** — the outer one. Isolation is chosen when a transaction **starts**; a method that **joins** an existing transaction cannot change its isolation level. To get `REPEATABLE_READ`, the method must start the transaction itself (be the entry point, or use `REQUIRES_NEW`).

</details>

### Scenario 7 — `synchronized` to prevent overselling
To fix overselling, a developer adds `synchronized` to `decreaseStock()`. The application runs on **3 instances** behind a load balancer. Is the problem solved?

<details>
<summary>Solution</summary>

**No.** A Java monitor only coordinates threads **within one JVM**. Requests on different instances (and other DB clients) are not coordinated. It also serializes all products, not just the same one.

Use **database-level** concurrency control: `@Version`, a pessimistic lock, or an atomic conditional `UPDATE`.

</details>

### Scenario 8 — Automatic retry on optimistic lock
On `OptimisticLockException`, a developer wants to automatically retry the whole `placeOrder()` method, which also sends a confirmation email. Good idea?

<details>
<summary>Solution</summary>

**Not blindly.** Retry only when the operation is **safe to repeat** and it **reloads fresh state**. Here the retry could send the email **twice**, or hide a real business conflict (e.g. the price changed).

Use **bounded retries with backoff** around the DB part only, move side effects after commit (e.g. outbox), or return a conflict to the caller (HTTP `409`) so they can refresh.

</details>

### Scenario 9 — Saga compensation
Order service creates the order, payment service charges the customer, then inventory service fails to reserve stock. What should happen?

<details>
<summary>Solution</summary>

Run **compensating actions**: refund the payment and cancel the order. This is **not a distributed rollback** — the payment was committed; the refund is a **new business operation** that can itself fail and must be retried / monitored (and be idempotent).

Coordinate it by **choreography** (services react to events) or **orchestration** (a coordinator drives the steps and compensations).

</details>

## Part 3 — Quick-fire questions

### Q1. `@Transactional` on a class vs on a method?
<details>
<summary>Answer</summary>

Class-level = **default settings** for the eligible methods of the class; method-level **overrides** them. A common pattern: read-only by default, write methods override.

```java
@Service
@Transactional(readOnly = true)
public class CustomerService {
    public Customer find(Long id) { return repository.findById(id).orElseThrow(); }

    @Transactional
    public void rename(Long id, String name) {
        repository.findById(id).orElseThrow().setName(name);
    }
}
```

</details>

### Q2. What does `readOnly = true` guarantee?
<details>
<summary>Answer</summary>

It is a **hint**: Spring/Hibernate can optimize (e.g. skip dirty checking, flush mode manual) and some drivers/databases enforce read-only. It is **not** a universal guarantee that no write happens — never use it as a security boundary.

</details>

### Q3. How do you mark a transaction for rollback without throwing?
<details>
<summary>Answer</summary>

```java
TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
```

Use it deliberately — the caller sees a normal return but nothing is committed.

</details>

### Q4. What is a transaction timeout for?
<details>
<summary>Answer</summary>

`@Transactional(timeout = 5)` limits how long the transaction may run, so a slow transaction doesn't hold **locks and connections** forever. Exact enforcement depends on the transaction manager and resource.

</details>

### Q5. Fill in: what does each propagation do?
`REQUIRED`, `REQUIRES_NEW`, `SUPPORTS`, `MANDATORY`, `NOT_SUPPORTED`, `NEVER`, `NESTED`

<details>
<summary>Answer</summary>

| Propagation | Meaning |
|---|---|
| `REQUIRED` (default) | Join the current transaction; create one if none exists |
| `REQUIRES_NEW` | Suspend the current transaction; start an independent one |
| `SUPPORTS` | Join if one exists; otherwise run without a transaction |
| `MANDATORY` | Require an existing transaction; otherwise throw |
| `NOT_SUPPORTED` | Suspend any existing transaction; run without one |
| `NEVER` | Throw if a transaction exists |
| `NESTED` | Savepoint inside the existing transaction (if supported) |

</details>

### Q6. When is `NESTED` useful, and how is it different from `REQUIRES_NEW`?
<details>
<summary>Answer</summary>

`NESTED` creates a **savepoint** in the **same** transaction: the inner part can roll back to the savepoint while the outer continues — but if the outer rolls back, the inner work is rolled back too. `REQUIRES_NEW` is a **separate** transaction that commits independently. `NESTED` needs support from the transaction manager (e.g. JDBC savepoints; not JPA's default manager).

</details>

### Q7. Can one `@Transactional` span two databases?
<details>
<summary>Answer</summary>

A local transaction controls **one resource**. Atomic commit across several requires a distributed protocol (**JTA/XA**, two-phase commit). Microservices usually avoid it and use local transactions + **Outbox / Saga** + idempotency instead.

</details>

### Q8. Why keep transactions short?
<details>
<summary>Answer</summary>

Long transactions hold **connections and locks** longer → more contention, deadlocks, pool exhaustion and timeouts. Never do remote HTTP calls or wait for user input inside a DB transaction.

</details>

### Q9. `save()` vs `saveAndFlush()`?
<details>
<summary>Answer</summary>

`save()` persists/merges, but the SQL may be **deferred** until flush/commit. `saveAndFlush()` also **flushes immediately** (useful to get constraint violations early) — it still does **not commit**.

</details>

### Q10. Does calling `save()` twice on the same entity create two rows?
<details>
<summary>Answer</summary>

**Not necessarily.** Spring Data's `save()` chooses `persist` (new entity) or `merge` (existing) based on its **new-entity detection** (ID null, `@Version` null, or `Persistable.isNew()`). For an already managed entity, `save()` isn't even needed — dirty checking is enough.

</details>

### Q11. What is the persistence context?
<details>
<summary>Answer</summary>

The JPA **unit of work** that manages entity instances: it guarantees **identity** (same ID → same Java instance within the context), **tracks changes** (dirty checking) and coordinates **flushing**.

</details>

### Q12. First-level vs second-level cache in Hibernate?
<details>
<summary>Answer</summary>

- **First-level**: the persistence context itself, scoped to one `EntityManager`/`Session`. Always on, not shared.
- **Second-level**: **optional**, shared across sessions (`SessionFactory` scope, e.g. Ehcache/Caffeine). Reduces reads for suitable entities but needs a careful cache strategy and invalidation — especially if other applications modify the data.

</details>

### Q13. JPQL vs native SQL?
<details>
<summary>Answer</summary>

**JPQL** queries the **entity model** (entity names and attributes) and is portable. **Native SQL** queries **tables and columns** directly — use it for database-specific features or queries that are hard to express in JPQL.

</details>

### Q14. Why is pagination with a collection fetch join problematic?
<details>
<summary>Answer</summary>

`join fetch o.lines` multiplies rows per parent, so `LIMIT/OFFSET` on joined rows doesn't match "page of orders" — Hibernate then loads everything and paginates **in memory** (it logs a warning). **Fix:** page the parent **IDs** first, then fetch the associations for those IDs in a second query.

</details>

### Q15. `FetchType.LAZY` vs `FetchType.EAGER`?
<details>
<summary>Answer</summary>

`LAZY` loads the association **on access**; `EAGER` loads it **with the entity** — but not necessarily in one join (it can trigger extra queries, even N+1). Prefer `LAZY` and fetch explicitly per use case. Defaults: `@ManyToOne`/`@OneToOne` are EAGER, `@OneToMany`/`@ManyToMany` are LAZY.

</details>

### Q16. `CascadeType.REMOVE` vs `orphanRemoval = true`?
<details>
<summary>Answer</summary>

`CascadeType.REMOVE` deletes children **when the parent is deleted**. `orphanRemoval = true` also deletes a child **when it is removed from the parent's collection**. Use them only when the parent truly **owns** the child's lifecycle.

</details>

### Q17. What is the trade-off of a database index?
<details>
<summary>Answer</summary>

Faster lookups for matching predicates, joins and ordering — at the cost of **storage** and **slower inserts/updates/deletes**. Add indexes based on real query patterns and execution plans, not on every column.

</details>

### Q18. Does `@Version` protect against every concurrent modification?
<details>
<summary>Answer</summary>

**No.** It protects version-aware updates of that entity through JPA. **Bulk JPQL updates, native SQL and external writers** bypass the check unless they handle the version explicitly. Be careful when mixing bulk updates with managed entities.

</details>

### Q19. Database lock vs Java `synchronized`?
<details>
<summary>Answer</summary>

A database lock coordinates **transactions across all application instances and DB clients**. `synchronized` coordinates **threads within one JVM** only. In a horizontally scaled app, `synchronized` cannot replace DB concurrency control (see Scenario 7).

</details>

### Q20. Optimistic concurrency outside JPA — how in a REST API?
<details>
<summary>Answer</summary>

The client reads a version/**`ETag`** and sends it back with **`If-Match`** on update. The server applies the update only if the version is still current; otherwise it returns **`412 Precondition Failed`**.

</details>

### Q21. How would you sum up your transaction strategy in a microservice interview?
<details>
<summary>Answer</summary>

> "I keep database transactions **local and short**, with the boundary around one business operation in the service layer. For concurrent updates I use **optimistic locking** with `@Version` when conflicts are rare, and **pessimistic locking or atomic SQL** when contention is high. When a DB change must produce a Kafka event, I use an **Outbox** so the business update and the event are committed together, and my consumers are **idempotent** because delivery can be repeated."

</details>

## Part 4 — Self-test: answer aloud

No solutions here — answer from memory, then check the linked page.

1. Why can a checked exception leave a transaction committed? → [Exercise 2](#exercise-2--checked-exception)
2. Explain the difference between `REQUIRED` and `REQUIRES_NEW`. → [Scenario 2](#scenario-2--required-vs-requires_new)
3. Why can catching an inner exception still lead to `UnexpectedRollbackException`? → [Exercise 4](#exercise-4--catching-the-inner-exception)
4. What is the difference between flush and commit? → [Exercise 7](#exercise-7--flush-mistaken-for-commit)
5. Why does `merge()` return a different managed object? → [Exercise 6](#exercise-6--ignoring-the-merge-return-value)
6. How does `@Version` detect a lost update? → [Scenario 1](#scenario-1--lost-update-in-numbers)
7. Why might an ordinary read still succeed while another transaction holds a pessimistic write lock? → [Scenario 3](#scenario-3--nobody-can-read-this-row)
8. How would you prevent two users from buying the last item at the same time? → [Scenario 4](#scenario-4--the-last-item-in-stock)
9. Why is `@Transactional` insufficient for a database update plus a Kafka publish? → [Exercise 10](#exercise-10--database-update--kafka)
10. How do Outbox and consumer idempotency work together? → [Exercise 11](#exercise-11--idempotent-consumer-under-concurrency)
