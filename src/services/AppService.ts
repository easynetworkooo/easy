import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICountries } from "../models/ICountries";
import { ICities } from "../models/ICities";
import { IInterests } from "../models/IInterests";


export const appAPI = createApi({
    reducerPath: 'appAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://a0729026.xsph.ru'}),
    endpoints: (build) => ({
        fetchAllCountries: build.query<ICountries, string>({
            query: () => ({
                url: '/countries'
            })
        }),
        fetchAllCities: build.query<ICities, string>({
            query: (code: string = 'BY') => ({
                url: '/cities',
                params: {
                    code: code
                }
            })
        }),
        fetchAllInterest: build.query<IInterests, string>({
            query: () => ({
                url: `/interests`,
            })
        }),
    })
})