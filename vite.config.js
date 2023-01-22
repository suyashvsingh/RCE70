import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://backend:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
