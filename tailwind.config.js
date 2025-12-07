/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // CORRECCIÓN: 'darkMode' va aquí, en la raíz, NO dentro de theme/colors
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        background: '#f8fafc', 
        surface: '#ffffff',    
        primary: '#2563eb',    
        text: '#0f172a',      
        textLight: '#64748b',  
        border: '#e2e8f0',     
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}