import COUNTRY from "../models/COUNTRY.js";

export const savecountry = async (req, res, next) => {
  try {
    const { country } = req.body;

    if (!country || country.trim() === "") {
      return res.status(400).json({ message: "Country is required" });
    }

    await COUNTRY.create({ country });

    return res.status(200).json({ message: "Country saved successfully" });
  } catch (error) {
    console.error("Error saving country:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
