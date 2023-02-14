import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IRegistration, IRegistrationCredentials } from "../models/IRegistration";
import { ILogin, ILoginCredentials } from "../models/ILogin";
import { IFinishRegisterCredentials } from "../models/IFinishRegister";
import { serverURL } from "../constants/serverURL";


export const authAPI = createApi({
    reducerPath: 'authAPI',
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
        sendMail: build.mutation<any, {email: string}>({
            query: (email) => ({
                url: '/sendmail',
                method: 'POST',
                body: email
            })
        }),
        checkCode: build.mutation<any, {code: string, email: string}>({
            query: (code) => ({
                url: '/checkcode',
                method: 'POST',
                body: code
            })
        }),
        cancelCodes: build.mutation<any, {email: string}>({
            query: (email) => ({
                url: '/cancelcodes',
                method: 'POST',
                body: email
            })
        }),
        updatePassword: build.mutation<any, {email: string, password: string}>({
            query: (updateCredentials) => ({
                url: '/updatepass',
                method: 'POST',
                body: updateCredentials
            })
        }),
        checkAuthorization: build.mutation({
            query: () => ({
                url: '/checkAuthorization',
                method: 'POST',
            })
        }),
        checkNickname: build.mutation<any, string>({
            query: (nickname: string) => ({
                url: '/checkNickname',
                method: 'GET',
                params: {
                    nickname: nickname
                }
            }),
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
