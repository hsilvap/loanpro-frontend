/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_USER_POOL_ID: string;
  readonly VITE_APP_CLIENT_SECRET: string;
  readonly VITE_APP_CLIENT_ID: string;
  readonly VITE_APP_REGION: string;
  readonly VITE_APP_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
