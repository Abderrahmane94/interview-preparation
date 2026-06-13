import TOCInline from '@theme/TOCInline';


# SQL
# <TOCInline toc={toc} />

## Quelle est la différence entre SQL et NoSQL ?
**SQL** et **NoSQL** sont deux types différents de **systèmes de gestion de bases de données** :

1. **SQL (Structured Query Language)** :
    - Les bases de données SQL reposent sur un **modèle de données structuré** avec un schéma prédéfini.
    - Elles utilisent un **format tabulaire** avec des **lignes** et des **colonnes**, les données étant organisées en tables.
    - Les bases SQL garantissent les propriétés **ACID** (Atomicité, Cohérence, Isolation, Durabilité), assurant l'intégrité des données et la cohérence transactionnelle.
    - Elles conviennent aux **données complexes et structurées**, avec des langages de requête puissants pour la manipulation et la récupération des données.
    - Elles sont couramment utilisées dans les applications à schéma fixe, comme les **systèmes financiers** ou les applications avec des **relations de données strictes**.

2. **NoSQL (Not Only SQL)** :
    - Les bases NoSQL sont conçues pour traiter de **grands volumes** de données **non structurées** ou **semi-structurées**.
    - Elles offrent des **modèles de schéma flexibles**, permettant de stocker les données dans divers **formats** : **paires clé-valeur**, **documents**, **graphes** ou **colonnes larges**.
    - Les bases NoSQL sont évolutives horizontalement, capables de gérer de grandes quantités de données et des charges de trafic élevées.
    - Elles offrent de **hautes performances** et **scalabilité**, avec la possibilité de distribuer les données sur plusieurs nœuds ou clusters.
    - Elles sont souvent utilisées dans les applications aux **exigences changeantes**, comme les **plateformes de réseaux sociaux**, l'**analytique en temps réel** ou les **systèmes de gestion de contenu**.

## Comment choisir entre SQL et NoSQL ?
- **Structure des données** : SQL convient aux données structurées avec des schémas fixes, tandis que NoSQL s'adapte aux formats de données flexibles et non structurés.
- **Scalabilité** : les bases NoSQL excellent en scalabilité horizontale, idéales pour les systèmes distribués à grande échelle.
- **Cohérence des données** : les bases SQL privilégient une forte cohérence, tandis que les bases NoSQL peuvent sacrifier une certaine cohérence au profit de meilleures performances et scalabilité.
- **Flexibilité de développement** : les bases NoSQL permettent un développement agile et des changements rapides de modèles de données, tandis que les bases SQL nécessitent plus de planification et une définition préalable du schéma.

## Qu'est-ce que les jointures SQL (SQL Joins) ?
Les jointures SQL combinent des lignes de deux tables ou plus sur la base d'une colonne commune. Il existe 4 types principaux :

1. **INNER JOIN** — retourne uniquement les lignes où la condition de jointure est satisfaite dans **les deux** tables.
```sql
SELECT e.name, d.name FROM Employee e
INNER JOIN Department d ON e.dept_id = d.id;
```

2. **LEFT JOIN** — retourne **toutes les lignes de la table gauche**, plus les lignes correspondantes de la table droite (NULL si pas de correspondance).
```sql
SELECT e.name, d.name FROM Employee e
LEFT JOIN Department d ON e.dept_id = d.id;
```

3. **RIGHT JOIN** — retourne **toutes les lignes de la table droite**, plus les lignes correspondantes de la table gauche.

4. **FULL JOIN** — retourne **toutes les lignes des deux tables** quelle que soit la correspondance (NULL pour les côtés sans correspondance).

## Quelle est la différence entre TRUNCATE et DELETE ?

| | `TRUNCATE` | `DELETE` |
|---|---|---|
| Type | DDL | DML |
| Supprime | Toutes les lignes uniquement | Toutes ou certaines lignes (avec `WHERE`) |
| Journal des transactions | Minimal (plus rapide) | Enregistre chaque ligne (plus lent) |
| Rollback | ❌ Non rollbackable | ✅ Peut être annulé |
| Permission requise | ALTER | DELETE |

```sql
TRUNCATE TABLE employee;                  -- supprime toutes les lignes, rapide
DELETE FROM employee WHERE name = 'Mark'; -- suppression ciblée, annulable
```

## Quelle est la différence entre DDL et DML ?

- **DDL (Data Definition Language)** : définit la structure de la base de données. Les commandes sont **auto-commitées**.
  - `CREATE`, `ALTER`, `DROP`, `TRUNCATE`
- **DML (Data Manipulation Language)** : gère les données dans la structure. Les commandes ne sont **pas auto-commitées** (peuvent être annulées avec rollback).
  - `INSERT`, `UPDATE`, `DELETE`, `SELECT`

## Quelle est la différence entre une Function et une Stored Procedure ?

| | Function | Stored Procedure |
|---|---|---|
| Valeur de retour | Doit retourner une valeur | Peut retourner zéro ou n valeurs |
| Paramètres | Entrée uniquement | Entrée et sortie |
| Instructions DML | ❌ Non autorisées | ✅ Autorisées |
| Transactions | ❌ Non autorisées | ✅ Autorisées |
| Utilisable dans SELECT | ✅ Oui | ❌ Non |
| Gestion des exceptions | ❌ Pas de try-catch | ✅ try-catch autorisé |

