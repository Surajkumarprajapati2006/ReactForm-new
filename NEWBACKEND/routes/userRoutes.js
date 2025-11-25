import express from "express";  
import { getAllUsers, deleteUser, updateUser } from "../controllers/usercontroller.js";

const userRoutes = express.Router();

userRoutes.get("/allUsers", getAllUsers);
userRoutes.delete("/deleteUser/:id", deleteUser);
userRoutes.put("/updateUser/:id", updateUser);

export default userRoutes;