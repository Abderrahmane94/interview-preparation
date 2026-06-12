---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';


# Formulaires
# <TOCInline toc={toc} />

## Formulaires Angular : Template-driven et Reactive
- Les formulaires **Template-driven** sont plus faciles à mettre en place et nécessitent moins de code, mais peuvent être plus difficiles à personnaliser et à tester.
- Les formulaires **Reactive** offrent plus de contrôle et de flexibilité, et permettent une validation plus complexe et la création de contrôles de formulaire personnalisés.

## Comment implémenter des formulaires dans Angular ?
Pour implémenter des formulaires dans Angular, voici les étapes générales :

1. **Créer un composant** : créez un composant Angular qui contiendra votre formulaire avec `ng generate component`.

2. **Importer FormsModule ou ReactiveFormsModule** : dans votre module, importez `FormsModule` (pour les formulaires template-driven) ou `ReactiveFormsModule` (pour les formulaires réactifs) depuis `@angular/forms`.

3. **Définir la structure du formulaire** : déclarez la structure du formulaire dans votre classe de composant. Pour les formulaires template-driven, utilisez `ngModel` et les directives `ngForm`/`ngSubmit` dans le template HTML. Pour les formulaires réactifs, utilisez `FormGroup`, `FormControl` et `FormBuilder` dans la classe de composant.

4. **Lier les contrôles de formulaire** : liez les contrôles aux propriétés du composant. Pour les formulaires template-driven, utilisez la liaison bidirectionnelle avec `ngModel`. Pour les formulaires réactifs, créez et gérez les contrôles programmatiquement avec des instances `FormControl`.

5. **Gérer la soumission** : pour les formulaires template-driven, utilisez l'événement `(ngSubmit)` sur l'élément formulaire. Pour les formulaires réactifs, souscrivez aux observables `valueChanges` ou `statusChanges` du `FormGroup`.

6. **Appliquer la validation** : utilisez les validateurs intégrés (`required`, `minLength`, `maxLength`, etc.) ou créez des validateurs personnalisés sous forme de fonctions retournant une fonction de validation.

7. **Afficher les erreurs** : utilisez les directives `ngModel`, `ngForm` et `formControlName` pour afficher conditionnellement les messages d'erreur selon la validité du contrôle.

8. **Soumettre les données** : une fois le formulaire rempli et validé, soumettez les données à un serveur ou effectuez les actions souhaitées en utilisant le module `HttpClient` d'Angular pour interagir avec les API.
