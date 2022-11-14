import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserProfile } from "../models/IUserProfile";
import { IUser, IUserValue } from "../models/IUser";
import { IDialog } from "../models/IDialog";
import { serverURL } from "../constants/serverURL";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
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
        setMainAvatar: build.mutation<any, any>({
            query: (avatarImage) => ({
                url: '/setMainPhoto',
                method: 'POST',
                body: avatarImage
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
        fetchGetUserByNickname: build.query<IUser, string>({
            query: (nickname: string) => ({
                url: '/getUserByNickname',
                method: 'GET',
                params: {
                    nickname: nickname
                }
            }),
            providesTags: ['user']
        }),
        fetchGetSubscribers: build.query<{status: number, value: IUserValue[]}, {id: number, page: number}>({
            query: ({id, page}) => ({
                url: '/getSubscribers',
                method: 'GET',
                params: {
                    id: id,
                    page: page
                }
            }),
            providesTags: ['user']
        }),
        fetchGetSubscriptions: build.query<{status: number, value: IUserValue[]}, {id: number, page: number}>({
            query: ({id, page}) => ({
                url: '/getSubscriptions',
                method: 'GET',
                params: {
                    id: id,
                    page: page
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
        fetchGetDialogs: build.query<IDialog, { page: number }>({
            query: (dialogsCredentials) => ({
                url: '/getDialogs',
                method: 'POST',
                body: dialogsCredentials
            }),
        }),
        fetchGetMessages: build.mutation<any, {id: number, page: number}>({
            query: (messagesCredentials) => ({
                url: '/getMessages',
                method: 'POST',
                body: messagesCredentials
            }),
        }),
    })
})