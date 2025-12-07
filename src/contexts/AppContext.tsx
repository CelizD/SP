import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { cameraService } from '../services/api'; // Importamos el servicio

// --- Tipos ---
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  status?: 'active' | 'inactive';
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
  camera_id?: string; // Para compatibilidad con el backend
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// --- Interfaz del Contexto ---
interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  userRole: string | null;
  username: string | null;
  handleLogin: (role: string, name: string) => void;
  handleLogout: () => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  cameras: Camera[];
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>;
  selectedCamera: Camera | null;
  setSelectedCamera: (camera: Camera | null) => void;
  editingCamera: Camera | null;
  setEditingCamera: (camera: Camera | null) => void;
  editingUser: User | null; 
  setEditingUser: (user: User | null) => void; 
  isCameraModalOpen: boolean;
  setIsCameraModalOpen: (isOpen: boolean) => void;
  deleteCamera: (id: string) => Promise<void>; // <--- NUEVA FUNCIÓN
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Provider ---
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar tema desde localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const [users, setUsers] = useState<User[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // 1. Efecto para aplicar el Tema Oscuro/Claro al HTML
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (role: string, name: string) => {
    setUserRole(role);
    setUsername(name);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', name);
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.clear();
    window.location.href = '/login';
  };

  // 2. Función para Eliminar Cámara
  const deleteCamera = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cámara?")) return;

    try {
        await cameraService.delete(id);
        // Filtrar usando ambos posibles IDs
        setCameras(prev => prev.filter(c => (c.id !== id && c.camera_id !== id)));
        addToast({ title: "Eliminada", message: "Cámara eliminada correctamente", type: "success" });
    } catch (error) {
        console.error(error);
        addToast({ title: "Error", message: "No se pudo eliminar la cámara", type: "error" });
    }
  };

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      userRole, username, handleLogin, handleLogout,
      users, setUsers, editingUser, setEditingUser,
      cameras, setCameras, selectedCamera, setSelectedCamera, editingCamera, setEditingCamera,
      isCameraModalOpen, setIsCameraModalOpen,
      deleteCamera, // Exportamos la función
      toasts, addToast, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext debe usarse dentro de AppProvider');
  return context;
};