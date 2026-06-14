---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Helm
# <TOCInline toc={toc} />

## Qu'est-ce que Helm ?
**Helm** est le gestionnaire de paquets pour Kubernetes. Il permet de définir, installer et mettre à jour des applications Kubernetes complexes grâce à des modèles réutilisables et paramétrables appelés **Charts**.

Concepts clés :
- **Chart** — un paquet de templates de ressources Kubernetes.
- **Release** — une instance déployée d'un Chart dans un cluster.
- **Repository** — une collection de Charts (comme Docker Hub pour les images).
- **Values** — des entrées de configuration qui personnalisent les templates d'un Chart.

## Qu'est-ce qu'un Helm Chart ?
Un **Chart** est un répertoire (ou archive `.tgz`) avec une structure fixe :

```
mon-chart/
├── Chart.yaml          # Métadonnées du Chart (nom, version, description)
├── values.yaml         # Valeurs de configuration par défaut
├── templates/          # Templates YAML Kubernetes (syntaxe Go)
│   ├── deployment.yaml
│   ├── service.yaml
│   └── _helpers.tpl    # Helpers de templates réutilisables
└── charts/             # Sous-charts (dépendances)
```

## Qu'est-ce que values.yaml et comment les valeurs sont-elles utilisées ?
`values.yaml` fournit la configuration par défaut que les templates référencent via `{{ .Values.<clé> }}`.

```yaml
# values.yaml
replicaCount: 2
image:
  repository: mon-app
  tag: "1.0"
service:
  type: ClusterIP
  port: 80
```

Surcharge au moment de l'installation :
```bash
helm install ma-release ./mon-chart --set replicaCount=5
helm install ma-release ./mon-chart -f valeurs-production.yaml
```

## Quelles sont les principales commandes CLI Helm ?

| Commande | Description |
|---|---|
| `helm install <release> <chart>` | Déploie un chart comme nouvelle release |
| `helm upgrade <release> <chart>` | Met à jour une release existante |
| `helm upgrade --install` | Installe si inexistant, sinon met à jour |
| `helm uninstall <release>` | Supprime une release et ses ressources |
| `helm rollback <release> <révision>` | Revient à une révision précédente |
| `helm list` | Liste toutes les releases du namespace |
| `helm template <chart>` | Affiche les templates rendus localement (dry-run) |
| `helm lint <chart>` | Vérifie les erreurs du chart |

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install ma-db bitnami/postgresql --set auth.postgresPassword=secret
```

## Qu'est-ce qu'une Helm Release et comment Helm suit-il l'état ?
Une **Release** est une instance nommée d'un Chart déployée dans un cluster. On peut déployer le même Chart plusieurs fois avec des noms et valeurs différents :

```bash
helm install api-prod ./mon-chart -f prod-values.yaml -n production
helm install api-staging ./mon-chart -f staging-values.yaml -n staging
```

Helm stocke les métadonnées de release sous forme de **Secrets Kubernetes** dans le namespace de la release. Chaque `upgrade` crée une nouvelle révision, permettant les rollbacks.

```bash
helm history ma-release
helm rollback ma-release 2   # revenir à la révision 2
```

## Quelle est la différence entre Helm 2 et Helm 3 ?

| | Helm 2 | Helm 3 |
|---|---|---|
| **Tiller** | Requis — composant côté serveur dans le cluster | Supprimé — client uniquement |
| **Sécurité** | Tiller avait des droits admin cluster (risque de sécurité) | Utilise les permissions RBAC du kubeconfig utilisateur |
| **Stockage de release** | ConfigMaps dans `kube-system` | Secrets dans le namespace de la release |
| **Fusion à 3 voies** | Non | Oui — compare l'ancien chart, le nouveau et l'état réel |

> Helm 3 est le standard actuel. Helm 2 a atteint sa fin de vie en novembre 2020.

## Qu'est-ce que les helpers de templates Helm (_helpers.tpl) ?
`_helpers.tpl` contient des snippets de templates réutilisables (templates nommés). Le préfixe `_` indique à Helm de les ignorer en tant que ressources autonomes.

```yaml
{{- define "mon-app.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}
```

Utilisation dans les templates :
```yaml
metadata:
  name: {{ include "mon-app.fullname" . }}
```

## Qu'est-ce que les Hooks Helm ?
Les **Hooks** permettent d'exécuter des Jobs à des moments spécifiques du cycle de vie de la release :

| Hook | Quand il s'exécute |
|---|---|
| `pre-install` | Avant la création des ressources |
| `post-install` | Après la création de toutes les ressources |
| `pre-upgrade` | Avant la mise à jour |
| `post-upgrade` | Après la mise à jour |
| `pre-delete` | Avant la désinstallation |

```yaml
# Job de migration de base de données avant upgrade
metadata:
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-delete-policy": hook-succeeded
```

## Qu'est-ce qu'une dépendance de Chart (sous-chart) ?
Les Charts peuvent déclarer des dépendances vers d'autres Charts dans `Chart.yaml` :

```yaml
dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
```

```bash
helm dependency update ./mon-chart
```

Les valeurs des sous-charts se trouvent sous leur nom dans `values.yaml` :
```yaml
postgresql:
  enabled: true
  auth:
    postgresPassword: "secret"
```

## Comment tester un Chart Helm avant de déployer ?

```bash
# Afficher les templates localement sans déployer
helm template ma-release ./mon-chart -f values.yaml

# Dry-run contre un cluster réel (valide via l'API server)
helm install ma-release ./mon-chart --dry-run --debug

# Vérification des erreurs et bonnes pratiques
helm lint ./mon-chart
```

Utilisez `helm template` en CI pour valider le rendu avant d'appliquer sur un cluster.
