import React, { } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useAppContext();

  // Iconos y estilos según el tipo de notificación
  const getToastStyles = (type: 'success' | 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          borderClass: 'border-emerald-200',
          bgClass: 'bg-white',
          titleClass: 'text-slate-900'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          borderClass: 'border-red-200',
          bgClass: 'bg-white',
          titleClass: 'text-slate-900'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          borderClass: 'border-amber-200',
          bgClass: 'bg-white',
          titleClass: 'text-slate-900'
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-600" />,
          borderClass: 'border-blue-200',
          bgClass: 'bg-white',
          titleClass: 'text-slate-900'
        };
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const style = getToastStyles(toast.type);
        
        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-start gap-3 p-4 
              rounded-xl border shadow-lg 
              transform transition-all duration-300 ease-out
              animate-in slide-in-from-right-full fade-in
              ${style.bgClass} ${style.borderClass}
            `}
            role="alert"
          >
            <div className="flex-shrink-0 mt-0.5">
              {style.icon}
            </div>
            
            <div className="flex-1 w-0">
              <h4 className={`text-sm font-semibold ${style.titleClass}`}>
                {toast.title}
              </h4>
              {toast.message && (
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 -mr-2 -mt-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;