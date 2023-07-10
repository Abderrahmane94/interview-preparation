import TOCInline from '@theme/TOCInline';

# Web Services
# <TOCInline toc={toc} />

## Rest Vs SOAP	
Are two different types of **web service architectures** used to transmit data between applications, 
- **SOAP** is a more rigid and complex architecture that uses XML-based messages, 
- **REST** is a lightweight and flexible architecture that uses standard HTTP requests and responses to exchange data in various formats
## What is an Idempotent API?	
An idempotent HTTP method is a method that can be invoked many times **without** the different outcomes, **POST** is the only **NOT idempotent**.
## How to communicate between Java Microservices?	
- (HTTP)/REST - Synchronous Communication.
- Messaging - Asynchronous Communication.
## What's rabbitMQ?	
RabbitMQ is an open-source **message broker** software that enables communication and coordination between distributed systems. It implements the Advanced Message Queuing Protocol (**AMQP**) and provides a reliable, scalable, and flexible messaging platform.

Here are the key concepts and features of RabbitMQ:

1. **Message Broker**: RabbitMQ acts as an intermediary or a middleman between producers and consumers of messages. Producers send messages to RabbitMQ, which stores them until they are consumed by the appropriate consumers.

2. **Message Queues**: RabbitMQ uses queues to store messages. A queue is a named buffer that holds messages until they are processed by consumers. Queues provide reliable message delivery, decoupling the producers and consumers in a distributed system.

3. **Exchange**: An exchange is responsible for receiving messages from producers and routing them to the appropriate queues. RabbitMQ supports different exchange types, including direct, topic, fanout, and headers, allowing for various message routing patterns.

4. **Binding**: Bindings define the relationship between exchanges and queues. They specify the routing rules that determine how messages should be routed from an exchange to one or more queues.

5. **Routing Keys**: Routing keys are used by exchanges to determine which queues should receive specific messages. Producers attach a routing key to each message, and exchanges use this key to route the message to the appropriate queues based on the binding configuration.

6. **Message Acknowledgement**: RabbitMQ supports message acknowledgements to ensure reliable delivery. Consumers can explicitly acknowledge the successful processing of a message, indicating that RabbitMQ can remove it from the queue. If a consumer fails to acknowledge a message, RabbitMQ can re-queue it for redelivery.

7. **Fault Tolerance and High Availability**: RabbitMQ supports clustering, allowing multiple RabbitMQ nodes to form a cluster and work together. Clustering provides fault tolerance and high availability, ensuring that messages are not lost even if some nodes fail.

8. **Plugins and Extensibility**: RabbitMQ provides a plugin system that allows extending its functionality. Various plugins are available for features like message transformation, authentication, authorization, and integration with other systems.

RabbitMQ is widely used in distributed systems, microservices architectures, and other scenarios where reliable messaging and decoupling of components are crucial. It enables asynchronous communication, load balancing, and scalability, making it suitable for building robust and scalable applications.

Developers can interact with RabbitMQ using various programming languages and client libraries that support the AMQP protocol. Popular client libraries include RabbitMQ Java client, RabbitMQ .NET client, Pika (Python), and amqplib (Node.js), among others.

Overall, RabbitMQ provides a powerful and flexible messaging infrastructure that simplifies the development of distributed systems and enables seamless integration between different components and services.
## What is the difference PUT and PATCH?	
- **PUT** is used to completely replace an existing resource or create a new one at the specified URI.
- **PATCH** is used to **partially update** an existing resource.
## Monolithic vs microservice
## How to define a good API?
## How would you design a RESTful API?
## What is an API Contract first? Do you use Swagger first or Code first?
- **Swagger First** involves writing the API specification first and then generating the API implementation code based on that specification.
- **Code First** involves writing the API implementation code first and then generating the API specification based on that code.
## What are the most common HTTP methods used in REST APIs
REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs (Application Programming Interfaces) are built on this style and use HTTP (Hypertext Transfer Protocol) methods, also known as REST methods or REST verbs, to perform different operations on resources. The most commonly used REST methods are:

1. **GET**: The GET method is used to retrieve or fetch a representation of a resource identified by a specific URL. It is a safe and idempotent operation, meaning it should not have any side effects on the server and can be repeated multiple times without changing the server's state.

2. **POST**: The POST method is used to submit data to be processed by the server. It is commonly used to create new resources or trigger actions that result in a state change on the server. Each POST request typically results in a new resource being created on the server.

