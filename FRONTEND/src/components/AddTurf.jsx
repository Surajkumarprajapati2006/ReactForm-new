import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../context/ContextProvider";

export default function AddTurf() {

 

  const {user} = useContext(userContext)
  console.log(user)
  const [form, setForm] = useState({
    name: "",
    pricePerHour: "",
    city: "",
    state: "",
    zipCode: "",
    fullAddress: "",
    
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...form,
        ownerId : user._id
        
      }
      const response = await axios.post("/api/turf/addturf", formData);
      setMessage("Turf added successfully!",response);
      setForm({
        name: "",
        pricePerHour: "",
        city: "",
        state: "",
        zipCode: "",
        fullAddress: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Error adding turf.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-xl rounded-md  ">
      <h2 className="text-xl font-bold mb-4">Add Turf</h2>
      {message && <p className="mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Turf Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pricePerHour"
          placeholder="Price per Hour"
          value={form.pricePerHour}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          list="citySuggestions"
          required
        />
        <datalist id="citySuggestions">
          <option value="Mumbai" />
          <option value="Delhi" />
          <option value="Bangalore" />
          <option value="Kolkata" />
        </datalist>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={form.zipCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullAddress"
          placeholder="Full Address"
          value={form.fullAddress}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Turf
        </button>
      </form>
    </div>
  );
}
