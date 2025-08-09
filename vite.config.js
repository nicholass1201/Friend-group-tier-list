import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // This line is the important one!
  base: "/Friend-group-tier-list/",
  plugins: [react()],
});
