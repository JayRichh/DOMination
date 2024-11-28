declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    VERCEL_URL?: string;
    PORT?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
