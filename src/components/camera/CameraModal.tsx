import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { X, Server, Globe, Lock, User, Radio, Save } from 'lucide-react';

const CameraModal: React.FC = () => {
  const {
    isCameraModalOpen,
    setIsCameraModalOpen,
    editingCamera,
    cameras,
    setCameras
  } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    port: 554,
    username: '',
    password: '',
    rtsp_url: '/live',
  });

  // Efecto para cargar datos al editar o limpiar al abrir nuevo
  useEffect(() => {
    if (isCameraModalOpen) {
      if (editingCamera) {
        setFormData({
          name: editingCamera.name,
          ip: editingCamera.ip,
          port: editingCamera.port,
          username: editingCamera.username,
          password: editingCamera.password,
          rtsp_url: editingCamera.rtsp_url,
        });
      } else {
        // Reset form
        setFormData({
          name: '',
          ip: '',
          port: 554,
          username: '',
          password: '',
          rtsp_url: '/live',
        });
      }
    }
  }, [isCameraModalOpen, editingCamera]);

  if (!isCameraModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCamera = {
      id: editingCamera?.id || Date.now().toString(),
      ...formData,
      status: 'online' as const, // En una app real, aquí verificarías la conexión
      createdAt: editingCamera?.createdAt || new Date().toISOString()
    };

    if (editingCamera) {
      setCameras(cameras.map(c => c.id === editingCamera.id ? newCamera : c));
    } else {
      setCameras([...cameras, newCamera]);
    }

    setIsCameraModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            {editingCamera ? <Radio className="w-5 h-5 text-blue-600" /> : <Radio className="w-5 h-5 text-green-600" />}
            {editingCamera ? 'Configurar Cámara' : 'Nueva Cámara IP'}
          </h2>
          <button 
            onClick={() => setIsCameraModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Nombre del Dispositivo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Server className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                placeholder="Ej. Cámara Entrada Principal"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* IP */}
            <div className="col-span-2 space-y-1">
              <label className="block text-sm font-medium text-slate-700">Dirección IP</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="192.168.1.100"
                  value={formData.ip}
                  onChange={(e) => setFormData({...formData, ip: e.target.value})}
                  required
                />
              </div>
            </div>
            
            {/* Puerto */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Puerto</label>
              <input
                type="number"
                className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                value={formData.port}
                onChange={(e) => setFormData({...formData, port: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          {/* Ruta RTSP */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Ruta del Stream (RTSP)</label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-500 sm:text-sm font-mono">
                rtsp://{formData.ip || '...'}:{formData.port}/
              </span>
              <input
                type="text"
                className="flex-1 min-w-0 block w-full px-3 py-2 bg-slate-50 rounded-none rounded-r-lg border border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                placeholder="live/main"
                value={formData.rtsp_url.replace(/^\//, '')} // Visualmente quitamos el slash inicial para el input
                onChange={(e) => setFormData({...formData, rtsp_url: '/' + e.target.value.replace(/^\//, '')})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Usuario */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="admin"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          {/* Footer de Acciones */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={() => setIsCameraModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {editingCamera ? 'Guardar Cambios' : 'Agregar Cámara'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CameraModal;