import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Control, Controller } from "react-hook-form";
import { MdAddAPhoto } from "react-icons/md";

type Props = {
  control: Control<any>;
  setValue: (name: any, value: any) => void;
  error?: string;
  context?: "user" | "product";
  preview: string | ArrayBuffer | null | undefined;
  setPreview: Dispatch<SetStateAction<string | ArrayBuffer | null | undefined>>
};

const PreviewImage = (props: Props) => {
    const handlePreviewClick = () => {
        props.setPreview(null);
        props.setValue("image", null);
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
        if (e.target.files) {
            onChange(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                props.setPreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            onChange(null);
        }
    };

    return (
        <div className={`shrink-0  ${props.context === "user" ? "w-36 h-36 sm:w-52 sm:h-52" : "w-[350px] h-[430px]"}`}>
            {!props.preview ? (
                <>
                    <label className={`${props.context === "user" ? "rounded-full" : "rounded-md"} cursor-pointer w-full h-full flex items-center flex-col justify-center px-4 py-3 border-gray-200 border focus:border-primary focus:outline-none text-sm hover:bg-gray-100 transition-colors`}>
                        <MdAddAPhoto className="inline-block w-10 h-10 text-secondary" />
                        <p className="text-red-500 font-semibold mt-2">{props.error}</p>
                        <Controller
                            name="image"
                            control={props.control}
                            render={({ field: { onChange } }) => (
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden focus:outline-none"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        handleImageUpload(e, onChange)
                                    }
                                />
                            )}
                        />
                    </label>
                </>
            ) : (
                <img
                    className={`h-full w-full cursor-pointer object-cover ${props.context === "user" ? "rounded-[50%]" : "rounded-md"}`}
                    src={props.preview as string}
                    onClick={handlePreviewClick}
                />
            )}
        </div>
    );
};

export default PreviewImage;
