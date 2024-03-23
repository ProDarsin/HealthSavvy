import express from "express";
import { protectUser } from "../middleware/auth.js";
import { login, readMessage, resetPassword } from "../controllers/nurseDashBoard.js";
const router = express.Router();

router.post("/login", login);
router.get("/message", protectUser, readMessage);
router.post("/resetPassword", resetPassword);
export default router;
