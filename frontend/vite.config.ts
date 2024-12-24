import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// this line is needed to use env files in vite.config file
// need to manually load env
const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), "VITE_");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: env.VITE_API_URL, //implement prod, change localhost to dev
        secure: env.NODE_ENV === "production",
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
