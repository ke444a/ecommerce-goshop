import { Route, Routes } from "react-router-dom";
import CheckoutSuccess from "./CheckoutSuccess";

export const CheckoutRoutes = () => {
    return (
        <Routes>
            <Route path="success" element={<CheckoutSuccess />} />
        </Routes>
    );
};
