import moment from 'moment'

export const getFormattedTime = (time: moment.MomentInput): string =>
  moment(time).format('ddd, DD MMMM YYYY')
