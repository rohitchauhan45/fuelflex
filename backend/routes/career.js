import express from "express";
import multer from "multer";
import { sendCareerMail } from "../Controllers/careerController.js";

const router = express.Router();

const storage = multer.memoryStorage(); // keeps file in memory buffer
const upload = multer({ storage });

router.post("/", upload.single("resume"), sendCareerMail);

export default router;
