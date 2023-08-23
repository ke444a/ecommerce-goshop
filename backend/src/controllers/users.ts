import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma-client";
import { auth } from "../config/firebase";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
            return res.status(400).json({ message: "User with given email already exists" });
        }
    
        const newUser = await prisma.user.create({
            data: req.body
        });
    
        res.status(201).json(newUser);
    } catch (error) {
        next({ message: "Unable to create the user", error });
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const foundUser = await prisma.user.findUnique({
            where: {
                firebaseId: userId
            }
        });
    
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
    
        if (req.body.email && req.body.email !== foundUser.email) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (existingUser) {
                return res.status(400).json({ message: "User with given email already exists"});
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
        next({ message: "Unable to update the user", error });
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundUser = await prisma.user.delete({
            where: {
                firebaseId: req.params.id
            }
        });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        next({ message: "Unable to delete the user", error });
    }
};

export const getUserByFirebaseId = async (req: Request, res: Response) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            firebaseId: req.params.id
        }
    });
    if (!foundUser) {
        return res.status(404).json("User not found");
    }
    
    res.status(200).json(foundUser);
};