const config = {
  api: {
    // IMPORTANTE: Dejar vacío ('') para usar el Proxy del paso anterior.
    // Esto hace que el navegador guarde la sesión automáticamente.
    baseURL: '', 
    timeout: 10000,
    endpoints: {
      auth: {
        login: '/web/login/submit/',
        logout: '/web/logout/',
        checkAuth: '/api/cameras/all/',
      },
      cameras: '/api/cameras/',
      recordings: '/api/recordings/',
      events: '/api/events/',
    }
  },
  websocket: {
    url: import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws',
  }
};

export default config;