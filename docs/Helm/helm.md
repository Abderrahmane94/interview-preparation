---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Helm
# <TOCInline toc={toc} />

## What is Helm?
**Helm** is the package manager for Kubernetes. It lets you define, install, and upgrade complex Kubernetes applications using reusable, parameterized templates called **Charts**.

Without Helm you'd manage dozens of raw YAML files per application. Helm bundles them into a single versioned package with configurable defaults.

Key concepts:
- **Chart** — a package of Kubernetes resource templates.
- **Release** — a deployed instance of a Chart in a cluster.
- **Repository** — a collection of Charts (like Docker Hub for images).
- **Values** — configuration inputs that customize a Chart's templates.

## What is a Helm Chart?
A **Chart** is a directory (or `.tgz` archive) with a fixed structure:

```
my-chart/
├── Chart.yaml          # Chart metadata (name, version, description)
├── values.yaml         # Default configuration values
├── templates/          # Kubernetes YAML templates (Go templating)
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── _helpers.tpl    # Reusable template helpers
└── charts/             # Sub-charts (dependencies)
```

**`Chart.yaml`** example:
```yaml
apiVersion: v2
name: my-app
description: A Helm chart for my application
type: application
version: 1.2.0         # Chart version
appVersion: "2.5.1"    # Application version
```

## What is values.yaml and how are values used?
`values.yaml` provides default configuration that templates reference via `{{ .Values.<key> }}`.

```yaml
# values.yaml
replicaCount: 2
image:
  repository: my-app
  tag: "1.0"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: 80
ingress:
  enabled: false
resources:
  limits:
    cpu: 500m
    memory: 256Mi
```

In a template:
```yaml
# templates/deployment.yaml
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

Override at install time:
```bash
# Override inline
helm install my-release ./my-chart --set replicaCount=5

# Override with a custom values file
helm install my-release ./my-chart -f production-values.yaml
```

## What are the main Helm CLI commands?

| Command | Description |
|---|---|
| `helm install <release> <chart>` | Deploy a chart as a new release |
| `helm upgrade <release> <chart>` | Update an existing release |
| `helm install --upgrade` / `helm upgrade --install` | Install if not exists, otherwise upgrade |
| `helm uninstall <release>` | Remove a release and its resources |
| `helm rollback <release> <revision>` | Roll back to a previous revision |
| `helm list` | List all releases in the namespace |
| `helm status <release>` | Show the status of a release |
| `helm get values <release>` | Get the values used in a release |
| `helm template <chart>` | Render templates locally (dry-run) |
| `helm lint <chart>` | Check chart for errors |

```bash
# Full example: add repo, search, install
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm search repo bitnami/postgresql
helm install my-db bitnami/postgresql --set auth.postgresPassword=secret
```

## What is a Helm Release and how does Helm track state?
A **Release** is a named instance of a Chart deployed to a cluster. You can deploy the same Chart multiple times with different release names and values:

```bash
helm install api-prod ./my-chart -f prod-values.yaml -n production
helm install api-staging ./my-chart -f staging-values.yaml -n staging
```

Helm stores release metadata (history, values, manifests) as **Kubernetes Secrets** in the release's namespace (Helm 3). Each `upgrade` creates a new revision, enabling rollbacks.

```bash
helm history my-release
# REVISION  STATUS     CHART          DESCRIPTION
# 1         superseded my-app-1.0.0   Install complete
# 2         superseded my-app-1.1.0   Upgrade complete
# 3         deployed   my-app-1.2.0   Upgrade complete

helm rollback my-release 2   # go back to revision 2
```

## What is the difference between Helm 2 and Helm 3?

| | Helm 2 | Helm 3 |
|---|---|---|
| **Tiller** | Required — a server-side component in the cluster | Removed — client-only |
| **Security** | Tiller had cluster-wide admin rights (security risk) | Uses user's kubeconfig RBAC permissions |
| **Release storage** | ConfigMaps in `kube-system` | Secrets in the release namespace |
| **Chart schema** | `apiVersion: v1` | `apiVersion: v2` |
| **3-way merge** | No — diffs old chart vs new chart | Yes — diffs old chart, new chart, AND live state |
| **CRDs** | Managed with hooks | Dedicated `crds/` directory |

> Helm 3 is the current standard. Helm 2 reached EOL in November 2020.

## What are Helm template helpers (_helpers.tpl)?
`_helpers.tpl` contains reusable template snippets (named templates) prefixed with `_` so Helm ignores them as standalone resources.

```yaml
# templates/_helpers.tpl
{{- define "my-app.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "my-app.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
```

Use in templates:
```yaml
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
```

## What are Helm Hooks?
**Hooks** let you run Jobs at specific points in the release lifecycle:

| Hook | When it runs |
|---|---|
| `pre-install` | Before any resources are created |
| `post-install` | After all resources are created |
| `pre-upgrade` | Before upgrading |
| `post-upgrade` | After upgrading |
| `pre-delete` | Before uninstalling |
| `pre-rollback` / `post-rollback` | Around rollbacks |

```yaml
# A database migration job that runs before upgrade
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migrate
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-weight": "0"
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: my-app:{{ .Values.image.tag }}
          command: ["./migrate.sh"]
      restartPolicy: Never
```

## What is a Chart dependency (sub-chart)?
Charts can declare dependencies on other Charts in `Chart.yaml`:

```yaml
dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled   # optional toggle in values.yaml
  - name: redis
    version: "17.x.x"
    repository: https://charts.bitnami.com/bitnami
```

```bash
helm dependency update ./my-chart   # downloads deps into charts/
helm dependency list ./my-chart     # lists current deps
```

Values for sub-charts live under their name in `values.yaml`:
```yaml
postgresql:
  enabled: true
  auth:
    postgresPassword: "secret"
```

## How do you test a Helm chart before deploying?

```bash
# Render templates locally without deploying
helm template my-release ./my-chart -f values.yaml

# Dry-run against a live cluster (validates against API server)
helm install my-release ./my-chart --dry-run --debug

# Lint for template errors and best practices
helm lint ./my-chart

# Unit test with helm-unittest plugin
helm plugin install https://github.com/helm-unittest/helm-unittest
helm unittest ./my-chart
```

Use `helm template` in CI to validate the rendered output before applying to any cluster.
