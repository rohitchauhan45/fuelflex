import express from "express"
import { contact } from "../Controllers/contactController.js"
const router=express.Router()

router.post("/",contact)

export default router