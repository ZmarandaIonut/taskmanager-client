import { api } from "../emptySplitApi";

export const removeTaskComments = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteTaskComments: builder.mutation({
      query: (id) => ({
        url: `/delete-comment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const { useDeleteTaskCommentsMutation } = removeTaskComments;
