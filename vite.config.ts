import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Import only the necessary polyfill
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/candidate-search/',
  resolve: {
    alias: {
      crypto: path.resolve(path.dirname(new URL(import.meta.url).pathname), 'node_modules/crypto-browserify'),
    },
  },
  define: {
    'process.env.VITE_GITHUB_API_KEY': '"your-fallback-value"'
  },
  envDir: './environment',
  plugins: [react(), nodePolyfills()],
});
