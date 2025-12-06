import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

interface RecoveryScreenProps {
  onShowLogin: () => void;
}

const RecoveryScreen: React.FC<RecoveryScreenProps> = ({ onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simular envío
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        
        {/* Encabezado con Icono */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">¿Olvidaste tu contraseña?</h2>
          <p className="text-slate-500 mt-2 text-sm">
            No te preocupes, te enviaremos las instrucciones de recuperación.
          </p>
        </div>

        {isSubmitted ? (
          /* Estado de Éxito */
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center gap-2 mb-6 border border-green-100">
              <CheckCircle2 className="w-8 h-8" />
              <span className="font-medium">¡Correo enviado!</span>
              <p className="text-xs text-green-600">
                Revisa tu bandeja de entrada en <strong>{email}</strong>
              </p>
            </div>
            <button
              onClick={onShowLogin}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </button>
          </div>
        ) : (
          /* Formulario */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Correo electrónico corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="nombre@empresa.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={onShowLogin}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Volver al inicio de sesión
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoveryScreen;