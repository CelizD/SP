import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Menu, Sun, Moon, MonitorPlay, Bell } from 'lucide-react';
import MobileOverlay from './MobileOverlay';

const MobileHeader: React.FC = () => {
  const { theme, toggleTheme, username } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-40 px-4 h-16 flex items-center justify-between shadow-sm">
        
        {/* Izquierda: Menú y Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 text-blue-600">
            <MonitorPlay className="w-5 h-5" />
            <span className="font-bold text-slate-900 text-lg">Vision Pro</span>
          </div>
        </div>

        {/* Derecha: Acciones */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="ml-2 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 font-bold text-xs">
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Menú Desplegable */}
      <MobileOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};

export default MobileHeader;