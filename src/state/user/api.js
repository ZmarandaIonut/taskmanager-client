import {api} from "../emptySplitApi";

export const user = api.injectEndpoints({
	endpoints: (builder) => ({
         getAuthUser: builder.query({
             query: () => `/user`,
         }),
	}),
});

export const {useGetAuthUserQuery, useLazyGetAuthUserQuery} = user;