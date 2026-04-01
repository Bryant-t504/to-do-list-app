# TaskFlow - Task Management App

A modern, premium task management application built with **React 19**, **Vite**, **TailwindCSS**, **Framer Motion**, and **Three.js**.

## ✨ Features

- 🎯 **Intuitive Task Management** - Create, organize, and complete tasks with ease
- ⚡ **Lightning Fast** - Smooth animations and instant updates
- 🔒 **Privacy First** - Client-side only, no server tracking
- 🎨 **Beautiful Design** - Premium UI with dark mode support
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- 3️⃣ **3D Animations** - Interactive Three.js background with mouse tracking
- 🎬 **Smooth Animations** - Powered by Framer Motion
- 🧩 **Component Library** - Built with Radix UI for accessibility

## 🚀 Tech Stack

- **React 19** - Latest React version
- **Vite** - Lightning-fast build tool (replaces Next.js)
- **React Router DOM** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics
- **Radix UI** - Accessible component library
- **React Hook Form** - Form management
- **TypeScript** - Type safety

## 📋 Project Structure

```
src/
├── main.tsx              # Vite entry point
├── App.tsx               # Root component with Router
├── pages/
│   └── Home.tsx          # Home page
├── components/
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── hero-3d-scene.tsx
│   ├── features.tsx
│   ├── todo-app.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── ui/               # Radix UI components
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts
└── styles/
    └── globals.css
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 18+ (Check with `node --version`)
- **npm** 9+ or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/to-do-list-app.git
cd to-do-list-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page reloads on file changes.

### 4. Build for Production
```bash
npm run build
```

Optimized build output is in the `dist/` folder, ready for deployment.

### 5. Preview Production Build Locally
```bash
npm run preview
```

## 📱 Usage

### Managing Tasks
1. **Add Task**: Type in the input field and press Enter or click the + button
2. **Complete Task**: Click the checkbox to mark as complete
3. **Edit Task**: Hover over a task and click the pencil icon
4. **Delete Task**: Hover over a task and click the trash icon

## 🚀 Deployment

### GitHub Pages (Recommended)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

Quick start:
```bash
npm run deploy
```

### Other Platforms

**Vercel** (Easiest):
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📚 Documentation

- **[CONVERSION_GUIDE.md](CONVERSION_GUIDE.md)** - Complete Next.js → React migration details
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - GitHub Pages setup and deployment
- [Vite Docs](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [TailwindCSS Docs](https://tailwindcss.com)

## 🔧 Available Scripts

```bash
npm run dev       # Start development server (port 5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Deploy to GitHub Pages
npm run lint      # Run ESLint
```

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Styles not loading?
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear cache: `rm -rf node_modules/.vite`
- Restart dev server

### Module not found?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails?
```bash
rm -rf dist .turbo
npm run build
```

## 🔄 Migrated from Next.js

This project has been **converted from Next.js 16 to React + Vite** for better performance and simpler deployment.

### Key Changes:
- ✅ Removed `next/link`, using `react-router-dom` instead
- ✅ Removed `next/image`, using standard `<img>` tags
- ✅ Removed server-side rendering (SSR) - client-side only
- ✅ Replaced `next.config.js` with `vite.config.ts`
- ✅ Removed `"use client"` directives (not needed in React)
- ✅ All APIs and dependencies remain compatible

See [CONVERSION_GUIDE.md](CONVERSION_GUIDE.md) for detailed migration notes.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙋 Support

- 📧 GitHub Issues: [Create an issue](https://github.com/yourusername/to-do-list-app/issues)
- 💬 GitHub Discussions: [Join discussions](https://github.com/yourusername/to-do-list-app/discussions)

## 🎯 Roadmap

- [ ] Local storage persistence
- [ ] Cloud sync with Firebase/Supabase
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Subtasks and nested items
- [ ] Email notifications
- [ ] Mobile app (React Native)

---

**Made with ❤️ using React + Vite**

**Version**: 1.0.0 (React + Vite)  
**Last Updated**: April 2026
