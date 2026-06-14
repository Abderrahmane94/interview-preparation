---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Terraform
# <TOCInline toc={toc} />

## Qu'est-ce que Terraform ?
**Terraform** est un outil d'Infrastructure as Code (IaC) open-source par HashiCorp. Il permet de définir, provisionner et gérer l'infrastructure cloud dans un langage déclaratif lisible appelé **HCL** (HashiCorp Configuration Language).

Avantages principaux :
- **Déclaratif** : vous décrivez l'*état désiré*, Terraform détermine comment l'atteindre.
- **Multi-cloud** : AWS, Azure, GCP, Kubernetes, GitHub, Datadog — via des *providers*.
- **Idempotent** : exécuter `terraform apply` plusieurs fois produit le même résultat.
- **Gestion d'état** : Terraform suit ce qu'il a créé, permettant des mises à jour et destructions sûres.
- **Plan avant apply** : montre exactement ce qui va changer avant de toucher quoi que ce soit.

## Qu'est-ce que l'Infrastructure as Code (IaC) ?
**L'IaC** signifie gérer l'infrastructure (serveurs, réseaux, bases de données, DNS...) via des fichiers de configuration lisibles par machine plutôt que par des clics manuels.

Avantages :
- **Reproductibilité** : créer des environnements identiques (dev/staging/prod) depuis le même code.
- **Contrôle de version** : les changements d'infrastructure sont revus via des PRs.
- **Automatisation** : les pipelines CI/CD peuvent provisionner/détruire des environnements.
- **Documentation** : le code lui-même documente l'infrastructure.
- **Détection de dérive** : comparer l'état réel à l'état déclaré et alerter sur les différences.

## Qu'est-ce qu'un Provider Terraform ?
Un **Provider** est un plugin qui permet à Terraform d'interagir avec une API ou plateforme spécifique.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}
```

Les providers sont téléchargés depuis le [Terraform Registry](https://registry.terraform.io/) lors du `terraform init`.

## Qu'est-ce qu'une Resource Terraform ?
Une **resource** représente un seul objet d'infrastructure (une instance EC2, un bucket S3, un enregistrement DNS...).

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name        = "serveur-web"
    Environment = "production"
  }
}

# Référencer l'attribut d'une autre ressource
resource "aws_eip" "ip_web" {
  instance = aws_instance.web.id   # dépendance implicite
}
```

## Quelles sont les principales commandes CLI Terraform ?

| Commande | Ce qu'elle fait |
|---|---|
| `terraform init` | Télécharge les providers & modules, configure le backend |
| `terraform plan` | Montre les changements à effectuer (dry-run) |
| `terraform apply` | Applique les changements planifiés |
| `terraform destroy` | Détruit toutes les ressources gérées |
| `terraform validate` | Vérifie la syntaxe HCL et la configuration |
| `terraform fmt` | Formate automatiquement les fichiers `.tf` |
| `terraform output` | Affiche les valeurs de sortie |
| `terraform state list` | Liste les ressources dans l'état |
| `terraform import` | Importe une ressource existante dans l'état |

```bash
terraform init
terraform plan -out=tfplan
terraform apply tfplan
terraform destroy -target=aws_instance.web
```

## Qu'est-ce que le State Terraform ?
**L'état** est un fichier JSON (`terraform.tfstate`) qui mappe la configuration HCL aux ressources réelles. Sans état, Terraform ne peut pas déterminer ce qui existe déjà.

**Bonnes pratiques** :
- Ne jamais stocker `terraform.tfstate` dans Git — il peut contenir des secrets.
- Utiliser un **backend distant** (S3 + DynamoDB, Terraform Cloud) pour la collaboration en équipe.
- Activer le **verrouillage d'état** pour éviter les applies concurrents.

## Qu'est-ce qu'un Backend Terraform ?
Un **backend** définit où et comment le fichier d'état est stocké et si le verrouillage est supporté.

```hcl
terraform {
  backend "s3" {
    bucket         = "mon-bucket-tf-state"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

## Qu'est-ce que les Modules Terraform ?
Un **module** est un ensemble réutilisable de ressources Terraform. Chaque configuration Terraform est implicitement un module (le *module racine*).

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "vpc-production"
  cidr = "10.0.0.0/16"
  azs  = ["eu-west-1a", "eu-west-1b"]
}

resource "aws_instance" "app" {
  subnet_id = module.vpc.private_subnets[0]
}
```

## Quelle est la différence entre `count` et `for_each` ?
Les deux créent plusieurs instances d'une ressource, mais se comportent différemment.

**`count`** — indexé, idéal pour des ressources identiques :
```hcl
resource "aws_instance" "web" {
  count         = 3
  instance_type = "t3.micro"
  tags = { Name = "web-${count.index}" }
}
```
Identifiés par `aws_instance.web[0]`, `[1]`, `[2]`. Supprimer un élément au milieu force la recréation de tous ceux qui suivent.

**`for_each`** — par clé, idéal pour des ressources distinctes ou nommées :
```hcl
variable "environments" {
  default = { dev = "t3.micro", prod = "t3.large" }
}

resource "aws_instance" "env" {
  for_each      = var.environments
  instance_type = each.value
  tags          = { Name = each.key }
}
```
Identifiés par `aws_instance.env["dev"]`, `["prod"]`. Supprimer une clé n'affecte pas les autres.

> Préférez `for_each` dans la plupart des cas — plus stable.

## Qu'est-ce qu'une Data Source Terraform ?
Une **data source** lit l'infrastructure existante (non gérée par cette config) et rend ses attributs disponibles.

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}
```

## Qu'est-ce que les Workspaces Terraform ?
Les **Workspaces** permettent de maintenir plusieurs fichiers d'état indépendants pour la même configuration — utile pour la séparation d'environnements sans dupliquer le code.

```bash
terraform workspace new staging
terraform workspace select production
```

```hcl
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "production" ? "t3.large" : "t3.micro"
}
```

## Que sont les Variables et les Outputs Terraform ?

**Variables d'entrée** — paramétrisent la configuration :
```hcl
variable "region" {
  type    = string
  default = "eu-west-1"
}
```
Passées via : `-var="region=eu-west-1"`, un fichier `terraform.tfvars`, ou des variables d'environnement (`TF_VAR_region`).

**Valeurs de sortie** — exposent les attributs des ressources après apply :
```hcl
output "ip_publique_instance" {
  value       = aws_instance.web.public_ip
  description = "IP publique du serveur web"
}
```

## Comment gérer les secrets dans Terraform ?
Terraform n'est pas un gestionnaire de secrets — les secrets passés comme variables se retrouvent dans l'état (en clair). Bonnes pratiques :

1. **Ne jamais coder en dur** des identifiants dans les fichiers `.tf`.
2. **Utiliser des variables d'environnement** pour l'auth des providers (`AWS_ACCESS_KEY_ID`).
3. **Marquer les variables comme `sensitive = true`** pour les masquer dans les logs.
4. **Récupérer les secrets au moment de l'exécution** depuis un gestionnaire de secrets.
5. **Chiffrer l'état au repos** (S3 avec SSE, Terraform Cloud).
6. Utiliser le provider **HashiCorp Vault** pour la gestion des secrets en entreprise.
