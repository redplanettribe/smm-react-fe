/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_LINKEDIN_CLIENT_ID: string
    readonly VITE_LINKEDIN_CLIENT_SECRET: string
    readonly VITE_LINKEDIN_REDIRECT_URI: string
    // readonly VITE_CLIENT_ID: string
    // readonly VITE_CLIENT_ID: string
    // readonly VITE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}