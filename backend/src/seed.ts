import { randProduct } from "@ngneat/falso";
import prisma from "./config/prisma-client";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
    typescript: true
});

const seedProducts = async () => {
    await prisma.category.deleteMany();
    await prisma.product.deleteMany();
    const fakeProducts = randProduct({ length: 100 });
    for (let i = 0; i < fakeProducts.length; i++) {
        const product = fakeProducts[i];
        const stripeProduct = await stripe.products.create({
            name: product.title,
            description: product.description,
            default_price_data: {
                currency: "usd",
                unit_amount: Number((Number(product.price)*100).toFixed(2))
            },
            images: [product.image]
        });

        await prisma.product.create({
            data: {
                id: stripeProduct.id,
                name: product.title,
                description: product.description,
                price: Number(product.price),
                stockQuantity: Math.floor(Math.random() * 100),
                priceId: stripeProduct.default_price as string,
                image: product.image,
                category: {
                    connectOrCreate: {
                        where: {
                            name: product.category
                        },
                        create: {
                            name: product.category
                        }
                    }
                }
            }
        });
    }
};

seedProducts()
    .then(() => console.log("Populated data succesfully"))
    .catch(err => console.log(err));