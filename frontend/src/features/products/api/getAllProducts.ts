import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getAllProducts = (): Promise<IProduct[]> => {
    return api.get("/products").then((response) => response.data);
};

export const useGetAllProductsQuery = () => {
    return useQuery({
        queryKey: ["products", "all"],
        queryFn: getAllProducts,
    });
};
