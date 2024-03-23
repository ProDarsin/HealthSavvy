import express from 'express'
import { approvedHospital,getApprovedHospital,approvedPharmacy,
    approvedDoctor,approvedNurse
} from "../controllers/approved.js";


const router = express.Router()

router.post('/hospital/:id',approvedHospital)
router.post('/pharmacy/:id',approvedPharmacy)
router.post('/doctor/:id',approvedDoctor)
router.post('/nurse/:id',approvedNurse)
router.get('/approvedHospital',getApprovedHospital)

export default router