---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';

# Tests
# <TOCInline toc={toc} />

## Comment implémenter un test unitaire dans Angular ?

1. **Configurer l'environnement de test** :
   Dans votre fichier de test, importez les dépendances nécessaires pour tester les composants Angular, telles que `TestBed` et le composant à tester.

   ```typescript
   import { TestBed, ComponentFixture } from '@angular/core/testing';
   import { VotreComposant } from './votre-composant.component';
   ```

2. **Configurer le module de test** :
   Utilisez `TestBed.configureTestingModule()` pour configurer le module de test en fournissant les dépendances et déclarations nécessaires. Vous pouvez aussi configurer des providers, importer des modules ou fournir des objets mock.

   ```typescript
   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [VotreComposant],
       // autres options de configuration
     }).compileComponents();
   });
   ```

3. **Créer un fixture de composant** :
   Utilisez `TestBed.createComponent()` pour créer une instance du composant et obtenir une référence au fixture. Le fixture donne accès à l'instance du composant et permet d'interagir avec lui et son template.

   ```typescript
   let component: VotreComposant;
   let fixture: ComponentFixture<VotreComposant>;

   beforeEach(() => {
     fixture = TestBed.createComponent(VotreComposant);
     component = fixture.componentInstance;
   });
   ```

4. **Écrire les cas de test** :
   Utilisez la fonction `it()` de Jasmine pour définir des cas de test individuels. Configurez les données ou conditions nécessaires, exécutez les méthodes du composant et faites des assertions pour vérifier le comportement attendu.

   ```typescript
   it('devrait afficher le bon titre', () => {
     component.title = 'Titre de test';
     fixture.detectChanges();
     const titleElement = fixture.nativeElement.querySelector('.title');
     expect(titleElement.textContent).toContain('Titre de test');
   });
   ```

   Dans cet exemple, nous définissons la propriété `title`, déclenchons la détection des changements avec `fixture.detectChanges()`, puis vérifions que l'élément titre affiché contient le texte attendu.

5. **Exécuter les tests** :
   Utilisez un test runner comme Karma pour exécuter vos tests. Le test runner lancera le navigateur et exécutera vos tests en fournissant les résultats et les erreurs éventuelles.

   Vous pouvez exécuter les tests avec la commande Angular CLI : `ng test`.
