import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv'

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: process.env.AWS_GATEWAY,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
