// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "../slices/authSlice";
// import customerReducer from "../slices/customerSlice";
import productReducer from "../slices/productSlice";
// import metaReducer from "../slices/metaSlice";
import categoryReducer from "../slices/createCategory";
import brandReducer from "../slices/createBrand";
import deviceReducer from "../slices/deviceSlice";
// import taxReducer from "../slices/taxSlice";
// import problemReducer from '../slices/problemSlice';
// import shopReducer from '../slices/shopSlice';
// import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // userprofile: userReducer,
    // customer: customerReducer,
    product: productReducer,
    // meta: metaReducer,
    categories: categoryReducer,
    brands: brandReducer,
    // tax: taxReducer,
    devices: deviceReducer,
    // problems:problemReducer,
    // shop: shopReducer
  },
});

export default store;
