---
sidebar_position: 1
title: Transactions Spring, JPA & Verrouillage
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import TOCInline from '@theme/TOCInline';

# Transactions Spring, JPA & Verrouillage — Exercices

**Comment utiliser cette page :** lisez le code ou le scénario, répondez **à voix haute** comme en entretien, puis cliquez sur **Solution** pour vérifier.
Une bonne structure de réponse : *définir le concept → expliquer le problème → court exemple → un compromis → le relier à un cas de production.*

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={3} />

## Partie 1 — Revue de code : trouvez le bug

### Exercice 1 — Méthode transactionnelle privée
Qu'est-ce qui ne va pas dans ce code ?

```java
@Service
public class InvoiceService {
    public void createInvoice() {
        saveInvoice();
    }

    @Transactional
    private void saveInvoice() {
        // Insertion de la facture et de ses lignes.
    }
}
```

<details>
<summary>Solution</summary>

Deux problèmes : la méthode est **privée** et elle est appelée par **auto-invocation** (`this.saveInvoice()`). Le proxy Spring n'intercepte ni l'une ni l'autre, donc **aucune transaction n'est démarrée** — si l'insertion d'une ligne échoue, la facture peut déjà être enregistrée.

**Correction :** placer `@Transactional` sur la méthode publique appelée de l'extérieur (`createInvoice()`), ou déplacer `saveInvoice()` dans un autre bean Spring et l'appeler via ce bean.

</details>

### Exercice 2 — Exception checked
Le fichier est invalide. Le `DataRecord` est-il enregistré ?

```java
@Transactional
public void importData() throws IOException {
    repository.save(new DataRecord());
    throw new IOException("Invalid input");
}
```

<details>
<summary>Solution</summary>

**Oui, il est committé.** Par défaut, Spring fait un rollback uniquement sur `RuntimeException` et `Error` — **pas sur les exceptions checked** comme `IOException`.

**Correction :** `@Transactional(rollbackFor = IOException.class)` (ou `rollbackFor = Exception.class`). L'option inverse, `noRollbackFor`, liste les exceptions qui ne doivent *pas* déclencher de rollback.

</details>

### Exercice 3 — Auto-invocation et `REQUIRES_NEW`
Objectif : la ligne d'audit doit être enregistrée même si `runJob()` échoue. Est-ce que ça marche ?

```java
@Service
public class JobService {
    @Transactional
    public void runJob() {
        saveAudit();
        // ... traitement pouvant lever une exception
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveAudit() {
        // Insertion de l'audit
    }
}
```

<details>
<summary>Solution</summary>

**Non.** `saveAudit()` est appelée en interne sur `this`, ce qui **contourne le proxy** — `REQUIRES_NEW` est ignoré et l'insertion d'audit s'exécute **dans la transaction de `runJob()`**. Si le traitement échoue, la ligne d'audit est aussi annulée.

**Correction :** déplacer `saveAudit()` dans un bean `AuditService` séparé et l'injecter. Elle s'exécute alors dans sa propre transaction B, committée indépendamment de A.

</details>

### Exercice 4 — Attraper l'exception interne
`reserve()` échoue, mais `checkout()` attrape l'exception. Que se passe-t-il quand `checkout()` se termine ?

```java
@Service
public class CheckoutService {
    private final InventoryService inventory;

    public CheckoutService(InventoryService inventory) {
        this.inventory = inventory;
    }

    @Transactional
    public void checkout() {
        try {
            inventory.reserve();
        } catch (RuntimeException ex) {
            // log et on continue
        }
    }
}

@Service
public class InventoryService {
    @Transactional // REQUIRED par défaut
    public void reserve() {
        throw new IllegalStateException("Cannot reserve");
    }
}
```

<details>
<summary>Solution</summary>

Les deux méthodes partagent **une seule transaction physique** (`REQUIRED`). Quand l'exception sort de `reserve()` via le proxy, l'intercepteur marque la transaction partagée **rollback-only**. Attraper l'exception **n'efface pas** ce marqueur.

