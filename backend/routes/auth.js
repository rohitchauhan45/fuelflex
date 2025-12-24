import express  from "express"
import { login, sign,logout } from "../Controllers/authController.js"
const router=express.Router()

router.post("/",sign)
router.post("/login",login)
router.post("/logout",logout)

export default router