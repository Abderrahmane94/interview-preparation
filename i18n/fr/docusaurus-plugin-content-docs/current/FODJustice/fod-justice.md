---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';


# SPF Justice — Préparation personnelle à l'entretien
# <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

> Notes personnelles de préparation pour **Abderrahmane Sardaoui**, pour un poste backend sur le projet **Just-on-Web** au **SPF Justice / FOD Justitie** (Service public fédéral Justice). Page autonome volontairement. Attendez-vous à un **entretien très technique et pratique, en anglais** : du code partagé à l'écran, « qu'est-ce qui ne va pas / comment l'améliorer / pourquoi », et des questions de relance qui challengent la première réponse. Pour chaque réponse : **énoncer le problème → proposer la correction → justifier le compromis**.

## Introduction

### Se présenter (version courte)
Good morning, thank you for having me.

Je m'appelle **Abderrahmane Sardaoui**. Je suis **développeur backend** avec **plus de 7 ans d'expérience**, principalement en **Java et Spring Boot**. Je suis titulaire d'un Master en informatique de l'ESI (Algérie), et j'ai travaillé dans l'énergie (Sonelgaz), la santé (CDTA — un système de dossier médical électronique), le CRM/conseil (Poliscrypts), le traitement documentaire (IRIS IMS, groupe Canon), et actuellement chez **TVH Group** sur de grandes plateformes internationales de pièces détachées.

Mon focus : **logique métier, conception d'API, modélisation des données et fiabilité** — Spring Boot, Spring Data/Hibernate, PostgreSQL, Kafka, avec les pratiques TDD, DDD et BDD. J'ai aussi travaillé avec **Angular** plus tôt dans ma carrière, donc je suis à l'aise côté front-end et dans les discussions de bout en bout.

### Que savez-vous du SPF Justice et de Just-on-Web ?
> **À vérifier avant l'entretien** — compléter avec la description du projet reçue de la recruteuse ; ne rien affirmer qui n'ait pas été vérifié.

- Le **SPF Justice / FOD Justitie** est le **Service public fédéral Justice** belge : il soutient l'organisation judiciaire (cours et tribunaux, ministère public), les prisons, et les services liés à la justice pour les citoyens et les professionnels. C'est une **administration publique bilingue (FR/NL)**.
- **Just-on-Web** est l'une de ses **applications/plateformes web** — `[à compléter avec la description du projet : utilisateurs, fonctionnalités principales, stack technique, organisation de l'équipe]`.
- Ce que cela implique techniquement : des **données juridiques** (intégrité forte, auditabilité, traçabilité), des **systèmes à longue durée de vie** (la maintenabilité compte plus que les effets de mode), et des **contraintes du secteur public** (sécurité, vie privée/RGPD, accessibilité).

### Pourquoi ce poste ?
- **Un domaine qui a du sens** : un logiciel qui soutient la justice et les citoyens — l'exactitude et l'intégrité des données comptent vraiment, et c'est exactement là où j'aime travailler.
- **La stabilité** : je recherche une **mission à long terme** où je peux acquérir une connaissance approfondie d'un domaine et d'un code.
- **L'adéquation technique** : DDD, architecture hexagonale, Spring Boot, JPA/PostgreSQL — c'est mon quotidien.

### Les langues
L'anglais pour l'entretien ne pose aucun problème. Je suis francophone ; j'ai des **notions limitées de néerlandais** et je suis **ouvert à les développer** si le poste le demande — dans un environnement bilingue FR/NL, c'est naturel d'y travailler.

### Exemples concrets à préparer (architecture, refactoring, problèmes complexes)
> Préparer 3 courtes histoires en **STAR** : Situation → Tâche → Action → Résultat (avec un chiffre si possible). Compléter les `[ ... ]`.

1. **Architecture** — `[une fonctionnalité où vous avez séparé la logique métier de l'infrastructure : ex. déplacer des règles métier d'un service/contrôleur vers l'entité/l'agrégat, introduire des ports/adaptateurs pour un système externe]`. Résultat : `[tests plus simples, moins de régressions…]`.
2. **Refactoring** — `[un modèle anémique ou un « god service » refactoré : suppression des setters publics, méthodes exprimant l'intention, tests écrits d'abord]`. Résultat : `[…]`.
3. **Problème complexe** — `[un bug de production : N+1/performance, concurrence/doublons, problème de transaction ou Kafka — comment vous l'avez diagnostiqué (logs, SQL, métriques), la cause racine, la correction]`. Résultat : `[…]`.

---

## 1. DDD & architecture hexagonale

#### Quels sont les grands principes du Domain-Driven Design ?
- **Se concentrer sur le domaine** : la valeur est dans la logique métier, construite **avec les experts métier**.
- **Langage omniprésent (ubiquitous language)** : les mêmes mots dans les discussions, le code et les tests (`CaseFile`, `Exhibit`, `Expert`, `Certification`).
- **Bounded contexts** : un modèle est valide à l'intérieur d'une frontière ; un même mot peut avoir des sens différents selon le contexte.
- **Briques tactiques** : **entités** (identité), **value objects** (immuables, comparés par valeur), **agrégats** (frontière de cohérence), **services de domaine**, **événements de domaine**, **repositories**.
- **Modèle riche** : le comportement vit avec les données — pas de « sacs de getters/setters » anémiques avec toute la logique dans les services.

#### Quels sont les grands principes de l'architecture hexagonale ?
- Le **cœur (domaine + application)** est au centre et ne dépend de **rien de technique** (ni Spring, ni JPA, ni HTTP).
- Le cœur définit des **ports** (interfaces) : **entrants** (cas d'usage appelables de l'extérieur) et **sortants** (ce dont le cœur a besoin : `ExpertRepository`, `NotificationSender`).
- Les **adaptateurs** implémentent les ports en périphérie : contrôleur REST, listener Kafka (pilotants) ; repository JPA, client REST (pilotés).
- **Les dépendances pointent toujours vers l'intérieur** (inversion de dépendances).

```
REST / Kafka (adaptateurs pilotants) → [ cas d'usage → domaine ] ← JPA / clients (adaptateurs pilotés, implémentent les ports)
```

#### Quels sont les avantages et inconvénients de l'architecture hexagonale ?
| Avantages | Inconvénients |
|---|---|
| Logique métier **testable sans Spring ni base** (tests unitaires rapides) | **Plus de code** : interfaces, mappers (domaine ↔ entité JPA ↔ DTO) |
| Les changements techniques (base, broker, API externe) restent dans les adaptateurs | **Excessif pour du CRUD simple** — de l'indirection sans bénéfice |
| Frontières claires, plus facile à raisonner et à relire | Courbe d'apprentissage ; risque de sur-ingénierie (« des ports pour tout ») |
| Les montées de version du framework ont un impact plus limité | Le mapping peut masquer des problèmes de performance (ex. lazy loading) |

**Ma position :** l'utiliser là où il y a une **vraie logique métier** à protéger et tester ; garder le CRUD simple… simple.

#### Qu'est-ce qu'un agrégat, et quelle est la responsabilité de la racine d'agrégat ?
Un **agrégat** est un groupe d'objets traité comme **une seule unité de cohérence** (ex. `CaseFile` + ses `Exhibit`). La **racine d'agrégat** (`CaseFile`) est le **seul point d'entrée** :
- Le code externe ne référence que la racine et ne modifie jamais les enfants directement.
- La racine **garantit les invariants** de tout l'agrégat (« pas de pièce à conviction en double », « pas d'ajout à un dossier clôturé »).
- Une transaction modifie **un seul agrégat** ; les autres agrégats sont référencés **par ID** et mis à jour via des événements de domaine / cohérence à terme.
- Un repository existe **par racine d'agrégat**, pas par entité enfant.

