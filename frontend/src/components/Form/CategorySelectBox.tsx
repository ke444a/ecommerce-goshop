import { FiChevronDown } from "react-icons/fi";
import { useGetAllCategoriesQuery } from "../../features/category";
import { ChangeEvent } from "react";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";


// const CategorySelectBox = () => {
//     const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

//     return (
//         <div>
//             <div className="flex justify-between items-center py-3 border-b-[1px] border-gray-300">
//                 <h5 className="font-semibold text-xl">Category</h5>
//                 {
//                     isCategoryOpen ? 
//                         <AiOutlineMinus className="cursor-pointer" onClick={() => setIsCategoryOpen(prevState => !prevState)} /> : <AiOutlinePlus className="cursor-pointer" onClick={() => setIsCategoryOpen(prevState => !prevState)} />
//                 }
//             </div>
//             {isCategoryOpen && 
//                 <div className="mt-2">
//                     {featuresList.map((feature: string, index: number) => {
//                         return (
//                             <div key={index} className="flex items-center p-2">
//                                 <input
//                                     key={index}
//                                     type="checkbox"
//                                     value=""
//                                     className="relative appearance-none rounded checked:bg-dark checked:text-white checked:before:content-['\2713'] checked:before:absolute checked:before:bottom-2.5 checked:before:translate-y-1/2 checked:before:-translate-x-1/2 checked:before:left-2.5 border-gray-300 border-[1px] h-5 w-5 mr-2.5"
//                                 />
//                                 <label
//                                     className="text-lg text-secondary"
//                                     key={index}
//                                 >
//                               Features
//                                 </label>
//                             </div>
//                         );
//                     })}
//                 </div>
//             }

//         </div>
//     );
// };

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
