export interface IRegistrationCredentials {
    username: string,
    password: string
}

export interface IRegistration {
    data: {
        status: number,
        value: string
    }
}