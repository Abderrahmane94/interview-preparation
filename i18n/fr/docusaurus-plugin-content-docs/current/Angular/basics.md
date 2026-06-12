---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Les Bases
# <TOCInline toc={toc} />

## Qu'est-ce qu'Angular ?
Angular est un framework web open-source basé sur TypeScript, développé par Google. Il est utilisé pour créer des applications web monopages (SPA) évolutives et dynamiques.

## En quoi diffère-t-il d'AngularJS ?
AngularJS, aussi appelé Angular 1, est la version antérieure d'Angular, basée sur JavaScript.
- **Architecture** : AngularJS est basé sur l'architecture Model-Vue-Contrôleur (MVC), tandis qu'Angular utilise une architecture basée sur les composants.
- **Langage** : AngularJS est écrit en JavaScript, Angular est écrit en TypeScript.
- **Performances** : Angular est généralement plus rapide et plus performant qu'AngularJS, notamment grâce à la compilation ahead-of-time (AOT).

## Expliquez les hooks du cycle de vie d'un composant Angular
Les hooks du cycle de vie d'un composant Angular sont des **méthodes** appelées à des **points spécifiques** du cycle de vie d'un composant. Les principaux hooks incluent **ngOnInit, ngOnChanges, ngDoCheck, ngOnDestroy**, etc. Ils permettent d'effectuer des actions à différentes étapes : initialisation, détection de changements, destruction d'un composant.

## Qu'est-ce qu'un module Angular ? Quel est son lien avec une application Angular ?
Dans Angular, un module est un mécanisme pour **organiser** et **regrouper** des **composants, directives, services** et autres fonctionnalités liés. Il agit comme un **conteneur** et fournit un contexte d'exécution. Une application Angular est composée d'un ou plusieurs modules, le module racine étant le point d'entrée.

## Qu'est-ce que la liaison de données (data binding) dans Angular ?
La liaison de données dans Angular est une fonctionnalité qui permet la **synchronisation** entre le **modèle de données** (propriétés du composant) et l'**interface utilisateur** (template HTML).

1. **Interpolation** : intègre des propriétés de composant dans les templates HTML avec des doubles accolades ({{}}). Les valeurs sont rendues dynamiquement.

2. **Liaison de propriété** : lie des propriétés de composant à des attributs ou propriétés d'éléments HTML avec des crochets ([]). Permet de définir des valeurs dynamiquement.

3. **Liaison d'événement** : lie des événements DOM (clics, soumissions de formulaire) à des méthodes de composant avec des parenthèses (()). La méthode s'exécute lorsque l'événement se produit.

4. **Liaison bidirectionnelle** : combine liaison de propriété et liaison d'événement pour créer un flux de données bidirectionnel. Utilise la directive ngModel pour mettre à jour les données dans le composant et le template simultanément.

## Que sont les directives Angular ? Différenciez les directives structurelles et attributaires.
Les directives Angular sont des **marqueurs** sur les éléments **DOM** qui modifient leur **comportement** ou **apparence**.
Les **directives structurelles**, comme **ngIf** et **ngFor**, modifient la structure du DOM,
tandis que les **directives attributaires**, comme **ngStyle** et **ngClass**, modifient le comportement ou l'apparence des éléments DOM.

## Expliquez la différence entre ngOnInit() et constructor() dans les composants Angular.
La méthode constructor() est appelée lors de l'**instanciation** d'un composant et sert à initialiser ses propriétés. ngOnInit() est un **hook du cycle de vie** appelé **après** le **constructeur** du composant, utilisé pour les tâches d'initialisation dépendant des propriétés d'entrée.

## Qu'est-ce que l'Angular CLI ? Comment aide-t-il au développement Angular ?
Angular CLI (Command Line Interface) est un **outil en ligne de commande** qui aide à créer, construire, tester et déployer des applications Angular. Il fournit des commandes et des templates de projets préconfigurés pour accélérer le développement.

