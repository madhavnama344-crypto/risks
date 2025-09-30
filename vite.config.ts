import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy setting is the fix for the 404 error.
    // It tells Vite to forward any request starting with '/api'
    // to your backend server running on http://localhost:3001.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true, // Recommended for virtual hosted sites
      },
    },
  },
});
