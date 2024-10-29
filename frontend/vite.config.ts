import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // process.env.VITE_API_BASE_URL || "http://localhost:3000", implement prod
        secure: false, // remove for prod implement
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove "/api" before forward
      },
    },
  },
  plugins: [react()],
});
