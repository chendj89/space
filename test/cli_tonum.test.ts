import { describe, test, expect } from "vitest";
import obj from "../playground/cli/toNum/dist";
describe("数字", () => {
  test("num", () => {
    expect(obj.toNum(100)).toEqual(100);
    expect(obj.toNum(10)).toEqual(10);
    expect(obj.toNum(1)).toEqual(1);
    expect(obj.toNum(1.0)).toEqual(1);
    expect(obj.toNum(0)).toEqual(0);
    expect(obj.toNum("0.0")).toEqual("0");
    expect(obj.toNum("1.0")).toEqual("1");
    expect(obj.toNum("0.010")).toEqual("0.01");
  });
});
