import { api } from "../emptySplitApi";

export const task = api.injectEndpoints({
	endpoints: (builder) => ({
        createNewTask: builder.mutation({
            query: (payload) => ({
                url: '/create-task',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["Statuses"]
        }),
	}),
});
export const {useCreateNewTaskMutation} = task;