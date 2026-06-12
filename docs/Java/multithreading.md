---
sidebar_position: 8
---
import TOCInline from '@theme/TOCInline';

# Java Multithreading
# <TOCInline toc={toc} />

## What is a Thread in Java?
A thread is the smallest unit of execution within a process. Java supports multithreading natively, allowing multiple threads to run concurrently within a single program, sharing the same heap memory while each having its own stack.

## How do you create a Thread in Java?
Three main approaches:

**1. Extend `Thread`:**
```java
class MyThread extends Thread {
    public void run() { System.out.println("Running: " + getName()); }
}
new MyThread().start();
```

**2. Implement `Runnable`:**
```java
Thread t = new Thread(() -> System.out.println("Running"));
t.start();
```

**3. Use `ExecutorService` (preferred for production):**
```java
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> System.out.println("Task running"));
executor.shutdown();
```

Prefer `Runnable`/`Callable` + `ExecutorService` over extending `Thread` — it decouples the task from the execution mechanism.

## What is the difference between a Thread and a Runnable?

- **`Thread`** is a class. Extending it means you cannot extend any other class.
- **`Runnable`** is a functional interface with a single `run()` method. Implementing it keeps your class free to extend others and promotes composition.

```java
// Runnable — preferred
Runnable task = () -> System.out.println("Hello from Runnable");
new Thread(task).start();
```

## What are the different states of a Thread?

A thread moves through these states (defined in `Thread.State`):

1. **NEW** — created but not yet started.
2. **RUNNABLE** — executing or ready to execute (waiting for CPU).
3. **BLOCKED** — waiting to acquire a monitor lock.
4. **WAITING** — waiting indefinitely (`wait()`, `join()`, `park()`).
5. **TIMED_WAITING** — waiting for a specified time (`sleep()`, `wait(timeout)`).
6. **TERMINATED** — finished execution.

## What is the purpose of the `synchronized` keyword?
`synchronized` ensures that only one thread at a time can execute a block or method, preventing race conditions on shared data.

```java
class Counter {
    private int count = 0;

    public synchronized void increment() { count++; }   // method-level lock
    public int getCount() { return count; }
}

// Block-level (finer granularity)
public void increment() {
    synchronized(this) { count++; }
}
```

Synchronized uses the object's **intrinsic lock (monitor)**. Every Java object has one.

## What is the `volatile` keyword?
`volatile` guarantees that reads and writes to a variable are always done from/to **main memory** (not a CPU cache), making changes immediately visible across all threads. It does **not** guarantee atomicity for compound operations like `i++`.

```java
class SharedFlag {
    private volatile boolean running = true;
    void stop() { running = false; }
    void run() { while (running) { /* work */ } }
}
```

Use `volatile` for simple flags. For counters, prefer `AtomicInteger`.

## What is a deadlock and how do you prevent it?
A **deadlock** occurs when two or more threads are each waiting for a lock held by the other, causing all to block forever.

```java
// Deadlock scenario
synchronized(lockA) {
    synchronized(lockB) { /* Thread 1 holds A, waits for B */ }
}
synchronized(lockB) {
    synchronized(lockA) { /* Thread 2 holds B, waits for A */ }
}
```

**Prevention strategies:**
- Always acquire locks in the **same order** across all threads.
- Use **`tryLock()`** with a timeout (`ReentrantLock`).
- Minimize synchronized scope.
- Use higher-level concurrency utilities (`java.util.concurrent`).

## What is the difference between `wait()`, `notify()`, and `notifyAll()`?
These are methods on `Object`, used for thread communication. They must be called inside a `synchronized` block.

- `wait()` — releases the lock and puts the thread in WAITING state.
- `notify()` — wakes up one arbitrary waiting thread.
- `notifyAll()` — wakes up all waiting threads; they compete for the lock.

```java
synchronized(lock) {
    while (!condition) lock.wait();   // always use while, not if
    // proceed
}

synchronized(lock) {
    condition = true;
    lock.notifyAll();
}
```

