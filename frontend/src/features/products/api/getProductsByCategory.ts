import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getProductsByCategory = (categoryId?: number) => {
    return api.get(`/products/category/${categoryId}`).then(response => response.data);
};

export const useGetProductsByCategoryQuery = (categoryId?: number) => {
    return useQuery({
        queryKey: ["products", "category", categoryId],
        queryFn: () => getProductsByCategory(categoryId),
        enabled: !!categoryId
    });
};
