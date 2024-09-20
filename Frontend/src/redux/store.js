import { configureStore } from "@reduxjs/toolkit";
import purchaseReducer from "./counter/purchaseSlice";
import cartReducer from "./counter/cartSlice";
import emailReducer from "./counter/transferEmailSlice";
import buyComVisReducer from "./counter/buyComVisSlice"

export const store = configureStore({
  reducer: {
    boughtItem: purchaseReducer,
    cartItems: cartReducer,
    email: emailReducer,
    detailVis: buyComVisReducer,
  },
});
