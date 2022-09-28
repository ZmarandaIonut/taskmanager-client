import { api } from "../emptySplitApi";

export const user = api.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: () => `/user`,
    }),
    getUserByID: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["UserProfile"],
    }),
    uploadImageProfile: builder.mutation({
      query: (payload) => ({
        url: "/upload-profile-image",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useLazyGetAuthUserQuery,
  useGetUserByIDQuery,
  useUploadImageProfileMutation,
} = user;
