import { it, describe, test, expect } from "vitest";
import getDownload from "../playground/cli/gitdownload/dist";

it("测试1", () => {
  let ans: any = getDownload();
  expect(ans.code).toBe(0);
});
