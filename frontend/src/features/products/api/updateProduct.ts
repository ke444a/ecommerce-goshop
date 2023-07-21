import { api } from "../../../app/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { convertToFormData } from "../../../utils/convertToFormData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { updateFavorite } from "../favoritesSlice";
import { updateCart } from "../../cart/cartSlice";

const updateProduct = (productId: string, product: Partial<IProduct> & { imagePath: string }, token: string): Promise<IProduct> => {
    const { imagePath, ...productData } = product;
    return api.patch(`/products/${productId}`, convertToFormData(productData), {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);
};

export const useUpdateProductMutation = (productId: string, token: string) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();

    return useMutation({
        mutationFn: (product: Partial<IProduct> & { imagePath: string }) => updateProduct(productId, product, token),
        onMutate: async (updatedProduct) => {
            await queryClient.cancelQueries(["products", "all"]);
            const previousProducts = queryClient.getQueryData<IProduct[]>(["products", "all"]);
            if (previousProducts) {
                queryClient.setQueryData<IProduct[]>(["products", "all"], (oldProducts) => {
                    const productsCopy: IProduct[] = JSON.parse(JSON.stringify(oldProducts));
                    return productsCopy.map(product => {
                        if (product.id === updatedProduct.id) {
                            product = { ...updatedProduct, image: updatedProduct.imagePath } as IProduct;
                        }
                        return product;
                    });
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
            dispatch(updateFavorite({ oldId: productId, updatedProduct: data}));
            dispatch(updateCart({ oldProdId: productId, updatedProduct: data }));
        }
    });
};
