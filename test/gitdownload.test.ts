import { describe, test, expect } from "vitest";
import getDownload from "../playground/gitdownload/dist";
describe("cli", () => {
  test("测试1", () => {
    let ans: any = getDownload();
    expect(ans.code).toBe(0);
  });
});
