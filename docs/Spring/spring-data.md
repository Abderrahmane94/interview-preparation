---
sidebar_position: 3
---
import TOCInline from '@theme/TOCInline';

# Spring Data
# <TOCInline toc={toc} />

## What's spring data?
Spring Data is a **subproject** of the Spring Framework that aims to simplify **data access** and **persistence** in Java applications.

## Can you explain what JPA is and how it differs from JDBC?	
- **JDBC** is a **low-level API** that provides a set of classes and interfaces for connecting to relational databases and executing SQL queries.
- **JPA** is a **higher-level API** that abstracts the database access and provides an object-relational mapping (**ORM**) framework. 
## Can you explain the concept of transaction management and how it is implemented in Spring?
Transaction management is an essential concept in the field of database systems, where a transaction represents a unit of work that should be executed atomically (as a single, indivisible operation), consistently (bringing the database from one valid state to another), and in isolation (not affected by other concurrent transactions).

In the context of Spring framework, transaction management provides a way to manage database transactions in a declarative manner, allowing developers to focus on business logic rather than dealing with low-level transaction handling. Spring provides various abstractions and mechanisms to simplify transaction management.

The core interfaces and concepts related to transaction management in Spring are:

- Transaction Manager: The **PlatformTransactionManager** interface is the central abstraction for transaction management in Spring. It defines the common methods for starting, committing, and rolling back transactions. Spring supports different types of transaction managers, such as JDBC, JTA (Java Transaction API), and others.

- Transactional Annotation: Spring offers the **@Transactional** annotation to mark methods or classes that should be executed within a transactional context. By applying this annotation, Spring automatically handles the transactional behavior, including transaction begin, commit, and rollback. The annotation can be used with different propagation behaviors, isolation levels, and additional configuration options.
## Can you explain the difference between the various JPA fetch types?
### 1. Eager Fetching
- Eager fetching loads the associated entities immediately along with the owning entity.
- When an entity with an eagerly fetched association is retrieved, JPA fetches the associated entity or entities from the database in the same query.
- Eager fetching can result in loading a large amount of data if there are multiple associations or if the associated entities have further associations.
- Eager fetching is specified using the `@ManyToOne`, `@OneToOne`, or `@OneToMany` annotations with the `fetch = FetchType.EAGER` parameter.

### 2. Lazy Fetching
- Lazy fetching defers the loading of associated entities until they are explicitly accessed or requested.
- When an entity with a lazily fetched association is retrieved, the association is represented by a proxy object or a placeholder until accessed.
- Lazy fetching can help improve performance by avoiding unnecessary database queries for associations that are not used.
- Lazy fetching is specified using the `@ManyToOne`, `@OneToOne`, or `@OneToMany` annotations with the `fetch = FetchType.LAZY` parameter. Lazy is the default fetch type for most JPA associations.

### 3. Extra Lazy Fetching (Hibernate-specific)
- Extra lazy fetching is an extension provided by the Hibernate ORM framework.
- It is similar to lazy fetching but provides additional optimizations for collections, such as lazy loading individual elements of a collection based on their access.
- Extra lazy fetching is specified using the `@OneToMany` or `@ManyToMany` annotations with the `fetch = FetchType.EXTRA_LAZY` parameter.

### 4. Batch Fetching (Hibernate-specific)
- Batch fetching is another optimization provided by the Hibernate ORM framework.
- It allows fetching multiple entities or associations in batches using a limited number of database queries.
- Batch fetching helps reduce the number of database round-trips and can significantly improve performance when dealing with large sets of associated entities.
- Batch fetching can be configured at the query level using `@BatchSize` annotations or at the session level using Hibernate-specific settings.

It's important to note that the availability and behavior of fetch types can vary depending on the JPA implementation being used. While eager and lazy fetching are part of the JPA specification, extra lazy fetching and batch fetching are specific to Hibernate. Therefore, using extra lazy fetching and batch fetching might tie your application to the Hibernate ORM framework.
## Can you explain the different inheritance strategies in JPA?
- Single Table Inheritance (default) 
- Joined Table Inheritance 
- Table Per Class Inheritance 
- Mapped Superclass Inheritance

