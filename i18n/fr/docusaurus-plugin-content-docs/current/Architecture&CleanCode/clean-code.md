---
sidebar_position: 2
---

import TOCInline from '@theme/TOCInline';

# Code Propre
# <TOCInline toc={toc} />

## Comment gérer le code legacy ?
- Comprendre la base de code.
- Tester le code.
- Documenter et commenter.
- Refactoriser par petites étapes.
- Appliquer les patrons de conception et les principes.
- Collaborer avec les autres développeurs.

## Principes SOLID

1. **Responsabilité Unique** : une classe ne doit avoir qu'une seule responsabilité et qu'une seule raison de changer.
2. **Ouvert/Fermé** : les classes doivent être ouvertes à l'extension mais fermées à la modification, afin d'éviter de modifier du code existant et d'introduire de nouveaux bugs.
3. **Substitution de Liskov** : si la classe A est un sous-type de la classe B, on doit pouvoir remplacer B par A sans perturber le comportement du programme.
4. **Ségrégation des Interfaces** : les grandes interfaces doivent être divisées en interfaces plus petites, afin que les classes d'implémentation n'aient à se préoccuper que des méthodes qui les concernent.
5. **Inversion des Dépendances** : au lieu que les modules de haut niveau dépendent des modules de bas niveau, les deux doivent dépendre d'abstractions.

## Quelle est la différence entre Héritage, Composition, Association et Agrégation ?
- **Héritage** : mécanisme par lequel une sous-classe hérite des propriétés et comportements de sa superclasse.
- **Composition** : relation où une classe contient une instance d'une autre classe comme variable membre.
- **Association** : relation entre deux classes ou plus où les objets d'une classe sont liés aux objets d'une autre classe.
- **Agrégation** : forme spécialisée d'association représentant une relation tout-partie, où un objet (le tout) possède ou contient d'autres objets (les parties).
