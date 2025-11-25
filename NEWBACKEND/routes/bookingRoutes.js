import express from "express";
import {getMyBooking } from "../controllers/bookingController.js";   

const bookingRoutes = express.Router();

bookingRoutes.get("/getMyBooking/:id", getMyBooking);

export default bookingRoutes;
