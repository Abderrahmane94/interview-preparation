---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Kubernetes
# <TOCInline toc={toc} />

## Qu'est-ce que Kubernetes ?
**Kubernetes (K8s)** est une plateforme open-source d'orchestration de conteneurs qui automatise le déploiement, la mise à l'échelle et la gestion des applications conteneurisées. Initialement développé par Google, il est maintenant maintenu par la CNCF (Cloud Native Computing Foundation).

Problèmes résolus par Kubernetes :
- **Planification automatisée** : place les conteneurs sur les bons nœuds selon les besoins en ressources.
- **Auto-réparation** : redémarre les conteneurs en échec, remplace les nœuds non réactifs.
- **Mise à l'échelle horizontale** : augmente/réduit automatiquement les workloads.
- **Équilibrage de charge** : distribue le trafic entre les instances saines.
- **Mises à jour progressives & rollbacks** : déploie les nouvelles versions sans interruption.

## Quels sont les composants principaux d'un cluster Kubernetes ?

**Plan de contrôle** (gère le cluster) :
| Composant | Rôle |
|---|---|
| `kube-apiserver` | La porte d'entrée — toutes les commandes `kubectl` passent par là |
| `etcd` | Stockage clé-valeur distribué — source de vérité du cluster |
| `kube-scheduler` | Assigne les Pods aux Nœuds selon les ressources disponibles |
| `kube-controller-manager` | Exécute les contrôleurs (ReplicaSet, Node, Job...) |
| `cloud-controller-manager` | Intégration avec les APIs cloud (AWS, GCP, Azure) |

**Nœuds Worker** (exécutent les workloads) :
| Composant | Rôle |
|---|---|
| `kubelet` | Agent sur chaque nœud — s'assure que les conteneurs tournent conformément aux specs |
| `kube-proxy` | Gère les règles réseau pour la communication Pod-à-Pod |
| Runtime de conteneur | Exécute les conteneurs (`containerd`, `CRI-O`) |

