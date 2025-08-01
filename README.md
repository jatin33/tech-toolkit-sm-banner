# TechStack Canvas 🎨

> Create stunning social media banners showcasing your tech stack with an intuitive drag-and-drop canvas interface.

![TechStack Canvas](public/preview.png)

**🎯 [Live Demo](https://main.d1of3vfbkkw17d.amplifyapp.com/)** • **🎥 [Video Demo](https://www.loom.com/share/da2f379cbf1544d0893baaa4e04f7cae?sid=f99c1240-d53e-465a-87c2-0f70461f1de6)**

*Best experienced on Desktop*

## 💡 Inspiration

This project was inspired by [Manu Arora's tweet](https://x.com/mannupaaji/status/1943212071438479506) about showcasing tech stacks visually. We've transformed that inspiration into a fully functional drag-and-drop canvas for creating professional social media banners.

## ✨ Features

- **🎨 Drag & Drop Canvas**: Intuitive interface for arranging tech icons on realistic device mockups
- **📱 Device Templates**: Beautiful tablet mockup with precise scaling and positioning
- **🔧 26+ Tech Icons**: Comprehensive library covering AI, development, design, and productivity tools
- **📤 Social Media Export**: One-click export to PNG optimized for Twitter (1500×500) and LinkedIn (1584×396)
- **🌙 Modern UI**: Clean, dark-themed interface with professional styling
- **↩️ Undo/Redo**: Full history management with keyboard shortcuts (Ctrl/Cmd+Z/Y)
- **🔍 Smart Search**: Real-time icon filtering with availability tracking
- **👆 Touch Support**: Native touch interactions for mobile and tablet users
- **⚡ High Performance**: Smooth interactions with efficient re-rendering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jatin33/tech-toolkit-sm-banner.git
cd tech-toolkit-sm-banner

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎯 How to Use

1. **Browse Icons**: Search through 26+ tech tool icons in the left sidebar
2. **Drag & Drop**: Drag icons from the sidebar onto the tablet mockup canvas
3. **Arrange**: Reposition icons within the grid by dragging them around
4. **Replace**: Drop new icons on existing positions to replace them instantly
5. **Undo/Redo**: Use Ctrl+Z/Y (Cmd+Z/Y on Mac) or footer buttons for history navigation
6. **Export**: Click Twitter or LinkedIn buttons to download your professional banner

## 🔧 Tech Stack

- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **Build Tool**: Vite 7.0.4 (Lightning fast!)
- **Styling**: Tailwind CSS 4.1.11 with custom design tokens
- **Icons**: High-quality SVG assets for crisp rendering
- **Export**: HTML5 Canvas API for high-quality image generation
- **State Management**: React hooks with useReducer pattern for complex state

## 📁 Project Structure

```
src/
├── components/
│   ├── Canvas/           # Main canvas and grid components
│   │   ├── DropZoneGrid.tsx
│   │   ├── GridCell.tsx
│   │   ├── tabletTemplates.ts
│   │   └── TabletPlaceholder.tsx
│   ├── Footer/           # Export and undo/redo controls
│   │   ├── Footer.tsx
│   │   ├── DownloadTwitter.tsx
│   │   └── DownloadLinkedIn.tsx
│   ├── Preview/          # Canvas wrapper component
│   │   └── Canvas.tsx
│   └── ThemeProvider.tsx # Theme management
├── hooks/
│   ├── useIconHistory.ts # Undo/redo functionality
│   └── useTheme.ts      # Theme state management
├── utils/
│   ├── canvasExport.ts  # Image export functionality
│   ├── iconActions.ts   # Icon manipulation actions
│   └── iconReducer.ts   # State management reducer
└── App.tsx              # Main application component
```

## 🎨 Available Tech Icons

### AI & ML Tools
- OpenAI, Claude, Gemini, Grok, Mistral, Perplexity
- Hugging Face, Ollama, OpenRouter, DeepSeek

### Development Tools
- GitHub, GitHub Copilot, Cursor, Cline, Replit
- AWS, Cloudflare, n8n, Make

### Design & Productivity
- Figma, Notion, NotebookLM, v0, Midjourney, ElevenLabs

## 🖼️ Export Formats

- **Twitter**: 1500×500px (3:1 aspect ratio) - Perfect for Twitter headers
- **LinkedIn**: 1584×396px (4:1 aspect ratio) - Optimized for LinkedIn banners
- **Format**: PNG with 2x scaling for crisp, high-quality output
- **Background**: Solid backgrounds optimized for social media platforms

## ⌨️ Keyboard Shortcuts

- `Ctrl+Z` / `Cmd+Z`: Undo last action
- `Ctrl+Y` / `Cmd+Y`: Redo last action
- `Ctrl+Shift+Z` / `Cmd+Shift+Z`: Alternative redo

## 🎯 Key Features Deep Dive

### Advanced Drag & Drop System
- **Multi-source dragging**: Icons from sidebar + repositioning within grid
- **Smart replacements**: Drop icons on occupied cells to replace them instantly
- **Visual feedback**: Hover states, drag indicators, and smooth animations
- **Touch support**: Works seamlessly on touch devices

### Intelligent State Management
- **History tracking**: 50-action undo/redo buffer with command pattern
- **Real-time updates**: Sidebar automatically updates with available icons
- **Type safety**: Full TypeScript coverage for bulletproof state operations

### Professional Export System
- **Canvas rendering**: HTML5 Canvas for pixel-perfect output
- **Platform optimization**: Different dimensions optimized for each social platform
- **Error handling**: Comprehensive error management for image operations
- **Automatic download**: Files save with descriptive, platform-specific names

## 🔄 Development Workflow

### Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production with optimizations
npm run preview  # Preview production build locally
npm run lint     # Run ESLint for code quality checks
```

### Code Quality Standards
- **TypeScript**: Strict type checking for reliability
- **ESLint**: React and TypeScript specific linting rules
- **Component Architecture**: Modular, reusable, and maintainable components
- **Performance**: Optimized re-rendering with React.memo and useCallback

## 🚀 Deployment

The project is configured for seamless deployment:

### Vercel (Recommended)
```bash
npm i -g vercel && vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### AWS Amplify (Current)
Already deployed at: [https://main.d1of3vfbkkw17d.amplifyapp.com/](https://main.d1of3vfbkkw17d.amplifyapp.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Additional device templates (iPhone, MacBook, desktop setups)
- [ ] Custom icon upload functionality
- [ ] Save/load project configurations
- [ ] More export formats (JPG, SVG, PDF)
- [ ] Social media integration for direct sharing
- [ ] Batch export multiple formats simultaneously
- [ ] Custom text/branding overlay options
- [ ] Mobile-optimized interface improvements

## 💫 Feedback & Support

**Love this project?** 😀 

- ⭐ Star the repository
- 🐛 [Report bugs](https://github.com/jatin33/tech-toolkit-sm-banner/issues)
- 💡 [Request features](https://github.com/jatin33/tech-toolkit-sm-banner/issues)
- 🎥 Share your creations on social media

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspiration**: [Manu Arora (@mannupaaji)](https://x.com/mannupaaji/status/1943212071438479506) for the original tech stack visualization idea
- **Tech Icons**: All tech company logos and icons are property of their respective owners
- **Community**: Built with ❤️ for builders who want to showcase their tech stack beautifully

---

**Made with ❤️ for the tech community**

[🚀 Live Demo](https://main.d1of3vfbkkw17d.amplifyapp.com/) • [🎥 Video Demo](https://www.loom.com/share/da2f379cbf1544d0893baaa4e04f7cae?sid=f99c1240-d53e-465a-87c2-0f70461f1de6) • [🐛 Report Bug](https://github.com/jatin33/tech-toolkit-sm-banner/issues) • [💡 Request Feature](https://github.com/jatin33/tech-toolkit-sm-banner/issues)
