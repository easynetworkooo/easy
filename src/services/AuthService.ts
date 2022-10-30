import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IRegistration, IRegistrationCredentials } from "../models/IRegistration";
import { ILogin, ILoginCredentials } from "../models/ILogin";
import { IFinishRegisterCredentials } from "../models/IFinishRegister";


export const authAPI = createApi({
    reducerPath: 'authAPI',
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
                body: loginCredentials,
                credentials: 'include',
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            })
        }),
        checkAuthorization: build.mutation({
            query: () => ({
                url: '/checkAuthorization',
                method: 'POST',
            })
        }),
        finishRegister: build.mutation<any, IFinishRegisterCredentials>({
            query: (finishRegisterCredentials) => ({
                url: '/finishRegister',
                method: 'POST',
                body: finishRegisterCredentials
            })
        }),
    })
})