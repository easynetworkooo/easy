import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserProfile } from "../models/IUserProfile";
import { IUser } from "../models/IUser";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://easy-micro.ru',
        prepareHeaders: (headers) => {
            if (localStorage.getItem('auth')) {
                headers.set("Authorization", `${localStorage.getItem('auth')}`)
            }
            return headers
        }
    }),

    tagTypes: ['user'],

    endpoints: (build) => ({
        fetchUserProfile: build.mutation<IUserProfile, string>({
            query: () => ({
                url: '/getProfile',
                method: 'GET'
            })
        }),
        fetchGetUser: build.query<IUser, string>({
            query: (userId: string) => ({
                url: '/getUser',
                method: 'GET',
                params: {
                    id: userId
                }
            }),
            providesTags: ['user']
        }),
        subscribeToUser: build.mutation<any, {id: number}>({
            query: (subscribeToUserId) => ({
                url: '/subscribe',
                method: 'POST',
                body: subscribeToUserId
            }),
            invalidatesTags: ['user']
        }),
        unSubscribeToUser: build.mutation<any, {id: number}>({
            query: (subscribeToUserId) => ({
                url: '/unsubscribe',
                method: 'POST',
                body: subscribeToUserId
            }),
            invalidatesTags: ['user']
        }),
    })
})