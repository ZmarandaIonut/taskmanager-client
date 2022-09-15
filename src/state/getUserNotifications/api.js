import {api} from "../emptySplitApi";

export const getUserNotifications = api.injectEndpoints({
	endpoints: (builder) => ({
        getUserNotifications: builder.query({
            query: (page = 1) => ({
                url: `/get-user-notifications?page=${page}`,
             }),
             providesTags: ["UserNotifications"]
        }),
	}),
});

export const {useGetUserNotificationsQuery, useLazyGetUserNotificationsQuery} = getUserNotifications;