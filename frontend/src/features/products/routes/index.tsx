import { Route, Routes } from "react-router-dom";
import Shop from "./Shop";
import Product from "./Product";
import Favorites from "./Favorites";

export const ProductRoutes = () => {
    return (
        <Routes>
            <Route path="shop" element={<Shop />} />
            <Route path=":productId" element={<Product />} />
            <Route path="favorites" element={<Favorites />} />
        </Routes>
    );
};
