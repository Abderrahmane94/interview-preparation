---
sidebar_position: 6
---

# Spring Test


## Given-When-Then pattern	
pattern for writing test cases . It provides a clear and structured format to define the context, actions, and expected outcomes of a test.
## Arrange-Act-Assert (AAA) pattern	
Arrange-Act-Assert pattern, structure for organizing unit tests.
## what is an integration test?	
level of software testing that focuses on verifying the interactions and communication between different components, modules, or systems within an application.
## What is Unit test and TDD?	
A unit test is a type of testing where individual units, such as functions, methods, or classes, are tested in isolation to verify their behavior
## What is JUnit and how does it work?
JUnit is a Java testing framework that allows developers to write and run automated tests. To write a JUnit test case, you extend the JUnit **TestCase** class and define one or more **test methods**
## What are some commonly used assertions in JUnit?
Common JUnit assertions include **assertTrue()**, **assertFalse()**, **assertEquals()**, and **assertNull()**.
## What is Mockito and how does it differ from JUnit?
Mockito is a Java mocking framework that creates **mock** objects for testing. It's used with JUnit to isolate specific parts of code for testing
## Can you give an example of how you have used JUnit and Mockito together in a project?
JUnit and Mockito can be used together to write JUnit test cases that use mock objects created with Mockito to test the behavior of a class or method.
## How do you handle exceptions in JUnit test cases?
- try-catch
- With JUnit rule
- With annotation
## what's new in Junit 5

1. New Programming Models:
    - JUnit 5 introduces a new programming model with annotations, including `@Test`, `@BeforeEach`, `@AfterEach`, `@BeforeAll`, and `@AfterAll`. These annotations provide more flexibility and control over test execution.
    - Test methods no longer need to be `public void` methods; they can now have different access modifiers, return types, and accept parameters.

2. Extension Model:
    - JUnit 5 introduces a powerful extension model that allows developers to extend the behavior of test classes or methods.
    - Extensions enable customizing test execution, adding custom test lifecycle callbacks, parameter injection, dynamic test generation, and more.
    - Extensions can be implemented using the `Extension` API or predefined extensions provided by JUnit 5, such as `@ExtendWith`, `@BeforeEachCallback`, `@AfterEachCallback`, etc.

3. Dynamic Tests:
    - JUnit 5 introduces dynamic tests, which allow generating tests programmatically at runtime.
    - Dynamic tests provide more flexibility for generating and executing tests based on dynamic data sets or conditions.
    - Dynamic tests can be created using the `@TestFactory` annotation and returning a `Stream`, `Iterable`, `Iterator`, `Collection`, `Iterator<DynamicTest>`, or `Collection<DynamicTest>`.

4. Parameterized Tests:
    - JUnit 5 enhances parameterized testing by introducing the `@ParameterizedTest` annotation.
    - Parameterized tests allow running the same test logic with different sets of parameters.
    - Parameters can be provided using various sources, such as method arguments, CSV files, Enum values, custom providers, etc.

5. Conditional Test Execution:
    - JUnit 5 provides conditional test execution based on certain conditions using the `@EnabledOnXXX` and `@DisabledOnXXX` annotations.
    - Conditions can be based on the operating system, Java version, system properties, environment variables, custom conditions, etc.

6. Nested Tests:
    - JUnit 5 supports nested test classes, allowing developers to group related tests and improve test organization and readability.
    - Nested tests can have their own lifecycle and share setup/teardown methods.

7. Test Instance Lifecycle:
    - JUnit 5 introduces new lifecycle options for test instances: `PER_CLASS` and `PER_METHOD`.
    - The `PER_CLASS` mode creates a single test instance for a test class, and all test methods share the same instance.
    - The `PER_METHOD` mode creates a new test instance for each test method execution.

8. Additional Assertions:
    - JUnit 5 provides additional assertion methods for more expressive and readable assertions, such as `assertAll()`, `assertThrows()`, `assertTimeout()`, `assertTimeoutPreemptively()`, etc.


