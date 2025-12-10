import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Video, 
  Activity, 
  RefreshCw, 
  AlertCircle, 
  Eye, 
  Signal 
} from 'lucide-react';
import { cameraService } from '../../services/api';
import clsx from 'clsx';

export default function DashboardView() {
  const [cameras, setCameras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // --- LÓGICA DE DATOS (IGUAL QUE ANTES) ---
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await cameraService.getAll();
      const cameraList = response.data.cameras || []; 
      setCameras(cameraList);
      setLastUpdate(new Date());
      setError('');
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError('No se pudo conectar con el sistema de cámaras.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- CÁLCULOS DE ESTADÍSTICAS GLOBALES ---
  const camerasOnline = cameras.filter(c => c.running).length;
  const totalPeople = cameras.reduce((sum, cam) => sum + (cam.person_count || 0), 0);
  const totalDetections = cameras.reduce((sum, cam) => sum + (cam.detections_count || 0), 0);
  const totalCameras = cameras.length;

  const stats = [
    { title: 'Cámaras Activas', value: `${camerasOnline}/${totalCameras}`, sub: 'Dispositivos en línea', icon: Signal, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Personas Ahora', value: totalPeople.toString(), sub: 'Detectadas en tiempo real', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Total Objetos', value: totalDetections.toString(), sub: 'Incluye personas y otros', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Estado Sistema', value: error ? 'Error' : 'Operativo', sub: error ? 'Revisar conexión' : 'Funcionando normal', icon: BarChart3, color: error ? 'text-red-600' : 'text-orange-600', bg: error ? 'bg-red-50' : 'bg-orange-50' },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-8">
      {/* --- ENCABEZADO --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Centro de Monitoreo IA</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            Visualización en tiempo real de detecciones YOLOv8
            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full ml-2 font-medium">
              Actualizado: {lastUpdate.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all disabled:opacity-50"
        >
          <RefreshCw className={clsx("h-4 w-4", loading && "animate-spin")} />
          {loading ? 'Sincronizando...' : 'Actualizar Datos'}
        </button>
      </div>

      {/* --- ALERTA DE ERROR --- */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-semibold">Error de Conexión</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* --- TARJETAS DE ESTADÍSTICAS SUPERIORES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* --- SECCIÓN PRINCIPAL: GRID DE CÁMARAS VISUALES --- */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Video className="h-6 w-6 text-slate-700" />
          Vistas en Vivo
        </h2>
        
        {cameras.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
            <Video className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Sin cámaras conectadas</h3>
            <p className="text-slate-500 mt-2">No se están recibiendo datos de ningún dispositivo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {cameras.map((cam, i) => {
              const isRunning = cam.running;
              const camName = cam.original_name || cam.camera_id || `Cámara ${i + 1}`;

              return (
                // --- TARJETA DE CÁMARA ---
                <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] transition-all group">
                  
                  {/* 1. Placeholder Visual del Video (Cabecera Oscura) */}
                  <div className="relative h-40 bg-slate-800 flex flex-col items-center justify-center p-4 group-hover:bg-slate-700 transition-colors">
                    <Video className={clsx("h-10 w-10 mb-3 transition-colors", isRunning ? "text-white" : "text-slate-500")} />
                    <h3 className="text-white font-medium text-center truncate w-full px-4" title={camName}>
                      {camName}
                    </h3>
                    {/* Indicador de estado en la "pantalla" */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className={clsx("h-2 w-2 rounded-full", isRunning ? "bg-green-500 animate-pulse" : "bg-red-500")}></span>
                        <span className="text-xs font-bold text-white">
                            {isRunning ? 'EN VIVO' : 'OFFLINE'}
                        </span>
                    </div>
                  </div>
                  
                  {/* 2. Datos y Métricas (Cuerpo de la tarjeta) */}
                  <div className="p-5">
                    {/* Fuente e Info Técnica */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 truncate">
                        <Signal className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <p className="text-xs text-slate-500 truncate" title={cam.source}>
                          {cam.source || 'Fuente desconocida'}
                        </p>
                      </div>
                      <p className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        FPS: {cam.fps || 0}
                      </p>
                    </div>

                    <hr className="border-slate-100 my-4" />

                    {/* Contadores de Detección */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Personas */}
                      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1 text-blue-600">
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Personas</span>
                        </div>
                        <p className="text-2xl font-black text-blue-700">{cam.person_count || 0}</p>
                      </div>
                      {/* Total Objetos */}
                      <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100 text-center">
                         <div className="flex items-center justify-center gap-1.5 mb-1 text-purple-600">
                            <Activity className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Objetos</span>
                        </div>
                        <p className="text-2xl font-black text-purple-700">{cam.detections_count || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}