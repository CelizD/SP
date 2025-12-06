import React from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  LayoutDashboard, 
  Video, 
  Eye, 
  Sparkles, 
  Check 
} from 'lucide-react';

interface TourModalProps {
  step: number;
  setStep: (step: number) => void;
  onFinish: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ step, setStep, onFinish }) => {
  // Si el paso es 0, no mostramos nada
  if (step === 0) return null;

  const steps = [
    { 
      title: 'Bienvenido a Vision Pro', 
      content: 'Descubre el poder de la vigilancia inteligente. Te guiaremos brevemente por las funciones principales de tu nuevo sistema.',
      icon: <Sparkles className="w-12 h-12 text-amber-500" />,
      color: 'bg-amber-50'
    },
    { 
      title: 'Panel de Control', 
      content: 'Aquí encontrarás un resumen en tiempo real del estado de tus cámaras, métricas de ocupación y alertas recientes.',
      icon: <LayoutDashboard className="w-12 h-12 text-blue-600" />,
      color: 'bg-blue-50'
    },
    { 
      title: 'Gestión de Cámaras', 
      content: 'Administra tus dispositivos, verifica su estado de conexión y accede a la transmisión en vivo de cada una.',
      icon: <Video className="w-12 h-12 text-purple-600" />,
      color: 'bg-purple-50'
    },
    { 
      title: 'Visión Artificial', 
      content: 'Utiliza nuestros modelos de IA para detectar objetos, rostros y movimiento en tiempo real con alta precisión.',
      icon: <Eye className="w-12 h-12 text-emerald-600" />,
      color: 'bg-emerald-50'
    },
  ];

  const currentStepData = steps[step - 1];
  const isLastStep = step === steps.length;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop con desenfoque */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />

      {/* Tarjeta del Tour */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Botón Cerrar (Saltar) */}
        <button 
          onClick={onFinish}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
          title="Saltar tutorial"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contenido Visual */}
        <div className={`h-40 flex items-center justify-center ${currentStepData.color} transition-colors duration-500`}>
          <div className="transform transition-transform duration-500 hover:scale-110">
            {currentStepData.icon}
          </div>
        </div>

        {/* Contenido de Texto */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            {currentStepData.title}
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm mb-8">
            {currentStepData.content}
          </p>

          {/* Indicadores de Progreso (Dots) */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index + 1 === step 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Controles de Navegación */}
          <div className="flex justify-between items-center gap-4">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
            ) : (
              <div className="w-24"></div> /* Espaciador para mantener el layout */
            )}

            <button 
              onClick={() => isLastStep ? onFinish() : setStep(step + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all transform active:scale-95 flex items-center gap-2"
            >
              {isLastStep ? (
                <>Comenzar <Check className="w-4 h-4" /></>
              ) : (
                <>Siguiente <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourModal;