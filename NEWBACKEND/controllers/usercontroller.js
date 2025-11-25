

import userModel from "../models/userModel.js"; 

// Get all users 
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find(); 
    res.status(200).json({
      message: "All users found",
      users
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Delete user:
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  // URL se id get karega
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while deleting user",
    });
  }
};

//  Update user:
export const updateUser = async (req, res) => {
  console.log("Update user called", req.params, req.body );
  try {
    const { id } = req.params;        // URL se id get karega
    const { name } = req.body;        // frontend se new name get karega

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }                    // new:true matlab updated document return kare
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while updating user",
    });
  }
};


