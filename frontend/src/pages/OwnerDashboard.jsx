import React, { useEffect, useState } from 'react';
import API from '../Axios';

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      const res = await API.get('/stores');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const ownerStores = res.data.stores.filter(s => s.store.ownerId === user.id);
      setStores(ownerStores);
    } catch (err) {
      console.error(err);
      setMsg('Failed to load stores');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Owner Dashboard</h2>
      {msg && <div>{msg}</div>}
      <ul>
        {stores.map(({ store, average }) => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>Avg Rating: {average ? Number(average).toFixed(2) : 'No ratings'}</p>
            <a href={`/stores/${store.id}/ratings`}>See raters</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
