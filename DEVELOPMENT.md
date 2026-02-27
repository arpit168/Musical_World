# Harmonyum App - Development & Setup Guide

## Project Overview
Harmonyum is a modern React + Vite devotional music application featuring spiritual music, meditation, and mantras. Optimized for performance and user experience on all devices.

**Tech Stack:**
- React 18.2.0 - UI Library
- Vite 7.3.1 - Build tool & dev server
- React Router 6.30.3 - Navigation
- Framer Motion 9.1.7 - Animations
- React Icons 4.12.0 - Icon library
- Axios 1.13.6 - HTTP client

## Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone or navigate to project
cd Harmonyum-App

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000` with hot module reloading.

## Development

### Project Structure

```
Harmonyum-App/
├── src/
│   ├── component/
│   │   ├── Common/          # Shared components (ErrorBoundary)
│   │   ├── Layout/          # Layout components (Navbar, Footer)
│   │   └── Home/            # Home page components
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── assets/              # Images, SVGs
├── public/                  # Static assets
├── data/
│   └── encrypted/           # Data files (JSON)
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint rules
├── package.json             # Project metadata
└── DEPLOYMENT.md            # Deployment guide
```

### Key Files

**[src/App.jsx](src/App.jsx)** - Main Application
- Defines routes and page structure
- Wraps app in ErrorBoundary for error handling
- Uses React Router for navigation

**[src/component/Layout/Navbar.jsx](src/component/Layout/Navbar.jsx)** - Navigation Bar
- Responsive mobile menu
- Navigation links
- Brand/logo

**[src/component/Layout/Footer.jsx](src/component/Layout/Footer.jsx)** - Footer
- Copyright information
- Social links (can be extended)

**[src/component/Home/Home.jsx](src/component/Home/Home.jsx)** - Home Page
- Hero section with animations
- Features showcase
- Call-to-action buttons

**[vite.config.js](vite.config.js)** - Build Configuration
- Development server settings
- Production build optimization
- Code splitting strategy

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Building
npm run build            # Production build
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint checks

# Deployment
npm run deploy           # Prepare for deployment
```

## Component Development

### Creating a New Component

1. Create component file in appropriate folder under `src/component/`
2. Use `.jsx` extension for components with JSX
3. Export as default export
4. Create companion `.css` file with same name

**Example:**
```jsx
import React from 'react';
import './MyComponent.css';

const MyComponent = () => {
  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Styling

- CSS files are colocated with components
- Global styles in [src/index.css](src/index.css)
- Layout styles in [src/component/Layout/Style.css](src/component/Layout/Style.css)
- Use CSS classes for component styling
- Consider CSS variables for theme colors

**Primary color:** #4A90E2

## State Management

Currently using React local state. For larger applications, consider:
- Context API (included)
- Redux Toolkit (recommended for complex state)
- Zustand (lighter alternative)

## Routing

Routes defined in [src/App.jsx](src/App.jsx):

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <!-- Add new routes here -->
</Routes>
```

## Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Available environment variables:
- `VITE_API_BASE_URL` - API endpoint
- `VITE_APP_ENV` - Environment (development/production)
- `VITE_ENABLE_ANALYTICS` - Analytics toggle
- `VITE_ENABLE_DEBUG_MODE` - Debug mode

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## Error Handling

The app has an ErrorBoundary component that catches React rendering errors:

**[src/component/Common/ErrorBoundry.jsx](src/component/Common/ErrorBoundry.jsx)**

It shows a fallback UI when errors occur. Consider logging errors to monitoring service in production.

## Performance Optimization

The build is optimized with:

1. **Code Splitting**
   - Vendor code separated (React, Router)
   - Animation library in separate chunk
   - Lazy loading for routes (can be added)

2. **Minification**
   - Terser for JavaScript compression
   - CSS minified automatically

3. **No Source Maps in Production**
   - Reduces build size by ~70%
   - Can be enabled for debugging

### Bundle Analysis

Check bundle size after building:
```bash
npm run build
du -sh dist/
```

## Linting & Code Quality

ESLint configured in [eslint.config.js](eslint.config.js)

```bash
npm run lint                    # Check code style
npm run lint -- --fix           # Auto-fix issues (if using newer eslint)
```

Rules configured for:
- React best practices
- React Hooks rules
- ES6+ syntax

## Browser Compatibility

Target browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Minimum ES version: ES2020

## Accessibility

Best practices implemented:
- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance
- Mobile-friendly responsive design

## Testing (Optional Setup)

To add testing:

```bash
npm install --save-dev vitest @testing-library/react
```

Create test files alongside components:
```
MyComponent.jsx
MyComponent.test.jsx
```

## Common Issues & Solutions

### Issue: Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### Issue: Module not found
- Clear node_modules: `rm -rf node_modules && npm install`
- Check import paths match actual filenames (case-sensitive on Linux/Mac)
- Ensure .jsx extension for JSX files

### Issue: Hot Module Replacement not working
- Check browser console for errors
- Restart dev server: `npm run dev`
- Clear browser cache

### Issue: Build fails
- Update all dependencies: `npm update`
- Clear dist folder: `rm -rf dist && npm run build`
- Check [src/App.jsx](src/App.jsx) imports are correct

## Dependencies Documentation

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://axios-http.com/)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes
git add .
git commit -m "feat: description of changes"

# Push and create PR
git push origin feature/feature-name
```

Included `.gitignore` prevents committing:
- node_modules/
- .env files (except .env.example)
- dist/ and build/
- IDE configuration
- OS files

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy:
```bash
npm run build              # Create production bundle
# Deploy dist/ folder to your hosting
```

Supported platforms:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Traditional servers
- Docker

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Run linter: `npm run lint`
4. Build to verify: `npm run build`
5. Commit with clear messages
6. Push and create pull request

## Security Considerations

- Keep dependencies updated: `npm audit fix`
- Use environment variables for sensitive data
- Enable HTTPS in production
- Set proper CSP headers
- Never commit `.env` file
- Review dependencies for vulnerabilities: `npm audit`

## Performance Tips

1. Use React DevTools Profiler: `Chrome DevTools > Profiler`
2. Code split routes with React.lazy() if app grows
3. Use React.memo() for expensive components
4. Optimize images before adding to assets/
5. Monitor bundle size with each update
6. Use virtual scrolling for long lists

## Resources

- [Vite Official Docs](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

## Support

For issues or questions, refer to:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
2. Review console errors (F12 in browser)
3. Check component import paths
4. Verify environment configuration

---

**Last Updated:** February 28, 2026
**Version:** 1.0.0
**Maintained by:** Harmonyum Team
