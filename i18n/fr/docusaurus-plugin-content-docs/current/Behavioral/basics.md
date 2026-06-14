import TOCInline from '@theme/TOCInline';


# Les Bases
# <TOCInline toc={toc} />

## Donnez-moi un exemple d'un projet que vous avez mené à bien avec succès.
J'utilise la méthode **STAR** (Situation → Tâche → Action → Résultat) :

- **Situation** : Dans mon précédent poste, l'équipe avait une application monolithique legacy qui devenait un frein — les déploiements prenaient des heures et toute modification risquait de casser des fonctionnalités non liées.
- **Tâche** : J'ai été chargé de mener la migration du module le plus critique (gestion des commandes) vers un microservice Spring Boot autonome.
- **Action** : J'ai d'abord défini le contrat API avec OpenAPI/Swagger, extrait la logique métier, mis en place un pipeline CI/CD avec Jenkins, et coordonné avec l'équipe front-end pour basculer progressivement via un feature flag.
- **Résultat** : Le temps de déploiement de ce module est passé de 2 heures à moins de 10 minutes. L'équipe a adopté la même approche pour deux autres modules le trimestre suivant.

> **Conseil** : Choisissez un projet où votre impact est clair. Quantifiez le résultat chaque fois que possible.

## Parlez-moi d'une situation où vous avez dû résoudre un problème technique difficile.
- **Situation** : Notre application en production subissait des crashs `OutOfMemoryError` aléatoires tous les 2–3 jours. Le problème était intermittent et non reproductible en staging.
- **Tâche** : Identifier la cause racine et corriger sans interrompre le service.
- **Action** : J'ai activé le dump heap JVM au crash (`-XX:+HeapDumpOnOutOfMemoryError`), analysé le dump avec Eclipse MAT, et découvert un cache retenant indéfiniment des références vers de grands objets — le TTL était écrasé par une propriété Spring Boot par défaut.
- **Résultat** : J'ai corrigé la configuration du cache et ajouté une alerte de monitoring pour un heap supérieur à 80%. Les crashs ont cessé immédiatement et nous avons gagné une visibilité que nous n'avions pas auparavant.

> **Conseil** : Montrez votre processus de débogage — les intervieweurs s'intéressent à *comment* vous pensez, pas seulement que vous avez résolu le problème.

## Décrivez une situation où vous étiez en désaccord avec un collègue et comment vous l'avez résolu.
- **Situation** : Un collègue senior proposait d'utiliser une base de données partagée entre deux microservices pour éviter de dupliquer les données. Je pensais que cela violait le principe d'indépendance des microservices.
- **Tâche** : Défendre l'approche architecturale correcte sans créer de conflit.
- **Action** : Au lieu d'une confrontation directe, j'ai préparé un court document avec les avantages/inconvénients des deux approches, référencé les patterns microservices de Martin Fowler, et proposé une réunion avec le tech lead. J'ai reconnu le coût à court terme de la duplication et suggéré une synchronisation événementielle comme compromis.
- **Résultat** : L'équipe a accepté l'approche événementielle. Mon collègue a apprécié que j'appuie ma position sur des données plutôt que sur une opinion, et nous avons collaboré étroitement sur l'implémentation.

> **Conseil** : Montrez que vous pouvez défendre votre position professionnellement tout en restant ouvert au dialogue.

## Que feriez-vous si on vous confiait un projet que vous ne savez pas comment réaliser ?
1. **Décomposer** : Diviser le projet en parties plus petites et identifiez précisément les parties inconnues.
2. **Rechercher** : Utiliser la documentation officielle, des sources fiables et des projets open source similaires comme références.
3. **Poser des questions tôt** : Signaler les inconnues à l'équipe ou au tech lead dès que possible — ne jamais rester bloqué en silence.
4. **Prototyper** : Construire une preuve de concept pour la partie la plus incertaine avant de s'engager dans une implémentation complète.
5. **Itérer** : Livrer de façon incrémentale, en recueillant des retours au fur et à mesure plutôt qu'en attendant que tout soit "parfait".

> Je vois un projet inconnu comme une opportunité de croissance. La capacité d'apprendre rapidement et de s'adapter est plus précieuse que de tout savoir d'avance.

## Comment géreriez-vous un client difficile ?
1. **Écouter d'abord** : Laisser la personne expliquer pleinement sa préoccupation sans l'interrompre. La frustration vient souvent du sentiment de ne pas être entendu.
2. **Reconnaître** : Faire preuve d'empathie — "Je comprends que c'est frustrant, et je veux vous aider à résoudre ça."
3. **Clarifier** : Poser des questions précises pour comprendre le vrai besoin sous-jacent plutôt que la plainte exprimée.
4. **Fixer des attentes claires** : Être honnête sur ce qui est possible et dans quel délai — les promesses excessives aggravent les choses.
5. **Faire un suivi** : Après avoir résolu le problème, revérifier que la personne est satisfaite.

> L'objectif est de transformer une interaction difficile en opportunité de renforcer la confiance. Rester calme et orienté solutions est essentiel.

## Que feriez-vous si un projet sur lequel vous travailliez était soudainement annulé ?
1. **Accepter la décision** : Les priorités métier changent — une annulation n'est pas un échec personnel.
2. **Documenter et archiver** : S'assurer que tout le travail est correctement commité, documenté et stocké afin de pouvoir être référencé ou repris plus tard.
3. **Tirer des enseignements** : Écrire une courte rétrospective sur ce qui s'est bien passé et ce qui est à éviter la prochaine fois.
4. **Communiquer** : Informer toutes les parties prenantes (front-end, QA, ops) qui pourraient avoir des dépendances sur le travail annulé.
5. **Avancer de façon productive** : Rediriger l'énergie vers la prochaine priorité sans s'attarder sur l'effort annulé.

