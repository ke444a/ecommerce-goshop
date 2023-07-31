import { useLocation } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname.split("/auth")[1] === "/login";

    return (
        <div className="w-full bg-auth bg-cover bg-center">
            <div className="bg-black-cover w-full h-full">
                <div className="mx-auto w-full xs:w-3/4 sm:w-2/3 md:w-[60%] lg:w-1/2 h-screen bg-white px-10 flex flex-col justify-center">
                    <h3 className="font-semibold text-2xl xs:text-3xl mb-6">
                        {isLogin ? "Sign in to your account" : "Create new account"}
                    </h3>
                    {isLogin ? <LoginForm /> : <SignupForm />}
                </div>
            </div>
        </div>
    );
};

export default Auth;