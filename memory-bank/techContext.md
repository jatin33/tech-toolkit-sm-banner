# Tech Context

## Technology Stack

### Core Technologies
- **React:** 19.1.0 (Latest stable version)
- **TypeScript:** 5.8.3 (Type safety and enhanced DX)
- **Vite:** 7.0.4 (Fast build tool and dev server)

### Development Dependencies
- **ESLint:** 9.30.1 with React-specific plugins
- **@vitejs/plugin-react:** 4.6.0 for React support
- **TypeScript ESLint:** 8.35.1 for TS linting

### Development Environment
- **Node.js:** Required for package management and build tools
- **npm:** Package manager (lockfile present)
- **Hot Module Replacement:** Enabled for fast development
- **Source maps:** Available for debugging

## Build & Deploy Configuration

### Available Scripts
```json
{
  "dev": "vite",           // Development server
  "build": "tsc -b && vite build",  // Production build
  "lint": "eslint .",      // Code linting
  "preview": "vite preview" // Preview production build
}
```

### TypeScript Configuration
- **App Config:** `tsconfig.app.json` for application code
- **Node Config:** `tsconfig.node.json` for build tools
- **Base Config:** `tsconfig.json` for shared settings

### Vite Configuration
- React plugin enabled
- TypeScript support configured
- Development server with HMR
- Optimized production builds

## Development Setup Requirements
1. Node.js (version supporting ES modules)
2. npm or compatible package manager
3. Modern browser for development
4. TypeScript-aware IDE/editor recommended

## Technical Constraints
- **ES Modules:** Project uses modern module system
- **Browser Support:** Modern browsers (ES2015+)
- **Build Size:** Vite optimizations for production
- **Type Safety:** Strict TypeScript configuration

## Tool Usage Patterns
- **Development:** `npm run dev` for local development server
- **Code Quality:** `npm run lint` before commits
- **Production:** `npm run build` then `npm run preview`
- **Dependencies:** npm install for package management

## Performance Considerations
- Vite's fast refresh for immediate feedback
- Code splitting capabilities available
- Tree shaking in production builds
- Modern JavaScript features supported
- Lazy loading patterns can be implemented

## Future Technology Decisions
- **Routing:** React Router or alternative
- **State Management:** Context API, Zustand, or Redux
- **Styling:** CSS Modules, Styled Components, or Tailwind
- **Testing:** Jest, Vitest, or Testing Library
- **UI Components:** Custom or library (Material-UI, Chakra, etc.)
