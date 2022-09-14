import { api } from "../emptySplitApi";

export const deleteNotification = api.injectEndpoints({
	endpoints: (builder) => ({
        deleteNotifiaction: builder.mutation({
            query: (id) => ({
                url: `/delete-notification/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["UserNotifications", "CheckNotifications"]
        }),
	}),
});
export const {useDeleteNotifiactionMutation} = deleteNotification;