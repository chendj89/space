/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    // 排除测试
    exclude: ["./cli_game.test.ts", "./cli_tonum.test.ts"],
  },
});
