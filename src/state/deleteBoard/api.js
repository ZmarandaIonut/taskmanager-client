import { api } from "../emptySplitApi";

export const deleteUserBoard = api.injectEndpoints({
	endpoints: (builder) => ({
        deleteUserBoard: builder.mutation({
            query: (id) => ({
                url: `/delete-board/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Samples", "ArchivedBoards"]
        }),
	}),
});
export const {useDeleteUserBoardMutation} = deleteUserBoard;