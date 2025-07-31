import React from 'react';
import { ThemeToggle } from './ThemeToggle';

export const DesignSystemDemo: React.FC = () => {
  return (
    <div className="container-custom py-8 space-y-content">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-balance text-text-primary">My Tech Toolkit Design System</h1>
          <p className="mt-2 text-text-secondary">Professional dark theme with #007AFF accent</p>
        </div>
        <ThemeToggle />
      </header>

      {/* Color Palette */}
      <section className="card p-6">
        <h2 className="mb-6">Color Palette</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Colors */}
          <div>
            <h3 className="mb-3">Primary</h3>
            <div className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                <div key={shade} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded bg-primary-${shade} border border-[var(--color-border-primary)]`}></div>
                  <span className="text-sm font-mono">primary-{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3 className="mb-3">Secondary</h3>
            <div className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                <div key={shade} className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded bg-secondary-${shade} border border-[var(--color-border-primary)]`}></div>
                  <span className="text-sm font-mono">secondary-{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="mb-3">Semantic</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-success-500 border border-[var(--color-border-primary)]"></div>
                <span className="text-sm font-mono">success</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-warning-500 border border-[var(--color-border-primary)]"></div>
                <span className="text-sm font-mono">warning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-error-500 border border-[var(--color-border-primary)]"></div>
                <span className="text-sm font-mono">error</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="card p-6">
        <h2 className="mb-6">Typography</h2>
        
        <div className="space-y-4">
          <h1>Heading 1 - The quick brown fox</h1>
          <h2>Heading 2 - The quick brown fox</h2>
          <h3>Heading 3 - The quick brown fox</h3>
          <h4>Heading 4 - The quick brown fox</h4>
          <h5>Heading 5 - The quick brown fox</h5>
          <h6>Heading 6 - The quick brown fox</h6>
          
          <p className="text-lg">Large paragraph text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Regular paragraph text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p className="text-sm">Small paragraph text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          
          <p className="font-mono">Monospace font - const example = "Hello World";</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="card p-6">
        <h2 className="mb-6">Buttons</h2>
        
        <div className="space-y-6">
          {/* Primary buttons */}
          <div>
            <h3 className="mb-3">Primary</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary btn-sm">Small</button>
              <button className="btn-primary btn-md">Medium</button>
              <button className="btn-primary btn-lg">Large</button>
            </div>
          </div>

          {/* Secondary buttons */}
          <div>
            <h3 className="mb-3">Secondary</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary btn-sm">Small</button>
              <button className="btn-secondary btn-md">Medium</button>
              <button className="btn-secondary btn-lg">Large</button>
            </div>
          </div>

          {/* Ghost buttons */}
          <div>
            <h3 className="mb-3">Ghost</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-ghost btn-sm">Small</button>
              <button className="btn-ghost btn-md">Medium</button>
              <button className="btn-ghost btn-lg">Large</button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="card p-6">
        <h2 className="mb-6">Form Elements</h2>
        
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Text Input</label>
            <input type="text" className="input" placeholder="Enter text..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email Input</label>
            <input type="email" className="input" placeholder="Enter email..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Textarea</label>
            <textarea className="input resize-y" rows={3} placeholder="Enter message..."></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Select</label>
            <select className="input">
              <option>Choose an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="card p-6">
        <h2 className="mb-6">Badges</h2>
        
        <div className="flex flex-wrap gap-3">
          <span className="badge-primary">Primary</span>
          <span className="badge-success">Success</span>
          <span className="badge-warning">Warning</span>
          <span className="badge-error">Error</span>
        </div>
      </section>

      {/* Cards & Shadows */}
      <section className="card p-6">
        <h2 className="mb-6">Cards & Shadows</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-4 shadow-soft">
            <h3 className="mb-2">Soft Shadow</h3>
            <p>Card with soft shadow elevation.</p>
          </div>
          
          <div className="card p-4 shadow-medium">
            <h3 className="mb-2">Medium Shadow</h3>
            <p>Card with medium shadow elevation.</p>
          </div>
          
          <div className="card p-4 shadow-large">
            <h3 className="mb-2">Large Shadow</h3>
            <p>Card with large shadow elevation.</p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="card p-6">
        <h2 className="mb-6">Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-4 animate-fade-in">
            <h4>Fade In</h4>
            <p className="text-sm">Smooth fade animation</p>
          </div>
          
          <div className="card p-4 animate-slide-up">
            <h4>Slide Up</h4>
            <p className="text-sm">Slide up animation</p>
          </div>
          
          <div className="card p-4 animate-slide-down">
            <h4>Slide Down</h4>
            <p className="text-sm">Slide down animation</p>
          </div>
          
          <div className="card p-4 animate-scale-in">
            <h4>Scale In</h4>
            <p className="text-sm">Scale in animation</p>
          </div>
        </div>
      </section>
    </div>
  );
};
