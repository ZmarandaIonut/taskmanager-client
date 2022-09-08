import {api} from "../emptySplitApi";

export const getUserArchivedTasks = api.injectEndpoints({
	endpoints: (builder) => ({
        getUserArchivedTasks: builder.query({
            query: (page) => ({
                url: `/get-user-archived-tasks?page=${page}`,
             }),
             providesTags: ["ArchivedTasks"]
        }),
	}),
});

export const {useGetUserArchivedTasksQuery} = getUserArchivedTasks;