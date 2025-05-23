import { numberToString } from "@auaust/primitive-kit/numbers";

import { describe, expect, it, test } from "vitest";

describe("numberToString()", () => {
  test.each([
    [16, "16"],
    [0.5, "0.5"],
    [-0, "0"],
    [NaN, "NaN"],
    [Infinity, "Infinity"],
    [-Infinity, "-Infinity"],
    [123, "123"],
  ])("should convert %s to string", (num, str) => {
    expect(numberToString(num)).toBe(str);
  });

  test.each([
    [16, 2, "10000"],
    [16, 8, "20"],
    [16, 10, "16"],
    [16, 16, "10"],
    [16, 36, "g"],
  ])("should convert %s to string with radix %s", (num, radix, str) => {
    expect(numberToString(num, radix)).toBe(str);
  });
});
