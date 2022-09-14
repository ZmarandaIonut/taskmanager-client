import {api} from "../emptySplitApi";

export const forgot = api.injectEndpoints({
	endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (payload) => ({
                url: "/forgot-password",
                method: "POST",
                body: payload
            })
        }),
	}),
});

export const {useForgotPasswordMutation} = forgot;