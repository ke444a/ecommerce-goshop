import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const sessionLogin = async (idToken: string): Promise<IAuth> => {
    return api.post("/auth/session-login", idToken).then(response => response.data);
};

export const useSessionLoginMutation = () => {
    return useMutation({
        mutationFn: (idToken: string) => sessionLogin(idToken)
    });
};
