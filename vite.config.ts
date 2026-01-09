import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: 'copy-404',
      closeBundle() {
        if (mode !== 'development') {
          try {
            const distDir = path.resolve(__dirname, 'dist');
            if (fs.existsSync(distDir)) {
              fs.copyFileSync(
                path.join(distDir, 'index.html'),
                path.join(distDir, '404.html')
              );
              console.log('✅ Copied index.html to 404.html for GitHub Pages SPA support');
            }
          } catch (e) {
            console.error('⚠️ Failed to copy 404.html', e);
          }
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
