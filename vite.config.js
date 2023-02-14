import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target:
            "https://ey1rx2unk0.execute-api.ap-south-1.amazonaws.com/test/",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
