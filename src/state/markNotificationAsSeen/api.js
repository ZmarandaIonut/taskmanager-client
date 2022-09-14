import { api } from "../emptySplitApi";

export const markNotificationAsSeen = api.injectEndpoints({
	endpoints: (builder) => ({
        markNotificationAsSeen: builder.mutation({
            query: (payload) => ({
                url: '/mark-notification-as-seen',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ["UserNotifications" , "CheckNotifications"]
        }),
	}),
});
export const {useMarkNotificationAsSeenMutation} = markNotificationAsSeen;