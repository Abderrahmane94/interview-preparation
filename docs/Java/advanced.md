---
sidebar_position: 6
---
import TOCInline from '@theme/TOCInline';

# Advanced
# <TOCInline toc={toc} />

## What is the difference between Java SE and Jakarta EE?

**Java SE (Standard Edition)** is the core platform: language features, core APIs (I/O, networking, collections, concurrency), and the JVM. It's suitable for standalone and desktop applications.

**Jakarta EE (formerly Java EE)** builds on Java SE and adds enterprise APIs for large-scale server-side applications:
- **Servlets / JSP** — web layer
- **JPA** — object-relational mapping
- **EJB** — distributed, transactional components
- **JMS** — asynchronous messaging
- **CDI** — dependency injection

Spring Framework is not part of Jakarta EE but provides similar functionality in a more lightweight way.

## How does Garbage Collection work in Java?
The JVM automatically reclaims heap memory for objects that are no longer reachable. The heap is divided into generations:

- **Young Generation** (Eden + Survivor spaces): new objects allocated here. Minor GC runs frequently and is fast.
- **Old Generation (Tenured)**: long-lived objects promoted from young gen. Major GC is slower.
- **Metaspace** (Java 8+): stores class metadata (replaced PermGen).

**GC algorithms:**
- **Serial GC** — single-threaded; for small apps.
- **Parallel GC** — multi-threaded; throughput-focused (default in Java 8).
- **G1 GC** — region-based; balances throughput and latency (default in Java 9+).
- **ZGC / Shenandoah** — low-latency, sub-millisecond pauses (Java 11+).

```
-XX:+UseG1GC         // enable G1
-Xms512m -Xmx2g      // initial and max heap size
-XX:+PrintGCDetails  // log GC events
```

## What is the difference between `==` and `.equals()` for Strings? What is the String pool?

`==` compares references. `.equals()` compares content. String literals are interned in the **String constant pool** (heap), so two literal strings with the same content share the same reference.

```java
String a = "hello";
String b = "hello";
String c = new String("hello");

a == b;        // true  — same pool reference
a == c;        // false — c is a new heap object
a.equals(c);   // true  — same content

String d = c.intern(); // intern puts c into the pool
a == d;        // true
```

## What is reflection in Java?
Reflection (in `java.lang.reflect`) lets you inspect and manipulate classes, methods, and fields **at runtime**, even if they are private.

```java
Class<?> clazz = Class.forName("com.example.MyClass");
Method method = clazz.getDeclaredMethod("myPrivateMethod");
method.setAccessible(true);
method.invoke(clazz.getDeclaredConstructor().newInstance());
```

**Use cases**: frameworks (Spring, Hibernate), serialization libraries, test tools.  
**Downsides**: bypasses compile-time checks, slower than direct calls, breaks encapsulation.

## What are ClassLoaders?
ClassLoaders load `.class` files into the JVM. They follow a **parent-delegation model**: before loading a class, a classloader asks its parent first.

Three built-in loaders (Java 8):
1. **Bootstrap ClassLoader** — loads core JDK classes (`java.lang.*`).
2. **Extension ClassLoader** — loads from `$JAVA_HOME/lib/ext`.
3. **Application ClassLoader** — loads from the classpath (your app).

Custom classloaders enable hot-reloading, plugin systems (OSGi), and isolated class namespaces.

## What is serialization in Java?
Serialization converts an object into a byte stream for storage or network transfer. Deserialization reconstructs the object.

```java
// Serialize
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("obj.ser"));
oos.writeObject(myObject); // myObject's class must implement Serializable

// Deserialize
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("obj.ser"));
MyClass obj = (MyClass) ois.readObject();
```

Key points:
- Class must implement `java.io.Serializable`.
- `transient` fields are **not** serialized.
- `serialVersionUID` identifies versions — always define it explicitly.
- Alternatives: JSON (Jackson/Gson), Protocol Buffers, Kryo.

## What is the difference between `final`, `finally`, and `finalize()`?

