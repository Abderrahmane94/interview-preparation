import TOCInline from '@theme/TOCInline';


# SQL
# <TOCInline toc={toc} />

## What is the difference between SQL & NoSQL?
**SQL** and **NoSQL** are two different types of **database management systems**:

1. **SQL (Structured Query Language)**:
    - SQL databases are based on a **structured data model** with a predefined schema.
    - They use a **tabular format** with **rows** and **columns**, and data is organized into tables.
    - SQL databases provide **ACID** (Atomicity, Consistency, Isolation, Durability) properties, ensuring data integrity and transactional consistency.
    - They are suitable for **complex**, **structured data**, and support powerful query languages like SQL for data manipulation and retrieval.
    - SQL databases are commonly used in applications with fixed schemas, such as **financial systems** or applications with **strict data relationships**.

2. **NoSQL (Not Only SQL)**:
    - NoSQL databases are designed to handle **large volumes** of **unstructured** or **semi-structured data**.
    - They offer **flexible schema models**, allowing data to be stored in various **formats** like **key-value pairs**, **documents**, **graphs**, or **wide-column stores**.
    - NoSQL databases are horizontally scalable, allowing them to handle massive amounts of data and high traffic loads.
    - They provide **high performance** and **scalability**, with the ability to distribute data across multiple nodes or clusters.
    - NoSQL databases are often used in applications with **changing requirements**, such as **social media platforms**, **real-time analytics**, or **content management systems**.

## How to choose between SQL & NoSQL?
- **Data structure**: SQL is suitable for structured data with fixed schemas, while NoSQL accommodates flexible and unstructured data formats.
- **Scalability**: NoSQL databases excel at horizontal scalability, making them ideal for handling large-scale distributed systems.
- **Data consistency**: SQL databases prioritize strong consistency, while NoSQL databases may sacrifice some consistency for improved performance and scalability.
- **Development flexibility**: NoSQL databases offer agile development and allow for rapid changes to data models, whereas SQL databases require more planning and upfront schema definition.

## What are SQL Joins?
SQL joins combine rows from two or more tables based on a related column. There are 4 main types:

1. **INNER JOIN** — returns only rows where the join condition is met in **both** tables.
```sql
SELECT e.name, d.name FROM Employee e
INNER JOIN Department d ON e.dept_id = d.id;
```

2. **LEFT JOIN** — returns **all rows from the left** table, plus matched rows from the right (NULL for no match).
```sql
SELECT e.name, d.name FROM Employee e
LEFT JOIN Department d ON e.dept_id = d.id;
```

3. **RIGHT JOIN** — returns **all rows from the right** table, plus matched rows from the left.

4. **FULL JOIN** — returns **all rows from both** tables regardless of match (NULL for non-matching sides).

## What is the difference between TRUNCATE and DELETE?

| | `TRUNCATE` | `DELETE` |
|---|---|---|
| Type | DDL | DML |
| Removes | All rows only | All or specific rows (with `WHERE`) |
| Transaction log | Minimal (faster) | Logs each deleted row (slower) |
| Rollback | ❌ Cannot be rolled back | ✅ Can be rolled back |
| Permission needed | ALTER | DELETE |

```sql
TRUNCATE TABLE employee;                -- removes all rows, fast
DELETE FROM employee WHERE name = 'Mark'; -- targeted delete, rollback-able
```

## What is the difference between DDL and DML?

- **DDL (Data Definition Language)**: defines the database structure. Commands are **auto-committed**.
  - `CREATE`, `ALTER`, `DROP`, `TRUNCATE`
- **DML (Data Manipulation Language)**: manages data inside the structure. Commands are **not auto-committed** (can be rolled back).
  - `INSERT`, `UPDATE`, `DELETE`, `SELECT`

## What is the difference between a Function and a Stored Procedure?

| | Function | Stored Procedure |
|---|---|---|
| Return value | Must return a value | Can return zero or n values |
| Parameters | Input only | Input and output |
| DML statements | ❌ Not allowed | ✅ Allowed |
| Transactions | ❌ Not allowed | ✅ Allowed |
| Can be used in SELECT | ✅ Yes | ❌ No |
| Exception handling | ❌ No try-catch | ✅ try-catch allowed |

## What is the difference between UNION and UNION ALL?
Both combine results of two queries (same number of columns required):
- **UNION**: removes duplicate rows — slightly slower due to deduplication.
- **UNION ALL**: keeps all rows including duplicates — faster.

