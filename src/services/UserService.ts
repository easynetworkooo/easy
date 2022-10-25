import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IRegistration } from "../models/IRegistration";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://a0729026.xsph.ru'}),
    endpoints: (build) => ({
        registration: build.mutation<IRegistration, IRegistration>({
            query: (registrationCredentials) => ({
                url: '/register',
                method: 'POST',
                body: registrationCredentials
            })
        })
    })
})