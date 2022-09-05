import {api} from "../emptySplitApi";

export const board = api.injectEndpoints({
	endpoints: (builder) => ({
         getBoard: builder.query({
             query: (slug) => ({
                url: `/board/${slug}`
             }),
             providesTags: ["Statuses"]
         }),
	}),
});

export const {useGetBoardQuery, useLazyGetBoardQuery} = board;