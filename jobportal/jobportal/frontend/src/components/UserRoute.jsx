// UserRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  // This assumes your Redux store contains both token and user (with role)
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Allow only if user role is 'user' or 'customer'
  if (user && (user.role !== 'user' && user.role !== 'customer')) {
    return <Navigate to="/" />;
  }

  return children;
};

export default UserRoute;
