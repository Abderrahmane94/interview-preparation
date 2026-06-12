---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Les Bases
# <TOCInline toc={toc} />

## Qu'est-ce que Java ?
Java est un langage de programmation de haut niveau, fortement typé et orienté objet, conçu pour être **indépendant de la plateforme** ("écrire une fois, exécuter partout"). Le code source Java est compilé en **bytecode**, qui s'exécute sur n'importe quelle JVM indépendamment du système d'exploitation.

## Quelles sont les caractéristiques de Java ?
- **Indépendance de la plateforme** : le bytecode s'exécute sur n'importe quelle JVM.
- **Orienté objet** : tout est objet (sauf les primitifs).
- **Fortement typé** : vérification des types à la compilation.
- **Gestion automatique de la mémoire** : le garbage collector gère le tas.
- **Multithreading** : support natif des threads.
- **Robuste** : gestion des exceptions, pas d'arithmétique de pointeurs.
- **Sécurisé** : pas d'accès direct à la mémoire, vérification du bytecode.
- **Bibliothèque standard riche** : `java.util`, `java.io`, `java.net`, etc.

## Quelle est la différence entre JDK, JRE et JVM ?

- **JVM (Java Virtual Machine)** : exécute le bytecode Java. Spécifique à la plateforme. Fournit le garbage collection, la compilation JIT et l'environnement d'exécution.
- **JRE (Java Runtime Environment)** : JVM + bibliothèques de classes standard. Nécessaire pour **exécuter** des applications Java.
- **JDK (Java Development Kit)** : JRE + compilateur (`javac`), débogueur et outils de développement. Nécessaire pour **développer** des applications Java.

```
JDK ⊃ JRE ⊃ JVM
```

## Quelle est la différence entre les types primitifs et les classes enveloppes ?

Java possède 8 types primitifs : `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`. Ils sont stockés sur la **pile** (variables locales), pas sur le tas.

Les classes enveloppes (`Integer`, `Double`, etc.) sont des objets encapsulant des primitifs — nécessaires pour les collections (`List<Integer>`, pas `List<int>`).

```java
int primitif = 42;           // pile, sans overhead
Integer enveloppe = 42;      // autoboxed, objet sur le tas

// Piège : == compare les références pour les objets
Integer a = 200, b = 200;
a == b;       // false — objets différents
a.equals(b);  // true
```

Java met en cache les valeurs `Integer` de **-128 à 127**, donc `Integer.valueOf(127) == Integer.valueOf(127)` est `true`.

## Qu'est-ce que l'autoboxing et le unboxing ?
**L'autoboxing** est la conversion automatique d'un primitif vers sa classe enveloppe (`int` → `Integer`). **Le unboxing** est l'inverse.

```java
List<Integer> liste = new ArrayList<>();
liste.add(5);           // autoboxing : int 5 → Integer(5)
int x = liste.get(0);  // unboxing : Integer(5) → int 5
```

⚠️ Le unboxing d'une enveloppe `null` lance `NullPointerException`.

## Quelle est la différence entre une classe abstraite et une interface ?

| | Classe abstraite | Interface |
|---|---|---|
| Instanciation | Non | Non |
| Méthodes | Abstraites + concrètes | Abstraites, `default`, `static` (Java 8+), `private` (Java 9+) |
| Champs | Tous types | `public static final` uniquement |
| Héritage multiple | ❌ un seul `extends` | ✅ plusieurs `implements` |
| Constructeur | Oui | Non |

**Quand utiliser** : classe abstraite pour une implémentation de base commune ; interface pour définir un contrat ou une capacité.

```java
interface Dessinable { void dessiner(); default void imprimer() { System.out.println("Dessin"); } }
abstract class Forme { protected String couleur; abstract double aire(); }
class Cercle extends Forme implements Dessinable {
    double aire() { return Math.PI * r * r; }
    public void dessiner() { System.out.println("Dessin cercle"); }
}
```

## Quel est le rôle du mot-clé `static` ?
Les membres `static` appartiennent à la **classe**, pas à une instance. Ils sont partagés par tous les objets.

```java
class Compteur {
    static int compte = 0;  // partagé
    int id;
    Compteur() { id = ++compte; }
}
Compteur.compte;  // accès via le nom de la classe (préféré)
```

Les méthodes `static` ne peuvent pas accéder aux champs d'instance (`this`). Les blocs `static` s'exécutent une fois lors du chargement de la classe.

## Quel est le rôle du mot-clé `final` ?

- **Variable `final`** : ne peut pas être réassignée après initialisation.
- **Méthode `final`** : ne peut pas être redéfinie.
- **Classe `final`** : ne peut pas être sous-classée (ex. `String`, `Integer`).

```java
final int MAX = 100;       // constante
final class Immuable {}    // ne peut pas être étendue
```

## Quelle est la différence entre `==` et `.equals()` ?

- `==` compare les **références** (adresses mémoire) pour les objets ; compare les **valeurs** pour les primitifs.
- `.equals()` compare le **contenu** (doit être correctement redéfini).

```java
String a = new String("bonjour");
String b = new String("bonjour");
a == b;        // false — objets différents
a.equals(b);   // true — même contenu
```

Toujours utiliser `.equals()` pour comparer des objets. Pour une égalité null-safe, utiliser `Objects.equals(a, b)`.

## Qu'est-ce qu'un constructeur en Java ?
Un constructeur initialise un nouvel objet. Il a le même nom que la classe et n'a pas de type de retour. Si aucun constructeur n'est défini, Java fournit un constructeur sans argument par défaut.

```java
class Personne {
    String nom;
    int age;

    Personne() { this("Inconnu", 0); }             // sans arg, appelle l'autre constructeur
    Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }
}
```

Les constructeurs ne peuvent pas être `static`, `abstract` ou `final`. Ils peuvent être surchargés.

## Quel est le rôle du mot-clé `this` ?
`this` désigne l'**objet courant** :

```java
class Point {
    int x, y;
    Point(int x, int y) {
        this.x = x;   // disambiguïse le champ du paramètre
        this.y = y;
    }
    Point copier() { return this; }   // retourne l'objet courant
}
```

`this(...)` appelle un autre constructeur de la même classe (doit être la première instruction).

## Quel est le rôle du mot-clé `super` ?
`super` désigne la **classe parente** :

```java
class Animal { void parler() { System.out.println("..."); } }
class Chien extends Animal {
    @Override
    void parler() {
        super.parler();              // appel méthode parent
        System.out.println("Woof");
    }
    Chien() { super(); }            // appel constructeur parent (implicite si omis)
}
```

## Quelle est la différence entre une variable d'instance et une variable statique ?

- **Variable d'instance** : chaque objet a sa propre copie, stockée sur le tas avec l'objet.
- **Variable statique** : une seule copie partagée par toutes les instances, stockée dans la zone de méthode.

```java
class Chien {
    static int compte = 0;   // partagé — combien de chiens existent
    String nom;              // d'instance — chaque chien a son propre nom
    Chien(String nom) { this.nom = nom; compte++; }
}
```

## Qu'est-ce qu'une expression lambda en Java ?
Un lambda est une manière concise de représenter une fonction anonyme. Il peut être utilisé partout où une **interface fonctionnelle** est attendue.

```java
// Ancienne façon : classe anonyme
Comparator<String> comp = new Comparator<>() {
    public int compare(String a, String b) { return a.compareTo(b); }
};

// Lambda
Comparator<String> comp = (a, b) -> a.compareTo(b);

// Référence de méthode (encore plus court)
Comparator<String> comp = String::compareTo;
```

## Quel est le rôle du mot-clé `transient` ?
Les champs marqués `transient` sont **exclus de la sérialisation**.

```java
class Utilisateur implements Serializable {
    String nomUtilisateur;
    transient String motDePasse;  // non sauvegardé lors de la sérialisation
}
```

## Qu'est-ce qu'un JavaBean ?
Un JavaBean est une classe respectant ces conventions :
1. Constructeur public sans argument.
2. Champs privés avec getters/setters publics.
3. Implémente `Serializable`.

```java
public class Produit implements Serializable {
    private String nom;
    private double prix;

    public Produit() {}
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public double getPrix() { return prix; }
    public void setPrix(double prix) { this.prix = prix; }
}
```

Largement utilisé dans Spring, JPA et JSP.

## Quelle est la différence entre `StringBuilder` et `StringBuffer` ?

| | `StringBuilder` | `StringBuffer` |
|---|---|---|
| Thread-safe | Non | Oui (synchronisé) |
| Performance | Plus rapide | Plus lent |

`String` lui-même est **immuable** — toute "modification" crée un nouvel objet. Utiliser `StringBuilder` pour construire des chaînes dans des boucles.

```java
StringBuilder sb = new StringBuilder("Bonjour");
sb.append(" Monde").insert(7, ",").reverse();
String resultat = sb.toString();
```

## Quel est le rôle de l'opérateur `instanceof` ?
Vérifie si un objet est une instance d'une classe/interface. Depuis Java 16 (pattern matching), il peut aussi lier le résultat :

```java
Object obj = "Bonjour";

// Classique
if (obj instanceof String) { String s = (String) obj; }

// Pattern matching (Java 16+)
if (obj instanceof String s) { System.out.println(s.length()); }
```

## Quel est le rôle du mot-clé `assert` ?
Utilisé en développement/test pour vérifier des suppositions. Désactivé par défaut à l'exécution (activer avec le flag JVM `-ea`).

```java
int age = getAge();
assert age >= 0 : "L'âge ne peut pas être négatif : " + age;
```

Ne pas utiliser pour la validation en production — utiliser des exceptions appropriées.

## Qu'est-ce qu'un package en Java ?
Un package est un espace de noms pour organiser les classes et interfaces liées. Il correspond à la structure de répertoires.

```java
package com.entreprise.utils;     // déclaration en haut du fichier

import java.util.List;            // import depuis un autre package
import com.entreprise.utils.*;    // import joker (déconseillé)
```

Avantages : évite les conflits de noms, contrôle l'accès (`package-private`), organise le code.

## Quel est le rôle des mots-clés `break` et `continue` ?

- **`break`** : quitte immédiatement la boucle ou le switch courant.
- **`continue`** : ignore le reste de l'itération courante et passe à la suivante.

```java
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // ignorer 3
    if (i == 7) break;     // s'arrêter à 7
    System.out.print(i + " ");
}
// Sortie : 0 1 2 4 5 6
```

## Quel est le rôle du mot-clé `default` dans un switch ?
S'exécute quand aucun `case` ne correspond. Utilisé aussi dans les interfaces (Java 8+) pour les implémentations de méthodes par défaut.

```java
switch (jour) {
    case LUNDI: System.out.println("Début de semaine"); break;
    case VENDREDI: System.out.println("Fin de semaine"); break;
    default: System.out.println("Milieu de semaine");
}
```

Expressions switch Java 14+ :
```java
String etiquette = switch (jour) {
    case LUNDI -> "Début";
    case VENDREDI -> "Fin";
    default -> "Milieu";
};
```
