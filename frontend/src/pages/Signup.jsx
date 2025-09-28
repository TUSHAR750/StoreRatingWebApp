import React, { useState, useEffect } from 'react';
import API from '../Axios';
import { useNavigate } from 'react-router-dom';
import '../components/Form.css';
export default function Signup() {
  const [form, setForm] = useState({ name:'', email:'', address:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'storeowner') navigate('/owner');
      else navigate('/stores');
    }
  }, [navigate]);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

     
      if (res.data.user.role === 'admin') navigate('/admin');
      else if (res.data.user.role === 'storeowner') navigate('/owner');
      else navigate('/stores');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Name (20-60 chars)" value={form.name} onChange={handle} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handle} required />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handle} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} required />
        <button type="submit">Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
