import { Link } from "react-router-dom";
import { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addFavorite, removeFavorite, selectFavorites } from "../favoritesSlice";

export const ProductPreview = (props: IProduct) => {
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector(selectFavorites);

    const [isFavorite, setIsFavorite] = useState<boolean>(favorites.some(favorite => favorite.id === props.id));
    const handleFavoriteChange = () => {
        isFavorite
            ? dispatch(removeFavorite({ id: props.id }))
            : dispatch(addFavorite(props));
        setIsFavorite((prevFavorite) => !prevFavorite);
    };

    return (
        <div 
            className="animate-fadeIn relative rounded-xl drop-shadow-custom bg-white mb-8 group"
            data-category={`${props.categoryId}`}
            data-created-at={`${props.createdAt}`}
            data-price={`${props.price}`}
        >
            <Link
                to={`/products/${props.id}`}
                className="transition-opacity hover:opacity-90"
            >
                <img
                    className="w-full h-[250px] sm:h-[300px] rounded-xl object-cover"
                    src={props.image as string}
                    alt="Product image"
                />
            </Link>
            <button
                className="absolute top-2 right-3 bg-white p-1 rounded-full drop-shadow-custom hidden group-hover:block"
                onClick={handleFavoriteChange}
            >
                {isFavorite ? (
                    <MdFavorite className="w-6 h-6 animate-fadeIn" />
                ) : (
                    <MdFavoriteBorder className="w-6 h-6 animate-fadeIn" />
                )}
            </button>
            <div className="text-center py-4">
                <p className="text-secondary mb-1 transition-all hover:underline">
                    <Link to={`/products/${props.id}`}>Detail</Link>
                </p>
                <h5 className="font-semibold text-xl mb-1">{props.name}</h5>
                <h6 className="font-semibold mb-1">${props.price}</h6>
            </div>
        </div>
    );
};
