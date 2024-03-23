import {
  login,
  addMedicine,
  removeMedicine,
  readMedicine,
  updateMedicine,
  readMedicineById,
  resetPassword,
} from "../controllers/pharmcyDashboard.js";
import { protectPharmacy } from "../middleware/auth.js";
import { upload } from "../utils/multer.js";
import express from "express";
const router = express.Router();
// pharmcy login
router.post("/login", login);
//reset password
router.post("/resetPassword", resetPassword);
// add medicine in the system
router.post(
  "/medicine",
  protectPharmacy,
  upload.single("medicineImage"),
  addMedicine
);
//read medicine
router.get("/medicine", protectPharmacy, readMedicine);
// delete medicine
router.delete("/medicine/:id", protectPharmacy, removeMedicine);
// update medicine
router.patch("/medicine/:id", protectPharmacy,upload.single("medicineImage"), updateMedicine);
router.get("/medicine/:id", protectPharmacy, readMedicineById);
export default router;
