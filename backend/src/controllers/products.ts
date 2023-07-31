import stripe from "../config/stripe";
import { Request, Response } from "express";
import { ImageRequest } from "../middleware/imageUploadMiddleware";
import prisma from "../config/prisma-client";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!products) {
            throw new Error("Product not found");
        }

        res.status(200).json(products);
    } catch(error) {
        res.status(404).json(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.params.id
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        res.status(200).json(product);
    } catch(error) {
        res.status(404).json(error);
    }
};

export const searchForProducts = async (req: Request, res: Response) => {
    try {
        let { searchQuery } = req.body;
        if (searchQuery.length > 0 && searchQuery.indexOf(" ") === -1) {
            searchQuery = `${searchQuery}*`;
        }
        const products = await prisma.product.findMany({
            where: {
                name: {
                    search: searchQuery
                },
                description: {
                    search: searchQuery
                }
            },
            orderBy: {
                _relevance: {
                    fields: ["name"],
                    search: "database",
                    sort: "asc"
                }
            }
        });
        if (!products) {
            throw new Error("Product not found");
        }
    
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
};


export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: Number(req.params.id)
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }
    
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const createProduct = async (req: ImageRequest, res: Response) => {
    try {
        const image = req.image || "";
        const stripeProduct = await stripe.products.create({
            name: req.body.name,
            description: req.body.description,
            default_price_data: {
                currency: "usd",
                unit_amount: req.body.price * 100
            },
            images: [image]
        });
    
        const newProduct = await prisma.product.create({
            data: {
                stockQuantity: Number(req.body.stockQuantity),
                price: Number(req.body.price),
                id: stripeProduct.id,
                priceId: stripeProduct.default_price as string,
                image,
                name: req.body.name,
                description: req.body.description,
                category: {
                    connectOrCreate: {
                        where: {
                            name: req.body.category
                        },
                        create: {
                            name: req.body.category
                        }
                    }
                }
            }
        });
    
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
};

export const updateProduct = async (req: ImageRequest, res: Response) => {
    try {
        const foundProduct = await prisma.product.findFirst({
            where: {
                id: req.params.id
            }
        });

        if (!foundProduct) {
            throw new Error("Product not found");
        }
    
        await stripe.products.update(foundProduct.id, {
            active: false
        });
        
        const image = req.image || foundProduct.image;
        const updatedStripeProduct = await stripe.products.create({
            name: req.body?.name || foundProduct.name,
            description: req.body?.description || foundProduct.description,
            default_price_data: {
                currency: "usd",
                unit_amount: (req.body?.price || foundProduct.price) * 100
            },
            images: [image]
        });

        const updatedCategory = await prisma.category.upsert({
            where: {
                name: req.body.category
            },
            update: {
                name: req.body.category
            },
            create: {
                name: req.body.category
            }
        });
    
        const updatedProduct = await prisma.product.update({
            where: {
                id: req.params.id
            },
            data: {
                stockQuantity: Number(req.body.stockQuantity),
                price: Number(req.body.price),
                id: updatedStripeProduct.id,
                priceId: updatedStripeProduct.default_price as string,
                image,
                name: req.body.name,
                description: req.body.description,
                category: {
                    connectOrCreate: {
                        where: {
                            name: req.body.category
                        },
                        create: {
                            name: req.body.category
                        }
                    }
                }
            }
        });
    
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
    }    
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: req.params.id
            }
        });

        if (!deletedProduct) {
            throw new Error("Product not found");
        }

        await prisma.category.deleteMany({
            where: {
                products: {
                    none: {}
                }
            }
        });
    
        await stripe.products.update(req.params.id, {
            active: false
        });
    
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json(error);
    }
};
