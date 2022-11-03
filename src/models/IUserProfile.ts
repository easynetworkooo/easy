export interface IUserProfile {
    id: number,
    email: string,
    name: string,
    regdate: string,
    country: string | null,
    city: string | null,
    interests: string[] | null,
    img: string,
    likes: number | null,
    views: number | null,
    reposts: number | null
    subscribers: number
    subscriptions: number
}

export interface IUserProfileContinueAuth {
    name: string,
    country: string,
    city: string,
    interests: string[],
}