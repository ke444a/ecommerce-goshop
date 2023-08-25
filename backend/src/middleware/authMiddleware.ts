import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization is required" });
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "Authorization is required" });
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