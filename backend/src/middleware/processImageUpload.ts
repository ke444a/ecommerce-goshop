import { Response, NextFunction, Request } from "express";
import { v2 as cloudinary } from "cloudinary";

export const processImageUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req?.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path);
            req.image = imageUpload.secure_url;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Unable to upload image" });
    }
};
