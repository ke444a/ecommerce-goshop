import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getAllOrdersDetailed = (token: string): Promise<IOrderDetailed[]> => {
    return api.get("/orders", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
};

export const useGetAllOrdersDetailedQuery = (token: string, isAdmin?: boolean) => {
    return useQuery({
        queryKey: ["orders", "all", "detailed"],
        queryFn: () => getAllOrdersDetailed(token),
        enabled: isAdmin
    });
};