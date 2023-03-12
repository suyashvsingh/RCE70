import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target:
            "https://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
