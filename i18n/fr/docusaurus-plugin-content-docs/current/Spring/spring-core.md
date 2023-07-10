---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Spring Core
# <TOCInline toc={toc} />

## What is the Spring framework?	
The Spring framework is a popular open-source application framework for **Java-based enterprise applications**. It provides a **comprehensive** programming and **configuration** model for developing **robust** and **scalable** applications.
## What are core features of spring?	
IoC, DI, AOP, Spring MVC, Security, transaction management.
## What is application context in spring?	
the **central container** that **holds** and **manages the configuration**, **instantiation**, and **lifecycle** of application **components**, such as beans and their dependencies
## What is dependency injection in spring?	
Dependency Injection (DI) is a design pattern used in software development to implement loose coupling between classes or components. 
In the context of the Spring framework, Dependency Injection is a fundamental concept that helps manage the dependencies between objects and promotes modular and maintainable code.
In Spring, Dependency Injection is achieved through Inversion of Control (IoC), where the control of object creation and management is delegated to a container (the Spring container) rather than being handled explicitly by the objects themselves.

**Advantages of DI**: Decoupling, Testability, Reusability, Flexibility
## Name the different bean scopes used by Spring. And the default scope?	
**singleton** (default), **prototype**, for the web: **request**, **session**, **global-session**, **application**, and **websocket**.
## What is AOP?	
**Programming paradigm** that enables modularizing **cross-cutting concerns** (e.g., logging, security, transaction management) by **separating** them from the **core business** logic. 
## What is IoC?
is a fundamental **concept** and **core** feature. **Spring IoC container**, also known as the **Spring container** or **application context**, is responsible for implementing IoC and managing the dependencies of Spring-based applications.
## What is the use of Profiles in spring boot?
Keep the **separate** configuration of environments.
## What is Spring Actuator? What are its advantages?
Actuators provide below pre-defined endpoints to monitor our application (Health, Info, Beans, Mappings, Configprops, Httptrace, Heapdump, Threaddump, and Shutdown).
## Can you explain the difference between Spring and JEE?
- Spring is a lightweight and flexible framework that can be used with different application servers and provides many features and modules.
- JEE is a complete set of specifications and technologies for building enterprise applications, but can be more complex and requires a compliant application server.