Quand `checkout()` tente de committer, Spring fait un rollback et lève **`UnexpectedRollbackException`** — l'appelant pense que tout a réussi, mais rien n'est enregistré.

**Corrections :** laisser l'exception se propager ; ou passer `reserve()` en `REQUIRES_NEW` si elle doit vraiment être indépendante ; ou ne pas lever d'exception à travers une frontière transactionnelle (renvoyer un résultat).

</details>

### Exercice 5 — Décrément de stock concurrent
Deux requêtes appellent cette méthode en même temps pour le même produit. Que peut-il mal se passer ?

```java
@Transactional
public void decreaseStock(Long id, int amount) {
    Inventory inventory = repository.findById(id).orElseThrow();
    inventory.setQuantity(inventory.getQuantity() - amount);
}
```

<details>
<summary>Solution</summary>

Une **mise à jour perdue (lost update)** : les deux transactions lisent la même quantité et la dernière écriture écrase la première. Il n'y a pas non plus de contrôle contre un stock négatif (survente).

**Corrections :**
- **Verrouillage optimiste** : ajouter `@Version` — le second update touche 0 ligne et échoue avec une exception de verrouillage optimiste.
- **Verrouillage pessimiste** : charger avec `@Lock(PESSIMISTIC_WRITE)` (`SELECT … FOR UPDATE`) pour que la seconde transaction attende.
- **Update conditionnel atomique** : `UPDATE inventory SET quantity = quantity - :amount WHERE id = :id AND quantity >= :amount` et vérifier le nombre de lignes modifiées.

</details>

### Exercice 6 — Ignorer la valeur de retour de `merge()`
Le nouveau nom est-il enregistré ?

```java
Product detached = loadDetachedProduct();
entityManager.merge(detached);
detached.setName("New name");
```

<details>
<summary>Solution</summary>

**Non.** `merge()` copie l'état dans une instance **managed** et **la renvoie** ; l'objet passé en paramètre **reste detached**, donc ses modifications ne sont pas suivies.

```java
Product managed = entityManager.merge(detached);
managed.setName("New name"); // suivi par le dirty checking
```

</details>

### Exercice 7 — Confondre flush et commit
Un collègue affirme : « J'ai appelé `flush()`, donc le produit est en base même si la méthode échoue. » Vrai ?

```java
@Transactional
public void save() {
    repository.save(new Product());
    entityManager.flush();
    throw new RuntimeException("Failure after flush");
}
```

<details>
<summary>Solution</summary>

**Faux.** `flush()` **envoie le SQL** mais **ne committe pas**. L'exception unchecked provoque un rollback, qui annule aussi l'`INSERT` flushé.

Idem pour `saveAndFlush()` de Spring Data JPA : il force un flush, jamais un commit.

</details>

### Exercice 8 — Chargement lazy après la transaction
Ce contrôleur lève parfois une exception. Laquelle, et pourquoi ?

```java
@GetMapping("/orders/{id}/customer-name")
public String customerName(@PathVariable Long id) {
    Order order = orderService.findById(id); // @Transactional(readOnly = true) dans le service
    return order.getCustomer().getName();     // customer est LAZY
}
```

<details>
<summary>Solution</summary>

**`LazyInitializationException`** : la transaction (et le contexte de persistance) s'est terminée au retour de `findById()`, donc le proxy lazy `customer` ne peut plus être initialisé. (Cela peut « marcher » uniquement si Open Session in View est activé — ne pas compter dessus.)

**Correction :** charger ce dont le cas d'usage a besoin **dans la transaction du service** (`JOIN FETCH` / `@EntityGraph`) et renvoyer un **DTO** plutôt que l'entité.

</details>

### Exercice 9 — Liste de commandes lente
Cet endpoint est très lent avec 100 commandes. Pourquoi ?

```java
@Transactional(readOnly = true)
public List<OrderDto> list() {
    return orderRepository.findAll().stream()
        .map(o -> new OrderDto(o.getId(), o.getCustomer().getName())) // customer est LAZY
        .toList();
}
```

<details>
<summary>Solution</summary>

**Requêtes N+1 :** 1 requête pour les commandes + 1 requête par commande pour charger son client = **101 requêtes**.

