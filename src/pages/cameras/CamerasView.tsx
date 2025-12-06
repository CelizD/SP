import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import CameraCard from '../../components/camera/CameraCard';
import { 
  Video, 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Server
} from 'lucide-react';

const CamerasView: React.FC = () => {
  const {
    cameras,
    setCameras,
    setIsCameraModalOpen,
    setEditingCamera
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'date'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos de ejemplo
  useEffect(() => {
    const loadCameras = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const exampleCameras = [
        {
          id: '1',
          name: 'Cámara Principal',
          ip: '192.168.1.100',
          port: 554,
          username: 'admin',
          password: 'admin123',
          rtsp_url: '/live',
          status: 'online' as const,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Cámara Entrada',
          ip: '192.168.1.101',
          port: 554,
          username: 'admin',
          password: 'password',
          rtsp_url: '/stream1',
          status: 'offline' as const,
          createdAt: '2024-01-16'
        },
        {
          id: '3',
          name: 'Cámara Laboratorio',
          ip: '192.168.1.102',
          port: 554,
          username: 'admin',
          password: 'lab123',
          rtsp_url: '/main',
          status: 'online' as const,
          createdAt: '2024-01-17'
        },
        {
          id: '4',
          name: 'Cámara Auditorio',
          ip: '192.168.1.103',
          port: 554,
          username: 'admin',
          password: 'audit123',
          rtsp_url: '/stream',
          status: 'online' as const,
          createdAt: '2024-01-18'
        }
      ];
      
      setCameras(exampleCameras);
      setIsLoading(false);
    };

    loadCameras();
  }, [setCameras]);

  // Filtrar y ordenar cámaras
  const filteredCameras = cameras
    .filter(camera => {
      const matchesSearch = camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           camera.ip.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || camera.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const handleAddCamera = () => {
    setEditingCamera(null);
    setIsCameraModalOpen(true);
  };

  const handleEditCamera = (camera: any) => {
    setEditingCamera(camera);
    setIsCameraModalOpen(true);
  };

  const onlineCount = cameras.filter(c => c.status === 'online').length;
  const offlineCount = cameras.filter(c => c.status === 'offline').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header Limpio */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            Gestión de Cámaras
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Administra y monitorea las conexiones IP del sistema
          </p>
        </div>
        
        <button 
          onClick={handleAddCamera}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          Nueva Cámara
        </button>
      </div>

      {/* Panel de Estadísticas (Tarjetas Blancas) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Dispositivos</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{cameras.length}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">En Línea</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{onlineCount}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Sin Conexión</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{offlineCount}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Disponibilidad</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {cameras.length > 0 ? Math.round((onlineCount / cameras.length) * 100) : 0}%
              </h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Buscador */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Controles Derecha */}
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          
          <div className="relative min-w-[140px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
            >
              <option value="all">Todos</option>
              <option value="online">En Línea</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="relative min-w-[140px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="date">Más recientes</option>
              <option value="name">Nombre A-Z</option>
              <option value="status">Por estado</option>
            </select>
          </div>

          <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Contenido */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Cargando dispositivos...</p>
        </div>
      ) : filteredCameras.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No se encontraron cámaras</h3>
          <p className="text-slate-500 mt-1">Intenta ajustar los filtros o agrega una nueva cámara.</p>
        </div>
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col gap-4'}
        `}>
          {filteredCameras.map((camera) => (
            <div key={camera.id} className={viewMode === 'list' ? 'w-full' : ''}>
              <CameraCard
                camera={camera}
                onEdit={handleEditCamera}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CamerasView;