interface IProduct {
    id:  string;
    priceId: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    image: string | Blob;
    categoryId: number;
    createdAt: Date;
}
