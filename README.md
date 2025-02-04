Tech Challenge 2

Overview

Tech Challenge 2 is a containerized web application deployed on AWS using EKS (Elastic Kubernetes Service). The application consists of a backend and a frontend, both built as Docker images and deployed to an EKS cluster with Kubernetes.

Prerequisites

Before you begin, ensure you have the following installed:

AWS CLI (configured with the correct IAM permissions)

Terraform (for provisioning AWS infrastructure)

kubectl (to interact with the Kubernetes cluster)

Docker (for building and pushing images)

Git (for version control)

Jenkins (for CI/CD pipeline)

Infrastructure Setup

The infrastructure is provisioned using Terraform. Ensure your AWS credentials are configured correctly.

1️⃣ Deploy EKS Cluster

Run the following commands to deploy the EKS cluster:

terraform init
terraform apply -auto-approve

This will create the necessary AWS resources, including:

EKS Cluster

IAM Roles

VPC and Subnets

Kubernetes Node Groups

2️⃣ Configure kubectl to Access the Cluster

aws eks update-kubeconfig --region us-east-1 --name tech-challenge-cluster

Confirm the cluster is running:

kubectl get nodes

Docker Image Build & Push

The backend and frontend images are pushed to Amazon Elastic Container Registry (ECR).

1️⃣ Authenticate Docker with ECR

eval $(aws ecr get-login --no-include-email --region us-east-1)

2️⃣ Create ECR Repositories

aws ecr create-repository --repository-name backend
aws ecr create-repository --repository-name frontend

3️⃣ Build and Push Images

docker build -t YOUR_ECR_BACKEND_IMAGE ./backend
docker push YOUR_ECR_BACKEND_IMAGE

docker build -t YOUR_ECR_FRONTEND_IMAGE ./frontend
docker push YOUR_ECR_FRONTEND_IMAGE

Deploy Application to EKS

1️⃣ Apply Kubernetes Manifests

Ensure your Kubernetes manifests are correctly configured in the k8s/ directory.

Deploy the application:

kubectl apply -f k8s/

Verify that pods are running:

kubectl get pods

Check service status:

kubectl get services

If the frontend-service LoadBalancer is stuck in pending state, ensure that your subnets are properly tagged:

aws ec2 describe-subnets --filters "Name=vpc-id,Values=<your-vpc-id>"

Manually add the required tag if missing:

aws ec2 create-tags --resources <subnet-id> --tags Key=kubernetes.io/role/elb,Value=1

CI/CD Pipeline (Jenkins)

The project includes a Jenkins pipeline to automate the build, push, and deployment process.

1️⃣ Setup Jenkins

Install the following plugins:

Pipeline

Git

Docker Pipeline

Kubernetes CLI

2️⃣ Add the Jenkinsfile

Ensure the Jenkinsfile is in the repository root with the following stages:

pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        ECR_BACKEND = 'YOUR_ECR_BACKEND_IMAGE'
        ECR_FRONTEND = 'YOUR_ECR_FRONTEND_IMAGE'
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

Trigger a new pipeline build from Jenkins and monitor the stages.

Troubleshooting

❌ LoadBalancer Stuck in Pending

Ensure your EKS worker nodes are in the correct subnets.

Check that subnets have the required ELB tags.

❌ kubectl get services Shows No External IP

Check AWS Load Balancer logs in the EC2 Console.

Verify that worker nodes have outbound internet access.

❌ Terraform State Issues

If Terraform fails to apply changes, run:

terraform state list
terraform state rm <resource-name>
terraform apply -auto-approve

Contributors

[Emmanuel William] - DevOps Engineer

[Tayo] - Developers

License

This project is licensed under the MIT License.

🚀 Happy Coding!

