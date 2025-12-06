import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Lock, LogIn, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../services/api'; // Importamos el servicio real
import clsx from 'clsx';

interface LoginScreenProps {
  onShowRecovery: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onShowRecovery }) => {
  const { handleLogin, addToast } = useAppContext(); // Usamos addToast para errores
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
      // 1. Llamada REAL al Backend
      const response = await authService.login({ username, password });
      
      // 2. Si hay éxito, el backend nos devuelve datos (ajusta según tu respuesta Django)
      // Por defecto asumimos que si no lanza error, entró bien.
      
      // Obtenemos el rol del usuario (o 'admin' por defecto si el backend no lo manda)
      const role = response.data.role || 'admin'; 
      
      // 3. Guardamos sesión en el Contexto
      handleLogin(role, username);
      
      addToast({
        title: '¡Bienvenido!',
        message: 'Sesión iniciada correctamente',
        type: 'success'
      });

    } catch (err: any) {
      console.error(err);
      setError('Credenciales inválidas o error de conexión');
      addToast({
        title: 'Error de acceso',
        message: 'No se pudo conectar con el servidor',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* ... (El resto de tu diseño visual se mantiene igual) ... */}
      
      <div className="w-full max-w-md p-8 m-4 bg-white border border-slate-200 rounded-2xl shadow-xl relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center">
                  {error}
              </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={clsx(
                "w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white transition-all duration-200",
                loading 
                    ? "bg-slate-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30"
            )}
          >
            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;