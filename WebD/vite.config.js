import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          auth: ['@auth0/auth0-react'],
          charts: ['react-tradingview-widget'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['prop-types'],
  },
})
