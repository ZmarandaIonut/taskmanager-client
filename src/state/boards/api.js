import {api} from "../emptySplitApi";

export const boards = api.injectEndpoints({
	endpoints: (builder) => ({
         getUserBoards: builder.query({
             query: (page = 1) => `/get-user-boards?page=${page}`,
             providesTags: ["Samples"]
         }),
         getUserArchivedBoards: builder.query({
            query: (page = 1) => `/get-user-archived-boards?page=${page}`,
            providesTags: ["ArchivedBoards"]
        }),
         getBoardsWhereUserIsMember: builder.query({
             query: (page = 1) => `/get-joined-boards?page=${page}`,
             providesTags: ["JoinedBoards"]
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

export const {useGetUserBoardsQuery, useGetUserArchivedBoardsQuery, useGetBoardsWhereUserIsMemberQuery, useCreateBoardMutation} = boards;