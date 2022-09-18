import {api} from "../emptySplitApi";

export const getTaskHistory = api.injectEndpoints({
	endpoints: (builder) => ({
        getTaskHistory: builder.query({
            query: ({id,page}) => ({
                url: `/get-task-history/${id}?page=${page}`,
             }),
             providesTags: ["TaskHistory"]
        }),
	}),
});

export const {useGetTaskHistoryQuery} = getTaskHistory;