import { api } from "../emptySplitApi";

export const boardInvite = api.injectEndpoints({
	endpoints: (builder) => ({
        sendBoardInvite: builder.mutation({
            query: (payload) => ({
                url: '/send-invite',
                method: 'POST',
                body: payload
            }),
        }),
	}),
});
export const {useSendBoardInviteMutation} = boardInvite;