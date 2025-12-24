# Sylva Website

Official website for Sylva by Olea Computer - A Monad-native framework for user-seeded autonomous agents.

## Project Structure

```
SylvaWebsite/
├── index.html          # Main landing page
├── css/               # Stylesheets
│   ├── styles.css
│   └── design-system.css
├── js/                # JavaScript modules
│   ├── main.js
│   └── motion.js
├── images/            # Assets
├── docs/              # VitePress documentation
│   ├── .vitepress/
│   │   └── config.mjs
│   ├── guide/
│   ├── architecture/
│   └── consensus/
└── package.json
```

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Running Locally

**Main Website (Development):**
```bash
npm run dev
```
Opens at `http://localhost:3000`

**Documentation (Development):**
```bash
npm run docs:dev
```
Opens at `http://localhost:5173` (or next available port like 5177)

**Run Both Simultaneously:**

In separate terminal windows:
```bash
# Terminal 1 - Main site
npm run dev

# Terminal 2 - Documentation
npm run docs:dev
```

### Building for Production

**Build Main Website:**
```bash
npm run build
```

**Build Documentation:**
```bash
npm run docs:build
```

**Preview Production Build:**
```bash
npm run preview        # Main site
npm run docs:preview   # Documentation
```

## Documentation Connection

The website automatically handles documentation links in both development and production:

### Development Mode
- Main site runs on `http://localhost:3000`
- Documentation runs on `http://localhost:5173` (or auto-detected port)
- Documentation links open in new tab
- "Back to Sylva" link returns to main site

### Production Mode
- Documentation served at `/docs/` path
- Seamless navigation between main site and docs
- All links use relative paths

### How It Works

1. **JavaScript Detection** (`js/main.js`):
   - Detects localhost environment
   - Auto-discovers VitePress dev server port (5173, 5177, etc.)
   - Updates all documentation links dynamically

2. **VitePress Configuration** (`docs/.vitepress/config.mjs`):
   - Base path set to `/docs/` in production
   - Base path set to `/` in development
   - Navigation links adjusted per environment

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start main site dev server |
| `npm run build` | Build main site for production |
| `npm run preview` | Preview main site production build |
| `npm run docs:dev` | Start documentation dev server |
| `npm run docs:build` | Build documentation for production |
| `npm run docs:preview` | Preview documentation production build |

## Technologies

- **Main Site**: Vite, Vanilla JavaScript, CSS
- **Documentation**: VitePress (Vue-powered static site generator)
- **Styling**: Custom CSS with design system
- **Fonts**: Sora, Inter (Google Fonts)
- **Icons**: Font Awesome 6

## License

Copyright © 2025 Olea Computer. All rights reserved.
