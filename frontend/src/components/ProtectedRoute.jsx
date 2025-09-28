import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ roles = [] }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!token) return <Navigate to="/login" />; // not logged in

  if (roles.length && (!user || !roles.includes(user.role))) {
    return <div>Access Denied</div>; // role mismatch
  }

  return <Outlet />; // allowed
}
