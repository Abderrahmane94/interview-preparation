---
sidebar_position: 2
---
import TOCInline from '@theme/TOCInline';

# Spring Boot
# <TOCInline toc={toc} />

## Quels sont les composants clés de Spring Boot ?
- **Auto-configuration** : configure automatiquement les beans Spring selon les dépendances du classpath.
- **Starter POMs** : ensembles de dépendances prédéfinis (ex. `spring-boot-starter-web` inclut Tomcat + Spring MVC + Jackson).
- **Serveur embarqué** : Tomcat, Jetty ou Undertow inclus dans le JAR — pas de déploiement externe nécessaire.
- **Spring Boot Actuator** : endpoints de surveillance en production.
- **Spring Boot CLI** : exécuter des scripts Groovy comme des applications Spring.
- **Configuration externalisée** : `application.properties` / `application.yml` avec profils par environnement.

## Quelle est la différence entre Spring et Spring Boot ?

| | Spring | Spring Boot |
|---|---|---|
| Configuration | Explicite (XML ou Java) | Auto-configurée |
| Serveur | Externe (déployer WAR) | Embarqué (exécuter comme JAR) |
| Dépendances | Gestion manuelle des versions | Gérées via le POM parent |
| Démarrage | Configuration plus longue | Opérationnel en minutes |
| Code redondant | Plus | Minimal |

Spring Boot ne remplace pas Spring — c'est une couche au-dessus qui applique des valeurs par défaut opinionées pour être productif plus vite, tout en conservant un accès complet aux APIs Spring.

## Que fait `@SpringBootApplication` ?
C'est une annotation de commodité qui combine trois annotations :

```java
@SpringBootApplication
// équivalent à :
@Configuration          // source de définitions de beans
@EnableAutoConfiguration // déclenche l'auto-configuration Spring Boot
@ComponentScan          // scanne le package courant et les sous-packages pour @Component
public class MonApp {
    public static void main(String[] args) {
        SpringApplication.run(MonApp.class, args);
    }
}
```

## Comment fonctionne l'auto-configuration de Spring Boot ?
1. `@EnableAutoConfiguration` déclenche un scan de `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`.
2. Spring Boot trouve toutes les classes `@AutoConfiguration` sur le classpath.
3. Chaque classe d'auto-configuration est annotée avec des conditions `@ConditionalOn*` — elle ne s'active que si la condition est remplie.

```java
// Exemple : DataSource est auto-configurée uniquement si HikariCP est sur le classpath
// et qu'aucun bean DataSource personnalisé n'est défini
@AutoConfiguration
@ConditionalOnClass(HikariDataSource.class)
@ConditionalOnMissingBean(DataSource.class)
class HikariDataSourceAutoConfiguration { ... }
```

Voir ce qui a été auto-configuré (et pourquoi) avec le flag `--debug` ou l'endpoint `/actuator/conditions`.

## Quelles sont les principales annotations Spring Boot ?

| Annotation | Rôle |
|---|---|
| `@SpringBootApplication` | Point d'entrée : config + scan + auto-config |
| `@RestController` | `@Controller` + `@ResponseBody` |
| `@RequestMapping` / `@GetMapping` | Mapper des requêtes HTTP à des méthodes |
| `@PathVariable` | Lier une variable de template URI |
| `@RequestParam` | Lier un paramètre de requête |
| `@RequestBody` | Désérialiser le corps de requête (JSON → objet) |
| `@ResponseBody` | Sérialiser la valeur de retour vers le corps de réponse |
| `@Service` | Bean de couche métier |
| `@Repository` | Bean de couche données + traduction d'exceptions |
| `@Configuration` | Source de définitions de beans |
| `@Bean` | Déclare un bean géré dans une classe `@Configuration` |
| `@Value` | Injecter une valeur de propriété |
| `@ConfigurationProperties` | Lier un groupe de propriétés à une classe |
| `@Transactional` | Encapsuler la méthode dans une transaction base de données |
| `@Profile` | Activer le bean uniquement pour un profil spécifique |

