import React, { useEffect, useState } from 'react';
import API from '../Axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const loadStats = async () => {
    try {
      const res = await API.get('/users/dashboard'); 
      setStats(res.data);
    } catch (err) { 
      console.error(err); 
    }
  };

  const loadUsers = async () => {
    try {
      const res = await API.get('/users'); 
      
      setUsers(res.data); 
    } catch (err) { 
      console.error(err); 
    }
  };

  const loadStores = async () => {
    try {
      const res = await API.get('/stores'); 
      
      setStores(res.data); 
    } catch (err) { 
      console.error(err); 
    }
  };

  useEffect(() => {
    loadStats();
    loadUsers();
    loadStores();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {stats && (
        <div className="stats">
          <div>Total Users: {stats.totalUsers}</div>
          <div>Total Stores: {stats.totalStores}</div>
          <div>Total Ratings: {stats.totalRatings}</div>
        </div>
      )}

      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address || "N/A"}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stores</h3>
      <ul>
        {stores.map(s => (
          <li key={s.id}>
            {s.name} - {s.address || "N/A"} - Avg {s.avgRating || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
