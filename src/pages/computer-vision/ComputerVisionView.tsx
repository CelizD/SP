import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import SecureCamera from '../../components/camera/SecureCamera';

const ComputerVisionView: React.FC = () => {
  const { 
    cameras,
    selectedCamera,
    setSelectedCamera
  } = useAppContext();

  const [activeModel, setActiveModel] = useState('coco-ssd');

  return (
    <div className="computer-vision-view">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">👁️ Computer Vision Pro</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Visualización y análisis en tiempo real con IA
        </p>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Selector de cámara */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Seleccionar Cámara
          </label>
          <select
            value={selectedCamera?.id || ''}
            onChange={(e) => {
              const camera = cameras.find(c => c.id === e.target.value);
              setSelectedCamera(camera || null);
            }}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="">-- Selecciona una cámara --</option>
            {cameras.map(camera => (
              <option key={camera.id} value={camera.id}>
                {camera.name} ({camera.ip})
              </option>
            ))}
          </select>
        </div>

        {/* Selector de modelo */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Modelo de IA
          </label>
          <select
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="coco-ssd">COCO-SSD (Detección de objetos)</option>
            <option value="posenet">PoseNet (Estimación de pose)</option>
            <option value="facemesh">FaceMesh (Reconocimiento facial)</option>
            <option value="handpose">HandPose (Detección de manos)</option>
          </select>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información de la cámara */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold dark:text-white mb-4">📹 Información de la Cámara</h3>
            
            {selectedCamera ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Nombre</p>
                  <p className="dark:text-white font-medium">{selectedCamera.name}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Dirección IP</p>
                  <p className="dark:text-white font-medium">{selectedCamera.ip}:{selectedCamera.port}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Estado</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCamera.status === 'online'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {selectedCamera.status === 'online' ? '✅ En línea' : '❌ Offline'}
                  </span>
                </div>
                
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Modelo activo</p>
                  <p className="dark:text-white font-medium">
                    {activeModel === 'coco-ssd' && 'COCO-SSD (Objetos)'}
                    {activeModel === 'posenet' && 'PoseNet (Posturas)'}
                    {activeModel === 'facemesh' && 'FaceMesh (Rostros)'}
                    {activeModel === 'handpose' && 'HandPose (Manos)'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📹</div>
                <p className="text-gray-600 dark:text-gray-300">
                  Selecciona una cámara para ver los detalles
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Video y análisis */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            {selectedCamera ? (
              <div className="p-4">
                <SecureCamera
                  cameraConfig={{
                    username: selectedCamera.username,
                    password: selectedCamera.password,
                    type: 'rtsp'
                  }}
                  modelType={activeModel}
                />
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="text-6xl mb-6">👁️</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Cámara no seleccionada
                </h3>
                <p className="text-gray-400">
                  Selecciona una cámara de la lista para comenzar el análisis en tiempo real
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionView;