import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getUserByFirebaseId = (firebaseId: string, token: string): Promise<IUser> => {
    return api.get(`/users/${firebaseId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);
};

export const useGetUserQuery = (firebaseId: string, token: string) => {
    return useQuery({
        queryKey: ["users", firebaseId],
        queryFn: () => getUserByFirebaseId(firebaseId, token)
    });
};
