import { BarChart3, Users, Video, Activity, RefreshCw } from 'lucide-react';

export default function DashboardView() {
  
  // Datos simulados (puedes conectarlos a tu contexto luego)
  const stats = [
    { title: 'Aulas Activas', value: '6/8', change: '+12%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Estudiantes', value: '142', change: '+5%', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Cámaras Online', value: '8', change: '100%', icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Ocupación', value: '78%', change: '-2%', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel de Control</h1>
          <p className="text-slate-500 mt-1">Resumen general del sistema</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <RefreshCw className="h-4 w-4" />
          Actualizar
        </button>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabla Simple (Ejemplo) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Estado de Aulas</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold">
                  {100 + i}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Aula {100 + i}</p>
                  <p className="text-xs text-slate-500">Ingeniería de Software</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-slate-600">En clase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}