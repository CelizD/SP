import React, { useState } from 'react';

interface SecureCameraProps {
  cameraConfig?: {
    username?: string;
    password?: string;
    type?: string;
  };
  modelType?: string;
}

const SecureCamera: React.FC<SecureCameraProps> = ({ cameraConfig, modelType }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(cameraConfig?.username || '');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="secure-camera">
      {!isAuthenticated ? (
        <div className="auth-form">
          <h3>🔐 Autenticación Requerida</h3>
          <p>Esta cámara requiere credenciales de acceso</p>
          
          <form onSubmit={handleAuthSubmit}>
            <div className="form-group">
              <label>Usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario de la cámara"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de la cámara"
                required
              />
            </div>
            
            <button type="submit">Conectar</button>
          </form>
        </div>
      ) : (
        <div className="camera-stream">
          <div className="stream-header">
            <h3>📹 Stream en vivo</h3>
            <span className="model-badge">
              Modelo: {modelType === 'coco-ssd' ? 'COCO-SSD' : 
                      modelType === 'posenet' ? 'PoseNet' : 
                      modelType === 'facemesh' ? 'FaceMesh' : 'HandPose'}
            </span>
          </div>
          
          <div className="video-container">
            {/* Placeholder para el video */}
            <div className="video-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📹</div>
                <h4>Stream de Cámara IP</h4>
                <p>Conectado a: {cameraConfig?.username}@[IP]</p>
                <p>RTSP: rtsp://{cameraConfig?.username}:••••••••@[IP]/live</p>
                
                {/* Simulación de detecciones */}
                <div className="detection-overlay">
                  <div className="detection-box" style={{ top: '30%', left: '40%' }}>
                    <span className="detection-label">persona</span>
                    <span className="detection-confidence">92%</span>
                  </div>
                  <div className="detection-box" style={{ top: '60%', left: '20%' }}>
                    <span className="detection-label">silla</span>
                    <span className="detection-confidence">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stream-stats">
            <div className="stat">
              <span className="stat-label">FPS:</span>
              <span className="stat-value">30</span>
            </div>
            <div className="stat">
              <span className="stat-label">Detecciones:</span>
              <span className="stat-value">2</span>
            </div>
            <div className="stat">
              <span className="stat-label">Latencia:</span>
              <span className="stat-value">120ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecureCamera;