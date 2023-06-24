---
sidebar_position: 1
---

# Basics

## What is Java?
Java is a high-level, object-oriented programming language that is designed to be portable and platform-independent.

## What are the features of Java?
Java is known for its robustness, security, platform independence, object-oriented nature, multithreading, and scalability.

## What is the difference between JDK, JRE, and JVM?
JDK (Java Development Kit) is a software development kit that provides tools for developing Java applications, JRE (Java Runtime Environment) is an environment for running Java applications, and JVM (Java Virtual Machine) is an abstract machine that provides a runtime environment for executing Java bytecode.

## What is the difference between an abstract class and an interface?
An abstract class can have both abstract and non-abstract methods, whereas an interface can only have abstract methods. Additionally, a class can only extend one abstract class, but it can implement multiple interfaces.

## What is the purpose of the 'static' keyword in Java?
The 'static' keyword in Java is used to declare a method or variable as belonging to the class, rather than to any instance of the class.

## What is the purpose of the 'final' keyword in Java?
The 'final' keyword in Java is used to indicate that a variable or method cannot be modified once it has been defined.

## What is polymorphism in Java?
Polymorphism in Java refers to the ability of an object to take on multiple forms. This can be achieved through method overloading or method overriding.

## What is exception handling in Java?
Exception handling in Java refers to the process of detecting and responding to exceptional circumstances that occur during program execution. This is typically achieved using try-catch blocks.

## What is the difference between '== and '.equals()' in Java?
'==' is used to compare the reference values of two objects, whereas '.equals()' is used to compare the content or values of two objects.

## What is a thread in Java?	
A thread in Java refers to a separate path of execution within a program. Multiple threads can run concurrently within a single program.
## What is a constructor in Java?	
A constructor in Java is a special method that is used to initialize objects of a class. It has the same name as the class and does not have a return type.
## What is the difference between an instance variable and a static variable?	
An instance variable is a variable that is associated with a specific instance of a class, whereas a static variable is associated with the class itself.
## What is the difference between method overloading and method overriding in Java?	
Method overloading refers to the process of defining multiple methods with the same name but different parameters, whereas method overriding refers to the process of defining a method in a subclass that has the same signature as a method in the superclass.
## What is a package in Java?	
A package in Java is a collection of related classes and interfaces. It is used to organize classes and prevent naming conflicts.
## What is inheritance in Java?	
Inheritance in Java refers to the ability of a class to inherit properties and methods from a parent class. It is used to promote code reuse and maintainability.
## What is the purpose of the 'this' keyword in Java?	
The 'this' keyword in Java is used to refer to the current object within a method or constructor. It is typically used to disambiguate between instance variables and local variables that have the same name.
## What is the purpose of the 'super' keyword in Java?	
The 'super' keyword in Java is used to call a method or constructor in the superclass of the current class. It is typically used to override methods or to call the constructor of the superclass from the constructor of a subclass.
## What is the difference between an ArrayList and a LinkedList in Java?	
An ArrayList is implemented as a dynamic array, whereas a LinkedList is implemented as a doubly-linked list. This means that an ArrayList has better performance for random access and resizing, whereas a LinkedList has better performance for inserting and deleting elements.
## What is a lambda expression in Java?	
A lambda expression in Java is a way to create an anonymous function that can be passed around as a variable or parameter. It is typically used to simplify code that requires a functional interface.
## What is the difference between a checked exception and an unchecked exception in Java?	
A checked exception is a type of exception that must be declared in a method's signature or handled using a try-catch block( handle at compile time), whereas an unchecked exception is a type of exception that does not need to be declared or handled( handle at runtime).
## What is the purpose of the 'transient' keyword in Java?	
The 'transient' keyword in Java is used to indicate that a variable should not be serialized when an object is written to a file or transferred over a network.
## What is the difference between a HashSet and a TreeSet in Java?	
A HashSet is implemented using a hash table, whereas a TreeSet is implemented using a red-black tree. This means that a HashSet has faster performance for adding and removing elements, whereas a TreeSet has faster performance for retrieving elements in order.
## What is a JavaBean?	
A JavaBean is a reusable software component that conforms to a set of conventions for naming, behavior, and property access.
## What is the purpose of the 'volatile' keyword in Java?	
The 'volatile' keyword in Java is used to indicate that a variable's value may be modified by multiple threads. It ensures that changes to the variable are immediately visible to all threads.
## What is the difference between a StringBuilder and a StringBuffer in Java?	
A StringBuilder is a mutable sequence of characters that is not synchronized, whereas a StringBuffer is a mutable sequence of characters that is synchronized.
## How do we create Thread in Java?	
Extends Thread Class / Implement Runnable Interface
## What is the purpose of the 'default' keyword in a Java switch statement?	
The 'default' keyword in a Java switch statement is used to specify the default case that is executed when none of the other cases match.
## What is the difference between a List and a Set in Java?	
A List is an ordered collection of elements that allows duplicates, whereas a Set is an unordered collection of unique elements.
## What is the purpose of the 'finalize' method in Java?	
The 'finalize' method in Java is called by the garbage collector when an object is about to be destroyed. It can be used to perform final cleanup tasks or release resources.
## What is the purpose of the 'assert' keyword in Java?	
The 'assert' keyword in Java is used to test assumptions about the state of a program. It can be used to check that certain conditions are met and to catch errors early in the development process.
## What is the difference between a Thread and a Runnable in Java?	
A Thread is a class that represents a single thread of execution, whereas a Runnable is an interface that defines a single method called 'run'. A Thread can be created by extending the Thread class or by implementing the Runnable interface.
## What is the purpose of the 'instanceof' operator in Java?	
The 'instanceof' operator in Java is used to check whether an object is an instance of a particular class or interface. It can be used to perform type checking and to avoid class cast exceptions.
## What are the four basic principles of OOP in Java?	
Abstraction, Encapsulation, Polymorphism, and Inheritance
## What is the purpose of the 'break' keyword in a Java loop?	
The 'break' keyword in a Java loop is used to exit the loop immediately. It can be used to terminate the loop early if a certain condition is met.
