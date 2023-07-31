import { toast } from "react-toastify";
import { api } from "../../../app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUpdateResult {
    user: IUser;
    token: string;
}

const updateUser = async (userId: string, data: FormData, token: string): Promise<IUpdateResult> => {
    return api.patch(`/users/update/${userId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);
};

export const useUpdateUserMutation = (userId: string, token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => updateUser(userId, data, token),
        onSuccess: (data: IUpdateResult) => {
            toast.success("User updated successfully");
            queryClient.invalidateQueries(["users", data.user.firebaseId]);
        }
    });
};
