export const setCities = (cities: {name: string}[]) => {
    const citiesNameList: string[] = []
    if (cities) {
        cities.forEach(({name}) => citiesNameList.push(name))
    }
    return citiesNameList
}
