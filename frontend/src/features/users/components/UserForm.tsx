import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PreviewImage from "../../../components/Elements/PreviewImage";
import { useUpdateUserMutation } from "../api/updateUser";
import { convertToFormData } from "../../../utils/convertToFormData";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { Spinner } from "../../../components/Elements/Spinner";

const fieldRequiredError = "This field is required.";
const userValidationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(fieldRequiredError),
    firstName: yup.string().required(fieldRequiredError).matches(/^[aA-zZ\s]+$/, "Name can only contain alphabets"),
    lastName: yup.string().required(fieldRequiredError).matches(/^[aA-zZ\s]+$/, "Name can only contain alphabets"),
    image: yup.mixed().nullable(),
});
export type UserFormType = yup.InferType<typeof userValidationSchema>;


const UserForm = () => {
    const { currentUser, signInWithToken, token } = useAuth();
    const [isUpdating, setIsUpdating] = useState(false);

    const { register, handleSubmit, formState: { errors, isDirty }, control, setValue } = useForm<UserFormType>({
        resolver: yupResolver<UserFormType>(userValidationSchema),
        defaultValues: {
            email: currentUser?.email || "",
            firstName: currentUser?.displayName?.split(" ")[0] || "",
            lastName: currentUser?.displayName?.split(" ")[1] || "",
            image: currentUser?.photoURL
        }
    });
    const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>(currentUser?.photoURL);

    const { mutateAsync: updateUserOnBackend } = useUpdateUserMutation(currentUser?.uid || "", token);
    const onSubmit = async (data: UserFormType) => {
        if (isDirty) {
            setIsUpdating(true);
            const fullName = `${data.firstName} ${data.lastName}`;
            const { token } = await updateUserOnBackend(convertToFormData({
                firebaseId: currentUser?.uid,
                email: data.email.trim(),
                fullName,
                avatar: data.image as Blob | string
            }));
            await signInWithToken(token);
            currentUser?.reload();
            setIsUpdating(false);
        }
    };

    return (
        <form className="flex flex-col relative" onSubmit={handleSubmit(onSubmit)}>
            {isUpdating && <Spinner />}
            <div className="mx-auto">
                <PreviewImage
                    control={control}
                    setValue={setValue}
                    error={errors.image?.message as string}
                    context="user"
                    preview={preview}
                    setPreview={setPreview}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label htmlFor="email" className="text-secondary">
            Email
                </label>
                <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className="px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-primary focus:bg-white focus:outline-none"
                />
                {
                    <p className="text-red-500 font-semibold mt-1">
                        {errors.email?.message}
                    </p>
                }
            </div>
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-2 mb-3">
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
          Update profile
            </button>
        </form>
    );
};

export default UserForm;