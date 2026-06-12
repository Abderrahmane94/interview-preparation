---
sidebar_position: 4
---
import TOCInline from '@theme/TOCInline';

# Java Collections
# <TOCInline toc={toc} />

## Qu'est-ce que le Java Collections Framework ?
Le Java Collections Framework (JCF) est une architecture unifiée d'interfaces et de classes pour stocker et manipuler des groupes d'objets. Interfaces principales :

```
Iterable
└── Collection
    ├── List      — ordonnée, autorise les doublons
    ├── Set       — pas de doublons
    └── Queue     — ordre FIFO
        └── Deque — file à double extrémité
Map               — paires clé-valeur (pas une Collection)
```

## Quelle est la différence entre List et Set ?

- **`List`** : ordonnée (ordre d'insertion conservé), **autorise les doublons**, accès indexé.
- **`Set`** : **pas de doublons**, généralement non ordonné (sauf `LinkedHashSet` et `TreeSet`).

```java
List<String> liste = new ArrayList<>(List.of("a", "b", "a")); // ["a", "b", "a"]
Set<String> set = new HashSet<>(List.of("a", "b", "a"));      // {"a", "b"}
```

## Quelle est la différence entre ArrayList et LinkedList ?

| | `ArrayList` | `LinkedList` |
|---|---|---|
| Structure | Tableau dynamique | Liste doublement chaînée |
| Accès aléatoire `get(i)` | O(1) | O(n) |
| Insertion/suppression au milieu | O(n) (décalage) | O(1) (après traversée) |
| Mémoire | Moins (tableau) | Plus (nœud + 2 pointeurs) |
| Implémente | `List` | `List`, `Deque` |

**Préférer `ArrayList`** dans la plupart des cas (meilleure localité de cache). Utiliser `LinkedList` seulement si vous insérez/supprimez fréquemment aux deux extrémités.

## Quelle est la différence entre une Pile (Stack) et une File (Queue) ?

**Pile** — Dernier entré, premier sorti (LIFO) :
```java
Deque<Integer> pile = new ArrayDeque<>(); // préféré à java.util.Stack
pile.push(1); pile.push(2);
pile.pop();  // 2
pile.peek(); // 1
```

**File** — Premier entré, premier sorti (FIFO) :
```java
Queue<Integer> file = new LinkedList<>();
file.offer(1); file.offer(2);
file.poll();  // 1 (retire)
file.peek();  // 2 (ne retire pas)
```

Utiliser `ArrayDeque` pour les piles/files — plus rapide que `LinkedList` et `Stack`.

## Quelle est la différence entre HashSet, LinkedHashSet et TreeSet ?

| | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---|---|---|---|
| Ordre | Aucun | Ordre d'insertion | Trié (naturel/Comparator) |
| `null` | Un null | Un null | ❌ (NPE) |
| Performance | O(1) add/contains | O(1) + surcharge chaînage | O(log n) |
| Implémenté par | `HashMap` | `LinkedHashMap` | `TreeMap` (Arbre Rouge-Noir) |

```java
Set<Integer> trie = new TreeSet<>(Set.of(5, 1, 3)); // [1, 3, 5]
Set<String> ordonne = new LinkedHashSet<>(List.of("b", "a", "c")); // [b, a, c]
```

## Comment fonctionne HashMap en interne ?
`HashMap` utilise un tableau de **buckets**. L'index du bucket est calculé comme `hash(clé) & (capacité - 1)`.

1. `put(clé, valeur)` : calculer le hash → trouver le bucket → si vide, insérer ; si collision, chaîner (liste chaînée) ou arbre (Java 8+, si longueur de chaîne ≥ 8).
2. `get(clé)` : calculer le hash → trouver le bucket → comparer les clés avec `.equals()`.

Points clés :
- Capacité par défaut : **16**, facteur de charge : **0.75** (rehashing à 75% de remplissage).
- Les clés doivent correctement implémenter `hashCode()` et `equals()`.
- **Non thread-safe**. Utiliser `ConcurrentHashMap` pour l'accès concurrent.
- Autorise **une clé `null`** et **plusieurs valeurs `null`**.

```java
Map<String, Integer> map = new HashMap<>();
map.put("alice", 30);
map.getOrDefault("bob", 0);       // 0 si absent
map.putIfAbsent("alice", 99);     // ne remplacera pas
map.computeIfAbsent("charlie", k -> k.length()); // 7
```

## Quelle est la différence entre HashMap, LinkedHashMap et TreeMap ?

| | `HashMap` | `LinkedHashMap` | `TreeMap` |
|---|---|---|---|
| Ordre | Aucun | Insertion / accès | Trié par clé |
| Performance | O(1) moy. | O(1) moy. | O(log n) |
| Clés null | 1 | 1 | ❌ |
| Cas d'usage | Général | Cache LRU, itération ordonnée | Requêtes par plage, sortie triée |

```java
// Cache LRU avec LinkedHashMap
Map<String, Integer> lru = new LinkedHashMap<>(16, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry<String, Integer> e) {
        return size() > 100; // évincer quand la capacité est dépassée
    }
};
```

## Quelle est la différence entre HashMap et Hashtable ?

| | `HashMap` | `Hashtable` |
|---|---|---|
| Thread-safe | Non | Oui (synchronisé) |
| Clés/valeurs null | Oui (1 clé null) | Non |
| Performance | Plus rapide | Plus lent |
| Statut | Préféré | Héritage — à éviter |

Utiliser `ConcurrentHashMap` à la place de `Hashtable` pour la sécurité des threads.

## Qu'est-ce que ConcurrentHashMap ?
Une implémentation de `Map` thread-safe qui réalise la concurrence en **verrouillant au niveau du bucket (nœud)** plutôt que sur la map entière (comme `Hashtable`). En Java 8+, elle utilise des opérations CAS et des blocs synchronisés sur des nœuds individuels.

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("clé", 1);
map.computeIfAbsent("clé", k -> 0);
map.merge("compteur", 1, Integer::sum); // incrément thread-safe
```

N'autorise pas les clés ou valeurs `null`. Les itérateurs sont faiblement cohérents.

## Qu'est-ce qu'une PriorityQueue ?
Une file où les éléments sont ordonnés selon l'**ordre naturel** ou un `Comparator`. La **tête** est toujours le plus petit élément (min-heap par défaut).

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.offer(1); pq.offer(3);
pq.poll(); // 1 — le plus petit en premier

// Max-heap
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Comparator.reverseOrder());

// Ordre personnalisé
PriorityQueue<Tache> tachePQ = new PriorityQueue<>(Comparator.comparingInt(t -> t.priorite));
```

## Quelle est la différence entre les itérateurs fail-fast et fail-safe ?

- **Fail-fast** (collections standard comme `ArrayList`, `HashMap`) : lance `ConcurrentModificationException` si la collection est modifiée pendant l'itération. Détecte la modification via `modCount`.

```java
List<Integer> liste = new ArrayList<>(List.of(1, 2, 3));
for (Integer i : liste) {
    liste.remove(i); // lance ConcurrentModificationException
}
```

- **Fail-safe** (`ConcurrentHashMap`, `CopyOnWriteArrayList`) : itère sur un snapshot ou tolère les modifications concurrentes — pas d'exception, mais peut ne pas refléter les dernières modifications.

Pour supprimer en toute sécurité pendant l'itération : utiliser `Iterator.remove()` :
```java
Iterator<Integer> it = liste.iterator();
while (it.hasNext()) {
    if (it.next() == 2) it.remove(); // sûr
}
```

## Quelle est la différence entre Comparable et Comparator ?

- **`Comparable<T>`** : implémenté par la classe elle-même — définit l'ordre naturel via `compareTo()`.
- **`Comparator<T>`** : stratégie externe — passée aux méthodes de tri, permet plusieurs ordres.

```java
class Employe implements Comparable<Employe> {
    String nom; int salaire;
    public int compareTo(Employe o) { return Integer.compare(this.salaire, o.salaire); }
}

// Plusieurs stratégies de tri avec Comparator
List<Employe> employes = ...;
employes.sort(Comparator.comparing(e -> e.nom));                // par nom
employes.sort(Comparator.comparingInt((Employe e) -> e.salaire)
               .reversed()
               .thenComparing(e -> e.nom));                      // par salaire desc, puis nom
```

## Que sont les méthodes utilitaires de la classe Collections ?
`java.util.Collections` fournit des méthodes statiques utilitaires :

```java
List<Integer> liste = new ArrayList<>(List.of(3, 1, 4, 1, 5));

Collections.sort(liste);                        // [1, 1, 3, 4, 5]
Collections.reverse(liste);                     // [5, 4, 3, 1, 1]
Collections.shuffle(liste);                     // ordre aléatoire
Collections.min(liste);                         // 1
Collections.max(liste);                         // 5
Collections.frequency(liste, 1);               // 2
Collections.unmodifiableList(liste);            // vue non modifiable
Collections.synchronizedList(liste);            // enveloppe thread-safe
Collections.nCopies(3, "bonjour");             // ["bonjour","bonjour","bonjour"]
```

## Que sont les méthodes de fabrique List.of(), Map.of(), Set.of() (Java 9+) ?
Créent des collections **immuables** de manière concise :

```java
List<String> liste = List.of("a", "b", "c");     // immuable, pas de null
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("a", 1, "b", 2);
Map<String, Integer> mapEntrees = Map.ofEntries(
    Map.entry("clé1", 1),
    Map.entry("clé2", 2)
);
```

⚠️ Ces collections lancent `UnsupportedOperationException` sur `add`, `remove`, `put`. Elles n'autorisent **pas les éléments null**.

## Comment itérer sur une Map ?

```java
Map<String, Integer> map = Map.of("a", 1, "b", 2);

// Entry set (le plus courant)
for (Map.Entry<String, Integer> entree : map.entrySet()) {
    System.out.println(entree.getKey() + " = " + entree.getValue());
}

// Key set
for (String clé : map.keySet()) { ... }

// forEach (Java 8+)
map.forEach((k, v) -> System.out.println(k + "=" + v));

// Stream
map.entrySet().stream()
   .filter(e -> e.getValue() > 1)
   .forEach(System.out::println);
```
