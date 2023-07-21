import { Router } from "express";
import { createCheckoutSession, getCheckoutItems, getCheckoutSession } from "../controllers/checkout";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.use(authMiddleware);
router.post("/create-session", createCheckoutSession);
router.get("/session/items/:id", getCheckoutItems);
router.get("/session/:id", getCheckoutSession);

export default router;