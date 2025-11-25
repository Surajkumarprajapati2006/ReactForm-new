import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Children } from 'react';
import { createContext } from "react";
import {useState} from 'react'
import RegistrationForm from '../components/RegistrationForm';
import ViewTurf from '../components/ViewTurf';



export const userContext = createContext();



function ContextProvider({children}) {

    const [email, setEmail] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem(''));
    const [user, setUser] = useState([])
    const [ownerTurf, setownerTurf] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allTurfs, setAllTurfs] = useState([])
    const [myBookings, setMYBookings] = useState([])
    
  
    
    // console.log(ViewTurf)
    // console.log(allUsers)
    const [loading, setLoading] = useState(false)
    // console.log("users", user);


    const logout = () =>{
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setToken(null);
      setUser([]);
    }

     


    useEffect(() =>{
      if (!user || !user._id) return;

      const getOwnerTurfs = async() =>{
        try {
          const res = await axios.get(`/api/turf/getturfbyid/${user._id}`);
          // console.log("getTurf", res);
          setownerTurf(res.data.turfs) 
        } catch (err) {
          console.error('Error fetching owner turfs', err?.response || err);
        }
      }

      getOwnerTurfs()
    },[isAuthenticated])


    useEffect(() =>{
      const getAllUsers = async() =>{
        try {
          const res = await axios.get("/api/user/allusers")
          // console.log("all users", res)
          setAllUsers(res.data.users)
          return res.data

        } catch (error) {
          console.log("user error", error)
          throw error
          
        }
      }
      getAllUsers()
    }, [])



     useEffect(()=>{
      const getMYBookings = async() =>{
        try {
          if(!user?._id){
            return;
          }
          const res = await axios.get(`/api/booking/getmybooking/${user._id}`)
          setMYBookings(res.data.myBooking)
          return res.data

        } catch (error) {
          console.log("user error", error)
          throw error
          
        }
      }
      getMYBookings()
    }, [user._id])
    

     
useEffect(() =>{
    
  const token = localStorage.getItem("token");

  const user = localStorage.getItem("user");
//  console.log(user,token)
  if(token && user){
    setUser(JSON.parse(user));
    setToken(token);
    setIsAuthenticated(true);
  }
  else{
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    setUser('')
    setToken('')

    setIsAuthenticated(false); 
  }

},[]);



  return (
    <userContext.Provider
      value={{
        setAllUsers,
        allUsers,
        ownerTurf,
        setownerTurf,
        loading,
        setLoading,
        setIsAuthenticated,
        setToken,
        setUser,
        email,
        setEmail,
        user,
        isAuthenticated,
        logout,
        allTurfs, 
        setAllTurfs,
        myBookings,
        setMYBookings
      }}>

      {children}

    </userContext.Provider>
  )
}

export default ContextProvider;


