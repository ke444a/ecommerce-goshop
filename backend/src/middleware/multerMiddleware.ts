import multer, { diskStorage } from "multer";

export const multerUpload = multer({ storage: diskStorage({}) });