import { api } from "../emptySplitApi";

export const deleteBoard = api.injectEndpoints({
	endpoints: (builder) => ({
        deleteBoard: builder.mutation({
            query: (id) => ({
                url: `/delete-status/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Statuses"]
        }),
	}),
});
export const {useDeleteBoardMutation} = deleteBoard;