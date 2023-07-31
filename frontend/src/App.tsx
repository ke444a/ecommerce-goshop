import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";

const App = () => {
    return (
        <AuthProvider>
            <ToastContainer 
                autoClose={3500}
                draggable={false}
                pauseOnHover={false}
            />
            <AppRoutes />
        </AuthProvider>
    );
};

export default App;