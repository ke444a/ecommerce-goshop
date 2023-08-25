import Navbar from "../../../components/Elements/Navbar";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { ProductQuantitySelectBox } from "../../../components/Form";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../api/getSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addToCart } from "../../cart/cartSlice";
import { ChangeEvent, useState } from "react";
import {
    removeFavorite,
    addFavorite,
    selectFavorites,
} from "../favoritesSlice";
import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { Spinner } from "../../../components/Elements/Spinner";
import { toast } from "react-toastify";

const Product = () => {
    const { productId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const favorites = useSelector(selectFavorites);
    const [isFavorite, setIsFavorite] = useState<boolean>(
        favorites.some((favorite) => favorite.id === productId)
    );

    const {
        data: product,
        isSuccess,
        isLoading,
    } = useGetSingleProductQuery(productId as string);
    if (!isSuccess) {
        return null;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity: productQuantity }));
        toast.success("Product added to the cart");
    };

    const handleFavoriteChange = () => {
        isFavorite
            ? dispatch(removeFavorite({ id: productId || "" }))
            : dispatch(addFavorite(product));
        setIsFavorite((prevFavorite) => !prevFavorite);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = Number(e.target.value);
        setProductQuantity(newQuantity);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <Navbar />
            <div className="flex flex-col xs:flex-row">
                <img
                    className="w-full xs:w-1/2 h-[400px] sm:h-[500px] rounded-xl mb-8 xs:mb-0 xs:mr-4 sm:mr-8 object-cover"
                    src={product.image as string}
                    alt="Product image"
                />
                <div>
                    <h3 className="font-semibold text-xl sm:text-3xl mb-1">{product.name}</h3>
                    <h4 className="font-semibold text-lg sm:text-2xl mb-8">${product.price}</h4>
                    <p className="text-secondary mb-8">{product.description}</p>
                    <div className="flex items-center mb-8">
                        <ProductQuantitySelectBox
                            quantity={productQuantity}
                            handleQuantityChange={handleQuantityChange}
                            stockQuantity={product.stockQuantity}
                        />
                        <div className="ml-4 text-secondary">
                            {product.stockQuantity > 0 ? (
                                <p className="flex items-center">
                                    <FcCheckmark className="mr-1 w-5 h-5" />
                  In Stock
                                </p>
                            ) : (
                                <p className="flex items-center">
                                    <RxCross1 className="mr-1 w-5 h-5 text-red-500" />
                  Out of Stock
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={handleAddToCart}
                            className="text-white rounded-md transition hover:bg-opacity-90 font-semibold text-sm py-3 px-4 sm:px-8 md:px-14 bg-primary mr-2 sm:mr-4"
                        >
              Add to cart
                        </button>
                        <button onClick={handleFavoriteChange}>
                            {isFavorite ? (
                                <MdFavorite className="w-6 h-6 animate-fadeIn" />
                            ) : (
                                <MdFavoriteBorder className="w-6 h-6 animate-fadeIn" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
