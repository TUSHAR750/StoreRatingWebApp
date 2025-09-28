import React, { useEffect, useState } from 'react';
import API from '../Axios';
import StorePanel from './StorePanel'; // Admin Add Store form
import '../components/StoreList.css';
export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState({ name:'', address:'' });
  const [msg, setMsg] = useState('');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const load = async () => {
    try {
      const res = await API.get('/stores', { params: q });
      setStores(res.data.stores);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || 'Failed to load');
    }
  };
// eslint-disable-next-line
  useEffect(() => { load(); }, []);

  const rate = async (storeId, value) => {
    setMsg('');
    try {
      await API.post(`/ratings/${storeId}/rate`, { value });
      setMsg('Rating saved');
      load();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to rate');
    }
  };

  const search = async e => {
    e.preventDefault();
    await load();
  };

  return (
    <div>
      <h2>Stores</h2>

      {user?.role === 'admin' && <StorePanel />} {/* Admin sees Add Store form */}

      {user?.role !== 'admin' && (
        <>
          <form onSubmit={search}>
            <input placeholder="name" value={q.name} onChange={e=>setQ({...q, name: e.target.value})}/>
            <input placeholder="address" value={q.address} onChange={e=>setQ({...q, address: e.target.value})}/>
            <button>Search</button>
          </form>

          {msg && <div className="info">{msg}</div>}

          <ul className="store-list">
            {stores.map(({ store, average, userRating }) => (
              <li key={store.id} className="store-item">
                <h3>{store.name}</h3>
                <p>{store.address}</p>
                <p>Average: {average ? Number(average).toFixed(2) : 'No ratings'}</p>
                <p>Your rating: {userRating ?? 'Not rated'}</p>

                <div>
                  {[1,2,3,4,5].map(v =>
                    <button key={v} onClick={()=>rate(store.id, v)}>
                      {v}{userRating===v ? ' ✓' : ''}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
