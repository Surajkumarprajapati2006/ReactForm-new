
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegistrationForm() {
  const [data, setData] = useState([]);   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({ 
    email: '',
    password: '',
    confirm: '',
    role: 'user' // default
  });

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Checkbox change
  const handleRoleChange = (e) => {
    const { checked } = e.target;
    setForm({
      ...form,
      role: checked ? "owner" : "user"
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError("Password and Confirm Password must match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post('/api/auth/register', form);
      console.log(response)

      // Store response in local state
      setData([...data, response.data.user]);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {loading && <p className="text-blue-500 text-center mb-2">Loading...</p>}

        <input 
          type="email" 
          name="email" 
          placeholder="Enter email" 
          value={form.email} 
          onChange={handleChange} 
          className="w-full p-2 mb-3 border rounded" 
          required
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          value={form.password} 
          onChange={handleChange} 
          className="w-full p-2 mb-3 border rounded" 
          required
        /> 

        <input 
          type="password" 
          name="confirm" 
          placeholder="Confirm Password" 
          value={form.confirm} 
          onChange={handleChange} 
          className="w-full p-2 mb-3 border rounded" 
          required
        />

        <div className="mb-4 flex items-center">
          <input   
            type="checkbox"
            id="isOwner"
            name="isOwner"
            onChange={handleRoleChange}
            checked={form.role === "owner"} 
            className='mr-2'
          />
          <label htmlFor="isOwner" className="text-sm text-gray-700">
            Register as Owner
          </label>
        </div>
       
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account? 
          <Link to="/login" className="text-blue-500 ml-1 hover:underline">Login</Link>
        </p>
      </form>

      {/* Show submitted users */}
      {data.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-md w-80 mb-3">
          <h3 className="text-lg mb-1">Submission {index + 1}</h3>
          <p><span className="font-bold">Email:</span> {item.email}</p>
          <p><span className="font-bold">Role:</span> {item.role}</p>
        </div>
      ))}
    </div>
  );
}





