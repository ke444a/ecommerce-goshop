import multer, { memoryStorage } from "multer";
import path from "path";

// const productsStorage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, "./uploads/products");
//     },
//     filename(req, file, cb) {
//         cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
//     },
// });

// const usersStorage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, "./uploads/users");
//     },
//     filename(req, file, cb) {
//         cb(null, `user-${req.body.firebaseId}${path.extname(file.originalname)}`);
//     },
// });

// export const productUpload = multer({ storage: productsStorage });
// export const userUpload = multer({ storage: usersStorage });
export const multerUpload = multer({ storage: memoryStorage() });