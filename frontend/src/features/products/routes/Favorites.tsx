import Navbar from "../../../components/Elements/Navbar";
import { ProductPreview } from "../components/ProductPreview";
import { useSelector } from "react-redux";
import { selectFavorites } from "../favoritesSlice";
import { useMemo } from "react";
import { MdHeartBroken } from "react-icons/md";

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
            {favorites.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favoritesView}
                    </div>
                </>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <MdHeartBroken className="w-16 h-16" />
                    <h4 className="font-medium text-xl mt-2">
              No favorites yet...
                    </h4>
                </div>
            )}
        </div>
    );
};

export default Favorites;
