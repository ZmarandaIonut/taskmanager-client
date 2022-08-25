import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
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
        })
    }),
  })

  export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyEmailMutation
  } = apiSlice;