import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";

const registerValidationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/^\S*$/, "Password cannot contain spaces"),
    password2: yup.string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password confirmation is required"),
    firstName: yup.string().required().trim().matches(/^[aA-zZ\s]+$/, "Name can only contain alphabets"),
    lastName: yup.string().required().trim().matches(/^[aA-zZ\s]+$/, "Name can only contain alphabets")
});
type SignupForm = yup.InferType<typeof registerValidationSchema>;


const SignupForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
        resolver: yupResolver<SignupForm>(registerValidationSchema),
    });

    const { signUp, signInWithGoogle } = useAuth();
    const handleRegister = async (data: SignupForm) => {
        const credentials = {
            email: data.email.trim(),
            password: data.password,
            fullName: `${data.firstName.trim()} ${data.lastName.trim()}`
        };
        
        try {
            const userCredentials = await signUp(credentials);
            navigate("/");
            // if (userCredentials) {
            //     const user = userCredentials.user;
                
            //     try {
            //         await updateProfile(user, {
            //             displayName: fullName
            //         });

            //         createUserOnBackend({
            //             email,
            //             fullName,
            //             firebaseId: user.uid,
            //         });
            //         navigate("/");
            //     } catch (error) {
            //         if (userCredentials) {
            //             const user = userCredentials.user;
            //             user.delete();
            //             deleteUserOnBackend(user.uid);
            //         }
            //     }
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
                <div className="flex flex-col mb-3">
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
                <div className="flex flex-col w-full mb-3">
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
                <div className="flex flex-col w-full mb-3">
                    <label htmlFor="password2" className="text-secondary">
              Confirm Password
                    </label>
                    <input
                        {...register("password2")}
                        type="password"
                        id="password2"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-primary focus:bg-white focus:outline-none"
                    />
                    {
                        <p className="text-red-500 font-semibold mt-1">
                            {errors.password2?.message}
                        </p>
                    }
                </div>
                <div className="flex space-x-2 mb-3 grow-1">
                    <div className="flex flex-col w-full">
                        <label htmlFor="firstName" className="text-secondary">
                First Name
                        </label>
                        <input
                            {...register("firstName")}
                            type="text"
                            id="firstName"
                            placeholder="Enter First Name"
                            className="px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-primary focus:bg-white focus:outline-none"
                        />
                        {
                            <p className="text-red-500 font-semibold mt-1">
                                {errors.firstName?.message}
                            </p>
                        }
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="lastName" className="text-secondary">
                Last Name
                        </label>
                        <input
                            {...register("lastName")}
                            type="text"
                            id="lastName"
                            placeholder="Enter Last Name"
                            className="px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-primary focus:bg-white focus:outline-none"
                        />
                        {
                            <p className="text-red-500 font-semibold mt-1">
                                {errors.lastName?.message}
                            </p>
                        }
                    </div>
                </div>
                <button className="w-full font-semibold text-sm bg-dark text-white transition hover:bg-opacity-90 rounded-xl py-3 px-4">
            Sign up
                </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            <button
                onClick={signInWithGoogle}
                className="flex w-full items-center justify-center font-semibold text-sm bg-gray-100 text-dark transition-colors hover:bg-gray-200 rounded-xl py-3 px-4 mb-4"
            >
                <FcGoogle className="mr-2 w-6 h-6" />
          Sign in with Google
            </button>
            <p className="text-sm">
          Already have an account?{" "}
                <Link
                    className="font-semibold text-primary transition-colors hover:text-dark"
                    to="/auth/login"
                >
            Sign in
                </Link>
            </p>
        </>
    );
};

export default SignupForm;