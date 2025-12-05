import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos de vistas
export type ViewType = 'dashboard' | 'cameras' | 'computer-vision' | 'users' | 'settings';

// Tipos para la aplicación
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface Camera {
  id: string;
  name: string;
  ip: string;
  port: number;
  username: string;
  password: string;
  rtsp_url: string;
  status: 'online' | 'offline';
  createdAt: string;
}

export interface RoomMetric {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  temperature: number;
  humidity: number;
}

// Tipo del contexto
interface AppContextType {
  // Estados de UI
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Estados de autenticación
  userRole: 'admin' | 'teacher' | 'student' | null;
  username: string | null;
  authView: 'login' | 'recovery';
  setAuthView: (view: 'login' | 'recovery') => void;
  
  // Funciones de autenticación
  handleLogin: (role: 'admin' | 'teacher' | 'student', name: string) => void;
  handleLogout: () => void;
  
  // Estados para modales
  editingRoom: RoomMetric | null;
  setEditingRoom: (room: RoomMetric | null) => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
  
  // Estados de cámaras
  cameras: Camera[];
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>;
  selectedCamera: Camera | null;
  setSelectedCamera: (camera: Camera | null) => void;
  
  // Estados para el modal de cámara
  isCameraModalOpen: boolean;
  setIsCameraModalOpen: (isOpen: boolean) => void;
  
  // Estados del tour
  tourStep: number;
  setTourStep: (step: number) => void;
  handleTourFinish: () => void;
  
  // Estados de métricas
  metrics: RoomMetric[];
  setMetrics: React.Dispatch<React.SetStateAction<RoomMetric[]>>;
  liveMetrics: RoomMetric[];
  setLiveMetrics: React.Dispatch<React.SetStateAction<RoomMetric[]>>;
  
  // Estados de usuarios
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  
  // Estado de aula seleccionada
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estados de UI
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [authView, setAuthView] = useState<'login' | 'recovery'>('login');
  
  // Estados para modales
  const [editingRoom, setEditingRoom] = useState<RoomMetric | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Estados de cámaras
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  
  // Estados del tour
  const [tourStep, setTourStep] = useState<number>(0);
  
  // Estados de métricas
  const [metrics, setMetrics] = useState<RoomMetric[]>([]);
  const [liveMetrics, setLiveMetrics] = useState<RoomMetric[]>([]);
  
  // Estados de usuarios
  const [users, setUsers] = useState<User[]>([]);
  
  // Estado de aula seleccionada
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Función para cambiar tema
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Función de login
  const handleLogin = (role: 'admin' | 'teacher' | 'student', name: string) => {
    setUserRole(role);
    setUsername(name);
    setAuthView('login');
    
    // Guardar en localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', name);
  };

  // Función de logout
  const handleLogout = () => {
    setUserRole(null);
    setUsername(null);
    
    // Limpiar localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  // Función para terminar el tour
  const handleTourFinish = () => {
    setTourStep(0);
    localStorage.setItem('tourCompleted', 'true');
  };

  // Valor del contexto
  const contextValue: AppContextType = {
    // UI
    theme,
    toggleTheme,
    
    // Autenticación
    userRole,
    username,
    authView,
    setAuthView,
    handleLogin,
    handleLogout,
    
    // Modales
    editingRoom,
    setEditingRoom,
    editingUser,
    setEditingUser,
    
    // Cámaras
    cameras,
    setCameras,
    selectedCamera,
    setSelectedCamera,
    isCameraModalOpen,
    setIsCameraModalOpen,
    
    // Tour
    tourStep,
    setTourStep,
    handleTourFinish,
    
    // Métricas
    metrics,
    setMetrics,
    liveMetrics,
    setLiveMetrics,
    
    // Usuarios
    users,
    setUsers,
    
    // Aula seleccionada
    selectedRoom,
    setSelectedRoom
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};