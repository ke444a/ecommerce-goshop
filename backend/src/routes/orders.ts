import { Router } from "express";
import { getAllOrders, getOrdersByUserId } from "../controllers/orders";
import { authMiddleware } from "../middleware/authMiddleware";
import { verifyRolesMiddleware } from "../middleware/verifyRolesMiddleware";
const router = Router();

router.use(authMiddleware);
router.get("/", verifyRolesMiddleware(["ADMIN"]), getAllOrders);
router.get("/user/:id", getOrdersByUserId);
router.get("/", getAllOrders);

export default router;