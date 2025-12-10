import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { X, Server, Globe, Lock, User, Radio, Save, Youtube, Video } from 'lucide-react';
import { cameraService } from '../../services/api';

const CameraModal: React.FC = () => {
  const { isCameraModalOpen, setIsCameraModalOpen, editingCamera, setCameras } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'rtsp' | 'youtube'>('rtsp'); // Nuevo estado para pestañas

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    port: 554,
    username: '',
    password: '',
    rtsp_path: '/live',
    youtube_url: '', // Campo específico para YouTube
  });

  // Cargar datos al editar
  useEffect(() => {
    if (isCameraModalOpen && editingCamera) {
      // Detectar si es YouTube o RTSP basado en la URL
      const isYt = editingCamera.ip.includes('youtube') || editingCamera.ip.includes('http');
      
      setMode(isYt ? 'youtube' : 'rtsp');
      setFormData({
        name: editingCamera.name || '',
        ip: isYt ? '' : editingCamera.ip,
        port: editingCamera.port || 554,
        username: editingCamera.username || '',
        password: editingCamera.password || '',
        rtsp_path: isYt ? '' : editingCamera.rtsp_url,
        youtube_url: isYt ? editingCamera.ip : '',
      });
    } else {
      // Resetear al abrir
      setFormData({
        name: '', ip: '', port: 554, username: '', password: '', rtsp_path: '/live', youtube_url: ''
      });
      setMode('rtsp');
    }
  }, [isCameraModalOpen, editingCamera]);

  if (!isCameraModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Construir la URL final según el modo
      let finalStreamUrl = '';
      
      if (mode === 'youtube') {
        finalStreamUrl = formData.youtube_url;
      } else {
        // Construcción manual de RTSP
        const userPart = formData.username ? `${formData.username}:${formData.password}@` : '';
        const cleanPath = formData.rtsp_path.startsWith('/') ? formData.rtsp_path.slice(1) : formData.rtsp_path;
        finalStreamUrl = `rtsp://${userPart}${formData.ip}:${formData.port}/${cleanPath}`;
      }

      const payload = {
        name: formData.name,
        stream_url: finalStreamUrl // Enviamos la URL lista al backend
      };

      if (editingCamera) {
        await cameraService.delete(editingCamera.id);
        await cameraService.create(payload);
      } else {
        await cameraService.create(payload);
      }

      setIsCameraModalOpen(false);
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">
            {editingCamera ? 'Editar Cámara' : 'Nueva Cámara'}
          </h2>
          <button onClick={() => setIsCameraModalOpen(false)} className="text-slate-400 hover:bg-slate-200 rounded-full p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Modo */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setMode('rtsp')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              mode === 'rtsp' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Radio className="w-4 h-4" /> Cámara IP (RTSP)
          </button>
          <button
            type="button"
            onClick={() => setMode('youtube')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              mode === 'youtube' ? 'text-red-600 border-b-2 border-red-600 bg-red-50/50' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Youtube className="w-4 h-4" /> YouTube / URL Directa
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Nombre (Común) */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Nombre de la Cámara</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Server className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ej. Cámara Entrada"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          {/* MODO YOUTUBE / URL */}
          {mode === 'youtube' && (
            <div className="space-y-3 animate-in slide-in-from-left-2 duration-200">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-800">
                Pegue aquí el enlace de YouTube o una URL directa de video (mp4, m3u8).
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">URL del Video</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    required={mode === 'youtube'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODO RTSP (Clásico) */}
          {mode === 'rtsp' && (
            <div className="space-y-4 animate-in slide-in-from-right-2 duration-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="block text-sm font-medium text-slate-700">IP</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg sm:text-sm"
                    placeholder="192.168.1.100"
                    value={formData.ip}
                    onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    required={mode === 'rtsp'}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Puerto</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg sm:text-sm"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Ruta RTSP</label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-500 sm:text-sm">/</span>
                  <input
                    type="text"
                    className="flex-1 min-w-0 block w-full px-3 py-2 bg-slate-50 rounded-none rounded-r-lg border border-slate-300 sm:text-sm"
                    placeholder="live/main"
                    value={formData.rtsp_path.startsWith('/') ? formData.rtsp_path.slice(1) : formData.rtsp_path}
                    onChange={(e) => setFormData({ ...formData, rtsp_path: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Usuario</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg sm:text-sm"
                    placeholder="admin"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                  <input
                    type="password"
                    className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg sm:text-sm"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCameraModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg shadow-sm disabled:opacity-50 transition-colors ${
                mode === 'youtube' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Save className="w-4 h-4" />
              {loading ? 'Guardando...' : 'Guardar Cámara'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CameraModal;