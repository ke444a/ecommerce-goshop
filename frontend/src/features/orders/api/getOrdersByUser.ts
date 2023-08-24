import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getOrdersByUser = (userId: string, token: string): Promise<IOrder[]> => {
    return api.get(`/orders/user/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
};

export const useGetOrdersByUserQuery = (userId: string, token: string, isAdmin?: boolean) => {
    return useQuery({
        queryKey: ["orders", "user", userId],
        queryFn: () => getOrdersByUser(userId, token),
        enabled: !isAdmin
    });
};