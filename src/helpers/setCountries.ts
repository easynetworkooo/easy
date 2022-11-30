export const setCountries = (countries: {code: string, name: string}[]) => {
    const countriesNameList: string[] = []
    if (countries) {
        countries.forEach(({name}) => countriesNameList.push(name))
    }
    return countriesNameList
}
