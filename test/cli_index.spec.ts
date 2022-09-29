import { expect, test } from "vitest";
import useGame from "../playground/cli/game/dist/index.js";
test("should work as expected", () => {
  expect(useGame("9")).toBe("1239");
});
