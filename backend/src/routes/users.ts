import { Router } from "express";
import { updateUser, getUserByFirebaseId } from "../controllers/users";
import { multerUpload } from "../middleware/multerMiddleware";
import { processUserImageUpload } from "../middleware/imageUploadMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.patch("/update/:id", authMiddleware, multerUpload.single("avatar"), processUserImageUpload, updateUser);
router.get("/:id", authMiddleware, getUserByFirebaseId);
export default router;