## Qu'est-ce qu'un Pod ?
Un **Pod** est la plus petite unité déployable dans Kubernetes. Il regroupe un ou plusieurs conteneurs qui partagent :
- Le même **namespace réseau** (même IP, même espace de ports)
- Les mêmes **volumes de stockage**
- Le même **cycle de vie** (ils démarrent et s'arrêtent ensemble)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mon-app
spec:
  containers:
    - name: app
      image: mon-app:1.0
      ports:
        - containerPort: 8080
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
```

> En pratique, on crée rarement des Pods directement — on utilise un **Deployment** qui les gère.

## Qu'est-ce qu'un Deployment ?
Un **Deployment** est la façon standard de déployer des applications sans état. Il gère un ensemble de Pods identiques (un ReplicaSet) et s'assure que le nombre souhaité tourne toujours.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mon-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mon-app
  template:
    metadata:
      labels:
        app: mon-app
    spec:
      containers:
        - name: app
          image: mon-app:1.0
          ports:
            - containerPort: 8080
```

Fonctionnalités clés :
- **Mise à jour progressive** : `kubectl set image deployment/mon-app app=mon-app:2.0`
- **Rollback** : `kubectl rollout undo deployment/mon-app`
- **Mise à l'échelle** : `kubectl scale deployment/mon-app --replicas=5`

## Qu'est-ce qu'un Service Kubernetes ?
Un **Service** fournit un point de réseau stable (IP + nom DNS) pour un ensemble de Pods. Les Pods étant éphémères (ils peuvent redémarrer avec de nouvelles IPs), les Services découplent le consommateur du cycle de vie des Pods.

| Type de Service | Cas d'usage |
|---|---|
| `ClusterIP` (défaut) | Accès interne uniquement — entre Pods du cluster |
| `NodePort` | Expose le service sur un port statique de chaque Nœud |
| `LoadBalancer` | Provisionne un load balancer cloud (AWS ELB, GCP LB) |
| `ExternalName` | Correspond à un nom DNS externe |

## Quelle est la différence entre Deployment et StatefulSet ?

| | `Deployment` | `StatefulSet` |
|---|---|---|
| Identité des Pods | Pods interchangeables | Chaque Pod a une identité stable et unique (`app-0`, `app-1`) |
| Stockage | Partagé ou sans persistance | Chaque Pod a son propre PersistentVolumeClaim |
| Mise à l'échelle | Dans n'importe quel ordre | Ordonné, un à la fois |
| Cas d'usage | Apps sans état (APIs, serveurs web) | Apps avec état (bases de données, Kafka, Zookeeper) |

## Qu'est-ce qu'un ConfigMap et un Secret ?
Les deux découplent la configuration des images de conteneurs.

**ConfigMap** — stocke la configuration non sensible sous forme de paires clé-valeur.
**Secret** — stocke les données sensibles encodées en base64 (mots de passe, tokens, clés).

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "postgres-svc"
  APP_PORT: "8080"
---
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:
  DB_PASSWORD: "s3cr3t"
```

> Les Secrets ne sont pas chiffrés par défaut dans `etcd` — utilisez le chiffrement au repos ou un gestionnaire de secrets en production.

## Qu'est-ce qu'un Ingress ?
Un **Ingress** est un objet API qui gère l'accès HTTP/HTTPS externe aux Services du cluster. Il agit comme un proxy inverse / load balancer L7.

Un **Ingress Controller** (ex. nginx, Traefik, AWS ALB) doit être installé pour traiter les ressources Ingress.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mon-ingress
spec:
  rules:
    - host: api.exemple.com
      http:
        paths:
          - path: /utilisateurs
            pathType: Prefix
            backend:
              service:
                name: utilisateurs-svc
                port:
                  number: 80
```

## Quelles sont les sondes Kubernetes (Probes) ?
Les sondes sont des vérifications de santé que `kubelet` exécute sur les conteneurs.

| Sonde | But | Action en cas d'échec |
|---|---|---|
| `livenessProbe` | Le conteneur est-il vivant ? | Redémarrer le conteneur |
| `readinessProbe` | Le conteneur est-il prêt à servir du trafic ? | Retirer des endpoints du Service |
| `startupProbe` | Le démarrage est-il terminé ? | Désactiver liveness/readiness jusqu'au démarrage |

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
```

## Qu'est-ce qu'un Namespace ?
Un **Namespace** est un cluster virtuel au sein d'un cluster Kubernetes physique. Il isole les ressources par équipe, environnement ou application.

```bash
kubectl create namespace staging
kubectl get pods -n staging
kubectl apply -f deployment.yaml -n staging
```

## Qu'est-ce qu'un PersistentVolume et un PersistentVolumeClaim ?
Kubernetes découple le provisionnement du stockage de sa consommation :

- **PersistentVolume (PV)** : une unité de stockage provisionnée par un admin ou dynamiquement via un StorageClass.
- **PersistentVolumeClaim (PVC)** : une demande de stockage par un Pod. Kubernetes lie le PVC à un PV correspondant.

## Qu'est-ce que le Horizontal Pod Autoscaler (HPA) ?
Le **HPA** met automatiquement à l'échelle le nombre de répliques de Pods en fonction de l'utilisation CPU/mémoire ou de métriques personnalisées.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: mon-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: mon-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## Qu'est-ce qu'un DaemonSet ?
Un **DaemonSet** garantit qu'**un Pod tourne sur chaque Nœud**. Utilisé pour les tâches d'infrastructure au niveau du nœud : collecteurs de logs (Fluentd, Filebeat), agents de monitoring (Prometheus node-exporter), plugins réseau (Calico).

## Quelle est la différence entre `kubectl apply` et `kubectl create` ?

| | `kubectl create` | `kubectl apply` |
|---|---|---|
| Comportement | Crée ; échoue si la ressource existe déjà | Crée si inexistant, **met à jour** si existant |
| Approche | Impérative (commande ponctuelle) | Déclarative (le fichier est la vérité) |
| Idempotent | Non | Oui |
| Idéal pour | Création rapide ponctuelle | Pipelines CI/CD, GitOps |

## Qu'est-ce qu'un ResourceQuota ?
Un **ResourceQuota** limite les ressources totales (CPU, mémoire, nombre d'objets) consommables dans un Namespace — évitant qu'une équipe prive les autres de ressources.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: quota-equipe
  namespace: equipe-a
spec:
  hard:
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"
    pods: "20"
```
