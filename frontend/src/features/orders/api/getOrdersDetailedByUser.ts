import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getOrdersDetailedByUser = (userId: string, token: string): Promise<IOrderDetailed[]> => {
    return api.get(`/orders/user/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
};

export const useGetOrdersDetailedByUserQuery = (userId: string, token: string, isAdmin?: boolean) => {
    return useQuery({
        queryKey: ["orders", "user", userId],
        queryFn: () => getOrdersDetailedByUser(userId, token),
        enabled: !isAdmin
    });
};