---
sidebar_position: 4
---
import TOCInline from '@theme/TOCInline';

# Spring Web
# <TOCInline toc={toc} />

## Qu'est-ce que Spring Web ?
Spring Web est un **module** du Spring Framework qui fournit un support pour la **création d'applications web**. Il offre des fonctionnalités et abstractions pour simplifier le **développement** d'applications **web**, de services **RESTful** et d'**API** dans l'écosystème Java.

Spring Web fournit plusieurs **composants et fonctionnalités clés** :

1. **DispatcherServlet** : servlet central de Spring Web. Agit comme contrôleur frontal, recevant et distribuant les requêtes aux gestionnaires appropriés selon les mappings d'URL et autres configurations.

2. **Framework MVC** : Spring Web suit le patron Model-Vue-Contrôleur (MVC). Il permet de séparer les préoccupations en définissant des contrôleurs pour gérer les requêtes, des modèles pour représenter les données, et des vues pour afficher la réponse.

3. **Handler Mapping** : Spring Web inclut diverses stratégies de mapping pour associer les requêtes entrantes aux méthodes de contrôleur appropriées selon les patterns d'URL, les méthodes HTTP ou d'autres critères.

4. **Résolution de vues** : Spring Web s'intègre avec différentes technologies de vue (JSP, Thymeleaf, FreeMarker) et fournit des mécanismes pour résoudre et afficher les vues.

5. **Gestion des requêtes/réponses** : Spring Web fournit des abstractions pour gérer les objets requête et réponse, incluant la négociation de contenu, les convertisseurs de messages HTTP et les intercepteurs.

6. **Services Web RESTful** : Spring Web inclut des fonctionnalités spécifiquement conçues pour les services et API REST, avec des annotations comme `@RestController`, `@RequestMapping` et `@PathVariable` pour simplifier le développement d'endpoints RESTful.

7. **Intégration avec les autres modules Spring** : Spring Web s'intègre naturellement avec Spring Data, Spring Security et Spring Boot, vous permettant de bénéficier de fonctionnalités supplémentaires pour l'accès aux données, la sécurité et la configuration.
