// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // ESTA ES LA REGLA QUE ARREGLA EL 404:
      '/api/web': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/web/, '/web')
      },
      // ... tus otras reglas (/api, /web, /ws) ...
      '/web': { target: 'http://127.0.0.1:8000', changeOrigin: true, secure: false },
      '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true, secure: false },
      '/ws': { target: 'ws://127.0.0.1:8000', ws: true }
    }
  }
})