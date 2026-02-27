# Harmonyum App - Deployment Guide

## Overview
Harmonyum is a React + Vite devotional music application designed for optimal performance and user experience. This guide covers building, optimizing, and deploying the application.

## Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

## Local Development

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs on `http://localhost:3000` with Hot Module Replacement (HMR) enabled.

## Build for Production

### Optimization Steps
Before building, ensure all dependencies are up to date:
```bash
npm ci
```

### Building the Application
```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## Build Optimization

The current Vite configuration includes:
- **Code Splitting**: Vendor libraries (React, Router) and animation libraries are split into separate chunks
- **Minification**: Terser is used for aggressive JavaScript minification
- **No Source Maps**: Disabled in production for smaller bundle sizes
- **Tree Shaking**: Automatically removes unused code

### Bundle Analysis
To analyze your bundle size:
```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

## Environment Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update values in `.env.local` for your deployment:
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
```

## Deployment Options

### 1. Static Hosting (Recommended for Most Users)
The application can be deployed as static files to:

**Vercel**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy
```

**GitHub Pages**
Update `package.json` with your repository:
```json
"homepage": "https://username.github.io/harmonyum-app"
```

Then deploy:
```bash
npm run build
```

**S3 + CloudFront**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
# Create CloudFront distribution
```

### 2. Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t harmonyum-app .
docker run -p 3000:3000 harmonyum-app
```

### 3. Traditional Server (Node.js)

Install serve globally:
```bash
npm install -g serve
```

Serve the application:
```bash
npm run build
serve -s dist
```

## Performance Checklist

- [ ] All dependencies are up to date
- [ ] Build completes without warnings
- [ ] Bundle size is reasonable (target: < 500KB gzipped)
- [ ] No console errors or warnings
- [ ] Images are optimized
- [ ] CSS is minimized
- [ ] JavaScript is minified
- [ ] Source maps are removed
- [ ] Cache headers are configured on CDN
- [ ] GZIP compression is enabled

## 🎶 Sound Engine Overview

The harmonium tones are synthesized using the Web Audio API directly. A singleton
`audioService` creates a shared `AudioContext` with an interactive latency hint.
Notes are produced by oscillators:

1. A custom **reed-like periodic wave** is generated (strong fundamental with odd
   harmonics) to emulate a harmonium reed tone. This is used by default but users
   can switch to sine, triangle, or sawtooth waveforms.
2. Each note uses its own oscillator and gain node. An ADSR envelope (attack,
   decay, sustain, release) shapes the amplitude for a natural feel. Sustain mode
   removes the decay phase until the key is released.
3. Rapid play, polyphony, and keyboard input map to unique `noteId`s to avoid
   audio overlap or node leaks. Nodes are cleaned up after release.
4. Volume control adjusts a master gain node. Recording/playback stores events
   with timestamps and replays them sequentially.

This audio stack delivers low-latency, smooth sound without any external
libraries—perfect for both desktop and mobile browsers.

## SEO & Meta Tags

Key meta tags configured in `index.html`:
- Title: "Harmonyum - Arpit Gupta"
- Description: "Harmonyum App - Devotional Harmony"
- Viewport: Responsive design
- Theme Color: #4A90E2

### Add Open Graph Tags
Update `index.html` for social sharing:
```html
<meta property="og:title" content="Harmonyum" />
<meta property="og:description" content="Devotional music application" />
<meta property="og:image" content="https://cdn.example.com/og-image.png" />
<meta property="og:url" content="https://harmonyum.app" />
```

## Security Best Practices

1. **Content Security Policy**
   Add to deployment server headers:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
   ```

2. **Headers Configuration**
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```

3. **HTTPS Only**
   Always use HTTPS in production

4. **Environment Variables**
   Never commit `.env` files - use `.env.example` as template

## Monitoring & Analytics

### Error Tracking (Optional)
Integrate Sentry for error monitoring:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
});
```

### Performance Monitoring
Use Vite's built-in profiling:
```bash
npm run build -- --report
```

## Troubleshooting

### Common Build Issues

**Issue: Build fails with memory error**
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

**Issue: Missing modules after deployment**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue: Assets not loading with CNAME/custom domain**
Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/harmonyum/',
  // ... other config
})
```

## CI/CD Integration

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Database & Backend (If Applicable)

The application currently uses static data from `data/encrypted/bhajans.json`. For dynamic content:

1. Setup API endpoints
2. Update `VITE_API_BASE_URL` in environment
3. Integrate with your backend APIs

## Support & Maintenance

- Monitor bundle size growth
- Keep React and dependencies updated
- Run security audits: `npm audit`
- Test on multiple devices and browsers
- Setup automated backups

## Rollback Strategy

Keep previous builds archived:
```bash
npm run build
tar -czf dist-$(date +%s).tar.gz dist/
```

Restore previous version:
```bash
tar -xzf dist-<timestamp>.tar.gz
deploy dist/
```

---

**Last Updated**: February 28, 2026
**Version**: 1.0.0
