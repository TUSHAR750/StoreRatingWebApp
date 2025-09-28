import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <nav>
        {token && <Link to="/stores">Stores</Link>}

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}

        {token && user?.role === 'admin' && (
          <>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/admin/create-store">Create Store</Link>
          </>
        )}

        {token && user?.role === 'storeowner' && <Link to="/owner">Owner Dashboard</Link>}

        {token && <button onClick={logout} className="link-btn">Logout</button>}
      </nav>
    </header>
  );
}
