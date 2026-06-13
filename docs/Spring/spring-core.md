---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Spring Core
# <TOCInline toc={toc} />

## What is the Spring framework?
Spring is a popular open-source framework for building Java enterprise applications. Its core philosophy is **Inversion of Control (IoC)** — the framework manages object creation and wiring, so you focus on business logic. It provides:

- A powerful **IoC container** (ApplicationContext)
- **AOP** for cross-cutting concerns
- **Transaction management**
- Integration with JPA, messaging, web, security, and more

## What are the core features of Spring?

- **IoC / Dependency Injection** — the container creates and wires beans.
- **AOP (Aspect-Oriented Programming)** — modularizes cross-cutting concerns.
- **Spring MVC** — web framework based on DispatcherServlet.
- **Spring Data** — simplifies data access (JPA, MongoDB, Redis, etc.).
- **Spring Security** — authentication and authorization.
- **Transaction Management** — declarative transactions with `@Transactional`.
- **Spring Test** — testing support with `@SpringBootTest`, mocking, etc.

## What is IoC (Inversion of Control)?
IoC inverts the control flow: instead of your code creating its dependencies, the **Spring container** creates and injects them. This makes code loosely coupled and easier to test.

```java
// Without IoC — tight coupling
class OrderService {
    PaymentService payment = new CreditCardPaymentService(); // hardcoded
}

// With IoC — Spring creates and injects PaymentService
@Service
class OrderService {
    private final PaymentService payment;
    OrderService(PaymentService payment) { this.payment = payment; } // injected
}
```

## What is Dependency Injection and what are its types?
DI is the mechanism Spring uses to implement IoC — it supplies a bean's dependencies from the outside.

**1. Constructor injection (preferred)**:
```java
@Service
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }
}
```

**2. Setter injection**:
```java
@Service
public class UserService {
    private UserRepository repo;
    @Autowired
    public void setRepo(UserRepository repo) { this.repo = repo; }
}
```

**3. Field injection** (avoid — hard to test, hides dependencies):
```java
@Autowired
private UserRepository repo;
```

Prefer **constructor injection**: makes dependencies explicit, enables `final` fields, and works without Spring in tests.

## What is ApplicationContext?
`ApplicationContext` is the central Spring IoC container. It manages the full lifecycle of beans: creation, configuration, wiring, and destruction. It also provides:

- Event publishing (`ApplicationEvent`)
- Internationalization (`MessageSource`)
- Resource loading
- Environment/property access

Common implementations:
- `AnnotationConfigApplicationContext` — for Java config
- `ClassPathXmlApplicationContext` — for XML config (legacy)
- `SpringApplication` (Spring Boot) — creates the context automatically

## What is a Spring Bean?
A bean is an object managed by the Spring IoC container. Beans are created based on configuration metadata (annotations, Java config, or XML).

```java
@Component        // detected by component scan
public class EmailService { ... }

@Configuration
public class AppConfig {
    @Bean                            // explicit bean definition
    public DataSource dataSource() { return new HikariDataSource(...); }
}
```

## What are the different bean scopes?

| Scope | Description |
|---|---|
| `singleton` (default) | One instance per ApplicationContext |
| `prototype` | New instance on every `getBean()` / injection |
| `request` | One per HTTP request (web only) |
| `session` | One per HTTP session (web only) |
| `application` | One per ServletContext (web only) |
| `websocket` | One per WebSocket session |

```java
@Bean
@Scope("prototype")
public ReportGenerator reportGenerator() { return new ReportGenerator(); }
```

## What is AOP (Aspect-Oriented Programming)?
AOP separates **cross-cutting concerns** (logging, security, transactions) from business logic by weaving behavior around method calls at runtime.

Key terms:
- **Aspect**: the module containing cross-cutting logic.
- **Advice**: what to do (`@Before`, `@After`, `@Around`, `@AfterReturning`, `@AfterThrowing`).
- **Pointcut**: which methods to intercept (expression).
- **JoinPoint**: the specific method execution.

```java
@Aspect
@Component
public class LoggingAspect {

    @Around("execution(* com.example.service.*.*(..))")
    public Object logTime(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = pjp.proceed();
        long elapsed = System.currentTimeMillis() - start;
        System.out.println(pjp.getSignature() + " took " + elapsed + "ms");
        return result;
    }
}
```

