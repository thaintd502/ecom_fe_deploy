// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? (
    children
  ) : (
    <Navigate to="/admin/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;