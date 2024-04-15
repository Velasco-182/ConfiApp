import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    server: {
      host: '0.0.0.0',
      strictPort: true,
      port: 5173,
      },
    alias: [{ find: "@", replacement: "/src" }],
  },
});
