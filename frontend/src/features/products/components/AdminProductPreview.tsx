import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useDeleteProductMutation } from "../api/deleteProduct";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import EditProductPopup from "./EditProductPopup";

export const AdminProductPreview = (props: IProduct) => {
    const { token } = useAuth();
    const [isShowEditProduct, setIsShowEditProduct] = useState(false);
    const deleteMutation = useDeleteProductMutation(token);

    const handleDeleteButtonClick = () => deleteMutation.mutate(props.id);
    const handleEditButtonClick = () => setIsShowEditProduct(true);

    return (
        <div className="rounded-lg drop-shadow-custom bg-white p-2 md:p-4 py-2 border-gray-200 border animate-fadeIn">
            {isShowEditProduct && (
                <EditProductPopup
                    {...props}
                    setIsShowEditProduct={setIsShowEditProduct}
                />
            )}
            <Link to={`/products/${props.id}`}>
                <img
                    className="w-full h-[200px] sm:h-[250px] rounded-xl object-cover mb-4"
                    src={props.image as string}
                    alt="Product image"
                />
            </Link>
            <div>
                <h5 className="font-medium text-secondary">
                    <Link to={`/products/${props.id}`}>{props.name}</Link>
                </h5>
                <h5 className="font-semibold mb-2">${props.price}</h5>
                <div className="flex flex-row items-center space-x-2 xs:space-x-0 xs:items-start xs:space-y-2 xs:flex-col">
                    <button
                        id="editProductButton"
                        className="flex items-center w-auto xs:w-full border border-gray-200 rounded-md p-2 px-1 xs:px-4 hover:bg-main-gray transition-colors"
                        onClick={handleEditButtonClick}
                    >
                        <MdEdit className="inline-block xs:mr-2 w-5 h-5 text-secondary" />
                        <span className="hidden xs:inline font-semibold">Edit</span>
                    </button>
                    <button
                        id="deleteProductButton"
                        className="flex items-center w-auto xs:w-full border border-gray-200 rounded-md p-2 px-1 xs:px-4 hover:bg-main-gray transition-colors text-red-500"
                        onClick={handleDeleteButtonClick}
                    >
                        <IoMdTrash className="inline-block xs:mr-2 w-5 h-5" />
                        <span className="hidden xs:inline font-semibold">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
