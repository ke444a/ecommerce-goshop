import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getSingleOrder = (orderId: string, token: string): Promise<IOrder[]> => {
    return api.get(`/orders/${orderId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
};

export const useGetSingleOrderQuery = (orderId: string, token: string) => {
    return useQuery({
        queryKey: ["orders", "all", "detailed"],
        queryFn: () => getSingleOrder(orderId, token)
    });
};