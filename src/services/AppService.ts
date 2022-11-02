import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICountries } from "../models/ICountries";
import { ICities } from "../models/ICities";
import { IInterests } from "../models/IInterests";


export const appAPI = createApi({
    reducerPath: 'appAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://easy-micro.ru'}),
    endpoints: (build) => ({
        fetchAllCountries: build.query<ICountries, string>({
            query: () => ({
                url: '/countries',
                method: 'GET'
            })
        }),
        fetchAllCities: build.query<ICities, string>({
            query: (code: string) => ({
                url: '/cities',
                method: 'GET',
                params: {
                    code: code
                }
            })
        }),
        fetchAllInterest: build.query<IInterests, string>({
            query: () => ({
                url: `/interests`,
                method: 'GET'
            })
        }),
    })
})