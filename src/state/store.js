import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./../state/user/user";
import TaskPanelReducer from "./Reducers/displayTaskPanel/displayTaskPanel";
import {api} from "./emptySplitApi";

export default configureStore({
    reducer: {
        user: userReducer,
        taskPanel: TaskPanelReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})