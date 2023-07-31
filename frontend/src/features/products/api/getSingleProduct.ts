import { useDispatch } from "react-redux";
import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";
import { AppDispatch } from "../../../app/store";
import { removeFavorite } from "../favoritesSlice";
import { removeFromCart } from "../../cart/cartSlice";

const getSingleProduct = (productId: string): Promise<IProduct> => {
    return api.get(`/products/${productId}`).then((response) => response.data);
};

export const useGetSingleProductQuery = (productId: string) => {
    const dispatch = useDispatch<AppDispatch>();

    return useQuery({
        queryKey: ["products", productId],
        queryFn: () => getSingleProduct(productId),
        onError: () => {
            dispatch(removeFavorite({ id: productId }));
            dispatch(removeFromCart({ id: productId }));
        }
    });
};
