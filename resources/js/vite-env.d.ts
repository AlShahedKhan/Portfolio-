/// <reference types="vite/client" />

declare global {
    interface Window {
        axios: typeof import('axios');
    }
}

export {};
