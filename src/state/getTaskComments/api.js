import {api} from "../emptySplitApi";

export const taskComments = api.injectEndpoints({
	endpoints: (builder) => ({
         getTaskComments: builder.query({
             query: ({id, page = 1}) => ({
                url: `get-comments/${id}?page=${page}`
             }),
             providesTags: ["taskComments"]
         }),
	}),
});

export const {useGetTaskCommentsQuery} = taskComments;