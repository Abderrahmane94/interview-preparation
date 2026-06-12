---
sidebar_position: 6
---
import TOCInline from '@theme/TOCInline';

# Avancé
# <TOCInline toc={toc} />

## Quelle est la différence entre Java SE et Jakarta EE ?

**Java SE (Standard Edition)** est la plateforme de base : fonctionnalités du langage, API principales (I/O, réseau, collections, concurrence) et JVM. Convient aux applications autonomes et desktop.

**Jakarta EE (anciennement Java EE)** s'appuie sur Java SE et ajoute des API entreprise pour les applications serveur à grande échelle :
- **Servlets / JSP** — couche web
- **JPA** — mapping objet-relationnel
- **EJB** — composants distribués et transactionnels
- **JMS** — messagerie asynchrone
- **CDI** — injection de dépendances

Spring Framework ne fait pas partie de Jakarta EE, mais fournit des fonctionnalités similaires de manière plus légère.

## Comment fonctionne le Garbage Collection en Java ?
La JVM récupère automatiquement la mémoire du tas pour les objets qui ne sont plus accessibles. Le tas est divisé en générations :

- **Jeune génération** (Eden + espaces Survivor) : les nouveaux objets sont alloués ici. Le Minor GC s'exécute fréquemment et rapidement.
- **Ancienne génération (Tenured)** : objets à longue durée de vie promus depuis la jeune génération. Le Major GC est plus lent.
- **Metaspace** (Java 8+) : stocke les métadonnées des classes (remplace PermGen).

**Algorithmes GC :**
- **Serial GC** — mono-thread ; pour les petites applis.
- **Parallel GC** — multi-thread ; axé sur le débit (défaut Java 8).
- **G1 GC** — basé sur des régions ; équilibre débit et latence (défaut Java 9+).
- **ZGC / Shenandoah** — faible latence, pauses sub-milliseconde (Java 11+).

```
-XX:+UseG1GC         // activer G1
-Xms512m -Xmx2g      // taille initiale et maximale du tas
-XX:+PrintGCDetails  // journaliser les événements GC
```

## Quelle est la différence entre `==` et `.equals()` pour les Strings ? Qu'est-ce que le pool de Strings ?

`==` compare les références. `.equals()` compare le contenu. Les littéraux String sont internés dans le **pool de constantes de Strings** (heap), ainsi deux littéraux avec le même contenu partagent la même référence.

```java
String a = "hello";
String b = "hello";
String c = new String("hello");

a == b;        // true  — même référence du pool
a == c;        // false — c est un nouvel objet sur le tas
a.equals(c);   // true  — même contenu

String d = c.intern(); // intern place c dans le pool
a == d;        // true
```

## Qu'est-ce que la réflexion en Java ?
La réflexion (dans `java.lang.reflect`) permet d'inspecter et de manipuler classes, méthodes et champs **à l'exécution**, même s'ils sont privés.

```java
Class<?> clazz = Class.forName("com.exemple.MaClasse");
Method methode = clazz.getDeclaredMethod("maMethodePrivee");
methode.setAccessible(true);
methode.invoke(clazz.getDeclaredConstructor().newInstance());
```

**Cas d'usage** : frameworks (Spring, Hibernate), bibliothèques de sérialisation, outils de test.  
**Inconvénients** : contourne les vérifications à la compilation, plus lent que les appels directs, brise l'encapsulation.

## Que sont les ClassLoaders ?
Les ClassLoaders chargent les fichiers `.class` dans la JVM. Ils suivent un **modèle de délégation parent** : avant de charger une classe, un classloader interroge d'abord son parent.

Trois chargeurs intégrés (Java 8) :
1. **Bootstrap ClassLoader** — charge les classes JDK principales (`java.lang.*`).
2. **Extension ClassLoader** — charge depuis `$JAVA_HOME/lib/ext`.
3. **Application ClassLoader** — charge depuis le classpath (votre application).

Les classloaders personnalisés permettent le rechargement à chaud, les systèmes de plugins (OSGi) et les espaces de noms de classes isolés.

## Qu'est-ce que la sérialisation en Java ?
La sérialisation convertit un objet en flux d'octets pour le stockage ou le transfert réseau. La désérialisation reconstruit l'objet.

```java
// Sérialiser
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("obj.ser"));
oos.writeObject(monObjet); // la classe de monObjet doit implémenter Serializable

// Désérialiser
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("obj.ser"));
MaClasse obj = (MaClasse) ois.readObject();
```

Points clés :
- La classe doit implémenter `java.io.Serializable`.
- Les champs `transient` ne sont **pas** sérialisés.
- `serialVersionUID` identifie les versions — toujours le définir explicitement.
- Alternatives : JSON (Jackson/Gson), Protocol Buffers, Kryo.

## Quelle est la différence entre `final`, `finally` et `finalize()` ?