## Que sont les templates Angular ?
Les templates Angular sont des **vues basées sur HTML** utilisées pour définir la structure et la mise en page des composants. Les templates contiennent du code HTML avec la syntaxe Angular pour afficher des données dynamiques et répondre aux interactions utilisateur.

## Comment définir un template dans Angular ?
Les templates contiennent du code HTML avec la syntaxe et les liaisons spécifiques à Angular pour afficher des données dynamiques et répondre aux interactions utilisateur.

## Expliquez le concept d'injection de dépendances dans Angular. Pourquoi est-ce important ?
L'injection de dépendances (DI) est un patron de conception utilisé dans Angular pour créer et gérer les dépendances entre différentes parties d'une application. Elle permet un couplage faible et des tests plus faciles en fournissant les dépendances à une classe plutôt qu'en la laissant les créer elle-même.

## Comment gérez-vous la validation de formulaire dans Angular ? Expliquez FormBuilder et Validators.
La validation de formulaire dans Angular est gérée avec le module Angular Forms. La classe FormBuilder offre une façon pratique de définir et gérer des formulaires, tandis que Validators fournit des fonctions de validation prédéfinies (champs requis, longueurs min/max, validation personnalisée, etc.).

## Qu'est-ce que le routage Angular ?
Le routage Angular permet de naviguer entre différentes vues ou composants dans une application Angular. Les routes sont définies avec le RouterModule et peuvent être configurées avec des mappings de chemins, des paramètres de route et des gardes pour contrôler l'accès.

## Que sont les services Angular ?
Les services Angular sont des composants réutilisables fournissant des fonctionnalités et des données partagées entre plusieurs composants. Ils encapsulent la logique métier, gèrent les appels API et l'état de l'application. Ils peuvent être injectés dans les composants via l'injection de dépendances.

## Comment communiquer entre composants dans Angular ? Expliquez les différentes méthodes.
La communication entre composants dans Angular peut être réalisée via les propriétés Input et Output, EventEmitter et les services. Les propriétés Input permettent de passer des données d'un composant parent à un enfant, les propriétés Output et EventEmitter permettent aux composants enfants d'émettre des événements gérés par les parents. Les services agissent comme canal de communication centralisé.

## Qu'est-ce qu'un composant Angular ?
Les composants sont les **blocs de construction** des applications Angular. Ils se composent d'un **template**, définissant l'interface du composant, et d'une **classe**, définissant son **comportement**.

## Qu'est-ce qu'un Pipe Angular ?
Les pipes sont un moyen de **transformer** des données dans les templates Angular. Ils prennent une **valeur en entrée** et retournent une **valeur transformée en sortie**.

## Comment utiliser le module HttpClient d'Angular pour faire des requêtes HTTP ?
Le module HttpClient d'Angular est utilisé pour effectuer des requêtes HTTP vers une API backend. Il fournit une façon pratique de gérer les requêtes et réponses HTTP dans les applications Angular.

## Qu'est-ce que le chargement hâtif (Eager) et paresseux (Lazy) ?
Le chargement hâtif est le comportement par défaut dans Angular, où tous les modules sont chargés au démarrage de l'application. Le chargement paresseux est une technique où les modules ne sont chargés que lorsqu'ils sont nécessaires.

## Comment optimiser les performances dans les applications Angular ?
- Réduire le nombre de requêtes HTTP.
- Optimiser la taille des fichiers JavaScript et CSS.
- Utiliser le chargement paresseux (lazy loading).
- Optimiser la détection des changements.
- Utiliser la compilation AOT (Ahead-of-Time).
- Minimiser les opérations coûteuses comme les expressions régulières.

## Qu'est-ce que RxJS ?
RxJS (Reactive Extensions for JavaScript) est une bibliothèque de programmation réactive utilisant des Observables. C'est un élément clé du framework Angular et fournit un large éventail d'opérateurs pour gérer et transformer les flux de données asynchrones.

Concepts et fonctionnalités clés de RxJS :

1. **Observables** : représentent une séquence de valeurs dans le temps. Peuvent émettre des valeurs, se terminer ou lancer des erreurs. Peuvent être créés depuis des événements, des timers, des requêtes AJAX ou des structures de données existantes.

