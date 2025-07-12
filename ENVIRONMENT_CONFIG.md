# Environment Configuration Templates

Template konfigurasi environment untuk berbagai setup development dan production.

## 📁 Backend Environment (.env)

### Development (Default)
```bash
# Database Configuration
DATABASE_URL="file:./dev.db"

# Server Configuration
PORT=5000
NODE_ENV=development
HOST=127.0.0.1

# JWT Configuration
JWT_SECRET=alfurqon-dev-secret-key-2025
JWT_EXPIRES_IN=7d

# Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif,webp

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
LOG_FILE=./logs/app.log

# Cache Configuration
CACHE_TTL=300000
REDIS_URL=redis://localhost:6379

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@alfurqon.com

# API Documentation
SWAGGER_ENABLED=true
```

### Production
```bash
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/alfurqon_prod"

# Server Configuration
PORT=5000
NODE_ENV=production
HOST=0.0.0.0

# JWT Configuration (Generate secure key: openssl rand -base64 32)
JWT_SECRET=your-super-secure-production-jwt-secret-key-here
JWT_EXPIRES_IN=24h

# Upload Configuration
UPLOAD_PATH=/var/www/uploads
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp

# CORS Configuration
ALLOWED_ORIGINS=https://alfurqon.com,https://www.alfurqon.com

# Rate Limiting (more restrictive)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50

# Logging
LOG_LEVEL=error
LOG_FILE=/var/log/alfurqon/app.log

# Cache Configuration
CACHE_TTL=600000
REDIS_URL=redis://redis-server:6379

# Email Configuration
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-production-email@domain.com
SMTP_PASS=your-secure-password
EMAIL_FROM=info@alfurqon.com

# Security
HELMET_ENABLED=true
TRUST_PROXY=true

# API Documentation (disable in production)
SWAGGER_ENABLED=false

# SSL Configuration
SSL_CERT=/path/to/certificate.crt
SSL_KEY=/path/to/private.key

# Monitoring
SENTRY_DSN=your-sentry-dsn-here
NEW_RELIC_LICENSE_KEY=your-newrelic-key-here
```

### Testing
```bash
# Database Configuration
DATABASE_URL="file:./test.db"

# Server Configuration
PORT=5001
NODE_ENV=test
HOST=127.0.0.1

# JWT Configuration
JWT_SECRET=test-secret-key
JWT_EXPIRES_IN=1h

# Upload Configuration
UPLOAD_PATH=./test-uploads
MAX_FILE_SIZE=1048576
ALLOWED_EXTENSIONS=jpg,jpeg,png

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000

# Rate Limiting (disabled for testing)
RATE_LIMIT_WINDOW_MS=999999999
RATE_LIMIT_MAX_REQUESTS=999999

# Logging
LOG_LEVEL=silent
LOG_FILE=./test.log

# Cache Configuration
CACHE_TTL=1000
REDIS_URL=redis://localhost:6379/1

# API Documentation
SWAGGER_ENABLED=false
```

---

## 🌐 Frontend Environment Templates

### Next.js (.env.local)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_UPLOAD_URL=http://localhost:5000/uploads
NEXT_PUBLIC_API_VERSION=v1

# App Configuration
NEXT_PUBLIC_APP_NAME="Masjid Al-Furqon"
NEXT_PUBLIC_APP_DESCRIPTION="Website Resmi Masjid Al-Furqon"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Features
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_DONATIONS=true
NEXT_PUBLIC_ENABLE_SEARCH=true

# Analytics (optional)
NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# SEO
NEXT_PUBLIC_SITE_NAME="Masjid Al-Furqon"
NEXT_PUBLIC_SITE_LOCALE=id_ID
NEXT_PUBLIC_DEFAULT_OG_IMAGE=/images/og-default.jpg

# Cache
NEXT_PUBLIC_CACHE_TTL=300000
```

### Next.js Production (.env.production)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.alfurqon.com
NEXT_PUBLIC_UPLOAD_URL=https://api.alfurqon.com/uploads
NEXT_PUBLIC_API_VERSION=v1

# App Configuration
NEXT_PUBLIC_APP_NAME="Masjid Al-Furqon"
NEXT_PUBLIC_APP_DESCRIPTION="Website Resmi Masjid Al-Furqon"
NEXT_PUBLIC_APP_URL=https://alfurqon.com

# Features
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_DONATIONS=true
NEXT_PUBLIC_ENABLE_SEARCH=true

# Analytics
NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# SEO
NEXT_PUBLIC_SITE_NAME="Masjid Al-Furqon"
NEXT_PUBLIC_SITE_LOCALE=id_ID
NEXT_PUBLIC_DEFAULT_OG_IMAGE=https://alfurqon.com/images/og-default.jpg

# Cache
NEXT_PUBLIC_CACHE_TTL=600000

# Performance
NEXT_PUBLIC_ENABLE_SW=true
NEXT_PUBLIC_ENABLE_PRELOAD=true
```

### React/Vite (.env)
```bash
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_UPLOAD_URL=http://localhost:5000/uploads
VITE_API_VERSION=v1

# App Configuration
VITE_APP_NAME="Masjid Al-Furqon"
VITE_APP_DESCRIPTION="Website Resmi Masjid Al-Furqon"

# Features
VITE_ENABLE_AUTH=true
VITE_ENABLE_DONATIONS=true
VITE_ENABLE_SEARCH=true

# Development
VITE_DEV_PORT=3000
VITE_DEV_HOST=localhost
```

