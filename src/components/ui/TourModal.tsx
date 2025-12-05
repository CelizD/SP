import React from 'react';

interface TourModalProps {
  step: number;
  setStep: (step: number) => void;
  onFinish: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ step, setStep, onFinish }) => {
  if (step === 0) return null;

  const steps = [
    { title: 'Bienvenido', content: 'Te guiaremos por las funciones principales.' },
    { title: 'Dashboard', content: 'Aquí verás las métricas principales.' },
    { title: 'Cámaras', content: 'Gestiona todas tus cámaras IP.' },
    { title: 'Computer Vision', content: 'Análisis en tiempo real con IA.' },
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="tour-modal-overlay">
      <div className="tour-modal">
        <h3>{currentStep.title}</h3>
        <p>{currentStep.content}</p>
        <div className="tour-actions">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)}>Anterior</button>
          )}
          {step < steps.length ? (
            <button onClick={() => setStep(step + 1)}>Siguiente</button>
          ) : (
            <button onClick={onFinish}>Finalizar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourModal;