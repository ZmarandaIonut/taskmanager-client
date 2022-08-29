import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import { apiSlice } from "../api/apiSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})