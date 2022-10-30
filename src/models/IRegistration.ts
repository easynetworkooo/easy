export interface IRegistrationCredentials {
    email: string,
    password: string
}

export interface IRegistration {
    data: {
        status: number,
        value: string
    }
}