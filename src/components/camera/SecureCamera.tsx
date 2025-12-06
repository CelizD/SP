import React, { useState } from 'react';
import { Lock, User, Key, Eye, Activity, Maximize, Wifi, ShieldCheck } from 'lucide-react';

interface SecureCameraProps {
  cameraConfig?: {
    username?: string;
    password?: string;
    type?: string;
  };
  modelType?: string;
}

const SecureCamera: React.FC<SecureCameraProps> = ({ cameraConfig, modelType }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(cameraConfig?.username || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      // Simular delay de red
      setTimeout(() => {
        setIsAuthenticated(true);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative flex flex-col">
      {!isAuthenticated ? (
        /* Pantalla de Autenticación */
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-500">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Acceso Restringido</h3>
              <p className="text-sm text-slate-500 mt-1">Ingresa las credenciales del dispositivo</p>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">Usuario</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                    placeholder="admin"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Verificando...' : 'Desbloquear Cámara'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Vista de Cámara Activa */
        <div className="flex flex-col h-full bg-slate-900">
          
          {/* Barra Superior del Video */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 rounded-md border border-red-500/20">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-red-500 tracking-wide">EN VIVO</span>
              </div>
              <div className="h-4 w-px bg-slate-700"></div>
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                {cameraConfig?.username}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> 1080p</span>
              <span className="bg-slate-700 px-2 py-0.5 rounded text-slate-200">
                {modelType?.toUpperCase() || 'IA OFF'}
              </span>
            </div>
          </div>
          
          {/* Contenedor de Video (Simulado) */}
          <div className="flex-1 relative overflow-hidden group bg-black flex items-center justify-center">
            
            {/* Simulación del Feed de Video */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-900/60 pointer-events-none"></div>
            
            {/* Mensaje Placeholder */}
            <div className="text-center text-slate-500">
              <Eye className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-mono tracking-wider opacity-60">RTSP STREAM FEED</p>
            </div>

            {/* Overlay de Detecciones (Simulado) */}
            <div className="absolute inset-0 p-8 pointer-events-none">
              {/* Box 1 */}
              <div className="absolute top-1/3 left-1/4 border-2 border-blue-500/70 bg-blue-500/5 rounded-sm p-1">
                <span className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-t-sm flex items-center gap-1">
                  PERSONA <span className="opacity-75">98%</span>
                </span>
                <div className="w-32 h-48"></div>
              </div>
              
              {/* Box 2 */}
              <div className="absolute bottom-1/4 right-1/3 border-2 border-purple-500/70 bg-purple-500/5 rounded-sm p-1">
                <span className="absolute -top-6 left-0 bg-purple-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-t-sm flex items-center gap-1">
                  OBJETO <span className="opacity-75">87%</span>
                </span>
                <div className="w-24 h-24"></div>
              </div>
            </div>

            {/* Controles Flotantes (Hover) */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-md transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Footer de Estadísticas */}
          <div className="bg-white border-t border-slate-200 px-4 py-3 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Velocidad</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-700">30</span>
                <span className="text-xs text-slate-500">FPS</span>
              </div>
            </div>
            
            <div className="flex flex-col border-l border-slate-100 pl-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5 flex items-center gap-1">
                Eventos <Activity className="w-3 h-3" />
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-blue-600">2</span>
                <span className="text-xs text-slate-500">Detectados</span>
              </div>
            </div>
            
            <div className="flex flex-col border-l border-slate-100 pl-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Latencia</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-700">12ms</span>
                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                  <div className="h-full bg-emerald-500 w-[20%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecureCamera;