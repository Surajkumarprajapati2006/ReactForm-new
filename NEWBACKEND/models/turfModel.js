import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
   name : {
    type : String,
    required : true,
   },

   pricePerHour:{
    type : Number,
    required : true,
   },

    Address:{

        city:{
            type : String,
            required : true,
        },
        state:{
            type : String,
            required : true,
        },
       
        zipCode:{
            type : String,
            required : true,
        },
        fullAddress:{
            type : String,
            required : true,
        },
    },

    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },

    bookings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "booking",
            required : false,
        }
    ]
})



const turfModel = mongoose.model("turf",turfSchema)
export default turfModel