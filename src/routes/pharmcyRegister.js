import express from 'express'
import { upload } from '../utils/multer.js';
import {registerPharmacy} from '../controllers/pharmacyRegister.js'

const router= express.Router()

router.post(
    "/",
    upload.fields([
      { name: "license", maxCount: 1 },
      { name: "profileImage", maxCount: 1 },
      { name: "pharmacyImage", maxCount: 1 },
    ]),
    registerPharmacy
  );

  export default router