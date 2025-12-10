import React, { useState, useEffect, useRef } from 'react';
import { Wifi, RefreshCw, EyeOff, Loader2 } from 'lucide-react';
import backendConfig from '../../config/backend';

// 1. AQUÍ ESTÁ LA CLAVE: Agregamos 'className' para que no de error
interface SecureCameraProps {
  cameraId?: string;
  className?: string; // <--- Esto arregla el error rojo de TypeScript
  cameraConfig?: any;
  modelType?: string;
}

const SecureCamera: React.FC<SecureCameraProps> = ({ cameraId, className = '' }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const isMounted = useRef(true);

  // Limpieza de memoria cuando te vas de la pantalla
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (!cameraId) return;

    setLoading(true);
    setError(false);

    const fetchFrame = async () => {
        try {
            // URL para pedir el video al backend
            const baseUrl = backendConfig.api.baseURL || ''; 
            const url = `${baseUrl}/api/cameras/${cameraId}/frame/?t=${Date.now()}`;

            // Pedimos la imagen
            const response = await fetch(url);
            
            if (!response.ok) throw new Error("Frame not found");
            
            // Convertimos la respuesta en una imagen visible (BLOB)
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            if (isMounted.current) {
                // Actualizamos la imagen en pantalla
                setImageSrc(prev => {
                    if (prev.startsWith('blob:')) URL.revokeObjectURL(prev);
                    return objectUrl;
                });
                setLoading(false);
                setError(false);
            }
        } catch (err) {
            // Si falla, no hacemos nada para no parpadear, el siguiente intento lo arreglará
            // console.error(err); 
        }
    };

    // Intentar cargar la primera imagen ya
    fetchFrame();

    // Actualizar la imagen cada 200ms (Video fluido)
    intervalRef.current = window.setInterval(fetchFrame, 200);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      // Limpiar memoria
      setImageSrc(prev => {
         if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
         return '';
      });
    };
  }, [cameraId]);

  return (
    <div className={`bg-black overflow-hidden relative flex flex-col items-center justify-center ${className}`}>
      
      {/* 1. EL VIDEO */}
      {!error && imageSrc && (
        <img 
          src={imageSrc} 
          alt="Live Stream" 
          className="w-full h-full object-contain"
          onError={() => setError(true)}
        />
      )}

      {/* 2. CARGANDO */}
      {loading && !imageSrc && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      )}

      {/* 3. ERROR / OFFLINE */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-4 text-center z-10">
          <EyeOff className="w-12 h-12 mb-3 opacity-50" />
          <p className="font-bold text-slate-400">Sin Señal</p>
          <button 
            onClick={() => { setError(false); setLoading(true); }}
            className="mt-4 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Reintentar
          </button>
        </div>
      )}

      {/* 4. TEXTO "EN VIVO" */}
      {!error && imageSrc && (
        <div className="absolute top-2 left-2 flex items-center gap-2 pointer-events-none z-20">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/90 rounded text-white shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-widest">LIVE</span>
          </div>
          <div className="px-2 py-0.5 bg-black/50 text-white text-[10px] rounded font-mono border border-white/10 flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            Rec
          </div>
        </div>
      )}
    </div>
  );
};

export default SecureCamera;