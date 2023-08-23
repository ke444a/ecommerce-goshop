import { Request, Response } from "express";
import stripe from "../config/stripe";
import prisma from "../config/prisma-client";
import Stripe from "stripe";
import { processOrderAddress } from "../utils/processOrderAddress";

export const webhook = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] || "";
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.ENDPOINT_SECRET || "");
    } catch (err) {
        return res.status(400).json(err);
    }

    // Handle the event
    let order;
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const items = await Promise.all(lineItems.data.map(async (lineItem) => {
            const product = await prisma.product.findUnique({
                where: {
                    priceId: lineItem.price?.id 
                }
            });
            return { product, quantity: lineItem.quantity };
        }));



        order = await prisma.order.create({
            data: {
                amount: (session.amount_total || 0) / 100,
                userId: session.metadata?.customerId || "",
                items,
                country: session.customer_details?.address?.country || "",
                address: processOrderAddress(session.customer_details?.address as Stripe.Address | null),
                sessionId: session.id,
                createdAt: new Date(session.created)
            }
        });
    }
    
    if (order) {
        return res.status(201).json(order);
    }

    res.status(200).json({ message: "Event received and processed!" });
};