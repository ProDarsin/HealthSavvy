import express from "express"
import {registerHospital} from '../controllers/hospitalRegister.js'
import { upload } from "../utils/multer.js";


const router= express.Router()


//register hospital
router.post(
    "/",
    upload.fields([
      { name: "license", maxCount: 1 },
      { name: "hospitalImage", maxCount: 1 },
    ]),
    registerHospital
  );

  export default router