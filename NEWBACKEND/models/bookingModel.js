import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    turfId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "turf",
        required : true,
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    ownerId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    startTime : {
        type : String,
        required : true,
    },
    endTime : {
        type : String,
        required : true,
    },

    total :{
        type : Number,
        required : true,
    },

})
const Booking = mongoose.model("booking",bookingSchema)
export default Booking;