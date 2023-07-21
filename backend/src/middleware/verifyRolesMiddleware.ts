import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "./authMiddleware";

export const verifyRolesMiddleware = (roles: string[]) => (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.role && roles.includes(req.role)) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
