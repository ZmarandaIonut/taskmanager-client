import { api } from "../emptySplitApi";

export const archiveBoard = api.injectEndpoints({
	endpoints: (builder) => ({
        archiveBoard: builder.mutation({
            query: (id) => ({
                url: `/archive-board/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["Samples", "ArchivedBoards"]
        }),
	}),
});
export const {useArchiveBoardMutation} = archiveBoard;