export interface IUserProfile {
    status: number,
    value: {
        id: number,
        email: string,
        name: string,
        regdate: string,
        country: string,
        city: string,
        interests: string[],
        img: string,
        likes: number | null,
        views: number | null,
        reposts: number | null
    }
}