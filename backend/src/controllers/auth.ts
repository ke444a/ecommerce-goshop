import { Request, Response } from "express";
import { auth } from "../config/firebase";
import prisma from "../config/prisma-client";

export const register = async (req: Request, res: Response) => {
    try {
        const userFirebase = await auth.createUser({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.fullName
        });

        await prisma.user.create({
            data: {
                firebaseId: userFirebase.uid,
                email: req.body.email,
                fullName: req.body.fullName
            }
        });

        const token = await auth.createCustomToken(userFirebase.uid);
        const roleClaim = {
            role: "USER"
        };
        await auth.setCustomUserClaims(userFirebase.uid, roleClaim);
    
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
};
