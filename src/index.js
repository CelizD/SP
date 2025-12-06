// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import CameraList from './components/CameraList';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <Login /> : <Navigate to="/" />
          } />
          <Route path="/" element={
            <PrivateRoute>
              <CameraList />
            </PrivateRoute>
          } />
          <Route path="/cameras" element={
            <PrivateRoute>
              <CameraList />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;