#### Comment garantir une bonne encapsulation des entités métier ?
- **Pas de setters publics** ; exposer des **méthodes qui expriment l'intention** (`certification.revoke(reason)`, pas `setStatus(REVOKED)`).
- **Valider dans le constructeur / la méthode de fabrique** → un objet ne peut jamais exister dans un état invalide.
- **Ne jamais exposer de collections modifiables** : renvoyer `Collections.unmodifiableList(...)` / `List.copyOf(...)` ; ajouter/retirer via des méthodes de la racine.
- Utiliser des **value objects** pour les concepts porteurs de règles (`CertificationNumber`, `Period`, `Email`) — immuables, auto-validés.
- JPA exige un constructeur sans argument → le rendre `protected` ; utiliser l'accès par champ pour que le domaine n'ait pas besoin de setters.

#### Où implémenter les règles de validation métier ?
- **Invariants d'un objet/agrégat** → dans le **domaine** (entité, value object, racine d'agrégat). Ils tiennent quel que soit le cas d'usage appelant.
- **Validation de format des entrées** (champ obligatoire, taille, format d'email) → en **périphérie** (DTO + Bean Validation `@Valid`), pour échouer vite avec un 400 clair.
- **Règles nécessitant d'autres données / systèmes externes** (ex. « numéro de certification unique pour tous les experts ») → **service de domaine** ou service applicatif + **contrainte en base** comme filet de sécurité final.
- Jamais uniquement dans l'UI ou le contrôleur : elles seraient **contournables** par un autre point d'entrée (batch, listener Kafka, autre API).

#### Service de domaine vs service applicatif ?
| | Service de domaine | Service applicatif |
|---|---|---|
| Contient | De la **logique métier** qui n'appartient pas à une seule entité | L'**orchestration** d'un cas d'usage |
| Exemple | `CertificationEligibilityPolicy`, transfert entre deux agrégats | `RegisterCertificationUseCase` : charger → appeler le domaine → sauvegarder → publier un événement |
| Dépend de | Uniquement le domaine (pur) | Ports (repositories, messaging), transactions, sécurité |
| Connaît les transactions ? | Non | Oui — la **frontière transactionnelle** est ici |

#### Comment séparer la logique métier de l'orchestration applicative ?
Le service applicatif se lit comme un **script** ; les décisions sont dans le domaine :

```java
@Service
public class AddCertificationService implements AddCertificationUseCase {
    private final ExpertRepository experts;           // port sortant
    private final DomainEventPublisher events;        // port sortant

    @Transactional
    public void add(AddCertificationCommand cmd) {
        Expert expert = experts.findById(cmd.expertId())
            .orElseThrow(() -> new ExpertNotFoundException(cmd.expertId()));
        expert.addCertification(cmd.type(), cmd.number(), cmd.validity()); // règles métier à l'intérieur
        experts.save(expert);
        events.publish(new CertificationAdded(expert.id(), cmd.number()));
    }
}
```

Aucun `if` de règle métier dans le service : si la règle change, seul le domaine change, et il est testé unitairement sans Spring.

---

## 2. Java / Spring Boot — Revue de code & architecture

#### Quels sont les risques des setters publics sur les entités du domaine ?
- **Les invariants peuvent être contournés** : n'importe qui peut faire `setValidUntil(null)` ou `setStatus(ACTIVE)` sur une certification expirée.
- Les objets peuvent être dans un **état intermédiaire invalide** (à moitié construits).
- **L'intention métier est perdue** : `setStatus(REVOKED)` ne dit ni *pourquoi* ni *qui* ; `revoke(reason)` peut l'enregistrer et lever un événement.
- **La logique se disperse** dans les services/contrôleurs → duplication et règles incohérentes.
- Les collections modifiables renvoyées par les getters permettent d'ajouter des éléments **sans aucun contrôle**.

#### Comment s'assurer que les règles métier ne peuvent pas être contournées ?
1. Les règles vivent dans le **domaine** (constructeurs, fabriques, méthodes) — le seul moyen de changer l'état.
2. **Encapsulation** : pas de setters, collections non modifiables, constructeurs package-private/protected pour JPA.
3. **Contraintes en base** en dernière ligne de défense : `NOT NULL`, `UNIQUE`, `CHECK`, clés étrangères — elles protègent aussi contre la concurrence et les autres écrivains.
4. **Tests** des règles du domaine (unitaires) + des contraintes (intégration avec un vrai PostgreSQL, ex. Testcontainers).
5. Éventuellement des tests **ArchUnit** pour garantir que le domaine ne dépend pas des adaptateurs.

#### Comment fonctionne `@Transactional` dans Spring ?
Spring crée un **proxy** autour du bean. Lors d'un appel **via le proxy**, l'intercepteur ouvre (ou rejoint) une transaction, appelle la méthode, puis **committe** — ou fait un **rollback** si une `RuntimeException`/`Error` sort. Conséquences : seuls les appels **depuis l'extérieur du bean** sont interceptés (pas d'auto-invocation, pas de méthodes privées), et les règles de rollback s'appliquent aux exceptions **qui sortent** de la méthode.

---

## 3. Hibernate / JPA — Relations entre entités

