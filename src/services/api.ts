// src/services/api.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import backendConfig from '../config/backend';

// Crear instancia de Axios
const api = axios.create({
  baseURL: backendConfig.api.baseURL,
  timeout: backendConfig.api.timeout,
  // ¡CRUCIAL! Permite que las Cookies de Django (sessionid) se guarden en el navegador
  withCredentials: true, 
  headers: {
    // No forzamos JSON porque Django espera un formulario en el login
  },
});

// Interceptor simple (ya no necesitamos inyectar Tokens manualmente)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo de errores de sesión
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Si Django nos redirige al login (302) o da prohibido (403/401)
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
      // 1. Preparar datos como Formulario Web (lo que espera tu views.py)
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      // 2. Enviar credenciales a /web/login/submit/
      // Nota: Django responderá con una redirección (302) y Axios la seguirá automáticamente.
      await api.post(backendConfig.api.endpoints.auth.login, formData);

      // 3. VERIFICACIÓN:
      // Como tu backend no devuelve "Success: true" sino HTML,
      // intentamos llamar a una API protegida para ver si tenemos permiso.
      try {
        await api.get(backendConfig.api.endpoints.auth.checkAuth);
        
        // Si llegamos aquí, ¡tenemos sesión!
        // Guardamos datos falsos en localstorage para que el frontend sepa que estamos "dentro"
        localStorage.setItem('userRole', 'admin'); 
        localStorage.setItem('username', credentials.username);
        
        return {
          data: {
            username: credentials.username,
            role: 'admin'
          }
        };
      } catch (checkError) {
        // Si la verificación falla, es que el login no creó la sesión válida
        throw new Error("Credenciales incorrectas");
      }

    } catch (error) {
      console.error("Error en login:", error);
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
    // Simulamos respuesta ya que usamos Cookies
    return Promise.resolve({ 
      data: { 
        username: localStorage.getItem('username') || 'Usuario' 
      } 
    });
  }
};

// Servicios de Cámaras (Ajustados a tu urls.py)
export const cameraService = {
  // Tu view se llama 'all_cameras_view' y la ruta es 'api/cameras/all/'
  getAll: () => api.get(backendConfig.api.endpoints.cameras + 'all/'), 
  
  getById: (id: string) => api.get(`${backendConfig.api.endpoints.cameras}${id}/status/`),
  
  // Tu view 'add_camera_view' espera POST form-data en 'api/cameras/add/'
  create: (data: any) => {
    const formData = new FormData();
    formData.append('camera_name', data.name);
    formData.append('stream_url', data.rtsp_url || data.ip); // Ajusta según tu formulario
    return api.post(backendConfig.api.endpoints.cameras + 'add/', formData);
  },
  
  // Start/Stop
  start: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/start/`),
  stop: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/stop/`),
  
  delete: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/remove/`),
};

export default api;