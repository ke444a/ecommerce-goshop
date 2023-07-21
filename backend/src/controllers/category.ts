import { Request, Response } from "express";
import prisma from "../config/prisma-client";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    
        if (!categories) {
            return res.status(404).json({ message: "Categories not found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getSingleCategory = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
    
        if (!category) {
            return res.status(404).json({ message: "Category with given ID not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
};