> Faire preuve de maturité et de professionnalisme quand les choses ne se passent pas comme prévu est l'une des qualités les plus appréciées chez un développeur.

## Parlez-moi de votre formation en informatique et de ce que vous avez appris.
Ma formation m'a donné de solides bases :
- **Fondamentaux** : Algorithmes, structures de données, analyse de complexité (Big-O) et mathématiques discrètes — les briques de base de tout problème technique.
- **Génie logiciel** : Conception orientée objet, modélisation UML et cycle de vie logiciel (besoins → conception → implémentation → tests).
- **Systèmes** : Systèmes d'exploitation (processus, threads, gestion mémoire), réseaux (TCP/IP, HTTP) et bases de données (modèle relationnel, SQL, normalisation).
- **Compétences pratiques** : Travail en équipe sur des projets multi-mois, utilisation du contrôle de version, rédaction de documentation technique.

Au-delà des cours, ce que j'apprécie le plus, c'est qu'elle m'a appris à *penser* les problèmes — décomposer la complexité, raisonner sur les compromis et questionner les hypothèses.

## Quelles sont vos meilleures qualités ?
- **Esprit de résolution de problèmes** : J'aime décomposer les problèmes techniques complexes en parties gérables et trouver des solutions élégantes.
- **Apprentissage continu** : Je suis activement des blogs techniques, lis la documentation et travaille sur des projets personnels pour rester à jour.
- **Collaboration** : Je communique bien avec mes collègues, suis à l'aise pour donner et recevoir des retours, et valorise l'intelligence collective.
- **Souci du détail** : Je me préoccupe de la qualité du code, écris des tests significatifs et documente mon travail pour que d'autres puissent le maintenir.
- **Fiabilité** : Je livre ce que je m'engage à faire, signale les risques tôt et n'hésite pas à demander de l'aide si nécessaire.

## Pourquoi devrions-nous vous embaucher ?
- J'apporte une solide expérience pratique de l'écosystème Java/Spring — le cœur de votre stack.
- Je ne suis pas seulement un codeur : je pense à l'architecture, à la maintenabilité et à l'impact sur l'équipe en aval.
- Je m'adapte rapidement — quand je ne connais pas quelque chose, je l'apprends efficacement sans avoir besoin d'encadrement constant.
- Je suis un joueur d'équipe qui communique de façon proactive et contribue au-delà de mon ticket individuel.
- Je suis genuinement intéressé par ce rôle spécifiquement — pas seulement un emploi quelconque, mais le bon.

> **Conseil** : Adaptez cette réponse à l'entreprise que vous interviewez. Référencez quelque chose de spécifique sur leur produit, stack ou culture.

## Quelle est la solution dont vous êtes le plus fier ?
Une optimisation de performance que j'ai implémentée sur une API REST qui subissait des timeouts sous charge :

- L'endpoint récupérait des données liées avec des requêtes N+1 — une requête par ligne retournée.
- J'ai réécrit le repository JPA pour utiliser une seule requête JOIN FETCH et ajouté un cache de second niveau Hibernate pour les données de référence à forte lecture.
- Le temps de réponse est passé de ~3 secondes à moins de 200ms sous la même charge.

Ce dont je suis fier, ce n'est pas seulement le résultat, mais le processus : j'ai mesuré d'abord (avec JProfiler), confirmé la cause racine, corrigé dans la bonne couche, et ajouté un test pour éviter la régression.

## Où vous voyez-vous dans 5 ans ?
Dans 5 ans, je me vois comme **développeur senior ou tech lead**, avec :
- Une expertise approfondie des systèmes distribués et des applications Java cloud-native.
- La capacité de prendre des décisions architecturales et de mentorer des développeurs juniors.
- Un bilan de projets complexes livrés de bout en bout, pas seulement des fonctionnalités individuelles.

Je ne cherche pas seulement un titre — je veux évoluer dans un endroit où je suis challengé, où l'équipe se soucie de la qualité, et où je peux contribuer à des produits qui ont du sens.

## Quelles sont vos points faibles ?
**Le perfectionnisme** : Je passe parfois plus de temps que nécessaire à peaufiner quelque chose avant de le partager, parce que je veux que ce soit correct avant que les autres le voient.

Je travaille activement dessus en :
- Adoptant une mentalité "suffisamment bon pour partager" pour les brouillons et les branches WIP.
- Utilisant le time-boxing — je fixe une limite sur le temps que je consacre à un détail non critique avant de passer à autre chose.
- Me rappelant que des retours tôt valent mieux qu'un résultat parfait trop tard.

> **Conseil** : Associez toujours un point faible à une action concrète que vous prenez pour y remédier. Ne jamais dire "je travaille trop" — les intervieweurs le voient clairement.

## Lorsque vous êtes bloqué sur un ticket, comment réagissez-vous ?
1. Soumettre le problème à l'attention de l'équipe Scrum lors du forum approprié, comme le Daily Scrum ou une réunion d'équipe.
2. Demander l'aide des membres concernés de l'équipe (Scrum Master, Product Owner, ou autres développeurs) qui pourraient avoir les connaissances nécessaires pour résoudre le blocage.
3. Avec l'équipe, discuter et évaluer des solutions potentielles pour surmonter le blocage (**intelligence collective pour trouver une solution**).
