# Deployment Checklist

1. SSH into EC2 instance:
   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-ip
   ```

2. Install Node.js:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install 16
   ```

3. Install PM2:
   ```bash
   npm install -g pm2
   ```

4. Install Nginx:
   ```bash
   sudo yum update -y
   sudo yum install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

5. Copy Nginx config:
   ```bash
   sudo cp nginx.conf /etc/nginx/conf.d/task-management.conf
   sudo systemctl restart nginx
   ```

6. Create app directory:
   ```bash
   mkdir -p ~/apps/task-management
   cd ~/apps/task-management
   ```

7. Deploy code:
   ```bash
   # From your local machine
   rsync -avz --exclude 'node_modules' --exclude '.git' -e "ssh -i your-key.pem" ./ ec2-user@your-ec2-ip:~/apps/task-management/
   ```

8. On EC2, run deployment:
   ```bash
   cd ~/apps/task-management
   chmod +x deploy.sh
   ./deploy.sh
   ``` 