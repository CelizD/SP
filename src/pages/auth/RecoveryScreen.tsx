import React from 'react';

interface RecoveryScreenProps {
  onShowLogin: () => void;
}

const RecoveryScreen: React.FC<RecoveryScreenProps> = ({ onShowLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recuperar Contraseña</h2>
        <p className="text-gray-600 mb-6">
          Ingresa tu email y te enviaremos un enlace para recuperar tu contraseña.
        </p>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
          />
        </div>
        
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Enviar enlace de recuperación
        </button>
        
        <button
          onClick={onShowLogin}
          className="w-full mt-3 text-blue-500 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
};

export default RecoveryScreen;