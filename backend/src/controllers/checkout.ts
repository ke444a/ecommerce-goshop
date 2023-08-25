import stripe from "../config/stripe";
import prisma from "../config/prisma-client";
import { NextFunction, Request, Response } from "express";

export const getCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id);
        res.status(200).json(session);
    } catch (error) {
        next({ message: "Unable to retrieve the checkout session", error });
    }
};

export const getCheckoutItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lineItems = await stripe.checkout.sessions.listLineItems(req.params.id);
        const items = await Promise.all(lineItems.data.map(async (lineItem) => {
            const product = await prisma.product.findUnique({
                where: {
                    priceId: lineItem.price?.id 
                }
            });
            return { productId: product?.id, quantity: lineItem.quantity };
        }));
        res.status(200).json(items);
    } catch (error) {
        next({ message: "Unable to retrieve the checkout items", error });
    }
};

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: (process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:5173") + "/checkout/success?id={CHECKOUT_SESSION_ID}",
            mode: "payment",
            line_items: req.body.lineItems,
            currency: "usd",
            metadata: {
                customerId: req.body.userId
            }
        });
        res.status(201).json({ sessionId: session.id });
    } catch (error) {
        next({ message: "Unable to create the checkout session", error });
    }
};
