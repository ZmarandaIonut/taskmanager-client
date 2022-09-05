import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./../state/user/user";
import {api} from "./emptySplitApi";

export default configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})