---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Spring Core
# <TOCInline toc={toc} />

## Qu'est-ce que le framework Spring ?
Spring est un framework open-source populaire pour créer des applications Java d'entreprise. Sa philosophie centrale est l'**Inversion de Contrôle (IoC)** — le framework gère la création et l'assemblage des objets, pour que vous puissiez vous concentrer sur la logique métier. Il fournit :

- Un puissant **conteneur IoC** (ApplicationContext)
- **AOP** pour les préoccupations transversales
- **Gestion des transactions**
- Intégration avec JPA, la messagerie, le web, la sécurité, et plus encore

## Quelles sont les fonctionnalités principales de Spring ?

- **IoC / Injection de dépendances** — le conteneur crée et assemble les beans.
- **AOP (Programmation Orientée Aspect)** — modularise les préoccupations transversales.
- **Spring MVC** — framework web basé sur DispatcherServlet.
- **Spring Data** — simplifie l'accès aux données (JPA, MongoDB, Redis, etc.).
- **Spring Security** — authentification et autorisation.
- **Gestion des transactions** — transactions déclaratives avec `@Transactional`.
- **Spring Test** — support de test avec `@SpringBootTest`, mocking, etc.

## Qu'est-ce que l'IoC (Inversion de Contrôle) ?
L'IoC inverse le flux de contrôle : au lieu que votre code crée ses dépendances, le **conteneur Spring** les crée et les injecte. Cela rend le code faiblement couplé et plus facile à tester.

```java
// Sans IoC — couplage fort
class ServiceCommande {
    ServicePaiement paiement = new ServicePaiementCB(); // codé en dur
}

// Avec IoC — Spring crée et injecte ServicePaiement
@Service
class ServiceCommande {
    private final ServicePaiement paiement;
    ServiceCommande(ServicePaiement paiement) { this.paiement = paiement; } // injecté
}
```

## Qu'est-ce que l'injection de dépendances et quels sont ses types ?
L'injection de dépendances (DI) est le mécanisme que Spring utilise pour implémenter l'IoC — il fournit les dépendances d'un bean de l'extérieur.

**1. Injection par constructeur (recommandée)** :
```java
@Service
public class ServiceUtilisateur {
    private final DepotUtilisateur depot;
    public ServiceUtilisateur(DepotUtilisateur depot) { this.depot = depot; }
}
```

**2. Injection par setter** :
```java
@Service
public class ServiceUtilisateur {
    private DepotUtilisateur depot;
    @Autowired
    public void setDepot(DepotUtilisateur depot) { this.depot = depot; }
}
```

**3. Injection par champ** (à éviter — difficile à tester, cache les dépendances) :
```java
@Autowired
private DepotUtilisateur depot;
```

Préférer l'**injection par constructeur** : rend les dépendances explicites, permet les champs `final`, et fonctionne sans Spring dans les tests.

## Qu'est-ce que l'ApplicationContext ?
L'`ApplicationContext` est le conteneur IoC central de Spring. Il gère le cycle de vie complet des beans : création, configuration, assemblage et destruction. Il fournit aussi :

- Publication d'événements (`ApplicationEvent`)
- Internationalisation (`MessageSource`)
- Chargement de ressources
- Accès à l'environnement/propriétés

Implémentations courantes :
- `AnnotationConfigApplicationContext` — pour la configuration Java
- `ClassPathXmlApplicationContext` — pour la configuration XML (héritage)
- `SpringApplication` (Spring Boot) — crée le contexte automatiquement

## Qu'est-ce qu'un Bean Spring ?
Un bean est un objet géré par le conteneur IoC Spring. Les beans sont créés selon des métadonnées de configuration (annotations, configuration Java ou XML).

```java
@Component        // détecté par le scan de composants
public class ServiceEmail { ... }

@Configuration
public class ConfigApp {
    @Bean                            // définition explicite de bean
    public DataSource dataSource() { return new HikariDataSource(...); }
}
```

## Quels sont les différents scopes de bean ?

| Scope | Description |
|---|---|
| `singleton` (défaut) | Une instance par ApplicationContext |
| `prototype` | Nouvelle instance à chaque `getBean()` / injection |
| `request` | Un par requête HTTP (web uniquement) |
| `session` | Un par session HTTP (web uniquement) |
| `application` | Un par ServletContext (web uniquement) |
| `websocket` | Un par session WebSocket |

```java
@Bean
@Scope("prototype")
public GenerateurRapport generateurRapport() { return new GenerateurRapport(); }
```

## Qu'est-ce que l'AOP (Programmation Orientée Aspect) ?
L'AOP sépare les **préoccupations transversales** (journalisation, sécurité, transactions) de la logique métier en tissant du comportement autour des appels de méthodes à l'exécution.

Termes clés :
- **Aspect** : le module contenant la logique transversale.
- **Advice** : quoi faire (`@Before`, `@After`, `@Around`, `@AfterReturning`, `@AfterThrowing`).
- **Pointcut** : quelles méthodes intercepter (expression).
- **JoinPoint** : l'exécution spécifique de la méthode.

