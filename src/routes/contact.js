import express from "express";
import { feedback,getFeedBack } from "../controllers/contact.js";

const router= express.Router()
router.post('/',feedback)
router.get('/',getFeedBack)

export default router