import {
  registerPharmacy,
  registerHospital,
  readPharmacy,
  readHospital,
  deletePharmacy,
  deleteHospital,
  registerDoctor,
  readDoctor,
  registerNurse,
  readNurse,
  deleteDoctor,
  deleteNurse,
  registerAdmin,
  readAdmin,
  AdminLogin,
} from "../controllers/Admin.js";
import { upload } from "../utils/multer.js";
import { protectAdmin } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

// register admin

router.post("/createAccount", upload.single("ProfileImage"), registerAdmin);
router.get("/readamdin", readAdmin);
router.post("/login", AdminLogin);
//register pharmacy
router.post(
  "/pharmacy",
  protectAdmin,
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
    { name: "pharmacyImage", maxCount: 1 },
  ]),
  registerPharmacy
);
//get all pharmacy
router.get("/pharmacy", protectAdmin, readPharmacy);

//register hospital
router.post(
  "/hospital",
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "hospitalImage", maxCount: 1 },
  ]),
  registerHospital
);

//get all hospital
router.get("/hospital", protectAdmin, readHospital);

//remove pharmacy
router.delete("/pharmacy/:id", protectAdmin, deletePharmacy);

//remove hospital
router.delete("/hospital/:id", protectAdmin, deleteHospital);

// resgister doctor
router.post(
  "/doctor",
  protectAdmin,
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "ProfileImage", maxCount: 1 },
  ]),
  registerDoctor
);

//read all doctor

router.get("/doctor", protectAdmin, readDoctor);

// delete doctor
router.delete("/doctor/:id", protectAdmin, deleteDoctor);
//register nurse
router.post(
  "/nurse",
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "ProfileImage", maxCount: 1 },
  ]),
  registerNurse
);

//read
router.get("/nurse", protectAdmin, readNurse);

//remove nurse
router.delete("/nurse/:id", protectAdmin, deleteNurse);
export default router;
