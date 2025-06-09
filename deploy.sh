#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting deployment process..."

# --- Step 1: Build Docker Image ---
echo "Building Docker image..."
docker build -t smashlabs-app:latest .

# --- Step 2: Tag Docker Image (for registry like Docker Hub or ECR) ---
# Replace yourusername/smashlabs-app with your actual Docker Hub username or ECR repository URI
# echo "Tagging Docker image for registry..."
# docker tag smashlabs-app:latest yourusername/smashlabs-app:latest

# --- Step 3: Push Docker Image to a Registry ---
# echo "Pushing Docker image to registry..."
# docker push yourusername/smashlabs-app:latest

# --- Step 4: Deploy to Production Server (Example: SSH and Docker Compose) ---
# This is a highly simplified example. In a real-world scenario, you would use
# more sophisticated tools like Kubernetes, AWS ECS, Google Cloud Run, etc.
# ssh your_user@your_production_ip << EOF
#   cd /opt/smashlabs  # Navigate to your application directory on the server
#   docker pull yourusername/smashlabs-app:latest  # Pull the latest image
#   docker-compose down # Stop existing containers
#   docker-compose up -d # Start new containers in detached mode
#   echo "Deployment successful!"
# EOF

echo "Deployment script finished. Manual steps might be required for production deployment." 