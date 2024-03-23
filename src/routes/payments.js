import express from "express"
import {paymentsIn,transaction}   from "../controllers/payments.js"

const router= express.Router()

router.post('/cashin',paymentsIn)
// router.post('/cashout',paymentsOut)
router.post('/transaction',transaction)
export default router