import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./../state/user/user";
import TaskPanelReducer from "./Reducers/displayTaskPanel/displayTaskPanel";
import BoardMemberInvitePanel from "./Reducers/displayInviteUserPanel/displayInviteUserPanel"
import {api} from "./emptySplitApi";

export default configureStore({
    reducer: {
        user: userReducer,
        taskPanel: TaskPanelReducer,
        inviteBoardMembers: BoardMemberInvitePanel,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})