
import TOCInline from '@theme/TOCInline';

# Maven

# <TOCInline toc={toc} />

## What is Maven?
Maven is a **build tool** for Java projects that **manages** dependencies and builds projects based on a project object model (**POM**) file. It simplifies the build process and is based on convention over configuration.

## What is pom.xml?
`pom.xml` (Project Object Model) is the core configuration file Maven uses to build the project. It contains:
- Project coordinates (`groupId`, `artifactId`, `version`)
- **Dependencies** required by the project
- **Plugins** and **goals**
- Packaging type (`<packaging>jar</packaging>` or `war`)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.2.0</version>
</dependency>
```

## What are Maven repositories?
- **Local repository**: directory on the developer’s machine (`~/.m2/repository`). Maven downloads dependencies here once and reuses them across projects.
- **Central repository**: Maven’s public repository on the internet where most open-source libraries are published.
- **Remote repository**: company-internal repository (e.g., Nexus, Artifactory) for sharing proprietary artifacts within an organization.

When Maven needs a dependency, it looks in: **local repo → remote repo → central repo**.

## What are Maven Scopes?
Maven scopes control when a dependency is on the classpath:

| Scope | Compile | Test | Runtime | Packaged |
|---|---|---|---|---|
| `compile` (default) | ✅ | ✅ | ✅ | ✅ |
| `provided` | ✅ | ✅ | ❌ | ❌ |
| `runtime` | ❌ | ✅ | ✅ | ✅ |
| `test` | ❌ | ✅ | ❌ | ❌ |
| `system` | ✅ | ✅ | ❌ | ❌ |

`provided` is used for dependencies supplied by the container at runtime (e.g., Servlet API in Tomcat).
`test` is for test-only libraries like JUnit, Mockito.

## What are Transitive Dependencies in Maven?
Transitive dependencies are dependencies **indirectly required** through your direct dependencies. If your project depends on Library A, and Library A depends on Library B, Maven automatically includes Library B.

You can exclude a transitive dependency with:
```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>library-a</artifactId>
    <exclusions>
        <exclusion>
            <groupId>com.unwanted</groupId>
            <artifactId>library-b</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## What is the Maven Build Lifecycle?
Maven’s default build lifecycle has these phases (each phase triggers all previous ones):

1. **validate** — checks project is correct and info is available
2. **compile** — compiles source code
3. **test** — runs unit tests with a testing framework
4. **package** — packages compiled code into JAR/WAR
5. **verify** — runs integration tests and quality checks
6. **install** — installs the package into the local repository
7. **deploy** — copies the package to the remote repository

```bash
mvn package        # runs validate → compile → test → package
mvn clean install  # clean previous build artifacts, then run up to install
mvn clean deploy   # full build + push to remote repo
```

`mvn clean` deletes the `/target` directory (compiled output). Always use `clean` before `install`/`deploy` for a reliable build.
