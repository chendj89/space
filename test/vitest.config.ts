/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    // 排除测试
    exclude: ["./cli_gitdownload.test.ts", "./cli_game.test.ts"],
  },
});
