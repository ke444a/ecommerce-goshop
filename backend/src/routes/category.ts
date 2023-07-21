import { Router } from "express";
import { getSingleCategory, getAllCategories } from "../controllers/category";
const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);

export default router;