**Correction :** un fetch join, un entity graph, une projection DTO ou le batch fetching :

```java
@Query("select o from Order o join fetch o.customer")
List<Order> findAllWithCustomer();
```

Ne pas passer l'association en `EAGER` partout, et attention aux fetch joins sur **collections** + pagination.

</details>

### Exercice 10 — Mise à jour en base + Kafka
Cette méthode est-elle sûre ?

```java
@Transactional
public void createOrder(CreateOrderCommand command) {
    Order order = orderRepository.save(Order.create(command));
    kafkaTemplate.send("orders", order.getId().toString(), new OrderCreated(order.getId()));
}
```

<details>
<summary>Solution</summary>

**Non.** `@Transactional` couvre **uniquement la base de données** — l'enregistrement et l'envoi Kafka ne sont pas atomiques :
- L'envoi Kafka réussit mais le commit échoue → les consommateurs voient une commande qui n'existe pas.
- Le commit réussit mais l'envoi Kafka échoue → la commande existe mais personne n'est notifié.

**Correction : Transactional Outbox.** Enregistrer la commande **et** une ligne `OutboxEvent` dans la même transaction ; un publisher séparé (polling ou CDC/Debezium) envoie les lignes de l'outbox vers Kafka. La publication peut avoir lieu plusieurs fois, donc **les consommateurs doivent être idempotents**.

</details>

### Exercice 11 — Consommateur idempotent en concurrence
Le même événement peut être livré deux fois, éventuellement en même temps sur deux instances. Ce handler est-il sûr ?

```java
@Transactional
public void handle(OrderCreated event) {
    if (processedEventRepository.existsById(event.eventId())) {
        return;
    }
    orderProjectionRepository.updateFrom(event);
    processedEventRepository.save(new ProcessedEvent(event.eventId()));
}
```

<details>
<summary>Solution</summary>

**Presque.** Les doublons séquentiels sont gérés, et la mise à jour métier et le marqueur « traité » sont committés dans la **même transaction** (correct). Mais deux livraisons **concurrentes** peuvent toutes deux passer `existsById()` avant que l'une ne committe.

**Correction :** ajouter une **contrainte d'unicité / clé primaire sur l'ID d'événement** dans la table des événements traités. La seconde transaction échoue alors à l'insertion et annule sa mise à jour métier.

</details>

## Partie 2 — Scénarios : prédire et concevoir

### Scénario 1 — Lost update en chiffres
Le stock vaut **10**. La transaction A lit 10, la transaction B lit 10. A retire 2 et écrit. B retire 3 et écrit. Quel est le stock final, et que devrait-il être ?

<details>
<summary>Solution</summary>

Valeur finale : **7** (B écrase le 8 de A). Valeur correcte : **5**. La mise à jour de A est **perdue** car B a écrit une valeur calculée à partir d'une **lecture périmée**.

Avec `@Version`, l'update de B toucherait 0 ligne → exception de verrouillage optimiste → B recharge (stock 8) et réessaie → 5.

</details>

### Scénario 2 — `REQUIRED` vs `REQUIRES_NEW`
`OrderService.createOrder()` (transaction A) appelle `auditService.recordAttempt()` via le bean injecté, puis lève une `RuntimeException`. La ligne d'audit est-elle enregistrée si `recordAttempt()` utilise **(a)** `REQUIRED`, **(b)** `REQUIRES_NEW` ?

<details>
<summary>Solution</summary>

- **(a) `REQUIRED`** : l'audit rejoint la transaction A → **annulé** avec la commande.
- **(b) `REQUIRES_NEW`** : A est suspendue, l'audit s'exécute dans la transaction B qui est **committée** → la ligne d'audit **survit** au rollback de A.

N'utiliser `REQUIRES_NEW` que si le commit indépendant est voulu (audit, journal d'erreurs) : il faut une **seconde connexion** pendant que A est suspendue, ce qui augmente la pression sur le pool de connexions.

</details>

### Scénario 3 — « Personne ne peut lire cette ligne »
Un développeur affirme : « Après `PESSIMISTIC_WRITE`, personne ne peut lire cette ligne avant mon commit. » Correct ?

<details>
<summary>Solution</summary>

**Pas forcément.** Les demandes de verrou incompatibles (`FOR UPDATE`) et les écritures sont bloquées, mais dans des bases comme PostgreSQL un **`SELECT` ordinaire lit toujours la dernière version committée** (MVCC). Le comportement exact dépend de la base et du niveau d'isolation.

</details>

### Scénario 4 — Le dernier article en stock
Deux utilisateurs cliquent sur « Acheter » pour le dernier article au même instant. Comment garantir qu'un seul réussisse ?

<details>
<summary>Solution</summary>

Options (selon la contention) :
1. **Update conditionnel atomique** — le plus simple et très efficace :
   ```sql
   UPDATE inventory SET quantity = quantity - :amount
   WHERE id = :id AND quantity >= :amount;
   ```
   1 ligne modifiée → réservé ; 0 ligne → rupture de stock (ou article inexistant — distinguer si l'API en a besoin).
2. **Verrouillage optimiste** (`@Version`) + retry borné — adapté quand les conflits sont rares.
3. **Verrou pessimiste** (`PESSIMISTIC_WRITE`) avec une transaction courte — adapté aux articles très demandés (forte contention).

</details>

### Scénario 5 — Deadlock
La transaction A verrouille le compte 1 puis veut le compte 2. La transaction B verrouille le compte 2 puis veut le compte 1. Que se passe-t-il, et comment réduire le risque ?

<details>
<summary>Solution</summary>

Un **deadlock** : chacune attend un verrou détenu par l'autre. La base le détecte et annule l'une des transactions.

Réduire le risque :
- Acquérir les verrous dans un **ordre cohérent** (ex. toujours verrouiller l'ID de compte le plus petit en premier).
- Garder des transactions **courtes** ; pas d'appels distants/HTTP en détenant des verrous.
- Utiliser des **retries bornés** pour les opérations rejouables sans risque.

Le verrouillage pessimiste n'empêche **pas** les deadlocks à lui seul — il peut même les rendre plus probables.

</details>

### Scénario 6 — Isolation d'une transaction rejointe
`reportService.generate()` est annotée `@Transactional(isolation = Isolation.REPEATABLE_READ)` et est appelée depuis une méthode qui s'exécute déjà dans une transaction `READ_COMMITTED` (propagation `REQUIRED` par défaut). Quel niveau d'isolation s'applique ?

<details>
<summary>Solution</summary>

**`READ_COMMITTED`** — celui de la transaction externe. L'isolation est choisie au **démarrage** d'une transaction ; une méthode qui **rejoint** une transaction existante ne peut pas changer son niveau d'isolation. Pour obtenir `REPEATABLE_READ`, la méthode doit démarrer elle-même la transaction (être le point d'entrée, ou utiliser `REQUIRES_NEW`).

</details>

### Scénario 7 — `synchronized` contre la survente
Pour corriger la survente, un développeur ajoute `synchronized` sur `decreaseStock()`. L'application tourne sur **3 instances** derrière un load balancer. Le problème est-il résolu ?

<details>
<summary>Solution</summary>

**Non.** Un moniteur Java ne coordonne que les threads **d'une même JVM**. Les requêtes sur des instances différentes (et les autres clients de la base) ne sont pas coordonnées. De plus, cela sérialise tous les produits, pas seulement le même.

Utiliser un contrôle de concurrence **au niveau de la base** : `@Version`, un verrou pessimiste, ou un `UPDATE` conditionnel atomique.

</details>

### Scénario 8 — Retry automatique sur verrou optimiste
Sur `OptimisticLockException`, un développeur veut rejouer automatiquement toute la méthode `placeOrder()`, qui envoie aussi un email de confirmation. Bonne idée ?

<details>
<summary>Solution</summary>

**Pas aveuglément.** Ne réessayer que si l'opération est **rejouable sans risque** et qu'elle **recharge un état frais**. Ici, le retry pourrait envoyer l'email **deux fois**, ou masquer un vrai conflit métier (ex. le prix a changé).

Utiliser des **retries bornés avec backoff** sur la partie base uniquement, déplacer les effets de bord après le commit (ex. outbox), ou renvoyer un conflit à l'appelant (HTTP `409`) pour qu'il rafraîchisse.

</details>

### Scénario 9 — Compensation dans une Saga
L'Order service crée la commande, le Payment service débite le client, puis l'Inventory service échoue à réserver le stock. Que doit-il se passer ?

<details>
<summary>Solution</summary>

Exécuter des **actions compensatoires** : rembourser le paiement et annuler la commande. Ce **n'est pas un rollback distribué** — le paiement a été committé ; le remboursement est une **nouvelle opération métier** qui peut elle-même échouer et doit être rejouée / surveillée (et être idempotente).

La coordonner par **chorégraphie** (les services réagissent aux événements) ou par **orchestration** (un coordinateur pilote les étapes et les compensations).

</details>

## Partie 3 — Questions éclair

### Q1. `@Transactional` sur une classe vs sur une méthode ?
<details>
<summary>Réponse</summary>

Au niveau classe = **paramètres par défaut** pour les méthodes éligibles de la classe ; au niveau méthode, ils sont **surchargés**. Pattern courant : lecture seule par défaut, les méthodes d'écriture surchargent.

```java
@Service
@Transactional(readOnly = true)
public class CustomerService {
    public Customer find(Long id) { return repository.findById(id).orElseThrow(); }

    @Transactional
    public void rename(Long id, String name) {
        repository.findById(id).orElseThrow().setName(name);
    }
}
```

</details>

### Q2. Que garantit `readOnly = true` ?
<details>
<summary>Réponse</summary>

C'est un **indice** : Spring/Hibernate peuvent optimiser (ex. pas de dirty checking, flush manuel) et certains drivers/bases imposent la lecture seule. Ce **n'est pas** une garantie universelle qu'aucune écriture n'a lieu — ne jamais l'utiliser comme frontière de sécurité.

</details>

### Q3. Comment marquer une transaction pour rollback sans lever d'exception ?
<details>
<summary>Réponse</summary>

```java
TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
```

À utiliser délibérément — l'appelant voit un retour normal mais rien n'est committé.

</details>

### Q4. À quoi sert le timeout d'une transaction ?
<details>
<summary>Réponse</summary>

`@Transactional(timeout = 5)` limite la durée de la transaction, pour qu'une transaction lente ne garde pas indéfiniment **verrous et connexions**. L'application exacte dépend du gestionnaire de transactions et de la ressource.

</details>

### Q5. Complétez : que fait chaque propagation ?
`REQUIRED`, `REQUIRES_NEW`, `SUPPORTS`, `MANDATORY`, `NOT_SUPPORTED`, `NEVER`, `NESTED`

<details>
<summary>Réponse</summary>

| Propagation | Signification |
|---|---|
| `REQUIRED` (défaut) | Rejoint la transaction courante ; en crée une s'il n'y en a pas |
| `REQUIRES_NEW` | Suspend la transaction courante ; en démarre une indépendante |
| `SUPPORTS` | Rejoint s'il y en a une ; sinon s'exécute sans transaction |
| `MANDATORY` | Exige une transaction existante ; sinon lève une exception |
| `NOT_SUPPORTED` | Suspend toute transaction existante ; s'exécute sans |
| `NEVER` | Lève une exception si une transaction existe |
| `NESTED` | Savepoint dans la transaction existante (si supporté) |

</details>

### Q6. Quand `NESTED` est-il utile, et en quoi diffère-t-il de `REQUIRES_NEW` ?
<details>
<summary>Réponse</summary>

`NESTED` crée un **savepoint** dans la **même** transaction : la partie interne peut revenir au savepoint pendant que l'externe continue — mais si l'externe est annulée, le travail interne l'est aussi. `REQUIRES_NEW` est une transaction **séparée** committée indépendamment. `NESTED` nécessite le support du gestionnaire de transactions (ex. savepoints JDBC ; pas le gestionnaire JPA par défaut).

</details>

### Q7. Un `@Transactional` peut-il couvrir deux bases de données ?
<details>
<summary>Réponse</summary>

Une transaction locale contrôle **une seule ressource**. Un commit atomique sur plusieurs nécessite un protocole distribué (**JTA/XA**, commit à deux phases). Les microservices l'évitent généralement et utilisent des transactions locales + **Outbox / Saga** + idempotence.

</details>

### Q8. Pourquoi garder des transactions courtes ?
<details>
<summary>Réponse</summary>

Les transactions longues gardent **connexions et verrous** plus longtemps → plus de contention, de deadlocks, d'épuisement du pool et de timeouts. Ne jamais faire d'appels HTTP distants ni attendre une saisie utilisateur dans une transaction.

</details>

### Q9. `save()` vs `saveAndFlush()` ?
<details>
<summary>Réponse</summary>

`save()` fait un persist/merge, mais le SQL peut être **différé** jusqu'au flush/commit. `saveAndFlush()` **flushe immédiatement** en plus (utile pour détecter tôt les violations de contraintes) — il ne **committe toujours pas**.

</details>

### Q10. Appeler `save()` deux fois sur la même entité crée-t-il deux lignes ?
<details>
<summary>Réponse</summary>

**Pas forcément.** `save()` de Spring Data choisit `persist` (entité nouvelle) ou `merge` (existante) selon sa **détection d'entité nouvelle** (ID null, `@Version` null, ou `Persistable.isNew()`). Pour une entité déjà managed, `save()` n'est même pas nécessaire — le dirty checking suffit.

</details>

### Q11. Qu'est-ce que le contexte de persistance ?
<details>
<summary>Réponse</summary>

L'**unité de travail** JPA qui gère les instances d'entités : elle garantit l'**identité** (même ID → même instance Java dans le contexte), **suit les modifications** (dirty checking) et coordonne le **flush**.

</details>

### Q12. Cache de premier niveau vs cache de second niveau dans Hibernate ?
<details>
<summary>Réponse</summary>

- **Premier niveau** : le contexte de persistance lui-même, limité à un `EntityManager`/`Session`. Toujours actif, non partagé.
- **Second niveau** : **optionnel**, partagé entre sessions (portée `SessionFactory`, ex. Ehcache/Caffeine). Réduit les lectures pour les entités adaptées mais demande une stratégie de cache et d'invalidation soignée — surtout si d'autres applications modifient les données.

</details>

### Q13. JPQL vs SQL natif ?
<details>
<summary>Réponse</summary>

**JPQL** interroge le **modèle d'entités** (noms d'entités et attributs) et est portable. **Le SQL natif** interroge directement **tables et colonnes** — à utiliser pour les fonctionnalités spécifiques à une base ou les requêtes difficiles à exprimer en JPQL.

