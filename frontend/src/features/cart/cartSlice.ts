import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type CartItem = {
    product: IProduct;
    quantity: number;
}

type State = { cartItems: CartItem[]; }

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    } as State,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const foundProduct = state.cartItems.find(
                cartItem => cartItem.product.id === action.payload.product.id
            );
            if (!foundProduct) {
                state.cartItems.push(action.payload);
            } else {
                foundProduct.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action: PayloadAction<{id: string}>) => {
            state.cartItems = state.cartItems.filter(cartItem => cartItem.product.id !== action.payload.id);
        },
        updateCart: (state, action: PayloadAction<{oldProdId: string; updatedProduct: IProduct}>) => {
            state.cartItems = state.cartItems.map(cartItem => {
                if (cartItem.product.id === action.payload.oldProdId) {
                    cartItem.product = { ...action.payload.updatedProduct };
                }
                return cartItem;
            });
        }
    }
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