- **`final`** : mot-clé — empêche la réassignation d'une variable, la redéfinition d'une méthode, ou l'extension d'une classe.
- **`finally`** : bloc — s'exécute toujours après un `try/catch`, utilisé pour le nettoyage.
- **`finalize()`** : méthode dépréciée appelée par le GC avant de collecter un objet — peu fiable et supprimée en Java 18.

```java
final int MAX = 100;             // constante

try {
    operationRisquee();
} catch (Exception e) {
    gerer(e);
} finally {
    nettoyage();                 // s'exécute toujours
}
```

Préférer `try-with-resources` à `finally` pour le nettoyage des entrées/sorties.

## Qu'est-ce que le Java Memory Model (JMM) ?
Le JMM définit comment les threads interagissent via la mémoire. Garanties clés :

- **Visibilité** : sans synchronisation, une écriture du thread A sur une variable peut ne pas être visible pour le thread B.
- **Happens-before** : relation qui garantit la visibilité mémoire. Exemples : sortie d'un `synchronized` arrive avant l'entrée, écriture `volatile` arrive avant une lecture, `Thread.start()` arrive avant toute action du thread démarré.
- **Atomicité** : seules les lectures/écritures de `int`, `byte`, `short`, `char`, `float`, `boolean` et les références sont atomiques. `long` et `double` peuvent ne pas l'être (utiliser `volatile` ou `AtomicLong`).

## Quelle est la différence entre `StringBuilder` et `StringBuffer` ?

| | `StringBuilder` | `StringBuffer` |
|---|---|---|
| Thread-safe | Non | Oui (synchronisé) |
| Performance | Plus rapide | Plus lent |
| Cas d'usage | Mono-thread | Multi-thread (rare) |

Les deux sont mutables. `String` lui-même est **immuable** — toute "modification" crée un nouvel objet. Utiliser `StringBuilder` pour construire des chaînes dans des boucles.

```java
StringBuilder sb = new StringBuilder();
for (String s : liste) sb.append(s).append(", ");
String resultat = sb.toString();
```

## Qu'est-ce que l'autoboxing et le unboxing ?
Java convertit automatiquement entre les primitifs et leurs types enveloppes :

- **Autoboxing** : `int` → `Integer`
- **Unboxing** : `Integer` → `int`

```java
List<Integer> liste = new ArrayList<>();
liste.add(42);          // autoboxing : int → Integer
int x = liste.get(0);  // unboxing : Integer → int

Integer a = 127, b = 127;
a == b; // true — plage mise en cache [-128, 127]

Integer c = 200, d = 200;
c == d;        // false — hors cache, objets différents
c.equals(d);   // true
```

⚠️ Attention aux `NullPointerException` lors du unboxing d'un type enveloppe `null`.

## Quelle est la différence entre `Comparable` et `Comparator` ?

- **`Comparable`** : la classe implémente son propre ordre naturel via `compareTo()`.
- **`Comparator`** : stratégie externe pour l'ordonnancement, passée aux méthodes de tri.

```java
// Comparable — ordre naturel
class Employe implements Comparable<Employe> {
    int salaire;
    public int compareTo(Employe autre) {
        return Integer.compare(this.salaire, autre.salaire);
    }
}

// Comparator — ordre personnalisé (lambda)
List<Employe> employes = ...;
employes.sort(Comparator.comparing(e -> e.nom));
employes.sort(Comparator.comparingInt((Employe e) -> e.salaire).reversed());
```

## Qu'est-ce qu'une référence faible (weak reference) en Java ?
Java dispose de quatre niveaux de force de référence :

1. **Forte** (par défaut) : l'objet reste en vie tant qu'une référence existe.
2. **Douce** (`SoftReference`) : le GC collecte uniquement si la mémoire est insuffisante — utile pour les caches.
3. **Faible** (`WeakReference`) : le GC collecte dès qu'il n'y a plus de référence forte/douce — utilisé dans `WeakHashMap`.
4. **Fantôme** (`PhantomReference`) : pas d'accès direct ; utilisé pour le nettoyage pré-mortem.

```java
WeakReference<MonObjet> ref = new WeakReference<>(new MonObjet());
MonObjet obj = ref.get(); // peut retourner null si le GC a collecté l'objet
```

## Qu'est-ce qu'une interface fonctionnelle ?
Une interface avec exactement **une méthode abstraite**. Les lambdas et références de méthodes peuvent être utilisées partout où une interface fonctionnelle est attendue.

```java
@FunctionalInterface
interface Transformateur<T, R> { R transformer(T entree); }

Transformateur<String, Integer> parseur = Integer::parseInt;
int n = parseur.transformer("42"); // 42
```

Interfaces fonctionnelles intégrées (`java.util.function`) :
- `Predicate<T>` — `boolean test(T t)`
- `Function<T,R>` — `R apply(T t)`
- `Consumer<T>` — `void accept(T t)`
- `Supplier<T>` — `T get()`
- `BiFunction<T,U,R>` — `R apply(T t, U u)`
