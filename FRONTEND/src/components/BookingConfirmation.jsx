// import React, { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { userContext } from '../context/ContextProvider';

import { useParams } from "react-router-dom";
import { userContext } from "../context/ContextProvider";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const BookingConfirmation = () => {
  const { user } = useContext(userContext);

  const [turfdata, setTurfdata] = useState({});
  const { id } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getTurfData = async () => {
      try {
        const res = await axios.get(`/api/turf/getturfbyturfid/${id}`);
        // console.log("getTurf", res)
        setTurfdata(res.data.turf);
      } catch (error) {
        console.log("turf error", error);
      }
    };
    getTurfData();
  }, [id]);

  const [formdata, setFormdata] = useState({
    date: "",
    startTime: "",
    endTime: "",
    total: "",
  });

  const calculateTotal = () => {
    const startTime = new Date(`2023-10-01T${formdata.startTime}:00`);
    const endTime = new Date(`2023-10-01T${formdata.endTime}:00`);
    const hours = (endTime - startTime) / 1000 / 60 / 60;
    const total = hours * turfdata.pricePerHour;
    setFormdata({ ...formdata, total });
  };

  useEffect(() => {
    calculateTotal();
  }, [formdata.startTime, formdata.endTime]);

  // console.log("formdata", formdata)

  // console.log("id",id)

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      date: formdata.date,
      startTime: formdata.startTime,
      endTime: formdata.endTime,
      total: formdata.total,
      userId: user._id,
      turfId: id,
      ownerId: turfdata.ownerId,
    };
    try {
      const res = await axios.post(`/api/turf/bookturf/${id}`, bookingData);
      // console.log("bookingData", res)
      toast.success(res.data.message || "Booking successful");
      // setMessage(res.data.message || "Booking successful")    //  checked:
    } catch (error) {
      console.log("bookingData error", error);
      toast.error(error.response.data.message || "Booking failed");
      setMessage(error.response.data.message || "Booking failed");
    }
    console.log("bookingData", bookingData);
    console.log("handleSubmit");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <div className=" min-h-70 flex justify-center ">
        <div className="bg-gray-100 w-1/2">
          <h1 className=" font-bold text-xl text-center mt-5 mr-6">
            Booking Confirmation
          </h1>
          {message && <p>{message}</p>}
          <div className=" flex justify-center mt-5  ">
            <form onSubmit={handleSubmit} action="">
              <div className="hover:bg-gray-200 p-2  rounded">
                <label htmlFor="Date">Date :-</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                />
              </div>
              <div className="hover:bg-gray-200 p-1  rounded">
                <label htmlFor="startTime">Start Time :- </label>

                <input type="time" name="startTime" onChange={handleChange} />
              </div>
              <div className="hover:bg-gray-200 p-1  rounded">
                <label htmlFor="endTime">End Time :- </label>
                <input type="time" name="endTime" onChange={handleChange} />
              </div>

              <div className="hover:bg-gray-200 p-1  rounded ">
                <label htmlFor="total">Total :- </label>
                <input
                  type="text"
                  value={formdata.total}
                  name="total"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500  p-1  rounded hover:bg-blue-600 "
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingConfirmation;
