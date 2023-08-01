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

        const role = req.body.isAdmin ? "ADMIN" : "USER";
        await prisma.user.create({
            data: {
                firebaseId: userFirebase.uid,
                email: req.body.email,
                fullName: req.body.fullName,
                role
            }
        });

        const token = await auth.createCustomToken(userFirebase.uid);
        await auth.setCustomUserClaims(userFirebase.uid, { role });
    
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const registerWithGoogle = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({
            data: {
                firebaseId: req.body.firebaseId,
                email: req.body.email,
                fullName: req.body.fullName
            }
        });
                
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};
