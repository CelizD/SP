import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Lock, ShieldCheck, Eye, EyeOff, LogIn } from 'lucide-react';
import { authService } from '../../services/api';
import clsx from 'clsx';

interface LoginScreenProps {
  onShowRecovery: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onShowRecovery }) => {
  const { handleLogin, addToast } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Intentamos loguearnos con el Backend
      const response = await authService.login({ username, password });
      
      // 2. Si no hay error, asumimos éxito. 
      // Verificamos si el backend nos mandó el rol, si no, asignamos 'admin' por defecto.
      const serverRole = response.data?.role || 'admin';
      
      // Validamos que el rol sea uno de los permitidos por tu App
      const validRoles = ['admin', 'teacher', 'student'];
      const role = validRoles.includes(serverRole) ? serverRole : 'admin';
      
      // 3. Guardamos la sesión en el contexto global
      handleLogin(role, username);
      
      addToast({
        title: '¡Bienvenido!',
        message: 'Has iniciado sesión correctamente',
        type: 'success'
      });

    } catch (err: any) {
      console.error("Login Error:", err);
      
      // Mensaje de error amigable
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Usuario o contraseña incorrectos');
      } else if (err.code === 'ERR_NETWORK') {
        setError('No se pudo conectar con el servidor (Backend caído)');
      } else {
        setError('Ocurrió un error inesperado al intentar ingresar');
      }

      addToast({
        title: 'Error de acceso',
        message: 'Revisa tus credenciales o la conexión',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      <div className="w-full max-w-md p-8 m-4 bg-white border border-slate-200 rounded-2xl shadow-xl relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-slate-500 text-sm mt-2">Accede al Sistema de Visión Artificial</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Usuario</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="nombre.usuario"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contraseña</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center flex items-center justify-center gap-2">
                  <span className="font-bold">Error:</span> {error}
              </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={clsx(
                "w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white transition-all duration-200",
                loading 
                    ? "bg-slate-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 active:scale-[0.98]"
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Entrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </span>
            )}
          </button>
          
          <div className="text-center mt-4">
             <button
               type="button"
               onClick={onShowRecovery}
               className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
             >
               ¿Olvidaste tu contraseña?
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;