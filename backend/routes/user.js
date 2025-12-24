import express from "express";
import { user } from "../Controllers/userController.js";


const router = express.Router();

router.get("/me", user);

export default router;
