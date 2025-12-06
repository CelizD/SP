// src/services/api.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import backendConfig from '../config/backend';

// Crear instancia de Axios
const api = axios.create({
  baseURL: backendConfig.api.baseURL,
  timeout: backendConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar Token a las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token') || 
                  localStorage.getItem('token') || 
                  sessionStorage.getItem('access_token');
    
    if (token && config.headers) {
      // Ajusta esto según lo que espere tu Django (Bearer o Token)
      config.headers.Authorization = `Bearer ${token}`; 
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de sesión (401)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token venció, limpiar y mandar al login
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de Autenticación
export const authService = {
  login: async (credentials: any) => {
    // Intentamos loguear directamente a la ruta configurada
    const endpoint = backendConfig.api.endpoints.auth.login;
    
    try {
      const response = await api.post(endpoint, credentials);
      
      if (response.data) {
        // Guardar token según lo que devuelva Django (JWT 'access' o Token simple)
        if (response.data.access) { 
          localStorage.setItem('access_token', response.data.access);
          if (response.data.refresh) {
            localStorage.setItem('refresh_token', response.data.refresh);
          }
        } else if (response.data.token) { 
          localStorage.setItem('token', response.data.token);
        }
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.clear();
    return api.post(backendConfig.api.endpoints.auth.logout);
  },

  getCurrentUser: () => {
    return api.get(backendConfig.api.endpoints.auth.user);
  }
};

// Servicios de Cámaras
export const cameraService = {
  getAll: () => api.get(backendConfig.api.endpoints.cameras),
  getById: (id: string) => api.get(`${backendConfig.api.endpoints.cameras}${id}/`),
  create: (data: any) => api.post(backendConfig.api.endpoints.cameras, data),
  update: (id: string, data: any) => api.put(`${backendConfig.api.endpoints.cameras}${id}/`, data),
  delete: (id: string) => api.delete(`${backendConfig.api.endpoints.cameras}${id}/`),
};

export default api;