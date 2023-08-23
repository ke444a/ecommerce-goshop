import { Router } from "express";
import { updateUser, getUserByFirebaseId } from "../controllers/users";
import { multerUpload } from "../middleware/multerMiddleware";
import { processImageUpload } from "../middleware/processImageUpload";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.patch("/update/:id", authMiddleware, multerUpload.single("avatar"), processImageUpload, updateUser);
router.get("/:id", authMiddleware, getUserByFirebaseId);
export default router;
