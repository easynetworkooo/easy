export interface IDialog {
    status: number
    value: IDialogValue[]
}

export interface IDialogValue {
    dateLastMessage: string
    opponentId: number
    name: string
    lastMessage: string
    img: string | null
}
