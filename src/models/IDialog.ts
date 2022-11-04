export interface IDialog {
    status: number
    value: IDialogValue[]
}

export interface IDialogValue {
    opponentId: number
    name: string
    lastMessage: string
    img: string | null
}