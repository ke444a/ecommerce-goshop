import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getSingleProduct = (productId: string): Promise<IProduct> => {
    return api.get(`/products/${productId}`).then((response) => response.data);
};

export const useGetSingleProductQuery = (id: string) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => getSingleProduct(id)
    });
};
