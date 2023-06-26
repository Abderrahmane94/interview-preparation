---
sidebar_position: 1
---

# Basics 

## What is Angular? 
Angular is a TypeScript-based open-source web application framework developed by Google. It is used for building scalable and dynamic single-page applications (SPAs).
## How does it differ from AngularJS?	
AngularJS, also known as Angular 1, is the earlier version of Angular and is based on JavaScript.
- **Architecture**: AngularJS is based on the Model-View-Controller (MVC) architecture, while Angular uses a component-based architecture. 
- **Language**: AngularJS is written in JavaScript, while Angular is written in TypeScript, 
- **Performance**: Angular is generally considered to be faster and more performant than AngularJS, due in part to its use of ahead-of-time
(AOT) compilation.
## Explain the Angular component lifecycle hooks	
Angular component lifecycle hooks are methods that get called at specific points in the life cycle of a component. The hooks include ngOnInit, ngOnChanges, ngDoCheck, ngOnDestroy, and more. They allow developers to perform actions at different stages, such as initialization, change detection, and destruction of a component.
## What is a module in Angular? How does it relate to an Angular application?
In Angular, a module is a mechanism for organizing and packaging related components, directives, services, and other features. It acts as a container for components and provides a context for their execution. An Angular application consists of one or more modules, with the root module being the starting point of the application.
## What is data binding in Angular?
Data binding in Angular allows for automatic synchronization of data between the component and the template. There are four types of data binding in Angular: 
- Interpolation ({{ }})
- Property binding ([ ])
- Event binding ( ( ) )
- Two-way binding ([()])
## What are directives in Angular? Differentiate between structural and attribute directives.	
Directives in Angular are markers on DOM elements that modify their behavior or appearance. 
**Structural directives**, such as **ngIf** and **ngFor**, change the structure of the DOM, 
while **attribute directives**, like **ngStyle** and **ngClass**, modify the behavior or appearance of DOM elements.
## Explain the difference between ngOnInit() and constructor() in Angular components.	
The constructor() method is called when a component is instantiated, and it is used to initialize the component's properties. ngOnInit() is a lifecycle hook that is called after the component's constructor and is used for any initialization tasks that depend on input properties.
## What is Angular CLI? How does it help in Angular development?	
Angular CLI (Command Line Interface) is a command-line tool that helps in creating, building, testing, and deploying Angular applications. It provides a set of commands and pre-configured project templates to streamline the development process.
## What are Angular templates? 
Angular templates are HTML-based views that are used to define the structure and layout of components. 
## How do you define a template in Angular?
Templates contain HTML code along with Angular-specific syntax and bindings to display dynamic data and respond to user interactions.
## Explain the concept of dependency injection in Angular. Why is it important?	
Dependency injection (DI) is a design pattern used in Angular to create and manage dependencies between different parts of an application. It allows for loose coupling and easier testing by providing dependencies to a class rather than requiring the class to create or find dependencies itself.
## How do you handle form validation in Angular? Explain the FormBuilder and Validators.	
Form validation in Angular is handled using the Angular Forms module. The FormBuilder class provides a convenient way to define and manage forms, while Validators offer a set of pre-defined validation functions to check form inputs against certain rules, such as required fields, minimum/maximum lengths, and custom validation logic.
## What is Angular routing? 
Angular routing is used to navigate between different views or components in an Angular application. 
## How do you define routes in an Angular application?
Routes are defined using the RouterModule and can be configured with path mappings, route parameters, and guards to control access.
## What are Angular services?
Angular services are reusable components that provide shared functionality and data across multiple components.
## How do you create and inject a service in Angular?	 
Services are typically used to encapsulate business logic, handle API calls, and manage application state. They can be injected into components using dependency injection.
## Explain the concept of lazy loading in Angular. 
Lazy loading is a technique in Angular where modules are loaded on-demand only when they are needed.
## How does it improve application performance?	 
It improves application performance by reducing the initial loading time and splitting the application into smaller chunks that are loaded asynchronously.
## How do you communicate between components in Angular? Explain the different ways.	
Communication between components in Angular can be achieved through various mechanisms such as Input and Output properties, EventEmitter, and services. Input properties allow data to be passed from a parent component to a child component, while Output properties and EventEmitter enable child components to emit events that can be handled by parent components. Services act as a centralized communication channel between components.
## Angular Components?
Components are the **building blocks** of Angular applications. They consist of a **template**, which defines the component's UI, and a **class**, which defines the component's **behavior**.
## Angular Pipe?
Pipes are a way to **transform** data in Angular templates. They take an **input** value and return a **transformed output** value.
## Communication between components
Communication between components in Angular can be achieved using **input** and **output** properties, as well as by using a shared service to manage data and functionality.
## What is RxJS? and some of the most commonly used operators?
RxJS is a library of reactive programming utilities for JavaScript. Some of the most commonly used operators include map, filter, merge, and switchMap.
## Use Angular's HttpClient module to make HTTP requests to a backend API.
Angular's HttpClient module is used to make HTTP requests to a backend API. It provides a convenient way to handle HTTP requests and responses in Angular applications.
## What is Eager and Lazy loading?
Eager loading is the default behavior in Angular, where all modules are loaded when the application starts. Lazy loading is a technique where modules are only loaded when they are needed.
## How do you optimize performance in Angular applications?
- Reducing the number of HTTP requests,
- Optimizing the size of JavaScript and CSS files,
- Using lazy loading,
- Optimizing change detection.
- Other techniques include using AOT compilation and minimizing the use of expensive operations such as regular expressions.

