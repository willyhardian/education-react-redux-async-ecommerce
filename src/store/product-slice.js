import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        items: [],
    },
    reducers: {
        productsSuccess: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.items = [...action.payload];
        },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
    },
});

// Action creators are generated for each case reducer function
export const { productsSuccess } = productSlice.actions;

export function fetchProducts() {
    return async (dispatch) => {
        console.log("nahhaaa");
        const response = await axios.get(
            import.meta.env.VITE_BASE_URL + "/products?category=3",
            {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
            }
        );
        const products = response.data.rows;
        console.log(products, "<<<<<< proudcts dari action");
        dispatch(productsSuccess(products));
    };
    // setProducts(products);
}

export default productSlice.reducer;
