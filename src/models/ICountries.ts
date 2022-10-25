export interface ICountries {
    status: number,
    value: {
        countries: [
            {
                name: string,
                code: string
            }
        ]
    }
}