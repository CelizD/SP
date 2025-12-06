import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Lock, LogIn, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface LoginScreenProps {
  onShowRecovery: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onShowRecovery }) => {
  const { handleLogin } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulación de autenticación (Aquí conectarías tu authService real más adelante)
    setTimeout(() => {
      // Validación básica para el ejemplo
      if (!username || !password) {
          setError('Por favor ingresa tus credenciales');
          setLoading(false);
          return;
      }

      let role: 'admin' | 'teacher' | 'student' = 'admin';
      
      // Lógica de roles simulada
      if (username.includes('teacher')) role = 'teacher';
      else if (username.includes('student')) role = 'student';
      
      handleLogin(role, username);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] relative overflow-hidden">
      {/* Efectos de fondo ambiental */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* Tarjeta de Login Glassmorphism */}
      <div className="w-full max-w-md p-8 m-4 bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <ShieldCheck className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-zinc-400 text-sm mt-2">Accede al Sistema de Visión Artificial</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Usuario */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider ml-1">Usuario</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="nombre.usuario"
                required
              />
            </div>
          </div>
          
          {/* Input Contraseña */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Contraseña</label>
                <button 
                  type="button" 
                  onClick={onShowRecovery}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mensaje de Error */}
          {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 text-center animate-pulse">
                  {error}
              </div>
          )}
          
          {/* Botón Submit */}
          <button
            type="submit"
            disabled={loading}
            className={clsx(
                "w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white transition-all duration-200",
                loading 
                    ? "bg-zinc-800 cursor-not-allowed opacity-70" 
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] shadow-lg"
            )}
          >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Autenticando...
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    Iniciar Sesión <LogIn className="h-4 w-4" />
                </span>
            )}
          </button>
        </form>
        
        {/* Credenciales Demo (Discretas) */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-center text-zinc-500 mb-3">ACCESO DE DESARROLLO</p>
          <div className="flex justify-center gap-4 text-xs font-mono text-zinc-600">
            <span className="hover:text-zinc-400 cursor-pointer" onClick={() => {setUsername('admin'); setPassword('admin123')}}>admin</span>
            <span className="text-zinc-700">|</span>
            <span className="hover:text-zinc-400 cursor-pointer" onClick={() => {setUsername('teacher'); setPassword('teacher123')}}>teacher</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;