import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true, // Abre el navegador automáticamente
    host: true, // Permite acceso desde red local
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundle estas dependencias
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  base: './', // Para rutas relativas
})