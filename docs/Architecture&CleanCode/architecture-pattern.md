---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Architecture Pattern
# <TOCInline toc={toc} />


## What is difference between Architectural pattern and Design pattern?
- Architecture define the overall **structure** and **organization** of a software system. They provide high-level **guidelines** and **principles** for **designing** the system's **components**, their **relationships**, and the flow of data or control between them. 
  - Examples of architectural patterns include the Model-View-Controller (MVC), Microservices, Layered Architecture, and Event-Driven Architecture.
- Design patterns represent a way to structure classes to solve common problems
## Can you explain the Model-View-Controller (MVC)
The Model represents the data and business logic, View represents the presentation layer, The controller acts as an intermediary between the Model and the View.

## What is CQRS (Command Query Responsibility Segregation)?
CQRS is an architectural pattern that **separates the model used to write data (Commands) from the model used to read data (Queries)**.
- **Commands** change state and return no data (e.g. `CreateOrder`, `UpdateStock`).
- **Queries** return data and never change state (e.g. `GetOrderById`).
- The write side and read side can use **different models, and even different databases**, optimized independently (write side normalized for consistency, read side denormalized for fast queries).

## What problem does CQRS solve, and what are its trade-offs?
- **Problem it solves**: in complex domains, a single model trying to serve both reads and writes efficiently becomes bloated and hard to scale — reads and writes usually have very different performance and shape requirements (e.g. dashboards need denormalized aggregated views, while writes need strict validation and consistency).
- **Benefits**:
  - Independent **scaling** of read and write workloads.
  - Read models can be **denormalized/tailored** per use case (faster queries, simpler UI code).
  - Clear separation of concerns, easier to reason about business logic on the write side.
- **Drawbacks**:
  - Added **complexity** (two models, possibly two data stores to keep in sync).
  - **Eventual consistency**: the read model may lag behind the write model for a short time.
  - Not needed for simple CRUD applications — best applied to complex or high-scale bounded contexts.

## How does CQRS relate to Event Sourcing?
CQRS and Event Sourcing are **complementary but independent** patterns — CQRS can be used without Event Sourcing.
- **Event Sourcing** persists state as an ordered sequence of **domain events** instead of the current state only.
- When combined with CQRS, the **write side** appends events to an event store (the source of truth), and the **read side** is built by **projecting** those events into one or more denormalized read models optimized for querying.
- This combination gives a full audit trail (every state change is an event) but increases complexity and requires handling eventual consistency between the event store and the projections.

## What is the Saga pattern and what problem does it solve?
The Saga pattern manages **data consistency across multiple services** in a distributed system, replacing a single ACID transaction (impossible across service boundaries in microservices) with a **sequence of local transactions**.
- Each service performs its own local transaction and publishes an event/message to trigger the next step.
- If a step fails, the saga runs **compensating transactions** to undo the work already done by previous steps (since you can't simply roll back a distributed transaction).
- Example: an order saga = reserve stock → charge payment → ship order. If payment fails, a compensating action releases the reserved stock.

## What are the two main ways to coordinate a Saga (Choreography vs Orchestration)?
- **Choreography**: each service listens for events and publishes its own events in reaction — there is no central coordinator.
  - Pros: loose coupling, simple for a small number of steps.
  - Cons: hard to track/debug the overall flow, risk of cyclic dependencies as the saga grows.
- **Orchestration**: a central **orchestrator** (saga manager) tells each service what local transaction to execute and handles failures/compensation.
  - Pros: centralized, explicit flow logic — easier to understand, monitor, and modify.
  - Cons: introduces a coordinator that can become a bottleneck or single point of failure if not designed carefully.

## How does the Saga pattern relate to eventual consistency?
Because a saga is a sequence of independent local transactions rather than one atomic transaction, the system is only **eventually consistent** — there is a window where some services have already been updated and others haven't yet. Compensating transactions handle failure cases, but application code (and users) must tolerate temporary inconsistency, unlike with traditional ACID transactions.

## What are the key design patterns used in a microservices architecture?
Microservices introduce distributed-system problems (network calls, partial failures, data spread across services) that need dedicated patterns:
- **Decomposition**: Decompose by Business Capability / Subdomain (DDD), **Database per Service**, **Strangler Fig** (incrementally migrate a monolith).
- **Communication**: **API Gateway**, **Service Discovery**, **Backend for Frontend (BFF)**.
- **Data & consistency**: **Saga**, **CQRS**, **Event Sourcing**, Transactional Outbox.
- **Resilience**: **Circuit Breaker**, Retry, Bulkhead, Timeout.
- **Observability**: Log Aggregation, Distributed Tracing, Health Check API.

## What is the API Gateway pattern?
An API Gateway is a **single entry point** that sits in front of the microservices and routes client requests to the appropriate backend service(s).
- Handles cross-cutting concerns once instead of in every service: **routing, authentication, rate limiting, request aggregation, response transformation, SSL termination**.
- Can also implement the **Backend for Frontend (BFF)** variant: a dedicated gateway per client type (web, mobile) exposing only the data/shape that client needs.
- Trade-off: it's an extra hop and, if not made highly available, can become a **single point of failure/bottleneck**.

## What is the Circuit Breaker pattern?
A Circuit Breaker prevents a service from repeatedly calling a **downstream service that is failing or slow**, avoiding cascading failures across the system.
- It wraps calls to the remote service and tracks failures. States:
  - **Closed**: calls pass through normally.
  - **Open**: after too many failures, calls fail fast immediately (no network call) for a cooldown period.
  - **Half-Open**: after the cooldown, a few trial calls are allowed to check if the dependency has recovered — closes the circuit if they succeed, reopens it if they fail.
- Often paired with **fallback logic** (return cached/default data) and used together with Retry and Timeout patterns. Common implementations: Resilience4j, Hystrix (legacy).

## What is the Service Discovery pattern?
Since service instances in a microservices architecture are **dynamic** (auto-scaled, restarted, IPs change), clients can't hardcode addresses — Service Discovery solves finding a live instance to call.
- **Client-side discovery**: the client queries a **service registry** (e.g. Eureka, Consul) directly and picks an instance itself (often with load balancing).
- **Server-side discovery**: the client calls a **load balancer/router** (e.g. a cloud LB, Kubernetes Service) which queries the registry and forwards the request — the client stays simple.
- Service instances **register/deregister** themselves (or are registered by an orchestrator) with the registry, typically backed by health checks.

## What is the Database per Service pattern, and what challenge does it create?
Each microservice owns and manages **its own private database**, accessible only through that service's API — no other service can access it directly.
- Benefits: strong **loose coupling** (schema changes don't break other services), each service can pick the datastore best suited to its needs (polyglot persistence), independent scaling.
- Challenge: business transactions that used to be a single ACID transaction across tables now **span multiple services/databases** — this is exactly why the **Saga** pattern (and patterns like CQRS/Event Sourcing/Transactional Outbox) exist, to manage consistency without distributed transactions.

## What is the Strangler Fig pattern?
A strategy for **incrementally migrating a legacy monolith to microservices** without a risky big-bang rewrite.
- New functionality (or refactored pieces of old functionality) is built as new microservices, while a **facade/router** (often an API Gateway) intercepts calls and routes them either to the new service or to the still-existing monolith.
- Over time, more responsibilities move to the new services and the monolith shrinks ("is strangled") until it can be retired — at every point in the migration the system stays fully functional and releasable.