## Comment externaliser la configuration dans Spring Boot ?
Spring Boot charge la configuration depuis plusieurs sources dans un ordre de priorité (le plus haut remplace le plus bas) :

1. Arguments de ligne de commande (`--server.port=9090`)
2. Variables d'environnement OS
3. `application-{profil}.properties`
4. `application.properties` / `application.yml`
5. Valeurs par défaut dans `@Value` / `@ConfigurationProperties`

```yaml
# application.yml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:postgresql://localhost/mabd
    username: ${DB_USER}    # depuis variable d'environnement
```

```java
@ConfigurationProperties(prefix = "app")
@Component
public class PropriétésApp {
    private String nom;
    private int maxTentatives = 3;
    // getters/setters
}
```

## Quelle est la différence entre `application.properties` et `application.yml` ?
Les deux configurent les mêmes propriétés — YAML est un format différent qui supporte les **clés imbriquées** de manière plus lisible.

```properties
# application.properties
spring.datasource.url=jdbc:h2:mem:test
spring.jpa.hibernate.ddl-auto=create
```
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:h2:mem:test
  jpa:
    hibernate:
      ddl-auto: create
```

YAML gère aussi les listes plus proprement. Les deux peuvent coexister ; `.properties` a la priorité si au même niveau.

## Comment Spring Boot gère-t-il les serveurs embarqués ?
Par défaut, `spring-boot-starter-web` inclut **Tomcat embarqué**. Quand vous exécutez `mvn spring-boot:run` ou le JAR, Spring Boot démarre le serveur par programme — pas de déploiement WAR nécessaire.

```xml
<!-- Passer à Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

## Qu'est-ce que Spring Boot DevTools ?
`spring-boot-devtools` est un outil d'expérience développeur qui :
- **Redémarre automatiquement** l'application lors de modifications du classpath.
- **LiveReload** — rafraîchit le navigateur lors de modifications de ressources.
- Désactive la mise en cache des templates pendant le développement.
- Fournit des informations de débogage supplémentaires.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

Exclu automatiquement des builds de production.

## Qu'est-ce que `@ControllerAdvice` ?
`@ControllerAdvice` est une spécialisation de `@Component` qui permet de définir une **gestion globale des exceptions**, des attributs de modèle et une initialisation des binders s'appliquant à toutes les classes `@Controller` — évitant la duplication de `@ExceptionHandler` dans chaque contrôleur.

```java
@ControllerAdvice
public class GestionnaireExceptionsGlobal {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErreurReponse> gererNonTrouve(ResourceNotFoundException ex) {
        return ResponseEntity.status(404)
            .body(new ErreurReponse(ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErreurReponse> gererGenerique(Exception ex) {
        return ResponseEntity.status(500)
            .body(new ErreurReponse("Erreur interne"));
    }
}
```

Utilisez `@RestControllerAdvice` (= `@ControllerAdvice` + `@ResponseBody`) pour les APIs REST afin de sérialiser automatiquement les réponses d'erreur en JSON.

## Qu'est-ce que `@Transactional` et comment fonctionne-t-il ?
`@Transactional` enveloppe une méthode dans une transaction de base de données. Spring utilise l'AOP pour créer un proxy autour du bean — avant l'exécution de la méthode, il ouvre une transaction ; après son exécution, il la commit ; si une `RuntimeException` est levée, il effectue un rollback.

```java
@Service
public class ServiceCommande {

    @Transactional                          // commit en cas de succès, rollback sur RuntimeException
    public void passerCommande(Commande commande) {
        depotCommande.save(commande);
        serviceInventaire.reduireStock(commande); // si cela lève une exception, save() est annulé
    }

    @Transactional(readOnly = true)         // indice pour l'optimiseur, désactive le dirty checking
    public List<Commande> getCommandes() { ... }

    @Transactional(rollbackFor = ExceptionVerifiee.class) // rollback sur exception vérifiée aussi
    public void traiter() throws ExceptionVerifiee { ... }
}
```

Propriétés clés : `propagation` (REQUIRED, REQUIRES_NEW, etc.), `isolation`, `readOnly`, `rollbackFor`, `timeout`.

