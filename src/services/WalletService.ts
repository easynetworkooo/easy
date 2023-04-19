import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { serverURL } from "../constants/serverURL";
import { ILaunchpad } from "../models/ILaunchpad";


export const walletAPI = createApi({
    reducerPath: 'walletAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            if (localStorage.getItem('auth')) {
                headers.set("Authorization", `${localStorage.getItem('auth')}`)
            }
            return headers
        }
    }),

    endpoints: (build) => ({
        signature: build.mutation<any, ILaunchpad>({
            query: (launchpad) => ({
                url: '/signature',
                method: 'POST',
                body: {
                    launchpad: launchpad
                }
            }),
        }),
    })
})
