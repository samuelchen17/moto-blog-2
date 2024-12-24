import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:3000", //implement prod, change localhost to dev
        secure: process.env.NODE_ENV === "production",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove "/api" before forward
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
