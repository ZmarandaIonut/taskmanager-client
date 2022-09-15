import { api } from "../emptySplitApi";

export const createComment = api.injectEndpoints({
	endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (payload) => ({
                url: '/create-comment',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["taskComments"]
        }),
	}),
});
export const {useCreateCommentMutation} = createComment;