import { useSelector } from "react-redux";
import { selectCartItems } from "../cartSlice";
import { ProductQuantitySelectBox } from "../../../components/Form";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { ChangeEvent } from "react";
import { FcCheckmark } from "react-icons/fc";
import { addToCart, removeFromCart } from "../cartSlice";
import { useMemo } from "react";

type Props = {
    context?: "cart" | "checkout";
}

const CartProductsList = (props: Props) => {
    const cartItems = useSelector(selectCartItems);
    const cartItemsView = useMemo(() => {
        return cartItems.map((cartItem) => (
            <CartProductView key={cartItem.product.id} {...cartItem} {...props} />
        ));
    }, [cartItems]);

    return (
        <div className={`flex flex-col space-y-5 w-full ${props.context === "cart" ? "mr-0 md:mr-5" : "max-h-[400px]"} overflow-y-auto`}>
            {cartItemsView}
        </div>
    );
};


type CartItemProp = {
  product: IProduct;
  quantity: number;
  context?: "cart" | "checkout";
};

const CartProductView = (props: CartItemProp) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = Number(e.target.value);
        dispatch(addToCart({ product: props.product, quantity: newQuantity }));
    };

    const handleProductRemove = () => {
        dispatch(removeFromCart({ id: props.product.id }));
    };

    return (
        <div className="flex h-fit">
            <Link
                className={`mr-2 sm:mr-6 md:mr-8 shrink-0 ${
                    props.context === "cart" ? "w-36 sm:w-48 2xl:w-60" : "w-36 2xl:w-40"
                }`}
                to="/"
            >
                <img
                    className={`w-full ${
                        props.context === "cart" ? "sm:h-48 2xl:h-60" : "h-36 2xl:h-40"
                    } rounded-xl object-cover`}
                    src={props.product.image as string}
                    alt="Product image"
                />
            </Link>
            <div className="relative w-full">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center w-full mb-1">
                        <h5 className="font-semibold text-lg mr-2 xs:mr-0 sm:text-xl">
                            {props.product.name}
                        </h5>
                        {props.context === "cart" && (
                            <button onClick={handleProductRemove}>
                                <RxCross1 className="w-4 h-4 xs:w-5 xs:h-5" />
                            </button>
                        )}
                    </div>
                    {/* <p className="text-secondary mb-1">{props.product.category}</p> */}
                    <h5 className="font-semibold text-lg sm:text-xl mb-3 lg:mb-0">
              ${props.product.price}
                    </h5>
                    {props.context === "cart" && (
                        <ProductQuantitySelectBox
                            quantity={props.quantity}
                            handleQuantityChange={handleQuantityChange}
                            stockQuantity={props.product.stockQuantity}
                        />
                    )}
                </div>

                {props.context === "cart" && (
                    <div className="absolute bottom-0 left-0 text-secondary">
                        {props.product.stockQuantity > 0 ? (
                            <p className="flex items-center">
                                <FcCheckmark className="mr-1 w-5 h-5" />
                  In Stock
                            </p>
                        ) : (
                            <p className="flex items-center">
                                <RxCross1 className="mr-1 w-5 h-5 text-red-500" />
                  Out of Stock
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default CartProductsList;