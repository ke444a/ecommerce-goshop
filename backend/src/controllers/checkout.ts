import stripe from "../config/stripe";
import prisma from "../config/prisma-client";
import { Request, Response } from "express";

export const getCheckoutSession = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.status(200).json(session);
};

export const getCheckoutItems = async (req: Request, res: Response) => {
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
};

export const createCheckoutSession = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:5173/checkout/success?id={CHECKOUT_SESSION_ID}",
        mode: "payment",
        line_items: req.body.lineItems,
        currency: "usd",
        metadata: {
            customerId: req.body.userId
        }
    });
    res.status(201).json({ sessionId: session.id });
};
