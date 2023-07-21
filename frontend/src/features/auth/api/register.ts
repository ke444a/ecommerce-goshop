import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const register = async (credentials: IRegisterCredentials): Promise<IAuth> => {
    return api.post("/auth/register", credentials).then(response => response.data);
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: (credentials: IRegisterCredentials) => register(credentials)
    });
};