```sql
SELECT name FROM Employees_NY
UNION ALL                       -- keeps duplicates
SELECT name FROM Employees_LA;
```

## What is the difference between Primary Key and Unique Key?

| | Primary Key | Unique Key |
|---|---|---|
| Count per table | Only one | Multiple allowed |
| Null values | ❌ Not allowed | ✅ Allowed |
| Default index | Clustered | Non-clustered |

## What is the difference between Primary Key and Foreign Key?
- **Primary Key**: uniquely identifies each row in its own table. No duplicates, no NULLs.
- **Foreign Key**: a column in one table that references the primary key of another table. Enforces **referential integrity**.

```sql
-- Department has primary key dept_id
-- Employee references it as a foreign key
ALTER TABLE Employee ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES Department(dept_id);
```

## What is the difference between clustered and non-clustered index?

| | Clustered Index | Non-clustered Index |
|---|---|---|
| Data storage | Physically sorts the table data | Separate structure, stores pointers |
| Count per table | Only one | Multiple allowed |
| Created on | Primary key by default | Any column |
| Read speed | Faster | Slower (extra lookup) |
| Write speed | Slower | Faster |
| Extra space | Not needed | Required |

## What is the difference between WHERE and HAVING?

| | WHERE | HAVING |
|---|---|---|
| Used with | SELECT, INSERT, UPDATE, DELETE | SELECT only |
| Filters | Individual rows | Groups |
| Applied | Before GROUP BY | After GROUP BY |
| Aggregate functions | ❌ Not allowed | ✅ Allowed |

```sql
-- WHERE filters rows before grouping
SELECT dept_id, COUNT(*) FROM Employee WHERE salary > 50000 GROUP BY dept_id;

-- HAVING filters groups after grouping
SELECT dept_id, COUNT(*) FROM Employee GROUP BY dept_id HAVING COUNT(*) > 5;
```

## How to find the nth highest salary from Employee table?
```sql
SELECT name, salary FROM Employee e1
WHERE N-1 = (
    SELECT COUNT(DISTINCT salary) FROM Employee e2
    WHERE e2.salary > e1.salary
);
-- Replace N with 3 for 3rd highest, etc.
```
`DISTINCT` handles duplicate salaries. The logic: the Nth highest means exactly N-1 salaries are higher than it.

## How would you optimize a slow database query?
To optimize a slow database query, you can consider the following approaches:

1. **Indexing**: Ensure that the appropriate indexes are created on the columns used in the query's filters, joins, and sorting. Indexing can significantly improve query performance by allowing the database to quickly locate the relevant data.

2. **Query Optimization**: Review the query execution plan and identify any inefficient operations or unnecessary joins. Modify the query or use hints to guide the database optimizer towards a more efficient execution plan.

3. **Data Normalization and Denormalization**: Evaluate the data model and determine if normalization or denormalization techniques can be applied to optimize query performance. Normalization reduces redundancy, while denormalization consolidates related data to minimize joins.

4. **Caching**: Implement caching mechanisms to store frequently accessed query results in memory. This reduces the need for repeated database queries, improving response times for subsequent requests.

5. **Partitioning and Sharding**: If dealing with large datasets, consider partitioning the data into smaller, manageable chunks or implementing sharding techniques to distribute the data across multiple servers. This can improve query performance by reducing the amount of data that needs to be processed in each query.

6. **Hardware Optimization**: Ensure that the hardware resources, such as CPU, memory, and disk, are adequately provisioned to handle the database workload. Optimize server configurations, such as adjusting buffer sizes and cache settings, to optimize query execution.

7. **Query Rewriting**: Review the query and identify opportunities for rewriting or restructuring the logic to achieve better performance. Sometimes small changes in query structure or formulation can lead to significant performance improvements.

8. **Database Schema Optimization**: Analyze the database schema and identify areas for optimization, such as reducing redundant data, avoiding unnecessary columns or tables, and optimizing data types and sizes.

9. **Database Tuning**: Fine-tune database configuration parameters and settings based on workload characteristics and hardware capabilities. Adjusting parameters like memory allocation, query timeouts, and connection pooling can improve overall performance.

10. **Profiling and Monitoring**: Use profiling and monitoring tools to identify bottlenecks, slow queries, and resource-intensive operations. This helps pinpoint areas that require optimization efforts.
