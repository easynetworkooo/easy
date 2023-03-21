import moment from 'moment'

export const convertTime = (date: string) => {
    const dateFromNow = moment(date).fromNow()
    if (dateFromNow.includes('month') || dateFromNow.includes('year')) {
        return date.split(' ')[0]
    }
    return dateFromNow;
}