## Explain the Lazy loading used by JPA
Lazy fetching means that associated entities are loaded only when explicitly accessed or requested by the application.

## 03 Common ways to retrieve data from a database using Hibernate
1. Using **Hibernate Query Language** (**HQL**):
Hibernate Query Language (HQL) is a powerful object-oriented query language similar to SQL. 
It allows you to write queries using your entity classes and their properties instead of database tables and columns. 
HQL queries are executed by Hibernate and translated into appropriate SQL statements. Here's an example:

   ```java
   String hql = "FROM YourEntityClass";
   Query<YourEntityClass> query = session.createQuery(hql, YourEntityClass.class);
   List<YourEntityClass> entities = query.getResultList();
   ```

2. Using the **Criteria API**:
   The Criteria API provides a type-safe and programmatic approach to construct queries dynamically. It allows you to build queries using various criteria, such as equality, comparison, and logical operators. The Criteria API provides a fluent interface for creating complex queries without writing raw SQL. Here's an example:

   ```java
   CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
   CriteriaQuery<YourEntityClass> criteriaQuery = criteriaBuilder.createQuery(YourEntityClass.class);
   Root<YourEntityClass> root = criteriaQuery.from(YourEntityClass.class);
   criteriaQuery.select(root);
   List<YourEntityClass> entities = session.createQuery(criteriaQuery).getResultList();
   ```

3. Using **Native SQL Queries**:
   If you have complex queries that cannot be easily expressed using HQL or the Criteria API, you can use native SQL queries with Hibernate. Native SQL queries allow you to write SQL statements directly and execute them using Hibernate's `createNativeQuery()` method. Here's an example:

   ```java
   String sql = "SELECT * FROM your_table";
   Query<YourEntityClass> query = session.createNativeQuery(sql, YourEntityClass.class);
   List<YourEntityClass> entities = query.getResultList();
   ```

## What is Criteria?
In the context of Hibernate, a criteria is a **set of conditions** or criteria used to construct a query dynamically. The Criteria API in Hibernate provides a programmatic way to **build queries** without writing raw SQL. It allows you to express query criteria using a type-safe and fluent interface, making it easier to construct complex queries.

The Criteria API is based on a set of interfaces and classes that represent various elements of a query, such as entities, properties, conditions, sorting, and projections. By using these interfaces and classes, you can dynamically construct queries based on your specific requirements.

Here are some **key concepts** related to the Criteria API:

1. **CriteriaBuilder**: The CriteriaBuilder interface acts as a factory for creating query-related objects. It provides methods for creating criteria queries, predicates, ordering expressions, and other query components.

2. **CriteriaQuery**: The CriteriaQuery interface represents the overall structure of a query. It provides methods for specifying the result type, selection, joins, groupings, orderings, and other query aspects.

3. **Root**: The Root interface represents the root entity in a query. It serves as the starting point for navigating through associations and accessing entity attributes.

4. **Predicate**: The Predicate interface represents a condition or criterion used in a query. Predicates are used to filter the query results based on specific conditions.

5. **Order**: The Order interface represents the sorting order for query results. It allows you to specify ascending or descending sorting based on one or more attributes.

By using the Criteria API, you can construct queries dynamically based on runtime conditions, create type-safe queries that are less error-prone, and take advantage of Hibernate's advanced features such as lazy loading and caching.

Here's a simple example of using the Criteria API to retrieve entities based on certain conditions:

```java
CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
CriteriaQuery<YourEntityClass> criteriaQuery = criteriaBuilder.createQuery(YourEntityClass.class);
Root<YourEntityClass> root = criteriaQuery.from(YourEntityClass.class);

Predicate condition = criteriaBuilder.equal(root.get("propertyName"), value);
criteriaQuery.where(condition);

List<YourEntityClass> entities = session.createQuery(criteriaQuery).getResultList();
```

In this example, the criteria query is constructed to fetch entities of type `YourEntityClass` where a specific property matches a certain value. The Criteria API provides various methods and options to express more complex queries involving joins, aggregations, subqueries, and more.

