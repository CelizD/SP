import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// ==========================================
// 1. Definición de Tipos
// ==========================================

export type ViewType = 'dashboard' | 'cameras' | 'computer-vision' | 'users' | 'settings';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  status?: 'active' | 'inactive'; // Necesario para UsersView
  lastLogin?: string;
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

// Interfaz para las notificaciones (Toasts)
export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// ==========================================
// 2. Interfaz del Contexto
// ==========================================

interface AppContextType {
  // UI & Tema
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Autenticación
  userRole: 'admin' | 'teacher' | 'student' | null;
  username: string | null;
  authView: 'login' | 'recovery';
  setAuthView: (view: 'login' | 'recovery') => void;
  handleLogin: (role: 'admin' | 'teacher' | 'student', name: string) => void;
  handleLogout: () => void;
  
  // Gestión de Usuarios
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
  
  // Gestión de Cámaras
  cameras: Camera[];
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>;
  selectedCamera: Camera | null; // Para Computer Vision
  setSelectedCamera: (camera: Camera | null) => void;
  editingCamera: Camera | null; // Para el Modal de Edición
  setEditingCamera: (camera: Camera | null) => void;
  isCameraModalOpen: boolean;
  setIsCameraModalOpen: (isOpen: boolean) => void;
  
  // Métricas y Dashboard
  metrics: RoomMetric[];
  setMetrics: React.Dispatch<React.SetStateAction<RoomMetric[]>>;
  liveMetrics: RoomMetric[]; // Compatibilidad
  setLiveMetrics: React.Dispatch<React.SetStateAction<RoomMetric[]>>; // Compatibilidad
  
  // Tour (Compatibilidad)
  tourStep: number;
  setTourStep: (step: number) => void;
  handleTourFinish: () => void;

  // Estado de aula seleccionada (Compatibilidad)
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  
  // Modales adicionales (Compatibilidad)
  editingRoom: RoomMetric | null;
  setEditingRoom: (room: RoomMetric | null) => void;

  // Sistema de Notificaciones (Toasts)
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// ==========================================
// 3. Proveedor (Provider)
// ==========================================

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Estados Generales ---
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // --- Autenticación ---
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [authView, setAuthView] = useState<'login' | 'recovery'>('login');
  
  // --- Datos ---
  const [users, setUsers] = useState<User[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [metrics, setMetrics] = useState<RoomMetric[]>([]);
  const [liveMetrics, setLiveMetrics] = useState<RoomMetric[]>([]); // Compatibilidad
  
  // --- Estados de Selección y Modales ---
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRoom, setEditingRoom] = useState<RoomMetric | null>(null); // Compatibilidad
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null); // Compatibilidad

  // --- Tour (Compatibilidad) ---
  const [tourStep, setTourStep] = useState<number>(0);

  // --- Sistema de Notificaciones ---
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Funciones Auxiliares
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (role: 'admin' | 'teacher' | 'student', name: string) => {
    setUserRole(role);
    setUsername(name);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', name);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  const handleTourFinish = () => {
    setTourStep(0);
    localStorage.setItem('tourCompleted', 'true');
  };

  // Función para agregar notificaciones
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto eliminar después de 3 segundos
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Valor del contexto
  const contextValue: AppContextType = {
    theme,
    toggleTheme,
    
    userRole,
    username,
    authView,
    setAuthView,
    handleLogin,
    handleLogout,
    
    users,
    setUsers,
    editingUser,
    setEditingUser,
    
    cameras,
    setCameras,
    selectedCamera,
    setSelectedCamera,
    editingCamera,
    setEditingCamera,
    isCameraModalOpen,
    setIsCameraModalOpen,
    
    metrics,
    setMetrics,
    liveMetrics,
    setLiveMetrics,
    
    tourStep,
    setTourStep,
    handleTourFinish,

    selectedRoom,
    setSelectedRoom,
    editingRoom,
    setEditingRoom,
    
    toasts,
    addToast,
    removeToast
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// ==========================================
// 4. Hook Personalizado
// ==========================================

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};