// src/services/api.js
import axios from 'axios';
import backendConfig from '../config/backend';

const api = axios.create({
  baseURL: backendConfig.api.baseURL,
  timeout: backendConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar tokens de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || 
                  localStorage.getItem('token') || 
                  sessionStorage.getItem('access_token');
    
    if (token) {
      // Para Django REST Token Authentication
      config.headers.Authorization = `Token ${token}`;
      // O para JWT (si tu backend usa JWT)
      // config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o no válido
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones de autenticación
export const authService = {
  login: async (credentials) => {
    try {
      // Prueba diferentes endpoints comunes
      const endpoints = [
        '/auth/login/',
        '/api-token-auth/',
        '/token/',
        '/login/'
      ];
      
      let response;
      for (const endpoint of endpoints) {
        try {
          response = await api.post(endpoint, credentials);
          if (response.data.token || response.data.access) {
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (response?.data) {
        // Guardar token según el formato del backend
        if (response.data.access) { // JWT
          localStorage.setItem('access_token', response.data.access);
          if (response.data.refresh) {
            localStorage.setItem('refresh_token', response.data.refresh);
          }
        } else if (response.data.token) { // Token Authentication
          localStorage.setItem('token', response.data.token);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    return api.post('/auth/logout/');
  },

  getCurrentUser: () => {
    return api.get('/auth/user/');
  }
};

// Servicio de cámaras
export const cameraService = {
  getAll: () => api.get(backendConfig.api.endpoints.cameras),
  getById: (id) => api.get(`${backendConfig.api.endpoints.cameras}${id}/`),
  create: (cameraData) => api.post(backendConfig.api.endpoints.cameras, cameraData),
  update: (id, cameraData) => api.put(`${backendConfig.api.endpoints.cameras}${id}/`, cameraData),
  delete: (id) => api.delete(`${backendConfig.api.endpoints.cameras}${id}/`),
  getStreamUrl: (cameraId) => {
    // Asume que el backend tiene un endpoint para streams
    return `${backendConfig.api.baseURL.replace('/api', '')}/stream/${cameraId}/`;
  }
};

// Servicio de grabaciones
export const recordingService = {
  getAll: (params) => api.get(backendConfig.api.endpoints.recordings, { params }),
  getByCamera: (cameraId) => api.get(`${backendConfig.api.endpoints.recordings}?camera=${cameraId}`),
  delete: (id) => api.delete(`${backendConfig.api.endpoints.recordings}${id}/`),
};

// Servicio WebSocket para notificaciones en tiempo real
export const createWebSocket = () => {
  const ws = new WebSocket(backendConfig.websocket.url);
  
  ws.onopen = () => {
    console.log('WebSocket conectado');
    // Autenticar si hay token
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    if (token) {
      ws.send(JSON.stringify({
        type: 'auth',
        token: token
      }));
    }
  };
  
  return ws;
};

export default api;