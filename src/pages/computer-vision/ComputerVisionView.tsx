import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import SecureCamera from '../../components/camera/SecureCamera';
import { 
  Eye, 
  Cpu, 
  Video, 
  Activity, 
  Maximize2, 
  Server, 
  Aperture, 
  ScanFace,
  Hand,
  Box,
  
} from 'lucide-react';

const ComputerVisionView: React.FC = () => {
  const { 
    cameras,
    selectedCamera,
    setSelectedCamera
  } = useAppContext();

  const [activeModel, setActiveModel] = useState('coco-ssd');

  // Helper para obtener icono del modelo
  const getModelIcon = (model: string) => {
    switch(model) {
      case 'coco-ssd': return <Box className="w-4 h-4" />;
      case 'posenet': return <Activity className="w-4 h-4" />;
      case 'facemesh': return <ScanFace className="w-4 h-4" />;
      case 'handpose': return <Hand className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Eye className="w-8 h-8 text-blue-600" />
          Visión Artificial
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Análisis en tiempo real y detección de patrones mediante IA.
        </p>
      </div>

      {/* Panel de Control Superior */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selector de Cámara */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Video className="w-4 h-4 text-slate-400" />
              Fuente de Video
            </label>
            <div className="relative">
              <select
                value={selectedCamera?.id || ''}
                onChange={(e) => {
                  const camera = cameras.find(c => c.id === e.target.value);
                  setSelectedCamera(camera || null);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccionar dispositivo...</option>
                {cameras.map(camera => (
                  <option key={camera.id} value={camera.id}>
                    {camera.name} — {camera.ip}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Selector de Modelo */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-400" />
              Modelo de Procesamiento
            </label>
            <div className="relative">
              <select
                value={activeModel}
                onChange={(e) => setActiveModel(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="coco-ssd">Detección de Objetos (COCO-SSD)</option>
                <option value="posenet">Estimación de Postura (PoseNet)</option>
                <option value="facemesh">Malla Facial (FaceMesh)</option>
                <option value="handpose">Seguimiento de Manos (HandPose)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Panel Izquierdo: Información Técnica */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Detalles de Sesión</h3>
            </div>
            
            <div className="p-6">
              {selectedCamera ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Dispositivo</span>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
                        <Video className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-slate-900">{selectedCamera.name}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Dirección de Red</span>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md text-slate-500">
                        <Server className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-sm text-slate-700">{selectedCamera.ip}:{selectedCamera.port}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Configuración IA</span>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="p-1.5 bg-purple-50 rounded-md text-purple-600">
                        {getModelIcon(activeModel)}
                      </div>
                      <span className="font-medium text-slate-900 capitalize">
                        {activeModel.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Estado</span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        selectedCamera.status === 'online' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${selectedCamera.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        {selectedCamera.status === 'online' ? 'Conectado' : 'Sin señal'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Aperture className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Selecciona una cámara para ver sus especificaciones.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tarjeta de Instrucciones */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
            <h4 className="font-semibold text-blue-900 text-sm mb-2 flex items-center gap-2">
              <Maximize2 className="w-4 h-4" />
              Modo de Análisis
            </h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              El sistema procesará cada cuadro de video buscando patrones según el modelo seleccionado. Asegúrate de tener buena iluminación para mejores resultados.
            </p>
          </div>
        </div>

        {/* Panel Derecho: Visualización */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-800 relative aspect-video flex flex-col">
            {selectedCamera ? (
              <div className="flex-1 relative">
                <SecureCamera
                  cameraConfig={{
                    username: selectedCamera.username,
                    password: selectedCamera.password,
                    type: 'rtsp'
                  }}
                  modelType={activeModel}
                />
                
                {/* Overlay de información sobre el video (opcional) */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-white tracking-wide">EN VIVO • {activeModel.toUpperCase()}</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-slate-100">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <Eye className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Esperando señal</h3>
                <p className="text-sm text-slate-500 mt-1">Selecciona una cámara para iniciar el análisis</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComputerVisionView;