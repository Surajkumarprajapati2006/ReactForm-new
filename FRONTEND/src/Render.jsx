import React, { useContext } from "react";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Login from "./components/Login.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import { userContext } from "./context/ContextProvider.jsx";
import Dashboardlayout from "./components/Dashboardlayout";
import AdminDashboard from "./components/AdminDashboard.jsx";
import OwnerDashboard from "./components/OwnerDashboard.jsx";
import AddTurf from "./components/AddTurf.jsx";
import ViewTurf from "./components/ViewTurf.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import AllTurf from "./components/AllTurf.jsx";
import BookingConfirmation from "./components/BookingConfirmation.jsx";
import MyBooking from "./components/MyBooking.jsx";
import Home from "./components/Home.jsx";
import AllUsers from "./components/AllUsers.jsx";

function Render() {
  const { isAuthenticated, user } = useContext(userContext);

  return (
    <div className="mt-20">

    <Routes>
        <Route path='/' element={<Home/>}></Route>
      {!isAuthenticated && (
        <>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {isAuthenticated && user.role === "admin" && (
        <>
          <Route path="/admindashboard" element={<Dashboardlayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='allusers' element={<AllUsers/>}/>
           
          </Route>
          <Route path="*" element={<Navigate to="/admindashboard" />} />
        </>
      )}

      {isAuthenticated && user.role === "owner" && (
        <>
          <Route path="/ownerdashboard" element={<Dashboardlayout />}>
            <Route index element={<OwnerDashboard />} />
             <Route path='addturf' element={<AddTurf/>}/>
             <Route path='viewturf' element={<ViewTurf/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/ownerdashboard" />} />
        </>
      )}

      {isAuthenticated && user.role === "user" && (
        <>
          <Route path="/userdashboard" element={<Dashboardlayout />}>
            <Route index element={<UserDashboard/>} />
            <Route path='viewturf' element={<AllTurf/>}/>
            <Route path='mybooking' element={<MyBooking/>}/>
            <Route path="confirm-booking/:id" element={<BookingConfirmation />} />
          </Route>
          <Route path="*" element={<Navigate to="/userdashboard" />} />
        </>
      )}
    </Routes>
    </div>
  );
}

export default Render;