```java
@Aspect
@Component
public class AspectJournalisation {

    @Around("execution(* com.exemple.service.*.*(..))")
    public Object chronometrer(ProceedingJoinPoint pjp) throws Throwable {
        long debut = System.currentTimeMillis();
        Object resultat = pjp.proceed();
        long duree = System.currentTimeMillis() - debut;
        System.out.println(pjp.getSignature() + " a pris " + duree + "ms");
        return resultat;
    }
}
```

## Quelle est la différence entre `@Component`, `@Service`, `@Repository` et `@Controller` ?
Les quatre sont des spécialisations de `@Component` — Spring les détecte automatiquement via le scan de composants. La différence est sémantique et active des comportements supplémentaires :

| Annotation | Couche | Comportement supplémentaire |
|---|---|---|
| `@Component` | Générique | Aucun |
| `@Service` | Logique métier | Aucun (marqueur sémantique) |
| `@Repository` | Accès aux données | Traduction d'exceptions (SQL → Spring `DataAccessException`) |
| `@Controller` | Couche web | Active le mapping de requêtes Spring MVC |
| `@RestController` | Couche web | `@Controller` + `@ResponseBody` |

## Quelle est la différence entre `@Bean` et `@Component` ?

- `@Component` (et ses spécialisations) : détecté automatiquement via le **scan du classpath**. Appliqué à la classe elle-même.
- `@Bean` : déclaré dans une classe `@Configuration`. Vous écrivez une méthode de fabrique — utile quand vous ne contrôlez pas la source de la classe (bibliothèques tierces).

```java
@Component
class MonService { ... } // Spring le scanne et le crée

@Configuration
class Config {
    @Bean
    DataSource dataSource() { return new HikariDataSource(config); } // vous contrôlez la création
}
```

## Qu'est-ce que `@Autowired` et comment Spring résout-il l'ambiguïté ?
`@Autowired` indique à Spring d'injecter une dépendance par type. Si plusieurs beans correspondent au type :

1. **`@Primary`** : marquer un bean comme défaut préféré.
2. **`@Qualifier("nom")`** : spécifier le nom exact du bean.

```java
@Primary @Bean DataSource dsPrincipal() { ... }
@Bean DataSource dsSecondaire() { ... }

@Autowired @Qualifier("dsSecondaire")
private DataSource ds; // injecte dsSecondaire
```

## Quel est le cycle de vie d'un Bean Spring ?
1. **Instanciation** — Spring crée l'instance du bean.
2. **Peuplement des propriétés** — injection des dépendances.
3. Callbacks **`BeanNameAware`**, **`BeanFactoryAware`**.
4. **`@PostConstruct`** / `afterPropertiesSet()` — logique d'initialisation.
5. **Bean prêt** — utilisé par l'application.
6. **`@PreDestroy`** / `destroy()` — nettoyage à l'arrêt du contexte.

```java
@Component
public class InitialisateurBD {
    @PostConstruct
    void init() { System.out.println("Connexion à la BD..."); }

    @PreDestroy
    void nettoyage() { System.out.println("Fermeture de la connexion..."); }
}
```

## Que sont les Profiles Spring ?
Les profils permettent d'avoir une **configuration séparée par environnement** (dev, test, prod) :

```java
@Configuration
@Profile("dev")
public class ConfigDataSourceDev {
    @Bean DataSource dataSource() { return new H2DataSource(); }
}

@Configuration
@Profile("prod")
public class ConfigDataSourceProd {
    @Bean DataSource dataSource() { return new PostgresDataSource(); }
}
```

Activer avec : `spring.profiles.active=prod` dans `application.properties`, ou `-Dspring.profiles.active=prod` en argument JVM.

## Qu'est-ce que Spring Actuator ?
Spring Boot Actuator expose des endpoints prêts pour la production pour **surveiller et gérer** votre application :

| Endpoint | Rôle |
|---|---|
| `/actuator/health` | Statut de santé de l'application |
| `/actuator/info` | Informations sur l'application (version, etc.) |
| `/actuator/metrics` | Métriques JVM, HTTP, personnalisées |
| `/actuator/beans` | Tous les beans enregistrés |
| `/actuator/env` | Propriétés d'environnement |
| `/actuator/loggers` | Voir/modifier les niveaux de log |
| `/actuator/threaddump` | Dump de threads |

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics
```

## Quelle est la différence entre Spring et Jakarta EE ?

- **Spring** : framework léger, peut tourner dans n'importe quel conteneur servlet (Tomcat). Offre un modèle de programmation unifié, un écosystème riche (Boot, Cloud, Security). Convention over configuration.
- **Jakarta EE** : piloté par des spécifications, nécessite un serveur d'application conforme (WildFly, GlassFish). Plus standardisé mais plus lourd. CDI pour la DI, EJBs pour les transactions.

En pratique, Spring (surtout Spring Boot) domine le développement Java moderne grâce à son expérience développeur et son écosystème.
