import turfModel from "../models/turfModel.js";
import Booking from "../models/bookingModel.js";
import userModel from "../models/userModel.js";

export const getOwnerDashboard = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const ownerId = req.user._id; // FIXED: Use _id instead of id

    console.log("Fetching dashboard data for owner:", ownerId);

    // Get total turfs for this owner
    const totalTurfs = await turfModel.countDocuments({ ownerId });

    // Get total bookings for this owner's turfs
    const totalBookings = await Booking.countDocuments({ ownerId });

    // Get total earnings for this owner (sum of all booking totals)
    const bookings = await Booking.find({ ownerId });
    const totalEarnings = bookings.reduce((sum, booking) => sum + booking.total, 0);

    // Get total users count (all users in system)
    const totalUsers = await userModel.countDocuments({ role: "user" });

    // Get recent bookings for this owner
    const recentBookings = await Booking.find({ ownerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name')
      .populate('turfId', 'name');

    // Format recent bookings
    const formattedBookings = recentBookings.map(booking => ({
      id: booking._id,
      userName: booking.userId?.name || 'Unknown',
      turfName: booking.turfId?.name || 'Unknown',
      bookingDate: booking.date,
      bookingTime: `${booking.startTime} - ${booking.endTime}`,
      status: 'confirmed', // You can add status field to booking model if needed
      amount: booking.total
    }));

    // Get owner's turfs
    const userTurfs = await turfModel.find({ ownerId })
      .select('name pricePerHour Address')
      .limit(5);

    // Format user turfs
    const formattedTurfs = userTurfs.map(turf => ({
      id: turf._id,
      name: turf.name,
      price: turf.pricePerHour,
      location: turf.Address.city
    }));

    // Send response
    res.status(200).json({
      totalTurfs,
      totalBookings,
      totalEarnings,
      totalUsers,
      recentBookings: formattedBookings,
      userTurfs: formattedTurfs
    });

  } catch (error) {
    console.error('Error in getOwnerDashboard:', error);
    res.status(500).json({
      message: "Internal server error while fetching dashboard data",
      error: error.message
    });
  }
};
