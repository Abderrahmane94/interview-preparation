---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';

# Spring Boot
# <TOCInline toc={toc} />

## What are the Spring Boot key components?
- **Auto-configuration**: automatically configures Spring beans based on classpath dependencies.
- **Starter POMs**: curated dependency bundles (e.g., `spring-boot-starter-web` brings Tomcat + Spring MVC + Jackson).
- **Embedded server**: Tomcat, Jetty, or Undertow bundled in the JAR — no external deployment needed.
- **Spring Boot Actuator**: production monitoring endpoints.
- **Spring Boot CLI**: run Groovy scripts as Spring apps.
- **Externalized configuration**: `application.properties` / `application.yml` with environment-specific profiles.

## What is the difference between Spring and Spring Boot?

| | Spring | Spring Boot |
|---|---|---|
| Configuration | Explicit (XML or Java) | Auto-configured |
| Server | External (deploy WAR) | Embedded (run as JAR) |
| Dependencies | Manual version management | Managed via parent POM |
| Startup speed | Slower to set up | Ready in minutes |
| Boilerplate | More | Minimal |

Spring Boot doesn't replace Spring — it's a layer on top that applies opinionated defaults so you can get productive faster, while retaining full access to Spring APIs.

## What does `@SpringBootApplication` do?
It's a convenience annotation that combines three annotations:

```java
@SpringBootApplication
// equivalent to:
@Configuration          // marks this as a source of bean definitions
@EnableAutoConfiguration // triggers Spring Boot's auto-config
@ComponentScan          // scans the current package and sub-packages for @Component
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```

## How does Spring Boot auto-configuration work?
1. `@EnableAutoConfiguration` triggers a scan of `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` (or the legacy `spring.factories`).
2. Spring Boot finds all `@AutoConfiguration` classes on the classpath.
3. Each auto-configuration class is annotated with `@ConditionalOn*` conditions (e.g., `@ConditionalOnClass`, `@ConditionalOnMissingBean`) — it only activates if the condition is met.

```java
// Example: DataSource is auto-configured only if HikariCP is on the classpath
// and no custom DataSource bean is defined
@AutoConfiguration
@ConditionalOnClass(HikariDataSource.class)
@ConditionalOnMissingBean(DataSource.class)
class HikariDataSourceAutoConfiguration { ... }
```

You can see what was auto-configured (and why) with `--debug` flag or the `/actuator/conditions` endpoint.

## What are the main Spring Boot annotations?

| Annotation | Purpose |
|---|---|
| `@SpringBootApplication` | Entry point: config + scan + auto-config |
| `@RestController` | `@Controller` + `@ResponseBody` |
| `@RequestMapping` / `@GetMapping` | Map HTTP requests to methods |
| `@PathVariable` | Bind URI template variable |
| `@RequestParam` | Bind query parameter |
| `@RequestBody` | Deserialize request body (JSON → object) |
| `@ResponseBody` | Serialize return value to response body |
| `@Service` | Business layer bean |
| `@Repository` | Data layer bean + exception translation |
| `@Configuration` | Bean definition source |
| `@Bean` | Declares a managed bean in a `@Configuration` class |
| `@Value` | Inject a property value |
| `@ConfigurationProperties` | Bind a group of properties to a class |
| `@Transactional` | Wrap method in a database transaction |
| `@Profile` | Activate bean only for specific profile |

## How do you externalize configuration in Spring Boot?
Spring Boot loads configuration from multiple sources in priority order (higher overrides lower):

1. Command-line args (`--server.port=9090`)
2. OS environment variables
3. `application-{profile}.properties`
4. `application.properties` / `application.yml`
5. Default values in `@Value` / `@ConfigurationProperties`

```yaml
# application.yml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:postgresql://localhost/mydb
    username: ${DB_USER}    # from env variable
```

```java
@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
    private String name;
    private int maxRetries = 3;
    // getters/setters
}
```

## What is the difference between `application.properties` and `application.yml`?
Both configure the same properties — YAML is just a different format that supports **nested keys** more readably.

```properties
# application.properties
spring.datasource.url=jdbc:h2:mem:test
spring.jpa.hibernate.ddl-auto=create
```
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:h2:mem:test
  jpa:
    hibernate:
      ddl-auto: create
```

YAML also supports lists more cleanly. Both can coexist; `.properties` takes precedence if they're at the same priority.

## How does Spring Boot handle embedded servers?
By default, `spring-boot-starter-web` includes **embedded Tomcat**. When you run `mvn spring-boot:run` or execute the JAR, Spring Boot starts the server programmatically — no WAR deployment needed.

```xml
<!-- Switch to Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

## What is Spring Boot DevTools?
`spring-boot-devtools` is a developer experience tool that:
- **Auto-restarts** the application when classpath files change.
- **LiveReload** — refreshes the browser on resource changes.
- Disables template caching during development.
- Provides additional debug information.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

Excluded from production builds automatically.

## How do you write a Spring Boot test?

```java
// Full context integration test
@SpringBootTest
class UserServiceIntegrationTest {
    @Autowired UserService userService;

    @Test
    void shouldCreateUser() {
        User user = userService.create("Alice");
        assertThat(user.getName()).isEqualTo("Alice");
    }
}

// Slice test — only web layer
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired MockMvc mvc;
    @MockBean UserService userService;

    @Test
    void shouldReturn200() throws Exception {
        when(userService.findById(1L)).thenReturn(new User("Alice"));
        mvc.perform(get("/users/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.name").value("Alice"));
    }
}
```
