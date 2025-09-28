import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000/api' });

API.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
}, err => Promise.reject(err));

export default API;
