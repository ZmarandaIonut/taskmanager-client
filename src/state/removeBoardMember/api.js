import { api } from "../emptySplitApi";

export const removeMemberFromBoard = api.injectEndpoints({
	endpoints: (builder) => ({
        removeMemberFromBoard: builder.mutation({
            query: ({id, member_id}) => ({
                url: `/remove-member-from-board/${id}`,
                method: 'DELETE',
                body: {member_id: member_id}
            }),
            invalidatesTags: ["BoardMembers"]
        }),
	}),
});
export const {useRemoveMemberFromBoardMutation} = removeMemberFromBoard;