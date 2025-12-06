import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import CameraCard from '../../components/camera/CameraCard';

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
    <div className="cameras-view">
      {/* Header animado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-down">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            📹 Gestión de Cámaras
          </h1>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <span>Administra tus cámaras IP conectadas al sistema</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
              <span className="animate-pulse">●</span> {onlineCount} En línea
            </span>
          </p>
        </div>
        
        <button 
          onClick={handleAddCamera}
          className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-xl flex items-center gap-2 font-semibold animate-bounce-in"
        >
          <span className="text-xl">+</span>
          Agregar Cámara
        </button>
      </div>

      {/* Panel de estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card-compact bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 animate-scale-in" 
             style={{ animationDelay: '0ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-300 font-semibold">Total Cámaras</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-200">{cameras.length}</p>
            </div>
            <div className="text-4xl">📹</div>
          </div>
        </div>

        <div className="stat-card-compact bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 animate-scale-in" 
             style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-300 font-semibold">En Línea</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-200">{onlineCount}</p>
            </div>
            <div className="text-4xl animate-pulse">✅</div>
          </div>
        </div>

        <div className="stat-card-compact bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 animate-scale-in" 
             style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 dark:text-red-300 font-semibold">Fuera de Línea</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-200">{offlineCount}</p>
            </div>
            <div className="text-4xl">❌</div>
          </div>
        </div>

        <div className="stat-card-compact bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 animate-scale-in" 
             style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-300 font-semibold">Disponibilidad</p>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-200">
                {cameras.length > 0 ? Math.round((onlineCount / cameras.length) * 100) : 0}%
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Barra de herramientas mejorada */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-slide-up" 
           style={{ animationDelay: '400ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar por nombre o IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white transition-all"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filtro de estado */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white transition-all cursor-pointer"
            >
              <option value="all">📋 Todos los estados</option>
              <option value="online">✅ En línea</option>
              <option value="offline">❌ Fuera de línea</option>
            </select>
          </div>

          {/* Ordenar */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white transition-all cursor-pointer"
            >
              <option value="date">📅 Más reciente</option>
              <option value="name">🔤 Nombre A-Z</option>
              <option value="status">🔘 Estado</option>
            </select>
          </div>
        </div>

        {/* Vista de modo */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold">Vista:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            ⊞ Cuadrícula
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            ☰ Lista
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-semibold">Cargando cámaras...</p>
        </div>
      ) : filteredCameras.length === 0 ? (
        /* Estado vacío mejorado */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center animate-scale-in">
          <div className="text-8xl mb-6 animate-bounce">📹</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {searchTerm || filterStatus !== 'all' 
              ? 'No se encontraron cámaras' 
              : 'No hay cámaras configuradas'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza agregando tu primera cámara para empezar el monitoreo'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button 
              onClick={handleAddCamera}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              + Agregar Primera Cámara
            </button>
          )}
          {(searchTerm || filterStatus !== 'all') && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
            >
              🔄 Limpiar Filtros
            </button>
          )}
        </div>
      ) : (
        /* Lista de cámaras */
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col gap-4'}
        `}>
          {filteredCameras.map((camera, index) => (
            <div
              key={camera.id}
              className={`animate-scale-in ${viewMode === 'list' ? 'w-full' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CameraCard
                camera={camera}
                onEdit={handleEditCamera}
              />
            </div>
          ))}
        </div>
      )}

      {/* Indicador de resultados */}
      {!isLoading && filteredCameras.length > 0 && (
        <div className="mt-8 text-center text-gray-600 dark:text-gray-300 animate-fade-in">
          <p className="text-sm">
            Mostrando <strong className="text-blue-600 dark:text-blue-400">{filteredCameras.length}</strong> de{' '}
            <strong className="text-blue-600 dark:text-blue-400">{cameras.length}</strong> cámaras
          </p>
        </div>
      )}

      {/* Estilos de animación */}
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .stat-card-compact {
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card-compact:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CamerasView;