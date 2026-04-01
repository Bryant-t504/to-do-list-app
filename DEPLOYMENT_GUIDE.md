# GitHub Pages Deployment Guide

This guide walks you through deploying your TaskFlow app to GitHub Pages.

## Prerequisites

- ✅ Project is on GitHub
- ✅ Node.js installed locally
- ✅ Git configured with your GitHub credentials

## Step-by-Step Deployment

### 1. Configure for Your Repository

If deploying to a **subdirectory** (e.g., `https://username.github.io/taskflow`):

**Edit `vite.config.ts`:**
```typescript
export default defineConfig({
  base: '/repository-name/', // Add this line
  plugins: [react()],
  // ... rest of config
})
```

If deploying to the **main site** (`https://username.github.io`):
- Leave `base` empty or omit it

### 2. Ensure Dependencies Are Installed

```bash
npm install
```

This installs `gh-pages` which is already in `package.json`.

### 3. Deploy

Run the deploy command:

```bash
npm run deploy
```

This:
1. Builds your React app to the `dist/` folder
2. Commits the build to a `gh-pages` branch
3. Pushes to GitHub

### 4. Enable GitHub Pages

1. Go to your **GitHub repository**
2. Click **Settings** (top right)
3. Scroll to **Pages** section (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Select **`gh-pages`** branch
6. Leave folder as `/ (root)`
7. Click **Save**

### 5. Your Site Is Live!

- **Personal repo** (`username.github.io`): https://username.github.io
- **Project repo**: https://username.github.io/repository-name

**Note:** First deployment takes 1-2 minutes. Refresh after 2 minutes if not live.

## Automated Deployment with GitHub Actions (Optional)

For automatic deployment on every push to `main`:

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Push to GitHub:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment"
git push
```

Now every push to `main` automatically deploys!

## Updating Your Site

After making changes:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Update site"

# Push to GitHub
git push

# Deploy (if not using Actions)
npm run deploy
```

## Troubleshooting

### ❌ "Cannot find module" or 404 errors
- Check that `base` is set correctly in `vite.config.ts`
- Ensure paths start with `/` (absolute) not relative

### ❌ Site shows old version
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- GitHub Pages caches for 10 minutes: wait and refresh

### ❌ Blank page with no errors
- Open DevTools (F12) → Console tab
- Check for 404s on assets
- Verify `vite.config.ts` `base` setting

### ❌ Route navigation broken
- Ensure routes are defined in `src/App.tsx`
- Use `<Link>` from `react-router-dom`
- Don't use browser back/forward for single-page app links

### ❌ Still stuck?

1. Check GitHub Pages status:
   - Settings → Pages → check the deployment status
   
2. Clear gh-pages cache:
   ```bash
   npm run build
   rm -rf node_modules/.vite
   npm run deploy
   ```

3. Check browser console for errors (F12)

## Domain Setup (Custom Domain)

To use a custom domain:

1. **Purchase domain** (GoDaddy, Namecheap, etc.)

2. **Configure DNS records**:
   - For `example.com`:
     - `@` → `185.199.108.153`
     - `@` → `185.199.109.153`
     - `@` → `185.199.110.153`
     - `@` → `185.199.111.153`
   
   - For `www.example.com`:
     - `www` → `username.github.io`

3. **Update GitHub Pages**:
   - Settings → Pages → Custom domain
   - Enter `example.com`
   - Wait 5-10 minutes for DNS to propagate

4. **Enforce HTTPS** (wait ~10 min for cert):
   - Settings → Pages → Check "Enforce HTTPS"

## Performance Tips

- ✅ Vite optimizes assets automatically
- ✅ GitHub Pages serves with CloudFlare CDN (fast!)
- ✅ Use relative imports for components
- ✅ Keep bundle size < 10MB for best performance

## More Resources

- [GitHub Pages Docs](https://pages.github.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://github.com/tschaub/gh-pages)
