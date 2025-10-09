# 🚀 Deployment Guide for DVC Platform

## Quick Deploy Options

### 1. 🐳 **Docker Deployment (Recommended)**

**Requirements:**
- Docker & Docker Compose
- VPS/Cloud Server (2GB RAM minimum)

**Steps:**
```bash
# Clone the repository
git clone https://github.com/nickdude/dvc.git
cd dvc

# Run deployment script
./deploy.sh
```

**What it includes:**
- ✅ MongoDB database
- ✅ Node.js backend API
- ✅ React frontend
- ✅ Nginx reverse proxy
- ✅ SSL ready configuration

---

### 2. ☁️ **Cloud Platform Deployments**

#### **Heroku Deployment**

**Backend (API):**
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git subtree push --prefix backend heroku main
```

**Frontend (Netlify):**
```bash
# Build the app
cd frontend
npm run build

# Deploy to Netlify (drag & drop or CLI)
netlify deploy --prod --dir=build
```

#### **Vercel Deployment**

**Frontend:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Backend (Railway):**
```bash
# Connect Railway to your GitHub repo
# Set environment variables in Railway dashboard
# Auto-deploys on git push
```

#### **DigitalOcean App Platform**
```yaml
# app.yaml
name: dvc-platform
services:
- name: backend
  source_dir: backend
  github:
    repo: nickdude/dvc
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  
- name: frontend
  source_dir: frontend
  github:
    repo: nickdude/dvc
    branch: main
  run_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs

databases:
- name: mongodb
  engine: MONGODB
  version: "4.4"
```

---

### 3. 🖥️ **VPS/Dedicated Server Setup**

**Ubuntu/Debian Server:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install Nginx
sudo apt install nginx

# Install PM2 for process management
sudo npm install -g pm2

# Clone and setup project
git clone https://github.com/nickdude/dvc.git
cd dvc

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your values

# Setup frontend
cd ../frontend
npm install
npm run build

# Start with PM2
cd ../backend
pm2 start npm --name "dvc-backend" -- start
pm2 startup
pm2 save

# Configure Nginx (copy provided nginx.conf)
sudo cp ../nginx.conf /etc/nginx/sites-available/dvc
sudo ln -s /etc/nginx/sites-available/dvc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 4. 🔧 **Environment Configuration**

**Backend (.env):**
```env
MONGODB_URI=mongodb://localhost:27017/dvc
JWT_SECRET=your-super-secret-key
PORT=5000
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CORS_ORIGIN=https://yourdomain.com
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_APP_NAME=Digital Business Cards
```

---

### 5. 🔒 **SSL Setup (Let's Encrypt)**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

### 6. 📊 **Monitoring & Logs**

**Docker Logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

**PM2 Monitoring:**
```bash
pm2 logs
pm2 monit
pm2 status
```

**System Monitoring:**
```bash
# Install htop
sudo apt install htop

# Check resources
htop
df -h
free -h
```

---

### 7. 🔄 **Updates & Maintenance**

**Docker Update:**
```bash
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Manual Update:**
```bash
git pull origin main
cd backend && npm install
cd ../frontend && npm install && npm run build
pm2 restart all
```

---

### 8. 🆘 **Troubleshooting**

**Common Issues:**

1. **MongoDB Connection Issues:**
   ```bash
   sudo systemctl status mongod
   sudo systemctl start mongod
   ```

2. **Port Already in Use:**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 PID
   ```

3. **Permission Issues:**
   ```bash
   sudo chown -R $USER:$USER /path/to/dvc
   ```

4. **Nginx Issues:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

---

### 🎯 **Recommended Hosting Providers**

| Provider | Best For | Pricing | Complexity |
|----------|----------|---------|------------|
| **DigitalOcean** | Full Control | $5-20/month | Medium |
| **Railway** | Easy Backend | $5-10/month | Low |
| **Vercel + PlanetScale** | Serverless | $0-20/month | Low |
| **Heroku** | Quick Deploy | $7-25/month | Low |
| **AWS/GCP** | Enterprise | $10-50/month | High |
| **Netlify + MongoDB Atlas** | JAMstack | $0-15/month | Medium |

---

### ✅ **Post-Deployment Checklist**

- [ ] SSL certificate configured
- [ ] Environment variables set
- [ ] Database backups configured
- [ ] Monitoring setup
- [ ] Domain DNS configured
- [ ] Email service tested
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Google Analytics)
- [ ] Performance monitoring
- [ ] Security headers configured