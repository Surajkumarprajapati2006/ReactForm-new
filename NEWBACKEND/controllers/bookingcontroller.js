import bookingModel from "../models/bookingModel.js"

export const getMyBooking = async (req, res) => {
    // console.log("getMyBooking called",req.params.id)
    try {
        const myBooking = await bookingModel.find({userId: req.params.id})
        .populate("turfId")                 // show turf details
        .populate("userId", "email");  //  show user details

        // console.log("myBooking", myBooking)
        res.status(200).json({ message: 'My bookings found', myBooking });
    } catch (error) {
        console.error('Error fetching my bookings', error);
        return res.status(500).json({ message: 'Internal server error while fetching my bookings' });
    }
}