## Pourquoi `@Transactional` peut-il ne pas fonctionner lorsqu'il est appelé depuis une autre méthode du même bean ?
Spring implémente `@Transactional` via un **proxy AOP**. Un appel d'une méthode à une autre **sur le même objet** (`this.inner()`) est une **auto-invocation** : il contourne le proxy, donc l'annotation de la méthode interne n'est **pas interceptée** et ses paramètres (propagation, règles de rollback…) sont ignorés.

Solutions :
- Placer la frontière transactionnelle sur la méthode **externe**.
- Déplacer la méthode transactionnelle dans **un autre bean Spring** et l'appeler via le proxy de ce bean.

Nuance : si la méthode externe s'exécute déjà dans une transaction, la méthode interne s'exécute toujours **dans cette transaction existante** — seule sa propre annotation est ignorée.

## Que se passe-t-il si `@Transactional` est placé sur une méthode privée ?
Avec le mécanisme standard de Spring basé sur les proxys, une **méthode privée ne peut pas être interceptée**, donc l'annotation ne démarre **pas** de transaction. Placer la frontière sur une méthode publique d'un bean Spring appelée de l'extérieur (via le proxy).

## Quelle est la différence entre la propagation `REQUIRED` et `REQUIRES_NEW` ?
- **`REQUIRED`** (par défaut) : **rejoint** la transaction existante, ou en crée une s'il n'y en a pas.
- **`REQUIRES_NEW`** : **suspend** la transaction existante et en démarre une **indépendante** — elle peut être committée même si la transaction externe est ensuite annulée (usage typique : journal d'audit).

Comme tout paramètre de `@Transactional`, cela ne s'applique que si l'appel passe **par le proxy** (pas en auto-invocation).

## Une méthode interne `REQUIRED` lève une `RuntimeException` que la méthode externe attrape — que se passe-t-il ?
Les deux méthodes partagent **la même transaction**. Quand l'exception runtime sort de la frontière transactionnelle de la méthode interne, Spring marque la transaction partagée comme **rollback-only**.

Même si la méthode externe attrape l'exception et continue normalement, la transaction **ne peut pas être committée** : à la fin, Spring effectue un rollback et lève **`UnexpectedRollbackException`**.

**Rollback-only** est un *statut* de transaction (pas une exception) signifiant « cette transaction doit être annulée ». Attraper l'exception ne le **réinitialise pas**. Si le travail interne doit pouvoir échouer indépendamment, utiliser `REQUIRES_NEW` ou ne pas laisser l'exception traverser une frontière transactionnelle.

## Pourquoi un virement bancaire doit-il utiliser une seule transaction de base de données ?
Débiter un compte et créditer l'autre doit être **atomique**. Avec deux transactions séparées, le débit pourrait être committé alors que le crédit échoue → l'argent disparaît et les comptes sont incohérents. Une seule transaction garantit que les deux modifications sont **committées ensemble ou annulées ensemble**.

```java
@Transactional
public void transfer(Long fromId, Long toId, BigDecimal amount) {
    accountRepo.findById(fromId).orElseThrow().debit(amount);
    accountRepo.findById(toId).orElseThrow().credit(amount);
}
```

## Comment écrire un test Spring Boot ?

```java
// Test d'intégration avec contexte complet
@SpringBootTest
class ServiceUtilisateurIntegrationTest {
    @Autowired ServiceUtilisateur serviceUtilisateur;

    @Test
    void devraitCreerUtilisateur() {
        Utilisateur utilisateur = serviceUtilisateur.creer("Alice");
        assertThat(utilisateur.getNom()).isEqualTo("Alice");
    }
}

// Test de tranche — uniquement la couche web
@WebMvcTest(ControleurUtilisateur.class)
class ControleurUtilisateurTest {
    @Autowired MockMvc mvc;
    @MockBean ServiceUtilisateur serviceUtilisateur;

    @Test
    void devraitRetourner200() throws Exception {
        when(serviceUtilisateur.trouverParId(1L)).thenReturn(new Utilisateur("Alice"));
        mvc.perform(get("/utilisateurs/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.nom").value("Alice"));
    }
}
```