#### EAGER vs LAZY ?
- **LAZY** : l'association est chargée **à l'accès** (proxy / collection persistante). Par défaut pour `@OneToMany` et `@ManyToMany`.
- **EAGER** : l'association est chargée **à chaque chargement de l'entité**, qu'on en ait besoin ou non. Par défaut pour `@ManyToOne` et `@OneToOne`.
- Bonne pratique : **LAZY partout** (y compris `@ManyToOne`) et charger **explicitement selon le cas d'usage** (`JOIN FETCH`, `@EntityGraph`, projection DTO).

#### Quels problèmes l'EAGER peut-il causer sur un `@OneToMany` ?
- **Sur-chargement** : charger une liste de dossiers charge **toutes les pièces** de chacun — mémoire et temps explosent avec le volume.
- **Requêtes N+1** : avec des requêtes JPQL, les collections EAGER sont souvent chargées avec **une requête supplémentaire par parent**.
- **Produit cartésien** : plusieurs collections EAGER jointes → les lignes se multiplient (et `MultipleBagFetchException` avec deux `List`).
- **La pagination casse** : Hibernate peut paginer en mémoire.
- Impossible de le **désactiver** par requête — on peut charger du LAZY à la demande, mais pas « dé-charger » de l'EAGER.

#### Comment gérer correctement une relation bidirectionnelle ?
- Un côté **possède** la relation (le côté `@ManyToOne` avec la FK) ; l'autre côté a `mappedBy`.
- Garder **les deux côtés synchronisés** avec des méthodes utilitaires sur la racine d'agrégat :

```java
public void addExhibit(Exhibit exhibit) {
    exhibits.add(exhibit);
    exhibit.attachTo(this);      // positionne la référence inverse
}
public void removeExhibit(Exhibit exhibit) {
    exhibits.remove(exhibit);
    exhibit.detach();
}
```

- Utiliser `cascade = ALL` + `orphanRemoval = true` quand le cycle de vie de l'enfant appartient au parent.
- Exclure la référence inverse de `toString()`, `equals/hashCode` et de la sérialisation JSON (récursion infinie) — et ne pas exposer les entités dans l'API : utiliser des DTO.

