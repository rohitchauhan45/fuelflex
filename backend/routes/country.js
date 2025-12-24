import express from "express"
const router = express.Router();
import { savecountry } from '../Controllers/countryController.js';

router.post('/', savecountry);

export default router