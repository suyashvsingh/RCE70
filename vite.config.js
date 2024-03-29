import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: 'https://n12rn0z2b4.execute-api.us-east-1.amazonaws.com/dev/',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