</details>

### Q14. Pourquoi la pagination avec un fetch join sur une collection pose-t-elle problème ?
<details>
<summary>Réponse</summary>

`join fetch o.lines` multiplie les lignes par parent, donc `LIMIT/OFFSET` sur les lignes jointes ne correspond pas à « une page de commandes » — Hibernate charge alors tout et pagine **en mémoire** (il affiche un warning). **Correction :** paginer d'abord les **IDs** des parents, puis charger les associations de ces IDs dans une seconde requête.

</details>

### Q15. `FetchType.LAZY` vs `FetchType.EAGER` ?
<details>
<summary>Réponse</summary>

`LAZY` charge l'association **à l'accès** ; `EAGER` la charge **avec l'entité** — mais pas forcément en une jointure (cela peut déclencher des requêtes supplémentaires, voire du N+1). Préférer `LAZY` et charger explicitement selon le cas d'usage. Valeurs par défaut : `@ManyToOne`/`@OneToOne` sont EAGER, `@OneToMany`/`@ManyToMany` sont LAZY.

</details>

### Q16. `CascadeType.REMOVE` vs `orphanRemoval = true` ?
<details>
<summary>Réponse</summary>

`CascadeType.REMOVE` supprime les enfants **quand le parent est supprimé**. `orphanRemoval = true` supprime aussi un enfant **quand il est retiré de la collection du parent**. À n'utiliser que si le parent **possède** réellement le cycle de vie de l'enfant.

