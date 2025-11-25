import turfModel from "../models/turfModel.js";
import Booking from "../models/bookingModel.js";

export const addTurf = async (req, res) => {
  try {
    const { name, pricePerHour, ownerId, city, state, zipCode, fullAddress } = req.body;
    console.log("Turf data:", req.body);
    const newTurf = await turfModel.create({
      name,
      pricePerHour,
      Address: {
        city,
        state,
        zipCode,
        fullAddress,
      },
      ownerId,
    });

    console.log("New Turf Created:", newTurf);
    res.status(201).json({
      message: "Turf added successfully",
      newTurf,
    });
  } catch (error) {
    console.error('Error in addTurf', error);
    return res.status(500).json({
      message: "Internal server error while adding turf",
    });
  }
};

export const getAllTurfs = async (req, res) => {
  try {
    const turfs = await turfModel.find();
    // console.log("All Turfs:", turfs);
    res.status(200).json({
      message: "All turfs found",
      turfs,
    });
  } catch (error) {
    console.error('Error in getAllTurfs', error);
    return res.status(500).json({
      message: "Internal server error while fetching turfs",
    });
  }
};


export const getTurfById = async (req, res) => {
  // console.log("Get Turf by ID called", req.params);
  try {
    const { id } = req.params;

    const turfsByOwner = await turfModel.find({ ownerId: id });
    if (turfsByOwner && turfsByOwner.length > 0) {
      return res.status(200).json({ message: 'Turfs for owner found', turfs: turfsByOwner });
    }

    // console.log("No turfs found for owner ID:", id);
    return res.status(200).json({ message: 'No turfs for owner', turfs: [] });
  } catch (error) {
    console.error('Error in getTurfById', error);
    return res.status(500).json({
      message: "Internal server error while fetching turf",
    });
  }
};

export const deleteTurf = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await turfModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    return res.status(200).json({ message: 'Turf deleted successfully' });
  } catch (error) {
    console.error('Error deleting turf', error);
    return res.status(500).json({ message: 'Internal server error while deleting turf' });
  }
};


export const getTurfByTurfId = async (req, res) => {
  try {
    const { id } = req.params;
    const turf = await turfModel.findById(id);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    console.log("Turf found", turf);
    return res.status(200).json({ message: 'Turf found', turf });
  } catch (error) {
    console.error('Error fetching turf', error);
    return res.status(500).json({ message: 'Internal server error while fetching turf' });
  }
}

     
// export const bookTurf = async (req, res) => {
//   const turfId = req.params.id;
//   console.log("Book Turf called", req.body);
//   console.log("book turf with id", turfId);
//   try {
//     return res.status(200).json({ message: 'Turf booked successfully',turfId });
//   } catch (error) { 
//     console.error('Error booking turf', error);
//     return res.status(500).json({ message: 'Internal server error while booking turf' });
//   }
// }


export const bookTurf = async (req, res) =>{
  console.log("Book Turf called", req.body);

  try {
    const{turfId,userId,date,startTime,endTime,total,ownerId} = req.body;
    console.log("Book Turf  sended", req.body);

    if(!ownerId ||!turfId || !userId || !date || !startTime || !endTime || !total){
      return res.status(400).json({message:"All fields are required"})
    }
    const newBooking =new Booking({
      turfId,
      userId,
      ownerId,
      date,
      startTime,
      endTime,
      total
    });

    await newBooking.save();
    console.log("newBooking", newBooking);

  
    res.status(200).json({
    message:"Turf booked successfully",
    booking: newBooking})
    
  } catch (error) {
    console.error('Error booking turf', error);
    return res.status(500).json({
    message: 'Internal server error while booking turf',
    error:error.message
   });
  }

}

export const editTurf = async (req, res) => {
      try {
        const { id } = req.params;
        const pricePerHour = req.body.pricePerHour;
        const updatedTurf = await turfModel.findByIdAndUpdate(
          id,
          { pricePerHour },   
          { new: true }
        );
        if (!updatedTurf) {
          return res.status(404).json({ message: 'Turf not found' });
        } 
        return res.status(200).json({ message: 'Turf updated successfully', updatedTurf });
      } catch (error) {
        return res.status(500).json({ message: ' error  updating turf' });
      } 
    };