---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';

# Spring Boot
# <TOCInline toc={toc} />

## What are the Spring Boot key components?	
- Spring Boot **auto-configuration**.
- Spring Boot **starter POMs**.
- Spring Boot **Actuators**.
## Spring vs Spring Boot?
### Spring
1. Purpose: Spring is a comprehensive framework that provides a wide range of features and modules for developing enterprise Java applications.
2. Configuration: Spring applications typically require explicit configuration through XML files or Java-based configuration classes.
3. Flexibility: Spring allows developers to choose the specific modules and components they need for their application, providing flexibility in terms of configuration and integration with various libraries and frameworks.

### Spring Boot
1. Purpose: Spring Boot is built on top of the Spring framework and focuses on simplifying the development of Spring applications. It provides opinionated defaults and auto-configuration to minimize boilerplate code and simplify setup.
2. Convention over Configuration: It automatically configures various components based on sensible defaults, reducing the need for manual configuration.
3. Embedded Server: Spring Boot includes an embedded servlet container (Tomcat, Jetty, or Undertow) by default, allowing developers to create self-contained applications that can be deployed as standalone executables.
4. Rapid Development: Spring Boot aims to accelerate development by providing a streamlined experience. It includes features like automatic dependency management, embedded database support, and easy externalized configuration.
5. Actuator: Spring Boot includes the Actuator module, which provides production-ready features such as health checks, metrics, monitoring, and management endpoints out of the box.
## What Are the Basic Annotations that Spring Boot Offers
**@SpringBootApplication** which combines @Configuration, @EnableAutoConfiguration, and @ComponentScan annotations

