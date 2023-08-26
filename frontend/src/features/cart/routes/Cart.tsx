import Navbar from "../../../components/Elements/Navbar";
import { useSelector } from "react-redux";
import { selectCartItems } from "../cartSlice";
import { useMemo } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import CheckoutTotalPrice from "../components/CheckoutTotalPrice";
import CartProductsList from "../components/CartProductsList";
import { getStripe } from "../../../utils/getStripe";
import { useCreateCheckoutSessionMutation } from "../../checkout/api/createCheckoutSession";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { currentUser, token } = useAuth();
    const cartItems = useSelector(selectCartItems);
    const cartTotalPrice = useMemo(() => {
        return Number(
            cartItems
                .reduce((accumulator, currentValue) => {
                    return (
                        accumulator + currentValue.quantity * currentValue.product.price
                    );
                }, 0)
                .toFixed(2)
        );
    }, [cartItems]);

    const { mutateAsync: createCheckout } = useCreateCheckoutSessionMutation(token);
    const handleCheckout = async () => {
        const lineItems = cartItems.map((cartItem) => ({
            price: cartItem.product.priceId,
            quantity: cartItem.quantity,
        }));
        const sessionData = {
            lineItems,
            userId: currentUser?.uid || "",
        };

        const { sessionId } = await createCheckout(sessionData);
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
    };

    return (
        <div className="container">
            <Navbar />
            <h3 className="font-semibold text-3xl mb-8">Shopping Cart</h3>
            <div className="flex flex-col md:flex-row items-start">
                <CartProductsList context="cart" />
                { cartItems.length > 0 &&
                <>
                    <hr className="my-8 bg-customGradient h-px w-full block md:hidden" />
                    <CheckoutTotalPrice amount={cartTotalPrice}>
                        <>
                            <button
                                className="mt-4 mb-2 text-white rounded-md w-full text-center py-3 text-sm transition hover:bg-opacity-90 font-semibold bg-primary"
                                onClick={handleCheckout}
                            >
              Checkout
                            </button>
                            <Link to="/products/shop" className="flex font-medium hover:underline items-center">
                                <span className="mr-2">Continue shopping</span>
                                <FaArrowRightLong />
                            </Link>
                        </>
                    </CheckoutTotalPrice>
                </>}
            </div>
        </div>
    );
};

export default Cart;
