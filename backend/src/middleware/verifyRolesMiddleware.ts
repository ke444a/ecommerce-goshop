import { NextFunction, Request, Response } from "express";

export const verifyRolesMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.role && roles.includes(req.role)) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
