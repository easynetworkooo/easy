import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAllUserPosts, IPost, IPostCredentials } from "../models/IPost";
import { serverURL } from "../constants/serverURL";


export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            if (localStorage.getItem('auth')) {
                headers.set("Authorization", `${localStorage.getItem('auth')}`)
            }
            return headers
        }
    }),
    tagTypes: ['Post'],

    endpoints: (build) => ({
        createBlogPost: build.mutation<IPost, IPostCredentials>({
            query: (postCredentials) => ({
                url: '/setBlogPost',
                method: 'POST',
                body: postCredentials
            }),
            invalidatesTags: ['Post']
        }),
        setLikeToPost: build.mutation<any, {postid: number}>({
            query: (postId) => ({
                url: '/setLikeToPost',
                method: 'POST',
                body: postId
            }),
            invalidatesTags: ['Post']
        }),
        removeLikeToPost: build.mutation<any, {postid: number}>({
            query: (postId) => ({
                url: '/removeLikeToPost',
                method: 'POST',
                body: postId
            }),
            invalidatesTags: ['Post']
        }),
        setCommentToPost: build.mutation<any, {postid: number, text: string}>({
            query: (commentCredentials) => ({
                url: '/setCommentToPost',
                method: 'POST',
                body: commentCredentials
            }),
            invalidatesTags: ['Post']
        }),
        fetchPostComments: build.mutation<any, {postid: number, page: number}>({
            query: (commentCredentials) => ({
                url: '/getPostComments',
                method: 'POST',
                body: commentCredentials
            }),
        }),
        setLikeToComment: build.mutation<any, {commentid: number}>({
            query: (commentCredentials) => ({
                url: '/setLikeToPostComment',
                method: 'POST',
                body: commentCredentials
            }),
            invalidatesTags: ['Post']
        }),
        removeLikeToComment: build.mutation<any, {commentid: number}>({
            query: (commentCredentials) => ({
                url: '/removeLikeToPostComment',
                method: 'POST',
                body: commentCredentials
            }),
            invalidatesTags: ['Post']
        }),
        fetchAllUserPosts: build.query<IAllUserPosts, string>({
            query: (userId: string) => ({
                url: '/getAllBlogPosts',
                method: 'GET',
                params: {
                    id: userId
                }
            }),
            providesTags: ['Post']
        }),
    })
})