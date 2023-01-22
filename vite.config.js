import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: `${env.VITE_API_HOST}:${env.VITE_API_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
