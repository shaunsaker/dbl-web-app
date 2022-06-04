import moment from 'moment'
import { MomentInput } from 'moment'

export const isToday = (timestamp: MomentInput): boolean =>
  moment(timestamp).startOf('day').isSame(moment().startOf('day'))
