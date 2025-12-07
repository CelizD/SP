import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import backendConfig from '../config/backend';

// 1. Crear instancia de Axios
const api = axios.create({
  baseURL: backendConfig.api.baseURL,
  timeout: backendConfig.api.timeout,
  // ¡VITAL! Esto permite que el navegador guarde la Cookie de sesión de Django
  withCredentials: true, 
});

// 2. Interceptor simple (Ya NO enviamos tokens manuales, la Cookie lo hace sola)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Manejo de errores
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Si Django dice 403 (Prohibido) o 401 (No autorizado), cerramos sesión local
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: any) => {
    try {
      // TRUCO: Convertimos el JSON a un Formulario Web real
      // Tu backend (views.py) usa 'request.POST.get', así que necesita esto:
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      // Enviamos a la ruta web (/web/login/submit/)
      // Django responderá con una redirección (302) al dashboard.
      // Axios sigue la redirección automáticamente.
      await api.post(backendConfig.api.endpoints.auth.login, formData);

      // VERIFICACIÓN:
      // Como tu backend no devuelve JSON de éxito, probamos pedir las cámaras.
      // Si nos deja verlas, es que estamos logueados.
      try {
        await api.get(backendConfig.api.endpoints.auth.checkAuth);
        
        // ¡Éxito! Guardamos sesión local para que React sepa que estamos dentro
        localStorage.setItem('userRole', 'admin'); 
        localStorage.setItem('username', credentials.username);
        
        return {
          data: {
            username: credentials.username,
            role: 'admin' // Asumimos admin porque tu backend web no nos dice el rol
          }
        };
      } catch (checkError) {
        throw new Error("Credenciales incorrectas");
      }

    } catch (error) {
      console.error("Login fallido:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.get(backendConfig.api.endpoints.auth.logout);
    } finally {
      localStorage.clear();
    }
  },

  getCurrentUser: () => {
    // Como usamos cookies, simulamos la respuesta con los datos locales
    return Promise.resolve({ 
      data: { 
        username: localStorage.getItem('username') || 'Usuario' 
      } 
    });
  }
};

// Servicios de Cámaras
export const cameraService = {
  // Tu view se llama 'all_cameras_view' en la ruta 'api/cameras/all/'
  getAll: () => api.get(backendConfig.api.endpoints.cameras + 'all/'), 
  
  getById: (id: string) => api.get(`${backendConfig.api.endpoints.cameras}${id}/status/`),
  
  // Tu view 'add_camera_view' espera un POST de formulario
  create: (data: any) => {
    const formData = new FormData();
    formData.append('camera_name', data.name);
    formData.append('stream_url', data.rtsp_url || data.ip);
    // Agregamos credenciales por si acaso, aunque tu backend las pone hardcodeadas o opcionales
    formData.append('camera_user', data.username || 'admin');
    formData.append('camera_password', data.password || 'admin');
    return api.post(backendConfig.api.endpoints.cameras + 'add/', formData);
  },
  
  start: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/start/`),
  stop: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/stop/`),
  delete: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/remove/`),
};

export default api;