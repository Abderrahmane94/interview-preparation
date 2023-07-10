---
sidebar_position: 4
---
import TOCInline from '@theme/TOCInline';

# Java Collections
# <TOCInline toc={toc} />

## What is the difference between a stack and a queue?
### Stack
- A **stack** is a Last-In-First-Out (**LIFO**) data structure.
- Elements are added and removed from the **top** of the stack, which is known as the stack's "head."
- The key operations on a stack are:
  **Push**: Adds an element to the top of the stack.
  **Pop**: Removes the top element from the stack.
  **Peek**: Retrieves the top element from the stack without removing it.

### Queue
- A **queue** is a First-In-First-Out (**FIFO**) data structure.
- Elements are added to the back of the queue and removed from the front, forming a line or queue of elements.
- The key operations on a queue are:
  **Enqueue**: Adds an element to the back of the queue.
  **Dequeue**: Removes and retrieves the element from the front of the queue.
  **Peek**: Retrieves the element from the front of the queue without removing it.
## What is the difference between a List and a Set in Java?
A **List** is an ordered collection of elements that allows duplicates, whereas a **Set** is an unordered collection of unique elements.
## What is the difference between an ArrayList and a LinkedList in Java?
An **ArrayList** is implemented as a dynamic array, whereas a **LinkedList** is implemented as a doubly-linked list. This means that an ArrayList has better performance for random access and resizing, whereas a LinkedList has better performance for inserting and deleting elements.
## Collections
### List Interface
The java.util.List interface extends the Collection interface and represents an ordered collection of elements. 
List implementations **allow duplicate elements** and provide methods for accessing elements by their index. 
Common list implementations include **ArrayList**, **LinkedList**, and **Vector**.

### Set Interface
The java.util.Set interface extends the Collection interface and represents an unordered collection of unique elements. 
Set implementations **do not allow duplicate elements** and provide methods for efficient membership testing. 
Common set implementations include **HashSet**, **LinkedHashSet**, and **TreeSet**.

### Map Interface
The java.util.Map interface represents a mapping between keys and values. 
It does not extend the Collection interface but is an important part of the Java Collections Framework. Map implementations store key-value pairs, allowing efficient retrieval of values based on keys. 
Common map implementations include **HashMap**, **LinkedHashMap**, and **TreeMap**.

### Iterators
The Java Collections Framework provides iterators that allow iterating over elements in a collection. The Iterator interface provides methods like hasNext and next for iterating through a collection sequentially. Enhanced for-each loops can also be used to iterate over collections.