## What is the difference between `@Component`, `@Service`, `@Repository`, and `@Controller`?
All four are specializations of `@Component` — Spring auto-detects them via component scanning. The difference is semantic and enables additional behavior:

| Annotation | Layer | Extra behavior |
|---|---|---|
| `@Component` | Generic | None |
| `@Service` | Business logic | None (semantic marker) |
| `@Repository` | Data access | Exception translation (SQL → Spring `DataAccessException`) |
| `@Controller` | Web layer | Enables Spring MVC request mapping |
| `@RestController` | Web layer | `@Controller` + `@ResponseBody` |

## What is the difference between `@Bean` and `@Component`?

- `@Component` (and its specializations): auto-detected via **classpath scanning**. Applied to the class itself.
- `@Bean`: declared inside a `@Configuration` class. You write a factory method — useful when you don't control the class source (third-party libraries).

```java
@Component
class MyService { ... } // Spring scans and creates it

@Configuration
class Config {
    @Bean
    DataSource dataSource() { return new HikariDataSource(config); } // you control creation
}
```

## What is `@Autowired` and how does Spring resolve ambiguity?
`@Autowired` tells Spring to inject a dependency by type. If multiple beans match the type:

1. **`@Primary`**: mark one bean as the preferred default.
2. **`@Qualifier("name")`**: specify the exact bean name.

```java
@Primary @Bean DataSource primaryDS() { ... }
@Bean DataSource secondaryDS() { ... }

@Autowired @Qualifier("secondaryDS")
private DataSource ds; // injects secondaryDS
```

## What is the Spring Bean lifecycle?
1. **Instantiation** — Spring creates the bean instance.
2. **Populate properties** — injects dependencies.
3. **`BeanNameAware`, `BeanFactoryAware`** callbacks.
4. **`@PostConstruct`** / `afterPropertiesSet()` — initialization logic.
5. **Bean is ready** — in use by the application.
6. **`@PreDestroy`** / `destroy()` — cleanup on context shutdown.

```java
@Component
public class DatabaseInitializer {
    @PostConstruct
    void init() { System.out.println("Connecting to DB..."); }

    @PreDestroy
    void cleanup() { System.out.println("Closing connection..."); }
}
```

## What are Spring Profiles?
Profiles let you have **separate configuration per environment** (dev, test, prod):

```java
@Configuration
@Profile("dev")
public class DevDataSourceConfig {
    @Bean DataSource dataSource() { return new H2DataSource(); }
}

@Configuration
@Profile("prod")
public class ProdDataSourceConfig {
    @Bean DataSource dataSource() { return new PostgresDataSource(); }
}
```

Activate with: `spring.profiles.active=prod` in `application.properties`, or `-Dspring.profiles.active=prod` JVM arg.

## What is Spring Actuator?
Spring Boot Actuator exposes production-ready endpoints to **monitor and manage** your application:

| Endpoint | Purpose |
|---|---|
| `/actuator/health` | App health status |
| `/actuator/info` | App info (version, etc.) |
| `/actuator/metrics` | JVM, HTTP, custom metrics |
| `/actuator/beans` | All registered beans |
| `/actuator/env` | Environment properties |
| `/actuator/loggers` | View/change log levels |
| `/actuator/threaddump` | Thread dump |

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics
```

## What is the difference between BeanFactory and ApplicationContext?

| | `BeanFactory` | `ApplicationContext` |
|---|---|---|
| Bean initialization | Lazy (on `getBean()`) | Eager (singleton beans at startup) |
| Annotation support | ❌ No | ✅ Yes |
| AOP / Transactions | ❌ Not automatic | ✅ Automatic |
| Bean scopes supported | singleton, prototype | All scopes |
| i18n / Events | ❌ No | ✅ Yes |
| Typical use | Memory-constrained environments | Enterprise applications (standard choice) |

`ApplicationContext` extends `BeanFactory` and adds all the enterprise features. **Always use `ApplicationContext`** unless you have an extreme memory constraint.

## What is the difference between Spring and Jakarta EE?

- **Spring**: lightweight framework, can run in any servlet container (Tomcat). Offers a unified programming model, rich ecosystem (Boot, Cloud, Security). Convention over configuration.
- **Jakarta EE**: specification-driven, requires a compliant app server (WildFly, GlassFish). More standardized but heavier. CDI for DI, EJBs for transactions.

In practice, Spring (especially Spring Boot) dominates modern Java development due to its developer experience and ecosystem.
