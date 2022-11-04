export interface IComment {
    id: number
    date: string
    liked: boolean
    likes: number | null
    owner: {
        id: number,
        name: string,
        img: string | null
    }
    postid: number,
    text: string
}