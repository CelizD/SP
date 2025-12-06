/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Forzamos colores claros
        background: '#f8fafc', // Gris muy suave (Slate 50)
        surface: '#ffffff',    // Blanco puro
        primary: '#2563eb',    // Azul estándar
        text: '#0f172a',       // Negro suave (Slate 900) para lectura
        textLight: '#64748b',  // Gris para textos secundarios
        border: '#e2e8f0',     // Gris borde
      }
    },
  },
  plugins: [],
}