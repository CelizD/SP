import React, { useState } from 'react';
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

  // Datos de ejemplo para cámaras
  React.useEffect(() => {
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
      }
    ];
    setCameras(exampleCameras);
  }, [setCameras]);

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCamera = () => {
    setEditingCamera(null);
    setIsCameraModalOpen(true);
  };

  const handleEditCamera = (camera: any) => {
    setEditingCamera(camera);
    setIsCameraModalOpen(true);
  };

  return (
    <div className="cameras-view">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📹 Gestión de Cámaras</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Administra tus cámaras IP conectadas al sistema
          </p>
        </div>
        
        <button 
          onClick={handleAddCamera}
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
        >
          <span className="mr-2">+</span>
          Agregar Cámara
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar cámaras por nombre o IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Lista de cámaras */}
      {filteredCameras.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="text-5xl mb-4">📹</div>
          <h3 className="text-xl font-semibold dark:text-white mb-2">
            No se encontraron cámaras
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {searchTerm ? 'Intenta con otro término de búsqueda' : 'Agrega tu primera cámara para comenzar'}
          </p>
          <button 
            onClick={handleAddCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Agregar Cámara
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCameras.map(camera => (
            <CameraCard
              key={camera.id}
              camera={camera}
              onEdit={handleEditCamera}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CamerasView;