---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Basics
# <TOCInline toc={toc} />

## What is Java?
Java is a high-level, strongly-typed, object-oriented programming language designed to be **platform-independent** ("write once, run anywhere"). Java source code compiles to **bytecode**, which runs on any JVM regardless of the underlying OS.

## What are the features of Java?
- **Platform independence**: bytecode runs on any JVM.
- **Object-oriented**: everything is an object (except primitives).
- **Strongly typed**: type checking at compile time.
- **Automatic memory management**: garbage collector handles heap memory.
- **Multithreading**: built-in thread support.
- **Robust**: strong exception handling, no pointer arithmetic.
- **Secure**: no direct memory access, bytecode verification.
- **Rich standard library**: `java.util`, `java.io`, `java.net`, etc.

## What is the difference between JDK, JRE, and JVM?

- **JVM (Java Virtual Machine)**: executes Java bytecode. Platform-specific (different JVM per OS). Provides garbage collection, JIT compilation, and runtime environment.
- **JRE (Java Runtime Environment)**: JVM + standard class libraries. Needed to **run** Java applications.
- **JDK (Java Development Kit)**: JRE + compiler (`javac`), debugger, and other development tools. Needed to **develop** Java applications.

```
JDK ⊃ JRE ⊃ JVM
```

## What is the difference between primitive types and wrapper classes?

Java has 8 primitive types: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`. They are stored on the **stack** (when local variables), not on the heap.

Wrapper classes (`Integer`, `Double`, etc.) are objects that wrap primitives — required for collections (`List<Integer>`, not `List<int>`).

```java
int primitive = 42;           // stack, no overhead
Integer wrapper = 42;         // autoboxed, heap object

// Pitfall: == compares references for objects
Integer a = 200, b = 200;
a == b;       // false — different objects
a.equals(b);  // true
```

Java caches `Integer` values from **-128 to 127**, so `Integer.valueOf(127) == Integer.valueOf(127)` is `true`.

## What is autoboxing and unboxing?
**Autoboxing** is the automatic conversion from primitive to wrapper (`int` → `Integer`). **Unboxing** is the reverse.

```java
List<Integer> list = new ArrayList<>();
list.add(5);           // autoboxing: int 5 → Integer(5)
int x = list.get(0);   // unboxing: Integer(5) → int 5
```

⚠️ Unboxing a `null` wrapper throws `NullPointerException`.

## What is the difference between an abstract class and an interface?

| | Abstract Class | Interface |
|---|---|---|
| Instantiation | No | No |
| Methods | Abstract + concrete | Abstract, `default`, `static` (Java 8+), `private` (Java 9+) |
| Fields | Any | `public static final` only |
| Multiple inheritance | ❌ one `extends` | ✅ multiple `implements` |
| Constructor | Yes | No |

**When to use**: abstract class for shared base implementation; interface for defining a contract or capability.

```java
interface Drawable { void draw(); default void print() { System.out.println("Drawing"); } }
abstract class Shape { protected String color; abstract double area(); }
class Circle extends Shape implements Drawable {
    double area() { return Math.PI * r * r; }
    public void draw() { System.out.println("Drawing circle"); }
}
```

## What is the purpose of the `static` keyword?
`static` members belong to the **class**, not to any instance. They are shared across all objects.

```java
class Counter {
    static int count = 0;  // shared
    int id;
    Counter() { id = ++count; }
}
Counter.count;  // access via class name (preferred)
```

`static` methods cannot access instance (`this`) fields. `static` blocks run once when the class is loaded.

## What is the purpose of the `final` keyword?

- **`final` variable**: cannot be reassigned after initialization.
- **`final` method**: cannot be overridden.
- **`final` class**: cannot be subclassed (e.g., `String`, `Integer`).

```java
final int MAX = 100;       // constant
final class Immutable {}   // cannot extend
```

## What is the difference between `==` and `.equals()`?

- `==` compares **references** (memory addresses) for objects; compares **values** for primitives.
- `.equals()` compares **content** (must be properly overridden).

```java
String a = new String("hello");
String b = new String("hello");
a == b;        // false — different objects
a.equals(b);   // true — same content
```

Always use `.equals()` for object comparison. For `null`-safe equality, use `Objects.equals(a, b)`.

## What is a constructor in Java?
A constructor initializes a new object. It has the same name as the class and no return type. If no constructor is defined, Java provides a default no-arg constructor.

```java
class Person {
    String name;
    int age;

