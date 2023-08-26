import { SearchBox } from "../../../components/Form";
import { CategorySelectBox } from "../../../components/Form";
import { SortSelectBox } from "../../../components/Form";
import { useState, ChangeEvent, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchProductMutation } from "../api/searchProduct";
import { useGetAllProductsQuery } from "../api/getAllProducts";
import { useGetProductsByCategoryQuery } from "../api/getProductsByCategory";
import { sortProductsByPriceAscending, sortProductsByPriceDescending } from "../../../utils/sortProductsByDate";
import { ProductPreview } from "./ProductPreview";
import { AdminProductPreview } from "./AdminProductPreview";
import { Spinner } from "../../../components/Elements/Spinner";

type Props = {
    isAdmin?: boolean;
}

const ProductsDashboard = (props: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [sortOption, setSortOption] = useState<"PRICE_ASC" | "PRICE_DESC" | "DEFAULT">("DEFAULT");

    const { mutate, data: searchResults } = useSearchProductMutation();
    const debouncedSearch = useDebounce(() => {
        mutate(searchQuery);
    }, 500);

    const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        debouncedSearch();
    };

    const handleSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(Number(event.target.value));

    return (
        <>
            <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between space-y-4 sm:space-y-0 mb-8">
                <SearchBox
                    searchQuery={searchQuery}
                    handleSearchQueryChange={handleSearchQueryChange}
                />
                <div className="flex items-center space-x-2 w-full sm:w-fit">
                    <CategorySelectBox
                        selectedCategory={selectedCategory}
                        handleSelectCategory={handleSelectCategory}
                    />
                    <SortSelectBox
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                    />
                </div>
            </div>
            <ProductsGrid
                isAdmin={props.isAdmin}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                searchResults={searchResults}
                sortOption={sortOption}
            />
        </>
    );
};

type ProductsGridProps = {
    selectedCategory?: number;
    searchQuery?: string;
    sortOption: "PRICE_ASC" | "PRICE_DESC" | "DEFAULT";
    searchResults?: IProduct[];
    isAdmin?: boolean;
}

const ProductsGrid = (props: ProductsGridProps) => {
    const allProductsQuery = useGetAllProductsQuery();
    const filteredProductsQuery = useGetProductsByCategoryQuery(props.selectedCategory);

    const productsComponent = useMemo(() => {
        let products = null;
        
        if (!allProductsQuery.data) {
            return products;
        }

        products = [...allProductsQuery.data];
        if (props.searchResults && props.searchQuery !== "") {
            products = [...props.searchResults];
        }

        if (props.selectedCategory && props.selectedCategory !== 0 && filteredProductsQuery.data) {
            if (props.searchResults && props.searchQuery !== "") {
                products = products.filter((product: IProduct) => {
                    return filteredProductsQuery.data?.some((filteredProduct: IProduct) => filteredProduct.id === product.id);
                });
            } else {
                products = [...filteredProductsQuery.data];
            }
        }

        if (props.sortOption === "PRICE_ASC") {
            sortProductsByPriceAscending(products);
        } else if (props.sortOption === "PRICE_DESC") {
            sortProductsByPriceDescending(products);
        }

        return products.map((product: IProduct) => {
            return props.isAdmin ? 
                <AdminProductPreview key={product.id} {...product} /> :
                <ProductPreview key={product.id} {...product} />;
        });
    }, [allProductsQuery.data, filteredProductsQuery.data, props.searchResults, props.selectedCategory, props.sortOption]);

    if (allProductsQuery.isLoading) {
        return <Spinner />;
    }

    if (!allProductsQuery.isSuccess) {
        return null;
    }

    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${props.isAdmin ? "py-8 border-gray-500 border-t border-b" : ""}`}>
            {productsComponent}
        </div>
    );
};

export default ProductsDashboard;