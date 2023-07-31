import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  searchQuery: string;
  handleSearchQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBox = (props: Props) => {
    return (
        <div className="relative mr-0 sm:mr-8 w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <FiSearch className="w-6 h-6 text-secondary" />
            </div>
            <input 
                id="search"
                type="text"
                placeholder="Search for products..."
                className="w-full md:w-64 xl:w-80 px-4 py-3 pl-10 rounded-lg bg-gray-200 border focus:border-primary focus:bg-white focus:outline-none" 
                value={props.searchQuery}
                onChange={props.handleSearchQueryChange}
            />
        </div>
    );
};
