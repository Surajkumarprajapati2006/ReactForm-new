import React, { useContext } from 'react'
import { userContext } from '../context/ContextProvider'
import axios from 'axios'

function ViewTurf() {
    const { ownerTurf = [], setownerTurf } = useContext(userContext)

    const deleteTurf = async (id) => {
        if(!id) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
        if(!confirmDelete){
            return;
        }

        const previous = [...ownerTurf]
        const updated = ownerTurf.filter((t) => t._id !== id)
        setownerTurf(updated)

        try {
           await axios.delete(`/api/turf/deleteturf/${id}`)

           alert("turf updated successfuly!")
            
        } catch (err) {
            console.error('Failed to delete turf', err?.response || err)
            // revert on failure
            setownerTurf(previous)
            alert('Failed to delete turf. Please try again.')
        }
    };

    const editTurf = async (id) =>{
        if(!id) return;

        const newprice = prompt("enter something new:");
        if(!newprice) return;

        try{
              await axios.put(`/api/turf/editturf/${id}`,{pricePerHour: newprice})

             const updated = ownerTurf.map((turf) =>
            turf._id === id ? { ... turf, pricePerHour: newprice}: turf
           )
           setownerTurf(updated)
           alert("Turf updated successfuly!")

        }catch(err) {
            console.error('failed to update turf', err)
            alert("updated failed")

        }

    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">My Turfs</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ownerTurf && ownerTurf.length > 0 ? (
                    ownerTurf.map((turf) => (
                        <div key={turf._id} className="border border-blue-200 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <h2 className="text-lg font-medium">{turf.name}</h2>
                            <p className="text-sm text-gray-600">{turf?.Address?.fullAddress || turf?.Address?.city || 'Address not provided'}</p>
                            <p className="mt-2">Price: {turf.pricePerHour || 'N/A'}</p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded"
                                    onClick={() => editTurf(turf._id)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                                    onClick={() => deleteTurf(turf._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No turfs to display.</p>
                )}
            </div>
        </div>
    )
}

export default ViewTurf;