### Vue (.env)
```bash
# API Configuration
VUE_APP_API_URL=http://localhost:5000
VUE_APP_UPLOAD_URL=http://localhost:5000/uploads
VUE_APP_API_VERSION=v1

# App Configuration
VUE_APP_NAME="Masjid Al-Furqon"
VUE_APP_DESCRIPTION="Website Resmi Masjid Al-Furqon"

# Features
VUE_APP_ENABLE_AUTH=true
VUE_APP_ENABLE_DONATIONS=true
VUE_APP_ENABLE_SEARCH=true
```

---

## 🐳 Docker Configuration

### Backend Dockerfile
```dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN yarn prisma:generate

# Build application
RUN yarn build

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Start application
CMD ["yarn", "start"]
```

### Docker Compose (Full Stack)
```yaml
version: '3.8'

services:
  # Database
  postgres:
    image: postgres:15-alpine
    container_name: alfurqon-db
    environment:
      POSTGRES_DB: alfurqon
      POSTGRES_USER: alfurqon_user
      POSTGRES_PASSWORD: alfurqon_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped

  # Redis (for caching)
  redis:
    image: redis:7-alpine
    container_name: alfurqon-redis
    ports:
      - "6379:6379"
    restart: unless-stopped

  # Backend API
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: alfurqon-backend
    environment:
      DATABASE_URL: postgresql://alfurqon_user:alfurqan_password@postgres:5432/alfurqon
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
      PORT: 5000
      JWT_SECRET: your-super-secure-jwt-secret
      ALLOWED_ORIGINS: http://localhost:3000,https://alfurqon.com
    volumes:
      - uploads_data:/app/uploads
      - logs_data:/app/logs
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # Frontend (Next.js)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: alfurqon-frontend
    environment:
      NEXT_PUBLIC_API_URL: http://backend:5000
      NEXT_PUBLIC_UPLOAD_URL: http://backend:5000/uploads
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped

  # Nginx (Reverse Proxy)
  nginx:
    image: nginx:alpine
    container_name: alfurqon-nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
  uploads_data:
  logs_data:
```

### Nginx Configuration (nginx.conf)
```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:5000;
    }

    upstream frontend {
        server frontend:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    server {
        listen 80;
        server_name alfurqon.com www.alfurqon.com;

        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name alfurqon.com www.alfurqon.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/certificate.crt;
        ssl_certificate_key /etc/nginx/ssl/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Security Headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Backend API
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Uploads
        location /uploads/ {
            proxy_pass http://backend;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Health check
        location /health {
            proxy_pass http://backend;
            access_log off;
        }
    }
}
```

---

## ☁️ Cloud Deployment

### Vercel (Frontend)
```json
// vercel.json
{
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.alfurqon.com",
    "NEXT_PUBLIC_UPLOAD_URL": "https://api.alfurqon.com/uploads"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/admin/login",
      "permanent": false
    }
  ]
}
```

### Railway (Backend)
```dockerfile
# Dockerfile for Railway
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN yarn prisma:generate

# Build application
RUN yarn build

# Create necessary directories
RUN mkdir -p uploads logs

# Start application
CMD ["sh", "-c", "yarn prisma:migrate:deploy && yarn start"]
```

### Heroku (Backend)
```json
// package.json (add heroku scripts)
{
  "scripts": {
    "heroku-postbuild": "yarn prisma:generate && yarn build",
    "start": "node dist/index.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

```
# Procfile
web: yarn start
release: yarn prisma:migrate:deploy
```

### AWS ECS (Backend)
```json
// task-definition.json
{
  "family": "alfurqon-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "alfurqon-backend",
      "image": "your-ecr-repo/alfurqon-backend:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "5000"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:database-url"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/alfurqon-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

---

## 🔧 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run tests
        run: yarn test
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/test_db

      - name: Run linting
        run: yarn lint

      - name: Build project
        run: yarn build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to production
        uses: your-deployment-action@v1
        with:
          api-key: ${{ secrets.DEPLOYMENT_API_KEY }}
          app-name: alfurqon-backend
```

---

## 📋 Environment Checklist

### Development Setup ✅
- [ ] Node.js 18+ installed
- [ ] Yarn package manager installed
- [ ] Backend .env configured
- [ ] Database migrated and seeded
- [ ] Backend running on port 5000
- [ ] Frontend .env configured
- [ ] CORS properly configured
- [ ] File uploads working

### Production Deployment ✅
- [ ] Production database configured
- [ ] Secure JWT secret generated
- [ ] HTTPS/SSL certificates installed
- [ ] Environment variables secured
- [ ] CORS configured for production domains
- [ ] Rate limiting enabled
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented
- [ ] CI/CD pipeline configured

### Security Checklist ✅
- [ ] JWT secrets are secure (32+ characters)
- [ ] Database credentials are secure
- [ ] CORS only allows necessary origins
- [ ] Rate limiting is enabled
- [ ] File upload validation is strict
- [ ] Input validation on all endpoints
- [ ] Helmet security headers enabled
- [ ] HTTPS enforced in production
- [ ] Sensitive data not logged
- [ ] Regular security updates

---

**Environment Templates Ready!** 🚀

Pilih template yang sesuai dengan environment Anda dan sesuaikan konfigurasi sesuai kebutuhan. Semua template sudah dioptimalkan untuk berbagai skenario deployment.
