import dayjs from 'dayjs'

export const utcToLocale = (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')
