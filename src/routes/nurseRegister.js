import express from 'express'

import { upload } from '../utils/multer.js'
 import { registerNurse } from '../controllers/nurseRegister.js'

 const router= express.Router()
 router.post(
    "/",
    upload.fields([
      { name: "license", maxCount: 1 },
      { name: "ProfileImage", maxCount: 1 },
    ]),
    registerNurse
  );

 export default router
