import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getSingleCategory = (categoryId: number): Promise<ICategory> => {
    return api.get(`/category/${categoryId}`).then(response => response.data);
};

export const useGetSingleCategoryQuery = (categoryId: number) => {
    return useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => getSingleCategory(categoryId)
    });
};
