import { useDispatch } from "react-redux";
import { api } from "../../../app/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AppDispatch } from "../../../app/store";
import { removeFavorite } from "../favoritesSlice";
import { removeFromCart } from "../../cart/cartSlice";

const deleteProduct = (productId: string, token: string): Promise<IProduct> => {
    return api.delete(`/products/${productId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);
};

export const useDeleteProductMutation = (token: string) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();
    
    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId, token),
        onMutate: async (productId) => {
            await queryClient.cancelQueries(["products", "all"]);
            const previousProducts = queryClient.getQueryData<IProduct[]>(["products", "all"]);
            if (previousProducts) {
                queryClient.setQueryData<IProduct[]>(["products", "all"], (oldProducts) => {
                    const productsCopy: IProduct[] = JSON.parse(JSON.stringify(oldProducts));
                    return productsCopy.filter(product => product.id !== productId);
                });
            }
            return { previousProducts };
        },
        onError: (_err, _newProduct, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData<IProduct[]>(["products", "all"], context.previousProducts);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(["products", "all"]);
        },
        onSuccess: (data: IProduct) => {
            dispatch(removeFavorite({ id: data.id}));
            dispatch(removeFromCart({ id: data.id }));
        }
    });
};
