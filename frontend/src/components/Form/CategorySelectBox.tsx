import { FiChevronDown } from "react-icons/fi";
import { useGetAllCategoriesQuery } from "../../features/category";
import { ChangeEvent } from "react";

type Props = {
    selectedCategory?: number;
    handleSelectCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const CategorySelectBox = (props: Props) => {
    const { data: categoryOptions, isSuccess } = useGetAllCategoriesQuery();

    if (!isSuccess) {
        return null;
    }

    return (
        <div className="relative w-full sm:w-32 xl:w-48">
            <select
                id="category"
                className="cursor-pointer outline-none appearance-none w-full border-[1px] border-gray-400 py-3 px-4 rounded-md bg-white text-secondary text-sm"
                value={props.selectedCategory || -1}
                onChange={props.handleSelectCategory}
            >
                <option value={-1} disabled>
            Category
                </option>
                <option value={0}>All</option>
                {categoryOptions.map((category: ICategory) => {
                    return (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    );
                })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="w-5 h-5 text-secondary" />
            </div>
        </div>
    );
};
