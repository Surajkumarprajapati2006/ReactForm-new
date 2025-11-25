import React from 'react'
import { useContext } from 'react'  
import { userContext } from '../context/ContextProvider'


function AllUsers() {
    const {allUsers} = useContext(userContext)
    console.log("All users",allUsers)
  return (
    <div className=" p-2">
        <h1 className="font-bold text-xl text-center">All users</h1>
        <div>
        <table className="border-2 w-full">
        <thead>
        <tr className="" >
            <th className="w-1/2 bg-gray-300 h-10">Name</th>
            <th className="w-1/2 bg-gray-300 h-10">Email</th>
        </tr>
        </thead>
        <tbody>
        {
            allUsers.map((user)=>{
                return(
                    <tr key = {user._id} className="hover:bg-green-100">
                        <td className="p-2 w-1/2 bg-gray-200  text-center h-10">{user.name}</td>
                        <td className="p-2 w-1/2 bg-gray-200  text-center h-10">{user.email}</td>

                    </tr>
                )
            })
        }
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default AllUsers;
