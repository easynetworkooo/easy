export interface IUserValue {
    id: number,
    email: string,
    name: string,
    regdate: string,
    country: string | null,
    city: string | null,
    interests: string,
    img: string,
    likes: number | null,
    views: number | null,
    reposts: number | null
    subscribers: number
    subscriptions: number
    subscribeStatus: boolean
    color: string
}

export interface IUser {
    status: number,
    value: IUserValue
}
