import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const SettingsView: React.FC = () => {
  const { theme, toggleTheme, userRole } = useAppContext();
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  return (
    <div className="settings-view">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">⚙️ Configuración</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Personaliza la configuración de la aplicación
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel izquierdo */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-semibold dark:text-white mb-6">Preferencias del Sistema</h3>
            
            <div className="space-y-6">
              {/* Tema */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium dark:text-white">Tema de la interfaz</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Cambia entre tema claro y oscuro
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
                </button>
              </div>

              {/* Notificaciones */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium dark:text-white">Notificaciones</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Recibir alertas y notificaciones del sistema
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Auto-refresh */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium dark:text-white">Actualización automática</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Actualizar datos automáticamente
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Intervalo de actualización */}
              <div>
                <h4 className="font-medium dark:text-white mb-2">
                  Intervalo de actualización (segundos)
                </h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="dark:text-white w-12">{refreshInterval}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuraciones avanzadas para admin */}
          {userRole === 'admin' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold dark:text-white mb-6">Configuración Avanzada (Admin)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Límite de almacenamiento (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    defaultValue="50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Retención de registros (días)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    defaultValue="30"
                  />
                </div>
                
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Guardar configuración avanzada
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Panel derecho - Información del sistema */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-semibold dark:text-white mb-6">Información del Sistema</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Versión</p>
                <p className="dark:text-white font-medium">v1.0.0</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Última actualización</p>
                <p className="dark:text-white font-medium">15 Ene 2024</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Estado</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  ✅ Operativo
                </span>
              </div>
              
              <div className="pt-4 border-t dark:border-gray-700">
                <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition mb-3">
                  Ver logs del sistema
                </button>
                <button className="w-full px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition">
                  Reiniciar sistema
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;