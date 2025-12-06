import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Video, Eye, Settings, LogOut, Users, MonitorPlay } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Video, label: 'Cámaras', path: '/cameras' },
    { icon: Eye, label: 'Visión Artificial', path: '/computer-vision' },
    { icon: Users, label: 'Usuarios', path: '/users' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-blue-600">
          <MonitorPlay className="h-6 w-6" />
          <span className="text-lg font-bold text-slate-900">Vision Pro</span>
        </div>
      </div>

      {/* Menú */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700' // Activo: Azul claro
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' // Inactivo: Gris oscuro -> Negro
              )
            }
          >
            <item.icon className={clsx("h-5 w-5", ({ isActive }: any) => isActive ? "text-blue-600" : "text-slate-400")} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Botón Salir */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}