    Person() { this("Unknown", 0); }            // no-arg, calls other constructor
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

Constructors cannot be `static`, `abstract`, or `final`. They can be overloaded.

## What is the purpose of the `this` keyword?
`this` refers to the **current object**:

```java
class Point {
    int x, y;
    Point(int x, int y) {
        this.x = x;   // disambiguates field from parameter
        this.y = y;
    }
    Point copy() { return this; }   // return current object
}
```

`this(...)` calls another constructor in the same class (must be first statement).

## What is the purpose of the `super` keyword?
`super` refers to the **parent class**:

```java
class Animal { void speak() { System.out.println("..."); } }
class Dog extends Animal {
    @Override
    void speak() {
        super.speak();              // call parent method
        System.out.println("Woof");
    }
    Dog() { super(); }             // call parent constructor (implicit if omitted)
}
```

## What is the difference between an instance variable and a static variable?

- **Instance variable**: each object has its own copy, stored on the heap with the object.
- **Static variable**: one copy shared across all instances, stored in the method area.

```java
class Dog {
    static int count = 0;   // shared — how many dogs exist
    String name;            // instance — each dog has its own name
    Dog(String name) { this.name = name; count++; }
}
```

## What is a lambda expression in Java?
A lambda is a concise way to represent an anonymous function. It can be used wherever a **functional interface** is expected.

```java
// Old: anonymous class
Comparator<String> comp = new Comparator<>() {
    public int compare(String a, String b) { return a.compareTo(b); }
};

// Lambda
Comparator<String> comp = (a, b) -> a.compareTo(b);

// Method reference (even shorter)
Comparator<String> comp = String::compareTo;
```

## What is the purpose of the `transient` keyword?
Fields marked `transient` are **excluded from serialization**.

```java
class User implements Serializable {
    String username;
    transient String password;  // not saved when serialized
}
```

## What is a JavaBean?
A JavaBean is a class following these conventions:
1. Public no-arg constructor.
2. Private fields with public getters/setters.
3. Implements `Serializable`.

```java
public class Product implements Serializable {
    private String name;
    private double price;

    public Product() {}
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
```

Used extensively in Spring, JPA, and JSP frameworks.

## What is the difference between `StringBuilder` and `StringBuffer`?

| | `StringBuilder` | `StringBuffer` |
|---|---|---|
| Thread-safe | No | Yes (synchronized) |
| Performance | Faster | Slower |

`String` itself is **immutable** — any "modification" creates a new object. Use `StringBuilder` for building strings in loops.

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World").insert(5, ",").reverse();
String result = sb.toString();
```

## What is the purpose of the `instanceof` operator?
Checks if an object is an instance of a class/interface. Since Java 16 (pattern matching), it can also bind the result:

```java
Object obj = "Hello";

// Classic
if (obj instanceof String) { String s = (String) obj; }

// Pattern matching (Java 16+)
if (obj instanceof String s) { System.out.println(s.length()); }
```

## What is the purpose of the `assert` keyword?
Used during development/testing to check assumptions. Disabled by default at runtime (enable with `-ea` JVM flag).

```java
int age = getAge();
assert age >= 0 : "Age cannot be negative: " + age;
```

Not for production validation — use proper exceptions instead.

## What is a package in Java?
A package is a namespace for organizing related classes and interfaces. It maps to directory structure.

```java
package com.company.utils;     // declaration at top of file

import java.util.List;         // import from another package
import com.company.utils.*;    // wildcard import (not recommended)
```

Benefits: prevents naming conflicts, controls access (`package-private`), organizes code.

## What is the purpose of the `break` and `continue` keywords?

- **`break`**: exits the current loop or switch immediately.
- **`continue`**: skips the rest of the current iteration and moves to the next.

```java
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // skip 3
    if (i == 7) break;     // stop at 7
    System.out.print(i + " ");
}
// Output: 0 1 2 4 5 6
```

## What is the purpose of the `default` keyword in a switch statement?
Executes when no `case` matches. Also used in interfaces (Java 8+) for default method implementations.

```java
switch (day) {
    case MONDAY: System.out.println("Start of week"); break;
    case FRIDAY: System.out.println("End of week"); break;
    default: System.out.println("Midweek");
}
```

Java 14+ switch expressions:
```java
String label = switch (day) {
    case MONDAY -> "Start";
    case FRIDAY -> "End";
    default -> "Mid";
};
```
