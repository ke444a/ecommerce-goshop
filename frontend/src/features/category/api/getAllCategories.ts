import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getAllCategories = (): Promise<ICategory[]> => {
    return api.get("/category").then(response => response.data);
};

export const useGetAllCategoriesQuery = () => {
    return useQuery({
        queryKey: ["category", "all"],
        queryFn: getAllCategories
    });
};
