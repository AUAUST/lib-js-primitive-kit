import { formatNumber } from "@auaust/primitive-kit/numbers";

import { describe, expect, it, test } from "vitest";

describe("formatNumber()", () => {
  test.each([
    [16, "16"],
    [0.5, "0.5"],
    [-0, "0"],
    [NaN, "NaN"],
    [Infinity, "Infinity"],
    [-Infinity, "-Infinity"],
    [123, "123"],
    [20000, "20,000"],
    [20000.5, "20,000.5"],
  ])(
    "should separate thousands with commas and decimals with dots",
    (num, str) => {
      expect(formatNumber(num)).toBe(str);
    }
  );

  test.each([
    [1, { fractionDigits: 2 }, "1.00"],
    [2.5, { fractionDigits: 0 }, "3"],
    [
      1000000.25,
      { decimalSeparator: " ", thousandsSeparator: "_", fractionDigits: 5 },
      "1_000_000 25000",
    ],
  ])("should convert %s to string with options %s", (num, options, str) => {
    expect(formatNumber(num, options)).toBe(str);
  });
});
