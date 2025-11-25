import React, { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../context/ContextProvider';


function ProfileCard() { 

 
  const {user} = useContext(userContext)
  console.log(user,"User Dta ")

  return (
    <div className='flex flex-row justify-evenly  items-center bg-gradient-to-br from-blue-600 via-pink-400 to-purple-400  flex-wrap w-full'>
    
          <div className="  w-1/4 border-2 m-2  box-border border-r-amber-600 flex flex-col justify-center items-center font-bold rounded-xl wrap" >
            {/* <img src={`https://tse4.mm.bing.net/th/id/OIP.ynaIRkjcy8pDWZ8Y7CSeewHaEo?cb=12&pid=ImgDet&w=474&h=296&rs=1&o=7&rm=3${user.image}`} alt={user.image} className="h-50 w-50 rounded-xl p-2" /> */}
            
          <img src='https://tse4.mm.bing.net/th/id/OIP.ynaIRkjcy8pDWZ8Y7CSeewHaEo?cb=12&pid=ImgDet&w=474&h=296&rs=1&o=7&rm=3' alt={user.image} className="h-50 w-50 rounded-xl p-2" />

            <div className=" border-2  p-2 bg-amber-50 border-amber-700 rounded-xl">{user.name}</div>
            <div className="">{user.email}</div>
            <div className=" w-80  break-words">{user.password}</div>

          </div>
      
    </div>
  )
}

export default ProfileCard;
