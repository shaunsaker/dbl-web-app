declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
    SUPPORT_EMAIL: string;
    BLOCKCHAIN_EXPLORER_URL: string;
    APP_NAME: string;
    SENTRY_DSN: string;
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: number;
    FIREBASE_APP_ID: string;
  };
};
