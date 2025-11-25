import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
   name : {
    type : String,
    required : false,
      default : "User"
   
},
   email : String,
   password : String,
   role :{
      type : String,
      enum : ["user","admin", "owner" ],        
      default : "user"
   }
})

const userModel = mongoose.model("user",userSchame)
export default userModel