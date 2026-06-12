---
sidebar_position: 4
---
import TOCInline from '@theme/TOCInline';

# Java Collections
# <TOCInline toc={toc} />

## What is the Java Collections Framework?
The Java Collections Framework (JCF) is a unified architecture of interfaces and classes for storing and manipulating groups of objects. Core interfaces:

```
Iterable
└── Collection
    ├── List      — ordered, allows duplicates
    ├── Set       — no duplicates
    └── Queue     — FIFO ordering
        └── Deque — double-ended queue
Map               — key-value pairs (not a Collection)
```

## What is the difference between a List and a Set?

- **`List`**: ordered (insertion order preserved), **allows duplicates**, indexed access.
- **`Set`**: **no duplicates**, generally unordered (except `LinkedHashSet` and `TreeSet`).

```java
List<String> list = new ArrayList<>(List.of("a", "b", "a")); // ["a", "b", "a"]
Set<String> set = new HashSet<>(List.of("a", "b", "a"));     // {"a", "b"}
```

## What is the difference between ArrayList and LinkedList?

| | `ArrayList` | `LinkedList` |
|---|---|---|
| Backing structure | Dynamic array | Doubly-linked list |
| Random access `get(i)` | O(1) | O(n) |
| Insert/delete at middle | O(n) (shift) | O(1) (after traversal) |
| Memory | Less (array) | More (node + 2 pointers) |
| Implements | `List` | `List`, `Deque` |

**Prefer `ArrayList`** for most use cases (better cache locality). Use `LinkedList` only if you frequently insert/remove at both ends.

## What is the difference between a Stack and a Queue?

**Stack** — Last-In-First-Out (LIFO):
```java
Deque<Integer> stack = new ArrayDeque<>(); // preferred over java.util.Stack
stack.push(1); stack.push(2);
stack.pop();  // 2
stack.peek(); // 1
```

**Queue** — First-In-First-Out (FIFO):
```java
Queue<Integer> queue = new LinkedList<>();
queue.offer(1); queue.offer(2);
queue.poll();  // 1 (removes)
queue.peek();  // 2 (does not remove)
```

Use `ArrayDeque` for stacks/queues — it's faster than `LinkedList` and `Stack`.

## What is the difference between HashSet, LinkedHashSet, and TreeSet?

| | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---|---|---|---|
| Order | None | Insertion order | Sorted (natural/Comparator) |
| `null` | One null | One null | ❌ (throws NPE) |
| Performance | O(1) add/contains | O(1) + linked overhead | O(log n) |
| Backed by | `HashMap` | `LinkedHashMap` | `TreeMap` (Red-Black tree) |

```java
Set<Integer> sorted = new TreeSet<>(Set.of(5, 1, 3)); // [1, 3, 5]
Set<String> ordered = new LinkedHashSet<>(List.of("b", "a", "c")); // [b, a, c]
```

## How does HashMap work internally?
`HashMap` uses an array of **buckets**. The bucket index is computed as `hash(key) & (capacity - 1)`.

1. `put(key, value)`: compute hash → find bucket → if empty, insert; if collision, chain (linked list) or tree (Java 8+, when chain length ≥ 8).
2. `get(key)`: compute hash → find bucket → compare keys with `.equals()`.

Key points:
- Default capacity: **16**, load factor: **0.75** (rehashes when 75% full).
- Keys must correctly implement `hashCode()` and `equals()`.
- **Not thread-safe**. Use `ConcurrentHashMap` for concurrent access.
- Allows **one `null` key** and **multiple `null` values**.

```java
Map<String, Integer> map = new HashMap<>();
map.put("alice", 30);
map.getOrDefault("bob", 0);       // 0 if absent
map.putIfAbsent("alice", 99);     // won't overwrite
map.computeIfAbsent("charlie", k -> k.length()); // 7
```

## What is the difference between HashMap, LinkedHashMap, and TreeMap?

| | `HashMap` | `LinkedHashMap` | `TreeMap` |
|---|---|---|---|
| Order | None | Insertion / access order | Sorted by key |
| Performance | O(1) avg | O(1) avg | O(log n) |
| Null keys | 1 | 1 | ❌ |
| Use case | General | LRU cache, ordered iteration | Range queries, sorted output |

```java
// LRU cache with LinkedHashMap
Map<String, Integer> lru = new LinkedHashMap<>(16, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry<String, Integer> e) {
        return size() > 100; // evict when over capacity
    }
};
```

