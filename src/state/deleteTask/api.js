import { api } from "../emptySplitApi";

export const deleteTask = api.injectEndpoints({
	endpoints: (builder) => ({
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/delete-task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Statuses"]
        }),
	}),
});
export const {useDeleteTaskMutation} = deleteTask;