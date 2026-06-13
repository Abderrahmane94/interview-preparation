
import TOCInline from '@theme/TOCInline';

# Maven

# <TOCInline toc={toc} />

## Qu'est-ce que Maven ?
Maven est un **outil de build** pour les projets Java qui **gère** les dépendances et construit les projets à partir d'un fichier de modèle de projet (**POM**). Il simplifie le processus de build et repose sur la convention plutôt que la configuration.

## Qu'est-ce que le fichier pom.xml ?
`pom.xml` (Project Object Model) est le fichier de configuration central utilisé par Maven pour construire le projet. Il contient :
- Les coordonnées du projet (`groupId`, `artifactId`, `version`)
- Les **dépendances** requises par le projet
- Les **plugins** et **goals**
- Le type de packaging (`<packaging>jar</packaging>` ou `war`)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.2.0</version>
</dependency>
```

## Quels sont les dépôts Maven ?
- **Dépôt local** : répertoire sur la machine du développeur (`~/.m2/repository`). Maven y télécharge les dépendances une seule fois et les réutilise sur tous les projets.
- **Dépôt central** : dépôt public de Maven sur internet où la plupart des bibliothèques open-source sont publiées.
- **Dépôt distant** : dépôt interne à l'entreprise (ex. Nexus, Artifactory) pour partager des artefacts propriétaires au sein d'une organisation.

Quand Maven a besoin d'une dépendance, il cherche dans l'ordre : **dépôt local → dépôt distant → dépôt central**.

## Quels sont les scopes Maven ?
Les scopes Maven contrôlent quand une dépendance est disponible sur le classpath :

| Scope | Compilation | Test | Runtime | Packagé |
|---|---|---|---|---|
| `compile` (défaut) | ✅ | ✅ | ✅ | ✅ |
| `provided` | ✅ | ✅ | ❌ | ❌ |
| `runtime` | ❌ | ✅ | ✅ | ✅ |
| `test` | ❌ | ✅ | ❌ | ❌ |
| `system` | ✅ | ✅ | ❌ | ❌ |

`provided` est utilisé pour les dépendances fournies par le conteneur à l'exécution (ex. API Servlet dans Tomcat).
`test` est pour les bibliothèques de test uniquement comme JUnit, Mockito.

## Que sont les dépendances transitives dans Maven ?
Les dépendances transitives sont des dépendances **indirectement requises** via vos dépendances directes. Si votre projet dépend de la Bibliothèque A, et que la Bibliothèque A dépend de la Bibliothèque B, Maven inclut automatiquement la Bibliothèque B.

Vous pouvez exclure une dépendance transitive avec :
```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>library-a</artifactId>
    <exclusions>
        <exclusion>
            <groupId>com.unwanted</groupId>
            <artifactId>library-b</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## Quelles sont les phases du cycle de vie Maven ?
Le cycle de vie de build Maven par défaut comporte ces phases (chaque phase déclenche toutes les précédentes) :

1. **validate** — vérifie que le projet est correct et que toutes les informations sont disponibles
2. **compile** — compile le code source
3. **test** — exécute les tests unitaires
4. **package** — empaquette le code compilé en JAR/WAR
5. **verify** — exécute les tests d'intégration et les contrôles de qualité
6. **install** — installe le package dans le dépôt local
7. **deploy** — copie le package vers le dépôt distant

```bash
mvn package        # exécute validate → compile → test → package
mvn clean install  # nettoie les artefacts précédents, puis execute jusqu'à install
mvn clean deploy   # build complet + envoi vers le dépôt distant
```

`mvn clean` supprime le répertoire `/target` (sorties compilées). Utilisez toujours `clean` avant `install`/`deploy` pour un build fiable.
