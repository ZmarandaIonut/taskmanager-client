import { api } from "../emptySplitApi";

export const status = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewStatus: builder.mutation({
      query: (payload) => ({
        url: "/create-status",
        method: "POST",
        body: payload,
      }),
      //        invalidatesTags: ["Statuses"]
    }),
  }),
});
export const { useCreateNewStatusMutation } = status;
