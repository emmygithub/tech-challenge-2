# Tech Challenge 2

## Overview
This repository contains a **containerized web application** deployed on **AWS EKS (Elastic Kubernetes Service)**. The application consists of:
- **Frontend**: React application
- **Backend**: Express API
- **Infrastructure**: AWS resources managed using **Terraform** and deployed with **Kubernetes**.

## Objective
Deploy the **frontend** and **backend** to a publicly accessible cloud environment. The **AWS Free Tier** is sufficient to run this project, but any cloud provider or tooling may be used.

Fork this repo as a base. You may modify any code in this repository to suit the infrastructure you build for this challenge.

## Submission
1. A **GitHub repository** forked from this repo with all your infrastructure and application code.
2. Modify this `README.md` file with:
   - **Tools required** to deploy the infrastructure.
   - **Steps to repeat the deployment process**.
   - **URLs for the deployed frontend**.

## Evaluation
You will be evaluated based on:
- The **ease of replicating your infrastructure**.
- The **clarity of instructions** provided.
- The **quality and automation of deployment scripts**.

---

## Setup Your Environment

### **1. Install Required Tools**
Ensure the following tools are installed before proceeding:
- [Node.js & npm](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Git](https://git-scm.com/)

For macOS/Linux, use your package manager:
```sh
# Mac (Homebrew)
brew install node docker awscli terraform kubectl git

# Ubuntu/Debian (APT)
sudo apt update && sudo apt install -y nodejs npm docker.io awscli terraform kubectl git


