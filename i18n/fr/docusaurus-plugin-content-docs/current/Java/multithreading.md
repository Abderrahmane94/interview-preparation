---
sidebar_position: 8
---
import TOCInline from '@theme/TOCInline';

# Java Multithreading
# <TOCInline toc={toc} />

## Qu'est-ce qu'un Thread en Java ?
Un thread est la plus petite unité d'exécution au sein d'un processus. Java supporte nativement le multithreading, permettant à plusieurs threads de s'exécuter simultanément dans un même programme, partageant le même tas (heap) tout en ayant chacun sa propre pile (stack).

## Comment créer un Thread en Java ?
Trois approches principales :

**1. Étendre `Thread` :**
```java
class MonThread extends Thread {
    public void run() { System.out.println("En cours : " + getName()); }
}
new MonThread().start();
```

**2. Implémenter `Runnable` :**
```java
Thread t = new Thread(() -> System.out.println("En cours"));
t.start();
```

**3. Utiliser `ExecutorService` (recommandé en production) :**
```java
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> System.out.println("Tâche en cours"));
executor.shutdown();
```

Préférer `Runnable`/`Callable` + `ExecutorService` à l'extension de `Thread` — cela découple la tâche du mécanisme d'exécution.

## Quelle est la différence entre Thread et Runnable ?

- **`Thread`** est une classe. L'étendre empêche d'étendre toute autre classe.
- **`Runnable`** est une interface fonctionnelle avec une seule méthode `run()`. L'implémenter laisse la classe libre d'étendre d'autres classes et favorise la composition.

```java
// Runnable — préféré
Runnable tache = () -> System.out.println("Bonjour depuis Runnable");
new Thread(tache).start();
```

## Quels sont les différents états d'un Thread ?

Un thread passe par ces états (définis dans `Thread.State`) :

1. **NEW** — créé mais pas encore démarré.
2. **RUNNABLE** — en cours d'exécution ou prêt à s'exécuter (en attente du CPU).
3. **BLOCKED** — en attente d'acquisition d'un verrou moniteur.
4. **WAITING** — en attente indéfinie (`wait()`, `join()`, `park()`).
5. **TIMED_WAITING** — en attente d'une durée déterminée (`sleep()`, `wait(timeout)`).
6. **TERMINATED** — exécution terminée.

## Quel est le rôle du mot-clé `synchronized` ?
`synchronized` garantit qu'un seul thread à la fois peut exécuter un bloc ou une méthode, évitant ainsi les conditions de course sur les données partagées.

```java
class Compteur {
    private int valeur = 0;

    public synchronized void incrementer() { valeur++; } // verrou au niveau méthode
    public int getValeur() { return valeur; }
}

// Bloc synchronisé (granularité plus fine)
public void incrementer() {
    synchronized(this) { valeur++; }
}
```

`synchronized` utilise le **verrou intrinsèque (moniteur)** de l'objet. Chaque objet Java en possède un.

## Quel est le rôle du mot-clé `volatile` ?
`volatile` garantit que les lectures et écritures d'une variable sont toujours effectuées depuis/vers la **mémoire principale** (et non depuis un cache CPU), rendant les modifications immédiatement visibles à tous les threads. Il ne garantit **pas** l'atomicité pour les opérations composées comme `i++`.

```java
class DrapeauPartagé {
    private volatile boolean actif = true;
    void arreter() { actif = false; }
    void executer() { while (actif) { /* travail */ } }
}
```

Utiliser `volatile` pour les drapeaux simples. Pour les compteurs, préférer `AtomicInteger`.

## Qu'est-ce qu'un deadlock et comment le prévenir ?
Un **deadlock** survient quand deux threads ou plus attendent chacun un verrou détenu par l'autre, les bloquant tous indéfiniment.

```java
// Scénario de deadlock
synchronized(verouA) {
    synchronized(verouB) { /* Thread 1 détient A, attend B */ }
}
synchronized(verouB) {
    synchronized(verouA) { /* Thread 2 détient B, attend A */ }
}
```

