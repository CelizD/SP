import React, { useState, useEffect } from "react";
import "./ComputerVisionView.css";

const ComputerVisionView = () => {
  const [selectedCamera, setSelectedCamera] = useState("");
  const [activeModel, setActiveModel] = useState("coco-ssd");
  const [isStreaming, setIsStreaming] = useState(false);
  const [detections, setDetections] = useState([]);
  const [fps, setFps] = useState(0);

  // Cámaras de ejemplo
  const cameras = [
    { id: "1", name: "Cámara Principal", status: "online" },
    { id: "2", name: "Cámara Entrada", status: "online" },
    { id: "3", name: "Cámara Laboratorio", status: "offline" },
  ];

  // Modelos disponibles
  const models = [
    { id: "coco-ssd", name: "COCO-SSD", description: "Detección de objetos" },
    { id: "posenet", name: "PoseNet", description: "Detección de posturas" },
    { id: "facemesh", name: "FaceMesh", description: "Reconocimiento facial" },
    { id: "handpose", name: "HandPose", description: "Detección de manos" },
  ];

  // Simular detecciones
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setFps(Math.floor(Math.random() * 10) + 25); // 25-35 FPS
        setDetections([
          { label: "persona", confidence: 0.92, x: 100, y: 150, width: 80, height: 180 },
          { label: "silla", confidence: 0.87, x: 300, y: 200, width: 60, height: 100 },
          { label: "monitor", confidence: 0.78, x: 400, y: 100, width: 120, height: 90 },
        ]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  return (
    <div className="computer-vision-view">
      <div className="cv-header">
        <div>
          <h1>👁️ Computer Vision Pro</h1>
          <p>Análisis en tiempo real con TensorFlow.js</p>
        </div>
      </div>

      <div className="cv-controls">
        <div className="control-group">
          <label>Seleccionar Cámara:</label>
          <select 
            value={selectedCamera} 
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            <option value="">-- Selecciona una cámara --</option>
            {cameras.map(camera => (
              <option key={camera.id} value={camera.id}>
                {camera.name} ({camera.status === "online" ? "✅" : "❌"})
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Modelo de IA:</label>
          <select 
            value={activeModel} 
            onChange={(e) => setActiveModel(e.target.value)}
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} - {model.description}
              </option>
            ))}
          </select>
        </div>

        <button 
          className={`stream-btn ${isStreaming ? "stop" : "start"}`}
          onClick={() => setIsStreaming(!isStreaming)}
          disabled={!selectedCamera}
        >
          {isStreaming ? "⏸️ Detener Stream" : "▶️ Iniciar Stream"}
        </button>
      </div>

      <div className="cv-main">
        <div className="video-container">
          {isStreaming && selectedCamera ? (
            <div className="video-stream">
              <div className="video-placeholder">
                {/* Simulación de video con detecciones */}
                <div className="detection-overlay">
                  {detections.map((det, index) => (
                    <div 
                      key={index}
                      className="detection-box"
                      style={{
                        left: `${det.x}px`,
                        top: `${det.y}px`,
                        width: `${det.width}px`,
                        height: `${det.height}px`
                      }}
                    >
                      <div className="detection-label">
                        {det.label} ({(det.confidence * 100).toFixed(0)}%)
                      </div>
                    </div>
                  ))}
                </div>
                <div className="stream-info">
                  <span>🔴 EN VIVO</span>
                  <span>{fps} FPS</span>
                  <span>{detections.length} detecciones</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="video-placeholder idle">
              <div className="placeholder-icon">📹</div>
              <h3>Selecciona una cámara y haz clic en "Iniciar Stream"</h3>
              <p>El análisis en tiempo real aparecerá aquí</p>
            </div>
          )}
        </div>

        <div className="stats-panel">
          <h3>📊 Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-label">Modelo activo</div>
                <div className="stat-value">
                  {models.find(m => m.id === activeModel)?.name}
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <div className="stat-label">FPS</div>
                <div className="stat-value">{fps}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div className="stat-content">
                <div className="stat-label">Detecciones</div>
                <div className="stat-value">{detections.length}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <div className="stat-label">Latencia</div>
                <div className="stat-value">{isStreaming ? "120ms" : "—"}</div>
              </div>
            </div>
          </div>

          <div className="detections-list">
            <h4>Últimas detecciones:</h4>
            {detections.length > 0 ? (
              <ul>
                {detections.map((det, index) => (
                  <li key={index}>
                    <span className="detection-item-label">{det.label}</span>
                    <span className="detection-item-confidence">
                      {(det.confidence * 100).toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-detections">Esperando detecciones...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionView;
