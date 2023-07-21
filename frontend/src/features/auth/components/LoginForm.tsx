import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";

const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .matches(/^\S*$/, "Password cannot contain spaces"),
});
type LoginForm = yup.InferType<typeof loginValidationSchema>;


const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(loginValidationSchema),
    });

    const { signIn, signInWithGoogle } = useAuth();
    const handleLogin = async (data: LoginForm) => {
        try {
            const email = data.email.trim();
            const password = data.password;
            const userCredentials = await signIn(email, password);
            if (userCredentials) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
            <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="text-secondary">
            Email Address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-primary focus:bg-white focus:outline-none"
                    />
                    {
                        <p className="text-red-500 font-semibold mt-1">
                            {errors.email?.message}
                        </p>
                    }
                </div>
                <div className="flex flex-col mb-1">
                    <label htmlFor="password" className="text-secondary">
            Password
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-primary focus:bg-white focus:outline-none"
                    />
                    {
                        <p className="text-red-500 font-semibold mt-1">
                            {errors.password?.message}
                        </p>
                    }
                </div>
                <div className="mb-10 text-right">
                    <Link
                        className="text-sm font-semibold transition-colors hover:text-primary"
                        to="/signup"
                    >
            Forgot Password?
                    </Link>
                </div>
                <button className="w-full font-semibold text-sm bg-dark text-white transition hover:bg-opacity-90 rounded-xl py-3 px-4">
          Sign In
                </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />
            <button
                className="flex w-full items-center justify-center font-semibold text-sm bg-gray-100 text-dark transition-colors hover:bg-gray-200 rounded-xl py-3 px-4 mb-4"
                onClick={signInWithGoogle}
            >
                <FcGoogle className="mr-2 w-6 h-6" />
        Sign in with Google
            </button>
            <p className="text-sm">
        Need an account?{" "}
                <Link
                    className="font-semibold text-primary transition-colors hover:text-dark"
                    to="/auth/signup"
                >
          Create an account
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
