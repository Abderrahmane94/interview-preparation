import TOCInline from '@theme/TOCInline';


# Docker
# <TOCInline toc={toc} />

## Qu'est-ce que Docker ?
Docker est une **plateforme** open-source qui permet d'**automatiser** le **déploiement**, la **mise à l'échelle** et la **gestion** des applications grâce à la **conteneurisation**.

## Qu'est-ce qu'un conteneur ?
La **conteneurisation** est une approche légère de la **virtualisation** qui permet d'**empaqueter** une application et ses dépendances dans une unité standardisée appelée conteneur.
Les **conteneurs** offrent de l'**isolation**, de la **portabilité** et de la **reproductibilité**, facilitant le **déploiement** et l'**exécution** cohérente des applications dans différents environnements.

## Quelle est la différence entre Docker et une machine virtuelle ?
Docker et une machine virtuelle (VM) sont deux technologies pour **exécuter des applications**, mais elles diffèrent par leur approche et leur architecture :

1. **Docker** :
    - Docker est une **plateforme de conteneurisation** qui permet d'**empaqueter** et d'**exécuter** des applications dans des conteneurs isolés.
    - Il utilise le **noyau du système d'exploitation hôte** et **partage les ressources système** (CPU, mémoire, disque) avec l'hôte et les autres conteneurs.
    - Les conteneurs Docker sont **légers**, **rapides à démarrer et arrêter**, et ont moins de surcharge que les VMs.
    - Les conteneurs sont **portables** et s'exécutent de façon cohérente dans **différents environnements**, facilitant le déploiement et la scalabilité.
    - Docker empaquette l'application et ses dépendances dans un **conteneur unique**, fournissant un environnement d'exécution efficace et cohérent.

2. **Machine Virtuelle (VM)** :
    - Une VM est une **émulation logicielle d'un ordinateur physique**, exécutant un système d'exploitation et des applications.
    - Les VMs créent un environnement virtualisé, isolant le système d'exploitation invité et les applications du système hôte.
    - Chaque VM nécessite son **propre système d'exploitation complet**, entraînant une plus grande utilisation des ressources et des **temps de démarrage plus lents**.
    - Les VMs offrent une **isolation** plus forte entre les **applications** et le **système hôte**, les rendant adaptées à l'exécution simultanée de différents systèmes d'exploitation.
    - Les VMs sont souvent utilisées pour les applications legacy ou les environnements bac à sable.

En résumé, **Docker** utilise la **conteneurisation** pour une exécution **légère** et **portable**, tandis que les **machines virtuelles** émulent des **systèmes d'exploitation** complets avec une **isolation plus forte** mais une **surcharge de ressources** plus élevée. Le **choix** dépend du **cas d'usage**, des **besoins en ressources** et des exigences d'**isolation**.
