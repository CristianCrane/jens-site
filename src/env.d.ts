/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_APP_NAME: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
      readonly RESEND_API_KEY: string
      readonly EMAIL_ASSETS_BASE_URL: string
    }
  }
}

export {}
