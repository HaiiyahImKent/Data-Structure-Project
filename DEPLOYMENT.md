# Deployment Guide

Complete instructions for deploying AlgoVisual to production.

## Quick Deployment

### 1. Vercel (Recommended - Fastest)

**Pros**:

-   Optimized for Vite
-   One-click deployment
-   Free tier available
-   Automatic deployments from Git

**Steps**:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
# Follow the prompts, use defaults

# For production
vercel --prod
```

**Configuration** (vercel.json):

```json
{
	"buildCommand": "npm run build",
	"outputDirectory": "dist"
}
```

### 2. Netlify

**Pros**:

-   Simple drag-and-drop
-   Great free tier
-   Built-in HTTPS
-   Environment variables support

**Steps via CLI**:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Or via Web UI**:

1. Go to netlify.com
2. Click "New site from Git"
3. Connect your GitHub repo
4. Confirm build settings (uses `npm run build`)
5. Deploy!

### 3. GitHub Pages

**Pros**:

-   Free forever
-   Perfect for portfolios
-   Git integration

**Steps**:

1. Update `vite.config.ts`:

```ts
export default defineConfig({
	base: "/data-structures-proj/",
	// ...
});
```

2. In `package.json`:

```json
{
	"scripts": {
		"deploy": "npm run build && gh-pages -d dist"
	}
}
```

3. Install gh-pages:

```bash
npm i -D gh-pages
```

4. Deploy:

```bash
npm run deploy
```

## Docker Deployment

### Build Docker Image

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Create `.dockerignore`:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
```

Build and run:

```bash
# Build image
docker build -t algovisual:latest .

# Run container
docker run -p 3000:3000 algovisual:latest

# Push to registry
docker tag algovisual:latest username/algovisual:latest
docker push username/algovisual:latest
```

## Traditional Hosting (Apache/Nginx)

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name algovisual.io;

    root /var/www/algovisual/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # GZIP compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;
}
```

### Apache Configuration

Create `.htaccess` in dist folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_gzip.c>
    mod_gzip_on Yes
    mod_gzip_dechunk Yes
    mod_gzip_item_include file \.(html?|txt|css|js|json|xml|htc)$
    mod_gzip_minimum_file_size 500
</IfModule>

# Caching
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg)$">
    Header set Cache-Control "max-age=2592000, public"
</FilesMatch>
```

## AWS Amplify

```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting
# Choose: Amazon CloudFront and S3

# Publish
amplify publish
```

## Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Environment Variables

Create `.env.production`:

```
VITE_API_URL=https://api.algovisual.io
VITE_ANALYTICS_ID=G-XXXXX
VITE_APP_VERSION=1.0.0
```

## Pre-Deployment Checklist

-   [ ] Run `npm run lint` - no errors
-   [ ] Run `npm run build` - successful build
-   [ ] Test production build locally: `npm run preview`
-   [ ] Check browser console - no errors
-   [ ] Verify all links work
-   [ ] Test on mobile (responsive design)
-   [ ] Test dark mode toggle
-   [ ] Test all visualizers
-   [ ] Run through each quiz
-   [ ] Check SEO meta tags in index.html
-   [ ] Verify favicons are set
-   [ ] Update package.json version

## Performance Optimization

### Bundle Size

```bash
# Analyze bundle
npm i -D rollup-plugin-visualizer
```

### Image Optimization

-   Use WebP format with fallbacks
-   Compress SVGs
-   Lazy load non-critical images

### Code Splitting

Already configured in Vite:

```ts
// Lazy load pages
const HomePage = lazy(() => import("@pages/HomePage"));
```

## Monitoring & Analytics

### Add Google Analytics

```bash
npm i react-ga4
```

In `main.tsx`:

```ts
import ReactGA from "react-ga4";

ReactGA.initialize("GA-XXXXX");
```

### Error Tracking

```bash
npm i @sentry/react
```

## SSL/HTTPS

All major hosting platforms provide free SSL:

-   Vercel: Automatic
-   Netlify: Automatic
-   GitHub Pages: Automatic
-   AWS: ACM Certificate (free)
-   Firebase: Automatic

## Domain Setup

### Point Domain to Deployment

**Vercel**:

1. Add domain in Vercel dashboard
2. Update DNS records at registrar

**Netlify**:

1. Settings > Domain management
2. Add custom domain
3. Update DNS

**GitHub Pages**:

1. Add `CNAME` file with domain
2. Update DNS with GitHub nameservers

## Post-Deployment

### Monitor Performance

-   Lighthouse score (aim for 90+)
-   Core Web Vitals
-   User engagement metrics

### Maintenance

-   Regular security updates: `npm audit fix`
-   Dependency updates: `npm update`
-   Monitor error logs
-   User feedback collection

### Versioning

Tag releases in Git:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Rollback Procedure

### Vercel

```bash
vercel rollback
```

### Netlify

-   Goto Deploy history
-   Click "Publish" on previous version

### Manual

```bash
git revert HEAD~1
npm run build
# Deploy again
```

## Cost Estimates

| Platform          | Cost      | Notes                 |
| ----------------- | --------- | --------------------- |
| Vercel            | Free      | $20/mo for premium    |
| Netlify           | Free      | $19/mo for premium    |
| GitHub Pages      | Free      | GitHub account needed |
| Firebase          | Free tier | $0.15/GB bandwidth    |
| AWS S3+CloudFront | ~$1-5/mo  | Usage-based pricing   |

---

**Choose Vercel or Netlify for easiest deployment!** ✨
