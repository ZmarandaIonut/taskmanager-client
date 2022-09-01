import {api} from "../emptySplitApi";

export const resendVerify = api.injectEndpoints({
	endpoints: (builder) => ({
        resendVerifyEmail: builder.mutation({
            query: (payload) => ({
                url: "/resend-verify-email",
                method: "POST",
                body: payload
           })
        }),
	}),
});

export const {useResendVerifyEmailMutation} = resendVerify;