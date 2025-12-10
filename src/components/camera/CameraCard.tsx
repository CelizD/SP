import React, { useState } from 'react';
import { 
  MoreVertical, 
  Power, 
  Trash2, 
  Settings, 
  Video, 
  Eye, 
  X,
  Activity
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { cameraService } from '../../services/api';
import SecureCamera from './SecureCamera'; 
import clsx from 'clsx';

interface CameraCardProps {
  camera: any;
  onEdit?: (camera: any) => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onEdit }) => {
  const { setCameras, cameras, addToast } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Verificación flexible del estado
  const isOnline = camera.status === 'online' || camera.running === true;

  const toggleCamera = async () => {
    setIsLoading(true);
    try {
      if (isOnline) {
        await cameraService.stop(camera.id || camera.camera_id);
      } else {
        await cameraService.start(camera.id || camera.camera_id);
      }
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      addToast({ title: 'Error', message: 'No se pudo cambiar el estado', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta cámara?')) return;
    try {
      await cameraService.delete(camera.id || camera.camera_id);
      const newCameras = cameras.filter(c => c.id !== camera.id);
      setCameras(newCameras);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
        
        {/* --- HEADER VISUAL (MINIATURA) --- */}
        <div className="h-32 bg-slate-900 relative flex items-center justify-center overflow-hidden">
          {/* CAMBIO: Siempre mostramos el SecureCamera para intentar cargar video */}
          <div className="w-full h-full">
             <SecureCamera 
                cameraId={camera.id || camera.camera_id} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
             />
          </div>

          {/* Badge de Estado */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md bg-black/40 text-white z-10">
            <span className={clsx("w-2 h-2 rounded-full", isOnline ? "bg-green-500 animate-pulse" : "bg-red-500")}></span>
            {isOnline ? 'EN VIVO' : 'OFFLINE'}
          </div>

          {/* Menú de 3 puntos */}
          <div className="absolute top-3 right-3 z-20">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <button 
                  onClick={() => { onEdit && onEdit(camera); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Configurar
                </button>
                <button 
                  onClick={() => { handleDelete(); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- CUERPO --- */}
        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 truncate" title={camera.name}>
              {camera.name || camera.original_name || 'Cámara'}
            </h3>
            <p className="text-xs text-slate-500 truncate font-mono mt-0.5">
              {camera.source || 'IP Desconocida'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
             <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 font-medium uppercase">Personas</span>
                <span className="text-lg font-bold text-blue-600">{camera.person_count || 0}</span>
             </div>
             <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 font-medium uppercase">Objetos</span>
                <span className="text-lg font-bold text-purple-600">{camera.detections_count || 0}</span>
             </div>
          </div>

          {/* --- ACCIONES --- */}
          <div className="flex gap-2">
            <button
              onClick={toggleCamera}
              disabled={isLoading}
              className={clsx(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                isOnline 
                  ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                  : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
              )}
            >
              <Power className="w-4 h-4" />
              {isLoading ? '...' : (isOnline ? 'Detener' : 'Iniciar')}
            </button>

            {/* CAMBIO CLAVE: Quitamos 'disabled={!isOnline}' para que SIEMPRE puedas abrir el video */}
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL GIGANTE DE VIDEO --- */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                 <Video className="text-blue-500" /> 
                 {camera.name || 'Vista en Vivo'}
              </h2>
              <button 
                onClick={() => setShowPreview(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* VIDEO PLAYER */}
            <div className="flex-1 bg-black relative flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
               {/* Aquí está el componente de video */}
               <SecureCamera 
                  cameraId={camera.id || camera.camera_id} 
                  className="w-full h-full object-contain"
               />
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-slate-400 text-sm">
               <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  Estado: {isOnline ? 'Conectado' : 'Desconectado'}
               </div>
               <div>
                  FPS: {camera.fps || 0}
               </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CameraCard;