import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: false }, // Link to User
  paymentId: String,
  cartItems: Array,
  totalBill: Number,
  shippingDetails: {
    fullName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    contact: String,}},{timestamps:true})

export default mongoose.model("Order", orderSchema);
