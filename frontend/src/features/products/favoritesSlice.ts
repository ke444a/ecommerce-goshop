import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type State = { products: IProduct[]; }

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        products: []
    } as State,
    reducers: {
        addFavorite: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<{id: string}>) => {
            state.products = state.products.filter(favorite => favorite.id !== action.payload.id);
        },
        updateFavorite: (state, action: PayloadAction<{oldId: string; updatedProduct: IProduct}>) => {
            state.products = state.products.map(favorite => {
                if (favorite.id === action.payload.oldId) {
                    favorite = { ...action.payload.updatedProduct };   
                }
                return favorite;
            });
        }
    }
});

export const selectFavorites = (state: RootState) => state.favorites.products;
export const { addFavorite, removeFavorite, updateFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
