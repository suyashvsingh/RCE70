import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: 'https://2lp48g97uc.execute-api.ap-south-1.amazonaws.com/prod/',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
