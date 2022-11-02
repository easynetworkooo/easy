import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAllUserPosts, IPost, IPostCredentials } from "../models/IPost";


export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://easy-micro.ru',
        prepareHeaders: (headers) => {
            if (localStorage.getItem('auth')) {
                headers.set("Authorization", `${localStorage.getItem('auth')}`)
            }
            return headers
        }
    }),
    tagTypes: ['PostCreate'],

    endpoints: (build) => ({
        createBlogPost: build.mutation<IPost, IPostCredentials>({
            query: (postCredentials) => ({
                url: '/setBlogPost',
                method: 'POST',
                body: postCredentials
            }),
            invalidatesTags: ['PostCreate']
        }),
        setLikeToPost: build.mutation<any, {postid: number}>({
            query: (postId) => ({
                url: '/setLikeToPost',
                method: 'POST',
                body: postId
            }),
            invalidatesTags: ['PostCreate']
        }),
        removeLikeToPost: build.mutation<any, {postid: number}>({
            query: (postId) => ({
                url: '/removeLikeToPost',
                method: 'POST',
                body: postId
            }),
            invalidatesTags: ['PostCreate']
        }),
        setCommentToPost: build.mutation<any, {postid: number, text: string}>({
            query: (commentCredentials) => ({
                url: '/setCommentToPost',
                method: 'POST',
                body: commentCredentials
            }),
            invalidatesTags: ['PostCreate']
        }),
        fetchAllUserPosts: build.query<IAllUserPosts, string>({
            query: (userId: string) => ({
                url: '/getAllBlogPosts',
                method: 'GET',
                params: {
                    id: userId
                }
            }),
            providesTags: ['PostCreate']
        }),
    })
})