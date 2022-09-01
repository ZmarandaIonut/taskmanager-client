import {api} from "../emptySplitApi";

export const boards = api.injectEndpoints({
	endpoints: (builder) => ({
         getUserBoards: builder.query({
             query: (page = 1) => `/get-user-boards?page=${page}`,
             providesTags: ["Samples"]
         }),
         getBoardsWhereUserIsMember: builder.query({
             query: (page = 1) => `/get-joined-boards?page=${page}`
        }),
        createBoard: builder.mutation({
            query: (payload) => ({
                url: '/create-board',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["Samples"]
        })
	}),
});

export const {useGetUserBoardsQuery, useGetBoardsWhereUserIsMemberQuery, useCreateBoardMutation} = boards;