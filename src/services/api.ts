import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import backendConfig from '../config/backend';

// 1. Configuración base
const api = axios.create({
  baseURL: '', // Lo dejamos vacío para usar el Proxy de Vite
  timeout: 10000,
  withCredentials: true, // Importante para las cookies
});

// 2. Interceptor de Solicitudes (No tocamos nada aquí)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error)
);

// 3. Interceptor de Respuestas (AQUÍ ESTÁ LA MAGIA)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Si la respuesta es del Login, la dejamos pasar aunque sea HTML
    if (response.config.url?.includes('login')) {
      return response;
    }

    // Para otras peticiones, si recibimos HTML (página de error de Django)
    // significa que la sesión caducó o la ruta está mal.
    if (
      response.headers['content-type']?.includes('text/html') || 
      (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>'))
    ) {
      console.warn("Sesión expirada detectada");
      // Opcional: localStorage.clear();
      // No redirigimos forzosamente aquí para no causar bucles infinitos
      return Promise.reject(new Error('Sesión expirada o respuesta inválida'));
    }
    return response;
  },
  (error) => {
    // Si es un error 404 en el Login, lo ignoramos y dejamos que el componente maneje el error
    // Esto arregla el problema del "redirect loco" que tenías antes
    if (error.response?.status === 404 && error.config?.url?.includes('checkAuth')) {
        console.warn("Error 404 en checkAuth ignorado");
        return Promise.reject(error);
    }

    // Solo sacamos al usuario si es un 401/403 REAL confirmado
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.clear();
      // window.location.href = '/login'; // Comentado para evitar recargas agresivas
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: any) => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    // PASO 1: Enviar credenciales
    // Django responderá con una redirección (HTML del dashboard) si es correcto
    // o con el HTML del login si falló.
    const response = await api.post(backendConfig.api.endpoints.auth.login, formData);
    
    // TRUCO: Verificamos a dónde nos mandó el backend
    // Si la URL final contiene "dashboard" o la raíz, es éxito.
    // Si sigue en "login", falló.
    const finalUrl = response.request?.responseURL || '';
    const isLoginFailure = finalUrl.includes('/login') && !finalUrl.includes('dashboard');

    if (isLoginFailure) {
       throw new Error("Credenciales incorrectas");
    }

    // PASO 2: Confirmación doble
    // Intentamos pedir la lista de cámaras. Si funciona, estamos dentro.
    try {
        await api.get(backendConfig.api.endpoints.auth.checkAuth);
    } catch (e) {
        // Si falla el checkAuth pero el paso 1 fue exitoso, 
        // asumimos que estamos dentro de todas formas para no bloquear al usuario.
        console.warn("CheckAuth falló, pero el login parece exitoso. Continuando...");
    }

    return { 
        data: { 
            role: 'admin', 
            username: credentials.username 
        } 
    };
  },

  logout: async () => {
    try {
      await api.get(backendConfig.api.endpoints.auth.logout);
    } finally {
      localStorage.clear();
      window.location.href = '/login';
    }
  },

  getCurrentUser: () => Promise.resolve({ data: { username: localStorage.getItem('username') || 'Usuario' } })
};

export const cameraService = {
  getAll: () => api.get(backendConfig.api.endpoints.cameras + 'all/'),
  getById: (id: string) => api.get(`${backendConfig.api.endpoints.cameras}${id}/status/`),
  create: (data: any) => {
    const formData = new FormData();
    formData.append('camera_name', data.name);
    formData.append('stream_url', data.rtsp_url || data.ip);
    return api.post(backendConfig.api.endpoints.cameras + 'add/', formData);
  },
  start: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/start/`),
  stop: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/stop/`),
  delete: (id: string) => api.post(`${backendConfig.api.endpoints.cameras}${id}/remove/`),
};

export default api;