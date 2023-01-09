export interface INotifications {
    status: number
    value: INotificationsValue
}

export interface INotificationsValue {
    main: {
        likes: number | null
        views: number | null
        reposts: number | null
    }
    buttons: {
        messages: number | undefined
        subscribers: number | undefined
    }
    bell: IBellItem[]
}

export interface IBellItem {
    id: number
    type: string
    fromid: number
    toid: number
    regdate: string
    userData: {
        id: number
        name: string
        img: string | null
    }
}
