import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { 
  X, 
  LayoutDashboard, 
  Video, 
  Eye, 
  Users, 
  Settings, 
  LogOut,
  MonitorPlay 
} from 'lucide-react';
import clsx from 'clsx';

interface MobileOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({ 
  isOpen = false, 
  onClose = () => {} 
}) => {
  const { handleLogout } = useAppContext();

  // Si no está abierto, no renderizamos nada (o podrías usar clases para animar)
  if (!isOpen) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Video, label: 'Cámaras', path: '/cameras' },
    { icon: Eye, label: 'Visión Artificial', path: '/computer-vision' },
    { icon: Users, label: 'Usuarios', path: '/users' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop (Fondo oscuro borroso) */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Panel del Menú (Deslizante desde la derecha) */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Encabezado del Menú */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
            <MonitorPlay className="h-6 w-6" />
            <span className="text-lg font-bold text-slate-900">Vision Pro</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de Navegación */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all',
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm' // Activo
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900' // Inactivo
                )
              }
            >
              <item.icon className={clsx("h-5 w-5", ({ isActive }: any) => isActive ? "text-blue-600" : "text-slate-400")} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer con Logout */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileOverlay;