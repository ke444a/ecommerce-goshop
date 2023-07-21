import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../config/firebase";
import { IAuthRequest } from "./authMiddleware";

export interface ImageRequest extends IAuthRequest {
    image?: string;
}

export const processProductImageUpload = async (req: ImageRequest, res: Response, next: NextFunction) => {
    if (req?.file) {
        const FILE_PATH = path.resolve(__dirname, "../../uploads/products") + req.file.filename;
        await sharp(req.file?.buffer)
            .jpeg({ quality: 70 })
            .toFile(FILE_PATH);

        const bucket = storage.bucket();
        const imageId = uuidv4();
        const imageUpload = await bucket.upload(FILE_PATH, {
            destination: `products/product-${Date.now() + path.extname(req.file.originalname)}`,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: imageId
                }
            }
        });
        const imageURL = process.env.FIREBASE_BASE_URL + encodeURIComponent(imageUpload[0].name) + "?alt=media&token=" + imageId;
        req.image = imageURL;
    }
    next();
};

export const processUserImageUpload = async (req: ImageRequest, res: Response, next: NextFunction) => {
    if (req?.file) {
        const FILE_PATH = path.resolve(__dirname, "../../uploads/users") + req.file.filename;
        await sharp(req.file?.buffer)
            .jpeg({ quality: 70 })
            .toFile(FILE_PATH);

        const bucket = storage.bucket();
        const imageId = uuidv4();
        const imageUpload = await bucket.upload(FILE_PATH, {
            destination: `users/${req.body.fullName.toLowerCase().replace(" ", "-") + "-" + Date.now() + path.extname(req.file.originalname)}`,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: imageId
                }
            }
        });
        const imageURL = process.env.FIREBASE_BASE_URL + encodeURIComponent(imageUpload[0].name) + "?alt=media&token=" + imageId;
        req.image = imageURL;
    }
    next();
};
