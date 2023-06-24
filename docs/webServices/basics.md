

# Web Services

## Rest Vs SOAP	
Are two different types of web service architectures used to transmit data between applications, 
- **SOAP** is a more rigid and complex architecture that uses XML-based messages, 
- **REST** is a lightweight and flexible architecture that uses standard HTTP requests and responses to exchange data in various formats
## What is an Idempotent API?	
An idempotent HTTP method is a method that can be invoked many times without the different outcomes, POST is the only NOT idempotent
## How to communicate between Java Microservices?	
(HTTP)/REST - Synchronous Communication, Messaging - Asynchronous Communication
## rabbitMQ?	
## What is the difference PUT and PATCH?	
PUT is used to completely replace an existing resource or create a new one at the specified URI / PATCH is used to partially update an existing resource.
## Monolithic vs microservice
## How to define a good API?
## How would you design a RESTful API?
## What is an API Contract first? Do you use Swagger first or Code first?
- **Swagger First** involves writing the API specification first and then generating the API implementation code based on that specification 
- **Code First** involves writing the API implementation code first and then generating the API specification based on that code.
## What are the most common HTTP methods used in REST APIs
GET, POST, PUT/PATCH, and 
## What are the HTTP status codes
100, 200, 300, 400 and 500
## How to communicate between Java Microservices?
- (HTTP)/REST - Synchronous Communication 
- Messaging - Asynchronous Communication
## What are the Microservices architecture and the key components of a microservices architecture?
- applications are broken down into smaller, independent services that can be developed, deployed, and maintained separately. 
- Service Registry, API Gateway, Configuration Server, Load Balancer, and Monitoring and Logging.
## Can you describe how to handle distributed transactions across multiple microservices?
- It's important to use a technique called the Saga pattern.
- The Saga pattern is a design pattern for handling long-lived transactions across multiple microservices