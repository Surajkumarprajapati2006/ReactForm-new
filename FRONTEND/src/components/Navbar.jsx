import { Link } from "react-router-dom";
import React, { useContext } from 'react'
import { userContext } from "../context/ContextProvider";


function Navbar() {
  const {isAuthenticated, logout, user} = useContext(userContext)
  
  return (
    <nav className="bg-purple-800 p-4 text-white fixed w-full top-0 left-0 shadow z-50">
        <div className="flex justify-between items-center">
      <div className="font-bold text-2xl">TurfZone</div>
      <div className="space-x-4">

          <Link to="/" className="hover:underline">Home</Link>

        {
          isAuthenticated &&(
            <>

            {/* <Link to="/addBook" className="hover:underline">addBook</Link> */}
             {/* <Link to="/ProfileCard" className="hover:underline">ProfileCard</Link> */}
             {/* <Link to="/AllUsers" className="hover:underline">AllUsers</Link> */}
            
            
            </>
          )
        }

         
      { user && user.role === "admin" && (
        <Link to="/adminDashboard" className="hover:underline">adminDashboard</Link>
      ) }


      {user && user.role === "user" && (
        <Link to="/userDashboard" className="hover:underline">userDashboard</Link>
      )}
      
      {user && user.role === "owner" && (
        <>
        <Link to="/ownerDashboard" className="hover:underline">ownerrDashboard</Link>
        </>
      )}


        {
          !isAuthenticated &&(
            <>
            <Link to="/login" className="hover:underline">Login</Link> 
            <Link to="/register" className="hover:underline">Register</Link> 
            </>
          )
        }

        {
          isAuthenticated &&(
            <>
            <Link to ="/login" onClick ={() =>logout()} className="hover:underline">Logout</Link>
            </>
          )
        }
      </div>

       {/* <div className="md:hidden">
            <button className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div> */}
          
    </div>
    </nav>
      
  )
}

export default Navbar;

