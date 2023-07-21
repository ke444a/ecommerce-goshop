import { ChangeEvent } from "react";

type Props = {
    quantity: number;
    handleQuantityChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    stockQuantity: number;
}

export const ProductQuantitySelectBox = (props: Props) => {
    const selectOptions = [1, 2, 3, 4, 5].filter((value) => value <= props.stockQuantity);


    return (
        <div className="relative after:w-2 after:h-2 after:inline-block after:rotate-45 after:border-secondary after:border-r-2 after:border-b-2 after:pointer-events-none after:absolute after:top-1/2 after:sm:right-4 after:right-2 after:-translate-y-1/2 w-12 sm:w-20">
            <select
                id="quantity"
                name="quantity"
                className="cursor-pointer text-sm outline-none appearance-none w-full border-[1px] border-gray-400 py-3 px-2 sm:px-4 rounded-md bg-white"
                value={props.quantity}
                onChange={props.handleQuantityChange}
            >
                {selectOptions.map((option: number, index: number) => {
                    return (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
