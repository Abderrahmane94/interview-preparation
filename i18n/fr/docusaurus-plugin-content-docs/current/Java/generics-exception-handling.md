---
sidebar_position: 3
---
import TOCInline from '@theme/TOCInline';

# Génériques & Gestion des exceptions
# <TOCInline toc={toc} />

## Que sont les génériques Java ?
Les génériques permettent aux classes, interfaces et méthodes d'opérer sur des **paramètres de type**, garantissant la **sécurité de type à la compilation** tout en évitant la duplication de code. Sans génériques, on utiliserait `Object` avec des casts manuels — risqué et verbeux.

```java
// Sans génériques
List liste = new ArrayList();
liste.add("bonjour");
String s = (String) liste.get(0); // cast explicite, risque de ClassCastException

// Avec génériques
List<String> liste = new ArrayList<>();
liste.add("bonjour");
String s = liste.get(0); // pas de cast, type-safe
```

## Que sont les paramètres de type bornés ?
Ils restreignent les types pouvant être utilisés comme arguments génériques.

```java
// Borne supérieure : T doit être Number ou une sous-classe
<T extends Number>

// Borne inférieure : T doit être Integer ou une superclasse
<? super Integer>

// Joker — n'importe quel type
<?>
```

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

max(3, 7);              // 7
max("pomme", "banane"); // "pomme"
```

## Quelle est la différence entre `<?>`, `<? extends T>` et `<? super T>` ?

- **`<?>`** (joker non borné) : n'importe quel type. Lecture seule ; impossible d'ajouter des éléments.
- **`<? extends T>`** (borné supérieurement) : T ou ses sous-types. Sûr en **lecture** ; impossible d'ajouter (producteur).
- **`<? super T>`** (borné inférieurement) : T ou ses super-types. Sûr pour **ajouter** T ; la lecture retourne `Object` (consommateur).

Retenir : **PECS — Producer Extends, Consumer Super**.

```java
// Producteur — lire depuis lui
void afficherListe(List<? extends Number> liste) {
    for (Number n : liste) System.out.println(n);
}

// Consommateur — écrire dedans
void ajouterNombres(List<? super Integer> liste) {
    liste.add(1); liste.add(2);
}
```

## Qu'est-ce que l'effacement de type (type erasure) ?
Les génériques en Java sont une fonctionnalité **à la compilation**. À l'exécution, les paramètres de type sont effacés vers leurs bornes (généralement `Object`). C'est l'**effacement de type**.

```java
List<String> chaines = new ArrayList<>();
List<Integer> entiers = new ArrayList<>();

chaines.getClass() == entiers.getClass(); // true — tous deux sont juste List à l'exécution
```

Conséquences :
- Impossible de faire `new T()` ou `new T[]` dans du code générique.
- Impossible d'utiliser les génériques avec `instanceof` : `liste instanceof List<String>` ne compile pas.
- Pas de type primitif comme paramètre : utiliser `List<Integer>`, pas `List<int>`.

## Qu'est-ce que la gestion des exceptions en Java ?
La gestion des exceptions détecte et répond aux erreurs d'exécution via `try`, `catch`, `finally`, `throw` et `throws`.

```java
try {
    int resultat = 10 / 0;             // lève ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Erreur : " + e.getMessage());
} finally {
    System.out.println("S'exécute toujours");
}
```

`throws` dans la signature de méthode déclare les exceptions vérifiées que l'appelant doit gérer :
```java
void lireFichier(String chemin) throws IOException { ... }
```

## Quelle est la hiérarchie des exceptions Java ?

```
Throwable
├── Error               (erreurs JVM — ne pas attraper : OutOfMemoryError, StackOverflowError)
└── Exception
    ├── RuntimeException    (non vérifiée — erreurs de programmation)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── ClassCastException
    │   └── IllegalArgumentException
    └── (exceptions vérifiées — doivent être déclarées/attrapées)
        ├── IOException
        ├── SQLException
        └── FileNotFoundException
```

## Quelle est la différence entre une exception vérifiée et non vérifiée ?

| | Vérifiée | Non vérifiée (`RuntimeException`) |
|---|---|---|
| Détectée à | La compilation | L'exécution |
| Doit être gérée ? | Oui (`catch` ou `throws`) | Non |
| Exemples | `IOException`, `SQLException` | `NullPointerException`, `IllegalArgumentException` |
| Représente | Conditions récupérables | Bugs de programmation |

```java
// Vérifiée — doit être déclarée ou attrapée
void analyser(String s) throws ParseException { ... }

// Non vérifiée — optionnel à attraper
void diviser(int a, int b) {
    if (b == 0) throw new IllegalArgumentException("Le diviseur ne peut pas être zéro");
}
```

## Qu'est-ce que le try-with-resources ?
Introduit en Java 7, il **ferme automatiquement** les ressources implémentant `AutoCloseable`, éliminant le besoin de blocs `finally` pour le nettoyage.

```java
// Ancienne façon
InputStream is = null;
try {
    is = new FileInputStream("fichier.txt");
    // ...
} finally {
    if (is != null) is.close();
}

