import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const DashboardView: React.FC = () => {
  const { username, userRole, metrics, setMetrics } = useAppContext();
  const [loading, setLoading] = useState(true);

  // Cargar métricas de ejemplo
  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const exampleMetrics = [
        { id: '1', name: 'Aula 101', capacity: 30, currentOccupancy: 25, temperature: 22, humidity: 45 },
        { id: '2', name: 'Aula 102', capacity: 25, currentOccupancy: 20, temperature: 23, humidity: 50 },
        { id: '3', name: 'Laboratorio A', capacity: 20, currentOccupancy: 15, temperature: 21, humidity: 48 },
        { id: '4', name: 'Sala de Conferencias', capacity: 50, currentOccupancy: 35, temperature: 24, humidity: 52 },
      ];
      
      setMetrics(exampleMetrics);
      setLoading(false);
    };

    loadMetrics();
  }, [setMetrics]);

  const totalStudents = metrics.reduce((acc, m) => acc + m.currentOccupancy, 0);
  const totalCapacity = metrics.reduce((acc, m) => acc + m.capacity, 0);
  const avgOccupancy = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0;

  return (
    <div className="dashboard-view">
      {/* Header con animación */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          👋 Bienvenido, {username}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {userRole === 'admin' 
            ? 'Panel de control administrativo completo' 
            : userRole === 'teacher'
            ? 'Monitor de tus aulas asignadas'
            : 'Dashboard del estudiante'}
        </p>
      </div>

      {/* Estadísticas rápidas con animación escalonada */}
      <div className="dashboard-grid animate-stagger">
        {/* Aulas Activas */}
        <div className="metric-card animate-slide-up" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span className="text-3xl">📊</span>
            </div>
            <span className="metric-change positive">
              ↑ 12%
            </span>
          </div>
          <h3>Aulas Activas</h3>
          <div className="metric-value">{loading ? '...' : metrics.length}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {metrics.length} de 8 disponibles
          </p>
        </div>

        {/* Estudiantes */}
        <div className="metric-card animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="text-3xl">👥</span>
            </div>
            <span className="metric-change positive">
              ↑ 8%
            </span>
          </div>
          <h3>Estudiantes Presentes</h3>
          <div className="metric-value">{loading ? '...' : totalStudents}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            de {totalCapacity} capacidad total
          </p>
        </div>

        {/* Cámaras */}
        <div className="metric-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <span className="text-3xl">📹</span>
            </div>
            <span className="metric-change positive">
              ↑ 100%
            </span>
          </div>
          <h3>Cámaras Activas</h3>
          <div className="metric-value">8</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Todas en línea
          </p>
        </div>

        {/* Ocupación Promedio */}
        <div className="metric-card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <span className="text-3xl">📈</span>
            </div>
            <span className="metric-change negative">
              ↓ 3%
            </span>
          </div>
          <h3>Ocupación Promedio</h3>
          <div className="metric-value">{loading ? '...' : avgOccupancy}%</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            vs. semana pasada
          </p>
        </div>
      </div>

      {/* Tabla de aulas mejorada */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-8 animate-slide-up" 
           style={{ animationDelay: '400ms' }}>
        <div className="p-6 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                📍 Monitoreo en Tiempo Real
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Estado actual de todas las aulas
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105">
              <span className="flex items-center gap-2">
                <span>🔄</span>
                Actualizar
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando datos...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Aula
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Ocupación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Temperatura
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Humedad
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {metrics.map((room, index) => {
                  const occupancyPercent = Math.round((room.currentOccupancy / room.capacity) * 100);
                  const isHighOccupancy = occupancyPercent >= 80;
                  const isMediumOccupancy = occupancyPercent >= 50 && occupancyPercent < 80;
                  
                  return (
                    <tr 
                      key={room.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-lg mr-3">🏫</div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {room.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Capacidad: {room.capacity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-[120px]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {room.currentOccupancy}/{room.capacity}
                              </span>
                              <span className={`text-xs font-semibold ${
                                isHighOccupancy ? 'text-red-600' :
                                isMediumOccupancy ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {occupancyPercent}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isHighOccupancy ? 'bg-red-500' :
                                  isMediumOccupancy ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${occupancyPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🌡️</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {room.temperature}°C
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">💧</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {room.humidity}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isHighOccupancy 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : isMediumOccupancy
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {isHighOccupancy ? '⚠️ Alta' : isMediumOccupancy ? '📊 Media' : '✅ Normal'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CSS para animaciones */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-stagger > * {
          opacity: 0;
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardView;