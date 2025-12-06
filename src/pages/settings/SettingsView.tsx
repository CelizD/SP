import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { 
  Settings, 
  Bell, 
  RefreshCw, 
  Moon, 
  Sun, 
  Shield, 
  Database, 
  Clock, 
  Save, 
  Activity, 
  FileText, 
  Power 
} from 'lucide-react';

const SettingsView: React.FC = () => {
  const { theme, toggleTheme, userRole } = useAppContext();
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          Configuración
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Personaliza el comportamiento y las preferencias del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Preferencias */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tarjeta: Preferencias Generales */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-900 text-lg">Preferencias de Interfaz</h3>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Tema */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Apariencia Visual</h4>
                    <p className="text-sm text-slate-500 mt-1">Selecciona el tema de la interfaz</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  {theme === 'light' ? 'Cambiar a Oscuro' : 'Cambiar a Claro'}
                </button>
              </div>

              {/* Separador */}
              <hr className="border-slate-100" />

              {/* Notificaciones */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Notificaciones</h4>
                    <p className="text-sm text-slate-500 mt-1">Recibir alertas de actividad sospechosa</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Separador */}
              <hr className="border-slate-100" />

              {/* Auto Refresh */}
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Actualización en tiempo real</h4>
                    <p className="text-sm text-slate-500 mt-1">Recargar datos del dashboard automáticamente</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Slider de Intervalo */}
              {autoRefresh && (
                <div className="pl-14">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Frecuencia de actualización</span>
                    <span className="font-medium text-blue-600">{refreshInterval} segundos</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="10"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>10s</span>
                    <span>120s</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tarjeta: Configuración Admin (Solo visible si es admin) */}
          {userRole === 'admin' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-slate-900 text-lg">Zona Administrativa</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-400" />
                      Límite de Almacenamiento (GB)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900 bg-white transition-shadow"
                      defaultValue="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Retención de Logs (Días)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900 bg-white transition-shadow"
                      defaultValue="30"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Información */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Estado del Sistema
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Versión del Cliente</span>
                <span className="font-mono text-sm font-medium text-slate-900">v2.4.0</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Última Actualización</span>
                <span className="text-sm font-medium text-slate-900">Hace 2 horas</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-500 text-sm">Estado del Servidor</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Operativo
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <FileText className="w-4 h-4" />
                Ver Registros del Sistema
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                <Power className="w-4 h-4" />
                Reiniciar Servicios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;