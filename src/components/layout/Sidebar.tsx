import React from 'react';
import { useAppContext, ViewType } from '../../contexts/AppContext';

interface SidebarProps {
  onLogout: () => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, currentView, setCurrentView }) => {
  const { theme, userRole, username } = useAppContext();

  // Definir las vistas disponibles por rol
  const getMenuItems = () => {
    const items = [
      { id: 'dashboard' as ViewType, label: 'Dashboard', icon: '📊', roles: ['admin', 'teacher', 'student'] },
      { id: 'cameras' as ViewType, label: 'Cámaras', icon: '📹', roles: ['admin', 'teacher'] },
      { id: 'computer-vision' as ViewType, label: 'Computer Vision', icon: '👁️', roles: ['admin', 'teacher'] },
      { id: 'settings' as ViewType, label: 'Configuración', icon: '⚙️', roles: ['admin', 'teacher', 'student'] },
    ];
    
    // Solo admin ve usuarios
    if (userRole === 'admin') {
      items.splice(3, 0, { id: 'users' as ViewType, label: 'Usuarios', icon: '👥', roles: ['admin'] });
    }
    
    return items.filter(item => item.roles.includes(userRole || ''));
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`sidebar ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">👁️</span>
          <h2>Vision Pro</h2>
        </div>
        <p className="tagline">Sistema de monitoreo</p>
      </div>

      <div className="user-info">
        <div className="avatar">
          {userRole === 'admin' ? '👨‍💼' : userRole === 'teacher' ? '👩‍🏫' : '👨‍🎓'}
        </div>
        <div>
          <p className="username">{username}</p>
          <p className="role">{userRole}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <span>🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;