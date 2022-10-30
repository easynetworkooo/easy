import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserProfile } from "../models/IUserProfile";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://easy-micro.ru',
        prepareHeaders: (headers) => {
            if (localStorage.getItem('auth')) {
                headers.set("Authorization", `${localStorage.getItem('auth')}`)
            }
            return headers
        }
    }),

    endpoints: (build) => ({
        fetchUserProfile: build.mutation<IUserProfile, string>({
            query: () => ({
                url: '/getProfile',
                method: 'GET'
            })
        }),
    })
})