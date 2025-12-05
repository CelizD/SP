import { useState } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import LoginScreen from './pages/auth/LoginScreen';
import RecoveryScreen from './pages/auth/RecoveryScreen';
import DashboardView from './pages/dashboard/DashboardView';
import CamerasView from './pages/cameras/CamerasView';
import ComputerVisionView from './pages/computer-vision/ComputerVisionView';
import SettingsView from './pages/settings/SettingsView';
import UsersView from './pages/users/UsersView';
import Sidebar from './components/layout/Sidebar';
import MobileHeader from './components/layout/MobileHeader';
import CameraModal from './components/camera/CameraModal';
import './App.css';

function AppContent() {
  const { userRole, authView, handleLogout, theme } = useAppContext();
  const [currentView, setCurrentView] = useState<'dashboard' | 'cameras' | 'computer-vision' | 'users' | 'settings'>('dashboard');

  if (!userRole) {
    return authView === 'login' ? (
      <LoginScreen onShowRecovery={() => {}} />
    ) : (
      <RecoveryScreen onShowLogin={() => {}} />
    );
  }

  return (
    <div className={`app ${theme}`}>
      <Sidebar 
        onLogout={handleLogout} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      
      <main className="main-content">
        <MobileHeader />
        
        <div className="view-content">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'cameras' && <CamerasView />}
          {currentView === 'computer-vision' && <ComputerVisionView />}
          {currentView === 'users' && userRole === 'admin' && <UsersView />}
          {currentView === 'settings' && <SettingsView />}
        </div>
      </main>

      <CameraModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;