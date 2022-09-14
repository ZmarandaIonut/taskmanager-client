import {api} from "../emptySplitApi";

export const change = api.injectEndpoints({
	endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (payload) => ({
                url: "/reset-password",
                method: "POST",
                body: payload
            })
        }),
	}),
});

export const {useChangePasswordMutation} = change;