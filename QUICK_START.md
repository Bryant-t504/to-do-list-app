# Quick Start Guide

Get TaskFlow running in 5 minutes! ⚡

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

## Step 1: Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/yourusername/to-do-list-app.git
cd to-do-list-app

# Install dependencies
npm install
```

## Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

Open your browser to **http://localhost:5173**

## Step 3: Start Building! (2 minutes)

Click around! Your changes hot-reload automatically.

### File Structure to Know
```
src/
  components/    ← Reusable components
  pages/         ← Page components
  styles/        ← Global CSS
  main.tsx       ← App entry point
```

## Common Tasks

### 📝 Create a New Component

```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>My Component</div>
}

// Use it in other files
import { MyComponent } from '@/components/MyComponent'
```

### 🛣️ Add a New Route

1. Create page in `src/pages/` (e.g., `About.tsx`)
2. Add route to `src/App.tsx`:
```typescript
import About from '@/pages/About'

<Route path="/about" element={<About />} />
```

3. Link to it:
```typescript
import { Link } from 'react-router-dom'
<Link to="/about">About</Link>
```

### 🎨 Update Colors

Edit `src/styles/globals.css`:
```css
:root {
  --primary: oklch(0.98 0 0);     /* White */
  --accent: oklch(0.65 0.15 280); /* Purple */
  /* More colors... */
}
```

## Essential Commands

```bash
npm run dev        # Development server (reloads on save)
npm run build      # Build for production
npm run preview    # Test production build
npm run deploy     # Deploy to GitHub Pages
```

## Deploy to GitHub Pages

### One-time Setup
```bash
npm run deploy
```

Then configure GitHub Pages:
1. Go to Settings → Pages
2. Select `gh-pages` branch
3. It's live!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for more info.

## Useful Resources

- 📚 **[CONVERSION_GUIDE.md](CONVERSION_GUIDE.md)** - Migration from Next.js
- 🚀 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deploy to GitHub Pages
- 📖 **[README.md](README.md)** - Full documentation
- 🔗 **[Vite Docs](https://vitejs.dev)** - Build tool
- 🔗 **[React Router Docs](https://reactrouter.com)** - Routing
- 🔗 **[TailwindCSS Docs](https://tailwindcss.com)** - Styling

## Troubleshooting

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### Changes not showing?
- Hard refresh: `Ctrl+Shift+R`
- Check browser console for errors (F12)

### Styles broken?
```bash
rm -rf node_modules/.vite
npm run dev
```

## Next Steps

1. ✅ Read [README.md](README.md) for full overview
2. ✅ Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) to deploy
3. ✅ Review [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) if migrating code
4. ✅ Explore the UI components in `src/components/ui/`
5. ✅ Customize colors, fonts, and branding

## Need Help?

- 💬 Check GitHub Issues: [Issues](https://github.com/yourusername/to-do-list-app/issues)
- 💡 Read the docs linked above
- 🔍 Search [Vite docs](https://vitejs.dev) for build questions
- 🔍 Search [React docs](https://react.dev) for React questions

---

**Happy coding! 🚀**

Built with React 19 + Vite + TailwindCSS
