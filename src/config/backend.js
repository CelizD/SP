// src/config/backend.ts
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    endpoints: {
      // Asumiendo que tu backend Django tiene estos endpoints
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
  ws: {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws',
  }
};