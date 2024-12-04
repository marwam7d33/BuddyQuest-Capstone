import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Add React plugin for Vite
  optimizeDeps: {
    include: ["recharts"], // Ensure Recharts is optimized
  },
});
