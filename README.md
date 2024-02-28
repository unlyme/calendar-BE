NodeJS Backend for Webix Scheduler
=====================

## Prerequisites

Please make sure that Node.js (>= 10.13.0) is installed on your operating system and docker.

You can follow the tutorial at [Create a Rest API with Express, PostgreSQL, TypeOrm, and TypeScript](https://bautistaj20.medium.com/create-a-rest-api-with-express-postgresql-typeorm-and-typescript-ac42a20b66c7).

## Get started

```bash
npm run install
```

```bash
npm run tsc
```

```bash
node ./build/server.js
```

# Deployment
Assumption: you deployed the FE repo to get the domain/ssl

1. Clone project

2. Install packages
```
npm install
```

3. Set env
- Create .env file
- Copy/paste below values into .env (you need to replace it depends on your environment)
```
NODE_ENV=production
PORT=3000

DB_HOST=DB_HOST
DB_PORT=DB_PORT
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD
DB_NAME=DB_NAME

JWT_SECRET=YOUR_KEY
ACCESS_TOKEN_EXPIRES_IN=15
REFRESH_TOKEN_EXPIRES_IN=60
REDIS_CACHE_EXPIRES_IN=60
JWT_ACCESS_TOKEN_PRIVATE_KEY=YOUR_KEY
JWT_REFRESH_TOKEN_PRIVATE_KEY=YOUR_KEY
JWT_ACCESS_TOKEN_PUBLIC_KEY=YOUR_KEY
JWT_REFRESH_TOKEN_PUBLIC_KEY=YOUR_KEY
```

4. Run build
```
npm run tsc
```

5. Setup pm2
- Create ecosystem.config.js file
- Copy/paste below values into ecosystem.config.js (you need to replace it depends on your environment)
```
module.exports = {
  apps: [
    {
      name: 'calendar-be',
      script: './build/server.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_HOST: DB_HOST,
        DB_PORT: DB_PORT,
        DB_USERNAME: DB_USERNAME,
        DB_PASSWORD: DB_PASSWORD,
        DB_NAME: DB_NAME,
        API_ENDPOINT: 'http://34.65.210.255/api',
        ACCESS_TOKEN_EXPIRES_IN: 15,
        REFRESH_TOKEN_EXPIRES_IN: 60,
        JWT_ACCESS_TOKEN_PRIVATE_KEY: YOUR_KEY,
        JWT_REFRESH_TOKEN_PRIVATE_KEY: YOUR_KEY,
        JWT_ACCESS_TOKEN_PUBLIC_KEY: YOUR_KEY,
        JWT_REFRESH_TOKEN_PUBLIC_KEY: YOUR_KEY,
        FE_URL: 'http://34.65.210.255',
        EMAIL_FROM: 'ai@unlyme.com',
        MAILER_HOST: 'dn1.unlyme.net',
        MAILER_USER: 'ai@unlyme.com',
        MAILER_PASSWORD: YOUR_KEY
      },
    },
  ],
};
```

6. Apply new version to pm2
```
pm2 restart ecosystem.config.js --env production
```

7. Config nginx and cerbot ssl
**- DNS domain should be pointed before do these steps**
- install nginx
```
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

- Config nginx
Go to nginx config file, it should be in /etc/nginx/site-availables/default for Ubuntu server

Add upstream
```
    upstream calendarbe {
        server 127.0.0.1:3000;
        keepalive 64;
    }
```

Find server id.unlyme.com registered and add these lines
```
        location /api/ {
            proxy_pass http://calendarbe/;
        }
```

- Restart nginx
```
sudo systemctl restart nginx
```
