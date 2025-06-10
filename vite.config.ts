import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/neglect-app/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Make sure to always generate sourcemaps for proper debugging
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
    // Avoid potential CSP issues with inline scripts
    modulePreload: {
      polyfill: true,
    },
    // Ensure no debug fingerprints are added to build
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom',
            'react-router-dom'
          ]
        }
      }
    }
  },
}));
