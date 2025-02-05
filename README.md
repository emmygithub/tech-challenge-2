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






Running the Project
1. Clone the Repository
sh
Copy
Edit
git clone https://github.com/YOUR_GITHUB_REPO.git
cd tech-challenge-2
2. Build & Run the Backend
sh
Copy
Edit
cd backend
npm install
npm start
The backend should respond to GET requests at localhost:8080.
3. Build & Run the Frontend
sh
Copy
Edit
cd frontend
npm install
npm start
The frontend should be accessible at localhost:3000.
If the frontend successfully connects to the backend, a message saying "SUCCESS" followed by a GUID should be displayed.
Infrastructure Deployment
1. Provision AWS Infrastructure with Terraform
sh
Copy
Edit
cd infrastructure
terraform init
terraform apply -auto-approve
This will create:

EKS Cluster
IAM Roles
VPC and Subnets
Kubernetes Node Groups
2. Configure kubectl
sh
Copy
Edit
aws eks update-kubeconfig --region us-east-1 --name tech-challenge-cluster
Verify the cluster:

sh
Copy
Edit
kubectl get nodes
3. Build & Push Docker Images
Authenticate Docker with AWS ECR:

sh
Copy
Edit
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.us-east-1.amazonaws.com
Build and push images:

sh
Copy
Edit
docker build -t backend ./backend
docker tag backend:latest <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/backend
docker push <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/backend

docker build -t frontend ./frontend
docker tag frontend:latest <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/frontend
docker push <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/frontend
4. Deploy to Kubernetes
sh
Copy
Edit
kubectl apply -f k8s/
Check pod status:

sh
Copy
Edit
kubectl get pods
Check service status:

sh
Copy
Edit
kubectl get services
Configuration
1. Frontend Configuration
Update frontend/src/config.js with the backend API URL.
This is used in frontend/src/App.js#12 for API calls.
2. Backend Configuration
Update backend/config.js with the frontend URL.
Used in backend/index.js#14 for Access-Control-Allow-Origin in CORS headers.
CI/CD Pipeline (Jenkins)
1. Install Required Plugins
Pipeline
Git
Docker Pipeline
Kubernetes CLI
2. Add the Jenkinsfile
Ensure the Jenkinsfile is in the repo root:

groovy
Copy
Edit
pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        ECR_BACKEND = '<your-account-id>.dkr.ecr.us-east-1.amazonaws.com/backend'
        ECR_FRONTEND = '<your-account-id>.dkr.ecr.us-east-1.amazonaws.com/frontend'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/YOUR_GITHUB_REPO.git'
            }
        }
        stage('Build and Push Backend') {
            steps {
                sh 'docker build -t $ECR_BACKEND ./backend'
                sh 'docker push $ECR_BACKEND'
            }
        }
        stage('Build and Push Frontend') {
            steps {
                sh 'docker build -t $ECR_FRONTEND ./frontend'
                sh 'docker push $ECR_FRONTEND'
            }
        }
        stage('Deploy to EKS') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
Trigger a Jenkins pipeline build and monitor the deployment.

Troubleshooting
❌ LoadBalancer Stuck in Pending
Ensure EKS worker nodes are in the correct subnets.
Check AWS Load Balancer logs in the EC2 Console.
❌ kubectl get services Shows No External IP
Verify worker nodes have outbound internet access.
Manually add missing ELB tags:
sh
Copy
Edit
aws ec2 create-tags --resources <subnet-id> --tags Key=kubernetes.io/role/elb,Value=1
❌ Terraform State Issues
If Terraform fails to apply changes, reset state:

sh
Copy
Edit
terraform state list
terraform state rm <resource-name>
terraform apply -auto-approve
Optional Extras
You can enhance this challenge by adding:

Dockerizing the application 🐳
Infrastructure automation scripts ⚙️
CI/CD pipelines with GitHub Actions or Jenkins 🚀
Running the application in a serverless environment ☁️
Contributors
[Your Name] - DevOps Engineer
[Other Contributors] - Developers
License
This project is licensed under the MIT License.