2. **Opérateurs** : RxJS fournit un ensemble riche d'opérateurs pour transformer, filtrer, combiner et manipuler les données émises par les observables (map, filter, reduce, merge, combine, throttle...).

3. **Subscription** : les souscriptions initient et contrôlent l'exécution des observables. En souscrivant, vous recevez les valeurs émises, les erreurs et les notifications de fin.

4. **Subjects** : type d'observable pouvant émettre des valeurs vers plusieurs abonnés (multicast). Agissent à la fois comme observateur et observable.

5. **Schedulers** : contrôlent l'exécution et le timing des opérations sur les observables (immédiat, à intervalle, asynchrone, etc.).

6. **Gestion d'erreurs** : RxJS fournit des opérateurs comme `catchError` ou `retry` pour intercepter et gérer les erreurs dans les observables.

7. **Backpressure et contrôle de flux** : des opérateurs comme `throttle`, `debounce` et `buffer` gèrent le flux de données entre producteurs rapides et consommateurs lents.

## Quelques opérateurs RxJS

1. `map` : transforme chaque valeur émise par un observable en appliquant une fonction de mapping.

   ```typescript
   import { from } from 'rxjs';
   import { map } from 'rxjs/operators';

   const source = from([1, 2, 3, 4, 5]);
   const mapped = source.pipe(map(x => x * 2));
   mapped.subscribe(result => console.log(result)); // Sortie : 2, 4, 6, 8, 10
   ```

2. `filter` : filtre les valeurs émises par un observable selon une condition.

   ```typescript
   import { from } from 'rxjs';
   import { filter } from 'rxjs/operators';

   const source = from([1, 2, 3, 4, 5]);
   const filtered = source.pipe(filter(x => x % 2 === 0));
   filtered.subscribe(result => console.log(result)); // Sortie : 2, 4
   ```

3. `merge` : combine plusieurs observables en un seul émettant les valeurs de toutes les sources simultanément.

   ```typescript
   import { interval, merge } from 'rxjs';

   const merged = merge(interval(1000), interval(2000));
   merged.subscribe(result => console.log(result));
   ```

4. `concat` : concatène plusieurs observables, émettant les valeurs de façon séquentielle.

   ```typescript
   import { of, concat } from 'rxjs';

   const concatenated = concat(of(1, 2, 3), of(4, 5, 6));
   concatenated.subscribe(result => console.log(result)); // Sortie : 1, 2, 3, 4, 5, 6
   ```

5. `take` : prend un nombre spécifié de valeurs émises par un observable puis se termine.

   ```typescript
   import { interval } from 'rxjs';
   import { take } from 'rxjs/operators';

   const taken = interval(1000).pipe(take(3));
   taken.subscribe(result => console.log(result)); // Sortie : 0, 1, 2
   ```

## Qu'est-ce que l'injection de dépendances dans Angular ?

L'injection de dépendances (DI) est un patron de conception largement utilisé dans Angular. Elle permet de fournir des objets (dépendances) à d'autres objets qui en ont besoin, plutôt que de les créer au sein du composant lui-même. Cela favorise la modularité, la réutilisabilité et la testabilité.

Le système DI d'Angular s'appuie sur le concept de **providers**. Les providers sont responsables de la création et de la gestion des instances de dépendances. Vous définissez les providers au niveau du module ou du composant.

```typescript
import { Component, Injectable } from '@angular/core';

@Injectable()
class DataService {
  getData(): string {
    return 'Bonjour, DI !';
  }
}

@Component({
  selector: 'app-example',
  template: `<h1>{{ message }}</h1>`,
})
class ExampleComponent {
  message: string;

  constructor(private dataService: DataService) {
    this.message = dataService.getData();
  }
}
```

Le système DI d'Angular reconnaît la dépendance `DataService` dans le constructeur et crée automatiquement une instance, qui est alors injectée dans le composant. Angular supporte l'injection par constructeur (recommandée), par propriété et par paramètre de méthode.
