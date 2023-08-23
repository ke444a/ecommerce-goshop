import { Request, Response } from "express";
import prisma from "../config/prisma-client";

export const getAllOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true
        }
    });
    if (!orders) {
        return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: req.params.id
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true
        }
    });
    if (!orders) {
        return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);

};
