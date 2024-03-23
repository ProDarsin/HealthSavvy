import express from 'express'
import { upload } from '../utils/multer.js'
import { registerDoctor } from '../controllers/doctorRegister.js'

const router= express.Router()

router.post(
    "/",
    upload.fields([
      { name: "license", maxCount: 1 },
      { name: "ProfileImage", maxCount: 1 },
    ]),
    registerDoctor
  );

  export default router