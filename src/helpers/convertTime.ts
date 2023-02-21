import moment from 'moment'

export const convertTime = (date: string) => {
    return  moment(date).fromNow();
}
