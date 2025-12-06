import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext';

// Importación de Vistas
import LoginScreen from './pages/auth/LoginScreen';
import RecoveryScreen from './pages/auth/RecoveryScreen';
import DashboardView from './pages/dashboard/DashboardView';
import CamerasView from './pages/cameras/CamerasView';
import ComputerVisionView from './pages/computer-vision/ComputerVisionView';
import UsersView from './pages/users/UsersView';
import SettingsView from './pages/settings/SettingsView';

// Importación de Componentes de Layout
import Sidebar from './components/layout/Sidebar';
import MobileHeader from './components/layout/MobileHeader';
import CameraModal from './components/camera/CameraModal';
import Toast from './components/ui/Toast';

// Componente que maneja el diseño cuando el usuario ha iniciado sesión
function ProtectedLayout() {
  const { userRole, handleLogout } = useAppContext();

  // Si no hay rol (no logueado), mandar al login
  if (!userRole) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Notificaciones Globales */}
      <Toast />

      {/* Sidebar Desktop */}
      <div className="hidden md:block md:w-64 flex-shrink-0 relative z-30">
        <Sidebar onLogout={handleLogout} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Móvil */}
        <MobileHeader />
        
        {/* Área Principal de Contenido */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/cameras" element={<CamerasView />} />
            <Route path="/computer-vision" element={<ComputerVisionView />} />
            <Route path="/settings" element={<SettingsView />} />
            
            {/* Ruta restringida para Admin */}
            {userRole === 'admin' && (
              <Route path="/users" element={<UsersView />} />
            )}
            
            {/* Cualquier otra ruta redirige al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      
      {/* Modales Globales */}
      <CameraModal />
    </div>
  );
}

// Manejo de rutas públicas (Login/Recovery)
function AppContent() {
  const { userRole } = useAppContext();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!userRole ? <LoginScreen onShowRecovery={() => {}} /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/recovery" 
        element={!userRole ? <RecoveryScreen onShowLogin={() => {}} /> : <Navigate to="/" replace />} 
      />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;