## Quelle est la différence entre UNION et UNION ALL ?
Les deux combinent les résultats de deux requêtes (même nombre de colonnes requis) :
- **UNION** : supprime les lignes dupliquées — légèrement plus lent.
- **UNION ALL** : conserve toutes les lignes y compris les doublons — plus rapide.

```sql
SELECT name FROM Employees_NY
UNION ALL                       -- conserve les doublons
SELECT name FROM Employees_LA;
```

## Quelle est la différence entre Clé Primaire et Clé Unique ?

| | Clé Primaire | Clé Unique |
|---|---|---|
| Nombre par table | Une seule | Plusieurs autorisées |
| Valeurs NULL | ❌ Non autorisées | ✅ Autorisées |
| Index par défaut | Clustered | Non-clustered |

## Quelle est la différence entre Clé Primaire et Clé Étrangère ?
- **Clé Primaire** : identifie de manière unique chaque ligne de sa propre table. Pas de doublons, pas de NULL.
- **Clé Étrangère** : colonne d'une table qui référence la clé primaire d'une autre table. Assure l'**intégrité référentielle**.

```sql
-- Department a comme clé primaire dept_id
-- Employee la référence comme clé étrangère
ALTER TABLE Employee ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES Department(dept_id);
```

## Quelle est la différence entre index clustered et non-clustered ?

| | Index Clustered | Index Non-Clustered |
|---|---|---|
| Stockage des données | Trie physiquement les données | Structure séparée avec des pointeurs |
| Nombre par table | Un seul | Plusieurs autorisés |
| Créé sur | Clé primaire par défaut | N'importe quelle colonne |
| Vitesse de lecture | Plus rapide | Plus lent (recherche supplémentaire) |
| Vitesse d'écriture | Plus lent | Plus rapide |
| Espace supplémentaire | Non nécessaire | Requis |

## Quelle est la différence entre WHERE et HAVING ?

| | WHERE | HAVING |
|---|---|---|
| Utilisé avec | SELECT, INSERT, UPDATE, DELETE | SELECT uniquement |
| Filtre | Les lignes individuelles | Les groupes |
| Appliqué | Avant GROUP BY | Après GROUP BY |
| Fonctions d'agrégation | ❌ Non autorisées | ✅ Autorisées |

```sql
-- WHERE filtre les lignes avant le regroupement
SELECT dept_id, COUNT(*) FROM Employee WHERE salary > 50000 GROUP BY dept_id;

-- HAVING filtre les groupes après le regroupement
SELECT dept_id, COUNT(*) FROM Employee GROUP BY dept_id HAVING COUNT(*) > 5;
```

## Comment trouver le Nième salaire le plus élevé de la table Employee ?
```sql
SELECT name, salary FROM Employee e1
WHERE N-1 = (
    SELECT COUNT(DISTINCT salary) FROM Employee e2
    WHERE e2.salary > e1.salary
);
-- Remplacer N par 3 pour le 3ème salaire le plus élevé, etc.
```
`DISTINCT` gère les salaires dupliqués. La logique : le Nième salaire le plus élevé signifie qu'exactement N-1 salaires lui sont supérieurs.

## Comment optimiser une requête de base de données lente ?
Pour optimiser une requête lente, on peut envisager les approches suivantes :

1. **Indexation** : créer des index appropriés sur les colonnes utilisées dans les filtres, jointures et tris de la requête. L'indexation améliore significativement les performances en permettant à la base de localiser rapidement les données pertinentes.

2. **Optimisation de la requête** : analyser le plan d'exécution et identifier les opérations inefficaces ou les jointures inutiles. Modifier la requête ou utiliser des hints pour guider l'optimiseur vers un plan d'exécution plus efficace.

3. **Normalisation et dénormalisation** : évaluer le modèle de données pour déterminer si des techniques de normalisation ou dénormalisation peuvent optimiser les performances. La normalisation réduit la redondance, tandis que la dénormalisation consolide les données liées pour minimiser les jointures.

4. **Cache** : implémenter des mécanismes de cache pour stocker en mémoire les résultats de requêtes fréquemment accédés, réduisant ainsi les requêtes répétées à la base de données.

5. **Partitionnement et Sharding** : pour les grands ensembles de données, envisager le partitionnement des données en morceaux plus petits ou le sharding pour les distribuer sur plusieurs serveurs, réduisant ainsi la quantité de données à traiter par requête.

6. **Optimisation matérielle** : s'assurer que les ressources matérielles (CPU, mémoire, disque) sont suffisantes. Optimiser les configurations serveur comme les tailles de buffer et les paramètres de cache.

7. **Réécriture de la requête** : identifier des opportunités de réécriture ou restructuration de la logique pour de meilleures performances. De petits changements dans la structure de la requête peuvent parfois mener à des améliorations significatives.

8. **Optimisation du schéma** : analyser le schéma et identifier les axes d'optimisation : réduire les données redondantes, éviter les colonnes ou tables inutiles, optimiser les types et tailles de données.

9. **Tuning de la base de données** : affiner les paramètres de configuration selon les caractéristiques de la charge de travail et les capacités matérielles (allocation mémoire, timeouts, pool de connexions).

10. **Profilage et surveillance** : utiliser des outils de profilage et de surveillance pour identifier les goulots d'étranglement, les requêtes lentes et les opérations gourmandes en ressources.
