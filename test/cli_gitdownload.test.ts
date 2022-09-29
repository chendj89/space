import { describe, test, expect } from "vitest";
import getDownload from "../playground/cli/gitdownload/dist";
import shell from "shelljs";
describe("cli", () => {
  test("测试1", () => {
    let ans: any = getDownload();
    expect(ans.code).toBe(0);
    shell.rm("-rf", "./cli");
  });
});
