import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "lib/testdouble-component.tsx"),
      name: "testdouble-component",
      fileName: "testdouble-component",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});