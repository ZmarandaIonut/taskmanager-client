import { api } from "../emptySplitApi";

export const memberRole = api.injectEndpoints({
	endpoints: (builder) => ({
        changeBoardMemberRole: builder.mutation({
            query: (payload) => ({
                url: '/change-boardmember-role',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ["BoardMembers"]
        }),
	}),
});
export const {useChangeBoardMemberRoleMutation} = memberRole;