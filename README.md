# Harmonium Web App 🎹

Interactive harmonium simulator built with React, Vite and Web Audio API. Play
realistic reed tones, record your music and switch octaves – all in the browser.

## ✨ Key Features

- **Authentic harmonium layout** with white and black keys matching a real
  instrument
- **Low‑latency audio** using custom periodic wave to emulate reed timbre
- **ADSR envelope** plus sustain mode for natural note behaviour
- **Three octaves** (lower, middle, higher) with octave switch buttons
- **Mouse, touch & keyboard input** (A/S/D/F/G/H/J for whites, W/E/T/Y/U for
  blacks; Shift/Ctrl for octaves)
- **Volume control**, waveform selection, recording & playback
- **Dark/light themes** and responsive design for desktop & mobile
- **No backend** — pure frontend SPA, deployable to Vercel/Netlify

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd Harmonyum-App

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload when you make changes.

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Build outputs to `dist/` directory, ready for deployment.

## 📊 Project Size

- **HTML**: 1.77 KB
- **CSS**: 5.20 KB (1.66 KB gzipped)
- **Main JS**: 4.99 KB (1.89 KB gzipped)
- **Vendor Libraries**: 163.89 KB (53.64 KB gzipped)
- **Animations Library**: 94.30 KB (30.67 KB gzipped)
- **Total Gzipped**: ~86 KB

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Check code style
npm run deploy           # Prepare for deployment
```

## 📁 Project Structure

```
Harmonyum-App/
├── src/
│   ├── component/           # React components
│   │   ├── Common/          # Shared UI components
│   │   └── Harmonium/       # Keyboard and controls
│   ├── context/             # React context providers
│   ├── constants/           # Music notes and configuration
│   ├── services/            # Audio service (Web Audio API)
│   ├── hooks/               # Custom React hooks
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── App.css              # App styling
│   └── index.css            # Global styles
├── public/                  # Static assets
├── data/                    # Application data
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
├── DEVELOPMENT.md           # Development guide
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
```

## 🔧 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 7.3.1 | Build Tool |
| Framer Motion | 9.1.7 | Animations |
| React Icons | 4.12.0 | Icons |
| Tailwind CSS | 3.3.6 | Utility-first CSS |

## 📖 Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development setup and guidelines
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions for various platforms

## 🌍 Deployment

Deploy to your favorite platform:

### Popular Options:
- **Vercel** (Recommended) - Auto-deploys from Git
- **Netlify** - Drag & drop or Git integration
- **GitHub Pages** - Free hosting for GitHub projects
- **AWS S3 + CloudFront** - CDN with global distribution
- **Docker** - Containerized deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🎨 Customization

### Colors
Primary color: **#4A90E2**

Update in CSS files:
- [src/component/Layout/Style.css](src/component/Layout/Style.css)
- [src/App.css](src/App.css)
- [src/index.css](src/index.css)

### Content
- **Home page**: [src/component/Home/Home.jsx](src/component/Home/Home.jsx)
- **Navigation**: [src/component/Layout/Navbar.jsx](src/component/Layout/Navbar.jsx)
- **Data files**: [data/encrypted/](data/encrypted/)

## 🔒 Environment Configuration

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Update values as needed for your deployment.

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3001
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
npm audit fix --force
npm run build
```

See [DEVELOPMENT.md](DEVELOPMENT.md#common-issues--solutions) for more solutions.

## 📈 Performance

- **Lazy Loading**: Vite enables code splitting
- **Minification**: Terser compression for production
- **Optimization**: No source maps in production
- **Caching**: Immutable file hashes for versioning

## ✅ Checklist Before Deployment

- [ ] Updated `package.json` version number
- [ ] Tested on desktop, tablet, and mobile
- [ ] No console errors or warnings
- [ ] Build completes successfully
- [ ] Verified environment variables
- [ ] Updated favicon and logos
- [ ] Set up analytics (if needed)
- [ ] Configured CDN/caching headers
- [ ] Security headers in place
- [ ] SSL certificate installed

## 🌟 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Optimization

- Responsive design with CSS Grid/Flexbox
- Mobile-first navigation menu
- Touch-friendly interface
- Fast load times
- PWA-ready

## 🔐 Security

- Dependencies regularly audited
- No sensitive data in source code
- Environment variables for configuration
- HTTPS enforced in production
- Content Security Policy headers

## 📝 License

This project is maintained by the Harmonyum Team.

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:

1. Check the [DEVELOPMENT.md](DEVELOPMENT.md) guide
2. Review browser console for errors
3. Verify all imports and paths
4. Check issue tracker

## 🎉 Acknowledgments

- React community for amazing tools
- Vite for incredibly fast builds
- All contributors and users

## 📊 Project Stats

- **Components**: 6
- **Build Time**: ~2-5 seconds
- **Bundle Size**: ~86 KB (gzipped)
- **Performance Score**: Optimized for Core Web Vitals

## 🔄 Version History

### v1.0.0 (February 28, 2026)
- Initial release
- React + Vite setup
- Core components and routing
- Production build optimization
- Comprehensive documentation

---

<div align="center">

**Made with 🙏 for Spiritual Harmony**

[Get Started](#-quick-start) • [Documentation](DEVELOPMENT.md) • [Deploy](DEPLOYMENT.md)

</div>

