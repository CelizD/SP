import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface LoginScreenProps {
  onShowRecovery: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onShowRecovery }) => {
  const { handleLogin } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      let role: 'admin' | 'teacher' | 'student' = 'admin';
      
      if (username.includes('teacher')) role = 'teacher';
      else if (username.includes('student')) role = 'student';
      
      handleLogin(role, username);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👁️ Computer Vision</h1>
          <p className="text-gray-600 mt-2">Sistema de monitoreo con IA</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          
          <button
            type="button"
            onClick={onShowRecovery}
            className="w-full mt-3 text-blue-500 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Credenciales de prueba:</strong>
          </p>
          <p className="text-sm text-gray-600 mt-1">admin / admin123</p>
          <p className="text-sm text-gray-600">teacher / teacher123</p>
          <p className="text-sm text-gray-600">student / student123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;