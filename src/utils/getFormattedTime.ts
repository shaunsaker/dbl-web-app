import moment from 'moment'

export const getFormattedTime = (
  time: moment.MomentInput,
  withHours?: boolean,
): string =>
  moment(time).format(`ddd, DD MMMM YYYY${withHours ? ', HH:mm' : ''}`)
