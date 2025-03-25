import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/candidate-search/',
  define: {
    'process.env.VITE_GITHUB_API_KEY': '"your-fallback-value"'
  },
  envDir: './environment',
  plugins: [react()],
});
