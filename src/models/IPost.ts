export interface IPostCredentials {
    text: string
    images?: any
}

export interface IPost {
    id: number,
    type: string
    text: string,
    liked: boolean
    imgs: string
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
    color: string
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



