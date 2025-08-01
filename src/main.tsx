import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PostHogProvider } from 'posthog-js/react'

// Initialize theme before React renders
const initializeTheme = () => {
  const stored = localStorage.getItem('theme');
  const theme = stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
  
  let resolvedTheme: 'light' | 'dark';
  if (theme === 'system') {
    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    resolvedTheme = theme as 'light' | 'dark';
  }
  
  document.documentElement.classList.add(resolvedTheme);
};

initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      <App />
    </PostHogProvider>
  </StrictMode>,
)