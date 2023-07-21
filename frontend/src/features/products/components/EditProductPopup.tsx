import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { useUpdateProductMutation } from "../api/updateProduct";
import Popup from "../../../components/Elements/Popup";
import ProductForm from "./ProductForm";
import { useAuth } from "../../../context/AuthContext";
import { useGetSingleCategoryQuery } from "../../category";
import { ProductFormType } from "./ProductForm";

interface Props extends IProduct {
    setIsShowEditProduct: Dispatch<SetStateAction<boolean>>;
}

const EditProductPopup = ({setIsShowEditProduct, ...product}: Props) => {
    const { token } = useAuth();
    const { data: category, isSuccess } = useGetSingleCategoryQuery(product.categoryId);
    const { mutate: updateProduct } = useUpdateProductMutation(product.id, token);

    const onFormSubmit = async (data: ProductFormType, preview: string) => {
        const updatedProduct = {
            ...data,
            image: data.image as Blob,
            imagePath: preview as string,
        };
        updateProduct(updatedProduct);
        setIsShowEditProduct(false);
    };

    if (!isSuccess) {
        return null;
    }

    return (
        <Popup setIsShowPopup={setIsShowEditProduct}>
            <div className="bg-white p-4 rounded-md z-50">
                <div className="flex justify-between mb-3">
                    <h1 className="text-xl font-semibold">Edit Product</h1>
                    <button
                        className="transition-colors text-secondary hover:text-dark"
                        onClick={() => setIsShowEditProduct(false)}
                    >
                        <MdClose className="w-6 h-6 inline-block" />
                    </button>
                </div>
                <ProductForm 
                    product={product}
                    categoryName={category.name}
                    onFormSubmit={onFormSubmit}
                />
            </div>
        </Popup>
    );
};


export default EditProductPopup;