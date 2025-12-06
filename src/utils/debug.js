// src/utils/debug.js
export const testBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Backend response:', data);
      return true;
    } else {
      console.error('Backend responded with:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Cannot connect to backend:', error);
    return false;
  }
};

// Para usar en desarrollo
if (process.env.NODE_ENV === 'development') {
  testBackendConnection();
}