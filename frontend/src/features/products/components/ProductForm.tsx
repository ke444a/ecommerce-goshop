import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PreviewImage from "../../../components/Elements/PreviewImage";
import { useState } from "react";

type Props = {
  product?: IProduct;
  categoryName?: string;
  onFormSubmit: (data: ProductFormType, preview: string) => void;
};

const fieldRequiredError = "This field is required.";
const productValidationSchema = yup.object().shape({
    name: yup.string().required(fieldRequiredError),
    description: yup.string().required(fieldRequiredError),
    price: yup.number().required(fieldRequiredError).positive(),
    stockQuantity: yup.number().required(fieldRequiredError).positive().integer(),
    category: yup.string().required(fieldRequiredError),
    image: yup.mixed().required(fieldRequiredError),
});
export type ProductFormType = yup.InferType<typeof productValidationSchema>;

const ProductForm = (props: Props) => {
    const { register, handleSubmit, formState: { errors },control, setValue } = useForm<ProductFormType>({
        resolver: yupResolver(productValidationSchema),
        defaultValues: {
            category: props.categoryName, 
            ...props.product
        }
    });
    const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>(props.product?.image as string);

    const onSubmit = (data: ProductFormType) => props.onFormSubmit(data, preview as string);

    return (
        <div className="flex items-center">
            <PreviewImage
                control={control}
                setValue={setValue}
                error={errors.image?.message}
                preview={preview}
                setPreview={setPreview}
            />
            <form
                className="flex flex-col pl-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col mb-3">
                    <label htmlFor="productName" className="text-dark text-sm">
              Product Name
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        id="productName"
                        placeholder="Name the product"
                        className="px-4 py-3 rounded-lg mt-1 border border-gray-200 focus:border-primary focus:bg-white focus:outline-none placeholder:text-sm"
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="productDescription" className="text-dark text-sm">
              Description
                    </label>
                    <textarea
                        {...register("description")}
                        id="productDescription"
                        placeholder="Describe the product"
                        className="px-4 py-3 rounded-lg mt-1 border border-gray-200 focus:border-primary focus:outline-none placeholder:text-sm whitespace-pre-line"
                    />
                </div>
                <div className="flex mb-3">
                    <div className="flex flex-col mr-1 w-full">
                        <label htmlFor="productPrice" className="text-dark text-sm">
                Price
                        </label>
                        <input
                            {...register("price")}
                            type="number"
                            step={0.01}
                            id="productPrice"
                            placeholder="Enter the price"
                            className="px-4 py-3 rounded-lg mt-1 border border-gray-200 focus:border-primary focus:outline-none placeholder:text-sm"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="productStockQuantity"
                            className="text-dark text-sm"
                        >
                Stock quantity
                        </label>
                        <input
                            {...register("stockQuantity")}
                            type="number"
                            id="productStockQuantity"
                            placeholder="Enter the stock quantity"
                            className="px-4 py-3 rounded-lg mt-1 border border-gray-200 focus:border-primary focus:outline-none placeholder:text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="productCategory" className="text-dark text-sm">
              Category
                    </label>
                    <input
                        {...register("category")}
                        type="text"
                        id="productCategory"
                        placeholder="Enter the product category"
                        className="px-4 py-3 rounded-lg mt-1 border border-gray-200 focus:border-primary focus:outline-none placeholder:text-sm"
                    />
                </div>
                <button 
                    id="submitProductForm"
                    className="px-4 py-2 text-sm block rounded-lg bg-primary text-white mt-3 hover:bg-primary-hover transition-colors focus:outline-none hover:bg-opacity-90"
                >
                    {props.product ? "Edit" : "Add"} product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;