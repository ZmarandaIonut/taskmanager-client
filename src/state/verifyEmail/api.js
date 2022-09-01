import {api} from "../emptySplitApi";

export const verify = api.injectEndpoints({
	endpoints: (builder) => ({
        verifyEmail: builder.mutation({
            query: (payload) => ({
                url: "/verify-email",
                method: "POST",
                body: payload
            })
        }),
	}),
});

export const {useVerifyEmailMutation} = verify;