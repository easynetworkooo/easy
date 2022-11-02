export interface IPostCredentials {
    text: string
}

export interface IPost {
    id: number,
    type: string
    text: string,
    liked: boolean
    owner: {
        id: number,
        email: string,
        name: string,
        img: string | null
    },
    date: string,
    likes: number | null,
    comments: number | null,
    reposts: number | null
}

export interface IAllUserPosts {
    status: number,
    value: {
        pages: number,
        data: IPost[]
    }
}



