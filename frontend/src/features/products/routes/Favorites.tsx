import Navbar from "../../../components/Elements/Navbar";
import { ProductPreview } from "../components/ProductPreview";
import { useSelector } from "react-redux";
import { selectFavorites } from "../favoritesSlice";
import { useMemo } from "react";

const Favorites = () => {
    const favorites = useSelector(selectFavorites);
    const favoritesView = useMemo(() => {
        return favorites.map(favorite => (
            <ProductPreview 
                key={favorite.id}
                {...favorite}
            />
        ));
    }, [favorites]);
    
    return (
        <div className="container">
            <Navbar />
            <h3 className="font-semibold text-3xl mb-8">Favorites</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoritesView}
            </div>
        </div>
    );
};

export default Favorites;
