import { api } from "../emptySplitApi";

export const login = api.injectEndpoints({
	endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: payload
            })
        }),
	}),
});
export const {useLoginUserMutation} = login;