**Stratégies de prévention :**
- Toujours acquérir les verrous dans le **même ordre** dans tous les threads.
- Utiliser **`tryLock()`** avec un délai (`ReentrantLock`).
- Minimiser la portée des blocs synchronisés.
- Utiliser les utilitaires de haut niveau (`java.util.concurrent`).

## Quelle est la différence entre `wait()`, `notify()` et `notifyAll()` ?
Ces méthodes appartiennent à `Object` et servent à la communication entre threads. Elles doivent être appelées dans un bloc `synchronized`.

- `wait()` — libère le verrou et met le thread en état WAITING.
- `notify()` — réveille un thread en attente arbitraire.
- `notifyAll()` — réveille tous les threads en attente ; ils se disputent le verrou.

```java
synchronized(verrou) {
    while (!condition) verrou.wait(); // toujours utiliser while, pas if
    // continuer
}

synchronized(verrou) {
    condition = true;
    verrou.notifyAll();
}
```

## Qu'est-ce que l'Executor Framework ?
Le framework `java.util.concurrent` découple la soumission de tâches de leur exécution, en gérant efficacement des pools de threads.

```java
// Pool fixe
ExecutorService pool = Executors.newFixedThreadPool(4);

// Soumettre un Callable (retourne un résultat)
Future<Integer> future = pool.submit(() -> 42);
System.out.println(future.get()); // 42

pool.shutdown();
pool.awaitTermination(10, TimeUnit.SECONDS);
```

Implémentations principales :
- `newFixedThreadPool(n)` — nombre fixe de threads.
- `newCachedThreadPool()` — grandit selon les besoins, réutilise les threads inactifs.
- `newSingleThreadExecutor()` — un seul thread de travail.
- `newScheduledThreadPool(n)` — tâches planifiées/périodiques.

## Que se passe-t-il si l'on appelle `run()` directement au lieu de `start()` ?
Si vous appelez `run()` directement, **aucun nouveau thread n'est créé**. Le code s'exécute sur le **thread courant** (thread principal), se comportant comme un appel de méthode normal. Seul `start()` crée un nouveau thread et invoque `run()` dessus.

```java
class Tache extends Thread {
    public void run() { System.out.println("Thread : " + Thread.currentThread().getName()); }
}

Tache t = new Tache();
t.run();    // affiche : Thread : main   (pas de nouveau thread !)
t.start();  // affiche : Thread : Thread-0 (nouveau thread !)
```

De plus : **un thread ne peut être démarré qu'une seule fois**. Appeler `start()` à nouveau sur un thread terminé lève `IllegalThreadStateException`.

## Pourquoi `wait()`, `notify()` et `notifyAll()` sont-ils définis dans `Object` et non dans `Thread` ?
Parce que le **verrou est détenu sur un objet, pas sur un thread**. Tout objet peut servir de moniteur — les threads se coordonnent en appelant ces méthodes sur la ressource partagée qu'ils synchronisent.

Si ces méthodes étaient dans `Thread`, le thread T1 devrait connaître le thread T2 pour appeler `T2.notify()`. Au lieu de cela, T1 appelle simplement `notify()` sur l'objet partagé, et le thread qui attendait sur cet objet est réveillé — les threads n'ont pas besoin de se connaître mutuellement.

```java
// L'objet partagé (ressource) est le coordinateur
synchronized(filePartagee) {
    while (filePartagee.isEmpty()) filePartagee.wait();   // libère le verrou, attend
    traiter(filePartagee.poll());
    filePartagee.notifyAll();                              // réveille les threads en attente
}
```

## Quelle est la différence entre `wait()` et `sleep()` ?

| | `wait()` | `sleep()` |
|---|---|---|
| Défini dans | `Object` | `Thread` (statique) |
| Libère le verrou | ✅ Oui | ❌ Non |
| Doit être synchronisé | ✅ Oui | ❌ Non |
| Réveillé par | `notify()` / `notifyAll()` | Expiration du timer ou interruption |
| Objectif | Communication inter-threads | Introduire une pause |

