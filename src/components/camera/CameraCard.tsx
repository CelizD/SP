import React from 'react';
import { Camera, useAppContext } from '../../contexts/AppContext';
import { Video, Settings, Play, Calendar, Network, Trash2 } from 'lucide-react';

interface CameraCardProps {
  camera: Camera;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera }) => {
  // Traemos deleteCamera y setEditingCamera del contexto
  const { setEditingCamera, setIsCameraModalOpen, deleteCamera } = useAppContext();
  const isOnline = camera.status === 'online';
  
  // Usamos el ID correcto (el backend puede mandarlo como id o camera_id)
  const actualId = camera.id || camera.camera_id;

  const handleEdit = () => {
    setEditingCamera(camera);
    setIsCameraModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
        <div className="flex gap-3">
          <div className={`p-2.5 rounded-lg ${isOnline ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-700'}`}>
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{camera.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className={`text-xs font-medium ${isOnline ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                {isOnline ? 'En línea' : 'Sin señal'}
              </span>
            </div>
          </div>
        </div>

        {/* Botón de Eliminar */}
        {actualId && (
          <button 
            onClick={() => deleteCamera(actualId)}
            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Eliminar cámara"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <Network className="w-4 h-4" />
          <span className="font-mono bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
            {camera.ip}:{camera.port}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>{new Date(camera.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Footer Acciones */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
          <Play className="w-4 h-4" /> Ver
        </button>
        <button 
          onClick={handleEdit}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
        >
          <Settings className="w-4 h-4" /> Configurar
        </button>
      </div>
    </div>
  );
};

export default CameraCard;