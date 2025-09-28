import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StoreList from './pages/StoreList';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/stores" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Stores accessible to all logged-in users */}
          <Route path="/stores" element={<StoreList />} />

          {/* Admin dashboard (optional) */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Store owner dashboard (optional) */}
          <Route element={<ProtectedRoute roles={['storeowner']} />}>
            <Route path="/owner" element={<OwnerDashboard />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}
