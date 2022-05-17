declare const process: {
  env: {
    NODE_ENV: 'development' | 'production'
    SUPPORT_EMAIL: string
    BLOCKCHAIN_BLOCK_HASH_EXPLORER_URL: string
    BLOCKCHAIN_TRANSACTION_EXPLORER_URL: string
    APP_NAME: string
    APP_DOWNLOAD_URL: string
    SENTRY_DSN: string
    FIREBASE_API_KEY: string
    FIREBASE_AUTH_DOMAIN: string
    FIREBASE_PROJECT_ID: string
    FIREBASE_STORAGE_BUCKET: string
    FIREBASE_MESSAGING_SENDER_ID: string
    FIREBASE_APP_ID: string
    JEST_WORKER_ID: string
  }
}
