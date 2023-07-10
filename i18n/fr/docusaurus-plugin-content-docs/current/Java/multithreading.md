---
sidebar_position: 8
---
import TOCInline from '@theme/TOCInline';

# Java Multithreading
# <TOCInline toc={toc} />

## What is a Thread in Java?
A thread in Java refers to a separate path of execution within a program. Multiple threads can run concurrently within a single program.
## How do we create Thread in Java?
- Extends **Thread Class**. 
- Implement **Runnable Interface**.
## What is the difference between a Thread and a Runnable in Java?
A **Thread** is a **class** that represents a **single thread of execution**, whereas a **Runnable** is an **interface** that defines a **single method called 'run'**.
## What is the purpose of the 'volatile' keyword in Java?
The '**volatile**' keyword in Java is used to indicate that a variable's value may be **modified** by **multiple** threads. It ensures that changes to the variable are immediately visible to all threads.
