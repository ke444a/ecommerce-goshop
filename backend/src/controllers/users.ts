import { Request, Response } from "express";
import prisma from "../config/prisma-client";
import { ImageRequest } from "../middleware/imageUploadMiddleware";
import { auth } from "../config/firebase";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            throw new Error("User with given email already exists");
        }
    
        const newUser = await prisma.user.create({
            data: req.body
        });
    
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateUser = async (req: ImageRequest, res: Response) => {
    try {
        const userId = req.params.id;
        const foundUser = await prisma.user.findUnique({
            where: {
                firebaseId: userId
            }
        });
    
        if (!foundUser) {
            throw new Error("User not found");
        }
    
        if (req.body.email && req.body.email !== foundUser.email) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (existingUser) {
                throw new Error("User with given email already exists");
            }
        }
    
        const image = req.image || req.body.avatar;    
        const updatedUser = await prisma.user.update({
            where: {
                firebaseId: userId
            },
            data: {
                ...req.body,
                avatar: image
            }
        });
        await auth.updateUser(userId || "", {
            email: req.body.email,
            displayName: req.body.fullName,
            photoURL: image
        });
        const token = await auth.createCustomToken(userId);

        res.status(200).json({ user: updatedUser, token });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const foundUser = await prisma.user.delete({
            where: {
                firebaseId: req.params.id
            }
        });
        if (!foundUser) {
            throw new Error("User not found");
        }
    
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getUserByFirebaseId = async (req: Request, res: Response) => {
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                firebaseId: req.params.id
            }
        });
        if (!foundUser) {
            throw new Error("User not found");
        }
    
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(404).json(error);
    }
};