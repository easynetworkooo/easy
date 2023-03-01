export interface IInterests {
    status: number,
    value: {
        interests: [
            {
                id: number,
                name: string
            }
        ]
    }
}

export interface IInterestsFound {
    status: number
    value: { id: number, name: string }[]
}
