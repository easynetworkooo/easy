import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IRegistration, IRegistrationCredentials } from "../models/IRegistration";
import { ILogin, ILoginCredentials } from "../models/ILogin";


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://a0729026.xsph.ru'}),
    endpoints: (build) => ({
        registration: build.mutation<IRegistration, IRegistrationCredentials>({
            query: (registrationCredentials) => ({
                url: '/register',
                method: 'POST',
                body: registrationCredentials
            })
        }),
        login: build.mutation<ILogin, ILoginCredentials>({
            query: (loginCredentials) => ({
                url: '/login',
                method: 'POST',
                body: loginCredentials
            })
        })
    })
})