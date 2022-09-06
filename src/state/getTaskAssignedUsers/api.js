import {api} from "../emptySplitApi";

export const taskAssigned = api.injectEndpoints({
	endpoints: (builder) => ({
         getTaskAssigned: builder.query({
             query: ({id, page = 1}) => ({
                url: `get-task-assigned-users/${id}?page=${page}`
             }),
             providesTags: ["assignedUsers"]
         }),
	}),
});

export const {useGetTaskAssignedQuery} = taskAssigned;