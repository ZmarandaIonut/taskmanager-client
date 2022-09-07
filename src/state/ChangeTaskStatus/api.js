import { api } from "../emptySplitApi";

export const taskStatus = api.injectEndpoints({
	endpoints: (builder) => ({
        changeTaskStatus: builder.mutation({
            query: (payload) => ({
                url: '/change-task-status',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["Statuses"]
        }),
	}),
});
export const {useChangeTaskStatusMutation} = taskStatus;