## What is the Executor Framework?
The `java.util.concurrent` Executor Framework decouples task submission from execution, managing thread pools efficiently.

```java
// Fixed pool
ExecutorService pool = Executors.newFixedThreadPool(4);

// Submit a Callable (returns a result)
Future<Integer> future = pool.submit(() -> 42);
System.out.println(future.get()); // 42

pool.shutdown();
pool.awaitTermination(10, TimeUnit.SECONDS);
```

Key implementations:
- `newFixedThreadPool(n)` — fixed number of threads.
- `newCachedThreadPool()` — grows as needed, reuses idle threads.
- `newSingleThreadExecutor()` — single worker thread.
- `newScheduledThreadPool(n)` — supports scheduled/periodic tasks.

## What is the difference between `Runnable` and `Callable`?

| | `Runnable` | `Callable<V>` |
|---|---|---|
| Return value | `void` | `V` |
| Checked exceptions | Cannot throw | Can throw |
| Used with | `Thread`, `ExecutorService` | `ExecutorService` |

```java
Callable<String> task = () -> "result";
Future<String> future = executor.submit(task);
String result = future.get(); // blocks until done
```

## What are atomic classes in Java?
Classes in `java.util.concurrent.atomic` that provide lock-free, thread-safe operations using CPU-level compare-and-swap (CAS) instructions.

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();         // thread-safe, no synchronized needed
counter.compareAndSet(1, 2);       // atomically: if value == 1, set to 2
```

Common types: `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, `AtomicReference`.

## What is a `ReentrantLock` and how does it differ from `synchronized`?

`ReentrantLock` (from `java.util.concurrent.locks`) offers more control than `synchronized`:

```java
ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    // critical section
} finally {
    lock.unlock(); // always release in finally
}
```

Advantages over `synchronized`:
- **`tryLock()`** — attempt to acquire without blocking.
- **`lockInterruptibly()`** — can be interrupted while waiting.
- **Fairness** — `new ReentrantLock(true)` gives lock to the longest-waiting thread.
- **Multiple conditions** — `lock.newCondition()` for fine-grained wait/notify.

## What is `CountDownLatch` vs `CyclicBarrier`?

- **`CountDownLatch`**: one-time countdown. Threads wait until count reaches zero.
- **`CyclicBarrier`**: reusable barrier. Threads wait for each other to reach a common point.

```java
// CountDownLatch — main waits for N tasks to finish
CountDownLatch latch = new CountDownLatch(3);
executor.submit(() -> { doWork(); latch.countDown(); });
latch.await(); // blocks until count == 0

// CyclicBarrier — threads sync at a checkpoint
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("All reached!"));
executor.submit(() -> { doPhase1(); barrier.await(); doPhase2(); });
```

## What is `ThreadLocal`?
`ThreadLocal` provides each thread with its own isolated copy of a variable — no synchronization needed.

```java
ThreadLocal<SimpleDateFormat> dateFormat =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

// Each thread gets its own SimpleDateFormat instance
String formatted = dateFormat.get().format(new Date());
```

Always call `threadLocal.remove()` when done (especially in thread pool environments) to prevent memory leaks.

## What are concurrent collections?
Thread-safe collections from `java.util.concurrent`, preferred over manually synchronizing standard collections:

- `ConcurrentHashMap` — thread-safe map with segment-level locking (Java 8+: node-level CAS).
- `CopyOnWriteArrayList` — thread-safe list; writes copy the array. Best for read-heavy scenarios.
- `BlockingQueue` (`ArrayBlockingQueue`, `LinkedBlockingQueue`) — producer-consumer queue with blocking put/take.
- `ConcurrentLinkedQueue` — lock-free non-blocking queue.

```java
BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);

// Producer
queue.put("task"); // blocks if full

// Consumer
String task = queue.take(); // blocks if empty
```
