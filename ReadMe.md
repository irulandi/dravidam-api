#!/bin/bash

# Update the system and install Node.js and npm
sudo apt-get update

sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx

# clone the frontend framework
git clone https://github.com/irulandi/dravidam-frontend.git /home/ubuntu/dmk.com

# clone the cms framework 
git clone https://github.com/irulandi/dravidam-cms.git /home/ubuntu/adminpanel

# Clone your Node.js application repository (replace with your Git repo URL)
git clone https://github.com/irulandi/dravidam-api.git /home/ubuntu/quiz

# Change the working directory to your app's directory
cd /home/ubuntu/quiz

# Install application dependencies (if needed)
npm install

# Start your Node.js application using PM2
pm2 start app.js --name Quiz

# Automatically start PM2 on system boot
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Save the current PM2 processes to ensure they restart on system boot
pm2 save

chown www-data:www-data /home/ubuntu/adminpanel/index.html
chmod 644 /home/ubuntu/adminpanel/index.html
chmod o+x /home/ubuntu/adminpanel/

chown www-data:www-data /home/ubuntu/dmk.com/index.html
chmod 644 /home/ubuntu/dmk.com/index.html
chmod o+x /home/ubuntu/dmk.com

# Configure Nginx to serve as a reverse proxy for your Node.js application
sudo tee /etc/nginx/sites-available/quiz.conf > /dev/null <<EOF

server {
    listen 80;
    #server_name kalaignar100.co.in;
    #return 302 https://kalaignar100.co.in$request_uri;

    # SSL configuration
    #listen 443 ssl;
    #ssl_certificate         /home/ubuntu/certs/Work2certb6ade38fd6ec4be1.crt;
    #ssl_certificate_key     /home/ubuntu/certs/kalainger.key;
    #server_name kalaignar100.co.in;

    root /home/ubuntu/dmk.com;
    index index.html;

    location{
        try_files $uri $uri/ =404;
    }
    
}

server {
    listen 83;
    listen [::]:83;
    root /home/ubuntu/adminpanel;
    index index.html;
    add_header Access-Control-Allow-Origin *;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 81;
    listen [::]:81;
    # ssl_certificate         /home/ubuntu/certs/Work2certb6ade38fd6ec4be1.crt;
    # ssl_certificate_key     /home/ubuntu/certs/kalainger.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;        
    }
}
EOF

# Create a symbolic link to enable the Nginx configuration
mv /etc/nginx/sites-available/quiz.conf /etc/nginx/sites-available/default

# sudo ln -s /etc/nginx/sites-available/quiz.conf /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx to apply the new configuration
sudo systemctl reload nginx

# Optional: Open the necessary ports for Nginx (e.g., port 80) and Node.js (e.g., port 3000)
sudo ufw allow 80
sudo ufw allow 81
sudo ufw allow 83
sudo ufw allow 3000

# Optional: Secure your server further, e.g., by disabling password-based SSH login

# Edit SSH configuration in /etc/ssh/sshd_config and restart SSH

# sudo nano /etc/ssh/sshd_config

# sudo systemctl restart sshd

 

# Reboot the server to apply changes (optional)

# sudo reboot