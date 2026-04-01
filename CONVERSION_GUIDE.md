# TaskFlow - React + Vite Conversion Guide

This project has been successfully converted from **Next.js 16** to a standard **React app** using **Vite** and **React Router DOM**.

## What Changed

### ✅ Architecture Changes

| Feature | Before (Next.js) | After (Vite + React) |
|---------|------------------|----------------------|
| **Build Tool** | Next.js | Vite |
| **Runtime Framework** | Next.js App Router | React + React Router DOM |
| **Server-Side Rendering** | ✅ Enabled (SSR) | ❌ Client-side only (SPA) |
| **File Routing** | File-based (`app/` folder) | Manual routes with React Router |
| **Image Optimization** | `next/image` | Standard `<img>` or `<Image>` |
| **Link Navigation** | `next/link` | `react-router-dom` |
| **Environment Config** | `next.config.js` | `vite.config.ts` |
| **Development Server** | `next dev` | `vite` |
| **Build Output** | `.next/` folder | `dist/` folder |

### 🗂️ Folder Structure

**Before (Next.js):**
```
app/
  layout.tsx      → Root layout with metadata
  page.tsx        → Home page
  globals.css
components/
  navbar.tsx
  hero.tsx
  ...
  ui/
    button.tsx
    ...
```

**After (Vite + React):**
```
src/
  main.tsx        → Vite entry point
  App.tsx         → Root with Router
  pages/
    Home.tsx      → Home page component
  components/
    navbar.tsx
    hero.tsx
    ...
    ui/
      button.tsx
      ...
  styles/
    globals.css
  hooks/
  lib/
index.html        → Vite HTML template
vite.config.ts    → Vite configuration
```

### 🔄 Key Code Changes

#### 1. **Imports**
```typescript
// Before (Next.js)
import Link from "next/link"
import Image from "next/image"

// After (React Router)
import { Link } from "react-router-dom"
import <img> tag or regular Image component
```

#### 2. **Routes/Navigation**
```typescript
// Before (Next.js) - File-based routing
// app/about/page.tsx automatically becomes /about

// After (React Router) - Explicit routes in App.tsx
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Router>
```

#### 3. **Metadata & Head Tags**
```typescript
// Before (Next.js)
export const metadata: Metadata = {
  title: "TaskFlow",
  description: "...",
}

// After (Vite) - Add to index.html or use react-helmet-async
<title>TaskFlow</title>
<meta name="description" content="..." />
```

#### 4. **Removed "use client" Directives**
All `"use client"` directives have been removed since Vite/React apps are client-side by default.

#### 5. **Dynamic Imports**
```typescript
// Before (Next.js)
const Component = dynamic(() => import("./Component"), { ssr: false })

// After (React Router)
const Component = lazy(() => import("./Component"))
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

### 📦 Dependency Changes

**Removed:**
- `next` - No longer needed
- `next-themes` migration to `next-themes` (still works, no Auth by default)
- `@vercel/analytics` - Optional, can integrate alternatives

**Added:**
- `vite` - Build tool
- `react-router-dom` - Client-side routing
- `@vitejs/plugin-react` - React plugin for Vite

**All existing packages remain compatible:**
- Framer Motion ✅
- Three.js + @react-three/fiber ✅
- Radix UI ✅
- TailwindCSS ✅
- React Hook Form ✅
- Recharts ✅

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app opens at `http://localhost:5173` (Vite's default port)

### 3. Build for Production
```bash
npm run build
```
Output is in the `dist/` folder

### 4. Preview Production Build
```bash
npm run preview
```

## Deployment

### GitHub Pages Deployment

This project is configured for **GitHub Pages** deployment.

#### Setup (One-time):

1. **Ensure your repo is on GitHub**: `git push -u origin main`

2. **Update `vite.config.ts`** if deploying to a subdirectory:
   ```typescript
   export default defineConfig({
     base: '/repository-name/', // Only if deploying to https://username.github.io/repository-name
     // Leave empty for https://username.github.io
   })
   ```

3. **Install gh-pages** (already in package.json):
   ```bash
   npm install --save-dev gh-pages
   ```

#### Deploy:

```bash
npm run deploy
```

This:
1. Builds the project (`npm run build`)
2. Pushes the `dist/` folder to the `gh-pages` branch
3. GitHub Pages automatically deploys from that branch

#### GitHub Pages Settings:

1. Go to your repo on GitHub
2. Settings → Pages
3. Select `gh-pages` branch as the source
4. Your site will be live at `https://username.github.io` (or `/repo-name`)

### Other Hosting Platforms

Since this is a standard static React app, you can deploy to:

- **Vercel** - Simply connect your GitHub repo, zero config needed
- **Netlify** - Drag & drop `dist/` folder or connect GitHub
- **Cloudflare Pages** - Connect GitHub repo
- **AWS S3 + CloudFront** - Upload `dist/` contents
- **Docker/Nginx** - Standard SPA deployment

## Routing Guide

To add new routes:

1. **Create a new component** in `src/pages/`:
   ```typescript
   // src/pages/About.tsx
   export default function About() {
     return <div>About Page</div>
   }
   ```

2. **Add route to `src/App.tsx`**:
   ```typescript
   import About from '@/pages/About'
   
   function App() {
     return (
       <ThemeProvider>
         <Router>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
           </Routes>
         </Router>
       </ThemeProvider>
     )
   }
   ```

3. **Use Link for navigation**:
   ```typescript
   import { Link } from 'react-router-dom'
   
   <Link to="/about">About</Link>
   ```

## Environment Variables

Create a `.env.local` file if you need environment-specific variables:

```
VITE_API_URL=https://api.example.com
VITE_PUBLIC_KEY=pk_...
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Troubleshooting

### Issue: Styles not loading
- Ensure `@import 'tailwindcss'` is in `src/styles/globals.css`
- Check that `src/main.tsx` imports `./styles/globals.css`

### Issue: Route not working
- Verify the route is added to `src/App.tsx`
- Use `<Link>` from `react-router-dom`, not `<a>` tags

### Issue: Image paths broken
- Update paths from `next/image` optimizations to standard paths
- Images in `public/` are served from root: `/image-name.png`

### Issue: Components not found
- Check the `@/` alias points to `src/` in `vite.config.ts`
- Rebuild with `npm run dev`

## Performance Notes

- **Code Splitting**: Automatically handled by Vite
- **Lazy Loading**: Use `React.lazy()` for route-based splitting
- **CSS**: TailwindCSS purges unused styles in production
- **3D Assets**: Three.js scenes render client-side (can be heavy)

## Future Improvements

Consider adding:
- Meta tags management: `react-helmet-async`
- Advanced routing: `TanStack Router`
- State management: `Zustand` or `Redux`
- Type safety for routes: Type-safe routing library
- Testing: `Vitest` + `React Testing Library`

## Questions?

Check:
- [Vite Docs](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [GitHub Pages Docs](https://pages.github.com/)
- [TailwindCSS Docs](https://tailwindcss.com)
