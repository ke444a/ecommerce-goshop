import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";

export interface IAuthRequest extends Request {
    uid?: string;
    role?: "USER" | "ADMIN"
}

export const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is required" });
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "Access token is required" });
    }

    try {
        const decodedToken = await auth.verifyIdToken(accessToken);
        req.uid = decodedToken.uid;
        req.role = decodedToken.role;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized"});
    }
};