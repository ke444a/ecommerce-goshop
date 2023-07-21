export const sortProductsByPriceAscending = (products: IProduct[]) => {
    return products.sort((a, b) => {
        return a.price - b.price;
    });
};

export const sortProductsByPriceDescending = (products: IProduct[]) => {
    return products.sort((a, b) => {
        return b.price - a.price;
    });
};
