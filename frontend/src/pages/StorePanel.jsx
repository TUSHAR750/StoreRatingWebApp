import React, { useState } from "react";
import API from "../Axios";
import "../components/Storepanel.css";

const StorePanel = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/stores", form);
      alert("✅ Store created successfully!");
      setForm({ name: "", email: "", address: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create store");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Store</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Store Name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Store Email"
          required
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Store Address"
          required
        />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default StorePanel;
