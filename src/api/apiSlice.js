import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
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
        })
    }),
  })

  export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyEmailMutation,
    useResendVerifyEmailMutation
  } = apiSlice;