import TOCInline from '@theme/TOCInline';


# Kafka
# <TOCInline toc={toc} />

## What is Apache Kafka?
Apache Kafka is a **distributed event streaming platform** used to **publish, store, and process streams of records** (messages) in real time.
- It's built around a **publish/subscribe** model but, unlike traditional message queues, it **persists messages on disk** and lets consumers re-read them, making it usable both as a messaging system and as a **durable event log**.
- Common use cases: decoupling microservices, real-time analytics/streaming pipelines, event sourcing, log aggregation, metrics collection.

## What are the core concepts of Kafka (Topic, Partition, Broker, Producer, Consumer)?
- **Topic**: a named stream/category of records (e.g. `orders`, `payments`).
- **Partition**: a topic is split into one or more partitions — each partition is an **ordered, append-only log**. Partitioning is what allows Kafka to scale horizontally and parallelize consumption.
- **Broker**: a Kafka server that stores partitions and serves producer/consumer requests. A **cluster** is made of multiple brokers.
- **Producer**: a client that **publishes** (writes) records to a topic.
- **Consumer**: a client that **subscribes** to and **reads** records from a topic.
- **Offset**: a unique, sequential id of a record within a partition — consumers track their position by offset.

## How does Kafka guarantee message ordering?
Kafka only guarantees ordering **within a single partition**, not across an entire topic.
- Records with the **same key** are always routed to the **same partition** (via the key's hash), so per-key ordering is preserved (e.g. all events for a given `orderId` are processed in order).
- If strict global ordering across all messages is required, the topic must use a **single partition** — at the cost of losing the parallelism that multiple partitions provide.

- In practice: use the **business ID as the message key** (e.g. `kafkaTemplate.send("orders", orderId, event)`) — different orders are processed in parallel while each order's events stay in order. The producer must send them in the intended order, and the consumer must not process same-key records concurrently.

## What is a Consumer Group, and how does Kafka scale consumption?
A **Consumer Group** is a set of consumers that cooperate to consume a topic, identified by a shared `group.id`.
- Kafka assigns each partition of the topic to **exactly one consumer** within the group at a time — so a topic with N partitions can be consumed in parallel by **up to N consumers** in the same group (extra consumers beyond N stay idle).
- Different consumer groups are **independent**: each group gets its own copy of every message (this is how Kafka supports both queue-like behavior *and* pub/sub broadcast behavior at once).
- If a consumer in the group fails, Kafka triggers a **rebalance**, reassigning its partitions to the remaining consumers.

- Example with 3 partitions: 2 consumers → one gets 2 partitions, the other 1; 3 consumers → one each; 4 consumers → **one stays idle** (exact assignment depends on the assignment strategy).

## How does Kafka achieve durability and fault tolerance (Replication, Leader/Follower)?
- Each partition has a configurable **replication factor** — copies of the partition (**replicas**) are stored on multiple brokers.
- One replica is the **leader**, handling all reads/writes for that partition; the others are **followers** that replicate data from the leader.
- **In-Sync Replicas (ISR)**: followers that are sufficiently caught up with the leader. If the leader broker fails, a new leader is elected from the ISR set, so the partition stays available with no data loss (as long as `acks`/replication is configured correctly).
- Kafka uses **ZooKeeper** (older versions) or **KRaft** (newer versions, ZooKeeper-less) to manage cluster metadata and leader election.

## What is the difference between partitioning and replication?
- **Partitioning** splits a topic into partitions → **scalability and parallelism**. A partition is also the **unit of ordering**.
- **Replication** copies each partition to several brokers → **fault tolerance and availability**.

Memory aid: *partitioning helps you scale; replication helps you survive broker failures.*

## What is the difference between `acks=0`, `acks=1`, and `acks=all` on a Producer?
This setting controls the **delivery guarantee / durability trade-off** for produced messages:
- **`acks=0`**: producer doesn't wait for any acknowledgment — fastest, but messages can be **lost** if the broker fails.
- **`acks=1`**: producer waits for the **leader** to acknowledge the write — good balance, but data can still be lost if the leader fails before followers replicate it.
- **`acks=all`** (or `-1`): producer waits for **all in-sync replicas** to acknowledge — strongest durability guarantee, at the cost of higher latency.

## How does Kafka compare to a traditional message broker (e.g. RabbitMQ)?
- **Message retention**: Kafka **retains messages** for a configurable period (or indefinitely) regardless of consumption, so multiple consumers can re-read history; RabbitMQ typically **removes a message once acknowledged/consumed**.
- **Model**: Kafka is log-based (pull model — consumers fetch at their own pace and track their offset); RabbitMQ is a traditional broker (push model, with routing via exchanges/queues, more complex routing logic like fanout/topic/direct exchanges).
- **Throughput vs. features**: Kafka is optimized for **very high throughput** streaming and replay; RabbitMQ offers richer per-message routing/priority/delivery guarantees out of the box, better suited to complex task-queue scenarios.
- **Ordering & scaling**: Kafka scales via partitions and guarantees order per partition; RabbitMQ ordering guarantees depend on queue configuration.

## What is the Transactional Outbox pattern, and why is it used with Kafka?
It solves the **dual-write problem**: a service that needs to both **update its database** and **publish a Kafka event** for that change cannot do both atomically — if it writes to the DB and then crashes (or Kafka is unreachable) before publishing, the event is lost and the system becomes inconsistent, even though the DB commit succeeded.
- **How it works**: instead of publishing directly to Kafka, the service writes the business change **and** a row describing the event to an **outbox table**, in the **same local DB transaction** — so both succeed or fail together (atomic, single database).
- A separate process then reads the outbox table and **publishes the events to Kafka**, using one of two approaches:
  - **Polling publisher**: periodically queries the outbox table for new rows and publishes them, marking them as sent.
  - **Change Data Capture (CDC)**, e.g. **Debezium**: tails the database's transaction/write-ahead log and streams new outbox rows to Kafka automatically, without polling — more efficient and lower latency.
- **Guarantee**: this gives **at-least-once delivery** to Kafka in sync with the DB change (the publishing step can be retried safely if it fails, since the event is durably stored in the outbox until confirmed published) — consumers must then be **idempotent** to handle possible duplicate deliveries.

## What is the difference between the Outbox pattern and Kafka transactions?
- **Outbox pattern**: consistency between the **application database and Kafka** (DB change + event publication).
- **Kafka transactions**: atomicity **inside Kafka** — atomically produce records **and** commit consumer offsets, giving exactly-once semantics for *consume → process → produce* Kafka workflows.

They solve different problems: Kafka transactions **do not** make an arbitrary PostgreSQL write atomic with Kafka.

## What are at-most-once, at-least-once and exactly-once delivery?
- **At-most-once**: commit the offset **before** processing → a crash after the commit **loses** the message.
- **At-least-once**: process **then** commit → a crash before the commit causes **redelivery** (duplicates).
- **Exactly-once**: Kafka transactions provide it for Kafka-to-Kafka workflows (offsets committed in the same transaction as the produced records). It does **not** automatically cover external database operations.

For business-critical Kafka → database flows, the practical choice is **at-least-once + idempotent consumers**.

## What is a Kafka offset, and what does committing it mean?
An **offset** is a record's position within **one partition** (meaningful only with topic + partition). The **committed offset** stores a consumer group's progress: after a restart or rebalance, consumption **resumes from it**.

Reading a record ≠ committing its offset. With **manual acknowledgement** (`AckMode.MANUAL` in Spring Kafka), the application acknowledges only after successful business processing.

## How do you handle duplicate Kafka messages in a consumer?
Make the consumer **idempotent**: processing the same event twice must not create a duplicate business effect.
- Give each event a unique **event ID** (application-level).
- Store processed IDs in a `processed_events` table with a **unique constraint**, and commit it **in the same DB transaction** as the business update — a duplicate then fails the insert / is skipped.

Don't use the **Kafka offset** as the dedup key: it's a technical position in one partition, not a business identity (the same event can be re-published with a different offset, e.g. by an outbox retry).

## What does producer idempotence (`enable.idempotence=true`) do?
The broker tracks a producer ID + sequence number per partition, so it can recognize **producer retries** and avoid writing the same record twice when an acknowledgement was lost. It is enabled by default in recent clients (Kafka 3.0+).

It only covers retries of the same send — it does not prevent duplicates created by the application (e.g. re-sending after a crash), so consumer-side idempotency is still needed.

## What happens if a consumer crashes before committing the offset (e.g. after the business operation succeeded)?
After Kafka detects the failure, its partitions are reassigned and the new consumer resumes from the **last committed offset** → the records processed but not committed are **delivered again** (at-least-once).

The business operation may already be committed in the DB, so reprocessing could **duplicate its effect** — this is exactly why consumers must be idempotent.

## What happens when a new consumer joins a consumer group?
Kafka triggers a **rebalance**: partitions are reassigned among the group's consumers. Processing can be **paused** during the rebalance, and a newly assigned consumer starts from the group's **committed offset** — so records processed but not yet committed may be processed again. (Cooperative/incremental rebalancing reduces the pause.)

## What is `poll()` in the Kafka consumer, and what is `max.poll.interval.ms`?
Kafka consumers **pull**: the consumer loop repeatedly calls `poll()`, processes the returned records and commits offsets.
- **`max.poll.records`**: max number of records returned by one `poll()`.
- **`max.poll.interval.ms`**: max time allowed **between two `poll()` calls**. If exceeded, the consumer is considered stuck, leaves the group and a **rebalance** is triggered.

It is not the max processing time per message but per *batch*. If processing is too slow: reduce `max.poll.records`, increase the interval carefully, or redesign processing.

## What is a Dead Letter Topic (DLT/DLQ), and does Kafka retry failed records automatically?
- For **transient** failures (DB/network down), configure **retries** (with backoff).
- If a record still fails after the retry policy — a **poison message** — route it to a **Dead Letter Topic** so it doesn't block the partition forever, then investigate and **replay** it after the fix.
- Keep useful metadata (original topic, partition, offset, event ID, exception) and **monitor** the DLT.

Kafka itself does **not** retry or send to a DLT. In **Spring Kafka**, the listener container catches the exception and the configured error handler decides (e.g. `DefaultErrorHandler` + `DeadLetterPublishingRecoverer`, or `@RetryableTopic`). Retries and DLT routing can break **ordering** for records with the same key.

## Does `@Transactional` on a Kafka listener make the DB update and the offset commit atomic?
**No, not by itself.** A normal `@Transactional` manages the **database** transaction only — the PostgreSQL commit and the Kafka offset commit remain two separate operations.

Spring Kafka can integrate Kafka transactions when configured, but that still doesn't give a true atomic commit across DB + Kafka. The common approach: **at-least-once delivery + idempotent DB processing** (dedup by event ID in the same DB transaction).
