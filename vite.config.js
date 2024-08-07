import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://iplan-backend.onrender.com', // Ensure using HTTPS
        changeOrigin: true,
        secure: false, // If using a self-signed certificate
      },
    },
  },
})
