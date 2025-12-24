import express from "express";
import {
  createOrder,
  getOrderHistory,
  createRazorpayOrder,
} from "../Controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create Razorpay order before payment
router.post("/create-razorpay-order", createRazorpayOrder);

// Save order after payment
router.post("/", createOrder);

// Get logged-in user's order history
router.get("/history", verifyToken, getOrderHistory);

export default router;
