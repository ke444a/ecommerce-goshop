interface IOrderItem {
    productId: string;
    quantity: number;
}

interface IOrder {
    id: int;
    amount: number;
    userId: string;
    items: {
        product: IProduct;
        quantity: number;
    }[];
    user?: User;
    address: string;
    country: string;
    sessionId: string;
    createdAt: string;
}