## What is the N+1 query problem, and how can you fix it?
One query loads a list of entities, then **one extra query per entity** loads an association. E.g. loading 100 orders then lazily accessing each order's customer → **1 + 100 queries**.

Fixes:
- JPQL **`JOIN FETCH`**.
- Spring Data JPA **`@EntityGraph`**.
- **DTO projections** that select exactly the needed data.
- Hibernate `@BatchSize` to load associations in batches.

Don't switch every relationship to `EAGER`. Be careful with **collection fetch joins + pagination**: joins multiply rows and break in-database pagination.

```java
@Query("SELECT o FROM Order o JOIN FETCH o.customer")
List<Order> findAllWithCustomer();
```

## What is `LazyInitializationException`, and how can you prevent it?
A lazy association is not loaded with the entity. If the **persistence context is closed** (transaction ended) and the code then accesses that association, Hibernate cannot initialize it and throws `LazyInitializationException`.

Prevent it by:
- Fetching the association **inside the transaction** with `JOIN FETCH` or `@EntityGraph`.
- Using a **DTO projection**.
- Accessing the association while the persistence context is still open (e.g. mapping to DTO in the `@Transactional` service).

Avoid `EAGER` everywhere and the *Open Session in View* anti-pattern as blanket fixes.

## What is Hibernate dirty checking?
An entity loaded inside a persistence context is **managed**. Hibernate keeps a snapshot of its state and, at **flush time**, compares it and generates the needed `UPDATE` statements automatically. So inside a transaction, calling `save()` on a managed entity is generally unnecessary.

```java
@Transactional
public void completeOrder(Long id) {
    Order order = orderRepository.findById(id).orElseThrow();
    order.setStatus("COMPLETED"); // UPDATE generated at flush, no save() needed
}
```

## What are the JPA entity states?
- **Transient**: new object, not associated with a persistence context.
- **Managed**: attached to a persistence context — changes are tracked (dirty checking).
- **Detached**: was managed, but the persistence context is closed / it was evicted.
- **Removed**: scheduled for deletion at flush.

## What is the difference between `persist()` and `merge()`?
- **`persist(entity)`**: for a **new** entity — makes **that same instance** managed.
- **`merge(entity)`**: copies the state of a **detached** entity onto a managed instance and **returns the managed instance**. The object you passed in **stays detached** — use the returned one.

In both cases the SQL is usually executed at **flush/commit**, not immediately.

## What is the difference between `flush()` and `commit()`?
- **`flush()`**: synchronizes pending changes of the persistence context with the database by **executing SQL** — the transaction stays **open** and can still roll back.
- **`commit()`**: **ends** the transaction and makes the changes **permanent**. Hibernate normally flushes automatically before commit (depending on the flush mode).

## How does optimistic locking work in JPA/Hibernate?
Add a `@Version` field. Hibernate adds the version to the `WHERE` clause of each update and increments it:

```sql
UPDATE product SET stock = ?, version = 6 WHERE id = ? AND version = 5
```

If two transactions read version 5, the first update succeeds (→ version 6); the second updates **0 rows**, so Hibernate throws an `OptimisticLockException` instead of silently overwriting (**no lost update**). The application handles it — e.g. reload and retry, or ask the user.

```java
@Entity
public class Product {
    @Id private Long id;
    private int stock;
    @Version private Long version;
}
```

## When would you choose pessimistic locking instead of optimistic locking?
- **Optimistic**: conflicts are **rare** — no DB locks, conflicts detected at update time.
- **Pessimistic**: contention is **frequent**, conflicts are costly, or operations must be serialized. It takes a DB lock (`SELECT … FOR UPDATE`); other transactions requesting a conflicting lock **wait** until commit/rollback.

```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT p FROM Product p WHERE p.id = :id")
Optional<Product> findByIdForUpdate(Long id);
```

Trade-offs: lower concurrency, blocking, possible deadlocks — keep these transactions short. Plain reads are not necessarily blocked (depends on the database and lock mode).