## What is the difference between HashMap and Hashtable?

| | `HashMap` | `Hashtable` |
|---|---|---|
| Thread-safe | No | Yes (synchronized) |
| Null keys/values | Yes (1 null key) | No |
| Performance | Faster | Slower |
| Status | Preferred | Legacy — avoid |

Use `ConcurrentHashMap` instead of `Hashtable` for thread safety.

## What is ConcurrentHashMap?
A thread-safe `Map` implementation that achieves concurrency by **locking at the bucket (node) level** rather than the entire map (as `Hashtable` does). In Java 8+, it uses CAS operations and synchronized blocks on individual nodes.

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 1);
map.computeIfAbsent("key", k -> 0);
map.merge("count", 1, Integer::sum); // thread-safe increment
```

Does not allow `null` keys or values. Iterators are weakly consistent (reflect the state at some point during iteration).

## What is a PriorityQueue?
A queue where elements are ordered by **natural ordering** or a `Comparator`. The **head** is always the smallest (min-heap by default).

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.offer(1); pq.offer(3);
pq.poll(); // 1 — smallest first

// Max-heap
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Comparator.reverseOrder());

// Custom ordering
PriorityQueue<Task> taskPQ = new PriorityQueue<>(Comparator.comparingInt(t -> t.priority));
```

## What is the difference between fail-fast and fail-safe iterators?

- **Fail-fast** (standard collections like `ArrayList`, `HashMap`): throws `ConcurrentModificationException` if the collection is modified during iteration. Detects modification via `modCount`.

```java
List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
for (Integer i : list) {
    list.remove(i); // throws ConcurrentModificationException
}
```

- **Fail-safe** (`ConcurrentHashMap`, `CopyOnWriteArrayList`): iterates over a snapshot or is otherwise tolerant of concurrent modification — no exception, but may not reflect latest changes.

To safely remove during iteration: use `Iterator.remove()`:
```java
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    if (it.next() == 2) it.remove(); // safe
}
```

## What is the difference between Comparable and Comparator?

- **`Comparable<T>`**: implemented by the class itself — defines natural ordering via `compareTo()`.
- **`Comparator<T>`**: external strategy — passed to sort methods, enables multiple orderings.

```java
class Employee implements Comparable<Employee> {
    String name; int salary;
    public int compareTo(Employee o) { return Integer.compare(this.salary, o.salary); }
}

// Multiple sort strategies with Comparator
List<Employee> employees = ...;
employees.sort(Comparator.comparing(e -> e.name));                // by name
employees.sort(Comparator.comparingInt((Employee e) -> e.salary)
               .reversed()
               .thenComparing(e -> e.name));                      // by salary desc, then name
```

## What are the Collections utility class methods?
`java.util.Collections` provides static utility methods:

```java
List<Integer> list = new ArrayList<>(List.of(3, 1, 4, 1, 5));

Collections.sort(list);                        // [1, 1, 3, 4, 5]
Collections.reverse(list);                     // [5, 4, 3, 1, 1]
Collections.shuffle(list);                     // random order
Collections.min(list);                         // 1
Collections.max(list);                         // 5
Collections.frequency(list, 1);               // 2
Collections.unmodifiableList(list);            // read-only view
Collections.synchronizedList(list);            // thread-safe wrapper
Collections.nCopies(3, "hello");              // ["hello","hello","hello"]
```

## What are the List.of(), Map.of(), Set.of() factory methods (Java 9+)?
Create **immutable** collections concisely:

```java
List<String> list = List.of("a", "b", "c");     // immutable, no nulls
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("a", 1, "b", 2);
Map<String, Integer> mapEntries = Map.ofEntries(
    Map.entry("key1", 1),
    Map.entry("key2", 2)
);
```

⚠️ These collections throw `UnsupportedOperationException` on `add`, `remove`, `put`. They also do **not allow null** elements.

## How do you iterate over a Map?

```java
Map<String, Integer> map = Map.of("a", 1, "b", 2);

// Entry set (most common)
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// Key set
for (String key : map.keySet()) { ... }

// forEach (Java 8+)
map.forEach((k, v) -> System.out.println(k + "=" + v));

// Stream
map.entrySet().stream()
   .filter(e -> e.getValue() > 1)
   .forEach(System.out::println);
```
