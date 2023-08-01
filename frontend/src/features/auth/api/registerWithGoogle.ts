import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const registerWithGoogle = (credentials: IRegisterWithGoogleCredentials) => {
    return api.post("/auth/register/google", credentials).then(response => response.data);
};

export const useRegisterWithGoogleMutation = () => {
    return useMutation({
        mutationFn: (credentials: IRegisterWithGoogleCredentials) => registerWithGoogle(credentials)
    });
};