3. **PUT**: The PUT method is used to update or replace an existing resource with a new representation. It requires sending the complete representation of the resource to the server, including any fields that are not being updated. If the resource doesn't exist, the server may create a new resource.

4. **PATCH**: The PATCH method is used to partially update an existing resource. Unlike PUT, which requires sending the complete representation of the resource, PATCH allows sending only the changes or differences that need to be applied. The server applies the changes to the resource without affecting other fields.

5. **DELETE**: The DELETE method is used to remove or delete a specified resource. After successful deletion, the server may respond with a 204 No Content status code or a 200 OK status code with a response body providing details about the deleted resource.
6. **HEAD**: The HEAD method is similar to the GET method, but it only retrieves the headers of a resource without fetching the actual representation. It is useful for obtaining metadata about a resource, such as its size or modification date, without transferring the entire content. 
7. **OPTIONS**: The OPTIONS method is used to retrieve the supported methods, headers, and other capabilities of a resource. It is helpful for determining the available actions that can be performed on a particular resource. 
8. **TRACE**: The TRACE method is primarily used for diagnostic purposes. When a server receives a TRACE request, it echoes back the received request to the client, allowing the client to see what changes, if any, were made by intermediate servers during request transmission.

## What are the HTTP status codes
100, 200, 300, 400 and 500.
## What are the Microservices architecture and the key components of a microservices architecture?
- applications are broken down into smaller, independent services that can be developed, deployed, and maintained separately. 
- Service Registry, API Gateway, Configuration Server, Load Balancer, and Monitoring and Logging.
## Can you describe how to handle distributed transactions across multiple microservices?
- It's important to use a technique called the Saga pattern.
- The Saga pattern is a design pattern for handling long-lived transactions across multiple microservices
## What's SOAP? and how to implement?
SOAP (Simple Object Access Protocol) is a messaging protocol used in web services to facilitate communication between different systems over a network. It is a protocol based on XML (eXtensible Markup Language) and typically relies on other protocols such as HTTP (Hypertext Transfer Protocol) for message transport.

SOAP defines a standard format for structuring messages, allowing different systems to understand and interact with each other. It enables the exchange of information between applications, regardless of the programming languages or platforms they are built on.

To implement SOAP, you generally need to follow these steps:

1. **Define the Web Service**: Determine the functionality and operations that your web service will provide. This involves deciding on the methods or functions that clients can invoke and the data that will be exchanged.

2. **Define the SOAP Message Structure**: SOAP messages are XML-based and consist of an envelope, a header, and a body. The envelope contains the root element and defines the XML namespaces used. The header may include optional information, such as authentication details or additional processing instructions. The body contains the actual data or the method invocation details.

3. **Design the WSDL**: WSDL (Web Services Description Language) is an XML-based language used to describe the web service and its operations. It specifies the methods, input/output parameters, and the location (URL) where the web service can be accessed. The WSDL document acts as a contract between the service provider and the service consumer.

4. **Implement the Web Service**: Develop the actual web service implementation, which involves writing the code that handles the requested operations and generates the appropriate SOAP responses. The implementation can be done using different programming languages, such as Java, C#, or PHP, depending on your preferred technology stack.

5. **Deploy the Web Service**: Host the web service on a server or hosting environment that supports SOAP-based communication. This typically involves deploying the web service application on a web server or an application server that supports the programming language and frameworks used for implementation.

6. **Generate Client Code**: Once the web service is deployed, clients can consume it by generating client code based on the WSDL document. Various development tools and frameworks provide utilities to generate client code, which makes it easier for client applications to interact with the web service.

7. **Interact with the Web Service**: Clients can use the generated client code to invoke the web service methods and send SOAP requests over a network. The requests are formed as SOAP messages, serialized into XML, and sent to the web service endpoint using protocols like HTTP.

8. **Handle SOAP Responses**: The web service processes the SOAP requests, executes the requested operations, and generates SOAP responses. The responses are sent back to the client, who can then extract the required data or handle any errors or exceptions that might occur during the process.

SOAP provides a standardized way to implement and consume web services, enabling interoperability between different systems. However, it is worth noting that in recent years, more lightweight and simpler alternatives, such as REST (Representational State Transfer), have gained popularity due to their ease of use and better compatibility with modern web development practices.