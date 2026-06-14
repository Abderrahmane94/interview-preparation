---
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';

# Terraform
# <TOCInline toc={toc} />

## What is Terraform?
**Terraform** is an open-source Infrastructure as Code (IaC) tool by HashiCorp. It lets you define, provision, and manage cloud infrastructure in a declarative, human-readable configuration language called **HCL** (HashiCorp Configuration Language).

Core advantages:
- **Declarative**: you describe the *desired state*, Terraform figures out how to reach it.
- **Multi-cloud**: AWS, Azure, GCP, Kubernetes, GitHub, Datadog — all via *providers*.
- **Idempotent**: running `terraform apply` multiple times produces the same result.
- **State management**: Terraform tracks what it has created, enabling safe updates and destroys.
- **Plan before apply**: shows you exactly what will change before touching anything.

## What is Infrastructure as Code (IaC)?
**IaC** means managing infrastructure (servers, networks, databases, DNS...) through machine-readable configuration files rather than manual console clicks.

Benefits of IaC:
- **Reproducibility**: spin up identical environments (dev/staging/prod) from the same code.
- **Version control**: infrastructure changes are reviewed via PRs like application code.
- **Automation**: CI/CD pipelines can provision/destroy environments automatically.
- **Documentation**: the code itself documents the infrastructure.
- **Drift detection**: compare live state against declared state and alert on differences.

Other IaC tools: AWS CloudFormation, Pulumi, Ansible, Chef, Puppet.

## What is a Terraform Provider?
A **Provider** is a plugin that lets Terraform interact with a specific API or platform. Each provider exposes **resources** and **data sources**.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}
```

Providers are downloaded from the [Terraform Registry](https://registry.terraform.io/) during `terraform init`.

## What is a Terraform Resource?
A **resource** is the most important building block — it represents a single infrastructure object (an EC2 instance, an S3 bucket, a DNS record...).

```hcl
# Syntax: resource "<provider_type>" "<local_name>" { ... }
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name        = "web-server"
    Environment = "production"
  }
}

# Reference another resource's attribute
resource "aws_eip" "web_ip" {
  instance = aws_instance.web.id   # implicit dependency
}
```

## What are the core Terraform CLI commands?

| Command | What it does |
|---|---|
| `terraform init` | Downloads providers & modules, sets up backend |
| `terraform plan` | Shows what changes will be made (dry-run) |
| `terraform apply` | Applies the planned changes |
| `terraform destroy` | Destroys all managed resources |
| `terraform validate` | Checks HCL syntax and configuration |
| `terraform fmt` | Auto-formats `.tf` files |
| `terraform output` | Prints output values |
| `terraform state list` | Lists resources in state |
| `terraform import` | Import existing resource into state |
| `terraform taint` (deprecated) | Force recreation of a resource |

```bash
terraform init
terraform plan -out=tfplan        # save plan to file
terraform apply tfplan            # apply the saved plan
terraform destroy -target=aws_instance.web   # destroy one resource
```

## What is Terraform State?
**State** is a JSON file (`terraform.tfstate`) that maps your HCL configuration to real-world resources. Without state, Terraform cannot determine what already exists.

```json
{
  "resources": [
    {
      "type": "aws_instance",
      "name": "web",
      "instances": [{ "attributes": { "id": "i-0a1b2c3d", ... } }]
    }
  ]
}
```

**State best practices**:
- Never store `terraform.tfstate` in Git — it may contain secrets.
- Use a **remote backend** (S3 + DynamoDB, Terraform Cloud, Azure Blob) for team collaboration.
- Enable **state locking** to prevent concurrent applies.

## What is a Terraform Backend?
A **backend** defines where and how the state file is stored and whether locking is supported.

```hcl
terraform {
  backend "s3" {
    bucket         = "my-tf-state-bucket"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"   # for state locking
  }
}
```

Without a backend config, state is stored locally — fine for solo/toy projects, not for teams.

## What are Terraform Modules?
A **module** is a reusable set of Terraform resources packaged together. Every Terraform config is implicitly a module (the *root module*). Child modules are called via `module` blocks.

```hcl
# Calling a module from the Terraform Registry
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
}

# Reference module output
resource "aws_instance" "app" {
  subnet_id = module.vpc.private_subnets[0]
}
```

Modules make large configurations DRY and testable — a `modules/` folder in a repo typically holds shared building blocks.

## What is the difference between `count` and `for_each`?
Both create multiple instances of a resource, but behave differently.

**`count`** — indexed, best for identical resources:
```hcl
resource "aws_instance" "web" {
  count         = 3
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = { Name = "web-${count.index}" }
}
```
Identified as `aws_instance.web[0]`, `[1]`, `[2]`. Removing an item in the middle causes all subsequent resources to be recreated (index shift).

**`for_each`** — keyed, best for distinct or named resources:
```hcl
variable "environments" {
  default = { dev = "t3.micro", prod = "t3.large" }
}

resource "aws_instance" "env" {
  for_each      = var.environments
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = each.value
  tags          = { Name = each.key }
}
```
Identified as `aws_instance.env["dev"]`, `["prod"]`. Safe to remove one key without affecting others.

> Prefer `for_each` in most cases — it's more stable.

## What is a Terraform Data Source?
A **data source** reads existing infrastructure (not managed by this config) and makes its attributes available.

```hcl
# Fetch the latest Ubuntu AMI dynamically
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]   # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id   # use the fetched AMI
  instance_type = "t3.micro"
}
```

## What are Terraform Workspaces?
**Workspaces** let you maintain multiple independent state files for the same configuration — useful for environment separation without duplicating code.

```bash
terraform workspace new staging
terraform workspace select production
terraform workspace list
```

```hcl
# Adjust resources per workspace
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "production" ? "t3.large" : "t3.micro"
}
```

> For complex multi-environment setups, separate directories or modules are often cleaner than workspaces.

## What are Terraform Variables and Outputs?

**Input Variables** parameterize a configuration:
```hcl
variable "region" {
  type        = string
  description = "AWS region"
  default     = "eu-west-1"
}

variable "instance_type" {
  type    = string
  # No default — must be provided
}
```
Pass via: `-var="instance_type=t3.micro"`, a `terraform.tfvars` file, or environment variables (`TF_VAR_instance_type`).

**Output Values** expose resource attributes after apply:
```hcl
output "instance_public_ip" {
  value       = aws_instance.web.public_ip
  description = "Public IP of the web server"
  sensitive   = false
}
```
```bash
terraform output instance_public_ip
```

Outputs can be consumed by other modules or CI/CD pipelines (e.g., to write the IP into a config file).

## How do you manage secrets in Terraform?
Terraform is not a secrets manager — secrets passed as variables end up in state (plaintext). Best practices:

1. **Never hardcode** credentials in `.tf` files.
2. **Use environment variables** for provider auth (e.g., `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).
3. **Mark variables as `sensitive = true`** to suppress them in output/logs.
4. **Fetch secrets at runtime** from a secrets manager:
```hcl
data "aws_secretsmanager_secret_version" "db" {
  secret_id = "prod/db-password"
}

resource "aws_db_instance" "main" {
  password = data.aws_secretsmanager_secret_version.db.secret_string
}
```
5. **Encrypt state at rest** (S3 with SSE, Terraform Cloud).
6. Use **HashiCorp Vault** provider for enterprise secret management.
