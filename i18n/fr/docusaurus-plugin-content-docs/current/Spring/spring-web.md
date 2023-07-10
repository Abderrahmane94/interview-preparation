---
sidebar_position: 4
---
import TOCInline from '@theme/TOCInline';

# Spring Web
# <TOCInline toc={toc} />

## What is Spring Web?
Spring Web is a **module** within the Spring Framework that provides support for **building web applications**. It offers features and abstractions to simplify the **development** of **web-based** applications, **RESTful** services, and **APIs** in the Java ecosystem.

Spring Web provides several **key components** and features:

1. **DispatcherServlet**: The DispatcherServlet is the central servlet in Spring Web. It acts as the front controller, receiving and dispatching requests to the appropriate handlers based on URL mappings and other configurations.

2. **MVC Framework**: Spring Web follows the Model-View-Controller (MVC) architectural pattern. It provides an MVC framework that allows developers to separate concerns by defining controllers to handle requests, models to represent data, and views to render the response.

3. **Handler Mapping**: Spring Web includes various handler mapping strategies to map incoming requests to the appropriate controller methods based on URL patterns, request methods, or other criteria. It supports flexible configuration options for defining mappings.

4. **View Resolution**: Spring Web integrates with different view technologies, such as JSP, Thymeleaf, and FreeMarker, allowing you to choose the view technology that best suits your needs. It provides mechanisms for resolving and rendering views.

5. **Request/Response Handling**: Spring Web provides abstractions and utilities for handling request and response objects, including support for content negotiation, HTTP message converters, and request/response interceptors.

6. **RESTful Web Services**: Spring Web also includes features specifically designed for building RESTful services and APIs. It provides annotations, such as `@RestController`, `@RequestMapping`, and `@PathVariable`, to simplify the development of RESTful endpoints.

7. **Integration with other Spring modules**: Spring Web seamlessly integrates with other modules of the Spring Framework, such as Spring Data, Spring Security, and Spring Boot, enabling you to leverage additional functionalities for data access, security, and application configuration.