import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("COUNTRY", countrySchema);
