import React, { useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const DashboardView: React.FC = () => {
  const { username, userRole, metrics, setMetrics, liveMetrics } = useAppContext();

  // Cargar métricas de ejemplo
  useEffect(() => {
    const exampleMetrics = [
      { id: '1', name: 'Aula 101', capacity: 30, currentOccupancy: 25, temperature: 22, humidity: 45 },
      { id: '2', name: 'Aula 102', capacity: 25, currentOccupancy: 20, temperature: 23, humidity: 50 },
      { id: '3', name: 'Laboratorio A', capacity: 20, currentOccupancy: 15, temperature: 21, humidity: 48 },
      { id: '4', name: 'Sala de Conferencias', capacity: 50, currentOccupancy: 35, temperature: 24, humidity: 52 },
    ];
    setMetrics(exampleMetrics);
  }, [setMetrics]);

  return (
    <div className="dashboard-view">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Bienvenido, {username}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {userRole === 'admin' 
            ? 'Panel de control administrativo' 
            : userRole === 'teacher'
            ? 'Monitor de tus aulas'
            : 'Dashboard del estudiante'}
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Aulas Activas</p>
              <p className="text-2xl font-bold dark:text-white">{metrics.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Estudiantes</p>
              <p className="text-2xl font-bold dark:text-white">
                {metrics.reduce((acc, m) => acc + m.currentOccupancy, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
              <span className="text-2xl">👁️</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Cámaras</p>
              <p className="text-2xl font-bold dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-4">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Uso del Sistema</p>
              <p className="text-2xl font-bold dark:text-white">94%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de aulas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Aulas y Métricas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Aula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ocupación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Temperatura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Humedad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {metrics.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {room.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${(room.currentOccupancy / room.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="dark:text-white">
                        {room.currentOccupancy}/{room.capacity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {room.temperature}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {room.humidity}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;