import {api} from "../emptySplitApi";

export const register = api.injectEndpoints({
	endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (payload) => ({
                url: '/register',
                method: 'POST',
                body: payload
            })
        }),
	}),
});

export const {useRegisterUserMutation} = register;