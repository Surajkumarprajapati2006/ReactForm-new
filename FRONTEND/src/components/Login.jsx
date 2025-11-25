import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userContext } from '../context/ContextProvider';

export default function Login() {
const {setUser,setToken,setIsAuthenticated,user} = useContext(userContext)


  console.log(user)
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!login.email && !login.password) {
      alert('Please enter email and Password'); 
      return
    } 

    try {
      const res = await axios.post('/api/auth/login',login)
      // console.log(JSON.stringify(res.data.user))
      if(res.status == 200){
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('user',JSON.stringify(res.data.user))
        setUser(res.data.user)
        setToken(res.data.token)
        setIsAuthenticated(true)
      }
    } catch (error) {
      
    }
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={login.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={login.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
