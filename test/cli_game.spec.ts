import { expect, test } from "vitest";
import useGame from "../playground/cli/game/dist";
test("测试", () => {
  expect(useGame("9")).toBe("1239");
});
