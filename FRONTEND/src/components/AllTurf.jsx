import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function AllTurf() {
  const [allTurfs, setAllTurfs] = useState([]);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getAllTurfs = async () => {
      try {
        const res = await axios.get("/api/turf/allturfs");
        console.log("get all turf", res);
        setAllTurfs(res.data.turfs || []);
      } catch (error) {
        console.log("turfs error", error);
      }
    };
    getAllTurfs();
  }, []);

  const handleBookTurf = (turfdata) => {
    console.log("Selected Turf:", turfdata);
    navigate(`/userdashboard/confirm-booking/${turfdata._id}`);

  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Available Turfs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTurfs && allTurfs.length > 0 ? (
          allTurfs.map((turf) => (
            <div key={turf._id} className="border rounded p-4 shadow-sm">
              <h2 className="text-lg font-medium">{turf.name}</h2>
              <p className="text-sm text-gray-600">
                {turf?.Address?.fullAddress ||
                  turf?.Address?.city ||
                  "Address not provided"}
              </p>
              <p className="mt-2">Price: ₹{turf.pricePerHour || "N/A"}</p>

              <div className="mt-4 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleBookTurf(turf)}
                >
                  Book Turf
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No turfs to display.</p>
        )}
      </div>
    </div>
  );
}

export default AllTurf;
