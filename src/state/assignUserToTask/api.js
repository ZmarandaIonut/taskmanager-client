import { api } from "../emptySplitApi";

export const assignUser = api.injectEndpoints({
	endpoints: (builder) => ({
        assignUserToTask: builder.mutation({
            query: (payload) => ({
                url: '/assign-task-to-user',
                method: 'POST',
                body: payload
            }),
        }),
	}),
});
export const {useAssignUserToTaskMutation} = assignUser;