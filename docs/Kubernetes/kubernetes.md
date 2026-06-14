---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Kubernetes
# <TOCInline toc={toc} />

## What is Kubernetes?
**Kubernetes (K8s)** is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google, it is now maintained by the CNCF (Cloud Native Computing Foundation).

Key problems Kubernetes solves:
- **Automated scheduling**: places containers on the right nodes based on resource needs.
- **Self-healing**: restarts failed containers, replaces unresponsive nodes.
- **Horizontal scaling**: scales workloads up/down automatically or on demand.
- **Load balancing**: distributes traffic across healthy container instances.
- **Rolling updates & rollbacks**: deploy new versions with zero downtime.

## What are the main components of a Kubernetes cluster?

**Control Plane** (manages the cluster):
| Component | Role |
|---|---|
| `kube-apiserver` | The front door — all `kubectl` commands go through it |
| `etcd` | Distributed key-value store — the cluster's source of truth |
| `kube-scheduler` | Assigns Pods to Nodes based on resource availability |
| `kube-controller-manager` | Runs controllers (ReplicaSet, Node, Job...) |
| `cloud-controller-manager` | Integrates with cloud provider APIs (AWS, GCP, Azure) |

**Worker Nodes** (run the workloads):
| Component | Role |
|---|---|
| `kubelet` | Agent on each node — ensures containers run as specified |
| `kube-proxy` | Manages network rules for Pod-to-Pod communication |
| Container runtime | Runs the containers (`containerd`, `CRI-O`) |

## What is a Pod?
A **Pod** is the smallest deployable unit in Kubernetes. It wraps one or more containers that share:
- The same **network namespace** (same IP, same port space)
- The same **storage volumes**
- The same **lifecycle** (they start and stop together)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:1.0
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

> In practice, you rarely create Pods directly — you use a **Deployment** which manages Pods for you.

## What is a Deployment?
A **Deployment** is the standard way to run stateless applications. It manages a set of identical Pods (a ReplicaSet) and ensures the desired number are always running.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:1.0
          ports:
            - containerPort: 8080
```

Key features:
- **Rolling updates**: `kubectl set image deployment/my-app app=my-app:2.0`
- **Rollback**: `kubectl rollout undo deployment/my-app`
- **Scaling**: `kubectl scale deployment/my-app --replicas=5`

## What is a Service in Kubernetes?
A **Service** provides a stable network endpoint (IP + DNS name) for a set of Pods. Since Pods are ephemeral (they can restart with new IPs), Services decouple the consumer from the Pod lifecycle.

| Service Type | Use case |
|---|---|
| `ClusterIP` (default) | Internal access only — Pod-to-Pod within the cluster |
| `NodePort` | Exposes the service on a static port on each Node |
| `LoadBalancer` | Provisions a cloud load balancer (AWS ELB, GCP LB) |
| `ExternalName` | Maps to an external DNS name |

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
spec:
  selector:
    app: my-app        # routes to all Pods with this label
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
```

## What is the difference between a Deployment and a StatefulSet?

| | `Deployment` | `StatefulSet` |
|---|---|---|
| Pod identity | Pods are interchangeable | Each Pod has a stable, unique identity (`app-0`, `app-1`) |
| Storage | Shared or no persistent storage | Each Pod gets its own PersistentVolumeClaim |
| Scaling | Any order | Ordered, one at a time |
| Use case | Stateless apps (APIs, web servers) | Stateful apps (databases, Kafka, Zookeeper) |

```yaml
# StatefulSet example for a database
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "postgres"
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  volumeClaimTemplates:           # each Pod gets its own PVC
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

## What is a ConfigMap and a Secret?
Both decouple configuration from container images.

**ConfigMap** — stores non-sensitive configuration as key-value pairs:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "postgres-svc"
  APP_PORT: "8080"
```

**Secret** — stores sensitive data base64-encoded (passwords, tokens, keys):
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:              # Kubernetes base64-encodes automatically
  DB_PASSWORD: "s3cr3t"
```

Using them in a Pod:
```yaml
envFrom:
  - configMapRef:
      name: app-config
  - secretRef:
      name: db-secret
```

> Secrets are not encrypted by default in `etcd` — use encryption at rest or a secret manager (HashiCorp Vault, AWS Secrets Manager) in production.

## What is an Ingress?
An **Ingress** is an API object that manages external HTTP/HTTPS access to Services within the cluster. It acts as a reverse proxy / L7 load balancer.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /users
            pathType: Prefix
            backend:
              service:
                name: users-svc
                port:
                  number: 80
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: orders-svc
                port:
                  number: 80
  tls:
    - hosts:
        - api.example.com
      secretName: tls-secret
```

An **Ingress Controller** (e.g. nginx, Traefik, AWS ALB) must be installed to process Ingress resources.

## What are Kubernetes Probes?
Probes are health checks that `kubelet` runs on containers to determine their state.

| Probe | Purpose | Action on failure |
|---|---|---|
| `livenessProbe` | Is the container alive? | Restart the container |
| `readinessProbe` | Is the container ready to serve traffic? | Remove from Service endpoints |
| `startupProbe` | Has the container finished starting? | Disable liveness/readiness until started |

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
```

## What is a Namespace?
A **Namespace** is a virtual cluster within a physical Kubernetes cluster. It isolates resources by team, environment, or application.

```bash
kubectl create namespace staging
kubectl get pods -n staging
kubectl apply -f deployment.yaml -n staging
```

Common conventions:
- `default` — for quick tests (avoid in production)
- `kube-system` — Kubernetes internal components
- `production`, `staging`, `dev` — environment separation
- `team-a`, `team-b` — team separation with RBAC

## What is a PersistentVolume and PersistentVolumeClaim?
Kubernetes decouples storage provisioning from consumption:

- **PersistentVolume (PV)**: a piece of storage provisioned by an admin or dynamically via a StorageClass.
- **PersistentVolumeClaim (PVC)**: a request for storage by a Pod. Kubernetes binds the PVC to a matching PV.

```yaml
# PVC — what the app requests
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: standard
---
# Use in a Pod
volumes:
  - name: db-storage
    persistentVolumeClaim:
      claimName: db-pvc
```

## What is the Horizontal Pod Autoscaler (HPA)?
The **HPA** automatically scales the number of Pod replicas based on observed CPU/memory usage or custom metrics.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70    # scale up if avg CPU > 70%
```

```bash
kubectl autoscale deployment my-app --cpu-percent=70 --min=2 --max=10
```

## What is a DaemonSet?
A **DaemonSet** ensures that **one Pod runs on every Node** (or a subset of Nodes). Used for node-level infrastructure tasks.

Common use cases: log collectors (Fluentd, Filebeat), monitoring agents (Prometheus node-exporter), network plugins (Calico, Weave).

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      containers:
        - name: fluentd
          image: fluentd:latest
```

## What is the difference between `kubectl apply` and `kubectl create`?

| | `kubectl create` | `kubectl apply` |
|---|---|---|
| Behavior | Creates a new resource; fails if it already exists | Creates if not exists, **updates** if it does |
| Source of truth | Imperative (one-time command) | Declarative (file is the truth) |
| Idempotent | No | Yes |
| Best for | Quick one-off creation | CI/CD pipelines, GitOps |

> Always prefer `kubectl apply -f` in automated workflows.

## What is a ResourceQuota?
A **ResourceQuota** limits the total resources (CPU, memory, object count) that can be consumed in a Namespace — preventing one team from starving others.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: team-a
spec:
  hard:
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"
    pods: "20"
```
