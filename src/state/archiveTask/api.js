import { api } from "../emptySplitApi";

export const archiveTask = api.injectEndpoints({
	endpoints: (builder) => ({
        arctiveTask: builder.mutation({
            query: (id) => ({
                url: `/archive-task/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["Statuses", "ArchivedTasks"]
        }),
	}),
});
export const {useArctiveTaskMutation} = archiveTask;

 