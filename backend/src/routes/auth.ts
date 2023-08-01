import { Router } from "express";
import { register, registerWithGoogle } from "../controllers/auth";
const router = Router();

router.post("/register/google", registerWithGoogle);
router.post("/register", register);

export default router;
