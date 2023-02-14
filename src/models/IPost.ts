export interface IPostCredentials {
    text: string
}

export interface IPost {
    id: number,
    type: string
    text: string,
    liked: boolean
    itsrepost: boolean
    originaldate: string
    originalid: number
    originalowner: IOwner | number
    owner: IOwner
    date: string,
    likes: number | null,
    comments: number | null,
    reposts: number | null
}

export interface IOwner {
    id: number,
    email: string,
    name: string,
    img: string | null
}

export interface IAllUserPosts {
    status: number,
    value: {
        pages: number,
        data: IPost[]
    }
}

export interface IFreshPosts {
    status: number,
    value: IPost[]
}



