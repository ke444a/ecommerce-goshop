import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";


const createCheckoutSession = (sessionData: {lineItems: ILineItem[], userId: string}, token: string): Promise<{sessionId: string}> => {
    return api.post("/checkout/create-session", sessionData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
};

export const useCreateCheckoutSessionMutation = (token: string) => {
    return useMutation({
        mutationFn: (sessionData: {lineItems: ILineItem[], userId: string}) => createCheckoutSession(sessionData, token)
    });
};
