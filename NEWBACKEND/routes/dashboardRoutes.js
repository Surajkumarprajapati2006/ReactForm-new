import express from "express";
import { getOwnerDashboard } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get owner dashboard data
router.get("/ownerdashboard", protect, getOwnerDashboard);

export default router;
