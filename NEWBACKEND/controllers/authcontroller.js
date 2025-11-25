import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    console.log(req.body);  
   
        const { email, password, role } = req.body; 
         

            const ExistUser = await userModel.findOne({ email: email });
            // console.log("Exist user", ExistUser);

            if(ExistUser){
                return res.status(200).json({
                    message:"User already exist",
                    ExistUser
                })
            }


            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await userModel.create({
                
                email: email,
                password: hash,
                role: role || "user"  // default  user:
            })

            const token = jwt.sign({ Id: user._id },"ADRSB#@G");
            // console.log(token);

            // console.log("new user", user);
            res.status(201).json({
                message:"user registered successfully",
                user,
                token
            })
}

export const Login = async (req, res) => {
    console.log(req.body);
    try {
        const user = await userModel.findOne({ email: req.body.email });
        // console.log("Exist user", user);

        if(!user){
            console.log("user not found");
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("isMatch", isMatch);
        if(!isMatch){
            console.log("password not match");
            return res.status(400).json({
                message:"password not match "
            })
        }  
        
        const token = jwt.sign({ Id: user._id },"ADRSB#@G");
        console.log("token",token);
       console.log("data sended");
        res.status(200).json({
            message:"user login successfully",
            user,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
        })
        
    }

}