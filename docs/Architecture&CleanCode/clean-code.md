


# Clean Code

## How to deal with legacy code?
- Understand the Codebase.
- Test the Code. 
- Document and Comment. 
- Refactor in Small Steps.
- Apply Design Patterns and Principles.
- Collaborate With Other Developers.
## SOLID Principals
1. Single Responsibility 
2. Open/Closed 
3. Liskov Substitution 
4. Interface Segregation 
5. Dependency Inversion

1. **Single Responsibility**: a class should only have one responsibility. Furthermore, it should only have one reason to change.
2. **Open for Extension, Closed for Modification**: classes should be open for extension but closed for modification. In doing so, we stop ourselves from modifying existing code and causing potential new bugs in an otherwise happy application. 
3. **Liskov Substitution**: if class A is a subtype of class B, we should be able to replace B with A without disrupting the behavior of our program.
4. **Interface Segregation**: larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them.
5. **Dependency Inversion**: The principle of dependency inversion refers to the decoupling of software modules. This way, instead of high-level modules depending on low-level modules, both will depend on abstractions.

## What is the difference between Inheritance, composition, Association & Aggregation ?
- **Inheritance** is a mechanism in which a subclass inherits the properties and behaviors of its superclass. 
- **Composition** is a relationship where one class contains an instance of another class as a member variable.
- **Association** represents a relationship between two or more classes where objects of one class are related to objects of another class.
- **Aggregation** is a specialized form of association that represents a whole-part relationship. It is a stronger form of association where the associated objects have a relationship where one object (the whole) owns or contains the other objects (the parts).

