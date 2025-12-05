import React from 'react';
import { Camera } from '../../contexts/AppContext';

interface CameraCardProps {
  camera: Camera;
  onEdit: (camera: Camera) => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onEdit }) => {
  return (
    <div className="camera-card">
      <div className="camera-header">
        <h3>{camera.name}</h3>
        <span className={`status ${camera.status}`}>
          {camera.status === 'online' ? '✅' : '❌'}
        </span>
      </div>
      
      <div className="camera-info">
        <p><strong>IP:</strong> {camera.ip}:{camera.port}</p>
        <p><strong>RTSP:</strong> {camera.rtsp_url}</p>
        <p><strong>Agregada:</strong> {new Date(camera.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="camera-actions">
        <button onClick={() => onEdit(camera)} className="edit-btn">
          Editar
        </button>
        <button className="view-btn">
          Ver Stream
        </button>
      </div>
    </div>
  );
};

export default CameraCard;