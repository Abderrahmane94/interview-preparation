---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';

# Java POO
# <TOCInline toc={toc} />

## Qu'est-ce que la POO ?
La Programmation Orientée Objet (POO) est un paradigme de programmation qui organise la conception logicielle autour d'**objets** — des instances de classes qui regroupent **données** (champs) et **comportement** (méthodes). Java est un langage entièrement orienté objet (hormis les types primitifs).

## Concepts clés de la POO en Java

- **Encapsulation** : regroupe données et méthodes, cache l'état interne et n'expose qu'une interface propre via les modificateurs d'accès (`private`, `protected`, `public`).

- **Héritage** : une classe (sous-classe) peut étendre une autre classe (superclasse), héritant de ses champs et méthodes. Favorise la réutilisation du code. Java supporte l'héritage simple pour les classes, mais l'héritage multiple via les interfaces.

- **Polymorphisme** : un objet peut prendre plusieurs formes. Une référence de superclasse peut pointer vers un objet de sous-classe. Permet la résolution dynamique à l'exécution.

- **Abstraction** : cacher les détails d'implémentation et n'exposer que les fonctionnalités pertinentes, via des classes abstraites ou des interfaces.

## Qu'est-ce que le polymorphisme en Java ?
Le polymorphisme permet à une interface de représenter différents types sous-jacents. Il en existe deux types :

- **Polymorphisme à la compilation (statique)** — surcharge de méthode : même nom de méthode, paramètres différents.
- **Polymorphisme à l'exécution (dynamique)** — redéfinition de méthode : la sous-classe fournit sa propre implémentation d'une méthode de la superclasse ; la JVM décide quelle version appeler à l'exécution.

```java
class Animal {
    void parler() { System.out.println("..."); }
}
class Chien extends Animal {
    @Override
    void parler() { System.out.println("Woof"); }
}
Animal a = new Chien();
a.parler(); // affiche "Woof" — polymorphisme à l'exécution
```

## Quelle est la différence entre surcharge et redéfinition de méthode ?

| | Surcharge (Overloading) | Redéfinition (Overriding) |
|---|---|---|
| Résolue à | La compilation | L'exécution |
| Signature | Paramètres différents | Même signature |
| Type de retour | Peut différer | Identique ou covariant |
| Emplacement | Même classe | Sous-classe |
| `static`/`private` | Peuvent être surchargés | Ne peuvent pas être redéfinis |

```java
// Surcharge
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Redéfinition
class Parent { void saluer() { System.out.println("Bonjour"); } }
class Enfant extends Parent {
    @Override
    void saluer() { System.out.println("Salut"); }
}
```

## Qu'est-ce que l'encapsulation et comment la réaliser ?
L'encapsulation consiste à déclarer les champs `private` et à les exposer via des getters/setters publics, afin de contrôler comment les données sont accédées et modifiées.

```java
public class CompteBancaire {
    private double solde;

    public double getSolde() { return solde; }

    public void deposer(double montant) {
        if (montant > 0) solde += montant;
    }
}
```

Avantages : validation des données, masquage de l'implémentation, refactoring facilité.

## Quelle est la différence entre une classe abstraite et une interface ?

| | Classe abstraite | Interface |
|---|---|---|
| Instanciation | Non | Non |
| Méthodes | Abstraites + concrètes | Abstraites + `default` + `static` (Java 8+) |
| Champs | Tous types | `public static final` uniquement |
| Héritage | Simple (`extends`) | Multiple (`implements`) |
| Constructeur | Oui | Non |
| Usage | Base commune partagée | Contrat / capacité |

Depuis Java 8, les interfaces peuvent avoir des méthodes `default` et `static`. La distinction principale restante est qu'**une classe ne peut étendre qu'une seule classe abstraite, mais implémenter plusieurs interfaces**.

```java
interface Volable {
    void voler();
    default void atterrir() { System.out.println("Atterrissage..."); }
}

abstract class Vehicule {
    protected String marque;
    abstract void demarrer();
    void arreter() { System.out.println("Arrêté"); }
}
```

## Quelle est la différence entre composition et héritage ?

**Héritage** ("est-un") : `Chien extends Animal` — à utiliser quand la sous-classe est vraiment une spécialisation du parent.

**Composition** ("a-un") : une classe détient une référence vers une autre — plus flexible, généralement préférable.

```java
// Héritage
class Voiture extends Moteur { } // mauvais — une Voiture n'est pas un Moteur

// Composition (préféré)
class Voiture {
    private Moteur moteur; // une Voiture A UN Moteur
    Voiture(Moteur moteur) { this.moteur = moteur; }
}
```

Préférer la composition : évite le couplage fort, facilite les tests avec des mocks, n'expose pas les internes du parent.

## Que sont les principes SOLID ?

- **S**ingle Responsibility : une classe ne doit avoir qu'une seule raison de changer.
- **O**pen/Closed : ouverte à l'extension, fermée à la modification.
- **L**iskov Substitution : les sous-classes doivent pouvoir remplacer leur superclasse sans altérer le comportement.
- **I**nterface Segregation : préférer plusieurs interfaces petites et spécifiques à une grande interface générale.
- **D**ependency Inversion : dépendre des abstractions, pas des concrétisations.

```java
// Exemple d'inversion de dépendances
interface ServiceNotification { void envoyer(String msg); }

class ServiceEmail implements ServiceNotification {
    public void envoyer(String msg) { /* envoyer email */ }
}

class TraitementCommande {
    private final ServiceNotification notificateur; // dépend de l'abstraction
    TraitementCommande(ServiceNotification n) { this.notificateur = n; }
}
```

## Quelle est la différence entre `this` et `super` ?

- `this` désigne l'**objet courant**. Utilisé pour disambiguïser les champs des variables locales, ou pour appeler un autre constructeur de la même classe (`this(...)`).
- `super` désigne la **classe parente**. Utilisé pour appeler des méthodes redéfinies (`super.methode()`) ou le constructeur parent (`super(...)`).

```java
class Animal {
    String nom;
    Animal(String nom) { this.nom = nom; }
    void decrire() { System.out.println("Animal : " + nom); }
}

class Chien extends Animal {
    String race;
    Chien(String nom, String race) {
        super(nom);         // appel constructeur Animal
        this.race = race;   // 'this' disambiguïse le champ
    }
    @Override
    void decrire() {
        super.decrire();    // appel méthode Animal
        System.out.println("Race : " + race);
    }
}
```

## Que sont les modificateurs d'accès en Java ?

| Modificateur | Même classe | Même package | Sous-classe | Partout |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| (défaut) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

## Qu'est-ce qu'un type de retour covariant ?
Depuis Java 5, une méthode redéfinie peut retourner un **sous-type** du type de retour déclaré dans la superclasse.

```java
class Animal { Animal creer() { return new Animal(); } }
class Chien extends Animal {
    @Override
    Chien creer() { return new Chien(); } // covariant — Chien est un sous-type d'Animal
}
```

## Quelle est la différence entre liaison statique et liaison dynamique ?

- **Liaison statique** : résolue à la compilation — s'applique aux méthodes `static`, `private` et `final`.
- **Liaison dynamique** : résolue à l'exécution — s'applique aux méthodes d'instance redéfinies. Java utilise une table de méthodes virtuelles (vtable).

## Qu'est-ce qu'une classe interne en Java ?
Une classe définie à l'intérieur d'une autre classe. Types :

- **Classe interne statique** : ne détient pas de référence vers l'instance externe.
- **Classe interne non statique** : détient une référence implicite vers l'instance externe.
- **Classe locale** : définie à l'intérieur d'une méthode.
- **Classe anonyme** : sans nom, définie et instanciée en une seule expression.

```java
class Externe {
    private int x = 10;

    class Interne {
        void afficher() { System.out.println(x); } // accède au champ externe
    }

    static class StaticInterne {
        void afficher() { System.out.println("Statique interne"); }
    }
}
```

## Quelle est la différence entre un objet et une classe ?
Une **classe** est un modèle définissant les champs et méthodes. Un **objet** est une instance de cette classe, allouée sur le tas.

```java
class Voiture { String modele; }    // classe — modèle
Voiture maVoiture = new Voiture();  // objet — instance
```

## Pourquoi Java n'autorise-t-il pas l'héritage multiple via les classes ?
Java n'autorise pas une classe à étendre plus d'une classe afin d'éviter le **problème du diamant** : si deux classes parentes ont une méthode avec la même signature, le compilateur ne peut pas déterminer laquelle la sous-classe doit hériter — créant une ambiguïté.

```java
class A { void bonjour() { System.out.println("A"); } }
class B { void bonjour() { System.out.println("B"); } }
// class C extends A, B {} // Non autorisé — quel bonjour() C utiliserait-il ?
```

Java résout cela en autorisant l'**héritage multiple uniquement via les interfaces**. Depuis Java 8, si deux interfaces fournissent toutes les deux une méthode `default` avec le même nom, la classe implémentante **doit** la surcharger pour résoudre l'ambiguïté.

## Qu'est-ce que le mot-clé `final` en Java ?
`final` peut être appliqué à trois choses :
- **Variable** : la valeur ne peut pas être modifiée une fois assignée. Pour les objets, la référence est fixe mais l'état de l'objet peut encore changer.
- **Méthode** : ne peut pas être redéfinie par les sous-classes.
- **Classe** : ne peut pas être étendue (ex. `String`, `Integer` sont finales).

```java
final int MAX = 100;         // constante
MAX = 200;                   // ❌ erreur de compilation

final class Singleton { }   // ne peut pas être étendue

class Parent {
    final void afficher() { } // ne peut pas être redéfinie
}
```

## Quand choisir une interface plutôt qu'une classe abstraite ?
- Choisissez une **classe abstraite** quand vous souhaitez partager une **implémentation commune** entre des classes liées, car elle peut avoir des méthodes concrètes et un état mutable.
- Choisissez une **interface** quand vous définissez un **contrat** que des classes non liées peuvent remplir, ou quand vous avez besoin d'un **héritage multiple** (une classe peut implémenter plusieurs interfaces).
- **Règle pratique** : si votre contrat change souvent, la classe abstraite est plus sûre — vous pouvez ajouter des méthodes concrètes sans casser toutes les classes implémentantes. Avec les interfaces, ajouter une nouvelle méthode casse tous les implémenteurs (sauf si vous utilisez une méthode `default` depuis Java 8).

## Quelle est la différence entre masquage et redéfinition de méthode ?
- **Redéfinition** : méthodes d'instance — résolue à l'exécution selon le type réel de l'objet.
- **Masquage** : méthodes `static` — résolue à la compilation selon le type de la référence. Les méthodes statiques ne peuvent pas être redéfinies.

```java
class Parent { static void bonjour() { System.out.println("Parent"); } }
class Enfant extends Parent { static void bonjour() { System.out.println("Enfant"); } }

Parent p = new Enfant();
p.bonjour(); // affiche "Parent" — masquage statique, pas redéfinition
```
