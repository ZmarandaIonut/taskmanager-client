import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL, prepareHeaders: (headers, {getState}) => {
        const token = sessionStorage.getItem("token");
        if(token){
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    } }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: payload
            })
        }),
        registerUser: builder.mutation({
            query: (payload) => ({
                url: "/register",
                method: "POST",
                body: payload
            })
        }),
        verifyEmail: builder.mutation({
            query: (payload) => ({
                url: "/verify-email",
                method: "POST",
                body: payload
            })
        }),
        resendVerifyEmail: builder.mutation({
            query: (payload) => ({
                 url: "/resend-verify-email",
                 method: "POST",
                 body: payload
            })
        }),
        getUserBoards: builder.query({
            query: (page = 1) => `/get-user-boards?page=${page}`
        }),
        getBoardsWhereUserIsMember: builder.query({
            query: (page = 1) => `/get-joined-boards?page=${page}`
        }),
    }),
  })

  export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyEmailMutation,
    useGetUserBoardsQuery,
    useGetBoardsWhereUserIsMemberQuery,
    useResendVerifyEmailMutation
  } = apiSlice;