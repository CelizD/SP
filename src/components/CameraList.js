// src/components/CameraList.js
import React, { useState, useEffect } from 'react';
import { cameraService } from '../services/api';

const CameraList = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const response = await cameraService.getAll();
      setCameras(response.data);
    } catch (error) {
      console.error('Error fetching cameras:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading cameras...</div>;

  return (
    <div className="camera-list">
      <h2>Cameras</h2>
      <div className="cameras-grid">
        {cameras.map(camera => (
          <div key={camera.id} className="camera-card">
            <h3>{camera.name}</h3>
            <p>IP: {camera.ip_address}</p>
            <p>Status: {camera.status}</p>
            {camera.stream_url && (
              <img 
                src={cameraService.getStreamUrl(camera.id)} 
                alt={camera.name}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraList;