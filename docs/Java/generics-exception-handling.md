---
sidebar_position: 3
---
import TOCInline from '@theme/TOCInline';

# Generics & Exception handling
# <TOCInline toc={toc} />

## What are Java generics?
Generics allow classes, interfaces, and methods to operate on **type parameters**, providing **compile-time type safety** while avoiding code duplication. Without generics, you'd use `Object` and cast manually — risky and verbose.

```java
// Without generics
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0); // explicit cast, ClassCastException risk

// With generics
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0); // no cast needed, type-safe
```

## What are bounded type parameters?
Restrict the types that can be used as generic arguments.

```java
// Upper bound: T must be Number or a subclass
<T extends Number>

// Lower bound: T must be Integer or a superclass
<? super Integer>

// Wildcard — any type
<?>
```

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

max(3, 7);       // 7
max("apple", "banana"); // "banana"
```

## What is the difference between `<?>`, `<? extends T>`, and `<? super T>`?

- **`<?>`** (unbounded wildcard): any type. Read-only; you can't add elements.
- **`<? extends T>`** (upper bounded): T or its subtypes. Safe to **read** as T; cannot add (producer).
- **`<? super T>`** (lower bounded): T or its supertypes. Safe to **add** T; reading gives `Object` (consumer).

Remember: **PECS — Producer Extends, Consumer Super**.

```java
// Producer — read from it
void printList(List<? extends Number> list) {
    for (Number n : list) System.out.println(n);
}

// Consumer — write to it
void addNumbers(List<? super Integer> list) {
    list.add(1); list.add(2);
}
```

## What is type erasure?
Generics in Java are a **compile-time feature**. At runtime, type parameters are erased to their bounds (usually `Object`). This is called **type erasure**.

```java
List<String> strings = new ArrayList<>();
List<Integer> ints = new ArrayList<>();

strings.getClass() == ints.getClass(); // true — both are just List at runtime
```

Consequences:
- Cannot do `new T()` or `new T[]` in generic code.
- Cannot use generics with `instanceof`: `list instanceof List<String>` won't compile.
- No primitive type parameters: use `List<Integer>`, not `List<int>`.

## What is exception handling in Java?
Exception handling detects and responds to runtime errors using `try`, `catch`, `finally`, `throw`, and `throws`.

```java
try {
    int result = 10 / 0;             // throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}
```

`throws` in the method signature declares checked exceptions the caller must handle:
```java
void readFile(String path) throws IOException { ... }
```

## What is the Java exception hierarchy?

```
Throwable
├── Error               (JVM errors — don't catch: OutOfMemoryError, StackOverflowError)
└── Exception
    ├── RuntimeException    (unchecked — programming errors)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── ClassCastException
    │   └── IllegalArgumentException
    └── (checked exceptions — must be declared/caught)
        ├── IOException
        ├── SQLException
        └── FileNotFoundException
```

## What is the difference between a checked and unchecked exception?

| | Checked | Unchecked (`RuntimeException`) |
|---|---|---|
| Detected at | Compile time | Runtime |
| Must handle? | Yes (`catch` or `throws`) | No |
| Examples | `IOException`, `SQLException` | `NullPointerException`, `IllegalArgumentException` |
| Represents | Recoverable conditions | Programming bugs |

```java
// Checked — must declare or catch
void parse(String s) throws ParseException { ... }

// Unchecked — optional to catch
void divide(int a, int b) {
    if (b == 0) throw new IllegalArgumentException("Divisor cannot be zero");
}
```

## What is try-with-resources?
Introduced in Java 7, it **automatically closes** resources that implement `AutoCloseable`, eliminating the need for `finally` blocks for cleanup.

```java
// Old way
InputStream is = null;
try {
    is = new FileInputStream("file.txt");
    // ...
} finally {
    if (is != null) is.close();
}

// With try-with-resources (preferred)
try (InputStream is = new FileInputStream("file.txt");
     BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
    String line = reader.readLine();
} // both closed automatically, even if an exception occurs
```

Multiple resources are closed in **reverse order** of declaration.

## How do you create a custom exception?

```java
// Checked custom exception
public class InsufficientFundsException extends Exception {
    private final double amount;

    public InsufficientFundsException(double amount) {
        super("Insufficient funds: need " + amount + " more");
        this.amount = amount;
    }

    public double getAmount() { return amount; }
}

// Usage
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) throw new InsufficientFundsException(amount - balance);
    balance -= amount;
}
```

For unchecked, extend `RuntimeException` instead.

## What is exception chaining?
Wrapping one exception in another to preserve the original cause — important for debugging.

```java
try {
    loadConfig();
} catch (IOException e) {
    throw new ApplicationException("Failed to start", e); // e is the cause
}

// Retrieve the original cause
catch (ApplicationException e) {
    Throwable cause = e.getCause(); // the original IOException
}
```

## What is multi-catch (Java 7+)?
Catch multiple exception types in a single `catch` block using `|`:

```java
try {
    riskyOperation();
} catch (IOException | SQLException e) {
    log.error("Operation failed", e);
    throw new RuntimeException(e);
}
```

The caught variable is implicitly `final` in a multi-catch block.

## What is the difference between `throw` and `throws`?

- **`throw`**: used inside a method body to actually throw an exception instance.
- **`throws`**: used in the method signature to declare that a method **may** throw a checked exception.

```java
void validate(int age) throws IllegalArgumentException {
    if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
}
```

## What are generic methods?
A method can declare its own type parameter, independent of the class:

```java
public static <T> List<T> repeat(T item, int times) {
    List<T> result = new ArrayList<>();
    for (int i = 0; i < times; i++) result.add(item);
    return result;
}

List<String> words = repeat("hello", 3); // ["hello", "hello", "hello"]
```

The type parameter `<T>` is placed **before the return type**.
