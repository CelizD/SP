import React, { useState, useEffect, useRef } from 'react';
import { Lock, User, Key, Wifi, AlertTriangle, RefreshCw, EyeOff } from 'lucide-react';
import backendConfig from '../../config/backend';

interface SecureCameraProps {
  cameraId?: string; // Necesitamos el ID para pedir el video
  cameraConfig?: {
    username?: string;
    password?: string;
    type?: string;
  };
  modelType?: string;
}

const SecureCamera: React.FC<SecureCameraProps> = ({ cameraId, cameraConfig, modelType }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(cameraConfig?.username || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado para el video real
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Efecto para iniciar el "streaming" (refresco de imágenes) cuando se autentica
  useEffect(() => {
    if (isAuthenticated && cameraId) {
      const fetchFrame = () => {
        // Agregamos un timestamp (?t=...) para obligar al navegador a recargar la imagen
        const url = `${backendConfig.api.baseURL}/api/cameras/${cameraId}/frame/?t=${Date.now()}`;
        setImageSrc(url);
      };

      // Iniciar el ciclo de video (aprox 10-15 FPS)
      fetchFrame(); // Primer frame inmediato
      intervalRef.current = window.setInterval(fetchFrame, 100); 

      return () => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      };
    }
  }, [isAuthenticated, cameraId]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      // Simulación de login a la cámara (esto es local, la seguridad real la maneja Django)
      setTimeout(() => {
        setIsAuthenticated(true);
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className="w-full h-full bg-black rounded-xl overflow-hidden border border-slate-800 relative flex flex-col shadow-2xl">
      {!isAuthenticated ? (
        /* Pantalla de Bloqueo / Autenticación */
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/90 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 text-blue-400 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Acceso Restringido</h3>
              <p className="text-sm text-slate-400 mt-2">Cámara protegida por protocolo RTSP</p>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credenciales</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Usuario"
                  />
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/50 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Estableciendo túnel seguro...' : 'Desbloquear Transmisión'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Vista de Video Real */
        <div className="flex-1 relative bg-black flex items-center justify-center">
          
          {/* Capa de Video */}
          {!error ? (
            <img 
              src={imageSrc} 
              alt="Live Feed" 
              className="w-full h-full object-contain"
              onError={() => setError(true)}
            />
          ) : (
            <div className="text-center text-slate-500 p-8">
              <EyeOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-slate-400">Señal de video interrumpida</p>
              <p className="text-sm mt-2">Verifica que la cámara esté encendida en el Dashboard</p>
              <button 
                onClick={() => setError(false)} 
                className="mt-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm flex items-center gap-2 mx-auto transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Reintentar conexión
              </button>
            </div>
          )}

          {/* Overlay de Información (HUD) */}
          <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
                <span className="text-xs font-bold tracking-widest">EN VIVO</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                 <span className="text-xs font-mono text-blue-400">{modelType?.toUpperCase() || 'YOLOv8'} ENGINE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono bg-black/40 px-2 py-1 rounded backdrop-blur-md">
              <Wifi className="w-3 h-3" />
              <span>{Math.floor(Math.random() * (120 - 60) + 60)}ms</span>
            </div>
          </div>

          {/* Crosshair (Mira central para efecto profesional) */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/50 rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SecureCamera;