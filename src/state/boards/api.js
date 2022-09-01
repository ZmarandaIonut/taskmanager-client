import {api} from "../emptySplitApi";

export const boards = api.injectEndpoints({
	endpoints: (builder) => ({
         getUserBoards: builder.query({
             query: (page = 1) => `/get-user-boards?page=${page}`
         }),
         getBoardsWhereUserIsMember: builder.query({
             query: (page = 1) => `/get-joined-boards?page=${page}`
        }),
	}),
});

export const {useGetUserBoardsQuery, useGetBoardsWhereUserIsMemberQuery} = boards;