#### Comment empêcher les pièces à conviction en double dans un CaseFile ?
Trois niveaux :
1. **Règle du domaine** dans `CaseFile.addExhibit()` : rejeter (ou ignorer) une pièce dont la **clé métier** (ex. numéro de référence) existe déjà — avec une exception claire.
2. **Type de collection** : un `Set` avec **`equals/hashCode` basés sur la clé métier** (pas sur l'ID généré, qui est null avant le persist).
3. **Base de données** : `UNIQUE (case_file_id, reference)` — protège contre les requêtes concurrentes.

#### Qu'est-ce que le problème N+1, et comment l'identifier et le résoudre ?
Une requête charge N parents, puis **une requête par parent** charge une association → N+1 allers-retours.
- **Identifier** : activer les logs SQL (`spring.jpa.show-sql` / `org.hibernate.SQL=DEBUG`), les **statistiques Hibernate** (`hibernate.generate_statistics`), les traces APM montrant des requêtes identiques répétées, ou un test vérifiant le **nombre de requêtes** (ex. datasource-proxy).
- **Résoudre** : `JOIN FETCH`, `@EntityGraph`, **projection DTO**, ou `@BatchSize` / `hibernate.default_batch_fetch_size` (N+1 → 1 + N/lot). Paginer d'abord les parents, puis charger les enfants pour les IDs de la page.

---

## 4. Spring Boot — Transactions & gestion des exceptions

#### Que se passe-t-il quand une exception survient dans une méthode transactionnelle ?
- Exception **unchecked** (`RuntimeException`, `Error`) qui sort de la méthode → **rollback** de toute la transaction.
- Exception **checked** → **commit** par défaut (!), sauf avec `rollbackFor = ...`.
- Exception **attrapée dans** la méthode et non relancée → pas de rollback (commit), **sauf** si un proxy transactionnel interne a déjà marqué la transaction **rollback-only** → `UnexpectedRollbackException` au commit.

#### Exceptions checked vs unchecked et rollback ?
Règle par défaut : rollback sur **unchecked**, commit sur **checked**. Raison historique : les exceptions checked étaient vues comme des « résultats métier attendus ». Le rendre explicite : `@Transactional(rollbackFor = Exception.class)`, ou utiliser des exceptions métier unchecked.

#### Que se passe-t-il si une méthode transactionnelle appelle une autre méthode de la même classe ?
L'**auto-invocation** contourne le proxy → les paramètres `@Transactional` de la méthode appelée (ex. `REQUIRES_NEW`, `rollbackFor`) sont **ignorés** ; elle s'exécute dans la transaction de l'appelant (ou sans transaction si l'appelant n'en a pas). Correction : la déplacer dans **un autre bean**, ou placer la frontière sur l'appelant.

#### Comment gérer les échecs partiels lors du traitement d'un lot d'enregistrements ?
D'abord **demander au métier** : *tout ou rien* ou *au mieux* ?
- **Tout ou rien** : une transaction autour du lot ; tout valider **d'abord**, puis écrire.
- **Au mieux** : **une transaction par élément** (ou par paquet) via **un autre bean** en `REQUIRES_NEW` (ou sans transaction externe), attraper l'échec par élément, **collecter les erreurs** et renvoyer un **rapport** (`199 réussis, 1 en échec : #137 – raison`).
- Pour les gros volumes : des **paquets (chunks)** (ex. 100 éléments/transaction), Spring Batch (politiques skip/retry), des transactions courtes, un traitement **idempotent** pour pouvoir relancer sans risque.

Voir l'**Exercice 3** pour la question « 200 certifications, la n°137 échoue ».

---

## 5. PostgreSQL — Intégrité des données & unicité

#### Comment garantir l'unicité d'une certification ?
Avec une **contrainte en base** — c'est la seule garantie fiable :

```sql
ALTER TABLE certification
  ADD CONSTRAINT uk_certification_number UNIQUE (certification_number);

-- Unique par expert et par type, uniquement parmi les certifications actives (index unique partiel)
CREATE UNIQUE INDEX uk_active_cert_per_expert_type
  ON certification (expert_id, type)
  WHERE revoked_at IS NULL;
```

Plus une vérification dans la couche domaine/application pour un **message d'erreur clair**.

#### Vérifier les doublons dans la couche applicative suffit-il ?
**Non.** `existsBy...()` puis `save()` est un **check-then-act** : deux requêtes concurrentes voient toutes deux « pas de doublon » et insèrent toutes les deux. Et cela ne protège pas contre les autres écrivains (scripts, autres services, migrations). Le contrôle applicatif sert à l'**expérience utilisateur** ; la **contrainte** sert à l'**exactitude**.

#### Que se passe-t-il si deux requêtes concurrentes insèrent la même valeur unique ?
Le premier insert réussit. Le second **attend** la ligne non committée du premier (vérification de l'index unique), puis échoue avec **`23505 unique_violation`** quand le premier committe (ou réussit si le premier fait un rollback). Dans Spring, cela remonte en **`DataIntegrityViolationException`** (souvent au **flush/commit**, pas au `save()`).

#### Comment gérer une violation de contrainte ?
- La traduire en **erreur métier** : attraper `DataIntegrityViolationException`, vérifier le **nom de la contrainte**, lever `DuplicateCertificationException` → gérée par `@RestControllerAdvice` → **HTTP 409 Conflict** avec un message clair.
- Appeler `saveAndFlush()` (ou flush) **dans** le try si l'on veut l'attraper dans le service, sinon l'insert peut n'avoir lieu qu'au commit.
- Pour des inserts idempotents : `INSERT ... ON CONFLICT (certification_number) DO NOTHING` (requête native) et vérifier le nombre de lignes affectées.
- Dans PostgreSQL, la transaction est **avortée** après l'erreur — ne pas continuer à l'utiliser ; réessayer dans une nouvelle transaction si nécessaire.

#### Comment garder la validation métier et les contraintes en base cohérentes ?
- Les voir comme **deux niveaux de la même règle** : contrôle domaine/applicatif = **retour rapide et lisible** ; contrainte = **garantie**.
- Les définir à partir de la **même règle** (nommer la contrainte d'après elle, ex. `uk_active_cert_per_expert_type`), versionner le schéma avec **Flyway/Liquibase**, et **tester en intégration** les deux avec un vrai PostgreSQL (Testcontainers) — y compris un test d'insertions concurrentes.
- Associer chaque nom de contrainte à une erreur métier en un seul endroit.

---

## 6. Angular — Revue de composant & performance

#### Quels sont les risques d'appeler des méthodes directement depuis un template ?
`{{ getFilteredItems() }}` ou `*ngFor="let i of filter(items)"` est **ré-exécuté à chaque cycle de détection de changements** (chaque clic, frappe, timer, réponse HTTP n'importe où dans l'appli avec la stratégie par défaut). Le travail coûteux (filtrer, trier, créer des tableaux) tourne en permanence → **UI lente**, et renvoyer un **nouveau tableau à chaque fois** force le re-rendu de la liste dans le DOM.

#### Comment améliorer la logique de filtrage et éviter les recalculs pendant la détection de changements ?
- Calculer **une seule fois quand les entrées changent** : un **signal `computed()`**, un **pipe pur**, ou un flux RxJS (`combineLatest` + `map`) affiché avec le pipe `async`.
- Utiliser **`trackBy`** / `@for (...; track item.id)` pour ne re-rendre que les lignes modifiées.
- **Debounce** la saisie de recherche (`debounceTime(300)`), et filtrer côté serveur pour les gros volumes.

```ts
readonly search = signal('');
readonly experts = input.required<Expert[]>();
readonly filtered = computed(() => {
  const term = this.search().toLowerCase();
  return this.experts().filter(e => e.name.toLowerCase().includes(term));
});
```

#### Comment optimiser la détection de changements d'un composant ?
- `changeDetection: ChangeDetectionStrategy.OnPush` → vérifié uniquement quand une **référence d'input** change, qu'un événement s'y produit, ou qu'un pipe `async`/signal émet.
- Faire des **mises à jour immuables** (nouvelles références) pour que OnPush voie les changements.
- Préférer les **signals** (mises à jour fines ; compatible zoneless) et le pipe `async` aux souscriptions manuelles.
- Éviter les getters/fonctions coûteux dans les templates ; `trackBy` sur les listes ; charger en différé les parties lourdes (`@defer`).

#### Comment structurer un composant pour la lisibilité, la maintenabilité et la testabilité ?
- Composants **smart (conteneur) vs dumb (présentation)** : le conteneur parle aux services/à l'état ; les composants de présentation reçoivent des `input()` et émettent des `output()`.
- Accès aux données et logique métier dans des **services** injectés ; les composants restent légers.
- **Pas de souscriptions manuelles** sans nettoyage → pipe `async`, `takeUntilDestroyed()`, ou signals (`toSignal`).
- **Typage** fort (pas de `any`), petits templates, tests unitaires des services et des composants de présentation via inputs/outputs.

---

## 7. Playwright — Tests & fiabilité

#### Pourquoi les tests E2E sont-ils instables (flaky) ?
- **Attentes fixes** (`waitForTimeout(2000)`) — trop courtes sur une CI lente, trop longues en local.
- **Sélecteurs fragiles** (`div > span:nth-child(3)`, classes CSS générées).
- **Assertions sans retry** : `expect(await locator.textContent()).toBe(...)` lit une seule fois, au lieu de l'assertion web-first `await expect(locator).toHaveText(...)`.
- **`await` manquant** → conditions de course.
- **État partagé / dépendance à l'ordre des tests** : les tests réutilisent les mêmes données ou le même utilisateur, s'exécutent en parallèle.
- **Vrais backends / services externes** avec une latence ou des données variables.

#### Comment les rendre fiables ?
- Utiliser des **locators** à sémantique utilisateur : `getByRole('button', { name: 'Save' })`, `getByLabel`, `getByTestId` — Playwright **attend automatiquement** qu'ils soient actionnables.
- Utiliser des **assertions web-first** (`toBeVisible`, `toHaveText`, `toHaveURL`) qui **réessaient** jusqu'au timeout.
- Attendre **le vrai événement** : `page.waitForResponse('**/api/experts')`, ou une assertion sur l'UI résultante — jamais un sleep.
- **Isoler les tests** : données propres à chaque test (seeding via API / fixtures), contexte navigateur neuf, aucune dépendance d'ordre.
- **Mocker** les dépendances externes instables avec `page.route()` quand le test ne les cible pas.

#### Quels sont les risques des timeouts fixes ?
**Instables** quand l'environnement est plus lent que prévu, suites **lentes** quand il est plus rapide (on paie toujours toute l'attente), et ils **masquent** la vraie condition attendue — quand ça casse, le message d'erreur n'apprend rien.

#### Comment gérer les opérations asynchrones dans les tests E2E ?
Attendre des **conditions observables** : l'état d'un élément (assertion web-first), une **réponse réseau** (`waitForResponse`), une URL (`toHaveURL`), ou `expect.poll()` pour un état backend. Combiner une action et la réponse attendue (préparer `waitForResponse` **avant** le clic) pour ne pas rater une réponse rapide.

#### Comment distinguer un vrai bug d'un test instable ?
- **Reproduire** : lancer le test plusieurs fois (`--repeat-each=20`), isolé et en parallèle, en local et sur la CI.
- Inspecter le **trace viewer** (`trace: 'on-first-retry'`), les captures, vidéos, logs réseau et console.
- Un **échec constant** à la même étape avec un comportement applicatif faux → **bug**. Des échecs aléatoires liés au timing/à la sélection avec une appli correcte → **problème de test**. S'il n'échoue qu'en charge/en parallèle, c'est peut-être une **vraie condition de course dans l'appli** — ne pas se contenter d'ajouter des retries.
- Suivre les tests instables (Playwright les marque « flaky » quand ils passent au retry) et les **corriger ou les mettre en quarantaine**, jamais les ignorer.

---

## 8. Conception système & intégration d'applications

#### Intégration synchrone (REST) vs asynchrone (messaging) ?
- **REST** : l'appelant a besoin de la **réponse tout de suite** (consultation, validation). Simple, mais **couplage temporel** : si l'autre système est en panne ou lent, vous aussi → timeouts, retries, circuit breaker.
- **Messaging (Kafka/files)** : notifier les autres que **quelque chose s'est produit** ; découplé, résilient, absorbe la charge — mais **cohérence à terme**, doublons (consommateurs idempotents), ordre et supervision à gérer.

#### Comment rendre robuste l'intégration avec un autre système (public) ?
- **Timeouts** partout, **retries avec backoff** uniquement sur les appels idempotents, **circuit breaker** (Resilience4j) pour échouer vite.
- **Clés d'idempotence** pour les commandes, **patron Outbox** pour une publication fiable des événements, gestion des **dead letters**.
- Une **anti-corruption layer** (adaptateur) pour que le modèle externe ne fuie pas dans le domaine.
- **Contrat** avec OpenAPI / schema registry, **versioning** (`/v1`), changements rétrocompatibles.
- **Observabilité** : correlation ID propagé, logs structurés, métriques, alertes.

#### Que vérifiez-vous côté sécurité dans une application du secteur public ?
Authentification/autorisation (OAuth2/OIDC, rôles **vérifiés côté serveur** à chaque action), validation des entrées, pas de données sensibles dans les logs (**RGPD**), **piste d'audit** de qui a modifié quoi et quand, moindre privilège pour les comptes de base, scan des vulnérabilités des dépendances, HTTPS partout.

#### Comment concevoir une piste d'audit pour des données juridiques ?
Chaque modification enregistre **qui / quand / quoi / pourquoi** : une table d'audit ou un journal d'événements en ajout seul (ex. **Hibernate Envers** ou des événements de domaine persistés avec la modification dans la **même transaction**). Ne jamais modifier/supprimer les enregistrements d'audit ; envisager la suppression logique pour les données métier et des règles de rétention.

---

## Exercices (avec solutions)

> Faites-les comme en entretien : lisez le code, **dites à voix haute** ce qui ne va pas, puis proposez et justifiez la correction. N'ouvrez la solution qu'après.

### Exercice 1 — Revue de code : la classe `Expert`
Que pensez-vous de cette classe ? Que changeriez-vous ?

```java
@Entity
public class Expert {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String status;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Certification> certifications = new ArrayList<>();

    public Expert() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }
}

@Entity
public class Certification {
    @Id @GeneratedValue
    private Long id;
    private String number;
    private String type;
    private Date validUntil;
    // + getters et setters publics pour tout
}
```

<details>
<summary>Solution</summary>

**Problèmes :**
- **Modèle anémique** : uniquement des données + setters publics → toutes les règles sont ailleurs et **peuvent être contournées** (n'importe qui peut faire `setStatus("ACTIVE")`, `setValidUntil(null)`, `setId(...)`).
- `getCertifications()` renvoie la **liste interne modifiable** ; `setCertifications()` la remplace → doublons, certifications invalides, suivi des collections Hibernate cassé.
- `status` et `type` en **`String`** libres → fautes de frappe, valeurs invalides ; utiliser des **enums**.
- **`java.util.Date`** (mutable, obsolète) → `LocalDate`.
- **Aucune validation** : nom/email peuvent être null ou invalides ; aucun invariant du type « pas deux certifications avec le même numéro ».
- Le **constructeur public sans argument** permet de créer un expert vide et invalide.
- `@OneToMany` sans `mappedBy`/`@JoinColumn` → Hibernate crée une **table de jointure** ; probablement non voulu.
- Pas de stratégie `equals/hashCode` ; `setId` expose l'identité technique.

**Refactoring (DDD + encapsulation) :**

```java
@Entity
public class Expert {
    @Id @GeneratedValue
    private Long id;
    private String name;
    @Embedded
    private Email email;                       // value object, auto-validé
    @Enumerated(EnumType.STRING)
    private ExpertStatus status;

    @OneToMany(mappedBy = "expert", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Certification> certifications = new HashSet<>();

    protected Expert() {}                      // uniquement pour JPA

    public static Expert register(String name, Email email) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name is required");
        Expert expert = new Expert();
        expert.name = name;
        expert.email = Objects.requireNonNull(email);
        expert.status = ExpertStatus.ACTIVE;
        return expert;
    }

    public void addCertification(CertificationType type, String number, LocalDate validUntil) {
        if (status != ExpertStatus.ACTIVE)
            throw new ExpertNotActiveException(id);
        if (certifications.stream().anyMatch(c -> c.hasNumber(number)))
            throw new DuplicateCertificationException(number);
        certifications.add(new Certification(this, type, number, validUntil));
    }

    public void revokeCertification(String number, String reason) {
        findCertification(number).revoke(reason);
    }

    public Set<Certification> certifications() {
        return Collections.unmodifiableSet(certifications);
    }
    // getters seulement si nécessaire, pas de setters
}
```

- Le constructeur de `Certification` valide (`validUntil` dans le futur, format du numéro…), et expose `revoke(reason)`, `isValidOn(date)` au lieu de setters.
- Ajouter les **contraintes en base** (`UNIQUE (certification_number)`, `NOT NULL`) comme garantie finale.
- Mapper vers des **DTO** à la frontière de l'API ; ne jamais exposer l'entité en JSON.

**Relances attendues :** *« N'est-ce pas trop de code ? »* → pour de vraies règles métier, oui ça vaut le coup (testable, sûr) ; pour du pur CRUD, rester simple. *« Et le constructeur sans argument exigé par JPA ? »* → constructeur `protected` + accès par champ.

</details>

### Exercice 2 — `CaseFile` avec un `@OneToMany` EAGER
Quels problèmes voyez-vous ? Comment l'amélioreriez-vous ?

```java
@Entity
public class CaseFile {
    @Id @GeneratedValue
    private Long id;
    private String reference;

    @OneToMany(mappedBy = "caseFile", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Exhibit> exhibits = new ArrayList<>();

    public List<Exhibit> getExhibits() { return exhibits; }
    public void setExhibits(List<Exhibit> exhibits) { this.exhibits = exhibits; }
}

@Entity
public class Exhibit {
    @Id @GeneratedValue
    private Long id;
    private String reference;
    private String description;

    @ManyToOne
    private CaseFile caseFile;
    // getters/setters publics
}

// Service
public List<CaseFileSummary> listOpenCases() {
    return caseFileRepository.findByStatus("OPEN").stream()
        .map(c -> new CaseFileSummary(c.getId(), c.getReference()))
        .toList();
}
```

<details>
<summary>Solution</summary>

**Problèmes :**
- **EAGER** sur `@OneToMany` : `listOpenCases()` n'a besoin que de l'id + la référence, mais **toutes les pièces** de tous les dossiers ouverts sont chargées → sur-chargement ; avec une requête dérivée, typiquement du **N+1** (1 requête pour les dossiers + 1 par dossier pour les pièces).
- **Pas d'encapsulation** : `getExhibits()` renvoie la liste modifiable, `setExhibits()` la remplace → **doublons** possibles, référence inverse `exhibit.caseFile` **non synchronisée**, invariants (ex. dossier clôturé) contournables.
- **Aucune protection contre les doublons** : `List` + pas d'égalité sur clé métier + pas de contrainte en base.
- Le `@ManyToOne` sur `Exhibit` est aussi **EAGER par défaut**.
- `cascade = ALL` sans `orphanRemoval` → retirer de la liste ne supprime pas la ligne.

**Version améliorée :**

```java
@Entity
public class CaseFile {
    @Id @GeneratedValue
    private Long id;
    private String reference;
    @Enumerated(EnumType.STRING)
    private CaseStatus status;

    @OneToMany(mappedBy = "caseFile", cascade = CascadeType.ALL, orphanRemoval = true) // LAZY par défaut
    private Set<Exhibit> exhibits = new HashSet<>();

    protected CaseFile() {}

    public void addExhibit(String exhibitReference, String description) {
        if (status == CaseStatus.CLOSED) throw new CaseFileClosedException(reference);
        boolean exists = exhibits.stream().anyMatch(e -> e.hasReference(exhibitReference));
        if (exists) throw new DuplicateExhibitException(exhibitReference);
        exhibits.add(new Exhibit(this, exhibitReference, description)); // référence inverse posée dans le constructeur
    }

    public void removeExhibit(String exhibitReference) {
        exhibits.removeIf(e -> e.hasReference(exhibitReference)); // orphanRemoval la supprime
    }

    public Set<Exhibit> exhibits() { return Collections.unmodifiableSet(exhibits); }
}

@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "uk_exhibit_ref_per_case",
                                             columnNames = {"case_file_id", "reference"}))
public class Exhibit {
    @Id @GeneratedValue
    private Long id;
    private String reference;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private CaseFile caseFile;

    protected Exhibit() {}
    Exhibit(CaseFile caseFile, String reference, String description) { /* valider + affecter */ }

    boolean hasReference(String ref) { return reference.equals(ref); }
    // equals/hashCode sur (caseFile, reference) ou sur l'ID avec une stratégie stable — jamais sur un champ modifiable
}
```

- **Côté lecture :** une **projection DTO** pour la liste — aucune entité, aucune pièce chargée :
  ```java
  @Query("select new be.just.CaseFileSummary(c.id, c.reference) from CaseFile c where c.status = :status")
  List<CaseFileSummary> findSummariesByStatus(CaseStatus status);
  ```
- Quand les pièces **sont** nécessaires : `@EntityGraph(attributePaths = "exhibits")` ou `join fetch` pour ce cas d'usage uniquement.

**Relance :** *« Charger toutes les pièces pour vérifier les doublons coûte cher pour un dossier de 10 000 pièces ? »* → exact : s'appuyer sur la **contrainte unique en base** + une requête ciblée `existsByCaseFileIdAndReference`, au lieu de charger la collection ; ou modéliser les pièces comme un agrégat séparé qui référence le dossier par ID.

</details>

### Exercice 3 — 200 certifications, la n°137 échoue à la validation
Combien de certifications sont réellement mises à jour ? Répondez pour chaque version.

```java
// Version A
@Transactional
public void renewAll(List<Long> ids) {
    for (Long id : ids) {
        Certification c = repository.findById(id).orElseThrow();
        c.renew();                     // la n°137 lève InvalidCertificationException (RuntimeException)
    }
}

// Version B — même boucle, pas de @Transactional sur renewAll, repository.save(c) après renew()

// Version C
@Transactional
public void renewAll(List<Long> ids) {
    for (Long id : ids) {
        try {
            renewalService.renew(id);  // autre bean, @Transactional (REQUIRED)
        } catch (InvalidCertificationException e) {
            log.warn("Certification {} skipped", id);
        }
    }
}

// Version D — comme C, mais renewalService.renew() est @Transactional(propagation = REQUIRES_NEW)

// Version E — Version A, mais InvalidCertificationException extends Exception (checked) et renewAll la déclare en throws
```

<details>
<summary>Solution</summary>

| Version | Mises à jour | Pourquoi |
|---|---|---|
| **A** | **0** | Une seule transaction ; l'exception runtime sort de la méthode → **rollback complet** des 136 modifications. |
| **B** | **136** | Pas de transaction externe : chaque `save()` s'exécute dans **sa propre** transaction de repository et committe ; la boucle s'arrête à la n°137 → 1–136 enregistrées, 137–200 jamais traitées. |
| **C** | **0** + `UnexpectedRollbackException` | Le `REQUIRED` interne rejoint la transaction externe ; l'exception qui traverse le proxy interne la marque **rollback-only** ; l'attraper n'y change rien → le commit échoue, tout est annulé. |
| **D** | **199** | Chaque élément a **sa propre** transaction ; la n°137 est annulée seule, les autres sont committées. (La transaction externe est suspendue ; `REQUIRES_NEW` demande une connexion supplémentaire par appel.) |
| **E** | **136** | Exception **checked** → par défaut Spring **committe** ce qui a été fait avant l'exception (1–136) ; 137–200 non traitées. Utiliser `rollbackFor` si ce n'est pas voulu. ⚠️ Si `renew()` a modifié la n°137 **avant** de lever l'exception, cet état modifié est aussi flushé — valider **avant** de modifier. |

**Ce que l'intervieweur veut entendre :** vous raisonnez sur **où est la frontière transactionnelle**, **quel type d'exception**, et **si elle traverse un proxy**. Ensuite : *demander au métier* — tout ou rien (A, avec validation **avant** d'écrire) ou au mieux (type D : une transaction par élément/paquet, collecte des erreurs, rapport « 199 OK, 1 en échec : #137 – raison »), et rendre le traitement **idempotent** pour pouvoir relancer le lot.

**Bonus — version « au mieux » propre :**

```java
public BatchReport renewAll(List<Long> ids) {           // pas de transaction ici
    BatchReport report = new BatchReport();
    for (Long id : ids) {
        try {
            renewalService.renew(id);                  // @Transactional sur un autre bean
            report.success(id);
        } catch (InvalidCertificationException e) {
            report.failure(id, e.getMessage());
        }
    }
    return report;
}
```

</details>

### Exercice 4 — Unicité d'un numéro de certification
Ce code est-il sûr ? Que changeriez-vous ?

```java
@Transactional
public CertificationDto register(RegisterCertificationRequest req) {
    if (repository.existsByNumber(req.number())) {
        throw new DuplicateCertificationException(req.number());
    }
    Certification saved = repository.save(new Certification(req.number(), req.type(), req.validUntil()));
    return mapper.toDto(saved);
}
```

<details>
<summary>Solution</summary>

**Problème :** **condition de course check-then-act**. Deux requêtes concurrentes avec le même numéro passent toutes deux `existsByNumber()` (aucune n'a encore committé) et insèrent toutes les deux → **doublon**. Cela ne protège pas non plus contre les autres écrivains.

**Correction :**
1. **Contrainte unique** dans PostgreSQL (migration Flyway) :
   ```sql
   ALTER TABLE certification ADD CONSTRAINT uk_certification_number UNIQUE (number);
   ```
2. **Garder** le contrôle `exists` pour un message d'erreur clair dans le cas courant.
3. **Traduire** la violation en erreur métier :

```java
@Transactional
public CertificationDto register(RegisterCertificationRequest req) {
    if (repository.existsByNumber(req.number())) {
        throw new DuplicateCertificationException(req.number());
    }
    try {
        Certification saved = repository.saveAndFlush(
            new Certification(req.number(), req.type(), req.validUntil()));
        return mapper.toDto(saved);
    } catch (DataIntegrityViolationException e) {
        if (isConstraint(e, "uk_certification_number")) {
            throw new DuplicateCertificationException(req.number());
        }
        throw e;
    }
}

// @RestControllerAdvice
@ExceptionHandler(DuplicateCertificationException.class)
ResponseEntity<ProblemDetail> duplicate(DuplicateCertificationException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage()));
}
```

- `saveAndFlush` pour que l'INSERT s'exécute **dans** le `try` (sinon la violation peut n'apparaître qu'au commit, hors de la méthode).
- Nuance pour les relances : l'exception traverse le proxy transactionnel du repository, donc la transaction est déjà marquée **rollback-only** — sans conséquence ici car on **relance** une exception ; on ne pourrait pas « attraper et continuer » dans la même transaction.
- Après une violation de contrainte, PostgreSQL **avorte la transaction** — ne pas continuer à l'utiliser.
- **Le tester** : test d'intégration avec PostgreSQL en Testcontainers qui lance deux inserts **en concurrence** et vérifie un 201 + un 409.

**Relances :** *« Unicité seulement pour les certifications actives ? »* → **index unique partiel** `... WHERE revoked_at IS NULL`. *« Insensible à la casse ? »* → index unique sur `lower(number)` (ou un value object normalisé).

</details>

### Exercice 5 — Revue d'un composant Angular
Identifiez les problèmes de performance et de conception.

```ts
@Component({
  selector: 'app-expert-list',
  template: `
    <input (keyup)="search = $any($event.target).value" />
    <div *ngFor="let expert of getFilteredExperts()">
      {{ expert.name }} — {{ formatCertifications(expert) }}
    </div>
  `,
})
export class ExpertListComponent implements OnInit {
  experts: any[] = [];
  search = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/experts').subscribe(data => this.experts = data);
  }

  getFilteredExperts() {
    return this.experts
      .filter(e => e.name.toLowerCase().includes(this.search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  formatCertifications(expert: any) {
    return expert.certifications.map((c: any) => c.type).join(', ');
  }
}
```

<details>
<summary>Solution</summary>

**Problèmes :**
- `getFilteredExperts()` et `formatCertifications()` sont **appelées depuis le template** → ré-exécutées à **chaque cycle de détection de changements** (n'importe quel événement dans l'appli), en filtrant + triant toute la liste à chaque fois.
- Un **nouveau tableau** est renvoyé à chaque fois et il n'y a **pas de `trackBy`** → Angular recrée les lignes du DOM.
- **Détection de changements par défaut** (pas d'`OnPush`).
- Recherche à **chaque keyup** sans debounce ; le filtrage côté client peut ne pas tenir sur de gros volumes.
- **`any` partout** → aucune sécurité de typage.
- **Appel HTTP directement dans le composant** → difficile à tester, logique non réutilisable ; `subscribe` manuel (acceptable pour HttpClient qui se complète, mais une mauvaise habitude pour les flux longs) ; **aucune gestion du chargement/des erreurs**.

**Version améliorée (Angular 17+ avec signals) :**

```ts
@Component({
  selector: 'app-expert-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input [value]="search()" (input)="search.set($any($event.target).value)" />
    @for (expert of filteredExperts(); track expert.id) {
      <app-expert-row [expert]="expert" />
    } @empty {
      <p>No expert found.</p>
    }
  `,
})
export class ExpertListComponent {
  private readonly expertService = inject(ExpertService);

  readonly search = signal('');
  readonly experts = toSignal(this.expertService.getExperts(), { initialValue: [] as Expert[] });

  readonly filteredExperts = computed(() => {
    const term = this.search().toLowerCase();
    return this.experts()
      .filter(e => e.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
}
```

- `computed()` ne recalcule **que lorsque `search` ou `experts` changent**.
- `track expert.id` → mises à jour minimales du DOM ; `OnPush` → moins de vérifications.
- `ExpertService` gère le HTTP (mockable dans les tests) ; interface `Expert` typée.
- Libellés des certifications : les calculer **une fois** dans le mapping/le service ou via un **pipe pur** (`{{ expert.certifications | certificationTypes }}`), dans un composant de présentation `ExpertRowComponent`.
- Pour les grandes listes : filtrage **côté serveur** avec recherche debouncée (`debounceTime(300)`, `switchMap`), pagination ou virtual scroll.

</details>

### Exercice 6 — Tests Playwright instables
Pourquoi ces tests sont-ils instables ? Comment les corriger ?

```ts
test('create expert', async ({ page }) => {
  await page.goto('/experts');
  await page.click('.btn-primary');
  await page.fill('#name', 'John Doe');
  await page.click('text=Save');
  await page.waitForTimeout(3000);
  const rows = await page.locator('table tr').count();
  expect(rows).toBe(6);
});

test('delete expert', async ({ page }) => {
  await page.goto('/experts');
  await page.click('table tr:nth-child(6) .delete');
  await page.waitForTimeout(2000);
  expect(await page.locator('table tr').count()).toBe(5);
});
```

<details>
<summary>Solution</summary>

**Pourquoi instables :**
- **`waitForTimeout`** : attentes arbitraires — trop courtes sur une CI lente, temps perdu quand c'est rapide.
- **Assertions sans retry** : `count()` est lu **une seule fois** ; si le tableau n'est pas encore rafraîchi, ça échoue.
- **Dépendance aux données existantes** : « 6 lignes » suppose exactement 5 experts en base — d'autres tests ou exécutions parallèles changent cela.
- **Dépendance à l'ordre des tests** : `delete expert` repose sur la ligne créée par `create expert` (et `nth-child(6)`) ; en parallèle/ordre aléatoire ou lors d'un retry, ça casse.
- **Sélecteurs fragiles** : `.btn-primary`, `table tr:nth-child(6)`, `text=Save` (ambigu s'il y a deux « Save »).
- `table tr` compte aussi la **ligne d'en-tête**.

**Version corrigée :**

```ts
test('create expert', async ({ page }) => {
  const name = `Expert ${Date.now()}`;                    // données de test uniques
  await page.goto('/experts');
  await page.getByRole('button', { name: 'New expert' }).click();
  await page.getByLabel('Name').fill(name);

  const created = page.waitForResponse(r =>
    r.url().includes('/api/experts') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Save' }).click();
  expect((await created).ok()).toBeTruthy();

  await expect(page.getByRole('row', { name })).toBeVisible();   // réessaie jusqu'à être visible
});

test('delete expert', async ({ page, request }) => {
  const name = `Expert ${Date.now()}`;
  await request.post('/api/experts', { data: { name } });   // préparation propre, indépendante des autres tests

  await page.goto('/experts');
  const row = page.getByRole('row', { name });
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(row).toHaveCount(0);                          // réessaie jusqu'à disparition
});
```

- **Locators par rôle/label** (attente automatique, résistants aux changements CSS), ou `data-testid`.
- **Assertions web-first** qui réessaient ; attendre la **vraie** réponse réseau au lieu de dormir.
- **Chaque test crée ses propres données** (seeding via API/fixtures) et vérifie **ces** données, pas des comptages globaux.
- Configuration : `retries` sur la CI + `trace: 'on-first-retry'` pour **diagnostiquer**, pas pour masquer l'instabilité.

**Bug ou test instable ?** Lancer avec `--repeat-each`, regarder la **trace** : si l'appli affiche vraiment un état faux → bug ; si l'appli est correcte mais que le test a lu trop tôt / ciblé le mauvais élément → problème de test ; si ça n'échoue qu'en parallèle → peut-être un **vrai bug de concurrence** dans l'appli.

</details>

### Exercice 7 — Où placer la logique métier ?
Faites la revue de ce service applicatif.

```java
@Service
public class CertificationService {
    @Transactional
    public void renew(Long certificationId, LocalDate newValidUntil) {
        Certification c = repository.findById(certificationId).orElseThrow();
        if (c.getStatus().equals("REVOKED")) {
            throw new IllegalStateException("Revoked certification");
        }
        if (newValidUntil.isBefore(c.getValidUntil())) {
            throw new IllegalArgumentException("Invalid date");
        }
        if (newValidUntil.isAfter(LocalDate.now().plusYears(5))) {
            throw new IllegalArgumentException("Max 5 years");
        }
        c.setValidUntil(newValidUntil);
        c.setStatus("ACTIVE");
        c.setRenewalCount(c.getRenewalCount() + 1);
        repository.save(c);
        mailService.sendRenewalMail(c.getExpert().getEmail());
    }
}
```

<details>
<summary>Solution</summary>

**Problèmes :**
- **Règles métier dans le service applicatif** (contrôle « révoquée », règles de dates, maximum 5 ans) + entité modifiée via des **setters** → un autre cas d'usage (batch, listener Kafka) peut renouveler sans ces règles.
- Statut en `String`, exceptions génériques (`IllegalStateException`) → erreurs d'API peu claires.
- `LocalDate.now()` codé en dur → difficile à tester ; injecter une **`Clock`**.
- `repository.save(c)` est **inutile** (entité managed, dirty checking).
- **Mail envoyé dans la transaction** : si le commit échoue ensuite, le mail est déjà parti ; un SMTP lent garde la transaction/la connexion ouverte. → publier un **événement de domaine** traité **après le commit** (`@TransactionalEventListener(phase = AFTER_COMMIT)`) ou via une **outbox**.
- `c.getExpert().getEmail()` → lazy loading potentiel dans le service.

**Refactoré :**

```java
// Domaine
public class Certification {
    public void renew(LocalDate newValidUntil, Clock clock) {
        if (status == CertificationStatus.REVOKED) throw new CertificationRevokedException(number);
        if (!newValidUntil.isAfter(validUntil)) throw new InvalidRenewalDateException(number, newValidUntil);
        if (newValidUntil.isAfter(LocalDate.now(clock).plusYears(5))) throw new RenewalTooLongException(number);
        this.validUntil = newValidUntil;
        this.status = CertificationStatus.ACTIVE;
        this.renewalCount++;
        registerEvent(new CertificationRenewed(id, newValidUntil));
    }
}

// Service applicatif = orchestration uniquement
@Transactional
public void renew(RenewCertificationCommand cmd) {
    Certification c = repository.findById(cmd.id()).orElseThrow(() -> new CertificationNotFoundException(cmd.id()));
    c.renew(cmd.newValidUntil(), clock);
}

// Effet de bord après le commit
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
void on(CertificationRenewed event) { notificationPort.sendRenewalConfirmation(event); }
```

Les règles sont maintenant **testables unitairement sans Spring**, impossibles à contourner, et le mail n'est envoyé **que si les données sont committées**.

</details>
