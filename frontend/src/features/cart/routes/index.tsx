import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";

export const CartRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Cart />} />
        </Routes>
    );
};
