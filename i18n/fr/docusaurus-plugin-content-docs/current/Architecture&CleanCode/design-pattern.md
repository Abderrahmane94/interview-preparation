---
sidebar_position: 3
---

import TOCInline from '@theme/TOCInline';

# Design Pattern
# <TOCInline toc={toc} />

## What are Design Patterns?
**Design patterns** are typical solutions to commonly occurring problems in software design. 

### 1. Creational patterns
A creational design pattern is a type of design pattern in software engineering that focuses on object creation mechanisms.
1. **Singleton**: Ensures that only one instance of a class exists throughout the system.
2. **Factory Method**: Defines an interface for creating objects but allows subclasses to decide which class to instantiate.
3. **Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
4. **Builder**: Separates the construction of complex objects from their representation, allowing the same construction process to create different representations.
5. **Prototype**: Creates new objects by cloning existing objects, allowing for the creation of new instances without explicitly specifying their class.
### 2. Structural patterns
Structural design patterns focus on the composition and structure of classes and objects.
1. **Adapter**: Converts the interface of a class into another interface that clients expect. It allows incompatible classes to work together by wrapping one class with another. 
2. **Bridge**: Decouples an abstraction from its implementation, allowing them to vary independently. It provides a way to separate the interface and implementation hierarchies.
3. **Composite**: Composes objects into a tree-like structure to represent part-whole hierarchies. It allows clients to treat individual objects and compositions uniformly.
4. **Decorator**: Dynamically adds responsibilities or behaviors to objects without subclassing. It provides a flexible alternative to subclassing for extending functionality.
5. **Facade**: Provides a unified interface to a set of interfaces of a subsystem. It simplifies complex subsystems by providing a higher-level interface that clients can interact with.
6. **Flyweight**: Shares common state across multiple objects, reducing memory consumption. It allows for efficient sharing of fine-grained objects.
7. **Proxy**: Provides a surrogate or placeholder object that controls access to another object. It allows for additional functionality and control over object access.
### 3. Behavioral patterns
Behavioral design patterns focus on the interaction and communication between objects and classes.
1. **Observer**: Defines a one-to-many dependency between objects, so that when one object changes its state, all dependent objects are notified and updated automatically.
2. **Strategy**: Encapsulates a family of algorithms and makes them interchangeable. It allows the algorithm to vary independently from clients that use it.
3. **Command**: Encapsulates a request as an object, allowing the parameterization of clients with different requests, queueing or logging requests, and supporting undoable operations.
4. **Template Method**: Defines the skeleton of an algorithm in a base class, allowing subclasses to override certain steps of the algorithm without changing its structure.
5. **Iterator**: Provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. It decouples the traversal logic from the object structure.
6. **State**: Allows an object to alter its behavior when its internal state changes. It encapsulates state-specific behavior into separate classes and allows objects to dynamically change their behavior.
7. **Chain of Responsibility**: Allows an object to pass a request along a chain of potential handlers until one of them handles the request. It decouples senders and receivers and provides flexibility in handling requests.
8. **Interpreter**: Defines a representation for a grammar along with an interpreter that uses the representation to interpret sentences in the language. It allows the creation of domain-specific languages.
