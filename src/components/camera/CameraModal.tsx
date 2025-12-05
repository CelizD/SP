import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const CameraModal: React.FC = () => {
  const {
    isCameraModalOpen,
    setIsCameraModalOpen,
    editingCamera,
    cameras,
    setCameras
  } = useAppContext();

  const [formData, setFormData] = useState({
    name: editingCamera?.name || '',
    ip: editingCamera?.ip || '',
    port: editingCamera?.port || 554,
    username: editingCamera?.username || '',
    password: editingCamera?.password || '',
    rtsp_url: editingCamera?.rtsp_url || '/live',
  });

  if (!isCameraModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCamera = {
      id: editingCamera?.id || Date.now().toString(),
      ...formData,
      status: 'online' as const,
      createdAt: editingCamera?.createdAt || new Date().toISOString()
    };

    if (editingCamera) {
      // Actualizar cámara existente
      setCameras(cameras.map(c => c.id === editingCamera.id ? newCamera : c));
    } else {
      // Agregar nueva cámara
      setCameras([...cameras, newCamera]);
    }

    setIsCameraModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingCamera ? 'Editar Cámara' : 'Agregar Cámara'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Dirección IP</label>
            <input
              type="text"
              value={formData.ip}
              onChange={(e) => setFormData({...formData, ip: e.target.value})}
              placeholder="192.168.1.100"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Puerto RTSP</label>
            <input
              type="number"
              value={formData.port}
              onChange={(e) => setFormData({...formData, port: parseInt(e.target.value)})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Ruta RTSP</label>
            <input
              type="text"
              value={formData.rtsp_url}
              onChange={(e) => setFormData({...formData, rtsp_url: e.target.value})}
              placeholder="/live"
              required
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={() => setIsCameraModalOpen(false)}>
              Cancelar
            </button>
            <button type="submit">
              {editingCamera ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CameraModal;