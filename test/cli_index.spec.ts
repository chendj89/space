import { expect, test } from "vitest";
import toRaw from "../playground/cli/index/dist";
test("测试", () => {
  expect(toRaw("9")).toBe("9");
});
