const config = {
  api: {
    // Apuntamos directo al backend
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 10000,
    endpoints: {
      auth: {
        // CAMBIO IMPORTANTE: Esta es la ruta real que tiene tu urls.py
        login: '/web/login/submit/', 
        logout: '/web/logout/',
        // Usaremos esto para verificar si la sesión está activa
        checkAuth: '/api/cameras/all/',
      },
      cameras: '/api/cameras/',
      recordings: '/api/recordings/',
      events: '/api/events/',
    }
  },
  websocket: {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws',
  }
};

export default config;