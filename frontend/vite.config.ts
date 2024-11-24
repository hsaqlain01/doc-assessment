import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      store: path.resolve(__dirname, "./src/store"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      services: path.resolve(__dirname, "./src/services"),
    },
  },
  server: {
    port: 3000,
  },
});
