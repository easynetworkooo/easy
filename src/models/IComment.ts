export interface ICommentResponse {
    status: number
    value: IComment[]
}

export interface IComment {
    id: number
    date: string
    liked: boolean
    likes: number | null
    owner: {
        id: number,
        name: string,
        img: string | null
        color: string
    }
    postid: number,
    text: string
}