```java
// wait() — libère le verrou pour que d'autres threads accèdent à l'objet
synchronized(verrou) { verrou.wait(5000); }

// sleep() — conserve le verrou, suspend simplement l'exécution
Thread.sleep(5000);
```

## Quelle est la différence entre `Runnable` et `Callable` ?

| | `Runnable` | `Callable<V>` |
|---|---|---|
| Valeur de retour | `void` | `V` |
| Exceptions vérifiées | Ne peut pas en lancer | Peut en lancer |
| Utilisé avec | `Thread`, `ExecutorService` | `ExecutorService` |

```java
Callable<String> tache = () -> "résultat";
Future<String> future = executor.submit(tache);
String resultat = future.get(); // bloque jusqu'à la fin
```

## Que sont les classes atomiques en Java ?
Les classes du package `java.util.concurrent.atomic` fournissent des opérations thread-safe sans verrou, utilisant des instructions CAS (Compare-And-Swap) au niveau CPU.

```java
AtomicInteger compteur = new AtomicInteger(0);
compteur.incrementAndGet();         // thread-safe, sans synchronized
compteur.compareAndSet(1, 2);       // atomiquement : si valeur == 1, mettre à 2
```

Types courants : `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, `AtomicReference`.

## Qu'est-ce que `ReentrantLock` et en quoi diffère-t-il de `synchronized` ?

`ReentrantLock` (de `java.util.concurrent.locks`) offre plus de contrôle que `synchronized` :

```java
ReentrantLock verrou = new ReentrantLock();

verrou.lock();
try {
    // section critique
} finally {
    verrou.unlock(); // toujours libérer dans finally
}
```

Avantages par rapport à `synchronized` :
- **`tryLock()`** — tenter d'acquérir sans bloquer.
- **`lockInterruptibly()`** — peut être interrompu en attente.
- **Équité** — `new ReentrantLock(true)` donne le verrou au thread qui attend depuis le plus longtemps.
- **Conditions multiples** — `lock.newCondition()` pour un wait/notify précis.

## Quelle est la différence entre `CountDownLatch` et `CyclicBarrier` ?

- **`CountDownLatch`** : compte à rebours unique. Les threads attendent que le compteur atteigne zéro.
- **`CyclicBarrier`** : barrière réutilisable. Les threads s'attendent mutuellement à un point commun.

```java
// CountDownLatch — le thread principal attend N tâches
CountDownLatch latch = new CountDownLatch(3);
executor.submit(() -> { effectuerTravail(); latch.countDown(); });
latch.await(); // bloque jusqu'à count == 0

// CyclicBarrier — les threads se synchronisent à un point de contrôle
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("Tous arrivés !"));
executor.submit(() -> { phase1(); barrier.await(); phase2(); });
```

## Qu'est-ce que `ThreadLocal` ?
`ThreadLocal` fournit à chaque thread sa propre copie isolée d'une variable — aucune synchronisation nécessaire.

```java
ThreadLocal<SimpleDateFormat> dateFormat =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

// Chaque thread obtient sa propre instance de SimpleDateFormat
String formaté = dateFormat.get().format(new Date());
```

Toujours appeler `threadLocal.remove()` après utilisation (surtout dans les pools de threads) pour éviter les fuites mémoire.

## Que sont les collections concurrentes ?
Des collections thread-safe du package `java.util.concurrent`, à préférer à la synchronisation manuelle :

- `ConcurrentHashMap` — Map thread-safe avec verrouillage au niveau nœud (Java 8+ : CAS).
- `CopyOnWriteArrayList` — liste thread-safe ; les écritures copient le tableau. Idéale pour les lectures fréquentes.
- `BlockingQueue` (`ArrayBlockingQueue`, `LinkedBlockingQueue`) — file producteur-consommateur avec put/take bloquants.
- `ConcurrentLinkedQueue` — file non-bloquante sans verrou.

```java
BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);

// Producteur
queue.put("tâche"); // bloque si plein

// Consommateur
String tache = queue.take(); // bloque si vide
```
