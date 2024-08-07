import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': {
        target: 'http://iplan-backend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, '/uploads'), 
      },
    },
  },
});
