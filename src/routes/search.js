import express from 'express'
import { SearchHospital,SearchMedicine,SearchPharmacy,SearchDoctor,SearchNurse } from "../controllers/search.js";

const router= express.Router()

router.post('/hospital',SearchHospital)

router.post('/medicine',SearchMedicine)
router.post('/pharmacy',SearchPharmacy)
router.post('/doctor',SearchDoctor)
router.post('/nurse',SearchNurse)
export default router