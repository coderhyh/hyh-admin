import dayjs from 'dayjs'

export const utcToLocale = (date: string | null) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '')
