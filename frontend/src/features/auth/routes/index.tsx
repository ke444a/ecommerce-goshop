import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="signup" element={<Auth />} />
            <Route path="login" element={<Auth />} />
        </Routes>
    );
};