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

## What is a Consumer Group, and how does Kafka scale consumption?
A **Consumer Group** is a set of consumers that cooperate to consume a topic, identified by a shared `group.id`.
- Kafka assigns each partition of the topic to **exactly one consumer** within the group at a time — so a topic with N partitions can be consumed in parallel by **up to N consumers** in the same group (extra consumers beyond N stay idle).
- Different consumer groups are **independent**: each group gets its own copy of every message (this is how Kafka supports both queue-like behavior *and* pub/sub broadcast behavior at once).
- If a consumer in the group fails, Kafka triggers a **rebalance**, reassigning its partitions to the remaining consumers.

## How does Kafka achieve durability and fault tolerance (Replication, Leader/Follower)?
- Each partition has a configurable **replication factor** — copies of the partition (**replicas**) are stored on multiple brokers.
- One replica is the **leader**, handling all reads/writes for that partition; the others are **followers** that replicate data from the leader.
- **In-Sync Replicas (ISR)**: followers that are sufficiently caught up with the leader. If the leader broker fails, a new leader is elected from the ISR set, so the partition stays available with no data loss (as long as `acks`/replication is configured correctly).
- Kafka uses **ZooKeeper** (older versions) or **KRaft** (newer versions, ZooKeeper-less) to manage cluster metadata and leader election.

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