## What's Rxjs?
RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables, which is a powerful paradigm for handling asynchronous and event-based programming in JavaScript. RxJS is a key part of the Angular framework and provides a wide range of operators and utilities for managing and transforming asynchronous data streams.

Here are some key concepts and features of RxJS:

1. **Observables**: Observables represent a sequence of values over time. They can emit values, complete, or throw errors. Observables can be created from various sources such as events, timers, AJAX requests, or even from existing data structures.

2. **Operators**: RxJS provides a rich set of operators that allow you to transform, filter, combine, and manipulate data emitted by observables. Operators enable powerful operations such as mapping, filtering, reducing, merging, combining, and throttling data streams.

3. **Subscription**: Subscriptions are used to initiate and control the execution of observables. By subscribing to an observable, you can receive and handle the emitted values, errors, and completion notifications. Subscriptions can be managed to control the lifecycle of the subscription and avoid memory leaks.

4. **Subjects**: Subjects are a type of observable that can be used to multicast values to multiple subscribers. They act as both an observer and an observable, allowing you to manually push values into the subject and distribute them to subscribers.

5. **Schedulers**: Schedulers are used to control the execution and timing of observable operations. They provide control over concurrency, allowing you to define how observables should be scheduled for execution, such as running them immediately, on a specific interval, or asynchronously.

6. **Error Handling**: RxJS provides various operators and techniques for handling errors in observables. You can catch and handle errors using operators like `catchError` or `retry`, and you can also propagate errors to subscribers for custom error handling.

7. **Backpressure and Flow Control**: RxJS offers mechanisms for dealing with backpressure and controlling the flow of data when dealing with fast producers and slow consumers. Operators like `throttle`, `debounce`, and `buffer` help in managing the flow of data emitted by observables.

RxJS is widely used for handling asynchronous operations in Angular applications, such as making HTTP requests, handling user input, managing real-time data streams, and coordinating multiple asynchronous operations. Its functional and reactive programming approach provides a declarative and composable way to handle complex asynchronous scenarios with ease.

## Some RxJS operators
1. `map`: Transforms each value emitted by an observable by applying a mapping function to it.

   Example:
   ```typescript
   import { from } from 'rxjs';
   import { map } from 'rxjs/operators';

   const source = from([1, 2, 3, 4, 5]);
   const mapped = source.pipe(map(x => x * 2));
   mapped.subscribe(result => console.log(result)); // Output: 2, 4, 6, 8, 10
   ```

2. `filter`: Filters the values emitted by an observable based on a condition.

   Example:
   ```typescript
   import { from } from 'rxjs';
   import { filter } from 'rxjs/operators';

   const source = from([1, 2, 3, 4, 5]);
   const filtered = source.pipe(filter(x => x % 2 === 0));
   filtered.subscribe(result => console.log(result)); // Output: 2, 4
   ```

3. `merge`: Combines multiple observables into a single observable that emits values from all the source observables concurrently.

   Example:
   ```typescript
   import { interval, merge } from 'rxjs';

   const source1 = interval(1000);
   const source2 = interval(2000);
   const merged = merge(source1, source2);
   merged.subscribe(result => console.log(result)); // Output: 0, 0, 1, 2, 1, 3, 4, 2, ...
   ```

4. `concat`: Concatenates multiple observables, emitting values in sequential order.

   Example:
   ```typescript
   import { of, concat } from 'rxjs';

   const source1 = of(1, 2, 3);
   const source2 = of(4, 5, 6);
   const concatenated = concat(source1, source2);
   concatenated.subscribe(result => console.log(result)); // Output: 1, 2, 3, 4, 5, 6
   ```

5. `take`: Takes a specified number of values emitted by an observable and then completes.

   Example:
   ```typescript
   import { interval } from 'rxjs';
   import { take } from 'rxjs/operators';

   const source = interval(1000);
   const taken = source.pipe(take(3));
   taken.subscribe(result => console.log(result)); // Output: 0, 1, 2
   ```

These are just a few examples of the operators available in RxJS. RxJS provides a wide range of operators for various purposes, including transformation, filtering, combining, error handling, timing, and more. You can explore the RxJS documentation for a comprehensive list of operators and their functionalities.










