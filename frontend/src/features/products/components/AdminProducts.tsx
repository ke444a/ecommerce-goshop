import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import CreateProductPopup from "./CreateProductPopup";
import { useAuth } from "../../../context/AuthContext";
import ProductsDashboard from "./ProductsDashboard";

export const AdminProducts = () => {
    const [isShowCreateProduct, setIsShowCreateProduct] = useState(false);
    const { isAdmin } = useAuth();

    const handleCreateProduct = () => {
        setIsShowCreateProduct(true);
    };

    return (
        <>
            <div className="mt-4 p-5 bg-white drop-shadow-custom rounded-md">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-semibold text-xl mr-4 sm:mr-0 sm:text-3xl">Manage Products</h3>
                    <button
                        id="create-product"
                        onClick={handleCreateProduct}
                        className="flex items-center bg-primary text-white text-sm p-2 xs:px-6 xs:py-3 rounded-md transition hover:bg-opacity-90"
                    >
                        <AiOutlinePlus className="inline-block mr-0 xs:mr-2 w-6 h-6" />
                        <span className="sr-only xs:not-sr-only xs:inline">Create new</span>
                    </button>
                </div>
                <ProductsDashboard 
                    isAdmin={isAdmin}
                />
            </div>
            {isShowCreateProduct && (
                <CreateProductPopup setIsShowCreateProduct={setIsShowCreateProduct} />
            )}
        </>
    );
};



