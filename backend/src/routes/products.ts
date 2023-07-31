import { Router } from "express";
import { 
    getAllProducts, 
    getProductById, 
    getProductsByCategory, 
    searchForProducts, 
    deleteProduct, 
    createProduct, 
    updateProduct 
} from "../controllers/products";
import { multerUpload } from "../middleware/multerMiddleware";
import { processProductImageUpload } from "../middleware/imageUploadMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { verifyRolesMiddleware } from "../middleware/verifyRolesMiddleware";

const router = Router();
router.get("/", getAllProducts);
router.post("/search", searchForProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/:id", getProductById);
router.post("/", authMiddleware, verifyRolesMiddleware(["ADMIN"]), multerUpload.single("image"), processProductImageUpload, createProduct);
router.patch("/:id", authMiddleware, verifyRolesMiddleware(["ADMIN"]), multerUpload.single("image"), processProductImageUpload, updateProduct);
router.delete("/:id", authMiddleware, verifyRolesMiddleware(["ADMIN"]), deleteProduct);

export default router;
