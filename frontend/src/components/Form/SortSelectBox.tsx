import { BiSortAlt2 } from "react-icons/bi";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  sortOption: string;
  setSortOption: Dispatch<
    SetStateAction<"PRICE_ASC" | "PRICE_DESC" | "DEFAULT">
  >;
};

export const SortSelectBox = (props: Props) => {
    const sortOptions = [
        {name: "Price: Low to high", value: "PRICE_ASC"},
        {name: "Price: High to low", value: "PRICE_DESC"},
        {name: "Newest", value: "DEFAULT" }
    ];

    return (
        <div className="relative w-full sm:w-32 xl:w-48">
            <select
                id="sorting"
                className="cursor-pointer outline-none appearance-none w-full border-[1px] border-gray-400 py-3 px-4 rounded-md bg-white pr-8 sm:pr-14 text-secondary text-sm"
                value={props.sortOption}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    props.setSortOption(event.target.value as "PRICE_ASC" | "PRICE_DESC" | "DEFAULT")
                }
            >
                {sortOptions.map((option, index: number) => {
                    return (
                        <option key={index} value={option.value}>
                            {option.name}
                        </option>
                    );
                })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <BiSortAlt2 className="w-5 h-5 text-secondary" />
            </div>
        </div>
    );
};