// Avec try-with-resources (préféré)
try (InputStream is = new FileInputStream("fichier.txt");
     BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
    String ligne = reader.readLine();
} // les deux fermés automatiquement, même en cas d'exception
```

Les ressources multiples sont fermées dans l'**ordre inverse** de leur déclaration.

## Comment créer une exception personnalisée ?

```java
// Exception vérifiée personnalisée
public class FondsInsuffisantsException extends Exception {
    private final double montant;

    public FondsInsuffisantsException(double montant) {
        super("Fonds insuffisants : besoin de " + montant + " de plus");
        this.montant = montant;
    }

    public double getMontant() { return montant; }
}

// Utilisation
public void retirer(double montant) throws FondsInsuffisantsException {
    if (montant > solde) throw new FondsInsuffisantsException(montant - solde);
    solde -= montant;
}
```

Pour une exception non vérifiée, étendre `RuntimeException` à la place.

## Qu'est-ce que le chaînage d'exceptions ?
Encapsuler une exception dans une autre pour préserver la cause originale — important pour le débogage.

```java
try {
    chargerConfig();
} catch (IOException e) {
    throw new ApplicationException("Échec du démarrage", e); // e est la cause
}

// Récupérer la cause originale
catch (ApplicationException e) {
    Throwable cause = e.getCause(); // l'IOException originale
}
```

## Qu'est-ce que le multi-catch (Java 7+) ?
Attraper plusieurs types d'exceptions dans un seul bloc `catch` avec `|` :

```java
try {
    operationRisquee();
} catch (IOException | SQLException e) {
    log.error("Opération échouée", e);
    throw new RuntimeException(e);
}
```

La variable attrapée est implicitement `final` dans un bloc multi-catch.

## Quelle est la différence entre `throw` et `throws` ?

- **`throw`** : utilisé dans le corps d'une méthode pour lancer effectivement une instance d'exception.
- **`throws`** : utilisé dans la signature de méthode pour déclarer qu'une méthode **peut** lancer une exception vérifiée.

```java
void valider(int age) throws IllegalArgumentException {
    if (age < 0) throw new IllegalArgumentException("L'âge ne peut pas être négatif");
}
```

## Qu'est-ce que la propagation d'exceptions ?
Quand une méthode lève une exception et ne la gère pas, l'exception se propage **vers le haut de la pile d'appels** jusqu'à ce qu'elle soit interceptée ou atteigne la JVM (qui termine alors le thread).

- Les **exceptions non vérifiées** se propagent automatiquement sans nécessiter `throws`.
- Les **exceptions vérifiées** doivent être déclarées explicitement avec `throws` dans chaque signature de méthode pour se propager.

```java
void m3() { int x = 1 / 0; }           // lève ArithmeticException
void m2() { m3(); }                      // se propage vers le haut
void m1() {
    try { m2(); }
    catch (ArithmeticException e) { System.out.println("Interceptée : " + e); }
}
```
La pile d'appels se déroule : `m3 → m2 → m1` jusqu'à ce que l'exception soit interceptée.

## Quand le bloc `finally` ne s'exécute-t-il PAS ?
Le bloc `finally` est presque toujours garanti de s'exécuter — même si une exception survient. Les seuls cas où il ne s'exécutera pas :
1. **`System.exit()`** est appelé — la JVM s'arrête immédiatement.
2. **Crash de la JVM** (ex. `kill -9` sur le processus, panne matérielle).
3. Un **thread démon** est tué quand tous les threads utilisateur se terminent.

```java
try {
    System.exit(0);       // la JVM s'arrête ici
} finally {
    System.out.println("Ceci ne s'affichera PAS");
}
```

## Quelle est la différence entre une Error et une Exception ?
Les deux étendent `Throwable`, mais servent des objectifs différents :
- **Error** (`OutOfMemoryError`, `StackOverflowError`) : représente des **problèmes graves de la JVM** — irrécupérables. Vous ne devriez **pas** intercepter les Errors ; corrigez la cause racine.
- **Exception** : représente des **problèmes au niveau de l'application** — récupérables. Vous les gérez avec try-catch.

```java
// Ne jamais faire cela :
try { ... } catch (OutOfMemoryError e) { }  // inutile — la JVM est défaillante

// Approprié :
try { ... } catch (IOException e) { }        // gérer les conditions récupérables
```

## Que sont les méthodes génériques ?
Une méthode peut déclarer son propre paramètre de type, indépendamment de la classe :

```java
public static <T> List<T> repeter(T element, int fois) {
    List<T> resultat = new ArrayList<>();
    for (int i = 0; i < fois; i++) resultat.add(element);
    return resultat;
}

List<String> mots = repeter("bonjour", 3); // ["bonjour", "bonjour", "bonjour"]
```

Le paramètre de type `<T>` est placé **avant le type de retour**.
