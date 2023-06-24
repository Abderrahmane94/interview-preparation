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