import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Canvas from './components/Preview/Canvas';
import type { PlacedIcon } from './components/Canvas/tabletTemplates';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [placedIcons, setPlacedIcons] = useState<PlacedIcon[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [undoFunction, setUndoFunction] = useState<(() => void) | null>(null);
  const [redoFunction, setRedoFunction] = useState<(() => void) | null>(null);

  // Complete tech icons data - all available icons
  const techIcons = [
    { id: 1, name: 'OpenAI', url: 'assets/tech-icons/openai.svg' },
    { id: 2, name: 'Claude', url: 'assets/tech-icons/claude-color.svg' },
    { id: 3, name: 'Gemini', url: 'assets/tech-icons/gemini-color.svg' },
    { id: 4, name: 'Grok', url: 'assets/tech-icons/grok.svg' },
    { id: 5, name: 'Mistral', url: 'assets/tech-icons/mistral-color.svg' },
    { id: 6, name: 'Perplexity', url: 'assets/tech-icons/perplexity-color.svg' },
    { id: 7, name: 'Hugging Face', url: 'assets/tech-icons/huggingface-color.svg' },
    { id: 8, name: 'Ollama', url: 'assets/tech-icons/ollama.svg' },
    { id: 9, name: 'OpenRouter', url: 'assets/tech-icons/openrouter.svg' },
    { id: 10, name: 'Midjourney', url: 'assets/tech-icons/midjourney.svg' },
    { id: 11, name: 'AWS', url: 'assets/tech-icons/aws-color.svg' },
    { id: 12, name: 'Cline', url: 'assets/tech-icons/cline.svg' },
    { id: 13, name: 'Cloudflare', url: 'assets/tech-icons/cloudflare-color.svg' },
    { id: 14, name: 'Cursor', url: 'assets/tech-icons/cursor.svg' },
    { id: 15, name: 'DeepSeek', url: 'assets/tech-icons/deepseek-color.svg' },
    { id: 16, name: 'ElevenLabs', url: 'assets/tech-icons/elevenlabs.svg' },
    { id: 17, name: 'Figma', url: 'assets/tech-icons/figma-color.svg' },
    { id: 18, name: 'GitHub', url: 'assets/tech-icons/github.svg' },
    { id: 19, name: 'GitHub Copilot', url: 'assets/tech-icons/githubcopilot.svg' },
    { id: 20, name: 'Make', url: 'assets/tech-icons/make-color.svg' },
    { id: 21, name: 'Manus', url: 'assets/tech-icons/manus.svg' },
    { id: 22, name: 'n8n', url: 'assets/tech-icons/n8n-color.svg' },
    { id: 23, name: 'NotebookLM', url: 'assets/tech-icons/notebooklm.svg' },
    { id: 24, name: 'Notion', url: 'assets/tech-icons/notion.svg' },
    { id: 25, name: 'Replit', url: 'assets/tech-icons/replit-color.svg' },
    { id: 26, name: 'v0', url: 'assets/tech-icons/v0.svg' },
  ];

  // Get available icons (not currently placed on grid)
  const placedIconIds = placedIcons.map(placedIcon => placedIcon.techIconId);
  const availableIcons = techIcons.filter(icon => !placedIconIds.includes(icon.id));
  
  // Filter available icons by search term
  const filteredIcons = availableIcons.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, icon: typeof techIcons[0]) => {
    const dragData = {
      id: icon.id,
      name: icon.name,
      url: icon.url,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  const handleIconsChange = (icons: PlacedIcon[]) => {
    setPlacedIcons(icons);
  };

  const handleHistoryChange = (canUndoState: boolean, canRedoState: boolean, undo: () => void, redo: () => void) => {
    setCanUndo(canUndoState);
    setCanRedo(canRedoState);
    setUndoFunction(() => undo);
    setRedoFunction(() => redo);
  };

  const handleUndo = () => {
    if (undoFunction) {
      undoFunction();
    }
  };

  const handleRedo = () => {
    if (redoFunction) {
      redoFunction();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1A1A1D] text-white overflow-hidden">
      {/* Top Navbar */}
      <header className="h-[70px] bg-[#1A1A1D] border-b border-[#55555A] flex items-center px-8 z-10">
        <h1 className="text-2xl font-semibold text-white">My Tech Toolkit</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Icon Library (25% width) */}
        <aside className="w-1/4 bg-[#2D2D3D] border-r border-[#55555A] flex flex-col shrink-0">
          {/* Search Container */}
          <div className="p-6 border-b border-[#55555A]">
            <input
              type="text"
              placeholder="Search tech tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A1A1D] border border-[#55555A] rounded-lg text-white placeholder-[#AAAAAA] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-all"
            />
          </div>

          {/* Icon Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-3">
              {filteredIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="flex flex-col items-center p-3 border border-[#55555A] rounded-lg cursor-grab hover:border-[#007AFF] hover:bg-[#007AFF]/10 transition-all group"
                  draggable
                  onDragStart={(e) => handleDragStart(e, icon)}
                >
                  <div className="w-10 h-10 rounded-md flex items-center justify-center mb-2">
                    <img alt={icon.name} src={`${import.meta.env.BASE_URL}${icon.url}`} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-xs text-[#AAAAAA] text-center leading-tight group-hover:text-white transition-colors">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Canvas Area (75% width) */}
        <section className="flex-1">
          <Canvas 
            onIconsChange={handleIconsChange} 
            onHistoryChange={handleHistoryChange}
          />
        </section>
      </main>

      {/* Bottom Footer */}
      <Footer 
        onRedo={handleRedo} 
        onUndo={handleUndo} 
        imageUrl=''
        placedIcons={placedIcons}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </div>
  );
}

export default App;
