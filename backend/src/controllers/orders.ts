import { Request, Response } from "express";
import prisma from "../config/prisma-client";

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!orders) {
            return res.status(404).json({ message: "Orders not found" });
        }

        const ordersWithUser = await Promise.all(orders.map(async order => {
            const user = await prisma.user.findUnique({
                where: {
                    firebaseId: order.userId
                }
            });
            return { user, ...order };
        }));
    
        res.status(200).json(ordersWithUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: req.params.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!orders) {
            return res.status(404).json({ message: "Orders not found" });
        }

        const ordersWithUser = await Promise.all(orders.map(async order => {
            const user = await prisma.user.findUnique({
                where: {
                    firebaseId: req.params.id
                }
            });
            return { user, ...order };
        }));
        res.status(200).json(ordersWithUser);
    } catch (error) {
        res.status(400).json(error);
    }
};
