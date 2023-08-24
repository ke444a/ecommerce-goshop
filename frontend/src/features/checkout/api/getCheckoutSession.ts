import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getCheckoutSession = (sessionId: string, token: string) => {
    return api.get(`/checkout/session/${sessionId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data);
};

export const useGetCheckoutSessionQuery = (sessionId: string, token: string) => {
    return useQuery({
        queryKey: ["checkout", sessionId],
        queryFn: () => getCheckoutSession(sessionId, token),
        select: (data) => {
            const date = new Date(data.created * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            });

            const shippingAddress = data.customer_details.address;
            const line1 = [shippingAddress.line1, shippingAddress.line2].filter(Boolean).join(", ");
            const line2 = [shippingAddress.city, shippingAddress.state].filter(Boolean).join(", ");
            const line3 = [shippingAddress.postal_code].filter(Boolean).join(", ");
            const address = [line1, line2, line3].filter(Boolean).join(", ");

            return {
                ...data,
                created: date,
                shippingAddress: address
            };
        }
    });
};