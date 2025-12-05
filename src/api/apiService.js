import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const cameraService = {
    getCameras: () => api.get('/cameras/all/'),
    addCamera: (data) => api.post('/cameras/add/', data),
    updateCamera: (id, data) => api.put(`/cameras/${id}/update/`, data), // si no existe update, se puede borrar
    deleteCamera: (id) => api.delete(`/cameras/${id}/remove/`),
    startCamera: (id) => api.get(`/cameras/${id}/start/`),
    stopCamera: (id) => api.get(`/cameras/${id}/stop/`),
    getFrame: (id) => api.get(`/cameras/${id}/frame/`, { responseType: "blob" }),
};

export default api;
