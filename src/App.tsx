import React, { useState } from "react";
import "./App.css";

// Tipos de vistas
type ViewType = "dashboard" | "cameras" | "computer-vision";

const App = () => {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("Usuario Demo");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>👁️ Computer Vision Pro</h1>
          <p>Sistema de monitoreo con autenticación de cámaras</p>
          
          <div className="input-group">
            <label>Usuario</label>
            <input type="text" placeholder="admin" defaultValue="admin" />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" defaultValue="admin123" />
          </div>
          
          <button onClick={handleLogin} className="login-btn">
            Iniciar Sesión
          </button>
          
          <div className="demo-info">
            <p><strong>Credenciales de prueba:</strong></p>
            <p>Usuario: <code>admin</code></p>
            <p>Contraseña: <code>admin123</code></p>
          </div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="dashboard-view">
            <h1>📊 Dashboard</h1>
            <p>Bienvenido, {username}!</p>
            <div className="dashboard-grid">
              <div className="metric-card">
                <h3>Cámaras Activas</h3>
                <div className="metric-value">8</div>
              </div>
              <div className="metric-card">
                <h3>Detecciones Hoy</h3>
                <div className="metric-value">1,234</div>
              </div>
            </div>
          </div>
        );
      case "cameras":
        return (
          <div className="cameras-view">
            <h1>📹 Gestión de Cámaras</h1>
            <p>Administra tus cámaras IP</p>
            <div className="camera-card">
              <h3>Cámara Principal</h3>
              <p>IP: 192.168.1.100</p>
              <p>Estado: <span className="status online">Online</span></p>
            </div>
          </div>
        );
      case "computer-vision":
        return (
          <div className="computer-vision-view">
            <h1>👁️ Computer Vision</h1>
            <p>Análisis en tiempo real</p>
            <div className="video-placeholder">
              <p>Stream de cámara con detección de objetos</p>
            </div>
          </div>
        );
      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>👁️ Vision Pro</h2>
          <p>Sistema de cámaras</p>
        </div>
        
        <div className="user-info">
          <div className="avatar">{username.charAt(0)}</div>
          <div>
            <p className="username">{username}</p>
            <p className="role">Administrador</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentView === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentView("dashboard")}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${currentView === "cameras" ? "active" : ""}`}
            onClick={() => setCurrentView("cameras")}
          >
            📹 Cámaras
          </button>
          <button 
            className={`nav-item ${currentView === "computer-vision" ? "active" : ""}`}
            onClick={() => setCurrentView("computer-vision")}
          >
            👁️ Computer Vision
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <main className="main-content">
        <div className="view-content">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
