import * as Sentry from '@sentry/browser'
import pkg from '../../../package.json'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: `${pkg.name}@${pkg.version}`,
  })
}

export { Sentry as sentry }
