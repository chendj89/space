/// <reference types="vitest" />
import { defineConfig } from "vite";
export default defineConfig({
  test: {
    include: ["./cli_gitdownload.test.ts"],
  },
});
