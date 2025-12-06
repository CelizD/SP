import React from 'react';
import { Camera } from '../../contexts/AppContext';
import { 
  Video, 
  Settings, 
  Play, 
  Calendar, 
  Network, 
  MoreHorizontal 
} from 'lucide-react';

interface CameraCardProps {
  camera: Camera;
  onEdit: (camera: Camera) => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onEdit }) => {
  const isOnline = camera.status === 'online';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Header de la Tarjeta */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-start">
        <div className="flex gap-3">
          <div className={`p-2.5 rounded-lg ${isOnline ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{camera.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className={`text-xs font-medium ${isOnline ? 'text-emerald-700' : 'text-red-700'}`}>
                {isOnline ? 'En línea' : 'Sin señal'}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => onEdit(camera)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Información Técnica */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Network className="w-4 h-4 text-slate-400" />
          <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-700 border border-slate-100">
            {camera.ip}:{camera.port}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Agregada el {new Date(camera.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Botones de Acción */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors text-sm font-medium shadow-sm">
          <Play className="w-4 h-4" />
          Ver Video
        </button>
        <button 
          onClick={() => onEdit(camera)}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium shadow-sm"
        >
          <Settings className="w-4 h-4" />
          Configurar
        </button>
      </div>
    </div>
  );
};

export default CameraCard;