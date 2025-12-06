// src/config/backend.ts

const config = {
  api: {
    // Busca la variable de entorno o usa localhost por defecto
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 5000,
    endpoints: {
      auth: {
        login: '/api/auth/login/',
        register: '/api/auth/register/',
        logout: '/api/auth/logout/',
        user: '/api/auth/user/',
      },
      cameras: '/api/cameras/',
      recordings: '/api/recordings/',
      events: '/api/events/',
    }
  },
  // Estandarizamos el nombre a 'websocket' para que coincida con api.ts
  websocket: {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws',
  }
};

export default config;