</details>

### Q17. Quel est le compromis d'un index en base ?
<details>
<summary>Réponse</summary>

Des recherches plus rapides pour les prédicats, jointures et tris correspondants — au prix de **stockage** et d'**insert/update/delete plus lents**. Ajouter des index selon les requêtes réelles et les plans d'exécution, pas sur chaque colonne.

</details>

### Q18. `@Version` protège-t-il contre toute modification concurrente ?
<details>
<summary>Réponse</summary>

**Non.** Il protège les updates de cette entité faits via JPA en tenant compte de la version. Les **updates JPQL en masse, le SQL natif et les écritures externes** contournent le contrôle s'ils ne gèrent pas explicitement la version. Attention en mélangeant updates en masse et entités managed.

</details>

### Q19. Verrou en base vs `synchronized` Java ?
<details>
<summary>Réponse</summary>

Un verrou en base coordonne les **transactions de toutes les instances de l'application et de tous les clients de la base**. `synchronized` ne coordonne que les **threads d'une JVM**. Dans une application scalée horizontalement, `synchronized` ne peut pas remplacer le contrôle de concurrence en base (voir le Scénario 7).

</details>

### Q20. Concurrence optimiste hors JPA — comment dans une API REST ?
<details>
<summary>Réponse</summary>

Le client lit une version/un **`ETag`** et le renvoie avec **`If-Match`** lors de la mise à jour. Le serveur n'applique l'update que si la version est toujours à jour ; sinon il renvoie **`412 Precondition Failed`**.

