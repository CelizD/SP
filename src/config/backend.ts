// src/config/backend.ts

const config = {
  api: {
    // Asegúrate de que esto apunte a tu servidor Django
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 10000, // Damos más tiempo por si hay redirecciones
    endpoints: {
      auth: {
        // Esta es la ruta que vi en tu urls.py que lleva a views.login_submit
        login: '/web/login/submit/', 
        // Usaremos esta vista para cerrar sesión (views.logout_view)
        logout: '/web/logout/',
        // Usaremos esto para verificar si el login funcionó (views.all_cameras_view)
        checkAuth: '/api/cameras/all/',
      },
      cameras: '/api/cameras/',
      // Ajusta estas si tienes endpoints específicos para grabaciones
      recordings: '/api/recordings/',
      events: '/api/events/',
    }
  },
  websocket: {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws',
  }
};

export default config;