- **`final`**: keyword — prevents variable reassignment, method overriding, or class subclassing.
- **`finally`**: block — always runs after a `try/catch`, used for cleanup.
- **`finalize()`**: deprecated method called by GC before collecting an object — unreliable and removed in Java 18.

```java
final int MAX = 100;             // constant

try {
    riskyOp();
} catch (Exception e) {
    handle(e);
} finally {
    cleanup();                   // always runs
}
```

Prefer `try-with-resources` over `finally` for I/O cleanup.

## What is the Java Memory Model (JMM)?
The JMM defines how threads interact through memory. Key guarantees:

- **Visibility**: without synchronization, a write by thread A to a variable may not be visible to thread B.
- **Happens-before**: a relationship that guarantees memory visibility. Examples: `synchronized` exit happens-before entry, `volatile` write happens-before read, `Thread.start()` happens-before any action in the started thread.
- **Atomicity**: only reads/writes to `int`, `byte`, `short`, `char`, `float`, `boolean`, and references are atomic. `long` and `double` may not be (use `volatile` or `AtomicLong`).

## What is the difference between `StringBuilder` and `StringBuffer`?

| | `StringBuilder` | `StringBuffer` |
|---|---|---|
| Thread-safe | No | Yes (synchronized) |
| Performance | Faster | Slower |
| Use case | Single-threaded | Multi-threaded (rare) |

Both are mutable. `String` itself is **immutable** — every "modification" creates a new object. Use `StringBuilder` for string building in loops.

```java
StringBuilder sb = new StringBuilder();
for (String s : list) sb.append(s).append(", ");
String result = sb.toString();
```

## What is autoboxing and unboxing?
Java automatically converts between primitives and their wrapper types:

- **Autoboxing**: `int` → `Integer`
- **Unboxing**: `Integer` → `int`

```java
List<Integer> list = new ArrayList<>();
list.add(42);       // autoboxing: int → Integer
int x = list.get(0); // unboxing: Integer → int

Integer a = 127, b = 127;
a == b; // true — cached range [-128, 127]

Integer c = 200, d = 200;
c == d; // false — outside cache, different objects
c.equals(d); // true
```

⚠️ Beware of `NullPointerException` when unboxing a `null` wrapper.

## What is the difference between `Comparable` and `Comparator`?

- **`Comparable`**: the class implements its own natural ordering via `compareTo()`.
- **`Comparator`**: an external strategy for ordering, passed to sort methods.

```java
// Comparable — natural order
class Employee implements Comparable<Employee> {
    int salary;
    public int compareTo(Employee other) {
        return Integer.compare(this.salary, other.salary);
    }
}

// Comparator — custom order (lambda)
List<Employee> employees = ...;
employees.sort(Comparator.comparing(e -> e.name));
employees.sort(Comparator.comparingInt((Employee e) -> e.salary).reversed());
```

## What is a weak reference in Java?
Java has four reference strengths:

1. **Strong** (default): object kept alive as long as a reference exists.
2. **Soft** (`SoftReference`): GC collects only when memory is low — useful for caches.
3. **Weak** (`WeakReference`): GC collects as soon as no strong/soft references exist — used in `WeakHashMap`.
4. **Phantom** (`PhantomReference`): no direct access; used for pre-mortem cleanup.

```java
WeakReference<MyObject> ref = new WeakReference<>(new MyObject());
MyObject obj = ref.get(); // may return null if GC has collected it
```

## What is a functional interface?
An interface with exactly **one abstract method**. Lambdas and method references can be used wherever a functional interface is expected.

```java
@FunctionalInterface
interface Transformer<T, R> { R transform(T input); }

Transformer<String, Integer> parser = Integer::parseInt;
int n = parser.transform("42"); // 42
```

Built-in functional interfaces (`java.util.function`):
- `Predicate<T>` — `boolean test(T t)`
- `Function<T,R>` — `R apply(T t)`
- `Consumer<T>` — `void accept(T t)`
- `Supplier<T>` — `T get()`
- `BiFunction<T,U,R>` — `R apply(T t, U u)`
