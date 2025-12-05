import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const MobileHeader: React.FC = () => {
  const { theme, toggleTheme, username } = useAppContext();

  return (
    <header className="mobile-header">
      <div className="mobile-header-content">
        <div className="mobile-menu-toggle">
          <button>☰</button>
        </div>
        
        <div className="mobile-title">
          <h2>Vision Pro</h2>
          <p>Hola, {username}</p>
        </div>
        
        <div className="mobile-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;