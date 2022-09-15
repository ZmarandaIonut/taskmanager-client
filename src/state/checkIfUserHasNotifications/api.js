import {api} from "../emptySplitApi";

export const checkUserNotifications = api.injectEndpoints({
	endpoints: (builder) => ({
         checkUserNotifications: builder.query({
             query: () => `/has-user-unseen-notifications`,
             providesTags: ["CheckNotifications"]
         }),
         
	}),
});

export const {useCheckUserNotificationsQuery, useLazyCheckUserNotificationsQuery} = checkUserNotifications;