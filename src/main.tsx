import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register service worker for PWA:
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/neglect-app/sw.js').catch((regErr) => {
      console.log('Service worker registration failed: ', regErr);
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