</details>

### Q21. Comment résumer votre stratégie transactionnelle en entretien microservices ?
<details>
<summary>Réponse</summary>

> « Je garde les transactions **locales et courtes**, avec la frontière autour d'une opération métier dans la couche service. Pour les mises à jour concurrentes, j'utilise le **verrouillage optimiste** avec `@Version` quand les conflits sont rares, et le **verrouillage pessimiste ou un SQL atomique** quand la contention est forte. Quand une modification en base doit produire un événement Kafka, j'utilise une **Outbox** pour que la mise à jour métier et l'événement soient committés ensemble, et mes consommateurs sont **idempotents** car la livraison peut être répétée. »

</details>

## Partie 4 — Auto-évaluation : répondez à voix haute

Pas de solution ici — répondez de mémoire, puis vérifiez avec le lien.

1. Pourquoi une exception checked peut-elle laisser une transaction committée ? → [Exercice 2](#exercice-2--exception-checked)
2. Expliquez la différence entre `REQUIRED` et `REQUIRES_NEW`. → [Scénario 2](#scénario-2--required-vs-requires_new)
3. Pourquoi attraper une exception interne peut-il quand même mener à `UnexpectedRollbackException` ? → [Exercice 4](#exercice-4--attraper-lexception-interne)
4. Quelle est la différence entre flush et commit ? → [Exercice 7](#exercice-7--confondre-flush-et-commit)
5. Pourquoi `merge()` renvoie-t-il un autre objet managed ? → [Exercice 6](#exercice-6--ignorer-la-valeur-de-retour-de-merge)
6. Comment `@Version` détecte-t-il un lost update ? → [Scénario 1](#scénario-1--lost-update-en-chiffres)
7. Pourquoi une lecture ordinaire peut-elle réussir alors qu'une autre transaction détient un verrou pessimiste en écriture ? → [Scénario 3](#scénario-3---personne-ne-peut-lire-cette-ligne-)
8. Comment empêcher deux utilisateurs d'acheter le dernier article en même temps ? → [Scénario 4](#scénario-4--le-dernier-article-en-stock)
9. Pourquoi `@Transactional` ne suffit-il pas pour une mise à jour en base plus une publication Kafka ? → [Exercice 10](#exercice-10--mise-à-jour-en-base--kafka)
10. Comment l'Outbox et l'idempotence des consommateurs fonctionnent-elles ensemble ? → [Exercice 11](#exercice-11--consommateur-idempotent-en-concurrence)
