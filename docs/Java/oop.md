---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';

# Java OOP
# <TOCInline toc={toc} />

## What is OOP?
Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around **objects** — instances of classes that bundle **data** (fields) and **behavior** (methods) together. Java is a fully object-oriented language (except for primitive types).

## Key concepts of OOP in Java

- **Encapsulation**: Bundles data and methods together, hiding internal state and exposing only a clean API via access modifiers (`private`, `protected`, `public`).

- **Inheritance**: A class (subclass) can extend another class (superclass), inheriting its fields and methods. Promotes code reuse. Java supports single inheritance for classes but multiple inheritance through interfaces.

- **Polymorphism**: An object can take many forms. A superclass reference can point to a subclass object. Enables dynamic dispatch at runtime.

- **Abstraction**: Hiding implementation details and exposing only relevant functionality, via abstract classes or interfaces.

## What is polymorphism in Java?
Polymorphism lets one interface represent different underlying types. There are two kinds:

- **Compile-time (static) polymorphism** — method overloading: same method name, different parameter lists.
- **Runtime (dynamic) polymorphism** — method overriding: subclass provides its own implementation of a superclass method; the JVM decides which version to call at runtime.

```java
class Animal {
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof"); }
}
Animal a = new Dog();
a.speak(); // prints "Woof" — runtime polymorphism
```

## What is the difference between method overloading and method overriding in Java?

| | Overloading | Overriding |
|---|---|---|
| Resolved at | Compile time | Runtime |
| Signature | Different parameters | Same signature |
| Return type | Can differ | Must be same or covariant |
| Location | Same class | Subclass |
| `static`/`private` | Can be overloaded | Cannot be overridden |

```java
// Overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Overriding
class Parent { void greet() { System.out.println("Hello"); } }
class Child extends Parent {
    @Override
    void greet() { System.out.println("Hi"); }
}
```

## What is encapsulation and how do you achieve it?
Encapsulation is the practice of keeping fields `private` and exposing them through public getters/setters, so you control how data is accessed and modified.

```java
public class BankAccount {
    private double balance;

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
}
```

Benefits: data validation, hiding implementation, easier refactoring.

## What is the difference between an abstract class and an interface?

| | Abstract Class | Interface |
|---|---|---|
| Instantiation | No | No |
| Methods | Abstract + concrete | Abstract + `default` + `static` (Java 8+) |
| Fields | Any | `public static final` only |
| Inheritance | Single (`extends`) | Multiple (`implements`) |
| Constructor | Yes | No |
| Use case | Shared base behavior | Contract / capability |

Since Java 8, interfaces can have `default` and `static` methods. Since Java 9, they can have `private` methods. So the key remaining distinction is that **a class can only extend one abstract class but implement many interfaces**.

```java
interface Flyable {
    void fly();
    default void land() { System.out.println("Landing..."); }
}

abstract class Vehicle {
    protected String brand;
    abstract void start();
    void stop() { System.out.println("Stopped"); }
}
```

## What is the difference between composition and inheritance?

**Inheritance** ("is-a"): `Dog extends Animal` — use when the subclass truly is a specialization of the parent.

**Composition** ("has-a"): a class holds a reference to another class — more flexible and preferred in most cases.

```java
// Inheritance
class Car extends Engine { } // bad — a Car is not an Engine

// Composition (preferred)
class Car {
    private Engine engine; // a Car HAS an Engine
    Car(Engine engine) { this.engine = engine; }
}
```

Prefer composition: it avoids tight coupling, is easier to test with mocks, and doesn't expose parent internals.

## What are the SOLID principles?

- **S**ingle Responsibility: a class should have one reason to change.
- **O**pen/Closed: open for extension, closed for modification (use inheritance/interfaces).
- **L**iskov Substitution: subclasses must be substitutable for their superclass without breaking correctness.
- **I**nterface Segregation: prefer many small, specific interfaces over one large general one.
- **D**ependency Inversion: depend on abstractions, not concretions.

```java
// Dependency Inversion example
interface NotificationService { void send(String msg); }

class EmailService implements NotificationService {
    public void send(String msg) { /* send email */ }
}

class OrderProcessor {
    private final NotificationService notifier; // depends on abstraction
    OrderProcessor(NotificationService notifier) { this.notifier = notifier; }
}
```

## What is the difference between `this` and `super`?

- `this` refers to the **current object**. Used to disambiguate fields from local variables, or to call another constructor in the same class (`this(...)`).
- `super` refers to the **parent class**. Used to call overridden methods (`super.method()`) or the parent constructor (`super(...)`).

```java
class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void describe() { System.out.println("Animal: " + name); }
}

class Dog extends Animal {
    String breed;
    Dog(String name, String breed) {
        super(name);        // calls Animal constructor
        this.breed = breed; // 'this' disambiguates the field
    }
    @Override
    void describe() {
        super.describe();   // calls Animal's describe()
        System.out.println("Breed: " + breed);
    }
}
```

## What are access modifiers in Java?

| Modifier | Same class | Same package | Subclass | Everywhere |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| (default) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

## What is a covariant return type?
Since Java 5, an overriding method can return a **subtype** of the return type declared in the superclass.

```java
class Animal { Animal create() { return new Animal(); } }
class Dog extends Animal {
    @Override
    Dog create() { return new Dog(); } // covariant — Dog is a subtype of Animal
}
```

## What is the difference between early binding and late binding?

- **Early binding (static dispatch)**: resolved at compile time — applies to `static`, `private`, and `final` methods.
- **Late binding (dynamic dispatch)**: resolved at runtime — applies to overridden instance methods. Java uses a virtual method table (vtable) for this.

## What is an inner class in Java?
A class defined inside another class. Types:

- **Static nested class**: does not hold a reference to the outer instance.
- **Non-static inner class**: holds an implicit reference to the outer instance.
- **Local class**: defined inside a method.
- **Anonymous class**: nameless, defined and instantiated in one expression — commonly used before lambdas.

```java
class Outer {
    private int x = 10;

    class Inner {
        void show() { System.out.println(x); } // accesses outer field
    }

    static class StaticNested {
        void show() { System.out.println("Static nested"); }
    }
}
```

## What is the difference between an object and a class?
A **class** is a blueprint or template defining fields and methods. An **object** is a runtime instance of that class, allocated on the heap.

```java
class Car { String model; }       // class — blueprint
Car myCar = new Car();            // object — instance
```

## What is method hiding vs method overriding?
- **Overriding**: instance methods — resolved at runtime based on the actual object type.
- **Hiding**: `static` methods — resolved at compile time based on the reference type. Static methods cannot be overridden; they are hidden.

```java
class Parent { static void hello() { System.out.println("Parent"); } }
class Child extends Parent { static void hello() { System.out.println("Child"); } }

Parent p = new Child();
p.hello(); // prints "Parent" — static method hiding, not overriding
```
