import {api} from "../emptySplitApi";

export const joinBoard = api.injectEndpoints({
	endpoints: (builder) => ({
        joinBoard: builder.mutation({
            query: (payload) => ({
                url: "/accept-board-invite",
                method: "POST",
                body: payload
           })
        }),
	}),
});

export const {useJoinBoardMutation} = joinBoard;