#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Deploy to EC2
echo "Deploying to EC2..."
rsync -avz --exclude 'node_modules' --exclude '.git' -e "ssh -i ../aws.pem" ./ ubuntu@3.144.95.138:~/apps/task-management/

# Execute remote commands
echo "Restarting application on EC2..."
ssh -i ../aws.pem ubuntu@3.144.95.138 "cd ~/apps/task-management && pm2 restart task-management-api" 