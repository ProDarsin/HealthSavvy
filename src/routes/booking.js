import express from "express";
import { bookingNurse, bookingDoctor } from "../controllers/booking.js";
import { protectClient } from "../middleware/auth.js";
const router = express.Router();

router.post("/doctor/:doctorId", protectClient, bookingDoctor);
router.post("/nurse/:nurseId", protectClient, bookingNurse);

export default router;
