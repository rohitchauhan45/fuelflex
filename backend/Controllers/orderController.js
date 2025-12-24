import ORDER from "../models/ORDER.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config()

// ✅ Razorpay instance (init only once)
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// 🔹 Step 1: Create Razorpay order (frontend will call this first)
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay order error:", err.message);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// 🔹 Step 2: After payment - verify + store order
export const createOrder = async (req, res) => {
  try {
    const {
      paymentId,
      razorpayOrderId,
      razorpaySignature,
      cartItems,
      totalBill,
      shippingDetails,
    } = req.body;

    if (
      !paymentId ||
      !razorpayOrderId ||
      !razorpaySignature ||
      !cartItems ||
      !totalBill ||
      !shippingDetails
    ) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    // ✅ Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ Extract user ID if logged in
    let userId = null;
    const token = req.cookies?.access_token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    }

    // ✅ Clean cart items
    const cleanedItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    // ✅ Save order to DB
    const order = new ORDER({
      userId,
      paymentId,
      cartItems: cleanedItems,
      totalBill,
      shippingDetails,
      status: "Paid",
    });

    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Order history (for logged-in users)
export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;

    const orders = await ORDER.find({ userId });
    res.status(200).json({ orders, email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
