import {api} from "../emptySplitApi";

export const checkUserNotifications = api.injectEndpoints({
	endpoints: (builder) => ({
         checkUserNotifications: builder.query({
             query: () => `/has-user-unseen-notifications`,
             providesTags: ["CheckNotifications"],
             async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled
                 if(data.data.data && window.location.pathname === '/user-notifications') {
                   dispatch(api.endpoints.getUserNotifications.initiate(1, {forceRefetch:true}));
                 }
                } catch {}
              },
         }),
         
	}),
});

export const {useCheckUserNotificationsQuery, useLazyCheckUserNotificationsQuery} = checkUserNotifications;